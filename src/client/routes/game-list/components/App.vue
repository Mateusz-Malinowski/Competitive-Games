<template>
  <Navbar />
  <div class="limiter">
    <div class="wrapper">
      <h2 class="header">Time attack</h2>
      <div class="game-links">
        <GameLink name="2048" :videoPath="video2048Path" />
        <GameLink name="Minesweeper" :videoPath="videoMinesweeperPath" />
      </div>
      <h2 class="header">Score madness</h2>
    </div>
  </div>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "../../../shared/components/Navbar.vue";
import Footer from "../../../shared/components/Footer.vue";
import GameLink from "../../../shared/components/GameLink.vue";
import videoMinesweeperPath from "url:../../../shared/assets/videos/Minesweeper.mp4";
import video2048Path from "url:../../../shared/assets/videos/2048.mp4";

export default defineComponent({
  components: { Navbar, Footer, GameLink },
  setup() {

    return { videoMinesweeperPath, video2048Path }
  },
});
</script>

<style lang="scss" scoped>
@use "../../../shared/scss/variables/colors";
</style>
