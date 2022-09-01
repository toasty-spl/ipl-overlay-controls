import { ObsCredentials } from '../schemas';
import { SetObsConfigRequest } from './obs';

export interface MessageInputMap {
    connectToObs: ObsCredentials
    setObsConfig: SetObsConfigRequest
    setObsSocketEnabled: boolean

    startGame: never
    endGame: never
    fastForwardToNextGameAutomationTask: never
    cancelAutomationAction: never
}

export interface MessageResultMap {
    [name: string]: void
}
