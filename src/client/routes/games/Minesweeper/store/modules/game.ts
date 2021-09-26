import { MutationTree } from "vuex"

export enum GameStatus {
  ChoosingGameMode,
  Playing,
  SeeingResults
}

export enum GameResult {
  None,
  Win,
  Defeat
}

export interface GameState {
  gameStatus: GameStatus;
  gameResult: GameResult;
}

const state = (): GameState => ({
  gameStatus: GameStatus.ChoosingGameMode,
  gameResult: GameResult.None
})

const mutations: MutationTree<GameState> = {
  setGameStatus(state: GameState, status: GameStatus): void {
    state.gameStatus = status;
  },
  setGameResult(state: GameState, result: GameResult): void {
    state.gameResult = result;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}