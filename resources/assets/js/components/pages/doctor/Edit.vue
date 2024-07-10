<template>
    <div v-if="visible">
        <div class="backdrop" @click="close()">
        </div>
        <div class="modal">
            <div v-if="!loading" class="modal-header">

            </div>
            <transition name="fade">
                <form @submit.prevent="save" class="pxp-form mb-20">
                    <div class="form-column">
                        <h3>Doctor Details</h3>
                        <!-- <div v-if="columnHome.includes(value)" class="form-group form-group-2" v-for="(key, value) in details.order" :key="value">
                            <label :for="key">{{alias[value]}}</label>
                            <input v-if="!['CountryCode', 'DCountryCode', 'DeliveryID', 'Notes'].includes(value)" class="" :name="key" :placeholder="''" v-model="details.order[value]">
                            <select v-else-if="['DCountryCode', 'CountryCode'].includes(value)" v-model="details.order[value]">
                                <option v-for="country in countries" :value="country.CountryID">{{country.Name}}</option>
                            </select>
                            <select v-else-if="['DeliveryID'].includes(value)" v-model="details.order[value]">
                                <option v-for="company in companies" :value="company.SettingID">{{company.Name}}</option>
                            </select>
                        </div> -->
                    </div>
                </form>

                <button @click="back()" class="btn btnSize01 tertiaryBtn bigButton big-square-button">
                    <span>
                        Back
                    </span> 
                </button>
            <div v-if="loading" class="loader" style="">Loading...</div>
            <span class="close" @click="close()">X</span>
        </div>
    </div>
</template>

<script>
    import Error from '../../../mixins/errors';

    export default {
        data: function () {
            return {
                visible: true,
                loading: false,
            }
        },
        computed:{
            
        },
        mounted() {
            this.$root.$on('doctor.close.all', this.close);
            this.$root.$on('doctor.edit', (id) => {
                this.visible = true;
            });
        },
        destroyed() {
            this.$root.$off('doctor.close.all');
            this.$root.$off('doctor.edit');
        },
        methods:{
            close(){
                this.visible = false;
            },
            save(){

            },
            submit(){

            },
            back(){

            }
        }
    }
</script>
