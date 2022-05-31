import { InjectionKey } from 'vue';
import { createStore, ModuleTree, Store, useStore as vuexUseStore } from 'vuex';
import map, { MapState } from './modules/map';
import { sharedModules, SharedState } from '../../../../shared/store';

export interface RootState extends SharedState {
  map: MapState;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useStore(): Store<RootState> {
  return vuexUseStore(key);
}

const modules: ModuleTree<RootState> = {
  ...sharedModules,
  map,
}

export default createStore<RootState>({
  modules,
});