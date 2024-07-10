<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>Invoice Details</h3>
            </div>
            <div class="card-body">
                <div class="invoice-search">
                    <TableComponentSearch :data-url="`/invoice/${$route.params.id}`" column-class="col-lg-12"
                        table-title="Invoice Details" :hidden-columns="['ItemID']" :filters="filters"
                        :column-map="columnMap" :csv-url="true">
                        <template v-slot:functionalities>
                            <button title="Initiate search" class="btn btnSize02 secondaryBtn">Email Invoice</button>
                            <button title="Initiate search" class="btn btnSize02 secondaryBtn">Send Custom Email</button>
                            <button title="Initiate search" class="btn btnSize02 secondaryBtn">Add Item</button>
                            <button @click="downloadInvoice()" title="Initiate search"
                                class="btn btnSize02 secondaryBtn">Download</button>
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
                    title: 'Delivery',
                    value: 'delivery',
                    type: 'select-extended',
                    clearable: true,
                    options: [],
                    placeholder: 'Select Delivery Service',
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
        console.log('test');
    },
    methods: {
        downloadInvoice() {
            window.open(`/invoice/${this.$route.params.id}/download`, '_blank');
        },
        emailInvoice() {
            axios.post(`/invoice/${this.$route.params.id}/email`)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },
}
</script>
