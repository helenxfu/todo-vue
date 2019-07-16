import Vue from 'vue'

import './assets/sass/index.scss'

import App from './App.vue'
import store from './store'
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')
