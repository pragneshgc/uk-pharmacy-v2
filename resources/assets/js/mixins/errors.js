export default {
    methods: {
        /**
         * Generic error report
         */
        reportError: function (error) {
            let audio = new Audio('/audio/alarm.mp3');
            audio.play();

            this.$toasted.show('Error fetching data!', 
                {
                    type : 'error',
                    iconPack: 'fontawesome',
                    icon : 'exclamation',                    
                    duration : 5000,
                    position: "top-right",
                    action : {
                        text : 'Dismiss',
                        onClick : (e, toastObject) => {
                            toastObject.goAway(0);
                        }
                    },
                }
            )
        },
        postError: function (error) {
            let audio = new Audio('/audio/alarm.mp3');
            audio.play();

            this.$toasted.show(error, 
                {
                    type : 'error',
                    iconPack: 'fontawesome',
                    icon : 'exclamation',
                    duration : 5000,
                    position: "top-right",
                    action : {
                        text : 'Dismiss',
                        onClick : (e, toastObject) => {
                            toastObject.goAway(0);
                        }
                    },
                }
            )
        },
        postErrorPopup: function (error) {
            let audio = new Audio('/audio/alarm.mp3');
            audio.play();

            this.$swal({
                type: 'error',
                title: 'Whoops!',
                showConfirmButton: false,
                html: error,
                showConfirmButton: true,
            }).then((result) => {
                console.warn(result);
            });
        },
        postSuccess: function (response) {
            if(response == ''){
                response = 'Success!'
            }  

            this.$toasted.show(response,
                {
                    iconPack: 'fontawesome',
                    type : 'success',
                    icon : 'check',
                    duration : 2000,
                    position: "top-right",
                    action : {
                        text : 'Dismiss',
                        onClick : (e, toastObject) => {
                            toastObject.goAway(0);
                        }
                    },
                }
            )
        },
        postWarning: function (response) {
            if(response == ''){
                response = 'Success!'
            }  

            this.$toasted.show(response,
                {
                    iconPack: 'fontawesome',
                    type : 'warning',
                    icon : 'exclamation',
                    duration : 2000,
                    position: "top-right",
                    action : {
                        text : 'Dismiss',
                        onClick : (e, toastObject) => {
                            toastObject.goAway(0);
                        }
                    },
                }
            )
        },
    }
}