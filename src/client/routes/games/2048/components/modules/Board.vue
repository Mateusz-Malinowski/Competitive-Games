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
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import NewTilePacket from "../../../../../../global/games/2048/packets/server/NewTilePacket";
import { ServerPacketType } from "../../../../../../global/games/2048/packets/server/ServerPacketType";
import { initialize2dArray } from "../../../../../../global/utilities";
import { key } from "../../store";
import Field from "./Field.vue";
import Tile from "./Tile.vue";

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
  components: { Field, Tile },
  setup() {
    const store = useStore(key);

    store.commit('board/initialize', { numberOfRows: 4, numberOfColumns: 4 }); // todo: info from server ofc
    const newTilePacket: NewTilePacket = {
      type: ServerPacketType.NewTile,
      row: 0,
      column: 0,
      number: 2
    }
    store.commit('board/addNewTile', newTilePacket);

    const borderWidthPx = 10;
    const numberOfRows = computed<number>(() => store.state.board.numberOfRows);
    const numberOfColumns = computed<number>(() => store.state.board.numberOfColumns);
    const tiles = computed<Tile[]>(() => {
      const tiles: Tile[] = [];
      for (let i = 0; i < numberOfRows.value; i++) {
        for (let j = 0; j < numberOfColumns.value; j++) {
          const number = store.state.board.fieldData[i][j];
          if (number != 0)
            tiles.push({ row: i, column: j, number: number });
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

    return {
      numberOfRows,
      numberOfColumns,
      boardElement,
      tiles,
      fieldStyles,
      adjustSize,
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
@use '../../../../../shared/scss/variables/measurements.scss';

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