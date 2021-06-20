<template>
  <div :class="theme === 'light' ? 'theme-light' : 'theme-dark'">
    <div class="flex">
      <aside class="aside">
        <div>
          <div class="px-6 py-4">
            <router-link to="/">
              <div class="logo"></div>
            </router-link>
          </div>
          <nav>
            <ul>
              <li
                v-for="(nav, index) in nav1"
                :class="{'active': index === 1}"
                :key="nav.text"
              >
                <a
                  href="#"
                  class="nav-link"
                >
                  <i
                    :class="nav.iconClass"
                    class="nav-icon"
                  ></i>
                  <span class="nav-text">{{nav.text}}</span>
                </a>
              </li>
            </ul>
          </nav>
          <div class="divider"></div>
          <nav>
            <ul>
              <li
                v-for="nav in nav2"
                :key="nav.text"
              >
                <a
                  href="#"
                  class="nav-link"
                >
                  <i
                    :class="nav.iconClass"
                    class="nav-icon"
                  ></i>
                  <span class="nav-text">{{nav.text}}</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <div class="flex-grow">
        <header class="sticky top-0 z-20 flex items-center h-16 px-4 py-2 space-x-2 bg-primary">
          <div class="flex items-center flex-shrink-0">
            <button class="flex items-center p-2"><i class="flex h-5 text-xl leading-normal ic-back text-primary"></i></button>
            <button class="flex items-center p-2"><i class="flex h-5 text-xl leading-normal ic-forward text-primary"></i></button>
          </div>
          <div class="flex flex-auto">
            <div class="relative w-full max-w-xl mr-auto">
              <button
                class="absolute p-2 transition transform -translate-y-1/2 rounded-full outline-none hover:bg-alpha top-1/2"
                aria-label="search"
              >
                <i class="flex h-5 text-xl text-secondary ic-search"></i>
              </button>
              <input
                class="block w-full py-2 pl-10 pr-6 text-sm rounded-full outline-none text-color-secondary bg-alpha"
                type="text"
                placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV"
              >
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button
              aria-label="layout"
              class="flex items-center justify-center w-10 h-10 rounded-full bg-alpha"
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 20 20"
              >
                <defs>
                  <linearGradient
                    id="j32lhg93hd"
                    x1="62.206%"
                    x2="18.689%"
                    y1="70.45%"
                    y2="39.245%"
                  >
                    <stop
                      offset="0%"
                      stop-color="#F81212"
                    ></stop>
                    <stop
                      offset="100%"
                      stop-color="red"
                    ></stop>
                  </linearGradient>
                  <linearGradient
                    id="hjoavsus6g"
                    x1="50%"
                    x2="11.419%"
                    y1="23.598%"
                    y2="71.417%"
                  >
                    <stop
                      offset="0%"
                      stop-color="#00F"
                    ></stop>
                    <stop
                      offset="100%"
                      stop-color="#0031FF"
                    ></stop>
                  </linearGradient>
                  <linearGradient
                    id="la1y5u3dvi"
                    x1="65.655%"
                    x2="25.873%"
                    y1="18.825%"
                    y2="56.944%"
                  >
                    <stop
                      offset="0%"
                      stop-color="#FFA600"
                    ></stop>
                    <stop
                      offset="100%"
                      stop-color="orange"
                    ></stop>
                  </linearGradient>
                  <linearGradient
                    id="2dsmrlvdik"
                    x1="24.964%"
                    x2="63.407%"
                    y1="8.849%"
                    y2="55.625%"
                  >
                    <stop
                      offset="0%"
                      stop-color="#13EFEC"
                    ></stop>
                    <stop
                      offset="100%"
                      stop-color="#00E8DF"
                    ></stop>
                  </linearGradient>
                  <filter
                    id="4a7imk8mze"
                    width="230%"
                    height="230%"
                    x="-65%"
                    y="-65%"
                    filterUnits="objectBoundingBox"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="3.9"
                    ></feGaussianBlur>
                  </filter>
                  <filter
                    id="301mo6jeah"
                    width="312.7%"
                    height="312.7%"
                    x="-106.4%"
                    y="-106.4%"
                    filterUnits="objectBoundingBox"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="3.9"
                    ></feGaussianBlur>
                  </filter>
                  <filter
                    id="b2zvzgq7fj"
                    width="295%"
                    height="295%"
                    x="-97.5%"
                    y="-97.5%"
                    filterUnits="objectBoundingBox"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="3.9"
                    ></feGaussianBlur>
                  </filter>
                  <filter
                    id="a1wq161tvl"
                    width="256%"
                    height="256%"
                    x="-78%"
                    y="-78%"
                    filterUnits="objectBoundingBox"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="3.9"
                    ></feGaussianBlur>
                  </filter>
                  <path
                    id="qtpqrj1oda"
                    d="M3.333 14.167V5.833l-1.666.834L0 3.333 3.333 0h3.334c.04 1.57.548 2.4 1.524 2.492l.142.008C9.403 2.478 9.958 1.645 10 0h3.333l3.334 3.333L15 6.667l-1.667-.834v8.334h-10z"
                  ></path>
                  <path
                    id="jggzvnjgfc"
                    d="M0 0H20V20H0z"
                  ></path>
                  <path
                    id="2eiwxjmc7m"
                    d="M3.333 14.167V5.833l-1.666.834L0 3.333 3.333 0h3.334c.04 1.57.548 2.4 1.524 2.492l.142.008C9.403 2.478 9.958 1.645 10 0h3.333l3.334 3.333L15 6.667l-1.667-.834v8.334h-10z"
                  ></path>
                </defs>
                <g
                  fill="none"
                  fill-rule="evenodd"
                  transform="translate(2 3)"
                >
                  <mask
                    id="tinejqaasb"
                    fill="#fff"
                  >
                    <use xlink:href="#qtpqrj1oda"></use>
                  </mask>
                  <use
                    fill="#FFF"
                    fill-opacity="0"
                    xlink:href="#qtpqrj1oda"
                  ></use>
                  <g mask="url(#tinejqaasb)">
                    <g transform="translate(-2 -3)">
                      <mask
                        id="uf3ckvfvpf"
                        fill="#fff"
                      >
                        <use xlink:href="#jggzvnjgfc"></use>
                      </mask>
                      <use
                        fill="#D8D8D8"
                        xlink:href="#jggzvnjgfc"
                      ></use>
                      <circle
                        cx="8.9"
                        cy="6.8"
                        r="9"
                        fill="url(#j32lhg93hd)"
                        filter="url(#4a7imk8mze)"
                        mask="url(#uf3ckvfvpf)"
                      ></circle>
                      <circle
                        cx="9.3"
                        cy="13.7"
                        r="5.5"
                        fill="url(#hjoavsus6g)"
                        filter="url(#301mo6jeah)"
                        mask="url(#uf3ckvfvpf)"
                      ></circle>
                      <circle
                        cx="15.9"
                        cy="6.9"
                        r="6"
                        fill="url(#la1y5u3dvi)"
                        filter="url(#b2zvzgq7fj)"
                        mask="url(#uf3ckvfvpf)"
                      ></circle>
                      <circle
                        cx="16.4"
                        cy="17.7"
                        r="7.5"
                        fill="url(#2dsmrlvdik)"
                        filter="url(#a1wq161tvl)"
                        mask="url(#uf3ckvfvpf)"
                      ></circle>
                    </g>
                  </g>
                  <use
                    fill="#FFF"
                    fill-opacity="0.05"
                    xlink:href="#2eiwxjmc7m"
                  ></use>
                </g>
              </svg>
            </button>
            <button
              aria-label="upload"
              class="flex items-center justify-center w-10 h-10 rounded-full bg-alpha"
            >
              <i class="flex w-5 h-5 text-xl ic-upload text-secondary"></i>
            </button>
            <button
              aria-label="setting"
              class="flex items-center justify-center w-10 h-10 rounded-full bg-alpha"
            >
              <i class="flex w-5 h-5 text-xl ic-settings text-secondary"></i>
            </button>
            <button
              aria-label="profile"
              class="relative overflow-hidden border-2 border-yellow-400 rounded-full w-11 h-11"
            >
              <img
                src="https://s120-ava-talk.zadn.vn/2/4/9/3/21/120/58a03ada3f14043029fe8b521af00648.jpg"
                alt="logo"
                width="45"
              >
              <i class="ic-vip"></i>
            </button>
          </div>
        </header>
        <main
          ref="main"
          class="py-5 px-9"
          :class="currentSong ? 'h-main' : 'h-main-2'"
        >
          <router-view />
        </main>
      </div>
      <Playlist v-if="hasPlaylist" />
    </div>
    <Player
      v-if="currentSong"
      class="z-50"
    />
    <Lyric v-if="showLyricModal" />
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import Player from './components/Player.vue'
import Lyric from './components/Lyric.vue'
import Playlist from './components/Playlist.vue'
import Scrollbar from 'smooth-scrollbar'

