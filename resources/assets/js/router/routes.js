//Pages
// import Dashboard from './components/pages/Dashboard'
import SafetyCheck from "../components/pages/SafetyCheck.vue";
import Reports from "../components/pages/Reports.vue";
import Prescription from "../components/pages/Prescription.vue";
// import PrescriptionAlternate from './components/pages/PrescriptionAlternate'
import Return from "../components/pages/Return.vue";
import { canUserAccessModule } from "../helpers";

let hidden = appInfo.hidden;

const routes = [
    {
        path: "/",
        name: "in tray",
        // component: Dashboard
        meta: { minRole: 5 },
        component: () =>
            import(
                /* webpackChunkName: "Dashboard" */ "../components/pages/Dashboard.vue"
            ),
    },
    /* {
        path: "/dashboard",
        name: "dashboard",
        meta: { minRole: 5 },
        component: () => import("./components/pages/dashboard/Dashboard.vue"),
    }, */
    {
        path: "/duplicate/:id",
        name: "duplicate",
        // component: Duplicate,
        component: () =>
            import(
                /* webpackChunkName: "Duplicate" */ "../components/pages/Duplicate.vue"
            ),
    },
    {
        path: "/safety-check",
        name: "safety check",
        component: SafetyCheck,
    },
    {
        path: "/reports",
        name: "reports",
        meta: { minRole: 20 },
        component: Reports,
    },
    {
        path: "/prescription/:id",
        name: "prescription",
        component: Prescription,
    },
    {
        path: "/prescription/returns/:id",
        name: "returns",
        component: Return,
    },
    {
        path: "/prescription-pool",
        name: "prescription pool",
        meta: { minRole: 19 },
        component: () =>
            import(
                /* webpackChunkName: "PrescriptionPool" */ "../components/pages/PrescriptionPool.vue"
            ),
    },
    {
        path: "/products",
        name: "products",
        meta: { parent: "inventory", minRole: userInfo.role == 4 ? 4 : 20 },
        component: () =>
            import(
                /* webpackChunkName: "Products" */ "../components/pages/product/Products.vue"
            ),
    },

    {
        path: "/labels",
        name: "labels",
        meta: { minRole: 20, skip: [22] },
        component: () =>
            import(
                /* webpackChunkName: "Labels" */ "../components/pages/label/Labels.vue"
            ),
    },

    {
        path: "/additional-information",
        name: "additional information",
        meta: { minRole: 20, skip: [22] },
        component: () =>
            import(
                /* webpackChunkName: "Additional" */ "../components/pages/additional/Additional.vue"
            ),
    },

    {
        path: "/settings",
        name: "settings",
        meta: { minRole: 5 },
        component: () =>
            import(
                /* webpackChunkName: "Settings" */ "../components/pages/setting/Settings.vue"
            ),
    },

    {
        path: "/register",
        name: "Register",
        meta: { minRole: 5 },
        // component: FMD
        component: () =>
            import(
                /* webpackChunkName: "Info" */ "../components/pages/Register.vue"
            ),
    },

    {
        path: "/prescribers",
        name: "prescribers",
        meta: { minRole: 35 },
        //component: Doctors
        component: () =>
            import(
                /* webpackChunkName: "Prescribers" */ "../components/pages/doctor/Prescribers.vue"
            ),
    },
    {
        path: "/prescribers/new",
        name: "new prescriber",
        meta: { parent: "prescribers", minRole: 50 },
        component: () =>
            import(
                /* webpackChunkName: "New" */ "../components/pages/doctor/New.vue"
            ),
    },
    {
        path: "/prescribers/:id",
        name: "prescriber",
        meta: { parent: "prescribers", minRole: 50 },
        //component: Doctors
        component: () =>
            import(
                /* webpackChunkName: "Prescriber" */ "../components/pages/doctor/Prescriber.vue"
            ),
    },
    {
        path: "/clients/new",
        name: "new client",
        meta: { parent: "clients", minRole: 50 },
        component: () =>
            import(
                /* webpackChunkName: "New" */ "../components/pages/client/New.vue"
            ),
    },
    {
        path: "/clients/:id",
        name: "client",
        meta: { parent: "clients", minRole: 50 },
        //component: Doctors
        component: () =>
            import(
                /* webpackChunkName: "Prescriber" */ "../components/pages/client/Client.vue"
            ),
    },
    {
        path: "/dispensing-data",
        name: "dispensing data",
        meta: { minRole: 20 },
        component: () =>
            import(
                /* webpackChunkName: "Dispensing" */ "../components/pages/dispensing/Dispensing.vue"
            ),
    },
    {
        path: "/blacklist/new",
        name: "new blacklist entry",
        meta: { minRole: 40 },
        component: () =>
            import(
                /* webpackChunkName: "NewBlacklistEntry" */ "../components/pages/blacklist/New.vue"
            ),
    },
    {
        path: "/users",
        name: "users",
        meta: { minRole: 50 },
        //component: Users
        component: () =>
            import(
                /* webpackChunkName: "Users" */ "../components/pages/user/Users.vue"
            ),
    },
    {
        path: "/users/new",
        name: "new user",
        meta: { parent: "users", minRole: 50 },
        //component: NewUser
        component: () =>
            import(
                /* webpackChunkName: "NewUser" */ "../components/pages/user/NewUser.vue"
            ),
    },
    {
        path: "/users/:id",
        name: "user",
        meta: { parent: "users", minRole: 50 },
        // component: User
        component: () =>
            import(
                /* webpackChunkName: "User" */ "../components/pages/user/User.vue"
            ),
    },
    {
        path: "/invoices",
        name: "invoices",
        meta: { minRole: 50 },
        component: () =>
            import(
                /* webpackChunkName: "Invoices" */ "../components/pages/invoices/Invoices.vue"
            ),
    },
    {
        path: "/invoices/:id",
        name: "invoice",
        meta: { parent: "invoices", minRole: 50 },
        component: () =>
            import(
                /* webpackChunkName: "InvoicePreview" */ "../components/pages/invoices/InvoicePreview.vue"
            ),
    },
    {
        path: "/ip-audit",
        name: "ip audit",
        meta: { minRole: 50 },
        component: () =>
            import(
                /* webpackChunkName: "InvoicePreview" */ "../components/pages/IpAudit.vue"
            ),
    },
    {
        path: "/info",
        name: "App Info",
        //meta: { minRole: 20 },
        // component: FMD
        component: () =>
            import(
                /* webpackChunkName: "Info" */ "../components/pages/general/Info.vue"
            ),
    },
    {
        path: "/404",
        name: "404",
        //component: NotFound
        component: () =>
            import(
                /* webpackChunkName: "NotFound" */ "../components/pages/generic/NotFound.vue"
            ),
    },
    {
        path: "/notallowed",
        name: "not allowed",
        //component: NotAllowed
        component: () =>
            import(
                /* webpackChunkName: "NotAllowed" */ "../components/pages/generic/NotAllowed.vue"
            ),
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/404"
    },
];

