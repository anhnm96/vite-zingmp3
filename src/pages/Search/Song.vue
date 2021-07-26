<template>
  <div>
    <h3 class="text-xl font-bold">
      Song
    </h3>
    <div class="mt-2.5">
      <template v-if="statusPending">
        Loading...
      </template>
      <template v-if="statusSuccess">
        <SongItem
          v-for="song in songs"
          :key="song.encodeId"
          :song="song"
          :safe-to-play="true"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import SongItem from '@/components/common/SongItem.vue'
import { useApi, fetchSearch } from '@/api'

export default defineComponent({
  name: 'SearchSong',
  components: { SongItem },
  setup() {
    const route = useRoute()
    const q = route.query.q as string
    const {
      data: songs,
      statusSuccess,
      statusPending,
      exec: fetchSearchSong,
    } = useApi(fetchSearch, {
      responseAdapter: (res: any) => {
        return res.items === undefined ? [] : res.items
      },
    })
    fetchSearchSong(q, 'song')

    return { songs, statusPending, statusSuccess }
  },
})
</script>

<style>
</style>
