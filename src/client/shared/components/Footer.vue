<template>
  <footer>
    <address>
      Made by <span class="author">Malina</span>
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

  address {
    .author {
      font-weight: bold;
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