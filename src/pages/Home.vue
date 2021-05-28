<template>
 <div>
   <template v-for="(section, index) in sections" :key="'section' + index">
     <Slider v-if="section.sectionType === 'banner'" :sliders="section.items" />
   </template>
 </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Slider from '@/components/slider/index.vue'
import { fetchHome } from '@/api'

export default defineComponent({
  name: 'App',
  components: {
    Slider
  },
  setup() {
    const sections = ref([])
    async function loadHome () {
      const res = await fetchHome()
      if (res && res.data && Array.isArray(res.data.items)) {
        sections.value.push(...res.data.items)
      }
    }
    loadHome()
    return {
      sections
    }
  }
})
</script>

