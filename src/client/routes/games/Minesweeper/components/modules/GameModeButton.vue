<template>
  <AnimatedButton @click="startGame(id)">
    <div class="game-mode-properties">
      <span>{{ numberOfColumns }}x{{ numberOfRows }}</span>
      <span>{{ numberOfMines }} mines</span>
    </div>
  </AnimatedButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StartGamePacket from "../../../../../../global/games/Minesweeper/packets/client/StartGamePacket";
import AnimatedButton from "../../../../../shared/components/AnimatedButton.vue";
import WebSocketController from "../../api/WebSocketController";
import { useStore } from "../../store";
import { GameStatus } from "../../../../../shared/store/modules/game";

export default defineComponent({
  components: { AnimatedButton },
  props: {
    id: {
      required: true,
      type: Number,
    },
    numberOfRows: {
      required: true,
      type: Number,
    },
    numberOfColumns: {
      required: true,
      type: Number,
    },
    numberOfMines: {
      required: true,
      type: Number,
    },
  },
  setup(props) {
    const store = useStore();

    const startGame = (id: number): void => {
      store.commit("map/initialize", {
        numberOfRows: props.numberOfRows,
        numberOfColumns: props.numberOfColumns,
      });
      store.commit("game/setGameStatus", GameStatus.Playing);
      const startGamePacket = new StartGamePacket(id);
      WebSocketController.sendPacket(startGamePacket);
    };

    return { startGame };
  },
});
</script>

<style lang="scss" scoped>
.game-mode-properties {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>