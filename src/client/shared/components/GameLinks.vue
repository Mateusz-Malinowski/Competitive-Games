<template>
  <div class="game-links">
    <h2 class="header">Time attack</h2>
    <GameLink class="game-link" name="2048" :videoPath="video2048Path" />
    <GameLink
      class="game-link"
      name="Minesweeper"
      :videoPath="videoMinesweeperPath"
    />
    <h2 class="header">Score madness</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameLink from "./GameLink.vue";
import videoMinesweeperPath from "url:../assets/videos/Minesweeper.mp4";
import video2048Path from "url:../assets/videos/2048.mp4";

export default defineComponent({
  components: { GameLink },
  setup() {
    return { videoMinesweeperPath, video2048Path };
  },
})
</script>


<style lang="scss" scoped>
@use "../scss/variables/colors";
@use "../scss/variables/measurements";
@use "../scss/mixins/devices";

.game-links {
  display: grid;
  gap: measurements.$page-spacing;
  grid-template-columns: 1fr;

  .header {
    grid-column: 1 / -1;
    text-align: center;
    font-size: 3rem;
  }
}

@include devices.tablet {
  .game-links {
    .header {
      font-size: 4rem;
    }
  }
}

@include devices.laptop {
  .game-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@include devices.large-laptop {
  .game-links {
    grid-template-columns: repeat(3, 1fr);
  }
}

@include devices.desktop {
  .game-links {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>