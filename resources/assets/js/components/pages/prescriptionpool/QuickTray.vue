<template>
    <transition name="fade">
        <section class="card quick-tray" v-if="orders.length > 0">
            <Modal class="duplicate-modal" modal-name="quicktraynotes">
                <template v-slot:header>
                    <h2>Notes and Alerts</h2>
                </template>
                <template v-slot:body>
                    <div style="width: 100%;height: 100%; display:flex; flex-direction:column;">
                        <div>
                            <ul style="margin: 5px;">
                                <li v-if="duplicate"
                                    style="background: #f53c38; font-size: 20px; padding: 5px; width: 100%;"
                                    class="infoBox warning thin-error">
                                    There is a possible duplicate order with ID
                                    <a target="_blank" :href="`#/prescription/${duplicate.PrescriptionID}`"
                                        style="color: #A9E2F3;">
                                        {{ duplicate.PrescriptionID }}
                                    </a>
                                    that has the same customer reference id {{ duplicate.ReferenceID }}
                                    with status {{ orderStatuses[duplicate.Status] }}{{ duplicate.SubStatus ? ` -
                                    ${orderSubStatuses[duplicate.SubStatus]}` : '' }}.
                                    Please investigate by clicking
                                    <a target="_blank" :href="`#/prescription/${duplicate.PrescriptionID}`"
                                        style="color: #A9E2F3;">
                                        here
                                    </a> before processing.
                                </li>
                                <li v-for="(product, key) in selected.Products" :key="key"
                                    v-if="!product.CorrectName || !product.CorrectUnit"
                                    style="background: #f53c38; font-size: 20px; padding: 5px; width: 100%; margin-top: 5px;"
                                    class="infoBox warning thin-error">
                                    <span>
                                        The product name recieved by {{ selected.CompanyName }} ({{ product.Description
                                        }}
                                        {{ product.Unit }})
                                        does not match the product name or it's alternatives in ESA ({{ product.Name }}
                                        {{
                                            product.product_units }})
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <Notes :locked="locked" :notes="notes" :prescription="selected" />
                    </div>
                </template>
                <template v-slot:footer>
                    <button @click="confirmNotes()" class="btn btnSize01 primaryBtn bigButton">I'VE READ THESE
                        NOTES!</button>
                </template>
            </Modal>

            <div class="card-header">
                <h3>Pending Orders ({{ orders.length }})</h3>
            </div>
            <div class="card-body" style="padding: 0;">
                <table>
                    <thead>
                        <tr>
                            <th>Prescription</th>
                            <th>Patient</th>
                            <th>Products</th>
                            <th>Notes</th>
                            <th>History</th>
                            <th style="text-align: center;">Print</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="clickable quick-tray__item" @dblclick="redirect(item.PrescriptionID)"
                            :class="[selected.PrescriptionID == item.PrescriptionID ? 'selected' : '', locked && selected.PrescriptionID == item.PrescriptionID ? 'locked' : '']"
                            v-for="item in orders" :key="item.PrescriptionID" @click="selectOrder(item)">
                            <td>
                                <a :href="`#/prescription/${item.PrescriptionID}`">
                                    <div class="mb-5"><span v-html="item.ReferenceID" /></div>
                                    <div class="mb-5"><b>{{ item.CompanyName }}</b></div>
                                    <div class="mb-5"><span v-html="item.Prescriber" /></div>
                                    <div style="background: #fe4949; color:white; text-align:center;padding: 3px;"
                                        v-if="locked && selected.PrescriptionID == item.PrescriptionID">
                                        <b>This item is currently opened by {{ locked }}</b>
                                    </div>
                                </a>
                            </td>
                            <td
                                :title="`${item.Sex == 1 ? 'Male' : item.Sex == 2 ? 'Female' : item.Sex == 3 ? 'Transgender' : 'Other'} born on ${item.DOB} with a BMI of ${item.BMI}`">
                                <span style="padding: 2px;" class="gender"
                                    :class="[item.Sex == 1 ? 'blue' : item.Sex == 2 ? 'purple' : item.Sex == 3 ? 'orange' : 'grey']">
                                    <span v-html="item['Patient Name']" />
                                    <small>
                                        ({{ item.Age }} / {{ item.Sex == 1 ? 'Male' : item.Sex == 2 ? 'Female' :
                                            item.Sex ==
                                                3 ? 'Transgender' : 'Other' }})
                                    </small>
                                </span>
                                <div class="mt-5" v-if="selected.PrescriptionID == item.PrescriptionID">
                                    <span v-html="item['Patient Address']" />
                                </div>
                            </td>
                            <td>
                                <ul v-if="selected.PrescriptionID == item.PrescriptionID">
                                    <li v-if="duplicate">
                                        <b :title="``"
                                            style="background: #f53c38; font-size: 14px; padding-bottom: 0; padding-top: 0;"
                                            class="infoBox warning thin-error">
                                            Possible duplicate order with ID
                                            <a target="_blank" :href="`#/prescription/${duplicate.PrescriptionID}`"
                                                style="color: #A9E2F3;">
                                                {{ duplicate.PrescriptionID }}
                                            </a>
                                            and
                                            status {{ orderStatuses[duplicate.Status] }}{{ duplicate.SubStatus ? ` -
                                            ${orderSubStatuses[duplicate.SubStatus]}` : '' }}.
                                        </b>
                                    </li>

                                    <li v-for="(product, key) in item.Products" :key="key">
                                        <!-- <span v-html="product"/> -->
                                        <!-- <span> -->
                                        <b><span v-html="product.ShortName" /> <span class="quick-tray__fridge"
                                                v-if="product.Fridge">Fridge</span></b>
                                        <!-- <br> -->
                                        <b :title="`The product name recieved by ${selected.CompanyName} (${product.Description}) does not match the product name or it's alternatives in ESA (${product.Name})`"
                                            style="background: #f53c38; font-size: 14px; padding-bottom: 0; padding-top: 0;"
                                            class="infoBox warning thin-error" v-if="!product.CorrectName">
                                            Name Mismatch
                                        </b>

                                        <b :title="`The product name recieved by ${selected.CompanyName} (${product.Description}) does not match the product name or it's alternatives in ESA (${product.Name})`"
                                            style="background: #f53c38; font-size: 14px; padding-bottom: 0; padding-top: 0;"
                                            class="infoBox warning thin-error" v-if="!product.CorrectUnit">
                                            Unit Mismatch
                                        </b>

                                        <div style="max-width:350px; font-size: 11px;">
                                            {{ product.Instructions }}
                                        </div>
                                        <!-- </span> -->
                                    </li>
                                </ul>
                                <ul v-else>
                                    <li v-for="(product, key) in item.Products" :key="key">
                                        <span v-html="product.ShortName" /> <span class="quick-tray__fridge"
                                            v-if="product.Fridge"><b>Fridge</b></span>
                                    </li>
                                </ul>
                                <!-- <span v-else>{{ item.Products.length }} product(s)</span> -->
                            </td>
                            <td>
                                <div style="display: flex; justify-content:space-between; flex-direction: column;"
                                    v-if="selected.PrescriptionID == item.PrescriptionID">
                                    <div>
                                        <div class="quick-tray__note"
                                            :class="[notes.critical.length > 0 ? 'quick-tray__note-warning' : '']">
                                            {{ notes.critical.length }} Patient Note(s)
                                        </div>
                                        <div class="quick-tray__note"
                                            :class="[notes.correspondence.length + notes.information.length > 0 ? 'quick-tray__note-warning' : '']">
                                            {{ notes.correspondence.length + notes.information.length }} Queried Note(s)
                                        </div>
                                        <div class="quick-tray__note"
                                            :class="[notes.other.length + ((selected.Notes != '' && selected.Notes != null) ? 1 : 0) > 0 ? 'quick-tray__note-warning' : '']">
                                            {{ notes.other.length + ((selected.Notes != '' && selected.Notes != null) ?
                                                1 :
                                                0) }} Order Note(s)
                                        </div>
                                    </div>
                                    <button @click="openNotes()" style="padding: 4px;"
                                        class="btn btnSize03 secondaryBtn">
                                        View
                                    </button>
                                </div>
                                <span v-else></span>
                            </td>
                            <td style="width: 500px;">
                                <div class="medicineHistory notranslate quick-tray__history"
                                    v-if="selected.PrescriptionID == item.PrescriptionID">
                                    <ul @dblclick="redirect(value.PrescriptionID)" v-if="!historyLoading" class="new"
                                        v-for="(value, key) in filteredHistory" :key="key"
                                        :title="`Order ${value.PrescriptionID} in status ${orderStatuses[value.Status]}. Double-click to open in new tab.`"
                                        :class="statusClass(value.Status)">
                                        <li v-for="(product, k) in value.Products" class="medicine" :key="k">
                                            <a target="_blank" :href="`#/prescription/${value.PrescriptionID}`"
                                                style="margin-left: 3px;">
                                                {{ product.Name }}, {{ product.Quantity * product.Dosage }} {{
                                                    product.Units
                                                }}
                                                ({{ value.Client }})
                                            </a>
                                            <div>
                                                <b v-if="k == 0">
                                                    <span class="font-highlight" :class="statusClass(value.Status)">{{
                                                        orderStatuses[value.Status] }}</span>
                                                </b>
                                                <span
                                                    v-if="k == 0 && ([8, 6, 3, 4, 12, 13, 14, 15].includes(value.Status))">
                                                    <b>{{ value.ShippedDate.slice(0, -5) }}</b>
                                                </span>
                                            </div>
                                        </li>
                                    </ul>
                                    <div v-if="historyLoading">Loading...</div>
                                    <div v-if="!historyLoading && history.length == 0">No previous orders available..
                                    </div>
                                    <div v-if="!historyLoading && history.length > 3"
                                        @click="expandHistory = !expandHistory">

                                        <button v-if="!expandHistory" style="padding: 4px;width: 100%;"
                                            class="btn btnSize03 secondaryBtn">
                                            <i class="fa fa-caret-down" style="padding-right: 5px;"></i>
                                            Expand ({{ history.length - filteredHistory.length }} more entries)
                                        </button>

                                        <button v-else style="padding: 4px;width: 100%;"
                                            class="btn btnSize03 secondaryBtn">
                                            <i class="fa fa-caret-up" style="padding-right: 5px;"></i>Collapse
                                        </button>
                                    </div>
                                </div>
                                <span v-else></span>
                            </td>
                            <td style="vertical-align: middle;text-align: center;">
                                <button :disabled="locked || printing"
                                    v-if="selected.PrescriptionID == item.PrescriptionID" @click="tryPrint()"
                                    title="Print prescription and pharmacy labels" class="btn btnSize01 secondaryBtn">
                                    <i v-if="printable" style="font-size: 25px;" class="fa fa-print"></i>
                                    <i v-else style="font-size: 25px;" class="fa fa-exclamation-circle"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </transition>
