import { VEICULO } from "../../utils/storeTypes/ultimaPosicao";

export default{
    [VEICULO](state, payload){
        return new Promise((resolve, reject) => {
            this.$axios.get(`/ultimaPosicao/${payload}`)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(new Error(error));
                });
        });
    }

    // [ADESOES](state, payload){
        // const url = payload?.like ? `/adesoes?like=${payload.like}` : '/adesoes';
        // return new Promise((resolve, reject) => {
            // this.$axios.get(url, payload)
                // .then(response => {
                    // resolve(response);
                // })
                // .catch(error => {
                    // reject(new Error(error));
                // })
        // });
    // }
}