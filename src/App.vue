<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { fetchHome } from '@/api'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  async setup() {
    const res = await fetchHome()
    console.log(res)
  }
})
</script>

