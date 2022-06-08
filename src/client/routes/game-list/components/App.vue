<template>
  <Navbar />
  <div class="limiter">
    <div class="wrapper">
      <GameLinks />
    </div>
  </div>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "../../../shared/components/Navbar.vue";
import Footer from "../../../shared/components/Footer.vue";
import GameLinks from "../components/GameLinks.vue";

export default defineComponent({
  components: { Navbar, Footer, GameLinks },
  setup() {},
});
</script>

<style lang="scss" scoped>
</style>
