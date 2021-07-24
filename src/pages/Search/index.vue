<template>
  <div>
    <div class="flex items-center border-b border-primary content">
      <h2 class="flex-shrink-0 hidden pr-5 text-2xl font-bold border-r clg:block border-primary text-primary">
        Search Results
      </h2>
      <ul class="flex space-x-10 text-sm font-medium uppercase clg:pl-5 text-navigation">
        <li class="text-navigation">
          <router-link
            class="py-3.5 inline-flex hover:text-item-hover text-navigation"
            active-class="border-b-2 text-item-hover border-purple-primary"
            :to="{name: 'SearchAll', query: {q: $route.query.q}}"
          >
            All
          </router-link>
        </li>
        <li>
          <router-link
            class="py-3.5 inline-flex space-x-1 hover:text-item-hover text-navigation"
            active-class="border-b-2 text-item-hover border-purple-primary"
            :to="{name: 'SearchSong', query: {q: $route.query.q}}"
          >
            <span>Song</span>
            <span class="bg-alpha text-xs py-0.5 px-1.5 rounded-full">{{ counter?.song }}</span>
          </router-link>
        </li>
        <li>
          <router-link
            class="py-3.5 inline-flex space-x-1 hover:text-item-hover text-navigation"
            active-class="border-b-2 text-item-hover border-purple-primary"
            :to="{name: 'SearchPlaylist', query: {q: $route.query.q}}"
          >
            <span>Playlist/Album</span>
            <span class="bg-alpha text-xs py-0.5 px-1.5 rounded-full">{{ counter?.playlist }}</span>
          </router-link>
        </li>
        <li>
          <router-link
            class="py-3.5 inline-flex space-x-1 hover:text-item-hover text-navigation"
            active-class="border-b-2 text-item-hover border-purple-primary"
            :to="{name: 'SearchArtist', query: {q: $route.query.q}}"
          >
            <span>Artist</span>
            <span class="bg-alpha text-xs py-0.5 px-1.5 rounded-full">{{ counter?.artist }}</span>
          </router-link>
        </li>
        <li>
          <router-link
            class="py-3.5 inline-flex space-x-1 hover:text-item-hover text-navigation"
            active-class="border-b-2 text-item-hover border-purple-primary"
            :to="{name: 'SearchVideo', query: {q: $route.query.q}}"
          >
            <span>MV</span>
            <span class="bg-alpha text-xs py-0.5 px-1.5 rounded-full">{{ counter?.video }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="mt-5 content">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useApi, fetchSearchCounter } from '@/api'

export default defineComponent({
  name: 'Search',
  setup() {
    const route = useRoute()
    const q = route.query.q as string
    const { data: counter, exec } = useApi(fetchSearchCounter)
    exec(q)

    return { counter }
  },
})
</script>

<style>
</style>
