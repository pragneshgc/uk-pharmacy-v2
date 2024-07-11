<template>
    <header>
        <div class="logo"><a href="/"></a></div>
        <form @submit.prevent="search" autocomplete="on">
            <div class="formItemsGroup floatLeft" style="display: flex;justify-content: center;align-items: center;">
                <input v-model="orderID" class="tBox tBoxSize02" type="text" placeholder="ESA Order ID" />
                <input v-model="refNo" class="tBox tBoxSize02" type="text" placeholder="Client Reference Number" />
                <button title="Search for orders by reference number or ESA order ID"
                    :disabled="orderID == '' && refNo == ''" class="btn btnSize02 tertiaryBtn" type="submit">
                    Search
                </button>
            </div>
        </form>

        <div class="user">
            <ul>
                <li @dblclick="switchStyle()" style="user-select: none;">
                    <a href="javascript:;">
                        <span>
                            <i class="fa fa-user"></i>
                            <b>{{ userInfo.name }} {{ userInfo.surname }}</b>
                            <br>
                            Login time: {{ userInfo.loginAt }}
                        </span>
                    </a>
                </li>
                <li class="big-icon" title="App Info" style="padding: 0px;">
                    <router-link style="padding: 0 10px;" to="/info">
                        <i class="fa fa-info"></i>
                    </router-link>
                </li>
                <li class="big-icon"
                    :title="messageCount > 0 ? `${messageCount} notifications require your attention` : 'No new notifications'"
                    style="padding: 0 10px; position: relative;" @click="viewAlerts()">
                    <i class="fa fa-envelope"></i>
                    <span class="badge" v-if="messageCount > 0"
                        style="position: absolute;right: 5px;color: white;background:#ff8944;bottom: -5px; border: 1px solid transparent;
                        font-size: 14px;width: 20px;height: 20px;border-radius: 5px;display: flex; justify-content:center; align-items:center;">
                        {{ messageCount }}
                    </span>
                </li>
                <!-- <li>
                    <a href="javascript:;">
                        <i class="fa fa-question-circle"></i>
                        FAQ
                    </a>
                </li> -->
                <li class="big-icon" title="Logout">
                    <span @click="logout()" class="clickable">
                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                    </span>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
import Error from '../../mixins/errors'
import DOMPurify from 'dompurify';

export default {
    mixins: [Error],
    data: function () {
        return {
            userInfo: userInfo,
            orderID: '',
            refNo: '',
            messageCount: 0,
        }
    },
    mounted() {
        this.getAlertNotifications();
        this.emitter.on('orderupdate', this.getAlertNotifications);

        this.emitter.on('alertupdate', (e) => {
            this.getAlertNotifications();
        });
    },
    destroyed() {
        this.emitter.off('alertupdate', (e) => {
            this.getAlertNotifications();
        });
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        }
    },
    methods: {
        switchStyle() {
            let style = 'default-style';

            if (this.$store.state.style == 'default-style') {
                style = 'redesign-style';
            }

            this.$store.commit('changeStyle', style);
            localStorage.setItem('interfacestyle', style);
        },
        search() {
            if (this.orderID == '' && this.refNo != '') {
                this.refNo = DOMPurify.sanitize(this.refNo);
                this.getOrderID(this.refNo, () => {
                    //this.emitter.emit('orderupdate');
                    if (Array.isArray(this.orderID)) {
                        // this.$router.push({name: 'duplicate', params: {id: this.refNo}});
                        this.emitter.emit('showduplicates', { duplicateReference: this.refNo });
                        this.postError(`Duplicate orders for reference number ${this.refNo} found. Displaying orders.`);
                        this.orderID = '';
                        this.refNo = '';
                    } else {
                        this.$router.push({ name: 'prescription', params: { id: this.orderID } });
                        this.orderID = '';
                        this.refNo = '';
                    }
                });
            } else {
                this.emitter.emit('prescriptionloading');
                this.$router.push({ name: 'prescription', params: { id: this.orderID } });
                this.orderID = '';
                this.refNo = '';
            }

        },
        getOrderID(refNo, cb) {
            axios.get('/order/reference/' + refNo)
                .then((response) => {
                    this.orderID = response.data.data;
                    cb();
                })
                .catch((error) => {
                    this.postError(`No orders for reference number ${this.refNo} found!`);
                })
        },
        logout() {
            window.loggingOut = true;//set this so the default page exit routine doesn't get triggered

            axios.post('/logs/page-exit')
                .then((response) => {
                    axios.post('/logout')
                        .then((response) => {
                            location.replace('/login');
                        })
                        .catch((error) => {
                            this.postError(error);
                        })
                })
                .catch((error) => {
                    this.postError(error);
                })
        },
        getAlertNotifications() {
            axios.get('/dashboard/alerts-count')
                .then((response) => {
                    this.messageCount = response.data.data;
                })
                .catch((error) => {
                    this.postError(error.response.data.message);
                })
        },
        viewAlerts() {
            if (this.currentRouteName == 'in tray' || this.currentRouteName == 'dashboard') {
                this.emitter.emit('changefilter', { filter: 'ordercount' });
            } else {
                localStorage.setItem('dashboard.orderFilter', 'ordercount');
                this.$router.push({ name: 'in tray' });
            }
        }
    },
}
</script>
