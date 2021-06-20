<template>
  <div
    class="flex items-start p-2 space-x-2.5 rounded"
    :class="{'bg-bg': active, 'hover:bg-alpha': !active}"
  >
    <!-- thumbnail -->
    <div class="relative overflow-hidden rounded">
      <img
        class="w-10 h-10"
        :src="song.thumbnail"
        alt="thumbnail"
      >
      <div class="absolute inset-0 bg-black opacity-0 hover:opacity-100 bg-opacity-40">
        <button class="flex items-center justify-center w-full h-full text-white">
          <i class="flex ic-play"></i>
        </button>
      </div>
    </div>
    <div>
      <h4
        class="text-sm font-bold truncate text-primary"
        :class="active && 'text-white'"
      >{{song.title}}</h4>
      <p
        class="mt-0.5 text-xs text-secondary"
        :class="active && 'text-gray-100'"
      >
        <span
          class="inline-flex items-center"
          v-for="(artist, index) in song.artists"
          :key="artist.name"
        >
          <span v-if="index > 0">,&nbsp;</span>
          {{artist.name}}&nbsp;
          <i
            v-if="artist.spotlight"
            class="flex text-xs ic-star"
          ></i>
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SongQueue',
  props: {
    song: Object,
    active: Boolean,
  },
})
</script>

<style>
</style>
