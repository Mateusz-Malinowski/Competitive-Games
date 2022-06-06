<template>
  <a ref="gameLink" class="game-link" :href="/games/ + name" @mouseover="playVideo" @mouseout="resetVideo">
    <div class="video-wrapper">
      <video muted loop ref="video" :class="{ gray: isVideoGray }">
        <source :src="videoPath" type="video/mp4" />
      </video>
    </div>
    <div class="overlay">
      <span>{{ name }}</span>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    name: {
      required: true,
      type: String,
    },
    videoPath: {
      required: true,
      type: String,
    },
  },
  setup() {
    const gameLink = ref<HTMLAnchorElement>();
    const video = ref<HTMLMediaElement>();
    const isVideoGray = ref<boolean>(true);

    const playVideo = (): void => {
      const videoMedia = video.value as HTMLMediaElement;
      isVideoGray.value = false;
      videoMedia.play();
    };

    const resetVideo = (): void => {
      const videoMedia = video.value as HTMLMediaElement;
      isVideoGray.value = true;
      videoMedia.pause();
      videoMedia.currentTime = 0;
    }

    const adjustSize = (): void => {
      const gameLinkElement = gameLink.value as HTMLAnchorElement;
      gameLinkElement.style.height = gameLinkElement.clientWidth + "px";
    }

    return { video, isVideoGray, playVideo, resetVideo, gameLink, adjustSize };
  },
  mounted() {
    this.adjustSize();
    window.addEventListener('resize', this.adjustSize);
  },
  unmounted() {
    window.removeEventListener('resize', this.adjustSize);
  }
});
</script>

<style lang="scss" scoped>
@use "../scss/variables/measurements";
@use "../scss/variables/shadows";

.game-link {
  display: inline-flex;
  position: relative;
  box-shadow: shadows.$main;
  border-radius: measurements.$border-radius;
  overflow: hidden;

  .video-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;

      &.gray {
        filter: grayscale(1);
      }
    }
  }

  .overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 1;
    padding: measurements.$page-spacing;
    background-color: rgba(0, 0, 0, 0.85);
    transition: background-color 0.3s ease;

    span {
      font-weight: bold;
      font-size: 2rem;
    }
  }

  &:hover {
    .overlay {
      background-color: rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
