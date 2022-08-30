import type { NodeCG } from 'nodecg/server';
import { BaseController } from './BaseController';
import { ObsConnectorService } from '../services/ObsConnectorService';
import { ObsCredentials, ObsState } from '../../types/schemas';

export class ObsConnectorController extends BaseController {
    constructor(nodecg: NodeCG, obsConnectorService: ObsConnectorService) {
        super(nodecg);

        const obsCredentials = nodecg.Replicant<ObsCredentials>('obsCredentials');
        const obsState = nodecg.Replicant<ObsState>('obsState');

        this.listen('connectToObs', async (data) => {
            obsCredentials.value = data;

            if (!obsState.value.enabled) {
                throw new Error('OBS integration is disabled.');
            }

            obsConnectorService.stopReconnecting();
            await obsConnectorService.connect();
        });

        this.listen('setObsData', data => {
            if (!obsState.value.scenes?.some(scene => scene === data.gameplayScene)
                || !obsState.value.scenes?.some(scene => scene === data.intermissionScene)) {
                throw new Error('Could not find one or more of the provided scenes.');
            }

            obsState.value = {
                ...obsState.value,
                gameplayScene: data.gameplayScene,
                intermissionScene: data.intermissionScene
            };
        });

        this.listen('setObsSocketEnabled', async (enabled) => {
            if (enabled == null) {
                throw new Error('Invalid arguments.');
            }
            obsState.value.enabled = enabled;
            if (!enabled) {
                await obsConnectorService.disconnect();
            } else {
                await obsConnectorService.connect();
            }
        });
    }
}
