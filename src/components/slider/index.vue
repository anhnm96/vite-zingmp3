<template>
  <div class="slider-container relative" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <div class="slider">
      <div
        class="slider-item"
        v-for="(slider, index) in sliders"
        :key="index"
        :class="{next: index === nextIndex, prev: index === previousIndex, current: index===activeIndex}"
      >
        <a
          href="#"
          class="inline-block"
        >
          <img
            :src="slider.banner"
            alt="banner image"
          >
        </a>
      </div>
      <div
        class="relative opacity-0 slider-item current"
        style="position: relative"
      >
        <a
          href="#"
          class="inline-block"
        >
          <img
            :src="sliders[0].banner"
            alt="banner image"
          >
        </a>
      </div>
    </div>
    <button class="btn-move opacity-0 z-30 focus:outline-none absolute top-1/2 transform -translate-y-1/2 left-0 text-2xl text-white bg-white bg-opacity-10 rounded-full flex items-center justify-center p-2" @click="goPrevious"><i class="flex ic-go-left"></i></button>
    <button class="btn-move opacity-0 z-30 focus:outline-none absolute top-1/2 transform -translate-y-1/2 right-0 text-2xl text-white bg-white bg-opacity-10 rounded-full flex items-center justify-center p-2" @click="goNext"><i class="flex ic-go-right"></i></button>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import sliders from './data.json'
import SliderItem from './item.vue'
export default {
  props: {
    sliders: { type: Array },
  },
  components: { SliderItem },
  setup() {
    const activeIndex = ref(0)
    const isPaused = ref(false)
    let timeout: number

    function mouseenter() {
      isPaused.value = true
    }
    function mouseleave() {
      isPaused.value = false
    }

    onMounted(() => {
      autoPlayCarousel(5000)
    })

    onBeforeUnmount(() => {
      clearTimeout(timeout)
    })

    function autoPlayCarousel(duration: number): void {
      timeout = setTimeout(() => {
        goNext()
        autoPlayCarousel(duration)
      }, duration)
    }

    watch(isPaused, (val) => {
      if (val) {
        clearTimeout(timeout)
      }
      else autoPlayCarousel(5000)
    })

    const nextIndex = computed(() => {
      let index = activeIndex.value + 1
      if (index > sliders.length - 1) index = 0
      return index
    })

    const previousIndex = computed(() => {
      let index = activeIndex.value - 1
      if (index < 0) index = sliders.length - 1
      return index
    })

    function goNext() {
      activeIndex.value = nextIndex.value
    }
    function goPrevious() {
      activeIndex.value = previousIndex.value
    }
    return { activeIndex, previousIndex, sliders, nextIndex, goNext, goPrevious, mouseenter, mouseleave }
  },
}
</script>

<style scoped>
  .slider-container:hover .btn-move {
    opacity: 1;
  }
.slider {
  @apply relative;
}

.slider-item {
  @apply absolute w-2/5 inset-x-0 m-auto transform translate-x-0;
  transition: all 0.7s ease-out;
}

.slider-item.current {
  @apply z-20;
}

.slider-item.prev {
  @apply z-10 transform -translate-x-3/4 scale-85;
}

.slider-item.next {
  @apply z-10 transform translate-x-3/4 scale-85;
}

.slider-item:not(.next):not(.prev):not(.current) {
  @apply opacity-0 transform translate-x-0 scale-50;
}

.slider-item img {
  @apply h-auto w-full rounded-lg;
}
</style>
