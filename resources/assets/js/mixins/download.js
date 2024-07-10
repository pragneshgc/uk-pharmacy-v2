export default {
    methods: {
        download(data, type) {
            let blob = new Blob([data], { type: 'application/' + type });
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = this.currentOrderID + '.' + type;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        downloadURI(uri, name) {
            var link = document.createElement("a");
            link.download = name;
            link.target = "_blank";
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        async downloadURINew(url, name) {
            console.log('download uri');
            let blob = await fetch(url).then((r) => r.blob());
            var f = new FileReader();
            f.readAsDataURL(blob);
            f.onload = d => {
                var uri = d.target.result;
                var link = document.createElement('a');
                link.download = name;
                link.href = uri;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                //delete link;
            }
        }
    },
}
