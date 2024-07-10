webpackJsonp([11],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/PrescriptionPool.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _errors = __webpack_require__("./resources/assets/js/mixins/errors.js");

var _errors2 = _interopRequireDefault(_errors);

var _QuickTray = __webpack_require__("./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue");

var _QuickTray2 = _interopRequireDefault(_QuickTray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    components: {
        QuickTray: _QuickTray2.default
    },
    mixins: [_errors2.default],
    data: function data() {
        return {
            idsVisible: false,
            showLogs: false,
            orders: [],
            dispensers: [],
            userInfo: userInfo,
            imgMap: {
                3: 'images/logo/tnt.png',
                4: 'images/logo/dpd.png',
                5: 'images/logo/rmail.png',
                7: 'images/logo/ups.png',
                70: 'images/logo/ups_access_point.jpg',
                8: 'images/logo/tnt.png',
                10: 'images/logo/dhl.png'
            }
        };
    },
    computed: {
        showListText: function showListText() {
            return this.idsVisible ? "Hide List of Order ID's" : "Show List of Order ID's";
        },
        availableCount: function availableCount() {
            return this.orders.filter(function (item) {
                return item.UserID === 0;
            }).length;
        },
        tray: function tray() {
            return this.$store.state.tray;
        },
        trayIds: function trayIds() {
            return this.$store.state.tray.map(function (order) {
                return order.PrescriptionID;
            });
        },
        printLog: function printLog() {
            return this.$store.state.printLog;
        },
        trayCompany: function trayCompany() {
            var companies = [];

            this.tray.forEach(function (item) {
                if (item.DeliveryID == 5 && item.CompanyName != 'EveAdam' && !item.JVM) {
                    if (!companies.includes('rml')) {
                        companies.push('rml');
                    }
                }

                if (item.DeliveryID == 4 && item.CompanyName != 'EveAdam' && !item.JVM) {
                    if (!companies.includes('dpd')) {
                        companies.push('dpd');
                    }
                }

                if (item.DeliveryID == 7 && item.PaymentMethod == 0 && item.CompanyName != 'EveAdam' && !item.JVM) {
                    if (!companies.includes('ups')) {
                        companies.push('ups');
                    }
                }

                if (item.DeliveryID == 7 && item.PaymentMethod != 0 && item.CompanyName != 'EveAdam' && !item.JVM) {
                    if (!companies.includes('upscod')) {
                        companies.push('upscod');
                    }
                }

                if (item.DeliveryID == 10 && item.CompanyName != 'EveAdam' && !item.JVM) {
                    if (!companies.includes('dhl')) {
                        companies.push('dhl');
                    }
                }

                if (item.CompanyName == 'EveAdam' && !item.JVM) {
                    if (!companies.includes('eveadam')) {
                        companies.push('eveadam');
                    }
                }

                if (item.JVM == 1) {
                    if (!companies.includes('jvm')) {
                        companies.push('jvm');
                    }
                }
            });

            return companies;
        },
        count: function count() {
            var response = {
                available: 0,
                rml: 0,
                dpd: 0,
                ups: 0,
                upscod: 0,
                dhl: 0,
                eveadam: 0,
                jvm: 0
            };

            this.orders.forEach(function (item) {
                if (item.UserID == 0) {
                    response.available++;
                }

                if (item.DeliveryID == 5 && item.UserID == 0) {
                    response.rml++;
                }

                if (item.DeliveryID == 4 && item.UserID == 0) {
                    response.dpd++;
                }
            });

            return response;
        }
    },
    mounted: function mounted() {
        var _this = this;

        this.refresh();

        this.$root.$on('tray.clear', function () {
            _this.refresh();
        });
    },

    methods: {
        getPendingOrders: function getPendingOrders() {
            var _this2 = this;

            axios.post('/prescription-pool/orders-list', { ids: this.trayIds }).then(function (response) {
                console.log('response');
            }).catch(function (error) {
                _this2.postError(error.response.data.message);
            });
        },
        refresh: function refresh() {
            this.getOrders();
            this.getDispensers();
        },
        toggleOrderList: function toggleOrderList() {
            this.idsVisible = !this.idsVisible;
            if (this.idsVisible) {
                this.refresh();
            }
        },
        getOrders: function getOrders() {
            var _this3 = this;

            axios.get('/prescription-pool/orders').then(function (response) {
                _this3.orders = response.data.data;
            }).catch(function (error) {
                _this3.postError(error.response.data.message);
            });
        },
        getDispensers: function getDispensers() {
            var _this4 = this;

            axios.get('/prescription-pool/dispensers').then(function (response) {
                _this4.dispensers = response.data.data;
            }).catch(function (error) {
                _this4.postError(error.response.data.message);
            });
        },
        allocate: function allocate() {
            var userID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var _this5 = this;

            var deliveryID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var orderID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            axios.post('/prescription-pool/allocate', { userID: userID, deliveryID: deliveryID, orderID: orderID }).then(function (response) {
                _this5.refresh();
                _this5.$root.$emit('tray.refresh');
            }).catch(function (error) {
                _this5.postError(error.response.data.message);
            });
        },
        release: function release() {
            var userID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var _this6 = this;

            var dispenserPoolID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (all) {
                this.checkMessage('Are you sure you want to release all orders!', function () {
                    _this6.releaseRequest(userID, dispenserPoolID, all);
                });
            } else {
                this.releaseRequest(userID, dispenserPoolID, all);
            }
        },
        releaseRequest: function releaseRequest() {
            var userID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var _this7 = this;

            var dispenserPoolID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            axios.post('/prescription-pool/release', { userID: userID, dispenserPoolID: dispenserPoolID, all: all }).then(function (response) {
                _this7.refresh();
                _this7.$root.$emit('tray.refresh');
            }).catch(function (error) {
                _this7.postError(error.response.data.message);
            });
        },
        viewAssigned: function viewAssigned() {
            this.$root.$emit('tray.toggle');
        },
        checkMessage: function checkMessage(message, callback) {
            this.$swal({
                title: 'Are you sure you want to release all orders?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, release everything!'
            }).then(function (result) {
                if (result.value) {
                    callback();
                }
            });
        },
        reprint: function reprint(id) {
            this.$root.$emit('prescriptionpool.reprint', id);
        }
    }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _orderStatuses = __webpack_require__("./resources/assets/js/mixins/constants/orderStatuses.js");

var _orderStatuses2 = _interopRequireDefault(_orderStatuses);

var _errors = __webpack_require__("./resources/assets/js/mixins/errors.js");

var _errors2 = _interopRequireDefault(_errors);

var _print = __webpack_require__("./resources/assets/js/mixins/print.js");

var _print2 = _interopRequireDefault(_print);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_orderStatuses2.default, _errors2.default, _print2.default],
    components: {
        'Notes': function Notes() {
            return __webpack_require__.e/* import() */(31).then(__webpack_require__.bind(null, "./resources/assets/js/components/pages/prescriptionpool/NotesPopup.vue"));
        },
        'Modal': function Modal() {
            return __webpack_require__.e/* import() */(1/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/js/components/Modal.vue"));
        }
    },
    data: function data() {
        return {
            loading: false,
            locked: false,
            printing: false,
            lockTimer: null,
            historyLoading: false,
            notesLoading: false,
            notesAlert: false,
            duplicate: false,
            notesConfirmed: false,
            expandHistory: false,
            orders: [],
            notes: [],
            selected: null,
            history: [],
            user: {
                info: userInfo,
                selected: userInfo.id,
                list: []
            }
        };
    },

    computed: {
        trayIds: function trayIds() {
            return this.$store.state.tray.map(function (order) {
                return order.PrescriptionID;
            });
        },
        filteredHistory: function filteredHistory() {
            if (this.expandHistory) {
                return this.history;
            } else {
                return this.history.slice(0, 3);
            }
        },
        totalNotesCount: function totalNotesCount() {
            //we are not taking into account correspondence notes
            return this.notes.length == 0 ? 0 : /*this.notes.correspondence.length + */this.notes.critical.length + this.notes.information.length + this.notes.other.length;
        },
        printable: function printable() {
            var nameMismatch = false;

            this.selected.Products.forEach(function (product) {
                if (!product.CorrectName) {
                    nameMismatch = true;
                }
            });

            var isPrintable = this.totalNotesCount == 0 && !this.duplicate && !nameMismatch ? true : this.notesConfirmed ? true : false;

            return isPrintable;
        }
    },
    mounted: function mounted() {
        var _this = this;

        this.getOrders();
        this.$root.$on('prescriptionpool.getnotes', this.getNotes);
        this.$root.$on('orderupdate', this.getNotes);
        this.$root.$on('alertupdate', this.getNotes);
        this.$root.$on('prescriptionpool.reprint', this.reprint);

        this.lockTimer = setInterval(function () {
            _this.checkLock();
        }, 5000);
    },
    destroyed: function destroyed() {
        this.$root.$off('prescriptionpool.getnotes', this.getNotes);
        this.$root.$off('orderupdate', this.getNotes);
        this.$root.$off('alertupdate', this.getNotes);
        this.$root.$off('prescriptionpool.reprint', this.reprint);

        clearInterval(this.lockTimer);
    },

    watch: {
        trayIds: function trayIds(newValue, oldValue) {
            this.getOrders();

            if (oldValue.length == 0 && newValue.length > 0) {
                this.$store.commit('clearLogs');
            }
        },
        selected: function selected() {
            this.getHistory();
            this.getNotes();
        },
        locked: function locked() {
            var _this2 = this;

            if (!this.locked) {
                this.getOrders(function () {
                    var temporarySelected = JSON.parse(JSON.stringify(_this2.selected));
                    _this2.selected = null;
                    _this2.selectOrder(temporarySelected);
                    _this2.takeOverOrder(_this2.selected.PrescriptionID);
                });
            }
        }
    },
    methods: {
        selectOrder: function selectOrder(prescription) {
            var _this3 = this;

            // this.loading = true;
            this.selected = prescription;

            this.selected.Products.forEach(function (product) {
                if (product.Name != product.Description) {
                    _this3.alternativeNameCheck(product, _this3.selected.ClientID, function (result) {
                        product.CorrectName = result;
                    });
                } else {
                    product.CorrectName = true;
                }
            });

            this.checkLock(function () {
                if (!_this3.locked) {
                    _this3.takeOverOrder(_this3.selected.PrescriptionID);
                }

                _this3.$root.$emit('prescriptionloaded', { prescription: prescription });
                // this.loading = false;
            });

            this.checkOrderStatuses(this.selected.PrescriptionID);
        },
        getOrders: function getOrders() {
            var _this4 = this;

            var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.loading = true;
            axios.post('/prescription-pool/quick-tray', { ids: this.trayIds }).then(function (response) {
                _this4.orders = response.data.data;

                if (_this4.orders.length > 0 && !callback) {
                    _this4.selectOrder(_this4.orders[0]);
                } else if (callback) {
                    callback();
                }
            }).catch(function (error) {
                console.log(error);
            }).finally(function () {
                _this4.loading = false;
            });
        },
        checkOrderStatuses: function checkOrderStatuses(id) {
            var _this5 = this;

            axios.get('/order/' + id + '/statuses').then(function (response) {
                _this5.duplicate = response.data.data.duplicate;
            }).catch(function (error) {
                _this5.postError(error.response.data.message);
            });
        },
        getHistory: function getHistory() {
            var _this6 = this;

            this.historyLoading = true;

            axios.get('/order/' + this.selected.PrescriptionID + '/history').then(function (response) {
                _this6.expandHistory = false;
                _this6.history = response.data.data;
            }).catch(function (error) {
                _this6.postError(error.response.data.message);
            }).finally(function () {
                _this6.historyLoading = false;
            });
        },

        /**
         * Get notes related to the current order
         */
        getNotes: function getNotes() {
            var _this7 = this;

            this.notesLoading = true;
            this.notesConfirmed = false;

            axios.get('/order/' + this.selected.PrescriptionID + '/notes').then(function (response) {
                _this7.notes = response.data.data;

                //check if alerts are shown, if not show them
                if (_this7.notes.alerts.length > 0) {
                    var html = '\n                    <div class="medicineDetails" style="width: 100%;">\n                    <p>Please review the notes below:</p>\n                    <ul class="other">';

                    var alertCount = 0;
                    var type = 0;

                    _this7.notes.alerts.sort(function (a, b) {
                        return a.Type > b.Type ? 1 : -1;
                    });

                    _this7.notes.alerts.forEach(function (alert) {
                        if (alert.DeletedAt == null && alert.EditedAt == null) {
                            alertCount++;

                            if (alert.Type != type) {
                                type = alert.Type;
                                html += '<li class="note-header ' + (type == 1 ? 'note-header__danger' : '') + '"><div>' + (type == 1 ? 'Patient Notes' : 'Order Notes') + '</div></li>';
                            }

                            html += '\n                            <li class="note" \n                            title="' + (alert.Type == 2 ? 'Queried Alert' : alert.Type == 1 ? 'Patient Alert' : 'Order Alert') + ' created by ' + alert.name + ' ' + alert.surname + '"\n                            style="' + (alert.Type == 2 ? 'border-left: 5px solid #32a36a;' : alert.Type == 1 ? 'border-left: 5px solid #ff5151;' : '') + '">\n                            <div class="note-body" style="text-align: initial;">\n                            <p>' + alert.Note + '</p>\n                            </div> \n                            <div class="note-footer">\n                            <span>' + (alert.name + ' ' + alert.surname) + '</span>\n                            <span>' + alert.CreatedAt + '</span>\n                            </div>\n                            </li>';
                        }
                    });

                    html += '</ul></div>';

                    if (alertCount > 0) {
                        _this7.notesAlert = html;
                    } else {
                        _this7.notesAlert = false;
                    }
                } else {
                    _this7.notesAlert = false;
                }
            }).catch(function (error) {
                _this7.postError(error.response.data.message);
            }).finally(function () {
                _this7.notesLoading = false;
            });
        },
        tryPrint: function tryPrint() {
            var _this8 = this;

            // if(this.notesAlert){
            //     this.showNotesAlert();
            if (!this.printable) {
                this.openNotes();
            } else {
                this.printing = true;
                this.dispenserPrint('delivery', false, function () {
                    _this8.dispenserPrint('label', false, function () {
                        _this8.selected.time = Date.now();
                        _this8.selected.action = 'Printed';
                        _this8.$store.commit('addLog', _this8.selected);
                        _this8.$root.$emit('tray.changeprescriptionstatus', { id: _this8.selected.PrescriptionID, status: 7 });
                        _this8.printing = false;
                    });
                });
            }
        },
        reprint: function reprint(id) {
            this.dispenserPrint('delivery', id);
            this.dispenserPrint('label', id);
            var prescription = { PrescriptionID: id, action: 'Reprinted', time: Date.now() };
            this.$store.commit('addLog', prescription);
        },
        dispenserPrint: function dispenserPrint(type) {
            var _this9 = this;

            var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (!id) {
                id = this.selected.PrescriptionID;
            }
            //print routine here
            if (type == 'delivery') {
                axios.get('/order/' + id + '/view').then(function (response) {
                    var url = response.data.data.url;
                    var type = response.data.data.type;
                    var printer = false;

                    if (localStorage.getItem('settings.application')) {
                        var deliveryNotePrinter = JSON.parse(localStorage.getItem('settings.application')).deliveryNotePrinter;

                        printer = deliveryNotePrinter;
                    }

                    if (type == 'pdf') {
                        _this9.printUrl(url + '?token=' + _this9.user.info.token + '&print=true', function () {
                            _this9.$root.$emit('orderupdate');

                            if (callback) {
                                callback();
                            }
                        }, 'pdf', printer);
                    } else {
                        //test and delete this as necessary
                        var _url = 'https://esasys.co.uk/?showFile&PRESCRIPTIONID=' + id;

                        _this9.printUrl(_url, function () {
                            axios.get('/prescription/' + id + '/log-print?token=' + _this9.user.info.token).then(function (response) {
                                _this9.$root.$emit('orderupdate');

                                if (callback) {
                                    callback();
                                }
                            }).catch(function (error) {
                                console.log(error);
                                _this9.postError(error.response.data.message);
                            });
                        }, 'pdf', printer);
                    }
                }).catch(function (error) {
                    _this9.postError(error.response.data.message);
                });
            } else if (type == 'label') {
                axios.get('/order/' + id + '/label').then(function (response) {
                    var url = response.data.data.url;
                    var printer = false;

                    if (localStorage.getItem('settings.application')) {
                        printer = JSON.parse(localStorage.getItem('settings.application')).labelPrinter;
                    }

                    _this9.printUrl(url + '?token=' + _this9.user.info.token + '&print=true', function () {
                        _this9.$root.$emit('orderupdate');

                        if (callback) {
                            callback();
                        }
                    }, 'pdf', printer, true);
                }).catch(function (error) {
                    console.log(error);
                    _this9.postError(error.response.data.message);
                });
            }
        },

        //revert an activity
        openNotes: function openNotes() {
            this.$root.$emit('modal.open', 'quicktraynotes');
        },
        confirmNotes: function confirmNotes() {
            this.notesConfirmed = true;
            this.$root.$emit('modal.close', 'quicktraynotes');
        },
        showNotesAlert: function showNotesAlert() {
            var _this10 = this;

            this.$swal({
                title: 'Important notes!',
                html: this.notesAlert,
                type: 'warning',
                showCancelButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                focusConfirm: false,
                // customClass: 'swal-wide',
                confirmButtonColor: '#3085d6',
                // cancelButtonColor: '#d33',
                confirmButtonText: "I've read these notes!"
            }).then(function (result) {
                if (result.value) {
                    _this10.notesAlert = false;
                }
            });
        },
        statusClass: function statusClass(status) {
            return [1, 7].includes(status) ? 'active' : [2, 8].includes(status) ? 'success' : [4, 5, 9, 10, 11, 12, 13, 14, 15].includes(status) ? 'warning' : [16].includes(status) ? 'returned' : [3, 6].includes(status) ? 'error' : '';
        },

        //locking/unlocking orders
        checkLock: function checkLock() {
            var _this11 = this;

            var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (this.selected) {
                axios.get('/logs/locked/' + this.selected.PrescriptionID).then(function (response) {
                    if (response.data.data) {
                        _this11.locked = response.data.data.Name + ' ' + response.data.data.Surname;
                    } else {
                        _this11.locked = false;
                    }
                }).catch(function (error) {
                    console.log(error);
                    _this11.locked = false;
                }).finally(function () {
                    if (callback) {
                        callback();
                    }
                });
            }
        },
        unlockOrder: function unlockOrder(id) {
            var _this12 = this;

            axios.post('logs/unlock/' + id).then(function (response) {
                _this12.locked = false;
            }).catch(function (error) {
                console.log(error);
                _this12.locked = false;
            });
        },
        takeOverOrder: function takeOverOrder(id) {
            var _this13 = this;

            axios.post('logs/takeover/' + id).then(function (response) {
                _this13.locked = false;
            }).catch(function (error) {
                console.log(error);
                _this13.locked = false;
            });
        },
        alternativeNameCheck: function alternativeNameCheck(product, client, callback) {
            var _this14 = this;

            axios.get('/inventory/products/alternative-name?code=' + product.ProductCodeID + '&name=' + encodeURI(product.Description) + '&client=' + client).then(function (response) {
                callback(response.data.data);
            }).catch(function (error) {
                _this14.postError(error.response.data.message);
            });
        },

        //Resolve the product name discrepancy
        discrepancyResolution: function discrepancyResolution(resolution) {
            var _this15 = this;

            var product = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            //if resolution is positive then add the product to productnamealternative list and refresh
            //if not move the prescription to safety check
            if (resolution) {
                this.loading = true;
                axios.post('/inventory/products/approve-discrepancy', {
                    ProductCodeID: product.ProductCodeID, ClientID: this.prescription.ClientID,
                    UserID: this.userInfo.id, AlternativeName: product.Description
                }).then(function (response) {
                    _this15.postSuccess('Alternative name approved');
                    _this15.loading = false;
                    _this15.search();
                }).catch(function (error) {
                    _this15.loading = false;
                    _this15.postError(error.response.data.message);
                });
            } else {
                this.prescriptionStatus = 91;
                this.updateStatus();
            }
        },
        redirect: function redirect(PrescriptionID) {
            this.$router.push({ name: 'prescription', params: { id: PrescriptionID } });
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-65186cb8\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/PrescriptionPool.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "content prescription-pool" },
    [
      _c(
        "section",
        { staticClass: "card" },
        [
          _vm._m(0),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "card-body",
              staticStyle: {
                display: "flex",
                "justify-content": "space-between"
              }
            },
            [
              _c("div", [
                _c(
                  "button",
                  {
                    staticClass: "btn btnSize02 secondaryBtn mb-10",
                    attrs: { title: _vm.showListText },
                    on: {
                      click: function($event) {
                        return _vm.toggleOrderList()
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n                    " +
                        _vm._s(_vm.showListText) +
                        "\n                "
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btnSize02 secondaryBtn mb-10",
                    attrs: { title: "View all orders assigned to you" },
                    on: {
                      click: function($event) {
                        return _vm.viewAssigned()
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n                    View Assigned Orders\n                "
                    )
                  ]
                ),
                _vm._v(" "),
                _vm.printLog.length > 0
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btnSize02 secondaryBtn mb-10",
                        on: {
                          click: function($event) {
                            _vm.showLogs = !_vm.showLogs
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm.showLogs ? "Hide" : "Show") +
                            " Print Logs\n                "
                        )
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.tray.length > 0
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btnSize02 tertiaryBtn",
                        attrs: {
                          title:
                            "Release orders assigned to " + _vm.userInfo.name
                        },
                        on: {
                          click: function($event) {
                            return _vm.release(_vm.userInfo.esa_user_id, false)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                    Release Orders\n                "
                        )
                      ]
                    )
                  : _c(
                      "button",
                      {
                        staticClass: "btn btnSize02 secondaryBtn mb-10",
                        attrs: {
                          title: "Release all assigned orders",
                          disabled: _vm.count.available == _vm.orders.length
                        },
                        on: {
                          click: function($event) {
                            return _vm.release(false, false, true)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                    Release All\n                "
                        )
                      ]
                    )
              ]),
              _vm._v(" "),
              _c("transition", { attrs: { name: "fade" } }, [
                _vm.printLog.length > 0 && _vm.showLogs
                  ? _c("div", { staticClass: "prescription-pool_print-log" }, [
                      _c(
                        "ul",
                        [
                          _c(
                            "li",
                            {
                              staticStyle: {
                                "border-bottom": "1px solid gainsboro"
                              }
                            },
                            [_vm._v("Print Log")]
                          ),
                          _vm._v(" "),
                          _vm._l(_vm.printLog, function(log) {
                            return _c("li", { key: log.PrescriptionID }, [
                              _c("span", [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(log.action) +
                                    " \n                            "
                                ),
                                _c("b", [
                                  _c(
                                    "a",
                                    {
                                      attrs: {
                                        target: "_blank",
                                        href:
                                          "#/prescription/" + log.PrescriptionID
                                      }
                                    },
                                    [_vm._v(_vm._s(log.PrescriptionID))]
                                  )
                                ]),
                                _vm._v(
                                  " \n                            on " +
                                    _vm._s(
                                      new Date(log.time).toLocaleTimeString(
                                        "en-GB"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]),
                              _vm._v(" "),
                              _c(
                                "button",
                                {
                                  staticClass: "btn btnSize03 secondaryBtn",
                                  staticStyle: { padding: "4px" },
                                  on: {
                                    click: function($event) {
                                      return _vm.reprint(log.PrescriptionID)
                                    }
                                  }
                                },
                                [_vm._v("Reprint")]
                              )
                            ])
                          })
                        ],
                        2
                      )
                    ])
                  : _vm._e()
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c("transition", { attrs: { name: "fade" } }, [
            _vm.idsVisible
              ? _c("div", { staticClass: "card-body order-id-list" }, [
                  _c("hr"),
                  _vm._v(" "),
                  _vm.orders.length > 0
                    ? _c(
                        "ul",
                        [
                          _c("li", { staticClass: "pool-list-layout" }, [
                            _c("div", { staticClass: "pool-column" }, [
                              _c("b", [_vm._v("Order ID")])
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "pool-column" }, [
                              _c("b", [_vm._v("Allocated To")])
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "pool-column" }, [
                              _c("b", [_vm._v("Type")])
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "pool-actions" }, [
                              _c("b", [_vm._v("Tools")])
                            ])
                          ]),
                          _vm._v(" "),
                          _vm._l(_vm.orders, function(order) {
                            return _c(
                              "li",
                              {
                                key: order.PrescriptionID,
                                staticClass: "pool-list-layout"
                              },
                              [
                                _c("div", { staticClass: "pool-column" }, [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(order.PrescriptionID) +
                                      "\n                        "
                                  )
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "pool-column" }, [
                                  order.name == null && order.surname == null
                                    ? _c("span", [
                                        _vm._v(
                                          "\n                                Not Assigned\n                            "
                                        )
                                      ])
                                    : _c("span", [
                                        _vm._v(
                                          _vm._s(
                                            order.name + " " + order.surname
                                          )
                                        )
                                      ])
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "pool-column" }, [
                                  order.DeliveryID == 5
                                    ? _c("b", [_vm._v("Royal Mail")])
                                    : order.DeliveryID == 4
                                    ? _c("b", [_vm._v("DPD")])
                                    : order.DeliveryID == 7 &&
                                      order.PaymentMethod == 0
                                    ? _c("b", [_vm._v("UPS")])
                                    : order.DeliveryID == 7 &&
                                      order.PaymentMethod != 0
                                    ? _c("b", [_vm._v("UPS COD")])
                                    : order.DeliveryID == 10
                                    ? _c("b", [_vm._v("DHL")])
                                    : _c("b", [_vm._v("UNKNOWN")])
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "pool-actions" }, [
                                  _c(
                                    "button",
                                    {
                                      staticClass: "btn btnSize02 tertiaryBtn",
                                      attrs: {
                                        disabled:
                                          order.UserID ==
                                            _vm.userInfo.esa_user_id ||
                                          _vm.userInfo.role != 20
                                      },
                                      on: {
                                        click: function($event) {
                                          return _vm.allocate(
                                            false,
                                            false,
                                            order.DispenserPoolID
                                          )
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                                Take Over\n                            "
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btnSize02 tertiaryBtn ml-20",
                                      attrs: { disabled: order.UserID == 0 },
                                      on: {
                                        click: function($event) {
                                          return _vm.release(
                                            false,
                                            order.DispenserPoolID
                                          )
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                                Release\n                            "
                                      )
                                    ]
                                  )
                                ])
                              ]
                            )
                          })
                        ],
                        2
                      )
                    : _c("div", [
                        _vm._v(
                          "\n                    No orders found\n                "
                        )
                      ])
                ])
              : _vm._e()
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c("QuickTray"),
      _vm._v(" "),
      _vm.tray.length == 0
        ? _c("section", { staticClass: "card" }, [
            _vm._m(1),
            _vm._v(" "),
            _c("div", { staticClass: "card-body" }, [
              _c(
                "ul",
                [
                  _c("li", { staticClass: "pool-list-layout" }, [
                    _vm._m(2),
                    _vm._v(" "),
                    _c("div", { staticClass: "pool-column" }, [
                      _c("b", [_vm._v(_vm._s(_vm.count.available))])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "pool-actions" }, [
                      _vm._m(3),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btnSize02 tertiaryBtn ml-20",
                          attrs: {
                            title: "Take over all available Royal Mail orders",
                            disabled:
                              (_vm.userInfo.role != 20 &&
                                _vm.userInfo.role != 19) ||
                              _vm.count.rml == 0 ||
                              (!_vm.trayCompany.includes("rml") &&
                                _vm.trayCompany.length > 0)
                          },
                          on: {
                            click: function($event) {
                              return _vm.allocate(false, "rml", false)
                            }
                          }
                        },
                        [
                          _vm._v("\n                            Royal Mail "),
                          _c("b", [_vm._v("(" + _vm._s(_vm.count.rml) + ")")])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btnSize02 tertiaryBtn ml-20",
                          attrs: {
                            title: "Take over all available DPD orders",
                            disabled:
                              (_vm.userInfo.role != 20 &&
                                _vm.userInfo.role != 19) ||
                              _vm.count.dpd == 0 ||
                              (!_vm.trayCompany.includes("dpd") &&
                                _vm.trayCompany.length > 0)
                          },
                          on: {
                            click: function($event) {
                              return _vm.allocate(false, "dpd", false)
                            }
                          }
                        },
                        [
                          _vm._v("\n                            DPD "),
                          _c("b", [_vm._v("(" + _vm._s(_vm.count.dpd) + ")")])
                        ]
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.dispensers, function(dispenser) {
                    return _c(
                      "li",
                      { key: dispenser.id, staticClass: "pool-list-layout" },
                      [
                        _c("div", { staticClass: "pool-column" }, [
                          _vm._v(
                            "\n                        " +
                              _vm._s(dispenser.name) +
                              "\n                        "
                          ),
                          dispenser.id == _vm.userInfo.id
                            ? _c("b", [_vm._v("(CURRENT USER)")])
                            : _vm._e()
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "pool-column" }, [
                          _c("b", [_vm._v(_vm._s(dispenser.count))])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "pool-actions" }, [
                          dispenser.id != _vm.userInfo.id
                            ? _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btnSize02 tertiaryBtn mr-20",
                                  attrs: {
                                    title:
                                      "Take over orders assigned to " +
                                      dispenser.name,
                                    disabled: dispenser.count == 0
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.allocate(
                                        dispenser.esa_user_id,
                                        false,
                                        false
                                      )
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                            TAKE OVER\n                        "
                                  )
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "btn btnSize02 tertiaryBtn",
                              attrs: {
                                title:
                                  "Release orders assigned to " +
                                  dispenser.name,
                                disabled: dispenser.count == 0
                              },
                              on: {
                                click: function($event) {
                                  return _vm.release(
                                    dispenser.esa_user_id,
                                    false
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                            RELEASE\n                        "
                              )
                            ]
                          )
                        ])
                      ]
                    )
                  })
                ],
                2
              )
            ])
          ])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c("h3", [_vm._v("Prescription Pool")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header pool-list-layout" }, [
      _c("div", { staticClass: "pool-column" }, [
        _vm._v("\n                Dispenser\n            ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "pool-column" }, [
        _vm._v("\n                Available Orders\n            ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "pool-actions" }, [
        _vm._v("\n                Tools\n            ")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "pool-column" }, [
      _c("b", [_vm._v("AVAILABLE IN THE POOL")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "ml-20" }, [
      _c("b", [_vm._v("ALLOCATE NEW (MAX 15)")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-65186cb8", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-e6373468\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "fade" } }, [
    _vm.orders.length > 0
      ? _c(
          "section",
          { staticClass: "card quick-tray" },
          [
            _c("Modal", {
              staticClass: "duplicate-modal",
              attrs: { "modal-name": "quicktraynotes" },
              scopedSlots: _vm._u(
                [
                  {
                    key: "header",
                    fn: function() {
                      return [_c("h2", [_vm._v("Notes and Alerts")])]
                    },
                    proxy: true
                  },
                  {
                    key: "body",
                    fn: function() {
                      return [
                        _c(
                          "div",
                          {
                            staticStyle: {
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              "flex-direction": "column"
                            }
                          },
                          [
                            _c("div", [
                              _c(
                                "ul",
                                { staticStyle: { margin: "5px" } },
                                [
                                  _vm.duplicate
                                    ? _c(
                                        "li",
                                        {
                                          staticClass:
                                            "infoBox warning thin-error",
                                          staticStyle: {
                                            background: "#f53c38",
                                            "font-size": "20px",
                                            padding: "5px",
                                            width: "100%"
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "\n                                There is a possible duplicate order with ID\n                                "
                                          ),
                                          _c(
                                            "a",
                                            {
                                              staticStyle: { color: "#A9E2F3" },
                                              attrs: {
                                                target: "_blank",
                                                href:
                                                  "#/prescription/" +
                                                  _vm.duplicate.PrescriptionID
                                              }
                                            },
                                            [
                                              _vm._v(
                                                "\n                                    " +
                                                  _vm._s(
                                                    _vm.duplicate.PrescriptionID
                                                  ) +
                                                  "\n                                "
                                              )
                                            ]
                                          ),
                                          _vm._v(
                                            " \n                                that has the same customer reference id " +
                                              _vm._s(
                                                _vm.duplicate.ReferenceID
                                              ) +
                                              "\n                                with status " +
                                              _vm._s(
                                                _vm.orderStatuses[
                                                  _vm.duplicate.Status
                                                ]
                                              ) +
                                              _vm._s(
                                                _vm.duplicate.SubStatus
                                                  ? " - " +
                                                      _vm.orderSubStatuses[
                                                        _vm.duplicate.SubStatus
                                                      ]
                                                  : ""
                                              ) +
                                              ".\n                                Please investigate by clicking  \n                                "
                                          ),
                                          _c(
                                            "a",
                                            {
                                              staticStyle: { color: "#A9E2F3" },
                                              attrs: {
                                                target: "_blank",
                                                href:
                                                  "#/prescription/" +
                                                  _vm.duplicate.PrescriptionID
                                              }
                                            },
                                            [
                                              _vm._v(
                                                "\n                                    here\n                                "
                                              )
                                            ]
                                          ),
                                          _vm._v(
                                            "  before processing.\n                            "
                                          )
                                        ]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm._l(_vm.selected.Products, function(
                                    product,
                                    key
                                  ) {
                                    return !product.CorrectName
                                      ? _c(
                                          "li",
                                          {
                                            key: key,
                                            staticClass:
                                              "infoBox warning thin-error",
                                            staticStyle: {
                                              background: "#f53c38",
                                              "font-size": "20px",
                                              padding: "5px",
                                              width: "100%",
                                              "margin-top": "5px"
                                            }
                                          },
                                          [
                                            _c("span", [
                                              _vm._v(
                                                "\n                                    The product name recieved by " +
                                                  _vm._s(
                                                    _vm.selected.CompanyName
                                                  ) +
                                                  " (" +
                                                  _vm._s(product.Description) +
                                                  ") does not match the product name or it's alternatives in ESA (" +
                                                  _vm._s(product.Name) +
                                                  ")\n                                "
                                              )
                                            ])
                                          ]
                                        )
                                      : _vm._e()
                                  })
                                ],
                                2
                              )
                            ]),
                            _vm._v(" "),
                            _c("Notes", {
                              attrs: {
                                locked: _vm.locked,
                                notes: _vm.notes,
                                prescription: _vm.selected
                              }
                            })
                          ],
                          1
                        )
                      ]
                    },
                    proxy: true
                  },
                  {
                    key: "footer",
                    fn: function() {
                      return [
                        _c(
                          "button",
                          {
                            staticClass: "btn btnSize01 primaryBtn bigButton",
                            on: {
                              click: function($event) {
                                return _vm.confirmNotes()
                              }
                            }
                          },
                          [_vm._v("I'VE READ THESE NOTES!")]
                        )
                      ]
                    },
                    proxy: true
                  }
                ],
                null,
                false,
                2997072591
              )
            }),
            _vm._v(" "),
            _c("div", { staticClass: "card-header" }, [
              _c("h3", [
                _vm._v("Pending Orders (" + _vm._s(_vm.orders.length) + ")")
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "card-body", staticStyle: { padding: "0" } },
              [
                _c("table", [
                  _c("thead", [
                    _c("tr", [
                      _c("th", [_vm._v("Prescription")]),
                      _vm._v(" "),
                      _c("th", [_vm._v("Patient")]),
                      _vm._v(" "),
                      _c("th", [_vm._v("Products")]),
                      _vm._v(" "),
                      _c("th", [_vm._v("Notes")]),
                      _vm._v(" "),
                      _c("th", [_vm._v("History")]),
                      _vm._v(" "),
                      _c("th", { staticStyle: { "text-align": "center" } }, [
                        _vm._v("Print")
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "tbody",
                    _vm._l(_vm.orders, function(item) {
                      return _c(
                        "tr",
                        {
                          key: item.PrescriptionID,
                          staticClass: "clickable quick-tray__item",
                          class: [
                            _vm.selected.PrescriptionID == item.PrescriptionID
                              ? "selected"
                              : "",
                            _vm.locked &&
                            _vm.selected.PrescriptionID == item.PrescriptionID
                              ? "locked"
                              : ""
                          ],
                          on: {
                            dblclick: function($event) {
                              return _vm.redirect(item.PrescriptionID)
                            },
                            click: function($event) {
                              return _vm.selectOrder(item)
                            }
                          }
                        },
                        [
                          _c("td", [
                            _c(
                              "a",
                              {
                                attrs: {
                                  href: "#/prescription/" + item.PrescriptionID
                                }
                              },
                              [
                                _c("div", { staticClass: "mb-5" }, [
                                  _c("span", {
                                    domProps: {
                                      innerHTML: _vm._s(item.ReferenceID)
                                    }
                                  })
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "mb-5" }, [
                                  _c("b", [_vm._v(_vm._s(item.CompanyName))])
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "mb-5" }, [
                                  _c("span", {
                                    domProps: {
                                      innerHTML: _vm._s(item.Prescriber)
                                    }
                                  })
                                ]),
                                _vm._v(" "),
                                _vm.locked &&
                                _vm.selected.PrescriptionID ==
                                  item.PrescriptionID
                                  ? _c(
                                      "div",
                                      {
                                        staticStyle: {
                                          background: "#fe4949",
                                          color: "white",
                                          "text-align": "center",
                                          padding: "3px"
                                        }
                                      },
                                      [
                                        _c("b", [
                                          _vm._v(
                                            "This item is currently opened by " +
                                              _vm._s(_vm.locked)
                                          )
                                        ])
                                      ]
                                    )
                                  : _vm._e()
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "td",
                            {
                              attrs: {
                                title:
                                  (item.Sex == 1
                                    ? "Male"
                                    : item.Sex == 2
                                    ? "Female"
                                    : item.Sex == 3
                                    ? "Transgender"
                                    : "Other") +
                                  " born on " +
                                  item.DOB +
                                  " with a BMI of " +
                                  item.BMI
                              }
                            },
                            [
                              _c(
                                "span",
                                {
                                  staticClass: "gender",
                                  class: [
                                    item.Sex == 1
                                      ? "blue"
                                      : item.Sex == 2
                                      ? "purple"
                                      : item.Sex == 3
                                      ? "orange"
                                      : "grey"
                                  ],
                                  staticStyle: { padding: "2px" }
                                },
                                [
                                  _c("span", {
                                    domProps: {
                                      innerHTML: _vm._s(item["Patient Name"])
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("small", [
                                    _vm._v(
                                      "\n                                    (" +
                                        _vm._s(item.Age) +
                                        " / " +
                                        _vm._s(
                                          item.Sex == 1
                                            ? "Male"
                                            : item.Sex == 2
                                            ? "Female"
                                            : item.Sex == 3
                                            ? "Transgender"
                                            : "Other"
                                        ) +
                                        ")\n                                "
                                    )
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _vm.selected.PrescriptionID == item.PrescriptionID
                                ? _c("div", { staticClass: "mt-5" }, [
                                    _c("span", {
                                      domProps: {
                                        innerHTML: _vm._s(
                                          item["Patient Address"]
                                        )
                                      }
                                    })
                                  ])
                                : _vm._e()
                            ]
                          ),
                          _vm._v(" "),
                          _c("td", [
                            _vm.selected.PrescriptionID == item.PrescriptionID
                              ? _c(
                                  "ul",
                                  [
                                    _vm.duplicate
                                      ? _c("li", [
                                          _c(
                                            "b",
                                            {
                                              staticClass:
                                                "infoBox warning thin-error",
                                              staticStyle: {
                                                background: "#f53c38",
                                                "font-size": "14px",
                                                "padding-bottom": "0",
                                                "padding-top": "0"
                                              },
                                              attrs: { title: "" }
                                            },
                                            [
                                              _vm._v(
                                                "\n                                        Possible duplicate order with ID \n                                        "
                                              ),
                                              _c(
                                                "a",
                                                {
                                                  staticStyle: {
                                                    color: "#A9E2F3"
                                                  },
                                                  attrs: {
                                                    target: "_blank",
                                                    href:
                                                      "#/prescription/" +
                                                      _vm.duplicate
                                                        .PrescriptionID
                                                  }
                                                },
                                                [
                                                  _vm._v(
                                                    "\n                                            " +
                                                      _vm._s(
                                                        _vm.duplicate
                                                          .PrescriptionID
                                                      ) +
                                                      "\n                                        "
                                                  )
                                                ]
                                              ),
                                              _vm._v(
                                                " \n                                        and\n                                        status " +
                                                  _vm._s(
                                                    _vm.orderStatuses[
                                                      _vm.duplicate.Status
                                                    ]
                                                  ) +
                                                  _vm._s(
                                                    _vm.duplicate.SubStatus
                                                      ? " - " +
                                                          _vm.orderSubStatuses[
                                                            _vm.duplicate
                                                              .SubStatus
                                                          ]
                                                      : ""
                                                  ) +
                                                  ".\n                                    "
                                              )
                                            ]
                                          )
                                        ])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _vm._l(item.Products, function(
                                      product,
                                      key
                                    ) {
                                      return _c("li", { key: key }, [
                                        _c("b", [
                                          _c("span", {
                                            domProps: {
                                              innerHTML: _vm._s(
                                                product.ShortName
                                              )
                                            }
                                          }),
                                          _vm._v(" "),
                                          product.Fridge
                                            ? _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "quick-tray__fridge"
                                                },
                                                [_vm._v("Fridge")]
                                              )
                                            : _vm._e()
                                        ]),
                                        _vm._v(" "),
                                        !product.CorrectName
                                          ? _c(
                                              "b",
                                              {
                                                staticClass:
                                                  "infoBox warning thin-error",
                                                staticStyle: {
                                                  background: "#f53c38",
                                                  "font-size": "14px",
                                                  "padding-bottom": "0",
                                                  "padding-top": "0"
                                                },
                                                attrs: {
                                                  title:
                                                    "The product name recieved by " +
                                                    _vm.selected.CompanyName +
                                                    " (" +
                                                    product.Description +
                                                    ") does not match the product name or it's alternatives in ESA (" +
                                                    product.Name +
                                                    ")"
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                            Name Mismatch\n                                        "
                                                )
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticStyle: {
                                              "max-width": "350px",
                                              "font-size": "11px"
                                            }
                                          },
                                          [
                                            _vm._v(
                                              "\n                                            " +
                                                _vm._s(product.Instructions) +
                                                "\n                                        "
                                            )
                                          ]
                                        )
                                      ])
                                    })
                                  ],
                                  2
                                )
                              : _c(
                                  "ul",
                                  _vm._l(item.Products, function(product, key) {
                                    return _c("li", { key: key }, [
                                      _c("span", {
                                        domProps: {
                                          innerHTML: _vm._s(product.ShortName)
                                        }
                                      }),
                                      _vm._v(" "),
                                      product.Fridge
                                        ? _c(
                                            "span",
                                            {
                                              staticClass: "quick-tray__fridge"
                                            },
                                            [_c("b", [_vm._v("Fridge")])]
                                          )
                                        : _vm._e()
                                    ])
                                  }),
                                  0
                                )
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm.selected.PrescriptionID == item.PrescriptionID
                              ? _c(
                                  "div",
                                  {
                                    staticStyle: {
                                      display: "flex",
                                      "justify-content": "space-between",
                                      "flex-direction": "column"
                                    }
                                  },
                                  [
                                    _c("div", [
                                      _c(
                                        "div",
                                        {
                                          staticClass: "quick-tray__note",
                                          class: [
                                            _vm.notes.critical.length > 0
                                              ? "quick-tray__note-warning"
                                              : ""
                                          ]
                                        },
                                        [
                                          _vm._v(
                                            "\n                                        " +
                                              _vm._s(
                                                _vm.notes.critical.length
                                              ) +
                                              " Patient Note(s)\n                                    "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass: "quick-tray__note",
                                          class: [
                                            _vm.notes.correspondence.length +
                                              _vm.notes.information.length >
                                            0
                                              ? "quick-tray__note-warning"
                                              : ""
                                          ]
                                        },
                                        [
                                          _vm._v(
                                            "\n                                        " +
                                              _vm._s(
                                                _vm.notes.correspondence
                                                  .length +
                                                  _vm.notes.information.length
                                              ) +
                                              " Queried Note(s)\n                                    "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass: "quick-tray__note",
                                          class: [
                                            _vm.notes.other.length +
                                              (_vm.selected.Notes != "" &&
                                              _vm.selected.Notes != null
                                                ? 1
                                                : 0) >
                                            0
                                              ? "quick-tray__note-warning"
                                              : ""
                                          ]
                                        },
                                        [
                                          _vm._v(
                                            "\n                                        " +
                                              _vm._s(
                                                _vm.notes.other.length +
                                                  (_vm.selected.Notes != "" &&
                                                  _vm.selected.Notes != null
                                                    ? 1
                                                    : 0)
                                              ) +
                                              " Order Note(s)\n                                    "
                                          )
                                        ]
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn btnSize03 secondaryBtn",
                                        staticStyle: { padding: "4px" },
                                        on: {
                                          click: function($event) {
                                            return _vm.openNotes()
                                          }
                                        }
                                      },
                                      [
                                        _vm._v(
                                          "\n                                    View\n                                "
                                        )
                                      ]
                                    )
                                  ]
                                )
                              : _c("span")
                          ]),
                          _vm._v(" "),
                          _c("td", { staticStyle: { width: "500px" } }, [
                            _vm.selected.PrescriptionID == item.PrescriptionID
                              ? _c(
                                  "div",
                                  {
                                    staticClass:
                                      "medicineHistory notranslate quick-tray__history"
                                  },
                                  [
                                    _vm._l(_vm.filteredHistory, function(
                                      value,
                                      key
                                    ) {
                                      return !_vm.historyLoading
                                        ? _c(
                                            "ul",
                                            {
                                              key: key,
                                              staticClass: "new",
                                              class: _vm.statusClass(
                                                value.Status
                                              ),
                                              attrs: {
                                                title:
                                                  "Order " +
                                                  value.PrescriptionID +
                                                  " in status " +
                                                  _vm.orderStatuses[
                                                    value.Status
                                                  ] +
                                                  ". Double-click to open in new tab."
                                              },
                                              on: {
                                                dblclick: function($event) {
                                                  return _vm.redirect(
                                                    value.PrescriptionID
                                                  )
                                                }
                                              }
                                            },
                                            _vm._l(value.Products, function(
                                              product,
                                              k
                                            ) {
                                              return _c(
                                                "li",
                                                {
                                                  key: k,
                                                  staticClass: "medicine"
                                                },
                                                [
                                                  _c(
                                                    "a",
                                                    {
                                                      staticStyle: {
                                                        "margin-left": "3px"
                                                      },
                                                      attrs: {
                                                        target: "_blank",
                                                        href:
                                                          "#/prescription/" +
                                                          value.PrescriptionID
                                                      }
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                            " +
                                                          _vm._s(product.Name) +
                                                          ", " +
                                                          _vm._s(
                                                            product.Quantity *
                                                              product.Dosage
                                                          ) +
                                                          " " +
                                                          _vm._s(
                                                            product.Units
                                                          ) +
                                                          " (" +
                                                          _vm._s(value.Client) +
                                                          ")\n                                        "
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c("div", [
                                                    k == 0
                                                      ? _c("b", [
                                                          _c(
                                                            "span",
                                                            {
                                                              staticClass:
                                                                "font-highlight",
                                                              class: _vm.statusClass(
                                                                value.Status
                                                              )
                                                            },
                                                            [
                                                              _vm._v(
                                                                _vm._s(
                                                                  _vm
                                                                    .orderStatuses[
                                                                    value.Status
                                                                  ]
                                                                )
                                                              )
                                                            ]
                                                          )
                                                        ])
                                                      : _vm._e(),
                                                    _vm._v(" "),
                                                    k == 0 &&
                                                    [
                                                      8,
                                                      6,
                                                      3,
                                                      4,
                                                      12,
                                                      13,
                                                      14,
                                                      15
                                                    ].includes(value.Status)
                                                      ? _c("span", [
                                                          _c("b", [
                                                            _vm._v(
                                                              _vm._s(
                                                                value.ShippedDate.slice(
                                                                  0,
                                                                  -5
                                                                )
                                                              )
                                                            )
                                                          ])
                                                        ])
                                                      : _vm._e()
                                                  ])
                                                ]
                                              )
                                            }),
                                            0
                                          )
                                        : _vm._e()
                                    }),
                                    _vm._v(" "),
                                    _vm.historyLoading
                                      ? _c("div", [_vm._v("Loading...")])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    !_vm.historyLoading &&
                                    _vm.history.length == 0
                                      ? _c("div", [
                                          _vm._v(
                                            "No previous orders available.."
                                          )
                                        ])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    !_vm.historyLoading &&
                                    _vm.history.length > 3
                                      ? _c(
                                          "div",
                                          {
                                            on: {
                                              click: function($event) {
                                                _vm.expandHistory = !_vm.expandHistory
                                              }
                                            }
                                          },
                                          [
                                            !_vm.expandHistory
                                              ? _c(
                                                  "button",
                                                  {
                                                    staticClass:
                                                      "btn btnSize03 secondaryBtn",
                                                    staticStyle: {
                                                      padding: "4px",
                                                      width: "100%"
                                                    }
                                                  },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "fa fa-caret-down",
                                                      staticStyle: {
                                                        "padding-right": "5px"
                                                      }
                                                    }),
                                                    _vm._v(
                                                      "\n                                        Expand (" +
                                                        _vm._s(
                                                          _vm.history.length -
                                                            _vm.filteredHistory
                                                              .length
                                                        ) +
                                                        " more entries)\n                                    "
                                                    )
                                                  ]
                                                )
                                              : _c(
                                                  "button",
                                                  {
                                                    staticClass:
                                                      "btn btnSize03 secondaryBtn",
                                                    staticStyle: {
                                                      padding: "4px",
                                                      width: "100%"
                                                    }
                                                  },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "fa fa-caret-up",
                                                      staticStyle: {
                                                        "padding-right": "5px"
                                                      }
                                                    }),
                                                    _vm._v(
                                                      "Collapse\n                                    "
                                                    )
                                                  ]
                                                )
                                          ]
                                        )
                                      : _vm._e()
                                  ],
                                  2
                                )
                              : _c("span")
                          ]),
                          _vm._v(" "),
                          _c(
                            "td",
                            {
                              staticStyle: {
                                "vertical-align": "middle",
                                "text-align": "center"
                              }
                            },
                            [
                              _vm.selected.PrescriptionID == item.PrescriptionID
                                ? _c(
                                    "button",
                                    {
                                      staticClass: "btn btnSize01 secondaryBtn",
                                      attrs: {
                                        disabled: _vm.locked || _vm.printing,
                                        title:
                                          "Print prescription and pharmacy labels"
                                      },
                                      on: {
                                        click: function($event) {
                                          return _vm.tryPrint()
                                        }
                                      }
                                    },
                                    [
                                      _vm.printable
                                        ? _c("i", {
                                            staticClass: "fa fa-print",
                                            staticStyle: { "font-size": "25px" }
                                          })
                                        : _c("i", {
                                            staticClass:
                                              "fa fa-exclamation-circle",
                                            staticStyle: { "font-size": "25px" }
                                          })
                                    ]
                                  )
                                : _vm._e()
                            ]
                          )
                        ]
                      )
                    }),
                    0
                  )
                ])
              ]
            )
          ],
          1
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e6373468", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/pages/PrescriptionPool.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/PrescriptionPool.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-65186cb8\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/PrescriptionPool.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/pages/PrescriptionPool.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-65186cb8", Component.options)
  } else {
    hotAPI.reload("data-v-65186cb8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-e6373468\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/pages/prescriptionpool/QuickTray.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e6373468", Component.options)
  } else {
    hotAPI.reload("data-v-e6373468", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});