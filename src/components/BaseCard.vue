<template>
  <div class="card">
    <div class="card-main">
      <img
        :src="list.thumbnail"
        alt="img"
      >
      <div class="card-overlay">
        <button class="flex items-center justify-center text-xl text-white focus:outline-none">
          <i class="flex ic-like"></i>
        </button>
        <button
          @click="fetchListAndPlay"
          class="flex items-center justify-center text-xl text-white border border-white rounded-full focus:outline-none w-11 h-11 hover:text-gray-200 hover:border-gray-200"
        >
          <i class="flex ic-play"></i>
        </button>
        <button class="flex items-center justify-center text-xl text-white focus:outline-none">
          <i class="flex ic-more"></i>
        </button>
      </div>
    </div>
    <h4 class="card-title">
      <router-link
        class="text-sm"
        :to="list.link"
        :title="list.title"
      >{{list.title}}</router-link>
    </h4>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {fetchSongList, useApi} from '@/api'
import { useStore } from 'vuex'
import { Playlist } from '@/types'

export default defineComponent({
  name: 'BaseCard',
  props: {
    list: Object as PropType<Playlist>,
  },
  setup(props) {
    const { exec: fetchSongListData, onSuccess: onFetchListSuccess} = useApi('fetchSongList', fetchSongList)

    onFetchListSuccess(list => {
      store.commit('setState', { prop: 'playlist', value: list })
      store.commit('setState', { prop: 'currentSong', value: list.song.items[0] })
    })

    function fetchListAndPlay() {
      fetchSongListData(props.list.encodeId)
    }

    const store = useStore()
    return { fetchListAndPlay }
  },
})
</script>

<style scoped>
.card {
  @apply flex-shrink-0;
}
.card-title {
  @apply text-sm font-semibold text-primary mt-2 block overflow-hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  /*
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2; */
}
.card-title a {
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
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
