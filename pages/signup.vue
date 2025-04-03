<template>
    <div class="login-signin-container">
        <form @submit.prevent="validateForm" @submit="registerUser" id="signin-form">
            <i class="fas fa-car"></i>
            <h2 class="form-title">Novo Cadastro</h2>
            <div class="custom-field">
                <label for="username">Nome de Usuário</label>
                <input type="text" class="inputs" v-model="username" placeholder="Digite o nome do usuário" required pattern=".{3,}" title="O nome de usuário deve ter pelo menos 3 caracteres">
            </div>
            <div class="custom-field">
                <label for="birthday">Data de nascimento</label> 
                <input type="date" class="inputs" v-model="birthDate" :style="dateColorStyle" required :max="maxDate" :min="minDate">
            </div>
            <div class="custom-field">
                <label for="email">E-mail</label>
                <input type="email" class="inputs" v-model="email" placeholder="Digite o e-mail" required>
            </div>
            <div class="custom-field">
                <label for="password">Senha</label>
                <div class="password-input">
                    <input :type="inputType" class="inputs password" v-model="password" placeholder="Digite a senha" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$" title="A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um caractere especial e um número">
                    <div class="hide-password-btn" :key="showHideBtn" @click="showHidePassword">
                        <i :class="[showHideBtn, 'hide-password-icon']"></i>
                    </div>
                </div>
            </div>
            <input type="submit" class="submit-btn" value="CADASTRAR">
            <NuxtLink to="/login" class="signin-login-link">Fazer login</NuxtLink>
        </form>


            <v-form v-model="valid" id="signin-form">
                <v-container class="d-flex justify-center">
                    <i class="fas fa-car"></i>
                    <h2 class="form-title">Novo Cadastro</h2>

                    <v-text-field
                        label="Nome de Usuário"
                        placeholder="Digite o nome do usuário"
                        outlined
                    ></v-text-field>
                    




                    
                    <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date"
                                label="Data de Nascimento"
                                append-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                outlined
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="date"
                            @input="menu2 = false"
                        ></v-date-picker>
                    </v-menu>






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
                        counter
                        outlined
                        @click:append="show1 = !show1"
                    ></v-text-field>

                    <v-btn
                        block
                        color="primary"
                        large
                    >
                        ENTRAR
                    </v-btn>

                    <NuxtLink to="/login" class="signin-login-link">Fazer login</NuxtLink>
                    
                </v-container>
            </v-form>
        <span v-if="errorMsg !== ''" class="error-message">{{ errorMsg }}</span>
    </div>
</template>

<script>
    export default {
        name: 'signup',
        layout: 'empty',
        data() {
            return {
                username: '',
                birthDate: '',
                email: '',
                password: '',
                inputType: 'password',
                showHideBtn: 'fa fa-eye',
                registeredUsers: [],
                errorMsg: '',


                // vuetify
                show1: false,
                rules: {
                    required: value => !!value || 'Obrigatório digitar senha',
                    min: v => v.length >= 8 || 'Mínimo 8 caracteres',
                    emailMatch: () => (`The email and password you entered don't match`),
                },

                // vuetify
                date: '',
                menu: false,
                modal: false,
                menu2: false
            };
        },
        computed: {
            maxDate() {
                return new Date().toISOString().split("T")[0];
            },
            minDate() {
                return "1900-01-01";
            },
            dateColorStyle() {
                return {
                    color: this.birthDate ? "#333" : "#A9A7A9"
                };
            },
            userExists(){
                return this.registeredUsers.some(user => this.email === user.email);
            }
        },
        methods: {
            showHidePassword() {
                if(this.inputType === 'password'){
                    this.inputType = 'text';
                    this.showHideBtn = 'fa fa-eye-slash';
                } else{
                    this.inputType = 'password';
                    this.showHideBtn = 'fa fa-eye';
                }
            },

            validateForm(event) {
                const form = event.target;
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
            },

            registerUser(){
                if(!this.userExists){
                    this.registeredUsers.push({
                        username: this.username,
                        birthDate: this.birthDate,
                        email: this.email,
                        password: this.password
                    });
                    localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));
                    this.$router.push('/login');
                } else{
                    this.showError('Já existe um usuário cadastrado com este e-mail!');
                }
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
            console.log(this.registeredUsers);
        }
    };
</script>

<style>

</style>