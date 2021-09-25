<template>
  <span>{{ timeString }}</span>
</template>

<script lang="ts">
import { computed, defineComponent, watchEffect } from 'vue'
import { useStore } from '../../store'

export default defineComponent({
  setup() {
    const store = useStore();

    const timeString = computed<string>(() => store.getters['timer/getTimeString']);

    return { timeString };
  },
})
</script>

<style lang="scss" scoped>
  span {
    font-family: monospace;
  }
</style>