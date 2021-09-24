<template>
  <div
    class="field"
    :class="[{ active: isActive }, contentClass]"
    @click.once="handleClick"
  ></div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { FieldState } from "../../../../../../global/games/Minesweeper/FieldState";
import { useStore } from "../../store";

type ContentClass = "" | "empty" | "mine" | "mine clicked" | `number-${number}`;

export default defineComponent({
  props: {
    row: {
      required: true,
      type: Number,
    },
    column: {
      required: true,
      type: Number,
    },
  },
  setup(props) {
    const store = useStore();
    const isActive = ref<boolean>(true);
    const contentClass = computed<ContentClass>(() => {
      const fieldData = store.state.map.fieldData[props.row][props.column];

      switch (fieldData.state) {
        case FieldState.None:
          return "";
        case FieldState.Empty:
          return "empty";
        case FieldState.Mine:
          return `mine${fieldData.clicked ? " clicked" : ""}`;
        case FieldState.Number:
          return `number-${fieldData.number as number}`;
      }
    });

    const handleClick = () => {
      isActive.value = false;
    };

    return { isActive, contentClass, handleClick };
  },
});
</script>

<style lang="scss" scoped>
$background-color-unrevealed: rgb(30, 30, 30);
$background-color-revealed: rgb(50, 50, 50);
$clicked-mine-color: rgb(255, 0, 0);
$number-colors: rgb(0, 0, 0), rgb(255, 255, 255), rgb(0, 255, 255),
  rgb(255, 0, 255), rgb(255, 255, 0), rgb(0, 0, 255), rgb(0, 255, 0),
  rgb(255, 0, 0);

.field {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $background-color-unrevealed;
}

.active {
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: darken($background-color-unrevealed, 10);
  }
}

%revealed {
  background-color: $background-color-revealed;
}

%with-image {
  background-size: contain;
  background-repeat: no-repeat;
}

.empty {
  @extend %revealed;
}

.mine {
  @extend %revealed;
  @extend %with-image;
  background-image: url(../../assets/mine.png);

  &.clicked {
    background-color: $clicked-mine-color;
  }
}

@for $i from 1 through 8 {
  .number-#{$i} {
    @extend %revealed;
    color: nth($number-colors, $i);
  }
}

.flag {
  @extend %with-image;
  background-image: url(../../assets/flag.png);
}
</style>