<template>
    <transition name="fade">
        <div class="esa-modal" v-if="show.modal">
            <div class="backdrop" @click="close()">
            </div>
            <div class="modal" :class="modalClass">
                <div class="modal-header">
                    <p class="heading lead">
                        <b>Add a new products by importing via csv</b>
                    </p>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="white-text">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        <div class="pre-import" v-if="importStage == 0">
                            <input type="file" name="tracking" id="file" ref="file" @change="attachFile"/>

                            <button class="btn btnSize01 secondaryBtn" @click="inputClick">
                                Start Import
                            </button>

                            <a href="/download/product-import-template">
                                <button class="btn btnSize01 secondaryBtn ml-10">
                                    Download Import Template
                                </button>
                            </a>
                        </div>

                        <div class="import" v-else-if="importStage == 1" style="width: 100%; height: 100%;">
                            <h3 class="text-center m-10">
                                Importing file "{{ inputText }}"
                            </h3>

                            <div style="overflow: scroll; width: 100%;">
                                <table v-show="data.data.length >= 1" class="table table-hover">
                                    <thead class="primary-color text-white">
                                        <tr>
                                            <th v-for="(value, key) in data.data[0]" :key="key" style="white-space: nowrap !important;">                               
                                                {{key}}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in data.data" :key="item[Object.keys(item)[0]]">
                                            <td v-for="(value, key) in item" :key="key" style="text-align: center;">
                                                <span v-html="value"></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="post-import" v-else-if="importStage == 2">
                            <h3 class="text-center m-10" v-if="errors.length == 0">
                                {{data.data.length}} products imported successfully
                            </h3>
                            <ul v-else>
                                <li class="text-center mb-5">
                                    <h3>{{data.data.length - errors.length}} out of <b>{{ data.data.length }}</b> products were imported</h3>
                                </li>
                                <li v-for="(item, key) in errors" :key="key" v-html="item" />
                            </ul>
                        </div>
                    </slot>
                </div>
                <div class="modal-footer">
                    <button v-if="importStage == 1" class="btn btnSize01 secondaryBtn" @click="importFile()">Confirm import</button>
                    <button v-if="importStage == 1" class="btn btnSize01 secondaryBtn" @click="clear()">Back</button>
                    <button v-if="importStage == 2" class="btn btnSize01 secondaryBtn" @click="clear()">New Import</button>
                    <button @click="close()" class="btn btnSize01 secondaryBtn bigButton">Cancel</button>
                    <slot name="footer"></slot>
                </div>
                <!-- <div v-if="loading" class="loader" style="">Loading...</div> -->
                <span class="close" @click="close()">X</span>
            </div>
        </div>
    </transition>
</template>

<script>
import Modal from '../../Modal.vue';

export default {
    extends: Modal,
    data() {
        return {
            file: '',
            importing: false,
            importStage: 0,
            errors: [],
            data: {
                current_page: this.$route.query.p || 1,
                to: 1,
                data:{}
            },
        }
    },
    computed: {
        inputText(){
            return this.file != '' ? this.file.name : 'Upload a file';
        },
    },
    methods: {
        inputClick(){
            document.getElementById('file').click();
        },
        attachFile(){
            let files = document.getElementById('file').files;
            if (!files.length) {
                return;
            };

            this.file = files[0];
            this.importStage = 1;

            this.importing = true;

            let formData = new FormData();
            formData.append('file', this.file);

            axios.post('/inventory/products/import-preview', formData, {headers: {'Content-type': 'multipart/form-data'}})
            .then((response) => {
                this.data = response.data.data;
            })
            .catch((error) => {

            });
        },
        importFile(){
            let formData = new FormData();
            formData.append('file', this.file);

            axios.post('/inventory/products/import-finish', formData, {headers: {'Content-type': 'multipart/form-data'}})
            .then((response) => {
                this.importStage = 2;



                if(response.data.data.length > 0){
                    this.errors = response.data.data;
                }
            })
            .catch((error) => {
            });
        },
        clear(){
            this.file = '';
            this.importing = false;
            this.importStage = 0;
            this.errors = [];
        },
        close(){
            this.show.modal = false;
            this.clear();
        }
    },
}
</script>