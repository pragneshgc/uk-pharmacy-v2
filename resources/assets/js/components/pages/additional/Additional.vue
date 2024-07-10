<template>
    <section class="products natcol-table content">
        <section class="card">
            <div class="card-header">
                <h3>Additional Information</h3>
            </div>
            <div class="products-header mb-10">
                <div class="products-navigation">
                    <div class="products-buttons" style="display: flex; align-items: center; justify-content: center;">
                        <button title="Add New Cautionary and Advisory Label"
                            class="btn btnSize02 secondaryBtn mt-10 ml-10" @click="addGroup()">
                            <i class="fa fa-plus"></i> Add New Group
                        </button>

                        <treeselect class="mt-10 ml-10" :async="true" :searchable="true" :multiple="true"
                            :close-on-select="false" :open-on-click="true" :open-on-focus="true" :clear-on-select="true"
                            :disable-branch-nodes="true" placeholder="Select Product" :show-count="true"
                            :default-expand-level="1" :default-options="productsList" :load-options="loadOptions"
                            :append-to-body="false" v-model="productFilter" :disabled="loading" />
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div id="warning-label-table" class="products-body">
                    <table class="table table-hover">
                        <thead class="primary-color text-white">
                            <tr>
                                <th v-for="(value, key) in visibleColumns" :key="key">
                                    <span>{{ value }}</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody v-for="(v, k) in groupedLabels" :key="k" v-if="labels.length > 0">
                            <tr>
                                <td style="background:rgb(60 165 168); border: solid 1px rgb(60 165 168); color: #fff; font-size: 18px; padding-left: 15px!important;"
                                    colspan="2">
                                    <span v-if="v.group == 0">New Group</span>
                                    <span v-else>Group {{ v.group }}</span>
                                </td>
                                <td style="background: rgb(60 165 168); border: solid 1px rgb(60 165 168); color: #fff; max-width: 300px;"
                                    colspan="1">
                                    <button title="Add Label" @click="addLabel(v.group)"
                                        class="btn btn-primary waves-effect table-icon">
                                        <i class="fa fa-plus"></i>
                                    </button>

                                    <button title="Show products" @click="showProducts(v.group)"
                                        class="btn btn-primary waves-effect table-icon">
                                        <i class="fa"
                                            :class="[productsExpanded.includes(v.group) ? 'fa-caret-up' : 'fa-caret-down']"></i>
                                    </button>
                                </td>
                            </tr>
                            <!-- Products -->
                            <tr v-if="productsExpanded.includes(v.group)">
                                <td colspan="3">
                                    <table v-if="products[v.group] && products[v.group].length > 0">
                                        <thead>
                                            <tr>
                                                <th colspan="4"
                                                    style="background: white; border-bottom: 1px solid gainsboro;">
                                                    <div
                                                        style="display: flex; justify-content:flex-start; align-items: center;">
                                                        <treeselect v-model="productsAdd[v.group]"
                                                            :disable-branch-nodes="true" placeholder="Select Product"
                                                            :show-count="true" :default-expand-level="1"
                                                            :load-options="loadOptions" :async="true"
                                                            :append-to-body="false" :disabled="loading" />

                                                        <button v-if="productsAdd[v.group]"
                                                            class="btn btnSize02 tertiaryBtn ml-10"
                                                            @click="addProduct(productsAdd[v.group], v.group)">Add</button>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <!-- <th>Status</th> -->
                                                <th>Code</th>
                                                <th>Name</th>
                                                <th>Tools</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="product in products[v.group]" :key="product.Code">
                                                <td>
                                                    {{ product.Code }}
                                                </td>
                                                <td>
                                                    {{ product.Name }} ({{ product.Quantity }} {{ product.Units }})
                                                </td>
                                                <td>
                                                    <button title="Remove product from group"
                                                        @click="removeProduct(product.ProductCodeID, v.group)"
                                                        class="btn btn-primary table-icon table-icon-danger">
                                                        <i class="fa  fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div v-else>
                                        <ul>
                                            <li style="padding-bottom: 10px; padding-top: 10px;">
                                                <div
                                                    style="display: flex; justify-content:flex-start; align-items: center;">
                                                    <treeselect v-model="productsAdd[v.group]"
                                                        :disable-branch-nodes="true" placeholder="Select Product"
                                                        :show-count="true" :default-expand-level="1"
                                                        :load-options="loadOptions" :async="true"
                                                        :append-to-body="false" :disabled="loading" />

                                                    <button v-if="productsAdd[v.group]"
                                                        class="btn btnSize02 tertiaryBtn ml-10"
                                                        @click="addProduct(productsAdd[v.group], v.group)">Add</button>
                                                </div>
                                            </li>
                                            <li>No products found in this group</li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <!-- /Products -->
                            <tr v-for="(value) in v.array" :key="value.ProductCodeID">
                                <!-- <td>
                                    <input
                                    :name="value.ProductCodeID"
                                    type="checkbox"
                                    :checked="value.Status == 1">
                                    <label :for="value.ProductCodeID" @click="check(value.AIID, value.Status)"></label>
                                </td> -->
                                <td v-if="value.editing"
                                    style="padding-left: 15px!important; max-width: 120px!important;">
                                    <select name="country" v-model="value.CountryID" style="padding: 5px;">
                                        <option v-for="country in countries" :value="country.CountryID"
                                            :key="country.CountryID">{{ country.Name }}</option>
                                    </select>
                                </td>
                                <td v-else style="padding-left: 15px!important; max-width: 120px!important;">
                                    <span v-html="value.Country"></span>
                                </td>
                                <!-- <td v-for="(v, k) in value" :key="k" v-if="!hiddenColumns.includes(k)">
                                    <span v-html="v"></span>
                                </td> -->
                                <td>
                                    <div style="padding: 10px;" v-if="!value.editing"
                                        v-html="sanitizeDescription(value.Description)" />
                                    <textarea v-else type="text" v-model="value.Description"
                                        style="width: 100%; padding: 5px;">
                                        </textarea>
                                </td>
                                <td>
                                    <div v-if="!value.new">
                                        <button v-if="!value.editing" title="Edit this label" @click="editLabel(value)"
                                            class="btn btn-primary waves-effect table-icon">
                                            <i class="fa fa-edit"></i>
                                        </button>
                                        <button v-if="!value.editing" title="Delete this label"
                                            @click="deleteLabel(value)"
                                            class="btn btn-primary table-icon table-icon-danger">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                        <button v-if="value.editing" title="Save changes to this label"
                                            @click="updateLabel(value)" class="btn btn-primary waves-effect table-icon">
                                            <i class="fa fa-save"></i>
                                        </button>
                                        <button v-if="value.editing" title="Undo changes to this label"
                                            @click="cancelEdit(value)"
                                            class="btn btn-primary table-icon table-icon-danger">
                                            <i class="fa fa-undo"></i>
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button v-if="value.editing" title="Save label" @click="saveLabel(value)"
                                            class="btn btn-primary waves-effect table-icon">
                                            <i class="fa fa-save"></i>
                                        </button>
                                        <button v-if="value.editing" title="Cancel creating this label"
                                            @click="cancelLabel(value)"
                                            class="btn btn-primary table-icon table-icon-danger">
                                            <i class="fa fa-minus"></i>
                                        </button>
                                    </div>

                                    <!-- <a title="View Inventory" class="table-icon" target="_blank" :href="`#/inventory/item/${value.ProductCodeID}`"><i class="fa fa-cubes"></i></a> -->
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td :colspan="visibleColumns.length">
                                    <div class="no-results-found">
                                        No matching search results found!
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="products-footer card-footer">

            </div>
        </section>

        <AdditionalEdit />
    </section>
