<template>
  <div class="start-screen">
    <div class="content">
      <div class="description-game">
        <slot name="gameDescription">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi voluptates
          saepe repellendus at minus excepturi, enim molestias quas amet
          perferendis! Itaque cumque tempore odit similique facere repudiandae
          nesciunt voluptatibus ab? Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Iure aperiam consequuntur laborum exercitationem.
          Quisquam iusto nesciunt error officiis amet voluptas.
        </slot>
      </div>
      <div class="controls">
        <slot name="controls"></slot>
      </div>
    </div>
    <AnimatedButton class="button-play" @click="handlePlay">Play</AnimatedButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AnimatedButton from "../components/AnimatedButton.vue";

export default defineComponent({
  components: { AnimatedButton },
  props: {
    handlePlay: {
      required: true,
      type: Function as () => void
    }
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
@use '../scss/variables/measurements.scss';
@use 'sass:math';

.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .description-game {
    font-size: 1.5em;
    text-align: justify;
  }

  .controls {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: math.div(measurements.$page-spacing, 2);

    > :slotted(*) {
      margin: math.div(measurements.$page-spacing, 2);
    }
  }

  .button-play {
    font-size: 1.5rem;
  }
}
</style>
