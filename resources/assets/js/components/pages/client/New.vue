<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>New Client</h3>
            </div>
            <!-- Grid Row -->
            <div class="card-body">
                <form class="text-center p-5" v-on:submit.prevent="save">
                    <div class="pxp-form wow fadeIn" style="height: auto;">
                        <div class="form-row">
                            <h3 class="m-10">General Information</h3>
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="CompanyName">Company Name <small><span>(required)</span> shows on In-tray, Invoice page</small></label>
                                <input name="CompanyName" v-model="data.CompanyName" autocomplete="off" type="text"  placeholder="Company Name" class="form-control">
                            </div>
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="TradingName">Trading Name <small>(shows on printed prescription)</small></label>
                                <input name="TradingName" v-model="data.TradingName" autocomplete="off" type="text"  placeholder="Trading Name" class="form-control">
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
                                <label for="ITName">Technical Name</label>
                                <input name="ITName" v-model="data.ITName" autocomplete="off" type="text"  placeholder="Technical Name" class="form-control">
                            </div>
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="ITEmail">Technical Email</label>
                                <input name="ITEmail" v-model="data.ITEmail" autocomplete="off" type="text"  placeholder="Technical Email" class="form-control">
                            </div>
                        </div>

                        <div class="form-column"/>

                        <div class="form-row">
                            <h3 class="m-10">Address Information</h3>
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

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="CountryID">Country</label>
                                <select class="browser-default custom-select" v-model="data.CountryID" name="CountryID">
                                    <option v-for="country in countries" :key="country.CountryID" :value="country.CountryID">{{ country.Name }}</option>
                                </select>                                    
                            </div> 
                        </div>

                        <div class="form-row">
                            <h3 class="m-10">Company Information</h3>
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
                                <label for="GMCNO">GPHC Number</label>
                                <input name="GMCNO" v-model="data.GMCNO" autocomplete="off" type="text"  placeholder="GPHC Number" class="form-control">
                            </div>
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="CompanyNumber">Company Number</label>
                                <input name="CompanyNumber" v-model="data.CompanyNumber" autocomplete="off" type="text"  placeholder="Company Number" class="form-control">
                            </div>
                        </div>

                       <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="CreditLimit">Credit Limit</label>
                                <input name="CreditLimit" v-model="data.CreditLimit" autocomplete="off" type="text"  placeholder="Credit Limit" class="form-control">
                            </div>
                        </div>

                       <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="IP">IP</label>
                                <input name="IP" v-model="data.IP" autocomplete="off" type="text"  placeholder="IP" class="form-control">
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

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="VAT">VAT</label>
                                <input name="VAT" v-model="data.VAT" autocomplete="off" type="text"  placeholder="VAT" class="form-control">
                            </div>
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Notes">Notes</label>
                                <textarea style="min-width: 300px; min-height: 60px; line-height: 1;" placeholder="Add notes for prescriber here" 
                                v-model="data.Notes" class="form-control tBoxSize02"></textarea>                                 
                            </div> 
                        </div>   

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Additional Comments">Additional Comments</label>
                                <textarea style="min-width: 300px; min-height: 60px; line-height: 1;" placeholder="Additional Comments" 
                                v-model="data.AdditionalComment" class="form-control tBoxSize02"></textarea>                                 
                            </div> 
                        </div> 

                        <div class="form-column"/>

                        <div class="form-row">
                            <h3 class="m-10">API Information</h3>
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Username">API Username</label>
                                <input name="Username" v-model="data.Username" autocomplete="off" type="text"  placeholder="Username" class="form-control">
                            </div>
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="Password">API Password</label>
                                <input name="Password" v-model="data.Password" autocomplete="off" type="text"  placeholder="Password" class="form-control">
                            </div>
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="ReturnURL">Return URL</label>
                                <input name="ReturnURL" v-model="data.ReturnURL" autocomplete="off" type="text"  placeholder="Return URL" class="form-control">
                            </div>
                        </div>
                        
                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="ReturnUsername">API Return Username</label>
                                <input name="ReturnUsername" v-model="data.ReturnUsername" autocomplete="off" type="text"  placeholder="Return Username" class="form-control">
                            </div>
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="ReturnPassword">API Return Password</label>
                                <input name="ReturnPassword" v-model="data.ReturnPassword" autocomplete="off" type="text"  placeholder="Return Password" class="form-control">
                            </div>
                        </div>

                        <div class="form-column">
                            <div class="form-group form-group-2">
                                <label for="APIKey">API Key</label>
                                <input :disabled="true" name="APIKey" v-model="data.APIKey" autocomplete="off" type="text"  placeholder="API Key" class="form-control">
                            </div>
                        </div>
                    </div>

                    <button class="btn btnSize01 secondaryBtn" type="submit">Save</button>
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
            }
        },
        mounted() {
            if(userInfo.id != this.$route.params.id && userInfo.role < 50){
                this.$router.push('/notallowed');
            } else {
                this.getCountries();
            }
        },
        computed: {
            postUrl: function(){
                return '/clients';
            },
        },
        methods: {
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
            save: function(){
                this.loading = true;

                axios.post(this.postUrl, this.data)
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
                })
            },
        }
    }
</script>
