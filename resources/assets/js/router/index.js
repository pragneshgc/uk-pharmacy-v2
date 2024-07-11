import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active'
});

/**
 * Router middleware
 */
router.beforeEach((to, from, next) => {
    let title = to.name
        ? `${appInfo.name} | ${to.name[0].toUpperCase() + to.name.substr(1)}`
        : `${appInfo.name} Pharmacist`;

    if (typeof to.params.id != "undefined") {
        title = `${to.name[0].toUpperCase() + to.name.substr(1)} | ${to.params.id
            }`;
    }

    window.document.title = title;

    let exception = typeof to.meta.skip == "undefined" ? [] : to.meta.skip;

    //user role check
    if (to.meta.minRole > userInfo.role && !exception.includes(userInfo.id)) {
        if (userInfo.role == 4) {
            router.push({ path: "/products" });
        } else {
            router.push({ path: "/notallowed" });
        }
    } else {
        axios.post("/logs/page-access", { url: to.fullPath }); //log each page access

        next();
    }
});

export default router;
