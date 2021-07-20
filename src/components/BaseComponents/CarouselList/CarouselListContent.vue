<template>
  <div
    ref="el"
    class="relative w-full overflow-hidden"
  >
    <ul
      class="flex transition-transform duration-300"
      :class="[wrapperClass]"
      :style="`transform: translateX(${translation}px)`"
    >
      <slot />
    </ul>
    <slot
      name="item-actions"
      :index="scrollIndex"
      :prev="prev"
      :next="next"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  computed,
  ref,
  provide,
  inject,
} from 'vue'
import { useCarouselList } from './CarouselList.vue'

const CAROUSEL_CONTENT_SYMBOL = Symbol('CarouselListContent')
export const useCarouselListContent = () => inject(CAROUSEL_CONTENT_SYMBOL)

export default defineComponent({
  name: 'CarouselListContent',
  props: {
    wrapperClass: {
      type: String,
      default: '',
    },
    itemsToList: {
      type: Number,
      default: Infinity,
    },
    repeat: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    // provide context
    const carouselItems = ref([])
    provide(CAROUSEL_CONTENT_SYMBOL, {
      carouselItems,
    })

    const el = ref()
    const scrollIndex = ref(0)
    const itemWidth = ref(0)

    // expose these data to parent CarouselList
    const parentData = useCarouselList()
    Object.assign(parentData, { scrollIndex, prev, next })

    // use resizeObserver to recalculate CarouselItem width
    let observer: ResizeObserver
    onMounted(() => {
      observer = new ResizeObserver(refresh)
      observer.observe(el.value)
    })

    onBeforeUnmount(() => {
      observer.disconnect()
    })

    function refresh() {
      itemWidth.value = carouselItems.value[0].getBoundingClientRect().width
      // make sure we don't over translateX
      if (scrollIndex.value > carouselItems.value.length - itemsToShow.value)
        scrollIndex.value = carouselItems.value.length - itemsToShow.value
    }

    const itemsToShow = computed(() => {
      return Math.round(
        el.value.getBoundingClientRect().width / itemWidth.value
      )
    })

    const translation = computed(() => {
      return -(scrollIndex.value * itemWidth.value)
    })

    function prev() {
      if (scrollIndex.value === 0 && props.repeat) {
        scrollIndex.value = carouselItems.value.length - itemsToShow.value
        return
      }

      const gap =
        props.itemsToList === Infinity ? itemsToShow.value : props.itemsToList
      scrollIndex.value -= gap
      if (scrollIndex.value < 0) scrollIndex.value = 0
    }

    function next() {
      const lastAllowIndex = carouselItems.value.length - itemsToShow.value

      if (scrollIndex.value === lastAllowIndex && props.repeat) {
        scrollIndex.value = 0
        return
      }

      const gap =
        props.itemsToList === Infinity ? itemsToShow.value : props.itemsToList
      const nextScrollIndex = scrollIndex.value + gap
      // make sure we don't over translateX
      if (nextScrollIndex > lastAllowIndex) {
        scrollIndex.value = lastAllowIndex
        return
      }
      scrollIndex.value = nextScrollIndex
    }

    return { el, prev, next, translation, scrollIndex }
  },
})
</script>

<style>
</style>
