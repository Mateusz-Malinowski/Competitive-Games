<template>
  <div class="content-block info-tile">
    <div class="icon">
      <slot name="icon">
        <span class="material-symbols-rounded">info</span>
      </slot>
    </div>
    <div class="content-text">
      <h2 class="header">
        <slot name="header">Header</slot>
      </h2>
      <p class="content">
        <slot name="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
          incidunt quisquam minima, a suscipit vero aut cum porro, rem
          consectetur eaque? Sed ratione, sint exercitationem delectus, omnis
          quisquam repellat atque ullam in autem esse assumenda facilis! Amet ut
          nemo, iste itaque mollitia quam modi tempore voluptate cumque.
          Reprehenderit, earum doloremque.
        </slot>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
@use "../../../../shared/scss/variables/measurements";
@use "../../../../shared/scss/variables/colors";
@use "../../../../shared/scss/mixins/devices";
@use "sass:math";

.info-tile {
  display: flex;
  flex-direction: column;
  align-items: center;

  .icon {
    :slotted(span) {
      font-size: 6rem;
    }
  }

  .content-text {
    margin-top: measurements.$page-spacing;

    .header {
      font-size: 1.8rem;
      text-align: center;
    }

    .content {
      margin: 0;
      margin-top: math.div(measurements.$page-spacing, 2);
      font-size: 1.2rem;
      word-wrap: break-word;
      hyphens: auto;
    }
  }
}

@include devices.laptop {
  .info-tile {
    .content-text {
      .content {
        text-align: justify;
      }
    }
  }
}
</style>
