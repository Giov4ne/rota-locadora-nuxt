import { ADESOES } from '../../utils/storeTypes/adesoes'

export default{
    [ADESOES](state, payload){
        const url = payload?.like ? `/adesoes?like=${payload.like}` : '/adesoes';
        return new Promise((resolve, reject) => {
            this.$axios.get(url, payload)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(new Error(error));
                });
        });
    }

    // [NOVA_ADESAO](state, payload){
    //     return new Promise((resolve, reject) => {
    //         this.$axios.post('/adesoes', payload)
    //             .then(response => {
    //                 resolve(response);
    //             })
    //             .catch(error => {
    //                 reject(new Error(error));
    //             })
    //     });
    // },

    // [EXCLUIR_ADESAO](state, payload){
    //     return new Promise((resolve, reject) => {
    //         this.$axios.delete('/adesoes/' + payload)
    //             .then(response => {
    //                 resolve(response);
    //             })
    //             .catch(error => {
    //                 reject(new Error(error));
    //             })
    //     });
    // }
}