<template>
  <div class="limiter">
    <Navbar />
    <div class="wrapper wrapper-minesweeper">
      <div v-if="gameStatus === GameStatus.Start" class="content-block content-start">
        <StartScreen :handlePlay="startGame">
          <template #gameName>Minesweeper</template>
          <template #gameDescription>
            Welcome to Minesweeper game! Your objective is to reveal all fields
            that don't contain a hidden bomb. First reveal is always safe. Use
            numbers displayed in some of the revealed fields to deduce further
            squares that are safe to reveal. The number indicates a count of
            bombs hidden in the adjacent fields (i.e. squares that are next to
            the number - also diagonally). Use flags to mark fields containing a
            bomb (you don't have use flags to win the game). Be careful, have
            fun and don't forget to be fast!
          </template>
          <template #controls>
            <Control>
              <template #image><img :src="LMBPath" alt="LMB" /></template>
              <template #description>Reveal field</template>
            </Control>
            <Control>
              <template #image><img :src="RMBPath" alt="RMB" /></template>
              <template #description>Place/Take flag</template>
            </Control>
          </template>
        </StartScreen>
      </div>
      <div v-if="gameStatus === GameStatus.GameMode" class="content-block content-game-modes">
        <GameModes />
      </div>
      <template v-if="gameStatus === GameStatus.Playing">
        <div class="content-block content-game-info">
          <MapInfo />
        </div>
        <div class="content-block content-game">
          <Map />
        </div>
        <div class="content-block content-timer">
          <Timer :store="store" />
        </div>
      </template>
      <div v-if="gameStatus === GameStatus.Results" class="content-block content-results">
        <Results :store="store" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Navbar from "../../../../shared/components/Navbar.vue";
import GameModes from "./modules/GameModes.vue";
import Map from "./modules/Map.vue";
import Results from "../../../../shared/components/Results.vue";
import Timer from "../../../../shared/components/Timer.vue";

import WebSocketController from "../api/WebSocketController";
import FieldPacket from "../../../../../global/games/Minesweeper/packets/server/FieldPacket";
import { useStore } from "../store";
import { GameResult, GameStatus } from "../../../../shared/store/modules/game";
import GameOverPacket from "../../../../../global/games/Minesweeper/packets/server/GameOverPacket";
import GameWonPacket from "../../../../../global/games/Minesweeper/packets/server/GameWonPacket";
import Control from "../../../../shared/components/Control.vue";
import StartScreen from "../../../../shared/components/StartScreen.vue";
import LMBPath from "url:../../../../shared/assets/controls/LMB.svg";
import RMBPath from "url:../../../../shared/assets/controls/RMB.svg";
import MapInfo from "./modules/MapInfo.vue";

export default defineComponent({
  components: {
    Navbar,
    Map,
    GameModes,
    Timer,
    Results,
    StartScreen,
    Control,
    MapInfo,
  },
  setup() {
    const store = computed(() => useStore());
    const gameStatus = computed(() => store.value.state.game.gameStatus);

    const startGame = (): void => {
      store.value.commit("game/setGameStatus", GameStatus.GameMode);
    };

    const stopAndCorrectTimer = (serverTime: number): void => {
      store.value.dispatch("timer/stop");
      store.value.commit("timer/setTotalMiliseconds", serverTime);
    };

    const handleEndGame = (
      serverTime: number,
      gameResult: GameResult
    ): void => {
      stopAndCorrectTimer(serverTime);
      store.value.commit("game/setGameResult", gameResult);
      setTimeout(() => {
        store.value.commit("game/setGameStatus", GameStatus.Results);
      }, 3000);
    };

    WebSocketController.handleFieldPacket = (packet: FieldPacket): void => {
      if (!store.value.state.timer.isTicking)
        store.value.dispatch("timer/start");
      store.value.commit("map/revealField", packet);
    };

    WebSocketController.handleGameOverPacket = (
      packet: GameOverPacket
    ): void => {
      handleEndGame(packet.time, GameResult.Defeat);
    };

    WebSocketController.handleGameWonPacket = (packet: GameWonPacket): void => {
      handleEndGame(packet.time, GameResult.Win);
    };

    return { store, gameStatus, GameStatus, startGame, LMBPath, RMBPath };
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
@use "../../../../shared/scss/modules/noselect";
@use "../../../../shared/scss/variables/measurements";
@use "../../../../shared/scss/mixins/devices";

.wrapper-minesweeper {
  display: flex;
  align-items: flex-start;
  @extend %noselect;

  > .content-block {
    margin-left: measurements.$page-spacing;

    &:first-child {
      margin-left: 0;
    }
  }

  .content-start, .content-game-modes, .content-results {
    display: flex;
    width: 100%;
  }

  .content-game-info, .content-timer {
    flex: 1 1 0;
  }

  .content-game {
    flex: 2 1 0;
  }

  .content-timer {
    text-align: center;
    font-size: 2rem;
  }
}
</style>
