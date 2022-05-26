import { ActionContext, ActionTree, MutationTree } from "vuex";
import { RootState } from "..";
import NewTilePacket from "../../../../../../global/games/2048/packets/server/NewTilePacket";

export interface BoardState {
  numberOfRows: number;
  numberOfColumns: number;
  fields: Field[][];
  movementEnabled: boolean;
}

export interface InitializationData {
  numberOfRows: number;
  numberOfColumns: number;
}

export interface MoveTileData {
  tile: Field;
  nextField: Field;
}

interface MoveTileInfo {
  tileMoved: boolean;
  continueMovement: boolean;
}

interface Field {
  number: number;
}

const state = (): BoardState => ({
  numberOfRows: 0,
  numberOfColumns: 0,
  fields: [],
  movementEnabled: false,
});

const mutations: MutationTree<BoardState> = {
  initialize(state: BoardState, { numberOfRows, numberOfColumns }: InitializationData): void {
    state.numberOfRows = numberOfRows;
    state.numberOfColumns = numberOfColumns;
    for (let i = 0; i < state.numberOfRows; i++) {
      state.fields.push([]);

      for (let j = 0; j < state.numberOfColumns; j++)
        state.fields[i][j] = { number: 0 };
    }
  },
  addNewTile(state: BoardState, newTilePacket: NewTilePacket): void {
    state.fields[newTilePacket.row][newTilePacket.column].number = newTilePacket.number;
  },
  enableMovement(state: BoardState): void {
    state.movementEnabled = true;
  },
  disableMovement(state: BoardState): void {
    state.movementEnabled = false;
  }
}

const actions: ActionTree<BoardState, RootState> = {
  async moveTilesToLeft({ state, dispatch }: ActionContext<BoardState, RootState>): Promise<boolean> {
    let tilesWereMoved = false;

    for (let i = 0; i < state.numberOfRows; i++) {
      for (let j = 0; j < state.numberOfColumns; j++) {
        if (state.fields[i][j].number === 0) continue;

        for (let k = 1; k <= j; k++) {
          const fieldToLeft = state.fields[i][j - k];
          const tile = state.fields[i][j - k + 1];

          const moveTileInfo = await dispatch('moveTile', { tile: tile, nextField: fieldToLeft });
          if (!tilesWereMoved && moveTileInfo.tileMoved) tilesWereMoved = true;
          if (!moveTileInfo.continueMovement) break;
        }
      }
    }

    return tilesWereMoved;
  },
  async moveTilesToRight({ state, dispatch }: ActionContext<BoardState, RootState>): Promise<boolean> {
    let tilesWereMoved = false;

    for (let i = 0; i < state.numberOfRows; i++) {
      for (let j = state.numberOfColumns - 1; j >= 0; j--) {
        if (state.fields[i][j].number === 0) continue;

        for (let k = 1; k <= state.numberOfColumns - j - 1; k++) {
          const fieldToRight = state.fields[i][j + k];
          const tile = state.fields[i][j + k - 1];

          const moveTileInfo = await dispatch('moveTile', { tile: tile, nextField: fieldToRight });
          if (!tilesWereMoved && moveTileInfo.tileMoved) tilesWereMoved = true;
          if (!moveTileInfo.continueMovement) break;
        }
      }
    }

    return tilesWereMoved;
  },
  async moveTilesUp({ state, dispatch }: ActionContext<BoardState, RootState>): Promise<boolean> {
    let tilesWereMoved = false;

    for (let i = 0; i < state.numberOfColumns; i++) {
      for (let j = 0; j < state.numberOfRows; j++) {
        if (state.fields[j][i].number === 0) continue;

        for (let k = 1; k <= j; k++) {
          const fieldAbove = state.fields[j - k][i];
          const tile = state.fields[j - k + 1][i];

          const moveTileInfo = await dispatch('moveTile', { tile: tile, nextField: fieldAbove });
          if (!tilesWereMoved && moveTileInfo.tileMoved) tilesWereMoved = true;
          if (!moveTileInfo.continueMovement) break;
        }
      }
    }

    return tilesWereMoved;
  },
  async moveTilesDown({ state, dispatch }: ActionContext<BoardState, RootState>): Promise<boolean> {
    let tilesWereMoved = false;

    for (let i = 0; i < state.numberOfColumns; i++) {
      for (let j = state.numberOfRows - 1; j >= 0; j--) {
        if (state.fields[j][i].number === 0) continue;

        for (let k = 1; k <= state.numberOfRows - 1 - j; k++) {
          const fieldBelow = state.fields[j + k][i];
          const tile = state.fields[j + k - 1][i];

          const moveTileInfo = await dispatch('moveTile', { tile: tile, nextField: fieldBelow });
          if (!tilesWereMoved && moveTileInfo.tileMoved) tilesWereMoved = true;
          if (!moveTileInfo.continueMovement) break;
        }
      }
    }

    return tilesWereMoved;
  },
  async moveTile({}: ActionContext<BoardState, RootState>, { tile, nextField }: MoveTileData): Promise<MoveTileInfo> {
    if (nextField.number === 0) {
      nextField.number = tile.number;
      tile.number = 0;
      return { tileMoved: true, continueMovement: true };
    }

    if (nextField.number === tile.number) {
      nextField.number += nextField.number;
      tile.number = 0;
      return { tileMoved: true, continueMovement: false };
    }

    return { tileMoved: false, continueMovement: false };
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}