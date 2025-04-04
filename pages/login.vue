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
            

            <v-form v-model="valid" id="login-form">
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
                    
                    <!-- <v-btn
                        elevation="2"
                        outlined
                        :loading="true"
                        @click=""
                        >
                        <template #counter="{ props: { dark } }">
                            carregando...
                        </template>
                    </v-btn> -->
                    
                </v-container>
            </v-form>
        </div>
    </div>
</template>

<script>
    import "vuetify/dist/vuetify.min.css";
    
    export default{
        name: 'login',
        layout: 'empty',
        data(){
            return{
                inputType: 'password',
                showHideBtn: 'fas fa-eye',
                email: '',
                password: '',
                registeredUsers: [],
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

            login(){
                const user = this.getUserByEmail();
                if(user){
                    if(this.password === user.password){
                        localStorage.setItem('loggedUser', JSON.stringify(user));
                        
                        // as linhas abaixo chamam os mutations definidos em store/user
                        this.$store.commit('user/setUsername', user.username);
                        this.$store.commit('user/setEmail', user.email);
                        this.$store.commit('user/setPassword', user.password);
                        this.$store.commit('user/setBirthDate', user.birthDate);

                        this.$router.push('/home');
                    } else{
                        this.showError('Senha incorreta!');
                    }
                } else{
                    this.showError('Este e-mail não foi cadastrado!');                
                }
            },

            getUserByEmail(){
                return this.registeredUsers.find(user => this.email === user.email) || null;
            },

            showError(message) {
                this.errorMsg = message;

                setTimeout(() => {
                    this.errorMsg = '';
                }, 5000);
            }
        },
        mounted(){
            this.registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) !== null ? JSON.parse(localStorage.getItem('registeredUsers')) : [];
        }
    }
</script>

<style >
  
</style>