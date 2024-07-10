<template>
    <div>
        <div class="infoHeader" :class="headerClass">
            <div class="floatLeft">
                <ul>
                    <li @dblclick="copyToClipboard(prescription.PrescriptionID)" style="min-width: 120px;"><span>ESA Order
                            ID:</span>{{ prescription.PrescriptionID || 'Loading' }}</li>
                    <li @dblclick="copyToClipboard(prescription.ReferenceNumber)" style="min-width: 120px;"><span>Client
                            Reference Number:</span>{{ prescription.ReferenceNumber || 'Loading' }}</li>
                </ul>
            </div>
            <!-- <div class="floatCenter" v-if="userInfo.role >= 50"> -->
            <div class="floatCenter">
                <ul>
                    <li>
                        <span>ORDER STATUS: </span>
                        <select :disabled="!fullyLoaded" v-model="prescriptionStatus">
                            <option disabled hidden value="">Select</option>
                            <option v-for="(value, key) in orderStatuses" :value="key" :key="key">{{ value }}</option>
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
                    <li><span>IN TRAY:</span>{{ tray.length }}</li>
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
                <section v-if="duplicate && ([2, 4, 5, 7, 8, 9, 10, 11, 1].includes(prescription.Status))"
                    class="notranslate">
                    <div class="infoBox warning">
                        <p>
                            There is a possible duplicate order with ID
                            <a target="_blank" :href="`#/prescription/${duplicate.PrescriptionID}`">{{
                                duplicate.PrescriptionID }}</a> that has the same customer reference id
                            {{ duplicate.ReferenceNumber }} with
                            status {{ orderStatuses[duplicate.Status] }}.<br />
                            Please investigate by <a target="_blank"
                                :href="`#/prescription/${duplicate.PrescriptionID}`">clicking here</a> before processing.
                        </p>
                    </div>
                </section>
                <section v-if="approved">
                    <div class="infoBox warning">
                        <p>
                            THIS ITEM HAS ALREADY BEEN APPROVED
                        </p>
                    </div>
                </section>
                <section class="notranslate card">
                    <div class="card-header prescription-info-header">
                        <h3>Prescription Info</h3>
                        <div class="delivery">
                            <!-- <a class="flag-eu" href="javascript:;"></a>  -->
                            <img v-if="prescription.UPSAccessPointAddress != 0" style="height: 20px;"
                                src="images/logo/ups_access_point.jpg" />
                            <img v-else-if="prescription.PaymentMethod != 0" style="height: 20px;"
                                src="images/logo/ups_cod.jpg" />
                            <img v-else style="height: 20px;" :src="imgMap[prescription.DeliveryID]" />
                        </div>
                    </div>
                    <div class="patientInfo card-body">
                        <div class="patient">
                            <ul>
                                <li>
                                    <span>Name: </span>
                                    <span style="text-transform: uppercase;" class="high-visibility">{{ prescription.Name
                                    }}</span>
                                </li>
                                <li>
                                    <span>Surname: </span>
                                    <span style="text-transform: uppercase;" class="high-visibility">{{ prescription.Surname
                                    }}</span>
                                </li>
                                <li class="gender"
                                    :class="[prescription.Sex == 'Male' ? 'blue' : prescription.Sex == 'Female' ? 'purple' : prescription.Sex == 'Transgender' ? 'orange' : 'grey']">
                                    <span>Gender: </span>
                                    <span class="high-visibility">{{ prescription.Sex }}</span>
                                </li>
                                <li>
                                    <span>Age: </span>
                                    <span class="high-visibility">{{ prescription.Age }}</span>
                                </li>
                                <li>
                                    <span>DOB: </span>
                                    <span class="high-visibility">{{ prescription.DOB }}</span>
                                </li>
                                <li v-bind:class="{ 'highlight-magenta': prescription.DoctorID == 42 }">
                                    <span>Prescriber: </span>
                                    <span class="high-visibility">{{ prescription.DTitle }} {{ prescription.DName }}
                                        {{ prescription.DSurname }} ({{ doctorTypes[prescription.DoctorType] }}: {{
                                            prescription.GMCNO }})</span>
                                </li>
                                <li>
                                    <span>Prescriber Address: </span>
                                    <span class="high-visibility"> {{ prescription.DoctorAddress1 }}, {{
                                        prescription.DoctorAddress2 }}, {{ prescription.DoctorAddress3 }}, {{
        prescription.DoctorAddress4 }} {{ prescription.DoctorPostCode }} </span>
                                </li>
                                <li>
                                    <span>Client: </span>
                                    <span class="high-visibility">{{ prescription.CompanyName }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="prescription-info">
                            <div class="prescription">
                                <ul>
                                    <li><span>Recieved Date: </span>{{ timestampToDate(prescription.CreatedDate) }}</li>
                                    <li v-if="prescription.Status == 8"><span>Shipped/Supplied Date:
                                        </span>{{ timestampToDate(prescription.UpdatedDate) }}</li>
                                    <li v-if="isCommercial"><span>Commercial Invoice Value: </span>{{ prescription.Repeats
                                    }}
                                        <a v-if="userInfo.role >= 50" href="javascript:;"
                                            class="smallTextBtn tertiaryBtn">Edit</a>
                                    </li>
                                    <li><span>Shipping: </span>Patient has Authorised 3rd Party Carrier</li>
                                    <li><span>Courier: </span>{{ prescription.Courier }}</li>
                                    <li v-if="prescription.TrackingCode != '' && prescription.TrackingCode != null">
                                        <span>Tracking Code: </span>{{ prescription.TrackingCode }}
                                    </li>
                                    <!-- <li><span>Prescription Number: </span>{{prescription.PrescriptionID}}</li>
                                <li><span>Reference Number: </span>{{prescription.ReferenceNumber}}</li> -->
                                </ul>
                            </div>
                            <div class="location">
                                <ul>
                                    <li><span>Home adress: </span>{{ prescription.Address1 + ' ' + prescription.Address2 + '
                                    '+prescription.Address3+' '+prescription.Address4 +' '+prescription.Postcode}}</li>
                                    <li><span>Delivery address: </span>{{ prescription.DAddress1 + ' ' +
                                        prescription.DAddress2 + '
                                    '+prescription.DAddress3+' '+prescription.DAddress4+' '+prescription.DPostcode}}
                                        <!-- <a v-if="userInfo.role >= 50" href="javascript:;" class="smallTextBtn tertiaryBtn">Edit</a> -->
                                    </li>
                                    <li><span>Country: </span>{{ prescription.CountryName }}</li>
                                    <li><span>Telephone: </span>
                                        <a
                                            :href="`tel:${prescription.Telephone ? prescription.Telephone : prescription.Mobile}`">
                                            {{ prescription.Telephone ? prescription.Telephone : prescription.Mobile }}
                                        </a>
                                    </li>
                                    <li><span>Email: </span>
                                        <a :href="`mailto:${prescription.Email}`">{{ prescription.Email }}</a>
                                    </li>
                                    <li>
                                        <span>Note:
                                            <span v-if="!prescription.Notes">No notes found on the system</span>
                                            <span style="white-space: pre-wrap; display: block;" v-else
                                                v-html="prescription.Notes"></span>
                                        </span>
                                    </li>
                                    <!--
                                <li><span>UPS access address: </span>(address line x3, city, post code. contry)
                                    <a v-if="userInfo.role >= 50" href="javascript:;" class="smallTextBtn tertiaryBtn">Edit</a>
                                </li>
                                -->
                                </ul>
                            </div>
                        </div>
                        <div class="activity">
                            <!-- <h3 style="text-align: center;">Activity Log</h3> -->
                            <ul class="activity-log-wrapper" v-if="activity.length != 0">
                                <h5 class="activity-log-header">Activities on this order</h5>
                                <li class="activity-log-item" v-for="a in activity" :key="a.ActivityID">
                                    <div class="activity-action">
                                        {{ a.Action }}

                                        <button v-if="(a.Type == 750 || a.Type == 751) && userInfo.role >= 50"
                                            class="clickable smallTextBtn secondaryBtn" @click="revert(a)">
                                            Revert
                                        </button>
                                    </div>
                                    <div class="activity-footer">
                                        <span>{{ a.Name }}</span><span>{{ a.Date }}</span>
                                    </div>
                                </li>
                            </ul>
                            <ul class="activity-log-wrapper" v-else>
                                <li class="activity-log-item">
                                    No activity log found
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </transition>
    </div>
</template>

<script>
import Error from '../../mixins/errors';
import Clipboard from '../../mixins/clipboard';
import orderStatuses from '../../mixins/constants/orderStatuses';
import doctorTypes from '../../mixins/constants/doctorTypes';
import DiffTable from './DiffTable';
import deliveryImgMap from '../../mixins/constants/deliveryImgMap';

export default {
    mixins: [Error, Clipboard, orderStatuses, doctorTypes, deliveryImgMap],
    // components: {
    //     EditOrderAddress
    // },
    data: function () {
        return {
            approved: false,
            prescription: false,
            errors: [],
            orderID: this.$route.params.id,
            userInfo: userInfo,
            questionnaire: [],
            notes: { critical: [], information: [], other: [], correspondence: [] },
            history: [],
            duplicate: false,
            currentOrderID: '',
            loading: true,
            questionnaireLoading: true,
            notesLoading: true,
            historyLoading: true,
            expandedQuestionnaire: false,
            prescriptionStatus: 0,
            activeTab: 'notes',
            activity: [],
            translate: true,
            questionnaireTranslation: [],
            statistics: {
                statistics: {
                    new: 0,
                    approved: 0,
                }
            },
            view: JSON.parse(localStorage.getItem('view')) || { products: 2 },
            timer: '',
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
        this.$root.$on('statistic.update', (e) => {
            this.getStatistics();
        });
    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.$root.$off('orderupdate');
        this.$root.$off('statistic.update');
    },
    computed: {
        isCommercial() {
            return this.prescription.Repeats != '0'
                && this.prescription.Repeats != ''
                && [143, 162, 205, 243].includes(this.prescription.DCountryCode);
        },
        fullyLoaded() {
            return !this.loading && !this.questionnaireLoading && !this.historyLoading && !this.notesLoading;
        },
        languageText() {
            return this.translate ? 'Show original language' : 'Translate to english';
        },
        headerClass() {
            return [1, 7].includes(this.prescription.Status) ? 'active'
                : [2, 8].includes(this.prescription.Status) ? 'success'
                    : [4, 5, 9, 10, 11, 12, 13, 14, 15].includes(this.prescription.Status) ? 'warning'
                        : [3, 6].includes(this.prescription.Status) ? 'error'
                            : '';
        },
        tray() {
            return this.$store.state.tray;
        },
        hasFridge() {
            let fridge = 0;

            this.prescription.Products.forEach((item) => {
                if (item.Fridge == 1) {
                    fridge++;
                }
            });

            return fridge == 0 ? false : true;
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
        },
        'view.products'() {
            localStorage.setItem('view', JSON.stringify(this.view));
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
        getOrderHistory() {
            this.historyLoading = true;
            axios.get('/order/' + this.currentOrderID + '/history')
                .then((response) => {
                    this.history = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.historyLoading = false;
                })
        },
        getQuestionnaire() {
            this.questionnaireLoading = true;
            axios.get('/questionnaire/' + this.currentOrderID)
                .then((response) => {
                    this.questionnaire = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.questionnaireLoading = false;
                })
        },
        getNotes() {
            this.notesLoading = true;
            axios.get(`/order/${this.currentOrderID}/notes`)
                .then((response) => {
                    this.notes = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.notesLoading = false;
                })
        },
        deleteNote(id) {
            axios.post('/note/' + id + '/delete')
                .then((response) => {
                    this.postSuccess(response.data.message);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.getNotes();
                })
        },
        getOrderData() {
            this.search();
            this.getQuestionnaire();
            this.getOrderHistory();
            this.getActivity();
            this.getNotes();
            // this.checkIfApproved();
            this.checkOrderStatuses();
        },
        editDetails(prescription) {
            this.editingOrder = !this.editingOrder;
        },
        //used for updating status through the dropdown
        updateStatus() {
            this.$root.$emit('prescriptionloading');//we need to let the footer know that the prescription is loading
            axios.post('/order-edit/' + this.prescription.PrescriptionID + '/status', { status: this.prescriptionStatus })
                .then((response) => {
                    if (this.prescriptionStatus != 1) {
                        this.$root.$emit('tray.remove', this.prescription.PrescriptionID);
                    }

                    this.$root.$emit('statistic.update');
                    this.postSuccess(response.data.message);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.getOrderData();
                })
        },
        statusClass(status) {
            return [1, 7].includes(status) ? 'active'
                : [2, 8].includes(status) ? 'success'
                    : [4, 5, 9, 10, 11, 12, 13, 14, 15].includes(status) ? 'warning'
                        : [3, 6].includes(status) ? 'error'
                            : '';
        },
        timestampToDate(timestamp) {
            let date = new Date(timestamp * 1000);
            // date.setMonth(date.getMonth() + 1);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
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
        },
        translateQuestionnaire() {
            this.getQuestionnaire();
            this.translate = !this.translate
        },
        openNote() {
            this.$root.$emit('modal.open', 'note');
        },
        // checkIfApproved(){
        //     axios.get(`/order/${this.currentOrderID}/approved`)
        //     .then((response) => {
        //         this.approved = response.data.data;
        //     })
        //     .catch((error) => {
        //         this.postError(error.response.data.message);
        //     })
        // },
        checkOrderStatuses() {
            axios.get(`/order/${this.currentOrderID}/statuses`)
                .then((response) => {
                    this.approved = response.data.data.approved;
                    this.duplicate = response.data.data.duplicate;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        redirect(id) {
            let url = `#/prescription/${id}`;
            window.open(url, '_blank');

            // this.$router.push({name: 'prescription', params: {id: id}});
        },
        //revert an activity
        revert(activity) {
            // all this just to avoid importing vue at the start
            (async () => {
                let Vue = (await import("vue")).default;

                let ComponentClass = Vue.extend(DiffTable)
                let instance = new ComponentClass({
                    propsData: {
                        oldObject: this.prescription,
                        newObject: JSON.parse(JSON.parse(activity.Arguments)),
                    }
                })
                instance.$mount();

                this.$swal({
                    title: 'Are you sure you want to do this?',
                    // html: `This will revert the order details to the previous state! ${JSON.parse(activity.Arguments)}`,
                    html: `<p>This will revert the order details to the previous state! Please review the changes below:</p> ${instance.$el.outerHTML}`,
                    type: 'warning',
                    showCancelButton: true,
                    customClass: 'swal-wide',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, revert it!'
                }).then((result) => {
                    if (result.value) {
                        axios.post(`/order-edit/revert/${activity.ActivityID}`)
                            .then((response) => {
                                this.postSuccess(response.data.message);
                            })
                            .catch((error) => {
                                this.postError(error.response.data.message);
                            })
                            .finally(() => {
                                this.getOrderData();
                            })
                    }
                })
            })();
        }
    }
}
</script>
