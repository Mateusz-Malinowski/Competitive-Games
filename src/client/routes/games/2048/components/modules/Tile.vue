<template>
  <div class="tile" :class="[colorClass, { merged: isMerged, new: isNew }]">
    <span>{{ number }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

type ColorClass = `color-${number}`;

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
    const colorClass = computed<ColorClass>(() => `color-${props.number}`);

    return { colorClass };
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
  font-size: 4.5em;
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

  .tile.color-#{math.pow(2, $i)} {
    background-color: $background-color;
    color: $color;
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