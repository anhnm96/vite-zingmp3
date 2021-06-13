<template>
  <div class="carousel">
    <div class="flex justify-between pr-8 mt-7">
      <h2 class="text-lg font-bold text-primary">{{title}}</h2>
      <div class="flex items-center space-x-2">
        <button
          @click="slideLeft"
          class="inline-flex items-center p-1 focus:outline-none"
          aria-label="Previous List"
        ><i class="w-5 h-5 text-primary ic-go-left"></i></button>
        <button
          @click="slideRight"
          class="inline-flex items-center p-1 focus:outline-none"
          aria-label="Next List"
        ><i class="w-5 h-5 text-primary ic-go-right"></i></button>
      </div>
    </div>
    <div class="carousel-items">
      <div
        class="card"
        v-for="song in items"
        :key="song.title"
      >
        <div class="card-main">
          <img
            :src="song.thumbnail"
            alt="img"
          >
        </div>
        <a class="card-title">{{song.title}}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'Carousel',
  props: {
    title: String,
    items: Array,
  },
  setup() {
    let cardEl
    onMounted(() => {
      card = document.querySelector('.card')
    })
    // const totalPages= props.items.length /
    function slideLeft() {
      console.log(cardEl.clientWidth)
    }
    function slideRight() {}
    return { slideLeft, slideRight }
  },
})
</script>

<style scoped>
.carousel-items {
  @apply flex w-full -mx-4 overflow-hidden mt-3;
}
.card {
  @apply flex-shrink-0 md:w-1/6 px-4;
}
.card-title {
  @apply text-sm font-semibold text-primary;
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
