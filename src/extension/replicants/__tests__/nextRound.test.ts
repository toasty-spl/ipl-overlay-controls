import { mock } from 'jest-mock-extended';
import type * as NextRoundHelper from '../../helpers/nextRoundHelper';
const mockNextRoundHelper = mock<typeof NextRoundHelper>();
jest.mock('../../helpers/nextRoundHelper', () => mockNextRoundHelper);

import '../nextRound';
import { messageListeners } from '../../__mocks__/mockNodecg';

describe('nextRound', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('setNextRound', () => {
        it('sets teams', () => {
            const ack = jest.fn();

            messageListeners.setNextRound({ teamAId: '345234', teamBId: '452523' }, ack);

            expect(mockNextRoundHelper.setNextRoundTeams).toHaveBeenCalledWith('345234', '452523');
            expect(ack).toHaveBeenCalledWith(null);
        });

        it('sets rounds if given', () => {
            const ack = jest.fn();

            messageListeners.setNextRound({ teamAId: '365244', teamBId: '425235', roundId: '23424' }, ack);

            expect(mockNextRoundHelper.setNextRoundTeams).toHaveBeenCalledWith('365244', '425235');
            expect(mockNextRoundHelper.setNextRoundGames).toHaveBeenCalledWith('23424');
            expect(ack).toHaveBeenCalledWith(null);
        });

        it('handles errors', () => {
            const ack = jest.fn();
            const error = new Error('An error has occurred.');
            mockNextRoundHelper.setNextRoundTeams.mockImplementation(() => {
                throw error;
            });

            messageListeners.setNextRound({ teamAId: '24142', teamBId: '14124324' }, ack);

            expect(ack).toHaveBeenCalledWith(error);
        });
    });
});
