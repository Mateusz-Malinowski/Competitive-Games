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
      :style="fieldStyles[tile.row][tile.column]"
      :number="tile.number"
    />
  </div>
  <KeyboardEvents @keyup="handleKeyUp" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "../../store";
import { initialize2dArray } from "../../../../../../global/utilities";
import MoveTilesPacket from "../../../../../../global/games/2048/packets/client/MoveTilesPacket";
import KeyboardEvents from "../../../../../shared/components/KeyboardEvents.vue";
import Field from "./Field.vue";
import Tile from "./Tile.vue";
import WebSocketController from "../../api/WebSocketController";
import { Direction } from "../../../../../../global/games/2048/Direction";

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
}

export default defineComponent({
  components: { Field, Tile, KeyboardEvents },
  setup() {
    const store = useStore();

    const borderWidthPx = 10;
    const numberOfRows = computed<number>(() => store.state.board.numberOfRows);
    const numberOfColumns = computed<number>(() => store.state.board.numberOfColumns);
    const movementEnabled = computed<boolean>(() => store.state.board.movementEnabled);
    const tiles = computed<Tile[]>(() => {
      const tiles: Tile[] = [];
      for (let i = 0; i < numberOfRows.value; i++) {
        for (let j = 0; j < numberOfColumns.value; j++) {
          const field = store.state.board.fields[i][j];
          if (field.number !== 0)
            tiles.push({ row: i, column: j, number: field.number });
        }
      }
      return tiles;
    });

    const boardElement = ref<HTMLDivElement>();

    const fieldStyles = ref<FieldStyle[][]>(
      initialize2dArray<FieldStyle>(
        { width: "0", height: "0", top: "0", left: "0" },
        numberOfRows.value,
        numberOfColumns.value
      )
    );

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

      switch (keyName) {
        case "ArrowLeft": {
          const tilesWereMoved = await store.dispatch("board/moveTilesToLeft");
          if (tilesWereMoved) {
            store.commit('board/disableMovement')
            const moveTilesPacket = new MoveTilesPacket(Direction.Left);
            WebSocketController.sendPacket(moveTilesPacket);
          }
          break;
        }
        case "ArrowRight": {
          const tilesWereMoved = await store.dispatch("board/moveTilesToRight");
          if (tilesWereMoved) {
            store.commit('board/disableMovement')
            const moveTilesPacket = new MoveTilesPacket(Direction.Right);
            WebSocketController.sendPacket(moveTilesPacket);
          }
          break;
        }
        case "ArrowUp": {
          const tilesWereMoved = await store.dispatch("board/moveTilesUp");
          if (tilesWereMoved) {
            store.commit('board/disableMovement')
            const moveTilesPacket = new MoveTilesPacket(Direction.Up);
            WebSocketController.sendPacket(moveTilesPacket);
          }
          break;
        }
        case "ArrowDown": {
          const tilesWereMoved = await store.dispatch("board/moveTilesDown");
          if (tilesWereMoved) {
            store.commit('board/disableMovement')
            const moveTilesPacket = new MoveTilesPacket(Direction.Down);
            WebSocketController.sendPacket(moveTilesPacket);
          }
          break;
        }
      }
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