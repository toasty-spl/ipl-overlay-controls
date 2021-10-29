import { tournamentDataStore } from '../tournamentDataStore';
import { mockSendMessage } from '../../__mocks__/mockNodecg';
import { TournamentDataSource } from 'types/enums/tournamentDataSource';

describe('tournamentDataStore', () => {
    describe('setState', () => {
        it('updates state', () => {
            tournamentDataStore.commit('setState', { name: 'roundStore', val: { foo: 'bar' } });

            expect(tournamentDataStore.state.roundStore).toEqual({ foo: 'bar' });
        });
    });

    describe('setTeamImageHidden', () => {
        it('sends message to extension', () => {
            tournamentDataStore.commit('setTeamImageHidden', { teamId: '1234', isVisible: true });

            expect(mockSendMessage).toHaveBeenCalledWith('toggleTeamImage', { teamId: '1234', isVisible: true });
        });
    });

    describe('getTournamentData', () => {
        it('sends message to extension', async () => {
            await tournamentDataStore.dispatch('getTournamentData', {
                method: TournamentDataSource.UPLOAD,
                id: 'tournament___'
            });

            expect(mockSendMessage).toHaveBeenCalledWith('getTournamentData', {
                method: TournamentDataSource.UPLOAD,
                id: 'tournament___'
            });
        });
    });

    describe('getSmashggEvent', () => {
        it('sends message to extension', async () => {
            await tournamentDataStore.dispatch('getSmashggEvent', {
                eventId: 123123
            });

            expect(mockSendMessage).toHaveBeenCalledWith('getSmashggEvent', {
                eventId: 123123
            });
        });
    });

    describe('uploadTeamData', () => {
        it('sends file to local endpoint', async () => {
            const file = new File([], 'new-file.json');
            const expectedFormData = new FormData();
            expectedFormData.append('file', file);
            expectedFormData.append('jsonType', 'teams');
            global.fetch = jest.fn().mockResolvedValue({ status: 200 });

            await tournamentDataStore.dispatch('uploadTeamData', { file });

            expect(fetch).toHaveBeenCalledWith('/ipl-overlay-controls/upload-tournament-json', {
                method: 'POST',
                body: expectedFormData
            });
        });

        it('throws error on bad status', async () => {
            expect.assertions(2);

            const file = new File([], 'new-file.json');
            const expectedFormData = new FormData();
            expectedFormData.append('file', file);
            expectedFormData.append('jsonType', 'teams');
            global.fetch = jest.fn().mockResolvedValue({ status: 500 });

            try {
                await tournamentDataStore.dispatch('uploadTeamData', { file });
            } catch (e) {
                expect(e.message).toEqual('Import failed with status 500');
                expect(fetch).toHaveBeenCalledWith('/ipl-overlay-controls/upload-tournament-json', {
                    method: 'POST',
                    body: expectedFormData
                });
            }
        });
    });

    describe('uploadRoundData', () => {
        it('sends file to local endpoint', async () => {
            const file = new File([], 'new-file.json');
            const expectedFormData = new FormData();
            expectedFormData.append('file', file);
            expectedFormData.append('jsonType', 'rounds');
            global.fetch = jest.fn().mockResolvedValue({ status: 200 });

            await tournamentDataStore.dispatch('uploadRoundData', { file });

            expect(fetch).toHaveBeenCalledWith('/ipl-overlay-controls/upload-tournament-json', {
                method: 'POST',
                body: expectedFormData
            });
        });

        it('throws error on bad status', async () => {
            expect.assertions(2);

            const file = new File([], 'new-file.json');
            const expectedFormData = new FormData();
            expectedFormData.append('file', file);
            expectedFormData.append('jsonType', 'rounds');
            global.fetch = jest.fn().mockResolvedValue({ status: 500 });

            try {
                await tournamentDataStore.dispatch('uploadRoundData', { file });
            } catch (e) {
                expect(e.message).toEqual('Import failed with status 500');
                expect(fetch).toHaveBeenCalledWith('/ipl-overlay-controls/upload-tournament-json', {
                    method: 'POST',
                    body: expectedFormData
                });
            }
        });
    });
});
