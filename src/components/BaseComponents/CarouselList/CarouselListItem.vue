<template>
  <li class="carousel-item">
    <slot />
  </li>
</template>

<script>
import { onMounted, getCurrentInstance } from 'vue'
import { useCarouselListContent } from './CarouselListContent.vue'

export default {
  name: 'CarouselListItem',
  setup() {
    const instance = getCurrentInstance()
    const { carouselItems } = useCarouselListContent()
    onMounted(() => {
      carouselItems.value.push(instance.ctx.$el)
    })
  },
}
</script>

<style>
</style>
