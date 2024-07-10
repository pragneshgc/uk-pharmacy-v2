<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>Prescriber details</h3>
            </div>
            <!-- Grid Row -->
            <div class="card-body">
                <form class="text-center p-5" v-on:submit.prevent="update">
                    <div class="pxp-form" style="height: auto;">
                        <div class="form-row">
                            <h3 class="m-10">Basic Information</h3>
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Name">Name</label>
                                <input name="Name" v-model="data.Name" autocomplete="off" type="text"  placeholder="Name" class="form-control">
                            </div>
                        </div>
                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Surname">Surname</label>
                                <input name="Surname" v-model="data.Surname" autocomplete="off" type="text"  placeholder="Surname" class="form-control">
                            </div>
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="ClientID">Prescriber Registration Type</label>
                                <select class="browser-default custom-select" v-model="data.DoctorType" name="DoctorType">
                                    <option :value="0" disabled>Select Prescriber Registration Type</option>
                                    <option :value="1">GMC</option>
                                    <option :value="2">EU</option>
                                    <option :value="3">GPhC</option>
                                    <option :value="4">Test</option>
                                    <option :value="5">IMC</option>
                                </select>                                    
                            </div> 
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="GMCNO">Registration Number</label>
                                <input name="GMCNO" v-model="data.GMCNO" autocomplete="off" type="text"  placeholder="Registration Number" class="form-control">
                            </div>
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="MedicalInsuranceNo">Medical insurance number</label>
                                <input name="MedicalInsuranceNo" v-model="data.MedicalInsuranceNo" autocomplete="off" type="text"  placeholder="Medical insurance number" class="form-control">
                            </div>
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="CompanyName">Company Name</label>
                                <input name="CompanyName" v-model="data.CompanyName" autocomplete="off" type="text"  placeholder="Company Name" class="form-control">
                            </div>
                        </div>
                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Title">Contact Title</label>
                                <input name="Title" v-model="data.Title" autocomplete="off" type="text"  placeholder="Contact Title" class="form-control">
                            </div>
                        </div>
                        
                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Status">Status</label>
                                <select class="browser-default custom-select" v-model="data.Status" name="Status">
                                    <option :value="0">Inactive</option>
                                    <option :value="1">Active</option>
                                </select>                                    
                            </div> 
                        </div>

                        <div class="form-row">
                            <h3 class="m-10">Address Information</h3>
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="CountryID">Country</label>
                                <select class="browser-default custom-select" v-model="data.CountryID" name="CountryID">
                                    <option v-for="country in countries" :key="country.CountryID" :value="country.CountryID">{{ country.Name }}</option>
                                </select>                                    
                            </div> 
                        </div>
                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Address1">Address Line 1</label>
                                <input name="Address1" v-model="data.Address1" autocomplete="off" type="text"  placeholder="Address Line 1" class="form-control">
                            </div>
                        </div>
                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Address2">Address Line 2</label>
                                <input name="Address2" v-model="data.Address2" autocomplete="off" type="text"  placeholder="Address Line 2" class="form-control">
                            </div>
                        </div>
                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Address3">Address Line 3</label>
                                <input name="Address3" v-model="data.Address3" autocomplete="off" type="text"  placeholder="Address Line 3" class="form-control">
                            </div>
                        </div>
                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Address4">Address Line 4</label>
                                <input name="Address4" v-model="data.Address4" autocomplete="off" type="text"  placeholder="Address Line 4" class="form-control">
                            </div>
                        </div>
                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Postcode">Postcode</label>
                                <input name="Postcode" v-model="data.Postcode" autocomplete="off" type="text"  placeholder="Postcode" class="form-control">
                            </div>
                        </div>

                        <div class="form-row">
                            <h3 class="m-10">Contact & Login Information</h3>
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Telephone">Telephone</label>
                                <input name="Telephone" v-model="data.Telephone" autocomplete="off" type="text"  placeholder="Telephone" class="form-control">
                            </div>
                        </div>
                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Mobile">Mobile</label>
                                <input name="Mobile" v-model="data.Mobile" autocomplete="off" type="text"  placeholder="Mobile" class="form-control">
                            </div>
                        </div>
                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Email">Email</label>
                                <input name="Email" v-model="data.Email" autocomplete="off" type="text"  placeholder="Email" class="form-control">
                            </div>
                        </div>
                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Username">Username</label>
                                <input name="Username" v-model="data.Username" autocomplete="off" type="text"  placeholder="Username" class="form-control">
                            </div>
                        </div>
                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Password">Password</label>
                                <input name="Password" v-model="data.Password" autocomplete="off" type="text"  placeholder="Password" class="form-control">
                            </div>
                        </div>
                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Notes">Notes</label>
                                <textarea style="min-width: 300px; min-height: 60px; line-height: 1;" placeholder="Add notes for prescriber here" 
                                v-model="data.Notes" class="form-control tBoxSize02"></textarea>                                 
                            </div>
                        </div>   
                        <hr>

                        <div class="prescriber__signature-upload" style="display: inline-block;" @click="inputClick">
                            <h4>Prescriber Signature</h4>
                            <img style="width: 300px" class="mt-10" :src="imageSrc" alt="">
                            <input type="file" name="tracking" id="file" ref="file" accept=".jpg, .jpeg, .png" @change="attachFile"/>
                            <div class="input-mask mt-10">
                                <!-- <button type="button" class="browse-btn">
                                    New Signature
                                </button> -->
                                <span class="file-info">{{inputText}}</span>
                            </div>
                        </div>
                        <br>
                        <button @click="file = ''" v-if="file!=''" class="btn btnSize01 secondaryBtn" type="button">Cancel</button>

                    </div>

                    <button class="btn btnSize01 secondaryBtn mt-10" type="submit">Update</button>
                </form>
            </div>
            <!--Grid row-->                    
        </section>
    </div>
