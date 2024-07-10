import "./bootstrap";

import Vue from "vue/dist/vue.js";
import Vuex from "vuex";
import VueRouter from "vue-router";
import vSelect from "vue-select";
import VueSweetalert2 from "vue-sweetalert2";
import routes from "./routes";
import storeSetup from "./store";
import AppLayout from "./components/layouts/Layout.vue";
import Toasted from "vue-toasted";
import TableComponent from "./components/TableComponent.vue";

/**
 * Components
 * uncomment if needed
 */
Vue.use(VueRouter);
Vue.use(VueSweetalert2);
Vue.use(Vuex);
Vue.use(Toasted);

Vue.component("v-select", vSelect);
Vue.component("DataTable", TableComponent);

window.addEventListener("beforeunload", () => {
  if (!window.loggingOut) {
    navigator.sendBeacon(`/logs/page-exit`);
  }
  return null;
});

(function () {
  var minutes = false;
  var interval = minutes ? 60000 : 60000;
  var IDLE_TIMEOUT = 3600;
  var idleCounter = 0;

  document.onmousemove = document.onkeypress = function () {
    idleCounter = 0;
  };

  window.setInterval(function () {
    idleCounter = idleCounter + 60;
    if (idleCounter >= IDLE_TIMEOUT) {
      axios.post("/logout").finally(() => {
        window.location = "/login";
      });
    }
  }, interval);
})();

/**
 * Router setup
 * Uses routes.js file for routes list
 */
const router = new VueRouter({
  //mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
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

/**
 * Store setup
 */
const store = new Vuex.Store(storeSetup);

Vue.config.errorHandler = (err, vm, info) => {
  let errorObject = {
    type: "vue",
    info: info,
    errorMessage: err.message,
    errorStack: err.stack,
    location: window.location.href,
  };

  window.axios.post("/logs/error", errorObject);
};

/**
 * Startup the Vue app
 */
const app = new Vue({
  el: "#app",
  components: { AppLayout },
  data: {
    online: true,
  },
  created: function () {
    window.addEventListener("online", () => {
      this.online = true;
    });
    window.addEventListener("offline", () => {
      this.online = false;
    });
  },
  router,
  store,
});

if (import.meta.env.PROD) {
  Vue.config.devtools = false
}
