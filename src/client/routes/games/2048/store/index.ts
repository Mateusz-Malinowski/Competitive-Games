import { InjectionKey } from 'vue';
import { createStore, ModuleTree, Store, useStore as vuexUseStore } from 'vuex';
import board, { BoardState } from './modules/board';
import { sharedModules, SharedState } from '../../../../shared/store';

export interface RootState extends SharedState {
  board: BoardState;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useStore(): Store<RootState> {
  return vuexUseStore(key);
}

const modules: ModuleTree<RootState> = {
  ...sharedModules,
  board,
}

export default createStore<RootState>({
  modules,
});