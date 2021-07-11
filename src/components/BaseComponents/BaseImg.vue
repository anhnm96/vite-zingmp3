<template>
  <template v-if="loading">
    <img
      v-if="lazySrc"
      v-bind="$attrs"
      :src="lazySrc"
    >
    <div
      v-else
      class="bg-gray-300"
      :style="{paddingBottom: 100 * (1 / aspectRatio) + '%'}"
    />
  </template>
  <img
    v-show="!loading"
    v-bind="$attrs"
    @load="load"
  >
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'BaseImage',
  inheritAttrs: false,
  props: {
    containerClass: {
      type: String,
      default: undefined,
    },
    lazySrc: {
      type: String,
      default: undefined,
    },
    aspectRatio: {
      type: Number,
      default: 1,
    },
  },
  setup() {
    const loading = ref(true)
    function load() {
      loading.value = false
    }

    return { load, loading }
  },
})
</script>

<style>
</style>
