<template>
  <div class="start-screen">
    <div class="description">
      <slot name="description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi voluptates
        saepe repellendus at minus excepturi, enim molestias quas amet
        perferendis! Itaque cumque tempore odit similique facere repudiandae
        nesciunt voluptatibus ab? Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Iure aperiam consequuntur laborum exercitationem.
        Quisquam iusto nesciunt error officiis amet voluptas.
      </slot>
    </div>
    <AnimatedButton @click="handlePlay">
      <span>Play</span>
    </AnimatedButton>
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
.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;

  .description {
    font-size: 1.5em;
    text-align: justify;
  }
}
</style>
