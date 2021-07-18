<template>
  <div class="flex flex-col clg:space-x-9 clg:flex-row">
    <h4 v-if="statusPending">
      Loading...
    </h4>
    <template v-if="statusSuccess">
      <!-- left -->
      <div class="album-info">
        <div class="sticky top-0 album-wrapper">
          <div
            class="album-cover"
            :class="{ 'rotate': isPlaying }"
            @click="togglePlay"
          >
            <img
              :src="album.thumbnailM"
              :alt="album.title"
            >
            <div class="overlay">
              <button class="btn-play">
                <i
                  class="icon"
                  :class="isPlaying ? 'ic-gif-playing-white' : 'ic-play'"
                />
              </button>
            </div>
          </div>
          <div class="flex flex-col justify-between clg:block">
            <div>
              <h1 class="album-title">
                {{ album.title }}
              </h1>
              <p class="mt-1 album-info">
                Cập nhật: {{ new Date(album.contentLastUpdate * 1000).toLocaleDateString() }}
              </p>
              <p class="album-info">
                {{ album.like }} Người yêu thích
              </p>
            </div>
            <div class="flex space-x-3 clg:block">
              <button class="bg-purple-primary hover:brightness-90 text-white rounded-full py-2.5 px-6 inline-flex space-x-2 mt-3 uppercase">
                <i class="flex w-5 h-5 place-items-center icon ic-play" />
                <span>Phát ngẫu nhiên</span>
              </button>
              <div class="album-footer">
                <button>
                  <i class="icon ic-like" />
                </button>
                <button>
                  <i class="icon ic-more" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- right -->
      <div class="flex-grow mt-4 clg:mt-0">
        <p class="text-sm">
          <span class="text-secondary">Lời tựa: </span>
          <span class="font-semibold text-primary">{{ album.description }}</span>
        </p>
        <div class="mt-4">
          <song-item
            v-for="song in album.song.items"
            :key="`${song.title}-${song.artistsNames}`"
            :song="song"
            @playsong="playsong"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { fetchPlaylist, useApi } from '@/api'
import { Song, Playlist } from '@/types'
import { PlayerState } from '@/store'
import SongItem from '@/components/SongItem.vue'

export default defineComponent({
  name: 'PageAlbum',
  components: { SongItem },
  setup() {
    const store = useStore()
    const route = useRoute()
    const id = route.params.id as string
    const isPlaying = computed(() => {
      return (
        store.state.playerState === PlayerState.PLAYING &&
        store.state.playlist.encodeId === id
      )
    })

    const {
      data: album,
      exec,
      statusPending,
      statusSuccess,
    } = useApi<Playlist, Parameters<typeof fetchPlaylist>>(fetchPlaylist)
    exec(id)

    function togglePlay() {
      if (
        !store.state.playlist ||
        store.state.playlist.encodeId !== album.value.encodeId
      ) {
        store.commit('setState', { prop: 'playlist', value: album.value })
        store.commit('setState', {
          prop: 'currentSong',
          value: album.value.song.items[0],
        })
      } else {
        store.dispatch('togglePlay')
      }
    }

    function playsong(song: Song) {
      if (
        !store.state.playlist ||
        store.state.playlist.encodeId !== album.value.encodeId
      ) {
        store.commit('setState', { prop: 'playlist', value: album.value })
      }
      store.commit('setState', { prop: 'currentSong', value: song })
    }
    return {
      album,
      isPlaying,
      togglePlay,
      statusPending,
      statusSuccess,
      playsong,
    }
  },
})
</script>

<style scoped>
.album-info {
  width: 300px;
  @apply relative;
}
.album-cover {
  transition: all 0.4s ease;
  box-shadow: 0 5px 8px 0 rgb(0 0 0 / 20%);
  @apply relative rounded-lg overflow-hidden;
}
.rotate {
  border-radius: 100%;
  overflow: hidden;
  -webkit-animation-name: spin;
  animation-name: spin;
  -webkit-animation-duration: 12s;
  animation-duration: 12s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  animation-delay: 700ms;
}
.album-cover img {
  transition: transform 0.5s;
}
.album-cover:hover img {
  transform: scale(1.1);
}
.album-cover .overlay {
  transition: opacity 0.5s;
  background-color: rgba(0, 0, 0, 0.4);
  @apply opacity-0 absolute inset-0;
}
.album-cover:hover .overlay,
.album-cover.rotate .overlay {
  @apply opacity-100;
}
.btn-play {
  @apply text-white flex justify-center items-center w-full h-full text-lg;
}
.btn-play > i {
  @apply flex justify-center items-center w-10 h-10 rounded-full border border-white;
}
.album-title {
  @apply text-xl font-bold text-center mt-2 text-primary;
}
.album-info {
  @apply text-secondary text-sm text-center;
}

.album-footer {
  @apply flex space-x-4 mt-4 justify-center;
}
.album-footer button {
  @apply rounded-full text-lg w-9 h-9 text-primary bg-alpha flex items-center justify-center outline-none;
}
.album-footer button i {
  @apply flex;
}

@media only screen and (max-width: 1200px) {
  .footer-wrapper {
    display: flex;
  }
  .album-title {
    text-align: left;
  }
  .album-info {
    text-align: left;
    width: 100%;
  }
  .album-wrapper {
    @apply space-x-4;
    display: flex;
  }
  .album-cover img {
    width: 200px;
  }
  .album-footer {
    justify-content: start;
  }
}
</style>
