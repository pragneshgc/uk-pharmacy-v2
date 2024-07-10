<template>
    <transition name="fade">
        <div class="esa-modal" v-if="show.modal">
            <div v-if="backdrop" class="backdrop" @click="close()">
            </div>
            <div class="modal" id="draggable-div-prescriber">
                <transition name="fade">
                    <div class="loader" v-show="loading">Loading...</div>
                </transition>

                <div class="modal-header draggable-div-header" id="draggable-div-header-prescriber">
                    <h3>Send Message</h3>
                </div>
                <div class="modal-body">
                    <form @submit="submit()">
                        <label for="message-select">Email template <small class="danger">(required)</small></label>
                        <select v-model="prescriberForm.select" name="message-select" class="table-dropdown mb-10">
                            <option value="0" disabled>Please select a template</option>
                            <option v-for="option in prescriberForm.options" :value="option.value" :key="option.value">{{
                                option.name }}</option>
                        </select>

                        <div class="mb-10" v-if="prescriberForm.select == 3">
                            <label for="message-date">New date <small class="danger">(required)</small></label>
                            <datepicker name="return-date" v-model="prescriberForm.date" :disabled-dates="disabledDates"
                                maxlength="30"></datepicker>
                        </div>

                        <label for="message-text">Message <small class="danger">(required)</small></label>
                        <!-- <textarea v-model="prescriberForm.message" name="message-text" cols="30" rows="30"> -->
                        <vue-editor v-model="prescriberForm.message" />

                        <div v-if="errors.length > 0" class="infoBox error">
                            <p v-for="(value, key) in errors" :key="key">
                                {{ value }}
                            </p>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button :disabled="loading" @click="close()" class="btn btnSize01 secondaryBtn bigButton">
                        Cancel
                    </button>
                    <button :disabled="loading" @click="submit()" class="btn btnSize01 primaryBtn">
                        Submit
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
import { VueEditor } from "vue2-editor";
import Error from '../mixins/errors'
import Datepicker from 'vuejs-datepicker'

export default {
    props: ['orderID'],
    mixins: [Error],
    extends: Modal,
    components: {
        VueEditor,
        Datepicker
    },
    data: function () {
        return {
            prescriberForm: {
                options: [
                    { name: '[REJECT] Too many ordered', value: 1, limit: 30 },
                    { name: '[REJECT] Dosage problem', value: 2, limit: 30 },
                    // {name: '[POSTPONE] Ordered too early', value: 3, limit: 30},
                    { name: '[QUERY] Miscellaneous', value: 4, limit: 30 },
                    { name: '[QUERY] Dosage problem', value: 5, limit: 30 },
                    { name: '[QUERY] Potential name discrepancy', value: 6, limit: 0 },
                ],
                select: 0,
                message: '',
                date: '',
            },
            disabledDates: {
                to: new Date(),
                days: [6, 0],
            },
            errors: [],
            loading: false,
            backdrop: true,
        }
    },
    watch: {
        'prescriberForm.select': function () {
            if (this.prescriberForm.select != 3) {
                this.prescriberForm.date = '';
            }
        },
        'show.modal': function () {
            setTimeout(() => {
                if (this.show.modal && !this.dragEventTriggered && document.getElementById("draggable-div-prescriber")) {
                    dragElement(document.getElementById("draggable-div-prescriber"));
                    this.dragEventTriggered = true;

                    function dragElement(elmnt) {
                        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

                        if (document.getElementById("draggable-div-header-prescriber")) {
                            /* if present, the header is where you move the DIV from:*/
                            document.getElementById("draggable-div-header-prescriber").onmousedown = dragMouseDown;
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
            }, 500);
        },
    },
    methods: {
        submit() {
            this.loading = true;
            axios.post('/mail/' + this.orderID + '/contact', { form: this.prescriberForm })
                .then((response) => {
                    this.postSuccess(response.data.message);
                    // this.$root.$emit('orderupdate'); //this was causing an issue of doing refresh request for the old order
                    this.$root.$emit('tray.remove', this.orderID); //remove from tray when queried
                    this.resetForm();
                    this.show.modal = false;
                })
                .catch((error) => {
                    this.errors.push(error.response.data.message);
                    this.postError(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        toggleBackdrop() {
            this.backdrop = !this.backdrop;
        },
        resetForm() {
            this.prescriberForm.select = 0;
            this.prescriberForm.message = '';
            this.prescriberForm.date = '';
            this.errors = [];
        }
    }
}
</script>
