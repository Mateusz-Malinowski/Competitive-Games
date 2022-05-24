<template>
  
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Emits {
  (name: 'keyup', keyName: string): void;
}

export default defineComponent({
  setup(props, { emit }: { emit: Emits }) {
    const handleKeyUp = (event: KeyboardEvent): void => {
      emit('keyup', event.key);
    };

    return { handleKeyUp };
  },
  mounted() {
    console.log("created keyboard events");
    window.addEventListener("keyup", this.handleKeyUp);
  },
  unmounted() {
    console.log("destroyed keyboard events");
    window.removeEventListener("keyup", this.handleKeyUp);
  },
});
</script>
