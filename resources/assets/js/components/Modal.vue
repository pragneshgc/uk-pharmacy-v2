<template>
    <transition name="fade">
        <div class="esa-modal" v-if="show.modal">
            <div class="backdrop" @click="close()">
            </div>
            <div class="modal" :class="modalClass">
                <div class="modal-header">
                    <slot name="header"></slot>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
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
    export default {
        props: ['modalName', 'modalClass'],
        data: function () {
            return {
                show: {
                    modal: false,
                },
                loading: true
            }
        },
        computed:{
            
        },
        mounted() {
            this.$root.$on('modal.open', (name) => {
                if(name == this.modalName){
                    this.show.modal = true;
                }
            });

            this.$root.$on('modal.close', (name) => {
                if(name == this.modalName){
                    this.show.modal = false;
                }
            });

            this.$root.$on('modal.close.all', () => {
                    this.show.modal = false;
            });
        },
        methods:{
            close(){
                this.show.modal = false;
            },
            save(){
                this.show.modal = false;
            }
        }
    }
</script>
