<template>
  <Navbar />
  <div class="wrapper wrapper-minesweeper">
    <div class="content-block content-game">
      <GameModes v-if="gameStatus == GameStatus.ChoosingGameMode" />
      <Map v-if="gameStatus == GameStatus.Playing" />
      <Results v-if="gameStatus == GameStatus.SeeingResults" />
    </div>
    <div class="content-block content-timer">
      <Timer />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Navbar from "../../../../shared/components/Navbar.vue";
import GameModes from "./modules/GameModes.vue";
import Map from "./modules/Map.vue";
import Results from "./modules/Results.vue";
import Timer from "./modules/Timer.vue";

import WebSocketController from "../api/WebSocketController";
import FieldPacket from "../../../../../global/games/Minesweeper/packets/server/FieldPacket";
import { useStore } from "../store";
import { GameResult, GameStatus } from "../store/modules/game";
import GameOverPacket from "../../../../../global/games/Minesweeper/packets/server/GameOverPacket";
import GameWonPacket from "../../../../../global/games/Minesweeper/packets/server/GameWonPacket";

export default defineComponent({
  components: { Navbar, Map, GameModes, Timer, Results },
  setup() {
    const store = useStore();

    const gameStatus = computed(() => store.state.game.gameStatus);

    const stopAndCorrectTimer = (serverTime: number): void => {
      store.dispatch("timer/stop");
      store.commit("timer/setTotalMiliseconds", serverTime);
    };

    const handleEndGame = (
      serverTime: number,
      gameResult: GameResult
    ): void => {
      stopAndCorrectTimer(serverTime);
      store.commit("game/setGameResult", gameResult);
      setTimeout(() => {
        store.commit("game/setGameStatus", GameStatus.SeeingResults);
      }, 3000);
    };

    WebSocketController.handleFieldPacket = (packet: FieldPacket): void => {
      if (!store.state.timer.isTicking) store.dispatch("timer/start");
      store.commit("map/updateFieldData", packet);
    };

    WebSocketController.handleGameOverPacket = (
      packet: GameOverPacket
    ): void => {
      handleEndGame(packet.time, GameResult.Defeat);
    };

    WebSocketController.handleGameWonPacket = (packet: GameWonPacket): void => {
      handleEndGame(packet.time, GameResult.Win);
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
@use '../../../../shared/scss/modules/noselect';
@use '../../../../shared/scss/variables/measurements';
@use '../../../../shared/scss/mixins/devices';

.wrapper-minesweeper {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  @include devices.desktop {
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
  }

  @extend %noselect;
}

.content-game {
  display: flex;
  flex-shrink: 0;

  @include devices.phone {
    width: 300px + measurements.$page-spacing * 2;
    height: 300px + measurements.$page-spacing * 2;
  }

  @include devices.tablet {
    width: 400px + measurements.$page-spacing * 2;
    height: 400px + measurements.$page-spacing * 2;
  }

  @include devices.laptop {
    width: 500px + measurements.$page-spacing * 2;
    height: 500px + measurements.$page-spacing * 2;
  }

  @include devices.desktop {
    width: 550px + measurements.$page-spacing * 2;
    height: 550px + measurements.$page-spacing * 2;
  }
}

.content-timer {
  display: flex;
  margin-bottom: measurements.$page-spacing;

  @include devices.desktop {
    margin-left: measurements.$page-spacing;
    margin-bottom: 0;
  }

  font-size: 3em;
}
</style>
