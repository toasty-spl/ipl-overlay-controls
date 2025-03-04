import { RoundStore } from 'schemas';
import { generateId } from '../../helpers/generateId';
import { ImporterRound } from 'types/importer';
import { PlayType } from '../../types/enums/playType';
import { GameVersion } from '../../types/enums/gameVersion';
import { perGameData } from '../../helpers/gameData/gameData';
import { toLower } from 'lodash';
import { RoundGame } from '../../types/schemas';
import { Locale } from '../../types/enums/Locale';

export function handleRoundData(rounds: ImporterRound[], gameVersion: GameVersion): RoundStore {
    const result: RoundStore = {};

    for (let i = 0; i < rounds.length; i++) {
        const round = rounds[i];
        const games: RoundGame[] = [];
        const roundGames = round.games == null ? round.maps : round.games;

        if (!roundGames) continue;

        for (let j = 0; j < roundGames.length; j++) {
            const game = roundGames[j];
            const stageName = game.stage == null ? game.map : game.stage;

            games.push({
                stage: normalizeStageName(stageName, gameVersion),
                mode: normalizeModeName(game.mode, gameVersion)
            });
        }

        result[generateId()] = {
            meta: {
                name: round.name,
                isCompleted: false,
                type: Object.values(PlayType).includes(round.type) ? round.type : PlayType.BEST_OF
            },
            games
        };
    }

    return result;
}

function normalizeStageName(name: string, game: GameVersion): string {
    const stages = Object.values(perGameData[game].stages[Locale.EN]);
    const lowerCaseStages = stages.map(toLower);
    name = name.toLowerCase();

    if (!lowerCaseStages.includes(name)) {
        return 'Unknown Stage';
    }

    return stages[lowerCaseStages.indexOf(name)];
}

function normalizeModeName(name: string, game: GameVersion): string {
    const modes = Object.values(perGameData[game].modes[Locale.EN]);
    const lowerCaseModes = modes.map(toLower);
    name = name.toLowerCase();

    if (!lowerCaseModes.includes(name)) {
        return 'Unknown Mode';
    }

    return modes[lowerCaseModes.indexOf(name)];
}
