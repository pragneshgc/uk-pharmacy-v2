export default{
    methods: {
        logSystemActivity(id, type, messageKey = 0, data, callback = false){
            axios.post(`/logs/system/${id}`, {type:type, data: data, messageKey: messageKey})
            .then((response) => {
                if(callback){
                    callback();
                }
            })
            .catch((error) => {
                console.warn(error);
            });  
        }
    },
}