// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

import VueOnsen from 'vue-onsenui'

Vue.config.productionTip = false
Vue.use(VueOnsen)

/* eslint-disable no-new */
new Vue({
   el: '#app',
   router,
   components: { App },
   template: '<App/>',
   beforeCreate () {
      this.$ons.enableAutoStatusBarFill()
   }
})
