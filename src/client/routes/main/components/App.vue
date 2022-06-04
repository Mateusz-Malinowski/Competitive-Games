<template>
  <Navbar />
  <Slider class="slider" />
  <div class="limiter">
    <div class="wrapper wrapper-info-tiles">
      <InfoTiles />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "../../../shared/components/Navbar.vue";
import Slider from "./modules/Slider.vue";
import InfoTiles from "./modules/InfoTiles.vue";

export default defineComponent({
  components: { Navbar, InfoTiles, Slider },
  setup() {},
});
</script>

<style lang="scss" scoped>
@use "../../../shared/scss/variables/measurements";

.slider {
  height: calc(100vh - #{measurements.$navbar-height});
}
</style>