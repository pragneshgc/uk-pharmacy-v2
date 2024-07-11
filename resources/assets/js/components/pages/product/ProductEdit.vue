<template>
    <transition name="fade">
        <div v-if="visible" class="esa-modal" id="productEditor" tabindex="-1" role="dialog"
            aria-labelledby="itemEditorLabel" aria-modal="true">
            <div class="backdrop" @click="clear()">
            </div>

            <div id="product-modal" class="modal" role="document">
                <!--Header-->
                <div class="modal-header">
                    <h3 class="heading lead">
                        {{ title }}
                    </h3>
                    <span class="close" @click="clear()">X</span>
                </div>
                <div class="modal-header" v-if="productCodeId && !pricingId && !editing"
                    style="display: flex;justify-content: space-between;align-items: center;border: none;padding-bottom: 0;">
                    <select class="ml-10 browser-default custom-select" v-model="productCodeId" name="ProductCodeID"
                        style="font-weight:700;">
                        <option value="">SELECT</option>
                        <option v-for="option in optionsFiltered" :key="option.ProductCodeID"
                            :value="option.ProductCodeID">
                            <b>{{ option.Name }}<span v-if="type == 'product'"> - {{ option.Code }} - ({{
                                option.Quantity }})</span></b>
                        </option>
                    </select>

                    <div v-if="productCodeId && !pricingId && !editing" class="modal-header"
                        style="background: transparent; box-shadow: none;border-bottom: none; display: flex; align-items: center;">
                        <button @click="editProduct(productCode)" v-if="userInfo.role > 4"
                            class="btn btnSize02 secondaryBtn">
                            Update Product Code
                        </button>

                        <button v-if="productCode.Pack && userInfo.role > 4" title="Save product"
                            @click="addPackProduct()" class="ml-10 btn btnSize02 secondaryBtn">
                            ADD Product To Pack
                        </button>


                        <!-- <button v-if="productCode.Status == 1" @click="deleteProduct()" class="ml-10 btn btnSize02 tertiaryBtn">
                        DEACTIVATE ProductCode
                    </button>

                    <button v-else @click="reactivateProduct()" class="ml-10 btn btnSize02 tertiaryBtn">
                        ACTIVATE ProductCode
                    </button> -->
                    </div>

                </div>

                <!--Body-->
                <div class="modal-body text-center">
                    <div class="expand-100 d-flex justify-content-between">
                        <div class="row wow fadeIn" style="width: 100%;">
                            <!-- OVERVIEW -->
                            <div class="col-lg-12 wow fadeIn" v-if="productCodeId && !pricingId && !editing">
                                <h3
                                    style="text-align: center;margin-top: 15px;padding-bottom: 5px;border-bottom: 3px solid rgb(209 96 96);float:left;width: 100%;">
                                    Pricing</h3>
                                <table id="products-table" class="table table-hover" style="border-bottom: none;">
                                    <thead class="primary-color text-white">
                                        <th v-for="(value, key) in list[0]" :key="key"
                                            v-if="!['PackProductID', 'UnformattedPrice', 'PricingID', 'Status'].includes(key)">
                                            {{ key }}
                                        </th>
                                        <th v-if="list.length == 0">Code</th>
                                        <th v-if="list.length == 0">Description</th>
                                        <th v-if="list.length == 0">Quantity</th>
                                        <th v-if="list.length == 0">Unit</th>
                                        <th v-if="list.length == 0">ProductCode</th>
                                        <th v-if="list.length == 0">Print Instruction</th>
                                        <th v-if="productCode.Pack">Status</th>
                                        <th>Options</th>
                                    </thead>
                                    <!-- <tbody> -->
                                    <draggable :list="list" :disabled="!productCode.Pack" class="list-group"
                                        ghost-class="ghost" @start="dragging = true" @end="finishMove" tag="tbody">
                                        <tr v-for="(value) in list" :key="value.Code"
                                            :class="[productCode.Pack ? (value.Status ? 'enabled' : 'disabled') : '']">
                                            <td v-for="(v, k) in value" :key="k"
                                                v-if="!['PackProductID', 'UnformattedPrice', 'PricingID', 'Status'].includes(k)">
                                                {{ v }}
                                            </td>
                                            <td v-if="productCode.Pack">
                                                <input :class="{ 'unchecked': (!value.Status) }"
                                                    :checked="(value.Status)" type="checkbox" name="checkall">
                                                <label @click="changeStatus(value)" for="checkall"></label>
                                            </td>
                                            <td>
                                                <button v-if="!productCode.Pack && userInfo.role > 4"
                                                    @click="edit(value)" class="btn btn-primary table-icon">
                                                    <i class="fa fa-edit" style="color: white;"></i>
                                                </button>

                                                <button
                                                    v-if="!productCode.Pack && value.ClientID != 'DEFAULT' && userInfo.role > 4"
                                                    @click="removePricing(value)" class="btn btn-primary table-icon">
                                                    <i class="fa fa-trash" style="color: white;"></i>
                                                </button>

                                                <button v-if="productCode.Pack && userInfo.role > 4"
                                                    @click="removeProduct(value.PackProductID)"
                                                    class="btn btn-primary table-icon">
                                                    <i class="fa fa-trash" style="color: white;"></i>
                                                </button>
                                            </td>
                                            <!-- <td>{{ value.Status }}</td> -->
                                        </tr>
                                    </draggable>
                                    <tr v-if="addedProduct && productCode.Pack">
                                        <td>{{ addedProduct.Code }}</td>
                                        <!-- <td>{{addedProduct.Description}}</td> -->
                                        <td>
                                            <select class="ml-10 browser-default custom-select"
                                                v-model="addedProduct.Description" name="Description">
                                                <option value="">SELECT PRODUCT</option>
                                                <option v-for="option in optionsFiltered" :key="option.ProductCodeID"
                                                    :value="option.ProductCodeID">
                                                    {{ option.Name }} - {{ option.Code }} - ({{ option.Quantity }})
                                                </option>
                                            </select>
                                        </td>
                                        <td>
                                            <div class="form-group form-group-2"
                                                style="display: flex;justify-content: center;align-items: center;">
                                                <input name="Dosage" v-model="addedProduct.Dosage" autocomplete="off"
                                                    type="number" id="dosage" style="min-width: 50px;" min="1"
                                                    placeholder="Quantity" class="tBox tBoxSize02">
                                            </div>
                                        </td>
                                        <td>{{ addedProduct.Unit }} Autofilled</td>
                                        <td>{{ addedProduct.ProductCode }} Autofilled</td>
                                        <!-- <td>{{addedProduct.Instruction ? 'Yes' : 'No'}}</td> -->
                                        <td>
                                            <div class="form-group form-group-2">
                                                <select class="browser-default custom-select"
                                                    v-model="addedProduct.Instruction" name="Instruction">
                                                    <option value="1">Yes</option>
                                                    <option value="0">No</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td>
                                            <button v-if="productCode.Pack && addedProduct.Description != ''"
                                                @click="savePackProduct()" class="btn btn-primary table-icon">
                                                <i class="fa fa-save" style="color: white;"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <!-- </tbody> -->
                                </table>
                            </div>
                            <!-- COUNTRY ADD -->
                            <div class="pxp-form address-form" v-else-if="!productCodeId && type == 'country'">
                                <div class="form-column">
                                    <div class="form-group form-group-2">
                                        <label for="CountryID">Select Country</label>
                                        <select class="browser-default custom-select" v-model="form.country.country"
                                            name="CountryID">
                                            <option v-for="country in countries" :key="country.CountryID"
                                                :value="country.CountryID">{{ country.Name }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-column">
                                    <div class="form-group form-group-2">
                                        <label for="Price">Price</label>
                                        <input name="Price" v-model="form.country.price" autocomplete="off"
                                            type="number" id="value" placeholder="Default Price" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <!-- COUNTRY EDIT -->
                            <div class="pxp-form address-form" v-else-if="type == 'country' && editing">
                                <div class="form-row">
                                    <h3>Basic Information</h3>

                                    <div class="form-column">
                                        <div class="form-group form-group-2">
                                            <label for="Code">Code</label>
                                            <input name="Code" v-model="productCodeEdit.Code" autocomplete="off"
                                                type="number" id="value" placeholder="Code" class="form-control">
                                        </div>
                                        <small style="margin-top: -10px; margin-bottom: 10px; padding-right: 23px;"
                                            for="code">
                                            CAUTION : changing this will affect pricing
                                        </small>

                                        <div class="form-group form-group-2">
                                            <label for="Status">Status</label>
                                            <select class="browser-default custom-select"
                                                v-model="productCodeEdit.Status" name="Status">
                                                <option value="1" selected>Active</option>
                                                <option value="0">Inactive</option>
                                                <option value="2">Discontinued</option>
                                            </select>
                                            <div v-if="errors.Status" class="invalid-feedback d-block">{{
                                                errors.Status[0] }}</div>
                                        </div>
                                    </div>
                                    <div class="form-column">
                                        <div class="form-group form-group-2">
                                            <label for="VAT">VAT %</label>
                                            <select class="browser-default custom-select" v-model="productCodeEdit.VAT"
                                                name="VAT">
                                                <option value="" disabled>Please select VAT value</option>
                                                <option value="0" selected>0.00%</option>
                                                <option value="5">5.00%</option>
                                                <option value="20">20.00%</option>
                                            </select>
                                            <div v-if="errors.VAT" class="invalid-feedback d-block">{{ errors.VAT[0] }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- PRICING EDIT -->
                            <div class="pxp-form address-form" v-else-if="pricingId && editing">
                                <div class="form-column">
                                    <div class="form-group form-group-2">
                                        <label for="Price">Price</label>
                                        <input name="Price" v-model="form.country.price" autocomplete="off"
                                            type="number" id="value" placeholder="Price" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <!-- ADD PRICING COUNTRY -->
                            <div class="pxp-form address-form" v-else-if="type == 'pricing' && editing">
                                <div class="form-column">
                                    <div class="form-group form-group-2">
                                        <label for="ClientID">Client</label>
                                        <select class="browser-default custom-select" v-model="form.pricing.client"
                                            name="ClientID">
                                            <option :value="0">DEFAULT</option>
                                            <option v-for="company in clients" :key="company.ClientID"
                                                :value="company.ClientID">{{ company.CompanyName }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-column">
                                    <div class="form-group form-group-2">
                                        <label for="Price">Price</label>
                                        <input name="Price" v-model="form.pricing.price" autocomplete="off"
                                            type="number" id="value" placeholder="Price" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <!-- EDIT PRODUCT -->
                            <div class="pxp-form address-form" v-else-if="type == 'product' && editing">
                                <div class="form-row">
                                    <h3>Basic Information</h3>

                                    <div class="form-column">
                                        <div class="form-group form-group-2">
                                            <label for="code">Code</label>
                                            <input v-model="productCodeEdit.Code" type="text" id="code"
                                                class="form-control mb-3" placeholder="Code">
                                            <div v-if="errors.Code" class="invalid-feedback d-block">{{ errors.Code[0]
                                                }}</div>
                                        </div>
                                        <small style="margin-top: -10px; margin-bottom: 10px; padding-right: 23px;"
                                            for="code">
                                            CAUTION : changing this will affect pricing
                                        </small>

                                        <div class="form-group form-group-2">
                                            <label for="Quantity">Quantity</label>
                                            <input v-model="productCodeEdit.Quantity" type="text" id="Quantity"
                                                class="form-control mb-3" placeholder="Quantity">
                                            <div v-if="errors.Quantity" class="invalid-feedback d-block">{{
                                                errors.Quantity[0] }}</div>
                                        </div>
                                        <small style="margin-top: -10px; margin-bottom: 10px; padding-right: 23px;"
                                            for="code">CAUTION : changing this will affect pricing</small>
                                    </div>

                                    <div class="form-column">
                                        <div class="form-group form-group-2">
                                            <label for="name">Name</label>
                                            <input v-model="productCodeEdit.Name" type="text" id="name"
                                                class="form-control mb-3" placeholder="Name">
                                            <div v-if="errors.Name" class="invalid-feedback d-block">{{ errors.Name[0]
                                                }}</div>
                                        </div>

                                        <div class="form-group form-group-2">
                                            <label for="Units">Units</label>
                                            <input v-model="productCodeEdit.Units" type="text" id="Units"
                                                class="form-control mb-3" placeholder="Units">
                                            <div v-if="errors.Units" class="invalid-feedback d-block">{{ errors.Units[0]
                                                }}</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <h3>Pricing Information</h3>

                                    <div class="form-column">
                                        <div class="form-group form-group-2" v-if="!productCodeId">
                                            <label for="Price">Price</label>
                                            <input v-model="productCodePrice" type="text" id="Price"
                                                class="form-control mb-3" placeholder="Price">
                                            <div v-if="errors.Price" class="invalid-feedback d-block">{{ errors.Price[0]
                                                }}</div>
                                        </div>

                                        <div class="form-group form-group-2">
                                            <label for="VAT">VAT %</label>
                                            <select class="browser-default custom-select" v-model="productCodeEdit.VAT"
                                                name="VAT">
                                                <option value="" disabled>Please select VAT value</option>
                                                <option value="0" selected>0.00%</option>
                                                <option value="5">5.00%</option>
                                                <option value="20">20.00%</option>
                                            </select>
                                            <div v-if="errors.VAT" class="invalid-feedback d-block">{{ errors.VAT[0] }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-column">
                                        <div class="form-group form-group-2">
                                            <label for="TariffCode">Tariff Code</label>
                                            <input v-model="productCodeEdit.TariffCode" type="text" id="TariffCode"
                                                class="form-control mb-3" placeholder="Tariff Code">
                                            <div v-if="errors.TariffCode" class="invalid-feedback d-block">{{
                                                errors.TariffCode[0] }}</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <h3>Product Information</h3>

                                    <div class="form-column">
                                        <div class="form-group form-group-2">
                                            <label for="ProductType">Product Type</label>
                                            <select class="browser-default custom-select"
                                                v-model="productCodeEdit.ProductType" name="ProductType">
                                                <option value="1" selected>Medicine</option>
                                                <option value="2">Test Kit</option>
                                            </select>
                                            <div v-if="errors.ProductType" class="invalid-feedback d-block">{{
                                                errors.ProductType[0] }}</div>
                                        </div>

                                        <div class="form-group form-group-2">
                                            <label for="OTC">Reclassification</label>
                                            <select class="browser-default custom-select" v-model="productCodeEdit.OTC"
                                                name="OTC">
                                                <option value="0" selected>POM</option>
                                                <option value="1">P</option>
                                            </select>
                                            <div v-if="errors.OTC" class="invalid-feedback d-block">{{ errors.OTC[0] }}
                                            </div>
                                        </div>

                                        <div class="form-group form-group-2">
                                            <label for="Fridge">Fridge</label>
                                            <select class="browser-default custom-select"
                                                v-model="productCodeEdit.Fridge" name="Fridge">
                                                <option v-if="productCodeEdit.Units == 'SHIPPING'" :value="null">NOT
                                                    APPLICABLE</option>
                                                <option v-if="productCodeEdit.Units != 'SHIPPING'" value="0" selected>No
                                                </option>
                                                <option v-if="productCodeEdit.Units != 'SHIPPING'" value="1">Yes
                                                </option>
                                            </select>
                                            <div v-if="errors.Fridge" class="invalid-feedback d-block">{{
                                                errors.Fridge[0] }}</div>
                                        </div>

                                        <div class="form-group form-group-2">
                                            <label for="PrintForm">Print Pathology Form</label>
                                            <select class="browser-default custom-select"
                                                v-model="productCodeEdit.PrintForm" name="PrintForm">
                                                <option value="1">Yes</option>
                                                <option value="0" selected>No</option>
                                            </select>
                                            <div v-if="errors.PrintForm" class="invalid-feedback d-block">{{
                                                errors.PrintForm[0] }}</div>
                                        </div>
                                    </div>
                                    <div class="form-column">
                                        <div class="form-group form-group-2">
                                            <label for="Pack">Package Product</label>
                                            <select class="browser-default custom-select" v-model="productCodeEdit.Pack"
                                                name="Pack">
                                                <option value="0" selected>No</option>
                                                <option value="1">Yes</option>
                                            </select>
                                            <div v-if="errors.Pack" class="invalid-feedback d-block">{{ errors.Pack[0]
                                                }}</div>
                                        </div>

                                        <small style="margin-top: -10px; margin-bottom: 10px; padding-right: 23px;"
                                            for="code">
                                            Is this a package treatment i.e. contains multiple products
                                        </small>

                                        <div class="form-group form-group-2">
                                            <label for="Status">Status</label>
                                            <select class="browser-default custom-select"
                                                v-model="productCodeEdit.Status" name="Status">
                                                <option value="1" selected>Active</option>
                                                <option value="0">Inactive</option>
                                                <option value="2">Discontinued</option>
                                            </select>
                                            <div v-if="errors.Status" class="invalid-feedback d-block">{{
                                                errors.Status[0] }}</div>
                                        </div>

                                        <div class="form-group form-group-2">
                                            <label for="Status">Pouchable</label>
                                            <select class="browser-default custom-select" v-model="productCodeEdit.JVM"
                                                name="Pouchable">
                                                <option value="1">Pouchable (Always)</option>
                                                <option value="0">Pouchable (Manual)</option>
                                                <option value="2">Pouchable (Disabled)</option>
                                            </select>
                                            <div v-if="errors.JVM" class="invalid-feedback d-block">{{ errors.JVM[0] }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <!-- ALTERNATIVE NAMES -->
                                <div class="col-lg-12 wow fadeIn"
                                    v-if="productCodeId && !pricingId && !editing && alternativeNames.length > 0">
                                    <h3
                                        style="text-align: center;margin-top: 30px;padding-bottom: 5px;border-bottom: 3px solid #b097ff;float:left;width: 100%;">
                                        Alternative Names/Aliases</h3>
                                    <table class="table table-hover" style="border-bottom: none;">
                                        <thead class="primary-color text-white">
                                            <th>Alternative Name</th>
                                            <th>Client</th>
                                            <th>Added By</th>
                                            <th>Added At</th>
                                            <th>Tools</th>
                                        </thead>
                                        <tbody>
                                            <tr v-for="name in alternativeNames" :key="name.ProductNameAlternativeID">
                                                <td>{{ name.AlternativeName }}</td>
                                                <td>{{ name.CompanyName }}</td>
                                                <td>{{ name.Name }} {{ name.Surname }}</td>
                                                <td>{{ name.CreatedAt }}</td>
                                                <td>
                                                    <button
                                                        @click="removeAlternativeName(name.ProductNameAlternativeID)"
                                                        v-if="userInfo.role > 4" title="Remove alternative product name"
                                                        class="btn btn-primary table-icon">
                                                        <i class="fa fa-trash" style="color: white;"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- ALTERNATIVE UNITS -->
                                <div class="col-lg-12 wow fadeIn"
                                    v-if="productCodeId && !pricingId && !editing && alternativeUnits.length > 0">
                                    <h3
                                        style="text-align: center;margin-top: 30px;padding-bottom: 5px;border-bottom: 3px solid #b097ff;float:left;width: 100%;">
                                        Alternative Units/Aliases</h3>
                                    <table class="table table-hover" style="border-bottom: none;">
                                        <thead class="primary-color text-white">
                                            <th>Alternative Unit</th>
                                            <th>Client</th>
                                            <th>Added By</th>
                                            <th>Added At</th>
                                            <th>Tools</th>
                                        </thead>
                                        <tbody>
                                            <tr v-for="name in alternativeUnits" :key="name.UnitAlternativeID">
                                                <td>{{ name.AlternativeUnit }}</td>
                                                <td>{{ name.CompanyName }}</td>
                                                <td>{{ name.Name }} {{ name.Surname }}</td>
                                                <td>{{ name.CreatedAt }}</td>
                                                <td>
                                                    <button @click="removeAlternativeUnit(name.UnitAlternativeID)"
                                                        v-if="userInfo.role > 4" title="Remove alternative product unit"
                                                        class="btn btn-primary table-icon">
                                                        <i class="fa fa-trash" style="color: white;"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- PRODUCT LOGS -->
                                <div class="col-lg-12 wow fadeIn"
                                    v-if="productCodeId && !pricingId && !editing && logs.length > 0">
                                    <h3
                                        style="text-align: center;margin-top: 30px;padding-bottom: 5px;border-bottom: 3px solid #77c187;float:left;width: 100%;">
                                        Product Logs</h3>
                                    <table class="table table-hover" style="border-bottom: none;">
                                        <thead class="primary-color text-white">
                                            <th>Action</th>
                                            <th>User</th>
                                            <th>Date</th>
                                        </thead>
                                        <tbody>
                                            <tr v-for="log in logs" :key="log.SystemActivityID">
                                                <td>{{ log.Action }}</td>
                                                <td>{{ log.Name }}</td>
                                                <td>{{ log.CreatedAt }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <!-- PACK PRODUCTS -->
                                <div class="col-lg-12 wow fadeIn" v-if="packs.length > 0 && !pricingId && !editing">
                                    <h3
                                        style="text-align: center;margin-top: 30px;padding-bottom: 5px;border-bottom: 3px solid #77c187;float:left;width: 100%;">
                                        This product is part of the following packaged products</h3>
                                    <table class="table table-hover" style="border-bottom: none;">
                                        <thead class="primary-color text-white">
                                            <th>Code</th>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Link</th>
                                        </thead>
                                        <tbody>
                                            <tr v-for="pack in packs" :key="pack.ProductCodeID">
                                                <td>{{ pack.Code }}</td>
                                                <td>{{ pack.Name }}</td>
                                                <td> {{ pack.Status == 1 ? 'Active' : 'Inactive' }} </td>
                                                <td><a target="_blank"
                                                        :href="`/#/products?code=${pack.ProductCodeID}`">View (New
                                                        Tab)</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--Footer-->
                <div class="modal-footer">
                    <button v-if="
                        editing &&
                        ((type == 'product' && !isEqual(productCode, productCodeEdit)) ||
                            (type == 'country' && !isEqual(form.country, form.bufferCountry))
                            || type == 'pricing'
                        )" :disabled="saving" @click="save()" type="button" class="btn btnSize02 tertiaryBtn">
                        {{ saveButtonText }}
                    </button>

                    <button v-if="!editing && productCodeId && !productCode.Pack && userInfo.role > 4"
                        :disabled="saving" @click="addPricing()" type="button" class="btn btnSize02 secondaryBtn">
                        Add New Pricing
                    </button>

                    <!-- <button v-if="!editing && productCodeId && !productCode.Pack" :disabled="saving" @click="addProduct()" type="button" class="btn btnSize02 secondaryBtn">
                        Add New Product
                    </button> -->

                    <button v-if="editing && productCodeId && userInfo.role > 4" :disabled="saving"
                        @click="back(productCode.Type)" type="button" class="btn btnSize02 secondaryBtn">
                        Back
                    </button>
                    <button :disabled="saving" @click="clear()" type="button" class="btn btnSize02 secondaryBtn">
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
import logging from '../../../mixins/logging';
import draggable from "vuedraggable";

export default {
    mixins: [Print, logging],
    components: { draggable },
    data: function () {
        return {
            enabled: true,
            dragging: false,
            userInfo: userInfo,
            productCodeId: false,
            productCode: {},
            productCodeEdit: {},
            productCodePrice: 0,
            pricingId: false,
            errors: [],
            options: [],
            list: [],
            alternativeNames: [],
            alternativeUnits: [],
            logs: [],
            clients: [],
            countries: [],
            packs: [],
            addedProduct: false,
            editing: false,
            type: 'product',
            form: {
                country: {
                    price: false,
                    country: false,
                },
                bufferCountry: {},
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
        saveButtonText() {
            if (this.buttonText) {
                return this.buttonText;
            }

            if (!this.productCodeId && this.editing) {
                return 'Add';
            }

            if (this.pricingId && this.editing) {
                return 'Update';
            }

            return 'Save Changes';
        },
        title() {
            if (this.editing && this.productCodeId) {
                return 'Edit Product';
            } else if (this.editing && !this.productCodeId) {
                return 'Create Product';
            }

            return 'Product List';
        },
        optionsFiltered() {
            let options = [];

            if (this.type == 'country') {
                options = this.options.filter((item) => {
                    return item.Type == 2;
                });
            } else if (this.type == 'product') {
                options = this.options.filter((item) => {
                    return item.Type == 1;
                });
            }

            return options;
        }
    },
    mounted() {
        this.emitter.on('product.details', this.getProductDetails);
        this.emitter.on('product.add', this.addProduct);
        this.emitter.on('country.details', this.getCountryDetails);
        this.emitter.on('country.add', this.addCountry);
        this.clear();
    },
    beforeDestroy() {
        this.emitter.off('product.details', this.getProductDetails);
        this.emitter.off('product.add');
        this.emitter.off('country.details', this.getCountryDetails);
        this.emitter.off('country.add');
        $('#productEditor').off('hidden.bs.modal');
    },
    watch: {
        productCodeId() {
            this.getPriceList();
            this.getProductCode();
            this.getAlternativeNamesList();
            this.getAlternativeUnitsList();
            this.getLogs();
        },
        type(newValue) {
            if (newValue == 'country') {
                this.getCountries();
            }
        },
        productCode() {
            if (typeof this.productCode.Type != 'undefined' && this.productCode.Type == 2) {
                this.type = 'country';
            }
        },
    },
    methods: {
        getProductDetails(data) {
            this.productCode = data;
            this.editing = false;
            this.type = 'product';
            this.productCodeId = this.productCode.ProductCodeID;
            this.getPacks();

            this.show();
        },
        getCountryDetails(data) {
            this.productCode = data;
            this.editing = false;
            this.type = 'country';
            this.productCodeId = this.productCode.ProductCodeID;

            this.show();
        },
        show() {
            if (this.options.length == 0) {
                this.getOptions();
            }
            this.visible = true;
        },
        getCountries() {
            axios.get('/countries')
                .then((response) => {
                    this.countries = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        getOptions() {
            axios.get('/inventory/products/list')
                .then((response) => {
                    this.options = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        getPriceList() {
            axios.get(`/inventory/products/${this.productCodeId}/list`)
                .then((response) => {
                    this.list = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        getAlternativeNamesList() {
            axios.get(`/inventory/products/${this.productCodeId}/alternative-names`)
                .then((response) => {
                    this.alternativeNames = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        getAlternativeUnitsList() {
            axios.get(`/inventory/products/${this.productCodeId}/alternative-units`)
                .then((response) => {
                    this.alternativeUnits = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        getLogs() {
            axios.get(`/inventory/products/${this.productCodeId}/logs`)
                .then((response) => {
                    this.logs = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        getDeliveryCompanies(callback = false) {
            axios.get(`/inventory/delivery/list`)
                .then((response) => {
                    this.deliveryCompanies = response.data.data;
                    if (callback) {
                        callback();
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        getClients(callback = false) {
            axios.get(`/inventory/clients/list`)
                .then((response) => {
                    this.clients = response.data.data;
                    if (callback) {
                        callback();
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        getProductCode() {
            axios.get(`/inventory/products/${this.productCodeId}`)
                .then((response) => {
                    this.productCode = response.data.data;
                    this.getPacks();
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        getPacks() {
            axios.post(`/inventory/products/packs`, { code: this.productCode.Code })
                .then((response) => {
                    this.packs = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        addProduct() {
            this.editing = true;
            this.type = 'product';
            this.productCodeId = false;
            this.form.bufferCountry = JSON.parse(JSON.stringify(this.form.country));

            this.show();
        },
        addCountry() {
            this.editing = true;
            this.type = 'country';
            this.productCodeId = false;

            this.show();
        },
        removePricing(value) {
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
                    axios.delete(`/inventory/products/pricing/${value.PricingID}`)
                        .then((result) => {
                            this.$swal({
                                title: 'Pricing removed',
                                type: 'error',
                                showConfirmButton: true,
                            });

                            this.logSystemActivity(this.productCode.ProductCodeID, 5, 800, value, () => {
                                this.getPriceList();
                                this.getLogs();
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
            })
        },
        addPackProduct() {
            this.addedProduct = {
                Code: this.productCode.Code,
                Description: '',
                Quantity: 1,
                Dosage: 1,
                Unit: '',
                ProductCode: '',
                Instruction: 0,
            };
        },
        savePackProduct() {
            axios.post(`/inventory/products/pack`, this.addedProduct)
                .then((response) => {

                    this.logSystemActivity(this.productCodeId, 5, 808, this.addedProduct, () => {
                        this.getPriceList();
                        this.getLogs();
                    });

                    this.addedProduct = false;

                    this.$swal({
                        title: 'Product Added',
                        type: 'success',
                        showConfirmButton: true,
                    });
                })
                .catch((error) => {
                    this.$swal({
                        title: 'Could not add product',
                        type: 'error',
                        showConfirmButton: true,
                    });
                })
        },
        removeProduct(id) {
            this.$swal({
                title: 'Are you sure you want to remove this product?',
                text: "This cannot be reverted!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, remove it!'
            }).then((result) => {
                if (result.value) {
                    axios.delete(`/inventory/products/pack/${id}`)
                        .then((result) => {
                            this.$swal({
                                title: 'Product removed',
                                type: 'error',
                                showConfirmButton: true,
                            });

                            this.logSystemActivity(this.productCodeId, 5, 809, this.productCode, () => {
                                this.getPriceList();
                                this.getLogs();
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
            })
        },
        removeAlternativeName(id) {
            this.$swal({
                title: 'Are you sure you want to delete this alternative name?',
                text: "Deleting this alternative name will cause future orders received under this name to be highlighted as a mismatch!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, remove it!'
            }).then((result) => {
                if (result.value) {
                    axios.delete(`/inventory/products/alternative-names/${id}`)
                        .then((result) => {
                            this.$swal({
                                title: 'Alternative name removed',
                                type: 'error',
                                showConfirmButton: true,
                            });

                            this.getAlternativeNamesList();
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
            })
        },
        removeAlternativeUnit(id) {
            this.$swal({
                title: 'Are you sure you want to delete this alternative unit?',
                text: "Deleting this alternative unit will cause future orders received under this unit to be highlighted as a mismatch!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, remove it!'
            }).then((result) => {
                if (result.value) {
                    axios.delete(`/inventory/products/alternative-units/${id}`)
                        .then((result) => {
                            this.$swal({
                                title: 'Alternative unit removed',
                                type: 'error',
                                showConfirmButton: true,
                            });

                            this.getAlternativeUnitsList();
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
            })
        },
        deleteProduct() {
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
                            this.logSystemActivity(this.productCodeId, 5, 801, this.productCode);
                            this.getProductCode();
                            this.emitter.emit('product.refresh');
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
            })
        },
        reactivateProduct() {
            this.$swal({
                title: 'Are you sure you want to activate this product?',
                text: "This can be reverted",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, activate it!'
            }).then((result) => {
                if (result.value) {
                    axios.post(`/inventory/products/${this.productCodeId}/reactivate`)
                        .then((result) => {
                            this.$swal({
                                title: 'Product has been reactivated',
                                type: 'success',
                                showConfirmButton: true,
                            });
                            this.logSystemActivity(this.productCodeId, 5, 802, this.productCode);
                            this.getProductCode();
                            this.emitter.emit('product.refresh');
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
        save() {
            if (!this.productCodeId && this.type == 'country') {
                axios.post(`/inventory/countries/pricing`, this.form.country)
                    .then((result) => {
                        this.$swal({
                            title: 'Default pricing for country added',
                            type: 'success',
                            showConfirmButton: true,
                        });
                        this.logSystemActivity(result.data.data, 5, 803, this.form.country);
                        this.emitter.emit('product.refresh');
                        this.clear();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                //insert new pricing
            } else if (!this.pricingId && this.type == 'pricing' && this.editing) {
                let form = {
                    pricing: this.form.pricing,
                    productCode: this.productCode
                };

                axios.post(`/inventory/products/pricing`, form)
                    .then((result) => {
                        this.$swal({
                            title: 'Pricing added',
                            type: 'success',
                            showConfirmButton: true,
                        });
                        this.logSystemActivity(this.productCode.ProductCodeID, 5, 804, form);
                        this.emitter.emit('product.refresh');
                        this.back();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                //update pricing
            } else if (this.pricingId && (this.type == 'country' || this.type == 'product')) {
                axios.patch(`/inventory/countries/pricing/${this.pricingId}`, this.form.country)
                    .then((result) => {
                        this.$swal({
                            title: 'Pricing updated',
                            type: 'success',
                            showConfirmButton: true,
                        });

                        let log = JSON.parse(JSON.stringify(this.form.country));
                        log.pricingId = this.pricingId;

                        this.logSystemActivity(this.productCode.ProductCodeID, 5, 806, log);
                        // this.emitter.emit('product.refresh');
                        this.back();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                //update product code
            } else if (this.productCodeId && this.type == 'product') {
                axios.patch(`/inventory/products/${this.productCodeId}`, this.productCodeEdit)
                    .then((result) => {
                        this.$swal({
                            title: 'Product updated',
                            type: 'success',
                            showConfirmButton: true,
                        });
                        this.emitter.emit('product.refresh');
                        this.logSystemActivity(this.productCodeId, 5, 807, this.productCodeEdit);

                        this.getOptions();
                        this.back();
                    })
                    .catch((error) => {
                        this.errors = error.response.data.errors;
                    })
                //update product code
            } else if (this.productCodeId && this.type == 'country') {
                axios.patch(`/inventory/products/${this.productCodeId}`, this.productCodeEdit)
                    .then((result) => {
                        this.$swal({
                            title: 'Country updated',
                            type: 'success',
                            showConfirmButton: true,
                        });
                        this.emitter.emit('product.refresh');
                        this.logSystemActivity(this.productCodeId, 5, 810, this.productCodeEdit);

                        this.back(2);
                    })
                    .catch((error) => {
                        this.errors = error.response.data.errors;
                    })
                //insert product code
            } else if (!this.productCodeId && this.type == 'product') {
                this.productCodeEdit.Price = this.productCodePrice;

                axios.post(`/inventory/products`, this.productCodeEdit)
                    .then((result) => {
                        this.$swal({
                            title: 'Product added',
                            type: 'success',
                            showConfirmButton: true,
                        });
                        this.logSystemActivity(result.data.data, 5, 805, this.productCodeEdit);
                        this.emitter.emit('product.refresh');
                        this.clear();
                        this.getOptions();
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
        back(type = false) {
            let productCodeId = JSON.parse(JSON.stringify(this.productCodeId));
            this.clear(false);
            this.productCodeId = productCodeId;
            this.getProductCode();
            this.getPriceList();
            this.getLogs();
            this.editing = false;

            if (type == 2) {
                this.type = 'country';
            } else {
                this.type = 'product';
            }
        },
        edit(value) {
            this.editing = true;

            if (this.productCode.Type == 2) {
                this.type = 'country';
                this.getCountries();
            } else {
                this.type = 'product';
            }

            this.form.country.country = value.Code;
            this.form.country.price = value.UnformattedPrice;
            this.pricingId = value.PricingID;//this needs changing
        },
        editProduct(value = false) {
            this.editing = true;
            // this.type = 'product';
            this.productCodeEdit = JSON.parse(JSON.stringify(this.productCode));
        },
        addPricing() {
            if (this.clients.length == 0) {
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
        clear(hide = true) {
            if (hide) {
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
            this.addedProduct = false;
            this.productCodeEdit = {};
            this.productCodePrice = 0;
            this.pricingId = false;
            this.errors = [];
        },
        checkFields(callback) {
            if (this.override) {
                callback();
                return;
            }

            if (this.selectedItem.FMDExpiryDate == '' || this.selectedItem.FMDExpiryDate == null || !/[\d]{2}\/[\d]{4}/.test(this.selectedItem.FMDExpiryDate)) {
                this.errors.FMDExpiryDate = true;
            } else {
                this.errors.FMDExpiryDate = false;
            }

            this.errors.FMDBatchID = this.selectedItem.FMDBatchID == '' || this.selectedItem.FMDBatchID == null ? true : false;

            if (!this.errors.FMDExpiryDate && !this.errors.FMDBatchID) {
                callback();
            }
        },
        setOptions(options) {
            if (!options) {
                this.callback = false;
                this.callbackData = false;
                this.buttonText = false;
            } else {
                this.callback = options.callback ? options.callback : false;
                this.callbackData = options.callbackData ? options.callbackData : false;
                this.buttonText = options.text ? options.text : false;
            }
        },
        changeStatus(value) {
            axios.post(`/inventory/products/pack/${value.PackProductID}/change-status`)
                .then((result) => {
                    this.logSystemActivity(this.productCodeId, 5, 807, this.productCode);
                    this.getPriceList();
                    this.getLogs();
                })
                .catch((error) => {
                    this.errors = error.response.data.errors;
                })
        },
        finishMove(e) {
            this.dragging = false;
            axios.post(`/inventory/products/pack/ordering`, { list: this.list })
                .then((response) => {
                    this.$toasted.show('Pack ordering updated',
                        {
                            iconPack: 'fontawesome',
                            type: 'success',
                            icon: 'check',
                            duration: 2000,
                            position: "top-right",
                            action: {
                                text: 'Dismiss',
                                onClick: (e, toastObject) => {
                                    toastObject.goAway(0);
                                }
                            },
                        }
                    )
                })
        },
        isEqual: _.isEqual,
    },
}
</script>
