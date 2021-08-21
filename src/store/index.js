import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    routes: []
  },
  getters: {
    routes (state) {
      return state.routes
    }
  },
  mutations: {
    setRoute (state, data) {
      state.routes = data
    }
  },
  actions: {
    createRoute ({commit}, payload) {
      commit('setRoute', payload)
    }
  }
})
export default store
