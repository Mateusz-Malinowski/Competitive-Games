<template>
  <div class="start-screen">
    <div class="content-text">
      <h2 class="name-game">
        <slot name="gameName">Game Name</slot>
      </h2>
      <p class="description-game">
        <slot name="gameDescription">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi
          voluptates saepe repellendus at minus excepturi, enim molestias quas
          amet perferendis! Itaque cumque tempore odit similique facere
          repudiandae nesciunt voluptatibus ab? Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Iure aperiam consequuntur laborum
          exercitationem. Quisquam iusto nesciunt error officiis amet voluptas.
        </slot>
      </p>
    </div>
    <div class="controls">
      <slot name="controls"></slot>
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
      type: Function as () => void,
    },
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
@use "../scss/variables/measurements.scss";
@use "sass:math";

.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin-top: measurements.$page-spacing;

    &:first-child {
      margin-top: 0;
    }
  }

  .content-text {
    .name-game {
      text-align: center;
      margin-bottom: math.div(measurements.$page-spacing, 2);
      font-size: 2.5rem;
    }

    .description-game {
      margin: 0;
      font-size: 1.4rem;
      text-align: justify;
    }
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
