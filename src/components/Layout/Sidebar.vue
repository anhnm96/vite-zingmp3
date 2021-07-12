<template>
  <div class="relative flex-shrink-0 transition-all duration-300 w-17 lg:w-64">
    <button
      v-if="show"
      class="fixed inset-0 z-50 w-full h-full bg-transparent cursor-default lg:hidden"
      aria-label="collapse"
      @click="toggleExpand"
    />
    <aside
      class="absolute inset-0 z-50 h-full transition-all duration-300 lg:relative bg-sidebar-popup lg:bg-sidebar lg:w-full"
      :class="[show ? 'w-64' : 'w-17', {transitioning, expanded}]"
      @transitionend="transitionEnd"
    >
      <div class="flex items-center justify-center overflow-hidden logo-wrapper lg:justify-start lg:px-6 h-17">
        <router-link to="/">
          <div class="logo" />
        </router-link>
      </div>
      <nav>
        <ul>
          <li
            v-for="(nav, index) in nav1"
            :key="nav.text"
            :class="{ 'link-active': index === 1 }"
          >
            <a
              href="#"
              class="justify-center hover:text-item-hover flex lg:justify-start text-navigation items-center px-6 lg:py-2.5 space-x-3 font-semibold py-4"
            >
              <i
                :class="nav.iconClass"
                class="flex h-6 text-2xl"
              />
              <span class="hidden text-sm font-semibold leading-normal truncate lg:block">{{ nav.text }}</span>
            </a>
          </li>
        </ul>
      </nav>
      <div
        class="mx-6 my-3 bg-gray-400"
        style="height: 1px;"
      />
      <nav>
        <ul>
          <li
            v-for="nav in nav2"
            :key="nav.text"
          >
            <a
              href="#"
              class="hover:text-item-hover justify-center flex lg:justify-start text-navigation items-center px-6 lg:py-2.5 space-x-3 font-semibold py-4"
            >
              <i
                :class="nav.iconClass"
                class="flex h-6 text-2xl"
              />
              <span class="hidden text-sm font-semibold leading-normal truncate lg:block">{{ nav.text }}</span>
            </a>
          </li>
        </ul>
      </nav>
      <button
        class="absolute flex items-center justify-center w-10 h-10 rounded-full lg:hidden hover:text-item-hover right-4 text-primary bottom-2 bg-alpha"
        @click="toggleExpand"
      >
        <i
          class="flex"
          :class="[show ? 'ic-go-left' : 'ic-go-right']"
        />
      </button>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Sidebar',
  setup() {
    const nav1 = [
      { text: 'Cá Nhân', iconClass: 'ic-library' },
      { text: 'Khám Phá', iconClass: 'ic-mn-home' },
      { text: '#zingchart', iconClass: 'ic-mn-zingchart' },
      { text: 'Theo Dõi', iconClass: 'ic-feed' },
    ]
    const nav2 = [
      { text: 'Nhạc Mới', iconClass: 'ic-mn-song' },
      { text: 'Thể Loại', iconClass: 'ic-mn-catalogue' },
      { text: 'Top 100', iconClass: 'ic-mn-top100' },
      { text: 'MV', iconClass: 'ic-mn-mv' },
    ]

    const show = ref(false)
    const transitioning = ref(false)
    const expanded = ref(false)

    function toggleExpand() {
      show.value = !show.value
      transitioning.value = true
    }

    function transitionEnd() {
      expanded.value = show.value
      transitioning.value = false
    }

    return {
      nav1,
      nav2,
      expanded,
      show,
      transitioning,
      toggleExpand,
      transitionEnd,
    }
  },
})
</script>

<style>
aside:is(.transitioning, .expanded) .logo-wrapper {
  @apply px-6 justify-start;
}

.logo {
  width: 45px;
  height: 45px;
  display: inline-block;
  background: url(https://zjs.zadn.vn/zmp3-desktop/releases/v1.2.10/static/media/icon_zing_mp3_60.f6b51045.svg);
}

aside:is(.transitioning, .expanded) .logo {
  background: var(--img-logo-mp3) 50% / contain no-repeat;
  width: 120px;
  height: 40px;
}

aside:is(.transitioning, .expanded) li a {
  justify-content: flex-start;
}

aside:is(.transitioning, .expanded) li a span {
  display: block;
}

.link-active {
  @apply bg-alpha border-l-2 border-purple-primary;
}

.link-active a {
  @apply text-item-hover;
}

@media screen and (min-width: 1024px) {
  .logo {
    width: 120px;
    height: 40px;
    background: var(--img-logo-mp3) 50% / contain no-repeat;
    /* background-position: 50%;
    background-size: contain; */
  }
}
</style>
