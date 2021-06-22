<template>
    <div @click.self="$emit('update:modelValue', false)" class="fixed inset-0 w-full h-full z-50 flex items-center bg-black bg-opacity-70">
      <div class="rounded-md mx-auto max-w-4xl py-4 px-8 bg-primary" style="width: 70vw">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold">Giao Diện</h2>
          <button @click="$emit('update:modelValue', false)" class="text-2xl" aria-label="close">
            <i class="flex ic-close"></i>
          </button>
        </div>
        <!-- main -->
        <div class="mt-2">
          <h3 class="text-base font-bold">Color</h3>
          <!-- options -->
          <div class="flex items-center space-x-4 mt-2">
            <div class="w-1/5 ">
              <button @click="$emit('setTheme', 'dark')" class="rounded overflow-hidden">
                <img class="w-full" src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/dark.jpg" alt="theme dark">
              </button>
              <p class="text-sm mt-2">Black</p>
            </div>
            <div class="w-1/5 ">
              <button @click="$emit('setTheme', 'light')" class="border border-primary rounded overflow-hidden">
                <img class="w-full" src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/light.jpg" alt="theme light">
              </button>
              <p class="text-sm mt-2">White</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  name: 'ThemeModal',
  emits: ['setTheme', 'update:modelValue']
})
</script>

<style>

</style>
