<template>
    <transition name="fade">
        <div class="esa-modal">
            <div class="backdrop" @click="close()">

            </div>
            <div class="modal">
                <transition name="fade">
                    <div class="loader" v-show="loading">Loading...</div>
                </transition>

                <div class="modal-header">
                    <h3>Redelivery</h3>
                </div>
                <div class="modal-body">
                    <div class="redelivery-selection" v-if="!selected" style="width: 100%; text-align:center;">
                        <h3 style="text-align:center;">Please select the method of redelivery</h3>
                        <br>
                        <button class="btn btnSize01 secondaryBtn" @click="redelivery()">Redelivery to Existing
                            Address</button>
                        <button class="btn btnSize01 secondaryBtn" @click="selectAddressUpdate()">Redelivery to New
                            Address</button>
                    </div>
                    <div class="redelivery-selection" v-if="selected" style="width: 100%; align-self: flex-start;">
                        <transition name="fade">
                            <form
                                v-if="countries.length != 0 && companies.length != 0 && !loading && Object.keys(confirmationChanges).length == 0 && Object.keys(confirmationChangesUPS).length == 0"
                                @submit.prevent="save" class="pxp-form address-form mb-20">
                                <div class="form-column" style="width: 100%;">
                                    <h3>Delivery Details</h3>
                                    <div v-if="columnDelivery.includes(value)" class="form-group form-group-2"
                                        v-for="(key, value) in details.order" :key="value">
                                        <label :for="key">{{ alias[value].title }}</label>
                                        <label :class="getCounterColor(value, details.order)" class="input-count"
                                            v-if="alias[value].value" :for="key">{{ details.order[value] ?
                                                details.order[value].length : 0 }}/{{ alias[value].value }}</label>
                                        <input :disabled="disabledFields.includes(value)"
                                            v-if="!['JVM', 'UPSAccessPointAddress', 'CountryCode', 'DCountryCode', 'DeliveryID', 'Notes'].includes(value)"
                                            class="" :name="key" :placeholder="''" v-model="details.order[value]">
                                        <select v-else-if="['DCountryCode', 'CountryCode'].includes(value)"
                                            v-model="details.order[value]"
                                            :class="[details.order[value] && details.order[value] != '' ? 'select-dropdown-active' : '']">
                                            <option v-for="country in countries" :value="country.CountryID">{{ country.Name
                                            }}
                                            </option>
                                        </select>
                                        <select v-else-if="['DeliveryID'].includes(value)" v-model="details.order[value]"
                                            :class="[details.order[value] && details.order[value] != '' ? 'select-dropdown-active' : '']">
                                            <option v-for="company in companies" :value="company.SettingID">{{ company.Name
                                            }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </transition>

                        <transition name="fade">
                            <div v-if="(Object.keys(confirmationChanges).length > 0 || Object.keys(confirmationChangesUPS).length > 0) && !loading"
                                class="pxp-form mb-20" style="height: auto;">
                                <div class="infoBox warning">
                                    <p>Please review and confirm all the changes in the order before saving!</p>
                                </div>

                                <DiffTableAddress :old-object="confirmationOld" :new-object="confirmationChanges"
                                    :old-object-u-p-s="confirmationOldUPS" :new-object-u-p-s="confirmationChangesUPS"
                                    :countries-prop="countries" :companies-prop="companies" />
                            </div>
                        </transition>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btnSize01 tertiaryBtn bigButton" @click="save()" :disabled="loading"
                        v-if="!isEqual(details.order, details.oldOrder) || !isEqual(details.ups, details.oldUPS) && selected && !loading">
                        <span v-if="!saveConfirmation">
                            Review
                        </span>
                        <span v-else>
                            Save and Redeliver
                        </span>
                    </button>

                    <button
                        v-if="(!isEqual(details.order, details.oldOrder) || !isEqual(details.ups, details.oldUPS)) && saveConfirmation"
                        :disabled="loading" @click="back()" class="btn btnSize01 tertiaryBtn bigButton">
                        <span>
                            Back
                        </span>
                    </button>

                    <button :disabled="loading" @click="close()" class="btn btnSize01 secondaryBtn bigButton">
                        Cancel
                    </button>
                    <!-- <button :disabled="loading" @click="submit()" class="btn btnSize01 primaryBtn">
                        Submit
                    </button> -->
                </div>
                <!-- <div v-if="loading" class="loader" style="">Loading...</div> -->
                <span class="close" @click="close()">X</span>
            </div>
        </div>
    </transition>
</template>

<script>
import Error from '../mixins/errors'
import Modal from './Modal.vue';
import DiffTableAddress from './pages/DiffTableAddress.vue';
import PrescriptionColumns from './../mixins/constants/prescriptionColumns';

export default {
    extends: Modal,
    props: ['orderID'],
    mixins: [Error, PrescriptionColumns],
    components: { DiffTableAddress },
    data() {
        return {
            selected: false,
            loading: false,
            watch: false,
            countries: [],
            companies: [],
            details: {
                order: {},
                oldOrder: {},
                ups: {},
                oldUps: {},
                details: {},
            },
            saveConfirmation: false,
            confirmationChanges: {},
            confirmationChangesUPS: {},
            confirmationOld: {},
            confirmationOldUPS: {},
            disabledFields: [],
        }
    },
    mounted() {
    },
    computed: {
        columnDelivery() {
            let columns = ['DAddress1', 'DAddress2', 'DAddress3', 'DAddress4', 'DPostcode', 'DCountryCode', 'DeliveryID'];

            return columns;
        },
    },
    watch: {
        'details.order.DCountryCode': function () {
            if (this.watch) {
                this.getDeliveryCompany();
            }
        },
        'details.order.DeliveryID': function () {
            if (this.watch) {
                this.getPostcodeFormatting();
            }
        }
    },
    methods: {
        getOrderDetails(newAddress = false) {
            this.watch = false;

            axios.get('/order-edit/' + this.orderID)
                .then((response) => {
                    this.details = response.data.data;

                    if (newAddress) {
                        this.details.order.DAddress1 = '';
                        this.details.order.DAddress2 = '';
                        this.details.order.DAddress3 = '';
                        this.details.order.DAddress4 = '';
                        this.details.order.DPostcode = '';
                    }

                    this.loading = false;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                    this.loading = false;
                })
                .finally(() => {
                    this.watch = true;
                })
        },
        close() {
            this.saveConfirmation = false;
            this.confirmationChanges = {};
            this.confirmationOld = {};
            this.confirmationOld = {};
            this.confirmationOldUPS = {};
            this.details = { order: {}, oldOrder: {}, ups: {}, oldUps: {} };//clean up after
            this.$emit('closeredelivery');
        },
        back() {
            this.saveConfirmation = false;
            this.confirmationChanges = {};
            this.confirmationChangesUPS = {};
        },
        redelivery() {
            this.loading = true;
            axios.post(`/order/${this.orderID}/redeliver`)
                .then((response) => {
                    this.postSuccess(response.data.message);
                    this.show.modal = false;
                    this.$root.$emit('orderupdate');
                    this.close();
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        selectAddressUpdate() {
            this.selected = true;
            this.getCountries();
            this.getCompanies();
            this.getOrderDetails(true);
        },
        updateAddress() {

        },
        getCountries() {
            axios.get('/countries')
                .then((response) => {
                    this.countries = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        getCompanies() {
            axios.get('/delivery-companies')
                .then((response) => {
                    this.companies = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        validateAddress(callback = false) {
            this.loadingValidation = true;

            axios.post(`/api/validate-address/${this.currentOrderID}`)
                .then((response) => {
                    this.postSuccess(response.data.message);
                    if (callback) {
                        callback();
                    }
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.loadingValidation = false;
                    this.search();
                })
        },
        getCounterColor(value, object) {
            if (object[value] != null && this.alias[value].value) {
                if (object[value].length > 0 && this.alias[value].combined && object[this.alias[value].combined] != null) {
                    if ((object[value].length + object[this.alias[value].combined].length) <= this.alias[value].value) {
                        return 'input-count-success';
                    } else {
                        return 'input-count-danger';
                    }
                } else if (object[value].length > 0 && object[value].length <= this.alias[value].value) {
                    return 'input-count-success';
                } else if (object[value].length > this.alias[value].value) {
                    return 'input-count-danger';
                }
            }

            return '';
        },
        getDeliveryCompany() {
            axios.post(`/order-edit/${this.orderID}/delivery-company`, this.details.order)
                .then((response) => {
                    let data = response.data.data;

                    if (data.DeliveryID) {
                        this.details.order.DeliveryID = data.DeliveryID;
                    }

                    if (data.CountryCode) {
                        this.details.order.CountryCode = data.CountryCode;
                    }

                    this.getPostcodeFormatting();
                    this.postSuccess('Delivery company updated');

                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        getPostcodeFormatting() {
            if (this.details.order.DeliveryID == 10) {
                axios.post(`/order-edit/${this.orderID}/postcode-formatting`, this.details.order)
                    .then((response) => {
                        let data = response.data.data;

                        if (data.Postcode) {
                            this.details.order.Postcode = data.Postcode;
                        }

                        if (data.DPostcode) {
                            this.details.order.DPostcode = data.DPostcode;
                        }
                    })
                    .catch((error) => {
                        this.postError(error.response.data.message);
                    })
            }
        },
        save(validate = false) {
            if (this.saveConfirmation) {
                this.submit(validate);
            } else {
                let orderDetails = JSON.parse(JSON.stringify(this.details.order));
                delete orderDetails.ClientID;

                axios.post(`/order-edit/check/${this.orderID}`, { order: orderDetails, ups: this.details.ups })
                    .then((response) => {
                        if (Object.keys(response.data.data.changes).length > 0 || Object.keys(response.data.data.changesUPS).length) {
                            this.confirmationChanges = response.data.data.changes;
                            this.confirmationChangesUPS = response.data.data.changesUPS;
                            this.confirmationOld = response.data.data.old;
                            this.confirmationOldUPS = response.data.data.oldUPS;
                            this.saveConfirmation = true;
                        } else {
                            this.saveConfirmation = false;
                        }
                    })
                    .catch((error) => {
                        this.saveConfirmation = false;
                        this.postError(error);
                    })
            }
        },
        submit(validate = false) {
            let orderDetails = JSON.parse(JSON.stringify(this.details.order));
            delete orderDetails.ClientID;

            this.loading = true;

            axios.post(`/api/validate-address/${this.orderID}`, { addressChange: orderDetails })
                .then((response) => {
                    if (response.data.success) {
                        this.postSuccess('Address Validated');
                        axios.post('/order-edit/' + this.orderID, { order: orderDetails, ups: this.details.ups })
                            .then((response) => {
                                this.postSuccess('Saved');
                                this.redelivery();
                            })
                            .catch((error) => {
                                this.postError(error);
                            })
                            .finally(() => {
                                this.saveConfirmation = false;
                                this.loading = false;
                            })
                    } else {
                        this.postError('Could not validate address');
                    }
                })
                .catch((error) => {
                    this.postError(error);
                    this.loading = false;
                })
        },
        isEqual: _.isEqual,
    },
}
</script>
