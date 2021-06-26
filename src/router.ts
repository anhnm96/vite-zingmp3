import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./pages/Home/index.vue')
    // path: '/',
    // component: () => import('./layouts/index.vue'), // use default layout
    // children: [
    //   { path: '/', component: () => import('./pages/index.vue') },
    //   { path: '/album/:path/:id.html', component: () => import('./pages/album.vue') },
    //   { path: '/bai-hat/:path/:id.html', component: () => import('./pages/bai-hat.vue')},
    //   {
    //     path: '/:path(.*)*',
    //     component: () => import('./pages/404.vue'),
    //   },
    // ],
  },
  { path: '/album/:path/:id', component: () => import('./pages/Album.vue') },
  {
    path: '/:path(.*)*',
    component: () => import('./pages/NotFound.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
