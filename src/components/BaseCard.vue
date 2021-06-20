<template>
  <div class="card">
    <div class="card-main">
      <img
        :src="song.thumbnail"
        alt="img"
      >
      <div class="card-overlay">
        <button class="flex items-center justify-center text-xl text-white">
          <i class="flex ic-like"></i>
        </button>
        <button
          @click="setPlaylistAndPlay"
          class="flex items-center justify-center text-xl text-white border border-white rounded-full w-11 h-11 hover:text-gray-200 hover:border-gray-200"
        >
          <i class="flex ic-play"></i>
        </button>
        <button class="flex items-center justify-center text-xl text-white">
          <i class="flex ic-more"></i>
        </button>
      </div>
    </div>
    <router-link
      to="/album"
      :title="song.title"
      class="card-title"
    >{{song.title}}</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
// import {fetchSongList, useApi} from '@/api'
import { useStore } from 'vuex'
import { Song } from '@/types'
import list from '@/data/list.json'

export default defineComponent({
  name: 'BaseCard',
  props: {
    song: Object as PropType<Song>,
  },
  setup() {
    // const {onSuccess} = useApi('fetchSongList', fetchSongList)
    // onSuccess(result => {
    //   result.song.items
    // })
    function setPlaylistAndPlay() {
      store.commit('setState', { prop: 'playlist', value: list })
      store.commit('setState', {
        prop: 'currentSong',
        value: list.song.items[0],
      })
    }
    const store = useStore()
    return { setPlaylistAndPlay }
  },
})
</script>

<style scoped>
.card {
  @apply flex-shrink-0 md:w-1/6 px-4;
}
.card-title {
  @apply text-sm font-semibold text-primary mt-2 block;
  word-break: break-word;
  /*
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2; */
}
.card-main {
  @apply relative overflow-hidden rounded-lg;
}
.card-main:hover > img {
  transform: scale(1.1);
}
.card-main > img {
  @apply w-full max-w-full;
  transition: transform 0.7s ease-out;
}
.card-overlay {
  @apply absolute inset-0 flex justify-center items-center space-x-4;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
}
.card-main:hover .card-overlay {
  opacity: 1;
}
</style>
