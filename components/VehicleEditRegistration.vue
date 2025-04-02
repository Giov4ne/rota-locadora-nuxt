<template>
    <div>
        <div class="form-background"></div>
        <form v-if="isEditing" @submit.prevent="validateForm" id="vehicle-edit-registration-form">
            <div class="form-header">
                <h2 class="form-header-title">Edição de Veículo</h2>
                <span class="close-form" @click="close">X</span>
            </div>
            <div class="form-body">
                <div class="custom-field" id="plate">
                    <label for="plate-e">Placa</label>
                    <input v-model="vehicleToEdit.plate" disabled type="text" class="inputs" name="plate" id="plate-e">
                </div>
                <div id="brand">
                    <BrandsDropdown :checkbox=false v-model="vehicleToEdit.brand" @click.prevent></BrandsDropdown>
                </div> 
                <div class="custom-field" id="model">
                    <label for="model-e">Modelo</label>
                    <input v-model="vehicleToEdit.model" type="text" class="inputs" name="model" placeholder="Digite o modelo do veículo" id="model-e">
                </div>
                <div class="custom-field" id="year">
                    <label for="year-e">Ano</label>
                    <input v-model="vehicleToEdit.year" @input="validateYear" minlength="4" maxlength="4" type="text" class="inputs" name="year" placeholder="Selecione o ano do veículo" id="year-e">
                </div>
                <div class="custom-field" id="color">
                    <label for="color-e">Cor</label>
                    <input v-model="vehicleToEdit.color" type="text" class="inputs" name="color" placeholder="Digite a cor do veículo" id="color-e">
                </div>
                <div id="purpose">
                    <PurposesDropdown v-model="vehicleToEdit.purpose" @click.prevent></PurposesDropdown>
                </div>
                <p id="resting-place">Local de repouso do veículo</p>
                <div class="custom-field" id="latitude">
                    <label for="latitude-e">Latitude</label>
                    <input v-model="vehicleToEdit.latitude" @input="validateLatitude" type="text" class="inputs" name="latitude" placeholder="Digite a latitude" id="latitude-e">
                </div>
                <div class="custom-field" id="longitude">
                    <label for="longitude-e">Longitude</label>
                    <input v-model="vehicleToEdit.longitude" @input="validateLongitude" type="text" class="inputs" name="longitude" placeholder="Digite a longitude" id="longitude-e">
                </div>
                <div id="confort-level">
                    <p id="confort-level-p">Nível de conforto do veículo</p>
                    <StarRating v-model="vehicleToEdit.confortLevel" />
                </div>
                <label id="zero" for="zero-e">
                    <input type="checkbox" v-model="vehicleToEdit.zero" name="zero" id="zero-e">
                    Veículo zero-quilômetro
                </label>
                <input type="submit" id="register-vehicle-form-btn" value="Salvar">
            </div>
        </form>
    
        <form v-else @submit.prevent="validateForm" id="vehicle-edit-registration-form">
            <div class="form-header">
                <h2 class="form-header-title">Cadastro de Veículo</h2>
                <span class="close-form" @click="close">X</span>
            </div>
            <div class="form-body">
                <div class="custom-field" id="plate">
                    <label for="plate-c">Placa</label>
                    <input v-model="newVehicle.plate" @input="formatPlate" minlength="8" maxlength="8" type="text" class="inputs" name="plate" required placeholder="Digite a placa do veículo" id="plate-c">
                </div>
                <div id="brand">
                    <BrandsDropdown :checkbox=false v-model="newVehicle.brand"></BrandsDropdown>
                </div> 
                <div class="custom-field" id="model">
                    <label for="model-c">Modelo</label>
                    <input v-model="newVehicle.model" type="text" class="inputs" name="model" required placeholder="Digite o modelo do veículo" id="model-c">
                </div>
                <div class="custom-field" id="year">
                    <label for="year-c">Ano</label>
                    <input v-model="newVehicle.year" @input="validateYear" minlength="4" maxlength="4" type="text" class="inputs" name="year" required placeholder="Selecione o ano do veículo" id="year-c">
                </div>
                <div class="custom-field" id="color">
                    <label for="color-c">Cor</label>
                    <input v-model="newVehicle.color" type="text" class="inputs" name="color" required placeholder="Digite a cor do veículo" id="color-c">
                </div>
                <div id="purpose">
                    <PurposesDropdown v-model="newVehicle.purpose"></PurposesDropdown>
                </div>
                <p id="resting-place">Local de repouso do veículo</p>
                <div class="custom-field" id="latitude">
                    <label for="latitude-c">Latitude</label>
                    <input v-model="newVehicle.latitude" @input="validateLatitude" type="text" class="inputs" name="latitude" required placeholder="Digite a latitude" id="latitude-c">
                </div>
                <div class="custom-field" id="longitude">
                    <label for="longitude-c">Longitude</label>
                    <input v-model="newVehicle.longitude" @input="validateLongitude" type="text" class="inputs" name="longitude" required placeholder="Digite a longitude" id="longitude-c">
                </div>
                <div id="confort-level">
                    <p id="confort-level-p">Nível de conforto do veículo</p>
                    <StarRating v-model="newVehicle.confortLevel"></StarRating>
                </div>
                <label id="zero" for="zero-c">
                    <input type="checkbox" v-model="newVehicle.zero" name="zero" id="zero-c">
                    Veículo zero-quilômetro
                </label>
                <input type="submit" id="register-vehicle-form-btn" value="Salvar">
            </div>
        </form>
        <span v-if="errorMsg !== ''" class="error-message">{{ errorMsg }}</span>
    </div>
