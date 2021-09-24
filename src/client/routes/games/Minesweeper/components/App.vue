<template>
  <Navbar />
  <div class="wrapper wrapper-map">
    <div class="content-block content-map">
      <Map />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "../../../../shared/components/Navbar.vue";
import Map from "./modules/Map.vue";

export default defineComponent({
  components: { Navbar, Map },
  setup() {},
});
</script>

<style lang="scss" scoped>
.wrapper-map {
  display: flex;
  justify-content: center;
}

.content-map {
  display: inline-flex;
}
</style>
