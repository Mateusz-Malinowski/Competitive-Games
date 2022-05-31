<template>
  <Navbar />
  <div class="wrapper wrapper-2048">
    <div class="content-block content-game">
      <StartScreen v-if="gameStatus === GameStatus.Start" :handlePlay="startGame">
        <template #description>
          
        </template>
      </StartScreen>
      <Board v-if="gameStatus === GameStatus.Playing" />
      <Results :store="store" v-if="gameStatus === GameStatus.Results" />
    </div>
    <div class="content-block content-timer" v-if="gameStatus !== GameStatus.Start">
      <Timer :store="store" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import NewTilePacket from "../../../../../global/games/2048/packets/server/NewTilePacket";
import Navbar from "../../../../shared/components/Navbar.vue";
import WebSocketController from "../api/WebSocketController";
import { useStore } from "../store";
import { GameStatus } from "../../../../shared/store/modules/game";
import Board from "./modules/Board.vue";
import StartScreen from "../../../../shared/components/StartScreen.vue";
import Timer from "../../../../shared/components/Timer.vue";
import gameSettings from "../../../../../global/games/2048/gameSettings.json";
import StartGamePacket from "../../../../../global/games/2048/packets/client/StartGamePacket";
import Results from "../../../../shared/components/Results.vue";

export default defineComponent({
  components: { Navbar, Board, StartScreen, Timer, Results },
  setup() {
    const store = computed(() => useStore());

    const gameStatus = computed<GameStatus>(() => store.value.state.game.gameStatus);

    const startGame = (): void => {
      store.value.commit("board/initialize", {
        numberOfRows: gameSettings.numberOfRows,
        numberOfColumns: gameSettings.numberOfColumns,
        animationSpeed: gameSettings.animationSpeed
      });

      store.value.commit("game/setGameStatus", GameStatus.Playing);

      const startGamePacket: StartGamePacket = new StartGamePacket();
      WebSocketController.sendPacket(startGamePacket);

      store.value.dispatch('timer/start');
    };

    WebSocketController.handleNewTilePacket = (packet: NewTilePacket) => {
      store.value.commit("board/addNewTile", packet);
      store.value.commit("board/enableMovement");
    };

    return { store, gameStatus, GameStatus, startGame };
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

.wrapper-2048 {
  display: flex;
  justify-content: center;

  .content-game {
    width: 800px;
    height: 800px;
  }

  .content-timer {
    font-size: 3em;
    margin-left: measurements.$page-spacing;
  }
}
</style>
