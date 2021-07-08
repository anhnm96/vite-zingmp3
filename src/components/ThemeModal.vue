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
        <div class="mt-4" v-for="section in themes" :key="section.type">
          <h3 class="text-base font-bold text-primary">{{section.type}}</h3>
          <!-- options -->
          <div class="flex flex-wrap gap-4 mt-2">
            <!-- <div class="" v-for="item in section.items" :key="item.name"> -->
            <div class="w-1/3 cxl:w-1/6 clg:w-1/5 lg:w-1/4" v-for="item in section.items" :key="item.name">
              <button @click="setTheme(item)" class="overflow-hidden rounded bg-loading">
                <img class="w-full" :src="item.image" :alt="item.name">
              </button>
              <p class="text-xs font-semibold text-primary">{{item.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
export default defineComponent({
  name: 'ThemeModal',
  emits: ['setTheme', 'update:modelValue'],
  setup() {
    let mainFirstChild: HTMLDivElement
    const themes  = [
      {type: 'Artist', items: [
        {name: 'IU', theme: 'gray', 
        image: 'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/iu.jpg',
        var: {
          '--layout-bg': '#e7dfdd',
          '--purple-primary': '#409abc',
          '--text-item-hover': '#409abc'
        },
        background: {
          'background-image': 'url(https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-background/iu.jpg)',
          'background-size': '1920px auto',
          'background-repeat': 'repeat'
        }
        },
        {name: 'Lisa', theme: 'pink-light', image: 'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/lisa.jpg',
        background: {
          'background-image': 'url(https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-background/lisa.jpg)'          ,
          'background-size': '1920px auto',
          'background-repeat': 'repeat'
        }  
      },
        {name: 'Jennie Kim', theme: 'gray', image: 'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/jennie.jpg',
      var: {
        '--layout-bg': '#bab8c3',
        '--player-bg': '#c6c4d1',
        '--purple-primary': '#346875',
        '--primary-bg': '#e2e7f5',
        '--text-item-hover': '#2a5e6b'
      },
    background: {
      'background-image': 'url(https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-background/jennie.jpg)',
      'background-size': '1920px auto',
          'background-repeat': 'repeat'
    }}
      ]},
      {type: 'Dark', items: [
        {name: 'Dark', theme: 'dark', image: 'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/dark.jpg'},
        {name: 'Purple', theme: 'purple', image: 'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/purple.jpg'},
        {name: 'Dark Blue', theme: 'blue', image: 'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/blue.jpg'},
        {name: 'Light Blue', theme: 'blue-light', image: 'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/blue-light.jpg'},
        {name: 'Green', theme: 'green', image: 'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/green.jpg'},
      ]},
      {type: 'Light', items: [
      {name: 'Light', theme: 'light', image: 'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/light.jpg'},
      {name: 'Gray', theme: 'gray', image: 'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/gray.jpg'},
      {name: 'Light Green', theme: 'green-light', image: 'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/green-light.jpg'},
      {name: 'Lotus Pink', theme: 'pink-light', image: 'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/pink-light.jpg'},
        
      ]}
    ]

    onMounted(() => {
      mainFirstChild = document.getElementById('main').firstElementChild as HTMLDivElement
    })

    const selectedTheme = ref()

    function setTheme(item: any) {
      // remove old theme styles and css variables
      mainFirstChild.style.removeProperty('background-image')
      mainFirstChild.style.removeProperty('background-size')
      mainFirstChild.style.removeProperty('background-repeat')
      if (selectedTheme.value?.var) {
        for (let key of Object.keys(selectedTheme.value.var)) {
          document.documentElement.style.removeProperty(key)
        }
      }

      // set new theme
      selectedTheme.value = item
      document.documentElement.dataset.theme = item.theme
      if (item.var) {
        for (let key of Object.keys(item.var)) {
          document.documentElement.style.setProperty(key, item.var[key])
        }
      }
      if (item.background) {
        for (let key of Object.keys(item.background)) {
          mainFirstChild.style.setProperty(key, item.background[key])
        }
      }
    }

    return {setTheme, themes}
  }
})
</script>

<style>

</style>
