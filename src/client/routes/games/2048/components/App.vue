<template>
  <Navbar />
  <div class="wrapper wrapper-2048">
    <div class="content-block content-game">
      <Board />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '../../../../shared/components/Navbar.vue';
import WebSocketController from '../api/WebSocketController';
import Board from './modules/Board.vue';

export default defineComponent({
  components: { Navbar, Board },
  setup() {
    
  },
  async mounted() {
    const webSocketController = new WebSocketController();

    try {
      await webSocketController.connect();
    } catch (error: any) {
      return;
    }

    webSocketController.listenForMessages();
  }
})
</script>

<style lang="scss" scoped>
.wrapper-2048 {
  display: flex;
  justify-content: center;

  .content-game {
    width: 800px;
    height: 800px;
  }
}

</style>
