import { ActionContext } from 'vuex';
import { RootState } from '..';
import { FieldState } from '../../../../../../global/games/Minesweeper/FieldState';
import { initialize2dArray } from '../../../../../../global/utilities';
import FieldPacket from '../../../../../../global/games/Minesweeper/packets/server/FieldPacket';

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

export default {
  namespaced: true,
  state: (): MapState => ({
    numberOfRows: 15,
    numberOfColumns: 15,
    fieldData: initialize2dArray({ state: FieldState.None }, 15, 15)
  }),
  mutations: {
    updateFieldData(state: MapState, fieldPacket: FieldPacket): void {
      state.fieldData[fieldPacket.row][fieldPacket.column] = {
        state: fieldPacket.state,
        number: fieldPacket.number,
        clicked: fieldPacket.clicked
      }
    }
  },
}