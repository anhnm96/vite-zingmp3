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
import BaseCard from './components/BaseCard.vue'
import Skeleton from './components/Skeleton.vue'
import Loading from './assets/loading.svg?component'

const app = createApp(App)
app.component('BaseCard', BaseCard)
app.component('Skeleton', Skeleton)
app.component('Loading', Loading)
app.use(store)
app.use(router)
nProgress(router)

app.mount('#app')
