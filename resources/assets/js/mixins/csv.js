export default {
    methods: {
        /**
         * 
         * @param {*} data 
         * @param {*} title 
         */
        exportCSV: function (data, title) {
            let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
            csvContent += this.arrayToCSV(data);
            var encodedUri = encodeURI(csvContent);
            // this seems a bit hacky, try doing something else
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", title + ~~(Date.now() / 1000) + ".csv");
            document.body.appendChild(link); // Required for FF
            link.click(); // This will download the data file named "my_data.csv".            
            document.body.removeChild(link);
        },
        /**
         * 
         * @param {*} objArray 
         */
        arrayToCSV: function (objArray) {
            const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
            let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

            return array.reduce((str, next) => {
                str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
                str = str.replace(/;/g, '');
                return this.strip(str);
            }, str);
        },
        /**
         * 
         * @param {*} html 
         */
        strip(html){
            var doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || "";
        }
    }
}