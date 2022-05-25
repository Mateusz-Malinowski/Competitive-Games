import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import { getTimeString as utilGetTimeString, padNumber } from "../../../../global/utilities";

export interface TimerState {
  isTicking: boolean;
  interval: number | undefined;
  startTime: number;
  totalMiliseconds: number;
}

const state = (): TimerState => ({
  isTicking: false,
  interval: undefined,
  startTime: 0,
  totalMiliseconds: 0
});

const getters: GetterTree<TimerState, {}> = {
  getMiliseconds(state: TimerState): string {
    const miliseconds = Math.floor(state.totalMiliseconds % 1000);
    return padNumber(miliseconds, 3);
  },
  getSeconds(state: TimerState): string {
    const seconds = Math.floor((state.totalMiliseconds / 1000) % 60);
    return padNumber(seconds, 2);
  },
  getMinutes(state: TimerState): string {
    const minutes = Math.floor((state.totalMiliseconds / 1000 / 60) % 60);
    return padNumber(minutes, 2);
  },
  getHours(state: TimerState): string {
    const hours = Math.floor((state.totalMiliseconds / 1000 / 60 / 60) % 60);
    return padNumber(hours, 2);
  },
  getTimeString(state: TimerState): string {
    return utilGetTimeString(state.totalMiliseconds);
  }
}

const mutations: MutationTree<TimerState> = {
  setStartTime(state: TimerState, time: number): void {
    state.startTime = time;
  },
  setTotalMiliseconds(state: TimerState, time: number): void {
    state.totalMiliseconds = time;
  },
  setIsTicking(state: TimerState, value: boolean): void {
    state.isTicking = value;
  },
  setInterval(state: TimerState, interval: number): void {
    state.interval = interval;
  },
}

const actions: ActionTree<TimerState, {}> = {
  start({ state, commit, dispatch }: ActionContext<TimerState, {}>): void {
    if (state.isTicking) return;

    const startTime = Date.now() - state.totalMiliseconds;
    commit('setStartTime', startTime);
    
    const interval = setInterval((): void => {
      dispatch('tick');
    }, 1);

    commit('setInterval', interval);
    commit('setIsTicking', true);
  },
  stop({ state, commit }: ActionContext<TimerState, {}>): void {
    if (!state.isTicking) return;

    clearInterval(state.interval);
    commit('setIsTicking', false);
  },
  reset({ commit }: ActionContext<TimerState, {}>): void {
    commit('setTotalMiliseconds', 0);
    commit('setStartTime', Date.now());
  },
  tick({ state, commit }: ActionContext<TimerState, {}>): void {
    commit('setTotalMiliseconds', Date.now() - state.startTime);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}