</template>

<script>
import BrandsDropdown from './BrandsDropdown.vue';
import PurposesDropdown from './PurposesDropdown.vue';
import StarRating from './StarRating.vue';

    export default{
        name: 'VehicleRegistration',
        components:{
            BrandsDropdown,
            PurposesDropdown,
            StarRating
        },
        props:{
            vehicle: {
                type: Object,
                default: () => null
            },
            allVehicles: Array,
            allActivities: Array
        },
        computed: {
            isEditing(){
                return this.vehicle !== null;
            },
            isPlateValid(){
                return /^[A-Z]{3}-\d{4}$/.test(this.isEditing ? this.vehicleToEdit.plate : this.newVehicle.plate);
            },
            isBrandSelected(){
                return this.isEditing ? this.vehicleToEdit.brand !== '' : this.newVehicle.brand !== '';
            },
            isYearValid(){
                const year = parseInt(this.isEditing ? this.vehicleToEdit.year : this.newVehicle.year);
                return year >= 1880 && year <= new Date().getFullYear();
            },
            isPurposeSelected(){
                return this.isEditing ? this.vehicleToEdit.purpose !== '' : this.newVehicle.purpose !== '';
            },
            isLatLongValid(){
                const lat = parseFloat(this.isEditing ? this.vehicleToEdit.latitude : this.newVehicle.latitude);
                const long = parseFloat(this.isEditing ? this.vehicleToEdit.longitude : this.newVehicle.longitude);
                return (lat >= -90 && lat <= 90) && (long >= -180 && long <= 180);
            },
            isConfortLevelSelected(){
                return this.isEditing ? this.vehicleToEdit.confortLevel > 0 : this.newVehicle.confortLevel > 0;
            },
            vehicleExists(){
                return this.vehicles.some(vehicle => this.newVehicle.plate === vehicle.plate);
            },
            getVehicleToEditIndex(){
                return this.vehicles.findIndex(vehicle => this.vehicleToEdit.plate === vehicle.plate);
            }
        },
        data(){
            return {
                newVehicle: { plate: "", brand: "", model: "", year: "", color: "", purpose: "", zero: false, confortLevel: 0, latitude: "", longitude: "" },

                vehicleToEdit: this.vehicle 
                ? { ...this.vehicle } // Copia para não alterar diretamente a prop
                : this.newVehicle,

                vehicles: this.allVehicles,

                errorMsg: '',

                activities: this.allActivities
            };
        },
        methods:{
            close(){
                this.$emit('onClose');
            },

            formatPlate() {
                let rawValue = this.newVehicle.plate.toUpperCase().replace(/[^A-Z0-9]/g, ""); // Remove tudo que não for letra ou número

                if (rawValue.length > 3) {
                    rawValue = rawValue.replace(/^([A-Z]{3})(\d{0,4})/, "$1-$2"); // Adiciona o hífen depois de 3 letras
                }

                this.newVehicle.plate = rawValue.slice(0, 8); // Garante no máximo 8 caracteres (ABC-1234)
            },

            validateForm(event){
                const form = event.target;
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
                if (!this.isPlateValid)
                    this.showError('Placa inválida!');
                else if (!this.isBrandSelected)
                    this.showError('Selecione uma marca!');
                else if (!this.isYearValid)
                    this.showError('Ano inválido!');
                else if (!this.isPurposeSelected)
                    this.showError('Selecione um propósito de uso!');
                else if (!this.isLatLongValid)
                    this.showError('Latitude e/ou longitude inválidos!');
                else if (!this.isConfortLevelSelected)
                    this.showError('Selecione o nível de conforto!');
                else if(this.isEditing)
                    this.editVehicle();
                else
                    this.registerVehicle();
            },

            showError(message) {
                this.errorMsg = message;

                setTimeout(() => {
                    this.errorMsg = '';
                }, 5000);
            },

            validateYear(event){
                let year = event.target.value.replace(/\D/g, "");

                if (year.length > 4) {
                    year = year.slice(0, 4);
                }

                if(this.isEditing)
                    this.vehicleToEdit.year = year;
                else
                    this.newVehicle.year = year;
            },

            validateLatitude(event) {
                let lat = event.target.value.replace(/[^0-9.-]/g, "");
                lat = lat.replace(/(?!^)-/g, "");
                lat = lat.replace(/(\..*)\./g, "$1");

                if(this.isEditing)
                    this.vehicleToEdit.latitude = lat;
                else
                    this.newVehicle.latitude = lat;
            },

            validateLongitude(event) {
                let long = event.target.value.replace(/[^0-9.-]/g, "");
                long = long.replace(/(?!^)-/g, "");
                long = long.replace(/(\..*)\./g, "$1");

                if(this.isEditing)
                    this.vehicleToEdit.longitude = long;
                else
                    this.newVehicle.longitude = long;
            },

            editVehicle(){
                const index = this.getVehicleToEditIndex;
                if(index !== -1){
                    this.vehicles[index] = { ...this.vehicles[index], ...this.vehicleToEdit };
                    localStorage.setItem('vehicles', JSON.stringify(this.vehicles));
                    this.addActivity('edit', this.vehicles[index].plate);
                    this.close();
                } else{
                    this.showError('Veículo não encontrado!');
                }
            },

            registerVehicle(){
                if(!this.vehicleExists){
                    this.vehicles.push(this.newVehicle);
                    localStorage.setItem('vehicles', JSON.stringify(this.vehicles));
                    this.addActivity('register', this.newVehicle.plate);
                    this.close();
                } else{
                    this.showError('Essa placa já foi cadastrada!');
                }
            },

            addActivity(activityType, vehiclePlate){
                const today = new Date().toLocaleDateString('pt-BR');
                const timeNow = new Date().toLocaleTimeString('pt-BR', { hour12: false });
                this.activities.push({ type: activityType, plate: vehiclePlate, date: today, time: timeNow });
                localStorage.setItem('activityHistory', JSON.stringify(this.activities));
            }
        }
    }
