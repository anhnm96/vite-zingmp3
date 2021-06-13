<template>
  <div>
    <div class="slider">
      <div
        class="slider-item"
        v-for="(slider, index) in sliders"
        :key="index"
        :class="{next: index === nextIndex, prev: index === previousIndex, current: index===activeIndex}"
      >
        <a href="#" class="inline-block">
          <img :src="slider.banner" alt="banner image">
        </a>
      </div>
      <div class="relative opacity-0 slider-item current" style="position: relative">
        <a href="#" class="inline-block">
          <img :src="sliders[0].banner" alt="banner image">
        </a>
      </div>
    </div>
    <!-- <button @click="goNext">Next</button> -->
  </div>
</template>

<script lang="ts">
import { onMounted, ref, computed } from 'vue'
import sliders from './data.json'
import SliderItem from './item.vue'
export default {
  props: {
    sliders: { type: Array },
  },
  components: { SliderItem },
  setup() {
    const activeIndex = ref(0)

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

    function goNext () {
      activeIndex.value = nextIndex.value
    }
    return {activeIndex, previousIndex, sliders, nextIndex, goNext}
  },
}
</script>

<style scoped>
.slider {
  @apply relative;
}

.slider-item {
  @apply absolute w-2/5 inset-x-0 m-auto transform translate-x-0;
  transition: transform 0.7s;
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
  @apply opacity-0 transform translate-x-0 scale-85;
}

.slider-item img {
  @apply h-auto w-full rounded-lg;
} 
</style>
