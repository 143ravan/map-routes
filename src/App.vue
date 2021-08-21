<template>
  <div id="app">
    <div class="app-header">
      <Header />
    </div>
    <div>
      <route-form />
    </div>
    <div class="app-route-list">
      <route-list
        @update="editRoute"
        @viewMap="viewMap"/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import RouteForm from './components/RouteForm.vue'
import RouteList from './components/RouteList.vue'

export default {
  
  name: 'App',
  components: {
    Header,
    RouteForm,
    RouteList
  },
  methods: {
    editRoute (routeId) {
      this.$children[1].updateRoute(routeId)
    },
    viewMap (routeId) {
      this.$children[1].viewMap(routeId)
    }
  }
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: effra, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .app-header {
    top: 0;
  }
  .app-route-list {
    padding: 50px;
  }
</style>
