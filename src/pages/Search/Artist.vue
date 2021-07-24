<template>
  <div>
    <h3 class="text-xl font-bold">
      Artist
    </h3>
    <div class="mt-2.5">
      <template v-if="statusPending">
        Loading...
      </template>
      <template v-if="statusSuccess">
        <div
          v-if="artists.length === 0"
          class="py-7 min-h-[220px] bg-alpha text-secondary flex flex-col justify-center items-center space-y-2"
        >
          <i class="ic-svg-artist-icon" />
          <p>Could not find any artists</p>
        </div>
        <template v-else>
          <div class="grid grid-cols-4 gap-x-7 gap-y-8 cxl:grid-cols-5">
            <ArtistCard
              v-for="artist in artists"
              :key="artist.id"
              :item="artist"
            />
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useApi, fetchSearch } from '@/api'
import ArtistCard from '@/components/common/cards/ArtistCard.vue'

export default defineComponent({
  name: 'SearchArtist',
  components: { ArtistCard },
  setup() {
    const route = useRoute()
    const q = route.query.q as string
    const {
      data: artists,
      statusSuccess,
      statusPending,
      exec: fetchSearchSong,
    } = useApi(fetchSearch, {
      responseAdapter: (res: any) => {
        return res.items === undefined ? [] : res.items
      },
    })
    fetchSearchSong(q, 'artist')

    return { artists, statusPending, statusSuccess }
  },
})
</script>

<style>
</style>
