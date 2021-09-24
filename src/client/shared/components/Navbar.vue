<template>
  <nav>
    <a href="/" class="logo">
      <img :src="logoSrc" alt="full-logo">
    </a>
    <a v-for="link in navbarLinks" :key="link.name" :href="link.href" class="link">
      {{ link.name }}
    </a>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import logoPath from 'url:../assets/full-logo.svg';

export default defineComponent({
  setup() {
    const logoSrc = ref(logoPath);

    const navbarLinks = ref([
      { name: "Home", href: "/" },
      { name: "Games", href: "/games" },
      { name: "Profile", href: "/profile" },
    ]);

    return { logoSrc, navbarLinks };
  },
});
</script>

<style lang="scss" scoped>
@use "../scss/variables/colors";
@use "../scss/variables/measurements";
@use "../scss/variables/shadows";
@use "../scss/modules/button";

nav {
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  height: measurements.$navbar-height;
  background-color: colors.$navbar;
  margin: 0 measurements.$page-spacing;
  box-shadow: shadows.$navbar;
  border-bottom-left-radius: measurements.$border-radius;
  border-bottom-right-radius: measurements.$border-radius;

  .logo {
    margin: 0 20px;

    img {
      height: 35px;
    }
  }

  .link {
    @extend %button;
    display: flex;
    height: 100%;
    align-items: center;
    transition: background-color 0.3s ease;
    padding: 0 20px;

    &:hover {
      background-color: darken(colors.$navbar, 10%);
    }
  }
}
</style>
