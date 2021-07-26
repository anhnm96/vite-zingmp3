<template>
  <div>
    <p v-if="statusPending">
      Loading...
    </p>
    <template v-if="statusSuccess">
      <!-- top results -->
      <div>
        <h3 class="text-xl font-bold">
          Top Results for <span class="italic">"{{ query }}"</span>
        </h3>
        <div class="mt-3.5 w-[400px] shadow bg-box-item">
          <div class="flex items-center p-2.5 space-x-2 rounded-md">
            <div class="relative w-20 h-20">
              <img
                class="rounded"
                :src="search.top.thumbnail"
                :alt="search.top.objectType === 'song' ? search.top.title : search.top.name"
              >
            </div>
            <div>
              <p class="text-sm font-medium">
                {{ search.top.objectType === 'song' ? search.top.title : search.top.name }}
              </p>
              <p class="text-xs text-secondary">
                {{ search.top.objectType }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- songs -->
      <div
        v-if="search.songs"
        class="mt-8"
      >
        <h3 class="flex items-center text-xl font-bold">
          <router-link
            :to="{name: 'SearchSong', query: {q: $route.query.q}}"
            class="flex items-center hover:text-link-hover"
          >
            Songs
            &nbsp;<i class="flex text-lg ic-go-right" />
          </router-link>
        </h3>
        <ul class="mt-2.5">
          <li
            v-for="song in search.songs"
            :key="song.encodeId"
          >
            <SongItem
              :song="song"
              :safe-to-play="true"
            />
          </li>
        </ul>
      </div>
      <!-- Playlist/Album -->
      <div
        v-if="search.playlists"
        class="mt-8"
      >
        <PlaylistCarousel :items="search.playlists">
          <h3 class="flex items-center text-xl font-bold">
            <router-link
              :to="{name: 'SearchPlaylist', query: {q: $route.query.q}}"
              class="flex items-center hover:text-link-hover"
            >
              Playlist/Album
              &nbsp;<i class="flex text-lg ic-go-right" />
            </router-link>
          </h3>
        </PlaylistCarousel>
      </div>
      <!-- mv -->
      <div
        v-if="search.videos"
        class="mt-8"
      >
        <PlaylistCarousel
          :items="search.videos"
          :as="videoCard"
          item-class="w-1/2 cxl:w-1/3"
        >
          <h3 class="flex items-center text-xl font-bold">
            <router-link
              :to="{name: 'SearchVideo', query: {q: $route.query.q}}"
              class="flex items-center hover:text-link-hover"
            >
              MV
              &nbsp;<i class="flex text-lg ic-go-right" />
            </router-link>
          </h3>
        </PlaylistCarousel>
      </div>
      <!-- artists -->
      <div
        v-if="search.artists"
        class="mt-8"
      >
        <PlaylistCarousel
          :items="search.artists"
          :as="artistCard"
        >
          <h3 class="flex items-center text-xl font-bold">
            <router-link
              :to="{name: 'SearchArtist', query: {q: $route.query.q}}"
              class="flex items-center hover:text-link-hover"
            >
              Artists
              &nbsp;<i class="flex text-lg ic-go-right" />
            </router-link>
          </h3>
        </PlaylistCarousel>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue'
import { useRoute } from 'vue-router'
import SongItem from '@/components/common/SongItem.vue'
import PlaylistCarousel from '@/components/common/carousels/PlaylistCarousel.vue'
import { useApi, fetchSearchAll } from '@/api'
import VideoCard from '@/components/common/cards/VideoCard.vue'
import ArtistCard from '@/components/common/cards/ArtistCard.vue'

export default defineComponent({
  name: 'SearchAll',
  components: { SongItem, PlaylistCarousel },
  setup() {
    const route = useRoute()
    const query = route.query.q as string
    const {
      data: search,
      statusPending,
      statusSuccess,
      exec,
    } = useApi(fetchSearchAll)
    exec(query)

    return {
      query,
      statusPending,
      statusSuccess,
      search,
      videoCard: markRaw(VideoCard),
      artistCard: markRaw(ArtistCard),
    }
  },
})
</script>

<style>
</style>
