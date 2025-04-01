<template>
    <div class="login-signin-container">
        <form id="login-form" @submit.prevent="login">
            <span class="fa fa-car"></span>
            <h2 class="form-title">Login</h2>
            <div class="custom-field">
                <label for="email">E-mail</label>
                <input type="text" class="inputs" v-model="email" name="email" placeholder="Digite o e-mail" required>
            </div>
            <div class="custom-field">
                <label for="password">Senha</label>
                <div class="password-input">
                    <input :type="inputType" class="inputs password" v-model="password" name="password" placeholder="Digite a senha" required>
                    <span :class="showHideBtn" @click="showHidePassword"></span>
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
        data(){
            return{
                inputType: 'password',
                showHideBtn: 'fa fa-eye',
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
                    this.showHideBtn = 'fa fa-eye-slash';
                } else{
                    this.inputType = 'password';
                    this.showHideBtn = 'fa fa-eye';
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", serif;
}

input{
  outline: none;
  border: none;
}

.login-signin-container{
  background-image: url('../assets/cars-background.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ececec;
}

#login-form, #signin-form{
  background-color: #fff;
  width: 480px;
  border-radius: 30px;
  box-shadow: 0 2px 10px #00000040;
  padding: 35px 37px 37px 37px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#login-form .fa-car, #signin-form .fa-car{
  color: #007DF0;
  font-size: 80px;
}

.form-title{
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 22px;
  cursor: default;
}

.custom-field{
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #d8d8d8;
  width: 100%;
  border-radius: 5px;
}

#login-form .custom-field, #signin-form .custom-field{
  margin-bottom: 20px;
}

.custom-field label{
  position: absolute;
  top: -8px;
  left: 8px;
  background-color: #fff;
  padding: 0 5px;
  font-size: 12px;
  color: #333;
}

.inputs{
  background-color: transparent;
  padding: 12px;
  font-size: 12px;
  color: #333;

  &::placeholder, &:disabled{
    color: #A9A7A9;
  }

  &:hover{
    background-color: #f0f0f086;
  }
}

input[type="date"]{
  color: #A9A7A9;
}

.password-input{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.password{
  width: 90%;
}

.fa-eye, .fa-eye-slash{
  font-size: 19px;
  width: 10%;
  text-align: center;
  color: #A9A7A9;
  cursor: pointer;

  &:hover{
    color: #333;
  }
}

.submit-btn{
  background-color: #007DF0;
  color: #fff;
  font-size: 16px;
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  margin: 12px 0 30px 0;
  cursor: pointer;

  &:hover{
      background-color: #518bff;
  }
}

.signin-login-link{
  font-size: 16px;
  color: #A9A7A9;
  text-decoration: none;

  &:hover{
      text-decoration: underline;
  }
}

.container{
    margin-top: 60px;
    padding: 32px 27px;
}

.search-btn, .erase-btn{
    font-size: 20px;
    padding: 5px 8px;
    border: 1px solid #d8d8d8;
    background-color: #fff;
    cursor: pointer;

    &:hover{
      background-color: #F0F0F0;
    }
}

.search-btn{
    border-radius: 5px 0 0 5px;
    color: #007DF0;
}

.erase-btn{
    border-radius: 0 5px 5px 0;
    border-left: transparent;
    color: #A9A7A9;
}

.filter-btn{
    font-size: 25px;
    color: #007DF0;
    cursor: pointer;
}

ul li{
  list-style: none;
}

.error-message, .success-message{
  background-color: #E8363B;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  position: fixed;
  top: 7%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}

.success-message{
  background-color: #4CAF50;
}

@media screen and (max-width: 550px){
  #login-form, #signin-form{
    width: 92%;
    padding: 28px 30px 30px 30px;
  }

  .fa-eye, .fa-eye-slash{
    width: 38px;
  }
}

@media screen and (max-width: 490px){
  .container{
      margin-top: 105px;
  }
}

@media screen and (max-width: 348px){
  .container{
    margin-top: 160px;
  }
}

@media screen and (max-width: 180px){
  .container{
    margin-top: 175px;
  }
}
</style>