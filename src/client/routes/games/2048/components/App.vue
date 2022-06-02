<template>
  <div class="limiter">
    <Navbar />
    <div class="wrapper wrapper-2048">
      <div class="content-block content-game">
        <StartScreen
          v-if="gameStatus === GameStatus.Start"
          :handlePlay="startGame"
        >
          <template #gameName>2048</template>
          <template #gameDescription>
            Welcome to 2048! Your goal is to reach the tile with the number 2048. 
            You move all tiles in one direction at once. Tiles with the same number 
            are merged together to form a new tile with doubled number. Two tiles appear 
            initially on the board. After every move, one tile appears in an empty space. 
            If there's no empty spaces after a move, you lose! Just getting to 2048 is hard, 
            but remember: The clock is ticking and the leaderboard does not forgive mistakes!
          </template>
          <template #controls>
            <Control>
              <template #image><img :src="arrowsPath" alt="RMB" /></template>
              <template #description>Move tiles</template>
            </Control>
          </template>
        </StartScreen>
        <Board v-if="gameStatus === GameStatus.Playing" />
        <Results :store="store" v-if="gameStatus === GameStatus.Results" />
      </div>
      <div
        class="content-block content-timer"
        v-if="gameStatus === GameStatus.Playing || gameStatus === GameStatus.Results"
      >
        <Timer :store="store" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import NewTilePacket from "../../../../../global/games/2048/packets/server/NewTilePacket";
import Navbar from "../../../../shared/components/Navbar.vue";
import WebSocketController from "../api/WebSocketController";
import { useStore } from "../store";
import { GameResult, GameStatus } from "../../../../shared/store/modules/game";
import Board from "./modules/Board.vue";
import StartScreen from "../../../../shared/components/StartScreen.vue";
import Control from "../../../../shared/components/Control.vue";
import Timer from "../../../../shared/components/Timer.vue";
import gameSettings from "../../../../../global/games/2048/gameSettings.json";
import StartGamePacket from "../../../../../global/games/2048/packets/client/StartGamePacket";
import Results from "../../../../shared/components/Results.vue";
import GameOverPacket from "../../../../../global/games/2048/packets/server/GameOverPacket";
import arrowsPath from "url:../../../../shared/assets/controls/arrows.svg";

export default defineComponent({
  components: { Navbar, Board, StartScreen, Timer, Results, Control },
  setup() {
    const store = computed(() => useStore());

    const gameStatus = computed<GameStatus>(
      () => store.value.state.game.gameStatus
    );

    WebSocketController.handleNewTilePacket = (packet: NewTilePacket) => {
      store.value.commit("board/addNewTile", packet);
      store.value.commit("board/enableMovement");
    };

    WebSocketController.handleGameOverPacket = (packet: GameOverPacket) => {
      endGame(packet.time, GameResult.Defeat);
    };

    WebSocketController.handleGameWonPacket = (packet: GameOverPacket) => {
      endGame(packet.time, GameResult.Win);
    };

    const startGame = (): void => {
      store.value.commit("board/initialize", {
        numberOfRows: gameSettings.numberOfRows,
        numberOfColumns: gameSettings.numberOfColumns,
        animationSpeed: gameSettings.animationSpeed,
      });

      store.value.commit("game/setGameStatus", GameStatus.Playing);

      const startGamePacket: StartGamePacket = new StartGamePacket();
      WebSocketController.sendPacket(startGamePacket);

      store.value.dispatch("timer/start");
    };

    const endGame = (time: number, result: GameResult): void => {
      store.value.dispatch("timer/stop");
      store.value.commit("timer/setTotalMiliseconds", time);
      store.value.commit("game/setGameResult", result);
      setTimeout(() => {
        store.value.commit("game/setGameStatus", GameStatus.Results);
      }, 3000);
    };

    return { store, gameStatus, GameStatus, startGame, arrowsPath };
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
@use "../../../../shared/scss/variables/measurements.scss";
@use "../../../../shared/scss/modules/noselect";
@use "../../../../shared/scss/mixins/devices";

.wrapper-2048 {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  @include devices.desktop {
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
  }

  @extend %noselect;

  .content-game {
    display: flex;

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
    font-size: 3em;

    @include devices.desktop {
      margin-left: measurements.$page-spacing;
      margin-bottom: 0;
    }
  }
}
</style>
