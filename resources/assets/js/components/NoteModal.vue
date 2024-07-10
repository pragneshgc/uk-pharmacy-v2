<template>
    <transition name="fade">
        <div class="esa-modal" v-if="show.modal">
            <div v-if="backdrop" class="backdrop" @click="close()"></div>
            <div class="modal" id="draggable-div-note">
                <div class="modal-header draggable-div-header" id="draggable-div-header-note">
                    <h3>Create Note</h3>
                </div>
                <div class="modal-body">
                    <form @submit="submit()">
                        <label for="note-select">Note type <small class="danger">(required)</small></label>
                        <select v-model="form.Type" name="note-select" class="table-dropdown mb-10">
                            <option value="0" disabled>Please select a type</option>
                            <option v-for="option in options" :value="option.value" :key="option.value"
                                v-html="option.name"></option>
                        </select>

                        <input v-if="[1, 3].includes(form.Type) /* form.Type == 3 */ && !preimport"
                            :class="{ 'unchecked': !form.Alert }" :checked="form.Alert" type="checkbox" name="specific">
                        <label title="Show in a popup to other users when they view this prescription."
                            v-if="[1, 3].includes(form.Type) /* form.Type == 3 */ && !preimport" class="mb-10"
                            @click="form.Alert = !form.Alert" for="specific"><b>Alert other users</b></label>

                        <!-- <div v-if="error.ReferenceNumber" class="infoBox warning">This Reference Number is already in the system!</div> -->
                        <label v-if="preimport && !editing && form.Type != 4" for="reference-number">Reference Number <small
                                class="danger">(required)</small></label>
                        <label v-if="preimport && !editing && form.Type == 4" for="reference-number">Subscription ID <small
                                class="danger">(required)</small></label>
                        <input class="form-control tBoxSize02 mb-10" name="reference-number"
                            v-if="preimport && !editing && form.Type != 4" v-model="form.ReferenceNumber" type="text">
                        <input class="form-control tBoxSize02 mb-10" name="reference-number"
                            v-if="preimport && !editing && form.Type == 4" v-model="form.Subscription" type="text">

                        <label for="message-text">Note<small class="danger">(required)</small></label>
                        <vue-editor v-model="form.Note" />

                        <div class="infoBox warning note-error" v-if="error != ''">
                            <p>{{ this.error }}</p>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button @click="close()" class="btn btnSize01 secondaryBtn bigButton">
                        Cancel
                    </button>
                    <button v-if="form.Type != 0 && form.Note != '' && !editing" @click="submit()"
                        class="btn btnSize01 primaryBtn">
                        Save
                    </button>
                    <button v-else-if="editing" @click="update()" class="btn btnSize01 primaryBtn">
                        Update
                    </button>
                </div>
                <!-- <div v-if="loading" class="loader" style="">Loading...</div> -->
                <span class="backdrop-toggle" @click="toggleBackdrop()" title="Unfocus the modal"><i
                        class="fa fa-clone"></i></span>
                <span class="close" @click="close()" title="Close the modal"><i class="fa fa-close"></i></span>
            </div>
        </div>
    </transition>
</template>

<script>
import Modal from './Modal.vue';
import Error from '../mixins/errors'
import { VueEditor } from "vue2-editor";

