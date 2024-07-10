<template>
    <div>
        <div v-if="backdrop" class="backdrop" @click="close()">
        </div>
        <div class="modal" id="draggable-div-address" ref="parentEl">
            <div v-if="!loading" class="modal-header draggable-div-header" id="draggable-div-header-address"
                target="parentEl">
                <transition name="fade">
                    <section class="flexContent">
                        <div class="orderDetails">
                            <img :src="iconPaper" />
                            <ul>
                                <li><span>Order #: </span>{{ orderID }}</li>
                                <li><span>Name: </span>{{ details.order.Name }}</li>
                                <li><span>Surname: </span>{{ details.order.Surname }}</li>
                                <li><span>Status: </span>{{ orderStatus }}</li>
                                <li v-if="details.order.TrackingCode != '' && details.order.TrackingCode != null">
                                    <span>Tracking Code: </span>{{ details.order.TrackingCode }}
                                </li>
                                <li
                                    v-if="details.order.Repeats != '0' && details.order.Repeats != '' && [143, 162, 205, 243].includes(details.order.DCountryCode)">
                                    <span>Commercial value: </span>{{ details.order.Repeats }}
                                </li>
                            </ul>
                        </div>
                    </section>
                </transition>

                <transition name="fade">
                    <section v-if="products.length != 0" class="flexContent">
                        <div class="productListItem mb-10" v-for="p in products">
                            <div class="title">
                                <h3>{{ p.Name }}, {{ p.Dosage }} x {{ p.Quantity }} {{ p.Unit }}</h3>
                            </div>
                        </div>
                    </section>
                </transition>
            </div>
            <transition name="fade">
                <form
                    v-if="countries.length != 0 && companies.length != 0 && !loading && Object.keys(confirmationChanges).length == 0 && Object.keys(confirmationChangesUPS).length == 0"
                    @submit.prevent="save" class="pxp-form address-form mb-20">
                    <div class="form-column">
                        <h3>Patient Details</h3>
                        <div v-if="columnPatient.includes(value)" class="form-group form-group-2 pb-10"
                            v-for="(key, value) in details.order" :key="value">
                            <label :for="key">{{ alias[value].title }}</label>
                            <label :class="getCounterColor(value, details.order)" class="input-count"
                                v-if="alias[value].value" :for="key">
                                {{ details.order[value] ? details.order[value].length +
                                    details.order[alias[value].combined].length : 0 }}/{{ alias[value].value }}
                            </label>
                            <input :disabled="disabledFields.includes(value)" class="" :name="key" :placeholder="''"
                                v-model="details.order[value]">
                        </div>
                        <h3>Delivery Details</h3>
                        <div v-if="columnDelivery.includes(value)" class="form-group form-group-2"
                            v-for="(key, value) in details.order" :key="value">
                            <label :for="key">{{ alias[value].title }}</label>
                            <label :class="getCounterColor(value, details.order)" class="input-count"
                                v-if="alias[value].value" :for="key">{{ details.order[value] ? details.order[value].length :
                                    0 }}/{{ alias[value].value }}</label>
                            <input :disabled="disabledFields.includes(value)"
                                v-if="!['JVM', 'UPSAccessPointAddress', 'CountryCode', 'DCountryCode', 'DeliveryID', 'Notes'].includes(value)"
                                class="" :name="key" :placeholder="''" v-model="details.order[value]">
                            <select v-else-if="['DCountryCode', 'CountryCode'].includes(value)"
                                v-model="details.order[value]"
                                :class="[details.order[value] && details.order[value] != '' ? 'select-dropdown-active' : '']">
                                <option v-for="country in countries" :value="country.CountryID">{{ country.Name }}</option>
                            </select>
                            <select v-else-if="['DeliveryID'].includes(value)" v-model="details.order[value]"
                                :class="[details.order[value] && details.order[value] != '' ? 'select-dropdown-active' : '']">
                                <option v-for="company in companies" :value="company.SettingID">{{ company.Name }}</option>
                            </select>
                            <select v-else-if="['UPSAccessPointAddress'].includes(value)" v-model="details.order[value]"
                                :class="[details.order[value] && details.order[value] != '' ? 'select-dropdown-active' : '']">
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                            <select v-else-if="['JVM'].includes(value)" v-model="details.order[value]"
                                :class="[details.order[value] && details.order[value] != '' ? 'select-dropdown-active' : '']">
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                        </div>

                        <div class="form-group form-group-2">
                            <label for="saturday-delivery">Saturday Delivery</label>
                            <label class="switch" style="width: 60px;"
                                :class="[!canSetSaturdayDelivery ? 'disabled-slider' : '']"
                                :title="!canSetSaturdayDelivery ? 'Can not switch Saturday Delivery on when the day is not Thursday after 17:00 or Friday before 17:00' : 'Switch to Saturday Delivery'">
                                <input id="saturday-delivery"
                                    :class="[details.order.SaturdayDelivery == 1 ? 'slider-checked' : '']" type="checkbox"
                                    @click="saturdayDeliveryCheck()" :disabled="!canSetSaturdayDelivery"
                                    :value="details.order.SaturdayDelivery == 1 ? true : false">
                                <span class="slider"></span>
                            </label>
                        </div>

                        <div class="form-group form-group-2"
                            v-if="details.order.Notes != null && details.order.Notes != ''">
                            <label for="Notes">{{ alias['Notes'].title }}</label>
                            <textarea style="min-width: 300px; min-height: 60px; line-height: 1;"
                                placeholder="Add notes here if you want them to show for dispensers and customer support"
                                v-model="details.order.Notes" class="form-control tBoxSize02"></textarea>
                        </div>
                    </div>

                    <div class="form-column">
                        <h3>Home Details</h3>
                        <div v-if="columnHome.includes(value)" class="form-group form-group-2"
                            v-for="(key, value) in details.order" :key="value">
                            <label :for="key">{{ alias[value].title }}</label>
                            <!-- <label :class="getCounterColor(value, details.order)" class="input-count" v-if="alias[value].value" :for="key">{{ details.order[value] ? details.order[value].length : 0 }}/{{alias[value].value}}</label> -->
                            <input :disabled="disabledFields.includes(value)"
                                v-if="!['CountryCode', 'DCountryCode', 'DeliveryID', 'Notes'].includes(value)" class=""
                                :name="key" :placeholder="''" v-model="details.order[value]">
                            <select v-else-if="['DCountryCode', 'CountryCode'].includes(value)"
                                v-model="details.order[value]"
                                :class="[details.order[value] && details.order[value] != '' ? 'select-dropdown-active' : '']">
                                <option v-for="country in countries" :value="country.CountryID">{{ country.Name }}</option>
                            </select>
                            <select v-else-if="['DeliveryID'].includes(value)" v-model="details.order[value]"
                                :class="[details.order[value] && details.order[value] != '' ? 'select-dropdown-active' : '']">
                                <option v-for="company in companies" :value="company.SettingID">{{ company.Name }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-column">
                        <h3 v-if="details.ups != null">UPS Access Point</h3>
                        <div class="form-group" v-for="(key, value) in details.ups" :key="value">
                            <label :for="key">{{ alias[value].title }}</label>
                            <input :disabled="disabledFields.includes(value)"
                                v-if="!['CountryCode', 'DCountryCode', 'APNotificationLanguage'].includes(value)" class=""
                                :name="key" :placeholder="''" v-model="details.ups[value]">
                            <label :class="getCounterColor(value, details.ups)" class="input-count"
                                v-if="alias[value].value" :for="key">
                                {{ details.ups[value] ? details.ups[value].length : 0 }}/{{ alias[value].value }}
                            </label>
                            <select v-else-if="['DCountryCode', 'CountryCode'].includes(value)" v-model="details.ups[value]"
                                :class="[details.order[value] && details.order[value] != '' ? 'select-dropdown-active' : '']">
                                <option v-for="country in countries" :value="country.CountryID">{{ country.Name }}</option>
                            </select>
                            <select v-else-if="['APNotificationLanguage'].includes(value)" v-model="details.ups[value]"
                                :class="[details.order[value] && details.order[value] != '' ? 'select-dropdown-active' : '']">
                                <option v-for="country in countries" :value="country.CountryID">{{ country.Name }}</option>
                            </select>
                        </div>
                    </div>

                    <!-- <div class="form-column" style="width: 100%;" v-if="details.order.DeliveryID == 4">
                        <div class="form-group form-group-2">
                            <label for="saturday-delivery">Saturday Delivery</label>
                            <label class="switch" style="width: 60px;">
                                <input id="saturday-delivery" type="checkbox" v-model="details.order.SaturdayDelivery">
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div> -->
                </form>
            </transition>

            <transition name="fade">
                <div v-if="(Object.keys(confirmationChanges).length > 0 || Object.keys(confirmationChangesUPS).length > 0) && !loading"
                    class="pxp-form mb-20">
                    <div class="infoBox warning">
                        <p>Please review and confirm all the changes in the order before saving!</p>
                    </div>

                    <DiffTableAddress :old-object="confirmationOld" :new-object="confirmationChanges"
                        :old-object-u-p-s="confirmationOldUPS" :new-object-u-p-s="confirmationChangesUPS"
                        :countries-prop="countries" :companies-prop="companies" />
                </div>
            </transition>

            <transition name="fade">
                <div v-if="!loading" class="modal-footer">
                    <button class="btn btnSize01 tertiaryBtn bigButton" @click="save()"
                        v-if="!isEqual(details.order, details.oldOrder) || !isEqual(details.ups, details.oldUPS)">
                        <span v-if="!saveConfirmation">
                            Review
                        </span>
                        <span v-else>
                            Save
                        </span>
                    </button>

                    <button
                        v-if="(!isEqual(details.order, details.oldOrder) || !isEqual(details.ups, details.oldUPS)) && saveConfirmation && orderStatus == 'SAFETYCHECK'"
                        class="btn btnSize01 tertiaryBtn bigButton" @click="save(true)">
                        Save & Validate
                    </button>

                    <button
                        v-if="(!isEqual(details.order, details.oldOrder) || !isEqual(details.ups, details.oldUPS)) && saveConfirmation"
                        @click="back()" class="btn btnSize01 tertiaryBtn bigButton">
                        <span>
                            Back
                        </span>
                    </button>

                    <button @click="close()" class="btn btnSize01 secondaryBtn bigButton">Cancel</button>
                </div>
            </transition>
            <div v-if="loading" class="loader" style="">Loading...</div>
            <span class="backdrop-toggle" @click="toggleBackdrop()" title="Unfocus the modal"><i
                    class="fa fa-clone"></i></span>
            <span class="close" @click="close()" title="Close the modal"><i class="fa fa-close"></i></span>
        </div>
    </div>
</template>

<script>
import Error from '../../mixins/errors';
import PrescriptionColumns from '../../mixins/constants/prescriptionColumns';
import DiffTableAddress from '../pages/DiffTableAddress.vue';
import { iconPaper } from '../../assets';

export default {
    mixins: [Error, PrescriptionColumns],
    props: ['orderID', 'orderStatus', 'products'],
    components: { DiffTableAddress },
    data: function () {
        return {
            countries: [],
            companies: [],
            details: {
                order: {},
                oldOrder: {},
                ups: {},
                oldUps: {},
                details: {},
            },
            columnHome: ['Address1', 'Address2', 'Address3', 'Address4', 'Postcode', 'CountryCode', 'APNotificationLanguage', 'APNotificationValue'],
            columnPatient: ['Name', 'Surname', 'Telephone', 'Email'],
            disabledFields: ['TokenID', 'Repeats'],
            loading: true,
            dragEventTriggered: false,
            backdrop: true,
            watch: false,
            //save confirmation
            saveConfirmation: false,
            confirmationChanges: {},
            confirmationChangesUPS: {},
            confirmationOld: {},
            confirmationOldUPS: {},
        }
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
        },
        loading() {
            if (!this.loading && !this.dragEventTriggered && document.getElementById("draggable-div-address")) {
                setTimeout(() => {
                    this.dragEventTriggered = true;
                    dragElement(document.getElementById("draggable-div-address"));

                    function dragElement(elmnt) {
                        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

                        if (document.getElementById("draggable-div-header-address")) {
                            /* if present, the header is where you move the DIV from:*/
                            document.getElementById("draggable-div-header-address").onmousedown = dragMouseDown;
                        } else {
                            /* otherwise, move the DIV from anywhere inside the DIV:*/
                            elmnt.onmousedown = dragMouseDown;
                        }

                        function dragMouseDown(e) {
                            e = e || window.event;
                            e.preventDefault();
                            // get the mouse cursor position at startup:
                            pos3 = e.clientX;
                            pos4 = e.clientY;
                            document.onmouseup = closeDragElement;
                            // call a function whenever the cursor moves:
                            document.onmousemove = elementDrag;
                        }

                        function elementDrag(e) {
                            e = e || window.event;
                            e.preventDefault();
                            // calculate the new cursor position:
                            pos1 = pos3 - e.clientX;
                            pos2 = pos4 - e.clientY;
                            pos3 = e.clientX;
                            pos4 = e.clientY;
                            // set the element's new position:
                            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                        }

                        function closeDragElement() {
                            /* stop moving when mouse button is released:*/
                            document.onmouseup = null;
                            document.onmousemove = null;
                        }
                    }
                }, 100);
            } else {
                this.dragEventTriggered = false;
                this.backdrop = true;
            }
        }
    },
    computed: {
        columnDelivery() {
            let columns = ['DAddress1', 'DAddress2', 'DAddress3', 'DAddress4', 'DPostcode', 'DCountryCode', 'DeliveryID', 'UPSAccessPointAddress', 'TrackingCode', 'Repeats', 'TokenID'];

            if (this.details.details.ClientID == 51 && this.details.details.JVM != 2) {
                columns.push('JVM');
            }

            return columns;
        },
        canSetSaturdayDelivery() {
            let date = new Date();
            let day = date.getDay();
            let hour = date.getHours();

            if (day == 4 || day == 5) {
                if ((day == 4 && hour >= 17) || (day == 5 && hour <= 17)) {
                    return true;
                }
            }

            return false;
        },
    },
    mounted() {
        this.getCountries();
        this.getCompanies();
        this.getOrderDetails();
        this.$root.$on('modal.close.all', this.close);
    },
    destroyed() {
        this.$root.$off('modal.close.all');
    },
    methods: {
        getOrderDetails() {
            this.watch = false;

            axios.get('/order-edit/' + this.orderID)
                .then((response) => {
                    this.details = response.data.data;
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
        /**
         * Fetches country title by country id
         */
        getCountryTitle(id, countries = false) {
            let title = 'Unknown';

            if (!countries) {
                countries = this.countries;
            }

            countries.forEach((country) => {
                if (country.CountryID == id) {
                    title = country.Name;
                }
            })

            return title;
        },
        /**
         * Fetches company title by SettingID id
         */
        getCompanyTitle(id, companies = false) {
            let title = 'Unknown';

            if (!companies) {
                companies = this.companies;
            }

            companies.forEach((company) => {
                if (company.SettingID == id) {
                    title = company.Name;
                }
            })

            return title;
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
        close() {
            this.saveConfirmation = false;
            this.confirmationChanges = {};
            this.confirmationOld = {};
            this.confirmationOld = {};
            this.confirmationOldUPS = {};
            this.details = { order: {}, oldOrder: {}, ups: {}, oldUps: {} };//clean up after
            this.$emit('closeorder');
        },
        toggleBackdrop() {
            this.backdrop = !this.backdrop;
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
                            this.$emit('closeorder');
                        }
                    })
                    .catch((error) => {
                        this.saveConfirmation = false;
                        this.postError(error);
                    })
            }
        },
        saturdayDeliveryCheck() {
            if (this.details.order.SaturdayDelivery == 0) {
                this.$swal({
                    title: 'DPD Saturday Delivery should not be selected without authorisation',
                    html: 'If authorisation has been granted, click OK, otherwise click Cancel',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#ff5151',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.value) {
                        this.details.order.SaturdayDelivery = 1;
                    }
                })
            } else {
                this.details.order.SaturdayDelivery = 0;
            }
        },
        submit(validate = false) {
            let orderDetails = JSON.parse(JSON.stringify(this.details.order));
            delete orderDetails.ClientID;

            axios.post('/order-edit/' + this.orderID, { order: orderDetails, ups: this.details.ups })
                .then((response) => {
                    this.postSuccess('Saved');
                    if (validate) {
                        this.$root.$emit('prescription.validate');
                    }
                })
                .catch((error) => {
                    this.postError(error);
                })
                .finally(() => {
                    this.close();
                    this.saveConfirmation = false;
                    this.$root.$emit('orderupdate');
                })
        },
        back() {
            this.saveConfirmation = false;
            this.confirmationChanges = {};
            this.confirmationChangesUPS = {};
        },
        isEqual: _.isEqual,
    }
}
</script>
