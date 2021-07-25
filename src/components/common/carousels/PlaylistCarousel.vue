<template>
  <CarouselList>
    <template #header="{prev, next}">
      <div class="flex justify-between">
        <slot>
          <h3 class="text-xl font-bold text-primary">
            {{ title }}
          </h3>
        </slot>
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
        v-for="item in items"
        :key="item.title"
        :class="['flex-shrink-0 px-3', itemClass]"
      >
        <component
          :is="as"
          :item="item"
        />
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
} from '@/components/base/CarouselList'

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
      default: '',
    },
    items: {
      type: Array as PropType<Playlist[]>,
      required: true,
    },
    as: {
      type: [Object, String] as PropType<Record<string, unknown> | string>,
      default: 'PlaylistCard',
    },
    itemClass: {
      type: String,
      default: 'w-1/4 cxl:w-1/5',
    },
  },
})
</script>

<style>
</style>
