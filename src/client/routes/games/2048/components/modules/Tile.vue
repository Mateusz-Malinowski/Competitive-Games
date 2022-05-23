<template>
  <div class="tile">

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    row: {
      required: true,
      type: Number
    },
    column: {
      required: true,
      type: Number
    }
  },
  setup(props) {
    
  },
})
</script>


<style lang="scss" scoped>
@use '../../../../../shared/scss/variables/measurements.scss';

.tile {
  position: absolute;
  background-color: red;
  border-radius: measurements.$border-radius;
}
</style>