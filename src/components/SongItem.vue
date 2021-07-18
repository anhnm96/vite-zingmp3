<template>
  <div
    class="flex items-center justify-between p-2 border-t border-solid cursor-pointer hover:bg-alpha border-player"
    :class="isCurrent && 'bg-alpha'"
    @dblclick="playSong"
  >
    <!-- left -->
    <div class="flex items-center flex-1 space-x-2">
      <div class="relative w-10 h-10 overflow-hidden rounded">
        <img
          :src="song.thumbnail"
          alt="thumbnail"
        >
        <!-- overlay  -->
        <div
          class="absolute inset-0 bg-black bg-opacity-40"
          :class="!isCurrent && 'opacity-0 hover:opacity-100'"
        >
          <button
            class="flex w-full h-full place-items-center"
            @click="playSong"
          >
            <span class="w-5 h-5 mx-auto text-white">
              <i
                class="flex justify-center icon"
                :class="isPlaying ? 'ic-gif-playing-white' : 'ic-play'"
              />
            </span>
          </button>
        </div>
      </div>
      <div>
        <h4 class="text-sm font-semibold text-primary">
          {{ song.title }}
        </h4>
        <p class="text-xs text-secondary">
          <span
            v-for="(artist, index) in song.artists"
            :key="artist.name"
          >
            {{ artist.name }}
            <span v-if="index !== song.artists.length - 1">,</span>
          </span>
        </p>
      </div>
    </div>
    <!-- right -->
    <div class="flex flex-1 space-x-2">
      <div class="flex items-center flex-1 text-xs text-primary">
        <span>{{ songDuration }}</span>
      </div>
      <button
        v-if="song.mvlink"
        class="inline-flex items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-alpha text-primary"
      >
        <i class="flex icon ic-mv" />
      </button>
      <button
        v-if="song.hasLyric"
        class="inline-flex items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-alpha text-primary"
      >
        <i class="flex icon ic-karaoke" />
      </button>
      <button class="inline-flex items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-alpha text-primary">
        <i class="flex icon ic-like" />
      </button>
      <button class="inline-flex items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-alpha text-primary">
        <i class="flex icon ic-more" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { displayDuration } from '@/helpers/utils'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { PlayerState } from '@/store'

export default defineComponent({
  name: 'SongItem',
  props: {
    song: {
      type: Object,
      required: true,
    },
  },
  emits: ['playsong'],
  setup(props, { emit }) {
    let store = useStore()

    function playSong() {
      if (store.state.currentSong?.encodeId !== props.song.encodeId) {
        emit('playsong', props.song)
      } else {
        store.dispatch('togglePlay')
      }
    }

    const songDuration = computed(() => {
      return displayDuration(props.song.duration, 2)
    })

    const isCurrent = computed(
      () => store.state.currentSong?.encodeId === props.song.encodeId
    )
    const isPlaying = computed(
      () => isCurrent.value && store.state.playerState === PlayerState.PLAYING
    )

    return { songDuration, displayDuration, playSong, isCurrent, isPlaying }
  },
})
</script>
