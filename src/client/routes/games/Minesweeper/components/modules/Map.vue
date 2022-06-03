<template>
  <div ref="mapElement" class="map">
    <div class="row" v-for="row in numberOfRows" :key="row">
      <Field
        v-for="column in numberOfColumns"
        :key="`${row}${column}`"
        :row="row - 1"
        :column="column - 1"
        :style="fieldStyle"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "../../store";
import Field from "./Field.vue";

interface FieldStyle {
  width?: string;
  height?: string;
  fontSize?: string;
}

export default defineComponent({
  components: { Field },
  setup() {
    const store = useStore();

    const numberOfRows = computed<number>(() => store.state.map.numberOfRows);
    const numberOfColumns = computed<number>(() => store.state.map.numberOfColumns);

    const mapElement = ref<HTMLDivElement>();

    const fieldStyle = ref<FieldStyle>();
    const adjustFieldStyle = () => {
      const mapDiv = mapElement.value as HTMLDivElement;
      
      fieldStyle.value = {};
      window.setTimeout(() => {
        const fieldWidth = mapDiv.clientWidth / numberOfColumns.value;
        const fieldHeight = fieldWidth;

        fieldStyle.value = {
          width: fieldWidth + "px",
          height: fieldHeight + "px",
          fontSize: fieldHeight - 6 + "px",
        };
      }, 0);
    };

    return { numberOfRows, numberOfColumns, mapElement, fieldStyle, adjustFieldStyle };
  },
  mounted() {
    this.adjustFieldStyle();
    window.addEventListener("resize", this.adjustFieldStyle);
  },
  unmounted() {
    window.removeEventListener("resize", this.adjustFieldStyle);
  },
});
</script>

<style lang="scss" scoped>
$border-color: rgb(180, 180, 180);

.map {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  border: 1px solid $border-color;

  .row {
    display: flex;

    .field {
      border: 1px solid $border-color;
    }
  }
}
</style>
