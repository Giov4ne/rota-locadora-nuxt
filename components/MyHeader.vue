<template>
    
        <header>
            <nav id="header-navigation">
                <NuxtLink to="/home" id="rl-logo">
                    <i class="fas fa-car" id="logo-icon"></i>
                    <span id="logo-text">RotaLocadora</span>
                </NuxtLink>
                <div id="pages">
                    <NuxtLink to="/home" class="page">VEÍCULOS</NuxtLink>
                    <NuxtLink to="/activity-history" class="page">HISTÓRICO DE ATIVIDADES</NuxtLink>
                    <NuxtLink to="/map" class="page">MAPA</NuxtLink>
                </div>
            </nav>
            <div id="user-info">
                <div id="greeting">
                    <p>Olá</p>
                    <p id="name">{{ username }}</p>
                </div>
                <div class="exit-dropdown-container">
                    <img src="../assets/user.png" alt="user image" id="user-img" @click="exitToggleDropdown">
                    <transition name="fade">
                        <div v-if="exitIsOpen" @click="logout" class="exit-dropdown">
                            <i class="fas fa-right-from-bracket"></i>
                            <span>Sair</span>
                        </div>
                    </transition>
                </div>
            </div>
        </header> 
   


        
            <!-- <v-app-bar fixed>
                <template #default>
                    <div class="d-flex justify-space-between header-test">
                        
                        <NuxtLink to="/home" id="rl-logo">
                            <v-icon>mdi-car</v-icon>
                            <v-toolbar-title>RotaLocadora</v-toolbar-title>
                        </NuxtLink>
                        <div id="pages">
                            <NuxtLink to="/home" class="page">VEÍCULOS</NuxtLink>
                            <NuxtLink to="/activity-history" class="page">HISTÓRICO DE ATIVIDADES</NuxtLink>
                        </div>
                        <div id="greeting">
                            <p>Olá</p>
                            <p id="name">{{ getUsername }}</p>
                        </div>
                        <v-avatar size="42">
                            <img
                                @click="exitToggleDropdown"
                                src="../assets/user.png"
                                alt="Usuário"
                            >
                        </v-avatar>
                        <transition name="fade">
                            <div v-if="exitIsOpen" @click="logout" class="exit-dropdown">
                                <i class="fas fa-right-from-bracket"></i>
                                <span>Sair</span>
                            </div>
                        </transition>
                    </div>
                </template>
            </v-app-bar> -->
        
</template>

<script>
import { mapGetters } from 'vuex';
    export default{
        name: 'MyHeader',
        data(){
            return{
                exitIsOpen: false,
                // username: ''
            }
        },

        methods:{
            exitToggleDropdown(){
                this.exitIsOpen = !this.exitIsOpen;
            },

            async logout(){
                // localStorage.removeItem('loggedUser');
                await this.$auth.logout()
                    .then((response) => {
                        console.log(response)
                        this.$router.push('/login');
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }

            // async loadUser(){
            // }
        },
        
        computed:{
            // ...mapGetters('auth', ['user']),

            username(){
                // console.log('CONSOLE_HEADER', this.$store.state);
                // return 'ola mundo';
                return this.$store.state.auth.user.usuario.nome
            }

            // getUsername(){
            //     // return this.$store.state.auth.user.name;
            //     // if(this.username)
            //         // return this.username;
            // return this.username !== '' ? this.username : 'Usuário';
            // }
        }
    
        // async fetch(){
        //     await this.$auth.fetchUser()
        //         .then((response) => {
        //             this.username = response.data.session.usuario.nome
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         })
        // }

        // mounted(){
        //     this.loadUser();
        // }
    }
</script>

<style scoped>
    .header-test{
        width: 100%;
        padding: 8px;
    }   

    header, #header-navigation, #user-info, #rl-logo{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    header, #header-navigation{
        justify-content: space-between;
    }

    #header-navigation{
        justify-content: flex-start;
    }

    header{
        background-color: #F0F0F0;
        padding: 7px 15px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }

    #rl-logo{
        border: 2px solid #007DF0;
        border-radius: 5px;
        width: 188px;
        margin-right: 20px;
        background-color: #fff;
        text-decoration: none;
        align-items: center;
    }

    #logo-icon{
        color: #fff;
        font-size: 28px;
        background-color: #007DF0;
        padding: 2px 4px 2px 2px;
    }

    #logo-text{
        color: #007DF0;
        font-size: 20px;
        font-weight: 700;
        margin: 0 auto;
        padding: 2px 10px;
    }

    .page{
        background-color: #DFDFDF;
        color: #000;
        padding: 12px;
        border-radius: 5px;
        margin: 0 8px;
        text-decoration: none;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 1px;

        &:hover{
            background-color: #d3d3d3;
        }
    }

    .nuxt-link-active.page, .nuxt-link-exact-active.page {
        background-color: #007DF01A;
        color: #007DF0;
    }

    #greeting{
        font-size: 14px;
        line-height: 16.41px;
        color: #333;
        cursor: default;
        letter-spacing: 1px;
    }

    #name{
        font-weight: 700;
    }

    #user-img{
        width: 45px;
        border: 3px solid #333;
        border-radius: 100px;
        margin-left: 14px;
        cursor: pointer;
    }

    .exit-dropdown-container{
        position: relative;
        display: inline-block;
    }

    .exit-dropdown {
        position: absolute;
        right: 5px;
        width: 100px;
        font-size: 14px;
        background-color: #fff;
        padding: 12px;
        border-radius: 5px;
        box-shadow: 0 2px 4px #00000040;
        cursor: pointer;
        color: #E8363B;
        z-index: 1;

        &:hover{
            background-color: #d8d8d8;
        }
    }

    .exit-dropdown .fa-right-from-bracket{
        margin-right: 5px;
        font-size: 16px;
    }

    @media screen and (max-width: 780px){
        #rl-logo{
            display: none;
        }
    }

    @media screen and (max-width: 570px){
        header, #header-navigation{
            flex-wrap: wrap;
            justify-content: center;
        }

        #pages{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;   
        }

        .page{
            margin: 0 8px 10px 8px;
        }
    }
</style>