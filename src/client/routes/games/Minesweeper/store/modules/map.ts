import { FieldState } from '../../../../../../global/games/Minesweeper/FieldState';
import { initialize2dArray } from '../../../../../../global/utilities';
import FieldPacket from '../../../../../../global/games/Minesweeper/packets/server/FieldPacket';
import { MutationTree } from 'vuex';

export interface FieldData {
  state: FieldState;
  number?: number;
  clicked?: boolean;
}

export interface MapState {
  numberOfRows: number;
  numberOfColumns: number;
  fieldData: FieldData[][];
}

interface initializationData {
  numberOfRows: number;
  numberOfColumns: number;
}

const state = (): MapState => ({
  numberOfRows: 0,
  numberOfColumns: 0,
  fieldData: []
});

const mutations: MutationTree<MapState> = {
  initialize(state: MapState, { numberOfRows, numberOfColumns }: initializationData): void {
    state.numberOfRows = numberOfRows;
    state.numberOfColumns = numberOfColumns;
    state.fieldData = initialize2dArray<FieldData>({ state: FieldState.None }, numberOfRows, numberOfColumns);
  },
  updateFieldData(state: MapState, fieldPacket: FieldPacket): void {
    state.fieldData[fieldPacket.row][fieldPacket.column] = {
      state: fieldPacket.state,
      number: fieldPacket.number,
      clicked: fieldPacket.clicked
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}