</script>

<style>

    #vehicle-edit-registration-form{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        width: 625px;
    }

    .form-header{
        background-color: #007DF0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px 30px 25px 20px;
        border-radius: 5px 5px 0 0;
        color: #fff;
        width: 100%;
    }

    .form-header-title{
        font-size: 18px;
        font-weight: 400;
        cursor: default;
    }

    .close-form{
        font-size: 22px;
        font-weight: 700;
        cursor: pointer;
    }

    .form-body{
        background-color: #fff;
        padding: 28px;
        border-radius: 0 0 5px 5px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(8, 1fr);
        gap: 12px;
        max-height: 500px;
    }

    .form-body .custom-dropbox{
        width: 100%;
    }

    #plate{
        grid-area: 1 / 1 / 2 / 2;
    }

    #brand{
        grid-area: 1 / 2 / 2 / 3;
    }

    #model{
        grid-area: 2 / 1 / 3 / 2;
    }

    #year{
        grid-area: 2 / 2 / 3 / 3;
    }

    #color{
        grid-area: 3 / 1 / 4 / 2;
    }

    #purpose{
        grid-area: 3 / 2 / 4 / 3;
    }

    #resting-place{
        grid-area: 4 / 1 / 5 / 3;
    }

    #latitude{
        grid-area: 5 / 1 / 6 / 2;
    }

    #longitude{
        grid-area: 5 / 2 / 6 / 3;
    }

    #confort-level{
        grid-area: 6 / 1 / 7 / 3;
        display: flex;
    }

    #zero{
        grid-area: 7 / 1 / 8 / 3;
    }

    #register-vehicle-form-btn{
        grid-area: 8 / 1 / 9 / 3;
        background-color: #007DF0;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        padding: 8px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 80px;
        height: 40px;
        margin: 0 0 0 auto;

        &:hover{
            background-color: #518bff;
        }
    }

    #resting-place, #confort-level-p, #zero{
        color: #333;
        font-size: 14px;
        display: flex;
        align-items: center;
    }

    #confort-level-p{
        margin-right: 16px;
    }

    #zero input{
        margin-right: 8px;
        cursor: pointer;
        transform: scale(1.3);
    }

    @media screen and (max-width: 680px){
        #vehicle-edit-registration-form{
            width: 92%;
        }

        .form-header{
            padding: 20px 25px 20px 15px;
        }

        .form-body{
            padding: 23px;
        }
    }

    @media screen and (max-width: 475px){
        .form-header-title{
            margin-right: 6px;
        }

        .form-body{
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        }

        .form-body::-webkit-scrollbar {
            width: 6px; 
        }

        .form-body::-webkit-scrollbar-track {
            background-color: #F0F0F0;
        }

        .form-body::-webkit-scrollbar-thumb {
            background-color: #3366CC; 
            border-radius: 5px;         
        }

        .form-body::-webkit-scrollbar-thumb:hover {
            background-color: #005bb5; 
        }

        #resting-place{
            margin: 12px 0 5px 0;
        }

        #confort-level{
            flex-direction: column;
        }

        #confort-level-p{
            margin: 12px 0 0 0;
        }
    }
</style>