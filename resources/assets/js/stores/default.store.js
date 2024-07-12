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
    },
    actions: {
        isDemo() {
            return this.appInfo.mode == 'local' || this.appInfo.mode == 'staging' || this.appInfo.mode == 'demo'
        },
        changeStyle(style) {
            this.style = style;
        },
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

        addTableData(data) {
            this.tableData = data;
        },
        addTray(order) {
            this.tray.push(order);
        },
        removeTray(id) {
            let removeIndex = this.tray
                .map(function (item) {
                    return item.TrayID;
                })
                .indexOf(parseInt(id));

            ~removeIndex && this.tray.splice(removeIndex, 1);
        },
        removeTrayPrescription(id) {
            let removeIndex = this.tray
                .map(function (item) {
                    return item.PrescriptionID;
                })
                .indexOf(parseInt(id));

            ~removeIndex && this.tray.splice(removeIndex, 1);
        },
        orderFilter() {

            return this.filter || useRoute().query.orderFilter ||
                localStorage.getItem('dashboard.orderFilter')
                ? localStorage.getItem('dashboard.orderFilter')
                : this.userInfo.role == 20 || this.userInfo.role == 19
                    ? 'approved'
                    : 'new'
        }
    },
});
