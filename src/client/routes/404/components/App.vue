<template>
  <div class="content-404">
    <img :src="imgSrc404" alt="404" class="img-404" />
    <h2>The game you're looking for doesn't exists...</h2>
    <h3>Go back to playing Competitive Games!</h3>
    <AnimatedButton class="button-home" href="/">Go back home</AnimatedButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Navbar from "../../../shared/components/Navbar.vue";
import AnimatedButton from "../../../shared/components/AnimatedButton.vue";
import imgPath404 from "url:../assets/404.svg";

export default defineComponent({
  components: { Navbar, AnimatedButton },
  setup() {
    const imgSrc404 = ref(imgPath404);

    return { imgSrc404 };
  },
});
</script>

<style lang="scss" scoped>
@use '../../../shared/scss/variables/measurements';

.content-404 {
  padding: measurements.$page-spacing;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.img-404 {
  width: 100%;
  max-width: 800px;
}

h2,
h3,
.button-home {
  margin-top: 40px;
}

h2,
h3 {
  text-align: center;
}

h2 {
  font-size: 2.5em;
}

h3 {
  font-size: 1.5em;
}

.button-home {
  font-size: 1.5em;
}
</style>
