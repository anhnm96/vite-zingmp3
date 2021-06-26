<template>
  <div
    aria-hidden="true"
    class="rounded-xl bg-loading-img bg-loading"
    style="animation: 2s ease-in-out 0s infinite normal none running loading"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Skeleton'
})
</script>
