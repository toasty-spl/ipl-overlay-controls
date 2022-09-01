import type { NodeCG, ReplicantServer } from 'nodecg/server';
import { ObsCredentials, ObsState, ObsConfig, ObsConfigItem } from '../../types/schemas';
import OBSWebSocket, { EventTypes } from 'obs-websocket-js';
import { ObsStatus } from '../../types/enums/ObsStatus';
import { isBlank } from '../../helpers/stringHelper';

// Authentication failed, Unsupported protocol version, Session invalidated
const SOCKET_CLOSURE_CODES_FORBIDDING_RECONNECTION = [4009, 4010, 4011];

export class ObsConnectorService {
    private readonly nodecg: NodeCG;
    private obsState: ReplicantServer<ObsState>;
    private obsCredentials: ReplicantServer<ObsCredentials>;
    private obsConfig: ReplicantServer<ObsConfig>;
    private socket: OBSWebSocket;
    private reconnectionInterval: NodeJS.Timeout;
    private reconnectionCount: number;
    private sceneCollectionChanging: boolean;

    constructor(nodecg: NodeCG) {
        this.nodecg = nodecg;
        this.obsState = nodecg.Replicant('obsState');
        this.obsCredentials = nodecg.Replicant('obsCredentials');
        this.obsConfig = nodecg.Replicant('obsConfig');
        this.socket = new OBSWebSocket();
        this.reconnectionCount = 0;

        this.socket.on('ConnectionClosed', e => this.handleClosure(e));
        this.socket.on('ConnectionOpened', () => this.handleOpening());
        this.socket.on('SceneRemoved', e => this.handleSceneRemoval(e));
        this.socket.on('SceneNameChanged', e => this.handleSceneNameChange(e));
        this.socket.on('SceneCreated', e => this.handleSceneCreation(e));
        this.socket.on('CurrentProgramSceneChanged', e => this.handleProgramSceneChange(e));
        this.socket.on('CurrentSceneCollectionChanging', () => this.handleCurrentSceneCollectionChanging());
        this.socket.on('CurrentSceneCollectionChanged', e => this.handleCurrentSceneCollectionChange(e));

        if (this.obsState.value.enabled) {
            this.connect().catch(e => {
                this.nodecg.log.error(e);
            });
        }
    }

    private handleCurrentSceneCollectionChanging(): void {
        this.sceneCollectionChanging = true;
    }

    private async handleCurrentSceneCollectionChange(event: EventTypes['CurrentSceneCollectionChanged']): Promise<void> {
        this.sceneCollectionChanging = false;
        this.obsState.value.currentSceneCollection = event.sceneCollectionName;

        try {
            await this.reloadSceneList();
        } catch (e) {
            this.nodecg.log.error('Failed to reload scene list', e);
        }
    }

    private handleClosure(event: EventTypes['ConnectionClosed']): void {
        if (this.obsState.value.status === ObsStatus.CONNECTED) {
            if (event.code !== 1000) {
                this.nodecg.log.error('OBS websocket closed with message:', event.message);
            }
            this.obsState.value.status = ObsStatus.NOT_CONNECTED;
            if (this.obsState.value.enabled) {
                this.startReconnecting(event.code);
            }
        }
    }

    private handleOpening(): void {
        this.nodecg.log.info('OBS websocket is open.');
        this.obsState.value.status = ObsStatus.CONNECTED;
        this.stopReconnecting();
    }

    private handleSceneNameChange(event: EventTypes['SceneNameChanged']): void {
        this.obsState.value.scenes = this.obsState.value.scenes.map(scene =>
            scene === event.oldSceneName ? event.sceneName : scene);

        this.replaceSceneInSceneConfig(event.oldSceneName, event.sceneName);
    }

    private handleSceneCreation(event: EventTypes['SceneCreated']): void {
        if (this.sceneCollectionChanging) return;

        this.obsState.value.scenes.push(event.sceneName);
    }

    private handleSceneRemoval(event: EventTypes['SceneRemoved']): void {
        if (this.sceneCollectionChanging) return;

        const newScenes = this.obsState.value.scenes.filter(scene => scene !== event.sceneName);
        this.obsState.value.scenes = newScenes;

        const config = this.getCurrentSceneConfig();
        if (config.intermissionScene === event.sceneName || config.gameplayScene === event.sceneName) {
            this.nodecg.sendMessage('obsSceneConfigurationChangedAfterUpdate');
        }

        this.replaceSceneInSceneConfig(event.sceneName, newScenes[0]);
    }

    private handleProgramSceneChange(event: EventTypes['CurrentProgramSceneChanged']): void {
        this.obsState.value.currentScene = event.sceneName;
    }

