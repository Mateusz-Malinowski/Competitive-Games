<template>
  <div class="game-modes">
    <h2>Choose game mode</h2>
    <div class="game-mode-buttons">
      <GameModeButton
        class="game-mode-button"
        v-for="(gameMode, index) in gameModes"
        :key="index"
        :id="index"
        :numberOfRows="gameMode.numberOfRows"
        :numberOfColumns="gameMode.numberOfColumns"
        :numberOfMines="gameMode.numberOfMines"
      />
    </div>
    <div class="game-mode-info">
      <!-- todo (on game mode button hover):
      world record
      personal best
      average personal best
      completition % -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import GameModeButton from "./GameModeButton.vue";
import gameModesJSON from "../../../../../../global/games/Minesweeper/gameModes.json";

interface GameModes {
  numberOfRows: number;
  numberOfColumns: number;
  numberOfMines: number;
}

export default defineComponent({
  components: { GameModeButton },
  setup() {
    const gameModes = ref<GameModes[]>(gameModesJSON);

    return { gameModes };
  },
});
</script>

<style lang="scss" scoped>
@use "../../../../../shared/scss/variables/measurements";

.game-modes {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;

  h2 {
    font-size: 3em;
    margin-bottom: measurements.$page-spacing;
  }

  .game-mode-buttons {
    display: flex;

    .game-mode-button {
      font-size: 1.25em;
      margin-left: measurements.$page-spacing;

      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
