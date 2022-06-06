<template>
  <footer>
    <address>
      Made by
      <a href="mailto:mateusz.malinowski.343@gmail.com" class="link-author"
        >Malina</a
      >
    </address>
    <div class="copyright">
      &copy; Mateusz Malinowski 2022. All rights reserved.
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>


<style lang="scss" scoped>
@use "../scss/variables/colors";
@use "../scss/variables/measurements";
@use "../scss/variables/shadows";
@use "../scss/mixins/devices";
@use "sass:math";

footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: colors.$footer;
  color: colors.$text-light;
  padding: 10px;
  box-shadow: shadows.$footer;
  margin-top: auto;

  .link-author {
    font-weight: bold;
    transition: text-shadow 0.3s ease;

    &:hover {
      text-shadow: 0 0 2px colors.$text-light;
    }
  }

  .copyright {
    margin-top: 5px;
    font-style: italic;
    font-size: 0.6em;

    @include devices.tablet {
      font-size: 0.8em;
    }
  }
}
</style>