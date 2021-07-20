<template>
  <CarouselList>
    <template #header="{prev, next}">
      <div class="flex justify-between">
        <h2 class="text-lg font-bold text-primary">
          {{ title }}
        </h2>
        <div class="flex items-center space-x-2">
          <button
            class="inline-flex items-center p-1 focus:outline-none"
            aria-label="Previous List"
            @click="prev"
          >
            <i class="w-5 h-5 text-primary ic-go-left" />
          </button>
          <button
            class="inline-flex items-center p-1 focus:outline-none"
            aria-label="Next List"
            @click="next"
          >
            <i class="w-5 h-5 text-primary ic-go-right" />
          </button>
        </div>
      </div>
    </template>
    <CarouselListContent wrapper-class="mt-3 -mx-3">
      <CarouselListItem
        v-for="list in items"
        :key="list.title"
        class="flex-shrink-0 w-1/4 px-3 clg:w-1/5 cxl:w-1/6"
      >
        <BaseCard :list="list" />
      </CarouselListItem>
    </CarouselListContent>
  </CarouselList>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Playlist } from '@/types'
import {
  CarouselList,
  CarouselListContent,
  CarouselListItem,
} from '@/components/BaseComponents/CarouselList'

export default defineComponent({
  name: 'HomeCarousel',
  components: {
    CarouselList,
    CarouselListContent,
    CarouselListItem,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array as PropType<Playlist[]>,
      required: true,
    },
  },
})
</script>

<style>
</style>
