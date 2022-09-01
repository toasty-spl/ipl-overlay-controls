import { ObsConnectorService } from '../ObsConnectorService';
import { mockNodecg, replicants } from '../../__mocks__/mockNodecg';
import OBSWebSocket, { OBSWebSocketError } from 'obs-websocket-js';
import { ObsStatus } from '../../../types/enums/ObsStatus';
import { ObsState } from '../../../types/schemas';
import { flushPromises } from '@vue/test-utils';

describe('ObsConnectorService', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(OBSWebSocket.prototype, 'connect').mockResolvedValue(null);
        jest.spyOn(OBSWebSocket.prototype, 'disconnect').mockResolvedValue(null);
        jest.spyOn(OBSWebSocket.prototype, 'call').mockResolvedValue(null);
        replicants.obsState = {
            enabled: false
        };
        replicants.obsCredentials = {
            address: 'wss://test-obs',
            password: 'test pwd'
        };
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    describe('constructor', () => {
        it('does not attempt connection if obs is not enabled', () => {
            jest.spyOn(ObsConnectorService.prototype, 'connect');
            replicants.obsState = {
                enabled: false
            };

            const service = new ObsConnectorService(mockNodecg);

            expect(service.connect).not.toHaveBeenCalled();
        });

        it('connects to OBS if integration is enabled', async () => {
            jest.spyOn(ObsConnectorService.prototype, 'connect').mockResolvedValue(null);
            replicants.obsState = {
                enabled: true
            };
            replicants.obsCredentials = {
                address: 'wss://obs-websocket'
            };

            const service = new ObsConnectorService(mockNodecg);
            await flushPromises();

            expect(service.connect).toHaveBeenCalled();
        });
    });

    describe('getCurrentSceneConfig', () => {
        it('returns the config parameters for the current scene collection', () => {
            replicants.obsConfig = [
                {
                    sceneCollection: 'cool scenes 1',
                    gameplayScene: 'gameplay'
                },
                {
                    sceneCollection: 'cool scenes 2',
                    gameplayScene: 'gameplay'
                }
            ];
            replicants.obsState = {
                currentSceneCollection: 'cool scenes 2'
            };
            const service = new ObsConnectorService(mockNodecg);

            expect(service.getCurrentSceneConfig()).toEqual({
                sceneCollection: 'cool scenes 2',
                gameplayScene: 'gameplay'
            });
        });
    });

    describe('replaceSceneInSceneConfig', () => {
        it('updates options matching given parameters', () => {
            const service = new ObsConnectorService(mockNodecg);
            jest.spyOn(service, 'getCurrentSceneConfig').mockReturnValue({
                intermissionScene: 'intermission',
                gameplayScene: 'gameplay',
                sceneCollection: 'scenes'
            });
            jest.spyOn(service, 'updateSceneConfig').mockReturnValue(null);

            service['replaceSceneInSceneConfig']('intermission', 'new intermission');

            expect(service.updateSceneConfig).toHaveBeenCalledWith({
                intermissionScene: 'new intermission'
            });
        });

        it('does nothing if there is nothing to update', () => {
            const service = new ObsConnectorService(mockNodecg);
            jest.spyOn(service, 'getCurrentSceneConfig').mockReturnValue({
                intermissionScene: 'intermission',
                gameplayScene: 'gameplay',
                sceneCollection: 'scenes'
            });
            jest.spyOn(service, 'updateSceneConfig').mockReturnValue(null);

            service['replaceSceneInSceneConfig']('scene one', 'new scene one');

            expect(service.updateSceneConfig).not.toHaveBeenCalled();
        });
    });

    describe('handleClosure', () => {
        it('updates obs status and does not try to reconnect if obs is disabled', () => {
            replicants.obsState = {
                enabled: false,
                status: ObsStatus.CONNECTED
            };
            const service = new ObsConnectorService(mockNodecg);
            jest.spyOn(service, 'startReconnecting');

            service['handleClosure'](new OBSWebSocketError(9999, 'message'));

            expect(replicants.obsState).toEqual({
                enabled: false,
                status: ObsStatus.NOT_CONNECTED
            });
            expect(service.startReconnecting).not.toHaveBeenCalled();
        });

        it('updates obs status and tries to reconnect if obs is enabled', () => {
            replicants.obsState = {
                enabled: true,
                status: ObsStatus.CONNECTED
            };
            const service = new ObsConnectorService(mockNodecg);
            jest.spyOn(service, 'startReconnecting');

            service['handleClosure'](new OBSWebSocketError(9999, 'message'));

            expect(replicants.obsState).toEqual({
                enabled: true,
                status: ObsStatus.NOT_CONNECTED
            });
            expect(service.startReconnecting).toHaveBeenCalled();
        });

        it.each([
            ObsStatus.CONNECTING,
            ObsStatus.NOT_CONNECTED
        ])('does nothing if obs status is %s', status => {
            replicants.obsState = {
                enabled: true,
                status
            };
            const service = new ObsConnectorService(mockNodecg);
            jest.spyOn(service, 'startReconnecting');

            service['handleClosure'](new OBSWebSocketError(9999, 'message'));

            expect(replicants.obsState).toEqual({
                enabled: true,
                status
            });
            expect(service.startReconnecting).not.toHaveBeenCalled();
        });
    });

    describe('handleOpening', () => {
        it('updates status and stops reconnecting', () => {
            const service = new ObsConnectorService(mockNodecg);
            jest.spyOn(service, 'stopReconnecting');

            service['handleOpening']();

            expect(service.stopReconnecting).toHaveBeenCalled();
            expect(replicants.obsState).toEqual({
                enabled: false,
                status: ObsStatus.CONNECTED
            });
        });
    });

    describe('handleProgramSceneChange', () => {
        it('updates scenes', () => {
            const service = new ObsConnectorService(mockNodecg);

            service['handleProgramSceneChange']({
                sceneName: 'new-scene'
            });

            expect(replicants.obsState).toEqual({
                enabled: false,
                currentScene: 'new-scene'
            });
        });
    });

    describe('handleCurrentSceneCollectionChanging', () => {
        it('defines that the scene collection has started changing', () => {
            const service = new ObsConnectorService(mockNodecg);
            service['sceneCollectionChanging'] = false;

            service['handleCurrentSceneCollectionChanging']();

            expect(service['sceneCollectionChanging']).toEqual(true);
        });
    });

    describe('handleCurrentSceneCollectionChange', () => {
        it('defines that the scene collection has finished changing and updates state', async () => {
            replicants.obsState = {};
            const service = new ObsConnectorService(mockNodecg);
            service['sceneCollectionChanging'] = true;
            jest.spyOn(service as any, 'reloadSceneList').mockResolvedValue(null);

            service['handleCurrentSceneCollectionChange']({
                sceneCollectionName: 'scenes'
            });

            expect(service['sceneCollectionChanging']).toEqual(false);
            expect(replicants.obsState).toEqual({
                currentSceneCollection: 'scenes'
            });
            expect(service['reloadSceneList']).toHaveBeenCalled();
        });
    });

    describe('handleSceneNameChange', () => {
        it('updates the name of the affected scene', () => {
            replicants.obsState = {
                scenes: [
                    'scene 1',
                    'scene 2',
                    'scene 3'
                ]
            };
            const service = new ObsConnectorService(mockNodecg);
            jest.spyOn(service as any, 'replaceSceneInSceneConfig').mockReturnValue(null);

            service['handleSceneNameChange']({
                oldSceneName: 'scene 2',
                sceneName: 'scene 2 (newer)'
            });

            expect(replicants.obsState).toEqual({
                scenes: [
                    'scene 1',
                    'scene 2 (newer)',
                    'scene 3'
                ]
            });
            expect(service['replaceSceneInSceneConfig']).toHaveBeenCalledWith('scene 2', 'scene 2 (newer)');
        });
    });

    describe('handleSceneRemoval', () => {
        beforeEach(() => {
            replicants.obsState = {
                scenes: [
                    'scene 1',
                    'scene 2',
                    'scene 3'
                ]
            };
        });

        it('does nothing if the scene collection is changing', () => {
            const service = new ObsConnectorService(mockNodecg);
            service['sceneCollectionChanging'] = true;
            jest.spyOn(service as any, 'replaceSceneInSceneConfig').mockReturnValue(null);

            // @ts-ignore
            service['handleSceneRemoval']({
                sceneName: 'scene 2'
            });

            expect(service['replaceSceneInSceneConfig']).not.toHaveBeenCalled();
            expect(replicants.obsState).toEqual({
                scenes: [
                    'scene 1',
                    'scene 2',
                    'scene 3'
                ]
            });
            expect(mockNodecg.sendMessage).not.toHaveBeenCalled();
        });

        it('updates the list of scenes', () => {
            const service = new ObsConnectorService(mockNodecg);
            service['sceneCollectionChanging'] = false;
            jest.spyOn(service as any, 'replaceSceneInSceneConfig').mockReturnValue(null);
            jest.spyOn(service, 'getCurrentSceneConfig').mockReturnValue({
                sceneCollection: 'scenes',
                gameplayScene: 'scene 1',
                intermissionScene: 'scene 3'
            });

            // @ts-ignore
            service['handleSceneRemoval']({
                sceneName: 'scene 2'
            });

            expect(service['replaceSceneInSceneConfig']).toHaveBeenCalledWith('scene 2', 'scene 1');
            expect(replicants.obsState).toEqual({
                scenes: [
                    'scene 1',
                    'scene 3'
                ]
            });
            expect(mockNodecg.sendMessage).not.toHaveBeenCalled();
        });

        it('emits a message if a scene in the configuration is changed', () => {
            replicants.obsState = {
                scenes: [
                    'scene 1',
                    'scene 2',
                    'scene 3'
                ]
            };
            const service = new ObsConnectorService(mockNodecg);
            service['sceneCollectionChanging'] = false;
            jest.spyOn(service as any, 'replaceSceneInSceneConfig').mockReturnValue(null);
            jest.spyOn(service, 'getCurrentSceneConfig').mockReturnValue({
                sceneCollection: 'scenes',
                gameplayScene: 'scene 1',
                intermissionScene: 'scene 3'
            });

            // @ts-ignore
            service['handleSceneRemoval']({
                sceneName: 'scene 1'
            });

            expect(service['replaceSceneInSceneConfig']).toHaveBeenCalledWith('scene 1', 'scene 2');
            expect(replicants.obsState).toEqual({
                scenes: [
                    'scene 2',
                    'scene 3'
                ]
            });
            expect(mockNodecg.sendMessage).toHaveBeenCalledWith('obsSceneConfigurationChangedAfterUpdate');
        });
    });

    describe('handleSceneCreation', () => {
        it('does nothing if the scene collection is changing', () => {
            replicants.obsState = {
                scenes: [
                    'scene 1',
                    'scene 2',
                    'scene 3'
                ]
            };
            const service = new ObsConnectorService(mockNodecg);
            service['sceneCollectionChanging'] = true;

            // @ts-ignore
            service['handleSceneCreation']({
                sceneName: 'scene 2'
            });

            expect(replicants.obsState).toEqual({
                scenes: [
                    'scene 1',
                    'scene 2',
                    'scene 3'
                ]
            });
        });

        it('adds the new scene to the list of scenes', () => {
            replicants.obsState = {
                scenes: [
                    'scene 1',
                    'scene 2',
                    'scene 3'
                ]
            };
            const service = new ObsConnectorService(mockNodecg);
            service['sceneCollectionChanging'] = false;

            // @ts-ignore
            service['handleSceneCreation']({
                sceneName: 'scene 4'
            });

            expect(replicants.obsState).toEqual({
                scenes: [
                    'scene 1',
                    'scene 2',
                    'scene 3',
                    'scene 4'
                ]
            });
        });
    });

    describe('connect', () => {
        it('connects to the obs socket and loads the list of scenes', async () => {
            replicants.obsCredentials = {
                address: 'wss://obs-socket',
                password: 'test pwd'
            };
            const service = new ObsConnectorService(mockNodecg);
            jest.spyOn(service as any, 'reloadCurrentSceneCollection').mockResolvedValue(null);
            jest.spyOn(service as any, 'reloadSceneList').mockResolvedValue(null);

            await service.connect();

            expect(replicants.obsState).toEqual({ enabled: false, status: ObsStatus.CONNECTING });
            expect(OBSWebSocket.prototype.disconnect).toHaveBeenCalled();
            expect(OBSWebSocket.prototype.connect).toHaveBeenCalledWith('wss://obs-socket', 'test pwd');
            expect(service['reloadSceneList']).toHaveBeenCalled();
            expect(service['reloadCurrentSceneCollection']).toHaveBeenCalled();
        });

        it('starts reconnecting on connection failure', async () => {
            replicants.obsCredentials = {
                address: 'wss://obs-socket',
                password: 'test pwd'
            };
            const service = new ObsConnectorService(mockNodecg);
            const error = new Error('test error');
            Object.defineProperty(error, 'code', { value: 10000 });
            jest.spyOn(OBSWebSocket.prototype, 'connect').mockRejectedValue(error);
            jest.spyOn(service as any, 'reloadCurrentSceneCollection').mockResolvedValue(null);
            jest.spyOn(service as any, 'reloadSceneList').mockResolvedValue(null);
            jest.spyOn(service, 'startReconnecting');

            await expect(() => service.connect()).rejects.toThrow(new Error('Failed to connect to OBS: test error'));

            expect(replicants.obsState).toEqual({ enabled: false, status: ObsStatus.NOT_CONNECTED });
            expect(OBSWebSocket.prototype.disconnect).toHaveBeenCalled();
            expect(OBSWebSocket.prototype.connect).toHaveBeenCalledWith('wss://obs-socket', 'test pwd');
            expect(service.startReconnecting).toHaveBeenCalledWith(10000);
            expect(service['reloadSceneList']).not.toHaveBeenCalled();
            expect(service['reloadCurrentSceneCollection']).not.toHaveBeenCalled();
        });

        it('does not start reconnecting on error if specified in arguments', async () => {
            replicants.obsCredentials = {
                address: 'wss://obs-socket',
                password: 'test pwd'
            };
            const service = new ObsConnectorService(mockNodecg);
            jest.spyOn(OBSWebSocket.prototype, 'connect').mockRejectedValue(new Error('test error'));
            jest.spyOn(service as any, 'reloadCurrentSceneCollection').mockResolvedValue(null);
            jest.spyOn(service as any, 'reloadSceneList').mockResolvedValue(null);
            jest.spyOn(service, 'startReconnecting');

            await expect(() => service.connect(false))
                .rejects.toThrow(new Error('Failed to connect to OBS: test error'));

            expect(replicants.obsState).toEqual({ enabled: false, status: ObsStatus.NOT_CONNECTED });
            expect(OBSWebSocket.prototype.disconnect).toHaveBeenCalled();
            expect(OBSWebSocket.prototype.connect).toHaveBeenCalledWith('wss://obs-socket', 'test pwd');
            expect(service.startReconnecting).not.toHaveBeenCalled();
            expect(service['reloadSceneList']).not.toHaveBeenCalled();
            expect(service['reloadCurrentSceneCollection']).not.toHaveBeenCalled();
        });
    });

    describe('disconnect', () => {
        it('disconnects from socket and stops reconnecting', async () => {
            const service = new ObsConnectorService(mockNodecg);
            jest.spyOn(service, 'stopReconnecting');

            await service.disconnect();

            expect(service.stopReconnecting).toHaveBeenCalled();
            expect(OBSWebSocket.prototype.disconnect).toHaveBeenCalled();
        });
    });

    describe('reloadCurrentSceneCollection', () => {
        it('loads and updates the current scene collection', async () => {
            replicants.obsState = {};
            jest.spyOn(OBSWebSocket.prototype, 'call').mockResolvedValue({
                currentSceneCollectionName: 'scenes?',
                sceneCollections: [
                    'scenes?',
                    'scenes!'
                ]
            });
            const service = new ObsConnectorService(mockNodecg);

            await service['reloadCurrentSceneCollection']();

            expect(replicants.obsState).toEqual({
                currentSceneCollection: 'scenes?'
            });
        });
    });

    describe('reloadSceneList', () => {
        it('loads and updates scene data', async () => {
            jest.spyOn(OBSWebSocket.prototype, 'call').mockResolvedValue({
                currentProgramSceneName: 'scene1',
                scenes: [
                    { sceneName: 'scene1' },
                    { sceneName: 'scene2' },
                    { sceneName: 'scene3' }
                ]
            });
            const service = new ObsConnectorService(mockNodecg);
            jest.spyOn(service as any, 'setSceneList').mockReturnValue(null);

            await service['reloadSceneList']();

            expect(OBSWebSocket.prototype.call).toHaveBeenCalledWith('GetSceneList');
            expect((replicants.obsState as ObsState).currentScene).toEqual('scene1');
            expect(service['setSceneList']).toHaveBeenCalledWith(['scene1', 'scene2', 'scene3']);
        });
    });

    describe('startReconnecting', () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        it.each([4009, 4010, 4011])('does nothing if closure code is %d', code => {
            const service = new ObsConnectorService(mockNodecg);
            jest.spyOn(service, 'stopReconnecting');
            jest.spyOn(global, 'setInterval');

            service.startReconnecting(code);

            expect(service.stopReconnecting).not.toHaveBeenCalled();
            expect(global.setInterval).not.toHaveBeenCalled();
        });

        it('sets an interval to reconnect to the socket', () => {
            const service = new ObsConnectorService(mockNodecg);
            jest.spyOn(service, 'stopReconnecting');
            jest.spyOn(global, 'setInterval');
            jest.spyOn(service, 'connect');

            service.startReconnecting(null);

            expect(service.stopReconnecting).toHaveBeenCalledTimes(1);
            expect(global.setInterval).toHaveBeenCalledTimes(1);
            expect(service.connect).toHaveBeenCalledTimes(0);

            jest.advanceTimersByTime(10000);
            expect(service.connect).toHaveBeenCalledTimes(1);
            expect(service.connect).toHaveBeenCalledWith(false);
            jest.advanceTimersByTime(10000);
            expect(service.connect).toHaveBeenCalledTimes(2);
        });
    });

    describe('stopReconnecting', () => {
        it('clears the reconnection interval', () => {
            const service = new ObsConnectorService(mockNodecg);
            const interval = 'interval (test)';
            (service as any).reconnectionInterval = interval;
            (service as any).reconnectionCount = 100;
            jest.spyOn(global, 'clearInterval');

            service.stopReconnecting();

            expect(clearInterval).toHaveBeenCalledWith(interval);
            expect((service as any).reconnectionInterval).toBeNull();
            expect((service as any).reconnectionCount).toEqual(0);
        });
    });

    describe('setSceneList', () => {
        it('does nothing if an empty list is provided', () => {
            replicants.obsState = {
                gameplayScene: 'gameplay',
                intermissionScene: 'intermission'
            };
            const service = new ObsConnectorService(mockNodecg);

            service['setSceneList']([]);

            expect(replicants.obsState).toEqual({
                gameplayScene: 'gameplay',
                intermissionScene: 'intermission'
            });
            expect(mockNodecg.sendMessage).not.toHaveBeenCalled();
        });

        it('updates the gameplay scene and sends a message if the gameplay scene is no longer found', () => {
            replicants.obsState = {
                scenes: []
            };
            const service = new ObsConnectorService(mockNodecg);
            jest.spyOn(service, 'getCurrentSceneConfig').mockReturnValue({
                gameplayScene: 'gameplay',
                intermissionScene: 'intermission',
                sceneCollection: 'scenes'
            });
            jest.spyOn(service, 'updateSceneConfig').mockReturnValue(null);

            service['setSceneList']([
                'scene1',
                'intermission'
            ]);

            expect(service.updateSceneConfig).toHaveBeenCalledWith({
                gameplayScene: 'scene1',
                intermissionScene: 'intermission'
            });
            expect(replicants.obsState).toEqual({
                scenes: [
                    'scene1',
                    'intermission'
                ]
            });
            expect(mockNodecg.sendMessage).toHaveBeenCalledWith('obsSceneConfigurationChangedAfterUpdate');
        });

        it('updates the intermission scene and sends a message if the intermission scene is no longer found', () => {
            replicants.obsState = {
                scenes: []
            };
            const service = new ObsConnectorService(mockNodecg);
            jest.spyOn(service, 'getCurrentSceneConfig').mockReturnValue({
                gameplayScene: 'gameplay',
                intermissionScene: 'intermission',
                sceneCollection: 'scenes'
            });
            jest.spyOn(service, 'updateSceneConfig').mockReturnValue(null);

            service['setSceneList']([
                'gameplay',
                'scene2'
            ]);

            expect(service.updateSceneConfig).toHaveBeenCalledWith({
                gameplayScene: 'gameplay',
                intermissionScene: 'scene2'
            });
            expect(replicants.obsState).toEqual({
                scenes: [
                    'gameplay',
                    'scene2'
                ]
            });
            expect(mockNodecg.sendMessage).toHaveBeenCalledWith('obsSceneConfigurationChangedAfterUpdate');
        });

        it('updates the list of scenes', () => {
            replicants.obsState = {
                scenes: [
                    'gameplay',
                    'intermission'
                ]
            };
            const service = new ObsConnectorService(mockNodecg);
            jest.spyOn(service, 'getCurrentSceneConfig').mockReturnValue({
                gameplayScene: 'gameplay',
                intermissionScene: 'intermission',
                sceneCollection: 'scenes'
            });
            jest.spyOn(service, 'updateSceneConfig').mockReturnValue(null);

            service['setSceneList']([
                'gameplay',
                'intermission',
                'new scene'
            ]);

            expect(service.updateSceneConfig).not.toHaveBeenCalled();
            expect(replicants.obsState).toEqual({
                scenes: [
                    'gameplay',
                    'intermission',
                    'new scene'
                ]
            });
            expect(mockNodecg.sendMessage).not.toHaveBeenCalled();
        });
    });

    describe('updateSceneConfig', () => {
        it.each([
            ['scene1', 'scene3'],
            ['scene3', 'scene1']
        ])('throws an error if the gameplay scene is not found (%#)', (gameplayScene, intermissionScene) => {
            replicants.obsState = {
                scenes: ['scene1', 'scene2']
            };
            const service = new ObsConnectorService(mockNodecg);

            expect(() => service.updateSceneConfig({ gameplayScene, intermissionScene }))
                .toThrow(new Error('Could not find one or more of the provided scenes.'));
        });

        it('updates existing obs configuration items', () => {
            replicants.obsState = {
                scenes: ['scene1', 'scene2'],
                currentSceneCollection: 'cool scenes'
            };
            replicants.obsConfig = [
                {
                    sceneCollection: 'cool scenes3',
                    gameplayScene: 'gameplay',
                    intermissionScene: 'intermission',
                },
                {
                    sceneCollection: 'cool scenes 2',
                    gameplayScene: 'gameplay',
                    intermissionScene: 'intermission',
                },
                {
                    sceneCollection: 'cool scenes',
                    gameplayScene: 'gameplay',
                    intermissionScene: 'intermission',
                }
            ];
            const service = new ObsConnectorService(mockNodecg);

            service.updateSceneConfig({ gameplayScene: 'scene1', intermissionScene: 'scene2' });

            expect(replicants.obsConfig).toEqual([
                {
                    sceneCollection: 'cool scenes3',
                    gameplayScene: 'gameplay',
                    intermissionScene: 'intermission',
                },
                {
                    sceneCollection: 'cool scenes 2',
                    gameplayScene: 'gameplay',
                    intermissionScene: 'intermission',
                },
                {
                    sceneCollection: 'cool scenes',
                    gameplayScene: 'scene1',
                    intermissionScene: 'scene2',
                }
            ]);
        });

        it('can partially update existing configuration items', () => {
            replicants.obsState = {
                scenes: ['scene1', 'scene2'],
                currentSceneCollection: 'cool scenes'
            };
            replicants.obsConfig = [
                {
                    sceneCollection: 'cool scenes',
                    gameplayScene: 'gameplay',
                    intermissionScene: 'intermission',
                }
            ];
            const service = new ObsConnectorService(mockNodecg);

            service.updateSceneConfig({ gameplayScene: 'scene1' });

            expect(replicants.obsConfig).toEqual([
                {
                    sceneCollection: 'cool scenes',
                    gameplayScene: 'scene1',
                    intermissionScene: 'intermission',
                }
            ]);
        });

        it('adds obs configuration items if they are not already present', () => {
            replicants.obsState = {
                scenes: ['scene1', 'scene2'],
                currentSceneCollection: 'cool scenes'
            };
            replicants.obsConfig = [
                {
                    sceneCollection: 'cool scenes3',
                    gameplayScene: 'gameplay',
                    intermissionScene: 'intermission',
                },
                {
                    sceneCollection: 'cool scenes 2',
                    gameplayScene: 'gameplay',
                    intermissionScene: 'intermission',
                }
            ];
            const service = new ObsConnectorService(mockNodecg);

            service.updateSceneConfig({ gameplayScene: 'scene1', intermissionScene: 'scene2' });

            expect(replicants.obsConfig).toEqual([
                {
                    sceneCollection: 'cool scenes3',
                    gameplayScene: 'gameplay',
                    intermissionScene: 'intermission',
                },
                {
                    sceneCollection: 'cool scenes 2',
                    gameplayScene: 'gameplay',
                    intermissionScene: 'intermission',
                },
                {
                    sceneCollection: 'cool scenes',
                    gameplayScene: 'scene1',
                    intermissionScene: 'scene2',
                }
            ]);
        });
    });
});
