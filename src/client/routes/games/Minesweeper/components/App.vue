<template>
  <Navbar />
  <div class="wrapper wrapper-map">
    <div class="content-block content-map">
      <Map />
    </div>
    <div class="content-block content-timer">
      <Timer class="timer" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "../../../../shared/components/Navbar.vue";
import Map from "./modules/Map.vue";
import Timer from "./modules/Timer.vue";

import WebSocketController from "../api/WebSocketController";
import StartGamePacket from "../../../../../global/games/Minesweeper/packets/client/StartGamePacket";
import FieldPacket from "../../../../../global/games/Minesweeper/packets/server/FieldPacket";
import { useStore } from "../store";
import GameOverPacket from "../../../../../global/games/Minesweeper/packets/server/GameOverPacket";
import GameWonPacket from "../../../../../global/games/Minesweeper/packets/server/GameWonPacket";

export default defineComponent({
  components: { Navbar, Map, Timer },
  setup() {
    const store = useStore();

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
  },
  async mounted() {
    const webSocketController = new WebSocketController();

    try {
      await webSocketController.connect();
    } catch (error: any) {
      return;
    }

    webSocketController.listenForMessages();

    const startGamePacket = new StartGamePacket(0);
    WebSocketController.sendPacket(startGamePacket);
  },
});
</script>

<style lang="scss" scoped>
@use '../../../../shared/scss/variables/measurements';

.wrapper-map {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.content-map {
  display: inline-flex;
}

.content-timer {
  display: inline-flex;
  margin-left: measurements.$page-spacing;
}

.timer {
  font-size: 3em;
}
</style>
