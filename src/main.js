import Vue from 'vue'
import App from './App.vue'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'


Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAp_caprOWPayfzd9TPsInpb7hIIA2w02I'
  }
})
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