</template>

<script>
import AdditionalEdit from './AdditionalEdit.vue';
import Error from '../../../mixins/errors'
import Treeselect from '@emacle/vue-treeselect'
import '@emacle/vue-treeselect/dist/vue-treeselect.css'
import { ASYNC_SEARCH } from '@emacle/vue-treeselect'
import logging from '../../../mixins/logging';
import DOMPurify from 'dompurify';

export default {
    components: {
        AdditionalEdit, Treeselect
    },
    mixins: [Error, logging],
    data() {
        return {
            loading: false,
            filtersVisible: false,
            hiddenColumns: ['AIID', 'CountryID', 'Group', 'Status', 'editing', 'new', 'Description'],
            labels: [],
            productFilter: [],
            labelsUnedited: [],
            products: [],
            productsList: [],
            productsExpanded: [],
            productsAdd: [],
            countries: [],
            alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
            columns: {
                label: [
                    "Country", "Description", "Options"
                ],
            },
            filter: {
                letter: 'all',
                company: 0,
                fridge: 'all',
                productType: 'all',
                reclassification: 'all',
                package: 'all',
                fdb: '0',
                name: {
                    status: false,
                    value: '',
                },
                code: {
                    status: false,
                    value: '',
                }
            },
            values: {
                name: '',
                code: '',
            },
            tab: 'drug',
        }
    },
    mounted() {
        this.getLabels();
        this.getCountries();

        this.$root.$on('product.refresh', () => {
            this.getLabels();
        });
    },
    destroyed() {
        this.$root.$off('product.refresh');
    },
    computed: {
        visibleColumns() {
            return this.columns.label;
        },
        searchString() {
            let product = `?product=${this.productFilter}`;

            return product;
        },
        visibleLabels() {
            return this.labels;
        },
        groupedLabels() {
            let objects = [];
            let response = [];

            this.labels.forEach(label => {
                if (typeof objects[label.Group] == 'undefined') {
                    objects[label.Group] = {
                        array: [],
                        group: label.Group
                    };
                    objects[label.Group].array.push(label);
                } else {
                    objects[label.Group].array.push(label);
                }
            });

            for (const key in objects) {
                response.push(objects[key]);
            }

            return response;
        },
        groups() {
            let groups = [];

            this.labels.forEach(label => {
                if (!groups.includes(label.Group)) {
                    groups.push(label.Group)
                }
            });

            return groups;
        },
        csvUrl() {
            return this.tab == 'drug' ? `/inventory/products/csv${this.searchString}` : `/inventory/countries/csv${this.searchString}`;
        }
    },
    watch: {
        searchString() {
            this.getLabels();
        },
    },
    methods: {
        loadOptions: _.debounce(function ({ action, searchQuery, callback }) {
            if (action === ASYNC_SEARCH) {
                this.getProductList(searchQuery, (results) => {
                    let products = [];

                    results.forEach((result) => {
                        products.push(
                            {
                                id: result.ProductCodeID,
                                label: result.Name,
                            }
                        );
                    })

                    callback(null, products);
                })
            }
        }, 500),
        sanitizeDescription(desc) {
            return DOMPurify.sanitize(desc);
        },
        getLabels() {
            this.loading = true;
            axios.get(`/additional-information${this.searchString}`)
                .then((response) => {
                    this.labels = response.data.data;
                    this.labelsUnedited = JSON.parse(JSON.stringify(response.data.data));
                    this.push = 0;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        /**
         * Filters
         */
        saveFilter(column) {
            this.filter[column].value = this.values[column];
            this.toggleFilter(column);
        },
        clearFilter(column) {
            this.filter[column].value = '';
            this.values[column] = '';
            this.filter[column].status = false;
        },
        toggleFilter(column) {
            this.filter[column].status = !this.filter[column].status;
            if (this.filter[column].status) {
                setTimeout(() => {
                    let filter = document.getElementById(`${column}-filter`);
                    filter.focus();
                    filter.select();
                }, 10);
            }
        },
        /**
         * Filters
         */
        getCountries() {
            this.loading = true;
            axios.get(`/countries`)
                .then((response) => {
                    this.countries = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
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
                    console.log(error);
                    this.postError(error.response.data.message);
                })
        },
        editLabel(label) {
            label.editing = true;
        },
        addLabel(k) {
            let newLabel = {
                CountryID: 1,
                Description: "",
                Group: k,
                Status: 1,
                editing: true,
                new: true,
                AIID: Date.now()
            }

            this.labels.unshift(newLabel);
        },
        updateLabel(label) {
            axios.patch(`/additional-information/${label.AIID}`, label)
                .then((response) => {
                    this.postSuccess('Changes saved');
                    this.getLabels();
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    label.editing = false;
                })
        },
        cancelEdit(label) {
            let oldLabel = this.labelsUnedited.find(l => {
                return l.AIID === label.AIID
            });

            label.Description = oldLabel.Description;
            label.editing = false;
        },
        saveLabel(label) {
            axios.post('/additional-information', label)
                .then((response) => {
                    this.labels.splice(this.labels.findIndex(item => item.AIID === label.AIID), 1);
                    this.labels.unshift(response.data.data);
                    this.postSuccess(response.data.message);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        deleteLabel(label) {
            this.$swal({
                title: 'Delete Label',
                html: 'Are you sure you want to delete this label?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ff5151',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then((result) => {
                if (result.value) {
                    axios.delete(`/additional-information/${label.AIID}`)
                        .then((response) => {
                            this.labels.splice(this.labels.findIndex(item => item.AIID === label.AIID), 1);
                            this.postSuccess(response.data.message);
                        })
                        .catch((error) => {
                            this.postError(error.response.data.message);
                        })
                }
            })
        },
        removeProduct(productCodeId, group) {
            this.$swal({
                title: 'Remove product',
                html: 'Are you sure you want to remove product from this group?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ff5151',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then((result) => {
                if (result.value) {
                    axios.delete(`/additional-information/group/${group}/products/${productCodeId}`)
                        .then((response) => {
                            this.getProducts(group);
                            // this.labels.splice(this.labels.findIndex(item => item.AIID === label.AIID), 1);
                            this.postSuccess(response.data.message);
                        })
                        .catch((error) => {
                            this.postError(error.response.data.message);
                        })
                }
            })
        },
        addProduct(productCodeId, group) {
            axios.put(`/additional-information/group/${group}/products/${productCodeId}`)
                .then((response) => {
                    this.getProducts(group);
                    // this.labels.splice(this.labels.findIndex(item => item.AIID === label.AIID), 1);

                    this.logSystemActivity(productCodeId, 6, 903, { group: group, productCodeId: productCodeId });

                    this.postSuccess(response.data.message);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        addGroup() {
            this.labels.unshift({
                Group: 0,
                editing: true,
                new: true,
                CountryID: 1,
                Country: '',
                Description: '',
                Status: 1,
                Name: '',
            });
        },
        showProducts(id) {
            if (!this.productsExpanded.includes(id)) {
                this.getProducts(id, () => {
                    this.productsExpanded.push(id);
                })
            } else {
                this.productsExpanded.splice(this.productsExpanded.indexOf(id), 1);
                this.products.splice(id, 1);
            }
        },
        //get products by group ID
        getProducts(id, callback = false) {
            axios.get(`/additional-information/group/${id}/products`)
                .then((response) => {
                    this.products.splice(id, 1);
                    this.products[id] = response.data.data;
                    if (callback) {
                        callback();
                    }
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        cancelLabel(label) {
            this.labels.splice(this.labels.findIndex(item => item.AIID === label.AIID), 1);
        },
        openEditModal(type) {
            this.$root.$emit('label.add');
        },
        check(id, status) {
            if (status == 1) {
                axios.post(`/additional-information/${id}/disable`)
                    .then((response) => {
                        this.postWarning('Label disabled');
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.getLabels();
                    })
            } else {
                axios.post(`/additional-information/${id}/enable`)
                    .then((response) => {
                        this.postSuccess('Label enabled');
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.getLabels();
                    })
            }
        },
        checkProduct(code, group, status) {
            if (status == 1) {
                axios.post(`/additional-information/${group}/disable/product`, { code: code })
                    .then((response) => {
                        this.postWarning('Label disabled');
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.getProducts(group);
                    })
            } else {
                axios.post(`/additional-information/${group}/enable/product`, { code: code })
                    .then((response) => {
                        this.postSuccess('Label enabled');
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.getProducts(group);
                    })
            }
        },
    },
}
</script>
