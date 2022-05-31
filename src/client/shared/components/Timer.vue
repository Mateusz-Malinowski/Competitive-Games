<template>
  <span class="timer">{{ timeString }}</span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { Store } from "vuex";
import { SharedState } from "../store";

export default defineComponent({
  props: {
    store: {
      required: true,
      type: Object as PropType<Store<SharedState>>
    }
  },
  setup(props) {
    const timeString = computed<string>(
      () => props.store.getters["timer/getTimeString"]
    );

    return { timeString };
  },
});
</script>

<style lang="scss" scoped>
.timer {
  font-family: monospace;
}
</style>