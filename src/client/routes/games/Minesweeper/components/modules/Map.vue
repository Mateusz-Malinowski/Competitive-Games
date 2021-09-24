<template>
  <div ref="mapElement" class="map">
    <div class="row" v-for="row in numberOfRows" :key="row">
      <Field
        v-for="column in numberOfColumns"
        :key="`${row}${column}`"
        :row="row - 1"
        :column="column - 1"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../../store";
import Field from "./Field.vue";
import { connectToWebSocket } from '../../api/webSocket';

export default defineComponent({
  components: { Field },
  setup() {
    const store = useStore();

    const numberOfRows = computed(() => store.state.map.numberOfRows);
    const numberOfColumns = computed(() => store.state.map.numberOfColumns);

    return { numberOfRows, numberOfColumns };
  },
  async mounted() {
    const webSocket = await connectToWebSocket();
  }
});
</script>

<style lang="scss" scoped>
@use '../../../../../shared/scss/mixins/devices';

$border-color: rgb(180, 180, 180);

.map {
  display: flex;
  flex-direction: column;
  border: 1px solid $border-color;

  @include devices.phone {
    width: 300px;
    height: 300px;
  }

  @include devices.tablet {
    width: 400px;
    height: 400px;
  }

  @include devices.laptop {
    width: 500px;
    height: 500px;
  }

  @include devices.large-laptop {
    width: 600px;
    height: 600px;
  }

  .row {
    display: flex;
    flex-grow: 1;

    .field {
      border: 1px solid $border-color;
    }
  }
}
</style>
