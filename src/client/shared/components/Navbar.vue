<template>
  <nav>
    <div class="navbar">
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
      <DropdownButton
        @click="dropMenu"
        :isDropped="isDropped"
        class="dropdown-button"
      />
    </div>
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
    };

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
@use 'sass:math';

nav {
  display: flex;
  position: sticky;
  top: 0;
  margin: 0 measurements.$page-spacing;

  .navbar {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: measurements.$navbar-height;
    background-color: colors.$navbar;
    padding: 0 #{math.div(measurements.$page-spacing, 2)};
    box-shadow: shadows.$navbar;
    border-bottom-left-radius: measurements.$border-radius;
    border-bottom-right-radius: measurements.$border-radius;

    @include devices.laptop {
      justify-content: unset;
    }

    .logo {
      margin-right: #{math.div(measurements.$page-spacing, 2)};

      img {
        height: 35px;
      }
    }

    .links {
      display: none;
      position: absolute;
      width: calc(100% - #{measurements.$border-radius * 2});
      flex-direction: column;
      top: measurements.$navbar-height;
      left: measurements.$border-radius;
      background-color: colors.$navbar;
      box-shadow: shadows.$navbar;
      border-bottom-left-radius: measurements.$border-radius;
      border-bottom-right-radius: measurements.$border-radius;
      z-index: -1;

      &.dropped {
        display: flex;
        overflow: hidden;
      }

      @include devices.laptop {
        display: flex;
        height: 100%;
        position: unset;
        width: unset;
        flex-direction: unset;
        top: unset;
        left: unset;
        background-color: unset;
        box-shadow: unset;
        border-bottom-left-radius: unset;
        border-bottom-right-radius: unset;
        z-index: unset;
      }

      .link {
        @extend %button;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color 0.3s ease;
        padding: 10px 0;

        &:hover {
          background-color: darken(colors.$navbar, 10%);
        }

        @include devices.laptop {
          height: 100%;
          padding: 0 #{math.div(measurements.$page-spacing, 2)};
        }
      }
    }

    .dropdown-button {
      @include devices.laptop {
        display: none;
      }
    }
  }
}
</style>
