<template>
    <div class="activity-dashboard-chart" :class="[fullscreen ? 'fullscreen' : '']">
        <div class="activity-dashboard-chart__header mb-5" v-if="visibleFilters || fullscreen">
            <button v-if="user" @click="getChartData()" class="btn btnSize02 secondaryBtn mb-10 mr-5">Back</button>
            <datepicker 
                placeholder="Today (select to change)"
                class="mr-5"
                name="Date" 
                :clear-button="true"
                clear-button-icon="fa fa-times"
                v-model="filters.date"
                maxlength="30"
            ></datepicker>
            <select class="mr-5" v-if="!user" name="type" v-model="filters.type">
                <option value="0">All</option>
                <option value="P">Pharmacist</option>
                <option value="D">Packers</option>
            </select>
            <select name="interval" v-if="user" v-model="filters.interval" style="height: 35px;">
                <option value="15">15 minutes</option>
                <option value="60">60 minutes</option>
            </select>
            <button v-if="fullscreen" @click="fullscreen = false" class="btn btnSize02 secondaryBtn ml-5">Exit Fullscreen</button>
        </div>
        <div class="activity-dashboard-chart__body">
            <canvas id="activity-dashboard-chart" style="width: 100%; max-height: 768px;"></canvas>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js';
import Datepicker from 'vuejs-datepicker'

export default {
    components:{Datepicker},
    props:['visibleFilters'],
    data() {
        return {
            data: {},
            filters: {
                date: '',
                type: 'D',
                interval:  '15',
            },
            fullscreen: false,
            user: false,
            chart: false,
            date: {
                start: 0,
                end: 0,
            }
        }
    },
    mounted() {
        this.getChartData(true);

        this.$root.$on('chart.aggregate.fullscreen', () => {
            this.fullscreen = true;
        });
    },
    destroyed() {
        this.$root.$off('chart.aggregate.fullscreen');
    },
    watch: {
        filters: {
            deep: true,
            handler(){
                if(this.user){
                    this.getChartDataDetails(this.user);
                } else {
                    this.getChartData();
                }
            }
        },
        fullscreen(){
            this.chart.destroy();
            this.chart = false;
            this.getChartData(true);
        }
    },
    methods: {
        getChartData(initial = false){
            axios.get(`/stats/activity?type=${this.filters.type}&date=${this.filters.date}&interval=${this.filters.interval}`)
            .then((response) => {
                this.data = response.data.data;
                this.user = false;

                if(initial){
                    this.initChart();
                } else {
                    this.updateChart();
                }
            })
            .catch((error) => {
                console.log(error);
            })
        },
        getChartDataDetails(id){
            axios.get(`/stats/activity/${id}?date=${this.filters.date}&interval=${this.filters.interval}`)
            .then((response) => {
                this.data = response.data.data;
                this.updateChart();
            })
            .catch((error) => {
                console.log(error);
            })            
        },
        updateChart(){
            this.chart.data = this.data;
            this.chart.update();
        },
        initChart(){
            var ctx = document.getElementById('activity-dashboard-chart');
            this.chart = new Chart(ctx, {
                type: 'bar',
                data: this.data,
                options: {
                    onClick: (e, array) => {
                        if(this.user){
                            return false;
                        }

                        let object = false;

                        if(array.length > 0){
                            var bar = this.chart.getElementAtEvent(e)[0];
                            var index = bar._index;
                            var datasetIndex = bar._datasetIndex;

                            object = this.chart.data.datasets[datasetIndex];
                        } else {
                            return false;
                        }

                        console.log(object);

                        this.user = object.ids[index];
                        this.getChartDataDetails(this.user);
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                }
            });
        }
    },
}
</script>