import { defineStore } from "pinia";
import { useRoute } from "vue-router";

export const useDefaultStore = defineStore('default', {
    state: () => {
        const route = useRoute();
        return {
            appInfo: [],
            checked: [],
            tableData: [],
            visible: [],
            tray: [],
            printLog: localStorage.getItem("printlog")
                ? JSON.parse(localStorage.getItem("printlog"))
                : [],
            trayUser: 0,
            style: localStorage.getItem("interfacestyle")
                ? localStorage.getItem("interfacestyle")
                : "default-style",
            isOnline: navigator.onLine,
            userInfo: [],
            filter: '',
        }
    },
    getters: {
        isDemo: (state) => {
            return state.appInfo.mode == 'local' || state.appInfo.mode == 'staging' || state.appInfo.mode == 'demo'
        },

        changeStyle: (state, style) => {
            state.style = style;
        },


        addTableData: (state, data) => {
            state.tableData = data;
        },
        addTray: (state, order) => {
            state.tray.push(order);
        },
        removeTray: (state, id) => {
            let removeIndex = state.tray
                .map(function (item) {
                    return item.TrayID;
                })
                .indexOf(parseInt(id));

            ~removeIndex && state.tray.splice(removeIndex, 1);
        },
        removeTrayPrescription: (state, id) => {
            let removeIndex = state.tray
                .map(function (item) {
                    return item.PrescriptionID;
                })
                .indexOf(parseInt(id));

            ~removeIndex && state.tray.splice(removeIndex, 1);
        },

        orderFilter: (state) => {

            return state.filter || useRoute().query.orderFilter ||
                localStorage.getItem('dashboard.orderFilter')
                ? localStorage.getItem('dashboard.orderFilter')
                : state.userInfo.role == 20 || state.userInfo.role == 19
                    ? 'approved'
                    : 'new'
        }

    },
    actions: {
        addChecked(id) {
            if (this.checked.indexOf(id) == -1) {
                this.checked.push(id);
            }
        },
        removeChecked(id) {
            var index = this.checked.indexOf(id);
            if (index !== -1) this.checked.splice(index, 1);
        },
        addLog(order) {
            this.printLog.unshift(order);
            localStorage.setItem("printlog", JSON.stringify(this.printLog));
        },
        clearLogs() {
            this.printLog = [];
            localStorage.removeItem("printlog");
        },
        clearTray() {
            this.tray = [];
        },
        setAppInfo(data) {
            this.appInfo = data;
        },
        setUserInfo(data) {
            this.userInfo = data;
        },
        updateOnlineStatus(e) {
            const { type } = e;
            this.isOnline = type === 'online'
        },
        changeOrder(filter) {
            this.filter = filter;
            localStorage.setItem('dashboard.orderFilter', filter);
        },
        refreshTray(orders) {
            this.tray = orders;
        },
        replaceChecked(ids) {
            this.checked = ids;
        },
        replaceVisible(ids) {
            this.visible = ids;
        },
        toggleChecked(id) {
            let index = this.checked.indexOf(id);
            if (index !== -1) {
                this.checked.splice(index, 1);
            } else {
                this.checked.push(id);
            }
        },
    },
});
