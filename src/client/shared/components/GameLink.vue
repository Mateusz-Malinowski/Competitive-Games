<template>
  <template v-if="name !== undefined">
    <a
      ref="gameLink"
      class="game-link"
      :href="/games/ + name"
      @mouseover="playVideo"
      @mouseout="resetVideo"
    >
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
  <template v-else>
    <a
      ref="gameLink"
      class="game-link"
      @mouseover="playVideo"
      @mouseout="resetVideo"
    >
      <div class="video-wrapper">
        <template v-if="videoPath !== undefined">
          <video muted loop ref="video" :class="{ gray: isVideoGray }">
            <source :src="videoPath" type="video/mp4" />
          </video>
        </template>
        <template v-else>
          <video muted loop ref="video" :class="{ gray: isVideoGray }">
            <source :src="videoFallbackPath" type="video/mp4" />
          </video>
        </template>
      </div>
      <div class="overlay">
        <span>Coming soon...</span>
      </div>
    </a>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import videoFallbackPath from "url:../assets/videos/default.mp4";

export default defineComponent({
  props: {
    name: {
      required: false,
      type: String,
    },
    videoPath: {
      required: false,
      type: String,
    },
  },
  setup() {
    const gameLink = ref<HTMLAnchorElement>();
    const video = ref<HTMLMediaElement>();
    const isVideoGray = ref<boolean>(true);
    const isPlaying = ref<boolean>(false);
    const resetVideoAfterPlaying = ref<boolean>(false);

    const playVideo = async (): Promise<void> => {
      const videoMedia = video.value as HTMLMediaElement;
      isVideoGray.value = false;
      await videoMedia.play();
      isPlaying.value = true;

      // solves play() call was interrupted by pause() call issue
      if (resetVideoAfterPlaying.value) { 
        resetVideoAfterPlaying.value = false;
        resetVideo();
      }
    };

    const resetVideo = (): void => {
      // solves play() call was interrupted by pause() call issue
      if (!isPlaying.value) {
        resetVideoAfterPlaying.value = true;
        return;
      }

      const videoMedia = video.value as HTMLMediaElement;
      isVideoGray.value = true;
      videoMedia.pause();
      videoMedia.currentTime = 0;
      isPlaying.value = false;
    };

    const adjustSize = (): void => {
      const gameLinkElement = gameLink.value as HTMLAnchorElement;
      gameLinkElement.style.height = gameLinkElement.clientWidth + "px";
    };

    return {
      video,
      isVideoGray,
      playVideo,
      resetVideo,
      gameLink,
      adjustSize,
      videoFallbackPath,
    };
  },
  mounted() {
    this.adjustSize();
    window.addEventListener("resize", this.adjustSize);
  },
  unmounted() {
    window.removeEventListener("resize", this.adjustSize);
  },
});
</script>

<style lang="scss" scoped>
@use "../scss/variables/measurements";
@use "../scss/variables/shadows";
@use "../scss/variables/colors";
@use "../scss/modules/noselect";

.game-link {
  display: inline-flex;
  position: relative;
  box-shadow: shadows.$game-link-base;
  border-radius: measurements.$border-radius;
  overflow: hidden;
  outline: 1px solid black;
  transition-property: box-shadow, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  @extend %noselect;

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
      text-align: center;
      font-weight: bold;
      font-size: 2rem;
    }
  }

  &:hover {
    box-shadow: shadows.$game-link-hover;
    transform: scale(1.05);

    .overlay {
      background-color: rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
