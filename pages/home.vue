<template>
    <div class="home-activity-container">
        <div class="container">
            <section id="register-and-filters">
                <button id="register-vehicle-btn" @click="openVehicleEditRegistration">Cadastrar Veículo</button>
                <div id="filters">
                    <div class="dropdown-boxes">
                        <BrandsDropdown ref="brandsDropdownRef" :checkbox=true v-model="selectedBrands"></BrandsDropdown>
                    </div>

                    <div class="dropdown-boxes">
                        <PurposesDropdown ref="purposesDropdownRef" v-model="selectedPurpose"></PurposesDropdown>
                    </div>
                    <div class="custom-field">
                        <label for="plate">Placa</label>
                        <input type="text" class="inputs" name="plate" placeholder="Digite a placa ou a descrição do veículo" @keyup.enter="loadVeiculos()" v-model="plateInput">
                    </div>
                    <div id="search-erase">
                        <button class="search-btn" @click="loadVeiculos()">
                            <i class="fas fa-magnifying-glass"></i>
                            
                        </button>
                        <button class="erase-btn" @click="erase">
                            <i class="fas fa-eraser"></i>
                        </button>
                    </div>
                    <i class="fas fa-filter filter-btn"></i>
                </div>
            </section>
            <main>
                <table v-if="adesoes.length">
                    <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Descrição</th>
                            <th>Tipo</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Ano/Modelo</th>
                            <th>Tipo Negociação</th>
                            <th>Última Posição</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(vehicle, index) in adesoes" :key="index">
                            <td>{{ vehicle.vei_placa }}</td>
                            <td>{{ vehicle.vei_descricao }}</td>
                            <td>{{ vehicle.tipo_veiculo !== null ? vehicle.tipo_veiculo : 'Não informado'  }}</td>
                            <td>{{ vehicle.marca_id !== null ? vehicle.marca_id : 'Não informado' }}</td>
                            <td>{{ vehicle.modelo_id }}</td>
                            <td>{{ vehicle.vei_ano_modelo !== null ? vehicle.vei_ano_modelo : 'Não informado' }}</td>
                            <td>{{ vehicle.tipo_negociacao !== null ? vehicle.tipo_negociacao : 'Não informado' }}</td>
                            <td>{{ vehicle.updated !== null ? vehicle.updated : 'Sem posição' }}</td>
                            <td>
                                <div class="options-dropdown-container" ref="dropdowns">
                                    <span class="ellipsis" @click="optionsToggleDropdown(index)">...</span>
                                    <transition name="fade">
                                        <div v-if="optionsIsOpen === index" class="options-dropdown">
                                            <ul>
                                                <li @click="vehicleDetails(vehicle)">Detalhes</li>
                                                <li @click="editVehicle(vehicle)">Editar</li>
                                                <li @click="deleteVehicle(vehicle.plate)">Deletar</li>
                                            </ul>
                                        </div>
                                    </transition>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p v-else class="loading-msg">Carregando...</p>
                <!-- <p v-else id="no-vehicles-msg">Nenhum veículo encontrado...</p> -->    
            </main>

            
            <VehicleEditRegistration 
                v-if="vehicleEditRegistrationIsOpen" 
                :vehicle="vehicleToEdit" 
                :allVehicles="vehicles"
                :allActivities="activities"
                @onClose="closeVehicleEditRegistration"
                >
            </VehicleEditRegistration>

            <VehicleDetails
                v-if="vehicleDetailsIsOpen"
                :vehicle="vehicleToSeeDetails"
                @onCloseDetails="closeVehicleDetails"
            ></VehicleDetails>

            <MyPagination v-if="adesoes.length" v-model="page" :limit="limit"></MyPagination>
            <!-- <MyPagination v-if="adesoes.length >= 10"></MyPagination> -->
            <!-- <MyPagination v-if="filteredVehicles.length >= 10"></MyPagination> -->
        </div>
        <span v-if="successMsg !== ''" class="success-message">{{ successMsg }}</span>
    </div>
</template>

