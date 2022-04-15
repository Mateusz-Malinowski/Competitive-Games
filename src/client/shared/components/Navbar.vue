<template>
  <nav>
    <a href="/" class="logo">
      <img :src="logoSrc" alt="full-logo" />
    </a>
    <div class="links" :class="{ dropped: isDropped }">
      <a
        v-for="link in navbarLinks"
        :key="link.name"
        :href="link.href"
        class="link"
      >
        {{ link.name }}
      </a>
    </div>
    <DropdownButton @click="dropMenu" :isDropped="isDropped" class="dropdown-button" />
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import logoPath from "url:../assets/full-logo.svg";

import DropdownButton from "./DropdownButton.vue";

export default defineComponent({
  components: { DropdownButton },
  setup() {
    const logoSrc = ref(logoPath);

    const navbarLinks = ref([
      { name: "Home", href: "/" },
      { name: "Games", href: "/games" },
      { name: "Profile", href: "/profile" },
    ]);

    const isDropped = ref<Boolean>(false);

    const dropMenu = (): void => {
      isDropped.value = !isDropped.value;
    }

    return { logoSrc, navbarLinks, isDropped, dropMenu };
  },
});
</script>

<style lang="scss" scoped>
@use "../scss/variables/colors";
@use "../scss/variables/measurements";
@use "../scss/variables/shadows";
@use "../scss/modules/button";
@use "../scss/mixins/devices";

nav {
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: calc(100% - #{measurements.$page-spacing * 2});
  top: 0;
  align-items: center;
  height: measurements.$navbar-height;
  background-color: colors.$navbar;
  margin: 0 measurements.$page-spacing;
  padding: 0 #{measurements.$page-spacing / 2};
  box-shadow: shadows.$navbar;
  border-bottom-left-radius: measurements.$border-radius;
  border-bottom-right-radius: measurements.$border-radius;

  @include devices.laptop {
    justify-content: unset;
  }

  .logo {
    margin-right: #{measurements.$page-spacing / 2};

    img {
      height: 35px;
    }
  }

  .links {
    display: none;

    &.dropped {
      display: flex;
    }

    position: absolute;
    width: calc(100% - #{measurements.$border-radius * 2});
    flex-direction: column;
    top: measurements.$navbar-height;
    left: measurements.$border-radius;
    background-color: colors.$navbar;
    box-shadow: shadows.$navbar;
    z-index: -1;
    border-bottom-left-radius: measurements.$border-radius;
    border-bottom-right-radius: measurements.$border-radius;

    @include devices.laptop {
      display: flex;
      position: unset;
      width: unset;
      flex-direction: unset;
      top: unset;
      background-color: unset;
      box-shadow: unset;
      z-index: unset;
      border-bottom-left-radius: unset;
      border-bottom-right-radius: unset;

      height: 100%;
    }
  }

  .link {
    @extend %button;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
    padding: 10px 0;

    @include devices.laptop {
      padding: 0 #{measurements.$page-spacing / 2};
    }

    &:hover {
      background-color: darken(colors.$navbar, 10%);
    }
  }

  .dropdown-button {
    @include devices.laptop {
      display: none;
    }
  }
}
</style>
