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
          v-if="videos.length === 0"
          class="py-7 min-h-[220px] bg-alpha text-secondary flex flex-col justify-center items-center space-y-2"
        >
          <i class="ic-svg-artist-icon" />
          <p>Could not find any videos</p>
        </div>
        <template v-else>
          <div class="grid grid-cols-2 gap-x-7 gap-y-8 lg:grid-cols-3">
            <VideoCard
              v-for="video in videos"
              :key="video.encodeId"
              :item="video"
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
import VideoCard from '@/components/common/cards/VideoCard.vue'

export default defineComponent({
  name: 'SearchVideo',
  components: { VideoCard },
  setup() {
    const route = useRoute()
    const q = route.query.q as string
    const {
      data: videos,
      statusSuccess,
      statusPending,
      exec,
    } = useApi(fetchSearch, {
      responseAdapter: (res: any) => {
        return res.items === undefined ? [] : res.items
      },
    })
    exec(q, 'video')

    return { videos, statusPending, statusSuccess }
  },
})
</script>

<style>
</style>
