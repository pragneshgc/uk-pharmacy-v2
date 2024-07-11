<script>
export default {
    data() {
        return {
            isonline: navigator.onLine
        }
    },
    mounted() {
        window.addEventListener('online', () => {
            this.isonline = true
        });
        window.addEventListener('offline', () => {
            this.isonline = false
        });
    },
    beforeUnmount() {
        window.removeEventListener('online');
        window.removeEventListener('offline');
    },
}
</script>

<template>
    <div>
        <div v-if="!isonline" class="infoBox warning">
            <p>Can't reach the server! Please check your internet connection.</p>
        </div>
    </div>
</template>
