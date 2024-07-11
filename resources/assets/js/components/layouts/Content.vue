<template>
    <div class="contentWrapper" :class="{ 'fullWidth': !sidebarVisible }">
        <Online />

        <transition name="slide-down" mode="out-in">
            <div v-if="isDemo" class="infoBox warning thin-error">
                <p>Application is running in DEMO mode!</p>
            </div>
        </transition>

        <router-view :class="[isDemo ? 'demo' : 'no-demo']"></router-view>
        <Footer />
    </div>
</template>
<script>
import Footer from './Footer.vue'
import Online from '../Online.vue';

export default {
    props: ['sidebarVisible'],
    components: {
        Footer, Online
    },
    data: function () {
        return {
            appInfo: appInfo
        }
    },
    computed: {
        isDemo() {
            return this.appInfo.mode == 'local' || this.appInfo.mode == 'staging' || this.appInfo.mode == 'demo';
        }
    },
}
</script>
