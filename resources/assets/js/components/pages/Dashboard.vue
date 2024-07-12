<template>
    <div>
        <div class="content">
            <!-- Prescription Stats-->
            <section>
                <div class="prescriptionStats flex-center">
                    <div class="title flex-align-center">Order Statistics</div>
                    <div class="list">
                        <ul v-if="loaded">
                            <template v-for="(value, key) in statistics.statistics">
                                <li class="list-item-background" v-if="!roleVisibility[userInfo.role].includes(key)"
                                    @click="changeOrder(key)" :class="{ 'active': key == orderFilter }">
                                    <span>{{ mapping[key] }}</span>{{ value }}
                                    <!-- <a class="smallTextBtn secondaryBtn" :class="{ 'active': key == orderFilter }" href="javascript:;">View</a> -->
                                </li>
                            </template>

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
            <!-- End Prescription Stats-->
            <section>
                <div class="orderSearch">
                    <data-table v-if="orderFilter != 'ordercount'" data-url="/orders" column-class="col-lg-12"
                        table-title="InTray" redirect-name="prescription" redirect-id="PrescriptionID"
                        :filters="orderFilter" :redirect-callback="redirectCallback"
                        :checkbox-visible="(orderFilter == 'new' && [29, 30, 35].includes(userInfo.role))"
                        :hidden-columns="['checked', 'disabled', 'UPSAccessPointAddress']" :not-orderable="['Products']"
                        :column-map="{
                            'PrescriptionID': 'ID',
                            'DeliveryID': 'Courier',
                            'CompanyName': 'Client',
                            'ReferenceNumber': 'Ref',
                        }">
                        <!-- <div v-if="userInfo.role == 30 && orderFilter == 'new'" class="row check-row"> -->
                        <template #filters v-if="(orderFilter == 'new' && [29, 30, 35].includes(userInfo.role))">
                            <div class="row check-row">
                                <div class="button-group">
                                    <div class="btn btnSize02 secondaryBtn" @click=" checkAllVisible()">
                                        <!-- <input class="uncheck" v-model="mainChecked" type="checkbox" name="checkall">  -->
                                        <input :class="{ 'unchecked': (!match && currentChecked) }"
                                            :checked="(match || currentChecked)" type="checkbox" name="checkall">
                                        <label for="checkall"></label>
                                    </div>
                                    <div class="btn btnSize02 secondaryBtn dropdown">
                                        <i aria-hidden="true" class="fa fa-caret-down"></i>
                                        <ul class="dropdown-menu">
                                            <li @click=" checkAll()" class="dropdown-menu-item">
                                                Check All In {{ orderFilter }}
                                            </li>
                                            <li @click=" checkAll(10)" class="dropdown-menu-item">
                                                Check 10
                                            </li>
                                            <li @click=" checkAll(20)" class="dropdown-menu-item">
                                                Check 20
                                            </li>
                                            <li @click=" checkAll(50)" class="dropdown-menu-item">
                                                Check 50
                                            </li>
                                            <li @click=" checkAll(100)" class="dropdown-menu-item">
                                                Check 100
                                            </li>
                                            <li>
                                                <hr>
                                            </li>
                                            <li @click=" checkByProperty('delivery', 4)" class="dropdown-menu-item">
                                                Check DPD
                                            </li>
                                            <!-- <li @click="checkByProperty('delivery', 10)" class="dropdown-menu-item">
                                                Check DHL
                                            </li>
                                            <li @click="checkByProperty('delivery', 7)" class="dropdown-menu-item">
                                                Check UPS
                                            </li> -->
                                            <li @click=" checkByProperty('delivery', 5)" class="dropdown-menu-item">
                                                Check RM
                                            </li>
                                            <li>
                                                <hr>
                                            </li>
                                            <li @click=" checkByProperty('client', 50)" class="dropdown-menu-item">
                                                Check Treated
                                            </li>
                                            <li @click=" checkByProperty('client', 51)" class="dropdown-menu-item">
                                                Check EveAdam
                                            </li>
                                            <li @click=" checkByProperty('client', 49)" class="dropdown-menu-item">
                                                Check Apport Sarl
                                            </li>
                                            <li>
                                                <hr>
                                            </li>
                                            <li @click=" clearChecked()" class="dropdown-menu-item">
                                                Clear checked
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="check-options" v-if="checked.length > 0">
                                    <button @click=" addToTray()" class="btn btnSize02 secondaryBtn">
                                        <span v-if="userInfo.role == 20 || userInfo.role == 19">Take over</span><span
                                            v-else>Add To Tray</span> ({{ checked.length }} orders)
                                    </button>
                                </div>
                            </div>
                        </template>
                        <template v-if="(orderFilter == 'safety' && userInfo.role == 40)" v-slot:tools="slotProps">
                            <a class="btn btn-primary waves-effect table-icon clickable" @click=" safe(slotProps.id)">
                                Safe
                            </a>
                        </template>

                    </data-table>
                    <div class="card prescription-pool" v-else-if="orderFilter == 'ordercount'">
                        <!-- <div class="box-array">
                            <div class="box medium">
                                <span class="title">Pending Prescriber Count</span>
                                <span class="value">{{ pendingPrescriberCount }}</span>
                            </div>
                            <div class="box medium">
                                <span class="title">Missing Orders Count</span>
                                <span class="value">{{ pendingPharmacyOrdersCount }}</span>
                            </div>
                            <div class="box medium">
                                <span class="title">Total</span>
                                <span class="value">{{ parseInt(pendingPharmacyOrdersCount) + parseInt(pendingPrescriberCount) }}</span>
                            </div>
                        </div> -->

                        <div class="card-body order-id-list">
                            <ul>
                                <li class="pool-list-title pb-10"
                                    style="display: flex; justify-content: space-between; align-items: center;">
                                    <b>MISSING PHARMACY ORDERS <span class="badge"
                                            :class="[pendingPharmacyOrders.length > 0 ? 'red' : '']">{{
                                                pendingPharmacyOrders.length }}</span></b>
                                    <div>
                                        <button class="btn btn-primary table-icon"
                                            title="Download CSV with a list of reference numbers"
                                            @click=" getPendingCSV()">
                                            <i aria-hidden="true" class="fa fa-file"></i>
                                        </button>
                                        <button class="btn btn-primary table-icon"
                                            title="Refresh the pending pharmacy orders list manually"
                                            @click=" getCount(true)">
                                            <i class="fa fa-refresh"
                                                :class="[loadingPendingPharmacy ? 'spin-animation' : '']"></i>
                                        </button>
                                    </div>
                                </li>
                                <li class="pool-list-layout" v-if="pendingPharmacyOrders.length > 0">
                                    <div class="pool-column"><b>Reference Number</b></div>
                                    <div class="pool-column"><b>Client</b></div>
                                    <div class="pool-column"><b>Status</b></div>
                                </li>
                                <li class="pool-list-layout" v-for="   order in pendingPharmacyOrders   "
                                    :key="order.SyncOrderID">
                                    <div class="pool-column">{{ order.Value }}</div>
                                    <div class="pool-column"><span>{{ order.CompanyName }}</span></div>
                                    <div class="pool-column"><b>Pending</b></div>
                                </li>
                            </ul>
                            <ul v-if="(pendingPharmacyOrdersCount + pendingPrescriberCount) == 0">
                                <li class="pool-list-title">
                                    <b>NO PENDING PHARMACY ORDERS FOUND</b>
                                </li>
                            </ul>

                            <ul class="mt-10">
                                <li class="pool-list-title pb-10"
                                    style="display: flex; justify-content: space-between; align-items: center;">
                                    <b>POSTPONED SHIPPING ORDERS PENDING <span class="badge"
                                            :class="[onHoldOrders.length > 0 ? 'red' : '']">{{ onHoldOrders.length
                                            }}</span></b>
                                </li>
                                <li class="pool-list-layout" v-if="onHoldOrders.length > 0">
                                    <div class="pool-column"><b>ID</b></div>
                                    <div class="pool-column"><b>Reference Number</b></div>
                                    <div class="pool-column"><b>Postponed At</b></div>
                                    <div class="pool-column"><b>Postponed By</b></div>
                                    <div class="pool-column">Tools</div>
                                </li>
                                <li class="pool-list-layout" v-for="   order in onHoldOrders   "
                                    :key="order.PrescriptionID">
                                    <div class="pool-column">
                                        <b>{{ order.PrescriptionID }}</b>
                                    </div>
                                    <div class="pool-column">
                                        <div v-html="order.ReferenceNumber" />
                                    </div>
                                    <div class="pool-column">{{ order.PostponedAt }}</div>
                                    <div class="pool-column">{{ order.PostponedBy }}</div>
                                    <div class="pool-column">
                                        <a title="View Order" class="btn btn-primary table-icon" target="_blank"
                                            :href="`#/prescription/${order.PrescriptionID}`">
                                            <i aria-hidden="true" class="fa fa-search-plus"></i>
                                        </a>
                                    </div>
                                </li>
                            </ul>


                            <ul class="mt-10">
                                <li class="pool-list-title pb-10"
                                    style="display: flex; justify-content: space-between; align-items: center;">
                                    <b>PENDING ORDER ALERTS <span class="badge"
                                            :class="[pendingOrderAlerts.length > 0 ? 'red' : '']">{{
                                                pendingOrderAlerts.length }}</span></b>
                                    <div>
                                        <button
                                            title="Create an alert for a prescription that is not yet imported on ESA"
                                            @click=" $root.$emit('modal.open', 'note', 'preimport');"
                                            class="btn btn-primary table-icon">
                                            Create Alert
                                        </button>
                                    </div>
                                </li>
                                <li class="pool-list-layout" v-if="pendingOrderAlerts.length > 0">
                                    <div class="pool-column"><b>Reference Number</b></div>
                                    <div class="pool-column"><b>Note</b></div>
                                    <div class="pool-column"><b>Created By</b></div>
                                    <div class="pool-column"><b>Created At</b></div>
                                    <div v-if="userInfo.role >= 40" class="pool-column">Tools</div>
                                </li>
                                <li class="pool-list-layout" v-for="   alert in pendingOrderAlerts   "
                                    :key="alert.NoteID">
                                    <div class="pool-column">
                                        <div v-if="alert.Subscription">
                                            <small>Subscription ID: <b>{{ alert.Subscription }}</b></small>
                                            <br>
                                            <small>Reference number not set</small>
                                        </div>
                                        <b v-else>{{ alert.ReferenceNumber }}</b>
                                    </div>
                                    <div class="pool-column">
                                        <div v-html="alert.Note" />
                                    </div>
                                    <div class="pool-column">{{ alert.name }} {{ alert.surname }}</div>
                                    <div class="pool-column">{{ alert.CreatedAt }}</div>
                                    <div v-if="userInfo.role >= 40" class="pool-column">
                                        <button title="Edit alert" class="btn btn-primary table-icon"
                                            @click=" editNote(alert)">
                                            <i aria-hidden="true" class="fa fa-edit"></i>
                                        </button>
                                        <button title="Delete this alert" class="btn btn-primary table-icon"
                                            @click=" deleteNote(alert.NoteID)">
                                            <i aria-hidden="true" class="fa fa-trash"></i>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import Error from '../../mixins/errors'
