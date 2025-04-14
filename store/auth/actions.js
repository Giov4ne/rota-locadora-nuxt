import { LOGIN, ME, LOGOUT } from '../../utils/storeTypes/auth'

export default{
    [LOGIN](state, payload){
        return new Promise((resolve, reject) => {
            this.$axios.post('/login', payload, { 
                headers: {
                    'User-Agent': 'EuRota'
                }
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(new Error(error));
                })
        });
    },

    [ME](state, payload){
        return new Promise((resolve, reject) => {
            this.$axios.get('/me', payload)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(new Error(error));
                })
        });
    },

    [LOGOUT](state, payload){
        return new Promise((resolve, reject) => {
            this.$axios.get('/logout', payload)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(new Error(error));
                })
        });
    }

}