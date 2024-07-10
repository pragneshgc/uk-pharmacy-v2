<template>
    <div class="modal fade show" id="addProduct" tabindex="-1" role="dialog" 
    aria-labelledby="itemEditorLabel" aria-modal="true" >
        <div class="modal-dialog modal-xl modal-notify modal-info modal-dialog-centered" role="document">
        <!--Content-->
            <div class="modal-content">
                <!--Header-->
                <div class="modal-header">
                    <p class="heading lead">
                        Add a new product using the scanned barcode
                    </p>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="white-text">×</span>
                    </button>
                </div>

                <!--Body-->
                <div class="modal-body text-center">
                    <div class="d-flex justify-content-between">
                        <div class="row wow fadeIn" style="width: 100%;">
                            <!-- EDIT PRODUCT -->
                            <div class="col-lg-12 wow fadeIn">
                                <div class="row mb-3">
                                    <div class="col-lg-6">
                                        <label for="code">Code</label>
                                        <input disabled v-model="productCodeEdit.Code" type="text" id="code" class="form-control mb-3" placeholder="Code">
                                        <label for="code">CAUTION : changing this will affect pricing</label>
                                        <div v-if="errors.Code" class="invalid-feedback d-block">{{ errors.Code[0] }}</div>
                                    </div>

                                    <div class="col-lg-6">
                                        <label for="name">Name</label>
                                        <input v-model="productCodeEdit.Name" type="text" id="name" class="form-control mb-3" placeholder="Name">
                                        <div v-if="errors.Name" class="invalid-feedback d-block">{{ errors.Name[0] }}</div>
                                    </div>

                                    <div class="col-lg-6">
                                        <label for="Quantity">Quantity</label>
                                        <input v-model="productCodeEdit.Quantity" type="text" id="Quantity" class="form-control mb-3" placeholder="Quantity">
                                        <label for="Quantity">CAUTION : changing this will affect pricing</label>
                                        <div v-if="errors.Quantity" class="invalid-feedback d-block">{{ errors.Quantity[0] }}</div>
                                    </div>

                                    <div class="col-lg-6">
                                        <label for="Units">Units</label>
                                        <input v-model="productCodeEdit.Units" type="text" id="Units" class="form-control mb-3" placeholder="Units">
                                        <div v-if="errors.Units" class="invalid-feedback d-block">{{ errors.Units[0] }}</div>
                                    </div>

                                    <div class="col-lg-6">
                                        <label for="TariffCode">Tariff Code</label>
                                        <input v-model="productCodeEdit.TariffCode" type="text" id="TariffCode" class="form-control mb-3" placeholder="Tariff Code">
                                        <div v-if="errors.TariffCode" class="invalid-feedback d-block">{{ errors.TariffCode[0] }}</div>
                                    </div>

                                    <div class="col-lg-6">
                                        <label for="Fridge">Fridge</label>
                                        <select class="browser-default custom-select" v-model="productCodeEdit.Fridge" name="Fridge">
                                            <option v-if="productCodeEdit.Units == 'SHIPPING'" :value="null">NOT APPLICABLE</option>
                                            <option v-if="productCodeEdit.Units != 'SHIPPING'" value="0" selected>No</option>
                                            <option v-if="productCodeEdit.Units != 'SHIPPING'" value="1">Yes</option>
                                        </select>                                           
                                        <div v-if="errors.Fridge" class="invalid-feedback d-block">{{ errors.Fridge[0] }}</div>
                                    </div>

                                    <div class="col-lg-6">
                                        <label for="PrintForm">Print Pathology Form</label>
                                        <select class="browser-default custom-select" v-model="productCodeEdit.PrintForm" name="PrintForm">
                                            <option value="1" selected>Yes</option>
                                            <option value="0">No</option>
                                        </select>                                           
                                        <div v-if="errors.PrintForm" class="invalid-feedback d-block">{{ errors.PrintForm[0] }}</div>
                                    </div>

                                    <div class="col-lg-6">
                                        <label for="ProductType">Product Type</label>
                                        <select class="browser-default custom-select" v-model="productCodeEdit.ProductType" name="ProductType">
                                            <option value="1" selected>Medicine</option>
                                            <option value="2">Test Kit</option>
                                        </select>                                           
                                        <div v-if="errors.ProductType" class="invalid-feedback d-block">{{ errors.ProductType[0] }}</div>
                                    </div>

                                    <div class="col-lg-6">
                                        <label for="OTC">Reclassification</label>
                                        <select class="browser-default custom-select" v-model="productCodeEdit.OTC" name="OTC">
                                            <option value="0" selected>POM</option>
                                            <option value="1">p</option>
                                        </select>                                           
                                        <div v-if="errors.OTC" class="invalid-feedback d-block">{{ errors.OTC[0] }}</div>
                                    </div>

                                    <div class="col-lg-6">
                                        <label for="Pack">Pack</label>
                                        <select class="browser-default custom-select" v-model="productCodeEdit.Pack" name="Pack">
                                            <option value="0" selected>No</option>
                                            <option value="1">Yes</option>
                                        </select>                                           
                                        <div v-if="errors.Pack" class="invalid-feedback d-block">{{ errors.Pack[0] }}</div>
                                    </div>

                                    <div class="col-lg-6">
                                        <label for="Status">Status</label>
                                        <select class="browser-default custom-select" v-model="productCodeEdit.Status" name="Status">
                                            <option value="1" selected>Active</option>
                                            <option value="0">Inactive</option>
                                            <option value="2">Discontinued</option>
                                        </select>                                           
                                        <div v-if="errors.Status" class="invalid-feedback d-block">{{ errors.Status[0] }}</div>
                                    </div>
                                    
                                    <div class="form-group form-group-2">
                                        <label for="Status">Pouchable</label>
                                        <select class="browser-default custom-select" v-model="productCodeEdit.JVM" name="Pouchable">
                                            <option value="1">Pouchable (Always)</option>
                                            <option value="0">Pouchable (Manual)</option>
                                            <option value="2">Pouchable (Disabled)</option>
                                        </select>                                           
                                        <div v-if="errors.JVM" class="invalid-feedback d-block">{{ errors.JVM[0] }}</div>
                                    </div>

                                    <div class="col-lg-6">
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
                    <button :disabled="saving" @click="save()" type="button" class="btn btn-primary waves-effect waves-light">
                        Save
                    </button>

                    <button :disabled="saving" @click="clear()" type="button" class="btn btn-danger waves-effect waves-light">
                        Cancel
                    </button>
                </div>
            </div>
        <!--/.Content-->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            productCodeEdit: {
                Code: false,
                Name: false,
                Quantity: false,
                Units: false,
                TariffCode: false,
                Fridge: false,
                ProductType: false,
                OTC: false,
                Pack: false,
                Status: false,
                VAT: false,
                FDBID: false,
            },
            errors: [],
            saving: false,
        }
    },
    mounted() {
        this.$root.$on('product.add', this.populate);
        $('#addProduct').on('hidden.bs.modal', (e) => {
            this.clear();
        })
    },
    beforeDestroy() {
        this.$root.$off('product.add');
        $('#addProduct').off('hidden.bs.modal');
    },
    methods: {
        populate(data){
            let newData = this.findPack(data);

            this.productCodeEdit.FDBID = newData.id;
            this.productCodeEdit.Code = 'FDB'+newData.product.Product.SingleId+'/'+newData.pack.PackSize;
            this.productCodeEdit.Name = newData.pack.PrimaryPreferredName;
            this.productCodeEdit.Quantity = newData.pack.PackSize;
            this.productCodeEdit.Units = newData.pack.PackUnit;
            this.productCodeEdit.TariffCode = 0;
            this.productCodeEdit.Fridge = newData.product.Product.KnownFridgeLine ? 1 : 0;
            this.productCodeEdit.ProductType = 1;
            this.productCodeEdit.OTC = 0;
            this.productCodeEdit.Pack = 0;
            this.productCodeEdit.Status = 1;
            this.productCodeEdit.VAT = 20;

            this.show();
        },
        show(){
            $('#addProduct').modal('show');
        },
        findPack(data){
            let response = false;

            data.product.forEach(product => {
                product.DispensablePacks.forEach(pack => {
                    if(parseInt(data.gtin) == parseInt(pack.EANCode)){
                        response = {pack: pack, product:product, id: product._id.$oid};
                    }
                });
            });

            return response;
        },
        /**
         * Save form editing
         */
        save(){
            axios.post(`/inventory/products/fdb`, this.productCodeEdit)
            .then((result) => {
                this.$swal({
                    title: 'Product added',
                    type: 'success',
                    showConfirmButton: true,
                });
                this.clear();
            })
            .catch((error) => {
                this.errors = error.response.data.errors;
            })                    
        },      
        clear(){
            $('#addProduct').modal('hide');
            this.productCodeEdit = {
                Code: false,
                Name: false,
                Quantity: false,
                Units: false,
                TariffCode: false,
                Fridge: false,
                ProductType: false,
                OTC: false,
                Pack: false,
                Status: false,
                VAT: false,
            };
            this.errors = [];
        },
    },
}
</script>