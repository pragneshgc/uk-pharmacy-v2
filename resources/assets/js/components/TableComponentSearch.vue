<template>
    <!--Grid column-->
    <div class=" natcol-table" :class="[columnClass]">
        <transition name="fade">
            <div class="loader loader-fixed" v-show="loading">Loading...</div>
        </transition>
        <!--Card-->
        <div class="">
            <div class="">
                <div v-if="filters.length != 0" class="row search-boxes">
                    <div v-for="(filter, index) in filters" :key="index" class="filter-inputs">
                        <!-- {{ filter.title }} -->
                        <input v-model="selectedFilters[filter.value]" v-if="filter.type == 'text'"
                            class="form-control tBoxSize02" :placeholder="filter.title" />

                        <div style="width: 220px;" v-else-if="filter.type == 'spacer'"></div>

                        <div v-else-if="filter.type == 'textarea'" class="esa-text-area-wrapper">
                            <textarea v-model="selectedFilters[filter.value]" class="form-control tBoxSize02"
                                :placeholder="filter.title">
                                                                                        </textarea>
                        </div>

                        <datepicker v-else-if="filter.type == 'date'" :placeholder="filter.title" :name="filter.value"
                            :clear-button="true" clear-button-icon="fa fa-times" v-model="selectedFilters[filter.value]"
                            maxlength="30"></datepicker>

                        <select class="table-dropdown" v-else-if="filter.type == 'select'" :name="filter.value"
                            v-model="selectedFilters[filter.value]"
                            :class="[selectedFilters[filter.value] && selectedFilters[filter.value] != '' ? 'select-dropdown-active' : '']">
                            <option v-for="(option, index) in filter.options" :key="index" :value="option.value">
                                {{ option.title }}
                            </option>
                        </select>

                        <treeselect v-else-if="filter.type == 'select-extended'" class="vue-treeselect-reports"
                            :open-on-click="true" :open-on-focus="true" :open-on-hover="true"
                            :multiple="filter.multiple ? true : false" :clearable="filter.clearable ? true : false"
                            :searchable="true"
                            :disable-branch-nodes="filter.disableBranchNodes ? filter.disableBranchNodes : false"
                            :placeholder="filter.placeholder" :show-count="true" :default-expand-level="1"
                            :append-to-body="false" :options="filter.options" :instanceId="filter.value"
                            @open="selectOpen" v-model="selectedFilters[filter.value]">
                            <div slot="value-label" slot-scope="{ node }">
                                {{ node.raw.customLabel ? node.raw.customLabel : node.raw.label }}
                            </div>
                            <label slot="option-label"
                                slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
                                :class="labelClassName">
                                {{ node.label }}
                                <span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
                            </label>
                        </treeselect>

                        <treeselect v-else-if="filter.type == 'select-async'" class="vue-treeselect-reports"
                            :open-on-click="true" :clearable="filter.clearable ? true : false" :open-on-focus="true"
                            :open-on-hover="true" :searchable="true"
                            :disable-branch-nodes="filter.disableBranchNodes ? filter.disableBranchNodes : false"
                            :cache-options="true" :placeholder="filter.placeholder" :show-count="true"
                            :default-expand-level="1" :async="true" :load-options="filter.loadOptions"
                            :default-options="false" :multiple="filter.multiple ? true : false" :append-to-body="false"
                            v-model="selectedFilters[filter.value]">
                            <div slot="value-label" slot-scope="{ node }">{{ node.raw.customLabel ? node.raw.customLabel
                                :
                                node.raw.label }}</div>
                            <label slot="option-label"
                                slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
                                :class="labelClassName">
                                {{ node.label }}
                                <span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
                            </label>
                        </treeselect>

                        <input v-model="selectedFilters[filter.value]" v-else class="form-control tBoxSize02"
                            :placeholder="filter.title" />
                    </div>
                </div>
                <div v-if="filters.length != 0" class="row filters-row">
                    <div>
                        <input name="strict" type="checkbox" :checked="strict">
                        <label for="strict" @click="strict = !strict">Exact match</label>
                    </div>
                    <div>
                        <slot name="functionalities"></slot>
                        <button title="Store current filers for later use"
                            :disabled="loading || (filterRequired && noSelectedFilters)"
                            class="btn btnSize02 tertiaryBtn" @click="saveFilters()">Save Filters</button>
                        <button title="Reset saved filters" :disabled="loading || (filterRequired && noSelectedFilters)"
                            class="btn btnSize02 tertiaryBtn" @click="resetFilters()">Reset Filters</button>
                        <button title="Initiate search" :disabled="loading || (filterRequired && noSelectedFilters)"
                            class="btn btnSize02 tertiaryBtn" @click="search()">Search</button>
                    </div>
                </div>
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
                        <a title="Download results as CSV" v-if="csvUrlSearch && csvUrl"
                            class="btn btn-primary waves-effect" :href="csvUrlSearch">
                            <i class="fa fa-file" aria-hidden="true"></i>
                        </a>
                        <a title="Download results as CSV" v-else class="btn btn-primary waves-effect"
                            v-on:click="prepareCSVExport(tableTitle)">
                            <i class="fa fa-file" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
                <slot name="filters"></slot>
            </div>

            <PaginationComponent class="card-footer" style="border-top: 1px solid #8f8f8f;" :data="data"
                :loading="loading" :custom-total="customTotal" :custom-paginate="customPaginate" @click="changePage">
                <template #paginationnumberslot>
                    <slot name="toppagination"></slot>
                </template>
            </PaginationComponent>

            <!--Card content-->
            <div class="card-body" style="min-height: 100px;">
                <!-- Table  -->
                <table style="table-layout: auto;" v-show="data.data.length >= 1" class="table table-hover">
                    <!-- Table head -->
                    <thead class="primary-color text-white">
                        <tr>
                            <th v-if="checkboxVisible"
                                style="width: 40px;font-weight: 400;padding: 16px 8px;vertical-align: top;">
                                <slot name="thfilter"></slot>
                            </th>
                            <th :class="[notOrderable.includes(key) ? '' : 'clickable', key == orderBy ? 'ordered' : '']"
                                v-for="(value, key) in data.data[0]"
                                v-if="typeof hiddenColumns != 'undefined' ? !hiddenColumns.includes(key) : true"
                                :title="notOrderable.includes(key) ? '' : 'Sort by ' + translate(key)"
                                v-on:click="setOrder(key)">
                                {{ translate(key) }}
                                <span v-if="!notOrderable.includes(key)">
                                    <i v-if="key == orderBy && orderDirection == 'DESC'" class="fa fa-caret-down"></i>
                                    <i v-if="key == orderBy && orderDirection == 'ASC'" class="fa fa-caret-up"></i>
                                    <i v-if="key != orderBy" class="fa fa-sort"></i>
                                </span>
                            </th>
                            <th :style="[deleteId ? 'width: 75px;' : 'width: 50px;']"></th>
                        </tr>
                    </thead>
                    <!-- Table head -->

                    <!-- Table body -->
                    <!--<transition-group tag="tbody" name="flip-list">-->
                    <tbody>
                        <!--@dblclick="redirect(item[redirectId])"   -->
                        <tr class="clickable" @dblclick="openInTab(item[redirectId])" v-for="(item, index) in data.data"
                            :key="index" :class="[item['NotFound'] == true ? 'row-danger' : '']">
                            <td v-if="checkboxVisible">
                                <!-- <label class="checkboxElement"> -->
                                <input :name="item[Object.keys(item)[0]]" type="checkbox"
                                    :checked="checked.includes(item[Object.keys(item)[0]])">
                                <label :for="item[Object.keys(item)[0]]" @click="check(item)"></label>
                                <!-- <span class="checkmark"></span>  -->
                                <!-- </label> -->
                            </td>
                            <td v-for="(value, key) in item"
                                v-if="typeof hiddenColumns != 'undefined' ? !hiddenColumns.includes(key) : true">
                                <span v-if="typeof value == 'string'" v-html="value"></span>
                                <ul v-else-if="typeof value == 'object'">
                                    <li v-for="obj in value" v-html="obj"></li>
                                </ul>
                                <span v-else v-html="value"></span>
                            </td>
                            <td>
                                <template v-if="showtool">
                                    <a class="btn btn-primary waves-effect table-icon" v-if="redirectName"
                                        @click="openInTab(item[redirectId])" style="margin: 0;">
                                        <i class="fa fa-search-plus" aria-hidden="true"></i>
                                    </a>

                                    <a v-if="deleteId && deleteUrl" class="btn btn-primary waves-effect table-icon"
                                        v-on:click="deleteItem(item[deleteId])" v-bind:class="{ 'clickable': deleteId }"
                                        style="margin: 0;">
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </a>

                                    <slot name="tools" v-bind:item="item"></slot>
                                </template>
                            </td>
                        </tr>
                    </tbody>
                    <!--</transition-group>-->
                    <!-- Table body -->
                </table>
                <!-- Table  -->
                <div v-show="data.data.length <= 0">
                    No data found!
                </div>
            </div>

            <PaginationComponent class="card-footer" :data="data" :loading="loading" :custom-total="customTotal"
                :custom-paginate="customPaginate" @click="changePage" />
        </div>
        <!--/.Card-->
    </div>
    <!--Grid column-->
