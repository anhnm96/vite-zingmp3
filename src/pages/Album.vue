<template>
  <div class="album-page">
    <!-- left -->
    <div class="album-info">
      <div class="sticky top-20">
        <div
          @click="togglePlay"
          class="album-cover"
          :class="{'rotate': isPlaying}"
        >
          <img
            :src="album.thumbnailM"
            :alt="album.title"
          >
          <div class="overlay">
            <button class="btn-play">
              <i
                class="icon"
                :class="isPlaying ? 'ic-gif-playing-white':'ic-play'"
              ></i>
            </button>
          </div>
        </div>
        <h1 class="album-title">{{album.title}}</h1>
        <p class="album-info mt-1">Cập nhật: {{new Date(album.contentLastUpdate * 1000).toLocaleDateString()}}</p>
        <p class="album-info">{{album.like}} Người yêu thích</p>

        <button class="btn-action">
          <i class="flex place-items-center w-5 h-5 icon ic-play"></i>
          <span>Phát ngẫu nhiên</span>
        </button>
        <div class="album-footer">
          <button>
            <i class="icon ic-like"></i>
          </button>
          <button>
            <i class="icon ic-more"></i>
          </button>
        </div>
      </div>
    </div>
    <!-- right -->
    <div class="album-content">
      <p class="description">Lời tựa: {{album.description}}</p>
      <div class="mt-4">
        <song-item
          v-for="song in album.song.items"
          :key="song.title"
          :song="song"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import album from '@/data/list.json'
import SongItem from '@/components/SongItem.vue'

export default defineComponent({
  name: 'PageAlbum',
  components: { SongItem },
  setup() {
    const store = useStore()
    const route = useRoute()
    const isPlaying = computed(() => store.state.isPlaying)
    const id = route.params.id
    console.log(id)
    function togglePlay() {
      store.commit('togglePlay')
    }
    return { album, isPlaying, togglePlay }
  },
})
</script>

<style scoped>
.album-page {
  @apply flex space-x-9;
}
.album-info {
  width: 300px;
  @apply relative;
}
.album-cover {
  transition: all 0.4s ease;
  box-shadow: 0 5px 8px 0 rgb(0 0 0 / 20%);
  @apply relative rounded-lg overflow-hidden;
}
.rotate {
  border-radius: 100%;
  overflow: hidden;
  -webkit-animation-name: spin;
  animation-name: spin;
  -webkit-animation-duration: 12s;
  animation-duration: 12s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}
.album-cover img {
  transition: transform 0.5s;
}
.album-cover:hover img {
  transform: scale(1.1);
}
.album-cover .overlay {
  transition: opacity 0.5s;
  background-color: rgba(0, 0, 0, 0.4);
  @apply opacity-0 absolute inset-0;
}
.album-cover:hover .overlay,
.album-cover.rotate .overlay {
  @apply opacity-100;
}
.btn-play {
  @apply text-white flex justify-center items-center w-full h-full text-lg;
}
.btn-play > i {
  @apply flex justify-center items-center w-10 h-10 rounded-full border border-white;
}
.album-title {
  @apply text-xl font-bold text-center mt-2;
}
.album-info {
  @apply text-secondary text-sm text-center;
}

.btn-action {
  background: var(--primary);
  @apply text-white rounded-full py-2.5 px-6 inline-flex space-x-2 mt-3 uppercase;
}
.btn-action:hover {
  filter: brightness(0.9);
}
.album-footer {
  @apply flex space-x-4 mt-4 justify-center;
}
.album-footer button {
  @apply rounded-full text-lg w-9 h-9 text-primary bg-alpha flex items-center justify-center outline-none;
}
.album-footer button i {
  @apply flex;
}

.description {
  @apply text-secondary text-sm;
}
</style>
