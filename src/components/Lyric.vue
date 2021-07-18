<template>
  <transition
    name="slide"
    appear
  >
    <div class="fixed inset-0 z-40 pb-20 bg-primary">
      <!-- background images -->
      <div class="absolute inset-0 isolate bg-[color:var(--alpha-layout-bg)]">
        <div
          class="opacity-50"
          :class="{paused: !isPlaying}"
        >
          <transition
            name="fade"
            type="transition"
            @after-leave="disappeared('above')"
          >
            <img
              v-show="showBgAbove"
              :src="bgImageAbove"
              alt="background1"
              class="absolute inset-0 z-10 object-cover object-center w-full h-full animate-enter"
              @animationend="animationEnd('above')"
            >
          </transition>
          <transition
            name="fade"
            type="transition"
            @after-leave="disappeared('bellow')"
          >
            <img
              v-show="!showBgAbove"
              :src="bgImageBellow"
              alt="background2"
              class="absolute inset-0 object-cover object-center w-full h-full animate-enter"
              @animationend="animationEnd('bellow')"
            >
          </transition>
        </div>
      </div>
      <div class="flex flex-col justify-between h-full pt-5 isolate">
        <!-- header -->
        <div class="relative flex items-center">
          <!-- center -->
          <div class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <div class="flex p-0.5 rounded-full bg-blur">
              <button
                class="flex-1 px-12 py-1.5 text-base font-semibold text-white text-opacity-50 rounded-full focus:outline-none"
                :class="tab === Tab.Karaoke && 'bg-tab-active bg-opacity-100  text-opacity-100'"
                @click="tab = Tab.Karaoke"
              >
                Karaoke
              </button>
              <button
                class="flex-1 px-12 py-1.5 text-base font-semibold text-white text-opacity-50 rounded-full focus:outline-none"
                :class="tab === Tab.Lyric && 'bg-tab-active bg-opacity-100 text-opacity-100'"
                @click="tab = Tab.Lyric"
              >
                Lyric
              </button>
            </div>
          </div>
          <!-- right -->
          <div class="flex ml-auto mr-5 space-x-4">
            <button class="flex items-center justify-center w-12 h-12 text-xl text-white rounded-full bg-blur">
              <i class="flex ic-settings" />
            </button>
            <button
              class="flex items-center justify-center w-12 h-12 text-xl text-white rounded-full bg-blur"
              @click="toggleShowLyric"
            >
              <i class="flex ic-go-down" />
            </button>
          </div>
        </div>
        <!-- content -->
        <div
          v-if="status === ApiStatus.PENDING"
          class="flex justify-center"
        >
          <Loading />
        </div>
        <template v-if="status === ApiStatus.SUCCESS">
          <div
            v-show="tab === Tab.Lyric"
            class="flex w-4/5 max-w-5xl gap-8 mx-auto"
          >
            <div class="hidden w-2/5 max-w-lg lg:flex lg:items-center">
              <img
                class="w-full rounded-lg"
                :src="currentSong.thumbnailM"
                alt="thumbnail"
              >
            </div>
            <!-- lyric -->
            <div
              class="flex-1 overflow-y-auto text-center hide-scrollbar lg:text-left"
              style="max-height: 500px"
            >
              <div
                v-for="(sentence, index) in sentences"
                :id="`sentence-${index}`"
                :key="`${index}-${sentence.content.trim()}`"
                class="p-5 text-4xl font-bold text-white rounded-lg cursor-pointer hover:bg-alpha"
                :class="[currentSentenceIndex === index && 'text-purple-primary bg-alpha', currentSentenceIndex > index && 'text-opacity-50']"
                @click="seekLyric(sentence.time)"
              >
                {{ sentence.content }}
              </div>
            </div>
          </div>
          <keep-alive>
            <Karaoke
              v-if="tab === Tab.Karaoke"
              :sentences="lyricData.sentences"
            />
          </keep-alive>
        </template>
        <!-- player -->
        <div class="text-center">
          <span class="text-sm font-bold text-player">{{ currentSong.title }}</span>
          <span class="text-sm opacity-50 text-player"> - {{ currentSong.artistsNames }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  ref,
  reactive,
  onActivated,
  onDeactivated,
} from 'vue'
import { useStore } from 'vuex'
import { fetchLyric, fetchKaraokeLyric, useApi, ApiStatus } from '@/api'
import { PlayerState } from '@/store'
import Karaoke from './Karaoke.vue'
import { lyricParser } from '@/helpers'

