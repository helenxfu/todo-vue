import Vue from 'vue'
import firebase from 'firebase/app'
import './assets/sass/index.scss'
import { firebaseConfig } from './firestore'

import App from './App.vue'
import store from './store'
import i18n from './i18n'

Vue.config.productionTip = false

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

new Vue({
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')
