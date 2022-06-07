<template>
  <a class="game-mode-button" :class="{ active: isActive }">
    <slot></slot>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isActive: {
      required: true,
      type: Boolean
    }
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
@use "../scss/modules/button";
@use "../scss/variables/shadows";
@use "../scss/variables/colors";
@use "../scss/variables/measurements";

.game-mode-button {
  @extend %button;
  padding: 10px;
  box-shadow: shadows.$button-base;
  border-radius: measurements.$border-radius;
  background-color: colors.$state-button;
  transition-property: box-shadow, transform, background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover:not(.active) {
    box-shadow: shadows.$button-hover;
    background-color: lighten(colors.$state-button, 10%);
    transform: scale(1.05);
  }

  &.active {
    background-color: colors.$state-button-active;
    cursor: default;
  }
}
</style>