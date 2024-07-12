<template>
    <div class="activity-dashboard-chart" :class="[fullscreen ? 'fullscreen' : '']">
        <div class="activity-dashboard-chart__header mb-5" v-if="visibleFilters || fullscreen">
            <button v-if="user" @click="getChartData()" class="btn btnSize02 secondaryBtn mb-10 mr-5">Back</button>
            <datepicker placeholder="Today (select to change)" class="mr-5" name="Date" :clear-button="true"
                clear-button-icon="fa fa-times" v-model="filters.date" maxlength="30"></datepicker>
            <select class="mr-5" v-if="!user" name="type" v-model="filters.type">
                <option value="0">All</option>
                <option value="P">Pharmacist</option>
                <option value="D">Packers</option>
            </select>
            <select name="interval" v-if="user" v-model="filters.interval" style="height: 35px;">
                <option value="15">15 minutes</option>
                <option value="60">60 minutes</option>
            </select>
            <button v-if="fullscreen" @click="fullscreen = false" class="btn btnSize02 secondaryBtn ml-5">Exit
                Fullscreen</button>
        </div>
        <div class="activity-dashboard-chart__body">
            <Bar v-if="loaded" :data="data" :options="options" id="activity-dashboard-chart"
                style="width: 100%; max-height: 768px;" />
        </div>
    </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs';
import Datepicker from './wrapper/Datepicker.vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    components: { Datepicker, Bar },
    props: ['visibleFilters'],
    data() {
        return {
            loaded: false,
            data: {},
            filters: {
                date: '',
                type: 'D',
                interval: '15',
            },
            fullscreen: false,
            user: false,
            chart: false,
            date: {
                start: 0,
                end: 0,
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            }
        }
    },
    mounted() {
        this.getChartData(true);

        this.emitter.on('chart.aggregate.fullscreen', () => {
            this.fullscreen = true;
        });
    },
    destroyed() {
        this.emitter.off('chart.aggregate.fullscreen');
    },
    watch: {
        filters: {
            deep: true,
            handler() {
                if (this.user) {
                    this.getChartDataDetails(this.user);
                } else {
                    this.getChartData();
                }
            }
        },
        fullscreen() {
            this.chart.destroy();
            this.chart = false;
            this.getChartData(true);
        }
    },
    methods: {
        getChartData(initial = false) {
            this.loaded = false;
            axios.get(`/stats/activity?type=${this.filters.type}&date=${this.filters.date}&interval=${this.filters.interval}`)
                .then((response) => {
                    this.data = response.data.data;
                    this.user = false;
                    this.loaded = true;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        getChartDataDetails(id) {
            this.loaded = false;
            axios.get(`/stats/activity/${id}?date=${this.filters.date}&interval=${this.filters.interval}`)
                .then((response) => {
                    this.data = response.data.data;
                    this.loaded = true;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
    },
}
</script>
