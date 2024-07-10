<template>
    <transition name="fade">
        <div v-if="visible" class="esa-modal" id="productEditor" tabindex="-1" role="dialog" 
        aria-labelledby="itemEditorLabel" aria-modal="true" >
            <div class="backdrop" @click="clear()">
            </div>

            <div class="modal" role="document">
                <!--Header-->
                <div class="modal-header">
                    <h3 class="heading lead">
                        {{ title }}
                    </h3>
                    <span class="close" @click="clear()">X</span>
                </div>
                <div v-if="productCodeId && !pricingId && !editing" class="modal-header" style="background: transparent; box-shadow: none;border-bottom: 1px solid gainsboro; display: flex; align-items: center;">
                    <button @click="editProduct(productCode)" class="btn btnSize02 tertiaryBtn">
                        Update Product Code
                    </button>

                    <select class="ml-10 browser-default custom-select" v-model="productCodeId" name="ProductCodeID">
                        <option value="">SELECT</option>
                        <option v-for="option in options" :key="option.ProductCodeID" :value="option.ProductCodeID">{{ option.Name }}</option>
                    </select>

                    <button v-if="productCode.Status == 1" @click="deleteProduct()" class="ml-10 btn btnSize02 tertiaryBtn">
                        DEACTIVATE ProductCode
                    </button>

                    <button v-else @click="reactivateProduct()" class="ml-10 btn btnSize02 tertiaryBtn">
                        ACTIVATE ProductCode
                    </button>
                </div>

                <!--Body-->
                <div class="modal-body text-center">
                    <div class="expand-100 d-flex justify-content-between">
                        <div class="row wow fadeIn" style="width: 100%;">
                            <!-- OVERVIEW -->
                            <div class="col-lg-12 wow fadeIn" v-if="productCodeId && !pricingId && !editing">
                                <table v-if="list.length > 0" id="products-table" class="table table-hover">
                                    <thead class="primary-color text-white">
                                        <th v-for="(value, key) in list[0]" :key="key" v-if="!['UnformattedPrice', 'PricingID'].includes(key)">
                                            {{ key }}
                                        </th>
                                        <th>
                                            Options
                                        </th>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(value) in list" :key="value.Code">
                                            <td v-for="(v, k) in value" :key="k" v-if="!['UnformattedPrice', 'PricingID'].includes(k)">
                                                {{ v }}
                                            </td>
                                            <td>
                                                <button @click="edit(value)" class="table-icon">
                                                    <i class="fa fa-edit" style="color: white;"></i>
                                                </button>

                                                <button v-if="value.ClientID != 'DEFAULT'" @click="removePricing(value.PricingID)" class="table-icon">
                                                    <i class="fa fa-trash" style="color: white;"></i>
                                                </button>                                                
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>                                
                            </div>
                            <!-- COUNTRY ADD -->
                            <div class="pxp-form" v-else-if="!productCodeId && type == 'country'">
                                <div class="form-column">
                                    <div class="form-group form-group-2">
                                        <label for="CountryID">Select Country</label>
                                        <select class="browser-default custom-select" v-model="form.country.country" name="CountryID">
                                            <option v-for="country in countries" :key="country.CountryID" :value="country.CountryID">{{ country.Name }}</option>
                                        </select>                                    
                                    </div> 
                                </div>
                                <div class="form-column">
                                    <div class="form-group form-group-2">
                                        <label for="Price">Price</label>
                                        <input name="Price" v-model="form.country.price" autocomplete="off" type="number" id="value" placeholder="Default Price" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <!-- PRICING EDIT -->
                            <div class="pxp-form" v-else-if="pricingId && editing">
                                <div class="form-column">
                                    <div class="form-group form-group-2">
                                        <label for="Price">Price</label>
                                        <input name="Price" v-model="form.country.price" autocomplete="off" type="number" id="value" placeholder="Price" class="form-control">
                                    </div>
                                </div>
                            </div>        
                            <!-- ADD PRICING COUNTRY -->
                            <div class="pxp-form wow fadeIn" v-else-if="type == 'pricing' && editing">
                                <div class="form-column">
                                    <div class="form-group form-group-2">
                                        <label for="ClientID">Client</label>
                                        <select class="browser-default custom-select" v-model="form.pricing.client" name="ClientID">
                                            <option :value="0">DEFAULT</option>
                                            <option v-for="company in clients" :key="company.ClientID" :value="company.ClientID">{{ company.CompanyName }}</option>
                                        </select>                                    
                                    </div> 
                                </div>
                                <div class="form-column">
                                    <div class="form-group form-group-2">
                                        <label for="Price">Price</label>
                                        <input name="Price" v-model="form.pricing.price" autocomplete="off" type="number" id="value" placeholder="Price" class="form-control">
                                    </div>
                                </div>
                            </div>        


                            <!-- EDIT PRODUCT -->
                            <div class="pxp-form wow fadeIn" v-else-if="type == 'product' && editing">
                                <div class="form-column">
                                    <div class="form-group form-group-2">
                                        <label for="code">Code</label>
                                        <input v-model="productCodeEdit.Code" type="text" id="code" class="form-control mb-3" placeholder="Code">
                                        <label for="code">CAUTION : changing this will affect pricing</label>
                                        <div v-if="errors.Code" class="invalid-feedback d-block">{{ errors.Code[0] }}</div>
                                    </div>

                                    <div class="form-group form-group-2">
                                        <label for="name">Name</label>
                                        <input v-model="productCodeEdit.Name" type="text" id="name" class="form-control mb-3" placeholder="Name">
                                        <div v-if="errors.Name" class="invalid-feedback d-block">{{ errors.Name[0] }}</div>
                                    </div>

                                    <div class="form-group form-group-2">
                                        <label for="Quantity">Quantity</label>
                                        <input v-model="productCodeEdit.Quantity" type="text" id="Quantity" class="form-control mb-3" placeholder="Quantity">
                                        <label for="Quantity">CAUTION : changing this will affect pricing</label>
                                        <div v-if="errors.Quantity" class="invalid-feedback d-block">{{ errors.Quantity[0] }}</div>
                                    </div>

                                    <div class="form-group form-group-2">
                                        <label for="Units">Units</label>
                                        <input v-model="productCodeEdit.Units" type="text" id="Units" class="form-control mb-3" placeholder="Units">
                                        <div v-if="errors.Units" class="invalid-feedback d-block">{{ errors.Units[0] }}</div>
                                    </div>

                                    <div class="form-group form-group-2">
                                        <label for="TariffCode">Tariff Code</label>
                                        <input v-model="productCodeEdit.TariffCode" type="text" id="TariffCode" class="form-control mb-3" placeholder="Tariff Code">
                                        <div v-if="errors.TariffCode" class="invalid-feedback d-block">{{ errors.TariffCode[0] }}</div>
                                    </div>

                                    <div class="form-group form-group-2">
                                        <label for="Fridge">Fridge</label>
                                        <select class="browser-default custom-select" v-model="productCodeEdit.Fridge" name="Fridge">
                                            <option v-if="productCodeEdit.Units == 'SHIPPING'" :value="null">NOT APPLICABLE</option>
                                            <option v-if="productCodeEdit.Units != 'SHIPPING'" value="0" selected>No</option>
                                            <option v-if="productCodeEdit.Units != 'SHIPPING'" value="1">Yes</option>
                                        </select>                                           
                                        <div v-if="errors.Fridge" class="invalid-feedback d-block">{{ errors.Fridge[0] }}</div>
                                    </div>
                                </div>

                                <div class="form-column">
                                    <div class="form-group form-group-2">
                                        <label for="ProductType">Product Type</label>
                                        <select class="browser-default custom-select" v-model="productCodeEdit.ProductType" name="ProductType">
                                            <option value="1" selected>Medicine</option>
                                            <option value="2">Test Kit</option>
                                        </select>                                           
                                        <div v-if="errors.ProductType" class="invalid-feedback d-block">{{ errors.ProductType[0] }}</div>
                                    </div>

                                    <div class="form-group form-group-2">
                                        <label for="OTC">Reclassification</label>
                                        <select class="browser-default custom-select" v-model="productCodeEdit.OTC" name="OTC">
                                            <option value="0" selected>POM</option>
                                            <option value="1">p</option>
                                        </select>                                           
                                        <div v-if="errors.OTC" class="invalid-feedback d-block">{{ errors.OTC[0] }}</div>
                                    </div>

                                    <div class="form-group form-group-2">
                                        <label for="Pack">Pack</label>
                                        <select class="browser-default custom-select" v-model="productCodeEdit.Pack" name="Pack">
                                            <option value="0" selected>No</option>
                                            <option value="1">Yes</option>
                                        </select>                                           
                                        <div v-if="errors.Pack" class="invalid-feedback d-block">{{ errors.Pack[0] }}</div>
                                    </div>

                                    <div class="form-group form-group-2">
                                        <label for="Status">Status</label>
                                        <select class="browser-default custom-select" v-model="productCodeEdit.Status" name="Status">
                                            <option value="1" selected>Active</option>
                                            <option value="0">Inactive</option>
                                            <option value="2">Discontinued</option>
                                        </select>                                           
                                        <div v-if="errors.Status" class="invalid-feedback d-block">{{ errors.Status[0] }}</div>
                                    </div>

                                    <div class="form-group form-group-2">
                                        <label for="VAT">VAT %</label>
                                        <select class="browser-default custom-select" v-model="productCodeEdit.VAT" name="VAT">
                                            <option value="" disabled>Please select VAT value</option>
                                            <option value="0" selected>0.00%</option>
                                            <option value="5">5.00%</option>
                                            <option value="20">20.00%</option>
                                        </select>                                           
                                        <div v-if="errors.VAT" class="invalid-feedback d-block">{{ errors.VAT[0] }}</div>
                                    </div>
                                
                                </div>
                            </div>    

                        </div>       
                    </div>
                </div>

                <!--Footer-->
                <div class="modal-footer">
                    <button v-if="editing" :disabled="saving" @click="save()" type="button" class="btn btnSize02 tertiaryBtn">
                        {{saveButtonText}}
                    </button>

                    <button v-if="!editing && productCodeId" :disabled="saving" @click="addPricing()" type="button" class="btn btnSize02 tertiaryBtn">
                        Add New Pricing
                    </button>

                    <button v-if="editing && productCodeId" :disabled="saving" @click="back()" type="button" class="btn btnSize02 tertiaryBtn">
                        Back
                    </button>
                    <button :disabled="saving" @click="clear()" type="button" class="btn btnSize02 tertiaryBtn">
                        Cancel
                    </button>
                </div>
            </div>
        <!--/.Content-->
        </div>
    </transition>
