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

        this.listen('setObsConfig', data => {
            obsConnectorService.updateSceneConfig({
                intermissionScene: data.intermissionScene,
                gameplayScene: data.gameplayScene
            });
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
