<template>
    <div @click.self="$emit('update:modelValue', false)" class="fixed inset-0 z-50 flex items-center w-full h-full bg-black bg-opacity-70">
      <div class="max-w-4xl px-8 py-4 mx-auto rounded-md bg-primary" style="width: 70vw">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-primary">Giao Diện</h2>
          <button @click="$emit('update:modelValue', false)" class="text-2xl" aria-label="close">
            <i class="flex ic-close"></i>
          </button>
        </div>
        <!-- main -->
        <div class="mt-2">
          <h3 class="text-base font-bold text-primary">Color</h3>
          <!-- options -->
          <div class="flex items-center mt-2 space-x-4">
            <div class="w-1/5 ">
              <button @click="$emit('setTheme', 'dark')" class="overflow-hidden rounded">
                <img class="w-full" src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/dark.jpg" alt="theme dark">
              </button>
              <p class="mt-2 text-sm text-secondary">Black</p>
            </div>
            <div class="w-1/5 ">
              <button @click="$emit('setTheme', 'light')" class="overflow-hidden border rounded border-primary">
                <img class="w-full" src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/light.jpg" alt="theme light">
              </button>
              <p class="mt-2 text-sm text-secondary">White</p>
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
