<template>
    <!--Grid column-->
    <div class=" natcol-table" :class="[columnClass]">
        <transition name="fade">
            <div class="loader" v-show="loading">Loading...</div>
        </transition>

        <!--Card-->
        <div class="card">
            <transition name="fade">
                <PaginationComponent class="card-footer" v-if="data.last_page > 1" :data="data" :loading="loading"
                    @click="changePage" />
            </transition>

            <div class="card-header">
                <div class="row filters-row">
                    <div class="filter-inputs">
                        <input v-model="queryString" type="text" class="form-control tBoxSize02" id="queryString"
                            placeholder="Search...">
                        <select v-model="limit" class="table-dropdown">
                            <option value="10">Show 10</option>
                            <option value="20">Show 20</option>
                            <option value="50">Show 50</option>
                            <option value="100">Show 100</option>
                            <option value="200">Show 200</option>
                            <option value="9999999999">Show All</option>
                        </select>
                    </div>
                    <div class="dropdown float-right">
                        <a title="Print the results" class="btn btn-primary waves-effect" v-on:click="printChart($el)">
                            <i class="fa fa-print" aria-hidden="true"></i>
                        </a>
                        <a title="Download results as PDF" class="btn btn-primary waves-effect"
                            v-on:click="exportPDF($el)">
                            <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                        </a>
                        <a title="Download results as CSV" v-if="csvUrl" class="btn btn-primary waves-effect"
                            :href="csvUrl">
                            <i class="fa fa-file" aria-hidden="true"></i>
                        </a>
                        <a title="Download results as CSV" v-else class="btn btn-primary waves-effect"
                            v-on:click="exportCSV(data.data, tableTitle)">
                            <i class="fa fa-file" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
                <slot name="filters"></slot>
            </div>
            <!--Card content-->
            <div class="card-body">
                <!-- Table  -->
                <table v-show="data.data.length >= 1" class="table table-hover">
                    <!-- Table head -->
                    <thead class="primary-color text-white">
                        <tr>
                            <th v-if="checkboxVisible" style="
                                    width: 40px;
                                    font-weight: 400;
                                    padding: 16px 8px;
                                    vertical-align: top;
                                " />
                            <template v-for="(value, key) in data.data[0]">
                                <th :class="[notOrderable.includes(key) ? '' : 'clickable', key == orderBy ? 'ordered' : '']"
                                    :title="notOrderable.includes(key) ? '' : 'Sort by ' + translate(key)"
                                    v-if="typeof hiddenColumns != 'undefined' ? !hiddenColumns.includes(key) : true"
                                    v-on:click="setOrder(key)">
                                    {{ translate(key) }}

                                    <span v-if="!notOrderable.includes(key)">
                                        <i v-if="key == orderBy && orderDirection == 'DESC'"
                                            class="fa fa-caret-down"></i>
                                        <i v-if="key == orderBy && orderDirection == 'ASC'" class="fa fa-caret-up"></i>
                                        <i v-if="key != orderBy" class="fa fa-sort"></i>
                                    </span>
                                </th>
                            </template>

                            <th v-if="showtool" :style="!!$slots.tools ? 'width: 140px;' : 'width: 80px;'">
                            </th>
                        </tr>
                    </thead>
                    <!-- Table head -->

                    <!-- Table body -->
                    <!--<transition-group tag="tbody" name="table-row">-->
                    <tbody>
                        <!--@dblclick="redirect(item[redirectId])"   -->
                        <tr class="clickable" @dblclick="redirect(item[redirectId])" v-for="item in data.data"
                            :key="item[Object.keys(item)[0]]">
                            <td v-if="checkboxVisible">
                                <!-- <label class="checkboxElement"> -->
                                <input :name="item[Object.keys(item)[0]]" type="checkbox" :disabled="item.disabled == 1"
                                    :checked="checked.includes(item[Object.keys(item)[0]]) || item.disabled == 1">
                                <label :for="item[Object.keys(item)[0]]" @click="check(item)"></label>
                            </td>
                            <template v-for="(value, key) in item">
                                <template
                                    v-if="typeof hiddenColumns != 'undefined' ? !hiddenColumns.includes(key) : true">
                                    <td>
                                        <ul v-if="typeof value == 'object'">
                                            <li v-for="obj in value">{{ obj }}</li>
                                        </ul>
                                        <span v-else v-html="value"></span>
                                    </td>
                                </template>
                                <template>
                                    <td>
                                        <span v-html="value"></span>
                                    </td>
                                </template>
                            </template>

                            <td v-if="showtool">
                                <a class="btn btn-primary waves-effect table-icon"
                                    @click="redirect(item[redirectId], true)">
                                    <i class="fa fa-search-plus" aria-hidden="true"></i>
                                </a>
                                <a v-if="deleteId" class="btn btn-primary waves-effect table-icon"
                                    v-on:click="deleteItem(item[deleteId])" v-bind:class="{ 'clickable': deleteId }">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                </a>
                                <slot name="tools" v-bind:id="item[redirectId]">
                                </slot>
                            </td>
                        </tr>
                    </tbody>
                    <!--</transition-group>-->
                    <!-- Table body -->
                </table>
                <!-- Table  -->
                <div v-show="data.data.length <= 0">
                    No prescriptions found!
                </div>
            </div>
            <PaginationComponent class="card-footer" :data="data" :loading="loading" @click="changePage" />
        </div>
        <!--/.Card-->
    </div>
    <!--Grid column-->