    async connect(reconnectOnFailure = true): Promise<void> {
        await this.socket.disconnect();
        this.obsState.value.status = ObsStatus.CONNECTING;

        try {
            // todo: if address does not start with http(s), add it manually (client side?)
            await this.socket.connect(
                this.obsCredentials.value.address,
                isBlank(this.obsCredentials.value.password) ? undefined : this.obsCredentials.value.password);
        } catch (e) {
            this.obsState.value.status = ObsStatus.NOT_CONNECTED;
            if (reconnectOnFailure) {
                this.startReconnecting(e.code);
            }
            throw new Error(`Failed to connect to OBS: ${e.message ?? String(e)}`);
        }

        await this.reloadCurrentSceneCollection();
        await this.reloadSceneList();
    }

    async disconnect(): Promise<void> {
        this.stopReconnecting();
        await this.socket.disconnect();
    }

    private async reloadCurrentSceneCollection(): Promise<void> {
        const sceneCollections = await this.socket.call('GetSceneCollectionList');
        this.obsState.value.currentSceneCollection = sceneCollections.currentSceneCollectionName;
    }

    private async reloadSceneList(): Promise<void> {
        const scenes = await this.socket.call('GetSceneList');

        this.obsState.value.currentScene = scenes.currentProgramSceneName;
        this.setSceneList(scenes.scenes.map(scene => String(scene.sceneName)));
    }

    startReconnecting(socketClosureCode?: number): void {
        if (SOCKET_CLOSURE_CODES_FORBIDDING_RECONNECTION.includes(socketClosureCode)) return;

        this.stopReconnecting();
        this.reconnectionInterval = setInterval(() => {
            this.reconnectionCount++;
            this.nodecg.log.info(`Attempting to reconnect to OBS... (Attempt ${this.reconnectionCount})`);
            this.connect(false).catch(() => {
                // ignore
            });
        }, 10000);
    }

    stopReconnecting(): void {
        clearInterval(this.reconnectionInterval);
        this.reconnectionInterval = null;
        this.reconnectionCount = 0;
    }

    private setSceneList(scenes: string[]): void {
        // OBS does not allow you to have no scenes.
        if (scenes.length <= 0) {
            this.nodecg.log.error('Received scene list with no scenes.');
            return;
        }

        this.obsState.value.scenes = scenes;
        const config = this.getCurrentSceneConfig();
        const gameplaySceneNeedsUpdate = !scenes.includes(config?.gameplayScene);
        const intermissionSceneNeedsUpdate = !scenes.includes(config?.intermissionScene);

        if (gameplaySceneNeedsUpdate || intermissionSceneNeedsUpdate) {
            this.updateSceneConfig({
                gameplayScene: gameplaySceneNeedsUpdate ? scenes[0] : config.gameplayScene,
                intermissionScene: intermissionSceneNeedsUpdate
                    ? scenes[scenes.length === 1 ? 0 : 1]
                    : config.intermissionScene
            });
            this.nodecg.sendMessage('obsSceneConfigurationChangedAfterUpdate');
        }
    }

    private replaceSceneInSceneConfig(oldSceneName: string, newSceneName: string): void {
        const config = this.getCurrentSceneConfig();
        const configUpdates: { intermissionScene?: string, gameplayScene?: string } = {};

        if (config.gameplayScene === oldSceneName) {
            configUpdates.gameplayScene = newSceneName;
        }
        if (config.intermissionScene === oldSceneName) {
            configUpdates.intermissionScene = newSceneName;
        }

        if (Object.keys(configUpdates).length > 0) {
            this.updateSceneConfig(configUpdates);
        }
    }

    getCurrentSceneConfig(): ObsConfigItem {
        return this.obsConfig.value.find(item => item.sceneCollection === this.obsState.value.currentSceneCollection);
    }

    updateSceneConfig(config: { gameplayScene?: string, intermissionScene?: string }): void {
        const scenes = this.obsState.value.scenes;
        if (scenes != null
            && (config.gameplayScene && !scenes.some(scene => scene === config.gameplayScene)
            || (config.intermissionScene && !scenes.some(scene => scene === config.intermissionScene)))) {
            throw new Error('Could not find one or more of the provided scenes.');
        }

        const currentSceneCollection = this.obsState.value.currentSceneCollection;
        const existingDataIndex = this.obsConfig.value.findIndex(item =>
            item.sceneCollection === currentSceneCollection);

        if (existingDataIndex >= 0) {
            const existingConfig = this.obsConfig.value[existingDataIndex];
            this.obsConfig.value[existingDataIndex] = {
                sceneCollection: existingConfig.sceneCollection,
                gameplayScene: config.gameplayScene ?? existingConfig.gameplayScene,
                intermissionScene: config.intermissionScene ?? existingConfig.intermissionScene
            };
        } else {
            this.obsConfig.value.push({
                gameplayScene: config.gameplayScene ?? scenes[0],
                intermissionScene: config.intermissionScene ?? scenes[scenes?.length === 1 ? 0 : 1],
                sceneCollection: currentSceneCollection
            });
        }
    }

    setCurrentScene(scene: string): Promise<void> {
        return this.socket.call('SetCurrentProgramScene', { sceneName: scene });
    }
}
