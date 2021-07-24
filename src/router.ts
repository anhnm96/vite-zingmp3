import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/Home/index.vue'),
  },
  {
    path: '/album/:path/:id',
    name: 'Album',
    component: () => import('./pages/Album.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('./pages/Search/index.vue'),
    redirect: '/search/all',
    children: [
      {
        path: 'all',
        name: 'SearchAll',
        component: () => import('./pages/Search/All.vue'),
      },
      {
        path: 'song',
        name: 'SearchSong',
        component: () => import('./pages/Search/Song.vue'),
      },
      {
        path: 'playlist',
        name: 'SearchPlaylist',
        component: () => import('./pages/Search/Playlist.vue'),
      },
      {
        path: 'artist',
        name: 'SearchArtist',
        component: () => import('./pages/Search/Artist.vue'),
      },
      {
        path: 'video',
        name: 'SearchVideo',
        component: () => import('./pages/Search/Video.vue'),
      },
    ],
  },
  {
    path: '/:path(.*)*',
    component: () => import('./pages/NotFound.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
