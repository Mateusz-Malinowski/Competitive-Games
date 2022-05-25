<template>
  <div class="tile" :class="className">
    <span>{{ number }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

type ClassName = `color-${number}`;

export default defineComponent({
  props: {
    number: {
      required: true,
      type: Number,
    }
  },
  setup(props) {
    const className = computed<ClassName>(() => `color-${props.number}`);

    return { className };
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
  font-family: monospace
}

@for $i from 1 through 11 {
  .tile.color-#{math.pow(2, $i)} {
    background-color: nth($colors, 2 * $i - 1);
    color: nth($colors, 2 * $i);
  }
}
</style>