</template>

<script>
import orderStatuses from '../../../mixins/constants/orderStatuses';
import Error from '../../../mixins/errors';
import Print from '../../../mixins/print';

export default {
    mixins: [orderStatuses, Error, Print],
    components: {
        'Notes': () => import('./NotesPopup.vue'),
        'Modal': () => import('../../Modal.vue'),
    },
    data() {
        return {
            loading: false,
            locked: false,
            printing: false,
            lockTimer: null,
            historyLoading: false,
            notesLoading: false,
            notesAlert: false,
            duplicate: false,
            notesConfirmed: false,
            expandHistory: false,
            orders: [],
            notes: [],
            selected: null,
            history: [],
            user: {
                info: userInfo,
                selected: userInfo.id,
                list: []
            },
        }
    },
    computed: {
        trayIds() {
            return this.$store.state.tray.map(order => order.PrescriptionID);
        },
        filteredHistory() {
            if (this.expandHistory) {
                return this.history;
            } else {
                return this.history.slice(0, 3);
            }
        },
        totalNotesCount() {
            //we are not taking into account correspondence notes
            return this.notes.length == 0 ? 0 : /*this.notes.correspondence.length + */this.notes.critical.length + this.notes.information.length + this.notes.other.length;
        },
        printable() {
            let nameMismatch = false;
            let unitMismatch = false;

            this.selected.Products.forEach(product => {
                if (!product.CorrectName) {
                    nameMismatch = true;
                }
                if (!product.CorrectUnit) {
                    unitMismatch = true;
                }
            });

            let isPrintable = this.totalNotesCount == 0 && !this.duplicate && !nameMismatch && !unitMismatch ? true : this.notesConfirmed ? true : false;

            return isPrintable;
        }
    },
    mounted() {
        this.getOrders();
        this.emitter.on('prescriptionpool.getnotes', this.getNotes);
        this.emitter.on('orderupdate', this.getNotes);
        this.emitter.on('alertupdate', this.getNotes);
        this.emitter.on('prescriptionpool.reprint', this.reprint);

        this.lockTimer = setInterval(() => {
            this.checkLock();
        }, 5000);
    },
    destroyed() {
        this.emitter.off('prescriptionpool.getnotes', this.getNotes);
        this.emitter.off('orderupdate', this.getNotes);
        this.emitter.off('alertupdate', this.getNotes);
        this.emitter.off('prescriptionpool.reprint', this.reprint);

        clearInterval(this.lockTimer);
    },
    watch: {
        trayIds(newValue, oldValue) {
            this.getOrders();

            if (oldValue.length == 0 && newValue.length > 0) {
                this.$store.commit('clearLogs');
            }
        },
        selected() {
            this.getHistory();
            this.getNotes();
        },
        locked() {
            if (!this.locked) {
                this.getOrders(() => {
                    let temporarySelected = JSON.parse(JSON.stringify(this.selected));
                    this.selected = null;
                    this.selectOrder(temporarySelected);
                    this.takeOverOrder(this.selected.PrescriptionID);
                });
            }
        }
    },
    methods: {
        selectOrder(prescription) {
            // this.loading = true;
            this.selected = prescription;

            this.selected.Products.forEach((product) => {
                if (product.Name != product.Description) {
                    this.alternativeNameCheck(product, this.selected.ClientID, (result) => {
                        product.CorrectName = result;
                    });
                } else {
                    product.CorrectName = true;
                }

                if (product.Unit != product.product_units) {
                    this.alternativeUnitCheck(product, this.selected.ClientID, (result) => {
                        product.CorrectUnit = result;
                    });
                }
                else {
                    product.CorrectUnit = true;
                }
            })

            this.checkLock(() => {
                if (!this.locked) {
                    this.takeOverOrder(this.selected.PrescriptionID);
                }

                this.emitter.emit('prescriptionloaded', { prescription: prescription });
                // this.loading = false;
            });

            this.checkOrderStatuses(this.selected.PrescriptionID);
        },
        getOrders(callback = false) {
            this.loading = true;
            axios.post(`/prescription-pool/quick-tray`, { ids: this.trayIds })
                .then(response => {
                    this.orders = response.data.data;

                    if (this.orders.length > 0 && !callback) {
                        this.selectOrder(this.orders[0]);
                    } else if (callback) {
                        callback();
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        checkOrderStatuses(id) {
            axios.get(`/order/${id}/statuses`)
                .then((response) => {
                    this.duplicate = response.data.data.duplicate;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        getHistory() {
            this.historyLoading = true;

            axios.get(`/order/${this.selected.PrescriptionID}/history`)
                .then((response) => {
                    this.expandHistory = false;
                    this.history = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.historyLoading = false;
                })
        },
        /**
         * Get notes related to the current order
         */
        getNotes() {
            this.notesLoading = true;
            this.notesConfirmed = false;

            axios.get(`/order/${this.selected.PrescriptionID}/notes`)
                .then((response) => {
                    this.notes = response.data.data;

                    //check if alerts are shown, if not show them
                    if (this.notes.alerts.length > 0) {
                        let html = `
                    <div class="medicineDetails" style="width: 100%;">
                    <p>Please review the notes below:</p>
                    <ul class="other">`;

                        let alertCount = 0;
                        let type = 0;

                        this.notes.alerts.sort((a, b) => (a.Type > b.Type) ? 1 : -1);

                        this.notes.alerts.forEach((alert) => {
                            if (alert.DeletedAt == null && alert.EditedAt == null) {
                                alertCount++;

                                if (alert.Type != type) {
                                    type = alert.Type;
                                    html += `<li class="note-header ${type == 1 ? 'note-header__danger' : ''}"><div>${type == 1 ? 'Patient Notes' : 'Order Notes'}</div></li>`;
                                }

                                html += `
                            <li class="note"
                            title="${alert.Type == 2 ? 'Queried Alert' : alert.Type == 1 ? 'Patient Alert' : 'Order Alert'} created by ${alert.name} ${alert.surname}"
                            style="${alert.Type == 2 ? 'border-left: 5px solid #32a36a;'
                                        : alert.Type == 1 ? 'border-left: 5px solid #ff5151;' : ''}">
                            <div class="note-body" style="text-align: initial;">
                            <p>${alert.Note}</p>
                            </div>
                            <div class="note-footer">
                            <span>${alert.name + ' ' + alert.surname}</span>
                            <span>${alert.CreatedAt}</span>
                            </div>
                            </li>`
                            }
                        });

                        html += `</ul></div>`;

                        if (alertCount > 0) {
                            this.notesAlert = html;
                        } else {
                            this.notesAlert = false;
                        }
                    } else {
                        this.notesAlert = false;
                    }
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.notesLoading = false;
                })
        },
        tryPrint() {
            // if(this.notesAlert){
            //     this.showNotesAlert();
            if (!this.printable) {
                this.openNotes();
            } else {
                this.printing = true;
                this.dispenserPrint('delivery', false, () => {
                    this.dispenserPrint('label', false, () => {
                        this.selected.time = Date.now();
                        this.selected.action = 'Printed';
                        this.$store.commit('addLog', this.selected);
                        this.emitter.emit('tray.changeprescriptionstatus', { id: this.selected.PrescriptionID, status: 7 });
                        this.printing = false;
                    });
                });
            }
        },
        reprint(id) {
            this.dispenserPrint('delivery', id);
            this.dispenserPrint('label', id);
            let prescription = { PrescriptionID: id, action: 'Reprinted', time: Date.now() };
            this.$store.commit('addLog', prescription);
        },
        dispenserPrint(type, id = false, callback = false) {
            if (!id) {
                id = this.selected.PrescriptionID;
            }
            //print routine here
            if (type == 'delivery') {
                axios.get(`/order/${id}/view`)
                    .then((response) => {
                        let url = response.data.data.url;
                        let type = response.data.data.type;
                        let printer = false;

                        if (localStorage.getItem('settings.application')) {
                            let deliveryNotePrinter = JSON.parse(localStorage.getItem('settings.application')).deliveryNotePrinter;

                            printer = deliveryNotePrinter;
                        }

                        if (type == 'pdf') {
                            this.printUrl(`${url}?token=${this.user.info.token}&print=true`, () => {
                                this.emitter.emit('orderupdate');

                                if (callback) {
                                    callback();
                                }
                            }, 'pdf', printer);
                        } else {
                            //test and delete this as necessary
                            let url = `https://esasys.co.uk/?showFile&PRESCRIPTIONID=${id}`;

                            this.printUrl(url, () => {
                                axios.get(`/prescription/${id}/log-print?token=${this.user.info.token}`)
                                    .then((response) => {
                                        this.emitter.emit('orderupdate');

                                        if (callback) {
                                            callback();
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        this.postError(error.response.data.message);
                                    })
                            }, 'pdf', printer);
                        }
                    })
                    .catch((error) => {
                        this.postError(error.response.data.message);
                    })
            } else if (type == 'label') {
                axios.get(`/order/${id}/label`)
                    .then((response) => {
                        let url = response.data.data.url;
                        let printer = false;

                        if (localStorage.getItem('settings.application')) {
                            printer = JSON.parse(localStorage.getItem('settings.application')).labelPrinter;
                        }

                        this.printUrl(`${url}?token=${this.user.info.token}&print=true`, () => {
                            this.emitter.emit('orderupdate');

                            if (callback) {
                                callback();
                            }
                        }, 'pdf', printer, true);
                    })
                    .catch((error) => {
                        console.log(error);
                        this.postError(error.response.data.message);
                    })
            }
        },
        //revert an activity
        openNotes() {
            this.emitter.emit('modal.open', 'quicktraynotes');
        },
        confirmNotes() {
            this.notesConfirmed = true;
            this.emitter.emit('modal.close', 'quicktraynotes');
        },
        showNotesAlert() {
            this.$swal({
                title: 'Important notes!',
                html: this.notesAlert,
                type: 'warning',
                showCancelButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                focusConfirm: false,
                // customClass: 'swal-wide',
                confirmButtonColor: '#3085d6',
                // cancelButtonColor: '#d33',
                confirmButtonText: "I've read these notes!"
            }).then((result) => {
                if (result.value) {
                    this.notesAlert = false;
                }
            });
        },
        statusClass(status) {
            return [1, 7].includes(status) ? 'active'
                : [2, 8].includes(status) ? 'success'
                    : [4, 5, 9, 10, 11, 12, 13, 14, 15].includes(status) ? 'warning'
                        : [16].includes(status) ? 'returned'
                            : [3, 6].includes(status) ? 'error'
                                : '';
        },
        //locking/unlocking orders
        checkLock(callback = false) {
            if (this.selected) {
                axios.get(`/logs/locked/${this.selected.PrescriptionID}`)
                    .then((response) => {
                        if (response.data.data) {
                            this.locked = response.data.data.Name + ' ' + response.data.data.Surname;
                        } else {
                            this.locked = false;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        this.locked = false;
                    })
                    .finally(() => {
                        if (callback) {
                            callback();
                        }
                    })
            }
        },
        unlockOrder(id) {
            axios.post(`logs/unlock/${id}`)
                .then((response) => {
                    this.locked = false;
                })
                .catch((error) => {
                    console.log(error);
                    this.locked = false;
                })
        },
        takeOverOrder(id) {
            axios.post(`logs/takeover/${id}`)
                .then((response) => {
                    this.locked = false;
                })
                .catch((error) => {
                    console.log(error);
                    this.locked = false;
                })
        },
        alternativeNameCheck(product, client, callback) {
            axios.get(`/inventory/products/alternative-name?code=${product.ProductCodeID}&name=${encodeURI(product.Description)}&client=${client}`)
                .then((response) => {
                    callback(response.data.data);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        alternativeUnitCheck(product, client, callback) {
            axios.get(`/inventory/products/alternative-unit?code=${product.ProductCodeID}&unit=${encodeURI(product.Unit)}&client=${client}`)
                .then((response) => {
                    callback(response.data.data);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        //Resolve the product name discrepancy
        discrepancyResolution(resolution, product = false) {
            //if resolution is positive then add the product to productnamealternative list and refresh
            //if not move the prescription to safety check
            if (resolution) {
                this.loading = true;
                axios.post(`/inventory/products/approve-discrepancy`, {
                    ProductCodeID: product.ProductCodeID, ClientID: this.prescription.ClientID,
                    UserID: this.userInfo.id, AlternativeName: product.Description
                })
                    .then((response) => {
                        this.postSuccess('Alternative name approved');
                        this.loading = false;
                        this.search();
                    })
                    .catch((error) => {
                        this.loading = false;
                        this.postError(error.response.data.message);
                    });
            } else {
                this.prescriptionStatus = 91;
                this.updateStatus();
            }
        },
        redirect(PrescriptionID) {
            this.$router.push({ name: 'prescription', params: { id: PrescriptionID } });
        }
    },
}
</script>
