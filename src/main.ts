import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/icons.css'
import './assets/index.css'
//nprogress
import nProgress from './plugins/nProgress'
import 'nprogress/nprogress.css'
// global component
import PlaylistCard from './components/common/cards/PlaylistCard.vue'
import Skeleton from './components/base/Skeleton.vue'
import Loading from './assets/loading.svg?component'
// directives
import clickOutside from './directives/clickOutside'

const app = createApp(App)
app.component('PlaylistCard', PlaylistCard)
app.component('Skeleton', Skeleton)
app.component('Loading', Loading)
app.directive('clickOutside', clickOutside)
app.use(store)
app.use(router)
nProgress(router)

app.mount('#app')
