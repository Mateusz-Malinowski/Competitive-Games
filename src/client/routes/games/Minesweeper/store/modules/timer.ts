import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState } from "..";
import { getTimeString as utilGetTimeString, padNumber } from "../../../../../../global/utilities";

export interface TimerState {
  isTicking: boolean;
  interval: number | undefined;
  startTime: number;
  currentTime: number;
}

const state = (): TimerState => ({
  isTicking: false,
  interval: undefined,
  startTime: 0,
  currentTime: 0
});

const getters: GetterTree<TimerState, RootState> = {
  getTotalMiliseconds(state: TimerState): number {
    return state.currentTime - state.startTime;
  },
  getMiliseconds(state: TimerState, getters: any): string {
    const miliseconds = Math.floor(getters.getTotalMiliseconds % 1000);
    return padNumber(miliseconds, 3);
  },
  getSeconds(state: TimerState, getters: any): string {
    const seconds = Math.floor((getters.getTotalMiliseconds / 1000) % 60);
    return padNumber(seconds, 2);
  },
  getMinutes(state: TimerState, getters: any): string {
    const minutes = Math.floor((getters.getTotalMiliseconds / 1000 / 60) % 60);
    return padNumber(minutes, 2);
  },
  getHours(state: TimerState, getters: any): string {
    const hours = Math.floor((getters.getTotalMiliseconds / 1000 / 60 / 60) % 60);
    return padNumber(hours, 2);
  },
  getTimeString(state: TimerState, getters: any): string {
    return utilGetTimeString(getters.getTotalMiliseconds);
  }
}

const mutations: MutationTree<TimerState> = {
  setStartTime(state: TimerState, time: number): void {
    state.startTime = time;
  },
  setCurrentTime(state: TimerState, time: number): void {
    state.currentTime = time;
  },
  setIsTicking(state: TimerState, value: boolean): void {
    state.isTicking = value;
  },
  setInterval(state: TimerState, interval: number): void {
    state.interval = interval;
  },
}

const actions: ActionTree<TimerState, RootState> = {
  start({ state, commit, dispatch }: ActionContext<TimerState, RootState>): void {
    if (state.isTicking) return;

    const interval = setInterval((): void => {
      dispatch('tick');
    }, 1);

    const time = Date.now();
    commit('setStartTime', time);
    commit('setCurrentTime', time);
    commit('setInterval', interval);
    commit('setIsTicking', true);
  },
  stop({ state, commit }: ActionContext<TimerState, RootState>): void {
    if (!state.isTicking) return;

    clearInterval(state.interval);
    commit('setIsTicking', false);
  },
  reset({ state, commit }: ActionContext<TimerState, RootState>): void {
    commit('setStartTime', state.currentTime);
  },
  tick({ commit }: ActionContext<TimerState, RootState>): void {
    commit('setCurrentTime', Date.now());
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}