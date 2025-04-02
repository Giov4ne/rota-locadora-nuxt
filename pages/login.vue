<template>
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
    </div>
</template>

<script>
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
                errorMsg: ''
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

<style scoped>
  
</style>