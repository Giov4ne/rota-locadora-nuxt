<template>
    <div class="page-container">
        <div class="container">
            
            <MapView :latitude="40" :longitude="40" :zoom="17" />
            <!-- <div id="map" ref="mapContainer"></div> -->

        </div>
    </div>
</template>

<script>
import MapView from '../components/MapView.vue';
import { VEICULO } from '../utils/storeTypes/ultimaPosicao';

    export default{
        components:{
            MapView
        },

        data(){
            return {
                idVeiculo: 42273
            }
        },

        computed:{
            ultimaPosicaoVeiculo(){
                console.log(this.$store.state.ultimaPosicao);
                return this.$store.state;
            }
        },

        methods:{
            async loadUltimaPosicaoVeiculo(){
                try{
                    const veiculo = await this.$store.dispatch('ultimaPosicao/' + VEICULO, this.idVeiculo);
                    this.$store.commit('ultimaPosicao/setVeiculo', veiculo.data.data[0].posicao);
                } catch{
                    this.$store.commit('ultimaPosicao/setVeiculo', {});
                }
            }
        },

        mounted(){
            this.loadUltimaPosicaoVeiculo();
        }

        // async loadVeiculos(){
        //         try{
        //             const veiculos = await this.$store.dispatch('adesoes/' + ADESOES, {
        //                 params: {
        //                     where: {
        //                         ...(this.selectedBrands.length && {
        //                             tipo_veiculo: {
        //                                 $in: this.selectedBrands
        //                             }
        //                         }),
        //                         ...(this.selectedPurpose.length && {
        //                             tipo_negociacao: this.selectedPurpose
        //                         }),
        //                         dt_aquisicao: {
        //                             $ne: null
        //                         }

        //                     },
        //                     order: ["vei_descricao ASC"],
        //                     limit: this.limit,
        //                     page: this.page
        //                 },
        //                 like: this.plateInput
        //             })
        //             this.$store.commit('adesoes/setAdesoes', veiculos.data.data);
        //         } catch{
        //             this.$store.commit('adesoes/setAdesoes', []);
        //         }
        //     }
    }
</script>