if (
    canUserAccessModule(
        appInfo.active_modules,
        appInfo.module_roles,
        "Clients",
        userInfo.pharmacy_role_id
    )
) {
    routes.push({
        path: "/clients",
        name: "clients",
        meta: { minRole: 50 },
        //component: Clients
        component: () =>
            import(
                /* webpackChunkName: "Clients" */ "../components/pages/client/Clients.vue"
            ),
    });
}

if (
    canUserAccessModule(
        appInfo.active_modules,
        appInfo.module_roles,
        "Logs",
        userInfo.pharmacy_role_id
    )
) {
    routes.push({
        path: "/logs",
        name: "logs",
        meta: { minRole: 50 },
        //component: Logs
        component: () =>
            import(
                /* webpackChunkName: "Logs" */ "../components/pages/admin/Logs.vue"
            ),
    });
}

if (
    canUserAccessModule(
        appInfo.active_modules,
        appInfo.module_roles,
        "Blacklist",
        userInfo.pharmacy_role_id
    )
) {
    routes.push({
        path: "/blacklist",
        name: "blacklist",
        meta: { minRole: 40 },
        component: () =>
            import(
                /* webpackChunkName: "Blacklist" */ "../components/pages/blacklist/Blacklist.vue"
            ),
    });
}

if (
    canUserAccessModule(
        appInfo.active_modules,
        appInfo.module_roles,
        "Overview",
        userInfo.pharmacy_role_id
    )
) {
    routes.push({
        path: "/overview",
        name: "overview",
        meta: { minRole: userInfo.role == 35 ? 35 : 60, skip: [22] },
        component: () =>
            import(
                /* webpackChunkName: "Overview" */ "../components/pages/Overview.vue"
            ),
    });
}

//module.exports = routes;
export default routes;
