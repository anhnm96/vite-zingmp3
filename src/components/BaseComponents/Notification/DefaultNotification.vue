<template>
  <transition
    enter-active-class="transition duration-300 ease-out transform"
    enter-from-class="opacity-0 sm:translate-x-full"
    enter-to-class="opacity-100 sm:translate-x-0"
    leave-active-class="transition duration-200 ease-in transform"
    leave-from-class="opacity-100"
    leave-to-class="-translate-y-2 opacity-0 "
    appear
    @after-leave="() => onClose()"
  >
    <div
      v-show="show"
      ref="notiEl"
      class="max-w-sm overflow-hidden transition-all rounded-lg shadow-lg pointer-events-auto bg-primary ring-1 ring-black ring-opacity-5"
      :class="positionClass"
    >
      <div class="p-4">
        <div class="flex items-center">
          <div class="ml-3 flex-1 pt-0.5">
            <p class="text-sm font-medium text-primary">
              {{ title }}
            </p>
            <p class="mt-1 text-sm text-secondary">
              {{ description }}
            </p>
          </div>
          <div class="flex flex-shrink-0 ml-4">
            <button
              class="inline-flex text-xl rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
              @click="show = false"
            >
              <span class="sr-only">Close</span>
              <i
                class="flex items-center justify-center text-sm ic-close"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="showProgressbar"
        class="w-full h-1"
        :class="[`bg-${typeStyle.color}-500`]"
        :style="{ width: progress + '%' }"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import {
  PropType,
  defineComponent,
  onMounted,
  onBeforeUnmount,
  ref,
  reactive,
} from 'vue'
import { Position } from './types'
import useTimer from './useTimer'

export default defineComponent({
  name: 'BaseNotification',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    onClose: {
      type: Function,
      default: () => ({}),
    },
    position: {
      type: String as PropType<Position>,
      default: 'top-right',
    },
    timeout: {
      type: Number,
      default: 5000,
    },
    showProgressbar: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'info',
    },
  },
  setup(props) {
    const show = ref(true)
    let positionClass
    switch (props.position) {
      case 'top-right':
        positionClass = 'top-0 right-0'
        break
      case 'top-left':
        positionClass = 'top-0 left-0'
        break
      case 'top-center':
        positionClass = 'top-0 left-1/2 transform -translate-x-1/2'
        break
      case 'bottom-right':
        positionClass = 'bottom-0 right-0'
        break
      case 'bottom-left':
        positionClass = 'bottom-0 left-0'
        break
      case 'bottom-center':
        positionClass = 'bottom-0 left-1/2 transform -translate-x-1/2'
        break
    }

    const typeStyle = reactive({ color: '' })

    switch (props.type) {
      case 'info':
        Object.assign(typeStyle, {
          color: 'indigo',
        })
        break
      case 'warn':
        Object.assign(typeStyle, {
          color: 'yellow',
        })
        break
      case 'success':
        Object.assign(typeStyle, { color: 'green' })
        break
      case 'danger':
        Object.assign(typeStyle, { color: 'red' })
        break
    }

    const notiEl = ref(null)
    let progress
    if (props.timeout > 0) {
      const {
        start,
        stop,
        progress: val,
      } = useTimer(() => (show.value = false), props.timeout)
      progress = val
      // eslint-disable-next-line no-inner-declarations
      function mouseenter() {
        stop()
      }
      // eslint-disable-next-line no-inner-declarations
      function mouseleave() {
        start()
      }

      onMounted(() => {
        notiEl.value.addEventListener('mouseenter', mouseenter)
        notiEl.value.addEventListener('mouseleave', mouseleave)
        start()
      })

      onBeforeUnmount(() => {
        notiEl.value.removeEventListener('mouseenter', mouseenter)
        notiEl.value.removeEventListener('mouseleave', mouseleave)
      })
    }

    return { show, positionClass, progress, notiEl, typeStyle }
  },
})
</script>
