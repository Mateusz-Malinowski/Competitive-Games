<template>
  <div class="game-links">
    <Transition name="swipe" appear>
      <h2 class="header">Time attack</h2>
    </Transition>
    <TransitionGroup name="pop" appear>
      <GameLink
        v-for="(game, index) in timeAttackGames"
        :key="index"
        :name="game.name"
        :videoPath="game.videoPath"
      />
    </TransitionGroup>
    <Transition name="swipe" appear>
      <h2 class="header">Score madness</h2>
    </Transition>
    <TransitionGroup name="pop" appear>
      <GameLink
        v-for="(game, index) in scoreMadnessGames"
        :key="index"
        :name="game.name"
        :videoPath="game.videoPath"
      />
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameLink from "./GameLink.vue";
import videoMinesweeperPath from "url:../assets/videos/Minesweeper.mp4";
import video2048Path from "url:../assets/videos/2048.mp4";

interface GameLink {
  name?: string;
  videoPath?: string;
}

export default defineComponent({
  components: { GameLink },
  setup() {
    const timeAttackGames: GameLink[] = [
      { name: "2048", videoPath: video2048Path },
      { name: "Minesweeper", videoPath: videoMinesweeperPath },
      {},
    ];

    const scoreMadnessGames: GameLink[] = [{}];

    return { timeAttackGames, scoreMadnessGames };
  },
});
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