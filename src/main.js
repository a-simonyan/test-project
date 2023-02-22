import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'

const loadimage = require('./assets/images/loading.gif')
const errorimage = require('./assets/images/error.svg')

const lazyloadConfig = {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1
}

createApp(App).use(VueLazyload, lazyloadConfig).use(store).use(VueAxios, axios).use(router).mount('#app')