</template>

<script>
import Print from '../mixins/print'
import PDF from '../mixins/pdf'
import Error from '../mixins/errors'
import CSV from '../mixins/csv'
import { useDefaultStore } from '../stores/default.store'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent } from 'vue'

export default {
    setup() {
        const { checked } = storeToRefs(useDefaultStore());
        const {
            replaceVisible,
            toggleChecked,
            addChecked,
            removeChecked
        } = useDefaultStore();
        return {
            checked,
            replaceVisible,
            toggleChecked,
            addChecked,
            removeChecked,
        }
    },
    props: {
        dataUrl: String,
        columnClass: String,
        tableTitle: String,
        hasRange: Boolean,
        generalQuery: String,
        redirectName: String,
        filterRequired: { Type: Boolean, default: false },
        redirectId: String,
        redirectCallback: Function,
        filters: { Type: [String, Array], default: () => [] },
        hiddenColumns: { Type: Array, default: () => [] },
        csvUrl: Boolean,
        columnMap: Object,
        deleteUrl: String,
        customTotal: { Type: [Boolean, String], default: false },
        deleteId: String,
        checkboxVisible: Boolean,
        notOrderable: { Type: Array, default: () => [] },
        redirectEvent: String,
        loadOnStartup: { Type: Boolean, default: true },
        storeTableData: { Type: Boolean, default: false },
        showtool: { Type: Boolean, default: true }
    },
    components: { 'PaginationComponent': defineAsyncComponent(() => import('./PaginationComponent.vue')), },
    mixins: [Print, PDF, CSV, Error],
    data: function () {
        return {
            data: {
                current_page: this.$route.query.p || 1,
                to: 1,
                data: {}
            },
            loading: false,
            pageSelection: 1,
            range: { label: 'Last month', value: '30' },
            rangeOptions: [
                { label: 'Last week', value: '7' },
                { label: 'Last 2 weeks', value: '14' },
                { label: 'Last month', value: '30' },
                { label: 'Last 2 months', value: '60' },
                { label: 'Last 6 months', value: '180' },
            ],
            //queryString: localStorage.getItem(this.tableTitle+'query') || '',
            queryString: this.$route.query.q || '',
            selectedFilters: {},
            orderBy: '',
            filter: {},
            orderDirection: '',
            limit: '200',
        }
    },
    computed: {
        currentPageParam: function () {
            return '?page=' + this.data.current_page;
        },
        currentRangeParam: function () {
            return this.hasRange ? '&range=' + this.range.value : '';
        },
        currentQueryString: function () {
            return this.queryString != '' ? '&q=' + this.queryString : '';
        },
        currentOrderParam: function () {
            return this.orderBy != '' ? '&orderBy=' + this.orderBy + '&orderDirection=' + this.orderDirection : '';
        },
        currentLimitParam: function () {
            return this.limit.value != '' ? '&limit=' + this.limit : '';
        },
        currentFilterParam: function () {
            return this.filters != '' ? '&f=' + this.filters : '';
        }
    },
    watch: {
        queryString: _.debounce(function () {
            //localStorage.setItem(this.tableTitle+'query', this.queryString);
            this.data.current_page = 1;
            this.getData();
        }, 500),
        range: {
            handler: 'getData',
            immediate: true
        },
        limit: 'getData', // we call the method named getData
        generalQuery: function () {
            this.queryString = this.generalQuery;
        },
        filters: function () {
            this.data.current_page = 1;
            this.getData();
        },
        '$route.query': function () {
            if (typeof this.$route.query.q != 'undefined') {
                this.queryString = this.$route.query.q;
            } else {
                this.queryString = '';
            }
            if (typeof this.$route.query.p != 'undefined') {
                this.data.current_page = this.$route.query.p;
                this.getData(); // this was called twice once from here once from the button change
            }
        }
    },
    mounted() {
        this.emitter.on('table.check.all', (e) => {
            this.checkAll();
        });
        this.emitter.on('table.refresh', (e) => {
            this.getData();
        });
        this.emitter.on('table.uncheck.all', (e) => {
            this.uncheckAll();
        });
    },
    destroyed() {
        this.emitter.off('table.check.all');
        this.emitter.off('table.uncheck.all');
        this.emitter.off('table.refresh');
    },
    methods: {
        getData: function () {
            this.loading = true;

            axios.get(
                this.dataUrl + this.currentPageParam +
                this.currentQueryString + this.currentRangeParam +
                this.currentOrderParam + this.currentLimitParam +
                this.currentFilterParam
            )
                .then((response) => {
                    this.data = response.data.data;
                    this.loading = false;

                    let visible = this.data.data.map(function (item) {
                        return item[Object.keys(item)[0]];
                    });

                    this.replaceVisible(visible);
                })
                .catch((error) => {
                    console.log('error', error);
                    this.reportError(error);
                })
        },
        changePage: function (page) {
            if (!this.loading) {
                if (page === this.data.current_page) return;
                this.data.current_page = page;
                this.getData();
            }
        },
        setOrder: function (key) {
            if (this.notOrderable.includes(key)) return;

            this.orderDirection = this.orderDirection == '' ? 'DESC' : this.orderDirection == 'DESC' ? 'ASC' : '';
            this.orderBy = this.orderDirection == '' ? '' : key;
            this.getData();
        },
        redirect: function (id, openTab = false) {
            if (this.redirectCallback) {
                this.redirectCallback();
            }

            if (this.redirectName && this.redirectId) {
                if (!openTab) {
                    this.$router.push({ name: this.redirectName, params: { id: id } });
                } else {
                    let route = this.$router.resolve({ name: this.redirectName, params: { id: id } });
                    window.open(route.href, '_blank');
                }
            }
        },
        check(item) {
            if (item.disabled != 1) {
                this.toggleChecked(item[Object.keys(item)[0]]);
            }
        },
        checkAll() {
            this.data.data.forEach(i => {
                if (i.disabled != 1) {
                    this.addChecked(i[Object.keys(i)[0]]);
                }
            });
        },
        uncheckAll() {
            this.data.data.forEach(i => {
                this.removeChecked(i[Object.keys(i)[0]]);
            });
        },
        translate(value) {
            if (typeof this.columnMap == 'undefined') {
                return value;
            } else {
                if (typeof this.columnMap[value] != 'undefined') {
                    return this.columnMap[value];
                }
            }

            return value;
        },
        deleteItem: function (id) {
            this.$swal({
                title: 'Are you sure you want to delete this item?',
                type: 'warning',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then((result) => {
                if (result.value) {
                    axios.delete(this.deleteUrl + '/' + id)
                        .then((response) => {
                            this.$emit('tableupdate');
                            this.postSuccess('Item successfully deleted!');
                            this.getData();
                        })
                        .catch((error) => {
                            console.log(error);
                            this.postError(error);
                        })

                }
            });
        }
    }
}
</script>
