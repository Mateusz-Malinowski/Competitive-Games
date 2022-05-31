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
import { computed, defineComponent, PropType } from "vue";
import { GameResult, GameStatus } from "../store/modules/game";
import { SharedState } from '../store'
import AnimatedButton from '../components/AnimatedButton.vue';
import { Store } from "vuex";

export default defineComponent({
  components: { AnimatedButton },
  props: {
    store: {
      required: true,
      type: Object as PropType<Store<SharedState>>
    }
  },
  setup(props) {
    // const store = props.store as Store<SharedState>;
    const result = computed<GameResult>(() => props.store.state.game.gameResult);

    const tryAgain = (): void => {
      props.store.commit('game/setGameStatus', GameStatus.Start);
      props.store.dispatch('timer/reset');
    }

    return { result, GameResult, tryAgain };
  },
});
</script>

<style lang="scss" scoped>
@use '../scss/variables/colors';
@use '../scss/variables/measurements';

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
