<template>
  <div v-if="status === ApiStatus.PENDING && page === 1">Loading...</div>
  <template v-if="status === ApiStatus.SUCCESS || page > 1">
    <Slider />
    <section
      v-for="(section, index) in home.sections"
      :key="index"
    >
      <Carousel
        v-if="section.sectionType==='playlist'"
        :items="section.items"
        :title="section.title"
      />
    </section>
    <InfiniteLoad @infinite-load="fetchMore" />
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useApi, fetchHome, ApiStatus } from '@/api'
import Slider from '@/components/slider/index.vue'
import Carousel from '@/components/Carousel.vue'
import InfiniteLoad from '@/components/InfiniteLoad.vue'

export default defineComponent({
  name: 'App',
  components: {
    Slider,
    Carousel,
    InfiniteLoad,
  },
  setup() {
    const page = ref<number>(1)
    const home = reactive({ sections: [], hasMore: false })
    const {
      exec: fetchHomeData,
      onSuccess,
      status,
    } = useApi('fetchHome', fetchHome)
    fetchHomeData(page.value)

    onSuccess((result) => {
      home.sections.push(...result.items)
      home.hasMore = result.hasMore
      page.value++
    })

    function fetchMore() {
      if (page.value < 4) {
        fetchHomeData(page.value)
      }
    }

    return {
      home,
      status,
      ApiStatus,
      page,
      fetchMore,
    }
  },
})
</script>

