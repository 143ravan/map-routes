<template>
  <section class="route-list" v-if="routeList.length">
    <div class="route-list__header">
    <div>
      Route Id
    </div>
    <div>
      Route Name
    </div>
    <div>
      Direction
    </div>
    <div>
      Status
    </div>
    <div>
      List of Stops
    </div>
    <div>
      Edit
    </div>
    <div>
      View
    </div>
    <div>
      Delete
    </div>
    </div>
    <div v-for="route in routeList" :key="route.routeId" class="route-list__body">
      <div>
        {{ route.routeId }}
      </div>
        <div>
        {{ route.routeName }}
      </div>
      <div>
        {{ route.direction.name }}
      </div>
      <div>
        {{ route.status }}
      </div>
      <div>
        {{ route.stopList.map(element => element.name).toString().split(',').join(', ') }}
      </div>
      <div
        class="cursor-pointer"
        @click="updateRoute(route.routeId)">
        <img
          height="20px"
          src="https://icon-library.com/images/edit-icon-png/edit-icon-png-14.jpg"
          alt="Edit">
      </div>
      <div
        class="cursor-pointer"
        @click="openMap(route.routeId)">
       <img
        height="30px"
        src="https://previews.123rf.com/images/amin268/amin2681705/amin268170500434/77625877-distance-line-icon-navigation-and-route-map-pointer-vector-graphics-a-linear-pattern-on-a-white-back.jpg"
        alt="map">
      </div>
      <div
        v-if="route.status==='Active'"
        class="cursor-pointer"
        @click="removeRoute(route.routeId)">
        <img
          height="20px"
          src="https://cdn0.iconfinder.com/data/icons/human-resource-2-3/66/130-1024.png"
          alt="bin">
      </div>
    </div>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'RouteList',
    computed: {
      ...mapGetters(['routes']),
      routeList () {
        return this.routes
      }
    },
    methods: {
      removeRoute (routeId) {
        const routes =  [...this.routes];
        routes.map((route) => {
          if(route.routeId === routeId) {
            route.status = 'Inactive'
          }
        })
        this.$store.dispatch('createRoute', routes)
      },
      updateRoute (routeId) {
        this.$emit('update', routeId)
      },
      openMap (routeId) {
        this.$emit('viewMap', routeId)
      }
    }
  }
</script>

<style scoped>
  .route-list {
    margin-top: 20px;
  }
  .route-list__header {
    background: #fbae1f;
    color: #fff;
    border-radius: 3px;
    padding: 10px 20px;
    cursor: pointer;
    display: grid;
    grid-template-columns: 15% 15% 10% 15% 30% 5% 5% 5%;
  }
  .route-list__body {
    display: grid;
    grid-template-columns: 15% 15% 10% 15% 30% 5% 5% 5%;
    padding: 10px;
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>