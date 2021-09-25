<template>
  <Navbar />
  <div class="wrapper wrapper-map">
    <div class="content-block content-map">
      <Map />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "../../../../shared/components/Navbar.vue";
import Map from "./modules/Map.vue";

import WebSocketController from "../api/WebSocketController";
import StartGamePacket from "../../../../../global/games/Minesweeper/packets/client/StartGamePacket";
import FieldPacket from "../../../../../global/games/Minesweeper/packets/server/FieldPacket";
import { ClientPacketType } from "../../../../../global/games/Minesweeper/packets/client/ClientPacketType";
import { useStore } from "../store";

export default defineComponent({
  components: { Navbar, Map },
  setup() {
    const store = useStore();

    WebSocketController.handleFieldPacket = (packet: FieldPacket): void => {
      store.commit('map/updateFieldData', packet);
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

    const startGamePacket: StartGamePacket = {
      type: ClientPacketType.StartGame,
      gameModeIndex: 0,
    };
    WebSocketController.sendPacket(startGamePacket);
  },
});
</script>

<style lang="scss" scoped>
.wrapper-map {
  display: flex;
  justify-content: center;
}

.content-map {
  display: inline-flex;
}
</style>
