<template>
    <div id="map" ref="mapContainer"></div>
</template>
  
<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client";

  export default {
    name: "MapView",

    data(){
      return {
        map: null,
        marker: null,
        latitude: -26.2943,
        longitude: -48.850236,
        ws: null, // WebSocket
        veiculos: { ...this.veiculosNoMapa } 
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
        },

        initConnection(){
          const url = "https://websocket.rotaexata.com.br:444";
          this.ws = io(url, {
            reconnection: true,
            reconnectionAttempts: 500,
            reconnectionDelay: 500, // Tempo inicial de reconexão (0.5 segundo)
            reconnectionDelayMax: 30000, // Tempo máximo de espera para reconexão (30 segundos)
            randomizationFactor: 0.2, // Fator de randomização para espalhar as tentativas de reconexão
            transports: ['websocket']
          });

          this.ws.on('connect', () => {
            console.log('testando conexão');
            this.ws.emit('join', {
              userId: this.$auth.user.usuario.id,
              companyId: this.$auth.user.usuario.empresa_id
            });

            // setTimeout(()=>{
            //   console.log('posições antigas');
            //   this.veiculos.forEach((veiculo)=>{
            //     console.log(veiculo.marker.getLatLng().lat);
            //     veiculo.marker.setLatLng([40, 40])
            //   })
            //   console.log('posições novas');
            //   this.veiculos.forEach((veiculo)=>{
            //     console.log(veiculo.marker.getLatLng().lat);
            //   })
            // }, 3000);
          });

          this.ws.on('message', (message) => {
            this.veiculos = this.veiculos.map((veiculo) => {
                if(veiculo.id === message.message.adesao_id){
                  veiculo.marker.setLatLng([message.message.latitude, message.message.longitude]);
                  console.log('mensagem recebida');
                  // veiculo.latitude = message.message.latitude;
                  // veiculo.longitude = message.message.longitude;
                }
                return veiculo;
            })
            
          
          })
        }

    },

    mounted() {
      this.initMap();
      this.initConnection();
      // this.reloadMarker();
    },

    beforeDestroy(){
      if(this.ws){
        this.ws.emit('unconnect');
      }
    },

    watch:{
        veiculosNoMapa(novo, velho){
          if(novo.length){
            this.veiculos = novo;
            this.veiculos.forEach((veiculo) => {
              if(!this.map.hasLayer(veiculo.marker)){
                veiculo.marker.addTo(this.map);
              }
            });
            const arrayDePosicoes = this.veiculos.map((veiculo) => {
              return veiculo.marker.getLatLng();
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