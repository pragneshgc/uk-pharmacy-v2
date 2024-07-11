<template>
    <div class="footer" v-if="user.info.role != 4">
        <div class="tray-drawer" :class="{ 'open': show.tray }">
            <div class="tray-toolbar">
                <select v-if="[30, 35, 50, 60].includes(this.user.info.role)" v-model="user.selected"
                    class="table-dropdown" name="users" style="margin-right: 10px;">
                    <option default selected :value="user.info.id">
                        {{ user.info.name + ' ' + user.info.surname }}
                    </option>
                    <option v-for="user in user.list" :key="user.id" :value="user.id">
                        {{ user.name + ' ' + user.surname }}
                        <span v-if="user.id != 'new'">{{ ' (' + user.count + ')' }}</span>
                    </option>
                </select>
                <button v-if="user.selected != 'new'" :title="titlesText.clearTrayHelper"
                    class="btn btnSize02 secondaryBtn" @click="clearTray()" style="margin-right: 10px;">
                    {{ titlesText.clearTray }}
                </button>
                <button title="Take over all orders in tray" v-if="!usersTray && user.selected != 'new'"
                    class="btn btnSize02 secondaryBtn" @click="takeoverTray()">
                    Take over tray
                </button>
            </div>
            <div class="tray-table">
                <table>
                    <thead>
                        <tr>
                            <th>Prescription ID</th>
                            <th>Client</th>
                            <th>Courier</th>
                            <th>Reference Number</th>
                            <th>Status</th>
                            <th>Date/Time</th>
                            <th>Products</th>
                            <th v-if="user.selected != 'new'" style="width: 100px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="item in tray" :key="item.PrescriptionID">
                            <tr :class="{ 'active': ($route.params.id == item.PrescriptionID && tray.length != 0) }">
                                <td class="clickable" @click="selectFromTray(item.PrescriptionID)">
                                    {{ item.PrescriptionID }}
                                </td>
                                <td class="clickable" @click="selectFromTray(item.PrescriptionID)">
                                    {{ item.CompanyName }}
                                    <span v-if="item.JVM">
                                        <br>
                                        <b>Pouch</b>
                                    </span>
                                </td>
                                <td class="clickable" @click="selectFromTray(item.PrescriptionID)">
                                    <div style="display: inline-flex; align-items: center;">
                                        <div
                                            style="margin-right: 5px;text-align: center;min-width: 85px; height:25px; display: inline-block;">
                                            <img height="25"
                                                :src="imgMap[item.UPSAccessPointAddress != 0 ? 70 : item.DeliveryID]" />
                                        </div>
                                        <!-- {{ couriers[item.DeliveryID] }} -->
                                    </div>
                                    <!-- {{ couriers[item.DeliveryID] }} -->
                                </td>
                                <td class="clickable" @click="selectFromTray(item.PrescriptionID)">
                                    {{ item.ReferenceNumber }}
                                </td>
                                <td class="clickable" @click="selectFromTray(item.PrescriptionID)">
                                    {{ item.Status }}
                                </td>
                                <td class="clickable" @click="selectFromTray(item.PrescriptionID)">
                                    {{ item['Date/Time'] }}
                                </td>
                                <td class="clickable" @click="selectFromTray(item.PrescriptionID)">
                                    <ul>
                                        <!-- <li v-for="(value, index) in item.Products" :key="index">{{ value }}</li> -->
                                        <li v-for="(value, index) in item.Products" :key="index" v-html="value" />
                                    </ul>
                                </td>
                                <td v-if="user.selected != 'new'">
                                    <a class="btn btn-primary waves-effect table-icon" title="Remove from tray"
                                        @click="deleteTray(item.TrayID)">
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="footer-button-wrapper">
            <div class="formItemsGroup floatLeft">
                <div v-if="$route.name != 'prescription'">
                    <button v-if="user.info.role != 40" :title="titlesText.trayHelper" :class="{ 'active': show.tray }"
                        @click="toggleTray()" class="btn btnSize01 secondaryBtn">
                        {{ titlesText.tray }} ({{ tray.length }} orders)
                    </button>
                </div>
                <div v-else>
                    <button v-if="currentOrderInTray || user.info.role >= 50" :title="titlesText.trayHelper"
                        :class="{ 'active': show.tray }" @click="toggleTray()" class="btn btnSize01 secondaryBtn">
                        {{ titlesText.tray }} ({{ tray.length }} orders)
                    </button>

                    <div :title="titlesText.trayHelper" v-else-if="user.info.role != 20 && user.info.role != 40"
                        class="button-group">
                        <button :class="{ 'active': show.tray }" style="margin-right: 0px;" @click="toggleTray()"
                            class="btn btnSize01 secondaryBtn">
                            {{ titlesText.tray }} ({{ tray.length }} orders)
                        </button>
                        <button title="Add to tray" v-if="usersTray" @click="addToTray()"
                            class="btn btnSize01 secondaryBtn">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>

                    <button v-else-if="user.info.role == 20 || user.info.role == 19" :class="{ 'active': show.tray }"
                        @click="toggleTray()" class="btn btnSize01 secondaryBtn">
                        {{ titlesText.tray }} ({{ tray.length }} orders)
                    </button>

                    <button :title="titlesText.trayHelper" v-else-if="user.info.role != 40"
                        :class="{ 'active': show.tray }" @click="toggleTray()" class="btn btnSize01 secondaryBtn">
                        {{ titlesText.tray }} ({{ tray.length }} orders)
                    </button>

                    <button v-if="prescription.Status != 8 && [29, 30, 35].includes(user.info.role)"
                        title="Change the prescription priority (save for later)" @click="saveLater()"
                        :disabled="loadingPrescription" class="btn btnSize01 secondaryBtn">
                        Save for later
                    </button>

                    <div :title="titlesText.trayHelper" class="button-group">
                        <button style="margin-right: 0px;" title="View prescription in a window"
                            class="btn btnSize01 secondaryBtn" :disabled="loadingPrescription" @click="view()">
                            View Prescription
                        </button>

                        <button style="margin-right: 0px; border-right: 0;" title="View pharmacy label in a window"
                            class="btn btnSize01 secondaryBtn" :disabled="loadingPrescription" @click="viewLabel()">
                            View Label
                        </button>

                        <button style="margin-right: 0px;" title="Download prescription PDF"
                            class="btn btnSize01 secondaryBtn" @click="prescriptionDownload()"
                            :disabled="loadingPrescription">
                            <i class="fa fa-download"></i>
                        </button>

                        <button title="Print prescription" class="btn btnSize01 secondaryBtn"
                            @click="prescriptionPrint()" :disabled="loadingPrescription">
                            <i class="fa fa-print"></i>
                        </button>
                    </div>

                    <button title="Download prescription" class="btn btnSize01 secondaryBtn" @click="xmlDownload()"
                        :disabled="loadingPrescription">
                        <template v-if="isDownloading">
                            <i class="fa fa-spinner" aria-hidden="true"></i>
                        </template>
                        <template v-else>
                            <i class="fa fa-download" aria-hidden="true"></i> {{ prescription.file_type ?? 'XML' }}
                        </template>
                    </button>

                    <button title="Edit the order details" :disabled="loadingPrescription" @click="editDetails()"
                        class="btn btnSize01 secondaryBtn">
                        Edit
                    </button>

                    <button v-if="prescription.Status == 16 && !loadingPrescription" :disabled="loadingPrescription"
                        @click="redelivery()" title="Redeliver prescription"
                        class="btn btnSize01 secondaryBtn">Redelivery</button>
                </div>
            </div>

            <div class="formItemsGroup floatRight">
                <!-- DISPENSER -->
                <div v-if="[19, 20, 40, 50, 60].includes(user.info.role) && $route.name == 'prescription'"
                    style="position: relative;">
                    <div class="auto-grid" style="margin-right: 10px">
                        <div title="Pathology Request Form" :class="[printIcons.PathologyRequestForm ? 'active' : '']">
                            <b>Pathology</b>
                        </div>
                        <div title="Additional Information Page"
                            :class="[printIcons.ProductAdditionalInformation ? 'active' : '']">
                            <b>Info</b>
                        </div>
                        <div title="Product Information Leaflet"
                            :class="[printIcons.ProductInformationLeaflet ? 'active' : '']">
                            <b>PIL</b>
                        </div>
                    </div>

                    <div @click="dispenserPrint('delivery')" class="button-group" title="Print Delivery Note"
                        v-if="!isJVM">
                        <button :disabled="loadingPrescription || loading" style="margin-right: 0px;"
                            :class="[printed.DeliveryNote ? 'primaryBtn' : 'secondaryBtn']" class="btn btnSize01">
                            {{ !isJVM ? 'Delivery Note' : 'Delivery Note & Label' }}
                        </button>
                        <button :disabled="loadingPrescription || loading" style="margin-left: 0px;"
                            :class="[printed.DeliveryNote ? 'primaryBtn' : 'secondaryBtn']" class="btn btnSize01">
                            <input :class="{ 'unchecked': !printed.DeliveryNote }" :checked="printed.DeliveryNote"
                                :disabled="loadingPrescription || loading" type="checkbox" name="checkall">
                            <label for="checkall"></label>
                        </button>
                    </div>

                    <div @click="pouchPrint()" class="button-group" title="Print Delivery Note" v-else>
                        <button :disabled="loadingPrescription || loading" style="margin-right: 0px;"
                            :class="[printed.DeliveryNote ? 'primaryBtn' : 'secondaryBtn']" class="btn btnSize01">
                            Delivery Note & Label
                        </button>
                        <button :disabled="loadingPrescription || loading" style="margin-left: 0px;"
                            :class="[printed.DeliveryNote ? 'primaryBtn' : 'secondaryBtn']" class="btn btnSize01">
                            <input :class="{ 'unchecked': !printed.DeliveryNote }" :checked="printed.DeliveryNote"
                                :disabled="loadingPrescription || loading" type="checkbox" name="checkall">
                            <label for="checkall"></label>
                        </button>
                    </div>

                    <div class="button-group" title="Print Pharmacy Label" v-if="!isJVM">
                        <button @click="dispenserPrint('label')"
                            :disabled="loadingPrescription || !printed.DeliveryNote || loading"
                            style="margin-right: 0px;" :class="[printed.PharmacyLabel ? 'primaryBtn' : 'secondaryBtn']"
                            class="btn btnSize01">
                            Pharmacy Label
                        </button>
                        <button @click="dispenserPrint('label')"
                            :disabled="loadingPrescription || !printed.DeliveryNote || loading"
                            style="margin-left: 0px;" :class="[printed.PharmacyLabel ? 'primaryBtn' : 'secondaryBtn']"
                            class="btn btnSize01">
                            <input :class="{ 'unchecked': !printed.PharmacyLabel }" :checked="printed.PharmacyLabel"
                                :disabled="loadingPrescription || !printed.DeliveryNote || loading" type="checkbox"
                                name="checkall">
                            <label for="checkall"></label>
                        </button>
                    </div>

                    <!-- <button class="btn btnSize01 secondaryBtn" title="Leaflet">
                        <i class="fa fa-file"></i>
                    </button> -->
                </div>
                <!-- /DISPENSER -->

                <!-- EVERYONE -->
                <div v-if="!['prescription', 'returns'].includes($route.name)">
                    <!-- <select>
                        <option value="">Download CSV (TNT) non UK</option>
                        <option value="">Download CSV (TNT) non UK</option>
                    </select>
                    <button :disabled="loadingPrescription" class="btn btnSize01 primaryBtn">Send Request</button> -->
                </div>

                <div v-else-if="$route.name == 'returns'">
                    <button :disabled="loadingPrescription" class="btn btnSize01 tertiaryBtn">Cancel Order and
                        Finish</button>
                    <button :disabled="loadingPrescription" class="btn btnSize01 primaryBtn">Cancel Order and Resend
                        New</button>
                </div>

                <div v-else-if="[29, 30, 35].includes(user.info.role) || user.info.role >= 50">
                    <button title="Open the prescriber contact form" :disabled="loadingPrescription || !approveable"
                        v-if="prescription.Status == 1" @click="openContact()" class="btn btnSize01 secondaryBtn">
                        Show Options
                    </button>

                    <button :disabled="prescription.Status != 1 || loadingPrescription || loading || !approveable"
                        @click="changePrescriptionStatus(2)" title="Approve prescription"
                        class="btn btnSize01 primaryBtn">
                        Approve
                    </button>
                </div>
                <!-- /EVERYONE -->

                <button :disabled="loadingPrescription" v-if="$route.name == 'prescription' && tray.length > 1"
                    title="Go to next order" style="border: none;" @click="changePrescription('forward')"
                    class="next finish clickable">
                    Next
                </button>
                <button :disabled="loadingPrescription"
                    v-else-if="$route.name == 'prescription' && tray.length == 1 && currentOrderInTray" title="Finish"
                    style="border: none;" @click="finishTray()" class="next finish clickable">
                    {{ (user.info.role == 20 || user.info.role == 19) ? 'Finish' : 'in tray' }}
                </button>
            </div>
        </div>

        <transition name="fade">
            <EditOrderAddress @closeorder="editingOrder = !editingOrder" :products="[]"
                :orderID="prescription.PrescriptionID" :orderStatus="orderStatuses[prescription.Status]"
                v-if="editingOrder" />
        </transition>

        <PrescriberModal :orderID="prescription.PrescriptionID" modal-name="prescriber" />
        <NoteModal :orderID="prescription.PrescriptionID" modal-name="note" />

        <Modal class="duplicate-modal" modal-name="duplicate">
            <template v-slot:header>
                <h2>Same reference number was found for multiple orders. You can review them below:</h2>
            </template>
            <template v-slot:body>
                <data-table :data-url="`/orders/duplicate/${duplicateReference}`" column-class="col-lg-12"
                    table-title="Prescriptions" redirect-name="prescription" redirect-id="PrescriptionID"
                    :hidden-columns="['checked', 'disabled']" :redirect-callback="closeDuplicateModal" :column-map="{
                        'PrescriptionID': 'ID',
                        'DeliveryID': 'Courier',
                        'CompanyName': 'Client',
                        'ReferenceNumber': 'Ref',
                    }"></data-table>
            </template>
        </Modal>

        <RedeliveryModal v-if="redeliveryToggle" @closeredelivery="redeliveryToggle = !redeliveryToggle"
            class="redelivery-modal modal-sm" modal-name="redelivery" :orderID="prescription.PrescriptionID" />
    </div>
