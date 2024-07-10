export default {
    methods: {
        scanError: function (response) {
            let audio = new Audio('/audio/alarm.mp3');
            audio.play();

            this.$swal({
                position: 'center',
                type: 'error',
                title: 'Issue!',
                showConfirmButton: false,
                timer: 2500,
                //toast: true,
                text: response,
            });
        },
        scanSuccess: function (response) {
            this.$swal({
                position: 'top-right',
                type: 'success',
                title: 'Success!',
                showConfirmButton: false,
                timer: 2500,
                toast: true,
                text: response,
            });
        },
    }
}
