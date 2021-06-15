<template>
  <div
    class="progress-bar"
    @mousedown="mousedown"
    @click="clickOnProgressBar"
  >
    <div
      class="progress-bg"
      ref="progressElement"
    >
      <div
        class="progress"
        :style="{width: percent + '%'}"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'ProgressBar',
  setup(props) {
    const percent = ref<number>(15)
    const progressElement = ref<HTMLElement | null>(null)

    function mousedown() {
      console.log('mousedown')
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    }

    function mousemove(e) {
      setProgress(e)
    }

    function clickOnProgressBar(e) {
      console.log('click')
      setProgress(e)
    }

    function setProgress(e) {
      const elWidth = progressElement.value.offsetWidth
      let progress = e.clientX - progressElement.value.offsetLeft
      if (progress < 0) progress = 0
      if (progress > elWidth) progress = elWidth
      percent.value = (progress / elWidth) * 100
      console.log(percent.value)
    }

    function mouseup() {
      console.log('mouseup')
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
    }
    return { percent, progressElement, mousedown, clickOnProgressBar }
  },
})
</script>

<style scoped>
.progress-bar {
  @apply w-full cursor-pointer flex items-center;
  height: 15px;
}

.progress-bar:hover .progress-bg {
  height: 4px;
}

.progress-bg {
  @apply w-full relative rounded-full;
  background: var(--progress-bg);
  height: 3px;
}

.progress {
  @apply absolute top-0 left-0 h-full;
  background: var(--progress);
}
</style>
