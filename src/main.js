import Vue from 'vue'
import App from './App.vue'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'


Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'your-api-key'
  }
})
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
