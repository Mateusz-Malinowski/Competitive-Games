<template>
  <a class="drodpown-button" :class="{ dropped: isDropped }">
    <div class="stripes">
      <span class="stripe"></span>
      <span class="stripe"></span>
      <span class="stripe"></span>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isDropped: {
      required: true,
      type: Boolean,
    },
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
@use "sass:math";
@use "../scss/variables/colors";
@use "../scss/variables/measurements";
@use "../scss/variables/shadows";

$padding: 10px;
$width: 40px;
$height: 40px;
$stripe-width: 4px;

$stripes-width: calc(#{$width} - #{$padding} * 2);
$stripes-height: calc(#{$height} - #{$padding} * 2);
$stripe2-top: calc((#{$height} - #{$padding} * 2) / 2 - #{$stripe-width} / 2);
$stripe3-top: calc(#{$height} - #{$padding} * 2 - #{$stripe-width});
$stripe-width-after: calc(100% * #{math.sqrt(2)});
$stripe-left-after: calc((100% - 100% * #{math.sqrt(2)}) / 2);

.dropdown-button {
  background-color: colors.$text-dark;
  border-radius: 10px;
  width: $width;
  height: $height;
  padding: $padding;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.75);
  transition-property: background-color, box-shadow;
  transition-duration: 0.5s;
  transition-timing-function: ease;

  .stripes {
    position: relative;
    width: $stripes-width;
    height: $stripes-height;

    .stripe {
      position: absolute;
      width: 100%;
      height: $stripe-width;
      background-color: colors.$text-light;
      border-radius: 2px;
      opacity: 100%;

      &:nth-child(1) {
        top: 0;
      }

      &:nth-child(2) {
        top: $stripe2-top;
      }

      &:nth-child(3) {
        top: $stripe3-top;
      }
    }
  }

  &.dropped {
    &:hover {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.75);
      background-color: darken(colors.$text-dark, 10%);
    }

    .stripes {
      .stripe {
        top: $stripe2-top;
        left: $stripe-left-after;
        width: $stripe-width-after;
      }

      .stripe:nth-child(1) {
        transform: rotate(45deg);
        animation: animateFirstStripe 0.5s ease;
      }

      .stripe:nth-child(2) {
        transform: rotate(-45deg);
        animation: animateSecondStripe 0.5s ease;
      }

      .stripe:nth-child(3) {
        opacity: 0%;
        animation: animateThirdStripe 0.5s ease;
      }
    }
  }
}

@keyframes animateFirstStripe {
  0% {
    top: 0;
    left: 0;
    width: 100%;
    transform: rotate(0deg);
  }

  65% {
    top: $stripe2-top;
    left: $stripe-left-after;
    width: $stripe-width-after;
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(45deg);
  }
}

@keyframes animateSecondStripe {
  0% {
    left: 0;
    width: 100%;
    transform: rotate(0deg);
  }

  65% {
    left: $stripe-left-after;
    width: $stripe-width-after;
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-45deg);
  }
}

@keyframes animateThirdStripe {
  0% {
    top: $stripe3-top;
    left: 0;
    width: 100%;
    opacity: 100%;
  }

  65% {
    top: $stripe2-top;
    left: $stripe-left-after;
    width: $stripe-width-after;
    opacity: 0%;
  }

  100% {
  }
}
</style>
