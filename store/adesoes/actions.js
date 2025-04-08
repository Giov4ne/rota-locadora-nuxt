import { ADESOES } from '../../utils/storeTypes/adesoes'

export default{
    [ADESOES](state, payload){
        return new Promise((resolve, reject) => {
            this.$axios.get('/adesoes', payload)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(new Error(error));
                })
        });
    }
}