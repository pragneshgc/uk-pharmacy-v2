<template>
    <div>
        <div class="infoHeader"
        :class="headerClass"
        >
            <div class="floatLeft">
                <ul>
                    <li class="clickable" @dblclick="copyToClipboard(prescription.PrescriptionID)" style="min-width: 120px;">
                        <span>Order ID:</span>{{prescription.PrescriptionID || 'Loading'}}
                    </li>
                    <li class="clickable" @dblclick="copyToClipboard(prescription.ReferenceNumber)" style="min-width: 120px;">
                        <span>Client Reference Number:</span>{{prescription.ReferenceNumber || 'Loading'}}
                    </li>                
                </ul>
            </div>
            <!-- <div class="floatCenter" v-if="userInfo.role >= 50"> -->
            <div class="floatCenter">
                <ul>
                    <li>
                        <span>ORDER STATUS: </span>
                        <select :disabled="!fullyLoaded" v-model="prescriptionStatus">
                            <option disabled hidden value="">Select</option>
                            <option v-for="(value, key) in orderStatuses" :value="key" :key="key">{{value}}</option>
                        </select>
                        <button class="btn btnSize04 primaryBtn" v-if="fullyLoaded && prescriptionStatus != prescription.Status" @click="updateStatus()">
                            Update
                        </button>    
                    </li>
                </ul>
            </div>
            <div class="floatRight">
                <ul>
                    <li class="clickable" @click="$root.$emit('tray.toggle')">
                        <span>IN TRAY:</span>{{ tray.length }}
                    </li>
                    <li class="clickable" @click="trayRedirect('new')">
                        <span>NEW:</span>{{statistics.statistics.new}}
                    </li>
                    <li class="clickable" @click="trayRedirect('approved')">
                        <span>APPROVED:</span>{{statistics.statistics.approved}}
                    </li>
                </ul>
            </div>
        </div>

        <!--ERRORS-->
        <transition name="slide-down">
            <section v-if="errors.length != 0">
                <div class="infoBox warning">
                    <p v-for="error in errors">
                        {{error}}
                    </p>
                </div>                
            </section>
        </transition>    
        <!--/ERRORS-->

        <!--PRESCRIPTION-->
        <transition name="fade">
        <div v-if="prescription" class="content">
            <section v-if="duplicate && ([2, 4, 5, 7, 8, 9, 10, 11, 1].includes(prescription.Status))" class="notranslate">
                <div class="infoBox warning">
                    <p>
                        There is a possible duplicate order with ID 
                        <a target="_blank" :href="`#/prescription/${duplicate.PrescriptionID}`">{{ duplicate.PrescriptionID }}</a> that has the same customer reference id
                        {{ duplicate.ReferenceNumber }} with
                        status {{ orderStatuses[duplicate.Status] }}.<br />
                        Please investigate by <a target="_blank" :href="`#/prescription/${duplicate.PrescriptionID}`">clicking here</a> before processing.
                    </p>
                </div>
            </section>
            <section v-if="approved">
                <div class="infoBox warning">
                    <p>
                        THIS ITEM HAS ALREADY BEEN APPROVED
                    </p>
                </div>
            </section>
            <section v-if="locked">
                <div class="infoBox error">
                    <p>
                        This item is currently being edited by <b>{{ locked }}</b>
                    
                        <button @click="unlockOrder()" v-if="userInfo.role >= 50" title="Unlock any order locks" class="btn btnSize01 primaryBtn">Unlock</button>
                    </p>
                </div>
            </section>            
            <section class="notranslate card">
                <div class="card-header prescription-info-header">
                    <h3>Prescription Info</h3>
                    <div class="delivery"> 
                        <!-- <a class="flag-eu" href="javascript:;"></a>  -->
                        <img v-if="prescription.UPSAccessPointAddress != 0" style="height: 20px;" src="images/logo/ups_access_point.jpg"/>
                        <img v-else-if="prescription.PaymentMethod != 0" style="height: 20px;" src="images/logo/ups_cod.jpg"/>
                        <img v-else style="height: 20px;" :src="imgMap[prescription.DeliveryID]"/>
                    </div>
                </div>
                <div class="patientInfo card-body">
                    <div class="patient">
                        <ul>
                            <li>
                                <span>Name: </span> 
                                <span style="text-transform: uppercase;" class="high-visibility">{{prescription.Name}}</span>
                            </li>
                            <li>
                                <span>Surname: </span>
                                <span style="text-transform: uppercase;" class="high-visibility">{{prescription.Surname}}</span>
                            </li>
                            <li class="gender" 
                            :class="[prescription.Sex == 'Male' ? 'blue' : prescription.Sex == 'Female' ? 'purple' : prescription.Sex == 'Transgender' ? 'orange' : 'grey']">
                                <span>Gender: </span>
                                <span class="high-visibility">{{prescription.Sex}}</span>
                            </li>
                            <li>
                                <span>Age: </span>
                                <span class="high-visibility">{{prescription.Age}}</span>
                            </li>
                            <li>
                                <span>DOB: </span>
                                <span class="high-visibility">{{prescription.DOB}}</span>
                            </li>                            
                            <li v-bind:class="{ 'highlight-magenta': prescription.DoctorID == 42 }">
                                <span>Prescriber: </span>
                                <span class="high-visibility">{{ prescription.DTitle }} {{prescription.DName}} {{prescription.DSurname}} ({{ doctorTypes[prescription.DoctorType] }}: {{ prescription.GMCNO }})</span>
                            </li>
                            <li>
                                <span>Prescriber Address: </span>
                                <span class="high-visibility"> {{ prescription.DoctorAddress1 }}, {{ prescription.DoctorAddress2 }}, {{ prescription.DoctorAddress3 }}, {{ prescription.DoctorAddress4 }} {{ prescription.DoctorPostCode }} </span>
                            </li>
                            <li>
                                <span>Client: </span>
                                <span class="high-visibility">{{prescription.CompanyName}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="prescription-info">
                        <div class="prescription">
                            <ul>
                                <li><span>Recieved Date: </span>{{timestampToDate(prescription.CreatedDate)}}</li>
                                <li v-if="prescription.Status == 8"><span>Shipped/Supplied Date: </span>{{timestampToDate(prescription.UpdatedDate)}}</li>
                                <li v-if="isCommercial"><span>Commercial Invoice Value: </span>{{ prescription.Repeats }}</li>
                                <li><span>Shipping: </span>Patient has Authorised 3rd Party Carrier</li>
                                <li><span>Courier: </span>{{ prescription.Courier }}</li>
                                <li v-if="prescription.TrackingCode != '' && prescription.TrackingCode != null">
                                    <span>Tracking Code: </span>{{ prescription.TrackingCode }}
                                </li>
                                <!-- <li><span>Prescription Number: </span>{{prescription.PrescriptionID}}</li>
                                <li><span>Reference Number: </span>{{prescription.ReferenceNumber}}</li> -->
                            </ul>
                        </div>
                        <div class="location">
                            <ul>
                                <li><span>Home adress: </span>{{prescription.Address1+' '+prescription.Address2+' '+prescription.Address3+' '+prescription.Address4 +' '+prescription.Postcode}}</li>
                                <li><span>Delivery address: </span>{{prescription.DAddress1+' '+prescription.DAddress2+' '+prescription.DAddress3+' '+prescription.DAddress4+' '+prescription.DPostcode}}
                                    <!-- <a v-if="userInfo.role >= 50" href="javascript:;" class="smallTextBtn tertiaryBtn">Edit</a> -->
                                </li>
                                <li><span>Country: </span>{{ prescription.CountryName }}</li>
                                <li><span>Telephone: </span>
                                    <a :href="`tel:${prescription.Telephone ? prescription.Telephone : prescription.Mobile}`">
                                        {{ prescription.Telephone ? prescription.Telephone : prescription.Mobile }}
                                    </a>
                                </li>
                                <li><span>Email: </span>
                                    <a :href="`mailto:${prescription.Email}`">{{ prescription.Email }}</a>
                                </li>
                                <!--
                                <li><span>UPS access address: </span>(address line x3, city, post code. contry)
                                    <a v-if="userInfo.role >= 50" href="javascript:;" class="smallTextBtn tertiaryBtn">Edit</a>
                                </li>
                                -->
                            </ul>
                        </div>                        
                    </div>
                    <div class="activity">
                        <!-- <h3 style="text-align: center;">Activity Log</h3> -->
                        <ul class="activity-log-wrapper" v-if="activity.length != 0">
                            <h5 class="activity-log-header">Activities on this order</h5>
                            <li class="activity-log-item" v-for="a in activity" :key="a.ActivityID">
                                <div class="activity-action">
                                    {{a.Action}}

                                    <button v-if="(a.Type == 750 || a.Type == 751) && userInfo.role >= 50" 
                                        class="clickable smallTextBtn secondaryBtn"
                                        :disabled="locked"
                                        @click="revert(a)">
                                        Revert
                                    </button>

                                    <button v-if="(a.Type == 750 || a.Type == 751) && userInfo.role < 50 && !a.FirstChange" 
                                        class="clickable smallTextBtn secondaryBtn"
                                        @click="revert(a, true)">
                                        View
                                    </button>

                                    <button v-else-if="(a.Type == 750 || a.Type == 751) && userInfo.role < 50 && a.FirstChange" 
                                        class="clickable smallTextBtn secondaryBtn"
                                        :disabled="locked"
                                        @click="revert(a)">
                                        Revert
                                    </button>
                                </div>
                                <div class="activity-footer">
                                    <span>{{a.Name}}</span><span>{{a.Date}}</span>
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
                <div class="card-header card-header-warning" style="display: flex; justify-content: space-between;">
                    <h3>Sub Orders</h3>
                    <p>This order has multiple sub-orders attached to it</p>
                </div>
                <div class="card-body" :class="[testKits.length > 6 ? 'sub-order-wrapper' : 'sub-order-wrapper-flex']">
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
                            <li :class="[kit.Sex == 'Male' ? 'blue' : kit.Sex == 'Female' ? 'purple' : kit.Sex == 'Transgender' ? 'orange' : 'grey']">
                                <span>Gender:</span>
                                <span class="high-visibility"><b>{{ kit.Sex }}</b></span>
                            </li>
                            <li>
                                <span>DOB:</span>
                                <span class="high-visibility"><b>{{ kit.DOB }}</b></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            </transition>
            <section class="card border-none" :class="[ translate ? '' : 'notranslate' ]">
                <div class="medicineDetails alternate">
                    <ul class="tabs">
                        <li style="margin-left: 0!important;" title="Show list of order products"
                        class="clickable"
                        :class="{'active': activeTab == 'products'}" @click="activeTab = 'products'">
                            <a class="danger" href="javascript:;">Products
                                <span v-if="(prescription.Products.length) > 0" class="badge">{{ prescription.Products.length }}</span>
                            </a>
                        </li> 

                        <li style="margin-left: 0!important;" title="Show Questionnaire"
                        class="clickable"
                        :class="{'active': activeTab == 'questionnaire'}" @click="activeTab = 'questionnaire'">
                            <a class="danger" href="javascript:;">Questionnaire
                                <span v-if="(questionnaire.length) > 0" class="badge">{{ questionnaire.length }}</span>
                            </a>
                        </li> 

                        <li style="margin-left: 0!important;" title="Show medical history"
                        class="clickable"
                        :class="{'active': activeTab == 'history'}" @click="activeTab = 'history'">
                            <a class="danger" href="javascript:;">Medical History
                                <span v-if="(history.length) > 0" class="badge">{{ history.length }}</span>
                            </a>
                        </li> 

                        <li style="margin-left: 0!important;" title="Relates to allergies, medical conditions and notes added by pharmacists."
                        class="clickable"
                        :class="{'active': activeTab == 'notes'}" @click="activeTab = 'notes'">
                            <a class="danger" href="javascript:;">Patient Notes 
                                <span v-if="(notes.critical.length) > 0" class="badge red">{{ notes.critical.length}}</span>
                            </a>
                        </li>    

                        <li title="Relates communication with perscriber and notes sent with perscription" 
                        class="clickable"
                        :class="{'active': activeTab == 'patient'}" @click="activeTab = 'patient'">
                            <a href="javascript:;">Queried Notes 
                                <span v-if="(notes.correspondence.length + notes.information.length) > 0" class="badge red">{{ notes.correspondence.length  + notes.information.length }}</span>
                            </a>
                        </li>

                        <li title="Relates to the current order" 
                        class="clickable"
                        :class="{'active': activeTab == 'order'}" @click="activeTab = 'order'">
                            <a href="javascript:;">Order Notes 
                                <span v-if="(notes.other.length || (prescription.Notes != '' && prescription.Notes != null)) > 0" class="badge red">
                                    {{ notes.other.length + ((prescription.Notes != '' && prescription.Notes != null) ? 1 : 0) }}
                                </span>
                            </a>
                        </li>      

                        <li v-if="!locked" style="margin-right: 0!important;" title="Add new note" class="clickable" @click="openNote()">
                            <a>Add Note</a>
                        </li>
                    </ul>

                    <div class="content" v-if="activeTab == 'products'">
                        <div class="" style="display: flex; justify-content: space-between;">
                            <div></div>
                            <div
                            style="
                            padding-right: 5px;
                            padding-top: 2px;"          
                            >
                                Layout: 
                                <button :class="{ 'active': view.products == 1 }" class="clickable smallTextBtn secondaryBtn" @click="view.products = 1">1</button>
                                <button :class="{ 'active': view.products == 2 }" class="clickable smallTextBtn secondaryBtn" @click="view.products = 2">2</button>
                            </div>
                        </div>

                        <div class="card-body">
                            <div class="medicineTitle" v-for="product in prescription.Products">
                                <div class="fridge-notification" v-if="product.Fridge == 1 && userInfo.role == 20">
                                    FRIDGE PRODUCT
                                </div>
                                <div v-if="view.products == '1'" class="title information" :class="[product.Fridge == 1 && userInfo.role == 20 ? 'mt-20' : '']">    
                                    <!-- <div class="medicineTooltip">
                                        <div class="drug-info">
                                            <b>Formulation:</b> {{product.Units}} |
                                            <b>Quantity:</b> {{ product.Quantity }} |
                                            <b>Packs:</b> {{product.Dosage}}
                                        </div>
                                    </div> -->
                                    <div class="medicine-tooltips">
                                        <div class="medicineTooltip">
                                            <div class="name">Name:</div>
                                            <div class="value">{{product.Description}}</div>
                                        </div>

                                        <div class="medicineTooltip">
                                            <div class="name">Formulation:</div>
                                            <div class="value">{{product.Units}}</div>
                                        </div>

                                        <div class="medicineTooltip">
                                            <div class="name">Quantity:</div>
                                            <div class="value">{{product.Dosage}}</div>
                                        </div>  

                                        <div class="medicineTooltip">
                                            <div class="name">Packs:</div>
                                            <div class="value">{{product.Quantity}}</div>
                                        </div>   
                                    </div>

                                    <div class="medicineName mt-10">
                                        <h4>
                                        (CODE: {{ product.Code }} - {{product.Name}})
                                        <!-- {{product.Description}}  -->
                                        <!-- |<small> ESA Name: {{product.Name}} </small> -->
                                        
                                        </h4>
                                    </div>

                                    <div style="padding: 0; margin-top: 10px;" v-if="product.Fridge == 1 && userInfo.role != 20" class="infoBox warning">
                                        <p>
                                            FRIDGE PRODUCT
                                        </p>
                                    </div>

                                </div>

                                <div class="information" v-if="view.products == '2'" :class="[product.Fridge == 1 && userInfo.role == 20 ? 'mt-30' : '']">
                                    <div style="text-transform: uppercase;">
                                        MEDICINE NAME: <b>{{ product.Description }}</b>
                                        <br>
                                        <b>(CODE: {{ product.Code }} - {{product.Name}})</b>
                                    </div>
                                    <div>
                                        Formulation: <b>{{product.Units}}</b>
                                    </div>
                                    <div>
                                        Quantity: <b>{{product.Dosage}}</b>
                                    </div>                            
                                    <div>
                                        Packs: <b>{{product.Quantity}}</b>
                                    </div>

                                    <div style="padding: 0; margin-top: 5px;" v-if="product.Fridge == 1 && userInfo.role != 20" class="infoBox warning">
                                        <p>
                                            FRIDGE PRODUCT
                                        </p>
                                    </div>

                                </div>

                                <div class="instructions" :class="[product.Fridge == 1 && userInfo.role == 20 ? 'mt-30' : '']">
                                    <p v-html="product.Instructions"/>
                                </div>
                            </div> 
                        </div>                         
                    </div>

                    <div class="content" v-if="activeTab == 'questionnaire'">
                        <div class="medicineQuestionnaire fullwidth p-10" :class="{'fullscreen' : expandedQuestionnaire}">
                            <h2>
                                Questionnaire
                                <span v-if="questionnaire.length != 0" class="language-toggle" @click="translateQuestionnaire()">({{languageText}})</span>
                                <i :class="[ expandedQuestionnaire ? 'fa-compress' : 'fa-expand' ]" class="fa" aria-hidden="true" @click="expandedQuestionnaire = !expandedQuestionnaire"></i>
                            </h2>
                            <table cellpadding="0" cellspacing="0" v-if="!questionnaireLoading">
                                <tr v-if="questionnaire.length != 0 && !loading" v-for="(value, key) in questionnaire" :key="key">
                                    <td>{{value.Question}}</td>
                                    <td>{{value.Answer}}</td>
                                </tr>
                            </table>
                            <div v-else class="dotloader loader-relative" style="">Loading...</div>
                            <div v-if="questionnaire.length == 0 && !loading">
                                This prescription does not have a questionnaire.
                            </div>
                        </div>                             
                    </div>


                    <div class="content" v-if="activeTab == 'history'">
                        <div class="medicineHistory notranslate p-10" style="width: 100%;">
                            <h2>Medical history</h2>
                            <ul @dblclick="redirect(value.PrescriptionID)" v-if="!historyLoading" class="new" v-for="(value, key) in history" :key="key"
                            :title="`Order ${value.PrescriptionID} in status ${orderStatuses[value.Status]}. Double-click to open in new tab.`"
                            style="list-style-type: none;"
                            :class="statusClass(value.Status)">
                                <li v-for="(product, k) in value.Products" class="medicine" :key="k">
                                    <span v-if="k == 0 && (value.Status == 8 || value.Status == 6 || value.Status == 4)"><b>{{ value.ShippedDate }}</b></span>
                                    <a target="_blank" :href="`#/prescription/${value.PrescriptionID}`">{{product.Name}}, {{product.Quantity*product.Dosage}} {{product.Units}}</a>
                                </li>
                                <!-- <li class="date" v-if="value.Status == 8"><b>Shipped/Supplied date: {{value.ShippedDate}}</b></li>
                                <li class="date" v-if="value.Status == 6"><b>Cancelled date: {{value.ShippedDate}}</b></li> -->
                                <!-- <li class="date"><b>Recieved date:</b> {{value.CreatedDate}} 
                                </li> -->
                                <li class="client"><b>Client:</b> {{value.Client}}</li>
                                <li><b>Status:</b> <span class="font-highlight" :class="statusClass(value.Status)">{{ orderStatuses[value.Status] }}</span> </li>
                            </ul>
                            <div v-if="historyLoading" class="dotloader loader-relative" style="">Loading...</div>
                            <div v-if="!historyLoading && history.length == 0">No previous orders available..</div>
                        </div>                            
                    </div>

                    <div class="content" v-if="activeTab == 'notes'">
                        <ul v-if="notes.critical.length > 0" class="critical">
                            <li class="note" v-for="note in notes.critical" :key="note.NoteID">
                                <div class="note-body" v-html="note.Note"/>
                                <div class="note-footer">
                                    <span>{{note.name}} {{note.surname}}</span><span>{{note.CreatedAt}}</span>
                                </div>
                                <div class="note-footer" style="justify-content: flex-end; margin-top: 5px;">
                                    <button @click="deleteNote(note.NoteID)" v-if="userInfo.role >= 30" class="smallTextBtn secondaryBtn" style="font-size: 12px; cursor:pointer;">Delete</button>
                                    <button @click="openNote(note)" v-if="userInfo.role >= 30" class="smallTextBtn secondaryBtn" style="font-size: 12px; cursor:pointer;">Edit</button>
                                </div>
                            </li>
                        </ul>

                        <ul v-else>
                            <li>No patient notes found</li>
                        </ul>
                    </div>

                    <div class="content" v-if="activeTab == 'patient'">
                        <ul v-if="notes.information.length > 0" class="medical">
                            <li class="note" v-for="note in notes.information" :key="note.NoteID">
                                <div class="note-body" v-html="note.Note"/>
                                <div class="note-footer">
                                    <span>{{note.name}} {{note.surname}}</span><span>{{note.CreatedAt}}</span>
                                </div>
                                <div class="note-footer" style="justify-content: flex-end; margin-top: 5px;">
                                    <button @click="deleteNote(note.NoteID)" v-if="userInfo.role >= 30" class="smallTextBtn secondaryBtn" style="font-size: 12px; cursor:pointer;">Delete</button>
                                    <button @click="openNote(note)" v-if="userInfo.role >= 30" class="smallTextBtn secondaryBtn" style="font-size: 12px; cursor:pointer;">Edit</button>
                                </div>
                            </li>
                        </ul>
                        
                        <ul v-if="notes.correspondence.length > 0" class="other">
                            <li class="note" v-for="note in notes.correspondence" :key="note.NoteID">
                                <div class="note-header" v-html="note.Subject"/>
                                <hr>
                                <div class="note-body" v-html="note.Message"/>
                                <hr>
                                <div class="note-footer">
                                    <span>{{note.Name}} {{note.Surname}}</span><span>{{ note.Date }} </span>
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
                                <div class="note-body" v-html="prescription.Notes"/>
                                <div class="note-footer">
                                    <!-- <span>{{note.name}} {{note.surname}}</span><span>{{note.CreatedAt}}</span> -->
                                </div>
                            </li>
                        </ul>

                        <ul v-if="notes.other.length > 0" class="other">
                            <li class="note" v-for="note in notes.other" :key="note.NoteID">
                                <div class="note-body" v-html="note.Note"/>
                                <div class="note-footer">
                                    <span>{{note.name}} {{note.surname}}</span><span>{{note.CreatedAt}}</span>
                                </div>
                                <div class="note-footer" style="justify-content: flex-end; margin-top: 5px;">
                                    <button @click="deleteNote(note.NoteID)" v-if="userInfo.role >= 30" class="smallTextBtn secondaryBtn" style="font-size: 12px; cursor:pointer;">Delete</button>
                                    <button @click="openNote(note)" v-if="userInfo.role >= 30" class="smallTextBtn secondaryBtn" style="font-size: 12px; cursor:pointer;">Edit</button>
                                </div>
                            </li>
                        </ul>

                        <ul v-if="(prescription.Notes == '' || prescription.Notes == null) && notes.other.length == 0">
                            <li>No order notes found</li>
                        </ul>
                    </div>
                </div>
            </section> 
            <section class="card">
                <div class="card-header" style="background: #eff8f830;">  
                    <h3 style="text-align: center;">HR HEALTHCARE Pharmacy, Unit 18, Waters Meeting, Britannia Way, Bolton BL2 2HH, United Kingdom</h3>
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
    import Prescription from './Prescription';

    export default {
        extends: Prescription,

        data: function () {
            return {
                activeTab: 'products',
            }
        },
        methods:{
        }
    }
</script>
