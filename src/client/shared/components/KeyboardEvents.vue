<template>
  
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Emits {
  (name: 'keydown', event: KeyboardEvent): void;
}

export default defineComponent({
  setup(props, { emit }: { emit: Emits }) {
    const handleKeyDown = (event: KeyboardEvent): void => {
      emit('keydown', event);
    };

    return { handleKeyDown };
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyDown);
  },
  unmounted() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },
});
</script>
