<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>Dispensing Data</h3>
            </div>
            <div class="card-body">
                <TableComponentSearch data-url="/dispensing-data" column-class="col-lg-12 dispensing-table"
                    :filter-required="true" table-title="Dispensing Data" :filters="filters" :load-on-startup="false" />
            </div>
        </section>
    </div>
</template>

<script>
import orderStatuses from '../../../mixins/constants/orderStatuses'
import filtersData from '../../../mixins/filtersData'
import { ASYNC_SEARCH } from '@emacle/vue-treeselect'

export default {
    mixins: [orderStatuses, filtersData],
    components: {
        'TableComponentSearch': () => import('../../TableComponentSearch.vue'),
    },
    data: function () {
        return {
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
                    options: [],
                    clearable: true,
                    multiple: true,
                    placeholder: 'Select Country',
                },
                {
                    title: 'Client',
                    value: 'client',
                    type: 'select-extended',
                    placeholder: 'Select Client',
                    clearable: true,
                    disableBranchNodes: true,
                    multiple: true,
                    options: []
                },
                {
                    title: 'Additional',
                    value: 'additional',
                    type: 'select-extended',
                    placeholder: 'Select Summary Time',
                    clearable: true,
                    multiple: false,
                    options: [
                        {
                            label: 'Monthly data summary',
                            id: '1'
                        },
                    ]
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
            ]
        }
    },
    mounted() {
        this.setupFilters();
    }
}
</script>
