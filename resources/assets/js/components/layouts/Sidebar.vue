<template>
    <div class="sidebarWrapper blue-template" :class="{ 'collapsed': !sidebarVisible }">
        <ul class="sidebar">
            <li class="sidebarSection parentActive">
                <!-- <a href="javascript:;" class="mainControl">Main Control</a> -->
                <ul class="nav">
                    <li title="Shipping" style="background: #3c8aa8;" v-if="userInfo.shipping_role > 0">
                        <a class="sidebar-link" :href="appInfo.shipping">
                            <i class="fa fa-truck"></i>
                            Shipping
                        </a>
                    </li>

                    <li title="Inventory" style="background: #006855;" v-if="userInfo.inventory_role > 0">
                        <a class="sidebar-link" :href="appInfo.inventory">
                            <i class="fa fa-barcode"></i>
                            Inventory
                        </a>
                    </li>

                    <router-link title="In Tray" tag="li" to="/" exact v-if="userInfo.role > 4">
                        <a href="javascript:;" class="sidebar-link">
                            <i class="fa fa-home"></i>
                            In Tray
                        </a>
                    </router-link>

                    <router-link title="Overview" v-if="(userInfo.role == 60 || userInfo.role == 35)" tag="li"
                        to="/overview" exact>
                        <a href="javascript:;" class="sidebar-link">
                            <i class="fa fa-bar-chart"></i>
                            Overview
                        </a>
                    </router-link>

                    <router-link title="Prescription Pool"
                        v-if="userInfo.role == 19 || userInfo.role == 20 || userInfo.role >= 50" tag="li"
                        to="/prescription-pool" exact>
                        <a href="javascript:;" class="sidebar-link">
                            <i class="fa fa-files-o"></i>
                            Prescription Pool
                        </a>
                    </router-link>

                    <router-link title="Reports" tag="li" to="/reports" exact
                        v-if="userInfo.role > 4 && userInfo.role != 19">
                        <a href="javascript:;" class="sidebar-link">
                            <i class="fa fa-file-text-o"></i>
                            Reports
                        </a>
                    </router-link>
                    <router-link title="POM Register" tag="li" to="/register" exact
                        v-if="userInfo.role > 4 && userInfo.role != 19">
                        <a href="javascript:;" class="sidebar-link">
                            <i class="fa fa-book" aria-hidden="true"></i>
                            POM Register
                        </a>
                    </router-link>

                    <router-link title="Products"
                        v-if="userInfo.role == 4 || userInfo.role == 20 || userInfo.role >= 30" tag="li" to="/products"
                        exact>
                        <a href="javascript:;" class="sidebar-link">
                            <i class="fa fa-cubes"></i>
                            Products
                        </a>
                    </router-link>

                    <router-link title="Dispensing Data" v-if="userInfo.role == 20 || userInfo.role >= 30" tag="li"
                        to="/dispensing-data" exact>
                        <a href="javascript:;" class="sidebar-link">
                            <i class="fa fa-cube"></i>
                            Dispensing Data
                        </a>
                    </router-link>

                    <router-link title="Labels" v-if="canUserAccessModule(
        appInfo.active_modules,
        appInfo.module_roles,
        'Labels', userInfo.pharmacy_role_id)" tag="li" to="/labels" exact>
                        <a href="javascript:;" class="sidebar-link" style="display: flex;">
                            <i class="fa fa-tags"></i>
                            <div style="padding-left: 12px; margin-bottom: -14px; margin-top: -7px;">
                                Cautionary & Advisory Labels
                            </div>
                        </a>
                    </router-link>


                    <router-link title="Additional Information" v-if="canUserAccessModule(
        appInfo.active_modules,
        appInfo.module_roles,
        'Labels', userInfo.pharmacy_role_id)" tag="li" to="/additional-information" exact>
                        <a href="javascript:;" class="sidebar-link" style="display: flex;">
                            <i class="fa fa-info-circle"></i>
                            <div style="padding-left: 12px; margin-bottom: -14px; margin-top: -7px;">
                                Additional Information
                            </div>
                        </a>
                    </router-link>


                    <!-- Admin -->
                    <!-- <li class="disabled" title="Invoices" v-if="userInfo.role >= 50" tag="li" to="/invoice" exact>
                        <a href="javascript:;" class="sidebar-link">
                            <i class="fa fa-money"></i>
                            Invoices
                        </a>
                    </li> -->

                    <router-link title="Clients" v-if="canUserAccessModule(
        appInfo.active_modules,
        appInfo.module_roles,
        'Clients', userInfo.pharmacy_role_id)" tag="li" to="/clients" exact>
                        <a href="javascript:;" class="sidebar-link">
                            <i class="fa fa-address-book-o"></i>
                            Clients
                        </a>
                    </router-link>

                    <router-link title="Invoices" v-if="canUserAccessModule(
        appInfo.active_modules,
        appInfo.module_roles,
        'Invoices', userInfo.pharmacy_role_id)" tag="li" to="/invoices" exact>
                        <a href="javascript:;" class="sidebar-link">
                            <i class="fa fa-calculator"></i>
                            Invoices
                        </a>
                    </router-link>

                    <router-link title="Blacklist" v-if="canUserAccessModule(
        appInfo.active_modules,
        appInfo.module_roles,
        'Blacklist', userInfo.pharmacy_role_id)" tag="li" to="/blacklist" exact>
                        <a href="javascript:;" class="sidebar-link">
                            <i class="fa fa-ban"></i>
                            Blacklist
                        </a>
                    </router-link>

                    <router-link title="Settings"
                        v-if="userInfo.role == 19 || userInfo.role == 20 || userInfo.role >= 30" tag="li" to="/settings"
                        exact>
                        <a href="javascript:;" class="sidebar-link">
                            <i class="fa fa-cogs"></i>
                            Settings
                        </a>
                    </router-link>

                    <router-link title="Users" v-if="userInfo.role >= 50" tag="li" to="/users" exact>
                        <a href="javascript:;" class="sidebar-link">
                            <i class="fa fa-users"></i>
                            Users
                        </a>
                    </router-link>

                    <router-link title="Prescribers" v-if="userInfo.role >= 50 || userInfo.role == 35" tag="li"
                        to="/prescribers" exact>
                        <a href="javascript:;" class="sidebar-link">
                            <i class="fa fa-heartbeat"></i>
                            Prescribers
                        </a>
                    </router-link>

                    <router-link title="Logs" v-if="canUserAccessModule(
        appInfo.active_modules,
        appInfo.module_roles,
        'Logs', userInfo.pharmacy_role_id)" tag="li" to="/logs">
                        <a href="javascript:;" class="sidebar-link">
                            <i class="fa fa-hdd-o"></i>
                            Logs
                        </a>
                    </router-link>

                    <router-link title="Ip Audit" tag="li" to="/ip-audit" v-if="userInfo.role >= 50">
                        <a href="javascript:;" class="sidebar-link">
                            <i class="fa fa-address-book"></i>
                            IP Audit
                        </a>
                    </router-link>
                </ul>
            </li>
            <li class="collapse-menu-section">
                <a class="sidebar-link collapse-menu-link" title="Collapse menu" @click="$emit('sidebartoggle')"
                    href="javascript:;">
                    <i class="fa fa-caret-left" :class="{ 'fa-caret-right': !sidebarVisible }"></i>
                    Collapse menu
                </a>
            </li>
        </ul>

    </div>
</template>
<script>
import { canUserAccessModule } from '../../helpers';
export default {
    props: ['sidebarVisible'],
    data: function () {
        return {
            userInfo: userInfo,
            appInfo: appInfo,
            canUserAccessModule
        }
    },
}
</script>
