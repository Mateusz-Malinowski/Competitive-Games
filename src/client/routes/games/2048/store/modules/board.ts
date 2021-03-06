import { MutationTree } from "vuex";
import NewTilePacket from "../../../../../../global/games/2048/packets/server/NewTilePacket";
import { deepCopy2dArray } from "../../../../../../global/utilities";
import { Direction } from "../../../../../../global/games/2048/Direction";

export interface BoardState {
  numberOfRows: number;
  numberOfColumns: number;
  fields: Field[][];
  movementEnabled: boolean;
  animationSpeed: number;
  movesCount: number;
}

export interface Field {
  number: number;
  isMerged: boolean;
  isNew: boolean;
}

export interface InitializationData {
  numberOfRows: number;
  numberOfColumns: number;
  animationSpeed: number;
}

const state = (): BoardState => ({
  numberOfRows: 0,
  numberOfColumns: 0,
  fields: [],
  movementEnabled: false,
  animationSpeed: 0,
  movesCount: 0
});

const mutations: MutationTree<BoardState> = {
  initialize(state: BoardState, { numberOfRows, numberOfColumns, animationSpeed }: InitializationData): void {
    state.numberOfRows = numberOfRows;
    state.numberOfColumns = numberOfColumns;
    state.animationSpeed = animationSpeed;
    state.movementEnabled = false;
    state.movesCount = 0;
    for (let i = 0; i < state.numberOfRows; i++) {
      state.fields.push([]);
      for (let j = 0; j < state.numberOfColumns; j++)
        state.fields[i][j] = { number: 0, isMerged: false, isNew: false };
    }
  },
  addNewTile(state: BoardState, newTilePacket: NewTilePacket): void {
    const field = state.fields[newTilePacket.row][newTilePacket.column];
    field.number = newTilePacket.number;
    field.isNew = true;
  },
  enableMovement(state: BoardState): void {
    state.movementEnabled = true;
  },
  disableMovement(state: BoardState): void {
    state.movementEnabled = false;
  },
  moveTiles(state: BoardState, direction: Direction): void {
    const fieldsCopy = deepCopy2dArray<Field>(state.fields);
    let previousTileWasMerged: boolean;

    for (let i = 0; i < state.numberOfRows; i++)
      for (let j = 0; j < state.numberOfColumns; j++) {
        fieldsCopy[i][j].isMerged = false;
        fieldsCopy[i][j].isNew = false;
      }

    switch (direction) {
      case Direction.Left:
        for (let i = 0; i < state.numberOfRows; i++) {
          previousTileWasMerged = false;
          for (let j = 0; j < state.numberOfColumns; j++) {
            if (fieldsCopy[i][j].number === 0) continue;
            for (let k = 1; k <= j; k++) {
              const nextField = fieldsCopy[i][j - k];
              const tilePrediction = fieldsCopy[i][j - k + 1];
              const continueMove = predictTileMovement(tilePrediction, nextField);
              if (!continueMove) {
                if (previousTileWasMerged) nextField.isMerged = true;
                break;
              }
            }
          }
        }
        break;
      case Direction.Right:
        for (let i = 0; i < state.numberOfRows; i++) {
          previousTileWasMerged = false;
          for (let j = state.numberOfColumns - 1; j >= 0; j--) {
            if (fieldsCopy[i][j].number === 0) continue;
            for (let k = 1; k <= state.numberOfColumns - 1 - j; k++) {
              const nextField = fieldsCopy[i][j + k];
              const tilePrediction = fieldsCopy[i][j + k - 1];
              const continueMove = predictTileMovement(tilePrediction, nextField);
              if (!continueMove) {
                if (previousTileWasMerged) nextField.isMerged = true;
                break;
              }
            }
          }
        }
        break;
      case Direction.Up:
        for (let i = 0; i < state.numberOfColumns; i++) {
          previousTileWasMerged = false;
          for (let j = 0; j < state.numberOfRows; j++) {
            if (fieldsCopy[j][i].number === 0) continue;
            for (let k = 1; k <= j; k++) {
              const nextField = fieldsCopy[j - k][i];
              const tilePrediction = fieldsCopy[j - k + 1][i];
              const continueMove = predictTileMovement(tilePrediction, nextField);
              if (!continueMove) {
                if (previousTileWasMerged) nextField.isMerged = true;
                break;
              }
            }
          }
        }
        break;
      case Direction.Down:
        for (let i = 0; i < state.numberOfColumns; i++) {
          previousTileWasMerged = false;
          for (let j = state.numberOfRows - 1; j >= 0; j--) {
            if (fieldsCopy[j][i].number === 0) continue;
            for (let k = 1; k <= state.numberOfRows - 1 - j; k++) {
              const nextField = fieldsCopy[j + k][i];
              const tilePrediction = fieldsCopy[j + k - 1][i];
              const continueMove = predictTileMovement(tilePrediction, nextField);
              if (!continueMove) {
                if (previousTileWasMerged) nextField.isMerged = true;
                break;
              }
            }
          }
        }
        break;
    }

    state.fields = fieldsCopy;
    state.movesCount++;

    return;

    function predictTileMovement(tilePrediction: Field, nextField: Field): boolean {
      let continueMove = false;

      if (nextField.number === 0) {
        nextField.number = tilePrediction.number;
        tilePrediction.number = 0;
        continueMove = true;
      }
      else if (nextField.number === tilePrediction.number && !previousTileWasMerged) {
        nextField.number += nextField.number;
        tilePrediction.number = 0;
        previousTileWasMerged = true;
        continueMove = false;
      }
      else if (previousTileWasMerged)
        previousTileWasMerged = false;

      return continueMove;
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}