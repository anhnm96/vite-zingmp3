<template>
  <section>
    <slot
      name="header"
      :index="childData.scrollIndex"
      :prev="childData.prev"
      :next="childData.next"
    />
    <slot />
  </section>
</template>

<script>
import { defineComponent, reactive, provide, inject } from 'vue'

const CAROUSEL_LIST_SYMBOL = Symbol('CarouselList')
export const useCarouselList = () => inject(CAROUSEL_LIST_SYMBOL)

export default defineComponent({
  name: 'CarouselList',
  setup() {
    const childData = reactive({ scrollIndex: 0, prev: null, next: null })
    provide(CAROUSEL_LIST_SYMBOL, childData)
    return { childData }
  },
})
</script>
