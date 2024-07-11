<template>
    <div class="content prescription-pool">
        <section class="card">
            <div class="card-header">
                <h3>Prescription Pool</h3>
            </div>
            <div class="card-body" style="display: flex; justify-content: space-between;">
                <div>
                    <button class="btn btnSize02 secondaryBtn mb-10" @click="toggleOrderList()" :title="showListText">
                        {{ showListText }}
                    </button>
                    <button class="btn btnSize02 secondaryBtn mb-10" @click="viewAssigned()"
                        title="View all orders assigned to you">
                        View Assigned Orders
                    </button>
                    <button v-if="printLog.length > 0" class="btn btnSize02 secondaryBtn mb-10"
                        @click="showLogs = !showLogs">
                        {{ showLogs ? 'Hide' : 'Show' }} Print Logs
                    </button>
                    <button v-if="tray.length > 0" :title="'Release orders assigned to ' + userInfo.name"
                        @click="release(userInfo.esa_user_id, false)" class="btn btnSize02 tertiaryBtn">
                        Release Orders
                    </button>
                    <button v-else class="btn btnSize02 secondaryBtn mb-10" title="Release all assigned orders"
                        :disabled="count.available == orders.length" @click="release(false, false, true)">
                        Release All
                    </button>
                </div>
                <transition name="fade">
                    <div class="prescription-pool_print-log" v-if="printLog.length > 0 && showLogs">
                        <ul>
                            <li style="border-bottom: 1px solid gainsboro;">Print Log</li>
                            <li v-for="log in printLog" :key="log.PrescriptionID">
                                <span>
                                    {{ log.action }}
                                    <b>
                                        <a target="_blank" :href="`#/prescription/${log.PrescriptionID}`">{{
                                            log.PrescriptionID }}</a>
                                    </b>
                                    on {{ new Date(log.time).toLocaleTimeString("en-GB") }}
                                </span>
                                <button style="padding: 4px;" class="btn btnSize03 secondaryBtn"
                                    @click="reprint(log.PrescriptionID)">Reprint</button>
                            </li>
                        </ul>
                    </div>
                </transition>
            </div>

            <transition name="fade">
                <div v-if="idsVisible" class="card-body order-id-list">
                    <hr>
                    <ul v-if="orders.length > 0">
                        <li class="pool-list-layout">
                            <div class="pool-column">
                                <b>Order ID</b>
                            </div>
                            <div class="pool-column">
                                <b>Allocated To</b>
                            </div>
                            <div class="pool-column">
                                <b>Type</b>
                            </div>
                            <div class="pool-actions">
                                <b>Tools</b>
                            </div>
                        </li>
                        <li class="pool-list-layout" v-for="order in orders" :key="order.PrescriptionID">
                            <div class="pool-column">
                                {{ order.PrescriptionID }}
                            </div>
                            <div class="pool-column">
                                <span v-if="order.name == null && order.surname == null">
                                    Not Assigned
                                </span>
                                <span v-else>{{ order.name + ' ' + order.surname }}</span>
                            </div>

                            <div class="pool-column">
                                <!-- <b v-if="order.ClientID == 51">EVEADAM</b> -->
                                <!-- <b v-else-if="order.DeliveryID == 5">Royal Mail</b> -->
                                <b v-if="order.DeliveryID == 5">Royal Mail</b>
                                <b v-else-if="order.DeliveryID == 4">DPD</b>
                                <b v-else-if="order.DeliveryID == 7 && order.PaymentMethod == 0">UPS</b>
                                <b v-else-if="order.DeliveryID == 7 && order.PaymentMethod != 0">UPS COD</b>
                                <b v-else-if="order.DeliveryID == 10">DHL</b>
                                <b v-else>UNKNOWN</b>
                            </div>

                            <div class="pool-actions">
                                <button :disabled="order.UserID == userInfo.esa_user_id || userInfo.role != 20"
                                    @click="allocate(false, false, order.DispenserPoolID)"
                                    class="btn btnSize02 tertiaryBtn">
                                    Take Over
                                </button>

                                <button :disabled="order.UserID == 0" @click="release(false, order.DispenserPoolID)"
                                    class="btn btnSize02 tertiaryBtn ml-20">
                                    Release
                                </button>
                            </div>
                        </li>
                    </ul>
                    <div v-else>
                        No orders found
                    </div>
                </div>
            </transition>

        </section>

        <QuickTray />

        <section v-if="tray.length == 0" class="card">
            <div class="card-header pool-list-layout">
                <div class="pool-column">
                    Dispenser
                </div>
                <div class="pool-column">
                    Available Orders
                </div>
                <div class="pool-actions">
                    Tools
                </div>
            </div>

            <div class="card-body">
                <ul>
                    <li class="pool-list-layout">
                        <div class="pool-column">
                            <b>AVAILABLE IN THE POOL</b>
                        </div>
                        <div class="pool-column">
                            <b>{{ count.available }}</b>
                        </div>
                        <div class="pool-actions">
                            <span class="ml-20"><b>ALLOCATE NEW (MAX 15)</b></span>
                            <button title="Take over all available Royal Mail orders"
                                :disabled="(userInfo.role != 20 && userInfo.role != 19) || count.rml == 0 || (!trayCompany.includes('rml') && trayCompany.length > 0)"
                                @click="allocate(false, 'rml', false)" class="btn btnSize02 tertiaryBtn ml-20">
                                Royal Mail <b>({{ count.rml }})</b>
                            </button>

                            <button title="Take over all available DPD orders"
                                :disabled="(userInfo.role != 20 && userInfo.role != 19) || count.dpd == 0 || (!trayCompany.includes('dpd') && trayCompany.length > 0)"
                                @click="allocate(false, 'dpd', false)" class="btn btnSize02 tertiaryBtn ml-20">
                                DPD <b>({{ count.dpd }})</b>
                            </button>
                        </div>
                    </li>

                    <li class="pool-list-layout" v-for="dispenser in dispensers" :key="dispenser.id">
                        <div class="pool-column">
                            {{ dispenser.name }}
                            <b v-if="dispenser.id == userInfo.id">(CURRENT USER)</b>
                        </div>
                        <div class="pool-column">
                            <b>{{ dispenser.count }}</b>
                        </div>
                        <div class="pool-actions">
                            <button :title="'Take over orders assigned to ' + dispenser.name"
                                :disabled="dispenser.count == 0" @click="allocate(dispenser.esa_user_id, false, false)"
                                v-if="dispenser.id != userInfo.id" class="btn btnSize02 tertiaryBtn mr-20">
                                TAKE OVER
                            </button>

                            <button :title="'Release orders assigned to ' + dispenser.name"
                                :disabled="dispenser.count == 0" @click="release(dispenser.esa_user_id, false)"
                                class="btn btnSize02 tertiaryBtn">
                                RELEASE
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

    </div>
