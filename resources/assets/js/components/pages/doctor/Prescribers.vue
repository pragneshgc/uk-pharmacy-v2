<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>Prescribers</h3>
            </div>
            <div class="card-body">
                <router-link tag="button" to="/prescribers/new" class="btn btnSize01 secondaryBtn mb-10" exact>
                    Add new prescriber
                </router-link>

                <TableComponentSearch data-url="/doctors/index" column-class="col-lg-12" table-title="Doctors"
                    redirect-name="prescriber" redirect-id="ID" :hidden-columns="[]" :filters="filters" deleteUrl="/doctors"
                    deleteId="ID" />
            </div>
        </section>
    </div>
</template>

<script>
export default {
    components: {
        'TableComponentSearch': () => import('../../TableComponentSearch.vue'),
    },
    data: function () {
        return {
            filters: [
                {
                    title: 'Doctor Name',
                    value: 'name',
                    type: 'text',
                },
                {
                    title: 'Doctor Surname',
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
                            title: 'Select Prescriber Status',
                            value: '',
                        },
                        {
                            title: 'Active',
                            value: 1,
                        },
                        {
                            title: 'Inactive',
                            value: 2
                        },
                    ]
                },
                {
                    title: 'Type',
                    value: 'type',
                    type: 'select',
                    options: [
                        {
                            title: 'Select Prescriber Type',
                            value: '',
                        },
                        {
                            title: 'GMC',
                            value: 1,
                        },
                        {
                            title: 'EU',
                            value: 2
                        },
                        {
                            title: 'GPhC',
                            value: 3
                        },
                        {
                            title: 'Test',
                            value: 4
                        },
                    ]
                },
            ]
        }
    },
    mounted() {
    }
}
</script>
