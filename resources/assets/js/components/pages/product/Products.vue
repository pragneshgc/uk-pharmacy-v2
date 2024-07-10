<template>
    <section class="products natcol-table content">
        <section class="card">
            <div class="card-header">
                <h3>Products</h3>
            </div>
            <div class="products-header">
                <div class="products-navigation">
                    <div class="navigation-wrapper">
                        <ul class="products-tab">
                            <li @click="tab = 'drug'" style="display:flex;align-items:center;"
                                class="products-tab-item clickable" :class="[tab == 'drug' ? 'active' : '']">
                                Show Drug Pricing
                            </li>
                            <li @click="tab = 'delivery'" style="display:flex;align-items:center;"
                                class="products-tab-item clickable" :class="[tab == 'delivery' ? 'active' : '']">
                                Show Delivery Pricing
                            </li>
                            <li class="products-tab-item">
                                <select v-model="filter.company" name="CLIENTID" class="browser-default custom-select"
                                    style="width:200px;">
                                    <option disabled value="">SELECT PRICING</option>
                                    <option value="INACTIVE">INACTIVE</option>
                                    <option value="DISCONTINUED">DISCONTINUED</option>
                                    <option value="NOTPRICED">NOT PRICED</option>
                                    <option value="0" selected="">DEFAULT</option>
                                    <option value="33">EMedvertise</option>
                                    <option value="34">DMS</option>
                                    <option value="35">BIMS Ltd</option>
                                    <option value="39">Dorax International NV</option>
                                    <option value="42">Treated DEV</option>
                                    <option value="49">Apport Sarl</option>
                                    <option value="50">Treated</option>
                                    <option value="51">EveAdam</option>
                                    <option value="52">Test Account Pratik</option>
                                    <option value="53">Treated LIVE</option>
                                </select>
                            </li>
                            <li class="products-tab-item">
                                <select :disabled="tab != 'drug'" v-model="filter.fdb" name="FDB"
                                    class="browser-default custom-select" style="width:200px;">
                                    <option value="0">All</option>
                                    <option value="1">ESA</option>
                                    <option value="2">FDB</option>
                                </select>
                            </li>
                            <li style="display:flex;align-items:center;" class="products-tab-item">
                                {{ tab == 'drug' ? products.length : countries.length }} items found
                            </li>

                        </ul>
                    </div>
                    <div class="products-buttons" style="margin-right: 10px;">
                        <button title="Add new product" class="btn btnSize02 secondaryBtn" @click="openEditModal('product')"
                            v-if="userInfo.role > 4">
                            <i class="fa fa-plus"></i> New Product
                        </button>

                        <button title="Add new country" class="btn btnSize02 secondaryBtn" @click="openEditModal('country')"
                            v-if="userInfo.role > 4">
                            <i class="fa fa-plus"></i> New Country
                        </button>

                        <button title="Import Products" class="btn btnSize02 secondaryBtn" @click="openImportModal()"
                            v-if="userInfo.role > 4">
                            <i class="fa fa-plus"></i> Import Products
                        </button>

                        <a title="Download CSV" :href="csvUrl" class="btn btnSize02 secondaryBtn">
                            <i class="fa fa-download"></i> Download CSV
                        </a>
                    </div>
                </div>

                <div class="products-letter-filter mt-10 mb-10">
                    <button @click="filter.letter = 'all'" class="products-button ml-10"
                        :class="[!filter.letter || filter.letter == 'all' ? 'active' : '']">
                        All
                    </button>
                    <button @click="filter.letter = 'number'" class="products-button ml-5"
                        :class="[filter.letter == 'number' ? 'active' : '']">
                        0-9
                    </button>
                    <button @click="filter.letter = letter" class="products-button ml-5"
                        :class="[filter.letter == letter ? 'active' : '']" v-for="letter in alphabet" :key="letter">
                        {{ letter }}
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div id="products-table" class="products-body">
                    <table v-if="tab == 'drug'" class="table table-hover" style="position:relative;">
                        <thead class="primary-color text-white" style="top: 0; position:sticky;">
                            <tr>
                                <th v-for="(value, key) in visibleColumns" :key="key">
                                    <select class="product-table-select" v-if="value == 'Product Type'"
                                        v-model="filter.productType">
                                        <option value="all">
                                            Product Type (all)
                                        </option>
                                        <option value="1">
                                            Product Type (Medicine)
                                        </option>
                                        <option value="2">
                                            Product Type (Test Kit)
                                        </option>
                                    </select>

                                    <select class="product-table-select" v-else-if="value == 'Fridge'"
                                        v-model="filter.fridge">
                                        <option value="all">
                                            Fridge (all)
                                        </option>
                                        <option value="1">
                                            Fridge (Yes)
                                        </option>
                                        <option value="0">
                                            Fridge (No)
                                        </option>
                                    </select>

                                    <select class="product-table-select" v-else-if="value == 'Package'"
                                        v-model="filter.package">
                                        <option value="all">
                                            Package (all)
                                        </option>
                                        <option value="0">
                                            Package (Single)
                                        </option>
                                        <option value="1">
                                            Package (Package)
                                        </option>
                                    </select>

                                    <select class="product-table-select" v-else-if="value == 'Reclassification'"
                                        v-model="filter.reclassification">
                                        <option value="all">
                                            Reclassification (all)
                                        </option>
                                        <option value="0">
                                            Reclassification (POM)
                                        </option>
                                        <option value="1">
                                            Reclassification (P)
                                        </option>
                                    </select>

                                    <div class="clickable" title="Filter by Name" v-else-if="value == 'Name'">
                                        <div v-if="filter.name.status">
                                            <form @submit.prevent="saveFilter('name')">
                                                <input id="name-filter" class="form-control-inline" v-model="values.name"
                                                    type="text">
                                                <i @click="saveFilter('name')" class="fa fa-check ml-10"></i>
                                                <i @click="clearFilter('name')" class="fa fa-close ml-10"></i>
                                            </form>
                                        </div>
                                        <div v-else @click="toggleFilter('name')">
                                            <span>{{ value }}</span>
                                            <span v-if="filter.name.value != ''"><b>({{ filter.name.value }})</b></span>
                                            <i class="fa fa-edit ml-10"></i>
                                        </div>
                                    </div>

                                    <select class="product-table-select" v-else-if="value == 'Pouchable'"
                                        v-model="filter.pouchable">
                                        <option :value="'all'">
                                            Pouchable (All)
                                        </option>
                                        <option :value="0">
                                            Pouchable (Manual)
                                        </option>
                                        <option :value="1">
                                            Pouchable (Always)
                                        </option>
                                        <option :value="2">
                                            Pouchable (Disabled)
                                        </option>
                                    </select>

                                    <div class="clickable" title="Filter by Code" v-else-if="value == 'Code'">
                                        <div v-if="filter.code.status">
                                            <form @submit.prevent="saveFilter('code')">
                                                <input id="code-filter" class="form-control-inline" v-model="values.code"
                                                    type="text">
                                                <i @click="saveFilter('code')" class="fa fa-check ml-10"></i>
                                                <i @click="clearFilter('code')" class="fa fa-close ml-10"></i>
                                            </form>
                                        </div>
                                        <div v-else @click="toggleFilter('code')">
                                            <span>{{ value }}</span>
                                            <span v-if="filter.code.value != ''"><b>({{ filter.code.value }})</b></span>
                                            <i class="fa fa-edit ml-10"></i>
                                        </div>
                                    </div>

                                    <span v-else>
                                        {{ value }}
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="products.length > 0">
                            <tr v-for="(value) in visibleProducts" :key="value.ProductCodeID">
                                <td v-for="(v, k) in value" :key="k" v-if="!hiddenColumns.includes(k)">
                                    <span v-html="v"></span>
                                </td>
                                <td>
                                    <a title="View Details" @click="editProduct(value)"
                                        class="btn btn-primary table-icon"><i class="fa fa-info"></i></a>
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

                    <table id="deliveries-table" v-else-if="tab == 'delivery'" class="table table-hover">
                        <thead class="primary-color text-white">
                            <tr>
                                <th v-for="(value, key) in countries[0]" :key="key" v-if="!hiddenColumns.includes(key)">
                                    {{ key }}
                                </th>
                                <th>
                                    Options
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- <transition-group tag="tbody" name="slide-left"> -->
                            <tr v-for="(value) in countries" :key="value.ProductCodeID">
                                <td v-for="(v, k) in value" :key="k" v-if="!hiddenColumns.includes(k)">
                                    {{ v }}
                                </td>
                                <td>
                                    <button title="View delivery pricing" @click="editCountry(value)"
                                        class="btn btn-primary table-icon"><i class="fa fa-info"></i></button>
                                </td>
                            </tr>
                            <!-- </transition-group> -->
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="products-footer card-footer">

            </div>
        </section>

        <ProductEdit />
        <Import modal-name="import" />
    </section>
