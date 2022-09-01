import { ObsConnectorService } from '../../services/ObsConnectorService';
import { ObsConnectorController } from '../ObsConnectorController';
import { mock } from 'jest-mock-extended';
import { mockNodecg, replicants } from '../../__mocks__/mockNodecg';
import { controllerListeners } from '../../__mocks__/MockBaseController';

describe('ObsConnectorController', () => {
    let obsConnectorService: ObsConnectorService;

    beforeEach(() => {
        obsConnectorService = mock<ObsConnectorService>();
        new ObsConnectorController(mockNodecg, obsConnectorService);
    });

    describe('connectToObs', () => {
        it('re-assigns credentials and throws an error if obs integration is disabled', async () => {
            replicants.obsState = {
                enabled: false
            };

            await expect(() => controllerListeners.connectToObs({
                address: 'localhost:9090',
                password: 'test pwd'
            })).rejects.toThrow(new Error('OBS integration is disabled.'));

            expect(replicants.obsCredentials).toEqual({
                address: 'localhost:9090',
                password: 'test pwd'
            });
            expect(obsConnectorService.stopReconnecting).not.toHaveBeenCalled();
            expect(obsConnectorService.connect).not.toHaveBeenCalled();
        });

        it('connects to OBS if integration is enabled', async () => {
            replicants.obsState = {
                enabled: true
            };

            await controllerListeners.connectToObs({
                address: 'localhost:10284',
                password: 'test pwd2'
            });

            expect(replicants.obsCredentials).toEqual({
                address: 'localhost:10284',
                password: 'test pwd2'
            });
            expect(obsConnectorService.stopReconnecting).toHaveBeenCalled();
            expect(obsConnectorService.connect).toHaveBeenCalled();
        });
    });

    describe('setObsConfig', () => {
        it('re-assigns the gameplay and intermission scenes', () => {
            controllerListeners.setObsConfig({ gameplayScene: 'scene2', intermissionScene: 'scene3' });

            expect(obsConnectorService.updateSceneConfig)
                .toHaveBeenCalledWith({ gameplayScene: 'scene2', intermissionScene: 'scene3' });
        });
    });

    describe('setObsSocketEnabled', () => {
        it('throws an error if the required arguments are not provided', async () => {
            await expect(() => controllerListeners.setObsSocketEnabled())
                .rejects.toThrow(new Error('Invalid arguments.'));
            expect(obsConnectorService.disconnect).not.toHaveBeenCalled();
            expect(obsConnectorService.connect).not.toHaveBeenCalled();
        });

        it('disconnects from obs when disabling the socket', async () => {
            replicants.obsState = {};

            await controllerListeners.setObsSocketEnabled(false);

            expect(replicants.obsState).toEqual({
                enabled: false
            });
            expect(obsConnectorService.disconnect).toHaveBeenCalled();
            expect(obsConnectorService.connect).not.toHaveBeenCalled();
        });

        it('connects to obs when enabling the socket', async () => {
            replicants.obsState = {};

            await controllerListeners.setObsSocketEnabled(true);

            expect(replicants.obsState).toEqual({
                enabled: true
            });
            expect(obsConnectorService.connect).toHaveBeenCalled();
            expect(obsConnectorService.disconnect).not.toHaveBeenCalled();
        });
    });
});
