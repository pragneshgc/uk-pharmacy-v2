<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>Blacklist</h3>
            </div>
            <div class="card-body">
                <router-link tag="button" to="/blacklist/new" class="btn btnSize01 secondaryBtn mb-10" exact>
                    Add new entries
                </router-link>

                <TableComponentSearch data-url="/blacklist" column-class="col-lg-12" table-title="Blacklist"
                    :hidden-columns="['BlackListID']" :filters="filters" :checkbox-visible="true" deleteUrl="/blacklist"
                    deleteId="BlackListID">
                    <template #toppagination>
                        <div class="pl-5" style="display: flex; align-items: center;">
                            <div class="check-options" v-if="checked.length > 0">
                                <button @click="removeFromBlacklist()" class="btn btnSize02 secondaryBtn">
                                    Remove {{ checked.length }} blacklist entries
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
        </section>
    </div>
</template>

<script>
import Error from '../../../mixins/errors'

export default {
    components: {
        'TableComponentSearch': () => import('../../TableComponentSearch.vue'),
    },
    mixins: [Error],
    data: function () {
        return {
            filters: [
                {
                    title: 'Name',
                    value: 'name',
                    type: 'text',
                },
                {
                    title: 'Surname',
                    value: 'surname',
                    type: 'text',
                },
                {
                    title: 'Status',
                    value: 'status',
                    type: 'select',
                    selected: 1,
                    options: [
                        {
                            title: 'Active',
                            value: 1,
                        },
                        {
                            title: 'Inactive',
                            value: 0
                        },
                    ]
                },
            ]
        }
    },
    destroyed() {
        this.$store.commit('replaceChecked', []);
    },
    mounted() {

    },
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
        removeFromBlacklist() {
            axios.post(`/blacklist/delete`, { ids: this.checked })
                .then((response) => {
                    this.postSuccess('Removed blacklist entry');
                    this.$store.commit('replaceChecked', []);
                    this.$root.$emit('table.refresh');
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
