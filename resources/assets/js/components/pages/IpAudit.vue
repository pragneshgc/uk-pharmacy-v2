<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>IP Audit</h3>
            </div>
            <div class="card-body">
                <div class="orderSearch">
                    <TableComponentSearch data-url="/ip-audit/search" column-class="col-lg-12"
                        table-title="Audit Report" :filters="filters" :column-map="columnMap" :load-on-startup="false"
                        :csv-url="false" :showtool="false">
                    </TableComponentSearch>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import orderStatuses from '../../mixins/constants/orderStatuses'
import filtersData from '../../mixins/filtersData'
import Download from '../../mixins/download';
import { defineAsyncComponent } from 'vue';

export default {
    mixins: [orderStatuses, filtersData, Download],
    data: function () {
        return {
            userInfo: userInfo,
            columnMap: {
                'request_from': 'From',
                'requested_at': 'Request Time',
                'ip_address': 'IP',
                'action_by': 'Action By',
                'action_at': 'Action Time',
                'status': 'Status',
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
                    title: 'Status',
                    value: 'audit-status',
                    type: 'select',
                    clearable: true,
                    placeholder: 'SelectStatus',
                    options: [
                        {
                            title: 'All',
                            value: 'all',
                        },
                        {
                            title: 'Approved',
                            value: 'approved',
                        },
                        {
                            title: 'Rejected',
                            value: 'rejected'
                        },
                        {
                            title: 'Pending',
                            value: 'pending'
                        }
                    ]
                },
            ]
        }
    },
    components: {
        'TableComponentSearch': defineAsyncComponent(() => import('../TableComponentSearch.vue')),
    },
    mounted() {
        this.setupFilters();
    },
}
</script>
