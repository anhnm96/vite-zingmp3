<template>
  <div
    class="progress-bar"
    @pointerdown="pointerdown"
    @click="clickOnProgressBar"
  >
    <div
      ref="progressElement"
      class="progress-bg"
    >
      <div
        class="progress"
        :style="{width: progressDelta * 100 + '%'}"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'ProgressBar',
  props: {
    progress: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
  },
  emits: ['update:progress'],
  setup(props, { emit }) {
    const progressElement = ref<HTMLElement>()
    const progressDelta = computed<number>(() => {
      return props.progress / props.max
    })

    function pointerdown() {
      document.addEventListener('pointermove', pointermove)
      document.addEventListener('pointerup', pointerup)
    }

    function pointermove(e: PointerEvent) {
      setProgress(e)
    }

    function clickOnProgressBar(e: MouseEvent) {
      setProgress(e)
    }

    function setProgress(e: MouseEvent) {
      const elWidth = progressElement.value.offsetWidth
      let progressWidth =
        e.clientX - progressElement.value.getBoundingClientRect().left
      if (progressWidth < 0) progressWidth = 0
      if (progressWidth > elWidth) progressWidth = elWidth
      emit('update:progress', (progressWidth / elWidth) * props.max)
    }

    function pointerup() {
      document.removeEventListener('pointermove', pointermove)
      document.removeEventListener('pointerup', pointerup)
    }

    return { progressDelta, progressElement, pointerdown, clickOnProgressBar }
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
  right: -6px;
  top: -3px;
  opacity: 0;
}
.progress-bar:hover .progress::after {
  opacity: 1;
}
</style>
