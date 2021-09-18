import Vue from 'vue'
import App from './App.vue'
import './init.js'
import "normalize.css/normalize.css";

Vue.config.productionTip = false

import router from '@/router/routes.js'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
