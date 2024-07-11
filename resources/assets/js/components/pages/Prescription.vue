<template>
    <div>
        <div class="infoHeader" :class="headerClass">
            <div class="floatLeft" style="min-width: 402px;">
                <ul>
                    <li title="Double click to copy ESA Order ID to clipboard" class="clickable clipboard-copy"
                        @dblclick="copyToClipboard(prescription.PrescriptionID)" style="min-width: 120px;">
                        <span>ESA Order ID:</span>{{ prescription.PrescriptionID || 'Loading' }}
                    </li>
                    <li title="Double click to copy Client Reference Number to clipboard"
                        class="clickable clipboard-copy" @dblclick="copyToClipboard(prescription.ReferenceNumber)"
                        style="min-width: 120px;">
                        <span>Client Reference Number:</span>{{ prescription.ReferenceNumber || 'Loading' }}
                    </li>
                </ul>
            </div>
            <div class="floatCenter" style="min-width: 394px;">
                <ul>
                    <li style="padding-right: 0;">
                        <span style="padding-right: 0;">ORDER STATUS: </span>
                    </li>
                    <li style="border-left: none; display: flex; align-items: center;">
                        <treeselect class="vue-treeselect-compact" :disabled="!fullyLoaded" :open-on-click="true"
                            :clearable="false" :open-on-focus="true" :open-on-hover="true" :searchable="false"
                            :disable-branch-nodes="true" placeholder="Loading..." :show-count="true"
                            :default-expand-level="1" :options="restrictedStatus" :scrollPositionOnCenter="true"
                            :append-to-body="false" v-model="prescriptionStatus">
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

                        <transition name="fade">
                            <button title="Update prescription status to the selected option"
                                class="btn btnSize04 primaryBtn" v-if="fullyLoaded &&
                                    (
                                        (prescriptionStatus != prescription.Status && prescription.SubStatus == null) ||
                                        (prescriptionStatus != prescription.SubStatus && prescription.SubStatus != null)
                                    )" @click="updateStatusPopup()">
                                Update
                            </button>
                        </transition>
                    </li>
                </ul>
            </div>
            <div class="floatRight">
                <ul>
                    <li title="Toggle the tray" class="clickable clipboard-copy" @click="$root.$emit('tray.toggle')">
                        <span>IN TRAY:</span>{{ tray.length }}
                    </li>
                    <li title='Navigate to dashboard "NEW" tab' class="clickable clipboard-copy"
                        @click="trayRedirect('new')">
                        <span>NEW:</span>{{ statistics.statistics.new }}
                    </li>
                    <li title='Navigate to dashboard "APPROVED" tab' class="clickable clipboard-copy"
                        @click="trayRedirect('approved')">
                        <span>APPROVED:</span>{{ statistics.statistics.approved }}
                    </li>
                </ul>
            </div>
        </div>

        <transition name="slide-down" mode="out-in">
            <div v-if="isDemo" class="infoBox warning thin-error" style="margin-top: 7px;">
                <p>Application is running in DEMO mode!</p>
            </div>
        </transition>

        <!--ERRORS-->
        <transition name="slide-down">
            <section v-if="errors.length != 0">
                <div class="infoBox warning">
                    <p v-for="error in errors">
                        {{ error }}
                    </p>
                </div>
            </section>
        </transition>
        <!--/ERRORS-->

        <!--PRESCRIPTION-->
        <transition name="fade">
            <div v-if="prescription" class="content prescription-content">
                <section v-if="duplicate && ([2, 4, 5, 6, 7, 8, 9, 10, 11, 1].includes(prescription.Status))"
                    class="notranslate">
                    <div class="infoBox warning">
                        <p>
                            There is a possible duplicate order with ID
                            <a target="_blank" :href="`#/prescription/${duplicate.PrescriptionID}`">{{
                                duplicate.PrescriptionID }}</a> that has the same customer reference id
                            {{ duplicate.ReferenceNumber }} with
                            status {{ orderStatuses[duplicate.Status] }}{{ duplicate.SubStatus ? ` -
                            ${orderSubStatuses[duplicate.SubStatus]}` : '' }}.<br />
                            Please investigate by <a target="_blank"
                                :href="`#/prescription/${duplicate.PrescriptionID}`">clicking here</a> before
                            processing.
                        </p>
                    </div>
                </section>

                <section v-if="approved">
                    <div class="infoBox warning">
                        <p>THIS ITEM HAS ALREADY BEEN APPROVED</p>
                    </div>
                </section>

                <section v-if="locked">
                    <div class="infoBox error">
                        <p style="color: white;">
                            This item is currently opened by <b>{{ locked }}</b>

                            <button @click="unlockOrder()" v-if="userInfo.role >= 50" title="Unlock any order locks"
                                class="btn btnSize01 primaryBtn">
                                Unlock
                            </button>

                            <button @click="takeOverOrder()" v-if="userInfo.role >= 50" title="Unlock any order locks"
                                class="btn btnSize01 primaryBtn">
                                Take Over
                            </button>
                        </p>
                    </div>
                </section>

                <!-- SAFETY CHECK -->
                <transition name="slide-down">
                    <section class="card" v-if="prescription.Status == 9">
                        <div class="card-header flex flex-space-between flex-center-vertically"
                            :class="[(prescription.Message == 'Address Validated Successfully' || prescription.Message == '') ? 'card-header-success' : 'card-header-warning']">
                            <h3>Safety Check</h3>
                            <button class="btn btnSize02 secondaryBtn" v-if="false">View Blacklist (new window)</button>
                            <div>
                                <button class="btn btnSize02 secondaryBtn" @click="$root.$emit('prescription.edit')"
                                    v-if="true">Edit</button>
                                <button :disabled="loadingValidation"
                                    v-if="prescription.Message != 'Address Validated Successfully'"
                                    class="btn btnSize02 secondaryBtn" @click="validateAddress()">
                                    <span v-if="!loadingValidation">Validate Address</span>
                                    <span v-else>Validating</span>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <p v-if="prescription.Message != ''" style="font-size: 19px;"><b
                                    v-html="prescription.Message" /></p>
                            <p v-else>Unknown issue</p>
                            <hr class="mt-10 mb-10"
                                v-if="(prescription.Notes != '' && prescription.Notes != null) && prescription.Message != ''">
                            <p v-if="prescription.Notes != '' && prescription.Notes != null" style="font-size: 19px;">
                                <b v-html="prescription.Notes" />
                            </p>
                        </div>
                    </section>
                </transition>
                <!-- /SAFETY CHECK -->

                <section class="notranslate card">
                    <div class="card-header prescription-info-header">
                        <h3>Prescription Info</h3>
                    </div>
                    <div class="patientInfo card-body">
                        <div class="patient">
                            <ul>
                                <li>
                                    <span>Name: </span>
                                    <span style="text-transform: uppercase;" class="high-visibility">{{
                                        prescription.Name
                                        }}</span>
                                </li>
                                <li>
                                    <span>Surname: </span>
                                    <span style="text-transform: uppercase;" class="high-visibility">{{
                                        prescription.Surname
                                        }}</span>
                                </li>
                                <li class="gender"
                                    :class="[prescription.Sex == 'Male' ? 'blue' : prescription.Sex == 'Female' ? 'purple' : prescription.Sex == 'Transgender' ? 'orange' : 'grey']">
                                    <span>Gender: </span>
                                    <span class="high-visibility">{{ prescription.Sex }}</span>
                                </li>
                                <li>
                                    <span>Age: </span>
                                    <span class="high-visibility">{{ prescription.Age }}</span>
                                </li>
                                <li>
                                    <span>DOB: </span>
                                    <span class="high-visibility">{{ prescription.DOB }}</span>
                                </li>
                                <li v-if="prescription.BMI" style="display: flex;">
                                    <span style="margin-right: .3rem;">BMI: </span>
                                    <span class="high-visibility" style="margin-right: .5rem;">{{ prescription.BMI
                                        }}</span>
                                    <BMI :bmi="prescription.BMI" />
                                </li>
                                <li v-bind:class="{ 'highlight-magenta': prescription.DoctorID == 42 }">
                                    <span>Prescriber: </span>
                                    <span class="high-visibility">{{ prescription.DTitle }} {{ prescription.DName }}
                                        {{ prescription.DSurname }} ({{ doctorTypes[prescription.DoctorType] }}: {{
                                            prescription.GMCNO }})</span>
                                </li>
                                <li>
                                    <span>Prescriber Address: </span>
                                    <span class="high-visibility"> {{ prescription.DoctorAddress1 ?
                                        prescription.DoctorAddress1 + ',' : '' }} {{ prescription.DoctorAddress2 ?
                                            prescription.DoctorAddress2 + ',' : '' }} {{ prescription.DoctorAddress3 ?
                                            prescription.DoctorAddress3 + ',' : '' }} {{ prescription.DoctorAddress4 }} {{
                                            prescription.DoctorPostCode }} </span>
                                </li>
                                <li>
                                    <span>Client: </span>
                                    <span class="high-visibility">{{ prescription.CompanyName }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="prescription-info">
                            <div class="prescription">
                                <ul>
                                    <li><span>Recieved Date: </span>{{ timestampToDate(prescription.CreatedDate) }}</li>
                                    <li v-if="prescription.Status == 8"><span>Shipped/Supplied Date:
                                        </span>{{ timestampToDate(prescription.UpdatedDate) }}</li>
                                    <li v-if="isCommercial"><span>Commercial Invoice Value: </span>{{
                                        prescription.Repeats
                                        }}</li>
                                    <li><span>Shipping: </span>Patient has Authorised 3rd Party Carrier</li>
                                    <li><span>Courier: </span>{{ prescription.Courier }}</li>
                                    <li v-if="prescription.TrackingCode != '' && prescription.TrackingCode != null">
                                        <span>Tracking Code: </span>{{ prescription.TrackingCode }}
                                        <button @click="resendTracking(prescription.PrescriptionID)"
                                            class="clickable smallTextBtn secondaryBtn">Resend Tracking</button>
                                    </li>
                                    <li
                                        v-else-if="(prescription.TrackingCode == '' || prescription.TrackingCode == null) && userInfo.role >= 40 && prescription.Status == 7">
                                        <span>Tracking Code: </span>{{ prescription.TrackingCode }}
                                        <button @click="addTracking()"
                                            class="clickable smallTextBtn secondaryBtn">Manually
                                            Add Tracking</button>
                                    </li>
                                </ul>
                            </div>
                            <div class="location">
                                <ul>
                                    <li><span>Home address: </span>{{ prescription.Address1 }} {{ prescription.Address2
                                        }}
                                        {{ prescription.Address3 }} {{ prescription.Address4 }} {{ prescription.Postcode
                                        }}
                                    </li>
                                    <li><span>Delivery address: </span> {{ prescription.DAddress1 }} {{
                                        prescription.DAddress2 }} {{ prescription.DAddress3 }} {{ prescription.DAddress4
                                        }}
                                        {{ prescription.DPostcode }}
                                        <!-- <a v-if="userInfo.role >= 50" href="javascript:;" class="smallTextBtn tertiaryBtn">Edit</a> -->
                                    </li>
                                    <li><span>Country: </span>{{ prescription.CountryName }}</li>
                                    <li
                                        v-if="(prescription.Telephone != '' && prescription.Telephone) || (prescription.Mobile != '' && prescription.Mobile)">
                                        <span>Telephone: </span>
                                        <a
                                            :href="`tel:${prescription.Telephone ? prescription.Telephone : prescription.Mobile}`">
                                            {{ prescription.Telephone ? prescription.Telephone : prescription.Mobile }}
                                        </a>
                                    </li>
                                    <li v-if="prescription.Email != '' && prescription.Email"><span>Email: </span>
                                        <a :href="`mailto:${prescription.Email}`">{{ prescription.Email }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="activity" v-bind:style="activityBackground(prescription)">
                            <ul class="activity-log-wrapper" v-if="activity.length != 0">
                                <h5 class="activity-log-header">Activities on this order</h5>
                                <li class="activity-log-item" v-for="a in activity" :key="a.ActivityID">
                                    <div class="activity-action">
                                        {{ a.Action }}

                                        <button v-if="(a.Type == 750 || a.Type == 751) && userInfo.role >= 50"
                                            class="clickable smallTextBtn secondaryBtn" :disabled="locked"
                                            @click="revert(a)">
                                            Revert
                                        </button>

                                        <button
                                            v-if="(a.Type == 900 || a.Type == 904) && (userInfo.role >= 50 || userInfo.role == 20 || userInfo.role == 19)"
                                            class="clickable smallTextBtn secondaryBtn" :disabled="locked"
                                            @click="resendPouch(a)">
                                            Resend OCS
                                        </button>

                                        <button
                                            v-if="(a.Type == 750 || a.Type == 751) && userInfo.role < 50 && !a.FirstChange"
                                            class="clickable smallTextBtn secondaryBtn" @click="revert(a, true)">
                                            View
                                        </button>

                                        <button
                                            v-else-if="(a.Type == 750 || a.Type == 751) && userInfo.role < 50 && a.FirstChange"
                                            class="clickable smallTextBtn secondaryBtn" :disabled="locked"
                                            @click="revert(a)">
                                            Revert
                                        </button>
                                    </div>
                                    <div class="activity-footer">
                                        <span>{{ a.Name }}</span><span>{{ a.Date }}</span>
                                    </div>
                                </li>
                            </ul>
                            <ul class="activity-log-wrapper" v-else>
                                <li class="activity-log-item">
                                    No activity log found
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <transition name="fade">
                    <section v-if="testKits.length > 0" class="notranslate card">
                        <div class="card-header card-header-warning"
                            style="display: flex; justify-content: space-between;">
                            <h3>Sub Orders</h3>
                            <p>This order has multiple sub-orders attached to it</p>
                        </div>
                        <div class="card-body"
                            :class="[testKits.length > 6 ? 'sub-order-wrapper' : 'sub-order-wrapper-flex']">
                            <div class="sub-order" v-for="kit in testKits" :key="kit.TestKitID">
                                <ul>
                                    <li>
                                        <span>Reference Number:</span>
                                        <span class="high-visibility"><b>{{ kit.ReferenceNumber }}</b></span>
                                    </li>
                                    <li>
                                        <span>Order Number:</span>
                                        <span class="high-visibility"><b>{{ kit.Count }}/{{ kit.Total }}</b></span>
                                    </li>
                                    <li>
                                        <span>Name:</span>
                                        <span class="high-visibility"><b>{{ kit.Name }}</b></span>
                                    </li>
                                    <li>
                                        <span>Surname:</span>
                                        <span class="high-visibility"><b>{{ kit.Surname }}</b></span>
                                    </li>
                                    <li
                                        :class="[kit.Sex == 'Male' ? 'blue' : kit.Sex == 'Female' ? 'purple' : kit.Sex == 'Transgender' ? 'orange' : 'grey']">
                                        <span>Gender:</span>
                                        <span class="high-visibility"><b>{{ kit.Sex }}</b></span>
                                    </li>
                                    <li v-if="kit.Type != 2">
                                        <span>DOB:</span>
                                        <span class="high-visibility"><b>{{ kit.DOB }}</b></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </transition>

                <section class="notranslate card">
                    <div class="card-header" style="display: flex; justify-content: space-between;">
                        <h3 style="display: flex; justify-content: space-between;">
                            Products
                            <button v-if="prescription.Status == 8" class="smallTextBtn clickable"
                                @click="showAttachedProducts = !showAttachedProducts">
                                {{ showAttachedProducts ? 'Hide' : 'Show' }} Batch No/Expiry Date
                            </button>
                        </h3>
                        <div style="
                                            padding-right: 5px;
                                            padding-top: 2px;">
                            Layout:
                            <button :class="{ 'active': view.products == 1 }"
                                class="clickable smallTextBtn secondaryBtn" @click="view.products = 1">1</button>
                            <button :class="{ 'active': view.products == 2 }"
                                class="clickable smallTextBtn secondaryBtn" @click="view.products = 2">2</button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="pouch-notification" v-if="isJVM">
                            Pouch Order
                        </div>

                        <template v-for="product in prescription.Products">
                            <div style="background: #f53c38; display: flex; flex-direction: column;"
                                class="infoBox warning thin-error" v-if="!product.CorrectName">
                                <div style="font-size: 20px;">
                                    The product name recieved by {{ prescription.CompanyName }} ({{ product.Description
                                    }})
                                    does not match the product name or it's alternatives in ESA ({{ product.Name }})
                                </div>

                                <div class="mt-10 mb-10" v-if="[30, 35].includes(userInfo.role) || userInfo.role >= 50">
                                    <button :disabled="loading" @click="discrepancyResolution(true, product, 'product')"
                                        style="font-size: 15px;padding: 5px;line-height: 21px;height: 30px;"
                                        class="btn btnSize01 secondaryBtn">
                                        Approve Alternative Name
                                    </button>
                                    &nbsp;
                                    <button v-if="prescription.Status != 9 || prescription.SubStatus != 91"
                                        :disabled="loading" @click="discrepancyResolution(false, product, 'product')"
                                        style="font-size: 15px;padding: 5px;line-height: 21px;height: 30px;"
                                        class="btn btnSize01 secondaryBtn">
                                        Send to Safety Check
                                    </button>
                                </div>
                            </div>
                            <div style="background: #f53c38; display: flex; flex-direction: column;"
                                class="infoBox warning thin-error" v-if="!product.CorrectUnitName">
                                <div style="font-size: 20px;">
                                    The unit recieved by {{ prescription.CompanyName }} ({{ product.Unit }})
                                    does not match the unit or it's alternatives in ESA ({{ product.Units }})
                                </div>

                                <div class="mt-10 mb-10" v-if="[30, 35].includes(userInfo.role) || userInfo.role >= 50">
                                    <button :disabled="loading" @click="discrepancyResolution(true, product, 'unit')"
                                        style="font-size: 15px;padding: 5px;line-height: 21px;height: 30px;"
                                        class="btn btnSize01 secondaryBtn">
                                        Approve Alternative Unit
                                    </button>
                                    &nbsp;
                                    <button v-if="prescription.Status != 9 || prescription.SubStatus != 92"
                                        :disabled="loading" @click="discrepancyResolution(false, product, 'unit')"
                                        style="font-size: 15px;padding: 5px;line-height: 21px;height: 30px;"
                                        class="btn btnSize01 secondaryBtn">
                                        Send to Safety Check
                                    </button>
                                </div>
                            </div>
                            <div class="medicineTitle">
                                <div class="fridge-notification"
                                    v-if="product.Fridge == 1 && (userInfo.role == 20 || userInfo.role == 19)">
                                    FRIDGE PRODUCT
                                </div>
                                <div v-if="view.products == '1'" class="title information"
                                    :class="[(product.Fridge == 1 && (userInfo.role == 20 || userInfo.role == 19)) ? 'mt-20' : '']">
                                    <div class="medicine-tooltips">
                                        <div class="medicineTooltip">
                                            <div class="name">Name:</div>
                                            <div class="value">{{ product.Description }}</div>
                                        </div>

                                        <div class="medicineTooltip">
                                            <div class="name">Formulation:</div>
                                            <div class="value">{{ !product.CorrectUnitName ? product.Unit :
                                                product.Units }}
                                            </div>
                                        </div>

                                        <div class="medicineTooltip">
                                            <div class="name">Quantity:</div>
                                            <div class="value">{{ product.Dosage }}</div>
                                        </div>

                                        <div class="medicineTooltip">
                                            <div class="name">Packs:</div>
                                            <div class="value">{{ product.Quantity }}</div>
                                        </div>
                                    </div>

                                    <div class="medicineName mt-10">
                                        <h4>
                                            (CODE: {{ product.Code }} - {{ product.Name }})
                                            <!-- {{product.Description}}  -->
                                            <!-- |<small> ESA Name: {{product.Name}} </small> -->

                                        </h4>
                                    </div>

                                    <div
                                        v-if="prescription.Status == 8 && attachedProducts.length > 0 && showAttachedProducts">
                                        <div style="display: block; padding-top: 10px; margin-bottom:5px; ">Attached:
                                        </div>
                                        <div v-for="(product, key) in getAttachedProductAttributes(product.ProductID)"
                                            class="medicineTooltip" :key="key"
                                            style="display: inline-block; margin-right: 5px; margin-top: 5px;">
                                            <div style="font-size: .9rem;">
                                                Pack #{{ key + 1 }}
                                            </div>
                                            <div style="font-size: .9rem;">
                                                Expiry: <b>{{ product.FMDExpiryDate ? product.FMDExpiryDate : 'N/A'
                                                    }}</b>
                                            </div>
                                            <div style="font-size: .9rem;">
                                                Batch: <b>{{ product.FMDBatchID ? product.FMDBatchID : 'N/A' }}</b>
                                            </div>
                                        </div>
                                    </div>

                                    <div style="padding: 0; margin-top: 10px;"
                                        v-if="product.Fridge == 1 && userInfo.role != 20" class="infoBox warning">
                                        <p>
                                            FRIDGE PRODUCT
                                        </p>
                                    </div>

                                </div>

                                <div class="information" v-if="view.products == '2'"
                                    :class="[product.Fridge == 1 && (userInfo.role == 20 || userInfo.role == 19) ? 'mt-30' : '']">
                                    <div style="text-transform: uppercase;">
                                        MEDICINE NAME: <b>{{ product.Description }} ({{ product.Code }})</b>
                                        <br v-if="!product.CorrectName">
                                        <b class="text-warning" v-if="!product.CorrectName">{{ product.Name }} ({{
                                            product.Code }})</b>
                                    </div>
                                    <div>
                                        Formulation: <b>{{ product.Unit }} <span class="text-warning"
                                                v-if="!product.CorrectUnitName">({{ product.Units }})</span> </b>
                                    </div>

                                    <div>
                                        Quantity: <b>{{ product.Dosage }}</b>
                                    </div>
                                    <div>
                                        Packs: <b>{{ product.Quantity }}</b>
                                    </div>

                                    <div style="height: 5px;"></div>
                                    <template v-if="prescription.Condition">
                                        <div style="color:#218dbc">
                                            Condition: <b>{{ prescription.Condition }}</b>
                                        </div>
                                    </template>
                                    <template v-if="prescription.Frequency">
                                        <div style="color:#218dbc">
                                            Subscription Frequency:
                                            <b>
                                                {{ prescription.Frequency }}
                                            </b>
                                        </div>
                                    </template>

                                    <div
                                        v-if="prescription.Status == 8 && attachedProducts.length > 0 && showAttachedProducts">
                                        <div style="display: block; padding-top: 10px; margin-bottom:5px;">Attached:
                                        </div>
                                        <div v-for="(product, key) in getAttachedProductAttributes(product.ProductID)"
                                            class="medicineTooltip" :key="key"
                                            style="display: inline-block; margin-right: 5px; margin-top: 5px;">
                                            <div style="font-size: .9rem;">
                                                Pack #{{ key + 1 }}
                                            </div>
                                            <div style="font-size: .9rem;">
                                                Expiry: <b>{{ product.FMDExpiryDate ? product.FMDExpiryDate : 'N/A'
                                                    }}</b>
                                            </div>
                                            <div style="font-size: .9rem;">
                                                Batch: <b>{{ product.FMDBatchID ? product.FMDBatchID : 'N/A' }}</b>
                                            </div>
                                        </div>
                                    </div>

                                    <div style="padding: 0; margin-top: 5px;"
                                        v-if="product.Fridge == 1 && userInfo.role != 20" class="infoBox warning">
                                        <p>
                                            FRIDGE PRODUCT
                                        </p>
                                    </div>

                                </div>

                                <div class="instructions"
                                    :class="[product.Fridge == 1 && (userInfo.role == 20 || userInfo.role == 19) ? 'mt-30' : '']">
                                    <p v-html="product.Instructions" />
                                </div>
                            </div>
                        </template>


                    </div>
                </section>

                <section class="card" :class="[translate ? '' : 'notranslate']">
                    <div class="card-header">
                        <h3>Patient Info</h3>
                    </div>
                    <div class="scrollingSuccessors">
                        <!--/QUESTIONNAIRE-->
                        <div class="medicineHistory notranslate">
                            <h2>Medical history</h2>
                            <ul @dblclick="redirect(value.PrescriptionID)" v-if="!historyLoading" class="new"
                                v-for="(value, key) in history" :key="key"
                                :title="`Order ${value.PrescriptionID} in status ${orderStatuses[value.Status]}. Double-click to open in new tab.`"
                                :class="statusClass(value.Status)">
                                <li v-for="(product, k) in value.Products" class="medicine" :key="k">
                                    <span v-if="k == 0 && ([8, 6, 3, 4, 12, 13, 14, 15].includes(value.Status))">
                                        <b>{{ value.ShippedDate }}</b>
                                    </span>
                                    <a target="_blank" :href="`#/prescription/${value.PrescriptionID}`">
                                        {{ product.Name }}, {{ product.Quantity * product.Dosage }} {{ product.Units }}
                                    </a>
                                </li>
                                <li class="client"><b>Client:</b> {{ value.Client }}</li>
                                <li><b>Status:</b> <span class="font-highlight" :class="statusClass(value.Status)">{{
                                    orderStatuses[value.Status] }}</span> </li>
                            </ul>
                            <div v-if="historyLoading" class="dotloader loader-relative" style="">Loading...</div>
                            <div v-if="!historyLoading && history.length == 0">No previous orders available..</div>

                        </div>
                        <!--DETAILS-->
                        <div class="medicineDetails">
                            <ul class="tabs">
                                <li style="margin-left: 0!important;"
                                    title="Relates to allergies, medical conditions and notes added by pharmacists."
                                    :class="{ 'active': activeTab == 'notes' }" @click="activeTab = 'notes'">
                                    <a class="danger" href="javascript:;">Patient Notes
                                        <span v-if="(notes.critical.length) > 0" class="badge red">{{
                                            notes.critical.length }}</span>
                                    </a>
                                </li>
                                <li title="Relates communication with perscriber and notes sent with perscription"
                                    :class="{ 'active': activeTab == 'patient' }" @click="activeTab = 'patient'">
                                    <a href="javascript:;">Queried Notes
                                        <span v-if="(notes.correspondence.length + notes.information.length) > 0"
                                            class="badge red">{{
                                                notes.correspondence.length + notes.information.length
                                            }}</span>
                                    </a>
                                </li>
                                <li title="Relates to the current order" :class="{ 'active': activeTab == 'order' }"
                                    @click="activeTab = 'order'">
                                    <a href="javascript:;">Order Notes
                                        <span
                                            v-if="(notes.other.length || (prescription.Notes != '' && prescription.Notes != null)) > 0"
                                            class="badge red">
                                            {{ notes.other.length + ((prescription.Notes != '' && prescription.Notes !=
                                                null) ? 1 : 0) }}
                                        </span>
                                    </a>
                                </li>
                                <li v-if="!locked" style="margin-right: 0!important;" title="Add new note"
                                    @click="openNote()">
                                    <a href="javascript:;"><i class="fa fa-plus"></i></a>
                                </li>
                            </ul>

                            <div class="content" v-if="activeTab == 'notes'">
                                <ul v-if="notes.critical.length > 0" class="critical">
                                    <li class="note"
                                        :class="[note.DeletedAt != null || note.EditedAt != null ? 'deleted' : '']"
                                        v-for="note in notes.critical" :key="note.NoteID">
                                        <div class="note-body" v-html="note.Note" />
                                        <div class="note-footer">
                                            <span>{{ note.name }} {{ note.surname }}</span><span>{{ note.CreatedAt
                                                }}</span>
                                        </div>
                                        <div class="note-footer" style="color:red;" v-if="note.DeletedAt != null">
                                            <span>Deleted By {{ note.DeletedName }}
                                                {{ note.DeletedSurname }}</span><span>{{ note.DeletedAt }}</span>
                                        </div>
                                        <div class="note-footer" style="color:#ff8944;" v-if="note.EditedAt != null">
                                            <span>Edited By {{ note.EditedName }}
                                                {{ note.EditedSurname }}</span><span>{{ note.EditedAt }}</span>
                                        </div>
                                        <div class="note-footer"
                                            v-if="userInfo.role >= 20 && note.DeletedAt == null && note.EditedAt == null">
                                            <div>
                                                <b class="clickable" @click="showEditHistory(note.NoteID)"
                                                    v-if="note.Edits.length > 0 && userInfo.role >= 50"
                                                    style="color:#ff8944;">
                                                    <span v-if="showEditHistoryFor.includes(note.NoteID)">Hide Edit
                                                        History</span>
                                                    <span v-else>Show Edit History</span>
                                                </b>
                                            </div>
                                            <div>
                                                <button v-if="userInfo.role >= 50 || note.UserID == userInfo.id"
                                                    @click="deleteNote(note.NoteID)" class="smallTextBtn secondaryBtn"
                                                    style="font-size: 12px; cursor:pointer;">Delete</button>
                                                <button v-if="note.UserID == userInfo.id" @click="openNote(note)"
                                                    class="smallTextBtn secondaryBtn"
                                                    style="font-size: 12px; cursor:pointer;">Edit</button>
                                            </div>
                                        </div>
                                        <div class="note-footer"
                                            v-else-if="userInfo.role >= 50 && (note.DeletedAt != null)">
                                            <b class="clickable" @click="showEditHistory(note.NoteID)"
                                                v-if="note.Edits.length > 0 && userInfo.role >= 50"
                                                style="color:#ff8944;">
                                                <span v-if="showEditHistoryFor.includes(note.NoteID)">Hide Edit
                                                    History</span>
                                                <span v-else>Show Edit History</span>
                                            </b>
                                        </div>

                                        <div v-if="showEditHistoryFor.includes(note.NoteID)" class="note-footer">

                                            <ul class="critical" style="width: 100%;">
                                                <li class="note" v-for="edited in note.Edits" :key="edited.NoteID">
                                                    <div class="note-body" v-html="edited.Note" />
                                                    <div class="note-footer">
                                                        <span>{{ edited.name }}
                                                            {{ edited.surname }}</span><span>{{ edited.CreatedAt
                                                            }}</span>
                                                    </div>
                                                    <div class="note-footer" style="color:#ff8944;">
                                                        <span>Edited By {{ edited.EditedName }}
                                                            {{ edited.EditedSurname }}</span><span>{{ edited.EditedAt
                                                            }}</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>

                                <ul v-else>
                                    <li>No patient notes found</li>
                                </ul>
                            </div>

                            <div class="content" v-if="activeTab == 'patient'">
                                <ul v-if="notes.information.length > 0" class="medical">
                                    <li class="note"
                                        :class="[note.DeletedAt != null || note.EditedAt != null ? 'deleted' : '']"
                                        v-for="note in notes.information" :key="note.NoteID">
                                        <div class="note-body" v-html="note.Note" />
                                        <div class="note-footer">
                                            <span>{{ note.name }} {{ note.surname }}</span><span>{{ note.CreatedAt
                                                }}</span>
                                        </div>
                                        <div class="note-footer" style="color:red;" v-if="note.DeletedAt != null">
                                            <span>Deleted By {{ note.DeletedName }}
                                                {{ note.DeletedSurname }}</span><span>{{ note.DeletedAt }}</span>
                                        </div>
                                        <div class="note-footer" style="color:#ff8944;" v-if="note.EditedAt != null">
                                            <span>Edited By {{ note.EditedName }}
                                                {{ note.EditedSurname }}</span><span>{{ note.EditedAt }}</span>
                                        </div>
                                        <div class="note-footer"
                                            v-if="userInfo.role >= 20 && note.DeletedAt == null && note.EditedAt == null">
                                            <div>
                                                <b class="clickable" @click="showEditHistory(note.NoteID)"
                                                    v-if="note.Edits.length > 0 && userInfo.role >= 50"
                                                    style="color:#ff8944;">
                                                    <span v-if="showEditHistoryFor.includes(note.NoteID)">Hide Edit
                                                        History</span>
                                                    <span v-else>Show Edit History</span>
                                                </b>
                                            </div>
                                            <div>
                                                <button v-if="userInfo.role >= 50 || note.UserID == userInfo.id"
                                                    @click="deleteNote(note.NoteID)" class="smallTextBtn secondaryBtn"
                                                    style="font-size: 12px; cursor:pointer;">Delete</button>
                                                <button v-if="note.UserID == userInfo.id" @click="openNote(note)"
                                                    class="smallTextBtn secondaryBtn"
                                                    style="font-size: 12px; cursor:pointer;">Edit</button>
                                            </div>
                                        </div>
                                        <div class="note-footer"
                                            v-else-if="userInfo.role >= 50 && (note.DeletedAt != null)">
                                            <b class="clickable" @click="showEditHistory(note.NoteID)"
                                                v-if="note.Edits.length > 0 && userInfo.role >= 50"
                                                style="color:#ff8944;">
                                                <span v-if="showEditHistoryFor.includes(note.NoteID)">Hide Edit
                                                    History</span>
                                                <span v-else>Show Edit History</span>
                                            </b>
                                        </div>

                                        <div v-if="showEditHistoryFor.includes(note.NoteID)" class="note-footer">
                                            <ul class="medical" style="width: 100%;">
                                                <li class="note" v-for="edited in note.Edits" :key="edited.NoteID">
                                                    <div class="note-body" v-html="edited.Note" />
                                                    <div class="note-footer">
                                                        <span>{{ edited.name }}
                                                            {{ edited.surname }}</span><span>{{ edited.CreatedAt
                                                            }}</span>
                                                    </div>
                                                    <div class="note-footer" style="color:#ff8944;">
                                                        <span>Edited By {{ edited.EditedName }}
                                                            {{ edited.EditedSurname }}</span><span>{{ edited.EditedAt
                                                            }}</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>

                                <ul v-if="notes.correspondence.length > 0" class="other">
                                    <li class="note" v-for="note in notes.correspondence" :key="note.NoteID">
                                        <div class="note-header" v-html="note.Subject" />
                                        <hr>
                                        <div class="note-body" v-html="note.Message" />
                                        <hr>
                                        <div class="note-footer">
                                            <span>{{ note.Name }} {{ note.Surname }}</span><span>{{ note.Date }} </span>
                                        </div>
                                    </li>
                                </ul>

                                <ul v-if="notes.correspondence.length == 0 && notes.information.length == 0">
                                    <li>No queried notes found</li>
                                </ul>
                            </div>

                            <div class="content" v-if="activeTab == 'order'">
                                <ul v-if="prescription.Notes != '' && prescription.Notes != null" class="other">
                                    <li class="note">
                                        <div class="note-body" v-html="prescription.Notes" />
                                        <div class="note-footer">
                                            <!-- <span>{{note.name}} {{note.surname}}</span><span>{{note.CreatedAt}}</span> -->
                                        </div>
                                    </li>
                                </ul>

                                <ul v-if="notes.other.length > 0" class="other">
                                    <li class="note"
                                        :class="[note.DeletedAt != null || note.EditedAt != null ? 'deleted' : '']"
                                        v-for="note in notes.other" :key="note.NoteID">
                                        <div class="note-body" v-html="note.Note" />
                                        <div class="note-footer">
                                            <span>{{ note.name }} {{ note.surname }}</span><span>{{ note.CreatedAt
                                                }}</span>
                                        </div>
                                        <div class="note-footer" style="color:red;" v-if="note.DeletedAt != null">
                                            <span>Deleted By {{ note.DeletedName }}
                                                {{ note.DeletedSurname }}</span><span>{{ note.DeletedAt }}</span>
                                        </div>
                                        <div class="note-footer" style="color:#ff8944;" v-if="note.EditedAt != null">
                                            <span>Edited By {{ note.EditedName }}
                                                {{ note.EditedSurname }}</span><span>{{ note.EditedAt }}</span>
                                        </div>
                                        <div class="note-footer"
                                            v-if="userInfo.role >= 20 && note.DeletedAt == null && note.EditedAt == null">
                                            <div>
                                                <b class="clickable" @click="showEditHistory(note.NoteID)"
                                                    v-if="note.Edits.length > 0 && userInfo.role >= 50"
                                                    style="color:#ff8944;">
                                                    <span v-if="showEditHistoryFor.includes(note.NoteID)">Hide Edit
                                                        History</span>
                                                    <span v-else>Show Edit History</span>
                                                </b>
                                            </div>
                                            <div>
                                                <button v-if="userInfo.role >= 50 || note.UserID == userInfo.id"
                                                    @click="deleteNote(note.NoteID)" class="smallTextBtn secondaryBtn"
                                                    style="font-size: 12px; cursor:pointer;">Delete</button>
                                                <button v-if="note.UserID == userInfo.id" @click="openNote(note)"
                                                    class="smallTextBtn secondaryBtn"
                                                    style="font-size: 12px; cursor:pointer;">Edit</button>
                                            </div>
                                        </div>
                                        <div class="note-footer"
                                            v-else-if="userInfo.role >= 50 && (note.DeletedAt != null)">
                                            <b class="clickable" @click="showEditHistory(note.NoteID)"
                                                v-if="note.Edits.length > 0 && userInfo.role >= 50"
                                                style="color:#ff8944;">
                                                <span v-if="showEditHistoryFor.includes(note.NoteID)">Hide Edit
                                                    History</span>
                                                <span v-else>Show Edit History</span>
                                            </b>
                                        </div>

                                        <div v-if="showEditHistoryFor.includes(note.NoteID)" class="note-footer">
                                            <ul class="other" style="width: 100%;">
                                                <li class="note" v-for="edited in note.Edits" :key="edited.NoteID">
                                                    <div class="note-body" v-html="edited.Note" />
                                                    <div class="note-footer">
                                                        <span>{{ edited.name }}
                                                            {{ edited.surname }}</span><span>{{ edited.CreatedAt
                                                            }}</span>
                                                    </div>
                                                    <div class="note-footer" style="color:#ff8944;">
                                                        <span>Edited By {{ edited.EditedName }}
                                                            {{ edited.EditedSurname }}</span><span>{{ edited.EditedAt
                                                            }}</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>

                                <ul
                                    v-if="(prescription.Notes == '' || prescription.Notes == null) && notes.other.length == 0">
                                    <li>No order notes found</li>
                                </ul>
                            </div>
                        </div>
                        <!--/DETAILS-->
                        <!--QUESTIONNAIRE-->
                        <div class="medicineQuestionnaire" :class="{ 'fullscreen': expandedQuestionnaire }">
                            <h2>
                                Questionnaire
                                <span v-if="questionnaire.length != 0" class="language-toggle"
                                    @click="translateQuestionnaire()">({{
                                        languageText }})</span>
                                <i :class="[expandedQuestionnaire ? 'fa-compress' : 'fa-expand']" class="fa"
                                    aria-hidden="true" @click="expandedQuestionnaire = !expandedQuestionnaire"></i>
                            </h2>
                            <table cellpadding="0" cellspacing="0" v-if="!questionnaireLoading">
                                <tr v-if="questionnaire.length != 0 && !loading" v-for="(value, key) in questionnaire"
                                    :key="key">
                                    <td>{{ value.Question }}</td>
                                    <td>{{ value.Answer }}</td>
                                </tr>
                            </table>
                            <div v-else class="dotloader loader-relative" style="">Loading...</div>
                            <div v-if="questionnaire.length == 0 && !loading">
                                This prescription does not have a questionnaire.
                            </div>
                        </div>
                    </div>
                </section>
                <section class="card">
                    <div class="card-header" style="background: #eff8f830;">
                        <h3 style="text-align: center;">HR HEALTHCARE Pharmacy, Unit 18, Waters Meeting, Britannia Way,
                            Bolton BL2 2HH, United Kingdom</h3>
                    </div>
                </section>

            </div>
        </transition>
        <!--/PRESCRIPTION-->
        <!--LOADER-->
        <!-- <div v-if="!prescription && errors.length == 0" class="loader" style="">Loading...</div> -->
        <!--/LOADER-->

    </div>
</template>

<script>
import Error from '../../mixins/errors'
import Clipboard from '../../mixins/clipboard'
import orderStatuses from '../../mixins/constants/orderStatuses'
import doctorTypes from '../../mixins/constants/doctorTypes'
import DiffTableAddress from './DiffTableAddress.vue';
import BMI from '../BMI.vue';
import Treeselect from "../wrapper/Treeselect.vue";
import _ from 'lodash';

export default {
    mixins: [Error, Clipboard, orderStatuses, doctorTypes],
    components: {
        Treeselect,
        BMI
    },
    data: function () {
        return {
            history: [],
            historyNew: [],
            testKits: [],
            attachedProducts: [],
            showAttachedProducts: false,
            errors: [],
            questionnaire: [],
            notes: { critical: [], information: [], other: [], correspondence: [], alerts: [] },
            showEditHistoryFor: [],
            activity: [],
            statistics: {
                statistics: {
                    new: 0,
                    approved: 0,
                }
            },
            questionnaireTranslation: [],
            alertsFor: false,
            approved: false,

            locked: true,//use this for locking an order
            lockTimer: false,

            prescription: false,
            orderID: this.$route.params.id,
            userInfo: userInfo,
            appInfo: appInfo,
            duplicate: false,
            currentOrderID: '',
            loading: true,
            loadingValidation: false,
            questionnaireLoading: true,
            notesLoading: true,
            historyLoading: true,
            expandedQuestionnaire: false,
            prescriptionStatus: null,
            activeTab: userInfo.role == 30 ? 'notes' : 'order',
            translate: true,
            view: JSON.parse(localStorage.getItem('view')) || { products: 2 },
            timer: '',
            imgMap: {
                3: 'images/logo/tnt.png',
                4: 'images/logo/dpd.png',
                5: 'images/logo/rmail.png',
                7: 'images/logo/ups.png',
                8: 'images/logo/tnt.png',
                10: 'images/logo/dhl.png',
            },
            restrictedStatus: [],
        }
    },
    mounted() {
        this.emitter.emit('prescriptionloading');//make sure the loading state gets initialized every time a prescription is mounted
        //check if order is locked
        this.lockTimer = setInterval(() => {
            this.checkLock();
        }, 5000);

        this.getOrderData(true);
        this.getStatistics();
        this.timer = setInterval(this.getStatistics, 120000);
        //we need to listen for this one in case an
        //order gets updated outside the component

        this.emitter.on('orderupdate', (e) => {
            this.getOrderData();
        });

        this.emitter.on('statistic.update', (e) => {
            this.getStatistics();
        });

        this.emitter.on('prescription.validate', (e) => {
            this.validateAddress();
        });
    },
    beforeDestroy() {
        clearInterval(this.timer);
        clearInterval(this.lockTimer);
        this.emitter.offffffffffffffff('orderupdate');
        this.emitter.off('statistic.update');
        this.emitter.off('prescription.validate');
    },
    computed: {
        isDemo() {
            return this.appInfo.mode == 'local' || this.appInfo.mode == 'demo';
            // return window.location.origin != 'https://esasys.co.uk'
        },
        isCommercial() {
            return this.prescription.Repeats != '0'
                && this.prescription.Repeats != ''
                && [143, 162, 205, 243].includes(this.prescription.DCountryCode);
        },
        isJVM() {
            let check = false;

            for (let product of this.prescription.Products) {
                if (product.JVM == 2) {
                    check = false;
                    break;
                }

                if (product.JVM == 0) {
                    if (this.prescription.JVM == 1) {
                        check = true;
                    }
                } else if (product.JVM == 1) {
                    if (this.prescription.ClientID == 51) {
                        check = true;
                    }
                }
            }

            return check;
        },
        statuses() {
            return this.orderStatusesSelect.filter(function (obj) {
                return obj.value !== '';
            });
        },
        fullyLoaded() {
            return !this.loading && !this.questionnaireLoading /*&& !this.historyLoading*/ && !this.notesLoading && !this.locked;
        },
        languageText() {
            return this.translate ? 'Show original language' : 'Translate to english';
        },
        headerClass() {
            return [1, 7].includes(this.prescription.Status) ? 'active'
                : [2, 8].includes(this.prescription.Status) ? 'success'
                    : [4, 5, 9, 10, 11, 12, 13, 14, 15].includes(this.prescription.Status) ? 'warning'
                        : [3, 6].includes(this.prescription.Status) ? 'error'
                            : [16].includes(this.prescription.Status) ? 'returned'
                                : '';
        },
        tray() {
            return this.$store.state.tray;
        },
        availableStatuses() {
            //this will be expanded by roles and other statuses
            if (this.userInfo.role >= 50) {
                return this.statuses;
            }

            if (this.prescription.Status == 9) {
                return [
                    { title: 'SAFETYCHECK', value: '9' },
                    { title: 'NEW', value: '1' },
                    { title: 'CANCELLED', value: '6' },
                ];
            } else {
                return this.statuses;
            }
        },
        hasFridge() {
            let fridge = 0;

            this.prescription.Products.forEach((item) => {
                if (item.Fridge == 1) {
                    fridge++;
                }
            });

            return fridge == 0 ? false : true;
        }
    },
    watch: {
        '$route.params'() {
            if (typeof this.$route.params.id != 'undefined' && this.currentOrderID != this.$route.params.id) {
                this.emitter.emit('prescriptionloading');
                this.orderID = this.$route.params.id;
                this.getOrderData();
            }
        },
        fullyLoaded() {
            if (this.fullyLoaded) {
                this.emitter.emit('prescriptionloaded', { prescription: this.prescription });
            }
        },
        prescription() {
            if (this.prescription) {
                this.prescriptionStatus = this.prescription.Status;

                if (this.prescription.SubStatus != null) {
                    this.prescriptionStatus = this.prescription.SubStatus;
                }

                //HERE COMES A HACK (a useful one actually)
                let productCodes = [];

                this.prescription.Products.forEach((product) => {
                    if (product.Name != product.Description) {
                        this.alternativeNameCheck(product, this.prescription.ClientID, (result) => {
                            product.CorrectName = result;
                        });
                    }
                    if (product.Units != product.Unit) {
                        this.alternativeUnitCheck(product, this.prescription.ClientID, (result) => {
                            product.CorrectUnitName = result;
                        });
                    }
                    productCodes.push(product.Code);
                })

                let show = false;

                if (productCodes.includes('1131663') && productCodes.includes('CPCR')) {
                    show = true;
                } else if (productCodes.includes('1136225') && productCodes.includes('CPCR')) {
                    show = true;
                } else if (productCodes.includes('1131663') && productCodes.includes('CGON') && productCodes.includes('2385607')) {
                    show = true;
                }

                if (show && [30, 50, 60].includes(this.userInfo.role)) {
                    this.$swal({
                        title: 'Attention!',
                        html: `Please check this order with a prescriber and add approval note to ESA`,
                        type: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok'
                    });
                }
            }
        },
        'view.products'() {
            localStorage.setItem('view', JSON.stringify(this.view));
        }
    },
    methods: {
        getOrderData(preflight = false) {
            this.checkLock(() => {
                this.search();
                this.getQuestionnaire();
                this.getOrderHistory();
                this.getActivity();
                this.getNotes();
                this.checkOrderStatuses();
            }, preflight);
        },
        checkLock(callback = false, preflight = false) {
            axios.get('/logs/locked/' + (preflight ? this.orderID : this.currentOrderID))
                .then((response) => {
                    if (response.data.data) {
                        this.locked = response.data.data.Name + ' ' + response.data.data.Surname;
                        this.emitter.emit('prescriptionloading');
                    } else {
                        this.locked = false;
                    }
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                    this.errors = error.response.data.data;
                    this.locked = false;
                })
                .finally(() => {
                    if (callback) {
                        callback();
                    }
                })
        },
        alternativeNameCheck(product, client, callback) {
            axios.get(`/inventory/products/alternative-name?code=${product.ProductCodeID}&name=${encodeURI(product.Description)}&client=${client}`)
                .then((response) => {
                    callback(response.data.data);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        alternativeUnitCheck(product, client, callback) {
            axios.get(`/inventory/products/alternative-unit?code=${product.ProductCodeID}&unit=${encodeURI(product.Unit)}&client=${client}`)
                .then((response) => {
                    callback(response.data.data);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        //Resolve the product name discrepancy
        discrepancyResolution(resolution, product = false, alttype) {
            //if resolution is positive then add the product to productnamealternative list and refresh
            //if not move the prescription to safety check
            if (resolution) {
                this.loading = true;
                if (alttype == 'product') {
                    axios.post(`/inventory/products/approve-discrepancy`, {
                        ProductCodeID: product.ProductCodeID, ClientID: this.prescription.ClientID,
                        UserID: this.userInfo.id, AlternativeName: product.Description
                    })
                        .then((response) => {
                            this.postSuccess('Alternative name approved');
                            this.loading = false;
                            this.search();
                        })
                        .catch((error) => {
                            this.loading = false;
                            this.postError(error.response.data.message);
                        });
                } else {
                    axios.post(`/inventory/products/approve-discrepancy-unit`, {
                        ProductCodeID: product.ProductCodeID, ClientID: this.prescription.ClientID,
                        UserID: this.userInfo.id, AlternativeUnit: product.Unit
                    })
                        .then((response) => {
                            this.postSuccess('Alternative unit approved');
                            this.loading = false;
                            this.search();
                        })
                        .catch((error) => {
                            this.loading = false;
                            this.postError(error.response.data.message);
                        });
                }

            } else {
                console.log('alttype', alttype);
                if (alttype == 'product') {
                    this.prescriptionStatus = 91;
                } else {
                    this.prescriptionStatus = 92;
                }
                this.updateStatus();
            }
        },
        unlockOrder() {
            axios.post(`logs/unlock/${this.currentOrderID}`)
                .then((response) => {
                    this.locked = false;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                    this.errors = error.response.data.data;
                    this.locked = false;
                })
        },
        takeOverOrder() {
            axios.post(`logs/takeover/${this.currentOrderID}`)
                .then((response) => {
                    this.locked = false;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                    this.errors = error.response.data.data;
                    this.locked = false;
                })
        },
        /*Search for a prescription*/
        search() {
            this.errors = [];
            this.prescription = false;
            if (this.orderID != '') {
                this.currentOrderID = this.orderID;
                this.orderID = '';
            }

            this.loading = true;
            axios.get('/order/' + this.currentOrderID)
                .then((response) => {
                    this.prescription = response.data.data;
                    this.restrictedStatus = response.data.data.restrictedStatus;
                    this.loading = false;

                    //check if there is any test kit in products array
                    let testKitExists = false;

                    if (typeof this.prescription.Products != 'undefined') {
                        this.prescription.Products.forEach((product) => {
                            if (product.Type == 2) {
                                testKitExists = true;
                            }
                        })
                    }

                    //If there is a test kit fetch additional test kit data
                    if (testKitExists) {
                        this.getTestKits();
                    } else {
                        this.testKits = [];
                    }

                    if (this.prescription.Status == 8) {
                        //fetch attached products here
                        axios.post(`/order/attached-products`, { products: this.prescription.Products })
                            .then((response) => {
                                this.attachedProducts = response.data.data;
                            })
                    }
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                    this.errors = error.response.data.data;
                    this.loading = false;
                })

            if (this.$route.params.id != this.currentOrderID) {
                this.$router.push({ params: { id: this.currentOrderID } });
            }
        },
        getAttachedProductAttributes(productId) {
            let product = this.attachedProducts.filter(product => product.ProductID == productId);

            return product ? product : {};
        },
        getTestKits() {
            axios.get('/order/' + this.currentOrderID + '/test-kits')
                .then((response) => {
                    this.testKits = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        getOrderHistory() {
            this.historyLoading = true;

            axios.get('/order/' + this.currentOrderID + '/history')
                .then((response) => {
                    this.history = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.historyLoading = false;
                })
        },
        getQuestionnaire() {
            this.questionnaireLoading = true;
            axios.get('/questionnaire/' + this.currentOrderID)
                .then((response) => {
                    this.questionnaire = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.questionnaireLoading = false;
                })
        },
        /**
         * Get notes related to the current order
         */
        getNotes() {
            this.notesLoading = true;
            axios.get(`/order/${this.currentOrderID}/notes`)
                .then((response) => {
                    this.notes = response.data.data;

                    //check if alerts are shown, if not show them
                    if (this.alertsFor != this.currentOrderID && this.notes.alerts.length > 0) {
                        let html = `
                        <div class="medicineDetails" style="width: 100%;">
                        <p>Please review the notes below:</p>
                        <ul class="other">`;

                        let alertCount = 0;
                        let type = 0;

                        this.notes.alerts.sort((a, b) => (a.Type > b.Type) ? 1 : -1);

                        this.notes.alerts.forEach((alert) => {
                            if (alert.DeletedAt == null && alert.EditedAt == null) {
                                alertCount++;

                                if (alert.Type != type) {
                                    type = alert.Type;
                                    html += `<li class="note-header ${type == 1 ? 'note-header__danger' : ''}"><div>${type == 1 ? 'Patient Notes' : 'Order Notes'}</div></li>`;
                                }

                                html += `
                                <li class="note"
                                title="${alert.Type == 2 ? 'Queried Alert' : alert.Type == 1 ? 'Patient Alert' : 'Order Alert'} created by ${alert.name} ${alert.surname}"
                                style="${alert.Type == 2 ? 'border-left: 5px solid #32a36a;'
                                        : alert.Type == 1 ? 'border-left: 5px solid #ff5151;' : ''}">
                                <div class="note-body" style="text-align: initial;">
                                <p>${alert.Note}</p>
                                </div>
                                <div class="note-footer">
                                <span>${alert.name + ' ' + alert.surname}</span>
                                <span>${alert.CreatedAt}</span>
                                </div>
                                </li>`
                            }
                        });

                        html += `</ul></div>`;

                        if (alertCount > 0) {
                            this.$swal({
                                title: 'Important notes!',
                                html: html,
                                type: 'warning',
                                showCancelButton: false,
                                allowEscapeKey: false,
                                allowOutsideClick: false,
                                focusConfirm: false,
                                // customClass: 'swal-wide',
                                confirmButtonColor: '#3085d6',
                                // cancelButtonColor: '#d33',
                                confirmButtonText: "I've read these notes!"
                            });
                        }

                        this.alertsFor = this.currentOrderID;
                    } else {
                        this.alertsFor = this.currentOrderID;
                    }
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.notesLoading = false;
                })
        },
        /**
         *
         */
        deleteNote(id) {
            this.$swal({
                title: 'Delete Note',
                html: 'Are you sure you want to delete this note?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ff5151',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then((result) => {
                if (result.value) {
                    axios.post('/note/' + id + '/delete')
                        .then((response) => {
                            this.postSuccess(response.data.message);
                        })
                        .catch((error) => {
                            this.postError(error.response.data.message);
                        })
                        .finally(() => {
                            this.getNotes();
                        })
                }
            })
        },
        openNote(note = false) {
            this.emitter.emit('modal.open', 'note', note);
        },
        editDetails(prescription) {
            this.editingOrder = !this.editingOrder;
        },
        //used for updating status through the dropdown
        updateStatus(text = false) {
            this.loading = true;
            this.emitter.emit('prescriptionloading');//we need to let the footer know that the prescription is loading

            let postData = { status: this.prescriptionStatus };

            if (text) {
                postData.text = text;
            }
            console.log('post data', postData);
            axios.post('/order-edit/' + this.prescription.PrescriptionID + '/status', postData)
                .then((response) => {
                    if (this.prescription.Status == 9 && this.prescriptionStatus == 1) {
                        localStorage.setItem('dashboard.orderFilter', 'safety');
                        this.$router.push({ name: 'in tray' });
                    } else if (this.prescription.Status == 9 && this.prescriptionStatus == 6) {
                        localStorage.setItem('dashboard.orderFilter', 'safety');
                        this.$router.push({ name: 'in tray' });
                    } else if (['4', '12', '13', '14', '15'].includes(this.prescriptionStatus)) {
                        localStorage.setItem('dashboard.orderFilter', 'queried');
                        this.$router.push({ name: 'in tray' });
                    } else {
                        localStorage.setItem('dashboard.orderFilter', this.userInfo.role == 20 || this.userInfo.role == 19 ? 'approved' : 'new');
                    }

                    if (this.prescriptionStatus != 1) {
                        if (this.userInfo.role == 20 || this.userInfo.role == 10) {
                            this.emitter.emit('tray.remove.skip', this.prescription.PrescriptionID);
                        }
                    }

                    // this.emitter.emit('prescriptionloading');//we need to let the footer know that the prescription is loading
                    this.emitter.emit('statistic.update');
                    this.postSuccess(response.data.message);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.getOrderData();
                })
        },
        updateStatusPopup() {
            console.log(this.prescriptionStatus);
            if (['102', '107', '106', '69', '634', '164'].includes(this.prescriptionStatus)) {
                this.$swal({ // this.prescriptionStatus == '107'
                    text: this.prescriptionStatus == '102' ? 'Enter expiry date (MM/YYYY)' : this.prescriptionStatus == '107' ? 'Enter shipping date (DD/MM/YYYY)' : 'Enter other text',
                    inputPlaceholder: this.prescriptionStatus == '102' ? 'MM/YYYY' : this.prescriptionStatus == '107' ? 'Enter shipping date (DD/MM/YYYY)' : 'Enter description',
                    input: 'text',
                    inputValue: '',
                    confirmButtonText: 'Update',
                    showCancelButton: true,
                    inputValidator: (value) => {
                        return new Promise((resolve) => {
                            if (this.prescriptionStatus == '102') {
                                let date = new Date();
                                let month = ("0" + (date.getMonth() + 1)).slice(-2);
                                let year = date.getFullYear().toString().split("");

                                let re = new RegExp(`((1[0-2])|(0[1-9]))\/[${year[0]}-9][${year[1]}-9][${year[2]}-9][${year[3]}-9]$`);
                                let errorMessage = `
                                    Invalid date entered!</br>
                                    Check if the format is correct (MM/YYYY)</br>
                                    Check if the date is current or future</br>
                                    Example: ${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear().toString()}
                                    `;

                                if (value.match(re)) {
                                    if (parseInt(value.slice(-4)) > date.getFullYear()) {
                                        resolve();
                                    } else if (parseInt(value.slice(-4)) == date.getFullYear()) {
                                        if (parseInt(value.substring(0, 2)) < (date.getMonth() + 1)) {
                                            resolve(errorMessage);
                                        }
                                    }

                                    resolve();
                                } else {
                                    resolve(errorMessage);
                                }
                            } else if (this.prescriptionStatus == '107') {
                                let date = new Date();
                                let month = ("0" + (date.getMonth() + 1)).slice(-2);
                                let year = date.getFullYear().toString().split("");

                                let re = new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
                                let errorMessage = `
                                    Invalid date entered!</br>
                                    Check if the format is correct (DD/MM/YYYY)</br>
                                    Check if the date is current or future</br>
                                    Example: 28/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear().toString()}
                                    `;

                                if (value.match(re)) {
                                    if (parseInt(value.slice(-4)) > date.getFullYear()) {
                                        resolve();
                                    } else if (parseInt(value.slice(-4)) == date.getFullYear()) {
                                        if (parseInt(value.substring(2, 4)) < (date.getMonth() + 1)) {
                                            resolve(errorMessage);
                                        }
                                    }

                                    resolve();
                                } else {
                                    resolve(errorMessage);
                                }
                            } else if (value == '') {
                                resolve('Please enter the description!')
                            } else {
                                resolve();
                            }
                        })
                    }

                }).then((result) => {
                    console.log(result);
                    if (result.value) {
                        this.updateStatus(result.value);
                    }
                })
            } else {
                this.updateStatus();
            }
        },
        statusClass(status) {
            return [1, 7].includes(status) ? 'active'
                : [2, 8].includes(status) ? 'success'
                    : [4, 5, 9, 10, 11, 12, 13, 14, 15].includes(status) ? 'warning'
                        : [16].includes(status) ? 'returned'
                            : [3, 6].includes(status) ? 'error'
                                : '';
        },
        timestampToDate(timestamp) {
            let date = new Date(timestamp * 1000);
            // date.setMonth(date.getMonth() + 1);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + String(date.getHours()).padStart(2, "0") + ':' + String(date.getMinutes()).padStart(2, "0");
        },
        getStatistics() {
            axios.get('/statistics')
                .then((response) => {
                    this.statistics = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        getActivity() {
            axios.get('/order/' + this.currentOrderID + '/activity')
                .then((response) => {
                    this.activity = response.data.data;

                    for (let activity of this.activity) {
                        if ([750, 751].includes(activity.Type)) {
                            activity.FirstChange = true;
                            break;
                        }
                    }
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        translateQuestionnaire() {
            this.getQuestionnaire();
            this.translate = !this.translate
        },
        checkOrderStatuses() {
            axios.get(`/order/${this.currentOrderID}/statuses`)
                .then((response) => {
                    if (this.userInfo.role == 30 || this.userInfo.role == 35) {
                        this.approved = response.data.data.approved;
                    }
                    this.duplicate = response.data.data.duplicate;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        redirect(id) {
            let url = `#/prescription/${id}`;
            window.open(url, '_blank');
        },
        trayRedirect(target = 'new') {
            localStorage.setItem('dashboard.orderFilter', target);//reset dashboard tray to new to show new orders
            this.$router.push({ name: 'in tray' });
        },
        validateAddress() {
            this.loadingValidation = true;

            axios.post(`/api/validate-address/${this.currentOrderID}`)
                .then((response) => {
                    this.postSuccess(response.data.message);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.loadingValidation = false;
                    this.search();
                })
        },
        //revert an activity
        revert(activity, readOnly = false) {
            // all this just to avoid importing vue at mount
            axios.get(`/order/${this.currentOrderID}/access-point`)
                .then((response) => {
                    (async () => {
                        let Vue = (await import("vue")).default;

                        let ComponentClass = Vue.extend(DiffTableAddress)
                        let instance = new ComponentClass({
                            propsData: {
                                oldObject: this.prescription,
                                oldObjectUPS: response.data.data,
                                newObject: JSON.parse(JSON.parse(activity.Arguments)).oldOrder,
                                newObjectUPS: JSON.parse(JSON.parse(activity.Arguments)).oldUPS,
                                getDetails: true,
                            }
                        })

                        instance.$mount();

                        instance.$on('difftable.loaded', () => {

                            if (readOnly) {
                                this.$swal({
                                    title: 'Change Review',
                                    html: `<p>Below are the changes compared to the current order values:</p> ${instance.$el.outerHTML}`,
                                    type: 'warning',
                                    customClass: 'swal-wide',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Ok'
                                });
                            } else {
                                this.$swal({
                                    title: 'Are you sure you want to do this?',
                                    html: `<p>This will revert the order details to the previous state! Please review the changes below:</p> ${instance.$el.outerHTML}`,
                                    type: 'warning',
                                    showCancelButton: true,
                                    customClass: 'swal-wide',
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Yes, revert it!'
                                }).then((result) => {
                                    if (result.value) {
                                        axios.post(`/order-edit/revert/${activity.ActivityID}`)
                                            .then((response) => {
                                                this.postSuccess(response.data.message);
                                            })
                                            .catch((error) => {
                                                this.postError(error.response.data.message);
                                            })
                                            .finally(() => {
                                                this.getOrderData();
                                            })
                                    }
                                })
                            }

                            instance.$off('difftable.loaded');
                        });

                        instance.$on('difftable.error', () => {
                            instance.$off('difftable.error');
                            instance.$destroy();
                        })
                    })();
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                });
        },
        revealEmail() {
            axios.get(`/order/${this.currentOrderID}/email`)
                .then((response) => {
                    this.prescription.Email = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        activityBackground(prescription) {
            if (prescription.UPSAccessPointAddress != 0) {
                return { background: 'url(images/logo/ups_access_point.jpg) 0 5px / 30px no-repeat!important' };
            } else if (prescription.PaymentMethod != 0) {
                return { background: 'url(images/logo/ups_cod.jpg?) 0 5px / 30px no-repeat!important' };
            } else if (prescription.DeliveryID == 7) {
                return { background: `url(${this.imgMap[prescription.DeliveryID]}) 0 5px / 30px no-repeat!important` };
            } else {
                return { background: `url(${this.imgMap[prescription.DeliveryID]}) 0px 0px / 45px no-repeat!important`, paddingLeft: '50px' };
            }
        },
        showEditHistory(id) {
            if (!this.showEditHistoryFor.includes(id)) {
                this.showEditHistoryFor.push(id);
            } else {
                this.showEditHistoryFor.splice(this.showEditHistoryFor.indexOf(id), 1);
            }
        },
        addTracking() {
            this.$swal({
                title: 'Manually add tracking code:',
                html: 'Clicking on confirm and send will add the <b>tracking code</b>, <b>send tracking</b> and <b>change the order status</b> to shipped. Please make sure the tracking code is correct!',
                inputPlaceholder: 'Enter tracking code',
                input: 'text',
                inputValue: '',
                confirmButtonText: 'Confirm and send',
                showCancelButton: true,
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        if (value == '') {
                            resolve('Please enter a tracking code!')
                        } else {
                            resolve();
                        }
                    })
                }

            }).then((result) => {
                if (result.value) {
                    this.loading = true;
                    this.emitter.emit('prescriptionloading');

                    axios.post(`/order/${this.currentOrderID}/add-tracking`, { code: result.value })
                        .then((response) => {
                            this.postSuccess(response.data.message);
                        })
                        .catch((error) => {
                            this.postError(error.response.data.message);
                        })
                        .finally(() => {
                            this.loading = false;
                            this.search();
                        })
                }
            })
        },
        resendTracking(id) {
            this.loading = true;
            this.emitter.emit('prescriptionloading');

            axios.post(`/order/${this.currentOrderID}/resend-tracking`)
                .then((response) => {
                    this.postSuccess(response.data.message);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        resendPouch(a) {
            axios.post(`/jvm/${this.currentOrderID}/send`)
                .then((response) => {
                    this.postSuccess(response.data.message);
                    this.getActivity();
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
    }
}
</script>
