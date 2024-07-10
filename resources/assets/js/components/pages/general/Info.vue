<template>
    <section class="card">
        <div class="card-header">
            <h3 class="text-center">App Info</h3>
        </div>
        <div class="card-body">
            <div v-if="info">
                <div class="appInfo mb-10">
                    <h4>Current Version: <b>{{ info.version }}</b></h4>
                    <h4>Environment: <b>{{ info.environment }}</b></h4>
                </div>
                <hr class="mb-10">
                <h2 class="mb-10">Changelog: </h2>
                <hr>
                <div v-html="info">
                </div>
                <!-- <vue-markdown>{{ info.changelog }}</vue-markdown> -->
            </div>
        </div>
    </section>
</template>

<script>
import { marked } from 'marked';

export default {
    data: function () {
        return {
            info: false,
        }
    },
    mounted() {
        axios.get('/info')
            .then((response) => {
                this.info = marked.parse(response.data.data.changelog);
            })
            .catch((error) => {
                console.log(error);
            })
    }
}
</script>
