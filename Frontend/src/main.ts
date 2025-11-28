import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/index.css'
import notifications from '@kyvg/vue3-notification'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as fontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
const app = createApp(App)
app.use(router)
app.use(store)
app.use(notifications)
app.component('font-awesome-icon', fontAwesomeIcon)
app.mount('#app')