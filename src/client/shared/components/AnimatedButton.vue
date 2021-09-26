<template>
  <a class="button">
    <slot></slot>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>


<style lang="scss" scoped>
@use '../scss/variables/colors';
@use '../scss/variables/shadows';
@use '../scss/modules/button';

.button {
  @extend %button;
  display: inline-flex;
  background-color: colors.$button;
  box-shadow: shadows.$button-base;
  padding: 10px 20px;
  border-radius: 10px;
  transition-property: background-color, transform, box-shadow;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  
  &:hover {
    background-color: darken(colors.$button, 10%);
    transform: scale(1.05);
    box-shadow: shadows.$button-hover;
  }
}
</style>