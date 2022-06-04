<template>
  <div class="info-tiles">
    <InfoTile>
      <template #icon>
        <span class="material-symbols-rounded">dns</span>
      </template>
      <template #header>Server-side data</template>
      <template #content></template>
    </InfoTile>
    <InfoTile>
      <template #icon>
        <span class="material-symbols-rounded">bolt</span>
      </template>
      <template #header>Lightning fast responses</template>
      <template #content></template>
    </InfoTile>
    <InfoTile>
      <template #icon>
        <span class="material-symbols-rounded">leaderboard</span>
      </template>
      <template #header>Competition</template>
      <template #content></template>
    </InfoTile>
    <InfoTile>
      <template #icon>
        <span class="material-symbols-rounded">timer</span>
      </template>
      <template #header>Time attack</template>
      <template #content></template>
    </InfoTile>
    <InfoTile>
      <template #icon>
        <span class="material-symbols-rounded">score</span>
      </template>
      <template #header>Score madness</template>
      <template #content></template>
    </InfoTile>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InfoTile from "./InfoTile.vue";

export default defineComponent({
  components: { InfoTile },
  setup() {},
});
</script>

<style lang="scss" scoped>
@use "../../../../shared/scss/variables/measurements";
@use "../../../../shared/scss/mixins/devices";

.info-tiles {
  display: grid;
  gap: measurements.$page-spacing;
}

@include devices.large-laptop {
  .info-tiles {
    grid-template-columns: 1fr 1fr;

    > *:first-child {
      grid-column: span 2;
    }
  }
}

@include devices.desktop {
  .info-tiles {
    grid-template-columns: 1fr 0.5fr 0.5fr 1fr;

    > *:nth-child(-n + 2) {
      grid-column: span 2;
    }

    > *:nth-child(4) {
      grid-column: span 2;
    }
  }
}
</style>
