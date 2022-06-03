<template>
  <div class="tile" :class="[numberClass, { merged: isMerged, new: isNew }]">
    <span>{{ number }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

type NumberClass = `number-${number}`;

export default defineComponent({
  props: {
    number: {
      required: true,
      type: Number,
    },
    isMerged: {
      required: true,
      type: Boolean
    },
    isNew: {
      required: true,
      type: Boolean
    }
  },
  setup(props) {
    const numberClass = computed<NumberClass>(() => `number-${props.number}`);

    return { numberClass };
  },
})
</script>


<style lang="scss" scoped>
@use '../../../../../shared/scss/variables/measurements.scss';
@use '../../../../../shared/scss/variables/colors.scss';
@use '../../../../../shared/scss/variables/shadows.scss';
@use 'sass:math';

// background, text-color
$colors:
hsl(60, 0%, 80%), colors.$text-dark,
hsl(60, 50%, 80%), colors.$text-dark,
hsl(30, 100%, 70%), colors.$text-dark,
hsl(30, 100%, 50%), colors.$text-light,
hsl(0, 75%, 60%), colors.$text-light,
hsl(0, 85%, 50%), colors.$text-light,
hsl(100, 60%, 70%), colors.$text-dark,
hsl(100, 80%, 50%), colors.$text-dark,
hsl(220, 60%, 60%), colors.$text-light,
hsl(220, 90%, 50%), colors.$text-light,
hsl(280, 70%, 60%), colors.$text-light;

.tile {
  position: absolute;
  border-radius: measurements.$border-radius;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  font-weight: bold;
  font-family: monospace;
  box-shadow: shadows.$main;

  &.merged {
    animation: mergeTile 0.3s ease;
  }

  &.new {
    animation: createTile 0.3s ease;
  }
}

@for $i from 1 through 11 {
  $background-color: nth($colors, 2 * $i - 1);
  $color: nth($colors, 2 * $i);
  $number: math.pow(2, $i);

  .tile.number-#{$number} {
    background-color: $background-color;
    color: $color;

    @if $number >= 1000 {
      font-size: 3rem;
    }
  }
}

@keyframes mergeTile {
  0% {
    transform: scale(1.0);
  }

  50% {
    transform: scale(1.15);
  }

  100% {
    transform: scale(1.0);
  }
}

@keyframes createTile {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1.0);
  }
}
</style>