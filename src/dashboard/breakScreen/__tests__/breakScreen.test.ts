import BreakScreen from '../breakScreen.vue';
import { config, mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { BreakScreenStore, breakScreenStoreKey } from '../breakScreenStore';

describe('BreakScreen', () => {
    config.global.stubs = {
        IplButton: true,
        IplInput: true,
        IplCheckbox: true,
        NextStageTimeInput: true
    };

    function createBreakScreenStore() {
        return createStore<BreakScreenStore>({
            state: {
                mainFlavorText: null,
                nextRoundStartTime: { startTime: null, isVisible: null },
                activeBreakScene: null
            }
        });
    }

    it('disabled expected button if active scene is main', () => {
        const store = createBreakScreenStore();
        store.state.activeBreakScene = 'main';
        const wrapper = mount(BreakScreen, {
            global: {
                plugins: [[store, breakScreenStoreKey]]
            }
        });

        expect(wrapper.getComponent('[data-test="show-main-button"]').attributes().disabled).toEqual('true');
        expect(wrapper.getComponent('[data-test="show-teams-button"]').attributes().disabled).toEqual('false');
        expect(wrapper.getComponent('[data-test="show-stages-button"]').attributes().disabled).toEqual('false');
    });

    it('disabled expected button if active scene is teams', () => {
        const store = createBreakScreenStore();
        store.state.activeBreakScene = 'teams';
        const wrapper = mount(BreakScreen, {
            global: {
                plugins: [[store, breakScreenStoreKey]]
            }
        });

        expect(wrapper.getComponent('[data-test="show-main-button"]').attributes().disabled).toEqual('false');
        expect(wrapper.getComponent('[data-test="show-teams-button"]').attributes().disabled).toEqual('true');
        expect(wrapper.getComponent('[data-test="show-stages-button"]').attributes().disabled).toEqual('false');
    });

    it('disabled expected button if active scene is stages', () => {
        const store = createBreakScreenStore();
        store.state.activeBreakScene = 'stages';
        const wrapper = mount(BreakScreen, {
            global: {
                plugins: [[store, breakScreenStoreKey]]
            }
        });

        expect(wrapper.getComponent('[data-test="show-main-button"]').attributes().disabled).toEqual('false');
        expect(wrapper.getComponent('[data-test="show-teams-button"]').attributes().disabled).toEqual('false');
        expect(wrapper.getComponent('[data-test="show-stages-button"]').attributes().disabled).toEqual('true');
    });

    it('updates main flavor text on store change', async () => {
        const store = createBreakScreenStore();
        store.state.mainFlavorText = 'hello!!!';
        const wrapper = mount(BreakScreen, {
            global: {
                plugins: [[store, breakScreenStoreKey]]
            }
        });

        store.state.mainFlavorText = 'new text!!!';
        await wrapper.vm.$nextTick();

        expect(wrapper.getComponent('[name="break-main-flavor-text"]').attributes().modelvalue).toEqual('new text!!!');
    });

    it('does not update main flavor text on store change if input is focused', async () => {
        const store = createBreakScreenStore();
        store.state.mainFlavorText = 'hello!!!';
        const wrapper = mount(BreakScreen, {
            global: {
                plugins: [[store, breakScreenStoreKey]]
            }
        });
        const flavorTextInput = wrapper.getComponent('[name="break-main-flavor-text"]');

        flavorTextInput.vm.$emit('focuschange', true);
        store.state.mainFlavorText = 'new text!!!';
        await wrapper.vm.$nextTick();

        expect(flavorTextInput.attributes().modelvalue).toEqual('hello!!!');
    });

    it('updates next round time on store change', async () => {
        const store = createBreakScreenStore();
        store.state.nextRoundStartTime = { startTime: '2020-05-12', isVisible: true };
        const wrapper = mount(BreakScreen, {
            global: {
                plugins: [[store, breakScreenStoreKey]]
            }
        });

        store.state.nextRoundStartTime.startTime = '2021-03-09';
        await wrapper.vm.$nextTick();

        expect(wrapper.getComponent('[data-test="next-stage-time-input"]').attributes().modelvalue).toEqual('2021-03-09');
    });

    it('does not update next round time on store change if input is focused', async () => {
        const store = createBreakScreenStore();
        store.state.nextRoundStartTime = { startTime: '2020-05-12', isVisible: true };
        const wrapper = mount(BreakScreen, {
            global: {
                plugins: [[store, breakScreenStoreKey]]
            }
        });
        const nextStageTimeInput = wrapper.getComponent('[data-test="next-stage-time-input"]');

        nextStageTimeInput.vm.$emit('focuschange', true);
        store.state.nextRoundStartTime.startTime = '2021-03-09';
        await wrapper.vm.$nextTick();

        expect(nextStageTimeInput.attributes().modelvalue).toEqual('2020-05-12');
    });
});
