<template>
  <Navbar />
  <div class="wrapper wrapper-2048">
    <div class="content-block content-game">
      <StartScreen v-if="gameStatus === GameStatus.Start" />
      <Board v-if="gameStatus === GameStatus.Playing" />
    </div>
    <div
      class="content-block content-timer"
      v-if="gameStatus !== GameStatus.Start"
    >
      <Timer />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import NewTilePacket from "../../../../../global/games/2048/packets/server/NewTilePacket";
import Navbar from "../../../../shared/components/Navbar.vue";
import WebSocketController from "../api/WebSocketController";
import { useStore } from "../store";
import { GameStatus } from "../store/modules/game";
import Board from "./modules/Board.vue";
import StartScreen from "./modules/StartScreen.vue";
import Timer from "./modules/Timer.vue";

export default defineComponent({
  components: { Navbar, Board, StartScreen, Timer },
  setup() {
    const store = useStore();

    const gameStatus = computed<GameStatus>(() => store.state.game.gameStatus);

    WebSocketController.handleNewTilePacket = (packet: NewTilePacket) => {
      store.commit("board/addNewTile", packet);
      store.commit("board/enableMovement");
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