enum Tab {
  Lyric = 'LYRIC',
  Karaoke = 'KARAOKE',
}

export default defineComponent({
  name: 'LyricModal',
  components: { Karaoke },
  setup() {
    const tab = ref<Tab>(Tab.Lyric)
    const store = useStore()
    const sentences = ref([])

    const {
      data: lyricData,
      exec: fetchLyricData,
      status,
      onSuccess: onFetchLyricDone,
    } = useApi(fetchLyric)
    const { exec: fetchKaraokeLyricData, onSuccess: onFetchKaraokeLyricDone } =
      useApi(fetchKaraokeLyric)

    watch(
      () => store.state.currentSong,
      () => {
        fetchLyricData(store.state.currentSong.encodeId)
      },
      { immediate: true }
    )

    onFetchLyricDone((result) => {
      fetchKaraokeLyricData(result.file)
    })

    // transition background images
    let timeBg: number
    const showBgAbove = ref(true)
    const bgIndexes = reactive({ above: 0, bellow: 1 })
    function animationEnd(key: 'above' | 'bellow') {
      timeBg = setTimeout(() => {
        showBgAbove.value = !showBgAbove.value
      }, 1500)
    }

    function disappeared(key: 'above' | 'bellow') {
      if (bgIndexes[key] + 2 < lyricData.value.defaultIBGUrls.length)
        bgIndexes[key] += 2
      else bgIndexes[key] = key === 'above' ? 0 : 1
    }

    const bgImageAbove = computed(
      () => lyricData.value?.defaultIBGUrls[bgIndexes['above']]
    )
    const bgImageBellow = computed(
      () => lyricData.value?.defaultIBGUrls[bgIndexes['bellow']]
    )

    // toggle style var
    onActivated(() => {
      document.body.style.setProperty('--player-text', '#fff')
    })

    onDeactivated(() => {
      document.body.style.removeProperty('--player-text')
    })
    //
    onFetchKaraokeLyricDone((result) => {
      sentences.value = lyricParser(result)
    })

    onMounted(() => {
      document.body.style.overflow = 'hidden'
    })

    onBeforeUnmount(() => {
      document.body.style.overflow = ''
      clearTimeout(timeout)
      clearTimeout(timeBg)
    })

    const currentSentenceIndex = ref<number>(0)

    let timeout: number
    function updateCurrentIndex() {
      const seek = store.state.howler.seek()
      currentSentenceIndex.value = sentences.value.findIndex(
        (sentence, index) => {
          const nextSentence = sentences.value[index + 1]
          if (nextSentence)
            return seek >= sentence.time && seek < nextSentence.time
          return seek >= sentence.time
        }
      )
      timeout = setTimeout(updateCurrentIndex, 200)
    }

    watch(currentSentenceIndex, (val) => {
      const el = document.getElementById(`sentence-${val}`)
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        })
      }
    })

    // initially we watch store.state.seek to update
    // currentSentenceIndex but it was slow to sync
    // with playing sound.
    watch(
      () => store.state.playerState,
      (val) => {
        if (val === PlayerState.PLAYING) updateCurrentIndex()
        else clearTimeout(timeout)
      },
      { immediate: true }
    )

    function seekLyric(time: number) {
      store.state.howler.seek(time)
    }

    return {
      isPlaying: computed(() => store.getters.isPlaying),
      showBgAbove,
      bgImageAbove,
      bgImageBellow,
      disappeared,
      animationEnd,
      tab,
      Tab,
      sentences,
      currentSentenceIndex,
      toggleShowLyric: () => store.commit('toggleShowLyric'),
      seekLyric,
      lyricData,
      status,
      ApiStatus,
      currentSong: computed(() => store.state.currentSong),
    }
  },
})
</script>

<style>
.slide-enter-from,
.slide-leave-to {
  transform: translateY(90%);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.7s ease-out;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.paused img {
  animation-play-state: paused;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 5s ease;
}

.animate-enter {
  animation: animateEnter 10s linear forwards;
}

@keyframes animateEnter {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
