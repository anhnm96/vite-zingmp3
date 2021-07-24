<template>
  <li
    ref="itemEl"
    class="carousel-item"
  >
    <slot />
  </li>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, inject } from 'vue'
import { CarouselListContentKey } from './symbols'

export default defineComponent({
  name: 'CarouselListItem',
  setup() {
    const itemEl = ref()
    const { carouselItems } = inject(CarouselListContentKey)
    onMounted(() => {
      carouselItems.value.push(itemEl.value)
    })

    return { itemEl }
  },
})
</script>

<style>
</style>
