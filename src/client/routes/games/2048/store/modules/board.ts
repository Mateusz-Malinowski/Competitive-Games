import { MutationTree } from "vuex";
import { initialize2dArray } from "../../../../../../global/utilities";
import NewTilePacket from "../../../../../../global/games/2048/packets/server/NewTilePacket";

export interface BoardState {
  numberOfRows: number;
  numberOfColumns: number;
  fields: Field[][];
}

export interface InitializationData {
  numberOfRows: number;
  numberOfColumns: number;
}

interface Field {
  number: number;
}

const state = (): BoardState => ({
  numberOfRows: 0,
  numberOfColumns: 0,
  fields: []
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
  moveTilesToLeft(state: BoardState): void {
    for (let i = 0; i < state.numberOfRows; i++) {
      for (let j = 0; j < state.numberOfColumns; j++) {
        const field = state.fields[i][j];
        if (field.number === 0) continue;

        for (let k = 1; k <= j; k++) {
          const fieldToLeft = state.fields[i][j - k];
          const tile = state.fields[i][j - k + 1];

          if (fieldToLeft.number === 0) {
            fieldToLeft.number = tile.number;
            tile.number = 0;
          }

          else if (fieldToLeft.number === tile.number) {
            fieldToLeft.number += fieldToLeft.number;
            tile.number = 0;
            break;
          }

          else break;
        }
      }
    }
  },
  moveTilesToRight(state: BoardState): void {
    for (let i = 0; i < state.numberOfRows; i++) {
      for (let j = state.numberOfColumns - 1; j >= 0; j--) {
        const field = state.fields[i][j];
        if (field.number === 0) continue;

        for (let k = 1; k <= state.numberOfColumns - j - 1; k++) {
          const fieldToRight = state.fields[i][j + k];
          const tile = state.fields[i][j + k - 1];

          if (fieldToRight.number === 0) {
            fieldToRight.number = tile.number;
            tile.number = 0;
          }

          else if (fieldToRight.number === tile.number) {
            fieldToRight.number += fieldToRight.number;
            tile.number = 0;
            break;
          }

          else break;
        }
      }
    }
  },
  moveTilesUp(state: BoardState): void {
    for (let i = 0; i < state.numberOfColumns; i++) {
      for (let j = 0; j < state.numberOfRows; j++) {
        const field = state.fields[j][i];
        if (field.number === 0) continue;

        for (let k = 1; k <= j; k++) {
          const fieldAbove = state.fields[j - k][i];
          const tile = state.fields[j - k + 1][i];

          if (fieldAbove.number === 0) {
            fieldAbove.number = tile.number;
            tile.number = 0;
          }

          else if (fieldAbove.number === tile.number) {
            fieldAbove.number += fieldAbove.number;
            tile.number = 0;
            break;
          }

          else break;
        }
      }
    }
  },
  moveTilesDown(state: BoardState): void {
    for (let i = 0; i < state.numberOfColumns; i++) {
      for (let j = state.numberOfRows - 1; j >= 0; j--) {
        const field = state.fields[j][i];
        if (field.number === 0) continue;

        for (let k = 1; k <= state.numberOfRows - 1 - j; k++) {
          const fieldBelow = state.fields[j + k][i];
          const tile = state.fields[j + k - 1][i];

          if (fieldBelow.number === 0) {
            fieldBelow.number = tile.number;
            tile.number = 0;
          }

          else if (fieldBelow.number === tile.number) {
            fieldBelow.number += fieldBelow.number;
            tile.number = 0;
            break;
          }

          else break;
        }
      }
    }
  },
  addNewTile(state: BoardState, newTilePacket: NewTilePacket): void {
    state.fields[newTilePacket.row][newTilePacket.column].number = newTilePacket.number;
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}