export default {
  components: { Player, Lyric, Playlist },
  setup() {
    const main = ref(null)
    onMounted(() => {
      Scrollbar.init(main.value, { damping: 0.2 })
    })

    onBeforeUnmount(() => {
      Scrollbar.destroy(main.value)
    })

    const theme = ref('light')
    function toggleTheme() {
      if (theme.value === 'light') theme.value = 'dark'
      else theme.value = 'light'
    }
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

    const store = useStore()
    const hasPlaylist = computed(() => !!store.state.playlist)
    const showLyricModal = computed(() => store.state.showLyric)
    const currentSong = computed(() => store.state.currentSong)
    return {
      main,
      theme,
      toggleTheme,
      nav1,
      nav2,
      showLyricModal,
      hasPlaylist,
      currentSong,
    }
  },
}
</script>
<style>
.aside {
  background-color: var(--sidebar-bg);
  @apply min-h-screen flex-shrink-0 relative md:w-64;
}
.aside > div {
  @apply sticky inset-0;
}
.logo {
  width: 120px;
  height: 40px;
  display: inline-block;
  background: var(--logo-url) 50% / contain no-repeat;
  /* background-position: 50%;
  background-size: contain; */
}
.nav-link {
  @apply flex items-center px-6 py-2.5 space-x-3 font-semibold;
}
.active {
  @apply bg-alpha border-l border-primary;
}
.nav-icon {
  @apply text-2xl h-6;
}
.nav-text {
  color: var(--text-primary);
  @apply text-sm leading-normal font-semibold;
}

.divider {
  @apply mx-6 my-3;
  height: 1px;
  background-color: var(--border-color);
}
.ic-vip {
  @apply absolute flex bottom-0 mx-auto h-2.5 w-5 inset-x-0 outline-none;
  background-image: url(https://zjs.zadn.vn/zmp3-desktop/releases/v1.0.25/static/media/vip-label.3dd6ac7e.svg);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
