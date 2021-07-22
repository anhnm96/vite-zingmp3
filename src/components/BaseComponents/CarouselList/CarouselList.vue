<template>
  <section>
    <!--
      @slot CarouselList header
        @binding {number} index first showing index of list
        @binding {function} prev trigger slide to previous list
        @binding {function} next trigger slide to next list
     -->
    <slot
      name="header"
      :index="childData.activeIndex"
      :hasPrev="childData.hasPrev"
      :hasNext="childData.hasNext"
      :prev="childData.prev"
      :next="childData.next"
    />
    <!--
      @slot CarouselList default. This is used to render CarouselContent
     -->
    <slot />
  </section>
</template>

<script lang="ts">
// https://www.w3.org/TR/wai-aria-practices/examples/carousel/carousel-1.html
// https://w3c.github.io/aria-practices/examples/carousel/carousel-2-tablist.html#
import { defineComponent, reactive, provide } from 'vue'
import { CarouselListKey } from './symbols'

export default defineComponent({
  name: 'CarouselList',
  setup() {
    const childData = reactive({
      activeIndex: 0,
      hasPrev: false,
      hasNext: true,
      prev: () => ({}),
      next: () => ({}),
    })
    provide(CarouselListKey, childData)
    return { childData }
  },
})
</script>
