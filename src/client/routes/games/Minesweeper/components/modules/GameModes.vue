<template>
  <div class="game-modes">
    <h2>Choose game mode</h2>
    <div class="game-mode-buttons">
      <StateButton 
        class="game-mode-button"
        v-for="(gameMode, index) in gameModes" :key="gameMode.name"
        @click="currentIndex = index"
        :isActive="currentIndex === index"
      >
        {{ gameMode.name }}
      </StateButton>
    </div>
    <div class="game-mode-info">
      <span>
        {{ gameModes[currentIndex].numberOfColumns }}x{{ gameModes[currentIndex].numberOfRows }} map
      </span>
      <span>{{ gameModes[currentIndex].numberOfMines }} mines</span>
    </div>
    <AnimatedButton class="button-play" @click="startGame">Play</AnimatedButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import StateButton from "../../../../../shared/components/StateButton.vue";
import AnimatedButton from "../../../../../shared/components/AnimatedButton.vue";
import gameModes from "../../../../../../global/games/Minesweeper/gameModes.json";
import { useStore } from "../../store";
import WebSocketController from "../../api/WebSocketController";
import StartGamePacket from "../../../../../../global/games/Minesweeper/packets/client/StartGamePacket";
import { GameStatus } from "../../../../../shared/store/modules/game";

export default defineComponent({
  components: { StateButton, AnimatedButton },
  setup() {
    const store = useStore();
    const currentIndex = ref<number>(0);

    const startGame = (): void => {
      store.commit("map/initialize", {
        numberOfRows: gameModes[currentIndex.value].numberOfRows,
        numberOfColumns: gameModes[currentIndex.value].numberOfColumns,
        numberOfMines: gameModes[currentIndex.value].numberOfMines,
      });
      store.commit("game/setGameStatus", GameStatus.Playing);
      const startGamePacket = new StartGamePacket(currentIndex.value);
      WebSocketController.sendPacket(startGamePacket);
    };

    return { gameModes, currentIndex, startGame };
  },
});
</script>

<style lang="scss" scoped>
@use "../../../../../shared/scss/variables/measurements";

.game-modes {
  display: grid;
  width: 100%;
  gap: measurements.$page-spacing;
  justify-items: center;

  h2 {
    font-size: 3rem;
    text-align: center;
  }

  .game-mode-buttons {
    display: flex;
    justify-content: center;

    .game-mode-button {
      font-size: 1.5rem;
      margin: 0 5px;
    }
  }

  .game-mode-info {
    display: flex;
    flex-direction: column;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }

  .button-play {
    font-size: 1.5rem;
  }
}
</style>
