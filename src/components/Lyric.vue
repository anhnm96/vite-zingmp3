<template>
  <div class="fixed inset-0 z-40 bg-primary">
    <div class="flex flex-col justify-between h-screen pt-5 pb-20">
      <!-- header -->
      <div class="relative flex items-center">
        <!-- center -->
        <div class="absolute w-1/4 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <div class="flex p-1 rounded-full bg-alpha">
            <button class="flex-1 px-2 py-1 text-base focus:outline-none text-secondary">Karaoke</button>
            <button class="flex-1 px-2 py-1 text-base font-semibold rounded-full focus:outline-none bg-active text-primary">Lyric</button>
          </div>
        </div>
        <!-- right -->
        <div class="flex ml-auto mr-5 space-x-4">
          <button class="flex items-center justify-center w-12 h-12 text-xl rounded-full bg-alpha">
            <i class="flex ic-settings"></i>
          </button>
          <button
            @click="toggleShowLyric"
            class="flex items-center justify-center w-12 h-12 text-xl rounded-full bg-alpha"
          >
            <i class="flex ic-go-down"></i>
          </button>
        </div>
      </div>
      <!-- content -->
      <div class="flex w-4/5 max-w-5xl mx-auto space-x-4">
        <img
          class="rounded-lg"
          style="width: 400px"
          src="https://photo-resize-zmp3.zadn.vn/w512_r1x1_jpeg/cover/2/8/6/f/286f0b4fae2ab3b2a7942968e22bd58f.jpg"
          alt="thumbnail"
        >
        <div class="flex-1">
          <div class="text-2xl font-bold text-secondary p-2.5 rounded-lg cursor-pointer">Trăng soi trong đêm mây trôi lặng thầm</div>
          <div class="text-2xl font-bold text-progress bg-alpha p-2.5 rounded-lg cursor-pointer">Bên thềm nhà gió nhẹ nhàng</div>
        </div>
      </div>
      <!-- player -->
      <div class="text-center">
        <span class="text-sm font-bold text-primary">Cafe Không Đường</span>
        <span class="text-sm text-secondary"> - G5RSquad</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
} from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'LyricModal',
  setup() {
    const store = useStore()
    onMounted(() => {
      document.body.style.overflow = 'hidden'
    })
    onBeforeUnmount(() => {
      document.body.style.overflow = ''
    })
    return { toggleShowLyric: () => store.commit('toggleShowLyric') }
  },
}
</script>

<style>
</style>
