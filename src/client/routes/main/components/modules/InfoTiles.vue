<template>
  <div class="info-tiles">
      <InfoTile v-transition-in-viewport="'swipe'">
        <template #icon>
          <span class="material-symbols-rounded">dns</span>
        </template>
        <template #header>Server-side data</template>
        <template #content>
          No place for cheaters here in Competitive Games - game server creates
          a data representation of the game you are playing and handles the
          input that the player provides. Everything related to game logic is
          stored on the server, so that the user can't have access to it.
        </template>
      </InfoTile>
      <InfoTile v-transition-in-viewport="'swipe'">
        <template #icon>
          <span class="material-symbols-rounded">bolt</span>
        </template>
        <template #header>Lightning fast responses</template>
        <template #content>
          The connection between the server and the client is established via
          WebSocket, which makes the responses lightning fast. Additionally,
          data that does not need to be send by the server is processed on the
          client side, which results in no latency between the player's decision
          and the reaction displayed on the screen.
        </template>
      </InfoTile>
      <InfoTile v-transition-in-viewport="'swipe'">
        <template #icon>
          <span class="material-symbols-rounded">timer</span>
        </template>
        <template #header>Time attack</template>
        <template #content>
          In time attack games, your goal is to complete the game in the
          shortest possible time. You can see your current position in the
          leaderboard preview. You start the game being first in the leaderboard
          and you fall down when the game takes you longer than the player below
          you.
        </template>
      </InfoTile>
      <InfoTile v-transition-in-viewport="'swipe'">
        <template #icon>
          <span class="material-symbols-rounded">leaderboard</span>
        </template>
        <template #header>Competition</template>
        <template #content>
          Here everything is competitive. Compare your results to other players
          and climb to the top of the leaderboards. Add friends to compete with
          them and compare the results. Earn trophies for your achievements and
          certain activities you perform.
        </template>
      </InfoTile>
      <InfoTile v-transition-in-viewport="'swipe'">
        <template #icon>
          <span class="material-symbols-rounded">score</span>
        </template>
        <template #header>Score madness</template>
        <template #content>
          In score madness games, your goal is to achieve the highest score
          possible. You can see your current position in the Leaderboard
          preview. You start the game being the last one in the leaderboard and
          you climb up as you score more points.
        </template>
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