</template>
<script>
import OrderStatuses from '../../mixins/constants/orderStatuses';
import Error from '../../mixins/errors';
import Download from '../../mixins/download';
import Print from '../../mixins/print';
import PDF from '../../mixins/pdf'
import deliveryImgMap from '../../mixins/constants/deliveryImgMap';
import { useDefaultStore } from '../../stores/default.store';
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';

export default {
    setup() {
        const { tray } = storeToRefs(useDefaultStore());
        const { refreshTray } = useDefaultStore();

        return {
            tray,
            refreshTray
        }
    },
    components: {
        'EditOrderAddress': defineAsyncComponent(() => import('../pages/EditOrderAddress.vue')),
        'PrescriberModal': defineAsyncComponent(() => import('../PrescriberModal.vue')),
        'NoteModal': defineAsyncComponent(() => import('../NoteModal.vue')),
        'Modal': defineAsyncComponent(() => import('../Modal.vue')),
        'RedeliveryModal': defineAsyncComponent(() => import('../RedeliveryModal.vue')),
    },
    mixins: [OrderStatuses, Error, Download, Print, deliveryImgMap, PDF],
    data() {
        return {
            loadingPrescription: true,
            loading: false,
            prescription: false,
            editingOrder: false,
            redeliveryToggle: false,
            approveable: false,
            show: {
                tray: false
            },
            user: {
                info: userInfo,
                selected: userInfo.id,
                list: []
            },
            duplicateReference: 0,
            couriers: {
                3: 'TNT',
                4: 'DPD',
                5: 'RMAIL',
                7: 'UPS',
                8: 'TNH',
                10: 'DHL',
            },
            printed: {
                DeliveryNote: 0,
                PharmacyLabel: 0,
            },
            printIcons: {
                EveAdamLetter: 0,
                PathologyRequestForm: 0,
                ProductAdditionalInformation: 0,
                ProductInformationLeaflet: 0,
            },
            isDownloading: false
        }
    },
    mounted() {
        this.emitter.on('tray.toggle', () => {
            this.toggleTray();
        });

        this.emitter.on('tray.refresh', (e) => {
            this.getTray();
        });

        this.emitter.on('tray.changeprescriptionstatus', (e) => {
            this.prescription = { PrescriptionID: e.id }
            this.changePrescriptionStatus(e.status);
        });

        this.emitter.on('tray.remove', (id) => {
            this.deleteTrayByPrescription(id);
        });

        this.emitter.on('tray.remove.skip', (id) => {
            this.deleteTrayByPrescription(id, true);
        });

        this.emitter.on('prescriptionloaded', (e) => {
            this.loadingPrescription = false;

            if (typeof e.prescription.PrescriptionID == 'undefined') {
                this.postError('Prescription not loaded correctly. Please report to tech support and refresh the page!');
                this.loadingPrescription = true;
            }

            this.prescription = e.prescription;

            if (!this.currentOrderInTray) {
                this.checkApprovable(this.prescription.PrescriptionID);
            } else {
                this.approveable = true;
            }

            // get print records in case the user is a dispenser, customer support or admin
            if ([20, 40, 50, 60].includes(this.user.info.role)) {
                this.getPrintRecord();
                this.getPrintDetails();
            }
        });

        this.emitter.on('prescriptionloading', (e) => {
            this.loadingPrescription = true;
            this.approveable = false;
            this.printed = {
                DeliveryNote: 0,
                PharmacyLabel: 0,
            };
            this.printIcons = {
                EveAdamLetter: 0,
                PathologyRequestForm: 0,
                ProductAdditionalInformation: 0,
                ProductInformationLeaflet: 0,
            };
        });

        this.emitter.on('prescription.edit', (e) => {
            this.editDetails();
        });

        this.emitter.on('showduplicates', (e) => {
            this.duplicateReference = e.duplicateReference;
            this.emitter.emit('modal.open', 'duplicate');
        })

        document.onkeydown = (e) => {
            if (this.$route.name != 'prescription') {
                return;
            }

            switch (e.keyCode) {
                case 37:
                    if (document.activeElement.nodeName == 'BODY') {
                        this.changePrescription('back');
                        this.emitter.emit('modal.close.all');
                    }
                    break;
                case 39:
                    if (document.activeElement.nodeName == 'BODY') {
                        this.changePrescription('forward');
                        this.emitter.emit('modal.close.all');
                    }
                    break;
            }
        };

        //get tray objects here
        this.getTray();
        if ([29, 30, 35, 50, 60].includes(this.user.info.role)) {
            this.getPharmacists();
        }
        this.checkApprovable(this.$route.params.id);
    },
    computed: {
        currentOrderInTray() {
            return this.tray.some(prescription => prescription.PrescriptionID == this.$route.params.id)
        },
        //check if the currently loaded tray belongs to the authenticated user
        usersTray() {
            return this.user.info.id == this.user.selected;
        },
        titlesText() {
            return {
                tray: this.user.info.role != 20 ? 'My Tray' : 'Assigned',
                trayHelper: this.user.info.role != 20 ? 'Open your tray' : 'Show assigned orders',
                clearTray: this.user.info.role != 20 ? 'Clear Tray (release)' : 'Release Orders',
                clearTrayHelper: this.user.info.role != 20 ? 'Release a tray' : 'Release all assigned orders'
            };
        },
        isJVM() {
            let check = false;

            //might cause a bug
            if (typeof this.prescription.Products == 'undefined') {
                return check;
            }

            for (let product of this.prescription.Products) {
                if (product.JVM == 2) {
                    check = false;
                    break;
                }

                if (product.JVM == 0) {
                    if (this.prescription.JVM == 1) {
                        check = true;
                    }
                } else if (product.JVM == 1) {
                    if (this.prescription.ClientID == 51) {
                        check = true;
                    }
                }
            }

            return check;
        },
    },
    destroyed() {
        document.onkeydown = null;
        this.emitter.off('prescription.edit');
        this.emitter.off('prescriptionloaded');
        this.emitter.off('prescriptionloading');
        this.emitter.off('showduplicates');
        this.emitter.off('tray.open');
        this.emitter.off('tray.refresh');
        this.emitter.off('tray.remove');
        this.emitter.off('tray.remove.skip');
        this.emitter.off('tray.changeprescriptionstatus');
    },
    watch: {
        "user.selected"() {
            this.getTray(this.user.selected);
        }
    },
    methods: {
        finishTray() {
            if (this.user.info.role == 20 || this.user.info.role == 19) {
                this.checkIfPrintFinished(() => {
                    let currentStatus = JSON.parse(JSON.stringify(this.prescription.Status));

                    if (this.printed.DeliveryNote && this.printed.PharmacyLabel && currentStatus == 2 && this.currentOrderInTray && !this.isJVM) {
                        this.changePrescriptionStatus(7);
                        this.deleteTrayByPrescription(this.prescription.PrescriptionID);
                        this.prescription = false;
                    } else if (this.printed.DeliveryNote && currentStatus == 2 && this.currentOrderInTray && this.isJVM) {
                        this.sendJVMOrder(this.prescription.PrescriptionID);
                        this.changePrescriptionStatus(7);
                        this.deleteTrayByPrescription(this.prescription.PrescriptionID);
                    } else {
                        this.$router.push({ name: 'prescription pool' });
                    }
                }, true);
            } else {
                this.prescription = false;
                this.$router.push({ name: 'in tray' });
            }
        },
        changePrescription(direction, skip = false) {
            // let currentPrescriptionId = this.$route.params.id;
            if (this.tray.length == 0) {
                // localStorage.setItem('dashboard.orderFilter', 'new');//reset dashboard tray to new to show new orders
                if (this.user.info.role == 20 || this.user.info.role == 19) {
                    this.$router.push({ name: 'prescription pool' });
                } else {
                    this.$router.push({ name: 'in tray' });
                }
                return;
            }

            if (!this.loadingPrescription) {
                this.loadingPrescription = true;
                let currentStatus = JSON.parse(JSON.stringify(this.prescription.Status));

                let index = 0;
                if (this.currentOrderInTray) {
                    index = this.tray.findIndex(p => p.PrescriptionID == this.$route.params.id);

                    switch (direction) {
                        case 'forward':
                            if (index + 1 < this.tray.length) {
                                index = index + 1;
                            } else {
                                index = 0;
                            }

                            break;
                        case 'back':
                            if (index - 1 >= 0 && index - 1 < this.tray.length) {
                                index = index - 1;
                            } else {
                                index = this.tray.length - 1;
                            }

                            break;
                        default:
                            index = 0;
                            break;
                    }
                } else {
                    index = 0;
                }

                if (parseInt(this.tray[index].PrescriptionID) != parseInt(this.$route.params.id)) {
                    this.checkIfPrintFinished(() => {
                        //needs to be refactored
                        if (this.printed.DeliveryNote && this.printed.PharmacyLabel && (this.user.info.role == 20 || this.user.info.role == 19) && currentStatus == 2 && this.currentOrderInTray) {
                            if (this.isJVM) {
                                this.sendJVMOrder(this.prescription.PrescriptionID);
                            }
                            this.changePrescriptionStatus(7);

                            this.deleteTrayByPrescription(this.prescription.PrescriptionID);
                        } else if (this.printed.DeliveryNote && (this.user.info.role == 20 || this.user.info.role == 19) && currentStatus == 2 && this.currentOrderInTray && this.isJVM) {
                            this.sendJVMOrder(this.prescription.PrescriptionID);
                            this.changePrescriptionStatus(7);
                            this.deleteTrayByPrescription(this.prescription.PrescriptionID);
                        }

                        this.prescription = false;
                        this.$router.push({ name: 'prescription', params: { id: parseInt(this.tray[index].PrescriptionID) } });
                    }, false, skip);
                } else {
                    this.prescription = false;
                    localStorage.setItem('dashboard.orderFilter', (this.user.info.role == 20 || this.user.info.role == 19) ? 'approved' : 'new');//reset dashboard tray to new to show new orders
                    this.emitter.emit('orderupdate');
                    if (this.user.info.role == 20 || this.user.info.role == 19) {
                        this.$router.push({ name: 'prescription pool' });
                    } else {
                        this.$router.push({ name: 'in tray' });
                    }
                    this.loadingPrescription = false;
                }

            }
        },
        sendJVMOrder(id) {
            axios.post(`/jvm/${id}/send`)
                .then((response) => {
                    this.postSuccess(response.data.message);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        checkApprovable(id) {
            axios.get(`/tray/${id}/check`)
                .then((response) => {
                    if (!response.data.data) {
                        this.approveable = true;
                    } else {
                        this.approveable = false;
                    }
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        getPharmacists() {
            let type = 'pharmacists';

            if (this.user.info.role == 20 || this.user.info.role == 19) {
                type = 'dispensers';
            }

            axios.get(`/user/${type}`)
                .then((response) => {
                    this.user.list = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        toggleTray() {
            this.show.tray = !this.show.tray;
        },
        editDetails() {
            this.editingOrder = !this.editingOrder;
        },
        getTray(id = false) {
            let parameter = '';

            if (id) {
                parameter = `/${id}`;
            }

            axios.get(`/tray${parameter}`)
                .then((response) => {
                    this.refreshTray(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                    //this.postError(error.response.data.message);
                })
        },
        addToTray(id) {
            axios.post('/tray', { PrescriptionID: [this.$route.params.id] })
                .then((response) => {
                    this.postSuccess(response.data.message);
                    this.emitter.emit('tray.refresh');
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        selectFromTray(id) {
            this.$router.push({ name: 'prescription', params: { id: id } });
            this.show.tray = false;
        },
        //Clear a user tray (remove all attached orders)
        clearTray() {
            let parameter = '';

            if (!this.usersTray) {
                parameter = `/${this.user.selected}`;
            }

            axios.delete(`/tray/clear${parameter}`)
                .then((response) => {
                    this.$store.commit('clearTray');
                    this.postSuccess(response.data.message);
                    this.emitter.emit('table.refresh'); // this should only be called if there is a table present
                    this.emitter.emit('tray.clear'); // this event is used by the prescription pool
                    this.getPharmacists();
                    this.user.selected = this.user.info.id;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        //Take over a user tray (remove attached orders and add to authenticated user tray)
        takeoverTray() {
            axios.post(`/tray/${this.user.selected}/takeover`)
                .then((response) => {
                    this.postSuccess(response.data.message);
                    this.getPharmacists();
                    this.user.selected = this.user.info.id; // switching the user here will trigger a tray refresh
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        // delete tray item by id
        deleteTray(id) {
            if (id) {
                axios.delete(`/tray/${id}`)
                    .then((response) => {
                        this.$store.commit('removeTray', response.data.data);
                        this.postSuccess(response.data.message);
                        this.emitter.emit('table.refresh'); // this should only be called if there is a table present
                        this.emitter.emit('tray.clear'); // this event is used by the prescription pool
                    })
                    .catch((error) => {
                        this.postError(error.response.data.message);
                    })
            }
        },
        // delete a tray item by prescription id
        deleteTrayByPrescription(id, skip = false) {
            this.deleteTray(this.getTrayId(id));
            this.changePrescription('forward', skip);
        },
        //use prescription id to get the tray id
        getTrayId(id) {
            let trayItem = this.tray[this.tray.map(function (item) { return item.PrescriptionID; }).indexOf(parseInt(id))];

            if (typeof trayItem != 'undefined') {
                return trayItem.TrayID;
            } else {
                return false;
            }
        },
        //change the status of prescription
        changePrescriptionStatus(status) {
            // this.emitter.emit('prescriptionloading');
            this.loading = true;
            axios.post('/order-edit/' + this.prescription.PrescriptionID + '/status', { status: status })
                .then((response) => {

                    if (response.status == 200) {
                        this.emitter.emit('statistic.update');
                        this.deleteTrayByPrescription(this.prescription.PrescriptionID);
                        this.postSuccess(response.data.message);
                    }
                })
                .catch((error) => {
                    this.emitter.emit('orderupdate');
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        //open contact modal
        openContact() {
            this.emitter.emit('modal.open', 'prescriber');
        },
        //save later - change the priority of tray item
        saveLater() {
            axios.patch(`/tray/${this.getTrayId(this.prescription.PrescriptionID)}/lower-priority`)
                .then((response) => {
                    this.postSuccess('Order saved for later!');
                    this.emitter.emit('tray.refresh');
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        /**
         * View prescription in popup
         */
        view() {
            axios.get(`/order/${this.prescription.PrescriptionID}/view`)
                .then((response) => {
                    let url = `${response.data.data.url}?token=${this.user.info.token}`;

                    //a hack around in case the PDF was not generated
                    if (response.data.data.type == 'html') {
                        url = `https://esasys.co.uk/?showFile&PRESCRIPTIONID=${this.prescription.PrescriptionID}`;
                    }

                    window.open(url, '_blank', 'toolbar=0,location=0,menubar=0');
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        /**
         * View label in a popup
         */
        viewLabel() {
            axios.get(`/order/${this.prescription.PrescriptionID}/label`)
                .then((response) => {
                    let url = `${response.data.data.url}?token=${this.user.info.token}`;

                    window.open(url, '_blank', 'toolbar=0,location=0,menubar=0');
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        prescriptionDownload() {
            axios.get(`/order/${this.prescription.PrescriptionID}/view`)
                .then((response) => {
                    let url = response.data.data.url;
                    let type = response.data.data.type;
                    this.downloadURI(`${url}?token=${this.user.info.token}`, `${this.prescription.PrescriptionID}.${type}`);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                });
        },
        xmlDownload() {
            this.isDownloading = true;
            let file = this.prescription.PrescriptionID + ".xml";
            if (this.prescription.file_type) {
                file = this.prescription.PrescriptionID + "." + this.prescription.file_type;
            }
            //axios.get(`/order/${this.prescription.PrescriptionID}/download-file`);
            this.downloadURI(`/order/${this.prescription.PrescriptionID}/download-file`, file);
            this.isDownloading = false;
        },
        closeDuplicateModal() {
            this.emitter.emit('modal.close', 'duplicate');
        },
        prescriptionPrint() {
            axios.get(`/order/${this.prescription.PrescriptionID}/view`)
                .then((response) => {
                    let url = response.data.data.url;
                    let type = response.data.data.type;

                    if (type == 'pdf') {
                        this.printPage(`${url}?token=${this.user.info.token}&print=true`, true);
                        // this.printUrl(url);
                    } else {
                        this.printPage(`${url}?token=${this.user.info.token}&print=true`);
                    }
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        /*DISPENSER SPECIFIC*/
        checkIfPrintFinished(callback = false, finish = false, skip = false) {
            if ((this.printed.DeliveryNote && this.printed.PharmacyLabel && !this.isJVM) || (this.printed.DeliveryNote && this.isJVM) || this.user.info.role != 20 || skip) {
                callback();
            } else {
                let text = "Are you sure you want to go to another order, the current print has not been finished!";

                if (finish) {
                    text = "Are you sure you want to return to the prescription pool? The current print has not been finished!"
                }
                this.$swal({
                    title: 'Printing not finished!',
                    text: text,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, continue!'
                }).then((result) => {
                    if (result && callback && !result.dismiss) {
                        callback();
                    } else if (result && result.dismiss) {
                        this.loadingPrescription = false;
                        this.loading = false;
                    }
                })
            }
        },
        pouchPrint() {
            // if(this.prescription.JVM == 1){
            this.printed.PharmacyLabel = true;

            axios.get(`/order/${this.prescription.PrescriptionID}/id-label`)
                .then((response) => {
                    let url = response.data.data.url;
                    let type = response.data.data.type;
                    let printer = false;

                    if (localStorage.getItem('settings.application')) {
                        printer = JSON.parse(localStorage.getItem('settings.application')).labelPrinter;
                    }

                    this.printUrl(`${url}?token=${this.user.info.token}&print=true&label`, () => {
                        this.dispenserPrint('delivery');
                    }, 'pdf', printer, true);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
            // }
        },
        dispenserPrint(type) {
            //print routine here
            if (type == 'delivery') {
                this.printed.DeliveryNote = true;

                axios.get(`/order/${this.prescription.PrescriptionID}/view`)
                    .then((response) => {
                        let url = response.data.data.url;
                        let type = response.data.data.type;
                        let printer = false;

                        if (localStorage.getItem('settings.application')) {
                            let deliveryNotePrinter = JSON.parse(localStorage.getItem('settings.application')).deliveryNotePrinter;

                            if (deliveryNotePrinter != '') {

                            }
                            printer = deliveryNotePrinter;
                        }

                        if (type == 'pdf') {
                            this.printUrl(`${url}?token=${this.user.info.token}&print=true`, () => {
                                this.emitter.emit('orderupdate');
                            }, 'pdf', printer);
                        } else {
                            //test and delete this as necessary
                            //quick hack to redirect to esa in case a prescription is not found
                            let url = `https://esasys.co.uk/?showFile&PRESCRIPTIONID=${this.prescription.PrescriptionID}`;

                            this.printUrl(url, () => {
                                axios.get(`/prescription/${this.prescription.PrescriptionID}/log-print?token=${this.user.info.token}`)
                                    .then((response) => {
                                        this.emitter.emit('orderupdate');
                                    })
                                    .catch((error) => {
                                        this.postError(error.response.data.message);
                                    })
                            }, 'pdf', printer);
                        }
                    })
                    .catch((error) => {
                        this.postError(error.response.data.message);
                    })
            } else if (type == 'label') {
                this.printed.PharmacyLabel = true;

                axios.get(`/order/${this.prescription.PrescriptionID}/label`)
                    .then((response) => {
                        let url = response.data.data.url;
                        let type = response.data.data.type;
                        let printer = false;

                        if (localStorage.getItem('settings.application')) {
                            printer = JSON.parse(localStorage.getItem('settings.application')).labelPrinter;
                        }

                        this.printUrl(`${url}?token=${this.user.info.token}&print=true`, () => {
                            this.emitter.emit('orderupdate');
                        }, 'pdf', printer, true);
                    })
                    .catch((error) => {
                        this.postError(error.response.data.message);
                    })
            }
        },
        //get details on which files will be printed
        getPrintDetails() {
            axios.get(`/order/${this.prescription.PrescriptionID}/print-details`)
                .then((response) => {
                    this.loading = true;
                    if (response.data.data != null) {
                        this.printIcons = response.data.data;
                    }
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        //check which files were printed
        getPrintRecord() {
            axios.get(`/order/${this.prescription.PrescriptionID}/print-record`)
                .then((response) => {
                    this.loading = true;
                    if (response.data.data != null) {
                        this.printed = response.data.data;
                    }
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        redelivery() {
            this.redeliveryToggle = true;
            // this.emitter.emit('modal.open', 'redelivery');
        }
    },
}
</script>
