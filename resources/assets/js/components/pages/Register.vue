<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>POM Register</h3>
            </div>
            <div class="card-body">
                <div class="orderSearch">
                    <TableComponentSearch data-url="/orders/register" column-class="col-lg-12" table-title="Register"
                        redirect-name="prescription" redirect-id="PrescriptionID"
                        :hidden-columns="['checked', 'PrescriptionID', 'NotFound']" :filters="filters"
                        :column-map="columnMap" :not-orderable="['Products']" :csv-url="true" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import orderStatuses from '../../mixins/constants/orderStatuses'
import filtersData from '../../mixins/filtersData'
import { ASYNC_SEARCH } from '@emacle/vue-treeselect'

export default {
    mixins: [orderStatuses, filtersData],
    data: function () {
        return {
            columnMap: {
                'ReferenceID': 'ID',
                'DeliveryID': 'Currier',
                'CompanyName': 'Client',
                'ReferenceNumber': 'Ref',
            },
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
                    title: 'Timestamp',
                    value: 'timestamp',
                    type: 'select-extended',
                    placeholder: 'Select Date Type',
                    options: [
                        {
                            label: 'Recieved Date',
                            id: 'recieved_date'
                        },
                        {
                            label: 'Processed Date',
                            id: 'processed_date'
                        }
                    ]
                },
                {
                    title: 'Patient Name',
                    value: 'name',
                    type: 'text',
                },
                {
                    title: 'Patient Surname',
                    value: 'surname',
                    type: 'text',
                },
                {
                    title: 'Gender',
                    value: 'gender',
                    type: 'select-extended',
                    placeholder: 'Select Gender',
                    clearable: true,
                    options: []
                },
                {
                    title: 'Prescriber',
                    value: 'doctor',
                    type: 'select-extended',
                    clearable: true,
                    options: [],
                    placeholder: 'Select Prescriber',
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
                    title: 'Product',
                    value: 'product-multiple',
                    type: 'select-async',
                    options: [],
                    placeholder: 'Select Product',
                    multiple: true,
                    clearable: false,
                    loadOptions: _.debounce(({ action, searchQuery, callback }) => {
                        if (action === ASYNC_SEARCH) {
                            let filter = searchQuery != '' && typeof searchQuery != 'undefined' ? `?filter=${searchQuery}` : '';

                            axios.get(`/products${filter}`)
                                .then((response) => {
                                    let r = response.data.data;
                                    let products = [];

                                    r.forEach(result => {
                                        products.push({
                                            id: result.Code,
                                            value: result.ProductCodeID,
                                            label: result.Name
                                        });
                                    });

                                    callback(null, products);
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        }
                    }, 500),
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
    components: {
        'TableComponentSearch': () => import('../TableComponentSearch.vue'),
    },
    mounted() {
        this.setupFilters();
    }
}
</script>
