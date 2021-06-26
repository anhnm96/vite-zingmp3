<template>
  <div class="fixed inset-0 z-40 pb-20 bg-primary">
    <div class="flex flex-col justify-between h-full pt-5">
      <!-- header -->
      <div class="relative flex items-center">
        <!-- center -->
        <div class="absolute w-1/4 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <div class="flex p-1 rounded-full bg-alpha">
            <button
              @click="tab = Tab.Karaoke"
              class="flex-1 px-2 py-1 text-base focus:outline-none text-secondary"
              :class="tab === Tab.Karaoke && 'font-semibold rounded-full bg-active text-primary'"
            >Karaoke</button>
            <button
              @click="tab = Tab.Lyric"
              class="flex-1 px-2 py-1 text-base focus:outline-none text-secondary"
              :class="tab === Tab.Lyric && 'font-semibold rounded-full bg-active text-primary'"
            >Lyric</button>
          </div>
        </div>
        <!-- right -->
        <div class="flex ml-auto mr-5 space-x-4">
          <button
            class="flex items-center justify-center w-12 h-12 text-xl rounded-full text-primary bg-alpha"
          >
            <i class="flex ic-settings"></i>
          </button>
          <button
            @click="toggleShowLyric"
            class="flex items-center justify-center w-12 h-12 text-xl rounded-full text-primary bg-alpha"
          >
            <i class="flex ic-go-down"></i>
          </button>
        </div>
      </div>
      <!-- content -->
      <div v-if="status === ApiStatus.PENDING" class="flex justify-center">
        <Loading />
      </div>
      <template v-if="status === ApiStatus.SUCCESS">
        <div v-show="tab === Tab.Lyric" class="flex w-4/5 max-w-5xl mx-auto space-x-4">
          <img
            class="rounded-lg"
            style="width: 400px"
            :src="currentSong.thumbnailM"
            alt="thumbnail"
          />
          <!-- lyric -->
          <div class="flex-1 overflow-y-auto hide-scrollbar" style="max-height: 400px">
            <div
              v-for="(sentence, index) in sentences"
              :key="`${index}-${sentence.content.trim()}`"
              :id="`sentence-${index}`"
              class="text-2xl font-bold text-secondary p-2.5 rounded-lg cursor-pointer hover:bg-alpha"
              :class="currentSentenceIndex === index && 'text-progress bg-alpha'"
              @click="seekLyric(sentence.time)"
            >{{ sentence.content }}</div>
          </div>
        </div>
        <keep-alive>
          <Karaoke v-if="tab === Tab.Karaoke" :sentences="lyricData.sentences" />
        </keep-alive>
      </template>
      <!-- player -->
      <div class="text-center">
        <span class="text-sm font-bold text-primary">{{ currentSong.title }}</span>
        <span class="text-sm text-secondary">- {{ currentSong.artistsNames }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  ref,
} from 'vue'
import { useStore } from 'vuex'
import { fetchLyric, fetchKaraokeLyric, useApi, ApiStatus } from '@/api'
import { PlayerState } from '@/store'
import Karaoke from './Karaoke.vue'
// import lyricData from '@/data/lyric.json'
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

    const { data: lyricData, exec: fetchLyricData, status, onSuccess: onFetchLyricDone } = useApi(fetchLyric)
    const { exec: fetchKaraokeLyricData, onSuccess: onFetchKaraokeLyricDone } = useApi(fetchKaraokeLyric)

    watch(() => store.state.currentSong, () => {
      fetchLyricData(store.state.currentSong.encodeId)
    }, { immediate: true })

    onFetchLyricDone((result) => {
      // console.log('lyricDone', result)
      fetchKaraokeLyricData(result.file)
    })

    onFetchKaraokeLyricDone((result) => {
      sentences.value = lyricParser(result)
    })

    onMounted(() => {
      document.body.style.overflow = 'hidden'
    })

    onBeforeUnmount(() => {
      document.body.style.overflow = ''
      clearTimeout(timeout)
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
      }, { immediate: true }
    )

    function seekLyric(time: number) {
      store.state.howler.seek(time)
    }

    return {
      tab,
      Tab,
      sentences,
      currentSentenceIndex,
      toggleShowLyric: () => store.commit('toggleShowLyric'),
      seekLyric,
      lyricData,
      status,
      ApiStatus,
      currentSong: computed(() => store.state.currentSong)
    }
  },
})
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
