<template>
  <div>
    <div class="relative overflow-hidden rounded-md group">
      <img
        class="transition-transform duration-700 group-hover:scale-110"
        :src="item.thumbnailM"
        :alt="item.title"
      >
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <button class="flex items-center justify-center text-xl text-white border border-white rounded-full focus:outline-none w-11 h-11 hover:text-gray-200 hover:border-gray-200">
          <i class="flex icon ic-play" />
        </button>
      </div>
    </div>
    <div class="flex items-center mt-2 space-x-2.5 space-y-1">
      <div
        v-if="item.artist"
        class="flex-shrink-0 w-10 h-10"
      >
        <img
          class="rounded-full"
          :src="item.artist.thumbnail"
          :akt="item.artist.name"
        >
      </div>
      <div>
        <p class="text-title">
          {{ item.title }}
        </p>
        <p class="mt-1 text-xs text-secondary">
          {{ item.artistsNames }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VideoCard',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
})
</script>

<style>
</style>
