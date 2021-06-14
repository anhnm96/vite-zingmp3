import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import BaseCard from './components/BaseCard.vue'
import '@/assets/icons.css'
import '@/assets/index.css'

const app = createApp(App)
app.component('BaseCard', BaseCard)
// app.use(store)
app.use(router)

app.mount('#app')
