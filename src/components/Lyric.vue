<template>
  <div class="fixed inset-0 z-40 pb-20 bg-primary">
    <div class="flex flex-col justify-between h-full pt-5">
      <!-- header -->
      <div class="relative flex items-center">
        <!-- center -->
        <div class="absolute w-1/4 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <div class="flex p-1 rounded-full bg-alpha">
            <button
              @click="tab=Tab.Karaoke"
              class="flex-1 px-2 py-1 text-base focus:outline-none text-secondary"
              :class="tab === Tab.Karaoke && 'font-semibold rounded-full bg-active text-primary'"
            >Karaoke</button>
            <button
              @click="tab=Tab.Lyric"
              class="flex-1 px-2 py-1 text-base focus:outline-none text-secondary"
              :class="tab === Tab.Lyric && 'font-semibold rounded-full bg-active text-primary'"
            >Lyric</button>
          </div>
        </div>
        <!-- right -->
        <div class="flex ml-auto mr-5 space-x-4">
          <button class="flex items-center justify-center w-12 h-12 text-xl rounded-full bg-alpha">
            <i class="flex ic-settings"></i>
          </button>
          <button
            @click="toggleShowLyric"
            class="flex items-center justify-center w-12 h-12 text-xl rounded-full bg-alpha"
          >
            <i class="flex ic-go-down"></i>
          </button>
        </div>
      </div>
      <!-- content -->
      <div
        v-show="tab===Tab.Lyric"
        class="flex w-4/5 max-w-5xl mx-auto space-x-4"
      >
        <img
          class="rounded-lg"
          style="width: 400px"
          src="https://photo-resize-zmp3.zadn.vn/w512_r1x1_jpeg/cover/2/8/6/f/286f0b4fae2ab3b2a7942968e22bd58f.jpg"
          alt="thumbnail"
        >
        <!-- lyric -->
        <div
          class="flex-1 overflow-y-auto hide-scrollbar"
          style="max-height: 400px"
        >
          <div
            v-for="(sentence, index) in sentences"
            :key="sentence.time"
            :id="`sentence-${index}`"
            class="text-2xl font-bold text-secondary p-2.5 rounded-lg cursor-pointer hover:bg-alpha"
            :class="currentSentenceIndex === index && 'text-progress bg-alpha'"
            @click="seekLyric(sentence.time)"
          >{{sentence.content}}</div>
        </div>
      </div>
      <Karaoke v-if="tab===Tab.Karaoke" />
      <!-- player -->
      <div class="text-center">
        <span class="text-sm font-bold text-primary">Cafe Không Đường</span>
        <span class="text-sm text-secondary"> - G5RSquad</span>
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
import Karaoke from './Karaoke.vue'
import lyricData from '@/data/lyric.json'
import axios from 'axios'
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
    axios
      .get(lyricData.file)
      .then(({ data }) => {
        sentences.value = lyricParser(data)
      })
      .catch((err) => console.log(err))
    onMounted(() => {
      document.body.style.overflow = 'hidden'
    })

    onBeforeUnmount(() => {
      document.body.style.overflow = ''
    })

    const currentSentenceIndex = ref<number>(0)

    let timeout
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
      () => store.state.isPlaying,
      (val) => {
        if (val) updateCurrentIndex()
        else clearTimeout(timeout)
      }
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
