import type { NodeCG, ReplicantServer } from 'nodecg/server';
import { ObsCredentials, ObsState } from '../../types/schemas';
import OBSWebSocket, { EventTypes } from 'obs-websocket-js';
import { ObsStatus } from '../../types/enums/ObsStatus';
import { isBlank } from '../../helpers/stringHelper';

// Authentication failed, Unsupported protocol version, Session invalidated
const SOCKET_CLOSURE_CODES_FORBIDDING_RECONNECTION = [4009, 4010, 4011];

export class ObsConnectorService {
    private readonly nodecg: NodeCG;
    private obsState: ReplicantServer<ObsState>;
    private obsCredentials: ReplicantServer<ObsCredentials>;
    private socket: OBSWebSocket;
    private reconnectionInterval: NodeJS.Timeout;
    private reconnectionCount: number;

    constructor(nodecg: NodeCG) {
        this.nodecg = nodecg;
        this.obsState = nodecg.Replicant('obsState');
        this.obsCredentials = nodecg.Replicant('obsCredentials');
        this.socket = new OBSWebSocket();
        this.reconnectionCount = 0;

        this.socket.on('ConnectionClosed', e => this.handleClosure(e));
        this.socket.on('ConnectionOpened', () => this.handleOpening());
        this.socket.on('SceneListChanged', e => this.handleSceneListChange(e));
        this.socket.on('CurrentProgramSceneChanged', e => this.handleProgramSceneChange(e));

        if (this.obsState.value.enabled) {
            this.connect().catch(() => {
                // ignore
            });
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

    private handleSceneListChange(event: EventTypes['SceneListChanged']): void {
        this.updateScenes(event.scenes.map(scene => String(scene.sceneName)));
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

        await this.loadSceneList();
    }

    async disconnect(): Promise<void> {
        this.stopReconnecting();
        await this.socket.disconnect();
    }

    private async loadSceneList(): Promise<void> {
        const scenes = await this.socket.call('GetSceneList');

        this.obsState.value.currentScene = scenes.currentProgramSceneName;
        this.updateScenes(scenes.scenes.map(scene => String(scene.sceneName)));
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

    private updateScenes(scenes: string[]): void {
        // OBS does not allow you to have no scenes.
        if (scenes.length <= 0) {
            this.nodecg.log.error('Received scene list with no scenes.');
            return;
        }

        const obsStateUpdates: Record<string, unknown> = {};
        if (!scenes.includes(this.obsState.value.gameplayScene)) {
            obsStateUpdates.gameplayScene = scenes[0];
        }
        if (!scenes.includes(this.obsState.value.intermissionScene)) {
            obsStateUpdates.intermissionScene = scenes[scenes.length === 1 ? 0 : 1];
        }
        obsStateUpdates.scenes = scenes;
        this.obsState.value = {
            ...this.obsState.value,
            ...obsStateUpdates
        };

        if (obsStateUpdates.gameplayScene || obsStateUpdates.intermissionScene) {
            this.nodecg.sendMessage('obsSceneConfigurationChangedAfterUpdate');
        }
    }

    setCurrentScene(scene: string): Promise<void> {
        return this.socket.call('SetCurrentProgramScene', { sceneName: scene });
    }
}
