<template>
  <div
    @dblclick="play"
    class="song-wrapper flex items-start p-2 space-x-2.5 rounded"
    :class="{'bg-bg': active, 'hover:bg-alpha': !active}"
  >
    <!-- thumbnail -->
    <div class="flex-shrink-0 relative overflow-hidden rounded">
      <img
        class="w-10 h-10"
        :src="song.thumbnail"
        alt="thumbnail"
      >
      <div class="overlay absolute inset-0 bg-black opacity-0 hover:opacity-100 bg-opacity-40" :class="active && 'opacity-100'">
        <button @click="play" class="focus:outline-none flex items-center justify-center w-full h-full text-white">
          <i class="flex icon " :class="{'ic-gif-playing-white': active && isPlaying, 'ic-play': (active && !isPlaying) || !active}"></i>
        </button>
      </div>
    </div>
    <div class="overflow-hidden select-none">
      <h4
        class="text-sm font-bold truncate text-primary"
        :class="active && 'text-white'"
        :title="song.title"
      >{{song.title}}</h4>
      <p
        class="mt-0.5 text-xs text-secondary"
        :class="active && 'text-gray-100'"
      >
        <span
          class="inline-flex items-center"
          v-for="(artist, index) in song.artists"
          :key="artist.name"
        >
          <span v-if="index > 0">,&nbsp;</span>
          {{artist.name}}&nbsp;
          <i
            v-if="artist.spotlight"
            class="flex text-xs ic-star"
          ></i>
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'
import {Song} from '@/types'

export default defineComponent({
  name: 'SongQueue',
  props: {
    song: Object as PropType<Song>,
    active: Boolean,
  },
  setup(props) {
    const store = useStore()

    function play() {
      if (props.active) {
        store.commit('togglePlay')
      } else {
        store.commit('setCurrentSong', props.song)
      }
    }

    return {isPlaying: computed(() => store.state.isPlaying), play}
  }
})
</script>

<style scoped>
.song-wrapper:hover .overlay {
  opacity: 1;
}
</style>
