import Vue from 'vue'
import App from './App.vue'
import './init.js'
Vue.config.productionTip = false

import router from '@/router/routes.js'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
