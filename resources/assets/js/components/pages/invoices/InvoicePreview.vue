<template>
    <div class="content">
        <Modal class="duplicate-modal" modal-name="additem">
            <template v-slot:header>
                <h2>Add Item</h2>
            </template>
            <template v-slot:body>
                <div class="pxp-form wow fadeIn" style="height: auto!important;">
                    <div class="form-row">
                        <h3 class="m-10">Information</h3>
                    </div>
                    <div class="form-column">
                        <div class="form-group form-group-2">
                            <label for="Description">Description</label>
                            <input name="Description" v-model="item.Description" autocomplete="off" type="text"
                                placeholder="Description" class="form-control">
                        </div>
                    </div>
                    <div class="form-column">
                        <div class="form-group form-group-2">
                            <label for="PrescriptionID">PrescriptionID</label>
                            <input name="PrescriptionID" v-model="item.PrescriptionID" autocomplete="off" type="text"
                                placeholder="PrescriptionID" class="form-control">
                        </div>
                    </div>

                    <div class="form-column">
                        <div class="form-group form-group-2">
                            <label for="ReferenceNumber">Customer Reference</label>
                            <input name="ReferenceNumber" v-model="item.ReferenceNumber" autocomplete="off" type="text"
                                placeholder="ReferenceNumber" class="form-control">
                        </div>
                    </div>

                    <div class="form-row">
                        <h3 class="m-10">Price</h3>
                    </div>

                    <div class="form-column">
                        <div class="form-group form-group-2">
                            <label for="UnitCost">Price</label>
                            <input name="UnitCost" v-model="item.UnitCost" autocomplete="off" type="text"
                                placeholder="UnitCost" class="form-control">
                        </div>
                    </div>
                    <div class="form-column">
                        <div class="form-group form-group-2">
                            <label for="VAT">VAT</label>
                            <input name="VAT" v-model="item.VAT" autocomplete="off" type="text" placeholder="VAT"
                                class="form-control">
                        </div>
                    </div>

                    <div class="form-column">
                        <div class="form-group form-group-2">
                            <label for="Type">Type</label>
                            <select class="browser-default custom-select" v-model="item.Type" name="Type">
                                <option :value="3">Credit/Refund</option>
                                <option :value="4">Misc Charge</option>
                            </select>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <button class="btn btnSize01 tertiaryBtn" @click="saveItem()">Save Item</button>
            </template>
        </Modal>
        <section class="card">
            <div class="card-header">
                <h3>Invoice #{{ invoice.InvoiceID }} Details</h3>
            </div>
            <div class="card-body" style="display: flex; flex-direction: raw;justify-content:space-between;">
                <div class="invoice-details">
                    <span>{{ invoice.Client }} invoice # {{ invoice.InvoiceID }}</span>
                    <br>
                    <span>DATE COVERED: {{ invoice['Created Date'] }} - {{ invoice['Created Date'] }}</span>
                    <br>
                    <span>DATE COMPLETED: {{ invoice['Created Date'] }}</span>
                    <br>
                    <span>DATE PAID: {{ invoice['Paid Date'] }}</span>
                    <br>
                    <span>GROSS AMOUNT : £{{ invoice.GrossAmount }}</span>
                    <br>
                    <span>VAT : £{{ invoice.VAT }}</span>
                    <br>
                    <span>NET AMOUNT : £{{ invoice.NetAmount }}</span>
                    <br>
                    <span>AMOUNT RECEIVED : £{{ invoice.AmountReceived }}</span>
                    <br>
                    <span>STATUS : {{ statuses[invoice.Status] }}</span>
                    <br>
                </div>
                <div class="invoice-options">
                    <button @click="emailInvoice()" v-if="invoice.Status != 0" title="Email Invoice"
                        class="btn btnSize02 secondaryBtn">Email Invoice</button>
                    <!-- <button v-if="invoice.Status != 0" title="Send Custom Email" class="btn btnSize02 secondaryBtn">Send Custom Email</button> -->
                    <button @click="addItem()" title="Add Item" class="btn btnSize02 secondaryBtn">Add Item</button>
                    <button v-if="invoice.Status == 0" @click="updateInvoiceStatus(1)" title="Set Invoice as Complete"
                        class="btn btnSize02 secondaryBtn">Set Invoice as Complete</button>
                    <!-- <button v-if="invoice.Status == 1" @click="updateInvoiceStatus(2)" title="Set Complete Date" class="btn btnSize02 secondaryBtn">Set Complete Date</button> -->
                    <button v-if="invoice.Status == 1" @click="updateInvoiceStatus(2)" title="Set Invoice As Paid"
                        class="btn btnSize02 secondaryBtn">Set Invoice As Paid</button>
                    <button @click="downloadInvoice()" title="View PDF" class="btn btnSize02 secondaryBtn">View
                        Invoice</button>
                </div>
            </div>
            <div class="card-body" style="padding: 0px;">
                <table>
                    <thead>
                        <tr>
                            <th>Customer Reference</th>
                            <th>Our Reference</th>
                            <th>Date</th>
                            <th>Prescriber</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>VAT</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="item in invoiceItems" :key="item.ItemID">
                            <tr>
                                <td>{{ item.ReferenceNumber }}</td>
                                <td>{{ item.ItemID }}</td>
                                <td>{{ item.Date }}</td>
                                <td>{{ item.DoctorID }}</td>
                                <td>{{ item.Description }}</td>
                                <td>{{ item.Quantity }}</td>
                                <td>£{{ item.UnitCost }}</td>
                                <td>£{{ item.VAT }}</td>
                                <td>£{{ item.VAT + item.UnitCost }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>

<script>
import Error from '../../../mixins/errors'

export default {
    mixins: [Error],
    components: {
        'Modal': () => import('../../Modal.vue'),
    },
    data() {
        return {
            statuses: {
                0: 'INCOMPLETE',
                1: 'UNPAID',
                2: 'PAID',
                3: 'CREDITNOTE',
                4: 'DELETED',
            },
            item: false,
            invoice: {},
            invoiceItems: [],
            userInfo: userInfo,
        }
    },
    mounted() {
        this.getInvoice();
    },
    methods: {
        addItem() {
            this.item = {
                UnitCost: '',
                VAT: 1,
                Description: '',
                ReferenceNumber: '',
                PrescriptionID: 0,
                Type: 3,
            }

            this.emitter.emit('modal.open', 'additem');
            // this.notesConfirmed = true;
            // this.emitter.emit('modal.close', 'quicktraynotes');
        },
        saveItem() {
            axios.post(`/invoice/${this.$route.params.id}/item`, this.item)
                .then((response) => {
                    this.item = false;
                    this.getInvoice();
                    this.postSuccess(response.data.message);
                    this.emitter.emit('modal.close', 'additem');
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        getInvoice() {
            axios.get(`/invoice/${this.$route.params.id}`)
                .then((response) => {
                    this.invoice = response.data.data.invoice;
                    this.invoiceItems = response.data.data.invoiceItems;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        downloadInvoice() {
            window.open(`/invoice/${this.$route.params.id}/preview?token=${this.userInfo.token}`, '_blank');
        },
        updateInvoiceStatus(status, date = false) {
            axios.post(`/invoice/${this.$route.params.id}/status`, { status: status, date: date })
                .then((response) => {
                    this.getInvoice();
                    this.postSuccess(response.data.message);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        emailInvoice() {
            axios.post(`/invoice/${this.$route.params.id}/email?token=${this.userInfo.token}`)
                .then((response) => {
                    this.postSuccess(response.data.message);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        }
    },
}
</script>
