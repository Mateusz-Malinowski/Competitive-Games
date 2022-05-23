import { MutationTree } from "vuex";
import { initialize2dArray } from "../../../../../../global/utilities";
import NewTilePacket from "../../../../../../global/games/2048/packets/server/NewTilePacket";

export interface BoardState {
  numberOfRows: number;
  numberOfColumns: number;
  fieldData: number[][];
}

export interface InitializationData {
  numberOfRows: number;
  numberOfColumns: number;
}

export interface moveTileData {
  fromRow: number;
  fromColumn: number;
  toRow: number;
  toColumn: number;
}

const state = (): BoardState => ({
  numberOfRows: 0,
  numberOfColumns: 0,
  fieldData: []
});

const mutations: MutationTree<BoardState> = {
  initialize(state: BoardState, { numberOfRows, numberOfColumns }: InitializationData): void {
    state.numberOfRows = numberOfRows;
    state.numberOfColumns = numberOfColumns;
    state.fieldData = initialize2dArray<number>(0, numberOfRows, numberOfColumns);
  },
  moveTile(state: BoardState, { fromRow, fromColumn, toRow, toColumn }: moveTileData): void {
    const previousNumber = state.fieldData[toRow][toColumn];

    state.fieldData[fromRow][fromColumn] = 0;
    state.fieldData[toRow][toColumn] = previousNumber * previousNumber;
  },
  addNewTile(state: BoardState, newTilePacket: NewTilePacket): void {
    state.fieldData[newTilePacket.row][newTilePacket.column] = newTilePacket.number;
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}