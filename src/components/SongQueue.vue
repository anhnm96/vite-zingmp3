<template>
  <div
    class="group flex items-start p-2 space-x-2.5 rounded"
    :class="{ 'bg-purple-primary': active, 'hover:bg-alpha': !active }"
    @dblclick="play"
  >
    <!-- thumbnail -->
    <div class="relative flex-shrink-0 overflow-hidden rounded">
      <img
        class="w-10 h-10"
        :src="song.thumbnail"
        alt="thumbnail"
      >
      <div
        class="absolute inset-0 bg-black group-hover:opacity-100 hover:opacity-100 bg-opacity-40"
        :class="active ? 'opacity-100' : 'opacity-0'"
      >
        <button
          :disabled="isLoading && active"
          class="flex items-center justify-center w-full h-full text-white focus:outline-none"
          @click.prevent="play"
        >
          <i
            v-show="!isLoading"
            class="flex icon"
            :class="{ 'ic-gif-playing-white': active && isPlaying, 'ic-play': (active && !isPlaying) || !active }"
          />
          <Loading v-if="isLoading && active" />
        </button>
      </div>
    </div>
    <div class="overflow-hidden select-none">
      <h4
        class="text-sm font-bold truncate"
        :class="active ? 'text-white' : 'text-primary'"
        :title="song.title"
      >
        {{ song.title }}
      </h4>
      <p
        class="mt-0.5 text-xs text-secondary truncate"
        :class="active && 'text-gray-100'"
      >
        <span
          v-for="(artist, index) in song.artists"
          :key="artist.id"
        >
          <span>{{ artist.name }}</span>
          <template v-if="song.artists.length > 1 && index < song.artists.length - 1">,&nbsp;</template>
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'
import { Song } from '@/types'
import { PlayerState } from '@/store'

export default defineComponent({
  name: 'SongQueue',
  props: {
    song: {
      type: Object as PropType<Song>,
      required: true,
    },
    active: Boolean,
  },
  setup(props) {
    const store = useStore()

    function play() {
      if (props.active) {
        store.dispatch('togglePlay')
      } else {
        // setTimeout for delay setCurrentSong. If not
        // the clickOutside will not detect that event.target
        // was child of Playlist
        // (cause this commit makes component rerender)
        // so it leads to unexpected
        // close Playlist sidebar
        setTimeout(() => {
          store.commit('setCurrentSong', props.song)
        }, 0)
      }
    }

    return {
      play,
      isPlaying: computed(
        () => store.state.playerState === PlayerState.PLAYING
      ),
      isLoading: computed(
        () => store.state.playerState === PlayerState.LOADING
      ),
    }
  },
})
</script>

<style scoped>
</style>
