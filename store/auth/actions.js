import { LOGIN, ME } from '../../utils/storeTypes/auth'

export default{
    [LOGIN](state, payload){
        return new Promise((resolve, reject) => {
            this.$axios.post('/login', payload, { 
                headers: {
                    'User-Agent': 'eurota'
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
            this.$axios.post('/me', payload)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(new Error(error));
                })
        });
    }

}