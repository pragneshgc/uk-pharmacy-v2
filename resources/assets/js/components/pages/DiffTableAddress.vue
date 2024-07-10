<template>
    <table class="table table-hover table-diff mt-20">
        <thead>
            <tr>
                <th>
                    Field
                </th>
                <th>
                    Current Value
                </th>
                <th>
                    New Value
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(change, key) in newObject" :key="key">
                <td :class="[oldObject[key] == newObject[key] || (oldObject[key] == null && newObject[key] == '') ? '' : 'row-danger']">
                    {{ alias[key] ? alias[key].title : '' }} 
                </td>
                <td :class="[oldObject[key] == newObject[key] || (oldObject[key] == null && newObject[key] == '') ? '' : 'row-danger']">
                    <span v-if="key == 'DeliveryID'">{{ getCompanyTitle(oldObject[key]) }}</span>
                    <span v-else-if="key == 'DCountryCode'">{{ getCountryTitle(oldObject[key]) }}</span>
                    <span v-else-if="key == 'CountryCode'">{{ getCountryTitle(oldObject[key]) }}</span>
                    <span v-else>{{ oldObject[key] }}</span>
                </td>
                <td :class="[oldObject[key] == newObject[key] || (oldObject[key] == null && newObject[key] == '') ? '' : 'row-danger']">
                    <span v-if="key == 'DeliveryID'">{{ getCompanyTitle(newObject[key]) }}</span>
                    <span v-else-if="key == 'DCountryCode'">{{ getCountryTitle(newObject[key]) }}</span>
                    <span v-else-if="key == 'CountryCode'">{{ getCountryTitle(newObject[key]) }}</span>
                    <span v-else>{{ newObject[key] }}</span>
                </td>
            </tr>

            <tr v-if="newObjectUPS && newObjectUPS.length != 0">
                <td colspan="3">
                    <h3>UPS Access Point Details</h3> 
                </td>
            </tr>

            <tr v-for="(change, key) in newObjectUPS" :key="key">
                <td :class="[oldObjectUPS[key] != newObjectUPS[key] || !(oldObjectUPS[key] == null && newObjectUPS[key] == '') ? 'row-danger' : '']">
                    AP {{ alias[key] ? alias[key].title : '' }}
                </td>
                <td :class="[oldObjectUPS[key] != newObjectUPS[key] || !(oldObjectUPS[key] == null && newObjectUPS[key] == '') ? 'row-danger' : '']">
                    <span v-if="key == 'DeliveryID'">{{ getCompanyTitle(oldObjectUPS[key]) }}</span>
                    <span v-else-if="key == 'DCountryCode'">{{ getCountryTitle(oldObjectUPS[key]) }}</span>
                    <span v-else-if="key == 'CountryCode'">{{ getCountryTitle(oldObjectUPS[key]) }}</span>
                    <span v-else-if="key == 'APNotificationLanguage'">{{ getCountryTitle(oldObjectUPS[key]) }}</span>
                    <span v-else>{{ oldObjectUPS[key] }}</span>
                </td>
                <td :class="[oldObjectUPS[key] != newObjectUPS[key] || !(oldObjectUPS[key] == null && newObjectUPS[key] == '') ? 'row-danger' : '']">
                    <span v-if="key == 'DeliveryID'">{{ getCompanyTitle(newObjectUPS[key]) }}</span>
                    <span v-else-if="key == 'DCountryCode'">{{ getCountryTitle(newObjectUPS[key]) }}</span>
                    <span v-else-if="key == 'CountryCode'">{{ getCountryTitle(newObjectUPS[key]) }}</span>
                    <span v-else-if="key == 'APNotificationLanguage'">{{ getCountryTitle(newObjectUPS[key]) }}</span>
                    <span v-else>{{ newObjectUPS[key] }}</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import PrescriptionColumns from '../../mixins/constants/prescriptionColumns';

    export default {
        mixins: [PrescriptionColumns],
        props: ['oldObject', 'oldObjectUPS', 'newObject', 'newObjectUPS', 'countriesProp', 'companiesProp', 'getDetails'],
        data() {
            return {
                countries: [],
                companies: [],
                loadingCountries: true,
                loadingCompanies: true,
            }
        },
        created() {
            if(this.getDetails){
                this.getCountries();
                this.getCompanies();
            }
        },
        computed: {
            countriesArray(){
                return this.getDetails ? this.countries : this.countriesProp;
            },
            companiesArray(){
                return this.getDetails ? this.companies : this.companiesProp;
            },
            loaded(){
                return !this.loadingCountries && !this.loadingCompanies;
            }
        },
        watch: {
            loaded(){
                this.$emit('difftable.loaded');
            }
        },
        methods: {
            getCountries(){
                axios.get('/countries')
                .then((response) => {
                    this.countries = response.data.data;   
                })
                .catch((error) => {
                    console.warn(error.response.data.message);
                    this.$emit('difftable.error');
                })
                .finally(() => {
                    this.loadingCountries = false;
                })       
            },
            getCompanies(){
                axios.get('/delivery-companies')
                .then((response) => {
                    this.companies = response.data.data;  
                })
                .catch((error) => {
                    console.warn(error.response.data.message);
                    this.$emit('difftable.error');
                })
                .finally(() => {
                    this.loadingCompanies = false;
                })     
            },
            /**
             * Fetches country title by country id
             */
            getCountryTitle(id, countries = false){
                let title = 'Unknown';

                if(!countries){
                    countries = this.countriesArray;
                }

                //this is not very efficient
                countries.forEach((country) => {
                    if(country.CountryID == id){
                        title = country.Name;
                    }
                })

                return title;
            },
            /**
             * Fetches company title by SettingID id
             */
            getCompanyTitle(id, companies = false){
                let title = 'Unknown';

                if(!companies){
                    companies = this.companiesArray;
                }

                companies.forEach((company) => {
                    if(company.SettingID == id){
                        title = company.Name;
                    }
                })

                return title;
            },                
        },
    }
</script>