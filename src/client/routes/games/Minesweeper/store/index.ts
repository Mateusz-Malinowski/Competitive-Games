import { InjectionKey } from 'vue';
import { createStore, ModuleTree, Store, useStore as vuexUseStore } from 'vuex';
import map, { MapState } from './modules/map';
import timer, { TimerState } from '../../../../shared/store/modules/timer';
import game, { GameState } from './modules/game';

export interface RootState {
  map: MapState;
  timer: TimerState;
  game: GameState;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useStore(): Store<RootState> {
  return vuexUseStore(key);
}

const modules: ModuleTree<RootState> = {
  map: map,
  timer: timer,
  game: game
}

export default createStore<RootState>({
  modules,
});