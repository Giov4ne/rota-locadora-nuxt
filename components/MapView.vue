<template>
    <div id="map" ref="mapContainer"></div>
</template>
  
<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

  export default {
    name: "MapView",

    data(){
      return {
        map: null,
        marker: null,
        latitude: -26.2943,
        longitude: -48.850236
      }
    },

    props: {
      veiculosNoMapa: {
        type: Array,
        default: () => []
      },
      zoom: {
        type: Number,
        default: 16
      }
    },

    methods: {
      initMap() {
        if (!this.$refs.mapContainer) return;
        
        this.map = L.map(this.$refs.mapContainer).setView(
          [this.latitude, this.longitude],
          this.zoom
        );
        
        
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/*, {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }*/).addTo(this.map);
          // setLatLng

        this.map.on('load', this.$emit('load', this.map));
          
      },
        
        reloadMarker(){
          if(!this.marker){
            const customIcon = L.divIcon({
              className: "custom-marker",
              html: `<i class="fas fa-location-dot fa-2x" style="color: #007DF0; font-size: 38px;"></i>`,
              iconSize: [32, 32],
              iconAnchor: [16, 32]
            });
            this.marker = L.marker([this.latitude, this.longitude], { icon: customIcon });
            this.marker.addTo(this.map);
          } else{
            this.marker.setLatLng([this.latitude, this.longitude]);
          }
          this.map.setView([this.latitude, this.longitude], this.zoom);
        }

    },

    mounted() {
      this.initMap();
      // this.reloadMarker();
    },

    watch:{
        veiculosNoMapa(novo, velho){
          if(novo.length){
            novo.forEach((item) => {
              if(this.map.hasLayer(item.marker)){
              } else{
                item.marker.addTo(this.map);
              }
              // console.log(item.marker);
            });
            const arrayDePosicoes = novo.map((item) => {
              return item.marker.getLatLng();
            })
            this.map.fitBounds(arrayDePosicoes);
          }
        }
      } 
    
  };
  </script>
  
<style scoped>
    #map {
        width: 100%;
        height: calc(100vh - 64px);
        z-index: 0;
    }
</style>