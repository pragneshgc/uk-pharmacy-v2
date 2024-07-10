<template>
    <div class="content">
        <div class="card-group">
            <section class="card">
                <div class="card-header flex flex-space-between">
                    <span>User Activity Aggregate</span> 
                    <div>
                        <span class="clickable mr-10" @click="visibleFilters.aggregate = !visibleFilters.aggregate">
                            Filters <i :class="[visibleFilters.aggregate ? 'fa-caret-up' : 'fa-caret-down']" class="fa"></i>
                        </span>
                        <span class="clickable" @click="$root.$emit('chart.aggregate.fullscreen')">
                            Fullscreen <i class="fa fa-window-maximize" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>

                <ActivityDashboardMain :visible-filters="visibleFilters.aggregate" style="padding: 15px;"/>

                <div class="card-header flex flex-space-between">
                    <span>Order Statistics</span> 
                </div>
                <div class="card-body">
                    <ul class="overview-statistics">
                        <a @click="setTab(k)" class="overview-statistics__list-item" href="#/" :class="colorMapping[k]"
                        v-for="(v, k) in statistics.statistics" :key="k" >
                            <div class="overview-statistics__list-item-title">
                                {{ mapping[k] }}
                            </div>
                            <div class="overview-statistics__list-item-value">
                                {{ v }}
                            </div>
                        </a>
                        <a @click="setTab('ordercount')" href="#/" class="overview-statistics__list-item border-danger">
                            <div class="overview-statistics__list-item-title">
                                Alerts
                            </div>
                            <div class="overview-statistics__list-item-value">
                                {{ pendingPharmacyOrdersCount }}
                            </div>                        
                        </a>
                    </ul>
                </div>
            </section>
            <section class="card">
                <div class="card-header flex flex-space-between">
                    <span>Activity Stream</span>
                    <span class="clickable" @click="visibleFilters.activity = !visibleFilters.activity">
                        Filters <i :class="[visibleFilters.activity ? 'fa-caret-up' : 'fa-caret-down']" class="fa"></i>
                    </span>
                </div>
                <div class="card-header-filters" v-if="visibleFilters.activity">
                    <select v-model="filters.activity.show" class="browser-default custom-select mb-10 mr-5">
                        <option value="10">Show 10</option>
                        <option value="25">Show 25</option>
                        <option value="50">Show 50</option>
                        <option value="200">Show 200</option>
                        <option v-if="filters.activity.date && filters.activity.user != 'false'" value="9999">Show All</option>
                    </select>

                    <select v-model="filters.activity.user" class="browser-default custom-select mb-10 mr-5">
                        <option value="false">Show All</option>
                        <option v-for="user in users" :key="user.ID" :value="user.ID">{{ user.Name }} {{ user.Surname }}</option>
                    </select>

                    <datepicker 
                        placeholder="Today (select to change)"
                        name="Date" 
                        :clear-button="true"
                        clear-button-icon="fa fa-times"
                        v-model="filters.activity.date"
                        maxlength="30"
                    ></datepicker>
                </div>
                <div class="card-body">
                    <transition-group tag="ul" class="user-app-activity-list" name="fade">
                    <!-- <ul class="user-app-activity-list"> -->
                        <li v-for="a in activity" :key="a.ActivityID" class="default" 
                        :class="[a.Type == 8 || a.Type == 22 || a.Type == 50 ? 'border-success': 
                        a.Type == 750 || a.Type == 751 || a.Action == 'Order changed to SAFETYCHECK' ? 'border-warning' : 
                        a.Action == 'Order changed to CANCELLED' || a.Action == 'Order changed to REJECTED' ? 'border-danger' : '']">
                            <div class="user-app-activity-overview">
                                <div class="user-app-activity-name">
                                    <div>{{`${a.Name}`}}</div>
                                    <small><router-link target="_blank" :to="{name: `prescription`, params: {id: a.OrderID}}">Prescription {{a.OrderID}}</router-link></small>
                                </div> 
                                <div style="flex-grow: 1;text-align: right;">
                                    <div>{{ a.Action }}</div>
                                    <div>{{ `${a.Date}` }}</div> 
                                </div>
                            </div>
                        </li>
                    <!-- </ul> -->
                    </transition-group> 
                </div>
            </section>
            <section class="card">
                <div class="card-header flex flex-space-between">
                    <span>Users</span>
                    <span class="clickable" @click="visibleFilters.appActivity = !visibleFilters.appActivity">
                        Filters <i :class="[visibleFilters.appActivity ? 'fa-caret-up' : 'fa-caret-down']" class="fa"></i>
                    </span>
                </div>
                <div class="card-header-filters" v-if="visibleFilters.appActivity">
                    <select v-model="filters.appActivity.type" class="browser-default custom-select mb-10 mr-5">
                        <option value="false">All Users</option>
                        <option value="5">Shipping</option>
                        <option value="10">PXP</option>
                        <option value="20">Dispenser</option>
                        <option value="30">Pharmacist</option>
                        <option value="40">Customer Service</option>
                        <option value="50">Admin</option>
                        <option value="60">Sysadmin</option>
                    </select>
                    <select v-model="filters.appActivity.status" class="browser-default custom-select mb-10">
                        <option value="all">All Statuses</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                    </select>
                </div>
                <div class="card-body">
                    <!-- <transition-group tag="ul" class="user-app-activity-list" name="fade"> -->
                    <ul class="user-app-activity-list">
                        <li :class="[activity.Page != 'exit' ? 'user-online' : 'user-offline', (activity.current_time - activity.unix_time > 1800) ? 'user-away' : '']" 
                        @click="toggleAppActivity(activity.UserID)"
                        v-for="activity in appActivity" 
                        :key="activity.ViewLogCurrentID">
                            <div class="user-app-activity-overview">
                                <div class="user-app-activity-name">
                                    <div>{{ `${activity.name} ${activity.surname}` }} <i :class="[!toggled.appActivity.includes(activity.UserID) ? 'fa-caret-down' : 'fa-caret-up']" class="fa ml-5"/></div>
                                    <small>{{ activity.current_time - activity.unix_time > 1800 && activity.Page != 'exit' ? 'Away' : activity.Page != 'exit' ? 'Online' : 'Offline' }}</small>
                                </div> 
                                <div>
                                    <router-link v-if="activity.fullPath" class="capitalize" :to="activity.fullPath"><b>{{ `${activity.routeName}` }}</b> <b v-if="typeof activity.id != 'undefined'">{{activity.id}}</b></router-link>
                                    <span class="capitalize" v-else><b>{{ `${activity.routeName}` }}</b></span>
                                    <div>{{ `${activity.UpdatedAt}` }}</div> 
                                </div>
                            </div>
                            <div v-if="toggled.appActivity.includes(activity.UserID)" class="user-app-activity-details">
                                <hr class="mt-10 mb-10">
                                <div>Last login location: <b>{{ `${activity.IP}` }}</b></div> 
                                <div>Last login time: <b>{{ `${activity.last_login_at == null ? 'never' : activity.last_login_at}` }}</b></div> 
                            </div>
                        </li>
                    </ul>
                    <!-- </transition-group>  -->
                </div>
            </section>
        </div>
    </div>
