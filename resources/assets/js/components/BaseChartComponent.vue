<template>
</template>

<script>
    import Print from '../mixins/print'
    import PDF from '../mixins/pdf'
    import Error from '../mixins/errors'

    export default {
        mixins: [ Print, PDF, Error ],        
        props: ['columnClass', 'chartType', 'chartTitle', 'dataUrl', 'generalQuery', 'maintainAspectRatio'],
        data: function () {
            return {
                rangeOptions: [      
                    {label: 'Last week', value: '7'},
                    {label: 'Last 2 weeks', value: '14'},
                    {label: 'Last month', value: '30'},
                    {label: 'Last 2 months', value: '60'},
                    {label: 'Last 6 months', value: '180'},
                ],
                typeOptions: [      
                    {label: 'Bar chart', value: 'bar'},
                    {label: 'Line chart', value: 'line'},
                    {label: 'Horizontal bar chart', value: 'horizontalBar'}
                ],
                range: {label: 'Last month', value: '30'},
                type: {label: 'Bar chart', value: 'bar'},
                data: {},
                chart: null,
                loading: false,
                filtersVisible: false,
                chartId: _.uniqueId(['chart_']),
            }
        },

        computed: {
            chartTypeComputed: function() {
                if(typeof this.chartType !== undefined){
                    return this.chartType;
                } else {
                    return this.type.value;
                }
            }
        },

        watch: {
            range: function() {
                if(this.chart !== null){
                    this.chart.destroy();
                }
                this.getData();
            },
            type: function() {
                this.chartType = this.type.value;

                if(this.chart !== null){
                    this.chart.destroy();
                }

                this.drawChart();            
            }
        },

        created: function () {
        },

        mounted: function() {
            this.getData();
        },

        methods: {
            toggleFilters: function(){
                if(this.filtersVisible){
                    this.filtersVisible = false;
                } else {
                    this.filtersVisible = true;
                }
            },
            /**
            * Return a shade of the hex or rba formatted color set in c0 and/or c1 with opacity set in p
            */
            shadeColor: function(c0,c1,p) {
                var n=p<0?p*-1:p,u=Math.round,w=parseInt;
                if(c0.length>7){
                    var f=c0.split(","),t=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2]);
                    return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")"
                }else{
                    var f=w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
                    return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
                }
            }, 
            /**
            * Transform a hex color to rgba with opacity
            */
            hexToRGBA: function(h,p){
                h = h.replace('#','');
                return 'rgba('+parseInt(h.substring(0,2), 16)+','+parseInt(h.substring(2,4), 16)+','+parseInt(h.substring(4,6), 16)+','+p+')';
            }
        }
    }
</script>
