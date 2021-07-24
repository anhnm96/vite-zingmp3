<template>
  <div>
    <div class="relative overflow-hidden rounded-md pb-[100%] group">
      <img
        class="absolute inset-0 w-full transition-transform duration-700 group-hover:scale-110"
        :src="item.thumbnailM"
        alt="img"
      >
      <div
        class="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:bg-black group-hover:bg-opacity-40 group-hover:opacity-100"
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
    <div class="mt-2">
      <h4>
        <router-link
          class="text-title"
          :to="item.link.split('.')[0]"
          :title="item.title"
        >
          {{ item.title }}
        </router-link>
      </h4>
      <p
        v-if="showArtist && item.artistsNames"
        class="text-artist"
      >
        {{ item.artistsNames }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { fetchSongList, useApi } from '@/api'
import { useStore } from 'vuex'
import { Playlist } from '@/types'

export default defineComponent({
  name: 'PlaylistCard',
  props: {
    item: {
      type: Object as PropType<Playlist>,
      required: true,
    },
    showArtist: {
      type: Boolean,
      default: false,
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
        store.dispatch('togglePlay')
      } else {
        fetchSongListData(props.item.encodeId)
      }
    }

    const isActive = computed<boolean>(() => {
      return (
        props.item.encodeId === store.state.playlist?.encodeId &&
        store.getters.isPlaying
      )
    })

    return { fetchListAndPlay, isActive }
  },
})
</script>

<style>
</style>