</template>

<script>

import ActivityDashboardMain from '../ActivityDashboardMain.vue'
import Datepicker from 'vuejs-datepicker'

export default {
    components:{ActivityDashboardMain, Datepicker},
    data() {
        return {
            loaded: false,
            activity: [],
            statistics: {
                statistics: [],
                total: 0,
            },
            users: [],
            filters:{
                activity: {
                    show: 25,
                    user: false,
                    date: '',
                },
                appActivity: {
                    type: false,
                    status: 'all',
                },
                statistics: {
                    
                },
            },
            visibleFilters: {
                activity: false,
                appActivity: false,
                aggregate: false,
            },            
            pendingPharmacyOrdersCount: 0,
            appActivity: [],
            intervals: {
                activity: '',
                statistics: '',
            },
            toggled: {
                appActivity: [],
            },
            mapping: {
                safety: 'safety check',
                new: 'new',
                approved: 'approved',
                dpd: 'dpd',
                ups: 'ups',
                dhl: 'dhl',
                rml: 'rml',
                awaiting: 'awaiting shipped',
                shipped: 'shipped',
                onhold: 'onhold',
                queried: 'queried',
                rejected: 'rejected',
                cancelled: 'cancelled',
                return: 'return',
            },
            colorMapping: {
                safety: 'border-warning',
                new: 'border-default',
                approved: 'border-success',
                dpd: 'border-success',
                ups: 'border-success',
                dhl: 'border-success',
                rml: 'border-success',
                awaiting: 'border-success',
                shipped: 'border-success',
                onhold: 'border-warning',
                queried: 'border-warning',
                rejected: 'border-danger',
                cancelled: 'border-danger',
                return: 'border-danger',                
            }
        }
    },    
    computed: {
        params(){
            let params = {
                appActivity: '',
                activity: '',
                statistics: '',
            };

            params.appActivity += `?type=${this.filters.appActivity.type}&status=${this.filters.appActivity.status}`;
            params.activity += `?show=${this.filters.activity.show}&user=${this.filters.activity.user}&date=${this.filters.activity.date}`;

            return params;
        }
    },
    watch: {
        'params.appActivity': function(){
            this.getAppActivity();
        },
        'params.activity': function(){
            if(this.filters.activity.show == 9999 && (this.filters.activity.date == '' || this.filters.activity.date == null || this.filters.activity.user == 'false')){
                this.filters.activity.show = '25';
            }

            this.getActivity();
        },
        'params.statistics': function(){
            this.getStatistics();
            this.getCount();
        }
    },
    mounted() {
        this.getAppActivity();
        this.getActivity();
        this.getStatistics();
        this.getCount();
        this.getUsers();

        this.intervals.activity = setInterval(() => {
            this.getAppActivity();

            if((this.filters.activity.user == 'false' || !this.filters.activity.user) && this.filters.activity.date == ''){
                this.getActivity();
            }
        }, 5000);

        this.intervals.statistics = setInterval(() => {
            this.getStatistics();
            this.getCount();
        }, 15000);
    },
    destroyed() {
        clearInterval(this.intervals.activity);
        clearInterval(this.intervals.statistics);
    },
    methods: {
        getUsers(){
            axios.get(`/users/all`)
            .then((response) => {
                this.users = response.data.data;
            })
            .catch((error) => {
                console.log(error);
            })
        },
        getCount(){
            axios.get(`/api/check-orders/results`)
            .then((response) => {
                this.pendingPharmacyOrdersCount = response.data.data.pendingPharmacyOrdersCount;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        getStatistics(){
            axios.get(`/statistics-cached`)
            .then((response) => {
                this.statistics = response.data.data;
            })
            .catch((error) => {
                console.log(error);
            })
        },
        getAppActivity(){
            axios.get(`/logs/app-activity${this.params.appActivity}`)
            .then((response) => {
                this.appActivity = response.data.data;
                this.appActivity.forEach((activity) => {
                    if(activity.Page != 'exit'){
                        let routeDetails = this.getPageDetails(activity.Page);
                        activity.routeName = routeDetails.name;
                        activity.id = routeDetails.params.id;
                        activity.fullPath = routeDetails.fullPath;
                    } else {
                        activity.routeName = 'Logout';
                        activity.id = false;
                        activity.fullPath = false;                        
                    }
                })
            })
            .catch((error) => {
                console.log(error);
            })
        },
        setTab(tab){
            localStorage.setItem('dashboard.orderFilter', tab);
        },
        getActivity(){
            axios.get(`/overview/activity${this.params.activity}`)
            .then((response) => {
                this.activity = response.data.data;
            })
            .catch((error) => {
                console.log(error);
            })            
        },
        toggleAppActivity(id){
            if(!this.toggled.appActivity.includes(id)){
                this.toggled.appActivity.push(id);
            } else {
                this.toggled.appActivity.splice(this.toggled.appActivity.indexOf(id), 1);
            }
        },
        getPageDetails(page){
            let {route} = this.$router.resolve({
                path: page,
            });
            
            return route;
        }
    },
}
</script>