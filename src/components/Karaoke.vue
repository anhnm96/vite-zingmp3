<template>
  <div>
    <h4 v-if="countdown <= 3 &&countdown > 0" class="absolute text-2xl font-bold text-center transform -translate-x-1/2 left-1/2">{{countdown}}</h4>
    <canvas
      id="canvas"
      width="1500"
      height="600"
      ref="canvasEl"
      class="w-full h-full mx-auto"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, PropType, watch, onBeforeUnmount, computed } from 'vue'
import { useStore } from 'vuex'
import { PlayerState } from '@/store'
import {buildSentences, normalize} from '@/helpers'
import { Sentence, Song } from "@/types"

const fontSize = 50
const lineHeight = 1.5
const lines = 2
const fontFamily = 'Arial'

export default defineComponent({
  name: 'Karaoke',
  props: {
    sentences: Array as PropType<Sentence[]>,
  },
  setup(props) {
    const store = useStore()
    const currentSong = computed<Song>(() => store.state.currentSong)
    const theme = computed(() => store.state.theme)

    const Colors = computed(() => {
      return {
        primary: theme.value === 'dark' ? '#fff' : '#000',
        stroke: '#7200a1',
      }
    })
    let ctx: CanvasRenderingContext2D
    let width = 0
    let height = 0
    const canvasEl = ref(null)
    let sections: any
    let timeout: number
    onMounted(() => {
      ctx = canvasEl.value.getContext('2d')
      width = canvasEl.value.width
      height = canvasEl.value.height

      // ctx.fillStyle = Colors.primary
      // ctx.clearRect(0, 0, width, height)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      // ctx.font = `bold ${fontSize}px Arial`
      // ctx.textBaseline = 'hanging'
      // ctx.globalAlpha = 1
      drawIntro()
      sections = normalize(props.sentences, ctx)
      watch(() => store.state.playerState, (val) => {
        if (val === PlayerState.PLAYING) {
          doKaraoke()
        } else {
          clearTimeout(timeout)
        }
      }, {immediate: true})
    })

    onBeforeUnmount(() => {
      clearTimeout(timeout)
    })

    const countdown = ref(0)
    function doKaraoke () {
      const currentTime = store.state.howler.seek() * 1000 
      if (currentTime < sections[0].start - 4000) drawIntro()
      else draw(store.state.howler.seek() * 1000)
      // show countdown when song about to start
      if (currentTime >= sections[0].start - 4000 && currentTime < sections[0].start) {
        countdown.value = Math.round((sections[0].start - currentTime) / 1000)
      }
      
      timeout = setTimeout(doKaraoke, 50)
    }

    function drawIntro() {
      // const song = player.currentSong.value
      // if (!song) return
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = Colors.value.primary
      const fontsize = [60, 40]
      ;[currentSong.value.title, currentSong.value.artistsNames].forEach((text, index) => {
        const textHeight = fontSize + lineHeight * fontSize
        const positionY = height / 2 + textHeight * index - textHeight / 2
        const positionX = width / 2

        ctx.font = `bold ${fontsize[index]}px Arial`
        ctx.fillText(text, positionX, positionY)
      })
    }

    function draw(seek: number) {
      ctx.fillStyle = Colors.value.primary
      ctx.clearRect(0, 0, width, height)
      // ctx.textAlign = 'center'
      // ctx.font = `bold ${fontSize}px ${fontFamily}`
      // ctx.textBaseline = 'hanging'
      // ctx.globalAlpha = 1

      const sentences = buildSentences(sections, seek)
      // console.log('sentences', sentences)
      sentences.forEach(({ text, start, end, words, index, alpha }: any) => {
        const metaText = ctx.measureText(text)
        const gradient = ctx.createLinearGradient(
          (width - metaText.width) / 2,
          0,
          (width + metaText.width) / 2,
          0
        )
        ctx.globalAlpha = alpha
        
        if (seek > end) {
          gradient.addColorStop(1, Colors.value.stroke)
        } else if (seek < start) {
          gradient.addColorStop(1, Colors.value.primary)
        } else {
          ctx.globalAlpha = 1
          let percent = 0
          for (let i = 0; i < words.length; i++) {
            const word = words[i]
            if (seek > word.end) {
              continue
            }
  
            percent = word.startAt
            const deta = (seek - word.start) / word.duration || 0
  
            if (deta < 0) {
              break
            }
  
            percent = Math.min(percent + deta * word.perInSentence, 1)
            break
          }
          gradient.addColorStop(percent, Colors.value.stroke)
          gradient.addColorStop(percent, Colors.value.primary)
        }

        const contentHeight =
          fontSize * lines + lineHeight * fontSize * (lines - 1)
  
        const positionY =
          (height - contentHeight) / 2 +
          (lineHeight * fontSize + fontSize) * (index % lines)
        const positionX = width / 2
  
        ctx.fillStyle = gradient
        ctx.fillText(text, positionX, positionY)
      })
    }

    return { canvasEl, countdown }
  }
})
// const { seek, start, end, text, words, duration } = {
      //   seek: 21000,
      //   start: 20390,
      //   end: 23380,
      //   duration: 2990,
      //   text: 'Sao hôm nay tôi nơi đây lại buồn',
      //   words: [
      //     {
      //       start: 20390,
      //       end: 21140,
      //       duration: 750,
      //       text: 'Sao',
      //       startAt: 0,
      //       perInSentence: 0.11610151154523816,
      //     },
      //     {
      //       start: 21140,
      //       end: 21380,
      //       duration: 240,
      //       text: 'hôm',
      //       startAt: 0.13368983957219252,
      //       perInSentence: 0.13362801768106086,
      //     },
      //     {
      //       start: 21380,
      //       end: 21640,
      //       duration: 260,
      //       text: 'nay',
      //       startAt: 0.2849061852802077,
      //       perInSentence: 0.10908472690179592,
      //     },
      //     {
      //       start: 21640,
      //       end: 21870,
      //       duration: 230,
      //       text: 'tôi',
      //       startAt: 0.411579240208958,
      //       perInSentence: 0.0773391858056938,
      //     },
      //     {
      //       start: 21870,
      //       end: 22140,
      //       duration: 270,
      //       text: 'nơi',
      //       startAt: 0.5065067540416062,
      //       perInSentence: 0.10658094031096411,
      //     },
      //     {
      //       start: 22140,
      //       end: 22390,
      //       duration: 250,
      //       text: 'đây',
      //       startAt: 0.6306760223795246,
      //       perInSentence: 0.10908472690179592,
      //     },
      //     {
      //       start: 22390,
      //       end: 22880,
      //       duration: 490,
      //       text: 'lại',
      //       startAt: 0.7573490773082748,
      //       perInSentence: 0.0703842230533832,
      //     },
      //     {
      //       start: 22880,
      //       end: 23380,
      //       duration: 500,
      //       text: 'buồn',
      //       startAt: 0.8453216283886124,
      //       perInSentence: 0.1546783716113876,
      //     },
      //   ],
      // }
</script>

<style>
</style>
