<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>Settings</h3>
            </div>
            <div class="card-body">
                <div class="settings">
                    <ul class="tabs">
                        <li v-if="userInfo.role >= 50" style="margin-left: 0!important;"
                            title="Global settings applied across the application."
                            :class="{ 'active': activeTab == 'settings' }" @click="activeTab = 'settings'">
                            <a class="danger" href="javascript:;">Global Settings</a>
                        </li>

                        <li v-if="userInfo.role >= 50" title="Delivery settings applied across all orders"
                            :class="{ 'active': activeTab == 'delivery' }" @click="activeTab = 'delivery'">
                            <a href="javascript:;">Delivery Settings </a>
                        </li>

                        <li v-if="userInfo.role >= 50"
                            title="THIS IS THE MAIN COMPANY DETAIL. IF YOU MAKE CHANGES HERE IT WILL AFFECT THE SYSTEM I.E. DELIVERY NOTE"
                            :class="{ 'active': activeTab == 'details' }" @click="activeTab = 'details'">
                            <a href="javascript:;">Company Details </a>
                        </li>

                        <li v-if="userInfo.role >= 50" title="Manual XML Import"
                            :class="{ 'active': activeTab == 'import' }" @click="activeTab = 'import'">
                            <a href="javascript:;">Manual XML Import</a>
                        </li>

                        <li title="Local Application Settings" :class="{ 'active': activeTab == 'application' }"
                            @click="activeTab = 'application'">
                            <a href="javascript:;">Local Settings</a>
                        </li>

                        <li title="Local Application Settings" :class="{ 'active': activeTab == 'downloads' }"
                            @click="activeTab = 'downloads'">
                            <a href="javascript:;">Documents</a>
                        </li>

                        <li v-if="userInfo.role >= 50" title="Dev Sites" :class="{ 'active': activeTab == 'devsites' }"
                            @click="activeTab = 'devsites'">
                            <a href="javascript:;">Dev Sites</a>
                        </li>
                    </ul>

                    <div class="content pxp-form" v-if="activeTab == 'settings'">
                        <p class="mb-10">
                            These settings affect how many records are shown per page, how many orders a dispenser can
                            assign to themselves, etc.
                        </p>
                        <p class="mb-10"><b>These are global settings and affect all users!</b></p>
                        <hr class="mb-10">

                        <div class="form-column">
                            <div class="form-group form-group-2" v-for="setting in globalSettings" :key="setting.SettingID">
                                <label :for="setting.SettingID">{{ setting.Name }}</label>
                                <input :disabled="!types[setting.Type]?.enabled" v-model="update[setting.SettingID]"
                                    :type="types[setting.Type]?.type" :name="setting.SettingID" class="form-control mb-3"
                                    :placeholder="setting.Name">
                                <div v-if="errors[setting.Name]" class="invalid-feedback d-block">{{ errors[setting.Name][0]
                                }}</div>
                            </div>
                        </div>

                        <div class="form-group form-group-2">
                            <button class="btn btnSize02 secondaryBtn" @click="updateGlobalSettings()">
                                Update
                            </button>
                        </div>
                    </div>

                    <div class="content pxp-form" v-if="activeTab == 'delivery'">
                        <p class="mb-10">
                            These settings affect the API connection with various delivery companies
                        </p>
                        <p class="mb-10"><b>These are global settings and affect the entire application!</b></p>
                        <hr class="mb-10">

                        <div class="form-group form-group-2" v-for="setting in deliveryOptions" :key="setting.SettingID">
                            <label :for="setting.SettingID">{{ setting.Name }}</label>
                            <input v-model="update[setting.SettingID]" :type="types[setting.Type].type"
                                :name="setting.SettingID" class="form-control mb-3" :placeholder="setting.Name">
                            <div v-if="errors[setting.Name]" class="invalid-feedback d-block">{{ errors[setting.Name][0] }}
                            </div>
                        </div>

                        <div class="form-group form-group-2">
                            <button class="btn btnSize02 secondaryBtn" @click="updateGlobalSettings()">
                                Update
                            </button>
                        </div>
                    </div>

                    <div class="content pxp-form pxp-form-long" v-if="activeTab == 'details'">
                        <div class="infoBox warning mb-10">
                            THIS IS THE MAIN COMPANY DETAIL. IF YOU MAKE CHANGES HERE IT WILL AFFECT THE SYSTEM I.E.
                            DELIVERY NOTE
                        </div>

                        <div class="form-group form-group-2" style="width: 50%;"
                            v-for="(setting, key) in companySettingsUpdate" :key="key" v-if="!hiddenFields.includes(key)">
                            <label :for="key">{{ key }}</label>
                            <input v-model="companySettingsUpdate[key]" :name="key" class="form-control mb-3"
                                :placeholder="key">
                            <div v-if="errors[key]" class="invalid-feedback d-block">{{ errors[key][0] }}</div>
                        </div>

                        <div class="form-group form-group-2">
                            <button class="btn btnSize02 secondaryBtn" @click="updateCompanySettings()">
                                Update
                            </button>
                        </div>
                    </div>

                    <div class="content" v-if="activeTab == 'import'">
                        <div class="infoBox warning">
                            PLEASE, DOUBLE CHECK THE XML DATA BEFORE IMPORTING!
                        </div>

                        <div class="input-container mt-20">
                            <input type="file" name="tracking" id="file" ref="file" accept=".xml" @change="attachFile" />
                            <div class="input-mask" @click="inputClick">
                                <button class="browse-btn">
                                    {{ buttonText }}
                                </button>
                                <span class="file-info">{{ inputText }}</span>
                            </div>
                        </div>

                        <section class="text-center infoBox success mt-10" v-if="status != ''" v-html="status" />

                        <section class="text-center">
                            <button :disabled="importing || file == ''" class="btn btnSize01 tertiaryBtn bigButton mt-10"
                                @click="upload">
                                <div v-if="importing" class="loader" style="">Loading...</div>
                                <span v-else>Import</span>
                            </button>
                        </section>
                    </div>

                    <div class="content pxp-form" v-if="activeTab == 'application'">
                        <p class="mb-10">
                            Make sure the name of the printer is same as reported by system. If not the application will use
                            the systems default printer.
                        </p>
                        <p class="mb-10"><b>These settings only affect the local PC, and any user using the local PC</b></p>
                        <hr class="mb-10">

                        <div class="form-column">
                            <div class="form-group form-group-2" v-if="!printAppOnline">
                                <label for="labelPrinter">Label Printer</label>
                                <input v-model="applicationSettings.labelPrinter" type="text" id="labelPrinter"
                                    class="form-control mb-3" placeholder="Default system printer">
                            </div>

                            <div class="form-group form-group-2" v-else>
                                <label for="labelPrinter">Label Printer</label>
                                <select name="labelPrinter" v-model="applicationSettings.labelPrinter" id="labelPrinter"
                                    placeholder="Default system printer">
                                    <option value="">Default</option>
                                    <option v-for="(value, key) in printAppOnline" :key="key" :value="value">{{ value }}
                                    </option>
                                </select>
                            </div>

                            <div class="form-group form-group-2" v-if="!printAppOnline">
                                <label for="deliveryNotePrinter">Delivery Note Printer</label>
                                <input v-model="applicationSettings.deliveryNotePrinter" type="text"
                                    id="deliveryNotePrinter" class="form-control mb-3" placeholder="Default system printer">
                            </div>

                            <div class="form-group form-group-2" v-else>
                                <label for="labelPrinter">Delivery Note Printer</label>
                                <select name="deliveryNotePrinter" v-model="applicationSettings.deliveryNotePrinter"
                                    id="deliveryNotePrinter" placeholder="Default system printer">
                                    <option value="">Default</option>
                                    <option v-for="(value, key) in printAppOnline" :key="key" :value="value">{{ value }}
                                    </option>
                                </select>
                            </div>

                            <div class="form-group form-group-2">
                                <button class="btn btnSize02 secondaryBtn" @click="updateApplicationSettings()">
                                    Update
                                </button>
                            </div>

                            <hr class="mb-10" v-if="userInfo.role >= 50">

                            <div v-if="userInfo.role >= 50" class="form-group form-group-2">
                                <a href="/download/printer">
                                    <button class="btn btnSize02 secondaryBtn">
                                        Download printer application <small>(0.3.0)</small>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="content pxp-form" v-if="activeTab == 'downloads'">
                        <p class="mb-10">
                            Below you can download or view any pharmacy related document
                        </p>
                        <hr>
                        <br>
                        <ul class="list-group">
                            <li class="list-group-item">
                                <p>Blank Pathology Form (<a target="_blank" href="/download/form">download</a>/<a
                                        target="_blank" href="/view/form">view</a>)</p>
                            </li>
                            <!-- <li class="list-group-item">
                                <p>Blank Prescription (<a target="_blank" href="/download/prescription">download</a>/<a target="_blank" href="/view/prescription">view</a>)</p>
                            </li> -->
                        </ul>
                    </div>

                    <div class="content pxp-form" v-if="activeTab == 'devsites'">
                        <p class="mb-10">
                            Below is a list of all active dev sites
                        </p>
                        <hr>
                        <br>
                        <ul class="list-group">
                            <li class="list-group-item"><a href="https://old.esasys.co.uk">old.esasys.co.uk - Old ESA</a>
                            </li>
                            <li class="list-group-item"><a href="https://dev.esasys.co.uk">dev.esasys.co.uk - Old ESA
                                    Dev</a></li>
                            <li class="list-group-item"><a href="https://pharmacist.4sm-dev.xyz/">pharmacist.4sm-dev.xyz -
                                    ESA Dev</a></li>
                            <li class="list-group-item"><a href="https://inventory.4sm-dev.xyz">inventory.4sm-dev.xyz -
                                    Inventory Dev</a></li>
                            <li class="list-group-item"><a href="https://pxp.4sm-dev.xyz">pxp.4sm-dev.xyz - PXP Dev</a></li>
                            <!-- <li class="list-group-item">
                                <p>Blank Prescription (<a target="_blank" href="/download/prescription">download</a>/<a target="_blank" href="/view/prescription">view</a>)</p>
                            </li> -->
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    </div>
</template>
<script>
import Error from '../../../mixins/errors';

