<template>
  <div
    class="relative slider-container"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <div class="slider">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="slider-item"
        :class="{ next: index === nextIndex, prev: index === previousIndex, current: index === activeIndex }"
      >
        <button
          class="inline-block"
          @click="playBanner(item)"
        >
          <img
            :src="item.banner"
            alt="banner image"
          >
        </button>
      </div>
      <!-- dummy card placeholder for the height -->
      <div
        class="relative opacity-0 pointer-events-none slider-item current"
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
    <button
      class="absolute left-0 z-30 flex items-center justify-center p-2 text-2xl text-white transform -translate-y-1/2 bg-white rounded-full opacity-0 btn-move focus:outline-none top-1/2 bg-opacity-10"
      @click="goPrevious"
    >
      <i class="flex ic-go-left" />
    </button>
    <button
      class="absolute right-0 z-30 flex items-center justify-center p-2 text-2xl text-white transform -translate-y-1/2 bg-white rounded-full opacity-0 btn-move focus:outline-none top-1/2 bg-opacity-10"
      @click="goNext"
    >
      <i class="flex ic-go-right" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount, watch, PropType } from 'vue'
import { useApi, fetchSongInfo } from '@/api'
import { Song } from '@/types'
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'
import { displayDuration } from '@/helpers'


export default defineComponent({
  name: 'Slider',
  props: {
    items: { type: Array as PropType<any[]> },
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()
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

    // banner
    const { exec, onSuccess } = useApi(fetchSongInfo)
    function playBanner(item: any) {
      if (item.type === 1) {
        exec(item.encodeId)
      }
      if (item.type === 4) {
        router.push(item.link.split('.')[0])
      }
    }

    onSuccess((result) => {
      const currentSong: Song = {
        encodeId: result.encodeId,
        title: result.title,
        thumbnail: result.thumbnail,
        thumbnailM: result.thumbnailM,
        hasLyric: result.hasLyric,
        mvLink: result.mvLink,
        artists: result.artists,
        artistsNames: result.artistsNames,
        duration: result.duration,
        isWorldWide: result.isWorldWide
      }
      const playlist = [currentSong]
      store.commit('setState', { prop: 'playlist', value: { song: { items: playlist } } })
      store.commit('setState', { prop: 'currentSong', value: currentSong })
    })

    return { activeIndex, previousIndex, nextIndex, goNext, goPrevious, mouseenter, mouseleave, playBanner }
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
  @apply absolute w-[70%] inset-x-0 m-auto transform translate-x-0;
  transition: all 0.7s ease-out;
}

.slider-item.current {
  @apply z-20;
}

.slider-item.prev {
  @apply z-10 transform -translate-x-1/3 scale-75;
}

.slider-item.next {
  @apply z-10 transform translate-x-1/3 scale-75;
}

.slider-item:not(.next):not(.prev):not(.current) {
  @apply opacity-0 transform translate-x-0 scale-50;
}

@media screen and (min-width: 1000px) {
  .slider-item {
    width: 46%;
  }
  .slider-item.prev {
    transform: translateX(-65%) scale(0.85);
    width: 46%;
  }
  .slider-item.next {
    transform: translateX(65%) scale(0.85);
    width: 46%;
  }
}

.slider-item img {
  @apply h-auto w-full rounded-lg;
}
</style>
