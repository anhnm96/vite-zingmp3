<template>
  <div
    @dblclick="playSong"
    class="hover:bg-alpha cursor-pointer border-t border-solid border-alpha flex justify-between items-center p-2"
    :class="isCurrent && 'bg-alpha'"
  >
    <!-- left -->
    <div class="flex items-center space-x-2 flex-1">
      <div class="relative w-10 h-10 rounded overflow-hidden">
        <img
          :src="song.thumbnail"
          alt="thumbnail"
        >
        <!-- overlay  -->
        <div
          class="absolute inset-0 bg-black bg-opacity-40"
          :class="!isCurrent && 'opacity-0 hover:opacity-100'"
        >
          <button class="w-full h-full flex place-items-center">
            <span class="w-5 h-5 mx-auto text-white">
              <i
                class="flex justify-center icon"
                :class="isPlaying ? 'ic-gif-playing-white' : 'ic-play'"
              ></i>
            </span>
          </button>
        </div>
      </div>
      <div>
        <h4 class="text-primary font-semibold text-sm">{{song.title}}</h4>
        <p class="text-xs text-secondary">
          <span
            v-for="(artist, index) in song.artists"
            :key="artist.name"
          >{{artist.name}}
            <span v-if="index !== song.artists.length - 1">,</span>
          </span>
        </p>
      </div>
    </div>
    <!-- right -->
    <div class="flex-1 flex space-x-2">
      <div class="flex-1 flex items-center text-xs text-primary">
        <span>{{displayDuration(song.duration, 2)}}</span>
      </div>
      <button
        class="inline-flex items-center justify-center rounded-full w-8 h-8 hover:bg-alpha text-primary"
        v-if="song.mvlink"
      >
        <i class="flex icon ic-mv"></i>
      </button>
      <button
        class="inline-flex items-center justify-center rounded-full w-8 h-8 hover:bg-alpha text-primary"
        v-if="song.hasLyric"
      >
        <i class="flex icon ic-karaoke"></i>
      </button>
      <button
        class="inline-flex items-center justify-center rounded-full w-8 h-8 hover:bg-alpha text-primary"
        @click="toggleLike"
      >
        <i class="flex icon ic-like"></i>
      </button>
      <button class="inline-flex items-center justify-center rounded-full w-8 h-8 hover:bg-alpha text-primary">
        <i class="flex icon ic-more"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { displayDuration } from '@/helpers/utils'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'SongItem',
  props: {
    song: Object,
  },
  setup(props) {
    const store = useStore()

    function playSong() {
      console.log('dbclick')
      if (store.state.howler === null) {
        store.dispatch('loadSong', {
          source:
            'https://mp33.uchin.dev/proxy/a9695c5b-8504-4c70-b6aa-d0f68cb83731?id=ZO9ZI68B',
          song: props.song,
        })
      } else {
        store.commit('togglePlay')
      }
    }

    const isCurrent = computed(
      () => store.state.currentSong?.encodeId === props.song.encodeId
    )
    const isPlaying = computed(() => isCurrent.value && store.getters.isPlaying)

    return { displayDuration, playSong, isCurrent, isPlaying }
  },
}
</script>

<style>
</style>
