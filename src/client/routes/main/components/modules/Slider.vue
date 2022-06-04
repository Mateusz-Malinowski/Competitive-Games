<template>
  <div class="slider">
    SLIDER
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
@use "../../../../shared/scss/variables/shadows";

.slider {
  box-shadow: shadows.$main;
}
</style>