<script>
import MyHeader from '../components/MyHeader.vue';
import BrandsDropdown from '../components/BrandsDropdown.vue';
import PurposesDropdown from '../components/PurposesDropdown.vue';
import VehicleEditRegistration from '../components/VehicleEditRegistration.vue';
import VehicleDetails from '../components/VehicleDetails.vue';
import MyPagination from '../components/MyPagination.vue';
import { ADESOES } from '../utils/storeTypes/adesoes';

    export default{
        
        name: 'home',
        components: {
            MyHeader,
            BrandsDropdown,
            PurposesDropdown,
            VehicleEditRegistration,
            VehicleDetails,
            MyPagination
        },

        data() {
            return {
                selectedBrands: [],
                selectedPurpose: '',
                plateInput: '',
                activities: [],
                vehicles: [],
                filteredVehicles: [],
                brandOptions: [
                    { title: "Audi" },
                    { title: "BMW" },
                    { title: "Chevrolet" },
                    { title: "Fiat" },
                    { title: "Ford" },
                    { title: "Jeep" },
                    { title: "Mitsubishi" },
                    { title: "Mercedes-Benz" },
                    { title: "Peugeot" },
                    { title: "Volkswagen" }
                ],
                optionsIsOpen: null,
                vehicleEditRegistrationIsOpen: false,
                vehicleDetailsIsOpen: false,
                vehicleToEdit: null,
                vehicleToSeeDetails: null,
                successMsg: '',

                page: 0,
                limit: 12,
            };
        },

        methods: {
            clearPlateInput(){
                this.plateInput = '';
                this.filterVehicles();
            },

            erase(){
                this.$refs.brandsDropdownRef.clearBrandsSelection();
                this.$refs.purposesDropdownRef.clearPurposeSelection();
                this.clearPlateInput();
                this.filterVehicles();
            },

            filterVehicles() {
                if (!this.selectedBrands.length && !this.selectedPurpose && !this.plateInput) {
                    this.filteredVehicles = this.vehicles;
                    return;
                }

                const searchPlate = this.plateInput.toLowerCase();

                this.filteredVehicles = this.vehicles.filter(vehicle => {
                    return (
                        (this.selectedBrands.length === 0 || this.selectedBrands.includes(vehicle.brand)) &&
                        (!this.selectedPurpose || vehicle.purpose === this.selectedPurpose) &&
                        (!this.plateInput || 
                            vehicle.plate.toLowerCase().includes(searchPlate) ||
                            vehicle.color.toLowerCase().includes(searchPlate))
                    );
                });
            },

            optionsToggleDropdown(index){
                if (this.optionsIsOpen === index) {
                    this.optionsIsOpen = null;
                    document.removeEventListener("click", this.closeDropdownOutside);
                } else {
                    this.optionsIsOpen = index;
                    document.addEventListener("click", this.closeDropdownOutside);
                }
            },

            closeDropdownOutside(event){
                // Verifica se o clique foi fora de todos os dropdowns
                if (!this.$refs.dropdowns.some((dropdown) => dropdown.contains(event.target))) {
                    this.optionsIsOpen = null;
                    document.removeEventListener("click", this.closeDropdownOutside);
                }
            },

            closeOptions(){
                this.optionsIsOpen = null;
            },

            vehicleDetails(vehicle) {
                this.vehicleToSeeDetails = vehicle;
                this.vehicleDetailsIsOpen = true;
                this.closeOptions();
            },

            editVehicle(vehicle) {
                this.vehicleToEdit = vehicle;
                this.vehicleEditRegistrationIsOpen = true;
                this.closeOptions();
            },

            deleteVehicle(vehiclePlate) {
                this.vehicles = this.vehicles.filter(vehicle => vehicle.plate !== vehiclePlate);
                localStorage.setItem('vehicles', JSON.stringify(this.vehicles));
                this.filteredVehicles = this.vehicles;
                const today = new Date().toLocaleDateString('pt-BR');
                const timeNow = new Date().toLocaleTimeString('pt-BR', { hour12: false });
                this.activities.push({ type: 'delete', plate: vehiclePlate, date: today, time: timeNow });
                localStorage.setItem('activityHistory', JSON.stringify(this.activities));
                this.closeOptions();
                this.showSuccessMsg('Veículo deletado com sucesso!');
            },

            // async deleteVehicle(vehicle) {
            //     await this.$store.dispatch('adesoes/' + EXCLUIR_ADESAO, vehicle.id);
            //     this.loadVeiculos()
            //     // this.vehicles = this.vehicles.filter(vehicle => vehicle.plate !== vehicleId);
            //     // localStorage.setItem('vehicles', JSON.stringify(this.vehicles));
            //     // this.filteredVehicles = this.vehicles;
            //     const today = new Date().toLocaleDateString('pt-BR');
            //     const timeNow = new Date().toLocaleTimeString('pt-BR', { hour12: false });
            //     this.activities.push({ type: 'delete', plate: vehicle.vei_placa, date: today, time: timeNow });
            //     localStorage.setItem('activityHistory', JSON.stringify(this.activities));
            //     this.closeOptions();
            //     this.showSuccessMsg('Veículo deletado com sucesso!');
            // },

            openVehicleEditRegistration(){
                this.vehicleEditRegistrationIsOpen = true;
            },

            closeVehicleEditRegistration(){
                this.vehicleEditRegistrationIsOpen = false;
                this.vehicleToEdit = null;
                this.loadVeiculos();
            },

            closeVehicleDetails(){
                this.vehicleDetailsIsOpen = false;
                this.vehicleToSeeDetails = null;
            },

            showSuccessMsg(message) {
                this.successMsg = message;

                setTimeout(() => {
                    this.successMsg = '';
                }, 5000);
            },

            async loadVeiculos(){
                try{
                    const veiculos = await this.$store.dispatch('adesoes/' + ADESOES, {
                        params: {
                            where: {
                                ...(this.selectedBrands.length && {
                                    tipo_veiculo: {
                                        $in: this.selectedBrands
                                    }
                                }),
                                ...(this.selectedPurpose.length && {
                                    tipo_negociacao: this.selectedPurpose
                                }),
                                dt_aquisicao: {
                                    $ne: null
                                }

                            },
                            order: ["vei_descricao ASC"],
                            limit: this.limit,
                            page: this.page
                        },
                        like: this.plateInput
                    })
                    this.$store.commit('adesoes/setAdesoes', veiculos.data.data);
                } catch{
                    this.$store.commit('adesoes/setAdesoes', []);
                }
            }

        },

        computed: {
            // ...mapGetters('adesoes/', ['adesoes'])
            
            adesoes(){
                console.log(this.$store.state.adesoes.adesoes);
                return this.$store.state.adesoes.adesoes;
            }
        },
        
        watch: {
            // selectedBrands: 'filterVehicles',
            // selectedPurpose: 'filterVehicles',
            // plateInput: 'filterVehicles',
            selectedBrands: 'loadVeiculos',
            selectedPurpose: 'loadVeiculos',
            page: 'loadVeiculos'
        },
        
        mounted(){
            this.vehicles = JSON.parse(localStorage.getItem('vehicles')) !== null ? JSON.parse(localStorage.getItem('vehicles')) : [];
            this.activities = JSON.parse(localStorage.getItem('activityHistory')) !== null ? JSON.parse(localStorage.getItem('activityHistory')) : [];
            this.filteredVehicles = this.vehicles;

            this.loadVeiculos();
        },
        

    }
            </script>

