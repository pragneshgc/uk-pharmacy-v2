<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>Add to Blacklist</h3>
            </div>
            <div class="card-body">
                <router-link tag="button" to="/blacklist" class="btn btnSize01 secondaryBtn mb-10" exact>
                    Return to blacklist
                </router-link>

                <div class="orderSearch">
                    <TableComponentSearch data-url="/orders/search" column-class="col-lg-12" table-title="Prescriptions"
                        redirect-name="prescription" redirect-id="PrescriptionID" :checkbox-visible="true"
                        :hidden-columns="['checked', 'NotFound', 'NotFound', 'AirwayBillNumber']" :filters="filters"
                        :column-map="columnMap" :not-orderable="['Products']" :load-on-startup="false">
                        <template #toppagination>
                            <div class="pl-5" style="display: flex; align-items: center;">
                                <div class="check-options" v-if="checked.length > 0">
                                    <button @click="addToBlacklist()" class="btn btnSize02 secondaryBtn">
                                        Blacklist {{ checked.length }} orders
                                    </button>
                                    <button @click="clearChecked()" class="btn btnSize02 secondaryBtn">
                                        Clear checked
                                    </button>
                                </div>
                            </div>
                        </template>
                        <template #thfilter>
                            <div>
                                <div class="" @click="checkAllVisible()">
                                    <!-- <input class="uncheck" v-model="mainChecked" type="checkbox" name="checkall">  -->
                                    <input :class="{ 'unchecked': (!match && currentChecked) }"
                                        :checked="(match || currentChecked)" type="checkbox" name="checkall">
                                    <label for="checkall"></label>
                                </div>
                            </div>
                        </template>
                    </TableComponentSearch>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Reports from '../../pages/Reports.vue';
import Error from '../../../mixins/errors'

export default {
    extends: Reports,
    data: function () {
        return {

        }
    },
    mixins: [Error],
    computed: {
        checked() {
            return this.$store.state.checked;
        },
        visible() {
            return this.$store.state.visible;
        },
        //check if the current checked boxes match the total check boxes
        match() {
            if (this.checked.length == 0) {
                return false;
            } else {
                return this.visible.every((value) => {
                    return (this.checked.indexOf(value) >= 0);
                });
            }
            // return _.isEmpty(_.xor(this.visible, this.checked))
        },
        //check if some of the checked boxes on current page match the total checked boxes
        currentChecked() {
            if (this.checked.length == 0) {
                return false;
            } else {
                return this.checked.some((value) => {
                    return (this.visible.indexOf(value) >= 0);
                });
            }
        },
    },
    destroyed() {
        this.$store.commit('replaceChecked', []);
    },
    methods: {
        checkAllVisible() {
            if (this.currentChecked && !this.match) {
                this.$root.$emit('table.uncheck.all');
            } else if (this.currentChecked && this.match) {
                this.$root.$emit('table.uncheck.all');
            } else {
                this.$root.$emit('table.check.all');
            }
        },
        addToBlacklist() {
            axios.post(`/blacklist`, { ids: this.checked })
                .then((response) => {
                    this.postSuccess('Added blacklist entry');
                    this.$store.commit('replaceChecked', []);
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        clearChecked() {
            this.$store.commit('replaceChecked', []);
        },
    }
}
</script>
