<template>
    <div>
        <div class="login-signin-container">
            <form id="login-form" @submit.prevent="login">
                <i class="fas fa-car"></i>
                <h2 class="form-title">Login</h2>
                <div class="custom-field">
                    <label for="email">E-mail</label>
                    <input type="text" class="inputs" v-model="email" name="email" placeholder="Digite o e-mail" required>
                </div>
                <div class="custom-field">
                    <label for="password">Senha</label>
                    <div class="password-input">
                        <input :type="inputType" class="inputs password" v-model="password" name="password" placeholder="Digite a senha" required>
                        <div class="hide-password-btn" :key="showHideBtn" @click="showHidePassword">
                        <i :class="[showHideBtn, 'hide-password-icon']"></i>
                        </div>
                    </div>
                </div>
                <input type="submit" class="submit-btn" value="ENTRAR">
                <NuxtLink to="/signup" class="signin-login-link">Criar conta</NuxtLink>
            </form>
            <span v-if="errorMsg !== ''" class="error-message">{{ errorMsg }}</span>
            

            <!-- <v-form v-model="valid" id="login-form">
                <v-container class="d-flex flex-column justify-center">
                    <v-icon class="fas fa-car" color="red"></v-icon>
                    <h2 class="form-title">Login</h2>

                    <v-text-field
                        label="E-mail"
                        placeholder="Digite o e-mail"
                        outlined
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Senha"
                        placeholder="Digite a senha"
                        hint="Pelo menos 8 caracteres"
                        outlined
                        @click:append="show1 = !show1"
                    ></v-text-field>

                    <v-btn
                        block
                        color="primary"
                        large
                        outlined
                    >
                        ENTRAR
                    </v-btn>

                    <NuxtLink to="/signup" class="signin-login-link">Criar conta</NuxtLink>
                    
                     <v-btn
                        elevation="2"
                        outlined
                        :loading="true"
                        @click=""
                        >
                        <template #counter="{ props: { dark } }">
                            carregando...
                        </template>
                    </v-btn>
                    
                </v-container>
            </v-form> -->
            <ul>
                <li v-for="(user, index) in users" :key="index">
                    {{ user }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import "vuetify/dist/vuetify.min.css";
    import { mapGetters } from 'vuex';
    
    export default{
        name: 'login',
        layout: 'empty',
        data(){
            return{
                inputType: 'password',
                showHideBtn: 'fas fa-eye',
                email: '',
                password: '',
                errorMsg: '',


                // vuetify
                show1: false,
                rules: {
                    required: value => !!value || 'Obrigatório digitar senha',
                    min: v => v.length >= 8 || 'Mínimo 8 caracteres',
                    emailMatch: () => (`The email and password you entered don't match`),
                }
            }
        },
        computed: {
            ...mapGetters('users', ['users', 'totalUsers'])
        },
        methods:{
            showHidePassword(){
                if(this.inputType === 'password'){
                    this.inputType = 'text';
                    this.showHideBtn = 'fas fa-eye-slash';
                } else{
                    this.inputType = 'password';
                    this.showHideBtn = 'fas fa-eye';
                }
            },

            async login(){
                // const user = this.getUserByEmail();
                // if(user){
                //     if(this.password === user.password){
                //         localStorage.setItem('loggedUser', JSON.stringify(user));
                //         this.$router.push('/home');
                //     } else{
                //         this.showError('Senha incorreta!');
                //     }
                // } else{
                //     this.showError('Este e-mail não foi cadastrado!');                
                // }
                try {
                    let response = await this.$auth.loginWith('local', { 
                        data: { 
                            email: this.email, 
                            password: this.password,
                            produto: 'dev'
                        } 
                    })

                    await this.$auth.fetchUser()

                    

                    console.log(this.$auth.user)
                    // const response = await this.$store.dispatch('auth/LOGIN', { 
                        // email: this.email, 
                        // password: this.password,
                        // produto: 'dev'
                    // });
// 
                    // this.$auth.setUserToken(response.token);
                    // this.$axios.setToken(response.token);
// 
                    // this.$store.dispatch('auth/ME')
                        // .then(response => { console.log(response) })
// 
                    console.log(response);
                } catch (err) {
                    console.log(err);
                }
            },

            getUserByEmail(){
                return this.users.find(user => this.email === user.email) || null;
            },

            showError(message) {
                this.errorMsg = message;

                setTimeout(() => {
                    this.errorMsg = '';
                }, 5000);
            }
        }
    }
</script>

<style >
  
</style>