</template>

<script>
import TableComponent from './TableComponent.vue';
import Datepicker from './wrapper/Datepicker.vue';
import Treeselect from './wrapper/Treeselect.vue';

export default {
    extends: TableComponent,
    components: {
        Datepicker, Treeselect
    },
    data() {
        return {
            strict: true,
            firstLoad: true,
            customPaginate: {
                total: false,
            },
        }
    },
    computed: {
        csvUrlSearch() {
            if (this.tableTitle == 'Register') {
                return '/orders/csv/register' + this.currentPageParam +
                    this.currentQueryString + this.currentRangeParam +
                    this.currentOrderParam + this.currentLimitParam +
                    this.filterParams(false);
            } else {
                return '/orders/csv' + this.currentPageParam +
                    this.currentQueryString + this.currentRangeParam +
                    this.currentOrderParam + this.currentLimitParam +
                    this.filterParams(false);
            }
        },
        noSelectedFilters() {
            if (Object.keys(this.selectedFilters).length == 0) {
                return true;
            } else {
                let empty = true;
                let keys = Object.keys(this.selectedFilters);

                for (let key in Object.keys(this.selectedFilters)) {
                    if (Array.isArray(this.selectedFilters[keys[key]]) && this.selectedFilters[keys[key]].length > 0) {
                        empty = false;
                    } else if (this.selectedFilters[keys[key]] && !Array.isArray(this.selectedFilters[keys[key]])) {
                        empty = false;
                    }
                }

                return empty;
            }
        }
    },
    mounted() {
        this.filters.forEach(filter => {
            if (filter.type == 'select') {
                if (filter.selected) {
                    this.selectedFilters[filter.value] = filter.selected;
                } else {
                    this.selectedFilters[filter.value] = '';
                }
            }
        });

        if (localStorage.getItem(`${this.tableTitle}.filters`) !== null && localStorage.getItem(`${this.tableTitle}.filters`) != {}) {
            this.selectedFilters = JSON.parse(localStorage.getItem(`${this.tableTitle}.filters`));
        }
    },
    methods: {
        selectOpen(instance) {
            //this is a specific fix for statuses since we need them to be wider than usual (when opening substatus selectors)
            if (instance == 'status-extended') {
                let element = document.querySelector('[data-instance-id="status-extended"]').firstChild
                element.classList.add('vue-treeselect__menu-container-body');
            }
        },
        getData() {
            this.loading = true;

            if (this.firstLoad) {
                if (!this.loadOnStartup) {
                    this.firstLoad = false;
                    this.loading = false;
                    return;
                }

                if (localStorage.getItem(`${this.tableTitle}.filters`) !== null && localStorage.getItem(`${this.tableTitle}.filters`) != {}) {
                    this.selectedFilters = JSON.parse(localStorage.getItem(`${this.tableTitle}.filters`));
                }
            }

            axios.get(
                this.dataUrl + this.currentPageParam +
                this.currentQueryString + this.currentRangeParam +
                this.currentOrderParam + this.currentLimitParam +
                this.filterParams()
            )
                .then((response) => {
                    this.data = response.data.data;

                    if (!this.data.total && this.customTotal && this.firstLoad) {
                        axios.get(this.customTotal)
                            .then((response) => {
                                this.customPaginate.total = response.data.data;
                            })
                    }

                    let visible = this.data.data.map(function (item) {
                        return item[Object.keys(item)[0]];
                    });

                    this.$store.commit('replaceVisible', visible);
                })
                .catch((error) => {
                    this.reportError(error);
                })
                .finally(() => {
                    this.loading = false;
                    this.firstLoad = false;
                })
        },
        prepareCSVExport(title = '') {
            let url = this.dataUrl + "?page=1" + this.currentQueryString + this.currentRangeParam + this.currentOrderParam + `&limit=99999` +
                `${this.filterParams(false)}`;

            axios.get(url)
                .then((response) => {
                    this.exportCSV(response.data.data.data, title);
                })
                .catch((error) => {
                    this.reportError(error);
                })
        },
        filterParams() {
            let param = JSON.stringify(this.selectedFilters);

            return `&f=${param}&strict=${this.strict}`;
        },
        search() {
            this.getData();
        },
        saveFilters() {
            localStorage.setItem(`${this.tableTitle}.filters`, JSON.stringify(this.selectedFilters));
            this.postSuccess('Filters saved');
        },
        resetFilters() {
            this.selectedFilters = {};

            this.filters.forEach(filter => {
                if (filter.type == 'select') {
                    this.selectedFilters[filter.value] = '';
                }
            });

            localStorage.removeItem(`${this.tableTitle}.filters`);

            this.postSuccess('Filters reset');

            this.getData();
        },
        openInTab(id) {
            if (!this.redirectEvent) {
                let route = this.$router.resolve({ name: this.redirectName, params: { id: id } });
                window.open(route.href, '_blank');
            } else {
                this.emitter.emit(this.redirectEvent, id);
            }
        },
    },
}
</script>
