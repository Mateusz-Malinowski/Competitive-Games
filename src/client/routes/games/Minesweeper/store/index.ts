import { InjectionKey } from 'vue';
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import map, { MapState } from './modules/map';

export interface RootState {
  map: MapState
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useStore(): Store<RootState> {
  return vuexUseStore(key);
}

export default createStore<RootState>({
  modules: {
    map: map
  }
});