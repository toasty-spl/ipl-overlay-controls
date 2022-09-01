import { NodeCGBrowser } from 'nodecg/browser';
import { GameAutomationData, ObsCredentials, ObsState, ObsConfig } from 'schemas';
import { SetObsConfigRequest } from 'types/messages/obs';
import { defineStore } from 'pinia';

const obsState = nodecg.Replicant<ObsState>('obsState');
const obsCredentials = nodecg.Replicant<ObsCredentials>('obsCredentials');
const obsConfig = nodecg.Replicant<ObsConfig>('obsConfig');
const gameAutomationData = nodecg.Replicant<GameAutomationData>('gameAutomationData');

export const obsReps = [obsState, obsCredentials, obsConfig, gameAutomationData];

export interface ObsStore {
    obsState: ObsState
    obsCredentials: ObsCredentials
    obsConfig: ObsConfig
    gameAutomationData: GameAutomationData
}

export const useObsStore = defineStore('obs', {
    state: (): ObsStore => ({
        obsState: null,
        obsCredentials: null,
        obsConfig: null,
        gameAutomationData: null
    }),
    actions: {
        async connect({ address, password }: { address: string, password?: string }): Promise<void> {
            return nodecg.sendMessage('connectToObs', { address, password });
        },
        async setData(data: SetObsConfigRequest): Promise<void> {
            return nodecg.sendMessage('setObsConfig', data);
        },
        async startGame(): Promise<void> {
            return nodecg.sendMessage('startGame');
        },
        async endGame(): Promise<void> {
            return nodecg.sendMessage('endGame');
        },
        async fastForwardToNextGameAutomationTask(): Promise<void> {
            return nodecg.sendMessage('fastForwardToNextGameAutomationTask');
        },
        setEnabled(enabled: boolean): Promise<void> {
            return nodecg.sendMessage('setObsSocketEnabled', enabled);
        }
    },
    getters: {
        currentSceneConfig: state =>
            state.obsConfig?.find(item => item.sceneCollection === state.obsState.currentSceneCollection)
            ?? { sceneCollection: state.obsState.currentSceneCollection, intermissionScene: null, gameplayScene: null }
    }
});
