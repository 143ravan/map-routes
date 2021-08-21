<template>
  <section class="route-form">
    <div class="registration__heading">
      <h1>Create a Route</h1>
      <span>Please fill up the following form</span>
    </div>
    <div class="details">
      <div class="route-name detail">
        <input
          type="text"
          class="details__field"
          placeholder="Route name"
          v-model="routeName">
      </div>
      <div class="direction detail">
          <multiselect
            v-model="direction"
            :options="directionOptions"
            placeholder="Choose Direction"
            track-by="name"
            :show-labels="false"
            label="name">
          </multiselect>
      </div>
      <div class="stop-list detail">
        <div>
          <multiselect
            v-model="stopList"
            :options="options"
            :multiple="true"
            placeholder="Choose stops in sequence"
            track-by="name"
            :show-labels="false"
            label="name">
          </multiselect>
        </div>
      </div>
      <div class="detail">
        <button
          type="submit"
          class="submit-button"
          @click="createRoute(-1)">
          Submit Registration
        </button>
      </div>
    </div>
    <div>
    </div>
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="hideMap">&times;</span>
        <gmap-map
          :zoom="3"
          :center="{lat: 19.0760, lng: 72.8777 }"
          :options="popupMapOptions"
          :style="popupMapStyle"
        >
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
          />
        </gmap-map>
      </div>
    </div>
  </section>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import {mapGetters} from 'vuex'

  export default {
    name: 'RouteForm',
    data () {
      return {
        popupMapOptions: {
          gestureHandling: 'none',
          zoomControl: true,
          zoomControlOptions: {
            position: 7
          },
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
          disableDefaultUi: false
        },
        popupMapStyle: {
          height: '350px',
          width: '100%'
        },
        markers: [],
        options: [{
          id: 'stop_1',
          name: 'Delhi',
          lng: '77.1025',
          lat: '28.7041'
        },
        {
          id: 'stop_2',
          name: 'Mumbai',
          lng: '72.8777',
          lat: '19.0760'
        },
        {
          id: 'stop_3',
          name: 'Bengaluru',
          lng: '77.5946',
          lat: '12.9716'
        },
        {
          id: 'stop_4',
          name: 'Pune',
          lng: '73.8567',
          lat: '18.5204'
        },
        {
          id: 'stop_5',
          name: 'Indore',
          lng: '75.8577',
          lat: '22.7196'
        },
        {
          id: 'stop_6',
          name: 'Goa',
          lng: '74.1240',
          lat: '15.2993'
        }],
        stopList: [],
        routeName: '',
        directionOptions: [{
          name: 'Up',
          value: 'up'
        },
        {
          name: 'Down',
          value: 'down'
        }],
        direction: {},
        routeIndex: -1
      }
    },
    computed: {
      ...mapGetters(['routes'])
    },
    components: {
      Multiselect
    },
    methods: {
      addTag (newTag) {
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.options.push(tag)
        this.stopList.push(tag)
      },
      createRoute () {
        let routes = this.routes
        const routeIndex = this.routeIndex
        if (routeIndex < 0) {
          const routeId = 'route_' + (routes.length + 1)
          const payload = {
            routeId,
            status: 'Active',
            routeName: this.routeName,
            stopList: this.stopList,
            direction: this.direction
          }
          routes.push(payload)
        } else {
          routes[routeIndex].routeName = this.routeName
          routes[routeIndex].stopList = this.stopList
          routes[routeIndex].direction = this.direction
        }
        this.$store.dispatch('createRoute', routes)
        this.routeName = ''
        this.stopList = [] 
        this.direction = {}
      },
      updateRoute (routeId) {
        const routes = this.routes
        let routeIndex = 0;
        let currentRoute = routes.find((route, index) => {
          if (route.routeId === routeId) {
            routeIndex = index
            return true;
          }
        })
        this.routeName = currentRoute.routeName;
        this.direction = Object.assign({}, currentRoute.direction);
        this.stopList = [...currentRoute.stopList];
        this.routeIndex = routeIndex
      },
      viewMap (routeId) {
        document.getElementById("myModal").style.display = 'block';
        const routes = this.routes
        let currentRoute = routes.find((route) => {
          if (route.routeId === routeId) {
            return true;
          }
        })
        let marker = []
        currentRoute.stopList.forEach (
          (element) => (
            marker.push({
              position: {
                lat: parseFloat(element.lat),
                lng: parseFloat(element.lng)
              }
            })
          )
        )
        this.markers = [...marker]
      },
      hideMap () {
        document.getElementById("myModal").style.display = 'none';
        this.markers = []
      }
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
  *:focus {
    outline: none;
  } 
  .route-form {
    margin: 10px 30%;
    box-shadow: 0 2px 8px 0 rgb(0 0 0 / 20%);
    border-radius: 4px;
    padding: 10px 20px 30px;
    display: flex;
    flex-direction: column;
    background: #fff;
  }
  .registration__heading {
    text-align: center;
    margin-bottom: 20px;
  }
  .details {
    text-align: center;
    margin-top: 20px;
  }
  .details__field {
    width: 90%;
    margin-top: 0;
    border-radius: 16px;
    border: 2px solid #f1f1f1;
    color: rgba(0,0,0,.6);
    font-family: inherit;
    font-size: 16px;
    padding: 20px 8px;
  }
  .submit-button {
    color: #fff;
    background-color: #fbae1f;
    border-color: #fbae1f;
    width: 90%;
    border-radius: 16px;
    border: 2px solid #f1f1f1;
    font-family: inherit;
    font-size: 16px;
    padding: 20px 8px;
    cursor: pointer;
  }
  .direction, .stop-list {
    width: 93%;
    margin-left: 3%;
  }
  .detail {
    margin-bottom: 20px;
  }
  .route-form >>> .multiselect__tags {
    padding: 14px 8px;
    border-radius: 16px;
    color: rgba(0,0,0,.6);
    font-size: 16px;
    font-family: effra, Helvetica, Arial, sans-serif;
  }
  .route-form >>> .multiselect__tag {
    background: #fbae1f;
  }
  .route-form >>> .multiselect__option--highlight {
    background: #fbae1f;
  }

  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%; 
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }
  .modal-content {
    margin: auto;
    width: 40%;
    border-radius: 16px;
  }
  .close {
    color: #aaaaaa;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    flex-direction: row-reverse;
  }
  .close:hover,
  .close:focus {
    color: #fbae1f;
    text-decoration: none;
    cursor: pointer;
  }
  .route-form >>> .vue-map-container .vue-map {
    border-radius: 16px;
  }
</style>