export default {
    mixins: [Error],
    props: ['orderID'],
    extends: Modal,
    components: {
        VueEditor,
    },
    data: function () {
        return {
            form: {
                options: [
                    { name: 'Patient Note <span style="font-style: italic;">(Patient specific notes)</span>', value: 1 },
                    { name: 'Query Note', value: 2 },
                    { name: 'Order Note <span style="font-size: 13px;">(Order specific notes)</span>', value: 3 },
                ],
                Type: 0,
                Note: '',
                Alert: false,
                ReferenceNumber: false,
                Subscription: false,
            },
            userInfo: userInfo,
            error: '',
            editing: false,
            preimport: false,
            backdrop: true,
            dragEventTriggered: false,
        }
    },
    computed: {
        options() {
            if (!this.preimport) {
                if (this.userInfo.role == 30) {
                    return this.form.options;
                } else {
                    return [
                        { name: 'Order Note <span style="font-size: 13px;">(Order specific notes)</span>', value: 3 },
                        { name: 'Patient Note <span style="font-size: 13px;">(Patient specific notes)</span>', value: 1 },
                    ]
                }
            } else {
                return [
                    { name: 'Subscription Note', value: 4 },
                    { name: 'Order Note', value: 3 },
                ]
            }
        }
    },
    mounted() {
        this.$root.$on('modal.open', (name, note) => {
            if (name == this.modalName) {
                this.show.modal = true;
            }

            if (note && note != 'preimport' && note.Type != 3 && note.Type != 4) {
                this.editing = note;
                this.form.Type = note.Type;
                this.form.Note = note.Note;
                this.form.Alert = note.Alert == 0 ? false : true;
                console.log('the note is this');
            } else if (note && (note.Type == 3 || note.Type == 4)) {
                this.editing = note;
                this.form.Type = note.Type;
                this.form.Note = note.Note;
                this.form.Alert = true;
                this.preimport = true;
                this.form.ReferenceNumber = note.ReferenceNumber;
            } else if (note == 'preimport') {
                this.form.Type = 4;
                this.form.Note = '';
                this.form.Alert = true;
                this.form.ReferenceNumber = '';
                this.form.Subscription = '';
                this.preimport = true;
            }
        });

        this.$root.$on('modal.close', (name) => {
            if (name == this.modalName) {
                this.close();
            }
        });

        this.$root.$on('modal.close.all', () => {
            this.close();
        });
    },
    watch: {
        'form.ReferenceNumber': _.debounce(function () {
            if (this.form.ReferenceNumber) {
                axios.get(`/order/${this.form.ReferenceNumber}/exists`)
                    .then((response) => {
                        if (response.data.data) {
                            this.error = 'This Reference Number is already in the system!';
                        } else {
                            this.error = '';
                        }
                    })
                    .catch((error) => {
                        this.error = '';
                    })
            }
        }, 500),
        'show.modal': function () {
            setTimeout(() => {
                if (this.show.modal && !this.dragEventTriggered && document.getElementById("draggable-div-note")) {
                    dragElement(document.getElementById("draggable-div-note"));
                    this.dragEventTriggered = true;

                    function dragElement(elmnt) {
                        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

                        if (document.getElementById("draggable-div-header-note")) {
                            /* if present, the header is where you move the DIV from:*/
                            document.getElementById("draggable-div-header-note").onmousedown = dragMouseDown;
                        } else {
                            /* otherwise, move the DIV from anywhere inside the DIV:*/
                            elmnt.onmousedown = dragMouseDown;
                        }

                        function dragMouseDown(e) {
                            e = e || window.event;
                            e.preventDefault();
                            // get the mouse cursor position at startup:
                            pos3 = e.clientX;
                            pos4 = e.clientY;
                            document.onmouseup = closeDragElement;
                            // call a function whenever the cursor moves:
                            document.onmousemove = elementDrag;
                        }

                        function elementDrag(e) {
                            e = e || window.event;
                            e.preventDefault();
                            // calculate the new cursor position:
                            pos1 = pos3 - e.clientX;
                            pos2 = pos4 - e.clientY;
                            pos3 = e.clientX;
                            pos4 = e.clientY;
                            // set the element's new position:
                            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                        }

                        function closeDragElement() {
                            /* stop moving when mouse button is released:*/
                            document.onmouseup = null;
                            document.onmousemove = null;
                        }
                    }
                } else {
                    this.dragEventTriggered = false;
                    this.backdrop = true;
                }
            }, 300);
        },
    },
    methods: {
        reset() {
            this.form.Type = 0;
            this.form.Note = '';
            this.form.PrescriptionID = 0;
            this.form.NoteID = 0;
            this.form.Alert = false;
            this.form.ReferenceNumber = '';
            this.form.Subscription = '';
            this.error = '';
            this.preimport = false;
            this.editing = false;
        },
        close() {
            this.reset();
            this.show.modal = false;
        },
        toggleBackdrop() {
            this.backdrop = !this.backdrop;
        },
        submit() {
            if (this.form.Type == 0 || this.form.Note == '') {
                this.error = 'Please fill all of the required fields';
                return;
            } else {
                this.error = '';
            }

            if (this.form.Type == 3) {
                this.form.OrderSpecific = true;
            }

            if (!this.preimport) {
                this.form.PrescriptionID = this.orderID;
            } else {
                this.form.PrescriptionID = null;
            }

            axios.post('/note', this.form)
                .then((response) => {
                    this.postSuccess(response.data.message);
                    this.$root.$emit('orderupdate');
                    this.$root.$emit('alertupdate');
                    this.reset();
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.show.modal = false;
                })
        },
        update(id) {
            if (this.form.Type == 0 || this.form.Note == '') {
                this.error = 'Please fill all of the required fields';
                return;
            } else {
                this.error = '';
            }

            if (this.form.Type == 3) {
                this.form.OrderSpecific = true;
            }

            this.form.NoteID = this.editing.NoteID;

            axios.patch(`/note/${this.form.NoteID}`, this.form)
                .then((response) => {
                    this.postSuccess(response.data.message);
                    this.$root.$emit('orderupdate');
                    this.$root.$emit('alertupdate');
                    this.reset();
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.show.modal = false;
                })
        },
    }
}
</script>