<style>

#register-and-filters{
    display: flex;
    justify-content: space-between;
        align-items: center;
    }

    #register-vehicle-btn{
        background-color: #007DF0;
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover{
            background-color: #518bff;
        }
    }

    #filters{
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    #filters > *, .dropdown-boxes > *{
        margin: auto auto auto 16px;
    }

    .dropdown-boxes > *{
        margin-left: 0;
    }

    #filters .custom-field{
        width: 255px;
    }

    #search-erase{
        display: flex;
        flex-wrap: nowrap;
    }

    table{
        border-collapse: collapse;
        width: 100%;
        margin: 28px 0;
        box-shadow: 0 2px 8px #00000040;
        cursor: default;
    }

    table tr:not(:first-child){
        border-top: 1px solid #E1E1E1;
    }

    table tr th{
        border-bottom: 1px solid #E1E1E1;
        color: #007DF0;
        font-weight: 700;
        font-size: 14px;
        text-align: left;
        padding: 12px;
    }

    table tr td{
        font-size: 12px;
        color: #333;
        padding: 6px 12px;
    }

    table tr td .fa-star, #details-grid .fa-star{
        color: #007DF0;
        font-size: 14px;
    }

    table tr td .ellipsis{
        color: #464646;
        font-weight: 700;
        font-size: 24px;
        cursor: pointer;
    }



    /* DROPDOWN MENUS */
    .dropdown {
        position: relative;
        display: inline-block;
    }

    .custom-dropbox{
        border: 1px solid #d8d8d8;
        border-radius: 5px;
    }

    .dropdown-boxes .custom-dropbox{
        width: 220px;
    }

    .custom-dropbox > label{
        position: absolute;
        top: -8px;
        left: 8px;
        background-color: #fff;
        padding: 0 5px;
        font-size: 12px;
        color: #333;
    }
    
    .dropdown-button {
        padding: 11px;
        border: none;
        border-radius: 5px;
        background: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        width: 100%;
        
        &:hover{
            background-color: #f0f0f086;
        }
    }

    .dropdown-text{
        font-size: 12px;
        color: #A9A7A9;
    }
    
    .arrow {
        margin-left: auto;
        transition: transform 0.3s ease;
        color: #333;
    }
    
    .rotate-up {
        transform: rotate(180deg);
    }

    .dropdown-selected .dropdown-selected-container{
        background-color: #DFDFDF;
        padding: 3px 5px;
        border-radius: 100px;
        margin-right: 2px;
    }

    .dropdown-selected .dropdown-selected-text{
        color: #333333;
    }

    .dropdown-selected .close-selected{
        color: #DFDFDF;
        background-color: #616161;
        padding: 1px 5px;
        border-radius: 100px;
        margin-left: 4px;
        line-height: 100%;
        display: inline-block;
    }
    
    .dropdown-menu {
        position: absolute;
        background: white;
        border: none;
        border-radius: 5px;
        box-shadow: 0 2px 4px #00000040;
        display: flex;
        flex-direction: column;
        z-index: 10;
        margin-top: 5px;
        width: 100%;
    }

    .dropdown-menu .dropdown-menu-title{
        margin: 18px 15px;
        font-size: 12px;
        color: #A9A7A9;
    }

    .dropdown-menu hr{
        border: none;
        height: 1px;
        background-color: #A9A7A9; 
    }

    .dropdown-menu .dropdown-menu-content, .dropdown-menu .dropdown-menu-content-purpose{
        display: flex;
        flex-direction: column;
        font-size: 14px;
        max-height: 150px; 
        overflow-y: auto;
    }

    .dropdown-menu .dropdown-menu-content > div{
        padding: 10px 15px;
    }

    .dropdown-menu .dropdown-menu-content::-webkit-scrollbar {
        width: 6px; 
    }

    .dropdown-menu .dropdown-menu-content::-webkit-scrollbar-track {
        background-color: #F0F0F0;
    }

    .dropdown-menu .dropdown-menu-content::-webkit-scrollbar-thumb {
        background-color: #3366CC;
        border-radius: 5px; 
    }

    .dropdown-menu .dropdown-menu-content::-webkit-scrollbar-thumb:hover {
        background-color: #005bb5; 
    }

    .dropdown-menu .dropdown-menu-content label{
        margin: 8px 0;
        display: flex;
        align-items: center;
    }

    .dropdown-menu .dropdown-menu-content label input{
        margin-right: 8px;
        cursor: pointer;
        transform: scale(1.3);
    }

    .dropdown-menu .dropdown-menu-content-purpose ul li, .options-dropdown ul li, .dropdown-menu-content-brand li{
        padding: 10px 15px;
        cursor: pointer;

        &:hover{
            background-color: #F0F0F0;
        }
    }

    .options-dropdown-container{
        position: relative;
        display: inline-block;
    }

    .options-dropdown{
        position: absolute;
        right: 5px;
        width: 100px;
        font-size: 14px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 4px #00000040;
        z-index: 2;
    }
    
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
        transform: translateY(-10px);
    }
    
    .form-background{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: #0000008f;
        width: 100%;
        height: 100%;
    }

    #no-vehicles-msg, .loading-msg{
        margin: 80px 20px;
        text-align: center;
        font-size: 18px;
        color: #333;
    }

    @media screen and (max-width: 1005px){
        #register-and-filters{
            justify-content: center;
            flex-wrap: wrap;
        }

        #register-vehicle-btn{
            margin-bottom: 15px;
        }
    }

    @media screen and (max-width: 905px){
        #filters{
            justify-content: center;
            flex-wrap: wrap;
        }

        #filters > *, .dropdown-boxes > *{
            margin: auto auto 10px auto;
        }

        #filters .custom-field, #filters .dropdown-boxes, #filters .dropdown-boxes .custom-dropbox{
            width: 100%;
        }
    }

    @media screen and (max-width: 712px){
        table{
            min-width: 0;
        }

        table tr th, table tr td{
            word-break: break-all;
            padding: 3px 6px;
            font-size: 12px;
        }

        table tr td .ellipsis{
            font-size: 22px;
        }
    }

    @media screen and (max-width: 280px){
        table tr th, table tr td{
            padding: 2px;
            font-size: 10px;
        }

        table tr td .ellipsis{
            font-size: 20px;
        }
    }
</style>