import { FieldState } from '../../../../../../global/games/Minesweeper/FieldState';
import { initialize2dArray } from '../../../../../../global/utilities';
import FieldPacket from '../../../../../../global/games/Minesweeper/packets/server/FieldPacket';
import { MutationTree } from 'vuex';

export interface MapState {
  numberOfRows: number;
  numberOfColumns: number;
  numberOfMines: number;
  fieldData: FieldData[][];
  flagsCount: number;
  revealedFieldsCount: number;
}

export interface FieldData {
  state: FieldState;
  number?: number;
  clicked?: boolean;
}

export interface InitializationData {
  numberOfRows: number;
  numberOfColumns: number;
  numberOfMines: number;
}

const state = (): MapState => ({
  numberOfRows: 0,
  numberOfColumns: 0,
  numberOfMines: 0,
  fieldData: [],
  flagsCount: 0,
  revealedFieldsCount: 0
});

const mutations: MutationTree<MapState> = {
  initialize(state: MapState, { numberOfRows, numberOfColumns, numberOfMines }: InitializationData): void {
    state.numberOfRows = numberOfRows;
    state.numberOfColumns = numberOfColumns;
    state.numberOfMines = numberOfMines;
    for (let i = 0; i < state.numberOfRows; i++) {
      state.fieldData.push([]);
      for (let j = 0; j < state.numberOfColumns; j++)
        state.fieldData[i][j] = { state: FieldState.None };
    }
    state.flagsCount = 0;
    state.revealedFieldsCount = 0;
  },
  revealField(state: MapState, fieldPacket: FieldPacket): void {
    let field = state.fieldData[fieldPacket.row][fieldPacket.column];

    field.state = fieldPacket.state;
    field.number = fieldPacket.number;
    field.clicked = fieldPacket.clicked;

    state.revealedFieldsCount++;
  },
  increaseFlagsCount(state: MapState): void {
    state.flagsCount++;
  },
  decreaseFlagsCount(state: MapState): void {
    state.flagsCount--;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}