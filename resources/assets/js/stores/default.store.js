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
        addChecked: (state, id) => {
            if (state.checked.indexOf(id) == -1) {
                state.checked.push(id);
            }
        },
        changeStyle: (state, style) => {
            state.style = style;
        },
        removeChecked: (state, id) => {
            var index = state.checked.indexOf(id);
            if (index !== -1) state.checked.splice(index, 1);
        },
        toggleChecked: (state, id) => {
            let index = state.checked.indexOf(id);
            if (index !== -1) {
                state.checked.splice(index, 1);
            } else {
                state.checked.push(id);
            }
        },
        replaceChecked: (state, ids) => {
            state.checked = ids;
        },
        replaceVisible: (state, ids) => {
            state.visible = ids;
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
        clearTray: (state) => {
            state.tray = [];
        },
        addLog: (state, order) => {
            state.printLog.unshift(order);
            localStorage.setItem("printlog", JSON.stringify(state.printLog));
        },
        clearLogs: (state) => {
            state.printLog = [];
            localStorage.removeItem("printlog");
        },
        checked: (state) => {
            return state.checked;
        },
        visible: (state) => {
            return state.visible;
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
    },
});
