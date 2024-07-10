<template>
    <div :class="style">
        <Header />
        <Sidebar @sidebartoggle="toggleSidebar()" :sidebarVisible="sidebarVisible" />
        <Content :sidebarVisible="sidebarVisible" />
    </div>
</template>

<script>
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import Content from './Content.vue'

export default {
    data: function () {
        return {
            sidebarVisible: JSON.parse(localStorage.getItem('sidebarVisible')) == false ? false : true,
        }
    },
    components: {
        Header, Sidebar, Content
    },
    computed: {
        style() {
            return this.$store.state.style;
        }
    },
    mounted() {
        if (version.previousVersion != version.currentVersion) {
            localStorage.setItem('settings.version', version.currentVersion);
            this.$swal({
                title: `Application has been updated to version ${version.currentVersion}`,
                text: 'A reload is required to apply the new changes',
                type: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Reload'
            }).then((result) => {
                window.location.reload(true);
            })
        }
    },
    methods: {
        toggleSidebar() {
            this.sidebarVisible = !this.sidebarVisible;
            localStorage.setItem('sidebarVisible', this.sidebarVisible);
        },
    },
}
</script>
