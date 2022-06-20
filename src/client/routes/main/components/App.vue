<template>
  <Navbar />
  <main>
    <Transition name="pop" appear>
      <Slider class="slider" />
    </Transition>
    <div class="limiter">
      <div class="wrapper">
        <InfoTiles />
        <GameLinks v-transition-in-viewport="'swipe'" />
      </div>
    </div>
  </main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "../../../shared/components/Navbar.vue";
import Footer from "../../../shared/components/Footer.vue";
import GameLinks from "../components/GameLinks.vue";
import Slider from "./modules/Slider.vue";
import InfoTiles from "./modules/InfoTiles.vue";

export default defineComponent({
  components: { Navbar, InfoTiles, Slider, Footer, GameLinks },
  setup() {},
});
</script>

<style lang="scss" scoped>
@use "../../../shared/scss/variables/measurements";

.slider {
  width: 100%;
  height: calc(100vh - #{measurements.$navbar-height});
  max-height: 150vw;
}

.wrapper {
  display: grid;
  gap: measurements.$page-spacing;
}
</style>