</template>

<script>
import Error from '../../mixins/errors';
import QuickTray from '../pages/prescriptionpool/QuickTray.vue';

export default {
    components: {
        QuickTray
    },
    mixins: [Error],
    data: function () {
        return {
            idsVisible: false,
            showLogs: false,
            orders: [],
            dispensers: [],
            userInfo: userInfo,
            imgMap: {
                3: 'images/logo/tnt.png',
                4: 'images/logo/dpd.png',
                5: 'images/logo/rmail.png',
                7: 'images/logo/ups.png',
                70: 'images/logo/ups_access_point.jpg',
                8: 'images/logo/tnt.png',
                10: 'images/logo/dhl.png',
            },
        }
    },
    computed: {
        showListText() {
            return this.idsVisible ? "Hide List of Order ID's" : "Show List of Order ID's";
        },
        availableCount() {
            return this.orders.filter((item) => item.UserID === 0).length;
        },
        tray() {
            return this.$store.state.tray;
        },
        trayIds() {
            return this.$store.state.tray.map(order => order.PrescriptionID);
        },
        printLog() {
            return this.$store.state.printLog;
        },
        trayCompany() {
            let companies = [];

            this.tray.forEach((item) => {
                if (item.DeliveryID == 5 && item.CompanyName != 'EveAdam' && !item.JVM) {
                    if (!companies.includes('rml')) {
                        companies.push('rml');
                    }
                }

                if (item.DeliveryID == 4 && item.CompanyName != 'EveAdam' && !item.JVM) {
                    if (!companies.includes('dpd')) {
                        companies.push('dpd');
                    }
                }

                if (item.DeliveryID == 7 && item.PaymentMethod == 0 && item.CompanyName != 'EveAdam' && !item.JVM) {
                    if (!companies.includes('ups')) {
                        companies.push('ups');
                    }
                }

                if (item.DeliveryID == 7 && item.PaymentMethod != 0 && item.CompanyName != 'EveAdam' && !item.JVM) {
                    if (!companies.includes('upscod')) {
                        companies.push('upscod');
                    }
                }

                if (item.DeliveryID == 10 && item.CompanyName != 'EveAdam' && !item.JVM) {
                    if (!companies.includes('dhl')) {
                        companies.push('dhl');
                    }
                }

                if (item.CompanyName == 'EveAdam' && !item.JVM) {
                    if (!companies.includes('eveadam')) {
                        companies.push('eveadam');
                    }
                }

                if (item.JVM == 1) {
                    if (!companies.includes('jvm')) {
                        companies.push('jvm');
                    }
                }
            })

            return companies;
        },
        count() {
            let response = {
                available: 0,
                rml: 0,
                dpd: 0,
                ups: 0,
                upscod: 0,
                dhl: 0,
                eveadam: 0,
                jvm: 0,
            }

            this.orders.forEach(item => {
                if (item.UserID == 0) {
                    response.available++;
                }

                if (item.DeliveryID == 5 && item.UserID == 0) {
                    response.rml++;
                }

                if (item.DeliveryID == 4 && item.UserID == 0) {
                    response.dpd++;
                }
            });

            return response;
        }
    },
    mounted() {
        this.refresh();
        this.emitter.on
        this.emitter.on('tray.clear', () => {
            this.refresh();
        })
    },
    methods: {
        getPendingOrders() {
            axios.post('/prescription-pool/orders-list', { ids: this.trayIds })
                .then((response) => {
                    console.log('response');
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        refresh() {
            this.getOrders();
            this.getDispensers();
        },
        toggleOrderList() {
            this.idsVisible = !this.idsVisible;
            if (this.idsVisible) {
                this.refresh();
            }
        },
        getOrders() {
            axios.get('/prescription-pool/orders')
                .then((response) => {
                    this.orders = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        getDispensers() {
            axios.get('/prescription-pool/dispensers')
                .then((response) => {
                    this.dispensers = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        allocate(userID = false, deliveryID = false, orderID = false) {
            axios.post('/prescription-pool/allocate', { userID: userID, deliveryID: deliveryID, orderID: orderID })
                .then((response) => {
                    this.refresh();
                    this.emitter.emit('tray.refresh');
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        release(userID = false, dispenserPoolID = false, all = false) {
            if (all) {
                this.checkMessage('Are you sure you want to release all orders!', () => {
                    this.releaseRequest(userID, dispenserPoolID, all);
                })
            } else {
                this.releaseRequest(userID, dispenserPoolID, all);
            }

        },
        releaseRequest(userID = false, dispenserPoolID = false, all = false) {
            axios.post('/prescription-pool/release', { userID: userID, dispenserPoolID: dispenserPoolID, all: all })
                .then((response) => {
                    this.refresh();
                    this.emitter.emit('tray.refresh');
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        viewAssigned() {
            this.emitter.emit('tray.toggle')
        },
        checkMessage(message, callback) {
            this.$swal({
                title: 'Are you sure you want to release all orders?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, release everything!'
            }).then((result) => {
                if (result.value) {
                    callback();
                }
            })
        },
        reprint(id) {
            this.emitter.emit('prescriptionpool.reprint', id);
        },
    }
}
</script>