</template>

<script>
    import Error from '../../../mixins/errors'

    export default {
        mixins: [ Error ],
        data: function () {
            return {
                data: {},
                countries: [],
                errors: {},
                loading: false,
                userInfo: userInfo,
                file: '',
                fileDataURL: '',
            }
        },
        mounted() {
            if(userInfo.id != this.$route.params.id && userInfo.role < 50){
                this.$router.push('/notallowed');
            } else {
                this.getData();
                this.getCountries();
            }
        },
        computed: {
            inputText(){
                return this.file != '' ? this.file.name : 'Click to upload a new signature';
            },
            imageSrc(){
                if(this.file == ''){
                    return `/doctors/${this.data.DoctorID}/signature`;
                } else {
                    return URL.createObjectURL(this.file);
                }
            },
            dataUrl: function(){
                return '/doctors/'+this.$route.params.id;
            },
            postUrl: function(){
                return '/doctors/'+this.$route.params.id;
            },
        },
        methods: {
            getData: function(){
                this.loading = true;

                axios.get(this.dataUrl)
                .then((response) => {
                    this.data = response.data.data;
                })
                .catch((error) => {
                    this.reportError(error);
                })
                .finally(() => {
                    this.loading = false;
                });  
            },
            /**
             * Filters
             */
            getCountries(){
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
            update: function(){
                this.loading = true;

                if(this.file != ''){
                    this.uploadSignature();
                }

                axios.patch(this.postUrl, this.data)
                .then((response) => {
                    this.postSuccess(response.data.message);
                    this.errors = {};
                })
                .catch((error) => {
                    this.errors = error.response.data.errors;
                    this.postError(error.response.data.message);
                })   
                .finally(() => {
                    this.loading = false;
                    this.getData();
                });  
            },
            inputClick(){
                document.getElementById('file').click();
            },
            attachFile(){
                let files = document.getElementById('file').files;
                if (!files.length) {
                    return;
                };

                this.file = files[0];
            },
            uploadSignature(){
                let formData = new FormData();
                formData.append('image', this.file);

                axios.post(`/doctors/${this.$route.params.id}/signature`, formData, {headers: {'Content-type': 'multipart/form-data'}})
                .then((response) => {
                    this.postSuccess('Signature updated');
                    document.getElementById("file").value = '';
                    this.file = '';
                })
                .catch((error) => {
                    this.postSuccess('Failed to update signature');
                    this.file = '';
                });                
            }
        }
    }
</script>
