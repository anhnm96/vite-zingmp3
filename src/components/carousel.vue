<template>
  <div class="carousel">
    <div class="flex justify-between pr-8 mt-7">
      <h2 class="text-lg font-bold text-primary">{{title}}</h2>
      <div class="flex items-center space-x-2">
        <button
          @click="slideLeft"
          class="inline-flex items-center p-1 focus:outline-none"
          aria-label="Previous List"
        ><i class="w-5 h-5 text-primary ic-go-left"></i></button>
        <button
          @click="slideRight"
          class="inline-flex items-center p-1 focus:outline-none"
          aria-label="Next List"
        ><i class="w-5 h-5 text-primary ic-go-right"></i></button>
      </div>
    </div>
    <div
      ref="listEl"
      class="carousel-items"
    >
      <BaseCard
        v-for="song in items"
        :key="song.title"
        :song="song"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
export default defineComponent({
  name: 'Carousel',
  props: {
    title: String,
    items: Array,
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

<style scoped>
.carousel-items {
  @apply flex w-full -mx-4 overflow-hidden mt-3;
  scroll-behavior: smooth;
}
</style>
