<template>
    <section>
        <div class="prescriptionStats flex-center">
            <div class="title flex-align-center">Order Statistics</div>
            <div class="list">
                <ul v-if="loaded">
                    <li class="list-item-background" v-for="(value, key) in statistics.statistics"
                        v-if="!roleVisibility[userInfo.role].includes(key)" @click="changeOrder(key)"
                        :class="{ 'active': key == orderFilter }">
                        <span>{{ mapping[key] }}</span>{{ value }}
                        <!-- <a class="smallTextBtn secondaryBtn" :class="{ 'active': key == orderFilter }" href="javascript:;">View</a> -->
                    </li>
                    <li :class="['ordercount' == orderFilter ? 'active' : '', pendingPharmacyOrdersCount > 0 ? 'blink_me' : '']"
                        class="list-item-background" @click="orderFilter = 'ordercount';"
                        v-if="!roleVisibility[userInfo.role].includes('ordercount')">
                        <span>Alert</span>{{ pendingPharmacyOrdersCount }}
                    </li>
                </ul>
                <ul style="overflow: hidden;" v-else>
                    <li>
                        <div class="loader loader-relative" style="">Loading...</div>
                    </li>
                </ul>
            </div>
            <div v-if="loaded" class="total flex-align-center clickable">
                <span>Total</span>
                {{ statistics.total }}
                <a href='/orders/csv?page=1&limit=1000&f={"dashboard": true}&strict=true'
                    class="btn smallTextBtn secondaryBtn" title="Download dashboard orders">Download</a>
            </div>
        </div>
    </section>
</template>

<script>
import Error from '../../../mixins/errors';
export default {
    mixins: [Error],
    data: function () {
        return {
            statistics: {},
            loaded: false,
            pendingPharmacyOrdersCount: 0,
            pendingOrderAlerts: [],
            userInfo: userInfo,
            orderFilter:
                this.$route.query.orderFilter ||
                    localStorage.getItem('dashboard.orderFilter')
                    ? localStorage.getItem('dashboard.orderFilter')
                    : (userInfo.role == 20 || userInfo.role == 19) ? 'approved' : 'new',
            roleVisibility: {
                '60': [],
                '50': [],
                '40': [],
                '35': [],
                '30': [],
                '29': [],
                '20': [],
                '19': [],
                '10': [],
                '5': [],
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
                return: 'returned',
            },
        }
    },
    mounted() {
        this.getStatistics();
        this.getOrderAlerts();
        this.$root.$on('orderupdate', this.getOrderAlerts);
    },
    destroyed() {
        this.$root.$off('orderupdate');
    },
    methods: {
        getStatistics() {
            axios.get('/statistics')
                .then((response) => {
                    this.statistics = response.data.data;
                    this.statistics.total = response.data.data.total;
                    this.loaded = true;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        changeOrder(filter) {
            if (filter == 'queried') {
                localStorage.setItem('dashboard.orderFilter', filter);
            } else {
                localStorage.setItem('dashboard.orderFilter', (this.userInfo.role == 20 || this.userInfo.role == 19) ? 'approved' : 'new');
            }
            this.orderFilter = filter;
            this.$root.$emit('changefilter', { filter });
        },
        getOrderAlerts() {
            axios.get('/note/pending-alerts')
                .then((response) => {
                    this.pendingOrderAlerts = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
    }
}
</script>
