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
        :style="{width: progressLocal + '%'}"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useVModel } from '@/composables'

export default defineComponent({
  name: 'ProgressBar',
  props: {
    progress: Number,
  },
  emits: ['update:progress'],
  setup(props) {
    const progressLocal = useVModel(props, 'progress')
    const progressElement = ref<HTMLElement | null>(null)

    function mousedown() {
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    }

    function mousemove(e: MouseEvent) {
      setProgress(e)
    }

    function clickOnProgressBar(e: MouseEvent) {
      setProgress(e)
    }

    function setProgress(e: MouseEvent) {
      const elWidth = progressElement.value.offsetWidth
      let progress =
        e.clientX - progressElement.value.getBoundingClientRect().left
      if (progress < 0) progress = 0
      if (progress > elWidth) progress = elWidth
      progressLocal.value = (progress / elWidth) * 100
    }

    function mouseup() {
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
    }
    return { progressLocal, progressElement, mousedown, clickOnProgressBar }
  },
})
</script>

<style scoped>
.progress-bar {
  @apply w-full cursor-pointer flex items-center;
  height: 15px;
}

.progress-bar:hover .progress-bg {
  height: 5px;
}

.progress-bg {
  @apply w-full relative rounded-full bg-progress;
  height: 3px;
}

.progress {
  @apply absolute top-0 left-0 h-full rounded-full bg-progress-active;
}

.progress::after {
  @apply bg-progress-active;
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 100%;
  right: 0;
  top: -3px;
  opacity: 0;
}
.progress-bar:hover .progress::after {
  opacity: 1;
}
</style>
