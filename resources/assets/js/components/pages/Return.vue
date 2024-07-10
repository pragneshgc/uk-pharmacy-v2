<template>
    <div>
        <div class="infoHeader" :class="headerClass">
            <div class="floatLeft">
                <ul>
                    <li @dblclick="copyToClipboard(prescription.PrescriptionID)" style="min-width: 120px;"><span>ORDER
                            #:</span>{{ prescription.PrescriptionID || 'Loading' }}</li>
                    <li @dblclick="copyToClipboard(prescription.ReferenceNumber)" style="min-width: 120px;"><span>REF
                            #:</span>{{ prescription.ReferenceNumber || 'Loading' }}</li>
                </ul>
            </div>
            <div class="floatCenter">
                <ul>
                    <li>
                        <span>ORDER STATUS: </span>
                        <select :disabled="!fullyLoaded" v-model="prescriptionStatus">
                            <option disabled hidden value="">Select</option>
                            <option v-for="(value, key) in orderStatuses" :value="key">{{ value }}</option>
                        </select>
                        <button class="btn btnSize04 primaryBtn"
                            v-if="fullyLoaded && prescriptionStatus != prescription.Status" @click="updateStatus()">
                            Update
                        </button>
                    </li>
                </ul>
            </div>
            <div class="floatRight">
                <ul>
                    <li><span>IN TRAY:</span>{{ 0 }}</li>
                    <li><span>NEW:</span>{{ statistics.statistics.new }}</li>
                    <li><span>APPROVED:</span>{{ statistics.statistics.approved }}</li>
                </ul>
            </div>
        </div>

        <!--ERRORS-->
        <transition name="fade">
            <section v-if="errors.length != 0">
                <div class="infoBox warning">
                    <p v-for="error in errors">
                        {{ error }}
                    </p>
                </div>
            </section>
        </transition>
        <!--/ERRORS-->
        <!--PRESCRIPTION-->
        <transition name="fade">
            <div v-if="prescription" class="content">
                <section v-if="duplicate" class="notranslate card">
                    <div v-if="duplicate" class="infoBox warning"> <a href="javascript:;" class="close"></a>
                        <p>There is a possible duplicate order with id 377371 that has the same customer reference id
                            316764735 with
                            status new.<br />
                            Please investigate by <a href="javascript:;">clicking here</a> before processing.
                        </p>
                    </div>
                </section>
                <section class="notranslate card">
                    <div class="card-header">
                        <h3>Prescription Info</h3>
                    </div>
                    <div class="patientInfo card-body">
                        <div class="patient">
                            <ul>
                                <li><span>Name: </span>{{ prescription.Name }}</li>
                                <li><span>Surname: </span>{{ prescription.Surname }}</li>
                                <li><span>Gender: </span>{{ prescription.Sex }}</li>
                                <li><span>DOB: </span>{{ prescription.DOB }}</li>
                                <li><span>Age: </span>{{ prescription.Age }}</li>
                                <li><span>Prescriber: </span>{{ prescription.DoctorName }}</li>
                            </ul>
                        </div>
                        <div class="location">
                            <ul>
                                <li><span>Home adress: </span>{{ prescription.Address1 + ' ' + prescription.Address2 + '
                                '+prescription.Address3+' '+prescription.Address4}}</li>
                                <li><span>Delivery address: </span>{{ prescription.DAddress1 + ' ' + prescription.DAddress2
                                    + '
                                '+prescription.DAddress3+' '+prescription.DAddress4}}
                                </li>
                            </ul>
                        </div>
                        <div class="prescription">
                            <ul>
                                <li><span>Date: </span>{{ timestampToDate(prescription.CreatedDate) }}</li>
                                <li v-if="isCommercial"><span>Commercial Invoice Value: </span>{{ prescription.Repeats }}
                                    <a v-if="userInfo.role >= 50" href="javascript:;"
                                        class="smallTextBtn tertiaryBtn">Edit</a>
                                </li>
                                <li><span>Shipping: </span>Patient has Authorised 3rd Party Carrier</li>
                                <li><span>Client: </span>{{ prescription.CompanyName }}</li>
                                <li><span>Prescription Number: </span>{{ prescription.PrescriptionID }}</li>
                                <li><span>Reference Number: </span>{{ prescription.ReferenceNumber }}</li>
                            </ul>
                        </div>
                        <div class="delivery">
                            <!-- <a class="flag-eu" href="javascript:;"></a>  -->
                            <img v-if="prescription.UPSAccessPointAddress != 0" style="height: 70px;"
                                :src="ups_access_point" />
                            <img v-else-if="prescription.PaymentMethod != 0" style="height: 70px;" :src="ups_cod" />
                            <img v-else style="height: 70px;" :src="imgMap[prescription.DeliveryID]" />
                        </div>
                    </div>
                </section>
                <section class="notranslate card">
                    <div class="card-header">
                        <h3>
                            Customer Service Return Note
                        </h3>
                    </div>
                    <div class="card-body">
                        <div class="infoBox warning">
                            <b>Customer Out - Package Damaged - Product Issue - Lost </b>
                        </div>
                    </div>
                </section>
                <section class="notranslate products-list card">
                    <div class="card-header">
                        <h3>Products</h3>
                    </div>
                    <div class="card-body">
                        <div class="medicineTitle" v-for="product in prescription.Products">
                            <div class="title">
                                <h4>
                                    <div class="medicineName">
                                        {{ product.Description }}, {{ product.Quantity * product.Dosage }} {{ product.Units
                                        }}
                                        <br />
                                        <small style="color: orange;">Fridge</small>
                                    </div>
                                    <div class="hover-info medicineTooltip" v-if="product.Description != product.Name"
                                        title="The product description does not match the ESA product name">
                                        <h5>ESA name:</h5> <span class="text-warning">{{ product.Name }}</span>
                                        <i aria-hidden="true" class="fa fa-info-circle"></i>
                                    </div>
                                </h4>
                            </div>
                            <div class="instructions">
                                <div style="display: inline-block;" class="btn btnSize01 tertiaryBtn dropdown bin-dropdown">
                                    Bin <i aria-hidden="true" class="fa fa-trash"></i>
                                    <ul class="dropdown-menu">
                                        <li @click="checkAll()" class="dropdown-menu-item">
                                            Tampered
                                        </li>
                                        <li class="dropdown-menu-item">
                                            Expired
                                        </li>
                                    </ul>
                                </div>
                                <button class="btn btnSize01 primaryBtn">Shelf</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="card" :class="[translate ? '' : 'notranslate']">
                    <div class="card-header">
                        <h3>Patient Info</h3>
                    </div>
                    <div class="scrollingSuccessors return-scroll card-body">
                        <!--DETAILS-->
                        <div class="medicineDetails">
                            <ul class="tabs">
                                <li :class="{ 'active': activeTab == 'information' }" @click="activeTab = 'information'">
                                    <a href="javascript:;">Medical Information</a>
                                </li>
                                <li :class="{ 'active': activeTab == 'activity' }" @click="activeTab = 'activity'">
                                    <a href="javascript:;">Activities</a>
                                </li>
                            </ul>
                            <div v-if="activeTab == 'information'">
                                <h2>Medical information</h2>
                                <ul class="critical">
                                    <li>Relates to allergies and medical conditions. This are added by AI and pharmacists.
                                    </li>
                                    <li>Relates to allergies and medical conditions. This are added by AI and pharmacists.
                                    </li>
                                </ul>
                                <h2>Other notes</h2>
                                <ul>
                                    <li>Relates to notes sent wirh perscription, communication with perscriber and notes
                                        added
                                        by pharmacists.
                                    </li>
                                </ul>
                            </div>
                            <div v-if="activeTab == 'activity'">
                                <ul class="activity-log-wrapper" v-if="activity.length != 0">
                                    <li class="activity-log-item" v-for="a in activity">
                                        <div class="activity-action">
                                            {{ a.Action }}
                                        </div>
                                        <div class="activity-footer">
                                            <span>{{ a.Name }}</span><span>{{ a.Date }}</span>
                                        </div>
                                    </li>
                                </ul>
                                <p v-else>No activity log found</p>
                            </div>
                        </div>
                        <!--/DETAILS-->
                        <div class="medicineHistory">
                            <h2>Medical history</h2>
                            <ul v-if="!historyLoading" class="new" v-for="(value, key) in history"
                                :class="statusClass(value.Status)">
                                <li class="date">{{ value.CreatedDate }} <a target="_blank" :href="'#/prescription/' + key"
                                        class="smallTextBtn secondaryBtn">View</a></li>
                                <li v-for="product in value.Products" class="medicine">
                                    {{ product.Name }}, {{ product.Quantity * product.Dosage }} {{ product.Units }}
                                </li>
                                <li class="client">{{ value.Client }}</li>
                            </ul>
                            <div v-if="historyLoading" class="dotloader loader-relative" style="">Loading...</div>
                            <div v-if="!historyLoading && history.length == 0">No previous orders available..</div>
                        </div>
                    </div>
                </section>
            </div>
        </transition>
        <!--/PRESCRIPTION-->
    </div>
</template>

<script>
import Error from '../../mixins/errors'
import Clipboard from '../../mixins/clipboard'
import orderStatuses from '../../mixins/constants/orderStatuses'

import ups_access_point from '../../../../../public/images/logo/ups_access_point.jpg'
import ups_cod from '../../../../../public/images/logo/ups_cod.jpg'

export default {
    mixins: [Error, Clipboard, orderStatuses],
    data: function () {
        return {
            prescription: false,
            errors: [],
            orderID: this.$route.params.id,
            userInfo: userInfo,
            history: [],
            duplicate: false,
            currentOrderID: '',
            loading: true,
            historyLoading: true,
            prescriptionStatus: 0,
            activeTab: 'information',
            activity: [],
            translate: true,
            statistics: {
                statistics: {
                    new: 0,
                    approved: 0,
                }
            },
            timer: '',
            imgMap: {
                3: 'images/logo/tnt.png',
                4: 'images/logo/dpd.png',
                5: 'images/logo/rmail.png',
                7: 'images/logo/ups.png',
                8: 'images/logo/tnt.png',
                10: 'images/logo/dhl.png',
            }
        }
    },
    mounted() {
        this.getOrderData();
        this.getStatistics();
        this.timer = setInterval(this.getStatistics, 120000);
        //we need to listen for this one in case an
        //order gets updated outside the component
        this.$root.$on('orderupdate', (e) => {
            this.getOrderData();
        });
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    computed: {
        isCommercial() {
            return this.prescription.Repeats != '0'
                && this.prescription.Repeats != ''
                && [143, 162, 205, 243].includes(this.prescription.DCountryCode);
        },
        fullyLoaded() {
            return !this.loading && !this.historyLoading;
        },
        headerClass() {
            return [1, 2, 7, 8].includes(this.prescription.Status) ? 'active'
                : [4, 5, 9, 10, 11, 12, 13, 14, 15].includes(this.prescription.Status) ? 'warning'
                    : [3, 6].includes(this.prescription.Status) ? 'error'
                        : '';
        }
    },
    watch: {
        '$route.params'() {
            if (typeof this.$route.params.id != 'undefined' && this.currentOrderID != this.$route.params.id) {
                this.orderID = this.$route.params.id;
                this.getOrderData();
            }
        },
        fullyLoaded() {
            if (this.fullyLoaded) {
                this.$root.$emit('prescriptionloaded', { prescription: this.prescription });
            }
        },
        prescription() {
            if (this.prescription) {
                this.prescriptionStatus = this.prescription.Status;
            }
        }
    },
    methods: {
        /*Search for a prescription*/
        search() {
            this.errors = [];
            this.prescription = false;
            if (this.orderID != '') {
                this.currentOrderID = this.orderID;
                this.orderID = '';
            }

            this.loading = true;
            axios.get('/order/' + this.currentOrderID)
                .then((response) => {
                    this.prescription = response.data.data;
                    //this.$root.$emit('prescriptionloaded');
                    this.loading = false;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                    this.errors = error.response.data.data;
                    this.loading = false;
                })

            if (this.$route.params.id != this.currentOrderID) {
                this.$router.push({ params: { id: this.currentOrderID } });
            }

        },
        getOrderData() {
            this.search();
            this.getOrderHistory();
            this.getActivity();
        },
        getOrderHistory() {
            ///order/{id}/history
            this.historyLoading = true;
            axios.get('/order/' + this.currentOrderID + '/history')
                .then((response) => {
                    this.history = response.data.data;
                    this.historyLoading = false;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                    this.historyLoading = false;
                })
        },
        editDetails(prescription) {
            this.editingOrder = !this.editingOrder;
        },
        updateStatus() {
            this.$root.$emit('prescriptionloading');//we need to let the footer know that the prescription is loading
            axios.post('/order-edit/' + this.prescription.PrescriptionID + '/status', { status: this.prescriptionStatus })
                .then((response) => {
                    this.postSuccess(response.data.message);
                    this.getOrderData();
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                    this.getOrderData();
                })
        },
        statusClass(status) {
            return status == '1' ? 'new' : status == '4' ? 'queried' : status == '8' ? 'approved' : status == '7' ? 'approved'
                : status == '3' ? 'rejected' : 'queried';
        },
        timestampToDate(timestamp) {
            let date = new Date(timestamp * 1000);
            return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
        },
        getStatistics() {
            axios.get('/statistics')
                .then((response) => {
                    this.statistics = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        getActivity() {
            axios.get('/order/' + this.currentOrderID + '/activity')
                .then((response) => {
                    this.activity = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        }
    }
}
</script>
