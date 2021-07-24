<template>
  <div
    aria-hidden="true"
    class="rounded-xl bg-loading-img bg-loading"
    :class="pulse ? '' : 'loading'"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Skeleton',
  props: {
    pulse: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
<style scoped>
.loading {
  animation: 5s ease-in-out 0s infinite normal none running loading;
}
</style>