export default {
    mixins: [Error],
    data() {
        return {
            activeTab: userInfo.role < 50 ? 'application' : 'settings',
            settings: [],
            companySettings: [],
            applicationSettings: localStorage.getItem('settings.application') ? JSON.parse(localStorage.getItem('settings.application')) : { labelPrinter: 'ZDesigner GK420d', deliveryNotePrinter: '' },
            types: {
                1: {
                    name: 'Records Per Page',
                    enabled: true,
                    type: 'number',
                },
                2: {
                    name: 'Delivery Options',
                    enabled: true,
                    type: 'text',
                },
                3: {
                    name: 'Dispenser Limit',
                    enabled: true,
                    type: 'number',
                },
                5: {
                    name: 'PXP Status (LIVE or OFF)',
                    enabled: false,
                    type: 'switch',
                },
                900: {
                    name: 'Hidden',
                    enabled: false,
                    type: 'text',
                }
            },
            hiddenFields: ['ClientID'],
            userInfo: userInfo,
            errors: {},
            update: {},
            companySettingsUpdate: {},
            file: '',
            status: '',
            importing: false,
            printAppOnline: false,
        }
    },
    computed: {
        globalSettings() {
            return this.settings.filter(setting => setting.Type != 2);
        },
        deliveryOptions() {
            return this.settings.filter(setting => setting.Type == 2);
        },
        inputText() {
            return this.file != '' ? this.file.name : 'Upload XML';
        },
        buttonText() {
            return this.file != '' ? 'Importing' : 'Upload';
        }
    },
    mounted() {
        this.getSettings();
        this.getCompanySettings();
        this.getPrinterList();
    },
    methods: {
        getSettings() {
            axios.get('/settings')
                .then((response) => {
                    this.settings = response.data.data;
                    this.settings.forEach(setting => {
                        this.update[setting.SettingID] = setting.Value;
                    });
                })
                .catch((error) => {
                    this.postError(error.data.data);
                })
        },
        getCompanySettings() {
            axios.get('/settings/company')
                .then((response) => {
                    this.companySettings = response.data.data;
                    this.companySettingsUpdate = JSON.parse(JSON.stringify(this.companySettings));
                })
                .catch((error) => {
                    this.postError(error.data.data);
                })
        },
        getPrinterList() {
            axios.get('http://localhost:63020')
                .then((response) => {
                    this.printAppOnline = response.data;
                })
                .catch((error) => {
                    this.printAppOnline = false;
                })
        },
        updateApplicationSettings() {
            this.$swal({
                title: 'Are you sure you want to update local application settings?',
                text: "Make sure the values you are changing are correct!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update local application settings!'
            }).then((result) => {
                if (result.value) {
                    localStorage.setItem('settings.application', JSON.stringify(this.applicationSettings))
                    this.postSuccess('Application settings updated!');
                }
            })
        },
        updateGlobalSettings() {
            this.$swal({
                title: 'Are you sure you want to update global application settings?',
                text: "Make sure the values you are changing are correct!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update global application settings!'
            }).then((result) => {
                if (result.value) {
                    axios.patch('/settings', this.update)
                        .then((response) => {
                            this.postSuccess('Global settings updated!');
                        })
                        .catch((error) => {
                            this.postError(error.data.data);
                        })
                }
            })
        },
        updateCompanySettings() {
            this.$swal({
                title: 'Are you sure you want to update company settings?',
                text: "Make sure the values you are changing are correct!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update company settings!'
            }).then((result) => {
                if (result.value) {
                    axios.patch('/settings/company', this.companySettingsUpdate)
                        .then((response) => {
                            this.postSuccess('Company settings updated!');
                        })
                        .catch((error) => {
                            this.postError(error.data.data);
                        })
                }
            })
        },
        //import
        inputClick() {
            document.getElementById('file').click();
        },
        attachFile() {
            let files = document.getElementById('file').files;
            if (!files.length) {
                return;
            };

            this.file = files[0];
        },
        upload() {
            this.importing = true;
            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('option', this.option);

            axios.post('/import/xml', formData, { headers: { 'Content-type': 'multipart/form-data' } })
                .then((response) => {
                    this.status = response.data.message;
                    this.postSuccess('XML imported successfully');
                    document.getElementById("file").value = '';
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                    document.getElementById("file").value = '';
                })
                .finally(() => {
                    this.file = '';
                    this.importing = false;
                })
        }
    },
}
</script>
