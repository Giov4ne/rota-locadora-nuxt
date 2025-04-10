export default{
    methods:{
        formatDate(dateString, format = 'DD/MM/YYYY HH:mm:ss'){
            if(!dateString) return '';
            try{
                return this.$moment(dateString).format(format);
            } catch{
                return 'Erro: não foi possível formatar a data';
            }
        }
    }
}