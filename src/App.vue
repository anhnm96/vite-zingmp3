<template>
  <div id="main">
    <div class="flex bg-layout">
      <Sidebar />
      <div class="flex-grow">
        <AppHeader />
        <main
          ref="main"
          :class="songList.length > 0 ? 'h-main' : 'h-main-2'"
        >
          <div
            class="py-5 mx-auto"
            style="max-width: 90%;"
          >
            <router-view />
          </div>
        </main>
      </div>
      <Playlist />
    </div>
    <Player
      v-if="songList.length > 0"
      class="z-50"
    />
    <keep-alive>
      <Lyric v-if="showLyricModal" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import Sidebar from './components/layout/Sidebar.vue'
import Player from './components/layout/Player.vue'
import Lyric from './components/layout/Lyric.vue'
import Playlist from './components/layout/Playlist.vue'
import Scrollbar from 'smooth-scrollbar'
import AppHeader from './components/layout/AppHeader.vue'

export default defineComponent({
  name: 'App',
  components: { Sidebar, AppHeader, Player, Lyric, Playlist },
  setup() {
    const store = useStore()
    const main = ref(null)
    let resizeObserver: ResizeObserver
    onMounted(() => {
      if (document.body.offsetWidth < 1637)
        store.commit('setState', { prop: 'showPlaylist', value: false })

      resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.contentBoxSize) {
            // Firefox implements `contentBoxSize` as a single content rect, rather than an array
            const contentBoxSize = Array.isArray(entry.contentBoxSize)
              ? entry.contentBoxSize[0]
              : entry.contentBoxSize

            if (contentBoxSize.inlineSize < 1637)
              store.commit('setState', { prop: 'showPlaylist', value: false })
            else store.commit('setState', { prop: 'showPlaylist', value: true })
          } else {
            if (entry.contentRect.width < 1637)
              store.commit('setState', { prop: 'showPlaylist', value: false })
            else store.commit('setState', { prop: 'showPlaylist', value: true })
          }
        }
      })
      resizeObserver.observe(document.body)
      Scrollbar.init(main.value, { damping: 0.2 })
    })

    onBeforeUnmount(() => {
      Scrollbar.destroy(main.value)
      resizeObserver.disconnect()
    })

    const showLyricModal = computed(() => store.state.showLyric)
    const songList = computed(() => store.getters.songList)

    return {
      main,
      showLyricModal,
      songList,
    }
  },
})
</script>
