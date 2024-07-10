<template>
    <!--Grid column-->
    <div class="mb-4 col-md-12" :class="[columnClass]">
        <!--Card-->
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-12">
                        <h5>{{ chartTitle }}</h5>
                    </div>
                </div>
                <div class="row filters-row">
                    <div class="col-md-4">
                        <v-select v-model="range" :options="rangeOptions"></v-select>
                    </div>
                    <div class="col-md-4">
                        <v-select v-model="type" :options="typeOptions"></v-select>
                    </div>
                    <div class="col-md-4">
                        <div class="dropdown float-right">
                            <a class="btn btn-primary waves-effect" v-on:click="printChart($el)"><i class="fa fa-print" aria-hidden="true"></i></a>
                            <a class="btn btn-primary waves-effect" v-on:click="exportPDF($el)"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a>
                        </div>                    
                    </div>
                </div>
            </div>
            <!--Card content-->
            <div class="card-body">
                <div class="loader" v-show="loading">Loading...</div>
                <canvas :height="chartHeight||''" :id="chartId"></canvas>
            </div>
        </div>
        <!--/.Card-->
    </div>
    <!--Grid column-->
</template>

<script>
    import BaseChartComponent from './BaseChartComponent.vue';

    export default {
        extends: BaseChartComponent,
        props: ['chartHeight'],
        data: function () {
            return {
                options: {},
                typeOptions: [      
                    {label: 'Pie chart', value: 'pie'},
                    {label: 'Doughnut chart', value: 'doughnut'}
                ],
                type: {label: 'Pie chart', value: 'pie'},
                queryString: '',
            }
        },
        computed: {
            currentQueryString: function (){
                if(this.queryString != ''){
                    return '&q='+this.queryString;
                } else {
                    return '';
                }
            }
        },
        watch: {
            generalQuery: function() {
                this.queryString = this.generalQuery;
            },
            queryString: function() {
               if(this.chart !== null){
                    this.chart.destroy();
                }
                this.getData();
            }
        },
        created: function () {
        },
        mounted: function() {
        },

        methods: {
            setupOptions: function (){
                // setup piechart options
            },
            getData: function () {
                var self = this;
                this.loading = true;

                axios.get(this.dataUrl+'?range='+this.range.value+self.currentQueryString)
                .then(function (response) {
                    self.formatData(response.data.data);
                    self.drawChart();
                })
                .catch(function (error) {
                    self.reportError(error);
                })            
            },
            drawChart: function () {
                var self = this;
                var chartContainer = document.getElementById(this.chartId);

                if(chartContainer != null){
                    this.chart = new Chart(chartContainer.getContext('2d'), {
                        type: self.chartTypeComputed,
                        data: self.data,
                        options: {
                            legend:{
                                position: 'right'
                            },
                            title: {
                                display: true,
                                text: this.chartTitle+' - Last '+ this.range.value +' days'
                            },
                            tooltips: {
                                mode: 'index',
                                intersect: false
                            },
                            responsive: true,
                            maintainAspectRatio: (self.maintainAspectRatio == undefined) ? true : self.maintainAspectRatio,
                        }
                    });
                }
                this.loading = false;
            },
            formatData: function (responseData) {
                var labels = [];
                var data = [];
                var backgroundColors = [];
                var dataset = [];

                for(var key in responseData){
                    data.push(responseData[key].count);
                    if(typeof responseData[key].percent != 'undefined'){
                        labels.push(key+' ('+responseData[key].percent+'%)');
                    } else {
                        labels.push(key+' ('+responseData[key].count+')');
                    }
                    
                    backgroundColors.push(responseData[key].color);
                }

                var data = {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: backgroundColors,
                    }]
                }

                this.data = data;
            }
        }
    }
</script>
