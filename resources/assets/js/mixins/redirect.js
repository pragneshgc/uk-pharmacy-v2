export default {
    methods: {
        redirectToPrescription(prescriptionID){
            var Ckey = 0;

            axios.get('/esa_login_status')
            .then((response) => {
                Ckey = response.data.data;
                
                if(Ckey != 0){
                    document.cookie = "TARCH="+Ckey+"; domain=esasys.co.uk; max-age=31536000;";
                }

                window.open('https://www.esasys.co.uk/?showPrescription&PRESCRIPTIONID='+prescriptionID, '_blank');
            })
            .catch((error) => {
                Ckey = 0;
            });
        },        
    }
}