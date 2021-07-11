<template>
  <div>
    <div class="flex justify-between">
      <h2 class="text-lg font-bold text-primary">
        {{ title }}
      </h2>
      <div class="flex items-center space-x-2">
        <button
          class="inline-flex items-center p-1 focus:outline-none"
          aria-label="Previous List"
          @click="slideLeft"
        >
          <i class="w-5 h-5 text-primary ic-go-left" />
        </button>
        <button
          class="inline-flex items-center p-1 focus:outline-none"
          aria-label="Next List"
          @click="slideRight"
        >
          <i class="w-5 h-5 text-primary ic-go-right" />
        </button>
      </div>
    </div>
    <div
      ref="listEl"
      class="flex mt-3 -mx-3 overflow-hidden"
      style="scroll-behavior: smooth"
    >
      <BaseCard
        v-for="list in items"
        :key="list.title"
        class="w-1/4 px-3 clg:w-1/5 cxl:w-1/6"
        :list="list"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, PropType } from 'vue'
import { Playlist } from '@/types'
export default defineComponent({
  name: 'Carousel',
  props: {
    title: String,
    items: Array as PropType<Playlist[]>,
  },
  setup(props) {
    const listEl = ref<HTMLElement | null>(null)
    const currentPage = ref<number>(0)
    let cardEl: HTMLElement
    let LIMIT_ITEMS
    let totalPages: number

    onMounted(() => {
      cardEl = listEl.value.querySelector('.card')
      LIMIT_ITEMS = Math.round(listEl.value.offsetWidth / cardEl.offsetWidth)
      totalPages = Math.ceil(props.items.length / LIMIT_ITEMS)
    })

    const prevPage = computed(() => {
      let result = currentPage.value - 1
      if (result < 0) return totalPages - 1
      return result
    })

    const nextPage = computed(() => {
      let result = currentPage.value + 1
      if (result === totalPages) return 0
      return result
    })

    function slideLeft() {
      currentPage.value = prevPage.value
      listEl.value.scrollLeft = currentPage.value * listEl.value.offsetWidth
    }

    function slideRight() {
      currentPage.value = nextPage.value
      listEl.value.scrollLeft = currentPage.value * listEl.value.offsetWidth
    }

    return { currentPage, slideLeft, slideRight, listEl }
  },
})
</script>
