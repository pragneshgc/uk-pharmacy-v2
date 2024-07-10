<template>
    <div class="contentWrapper" :class="{ 'fullWidth': !sidebarVisible }">
        <transition name="slide-down" mode="out-in">
            <div v-if="!$root.$data.online" class="infoBox warning">
                <p>Can't reach the server! Please check your internet connection.</p>
            </div>
        </transition>

        <transition name="slide-down" mode="out-in">
            <div v-if="isDemo" class="infoBox warning thin-error">
                <p>Application is running in DEMO mode!</p>
            </div>
        </transition>

        <transition name="slide-left" mode="out-in">
            <router-view :class="[isDemo ? 'demo' : 'no-demo']"></router-view>
        </transition>

        <Footer />
    </div>
</template>
<script>
import Footer from './Footer.vue'

export default {
    props: ['sidebarVisible'],
    components: {
        Footer
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
