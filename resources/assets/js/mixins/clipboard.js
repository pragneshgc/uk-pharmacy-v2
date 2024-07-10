export default {
    methods: {
        copyToClipboard(text){
            navigator.clipboard.writeText(text).then(() => {
                this.$toasted.show('Copied to clipboard!',
                    {
                        iconPack: 'fontawesome',
                        type : 'success',
                        icon : 'check',
                        duration : 2000,
                        position: "top-right",
                    }
                )
                document.getSelection().removeAllRanges();
            }, (err) => {
                console.error('Async: Could not copy text: ', err);
            });
        }
    }
}