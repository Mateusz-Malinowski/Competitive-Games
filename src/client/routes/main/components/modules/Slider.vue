<template>
  <div class="slider">
    <div class="slides">
      <div
        class="slide"
        v-for="i in slides.length + 1"
        :key="i"
        ref="slideElements"
      >
        <img class="image-base" :src="slides[(i - 1) % slides.length].imgPath" :alt="slides[(i - 1) % slides.length].title" />
        <img
          class="image-large-laptop"
          :src="slides[(i - 1) % slides.length].imgPathLargeLaptop"
          :alt="slides[(i - 1) % slides.length].title"
        />
        <a
          class="overlay"
          :href="slides[(i - 1) % slides.length].link"
          :class="{
            left: slides[(i - 1) % slides.length].contentSide === ContentSide.Right,
            right: slides[(i - 1) % slides.length].contentSide === ContentSide.Left,
          }"
        >
          <h2 class="header">{{ slides[(i - 1) % slides.length].title }}</h2>
        </a>
      </div>
    </div>
    <a class="slider-control navigation-before" @click="previousSlide">
      <span class="material-symbols-rounded">
        navigate_before
      </span>
    </a>
    <a class="slider-control navigation-next" @click="nextSlide">
      <span class="material-symbols-rounded">
        navigate_next
      </span>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import sliderLogoLeft from "url:../../assets/slider-logo-left.png";
import sliderLogoMiddle from "url:../../assets/slider-logo-middle.png";
import slider2048Right from "url:../../assets/slider-2048-right.png";
import slider2048Middle from "url:../../assets/slider-2048-middle.png";
import sliderMinesweeperLeft from "url:../../assets/slider-minesweeper-left.png";
import sliderMinesweeperMiddle from "url:../../assets/slider-minesweeper-middle.png";

enum ContentSide {
  Left,
  Right,
}

interface Slide {
  title: string;
  imgPath: string;
  imgPathLargeLaptop: string;
  contentSide: ContentSide;
  link: string;
}

export default defineComponent({
  setup() {
    const slideElements = ref<NodeListOf<HTMLDivElement>>();
    const slides: Slide[] = [
      {
        title: "Here we compete.",
        imgPath: sliderLogoMiddle,
        imgPathLargeLaptop: sliderLogoLeft,
        contentSide: ContentSide.Left,
        link: "/games",
      },
      {
        title: "2048",
        imgPath: slider2048Middle,
        imgPathLargeLaptop: slider2048Right,
        contentSide: ContentSide.Right,
        link: "/games/2048",
      },
      {
        title: "Minesweeper",
        imgPath: sliderMinesweeperMiddle,
        imgPathLargeLaptop: sliderMinesweeperLeft,
        contentSide: ContentSide.Left,
        link: "/games/Minesweeper",
      },
    ];
    let index = 0;

    const previousSlide = (): void => {
      const elements = slideElements.value as NodeListOf<HTMLDivElement>;

      if (index === 0) {
        const newIndex = elements.length - 1;
        index = newIndex;
        scrollInstant();
      }
      
      index--;
      scrollSmoothly();
    };

    const nextSlide = (): void => {
      const elements = slideElements.value as NodeListOf<HTMLDivElement>;

      if (index === elements.length - 1) {
        const newIndex = 0;
        index = newIndex;
        scrollInstant();
      }

      index++;
      scrollSmoothly();
    };

    const scrollInstant = (): void => {
      const elements = slideElements.value as NodeListOf<HTMLDivElement>;
      elements[index].scrollIntoView({ block: "end", inline: "start" });
    }

    const scrollSmoothly = (): void => {
      const elements = slideElements.value as NodeListOf<HTMLDivElement>;
      elements[index].scrollIntoView({ behavior: "smooth", block: "end", inline: "start" });
    };

    return {
      slides,
      slideElements,
      ContentSide,
      previousSlide,
      nextSlide,
      scrollSmoothly,
    };
  },
  mounted() {
    this.slideElements = document.querySelectorAll(".slider .slide") as NodeListOf<HTMLDivElement>;
    window.addEventListener("resize", this.scrollSmoothly);
  },
  unmounted() {
    window.removeEventListener("resize", this.scrollSmoothly);
  },
});
</script>

<style lang="scss" scoped>
@use "../../../../shared/scss/variables/shadows";
@use "../../../../shared/scss/variables/measurements";
@use "../../../../shared/scss/mixins/devices";
@use "../../../../shared/scss/modules/noselect";
@use "sass:math";

.slider {
  display: flex;
  align-items: center;
  position: relative;
  box-shadow: shadows.$main;

  .slides {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;

    .slide {
      position: relative;
      width: 100%;
      height: 100%;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;

        &.image-large-laptop {
          display: none;
        }
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: grid;
        justify-items: center;
        align-items: center;
        gap: measurements.$page-spacing;
        padding: measurements.$page-spacing;
        background-color: rgba(0, 0, 0, 0.5);

        .header {
          font-size: 2.5rem;
          text-align: center;
          text-shadow: shadows.$main;
        }
      }
    }
  }

  .slider-control {
    display: none;
    position: absolute;
    opacity: 30%;
    transition: opacity 0.3s ease;
    @extend %noselect;

    &.navigation-before {
      left: 0;
    }

    &.navigation-next {
      right: 0;
    }

    &:hover {
      cursor: pointer;
      opacity: 100%;
    }

    span {
      font-size: 8rem;
    }
  }
}

@include devices.tablet {
  .slider {
    .slides {
      .slide {
        .overlay {
          .header {
            font-size: 3.5rem;
          }
        }
      }
    }
  }
}

@include devices.laptop {
  .slider {
    .slides {
      .slide {
        .overlay {
          .header {
            font-size: 5rem;
          }
        }
      }
    }
  }
}

@include devices.large-laptop {
  .slider {
    .slides {
      .slide {
        img {
          &.image-base {
            display: none;
          }

          &.image-large-laptop {
            display: unset;
          }
        }

        .overlay {
          grid-template-columns: 1fr 1fr;

          .header {
            font-size: 6rem;
            text-align: left;
          }

          &.left {
            background: linear-gradient(
              90deg,
              rgba(0, 0, 0, 1) 0%,
              transparent 50%
            );
          }

          &.right {
            background: linear-gradient(
              90deg,
              transparent 50%,
              rgba(0, 0, 0, 1) 100%
            );

            .header {
              grid-column: 2 / 3;
            }
          }
        }
      }
    }

    .slider-control {
      display: unset;
    }
  }
}

@include devices.desktop {
  .slider {
    .slides {
      .slide {
        .overlay {
          .header {
            font-size: 8rem;
          }
        }
      }
    }
  }
}
</style>