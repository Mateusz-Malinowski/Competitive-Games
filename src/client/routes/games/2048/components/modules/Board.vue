<template>
  <div class="board" ref="boardElement">
    <div class="row" v-for="row in numberOfRows" :key="row">
      <Field
        v-for="column in numberOfColumns"
        :key="`${row}${column}`"
        :style="fieldStyles[row - 1][column - 1]"
      />
    </div>
    <Tile
      v-for="tile in tiles"
      :key="`${tile.row}${tile.column}`"
      :style="tile.style"
      :number="tile.number"
    />
  </div>
  <KeyboardEvents @keyup="handleKeyUp" />
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import { useStore } from "../../store";
import {
  initialize2dArray,
  deepCopy2dArray,
} from "../../../../../../global/utilities";
import KeyboardEvents from "../../../../../shared/components/KeyboardEvents.vue";
import Field from "./Field.vue";
import Tile from "./Tile.vue";
import { Field as StoreField } from "../../store/modules/board";
import MoveTilesPacket from "../../../../../../global/games/2048/packets/client/MoveTilesPacket";
import { Direction } from "../../../../../../global/games/2048/Direction";
import WebSocketController from "../../api/WebSocketController";

interface FieldStyle {
  width: string;
  height: string;
  top: string;
  left: string;
}

interface Tile {
  row: number;
  column: number;
  number: number;
  style: TileStyle;
}

interface TileStyle {
  width: string;
  height: string;
  top: string;
  left: string;
}

interface TileTargetPosition {
  tile: Tile;
  left: number;
  top: number;
}

