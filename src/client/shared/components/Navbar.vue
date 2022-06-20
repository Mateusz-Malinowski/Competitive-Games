<template>
  <nav>
    <div class="navbar">
      <a href="/" class="logo">
        <img :src="logoPathFull" alt="full-logo" class="logo-full" />
        <img :src="logoPathSmall" alt="small-logo" class="logo-small" />
      </a>
      <div class="links" :class="{ dropped: isDropped }">
        <a
          v-for="link in contentLinks"
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
import logoPathFull from "url:../assets/logos/full-logo.svg";
import logoPathSmall from "url:../assets/logos/logo.svg";
import DropdownButton from "./DropdownButton.vue";

export default defineComponent({
  components: { DropdownButton },
  setup() {
    const contentLinks = ref([
      { name: "Home", href: "/" },
      { name: "Games", href: "/game-list" },
      { name: "Trophies", href: "/trophies" },
    ]);

    const isDropped = ref<Boolean>(false);

    const dropMenu = (): void => {
      isDropped.value = !isDropped.value;
    };

    return { logoPathFull, logoPathSmall, contentLinks, isDropped, dropMenu };
  },
});
</script>

<style lang="scss" scoped>
@use "../scss/variables/colors";
@use "../scss/variables/measurements";
@use "../scss/variables/shadows";
@use "../scss/modules/button";
@use "../scss/mixins/devices";
@use '../scss/modules/noselect';
@use 'sass:math';

nav {
  display: flex;
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100%;
  @extend %noselect;

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

    .logo {
      margin-right: #{math.div(measurements.$page-spacing, 2)};

      img {
        height: 35px;
        filter: drop-shadow(shadows.$icon);

        &.logo-full {
          display: none;
        }
      }
    }

    .links {
      display: flex;
      opacity: 0%;
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
      transition-property: opacity, transform;
      transition-duration: 0.3s;
      transition-timing-function: ease;
      transform: translateY(-200px);

      &.dropped {
        opacity: 100%;
        overflow: hidden;
        transform: translateY(0);
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
      }
    }
  }
}

@include devices.laptop {
  nav {
    .navbar {
      justify-content: unset;

      .dropdown-button {
        display: none;
      }

      .links {
        height: 100%;
        opacity: 100%;
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
        transform: translateY(0);

        .link {
          height: 100%;
          padding: 0 #{math.div(measurements.$page-spacing, 2)};
        }
      }
    }
  }
}

@include devices.tablet {
  nav {
    .navbar {
      .logo {
        img.logo-small {
          display: none;
        }

        img.logo-full {
          display: unset;
        }
      }
    }
  }
}
</style>
