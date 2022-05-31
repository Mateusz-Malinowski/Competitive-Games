import { ModuleTree } from "vuex";
import game, { GameState } from "./modules/game";
import timer, { TimerState } from "./modules/timer";

export interface SharedState {
  game: GameState;
  timer: TimerState;
}

export const sharedModules: ModuleTree<SharedState> = {
  game,
  timer
}