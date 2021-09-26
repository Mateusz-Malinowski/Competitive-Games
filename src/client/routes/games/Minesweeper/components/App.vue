<template>
  <Navbar />
  <div class="wrapper wrapper-map">
    <div class="content-block content-game">
      <GameModes v-if="gameStatus == GameStatus.ChoosingGameMode" />
      <Map v-if="gameStatus == GameStatus.Playing" />
    </div>
    <div class="content-block content-timer">
      <Timer />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Navbar from "../../../../shared/components/Navbar.vue";
import GameModes from './modules/GameModes.vue';
import Map from "./modules/Map.vue";
import Timer from "./modules/Timer.vue";

import WebSocketController from "../api/WebSocketController";
import FieldPacket from "../../../../../global/games/Minesweeper/packets/server/FieldPacket";
import { useStore } from "../store";
import { GameStatus as GameStatusEnum } from "../store/modules/game";
import GameOverPacket from "../../../../../global/games/Minesweeper/packets/server/GameOverPacket";
import GameWonPacket from "../../../../../global/games/Minesweeper/packets/server/GameWonPacket";

export default defineComponent({
  components: { Navbar, Map, GameModes, Timer },
  setup() {
    const store = useStore();

    const gameStatus = computed(() => store.state.game.gameStatus);
    const GameStatus = GameStatusEnum;

    const stopAndCorrectTimer = (serverTime: number): void => {
      store.dispatch("timer/stop");
      const timeDifference = serverTime - store.getters["timer/getTotalMiliseconds"];
      store.commit('timer/setCurrentTime', store.state.timer.currentTime + timeDifference);
    };

    WebSocketController.handleFieldPacket = (packet: FieldPacket): void => {
      if (!store.state.timer.isTicking) store.dispatch("timer/start");
      store.commit("map/updateFieldData", packet);
    };

    WebSocketController.handleGameOverPacket = (
      packet: GameOverPacket
    ): void => {
      stopAndCorrectTimer(packet.time);
    };

    WebSocketController.handleGameWonPacket = (packet: GameWonPacket): void => {
      stopAndCorrectTimer(packet.time);
    };

    return { gameStatus, GameStatus };
  },
  async mounted() {
    const webSocketController = new WebSocketController();

    try {
      await webSocketController.connect();
    } catch (error: any) {
      return;
    }

    webSocketController.listenForMessages();
  },
});
</script>

<style lang="scss" scoped>
@use '../../../../shared/scss/variables/measurements';
@use '../../../../shared/scss/mixins/devices';

.wrapper-map {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.content-game {
  display: inline-flex;
  
  @include devices.phone {
    width: 300px + measurements.$page-spacing;
    height: 300px + measurements.$page-spacing;
  }

  @include devices.tablet {
    width: 400px + measurements.$page-spacing;
    height: 400px + measurements.$page-spacing;
  }

  @include devices.laptop {
    width: 500px + measurements.$page-spacing;
    height: 500px + measurements.$page-spacing;
  }

  @include devices.large-laptop {
    width: 600px + measurements.$page-spacing;
    height: 600px + measurements.$page-spacing;
  }
}

.content-timer {
  display: inline-flex;
  margin-left: measurements.$page-spacing;
  font-size: 3em;
}
</style>
