import './bootstrap';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import mitt from 'mitt';
import router from './router';
import AppLayout from './components/layouts/Layout.vue';
import TableComponent from "./components/TableComponent.vue";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Toasted from "@hoppscotch/vue-toasted"
import "@hoppscotch/vue-toasted/style.css";

const app = createApp(AppLayout);
const pinia = createPinia();
const emitter = mitt();

app.use(pinia);
app.use(router);

app.config.globalProperties.emitter = emitter;

app.use(VueSweetalert2);
window.Swal = app.config.globalProperties.$swal;

app.use(Toasted);
window.toast = app.config.globalProperties.$toasted;

app.component("DataTable", TableComponent);

app.mount('#app');
