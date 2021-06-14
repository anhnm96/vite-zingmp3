<template>
  <div class="card">
    <div class="card-main">
      <img
        :src="song.thumbnail"
        alt="img"
      >
    </div>
    <router-link
      :to="song.link"
      :title="song.title"
      class="card-title"
    >{{song.title}}</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseCard',
  props: {
    song: Object,
  },
})
</script>

<style scoped>
.card {
  @apply flex-shrink-0 md:w-1/6 px-4;
}
.card-title {
  @apply text-sm font-semibold text-primary mt-2 block;
  word-break: break-word;
  /*
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2; */
}
.card-main {
  @apply relative;
}
.card-main > img {
  @apply w-full max-w-full rounded-lg;
}
</style>
