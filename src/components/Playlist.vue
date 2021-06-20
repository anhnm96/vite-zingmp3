<template>
  <aside class="relative flex-shrink-0 border-l w-80 border-border">
    <!-- tabs -->
    <div class="z-20 flex items-center px-2 py-4 space-x-1 h-17 bg-primary">
      <div class="flex p-1 rounded-full bg-alpha">
        <button class="px-4 font-semibold py-1.5 text-xs rounded-full bg-active text-bg">Danh sách phát</button>
        <button class="px-4 font-semibold py-1.5 text-xs rounded-full text-secondary">Nghe gần đây</button>
      </div>
      <button class="flex items-center justify-center w-8 h-8 text-white rounded-full bg-bg">
        <i class="flex ic-clock"></i>
      </button>
      <button class="flex items-center justify-center w-8 h-8 rounded-full text-secondary bg-alpha">
        <i class="flex ic-more"></i>
      </button>
    </div>
    <div
      class="px-2 overflow-auto h-main"
      ref="scroll"
    >
      <!-- Current song -->
      <SongQueue
        :active="true"
        :song="currentSong"
      />
      <!-- Next song -->
      <div class="mt-3">
        <h4 class="text-sm font-bold">Tiếp theo</h4>
        <p class="text-sm font-semibold text-secondary">Từ playlist <span class="text-bg">{{playlist.title}}</span></p>
      </div>
      <!-- Songs in queue -->
      <div class="mt-2">
        <SongQueue
          v-for="song in playlist.song.items.slice(1)"
          :key="song.title"
          :song="song"
        />
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import Scrollbar from 'smooth-scrollbar'
import SongQueue from './SongQueue.vue'

export default defineComponent({
  name: 'Playlist',
  components: { SongQueue },
  setup() {
    const store = useStore()
    const currentSong = computed(() => store.state.currentSong)
    const playlist = computed(() => store.state.playlist)
    const scroll = ref(null)

    onMounted(() => {
      Scrollbar.init(scroll.value, { damping: 0.2 })
    })

    onBeforeUnmount(() => {
      Scrollbar.destroy(scroll.value)
    })

    return { currentSong, playlist, scroll }
  },
})
</script>

<style>
</style>
