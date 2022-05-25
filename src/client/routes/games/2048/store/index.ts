import { InjectionKey } from 'vue';
import { createStore, ModuleTree, Store, useStore as vuexUseStore } from 'vuex';
import board, { BoardState } from './modules/board';
import game, { GameState } from './modules/game';
import timer, { TimerState } from '../../../../shared/store/modules/timer';

export interface RootState {
  game: GameState;
  board: BoardState;
  timer: TimerState;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useStore(): Store<RootState> {
  return vuexUseStore(key);
}

const modules: ModuleTree<RootState> = {
  game,
  board,
  timer
}

export default createStore<RootState>({
  modules,
});