export default defineComponent({
  components: { Field, Tile, KeyboardEvents },
  setup() {
    const store = useStore();

    const borderWidthPx = 10;
    const numberOfRows = computed<number>(() => store.state.board.numberOfRows);
    const numberOfColumns = computed<number>(() => store.state.board.numberOfColumns);
    const fields = computed<StoreField[][]>(() => store.state.board.fields);
    const movementEnabled = computed<boolean>(() => store.state.board.movementEnabled);
    const boardElement = ref<HTMLDivElement>();
    const fieldStyles = ref<FieldStyle[][]>(
      initialize2dArray<FieldStyle>(
        { top: "0", left: "0", width: "0", height: "0" },
        numberOfRows.value,
        numberOfColumns.value
      )
    );
    const tilesComputed = computed<Tile[]>(() => {
      const array: Tile[] = [];
      for (let i = 0; i < numberOfRows.value; i++) {
        for (let j = 0; j < numberOfColumns.value; j++) {
          const field = fields.value[i][j];
          if (field.number !== 0)
            array.push({
              row: i,
              column: j,
              number: field.number,
              style: Object.assign({}, fieldStyles.value[i][j]),
            });
        }
      }
      return array;
    });
    const tiles = ref<Tile[]>(tilesComputed.value);
    // if data from store has changed update tiles ref 
    // (computed is readonly - change in style is needed to animate)
    watchEffect(() => {
      console.log(store.state.board.fields);
      tiles.value = tilesComputed.value;
    });

    const adjustSize = (): void => {
      const boardDiv = boardElement.value as HTMLDivElement;
      const fieldWidth = boardDiv.clientWidth / numberOfColumns.value;
      const fieldHeight = boardDiv.clientHeight / numberOfRows.value;

      for (let i = 0; i < numberOfRows.value; i++) {
        for (let j = 0; j < numberOfColumns.value; j++) {
          fieldStyles.value[i][j] = {
            width: fieldWidth - borderWidthPx * 2 + "px",
            height: fieldHeight - borderWidthPx * 2 + "px",
            top: fieldHeight * i + borderWidthPx + "px",
            left: fieldWidth * j + borderWidthPx + "px",
          };
        }
      }
    };

    const handleKeyUp = async (keyName: string): Promise<void> => {
      if (!movementEnabled.value) return;

      let direction;
      switch(keyName) {
        case "ArrowLeft":
          direction = Direction.Left;
          break;
        case "ArrowRight":
          direction = Direction.Right;
          break;
        case "ArrowUp":
          direction = Direction.Up;
          break;
        case "ArrowDown":
          direction = Direction.Down;
          break;
        default:
          return;
      }

      store.commit("board/disableMovement");

      const tilesWereMoved = await animateTiles(direction);
      if (tilesWereMoved) {
        store.commit('board/moveTiles', direction);
        const moveTilesPacket = new MoveTilesPacket(direction);
        WebSocketController.sendPacket(moveTilesPacket);
      }
      else
        store.commit('board/enableMovement');
    };

    const animateTiles = async (direction: Direction): Promise<boolean> => {
      const tilesTargetPositions: TileTargetPosition[] = [];
      const fieldsCopy = deepCopy2dArray<StoreField>(fields.value);
      let tilesWereMoved: boolean = false;
      let previousTileWasMerged: boolean;

      switch (direction) {
        case Direction.Left:
          for (let i = 0; i < numberOfRows.value; i++) {
            previousTileWasMerged = false;
            for (let j = 0; j < numberOfColumns.value; j++) {
              if (fieldsCopy[i][j].number === 0) continue;
              const tileTargetPosition = getTileTargetPosition(i, j);
              for (let k = 1; k <= j; k++) {
                const { wasMoved, continueMove } = predictTileMovement(fieldsCopy[i][j - k + 1], fieldsCopy[i][j - k]);
                if (wasMoved) tileTargetPosition.left = parseFloat(fieldStyles.value[i][j - k].left);
                if (!continueMove) break;
              }
            }
          }
          break;
        case Direction.Right:
          for (let i = 0; i < numberOfRows.value; i++) {
            previousTileWasMerged = false;
            for (let j = numberOfColumns.value - 1; j >= 0; j--) {
              if (fieldsCopy[i][j].number === 0) continue;
              const tileTargetPosition = getTileTargetPosition(i, j);
              for (let k = 1; k <= numberOfColumns.value - 1 - j; k++) {
                const { wasMoved, continueMove } = predictTileMovement(fieldsCopy[i][j + k - 1], fieldsCopy[i][j + k]);
                if (wasMoved) tileTargetPosition.left = parseFloat(fieldStyles.value[i][j + k].left);
                if (!continueMove) break;
              }
            }
          }
          break;
        case Direction.Up:
          for (let i = 0; i < numberOfColumns.value; i++) {
            previousTileWasMerged = false;
            for (let j = 0; j < numberOfRows.value; j++) {
              if (fieldsCopy[j][i].number === 0) continue;
              const tileTargetPosition = getTileTargetPosition(j, i);
              for (let k = 1; k <= j; k++) {
                const { wasMoved, continueMove } = predictTileMovement(fieldsCopy[j - k + 1][i], fieldsCopy[j - k][i]);
                if (wasMoved) tileTargetPosition.top = parseFloat(fieldStyles.value[j - k][i].top);
                if (!continueMove) break;
              }
            }
          }
          break;
        case Direction.Down:
          for (let i = 0; i < numberOfColumns.value; i++) {
            previousTileWasMerged = false;
            for (let j = numberOfRows.value - 1; j >= 0; j--) {
              if (fieldsCopy[j][i].number === 0) continue;
              const tileTargetPosition = getTileTargetPosition(j, i);
              for (let k = 1; k <= numberOfRows.value - 1 - j; k++) {
                const { wasMoved, continueMove } = predictTileMovement(fieldsCopy[j + k - 1][i], fieldsCopy[j + k][i]);
                if (wasMoved) tileTargetPosition.top = parseFloat(fieldStyles.value[j + k][i].top);
                if (!continueMove) break;
              }
            }
          }
          break;
      }

      if (!tilesWereMoved) return false;
      await moveTilesIntoPositions(tilesTargetPositions);
      return true;

      function getTileTargetPosition(row: number, column: number): TileTargetPosition {
        const tile = tiles.value.find((element) => (element.row === row && element.column === column)) as Tile;
        const tileTargetPosition = { tile: tile, left: parseFloat(tile.style.left), top: parseFloat(tile.style.top) };
        tilesTargetPositions.push(tileTargetPosition);
        return tileTargetPosition;
      }

      function predictTileMovement(tilePrediction: StoreField, nextField: StoreField): { wasMoved: boolean, continueMove: boolean } {
        let wasMoved = false, continueMove = false;

        if (nextField.number === 0) {
          nextField.number = tilePrediction.number;
          tilePrediction.number = 0;
          wasMoved = true;
          continueMove = true;
        }
        else if (nextField.number === tilePrediction.number && !previousTileWasMerged) {
          nextField.number += nextField.number;
          tilePrediction.number = 0;
          previousTileWasMerged = true;
          wasMoved = true;
          continueMove = false;
        }
        else if (previousTileWasMerged)
          previousTileWasMerged = false;

        if (!tilesWereMoved && wasMoved) tilesWereMoved = true;

        return { wasMoved, continueMove };
      }
    }

    const moveTilesIntoPositions = async (tilesTargetPositions: TileTargetPosition[]): Promise<void> => {
      return new Promise<void>((resolve) => {
        console.log('start');
        const speed = 0.5;
        let lastTimeStamp: number | null = null;
        window.requestAnimationFrame(render);

        function render(timestamp: number): void {
          if (lastTimeStamp === null) lastTimeStamp = timestamp;
          const delta = timestamp - lastTimeStamp;

          const tilesInPlace = tilesTargetPositions.every((tilePosition) => (
            parseFloat(tilePosition.tile.style.left) === tilePosition.left &&
            parseFloat(tilePosition.tile.style.top) === tilePosition.top
          ));
          if (tilesInPlace) {
            console.log('end');
            return resolve();
          }

          tilesTargetPositions.forEach((tilePosition) => {
            const currentLeft = parseFloat(tilePosition.tile.style.left);
            const currentTop = parseFloat(tilePosition.tile.style.top);
            const targetLeft = tilePosition.left;
            const targetTop = tilePosition.top;
            const leftDifference = Math.abs(targetLeft - currentLeft);
            const topDifference = Math.abs(targetTop - currentTop);
            const increase = delta * speed;

            if (leftDifference > 0) {
              const newLeft = currentLeft > targetLeft ? currentLeft - increase : currentLeft + increase;
              tilePosition.tile.style.left = (increase > leftDifference ? tilePosition.left : newLeft) + "px";
            }

            if (topDifference > 0) {
              const newTop = currentTop > targetTop ? currentTop - increase : currentTop + increase;
              tilePosition.tile.style.top = (increase > topDifference ? tilePosition.top : newTop) + "px";
            }
          });

          lastTimeStamp = timestamp;
          window.requestAnimationFrame(render);
        }
      });
    };

    return {
      numberOfRows,
      numberOfColumns,
      boardElement,
      tiles,
      fieldStyles,
      adjustSize,
      handleKeyUp,
    };
  },
  mounted() {
    this.adjustSize();
    window.addEventListener("resize", this.adjustSize);
  },
  unmounted() {
    window.removeEventListener("resize", this.adjustSize);
  },
});
</script>

<style lang="scss" scoped>
@use "../../../../../shared/scss/variables/measurements.scss";

$board-color: rgb(50, 50, 50);

.board {
  background-color: $board-color;
  width: 100%;
  height: 100%;
  position: relative;
  border: 10px solid $board-color;
  border-radius: measurements.$border-radius;
}
</style>