import CSV from '../../mixins/csv'
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useDefaultStore } from '../../stores/default.store';

export default {
    setup() {
        const { checked, visible, tray } = storeToRefs(useDefaultStore());
        const { replaceChecked } = useDefaultStore();

        return {
            checked, visible, tray, replaceChecked
        }
    },
    components: {
        'Modal': defineAsyncComponent(() => import('../Modal.vue')),
    },
    mixins: [Error, CSV],
    data: function () {
        return {
            statistics: {},
            /* For orders */
            pendingPrescriberCount: 0,
            pendingPharmacyOrdersCount: 0,
            pendingPharmacyOrders: [],
            onHoldOrders: [],
            pendingOrderAlerts: [],
            loadingPendingPharmacy: false,
            /* For orders */
            loaded: false,
            orderFilter:
                this.$route.query.orderFilter ||
                    localStorage.getItem('dashboard.orderFilter')
                    ? localStorage.getItem('dashboard.orderFilter')
                    : (userInfo.role == 20 || userInfo.role == 19) ? 'approved' : 'new',
            checkboxStatus: false,
            duplicateReference: 0,
            userInfo: userInfo,
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
            roleVisibility: {
                '60': [],
                '50': [],
                '40': [],
                '35': [],
                '30': [],
                '29': [],
                '25': [],
                '20': [],
                '19': [],
                '10': [],
                '5': [],
            },
            countTimer: null
        }
    },
    computed: {
        //check if the current checked boxes match the total check boxes
        match() {
            if (this.checked.length == 0) {
                return false;
            } else {
                return this.visible.every((value) => {
                    return (this.checked.indexOf(value) >= 0);
                });
            }
            // return _.isEmpty(_.xor(this.visible, this.checked))
        },
        //check if some of the checked boxes on current page match the total checked boxes
        currentChecked() {
            if (this.checked.length == 0) {
                return false;
            } else {
                return this.checked.some((value) => {
                    return (this.visible.indexOf(value) >= 0);
                });
            }
        },
        trayLength() {
            return this.tray.length;
        }
    },
    mounted() {
        this.getStatistics();
        this.getCount();
        this.getOrderAlerts();
        this.getOnHoldOrders();

        // this.countTimer = setInterval(() => {
        //     this.getCount();
        // }, 60000);

        this.emitter.on('changefilter', (e) => {
            this.orderFilter = e.filter;
        });
        this.emitter.on('orderupdate', this.getOrderAlerts);
    },
    destroyed() {
        this.emitter.off('changefilter');
        this.emitter.off('orderupdate');
        clearInterval(this.countTimer);
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
        getCount(refresh = false) {
            this.loadingPendingPharmacy = true;
            if (refresh) {
                this.getOrderAlerts();
                this.checkOrders(() => {
                    this.getCount();
                    this.getOnHoldOrders();
                    this.emitter.emit('alertupdate');
                });
            } else {
                axios.get('/api/check-orders/results')
                    .then((response) => {
                        this.pendingPrescriberCount = response.data.data.pendingPrescriberCount;
                        this.pendingPharmacyOrders = response.data.data.pendingPharmacyOrders;
                        this.pendingPharmacyOrdersCount = response.data.data.pendingPharmacyOrdersCount;
                    })
                    .catch((error) => {
                        this.postError(error.response.data.message);
                    })
                    .finally(() => {
                        this.loadingPendingPharmacy = false;
                        this.emitter.emit('alertupdate');
                    })
            }
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
        getOnHoldOrders() {
            axios.get('/orders/on-hold-postponed')
                .then((response) => {
                    this.onHoldOrders = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        deleteNote(id) {
            this.$swal({
                title: 'Delete Alert',
                html: 'Are you sure you want to delete this alert?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ff5151',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then((result) => {
                if (result.value) {
                    axios.post('/note/' + id + '/delete')
                        .then((response) => {
                            this.postSuccess(response.data.message);
                        })
                        .catch((error) => {
                            this.postError(error.response.data.message);
                        })
                        .finally(() => {
                            this.getOrderAlerts();
                            this.emitter.emit('alertupdate');
                        })
                }
            })
        },
        editNote(note = false) {
            this.emitter.emit('modal.open', 'note', note);
        },
        getPendingCSV() {
            let pending = [];

            this.pendingPharmacyOrders.forEach(item => {
                pending.push({ ReferenceNumber: item.Value });
            })

            this.exportCSV(pending, `Pending Pharmacy Orders ${new Date().toLocaleString()}`);
        },
        checkOrders(callback = false) {
            axios.get('/api/check-orders')
                .then((response) => {
                    if (callback) {
                        callback();
                    }
                })
                .catch((error) => {
                    this.postError(error.response.data.data);
                    this.loadingPendingPharmacy = false;
                })
        },
        // commented out untill mechanics confirmed
        redirectCallback() {
            if (this.orderFilter == 'new' && this.trayLength < 1 && (this.userInfo.role == 30 || this.userInfo.role == 35 || this.userInfo.role == 29)) {//disable for admins
                axios.post(`/tray/new/insert/20`)
                    .then((response) => {
                        this.postSuccess(response.data.message);
                        this.emitter.emit('tray.refresh');
                    })
                    .catch((error) => {
                        this.postError(error.response.data.message);
                    })
            }
        },
        changeOrder(filter) {
            if (filter == 'queried') {
                localStorage.setItem('dashboard.orderFilter', filter);
            } else {
                localStorage.setItem('dashboard.orderFilter', (this.userInfo.role == 20 || this.userInfo.role == 19) ? 'approved' : 'new');
            }
            this.orderFilter = filter;
            this.getStatistics();//make this a bit smarter
            this.getCount();
        },
        addToTray() {
            axios.post('/tray', { PrescriptionID: this.checked })
                .then((response) => {
                    this.postSuccess(response.data.message);
                    this.replaceChecked([]);
                    this.emitter.emit('tray.refresh');
                    this.emitter.emit('table.refresh');
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        safe(id) {
            axios.post(`/order-edit/${id}/status`, { status: 1 })
                .then((response) => {
                    this.emitter.emit('table.refresh');
                })
                .catch((error) => {
                    this.emitter.emit('table.refresh');
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.getStatistics();
                })
        },
        checkAll(limit = false) {
            axios.get(`/orders/ids?f=${this.orderFilter}&intray=false&limit=${limit}`)
                .then((response) => {
                    this.replaceChecked(response.data.data);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        checkByProperty(type, property) {
            axios.get(`/orders/ids?f=${this.orderFilter}&intray=false&type=${type}&property=${property}`)
                .then((response) => {
                    this.replaceChecked(response.data.data);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        checkAllVisible() {
            if (this.currentChecked && !this.match) {
                this.emitter.emit('table.uncheck.all');
            } else if (this.currentChecked && this.match) {
                this.emitter.emit('table.uncheck.all');
            } else {
                this.emitter.emit('table.check.all');
            }
        },
        clearChecked() {
            this.checkboxStatus = false;
            this.replaceChecked([]);
        },
        viewOrder(id) {
            this.$router.push({ name: 'prescription', params: { id: id } });
        },
    },
}
</script>
