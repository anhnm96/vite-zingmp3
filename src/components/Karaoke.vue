<template>
  <div>
    <canvas
      id="canvas"
      width="1500"
      height="600"
      ref="canvasEl"
      class="w-full h-full mx-auto"
    ></canvas>s
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const fontSize = 50
const lineHeight = 1.5
const lines = 2
const fontFamily = '${fontFamily}'

export default defineComponent({
  name: 'Karaoke',
  props: {
    sentences: Array,
  },
  setup(props) {
    const Colors = {
      primary: '#000',
      stroke: '#7200a1',
    }
    let ctx: CanvasRenderingContext2D
    let width = 0
    let height = 0
    const canvasEl = ref(null)
    onMounted(() => {
      ctx = canvasEl.value.getContext('2d')
      width = canvasEl.value.width
      height = canvasEl.value.height
      console.log('asd', width, height)

      // ctx.fillStyle = Colors.primary
      // ctx.clearRect(0, 0, width, height)
      ctx.textAlign = 'center'
      // ctx.font = `bold ${fontSize}px Arial`
      // ctx.textBaseline = 'hanging'
      // ctx.globalAlpha = 1
      drawIntro()
    })

    function drawIntro() {
      // const song = player.currentSong.value
      // if (!song) return
      const fontsize = [60, 40]
      ;['Cafe Không Đường', 'G5RSquad'].forEach((text, index) => {
        const contentHeight =
          fontSize * lines + lineHeight * fontSize * (lines - 1)

        const positionY =
          (height - contentHeight) / 2 +
          (lineHeight * fontSize + fontSize) * (index % lines)
        const positionX = width / 2

        ctx.font = `bold ${fontsize[index]}px Arial`
        console.log(positionX, positionY)
        ctx.fillText(text, positionX, positionY)
      })
    }

    function draw() {
      ctx.fillStyle = Colors.primary
      ctx.clearRect(0, 0, width, height)
      ctx.textAlign = 'center'
      ctx.font = `bold ${fontSize}px ${fontFamily}`
      ctx.textBaseline = 'hanging'
      ctx.globalAlpha = 1

      //
      const { seek, start, end, text, words } = {
        seek: 21000,
        start: 20390,
        end: 23380,
        duration: 2990,
        text: 'Sao hôm nay tôi nơi đây lại buồn',
        words: [
          {
            start: 20390,
            end: 21140,
            duration: 750,
            text: 'Sao',
            startAt: 0,
            perInSentence: 0.11610151154523816,
          },
          {
            start: 21140,
            end: 21380,
            duration: 240,
            text: 'hôm',
            startAt: 0.13368983957219252,
            perInSentence: 0.13362801768106086,
          },
          {
            start: 21380,
            end: 21640,
            duration: 260,
            text: 'nay',
            startAt: 0.2849061852802077,
            perInSentence: 0.10908472690179592,
          },
          {
            start: 21640,
            end: 21870,
            duration: 230,
            text: 'tôi',
            startAt: 0.411579240208958,
            perInSentence: 0.0773391858056938,
          },
          {
            start: 21870,
            end: 22140,
            duration: 270,
            text: 'nơi',
            startAt: 0.5065067540416062,
            perInSentence: 0.10658094031096411,
          },
          {
            start: 22140,
            end: 22390,
            duration: 250,
            text: 'đây',
            startAt: 0.6306760223795246,
            perInSentence: 0.10908472690179592,
          },
          {
            start: 22390,
            end: 22880,
            duration: 490,
            text: 'lại',
            startAt: 0.7573490773082748,
            perInSentence: 0.0703842230533832,
          },
          {
            start: 22880,
            end: 23380,
            duration: 500,
            text: 'buồn',
            startAt: 0.8453216283886124,
            perInSentence: 0.1546783716113876,
          },
        ],
      }
      const metaText = ctx.measureText(text)
      console.log((width - metaText.width) / 2, (width + metaText.width) / 2)
      const gradient = ctx.createLinearGradient(
        (width - metaText.width) / 2,
        0,
        (width + metaText.width) / 2,
        0
      )
      if (seek > end) {
        gradient.addColorStop(1, Colors.stroke)
      } else if (seek < start) {
        gradient.addColorStop(1, Colors.primary)
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
        gradient.addColorStop(percent, Colors.stroke)
        gradient.addColorStop(percent, Colors.primary)
      }

      //
      const contentHeight =
        fontSize * lines + lineHeight * fontSize * (lines - 1)

      const positionY =
        (height - contentHeight) / 2 +
        (lineHeight * fontSize + fontSize) * (0 % lines)
      const positionX = width / 2

      ctx.fillStyle = gradient
      ctx.fillText(text, positionX, positionY)
    }

    return { canvasEl }
  },
})
</script>

<style>
</style>
