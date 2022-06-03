<template>
  <div class="board-info">
    <h2>2048</h2>
    <span>Total score: {{ totalScore }}</span>
    <span>Highest number: {{ maxTileNumber }}</span>
    <span>Moves count: {{ movesCount }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../../store";
import { Field } from "../../store/modules/board";

export default defineComponent({
  setup() {
    const store = useStore();

    const numberOfRows = computed<number>(() => store.state.board.numberOfRows);
    const numberOfColumns = computed<number>(() => store.state.board.numberOfColumns);
    const fields = computed<Field[][]>(() => store.state.board.fields);
    const maxTileNumber = computed<number>(() => {
      let maxTileNumber = Number.NEGATIVE_INFINITY;

      for (let i = 0; i < numberOfRows.value; i++)
        for (let j = 0; j < numberOfColumns.value; j++) {
          const number = fields.value[i][j].number;
          if (number > maxTileNumber)
            maxTileNumber = number
        }

      return maxTileNumber;
    });
    const totalScore = computed<number>(() => {
      let totalScore = 0;

      for (let i = 0; i < numberOfRows.value; i++)
        for (let j = 0; j < numberOfColumns.value; j++)
          totalScore += fields.value[i][j].number;

      return totalScore
    });
    const movesCount = computed<number>(() => store.state.board.movesCount);

    return { maxTileNumber, totalScore, movesCount };
  },
});
</script>

<style lang="scss" scoped>
@use "../../../../../shared/scss/variables/measurements";
@use "../../../../../shared/scss/variables/colors";
@use "sass:math";

$field-color: rgb(50, 50, 50);
$border-color: rgb(180, 180, 180);

.board-info {
  display: flex;
  flex-direction: column;

  h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: measurements.$page-spacing;
  }

  span {
    font-size: 1.5rem;
    margin-top: 10px;

    &:first-of-type {
      margin-top: 0;
    }
  }
}
</style>
