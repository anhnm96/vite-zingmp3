<template>
  <div
    id="player"
    class="fixed bottom-0 w-full bg-layout"
    :class="{
      playing: playerState === PlayerState.PLAYING,
      'border-none bg-transparent': showLyric,
    }"
  >
    <div
      class="flex items-center w-full pl-10 pr-5 space-x-2 border-t-player h-22"
      :class="showLyric ? 'bg-transparent' : 'bg-player'"
    >
      <!-- left -->
      <div class="flex w-1/3 space-x-3">
        <!-- thumbnail -->
        <div class="relative flex-shrink-0 pointer-events-none text-player">
          <img class="thumbnail" :src="song.thumbnail" alt="thumbnail" />
          <svg fill="currentColor" viewBox="0 0 512 512" class="note note-1">
            <path
              d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"
            />
          </svg>
          <svg fill="currentColor" viewBox="0 0 384 512" class="note note-2">
            <path
              d="M310.94 1.33l-96.53 28.51A32 32 0 0 0 192 60.34V360a148.76 148.76 0 0 0-48-8c-61.86 0-112 35.82-112 80s50.14 80 112 80 112-35.82 112-80V148.15l73-21.39a32 32 0 0 0 23-30.71V32a32 32 0 0 0-41.06-30.67z"
            />
          </svg>
          <svg fill="currentColor" viewBox="0 0 512 512" class="note note-3">
            <path
              d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"
            />
          </svg>
          <svg fill="currentColor" viewBox="0 0 384 512" class="note note-4">
            <path
              d="M310.94 1.33l-96.53 28.51A32 32 0 0 0 192 60.34V360a148.76 148.76 0 0 0-48-8c-61.86 0-112 35.82-112 80s50.14 80 112 80 112-35.82 112-80V148.15l73-21.39a32 32 0 0 0 23-30.71V32a32 32 0 0 0-41.06-30.67z"
            />
          </svg>
        </div>
        <!-- detail -->
        <div class="flex flex-col justify-center space-y-1 overflow-hidden">
          <h4 class="font-semibold truncate text-md text-player">
            {{ song.title }}
          </h4>
          <p class="text-xs text-player">
            {{ song.artistsNames }}
          </p>
        </div>
        <!-- actions -->
        <div class="flex place-items-center">
          <button
            class="flex items-center justify-center w-8 h-8 rounded-full  text-player hover:bg-alpha"
          >
            <i class="flex ic-like" />
          </button>
          <button
            class="flex items-center justify-center w-8 h-8 rounded-full  text-player hover:bg-alpha"
          >
            <i class="flex ic-more" />
          </button>
        </div>
      </div>
      <!-- center -->
      <div
        class="flex-grow transform -translate-x-5"
        :class="showLyric && 'flex flex-col-reverse'"
      >
        <!-- controls -->
        <div class="flex items-center justify-center space-x-4">
          <button
            class="flex items-center justify-center w-8 h-8 text-base rounded-full  focus:outline-none text-player hover:bg-alpha"
            :class="isShuffled && 'text-link-hover'"
            @click="toggleShuffleSongList"
          >
            <i class="flex ic-shuffle" />
          </button>
          <button
            class="flex items-center justify-center w-8 h-8 text-base rounded-full  focus:outline-none text-player hover:bg-alpha"
            @click="playPrevious"
          >
            <i class="flex ic-pre" />
          </button>
          <button
            :disabled="playerState === PlayerState.LOADING"
            class="flex items-center justify-center w-12 h-12 text-4xl rounded-full  focus:outline-none text-player"
            @click="togglePlay"
          >
            <i
              class="flex"
              :class="{
                'ic-pause-circle-outline': playerState === PlayerState.PLAYING,
                'ic-play-circle-outline': playerState === PlayerState.PAUSE,
              }"
            />
            <Loading v-if="playerState === PlayerState.LOADING" />
          </button>
          <button
            class="flex items-center justify-center w-8 h-8 text-base rounded-full  focus:outline-none text-player hover:bg-alpha"
            @click="playNext"
          >
            <i class="flex ic-next" />
          </button>
          <button
            class="flex items-center justify-center w-8 h-8 text-base rounded-full  focus:outline-none text-player hover:bg-alpha"
            :class="{ 'text-link-hover': playerMode !== PlayerMode.DEFAULT }"
            @click="setNextPlayerMode"
          >
            <i
              class="flex"
              :class="
                playerMode === PlayerMode.REPEAT_SONG
                  ? 'ic-repeat-one'
                  : 'ic-repeat'
              "
            />
          </button>
        </div>
        <!-- seeker -->
        <div class="flex items-center space-x-3">
          <span class="text-xs font-semibold opacity-50 text-player">{{
            seek
          }}</span>
          <ProgressBar
            v-model:progress="currentTime"
            :max="currentSong.duration"
          />
          <span class="text-xs font-bold text-player">{{ duration }}</span>
        </div>
      </div>
      <!-- right -->
      <div class="flex items-center justify-end w-1/3">
        <button
          v-if="song.mvlink"
          class="flex items-center justify-center w-8 h-8 rounded-full  text-player hover:bg-alpha focus:outline-none"
        >
          <i class="flex ic-mv" />
        </button>
        <button
          class="flex items-center justify-center w-8 h-8 ml-2 rounded-full  text-player hover:bg-alpha focus:outline-none"
          @click="toggleShowLyric"
        >
          <i class="flex ic-karaoke" />
        </button>
        <div class="flex items-center ml-2 space-x-2">
          <button
            class="flex items-center justify-center w-8 h-8 rounded-full  text-player hover:bg-alpha focus:outline-none"
            @click="toggleMute"
          >
            <i class="flex" :class="isMuted ? 'ic-volume-mute' : 'ic-volume'" />
          </button>
          <ProgressBar v-model:progress="volume" :max="1" style="width: 70px" />
        </div>
        <div class="pl-4 ml-6 border-l btn-toggle border-player">
          <button
            class="flex items-center justify-center w-8 h-8 rounded-full  text-player hover:bg-alpha focus:outline-none"
            @click="toggleShowPlaylist"
          >
            <i class="flex ic-list-music" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { PlayerState, PlayerMode } from '@/store'
