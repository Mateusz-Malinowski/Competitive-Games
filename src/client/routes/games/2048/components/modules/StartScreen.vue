<template>
  <div class="start-screen">
    <div class="description">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi voluptates
      saepe repellendus at minus excepturi, enim molestias quas amet
      perferendis! Itaque cumque tempore odit similique facere repudiandae
      nesciunt voluptatibus ab? Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Iure aperiam consequuntur laborum exercitationem.
      Quisquam iusto nesciunt error officiis amet voluptas.
    </div>
    <AnimatedButton @click="startGame">
      <span>Play</span>
    </AnimatedButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AnimatedButton from "../../../../../shared/components/AnimatedButton.vue";
import { useStore } from "../../store";
import StartGamePacket from "../../../../../../global/games/2048/packets/client/StartGamePacket";
import gameSettings from "../../../../../../global/games/2048/gameSettings.json";
import WebSocketController from "../../api/WebSocketController";
import { GameStatus } from "../../store/modules/game";

export default defineComponent({
  components: { AnimatedButton },
  setup() {
    const store = useStore();

    const startGame = (): void => {
      store.commit("board/initialize", {
        numberOfRows: gameSettings.numberOfRows,
        numberOfColumns: gameSettings.numberOfColumns,
      });

      store.commit("game/setGameStatus", GameStatus.Playing);

      const startGamePacket: StartGamePacket = new StartGamePacket();
      WebSocketController.sendPacket(startGamePacket);

      store.dispatch('timer/start');
    };

    return { startGame };
  },
});
</script>

<style lang="scss" scoped>
.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;

  .description {
    font-size: 1.5em;
    text-align: justify;
  }
}
</style>
