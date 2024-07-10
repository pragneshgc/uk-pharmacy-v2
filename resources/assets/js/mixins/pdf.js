import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
    methods: {
        exportPDF: function (element) {
            let pdfName = "export" + Date.now() / 1000;
            let doc = new jsPDF("l", "mm", "a1");

            if (!element.classList.contains("natcol-table")) {
                doc.setFontSize(18);
                let canvasChart = element.querySelector("canvas");
                let chartImage = canvasChart.toDataURL("image/png");
                doc.text("Chart", 10, 10);
                doc.addImage(chartImage, "JPEG", 15, 40);
                doc.save(pdfName + ".pdf");
            } else {
                doc.setFontSize(10);
                let elementHandler = {
                    "#ignorePDF": function (element, renderer) {
                        return true;
                    },
                };

                let source = element.querySelector(".card-body");
                source.classList.add("hideicon");
                /* doc.fromHTML(source, 15, 15, {
                    width: 180,
                    elementHandlers: elementHandler,
                }); */

                doc.html(source, {
                    callback: function (doc) {
                        doc.save(pdfName + ".pdf");
                    },
                    autoPaging: "text",
                    x: 0,
                    y: 0,
                    width: 900,
                    windowWidth: 2000,
                });

                //doc.output("dataurlnewwindow");
            }
        },
        downloadPDF: function (html, name) {
            console.log('download pdf');
            document.getElementById('pdfModal').style.display = 'block';
            document.getElementById('pdfmodal-content').innerHTML = html;

            var w = document.getElementById("pdfModal").offsetWidth;
            var h = document.getElementById("pdfModal").offsetHeight;
            html2canvas(document.getElementById('pdfmodal-content')).then(function (canvas) {
                var img = canvas.toDataURL("image/jpeg", 1);
                let pdf = new jsPDF('L', 'px', [w, h]);
                pdf.addImage(img, 'JPEG', 0, 0, w, h);
                pdf.save(name + ".pdf");
            });
            document.getElementById('pdfmodal-content').innerHTML = '';
            document.getElementById('pdfModal').style.display = 'none';
        },
    }
}
