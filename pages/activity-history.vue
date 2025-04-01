<template>
    <MyHeader></MyHeader>
    <div class="container">
        <section id="filters-section">
            <div class="custom-field">
                <label for="plate">Placa</label>
                <input type="text" class="inputs" name="plate" placeholder="Digite a placa do veículo" v-model="plateInput">
            </div>
            <div id="search-erase">
                <button class="search-btn">
                    <span class="fa fa-search"></span>
                </button>
                <button class="erase-btn" @click="erase">
                    <span class="fa fa-eraser"></span>
                </button>
            </div>
            <span class="fa fa-filter filter-btn"></span>
        </section>
        <main>
            <ul v-if="activities.length" id="activity-list">
                <li v-for="(activity, index) in filteredActivities" :key="index">
                    <span :class="getActivityIcon(activity.type)"></span>
                    Veículo <strong>{{ activity.plate }}</strong> {{ getActivityTypeToString(activity.type) }} em {{ activity.date }} às {{ activity.time }}
                </li>
            </ul>
            <p v-else id="no-history-activity">Não há veículos cadastrados até o momento...</p>
        </main>
        <MyPagination v-if="activities.length >= 10"></MyPagination>
    </div>
</template>

<script>
import MyHeader from '../components/MyHeader.vue';
import MyPagination from '../components/MyPagination.vue';

    export default{
        name: 'activity-history',
        components:{
            MyHeader,
            MyPagination
        },
        data(){
            return{
                activities: [],
                filteredActivities: [],
                plateInput: ''
            }
        },
        methods:{
            erase(){
                this.plateInput = '';
            },

            getActivityIcon(type){
                let icon = '';
                switch(type){
                    case 'register':
                        icon = 'fa fa-plus';
                        break;
                    case 'edit':
                        icon = 'fa fa-pencil';
                        break;
                    case 'delete':
                        icon = 'fa fa-trash';
                        break;
                }
                return icon;
            },

            getActivityTypeToString(type){
                let string = '';
                switch(type){
                    case 'register':
                        string = 'cadastrado';
                        break;
                    case 'edit':
                        string = 'editado';
                        break;
                    case 'delete':
                        string = 'deletado';
                        break;
                }
                return string.toUpperCase();
            },

            filterActivities(){
                if (!this.plateInput) {
                    this.filteredActivities = this.activities;
                    return;
                }
                const searchPlate = this.plateInput.toLowerCase();

                this.filteredActivities = this.activities.filter(activity => {
                    return activity.plate.toLowerCase().includes(searchPlate);
                });
            }
        },

        watch: {
            plateInput: 'filterActivities'
        },
        mounted(){
            this.activities = JSON.parse(localStorage.getItem('activityHistory')) !== null ? JSON.parse(localStorage.getItem('activityHistory')) : [];
            this.filteredActivities = this.activities;
        }
    }
</script>

<style>

    #filters-section > *{
        margin: auto 8px auto 8px;
    }
    #filters-section{
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    #filters-section .custom-field{
        width: 255px;
    }

    #activity-list{
        width: 100%;
        margin: 28px 0;
        box-shadow: 0 2px 8px #00000040;
        cursor: default;
        border-radius: 5px;
    }

    #activity-list li{
        padding: 12px;
        color: #333;
        font-size: 14px;
    }

    #activity-list li:not(:first-child){
        border-top: 1px solid #E1E1E1;
    }

    #activity-list li .fa{
        margin-right: 10px;
        font-size: 19px;
    }

    #activity-list li .fa-plus{
        color: #4CAF50;
    }

    #activity-list li .fa-pencil{
        color: #007DF0;
    }

    #activity-list li .fa-trash{
        color: #E8363B;
    }

    #no-history-activity{
        margin: 80px 20px;
        text-align: center;
        font-size: 18px;
        color: #333;
    }

    @media screen and (max-width: 480px){
        #filters-section{
            flex-wrap: wrap;
            justify-content: center;
        }

        #filters-section .custom-field{
            width: 100%;
            margin: 0 0 10px 0;
        }

        #search-erase{
            display: flex;
            flex-wrap: nowrap;
            margin: 0 0 10px 0;
        }
    } 

    @media screen and (max-width: 180px){
        #activity-list li{
            padding: 10px;
            word-wrap: break-word;
        }
    }
</style>