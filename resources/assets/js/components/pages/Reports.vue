<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>Reports</h3>
            </div>
            <div class="card-body">
                <div class="orderSearch">
                    <TableComponentSearch data-url="/orders/search" column-class="col-lg-12" table-title="Prescriptions"
                        redirect-name="prescription" redirect-id="PrescriptionID"
                        :hidden-columns="['checked', 'NotFound', 'AirwayBillNumber']" :filters="filters"
                        :column-map="columnMap" :not-orderable="['Products', 'Returned Date', 'Returned']"
                        :load-on-startup="false" :delete-id="'0'" :csv-url="true">

                        <template v-slot:tools="{ item }">
                            <a class="btn btn-primary table-icon" style="margin: 0;" title="Download prescription"
                                @click="prescriptionDownload(item)">
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
import orderStatuses from '../../mixins/constants/orderStatuses'
import filtersData from '../../mixins/filtersData'
import { ASYNC_SEARCH } from '@emacle/vue-treeselect'
import Download from '../../mixins/download';

export default {
    mixins: [orderStatuses, filtersData, Download],
    data: function () {
        return {
            userInfo: userInfo,
            columnMap: {
                'PrescriptionID': 'ID',
                'DeliveryID': 'Courier',
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
                    clearable: true,
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
                    title: 'Patient Address',
                    value: 'address',
                    type: 'text',
                },
                {
                    title: 'Country',
                    value: 'country',
                    type: 'select-extended',
                    options: [],
                    multiple: true,
                    clearable: true,
                    placeholder: 'Select Country',
                },
                {
                    title: 'Prescriber',
                    value: 'doctor',
                    type: 'select-extended',
                    options: [],
                    clearable: true,
                    placeholder: 'Select Prescriber',
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
                    title: 'Status',
                    value: 'status-extended',
                    type: 'select-extended',
                    clearable: true,
                    placeholder: 'Select Prescription Status',
                    options: []
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
                    title: 'Gender',
                    value: 'gender',
                    type: 'select-extended',
                    placeholder: 'Select Gender',
                    clearable: true,
                    options: []
                },
                {
                    title: 'Additional',
                    value: 'additional',
                    type: 'select-extended',
                    placeholder: 'Select Additional Filters',
                    multiple: true,
                    options: [
                        {
                            label: 'COD',
                            id: '1'
                        },
                        {
                            label: 'CI',
                            id: '2'
                        },
                        {
                            label: 'Saturday Delivery',
                            id: '3'
                        },
                        {
                            label: 'Access Point',
                            id: '4'
                        },
                        {
                            label: 'Fridge',
                            customLabel: `Fridge - All`,
                            id: '5',
                            children: [
                                {
                                    id: '51',
                                    label: 'Yes',
                                    customLabel: `Fridge - Yes`
                                },
                                {
                                    id: '50',
                                    label: 'No',
                                    customLabel: `Fridge - No`
                                },
                            ]
                        },
                        {
                            label: 'Pouch Order',
                            customLabel: `Pouch Order - All`,
                            id: '6',
                            children: [
                                {
                                    id: '61',
                                    label: 'Yes',
                                    customLabel: `Pouch Order - Yes`
                                },
                                {
                                    id: '60',
                                    label: 'No',
                                    customLabel: `Pouch Order - No`
                                },
                            ]
                        },
                    ]
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
                {
                    title: 'Frequency',
                    value: 'frequency',
                    type: 'select-extended',
                    searchable: true,
                    clearable: true,
                    placeholder: 'Select Frequency',
                    options: [],
                },
                {
                    title: 'Condition',
                    value: 'condition',
                    type: 'select-async',
                    options: [],
                    placeholder: 'Select Condition',
                    multiple: true,
                    clearable: false,
                    loadOptions: _.debounce(({ action, searchQuery, callback }) => {

                        if (action === ASYNC_SEARCH) {
                            let filter = searchQuery != '' && typeof searchQuery != 'undefined' ? `?filter=${searchQuery}` : '';

                            axios.get(`/orders/conditions${filter}`)
                                .then((response) => {
                                    let resp = response.data.data;
                                    let condition = [];

                                    resp.forEach(result => {
                                        condition.push({
                                            id: result.name,
                                            value: result.id,
                                            label: result.name
                                        });
                                    });
                                    callback(null, condition);
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        }
                    }, 500),
                },
            ]
        }
    },
    components: {
        'TableComponentSearch': () => import('../TableComponentSearch.vue'),
    },
    mounted() {
        this.setupFilters();
    },
    methods: {
        getProductList(query = '', callback = false) {
            let filter = query != '' ? `?filter=${query}` : '';
            axios.get(`/products${filter}`)
                .then((response) => {
                    // this.productsList = response.data.data
                    if (callback) {
                        callback(response.data.data);
                    } else {
                        this.productsList = response.data.data
                    }
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        prescriptionDownload(item) {
            axios.get(`/order/${item.PrescriptionID}/view`)
                .then((response) => {
                    let url = response.data.data.url;
                    let type = response.data.data.type;

                    let title = item.AirwayBillNumber ? item.AirwayBillNumber : item.PrescriptionID;

                    if (type == 'pdf') {
                        this.downloadURI(`${url}?token=${this.userInfo.token}&title=${title}`, `${title}.${type}`);
                    } else {
                        let url = `https://esasys.co.uk/?showFile&PRESCRIPTIONID=${item.PrescriptionID}`;

                        this.downloadURI(url, `${title}.${type}`);
                    }
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
    }
}
</script>
