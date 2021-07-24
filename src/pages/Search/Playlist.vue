<template>
  <div>
    <h3 class="text-xl font-bold">
      Playlist/Album
    </h3>
    <div class="mt-2.5">
      <template v-if="statusPending">
        Loading...
      </template>
      <template v-if="statusSuccess">
        <div class="grid grid-cols-4 gap-7 cxl:grid-cols-5">
          <PlaylistCard
            v-for="playlist in playlists"
            :key="playlist.encodeId"
            :item="playlist"
            :show-artist="true"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useApi, fetchSearch } from '@/api'

export default defineComponent({
  name: 'SearchPlaylist',
  setup() {
    const route = useRoute()
    const q = route.query.q as string
    const {
      data: playlists,
      statusPending,
      statusSuccess,
      exec: fetchSearchPlaylist,
    } = useApi(fetchSearch, {
      responseAdapter: (res: any) => {
        return res.items === undefined ? [] : res.items
      },
    })
    fetchSearchPlaylist(q, 'playlist')

    return { playlists, statusPending, statusSuccess }
  },
})
</script>

<style>
</style>
