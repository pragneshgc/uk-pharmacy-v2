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
                <transition  name="slide-down" mode="out-in">
                    <div v-if="filtersVisible" class="row filters-row">
                    <!-- Default unchecked -->
                        <div class="checkboxes col-md-3">
                            <h5>Layout</h5>
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" :id="'stackedChecked'+chartId" v-on:change="updateChart()" :value="true" v-model="isStacked">
                                <label class="custom-control-label" :for="'stackedChecked'+chartId">Stacked</label>
                            </div>
                            <!-- Default checked -->
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" :id="'stackedUnchecked'+chartId" v-on:change="updateChart()" :value="false" v-model="isStacked">
                                <label class="custom-control-label" :for="'stackedUnchecked'+chartId">Compare</label>
                            </div>
                        </div>
                        <div class="checkboxes col-md-3">
                            <h5>Background color</h5>
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" :id="'backgroundChecked'+chartId" v-on:change="updateChart()" :value="true" v-model="background">
                                <label class="custom-control-label" :for="'backgroundChecked'+chartId">Filled</label>
                            </div>
                            <!-- Default checked -->
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" :id="'backgroundUnchecked'+chartId" v-on:change="updateChart()" :value="false" v-model="background">
                                <label class="custom-control-label" :for="'backgroundUnchecked'+chartId">Transparent</label>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <!--Card content-->
            <div class="card-body">
                <div class="loader" v-show="loading">Loading...</div>
                <canvas :id="chartId"></canvas>
            </div>
        </div>
        <!--/.Card-->
    </div>
    <!--Grid column-->
</template>

<script>
    import BaseChartComponent from './BaseChartComponent.vue';

    export default {
        props: ['chartComplexity', 'stacked', 'backgroundColor'],
        extends: BaseChartComponent,
        data: function () {
            return {
                options: {},
                queryString: '',
                isStacked: this.stacked || true,
                background: this.backgroundColor || true
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
            },
            dataUrl: function() {
               if(this.chart !== null){
                    this.chart.destroy();
                }
                this.getData();
            }
        },
        created: function () {
            this.setupOptions();
        },
        mounted: function() {
        },

        methods: {
            setupOptions: function (){
                this.options.title = {
                    display: true,
                    text: this.chartTitle+' - Last '+ this.range.value +' days'
                };

                this.options.maintainAspectRatio = (this.maintainAspectRatio == undefined) ? true : this.maintainAspectRatio;

                this.options.tooltips = {
                    mode: 'index',
                    intersect: false
                };

                this.options.responsive = true

                if(this.isStacked){
                    this.options.scales = {
                        xAxes: [{
                            stacked: true,
                        }],
                        yAxes: [{
                            stacked: true
                        }],
                    };
                } else {
                    this.options.scales = {}
                }
            },
            getData: function () {
                var self = this;
                this.loading = true;

                axios.get(this.dataUrl+'?range='+self.range.value+self.currentQueryString)
                .then(function (response) {
                    if(self.chartComplexity == 'simple'){
                        self.data = self.formatData(response.data.data);
                    } else if(self.chartComplexity == 'flat') {
                        self.data = self.formatFlatData(response.data.data);
                    } else {
                        self.data = self.formatNestedData(response.data.data);
                    }

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
                        options: self.options
                    });
                }

                this.loading = false;
            },
            updateChart: function (){
                this.updateColors();
                this.setupOptions();
                this.chart.options = this.options;
                this.chart.update();
            },
            updateColors: function(){
                if(this.chartComplexity == 'simple'){
                    // for(var key in this.data.datasets){
                    // }
                } else if(self.chartComplexity == 'flat') {
                    // for(var key in this.data.datasets){
                    // }
                } else {
                    for(var key in this.data.datasets){
                        if(typeof this.data.datasets[key].borderColor == 'undefined'){
                            this.data.datasets[key].baseColor = this.data.datasets[key].backgroundColor;
                        } else if(typeof this.data.datasets[key].baseColor == 'undefined') {
                            this.data.datasets[key].baseColor = this.data.datasets[key].borderColor;
                        }

                        if(this.background){
                            this.data.datasets[key].backgroundColor = this.data.datasets[key].baseColor;
                        } else {
                            this.data.datasets[key].borderColor = this.data.datasets[key].baseColor;
                            this.data.datasets[key].backgroundColor = this.hexToRGBA(this.data.datasets[key].baseColor, 0.1);
                        }
                    }
                }
            },
            formatNestedData: function (responseData){
                var labels = [];
                var datasets = [];

                for(var key in responseData){
                    let filteredData = [];

                    for(var subkey in responseData[key].days){

                        if(!labels.includes(subkey)){
                            labels.push(subkey);
                        }

                        filteredData.push(responseData[key].days[subkey]);
                    }
                    if(this.background){
                        datasets.push(
                            {
                                label: key,
                                data: filteredData,
                                backgroundColor: responseData[key].color,
                            }
                        );
                    } else {
                        datasets.push(
                            {
                                label: key,
                                data: filteredData,
                                borderColor: responseData[key].color,
                                backgroundColor: this.hexToRGBA(responseData[key].color, 0.1)
                            }
                        );
                    }
                }

                var data = {
                    labels: labels,
                    datasets: datasets
                }

                return data;
            },
            formatData: function (responseData){
                var ignoredColumns = ['day', 'count'];
                var labels = [];

                // fill labels
                for(var i=0; i<responseData.length; i++){
                    for(var key in responseData[i]){
                        if(!(ignoredColumns.includes(key)) && !(labels.includes(key))){
                            labels.push(key);
                        }
                    }
                }

                var datasets = [];

                for(var key in responseData){
                    let filteredData = [];

                    for(var subkey in responseData[key].days){

                        if(!labels.includes(subkey)){
                            labels.push(subkey);
                        }

                        filteredData.push(responseData[key].days[subkey]);
                    }
                    if(this.backgroundColor != false){
                        datasets.push(
                            {
                                label: key,
                                data: filteredData,
                                backgroundColor: responseData[key].color,
                            }
                        );
                    } else {
                        datasets.push(
                            {
                                label: key,
                                data: filteredData,
                                borderColor: responseData[key].color,
                                backgroundColor: this.hexToRGBA(responseData[key].color,0.1),
                            }
                        );
                    }
                }

                var data = {
                    labels: labels,
                    datasets: datasets
                }

                return data;
            },
            formatFlatData: function (responseData) {
                var labels = [];
                var filteredData = [];
                var datasets = [];

                for(var key in responseData.days){
                    labels.push(key);
                    filteredData.push(responseData.days[key]);
                }

                if(this.stacked != false){
                    datasets.push(
                        {
                            label: responseData.label,
                            data: filteredData,
                            backgroundColor: responseData.color,
                        }
                    );
                } else {
                    console.log(responseData);
                    datasets.push(
                        {
                            label: responseData.label,
                            data: filteredData,
                            borderColor: responseData.color,
                            backgroundColor: this.hexToRGBA(responseData.color, 0.3),
                        }
                    );
                }

                var data = {
                    labels: labels,
                    datasets: datasets
                }

                return data;
            }
        }
    }
</script>
