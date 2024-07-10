<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>Invoices</h3>
            </div>
            <div class="card-body">
                <div class="invoice-search">
                    <TableComponentSearch data-url="/invoices" column-class="col-lg-12" table-title="Invoices"
                        redirect-name="invoice" redirect-id="InvoiceID" :hidden-columns="['InvoiceID']" :filters="filters"
                        :column-map="columnMap" :csv-url="true">
                        <template v-slot:tools="{ item }">
                            <!-- <a class="btn btn-primary table-icon" style="margin: 0;" title="Download Invoice" @click="sendInvoice(item)">
                                <i class="fa fa-envelope"></i>
                            </a> -->

                            <a class="btn btn-primary table-icon" style="margin: 0;" title="Download Invoice"
                                @click="downloadInvoice(item)">
                                <i class="fa fa-download"></i>
                            </a>
                        </template>
                    </TableComponentSearch>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import filtersData from '../../../mixins/filtersData'

export default {
    mixins: [filtersData],
    components: {
        'TableComponentSearch': () => import('../../TableComponentSearch.vue'),
    },
    data() {
        return {
            columnMap: {},
            filters: [
                {
                    title: 'Start Date',
                    value: 'start_date',
                    type: 'date',
                },
                {
                    title: 'End Date',
                    value: 'end_date',
                    type: 'date',
                },
                {
                    title: 'Country',
                    value: 'country',
                    type: 'select-extended',
                    multiple: true,
                    clearable: true,
                    options: [],
                    placeholder: 'Select Country',
                },
                {
                    title: 'Statuses',
                    value: 'statuses',
                    type: 'select-extended',
                    multiple: true,
                    clearable: true,
                    options: [
                        { id: 0, label: 'Incomplete' },
                        { id: 1, label: 'Unpaid' },
                        { id: 2, label: 'Paid' },
                        { id: 3, label: 'Credit Note' },
                        { id: 4, label: 'Deleted' },
                    ],
                    placeholder: 'Select Type',
                },
                {
                    title: 'Delivery',
                    value: 'delivery',
                    type: 'select-extended',
                    clearable: true,
                    options: [],
                    placeholder: 'Select Delivery Service',
                },
                {
                    title: 'Client',
                    value: 'client',
                    type: 'select-extended',
                    placeholder: 'Select Client',
                    clearable: true,
                    disableBranchNodes: true,
                    options: []
                },
                {
                    title: 'ESA Order ID',
                    value: 'order_id',
                    type: 'textarea',
                },
                {
                    title: 'Client Reference Number',
                    value: 'reference',
                    type: 'textarea',
                },
            ]
        }

    },
    mounted() {
        this.setupFilters();
    },
    methods: {
        downloadInvoice(item) {
            console.log(item);
        },
    },
}
</script>
