import { MutationTree } from "vuex"

export enum GameStatus {
  ChoosingGameMode,
  Playing,
}

export interface GameState {
  gameStatus: GameStatus;
}

const state = (): GameState => ({
  gameStatus: GameStatus.ChoosingGameMode,
})

const mutations: MutationTree<GameState> = {
  setGameStatus(state: GameState, status: GameStatus): void {
    state.gameStatus = status;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}