</template>

<script>
import ProductEdit from './ProductEdit.vue';
import Import from './Import.vue';

export default {
    components: {
        ProductEdit, Import
    },
    data() {
        return {
            loading: false,
            hiddenColumns: ['ProductCodeID', 'Status'],
            products: [],
            countries: [],
            alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
            columns: {
                drug: [
                    "Code", "Name", "Quantity", "Units", "Pouchable", "Product Type", "Package", "Reclassification", "Fridge", "TariffCode", "Price", "Options"
                ],
                delivery: [
                    "Code", "Name", "Price", "Options"
                ],
            },
            filter: {
                letter: 'all',
                company: 0,
                fridge: 'all',
                productType: 'all',
                pouchable: 'all',
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
            //products trickery
            push: 0,
            userInfo: userInfo
        }
    },
    mounted() {
        this.getProducts();
        this.getCountries();

        this.$root.$on('product.refresh', () => {
            if (this.tab == 'drug') {
                this.getProducts();
            } else {
                this.getCountries();
            }
        });

        let table = document.getElementById('products-table');
        table.addEventListener('scroll', () => {
            if (Math.ceil(table.scrollTop + table.clientHeight) + 5 >= table.scrollHeight && table.scrollHeight > table.clientHeight) {
                this.push += 200;
            }
        });

        if (typeof this.$route.query.code != 'undefined') {
            if (this.$route.query.code != '') {
                axios.get(`/inventory/products/${this.$route.query.code}`)
                    .then((response) => {
                        if (response.data.data != null) {
                            this.editProduct(response.data.data)
                        }
                    })
            }
        }
    },
    destroyed() {
        this.$root.$off('product.refresh');
    },
    computed: {
        visibleColumns() {
            if (this.tab == 'drug') {
                return this.columns.drug;
            } else {
                return this.columns.delivery;
            }
        },
        searchString() {
            let letter = `?letter=${this.filter.letter}`;
            let company = `&company=${this.filter.company}`;
            let additional = '';

            if (this.tab == 'drug') {
                additional = `&fridge=${this.filter.fridge}&type=${this.filter.productType}&code=${this.filter.code.value}
                &reclassification=${this.filter.reclassification}&fdb=${this.filter.fdb}&name=${this.filter.name.value}&package=${this.filter.package}&pouchable=${this.filter.pouchable}`;
            }

            return letter + company + additional;
        },
        visibleProducts() {

            // if(this.products.length > 200){
            return this.products.slice(0, 200 + this.push);
            // } else {
            // return this.products;
            // }
        },
        csvUrl() {
            return this.tab == 'drug' ? `/inventory/products/csv${this.searchString}` : `/inventory/countries/csv${this.searchString}`;
        }
    },
    watch: {
        searchString() {
            if (this.tab == 'drug') {
                this.getProducts();
            } else {
                this.getCountries();
            }
        },
        tab(newValue) {
            if (newValue == 'drug') {
                this.getProducts();
            } else {
                this.getCountries();
            }
        },
    },
    methods: {
        getProducts() {
            this.loading = true;
            axios.get(`/inventory/products${this.searchString}`)
                .then((response) => {
                    this.products = response.data.data;
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
            axios.get(`/inventory/countries${this.searchString}`)
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
        addProduct() {
            this.$root.$emit('product.add');
        },
        addCountry() {
            this.$root.$emit('country.add');
        },
        editProduct(product) {
            this.$root.$emit('product.details', product);
        },
        editCountry(country) {
            this.$root.$emit('country.details', country);
        },
        openEditModal(type) {
            this.$root.$emit(type + '.add');
        },
        openImportModal() {
            this.$root.$emit('modal.open', 'import');
        },
    },
}
</script>
