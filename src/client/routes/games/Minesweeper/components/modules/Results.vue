<template>
  <div class="results">
    <h2
      class="results-header"
      :class="[
        { win: result == GameResult.Win },
        { defeat: result == GameResult.Defeat },
      ]"
    >
      {{ result == GameResult.Win ? "Congratulations!" : "Game Over!" }}
    </h2>
    <!-- todo:
    comparission to pb, average, world etc
    if pb was made then how many positions up in the ranks
    cool animations etc
    -->
    <AnimatedButton class="results-button" @click="tryAgain">Try again</AnimatedButton>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../../store";
import { GameResult, GameStatus } from "../../store/modules/game";
import AnimatedButton from '../../../../../shared/components/AnimatedButton.vue';

export default defineComponent({
  components: { AnimatedButton },
  setup() {
    const store = useStore();

    const result = computed(() => store.state.game.gameResult);

    const tryAgain = (): void => {
      store.commit('game/setGameStatus', GameStatus.ChoosingGameMode);
      store.dispatch('timer/reset');
    }

    return { result, GameResult, tryAgain };
  },
});
</script>

<style lang="scss" scoped>
@use '../../../../../shared/scss/variables/colors';
@use '../../../../../shared/scss/variables/measurements';

.results {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.results-header {
  margin-bottom: measurements.$page-spacing;
  font-size: 3em;
  
  &.win {
    color: colors.$tertiary;
  }

  &.defeat {
    color: colors.$bad;
  }
}

.results-button {
  font-size: 1.5em;
}
</style>
