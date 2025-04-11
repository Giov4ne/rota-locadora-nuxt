<template>
    <div class="map-container">
        
        <select class="select-vehicle" v-model="idVeiculo" @change="centralizaVeiculo">
            <option v-for="veiculo in veiculosFiltrados" :value="veiculo.id" :key="veiculo.id">
                {{ veiculo.vei_placa }} - {{ veiculo.vei_descricao }}
            </option>
        </select>
        
        <MapView :veiculosNoMapa="veiculosFiltrados" @load="getVeiculosComUltimaPosicao" :zoom="16" />

        <p v-if="loading" class="loading-msg">Carregando...</p>
        
    </div>
</template>

<script>
import MapView from '../components/MapView.vue';
import { VEICULO } from '../utils/storeTypes/ultimaPosicao';
import L from 'leaflet';

    export default{
        components:{
            MapView
        },

        data(){
            return {
                veiculosComUltimaPosicao: [],
                    // { id: 42273, placa: 'FGO-6631', descricao: 'Eduardo M' },
                    // { id: 25215, placa: 'PRO1C14', descricao: 'Gol testando' },
                    // { id: 25198, placa: 'PAN-9999', descricao: 'PAI ZANELLA' }
                idVeiculo: null,
                loading: true,
                map: null
            }
        },

        computed:{
            ultimaPosicaoVeiculo(){
                return this.$store.state.ultimaPosicao.veiculo;
            },

            veiculosFiltrados(){
                return this.veiculosComUltimaPosicao.filter((veiculo) => {
                    return veiculo.marker;
                })
            }
        },

        methods:{
            loadUltimaPosicaoVeiculo(id){
                try{
                    return this.$store.dispatch('ultimaPosicao/' + VEICULO, id);
                } catch{
                    alert('erro');
                    // this.$store.commit('ultimaPosicao/setVeiculo', {});
                }
            },

            async getVeiculosComUltimaPosicao(map){
                if(map){
                    this.map = map;
                }
                try{
                    await this.$store.dispatch('adesoes/ADESOES', {
                        params: {
                            where: {
                                dt_aquisicao: {
                                    $ne: null
                                },
                                id: {
                                    $in: [42273, 25215, 25198]
                                }
                            }
                        }
                    })
                        .then(async (response) => {
                            this.veiculosComUltimaPosicao = response.data.data;

                            const requisicoes = this.veiculosComUltimaPosicao
                            .map((veiculo) => {
                                return this.loadUltimaPosicaoVeiculo(veiculo.id);
                            })

                            await Promise.all(requisicoes)
                            .then((response) => {
                                const posicoes = response.map(({ data: { data } }) => {
                                    return {
                                        latitude: data[0].posicao.latitude,
                                        longitude: data[0].posicao.longitude,
                                        id: data[0].posicao.adesao_id
                                    }
                                })
                                    this.veiculosComUltimaPosicao = this.veiculosComUltimaPosicao.map((veiculo) => {
                                        const posicao = posicoes.find((pos) => {
                                            return pos.id === veiculo.id;
                                        })
                                        console.log(posicao);
                                        return {
                                            ...veiculo,
                                            marker: L.marker([posicao.latitude, posicao.longitude])
                                        }
                                    })
                            });
                        });
                    // this.$store.commit('adesoes/setAdesoes', veiculos.data.data);
                } catch{
                    this.veiculosComUltimaPosicao = [];
                    // this.$store.commit('adesoes/setAdesoes', []);
                } finally{
                    this.loading = false;
                }
            },

            centralizaVeiculo(){
                const veiculo = this.veiculosComUltimaPosicao.find((veiculo) => {
                    return veiculo.id === this.idVeiculo;
                });
                this.map.setView(veiculo.marker.getLatLng());
            }
        },

        mounted(){
            // this.getVeiculosComUltimaPosicao();
            // this.loadUltimaPosicaoVeiculo();
        }
    }
</script>

<style>
    .map-container{
        margin-top: 63px;
    }

    .select-vehicle{
        position: fixed;
        top: 80px;
        right: 10px;
        z-index: 1;
        cursor: pointer;
        background-color: #fff;
        padding: 8px;
    }
</style>