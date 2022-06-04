<template>
  <div
    class="field"
    :class="[
      { active: isActive },
      { flag: hasFlag && !contentClass },
      contentClass,
    ]"
    v-on="{
      click: isActive ? handleClick : null,
      contextmenu: isActive ? handleContextMenu : null,
    }"
  >
    <span v-if="fieldNumber">{{ fieldNumber }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import { FieldState } from "../../../../../../global/games/Minesweeper/FieldState";
import FieldPacket from "../../../../../../global/games/Minesweeper/packets/client/FieldPacket";
import WebSocketController from "../../api/WebSocketController";
import { useStore } from "../../store";
import { FieldData } from "../../store/modules/map";

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
    const fieldData = computed<FieldData>(
      () => store.state.map.fieldData[props.row][props.column]
    );

    const isActive = computed<boolean>(
      () => fieldData.value.state === FieldState.None
    );
    const fieldNumber = computed<number | undefined>(
      () => fieldData.value.number
    );
    const contentClass = computed<ContentClass>(() => {
      switch (fieldData.value.state) {
        case FieldState.None:
          return "";
        case FieldState.Empty:
          return "empty";
        case FieldState.Mine:
          return `mine${fieldData.value.clicked ? " clicked" : ""}`;
        case FieldState.Number:
          return `number-${fieldData.value.number as number}`;
      }
    });
    const hasFlag = ref<boolean>(false);
    const toggleFlag = (): void => {
      hasFlag.value = !hasFlag.value;
      if (hasFlag.value) store.commit("map/increaseFlagsCount");
      else store.commit("map/decreaseFlagsCount");
    };
    const handleContextMenu = (event: Event) => {
      event.preventDefault();
      toggleFlag();
    };

    const handleClick = (): void => {
      const fieldPacket = new FieldPacket(props.row, props.column);
      WebSocketController.sendPacket(fieldPacket);
    };

    watchEffect(() => {
      if (isActive.value === false && hasFlag.value === true) {
        hasFlag.value = false;
        store.commit("map/decreaseFlagsCount");
      }
    });

    return {
      isActive,
      fieldNumber,
      contentClass,
      hasFlag,
      handleContextMenu,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
$background-color-unrevealed: rgb(30, 30, 30);
$background-color-revealed: rgb(50, 50, 50);
$clicked-mine-color: rgb(255, 0, 0);
$number-colors: rgb(230, 230, 230), rgb(255, 120, 0), rgb(0, 255, 255),
  rgb(255, 0, 255), rgb(255, 255, 0), rgb(0, 0, 255), rgb(0, 255, 0),
  rgb(255, 0, 0);

%revealed {
  background-color: $background-color-revealed;
}

%with-image {
  background-size: contain;
  background-repeat: no-repeat;
}

.field {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $background-color-unrevealed;
  transition: background-color 0.3s ease;

  &.active {
    cursor: pointer;

    &:hover {
      background-color: darken($background-color-unrevealed, 10);
    }
  }
  &.empty {
    @extend %revealed;
  }

  &.mine {
    @extend %revealed;
    @extend %with-image;
    background-image: url(../../assets/mine.png);

    &.clicked {
      background-color: $clicked-mine-color;
    }
  }

  @for $i from 1 through 8 {
    &.number-#{$i} {
      @extend %revealed;
      color: nth($number-colors, $i);
    }
  }

  &.flag {
    @extend %with-image;
    background-image: url(../../assets/flag.png);
  }
}
</style>