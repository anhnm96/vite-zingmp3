<template>
  <Slider />
  <section
    v-for="(section, index) in data.items"
    :key="index"
  >
    <Carousel
      v-if="section.sectionType==='playlist'"
      :items="section.items"
      :title="section.title"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { fetchHome } from '@/api'
import Slider from '@/components/slider/index.vue'
import Carousel from '@/components/Carousel.vue'
import data from '@/data/home2.json'

export default defineComponent({
  name: 'App',
  components: {
    Slider,
    Carousel,
  },
  setup() {
    return {
      data,
    }
  },
})
</script>

