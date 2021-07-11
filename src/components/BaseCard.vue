<template>
  <div class="card">
    <div class="card-main">
      <img
        :src="list.thumbnail"
        alt="img"
      >
      <div
        class="card-overlay"
        :class="isActive ? 'opacity-100' : 'opacity-0'"
      >
        <button class="flex items-center justify-center text-xl text-white focus:outline-none">
          <i class="flex ic-like" />
        </button>
        <button
          class="flex items-center justify-center text-xl text-white border border-white rounded-full focus:outline-none w-11 h-11 hover:text-gray-200 hover:border-gray-200"
          @click="fetchListAndPlay"
        >
          <i
            class="flex icon"
            :class="isActive ? 'ic-gif-playing-white' : 'ic-play'"
          />
        </button>
        <button class="flex items-center justify-center text-xl text-white focus:outline-none">
          <i class="flex ic-more" />
        </button>
      </div>
    </div>
    <h4 class="card-title">
      <router-link
        class="text-sm"
        :to="list.link.split('.')[0]"
        :title="list.title"
      >
        {{ list.title }}
      </router-link>
    </h4>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { fetchSongList, useApi } from '@/api'
import { useStore } from 'vuex'
import { Playlist } from '@/types'

export default defineComponent({
  name: 'BaseCard',
  props: {
    list: {
      type: Object as PropType<Playlist>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const { exec: fetchSongListData, onSuccess: onFetchListSuccess } =
      useApi<Playlist>(fetchSongList)

    onFetchListSuccess((list) => {
      store.commit('setState', { prop: 'playlist', value: list })
      store.commit('setState', {
        prop: 'currentSong',
        value: list.song.items[0],
      })
    })

    function fetchListAndPlay() {
      if (isActive.value) {
        store.commit('togglePlay')
      } else {
        fetchSongListData(props.list.encodeId)
      }
    }

    const isActive = computed<boolean>(() => {
      return (
        props.list.encodeId === store.state.playlist?.encodeId &&
        store.getters.isPlaying
      )
    })

    return { fetchListAndPlay, isActive }
  },
})
</script>

<style scoped>
.card {
  @apply flex-shrink-0;
}
.card-title {
  @apply text-sm font-bold text-primary mt-2 block overflow-hidden;
  word-break: break-word;
  text-overflow: ellipsis;
}
.card-title:hover {
  @apply text-link-hover;
}
.card-title a {
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.card-main {
  @apply relative overflow-hidden rounded-lg pb-[100%];
}
.card-main:hover > img {
  transform: scale(1.1);
}
.card-main > img {
  @apply max-w-full absolute h-full;
  transition: transform 0.7s ease-out;
}
.card-overlay {
  @apply absolute inset-0 flex justify-center items-center space-x-4;
  background-color: rgba(0, 0, 0, 0.5);
}
.card-main:hover .card-overlay {
  opacity: 1;
}
</style>
