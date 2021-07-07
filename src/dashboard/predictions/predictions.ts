import { hideElement, showElement } from '../globalScripts';
import { PredictionStore } from 'schemas';
import { setImportStatus } from '../importStatus';
import { ImportStatus } from 'types/importStatus';
import { PredictionStatus } from 'types/predictionStatus';

const predictionDataStatusElem = document.getElementById('prediction-data-status');
const optionABarElem = document.getElementById('option-a-bar');
const optionBBarElem = document.getElementById('option-b-bar');
const optionATitleElem = document.getElementById('option-a-title');
const optionBTitleElem = document.getElementById('option-b-title');
const optionAPercentageElem = document.getElementById('option-a-percent');
const optionBPercentageElem = document.getElementById('option-b-percent');
const predictionStatusElem = document.getElementById('prediction-status');
const predictionPointCountElem = document.getElementById('prediction-point-count');

const unsupportedGuildWarning = document.getElementById('unsupported-service-message');
const currentPredictionSpace = document.getElementById('current-prediction-space');
const predictionGetSpace = document.getElementById('prediction-get-space');

const createPredictionBtn = document.getElementById('create-prediction-btn');
const resolvePredictionBtn = document.getElementById('resolve-prediction-btn');
const lockPredictionBtn = document.getElementById('lock-prediction-btn');
const cancelPredictionBtn = document.getElementById('cancel-prediction-btn');
const getPredictionsBtn = document.getElementById('get-predictions-btn');

const predictionStore = nodecg.Replicant<PredictionStore>('predictionStore');

const predictionButtons = [lockPredictionBtn, cancelPredictionBtn, resolvePredictionBtn, createPredictionBtn];
const visibleButtonsForPredictionStatus: {[key in PredictionStatus]: HTMLElement[]} = {
    [PredictionStatus.ACTIVE]: [lockPredictionBtn, cancelPredictionBtn],
    [PredictionStatus.LOCKED]: [resolvePredictionBtn, cancelPredictionBtn],
    [PredictionStatus.RESOLVED]: [createPredictionBtn],
    [PredictionStatus.CANCELLED]: [createPredictionBtn],
};

function getArrayDifference<T>(arr1: T[], arr2: T[]): T[] {
    return arr1.filter(elem => !arr2.includes(elem));
}

predictionStore.on('change', newValue => {
    if (newValue.enablePrediction) {
        hideElement(unsupportedGuildWarning);
        showElement(currentPredictionSpace);
        showElement(predictionGetSpace);
        // Display info on current prediction
        if (newValue.currentPrediction) {
            const prediction = newValue.currentPrediction;
            const totalChannelPoints = prediction.outcomes[0].channel_points + prediction.outcomes[1].channel_points;
            const optionAPercentage = Math.round((prediction.outcomes[0].channel_points / totalChannelPoints) * 100);
            const optionBPercentage = Math.round((prediction.outcomes[1].channel_points / totalChannelPoints) * 100);
            // Set bar width
            optionABarElem.style.width = (isNaN(optionAPercentage) ? '0%' : `${optionAPercentage}%`);
            optionBBarElem.style.width = (isNaN(optionBPercentage) ? '0%' : `${optionBPercentage}%`);
            // Set text
            optionATitleElem.innerText = prediction.outcomes[0].title;
            optionBTitleElem.innerText = prediction.outcomes[1].title;
            optionAPercentageElem.innerText = (isNaN(optionAPercentage) ? '?%' : `${optionAPercentage}%`);
            optionBPercentageElem.innerText = (isNaN(optionBPercentage) ? '?%' : `${optionBPercentage}%`);
            predictionStatusElem.innerText = prediction.status.toLowerCase();
            predictionPointCountElem.innerText = `${totalChannelPoints} points predicted`;
            // Show/Hide necessary buttons
            const visibleButtons =
                visibleButtonsForPredictionStatus[newValue.currentPrediction.status as PredictionStatus];
            const hiddenButtons = getArrayDifference(predictionButtons, visibleButtons);
            hiddenButtons.forEach(btn => hideElement(btn));
            visibleButtons.forEach(btn => showElement(btn));
        }
    } else {
        showElement(unsupportedGuildWarning);
        hideElement(currentPredictionSpace);
        hideElement(predictionGetSpace);
    }
});

getPredictionsBtn.onclick = () => {
    setImportStatus(ImportStatus.Loading, predictionDataStatusElem);
    nodecg.sendMessage('getPredictions', {}, (e) => {
        // If we get an error
        if (e) {
            console.error(e);
            setImportStatus(ImportStatus.Failure, predictionDataStatusElem);
            return;
        }
        // If we get success
        setImportStatus(ImportStatus.Success, predictionDataStatusElem);
    });
};
