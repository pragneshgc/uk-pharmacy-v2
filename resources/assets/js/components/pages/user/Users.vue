<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>Users</h3>
            </div>
            <div class="card-body">
                <router-link tag="button" to="/users/new" class="btn btnSize01 secondaryBtn mb-10" exact>
                    Add new user
                </router-link>

                <TableComponentSearch data-url="/users" column-class="col-lg-12" table-title="Users" redirect-name="user"
                    redirect-id="ID" :hidden-columns="['ID']" deleteUrl="/users" deleteId="ID" />
            </div>
        </section>
    </div>
</template>

<script>
export default {
    components: {
        'TableComponentSearch': () => import('../../TableComponentSearch.vue'),
    },
}
</script>
