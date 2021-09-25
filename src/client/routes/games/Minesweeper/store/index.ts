import { InjectionKey } from 'vue';
import { createStore, ModuleTree, Store, useStore as vuexUseStore } from 'vuex';
import map, { MapState } from './modules/map';
import timer, { TimerState } from './modules/timer';

export interface RootState {
  map: MapState;
  timer: TimerState;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useStore(): Store<RootState> {
  return vuexUseStore(key);
}

const modules: ModuleTree<RootState> = {
  map: map,
  timer: timer
}

export default createStore<RootState>({
  modules,
});