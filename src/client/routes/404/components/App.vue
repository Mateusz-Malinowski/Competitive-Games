<template>
  <div class="limiter">
    <div class="content">
      <Transition name="swipe" appear>
        <img :src="imgSrc404" alt="404" class="img-404" />
      </Transition>
      <Transition name="swipe" appear>
        <h2>Hey! No competition here!</h2>
      </Transition>
      <Transition name="swipe" appear>
        <h3>Go back home and play Competitve Games!</h3>
      </Transition>
      <Transition name="pop" appear>
        <AnimatedButton class="button-home" href="/">Go back home</AnimatedButton>
      </Transition>  
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AnimatedButton from "../../../shared/components/AnimatedButton.vue";
import imgPath404 from "url:../assets/404.svg";

export default defineComponent({
  components: { AnimatedButton },
  setup() {
    const imgSrc404 = ref(imgPath404);

    return { imgSrc404 };
  },
});
</script>

<style lang="scss" scoped>
@use "../../../shared/scss/variables/measurements";
@use "../../../shared/scss/variables/shadows";

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: measurements.$page-spacing;
}

.img-404 {
  width: 100%;
  max-height: 50vh;
  filter: drop-shadow(shadows.$icon);
}

h2,
h3,
.button-home {
  margin-top: measurements.$page-spacing;
}

h2,
h3 {
  text-align: center;
}

h2 {
  font-size: 2.5rem;
}

h3 {
  font-size: 1.5rem;
}

.button-home {
  font-size: 1.5rem;
}
</style>
