<template>
  <div class="relative slider-container" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <div class="slider">
      <div
        class="slider-item"
        v-for="(item, index) in items"
        :key="index"
        :class="{next: index === nextIndex, prev: index === previousIndex, current: index===activeIndex}"
      >
        <a
          href="#"
          class="inline-block"
        >
          <img
            :src="item.banner"
            alt="banner image"
          >
        </a>
      </div>
      <!-- dummy card placeholder for the height -->
      <div
        class="relative opacity-0 slider-item current"
        style="position: relative"
      >
        <a
          href="#"
          class="inline-block"
        >
          <img
            :src="items[0].banner"
            alt="banner image"
          >
        </a>
      </div>
    </div>
    <button class="absolute left-0 z-30 flex items-center justify-center p-2 text-2xl text-white transform -translate-y-1/2 bg-white rounded-full opacity-0 btn-move focus:outline-none top-1/2 bg-opacity-10" @click="goPrevious"><i class="flex ic-go-left"></i></button>
    <button class="absolute right-0 z-30 flex items-center justify-center p-2 text-2xl text-white transform -translate-y-1/2 bg-white rounded-full opacity-0 btn-move focus:outline-none top-1/2 bg-opacity-10" @click="goNext"><i class="flex ic-go-right"></i></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount, watch, PropType } from 'vue'

interface Slider {
  banner: string
}

export default defineComponent({
  name: 'Slider',
  props: {
    items: { type: Array as PropType<Slider[]> },
  },
  setup(props) {
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
      if (index > props.items.length - 1) index = 0
      return index
    })

    const previousIndex = computed(() => {
      let index = activeIndex.value - 1
      if (index < 0) index = props.items.length - 1
      return index
    })

    function goNext() {
      activeIndex.value = nextIndex.value
    }
    function goPrevious() {
      activeIndex.value = previousIndex.value
    }
    return { activeIndex, previousIndex, nextIndex, goNext, goPrevious, mouseenter, mouseleave }
  },
})
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
