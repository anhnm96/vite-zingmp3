<template>
  <div>
    <div class="relative overflow-hidden rounded-full group">
      <img
        class="transition-transform duration-700 group-hover:scale-110"
        :src="item.thumbnail"
        :alt="item.name"
      >
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <button class="flex items-center justify-center text-xl text-white border border-white rounded-full focus:outline-none w-11 h-11 hover:text-gray-200 hover:border-gray-200">
          <i class="flex icon ic-play" />
        </button>
      </div>
    </div>
    <div class="mt-2 space-y-1 text-center">
      <p class="text-sm font-semibold">
        {{ item.name }}
      </p>
      <p class="text-xs text-secondary">
        {{ item.totalFollow }} follows
      </p>
    </div>
    <div class="text-center">
      <button class="inline-flex items-center px-5 py-1 mt-2 space-x-1.5 text-sm border rounded-full bg-alpha border-primary">
        <i class="ic-addfriend" />
        <span>Follow</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArtistCard',
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
