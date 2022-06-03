<template>
  <div class="map-info">
    <h2>{{ numberOfColumns }}x{{ numberOfRows }} {{ numberOfMines }} mines</h2>
    <div class="fields-count">
      <span :class="{ bad: mineIsRevealed }">{{ revealedFieldsCount }}/{{ numberOfFieldsToReveal }}</span>
      <div class="field"></div>
    </div>
    <div class="flags-count">
      <span>{{ flagsCount }}x</span>
      <img class="flag" src="../../assets/flag.png" alt="flag">
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../../store";

export default defineComponent({
  setup() {
    const store = useStore();

    const numberOfRows = computed<number>(() => store.state.map.numberOfRows);
    const numberOfColumns = computed<number>(
      () => store.state.map.numberOfColumns
    );
    const numberOfMines = computed<number>(() => store.state.map.numberOfMines);
    const flagsCount = computed<number>(() => store.state.map.flagsCount);
    const revealedFieldsCount = computed<number>(
      () => store.state.map.revealedFieldsCount
    );
    const numberOfFieldsToReveal = computed<number>(
      () => numberOfRows.value * numberOfColumns.value - numberOfMines.value
    );
    const mineIsRevealed = computed<boolean>(
      () => revealedFieldsCount.value > numberOfFieldsToReveal.value
    );

    return {
      numberOfRows,
      numberOfColumns,
      numberOfMines,
      flagsCount,
      revealedFieldsCount,
      numberOfFieldsToReveal,
      mineIsRevealed,
    };
  },
});
</script>

<style lang="scss" scoped>
@use "../../../../../shared/scss/variables/measurements";
@use "../../../../../shared/scss/variables/colors";
@use "sass:math";

$field-color: rgb(50, 50, 50);
$border-color: rgb(180, 180, 180);

.map-info {
  display: flex;
  flex-direction: column;

  h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: measurements.$page-spacing;
  }

  .flags-count,
  .fields-count {
    display: flex;
    align-items: center;

    img.flag {
      width: 70px;
    }

    .field {
      width: 40px;
      height: 40px;
      background-color: $field-color;
      border: 1px solid $border-color;
    }

    span {
      font-size: 2.5rem;
      margin-right: math.div(measurements.$page-spacing, 2);

      &.bad {
        color: colors.$bad;
      }
    }
  }
}
</style>
