<template>
    <div id="map" ref="mapContainer"></div>
</template>
  
<script>
  import L from "leaflet";
    import "leaflet/dist/leaflet.css";
  
export default {
    name: "MapComponent",
    props: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      },
      zoom: {
        type: Number,
        default: 17
      }
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        if (!this.$refs.mapContainer) return;
  
        const map = L.map(this.$refs.mapContainer).setView(
          [this.latitude, this.longitude],
          this.zoom
        );

        const customIcon = L.divIcon({
            className: "custom-marker",
            html: '<span class="fa fa-location-dot fa-2x" style="color: #007DF0; font-size: 38px; transform: translate(-5px, -5px);"></span>',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });
  
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
  
        L.marker([this.latitude, this.longitude], { icon: customIcon })
          .addTo(map);
      }
    }
  };
</script>
  
<style scoped>
    #map {
        width: 100%;
        height: 280px;
    }
</style>