</template>

<script>
    import _ from 'lodash';
    import Print from '../../../mixins/print';

    export default {
        mixins: [ Print ],
        data: function () {
            return {
                userInfo: userInfo,
                productCodeId: false,
                productCode: {},
                productCodeEdit: {},
                pricingId: false,
                errors: [],
                options: [],
                list: [],
                clients: [],
                countries: [],
                editing: false,
                type: 'product',
                form: {
                    country: {
                        price: false,
                        country: false,
                    },
                    pricing: {
                        price: false,
                        client: 0,
                    },
                    product: {},
                },
                saving: false,
                callback: false,
                callbackData: false,
                buttonText: false,
                override: false,
                //special for pharmacist
                visible: false,
            }
        },
        computed: {
            saveButtonText(){
                if(this.buttonText){
                    return this.buttonText;
                }

                if(!this.productCodeId && this.editing){
                    return 'Add';
                }

                if(this.pricingId && this.editing){
                    return 'Update';
                }

                return 'Save Changes';
            },
            title(){
                if(this.editing && this.productCodeId){
                    return 'Edit Product';
                } else if (this.editing && !this.productCodeId){
                    return 'Create Product';
                }
                
                return 'Product List';
            },
        },
        mounted() {
            this.$root.$on('label.details', this.getProductDetails);
            this.$root.$on('label.add', this.addProduct);
            this.clear();
        },
        beforeDestroy(){
            this.$root.$off('product.details', this.getProductDetails);
            this.$root.$off('product.add');
            $('#productEditor').off('hidden.bs.modal');
        },
        watch: {
            productCodeId(){
                this.getPriceList();
                this.getProductCode();
            },
            type(newValue){
                if(newValue == 'country'){
                    this.getCountries();
                }
            }
        },
        methods: {
            getProductDetails(data){
                this.productCode = data;
                this.editing = false;
                this.type = 'product';
                this.productCodeId = this.productCode.ProductCodeID;

                this.show();
            },
            show(){
                if(this.options.length == 0){
                    this.getOptions();
                }
                this.visible = true;
            },
            getCountries(){
                axios.get('/countries')
                .then((response) => {
                    this.countries = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                })
            },
            getOptions(){
                axios.get('/inventory/products/list')
                .then((response) => {
                    this.options = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                })
            },
            getPriceList(){
                axios.get(`/inventory/products/${this.productCodeId}/list`)
                .then((response) => {
                    this.list = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                })                
            },

            getDeliveryCompanies(callback = false){
                axios.get(`/inventory/delivery/list`)
                .then((response) => {
                    this.deliveryCompanies = response.data.data;
                    if(callback){
                        callback();
                    }
                })
                .catch((error) => {
                    console.log(error);
                })                
            },

            getClients(callback = false){
                axios.get(`/inventory/clients/list`)
                .then((response) => {
                    this.clients = response.data.data;
                    if(callback){
                        callback();
                    }
                })
                .catch((error) => {
                    console.log(error);
                })                
            },

            getProductCode(){
                axios.get(`/inventory/products/${this.productCodeId}`)
                .then((response) => {
                    this.productCode = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                })
            },
            addProduct(){
                this.editing = true;
                this.type = 'product';
                this.productCodeId = false;

                this.show();
            },
            addCountry(){
                this.editing = true;
                this.type = 'country';
                this.productCodeId = false;

                this.show();
            },
            removePricing(id){
                this.$swal({
                    title: 'Are you sure you want to remove this pricing?',
                    text: "This cannot be reverted!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, remove it!'
                }).then((result) => {
                    if (result.value) {
                        axios.delete(`/inventory/products/pricing/${id}`)
                        .then((result) => {
                           this.$swal({
                                title: 'Pricing removed',
                                type: 'error',
                                showConfirmButton: true,
                            });

                            this.getPriceList();
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    }
                })
            },
            deleteProduct(){
                this.$swal({
                    title: 'Are you sure you want to deactivate this product?',
                    text: "This can be reverted",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, deactivate it!'
                }).then((result) => {
                    if (result.value) {
                        axios.delete(`/inventory/products/${this.productCodeId}/delete`)
                        .then((result) => {
                            this.$swal({
                                title: 'Product has been deactivated',
                                type: 'error',
                                showConfirmButton: true,
                            });
                            this.getProductCode();
                            this.$root.$emit('product.refresh');
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    }
                })
            },
            reactivateProduct(){
                this.$swal({
                    title: 'Are you sure you want to activate this product?',
                    text: "This can be reverted",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, deactivate it!'
                }).then((result) => {
                    if (result.value) {
                        axios.post(`/inventory/products/${this.productCodeId}/reactivate`)
                        .then((result) => {
                            this.$swal({
                                title: 'Product has been reactivated',
                                type: 'success',
                                showConfirmButton: true,
                            });
                            this.getProductCode();
                            this.$root.$emit('product.refresh');
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    }
                })                  
            },
            /**
             * Save form editing
             */
            save(){
                if(!this.productCodeId && this.type == 'country'){
                    axios.post(`/inventory/countries/pricing`, this.form.country)
                    .then((result) => {
                        this.$swal({
                            title: 'Default pricing for country added',
                            type: 'success',
                            showConfirmButton: true,
                        });
                        this.$root.$emit('product.refresh');
                        this.clear();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                //insert new pricing
                } else if (!this.pricingId && this.type == 'pricing' && this.editing){
                    let form = {
                        pricing: this.form.pricing,
                        productCode: this.productCode
                    };

                    axios.post(`/inventory/products/pricing`, form)
                    .then((result) => {
                        this.$swal({
                            title: 'Pricing for country added',
                            type: 'success',
                            showConfirmButton: true,
                        });
                        this.$root.$emit('product.refresh');
                        this.back();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                //update pricing
                } else if (this.pricingId && (this.type == 'country' || this.type == 'product')){
                    axios.patch(`/inventory/countries/pricing/${this.pricingId}`, this.form.country)
                    .then((result) => {
                        this.$swal({
                            title: 'Pricing updated',
                            type: 'success',
                            showConfirmButton: true,
                        });
                        // this.$root.$emit('product.refresh');
                        this.back();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                //update product code
                } else if (this.productCodeId && this.type == 'product'){
                    axios.patch(`/inventory/products/${this.productCodeId}`, this.productCodeEdit)
                    .then((result) => {
                        this.$swal({
                            title: 'Product updated',
                            type: 'success',
                            showConfirmButton: true,
                        });
                        this.$root.$emit('product.refresh');
                        this.getOptions();
                        this.back();
                    })
                    .catch((error) => {
                        this.errors = error.response.data.errors;
                    })
                //insert product code
                } else if (!this.productCodeId && this.type == 'product'){
                    axios.post(`/inventory/products`, this.productCodeEdit)
                    .then((result) => {
                        this.$swal({
                            title: 'Product added',
                            type: 'success',
                            showConfirmButton: true,
                        });
                        this.$root.$emit('product.refresh');
                        this.clear();
                    })
                    .catch((error) => {
                        this.errors = error.response.data.errors;
                    })                    
                    // console.log('Insert product');
                    // console.log(this.productCodeEdit);
                }
            },

            /**
             * Return to list screen 
            */
            back(){
                let productCodeId = JSON.parse(JSON.stringify(this.productCodeId));
                this.clear(false);
                this.productCodeId = productCodeId;
                this.getProductCode();
                this.getPriceList();                
                this.editing = false;
            },

            edit(value){
                this.editing = true;

                if(this.productCode.Type == 2){
                    this.type = 'country';
                } else {
                    this.type = 'product';
                }

                this.form.country.country = value.Code;
                this.form.country.price = value.UnformattedPrice;
                this.pricingId = value.PricingID;//this needs changing
            },

            editProduct(value = false){
                this.editing = true;
                this.type = 'product';
                this.productCodeEdit = JSON.parse(JSON.stringify(this.productCode));
            },

            addPricing(){
                if(this.clients.length == 0){
                    this.getClients(() => {
                        this.editing = true;
                        this.type = 'pricing';
                    });
                } else {
                    this.editing = true;
                    this.type = 'pricing';                    
                }
            },

            /**
             * Clean up after form operations
             */
            clear(hide = true){
                if(hide){
                    this.visible = false;
                }
                this.form = {
                    country: {
                        price: false,
                        country: false,
                    },
                    pricing: {
                        price: false,
                        client: false,
                    },
                    product: {},
                }
                this.editing = false;
                this.productCodeId = false;
                this.productCodeEdit = {};
                this.pricingId = false;
                this.errors = [];
            },

            checkFields(callback){
                if(this.override){
                    callback();
                    return;
                }

                if(this.selectedItem.FMDExpiryDate == '' || this.selectedItem.FMDExpiryDate == null || !/[\d]{2}\/[\d]{4}/.test(this.selectedItem.FMDExpiryDate)){
                    this.errors.FMDExpiryDate = true;
                } else {
                    this.errors.FMDExpiryDate = false;
                }

                this.errors.FMDBatchID = this.selectedItem.FMDBatchID == '' || this.selectedItem.FMDBatchID == null ? true : false;

                if(!this.errors.FMDExpiryDate && !this.errors.FMDBatchID){
                    callback();
                }
            },
            setOptions(options){
                if(!options){
                    this.callback = false;
                    this.callbackData = false;
                    this.buttonText = false;
                } else {
                    this.callback = options.callback ? options.callback : false;
                    this.callbackData = options.callbackData ? options.callbackData : false;
                    this.buttonText = options.text ? options.text : false;
                }
            }
        },
    }
</script>

