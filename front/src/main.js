// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Styles from './assets/css/styles.css'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import {store} from './store'
import Notifications from 'vue-notification'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(VueCookies)
Vue.prototype.$cookies = VueCookies
Vue.use(Notifications)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
