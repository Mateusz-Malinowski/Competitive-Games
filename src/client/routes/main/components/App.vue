<template>
  <Navbar />
  <Slider class="slider" />
  <div class="limiter">
    <div class="wrapper">
      <InfoTiles />
    </div>
  </div>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "../../../shared/components/Navbar.vue";
import Footer from "../../../shared/components/Footer.vue";
import Slider from "./modules/Slider.vue";
import InfoTiles from "./modules/InfoTiles.vue";

export default defineComponent({
  components: { Navbar, InfoTiles, Slider, Footer },
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
</style>