<template>
  <aside
    v-click-outside="close"
    class="relative flex-shrink-0 border-l playlist w-80 border-border"
    :style="{ transform: showPlaylist ? 'translateX(0)' : '' }"
  >
    <!-- tabs -->
    <div class="z-20 flex items-center px-2 py-4 space-x-1 h-17 bg-primary">
      <div class="flex p-1 rounded-full bg-alpha">
        <button
          class="focus:outline-none px-3 font-semibold py-1.5 text-xs rounded-full bg-active text-primary"
        >Danh sách phát</button>
        <button
          class="focus:outline-none px-3 font-semibold py-1.5 text-xs rounded-full text-secondary"
        >Nghe gần đây</button>
      </div>
      <button
        class="flex items-center justify-center w-8 h-8 text-white rounded-full focus:outline-none bg-bg"
      >
        <i class="flex ic-clock"></i>
      </button>
      <button
        class="flex items-center justify-center w-8 h-8 rounded-full focus:outline-none text-secondary bg-alpha"
      >
        <i class="flex ic-more"></i>
      </button>
    </div>
    <div class="px-2">
      <div v-show="playlist" class="h-main" ref="scroll">
        <template v-if="playlist">
          <!-- Previous songs -->
          <SongQueue
            v-for="song in previousSongs"
            :key="song.title"
            :song="song"
            class="opacity-50 hover:opacity-100"
          />
          <!-- Current song -->
          <SongQueue :active="true" :song="currentSong" />
          <!-- Next songs intro -->
          <div class="mt-3">
            <h4 class="text-sm font-bold">Tiếp theo</h4>
            <p class="text-sm font-semibold text-secondary">
              Từ playlist
              <span class="text-bg">{{ playlist.title }}</span>
            </p>
          </div>
          <!-- Songs in queue -->
          <div class="mt-2">
            <SongQueue v-for="song in nextSongs" :key="song.title" :song="song" />
          </div>
        </template>
      </div>
      <template v-if="!playlist">
        <MediaSkeleton v-for="i in 4" :key="i" />
        <div
          class="absolute flex flex-col items-center px-8 space-y-4 transform -translate-y-1/2 top-1/2"
        >
          <h4
            class="text-sm text-center text-primary"
            style="word-break: 'break-word';"
          >Khám phá thêm các bài hát mới của Zing MP3</h4>
          <button
            class="flex items-center px-6 py-1.5 space-x-2 text-sm font-semibold rounded-full text-primary bg-bg"
          >
            <i class="flex ic-play"></i>
            <span class="flex">Phát nhạc mới phát hành</span>
          </button>
        </div>
      </template>
    </div>
  </aside>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onBeforeUnmount,
  onMounted
} from 'vue'
import { useStore } from 'vuex'
import clickOutside from '@/directives/clickOutside'
import Scrollbar from 'smooth-scrollbar'
import SongQueue from './SongQueue.vue'
import MediaSkeleton from './MediaSkeleton.vue'

export default defineComponent({
  name: 'Playlist',
  components: { SongQueue, MediaSkeleton },
  directives: { clickOutside },
  setup() {
    const store = useStore()
    const currentSong = computed(() => store.state.currentSong)
    const showPlaylist = computed(() => store.state.showPlaylist)
    const scroll = ref(null)

    onMounted(() => {
      Scrollbar.init(scroll.value, { damping: 0.2 })
    })

    onBeforeUnmount(() => {
      Scrollbar.destroy(scroll.value)
    })

    function close(e: MouseEvent) {
      if (!showPlaylist.value) return
      const player = document.getElementById('player')
      if (!player?.contains(e.target as HTMLElement)) {
        store.commit('toggleShowPlaylist')
      }
    }

    return {
      currentSong,
      scroll,
      playlist: computed(() => store.state.playlist),
      showPlaylist,
      previousSongs: computed(() => store.getters.previousSongs),
      nextSongs: computed(() => store.getters.nextSongs),
      close,
    }
  },
})
</script>

<style scoped>
@media only screen and (max-width: 1636px) {
  .playlist {
    position: fixed;
    transform: translateX(100%);
    right: 0;
    top: 0;
    z-index: 100;
    background-color: var(--background);
  }
}

.playlist {
  transition: all 0.3s;
}
</style>