import ProgressBar from '../base/ProgressBar.vue'

export default defineComponent({
  name: 'Player',
  components: { ProgressBar },
  setup() {
    const store = useStore()
    const song = computed(() => store.state.currentSong)

    const currentTime = computed<number>({
      get() {
        return store.state.currentTime
      },
      set(val) {
        store.dispatch('updateSeek', val)
      },
    })

    const volume = computed<number>({
      get() {
        return store.state.volume
      },
      set(val: number) {
        store.commit('setVolume', val)
      },
    })

    function handleKeyDown(e: KeyboardEvent) {
      if (e.target.tagName === 'BUTTON')
        e.preventDefault()
      if (e.code === 'Space') {
        togglePlay()
      }
    }

    function togglePlay() {
      store.dispatch('togglePlay')
    }

    onMounted(() => {
      document.addEventListener('keydown', handleKeyDown)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeyDown)
    })

    return {
      song,
      currentTime,
      currentSong: computed(() => store.state.currentSong),
      volume,
      seek: computed<string>(() => store.state.seek),
      PlayerState,
      PlayerMode,
      playerState: computed<PlayerState>(() => store.state.playerState),
      isMuted: computed<boolean>(() => store.state.isMuted),
      showLyric: computed<boolean>(() => store.state.showLyric),
      duration: computed(() => store.getters.duration),
      isShuffled: computed(() => store.state.isShuffled),
      playerMode: computed(() => store.state.playerMode),
      togglePlay,
      toggleMute: () => store.commit('toggleMute'),
      toggleShowLyric: () => store.commit('toggleShowLyric'),
      toggleShowPlaylist: () => store.commit('toggleShowPlaylist'),
      toggleShuffleSongList: () => store.commit('toggleShuffleSongList'),
      playNext: () => store.dispatch('playNext'),
      playPrevious: () => store.dispatch('playPrevious'),
      setNextPlayerMode: () => store.commit('setNextPlayerMode'),
    }
  },
})
</script>

<style scoped>
.thumbnail {
  @apply w-16 h-16 rounded-full;
  border: 3px solid var(--banner-home-dot);
  animation-name: spin;
  animation-duration: 12s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-play-state: paused;
}

.note {
  height: 10px;
  width: 10px;
  position: absolute;
  top: calc(50% - 5px);
  left: calc(50% - 5px);
  opacity: 0;
  -webkit-animation-name: bubble-1;
  animation-name: bubble-1;
  animation-iteration-count: infinite;
  animation-duration: 4.8s;
  animation-timing-function: linear;
  animation-play-state: paused;
}
.note-2 {
  animation-delay: 1.2s;
  animation-name: bubble-2;
}

.note-3 {
  animation-delay: 2.4s;
}

.note-4 {
  animation-delay: 3.6s;
  animation-name: bubble-2;
}

.playing :is(.thumbnail, .note) {
  animation-play-state: running;
}

@media only screen and (min-width: 1636px) {
  .btn-toggle {
    display: none;
  }
}

@keyframes bubble-1 {
  0% {
    opacity: 0;
    transform: rotate(90deg) translate(40px) rotate(-90deg);
  }

  50% {
    opacity: 1;
    transform: rotate(180deg) translate(55px) rotate(-180deg) scale(1.3);
  }

  100% {
    opacity: 0;
    transform: rotate(260deg) translate(70px) rotate(-260deg) scale(1.7)
      rotate(45deg) rotate(50deg);
  }
}

@keyframes bubble-2 {
  0% {
    opacity: 0;
    transform: rotate(90deg) translate(40px) rotate(-90deg);
  }

  50% {
    opacity: 1;
    transform: rotate(175deg) translate(57.5px) rotate(-175deg) scale(1.3)
      rotate(-50deg);
  }

  100% {
    opacity: 0;
    transform: rotate(260deg) translate(75px) rotate(-260deg) scale(1.7)
      rotate(45deg) rotate(-50deg);
  }
}
</style>
