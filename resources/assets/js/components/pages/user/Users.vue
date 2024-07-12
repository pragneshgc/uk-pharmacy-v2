<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>Users</h3>
            </div>
            <div class="card-body">
                <button @click="$router.push('/users/new')" class="btn btnSize01 secondaryBtn mb-10">
                    Add new user
                </button>

                <TableComponentSearch data-url="/users" column-class="col-lg-12" table-title="Users"
                    redirect-name="user" redirect-id="ID" :hidden-columns="['ID']" deleteUrl="/users" deleteId="ID" />
            </div>
        </section>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    components: {
        'TableComponentSearch': defineAsyncComponent(() => import('../../TableComponentSearch.vue')),
    },
}
</script>
