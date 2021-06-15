<template>
  <div
    v-if="song"
    class="sticky bottom-0 border-t bg-primary border-alpha"
    :class="isPlaying && 'playing'"
  >
    <div class="flex items-center w-full h-24 pl-10 pr-5 space-x-2">
      <!-- left -->
      <div class="flex w-1/3 space-x-3">
        <!-- thumbnail -->
        <div class="relative">
          <img
            class="thumbnail"
            :src="song.thumbnail"
            alt="thumbnail"
          >
          <svg
            viewBox="0 0 512 512"
            class="note note-1"
          >
            <path d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"></path>
          </svg><svg
            viewBox="0 0 384 512"
            class="note note-2"
          >
            <path d="M310.94 1.33l-96.53 28.51A32 32 0 0 0 192 60.34V360a148.76 148.76 0 0 0-48-8c-61.86 0-112 35.82-112 80s50.14 80 112 80 112-35.82 112-80V148.15l73-21.39a32 32 0 0 0 23-30.71V32a32 32 0 0 0-41.06-30.67z"></path>
          </svg><svg
            viewBox="0 0 512 512"
            class="note note-3"
          >
            <path d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"></path>
          </svg><svg
            viewBox="0 0 384 512"
            class="note note-4"
          >
            <path d="M310.94 1.33l-96.53 28.51A32 32 0 0 0 192 60.34V360a148.76 148.76 0 0 0-48-8c-61.86 0-112 35.82-112 80s50.14 80 112 80 112-35.82 112-80V148.15l73-21.39a32 32 0 0 0 23-30.71V32a32 32 0 0 0-41.06-30.67z"></path>
          </svg>
        </div>
        <!-- detail -->
        <div class="flex flex-col justify-center space-y-1">
          <h4 class="font-semibold text-md text-primary">{{song.title}}</h4>
          <p class="text-xs text-secondary">{{song.artists[0].name}}</p>
        </div>
        <!-- actions -->
        <div class="flex place-items-center">
          <button class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-alpha">
            <i class="flex ic-like"></i>
          </button>
          <button class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-alpha">
            <i class="flex ic-more"></i>
          </button>
        </div>
      </div>
      <!-- center -->
      <div class="flex-grow">
        <!-- controls -->
        <div class="flex items-center justify-center space-x-4">
          <button class="flex items-center justify-center w-8 h-8 text-base rounded-full focus:outline-none text-primary hover:bg-alpha">
            <i class="flex ic-shuffle"></i>
          </button>
          <button class="flex items-center justify-center w-8 h-8 text-base rounded-full focus:outline-none text-primary hover:bg-alpha">
            <i class="flex ic-pre"></i>
          </button>
          <button
            @click="togglePlay"
            class="flex items-center justify-center w-12 h-12 text-4xl rounded-full focus:outline-none text-primary"
          >
            <i
              class="flex"
              :class="isPlaying ? 'ic-pause-circle-outline' : 'ic-play-circle-outline'"
            ></i>
          </button>
          <button class="flex items-center justify-center w-8 h-8 text-base rounded-full focus:outline-none text-primary hover:bg-alpha">
            <i class="flex ic-next"></i>
          </button>
          <button class="flex items-center justify-center w-8 h-8 text-base rounded-full focus:outline-none text-primary hover:bg-alpha">
            <i class="flex ic-repeat"></i>
          </button>
        </div>
        <!-- seeker -->
        <div class="flex items-center space-x-3">
          <span class="text-xs font-semibold text-secondary">00:04</span>
          <ProgressBar />
          <span class="text-xs font-bold text-primary">6:04</span>
        </div>
      </div>
      <!-- right -->
      <div class="w-1/3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import ProgressBar from './ProgressBar.vue'

export default defineComponent({
  name: 'Player',
  components: { ProgressBar },
  setup() {
    const store = useStore()
    const song = computed(() => store.state.currentSong)
    const isPlaying = computed<boolean>(() => store.getters.isPlaying)
    function togglePlay() {
      store.commit('togglePlay')
    }

    return { song, isPlaying, togglePlay }
  },
})
</script>

<style scoped>
.thumbnail {
  @apply w-16 h-16 rounded-full;
  border: 3px solid var(--banner-home-dot);
  animation-name: spinner;
  animation-duration: 12s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-play-state: paused;
}

.note {
  @apply text-primary;
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

@keyframes spinner {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
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

  to {
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

  to {
    opacity: 0;
    transform: rotate(260deg) translate(75px) rotate(-260deg) scale(1.7)
      rotate(45deg) rotate(-50deg);
  }
}
</style>
