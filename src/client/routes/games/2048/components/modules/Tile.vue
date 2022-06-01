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
@use 'sass:math';

// background, text-color
$colors: 
rgb(210, 210, 210), colors.$text-dark,
rgb(210, 210, 130), colors.$text-dark,
rgb(255, 154, 66), colors.$text-light,
rgb(255, 119, 0), colors.$text-light,
rgb(255, 70, 70), colors.$text-light,
colors.$secondary, colors.$text-light,
rgb(190, 192, 83), colors.$text-light,
rgb(197, 172, 8), colors.$text-light,
rgb(67, 110, 229), colors.$text-light,
rgb(43, 20, 222), colors.$text-light,
colors.$tertiary, colors.$text-dark;

.tile {
  position: absolute;
  border-radius: measurements.$border-radius;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5em;
  font-weight: bold;
  font-family: monospace;

  &.merged {
    animation: mergeTile 0.3s ease;
  }

  &.new {
    animation: createTile 0.3s ease;
  }
}

@for $i from 1 through 11 {
  .tile.color-#{math.pow(2, $i)} {
    background-color: nth($colors, 2 * $i - 1);
    color: nth($colors, 2 * $i);
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