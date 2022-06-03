<template>
  <div class="control">
    <div class="description">
      <slot name="description"></slot>
    </div>
    <slot name="image"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
@use '../scss/variables/measurements.scss';
@use '../scss/variables/shadows.scss';
@use 'sass:math';

.control {
  display: flex;
  flex-direction: column;
  align-items: center;

  .description {
    font-size: 1.5rem;
    font-weight: bold;
    font-family: monospace;
    margin-bottom: math.div(measurements.$page-spacing, 2);
  }

  :slotted(img) {
    height: 150px;
    filter: drop-shadow(shadows.$icon);
  }
}
</style>
