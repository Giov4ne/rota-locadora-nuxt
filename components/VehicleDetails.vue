<template>
    <div>
        <div class="form-background"></div>
        <div id="vehicle-details">
            <div id="details-header">
                <h2 class="details-header-title">Detalhes do veículo</h2>
                <span class="close-form" @click="close">X</span>
            </div>
            <div id="details-body">
                <div id="details-grid">
                    <div id="plate-grid">
                        <span class="fa fa-car"></span>
                        <span>
                            <p id="plate-grid-p">{{ vehicleToSeeDetails.plate }}</p>
                            <p class="grid-element-p">Frota 101</p>
                        </span>
                    </div>
                    <div id="brand-model-grid">
                        <p class="grid-element-title">Marca/Modelo</p>
                        <p class="grid-element-p">{{ vehicleToSeeDetails.brand }} {{ vehicleToSeeDetails.model }}</p>
                    </div>
                    <div id="year-grid">
                        <p class="grid-element-title">Ano</p>
                        <p class="grid-element-p">{{ vehicleToSeeDetails.year }}</p>
                    </div>
                    <div id="color-grid">
                        <p class="grid-element-title">Cor</p>
                        <p class="grid-element-p">{{ vehicleToSeeDetails.color }}</p>
                    </div>
                    <div id="purpose-grid">
                        <p class="grid-element-title">Propósito de uso</p>
                        <p class="grid-element-p">{{ vehicleToSeeDetails.purpose }}</p>
                    </div>
                    <div id="zero-grid">
                        <p class="grid-element-title">Zero-quilômetro?</p>
                        <p class="grid-element-p">{{ vehicleToSeeDetails.zero ? "Sim" : "Não" }}</p>
                    </div>
                    <div id="confort-level-grid">
                        <p class="grid-element-title">Nível de conforto</p>
                        <p class="grid-element-p">{{ vehicleToSeeDetails.confortLevel }} <span class="fa fa-star"></span></p>
                    </div>
                    <div id="latitude-grid">
                        <p class="grid-element-title">Latitude</p>
                        <p class="grid-element-p">{{ vehicleToSeeDetails.latitude }}</p>
                    </div>
                    <div id="longitude-grid">
                        <p class="grid-element-title">Longitude</p>
                        <p class="grid-element-p">{{ vehicleToSeeDetails.longitude }}</p>
                    </div>
                </div>
                <MapView :latitude="vehicleToSeeDetails.latitude" :longitude="vehicleToSeeDetails.longitude" :zoom="17" />
            </div>
        </div>
    </div>
</template>

<script>
import MapView from './MapView.vue';

    export default{
        name: 'VehicleDetails',
        components:{
            MapView
        },
        props:{
            vehicle: Object
        },
        data() {
            return {
                vehicleToSeeDetails: this.vehicle 
                ? { ...this.vehicle } // Copia para não alterar diretamente a prop
                : {} // Novo veículo
            }
        },
        methods:{
            close(){
                this.$emit('onCloseDetails');
            }
        }
    }
</script>

<style>
    #vehicle-details{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        width: 800px;
    }

    #details-header{
        background-color: #007DF0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px 30px 25px 20px;
        border-radius: 5px 5px 0 0;
        color: #fff;
        width: 100%;
    }

    #details-header-title{
        font-size: 18px;
        font-weight: 400;
        margin-right: 8px;
        cursor: default;
    }

    #details-body{
        background-color: #fff;
        padding: 25px;
        border-radius: 0 0 5px 5px;
    }

    #details-grid{
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: repeat(5, 1fr);
        gap: 15px;
        border: 1px solid #DFDFDF;
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 13px;
        border-radius: 0 0 5px 5px;
    }

    .grid-element-title{
        color: #777;
        font-size: 12px;
    }

    .grid-element-p, #plate-grid-p{
        color: #333;
        font-size: 14px;
    }

    #plate-grid{
        display: flex;
        align-items: center;
    }

    #plate-grid .fa-car{
        color: #fff;
        background-color: #CC0000;
        border-radius: 50%;
        padding: 8px;
        margin-right: 6px;
    }

    #plate-grid-p{
        font-weight: 700;
    }

    @media screen and (max-width: 840px){
        #vehicle-details{
            width: 92%;
        }

        #details-header{
            padding: 20px 25px 20px 15px;
        }

        #details-grid{
            grid-template-rows: repeat(3, 1fr);
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 12px;
        }
    }

    @media screen and (max-width: 380px){
        #details-grid{
            grid-template-rows: repeat(5, 1fr);
            grid-template-columns: repeat(2, 1fr);
        }

        #details-body{
            overflow-y: auto;
            max-height: 500px;
        }

        #details-body::-webkit-scrollbar {
            width: 6px; 
        }

        #details-body::-webkit-scrollbar-track {
            background-color: #F0F0F0;
        }

        #details-body::-webkit-scrollbar-thumb {
            background-color: #3366CC; 
            border-radius: 5px;
        }

        #details-body::-webkit-scrollbar-thumb:hover {
            background-color: #005bb5; 
        }
    }

    @media screen and (max-width: 275px){
        #details-grid{
            grid-template-rows: repeat(9, 1fr);
            grid-template-columns: 1fr;
        }
    }
</style>