webpackJsonp([3,6],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/DiffTableAddress.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _prescriptionColumns = __webpack_require__("./resources/assets/js/mixins/constants/prescriptionColumns.js");

var _prescriptionColumns2 = _interopRequireDefault(_prescriptionColumns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_prescriptionColumns2.default],
    props: ['oldObject', 'oldObjectUPS', 'newObject', 'newObjectUPS', 'countriesProp', 'companiesProp', 'getDetails'],
    data: function data() {
        return {
            countries: [],
            companies: [],
            loadingCountries: true,
            loadingCompanies: true
        };
    },
    created: function created() {
        if (this.getDetails) {
            this.getCountries();
            this.getCompanies();
        }
    },

    computed: {
        countriesArray: function countriesArray() {
            return this.getDetails ? this.countries : this.countriesProp;
        },
        companiesArray: function companiesArray() {
            return this.getDetails ? this.companies : this.companiesProp;
        },
        loaded: function loaded() {
            return !this.loadingCountries && !this.loadingCompanies;
        }
    },
    watch: {
        loaded: function loaded() {
            this.$emit('difftable.loaded');
        }
    },
    methods: {
        getCountries: function getCountries() {
            var _this = this;

            axios.get('/countries').then(function (response) {
                _this.countries = response.data.data;
            }).catch(function (error) {
                console.warn(error.response.data.message);
                _this.$emit('difftable.error');
            }).finally(function () {
                _this.loadingCountries = false;
            });
        },
        getCompanies: function getCompanies() {
            var _this2 = this;

            axios.get('/delivery-companies').then(function (response) {
                _this2.companies = response.data.data;
            }).catch(function (error) {
                console.warn(error.response.data.message);
                _this2.$emit('difftable.error');
            }).finally(function () {
                _this2.loadingCompanies = false;
            });
        },

        /**
         * Fetches country title by country id
         */
        getCountryTitle: function getCountryTitle(id) {
            var countries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var title = 'Unknown';

            if (!countries) {
                countries = this.countriesArray;
            }

            countries.forEach(function (country) {
                if (country.CountryID == id) {
                    title = country.Name;
                }
            });

            return title;
        },

        /**
         * Fetches company title by SettingID id
         */
        getCompanyTitle: function getCompanyTitle(id) {
            var companies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var title = 'Unknown';

            if (!companies) {
                companies = this.companiesArray;
            }

            companies.forEach(function (company) {
                if (company.SettingID == id) {
                    title = company.Name;
                }
            });

            return title;
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

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/Prescription.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__("./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _errors = __webpack_require__("./resources/assets/js/mixins/errors.js");

var _errors2 = _interopRequireDefault(_errors);

var _clipboard = __webpack_require__("./resources/assets/js/mixins/clipboard.js");

var _clipboard2 = _interopRequireDefault(_clipboard);

var _orderStatuses = __webpack_require__("./resources/assets/js/mixins/constants/orderStatuses.js");

var _orderStatuses2 = _interopRequireDefault(_orderStatuses);

var _doctorTypes = __webpack_require__("./resources/assets/js/mixins/constants/doctorTypes.js");

var _doctorTypes2 = _interopRequireDefault(_doctorTypes);

var _DiffTableAddress = __webpack_require__("./resources/assets/js/components/pages/DiffTableAddress.vue");

var _DiffTableAddress2 = _interopRequireDefault(_DiffTableAddress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//components


//import Print from '../../mixins/print';
//import Download from '../../mixins/download';
//constants
//import OrderStatuses from '../../mixins/constants/orderStatuses';
//import EditOrderAddress from './EditOrderAddress';
//import translate, { setCORS } from "google-translate-api-browser";

exports.default = {
    mixins: [_errors2.default, _clipboard2.default, _orderStatuses2.default, _doctorTypes2.default],
    // components: {
    //     EditOrderAddress
    // },
    data: function data() {
        return {
            history: [],
            testKits: [],
            errors: [],
            questionnaire: [],
            notes: { critical: [], information: [], other: [], correspondence: [], alerts: [] },
            activity: [],
            statistics: {
                statistics: {
                    new: 0,
                    approved: 0
                }
            },
            questionnaireTranslation: [],
            alertsFor: false,
            approved: false,

            locked: true, //use this for locking an order
            lockTimer: false,

            prescription: false,
            orderID: this.$route.params.id,
            userInfo: userInfo,
            duplicate: false,
            currentOrderID: '',
            loading: true,
            questionnaireLoading: true,
            notesLoading: true,
            historyLoading: true,
            expandedQuestionnaire: false,
            prescriptionStatus: 0,
            activeTab: userInfo.role == 30 ? 'notes' : 'order',
            translate: true,
            view: JSON.parse(localStorage.getItem('view')) || { products: 2 },
            timer: '',
            imgMap: {
                3: 'images/logo/tnt.png',
                4: 'images/logo/dpd.png',
                5: 'images/logo/rmail.png',
                7: 'images/logo/ups.png',
                8: 'images/logo/tnt.png',
                10: 'images/logo/dhl.png'
            }
        };
    },
    mounted: function mounted() {
        var _this = this;

        //check if order is locked
        this.lockTimer = setInterval(function () {
            _this.checkLock();
        }, 5000);

        this.getOrderData(true);
        this.getStatistics();
        this.timer = setInterval(this.getStatistics, 120000);
        //we need to listen for this one in case an 
        //order gets updated outside the component
        this.$root.$on('orderupdate', function (e) {
            _this.getOrderData();
        });
        this.$root.$on('statistic.update', function (e) {
            _this.getStatistics();
        });
    },
    beforeDestroy: function beforeDestroy() {
        clearInterval(this.timer);
        clearInterval(this.lockTimer);
        this.$root.$off('orderupdate');
        this.$root.$off('statistic.update');
    },

    computed: {
        isCommercial: function isCommercial() {
            return this.prescription.Repeats != '0' && this.prescription.Repeats != '' && [143, 162, 205, 243].includes(this.prescription.DCountryCode);
        },
        fullyLoaded: function fullyLoaded() {
            return !this.loading && !this.questionnaireLoading /*&& !this.historyLoading*/ && !this.notesLoading && !this.locked;
        },
        languageText: function languageText() {
            return this.translate ? 'Show original language' : 'Translate to english';
        },
        headerClass: function headerClass() {
            return [1, 7].includes(this.prescription.Status) ? 'active' : [2, 8].includes(this.prescription.Status) ? 'success' : [4, 5, 9, 10, 11, 12, 13, 14, 15].includes(this.prescription.Status) ? 'warning' : [3, 6].includes(this.prescription.Status) ? 'error' : '';
        },
        tray: function tray() {
            return this.$store.state.tray;
        },
        hasFridge: function hasFridge() {
            var fridge = 0;

            this.prescription.Products.forEach(function (item) {
                if (item.Fridge == 1) {
                    fridge++;
                }
            });

            return fridge == 0 ? false : true;
        }
    },
    watch: {
        '$route.params': function $routeParams() {
            if (typeof this.$route.params.id != 'undefined' && this.currentOrderID != this.$route.params.id) {
                this.$root.$emit('prescriptionloading');
                this.orderID = this.$route.params.id;
                this.getOrderData();
            }
        },
        fullyLoaded: function fullyLoaded() {
            if (this.fullyLoaded) {
                this.$root.$emit('prescriptionloaded', { prescription: this.prescription });
            }
        },
        prescription: function prescription() {
            if (this.prescription) {
                this.prescriptionStatus = this.prescription.Status;
            }
        },
        'view.products': function viewProducts() {
            localStorage.setItem('view', JSON.stringify(this.view));
        }
    },
    methods: {
        getOrderData: function getOrderData() {
            var _this2 = this;

            var preflight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.checkLock(function () {
                _this2.search();
                _this2.getQuestionnaire();
                _this2.getOrderHistory();
                _this2.getActivity();
                _this2.getNotes();
                // this.checkIfApproved();
                _this2.checkOrderStatuses();
            }, preflight);
        },
        checkLock: function checkLock() {
            var _this3 = this;

            var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            var preflight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            axios.get('/logs/locked/' + (preflight ? this.orderID : this.currentOrderID)).then(function (response) {
                if (response.data.data) {
                    _this3.locked = response.data.data.Name + ' ' + response.data.data.Surname;
                } else {
                    _this3.locked = false;
                }
            }).catch(function (error) {
                _this3.postError(error.response.data.message);
                _this3.errors = error.response.data.data;
                _this3.locked = false;
            }).finally(function () {
                if (callback) {
                    callback();
                }
            });
        },
        unlockOrder: function unlockOrder() {
            var _this4 = this;

            axios.post('logs/unlock/' + this.currentOrderID).then(function (response) {
                _this4.locked = false;
            }).catch(function (error) {
                _this4.postError(error.response.data.message);
                _this4.errors = error.response.data.data;
                _this4.locked = false;
            });
        },

        /*Search for a prescription*/
        search: function search() {
            var _this5 = this;

            this.errors = [];
            this.prescription = false;
            if (this.orderID != '') {
                this.currentOrderID = this.orderID;
                this.orderID = '';
            }

            this.loading = true;
            axios.get('/order/' + this.currentOrderID).then(function (response) {
                _this5.prescription = response.data.data;
                //this.$root.$emit('prescriptionloaded');
                _this5.loading = false;

                //check if there is any test kit in products array
                var testKitExists = false;

                if (typeof _this5.prescription.Products != 'undefined') {
                    _this5.prescription.Products.forEach(function (product) {
                        if (product.Type == 2) {
                            testKitExists = true;
                        }
                    });
                }

                //If there is a test kit fetch additional test kit data
                if (testKitExists) {
                    _this5.getTestKits();
                } else {
                    _this5.testKits = [];
                }
            }).catch(function (error) {
                console.log(error);
                _this5.postError(error.response.data.message);
                _this5.errors = error.response.data.data;
                _this5.loading = false;
            });

            if (this.$route.params.id != this.currentOrderID) {
                this.$router.push({ params: { id: this.currentOrderID } });
            }
        },
        getTestKits: function getTestKits() {
            var _this6 = this;

            axios.get('/order/' + this.currentOrderID + '/test-kits').then(function (response) {
                _this6.testKits = response.data.data;
            }).catch(function (error) {
                _this6.postError(error.response.data.message);
            });
        },
        getOrderHistory: function getOrderHistory() {
            var _this7 = this;

            this.historyLoading = true;
            axios.get('/order/' + this.currentOrderID + '/history').then(function (response) {
                _this7.history = response.data.data;
            }).catch(function (error) {
                console.log(error);
                _this7.postError(error.response.data.message);
            }).finally(function () {
                _this7.historyLoading = false;
            });
        },
        getQuestionnaire: function getQuestionnaire() {
            var _this8 = this;

            this.questionnaireLoading = true;
            axios.get('/questionnaire/' + this.currentOrderID).then(function (response) {
                _this8.questionnaire = response.data.data;
            }).catch(function (error) {
                _this8.postError(error.response.data.message);
            }).finally(function () {
                _this8.questionnaireLoading = false;
            });
        },

        /**
         * Get notes related to the current order
         */
        getNotes: function getNotes() {
            var _this9 = this;

            this.notesLoading = true;
            axios.get('/order/' + this.currentOrderID + '/notes').then(function (response) {
                _this9.notes = response.data.data;

                //check if alerts are shown, if not show them
                if (_this9.alertsFor != _this9.currentOrderID && _this9.notes.alerts.length > 0) {
                    var html = '\n                    <div class="medicineDetails" style="width: 100%;">\n                    <p>Please review the notes below:</p>\n                    <ul class="other">';

                    _this9.notes.alerts.forEach(function (alert) {
                        html += '\n                        <li class="note" style="' + (alert.Type == 2 ? 'border-left: 5px solid #32a36a;' : alert.Type == 1 ? 'border-left: 5px solid #ff5151;' : '') + '">\n                        <div class="note-body" style="text-align: initial;">\n                        <p>' + alert.Note + '</p>\n                        </div> \n                        <div class="note-footer">\n                        <span>' + (alert.name + ' ' + alert.surname) + '</span>\n                        <span>' + alert.CreatedAt + '</span>\n                        </div>\n                        </li>';
                    });

                    html += '</ul></div>';

                    _this9.$swal({
                        title: 'Important notes!',
                        html: html,
                        type: 'warning',
                        showCancelButton: false,
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        focusConfirm: false,
                        // customClass: 'swal-wide',
                        confirmButtonColor: '#3085d6',
                        // cancelButtonColor: '#d33',
                        confirmButtonText: "I've read these notes!"
                    });

                    _this9.alertsFor = _this9.currentOrderID;
                } else {
                    _this9.alertsFor = _this9.currentOrderID;
                }
            }).catch(function (error) {
                _this9.postError(error.response.data.message);
            }).finally(function () {
                _this9.notesLoading = false;
            });
        },

        /**
         * 
         */
        deleteNote: function deleteNote(id) {
            var _this10 = this;

            this.$swal({
                title: 'Delete Note',
                html: 'Are you sure you want to delete this note?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ff5151',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then(function (result) {
                if (result.value) {
                    axios.post('/note/' + id + '/delete').then(function (response) {
                        _this10.postSuccess(response.data.message);
                    }).catch(function (error) {
                        _this10.postError(error.response.data.message);
                    }).finally(function () {
                        _this10.getNotes();
                    });
                }
            });
        },
        openNote: function openNote() {
            var note = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.$root.$emit('modal.open', 'note', note);
        },
        editDetails: function editDetails(prescription) {
            this.editingOrder = !this.editingOrder;
        },

        //used for updating status through the dropdown
        updateStatus: function updateStatus() {
            var _this11 = this;

            this.$root.$emit('prescriptionloading'); //we need to let the footer know that the prescription is loading
            axios.post('/order-edit/' + this.prescription.PrescriptionID + '/status', { status: this.prescriptionStatus }).then(function (response) {
                if (['4', '12', '13', '14', '15'].includes(_this11.prescriptionStatus)) {
                    localStorage.setItem('dashboard.orderFilter', 'queried');
                    _this11.$router.push({ name: 'in tray' });
                } else {
                    localStorage.setItem('dashboard.orderFilter', _this11.userInfo.role == 20 ? 'approved' : 'new');
                }

                if (_this11.prescriptionStatus != 1) {
                    _this11.$root.$emit('tray.remove', _this11.prescription.PrescriptionID);
                }

                _this11.$root.$emit('statistic.update');
                _this11.postSuccess(response.data.message);
            }).catch(function (error) {
                _this11.postError(error.response.data.message);
            }).finally(function () {
                _this11.getOrderData();
            });
        },
        statusClass: function statusClass(status) {
            return [1, 7].includes(status) ? 'active' : [2, 8].includes(status) ? 'success' : [4, 5, 9, 10, 11, 12, 13, 14, 15].includes(status) ? 'warning' : [3, 6].includes(status) ? 'error' : '';
        },
        timestampToDate: function timestampToDate(timestamp) {
            var date = new Date(timestamp * 1000);
            // date.setMonth(date.getMonth() + 1);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
        },
        getStatistics: function getStatistics() {
            var _this12 = this;

            axios.get('/statistics').then(function (response) {
                _this12.statistics = response.data.data;
            }).catch(function (error) {
                _this12.postError(error.response.data.message);
            });
        },
        getActivity: function getActivity() {
            var _this13 = this;

            axios.get('/order/' + this.currentOrderID + '/activity').then(function (response) {
                _this13.activity = response.data.data;

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this13.activity[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var activity = _step.value;

                        if ([750, 751].includes(activity.Type)) {
                            activity.FirstChange = true;
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }).catch(function (error) {
                _this13.postError(error.response.data.message);
            });
        },
        translateQuestionnaire: function translateQuestionnaire() {
            this.getQuestionnaire();
            this.translate = !this.translate;
        },

        // checkIfApproved(){
        //     axios.get(`/order/${this.currentOrderID}/approved`)
        //     .then((response) => {
        //         this.approved = response.data.data;
        //     })
        //     .catch((error) => {
        //         this.postError(error.response.data.message);
        //     })  
        // },
        checkOrderStatuses: function checkOrderStatuses() {
            var _this14 = this;

            axios.get('/order/' + this.currentOrderID + '/statuses').then(function (response) {
                if (_this14.userInfo.role == 30) {
                    _this14.approved = response.data.data.approved;
                }
                _this14.duplicate = response.data.data.duplicate;
            }).catch(function (error) {
                _this14.postError(error.response.data.message);
            });
        },
        redirect: function redirect(id) {
            var url = '#/prescription/' + id;
            window.open(url, '_blank');

            // this.$router.push({name: 'prescription', params: {id: id}});
        },
        trayRedirect: function trayRedirect() {
            var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'new';

            localStorage.setItem('dashboard.orderFilter', target); //reset dashboard tray to new to show new orders
            this.$router.push({ name: 'in tray' });
        },

        //revert an activity
        revert: function revert(activity) {
            var _this15 = this;

            var readOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            // all this just to avoid importing vue at mount
            axios.get('/order/' + this.currentOrderID + '/access-point').then(function (response) {
                _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                    var Vue, ComponentClass, instance;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, "./node_modules/vue/dist/vue.common.js"));

                                case 2:
                                    Vue = _context.sent;
                                    ComponentClass = Vue.extend(_DiffTableAddress2.default);
                                    instance = new ComponentClass({
                                        propsData: {
                                            oldObject: _this15.prescription,
                                            oldObjectUPS: response.data.data,
                                            newObject: JSON.parse(JSON.parse(activity.Arguments)).oldOrder,
                                            newObjectUPS: JSON.parse(JSON.parse(activity.Arguments)).oldUPS,
                                            getDetails: true
                                        }
                                    });


                                    instance.$mount();

                                    instance.$on('difftable.loaded', function () {

                                        if (readOnly) {
                                            _this15.$swal({
                                                title: 'Change Review',
                                                html: '<p>Below are the changes compared to the current order values:</p> ' + instance.$el.outerHTML,
                                                type: 'warning',
                                                customClass: 'swal-wide',
                                                confirmButtonColor: '#3085d6',
                                                confirmButtonText: 'Ok'
                                            });
                                        } else {
                                            _this15.$swal({
                                                title: 'Are you sure you want to do this?',
                                                html: '<p>This will revert the order details to the previous state! Please review the changes below:</p> ' + instance.$el.outerHTML,
                                                type: 'warning',
                                                showCancelButton: true,
                                                customClass: 'swal-wide',
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Yes, revert it!'
                                            }).then(function (result) {
                                                if (result.value) {
                                                    axios.post('/order-edit/revert/' + activity.ActivityID).then(function (response) {
                                                        _this15.postSuccess(response.data.message);
                                                    }).catch(function (error) {
                                                        _this15.postError(error.response.data.message);
                                                    }).finally(function () {
                                                        _this15.getOrderData();
                                                    });
                                                }
                                            });
                                        }

                                        instance.$off('difftable.loaded');
                                    });

                                    instance.$on('difftable.error', function () {
                                        instance.$off('difftable.error');
                                        instance.$destroy();
                                    });

                                case 8:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this15);
                }))();
            }).catch(function (error) {
                _this15.postError(error.response.data.message);
            });
        }
    }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/PrescriptionAlternate.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Prescription = __webpack_require__("./resources/assets/js/components/pages/Prescription.vue");

var _Prescription2 = _interopRequireDefault(_Prescription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    extends: _Prescription2.default,

    data: function data() {
        return {
            activeTab: 'products'
        };
    },
    methods: {}
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/***/ "./node_modules/babel-runtime/regenerator/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./node_modules/regenerator-runtime/runtime-module.js");


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime-module.js":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__("./node_modules/regenerator-runtime/runtime.js");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4d400ee4\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/PrescriptionAlternate.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "infoHeader", class: _vm.headerClass }, [
        _c("div", { staticClass: "floatLeft" }, [
          _c("ul", [
            _c(
              "li",
              {
                staticClass: "clickable",
                staticStyle: { "min-width": "120px" },
                on: {
                  dblclick: function($event) {
                    return _vm.copyToClipboard(_vm.prescription.PrescriptionID)
                  }
                }
              },
              [
                _c("span", [_vm._v("Order ID:")]),
                _vm._v(
                  _vm._s(_vm.prescription.PrescriptionID || "Loading") +
                    "\n                "
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "li",
              {
                staticClass: "clickable",
                staticStyle: { "min-width": "120px" },
                on: {
                  dblclick: function($event) {
                    return _vm.copyToClipboard(_vm.prescription.ReferenceNumber)
                  }
                }
              },
              [
                _c("span", [_vm._v("Client Reference Number:")]),
                _vm._v(
                  _vm._s(_vm.prescription.ReferenceNumber || "Loading") +
                    "\n                "
                )
              ]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "floatCenter" }, [
          _c("ul", [
            _c("li", [
              _c("span", [_vm._v("ORDER STATUS: ")]),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.prescriptionStatus,
                      expression: "prescriptionStatus"
                    }
                  ],
                  attrs: { disabled: !_vm.fullyLoaded },
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.prescriptionStatus = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                [
                  _c(
                    "option",
                    { attrs: { disabled: "", hidden: "", value: "" } },
                    [_vm._v("Select")]
                  ),
                  _vm._v(" "),
                  _vm._l(_vm.orderStatuses, function(value, key) {
                    return _c(
                      "option",
                      { key: key, domProps: { value: key } },
                      [_vm._v(_vm._s(value))]
                    )
                  })
                ],
                2
              ),
              _vm._v(" "),
              _vm.fullyLoaded &&
              _vm.prescriptionStatus != _vm.prescription.Status
                ? _c(
                    "button",
                    {
                      staticClass: "btn btnSize04 primaryBtn",
                      on: {
                        click: function($event) {
                          return _vm.updateStatus()
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                        Update\n                    "
                      )
                    ]
                  )
                : _vm._e()
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "floatRight" }, [
          _c("ul", [
            _c(
              "li",
              {
                staticClass: "clickable",
                on: {
                  click: function($event) {
                    return _vm.$root.$emit("tray.toggle")
                  }
                }
              },
              [
                _c("span", [_vm._v("IN TRAY:")]),
                _vm._v(_vm._s(_vm.tray.length) + "\n                ")
              ]
            ),
            _vm._v(" "),
            _c(
              "li",
              {
                staticClass: "clickable",
                on: {
                  click: function($event) {
                    return _vm.trayRedirect("new")
                  }
                }
              },
              [
                _c("span", [_vm._v("NEW:")]),
                _vm._v(
                  _vm._s(_vm.statistics.statistics.new) + "\n                "
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "li",
              {
                staticClass: "clickable",
                on: {
                  click: function($event) {
                    return _vm.trayRedirect("approved")
                  }
                }
              },
              [
                _c("span", [_vm._v("APPROVED:")]),
                _vm._v(
                  _vm._s(_vm.statistics.statistics.approved) +
                    "\n                "
                )
              ]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("transition", { attrs: { name: "slide-down" } }, [
        _vm.errors.length != 0
          ? _c("section", [
              _c(
                "div",
                { staticClass: "infoBox warning" },
                _vm._l(_vm.errors, function(error) {
                  return _c("p", [
                    _vm._v(
                      "\n                    " +
                        _vm._s(error) +
                        "\n                "
                    )
                  ])
                }),
                0
              )
            ])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("transition", { attrs: { name: "fade" } }, [
        _vm.prescription
          ? _c(
              "div",
              { staticClass: "content" },
              [
                _vm.duplicate &&
                [2, 4, 5, 7, 8, 9, 10, 11, 1].includes(_vm.prescription.Status)
                  ? _c("section", { staticClass: "notranslate" }, [
                      _c("div", { staticClass: "infoBox warning" }, [
                        _c("p", [
                          _vm._v(
                            "\n                    There is a possible duplicate order with ID \n                    "
                          ),
                          _c(
                            "a",
                            {
                              attrs: {
                                target: "_blank",
                                href:
                                  "#/prescription/" +
                                  _vm.duplicate.PrescriptionID
                              }
                            },
                            [_vm._v(_vm._s(_vm.duplicate.PrescriptionID))]
                          ),
                          _vm._v(
                            " that has the same customer reference id\n                    " +
                              _vm._s(_vm.duplicate.ReferenceNumber) +
                              " with\n                    status " +
                              _vm._s(_vm.orderStatuses[_vm.duplicate.Status]) +
                              "."
                          ),
                          _c("br"),
                          _vm._v(
                            "\n                    Please investigate by "
                          ),
                          _c(
                            "a",
                            {
                              attrs: {
                                target: "_blank",
                                href:
                                  "#/prescription/" +
                                  _vm.duplicate.PrescriptionID
                              }
                            },
                            [_vm._v("clicking here")]
                          ),
                          _vm._v(" before processing.\n                ")
                        ])
                      ])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.approved
                  ? _c("section", [
                      _c("div", { staticClass: "infoBox warning" }, [
                        _c("p", [
                          _vm._v(
                            "\n                    THIS ITEM HAS ALREADY BEEN APPROVED\n                "
                          )
                        ])
                      ])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.locked
                  ? _c("section", [
                      _c("div", { staticClass: "infoBox error" }, [
                        _c("p", [
                          _vm._v(
                            "\n                    This item is currently being edited by "
                          ),
                          _c("b", [_vm._v(_vm._s(_vm.locked))]),
                          _vm._v(" "),
                          _vm.userInfo.role >= 50
                            ? _c(
                                "button",
                                {
                                  staticClass: "btn btnSize01 primaryBtn",
                                  attrs: { title: "Unlock any order locks" },
                                  on: {
                                    click: function($event) {
                                      return _vm.unlockOrder()
                                    }
                                  }
                                },
                                [_vm._v("Unlock")]
                              )
                            : _vm._e()
                        ])
                      ])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("section", { staticClass: "notranslate card" }, [
                  _c(
                    "div",
                    { staticClass: "card-header prescription-info-header" },
                    [
                      _c("h3", [_vm._v("Prescription Info")]),
                      _vm._v(" "),
                      _c("div", { staticClass: "delivery" }, [
                        _vm.prescription.UPSAccessPointAddress != 0
                          ? _c("img", {
                              staticStyle: { height: "20px" },
                              attrs: { src: "images/logo/ups_access_point.jpg" }
                            })
                          : _vm.prescription.PaymentMethod != 0
                          ? _c("img", {
                              staticStyle: { height: "20px" },
                              attrs: { src: "images/logo/ups_cod.jpg" }
                            })
                          : _c("img", {
                              staticStyle: { height: "20px" },
                              attrs: {
                                src: _vm.imgMap[_vm.prescription.DeliveryID]
                              }
                            })
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "patientInfo card-body" }, [
                    _c("div", { staticClass: "patient" }, [
                      _c("ul", [
                        _c("li", [
                          _c("span", [_vm._v("Name: ")]),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticClass: "high-visibility",
                              staticStyle: { "text-transform": "uppercase" }
                            },
                            [_vm._v(_vm._s(_vm.prescription.Name))]
                          )
                        ]),
                        _vm._v(" "),
                        _c("li", [
                          _c("span", [_vm._v("Surname: ")]),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticClass: "high-visibility",
                              staticStyle: { "text-transform": "uppercase" }
                            },
                            [_vm._v(_vm._s(_vm.prescription.Surname))]
                          )
                        ]),
                        _vm._v(" "),
                        _c(
                          "li",
                          {
                            staticClass: "gender",
                            class: [
                              _vm.prescription.Sex == "Male"
                                ? "blue"
                                : _vm.prescription.Sex == "Female"
                                ? "purple"
                                : _vm.prescription.Sex == "Transgender"
                                ? "orange"
                                : "grey"
                            ]
                          },
                          [
                            _c("span", [_vm._v("Gender: ")]),
                            _vm._v(" "),
                            _c("span", { staticClass: "high-visibility" }, [
                              _vm._v(_vm._s(_vm.prescription.Sex))
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c("li", [
                          _c("span", [_vm._v("Age: ")]),
                          _vm._v(" "),
                          _c("span", { staticClass: "high-visibility" }, [
                            _vm._v(_vm._s(_vm.prescription.Age))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("li", [
                          _c("span", [_vm._v("DOB: ")]),
                          _vm._v(" "),
                          _c("span", { staticClass: "high-visibility" }, [
                            _vm._v(_vm._s(_vm.prescription.DOB))
                          ])
                        ]),
                        _vm._v(" "),
                        _c(
                          "li",
                          {
                            class: {
                              "highlight-magenta":
                                _vm.prescription.DoctorID == 42
                            }
                          },
                          [
                            _c("span", [_vm._v("Prescriber: ")]),
                            _vm._v(" "),
                            _c("span", { staticClass: "high-visibility" }, [
                              _vm._v(
                                _vm._s(_vm.prescription.DTitle) +
                                  " " +
                                  _vm._s(_vm.prescription.DName) +
                                  " " +
                                  _vm._s(_vm.prescription.DSurname) +
                                  " (" +
                                  _vm._s(
                                    _vm.doctorTypes[_vm.prescription.DoctorType]
                                  ) +
                                  ": " +
                                  _vm._s(_vm.prescription.GMCNO) +
                                  ")"
                              )
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c("li", [
                          _c("span", [_vm._v("Prescriber Address: ")]),
                          _vm._v(" "),
                          _c("span", { staticClass: "high-visibility" }, [
                            _vm._v(
                              " " +
                                _vm._s(_vm.prescription.DoctorAddress1) +
                                ", " +
                                _vm._s(_vm.prescription.DoctorAddress2) +
                                ", " +
                                _vm._s(_vm.prescription.DoctorAddress3) +
                                ", " +
                                _vm._s(_vm.prescription.DoctorAddress4) +
                                " " +
                                _vm._s(_vm.prescription.DoctorPostCode) +
                                " "
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("li", [
                          _c("span", [_vm._v("Client: ")]),
                          _vm._v(" "),
                          _c("span", { staticClass: "high-visibility" }, [
                            _vm._v(_vm._s(_vm.prescription.CompanyName))
                          ])
                        ])
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "prescription-info" }, [
                      _c("div", { staticClass: "prescription" }, [
                        _c("ul", [
                          _c("li", [
                            _c("span", [_vm._v("Recieved Date: ")]),
                            _vm._v(
                              _vm._s(
                                _vm.timestampToDate(
                                  _vm.prescription.CreatedDate
                                )
                              )
                            )
                          ]),
                          _vm._v(" "),
                          _vm.prescription.Status == 8
                            ? _c("li", [
                                _c("span", [_vm._v("Shipped/Supplied Date: ")]),
                                _vm._v(
                                  _vm._s(
                                    _vm.timestampToDate(
                                      _vm.prescription.UpdatedDate
                                    )
                                  )
                                )
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.isCommercial
                            ? _c("li", [
                                _c("span", [
                                  _vm._v("Commercial Invoice Value: ")
                                ]),
                                _vm._v(_vm._s(_vm.prescription.Repeats))
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _c("li", [
                            _c("span", [_vm._v("Shipping: ")]),
                            _vm._v("Patient has Authorised 3rd Party Carrier")
                          ]),
                          _vm._v(" "),
                          _c("li", [
                            _c("span", [_vm._v("Courier: ")]),
                            _vm._v(_vm._s(_vm.prescription.Courier))
                          ]),
                          _vm._v(" "),
                          _vm.prescription.TrackingCode != "" &&
                          _vm.prescription.TrackingCode != null
                            ? _c("li", [
                                _c("span", [_vm._v("Tracking Code: ")]),
                                _vm._v(
                                  _vm._s(_vm.prescription.TrackingCode) +
                                    "\n                            "
                                )
                              ])
                            : _vm._e()
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "location" }, [
                        _c("ul", [
                          _c("li", [
                            _c("span", [_vm._v("Home adress: ")]),
                            _vm._v(
                              _vm._s(
                                _vm.prescription.Address1 +
                                  " " +
                                  _vm.prescription.Address2 +
                                  " " +
                                  _vm.prescription.Address3 +
                                  " " +
                                  _vm.prescription.Address4 +
                                  " " +
                                  _vm.prescription.Postcode
                              )
                            )
                          ]),
                          _vm._v(" "),
                          _c("li", [
                            _c("span", [_vm._v("Delivery address: ")]),
                            _vm._v(
                              _vm._s(
                                _vm.prescription.DAddress1 +
                                  " " +
                                  _vm.prescription.DAddress2 +
                                  " " +
                                  _vm.prescription.DAddress3 +
                                  " " +
                                  _vm.prescription.DAddress4 +
                                  " " +
                                  _vm.prescription.DPostcode
                              ) + "\n                                "
                            )
                          ]),
                          _vm._v(" "),
                          _c("li", [
                            _c("span", [_vm._v("Country: ")]),
                            _vm._v(_vm._s(_vm.prescription.CountryName))
                          ]),
                          _vm._v(" "),
                          _c("li", [
                            _c("span", [_vm._v("Telephone: ")]),
                            _vm._v(" "),
                            _c(
                              "a",
                              {
                                attrs: {
                                  href:
                                    "tel:" +
                                    (_vm.prescription.Telephone
                                      ? _vm.prescription.Telephone
                                      : _vm.prescription.Mobile)
                                }
                              },
                              [
                                _vm._v(
                                  "\n                                    " +
                                    _vm._s(
                                      _vm.prescription.Telephone
                                        ? _vm.prescription.Telephone
                                        : _vm.prescription.Mobile
                                    ) +
                                    "\n                                "
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("li", [
                            _c("span", [_vm._v("Email: ")]),
                            _vm._v(" "),
                            _c(
                              "a",
                              {
                                attrs: {
                                  href: "mailto:" + _vm.prescription.Email
                                }
                              },
                              [_vm._v(_vm._s(_vm.prescription.Email))]
                            )
                          ])
                        ])
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "activity" }, [
                      _vm.activity.length != 0
                        ? _c(
                            "ul",
                            { staticClass: "activity-log-wrapper" },
                            [
                              _c("h5", { staticClass: "activity-log-header" }, [
                                _vm._v("Activities on this order")
                              ]),
                              _vm._v(" "),
                              _vm._l(_vm.activity, function(a) {
                                return _c(
                                  "li",
                                  {
                                    key: a.ActivityID,
                                    staticClass: "activity-log-item"
                                  },
                                  [
                                    _c(
                                      "div",
                                      { staticClass: "activity-action" },
                                      [
                                        _vm._v(
                                          "\n                                " +
                                            _vm._s(a.Action) +
                                            "\n\n                                "
                                        ),
                                        (a.Type == 750 || a.Type == 751) &&
                                        _vm.userInfo.role >= 50
                                          ? _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "clickable smallTextBtn secondaryBtn",
                                                attrs: { disabled: _vm.locked },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.revert(a)
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                    Revert\n                                "
                                                )
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        (a.Type == 750 || a.Type == 751) &&
                                        _vm.userInfo.role < 50 &&
                                        !a.FirstChange
                                          ? _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "clickable smallTextBtn secondaryBtn",
                                                on: {
                                                  click: function($event) {
                                                    return _vm.revert(a, true)
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                    View\n                                "
                                                )
                                              ]
                                            )
                                          : (a.Type == 750 || a.Type == 751) &&
                                            _vm.userInfo.role < 50 &&
                                            a.FirstChange
                                          ? _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "clickable smallTextBtn secondaryBtn",
                                                attrs: { disabled: _vm.locked },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.revert(a)
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                    Revert\n                                "
                                                )
                                              ]
                                            )
                                          : _vm._e()
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "activity-footer" },
                                      [
                                        _c("span", [_vm._v(_vm._s(a.Name))]),
                                        _c("span", [_vm._v(_vm._s(a.Date))])
                                      ]
                                    )
                                  ]
                                )
                              })
                            ],
                            2
                          )
                        : _c("ul", { staticClass: "activity-log-wrapper" }, [
                            _c("li", { staticClass: "activity-log-item" }, [
                              _vm._v(
                                "\n                            No activity log found\n                        "
                              )
                            ])
                          ])
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("transition", { attrs: { name: "fade" } }, [
                  _vm.testKits.length > 0
                    ? _c("section", { staticClass: "notranslate card" }, [
                        _c(
                          "div",
                          {
                            staticClass: "card-header card-header-warning",
                            staticStyle: {
                              display: "flex",
                              "justify-content": "space-between"
                            }
                          },
                          [
                            _c("h3", [_vm._v("Sub Orders")]),
                            _vm._v(" "),
                            _c("p", [
                              _vm._v(
                                "This order has multiple sub-orders attached to it"
                              )
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "card-body",
                            class: [
                              _vm.testKits.length > 6
                                ? "sub-order-wrapper"
                                : "sub-order-wrapper-flex"
                            ]
                          },
                          _vm._l(_vm.testKits, function(kit) {
                            return _c(
                              "div",
                              { key: kit.TestKitID, staticClass: "sub-order" },
                              [
                                _c("ul", [
                                  _c("li", [
                                    _c("span", [_vm._v("Reference Number:")]),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "high-visibility" },
                                      [
                                        _c("b", [
                                          _vm._v(_vm._s(kit.ReferenceNumber))
                                        ])
                                      ]
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("li", [
                                    _c("span", [_vm._v("Order Number:")]),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "high-visibility" },
                                      [
                                        _c("b", [
                                          _vm._v(
                                            _vm._s(kit.Count) +
                                              "/" +
                                              _vm._s(kit.Total)
                                          )
                                        ])
                                      ]
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("li", [
                                    _c("span", [_vm._v("Name:")]),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "high-visibility" },
                                      [_c("b", [_vm._v(_vm._s(kit.Name))])]
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("li", [
                                    _c("span", [_vm._v("Surname:")]),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "high-visibility" },
                                      [_c("b", [_vm._v(_vm._s(kit.Surname))])]
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "li",
                                    {
                                      class: [
                                        kit.Sex == "Male"
                                          ? "blue"
                                          : kit.Sex == "Female"
                                          ? "purple"
                                          : kit.Sex == "Transgender"
                                          ? "orange"
                                          : "grey"
                                      ]
                                    },
                                    [
                                      _c("span", [_vm._v("Gender:")]),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "high-visibility" },
                                        [_c("b", [_vm._v(_vm._s(kit.Sex))])]
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("li", [
                                    _c("span", [_vm._v("DOB:")]),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "high-visibility" },
                                      [_c("b", [_vm._v(_vm._s(kit.DOB))])]
                                    )
                                  ])
                                ])
                              ]
                            )
                          }),
                          0
                        )
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c(
                  "section",
                  {
                    staticClass: "card border-none",
                    class: [_vm.translate ? "" : "notranslate"]
                  },
                  [
                    _c("div", { staticClass: "medicineDetails alternate" }, [
                      _c("ul", { staticClass: "tabs" }, [
                        _c(
                          "li",
                          {
                            staticClass: "clickable",
                            class: { active: _vm.activeTab == "products" },
                            staticStyle: { "margin-left": "0!important" },
                            attrs: { title: "Show list of order products" },
                            on: {
                              click: function($event) {
                                _vm.activeTab = "products"
                              }
                            }
                          },
                          [
                            _c(
                              "a",
                              {
                                staticClass: "danger",
                                attrs: { href: "javascript:;" }
                              },
                              [
                                _vm._v(
                                  "Products\n                            "
                                ),
                                _vm.prescription.Products.length > 0
                                  ? _c("span", { staticClass: "badge" }, [
                                      _vm._v(
                                        _vm._s(_vm.prescription.Products.length)
                                      )
                                    ])
                                  : _vm._e()
                              ]
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "li",
                          {
                            staticClass: "clickable",
                            class: { active: _vm.activeTab == "questionnaire" },
                            staticStyle: { "margin-left": "0!important" },
                            attrs: { title: "Show Questionnaire" },
                            on: {
                              click: function($event) {
                                _vm.activeTab = "questionnaire"
                              }
                            }
                          },
                          [
                            _c(
                              "a",
                              {
                                staticClass: "danger",
                                attrs: { href: "javascript:;" }
                              },
                              [
                                _vm._v(
                                  "Questionnaire\n                            "
                                ),
                                _vm.questionnaire.length > 0
                                  ? _c("span", { staticClass: "badge" }, [
                                      _vm._v(_vm._s(_vm.questionnaire.length))
                                    ])
                                  : _vm._e()
                              ]
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "li",
                          {
                            staticClass: "clickable",
                            class: { active: _vm.activeTab == "history" },
                            staticStyle: { "margin-left": "0!important" },
                            attrs: { title: "Show medical history" },
                            on: {
                              click: function($event) {
                                _vm.activeTab = "history"
                              }
                            }
                          },
                          [
                            _c(
                              "a",
                              {
                                staticClass: "danger",
                                attrs: { href: "javascript:;" }
                              },
                              [
                                _vm._v(
                                  "Medical History\n                            "
                                ),
                                _vm.history.length > 0
                                  ? _c("span", { staticClass: "badge" }, [
                                      _vm._v(_vm._s(_vm.history.length))
                                    ])
                                  : _vm._e()
                              ]
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "li",
                          {
                            staticClass: "clickable",
                            class: { active: _vm.activeTab == "notes" },
                            staticStyle: { "margin-left": "0!important" },
                            attrs: {
                              title:
                                "Relates to allergies, medical conditions and notes added by pharmacists."
                            },
                            on: {
                              click: function($event) {
                                _vm.activeTab = "notes"
                              }
                            }
                          },
                          [
                            _c(
                              "a",
                              {
                                staticClass: "danger",
                                attrs: { href: "javascript:;" }
                              },
                              [
                                _vm._v(
                                  "Patient Notes \n                            "
                                ),
                                _vm.notes.critical.length > 0
                                  ? _c("span", { staticClass: "badge red" }, [
                                      _vm._v(_vm._s(_vm.notes.critical.length))
                                    ])
                                  : _vm._e()
                              ]
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "li",
                          {
                            staticClass: "clickable",
                            class: { active: _vm.activeTab == "patient" },
                            attrs: {
                              title:
                                "Relates communication with perscriber and notes sent with perscription"
                            },
                            on: {
                              click: function($event) {
                                _vm.activeTab = "patient"
                              }
                            }
                          },
                          [
                            _c("a", { attrs: { href: "javascript:;" } }, [
                              _vm._v(
                                "Queried Notes \n                            "
                              ),
                              _vm.notes.correspondence.length +
                                _vm.notes.information.length >
                              0
                                ? _c("span", { staticClass: "badge red" }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm.notes.correspondence.length +
                                          _vm.notes.information.length
                                      )
                                    )
                                  ])
                                : _vm._e()
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "li",
                          {
                            staticClass: "clickable",
                            class: { active: _vm.activeTab == "order" },
                            attrs: { title: "Relates to the current order" },
                            on: {
                              click: function($event) {
                                _vm.activeTab = "order"
                              }
                            }
                          },
                          [
                            _c("a", { attrs: { href: "javascript:;" } }, [
                              _vm._v(
                                "Order Notes \n                            "
                              ),
                              (_vm.notes.other.length ||
                                (_vm.prescription.Notes != "" &&
                                  _vm.prescription.Notes != null)) > 0
                                ? _c("span", { staticClass: "badge red" }, [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(
                                          _vm.notes.other.length +
                                            (_vm.prescription.Notes != "" &&
                                            _vm.prescription.Notes != null
                                              ? 1
                                              : 0)
                                        ) +
                                        "\n                            "
                                    )
                                  ])
                                : _vm._e()
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        !_vm.locked
                          ? _c(
                              "li",
                              {
                                staticClass: "clickable",
                                staticStyle: { "margin-right": "0!important" },
                                attrs: { title: "Add new note" },
                                on: {
                                  click: function($event) {
                                    return _vm.openNote()
                                  }
                                }
                              },
                              [_c("a", [_vm._v("Add Note")])]
                            )
                          : _vm._e()
                      ]),
                      _vm._v(" "),
                      _vm.activeTab == "products"
                        ? _c("div", { staticClass: "content" }, [
                            _c(
                              "div",
                              {
                                staticStyle: {
                                  display: "flex",
                                  "justify-content": "space-between"
                                }
                              },
                              [
                                _c("div"),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticStyle: {
                                      "padding-right": "5px",
                                      "padding-top": "2px"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                            Layout: \n                            "
                                    ),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "clickable smallTextBtn secondaryBtn",
                                        class: {
                                          active: _vm.view.products == 1
                                        },
                                        on: {
                                          click: function($event) {
                                            _vm.view.products = 1
                                          }
                                        }
                                      },
                                      [_vm._v("1")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "clickable smallTextBtn secondaryBtn",
                                        class: {
                                          active: _vm.view.products == 2
                                        },
                                        on: {
                                          click: function($event) {
                                            _vm.view.products = 2
                                          }
                                        }
                                      },
                                      [_vm._v("2")]
                                    )
                                  ]
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "card-body" },
                              _vm._l(_vm.prescription.Products, function(
                                product
                              ) {
                                return _c(
                                  "div",
                                  { staticClass: "medicineTitle" },
                                  [
                                    product.Fridge == 1 &&
                                    _vm.userInfo.role == 20
                                      ? _c(
                                          "div",
                                          {
                                            staticClass: "fridge-notification"
                                          },
                                          [
                                            _vm._v(
                                              "\n                                FRIDGE PRODUCT\n                            "
                                            )
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _vm.view.products == "1"
                                      ? _c(
                                          "div",
                                          {
                                            staticClass: "title information",
                                            class: [
                                              product.Fridge == 1 &&
                                              _vm.userInfo.role == 20
                                                ? "mt-20"
                                                : ""
                                            ]
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass: "medicine-tooltips"
                                              },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "medicineTooltip"
                                                  },
                                                  [
                                                    _c(
                                                      "div",
                                                      { staticClass: "name" },
                                                      [_vm._v("Name:")]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      { staticClass: "value" },
                                                      [
                                                        _vm._v(
                                                          _vm._s(
                                                            product.Description
                                                          )
                                                        )
                                                      ]
                                                    )
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "medicineTooltip"
                                                  },
                                                  [
                                                    _c(
                                                      "div",
                                                      { staticClass: "name" },
                                                      [_vm._v("Formulation:")]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      { staticClass: "value" },
                                                      [
                                                        _vm._v(
                                                          _vm._s(product.Units)
                                                        )
                                                      ]
                                                    )
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "medicineTooltip"
                                                  },
                                                  [
                                                    _c(
                                                      "div",
                                                      { staticClass: "name" },
                                                      [_vm._v("Quantity:")]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      { staticClass: "value" },
                                                      [
                                                        _vm._v(
                                                          _vm._s(product.Dosage)
                                                        )
                                                      ]
                                                    )
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "medicineTooltip"
                                                  },
                                                  [
                                                    _c(
                                                      "div",
                                                      { staticClass: "name" },
                                                      [_vm._v("Packs:")]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      { staticClass: "value" },
                                                      [
                                                        _vm._v(
                                                          _vm._s(
                                                            product.Quantity
                                                          )
                                                        )
                                                      ]
                                                    )
                                                  ]
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "medicineName mt-10"
                                              },
                                              [
                                                _c("h4", [
                                                  _vm._v(
                                                    "\n                                    (CODE: " +
                                                      _vm._s(product.Code) +
                                                      " - " +
                                                      _vm._s(product.Name) +
                                                      ")\n                                    "
                                                  )
                                                ])
                                              ]
                                            ),
                                            _vm._v(" "),
                                            product.Fridge == 1 &&
                                            _vm.userInfo.role != 20
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "infoBox warning",
                                                    staticStyle: {
                                                      padding: "0",
                                                      "margin-top": "10px"
                                                    }
                                                  },
                                                  [
                                                    _c("p", [
                                                      _vm._v(
                                                        "\n                                        FRIDGE PRODUCT\n                                    "
                                                      )
                                                    ])
                                                  ]
                                                )
                                              : _vm._e()
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _vm.view.products == "2"
                                      ? _c(
                                          "div",
                                          {
                                            staticClass: "information",
                                            class: [
                                              product.Fridge == 1 &&
                                              _vm.userInfo.role == 20
                                                ? "mt-30"
                                                : ""
                                            ]
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticStyle: {
                                                  "text-transform": "uppercase"
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                    MEDICINE NAME: "
                                                ),
                                                _c("b", [
                                                  _vm._v(
                                                    _vm._s(product.Description)
                                                  )
                                                ]),
                                                _vm._v(" "),
                                                _c("br"),
                                                _vm._v(" "),
                                                _c("b", [
                                                  _vm._v(
                                                    "(CODE: " +
                                                      _vm._s(product.Code) +
                                                      " - " +
                                                      _vm._s(product.Name) +
                                                      ")"
                                                  )
                                                ])
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c("div", [
                                              _vm._v(
                                                "\n                                    Formulation: "
                                              ),
                                              _c("b", [
                                                _vm._v(_vm._s(product.Units))
                                              ])
                                            ]),
                                            _vm._v(" "),
                                            _c("div", [
                                              _vm._v(
                                                "\n                                    Quantity: "
                                              ),
                                              _c("b", [
                                                _vm._v(_vm._s(product.Dosage))
                                              ])
                                            ]),
                                            _vm._v(" "),
                                            _c("div", [
                                              _vm._v(
                                                "\n                                    Packs: "
                                              ),
                                              _c("b", [
                                                _vm._v(_vm._s(product.Quantity))
                                              ])
                                            ]),
                                            _vm._v(" "),
                                            product.Fridge == 1 &&
                                            _vm.userInfo.role != 20
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "infoBox warning",
                                                    staticStyle: {
                                                      padding: "0",
                                                      "margin-top": "5px"
                                                    }
                                                  },
                                                  [
                                                    _c("p", [
                                                      _vm._v(
                                                        "\n                                        FRIDGE PRODUCT\n                                    "
                                                      )
                                                    ])
                                                  ]
                                                )
                                              : _vm._e()
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass: "instructions",
                                        class: [
                                          product.Fridge == 1 &&
                                          _vm.userInfo.role == 20
                                            ? "mt-30"
                                            : ""
                                        ]
                                      },
                                      [
                                        _c("p", {
                                          domProps: {
                                            innerHTML: _vm._s(
                                              product.Instructions
                                            )
                                          }
                                        })
                                      ]
                                    )
                                  ]
                                )
                              }),
                              0
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.activeTab == "questionnaire"
                        ? _c("div", { staticClass: "content" }, [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "medicineQuestionnaire fullwidth p-10",
                                class: { fullscreen: _vm.expandedQuestionnaire }
                              },
                              [
                                _c("h2", [
                                  _vm._v(
                                    "\n                            Questionnaire\n                            "
                                  ),
                                  _vm.questionnaire.length != 0
                                    ? _c(
                                        "span",
                                        {
                                          staticClass: "language-toggle",
                                          on: {
                                            click: function($event) {
                                              return _vm.translateQuestionnaire()
                                            }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "(" + _vm._s(_vm.languageText) + ")"
                                          )
                                        ]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c("i", {
                                    staticClass: "fa",
                                    class: [
                                      _vm.expandedQuestionnaire
                                        ? "fa-compress"
                                        : "fa-expand"
                                    ],
                                    attrs: { "aria-hidden": "true" },
                                    on: {
                                      click: function($event) {
                                        _vm.expandedQuestionnaire = !_vm.expandedQuestionnaire
                                      }
                                    }
                                  })
                                ]),
                                _vm._v(" "),
                                !_vm.questionnaireLoading
                                  ? _c(
                                      "table",
                                      {
                                        attrs: {
                                          cellpadding: "0",
                                          cellspacing: "0"
                                        }
                                      },
                                      _vm._l(_vm.questionnaire, function(
                                        value,
                                        key
                                      ) {
                                        return _vm.questionnaire.length != 0 &&
                                          !_vm.loading
                                          ? _c("tr", { key: key }, [
                                              _c("td", [
                                                _vm._v(_vm._s(value.Question))
                                              ]),
                                              _vm._v(" "),
                                              _c("td", [
                                                _vm._v(_vm._s(value.Answer))
                                              ])
                                            ])
                                          : _vm._e()
                                      }),
                                      0
                                    )
                                  : _c(
                                      "div",
                                      {
                                        staticClass: "dotloader loader-relative"
                                      },
                                      [_vm._v("Loading...")]
                                    ),
                                _vm._v(" "),
                                _vm.questionnaire.length == 0 && !_vm.loading
                                  ? _c("div", [
                                      _vm._v(
                                        "\n                            This prescription does not have a questionnaire.\n                        "
                                      )
                                    ])
                                  : _vm._e()
                              ]
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.activeTab == "history"
                        ? _c("div", { staticClass: "content" }, [
                            _c(
                              "div",
                              {
                                staticClass: "medicineHistory notranslate p-10",
                                staticStyle: { width: "100%" }
                              },
                              [
                                _c("h2", [_vm._v("Medical history")]),
                                _vm._v(" "),
                                _vm._l(_vm.history, function(value, key) {
                                  return !_vm.historyLoading
                                    ? _c(
                                        "ul",
                                        {
                                          key: key,
                                          staticClass: "new",
                                          class: _vm.statusClass(value.Status),
                                          staticStyle: {
                                            "list-style-type": "none"
                                          },
                                          attrs: {
                                            title:
                                              "Order " +
                                              value.PrescriptionID +
                                              " in status " +
                                              _vm.orderStatuses[value.Status] +
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
                                        [
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
                                                k == 0 &&
                                                (value.Status == 8 ||
                                                  value.Status == 6 ||
                                                  value.Status == 4)
                                                  ? _c("span", [
                                                      _c("b", [
                                                        _vm._v(
                                                          _vm._s(
                                                            value.ShippedDate
                                                          )
                                                        )
                                                      ])
                                                    ])
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                _c(
                                                  "a",
                                                  {
                                                    attrs: {
                                                      target: "_blank",
                                                      href:
                                                        "#/prescription/" +
                                                        value.PrescriptionID
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(product.Name) +
                                                        ", " +
                                                        _vm._s(
                                                          product.Quantity *
                                                            product.Dosage
                                                        ) +
                                                        " " +
                                                        _vm._s(product.Units)
                                                    )
                                                  ]
                                                )
                                              ]
                                            )
                                          }),
                                          _vm._v(" "),
                                          _c("li", { staticClass: "client" }, [
                                            _c("b", [_vm._v("Client:")]),
                                            _vm._v(" " + _vm._s(value.Client))
                                          ]),
                                          _vm._v(" "),
                                          _c("li", [
                                            _c("b", [_vm._v("Status:")]),
                                            _vm._v(" "),
                                            _c(
                                              "span",
                                              {
                                                staticClass: "font-highlight",
                                                class: _vm.statusClass(
                                                  value.Status
                                                )
                                              },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.orderStatuses[
                                                      value.Status
                                                    ]
                                                  )
                                                )
                                              ]
                                            )
                                          ])
                                        ],
                                        2
                                      )
                                    : _vm._e()
                                }),
                                _vm._v(" "),
                                _vm.historyLoading
                                  ? _c(
                                      "div",
                                      {
                                        staticClass: "dotloader loader-relative"
                                      },
                                      [_vm._v("Loading...")]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                !_vm.historyLoading && _vm.history.length == 0
                                  ? _c("div", [
                                      _vm._v("No previous orders available..")
                                    ])
                                  : _vm._e()
                              ],
                              2
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.activeTab == "notes"
                        ? _c("div", { staticClass: "content" }, [
                            _vm.notes.critical.length > 0
                              ? _c(
                                  "ul",
                                  { staticClass: "critical" },
                                  _vm._l(_vm.notes.critical, function(note) {
                                    return _c(
                                      "li",
                                      { key: note.NoteID, staticClass: "note" },
                                      [
                                        _c("div", {
                                          staticClass: "note-body",
                                          domProps: {
                                            innerHTML: _vm._s(note.Note)
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "note-footer" },
                                          [
                                            _c("span", [
                                              _vm._v(
                                                _vm._s(note.name) +
                                                  " " +
                                                  _vm._s(note.surname)
                                              )
                                            ]),
                                            _c("span", [
                                              _vm._v(_vm._s(note.CreatedAt))
                                            ])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass: "note-footer",
                                            staticStyle: {
                                              "justify-content": "flex-end",
                                              "margin-top": "5px"
                                            }
                                          },
                                          [
                                            _vm.userInfo.role >= 30
                                              ? _c(
                                                  "button",
                                                  {
                                                    staticClass:
                                                      "smallTextBtn secondaryBtn",
                                                    staticStyle: {
                                                      "font-size": "12px",
                                                      cursor: "pointer"
                                                    },
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.deleteNote(
                                                          note.NoteID
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [_vm._v("Delete")]
                                                )
                                              : _vm._e(),
                                            _vm._v(" "),
                                            _vm.userInfo.role >= 30
                                              ? _c(
                                                  "button",
                                                  {
                                                    staticClass:
                                                      "smallTextBtn secondaryBtn",
                                                    staticStyle: {
                                                      "font-size": "12px",
                                                      cursor: "pointer"
                                                    },
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.openNote(
                                                          note
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [_vm._v("Edit")]
                                                )
                                              : _vm._e()
                                          ]
                                        )
                                      ]
                                    )
                                  }),
                                  0
                                )
                              : _c("ul", [
                                  _c("li", [_vm._v("No patient notes found")])
                                ])
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.activeTab == "patient"
                        ? _c("div", { staticClass: "content" }, [
                            _vm.notes.information.length > 0
                              ? _c(
                                  "ul",
                                  { staticClass: "medical" },
                                  _vm._l(_vm.notes.information, function(note) {
                                    return _c(
                                      "li",
                                      { key: note.NoteID, staticClass: "note" },
                                      [
                                        _c("div", {
                                          staticClass: "note-body",
                                          domProps: {
                                            innerHTML: _vm._s(note.Note)
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "note-footer" },
                                          [
                                            _c("span", [
                                              _vm._v(
                                                _vm._s(note.name) +
                                                  " " +
                                                  _vm._s(note.surname)
                                              )
                                            ]),
                                            _c("span", [
                                              _vm._v(_vm._s(note.CreatedAt))
                                            ])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass: "note-footer",
                                            staticStyle: {
                                              "justify-content": "flex-end",
                                              "margin-top": "5px"
                                            }
                                          },
                                          [
                                            _vm.userInfo.role >= 30
                                              ? _c(
                                                  "button",
                                                  {
                                                    staticClass:
                                                      "smallTextBtn secondaryBtn",
                                                    staticStyle: {
                                                      "font-size": "12px",
                                                      cursor: "pointer"
                                                    },
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.deleteNote(
                                                          note.NoteID
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [_vm._v("Delete")]
                                                )
                                              : _vm._e(),
                                            _vm._v(" "),
                                            _vm.userInfo.role >= 30
                                              ? _c(
                                                  "button",
                                                  {
                                                    staticClass:
                                                      "smallTextBtn secondaryBtn",
                                                    staticStyle: {
                                                      "font-size": "12px",
                                                      cursor: "pointer"
                                                    },
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.openNote(
                                                          note
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [_vm._v("Edit")]
                                                )
                                              : _vm._e()
                                          ]
                                        )
                                      ]
                                    )
                                  }),
                                  0
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.notes.correspondence.length > 0
                              ? _c(
                                  "ul",
                                  { staticClass: "other" },
                                  _vm._l(_vm.notes.correspondence, function(
                                    note
                                  ) {
                                    return _c(
                                      "li",
                                      { key: note.NoteID, staticClass: "note" },
                                      [
                                        _c("div", {
                                          staticClass: "note-header",
                                          domProps: {
                                            innerHTML: _vm._s(note.Subject)
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("hr"),
                                        _vm._v(" "),
                                        _c("div", {
                                          staticClass: "note-body",
                                          domProps: {
                                            innerHTML: _vm._s(note.Message)
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("hr"),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "note-footer" },
                                          [
                                            _c("span", [
                                              _vm._v(
                                                _vm._s(note.Name) +
                                                  " " +
                                                  _vm._s(note.Surname)
                                              )
                                            ]),
                                            _c("span", [
                                              _vm._v(_vm._s(note.Date) + " ")
                                            ])
                                          ]
                                        )
                                      ]
                                    )
                                  }),
                                  0
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.notes.correspondence.length == 0 &&
                            _vm.notes.information.length == 0
                              ? _c("ul", [
                                  _c("li", [_vm._v("No queried notes found")])
                                ])
                              : _vm._e()
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.activeTab == "order"
                        ? _c("div", { staticClass: "content" }, [
                            _vm.prescription.Notes != "" &&
                            _vm.prescription.Notes != null
                              ? _c("ul", { staticClass: "other" }, [
                                  _c("li", { staticClass: "note" }, [
                                    _c("div", {
                                      staticClass: "note-body",
                                      domProps: {
                                        innerHTML: _vm._s(
                                          _vm.prescription.Notes
                                        )
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("div", { staticClass: "note-footer" })
                                  ])
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.notes.other.length > 0
                              ? _c(
                                  "ul",
                                  { staticClass: "other" },
                                  _vm._l(_vm.notes.other, function(note) {
                                    return _c(
                                      "li",
                                      { key: note.NoteID, staticClass: "note" },
                                      [
                                        _c("div", {
                                          staticClass: "note-body",
                                          domProps: {
                                            innerHTML: _vm._s(note.Note)
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "note-footer" },
                                          [
                                            _c("span", [
                                              _vm._v(
                                                _vm._s(note.name) +
                                                  " " +
                                                  _vm._s(note.surname)
                                              )
                                            ]),
                                            _c("span", [
                                              _vm._v(_vm._s(note.CreatedAt))
                                            ])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass: "note-footer",
                                            staticStyle: {
                                              "justify-content": "flex-end",
                                              "margin-top": "5px"
                                            }
                                          },
                                          [
                                            _vm.userInfo.role >= 30
                                              ? _c(
                                                  "button",
                                                  {
                                                    staticClass:
                                                      "smallTextBtn secondaryBtn",
                                                    staticStyle: {
                                                      "font-size": "12px",
                                                      cursor: "pointer"
                                                    },
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.deleteNote(
                                                          note.NoteID
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [_vm._v("Delete")]
                                                )
                                              : _vm._e(),
                                            _vm._v(" "),
                                            _vm.userInfo.role >= 30
                                              ? _c(
                                                  "button",
                                                  {
                                                    staticClass:
                                                      "smallTextBtn secondaryBtn",
                                                    staticStyle: {
                                                      "font-size": "12px",
                                                      cursor: "pointer"
                                                    },
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.openNote(
                                                          note
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [_vm._v("Edit")]
                                                )
                                              : _vm._e()
                                          ]
                                        )
                                      ]
                                    )
                                  }),
                                  0
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            (_vm.prescription.Notes == "" ||
                              _vm.prescription.Notes == null) &&
                            _vm.notes.other.length == 0
                              ? _c("ul", [
                                  _c("li", [_vm._v("No order notes found")])
                                ])
                              : _vm._e()
                          ])
                        : _vm._e()
                    ])
                  ]
                ),
                _vm._v(" "),
                _c("section", { staticClass: "card" }, [
                  _c(
                    "div",
                    {
                      staticClass: "card-header",
                      staticStyle: { background: "#eff8f830" }
                    },
                    [
                      _c("h3", { staticStyle: { "text-align": "center" } }, [
                        _vm._v(
                          "HR HEALTHCARE Pharmacy, Unit 18, Waters Meeting, Britannia Way, Bolton BL2 2HH, United Kingdom"
                        )
                      ])
                    ]
                  )
                ])
              ],
              1
            )
          : _vm._e()
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4d400ee4", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-b53a8866\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/DiffTableAddress.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("table", { staticClass: "table table-hover table-diff mt-20" }, [
    _vm._m(0),
    _vm._v(" "),
    _c(
      "tbody",
      [
        _vm._l(_vm.newObject, function(change, key) {
          return _c("tr", { key: key }, [
            _c(
              "td",
              {
                class: [
                  _vm.oldObject[key] == _vm.newObject[key] ||
                  (_vm.oldObject[key] == null && _vm.newObject[key] == "")
                    ? ""
                    : "row-danger"
                ]
              },
              [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.alias[key]) +
                    "\n            "
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "td",
              {
                class: [
                  _vm.oldObject[key] == _vm.newObject[key] ||
                  (_vm.oldObject[key] == null && _vm.newObject[key] == "")
                    ? ""
                    : "row-danger"
                ]
              },
              [
                key == "DeliveryID"
                  ? _c("span", [
                      _vm._v(_vm._s(_vm.getCompanyTitle(_vm.oldObject[key])))
                    ])
                  : key == "DCountryCode"
                  ? _c("span", [
                      _vm._v(_vm._s(_vm.getCountryTitle(_vm.oldObject[key])))
                    ])
                  : key == "CountryCode"
                  ? _c("span", [
                      _vm._v(_vm._s(_vm.getCountryTitle(_vm.oldObject[key])))
                    ])
                  : _c("span", [_vm._v(_vm._s(_vm.oldObject[key]))])
              ]
            ),
            _vm._v(" "),
            _c(
              "td",
              {
                class: [
                  _vm.oldObject[key] == _vm.newObject[key] ||
                  (_vm.oldObject[key] == null && _vm.newObject[key] == "")
                    ? ""
                    : "row-danger"
                ]
              },
              [
                key == "DeliveryID"
                  ? _c("span", [
                      _vm._v(_vm._s(_vm.getCompanyTitle(_vm.newObject[key])))
                    ])
                  : key == "DCountryCode"
                  ? _c("span", [
                      _vm._v(_vm._s(_vm.getCountryTitle(_vm.newObject[key])))
                    ])
                  : key == "CountryCode"
                  ? _c("span", [
                      _vm._v(_vm._s(_vm.getCountryTitle(_vm.newObject[key])))
                    ])
                  : _c("span", [_vm._v(_vm._s(_vm.newObject[key]))])
              ]
            )
          ])
        }),
        _vm._v(" "),
        _vm.newObjectUPS && _vm.newObjectUPS.length != 0
          ? _c("tr", [_vm._m(1)])
          : _vm._e(),
        _vm._v(" "),
        _vm._l(_vm.newObjectUPS, function(change, key) {
          return _c("tr", { key: key }, [
            _c(
              "td",
              {
                class: [
                  _vm.oldObjectUPS[key] != _vm.newObjectUPS[key] ||
                  !(
                    _vm.oldObjectUPS[key] == null && _vm.newObjectUPS[key] == ""
                  )
                    ? "row-danger"
                    : ""
                ]
              },
              [
                _vm._v(
                  "\n                AP " +
                    _vm._s(_vm.alias[key]) +
                    "\n            "
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "td",
              {
                class: [
                  _vm.oldObjectUPS[key] != _vm.newObjectUPS[key] ||
                  !(
                    _vm.oldObjectUPS[key] == null && _vm.newObjectUPS[key] == ""
                  )
                    ? "row-danger"
                    : ""
                ]
              },
              [
                key == "DeliveryID"
                  ? _c("span", [
                      _vm._v(_vm._s(_vm.getCompanyTitle(_vm.oldObjectUPS[key])))
                    ])
                  : key == "DCountryCode"
                  ? _c("span", [
                      _vm._v(_vm._s(_vm.getCountryTitle(_vm.oldObjectUPS[key])))
                    ])
                  : key == "CountryCode"
                  ? _c("span", [
                      _vm._v(_vm._s(_vm.getCountryTitle(_vm.oldObjectUPS[key])))
                    ])
                  : _c("span", [_vm._v(_vm._s(_vm.oldObjectUPS[key]))])
              ]
            ),
            _vm._v(" "),
            _c(
              "td",
              {
                class: [
                  _vm.oldObjectUPS[key] != _vm.newObjectUPS[key] ||
                  !(
                    _vm.oldObjectUPS[key] == null && _vm.newObjectUPS[key] == ""
                  )
                    ? "row-danger"
                    : ""
                ]
              },
              [
                key == "DeliveryID"
                  ? _c("span", [
                      _vm._v(_vm._s(_vm.getCompanyTitle(_vm.newObjectUPS[key])))
                    ])
                  : key == "DCountryCode"
                  ? _c("span", [
                      _vm._v(_vm._s(_vm.getCountryTitle(_vm.newObjectUPS[key])))
                    ])
                  : key == "CountryCode"
                  ? _c("span", [
                      _vm._v(_vm._s(_vm.getCountryTitle(_vm.newObjectUPS[key])))
                    ])
                  : _c("span", [_vm._v(_vm._s(_vm.newObjectUPS[key]))])
              ]
            )
          ])
        })
      ],
      2
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("\n                Field\n            ")]),
        _vm._v(" "),
        _c("th", [_vm._v("\n                Current Value\n            ")]),
        _vm._v(" "),
        _c("th", [_vm._v("\n                New Value\n            ")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { attrs: { colspan: "3" } }, [
      _c("h3", [_vm._v("UPS Access Point Details")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b53a8866", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-d3b71f08\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/Prescription.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "infoHeader", class: _vm.headerClass }, [
        _c("div", { staticClass: "floatLeft" }, [
          _c("ul", [
            _c(
              "li",
              {
                staticClass: "clickable",
                staticStyle: { "min-width": "120px" },
                on: {
                  dblclick: function($event) {
                    return _vm.copyToClipboard(_vm.prescription.PrescriptionID)
                  }
                }
              },
              [
                _c("span", [_vm._v("ESA Order ID:")]),
                _vm._v(
                  _vm._s(_vm.prescription.PrescriptionID || "Loading") +
                    "\n                "
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "li",
              {
                staticClass: "clickable",
                staticStyle: { "min-width": "120px" },
                on: {
                  dblclick: function($event) {
                    return _vm.copyToClipboard(_vm.prescription.ReferenceNumber)
                  }
                }
              },
              [
                _c("span", [_vm._v("Client Reference Number:")]),
                _vm._v(
                  _vm._s(_vm.prescription.ReferenceNumber || "Loading") +
                    "\n                "
                )
              ]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "floatCenter" }, [
          _c("ul", [
            _c("li", [
              _c("span", [_vm._v("ORDER STATUS: ")]),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.prescriptionStatus,
                      expression: "prescriptionStatus"
                    }
                  ],
                  attrs: { disabled: !_vm.fullyLoaded },
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.prescriptionStatus = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                [
                  _c(
                    "option",
                    { attrs: { disabled: "", hidden: "", value: "" } },
                    [_vm._v("Select")]
                  ),
                  _vm._v(" "),
                  _vm._l(_vm.orderStatuses, function(value, key) {
                    return _c(
                      "option",
                      { key: key, domProps: { value: key } },
                      [_vm._v(_vm._s(value))]
                    )
                  })
                ],
                2
              ),
              _vm._v(" "),
              _vm.fullyLoaded &&
              _vm.prescriptionStatus != _vm.prescription.Status
                ? _c(
                    "button",
                    {
                      staticClass: "btn btnSize04 primaryBtn",
                      on: {
                        click: function($event) {
                          return _vm.updateStatus()
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                        Update\n                    "
                      )
                    ]
                  )
                : _vm._e()
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "floatRight" }, [
          _c("ul", [
            _c(
              "li",
              {
                staticClass: "clickable",
                on: {
                  click: function($event) {
                    return _vm.$root.$emit("tray.toggle")
                  }
                }
              },
              [
                _c("span", [_vm._v("IN TRAY:")]),
                _vm._v(_vm._s(_vm.tray.length) + "\n                ")
              ]
            ),
            _vm._v(" "),
            _c(
              "li",
              {
                staticClass: "clickable",
                on: {
                  click: function($event) {
                    return _vm.trayRedirect("new")
                  }
                }
              },
              [
                _c("span", [_vm._v("NEW:")]),
                _vm._v(
                  _vm._s(_vm.statistics.statistics.new) + "\n                "
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "li",
              {
                staticClass: "clickable",
                on: {
                  click: function($event) {
                    return _vm.trayRedirect("approved")
                  }
                }
              },
              [
                _c("span", [_vm._v("APPROVED:")]),
                _vm._v(
                  _vm._s(_vm.statistics.statistics.approved) +
                    "\n                "
                )
              ]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("transition", { attrs: { name: "slide-down" } }, [
        _vm.errors.length != 0
          ? _c("section", [
              _c(
                "div",
                { staticClass: "infoBox warning" },
                _vm._l(_vm.errors, function(error) {
                  return _c("p", [
                    _vm._v(
                      "\n                    " +
                        _vm._s(error) +
                        "\n                "
                    )
                  ])
                }),
                0
              )
            ])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("transition", { attrs: { name: "fade" } }, [
        _vm.prescription
          ? _c(
              "div",
              { staticClass: "content" },
              [
                _vm.duplicate &&
                [2, 4, 5, 7, 8, 9, 10, 11, 1].includes(_vm.prescription.Status)
                  ? _c("section", { staticClass: "notranslate" }, [
                      _c("div", { staticClass: "infoBox warning" }, [
                        _c("p", [
                          _vm._v(
                            "\n                    There is a possible duplicate order with ID \n                    "
                          ),
                          _c(
                            "a",
                            {
                              attrs: {
                                target: "_blank",
                                href:
                                  "#/prescription/" +
                                  _vm.duplicate.PrescriptionID
                              }
                            },
                            [_vm._v(_vm._s(_vm.duplicate.PrescriptionID))]
                          ),
                          _vm._v(
                            " that has the same customer reference id\n                    " +
                              _vm._s(_vm.duplicate.ReferenceNumber) +
                              " with\n                    status " +
                              _vm._s(_vm.orderStatuses[_vm.duplicate.Status]) +
                              "."
                          ),
                          _c("br"),
                          _vm._v(
                            "\n                    Please investigate by "
                          ),
                          _c(
                            "a",
                            {
                              attrs: {
                                target: "_blank",
                                href:
                                  "#/prescription/" +
                                  _vm.duplicate.PrescriptionID
                              }
                            },
                            [_vm._v("clicking here")]
                          ),
                          _vm._v(" before processing.\n                ")
                        ])
                      ])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.approved
                  ? _c("section", [
                      _c("div", { staticClass: "infoBox warning" }, [
                        _c("p", [
                          _vm._v(
                            "\n                    THIS ITEM HAS ALREADY BEEN APPROVED\n                "
                          )
                        ])
                      ])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.locked
                  ? _c("section", [
                      _c("div", { staticClass: "infoBox error" }, [
                        _c("p", [
                          _vm._v(
                            "\n                    This item is currently being edited by "
                          ),
                          _c("b", [_vm._v(_vm._s(_vm.locked))]),
                          _vm._v(" "),
                          _vm.userInfo.role >= 50
                            ? _c(
                                "button",
                                {
                                  staticClass: "btn btnSize01 primaryBtn",
                                  attrs: { title: "Unlock any order locks" },
                                  on: {
                                    click: function($event) {
                                      return _vm.unlockOrder()
                                    }
                                  }
                                },
                                [_vm._v("Unlock")]
                              )
                            : _vm._e()
                        ])
                      ])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("section", { staticClass: "notranslate card" }, [
                  _c(
                    "div",
                    { staticClass: "card-header prescription-info-header" },
                    [
                      _c("h3", [_vm._v("Prescription Info")]),
                      _vm._v(" "),
                      _c("div", { staticClass: "delivery" }, [
                        _vm.prescription.UPSAccessPointAddress != 0
                          ? _c("img", {
                              staticStyle: { height: "20px" },
                              attrs: { src: "images/logo/ups_access_point.jpg" }
                            })
                          : _vm.prescription.PaymentMethod != 0
                          ? _c("img", {
                              staticStyle: { height: "20px" },
                              attrs: { src: "images/logo/ups_cod.jpg" }
                            })
                          : _c("img", {
                              staticStyle: { height: "20px" },
                              attrs: {
                                src: _vm.imgMap[_vm.prescription.DeliveryID]
                              }
                            })
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "patientInfo card-body" }, [
                    _c("div", { staticClass: "patient" }, [
                      _c("ul", [
                        _c("li", [
                          _c("span", [_vm._v("Name: ")]),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticClass: "high-visibility",
                              staticStyle: { "text-transform": "uppercase" }
                            },
                            [_vm._v(_vm._s(_vm.prescription.Name))]
                          )
                        ]),
                        _vm._v(" "),
                        _c("li", [
                          _c("span", [_vm._v("Surname: ")]),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticClass: "high-visibility",
                              staticStyle: { "text-transform": "uppercase" }
                            },
                            [_vm._v(_vm._s(_vm.prescription.Surname))]
                          )
                        ]),
                        _vm._v(" "),
                        _c(
                          "li",
                          {
                            staticClass: "gender",
                            class: [
                              _vm.prescription.Sex == "Male"
                                ? "blue"
                                : _vm.prescription.Sex == "Female"
                                ? "purple"
                                : _vm.prescription.Sex == "Transgender"
                                ? "orange"
                                : "grey"
                            ]
                          },
                          [
                            _c("span", [_vm._v("Gender: ")]),
                            _vm._v(" "),
                            _c("span", { staticClass: "high-visibility" }, [
                              _vm._v(_vm._s(_vm.prescription.Sex))
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c("li", [
                          _c("span", [_vm._v("Age: ")]),
                          _vm._v(" "),
                          _c("span", { staticClass: "high-visibility" }, [
                            _vm._v(_vm._s(_vm.prescription.Age))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("li", [
                          _c("span", [_vm._v("DOB: ")]),
                          _vm._v(" "),
                          _c("span", { staticClass: "high-visibility" }, [
                            _vm._v(_vm._s(_vm.prescription.DOB))
                          ])
                        ]),
                        _vm._v(" "),
                        _c(
                          "li",
                          {
                            class: {
                              "highlight-magenta":
                                _vm.prescription.DoctorID == 42
                            }
                          },
                          [
                            _c("span", [_vm._v("Prescriber: ")]),
                            _vm._v(" "),
                            _c("span", { staticClass: "high-visibility" }, [
                              _vm._v(
                                _vm._s(_vm.prescription.DTitle) +
                                  " " +
                                  _vm._s(_vm.prescription.DName) +
                                  " " +
                                  _vm._s(_vm.prescription.DSurname) +
                                  " (" +
                                  _vm._s(
                                    _vm.doctorTypes[_vm.prescription.DoctorType]
                                  ) +
                                  ": " +
                                  _vm._s(_vm.prescription.GMCNO) +
                                  ")"
                              )
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c("li", [
                          _c("span", [_vm._v("Prescriber Address: ")]),
                          _vm._v(" "),
                          _c("span", { staticClass: "high-visibility" }, [
                            _vm._v(
                              " " +
                                _vm._s(_vm.prescription.DoctorAddress1) +
                                ", " +
                                _vm._s(_vm.prescription.DoctorAddress2) +
                                ", " +
                                _vm._s(_vm.prescription.DoctorAddress3) +
                                ", " +
                                _vm._s(_vm.prescription.DoctorAddress4) +
                                " " +
                                _vm._s(_vm.prescription.DoctorPostCode) +
                                " "
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("li", [
                          _c("span", [_vm._v("Client: ")]),
                          _vm._v(" "),
                          _c("span", { staticClass: "high-visibility" }, [
                            _vm._v(_vm._s(_vm.prescription.CompanyName))
                          ])
                        ])
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "prescription-info" }, [
                      _c("div", { staticClass: "prescription" }, [
                        _c("ul", [
                          _c("li", [
                            _c("span", [_vm._v("Recieved Date: ")]),
                            _vm._v(
                              _vm._s(
                                _vm.timestampToDate(
                                  _vm.prescription.CreatedDate
                                )
                              )
                            )
                          ]),
                          _vm._v(" "),
                          _vm.prescription.Status == 8
                            ? _c("li", [
                                _c("span", [_vm._v("Shipped/Supplied Date: ")]),
                                _vm._v(
                                  _vm._s(
                                    _vm.timestampToDate(
                                      _vm.prescription.UpdatedDate
                                    )
                                  )
                                )
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.isCommercial
                            ? _c("li", [
                                _c("span", [
                                  _vm._v("Commercial Invoice Value: ")
                                ]),
                                _vm._v(_vm._s(_vm.prescription.Repeats))
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _c("li", [
                            _c("span", [_vm._v("Shipping: ")]),
                            _vm._v("Patient has Authorised 3rd Party Carrier")
                          ]),
                          _vm._v(" "),
                          _c("li", [
                            _c("span", [_vm._v("Courier: ")]),
                            _vm._v(_vm._s(_vm.prescription.Courier))
                          ]),
                          _vm._v(" "),
                          _vm.prescription.TrackingCode != "" &&
                          _vm.prescription.TrackingCode != null
                            ? _c("li", [
                                _c("span", [_vm._v("Tracking Code: ")]),
                                _vm._v(
                                  _vm._s(_vm.prescription.TrackingCode) +
                                    "\n                            "
                                )
                              ])
                            : _vm._e()
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "location" }, [
                        _c("ul", [
                          _c("li", [
                            _c("span", [_vm._v("Home adress: ")]),
                            _vm._v(
                              _vm._s(
                                _vm.prescription.Address1 +
                                  " " +
                                  _vm.prescription.Address2 +
                                  " " +
                                  _vm.prescription.Address3 +
                                  " " +
                                  _vm.prescription.Address4 +
                                  " " +
                                  _vm.prescription.Postcode
                              )
                            )
                          ]),
                          _vm._v(" "),
                          _c("li", [
                            _c("span", [_vm._v("Delivery address: ")]),
                            _vm._v(
                              _vm._s(
                                _vm.prescription.DAddress1 +
                                  " " +
                                  _vm.prescription.DAddress2 +
                                  " " +
                                  _vm.prescription.DAddress3 +
                                  " " +
                                  _vm.prescription.DAddress4 +
                                  " " +
                                  _vm.prescription.DPostcode
                              ) + "\n                                "
                            )
                          ]),
                          _vm._v(" "),
                          _c("li", [
                            _c("span", [_vm._v("Country: ")]),
                            _vm._v(_vm._s(_vm.prescription.CountryName))
                          ]),
                          _vm._v(" "),
                          _c("li", [
                            _c("span", [_vm._v("Telephone: ")]),
                            _vm._v(" "),
                            _c(
                              "a",
                              {
                                attrs: {
                                  href:
                                    "tel:" +
                                    (_vm.prescription.Telephone
                                      ? _vm.prescription.Telephone
                                      : _vm.prescription.Mobile)
                                }
                              },
                              [
                                _vm._v(
                                  "\n                                    " +
                                    _vm._s(
                                      _vm.prescription.Telephone
                                        ? _vm.prescription.Telephone
                                        : _vm.prescription.Mobile
                                    ) +
                                    "\n                                "
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("li", [
                            _c("span", [_vm._v("Email: ")]),
                            _vm._v(" "),
                            _c(
                              "a",
                              {
                                attrs: {
                                  href: "mailto:" + _vm.prescription.Email
                                }
                              },
                              [_vm._v(_vm._s(_vm.prescription.Email))]
                            )
                          ])
                        ])
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "activity" }, [
                      _vm.activity.length != 0
                        ? _c(
                            "ul",
                            { staticClass: "activity-log-wrapper" },
                            [
                              _c("h5", { staticClass: "activity-log-header" }, [
                                _vm._v("Activities on this order")
                              ]),
                              _vm._v(" "),
                              _vm._l(_vm.activity, function(a) {
                                return _c(
                                  "li",
                                  {
                                    key: a.ActivityID,
                                    staticClass: "activity-log-item"
                                  },
                                  [
                                    _c(
                                      "div",
                                      { staticClass: "activity-action" },
                                      [
                                        _vm._v(
                                          "\n                                " +
                                            _vm._s(a.Action) +
                                            "\n\n                                "
                                        ),
                                        (a.Type == 750 || a.Type == 751) &&
                                        _vm.userInfo.role >= 50
                                          ? _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "clickable smallTextBtn secondaryBtn",
                                                attrs: { disabled: _vm.locked },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.revert(a)
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                    Revert\n                                "
                                                )
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        (a.Type == 750 || a.Type == 751) &&
                                        _vm.userInfo.role < 50 &&
                                        !a.FirstChange
                                          ? _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "clickable smallTextBtn secondaryBtn",
                                                on: {
                                                  click: function($event) {
                                                    return _vm.revert(a, true)
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                    View\n                                "
                                                )
                                              ]
                                            )
                                          : (a.Type == 750 || a.Type == 751) &&
                                            _vm.userInfo.role < 50 &&
                                            a.FirstChange
                                          ? _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "clickable smallTextBtn secondaryBtn",
                                                attrs: { disabled: _vm.locked },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.revert(a)
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                    Revert\n                                "
                                                )
                                              ]
                                            )
                                          : _vm._e()
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "activity-footer" },
                                      [
                                        _c("span", [_vm._v(_vm._s(a.Name))]),
                                        _c("span", [_vm._v(_vm._s(a.Date))])
                                      ]
                                    )
                                  ]
                                )
                              })
                            ],
                            2
                          )
                        : _c("ul", { staticClass: "activity-log-wrapper" }, [
                            _c("li", { staticClass: "activity-log-item" }, [
                              _vm._v(
                                "\n                            No activity log found\n                        "
                              )
                            ])
                          ])
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("transition", { attrs: { name: "fade" } }, [
                  _vm.testKits.length > 0
                    ? _c("section", { staticClass: "notranslate card" }, [
                        _c(
                          "div",
                          {
                            staticClass: "card-header card-header-warning",
                            staticStyle: {
                              display: "flex",
                              "justify-content": "space-between"
                            }
                          },
                          [
                            _c("h3", [_vm._v("Sub Orders")]),
                            _vm._v(" "),
                            _c("p", [
                              _vm._v(
                                "This order has multiple sub-orders attached to it"
                              )
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "card-body",
                            class: [
                              _vm.testKits.length > 6
                                ? "sub-order-wrapper"
                                : "sub-order-wrapper-flex"
                            ]
                          },
                          _vm._l(_vm.testKits, function(kit) {
                            return _c(
                              "div",
                              { key: kit.TestKitID, staticClass: "sub-order" },
                              [
                                _c("ul", [
                                  _c("li", [
                                    _c("span", [_vm._v("Reference Number:")]),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "high-visibility" },
                                      [
                                        _c("b", [
                                          _vm._v(_vm._s(kit.ReferenceNumber))
                                        ])
                                      ]
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("li", [
                                    _c("span", [_vm._v("Order Number:")]),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "high-visibility" },
                                      [
                                        _c("b", [
                                          _vm._v(
                                            _vm._s(kit.Count) +
                                              "/" +
                                              _vm._s(kit.Total)
                                          )
                                        ])
                                      ]
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("li", [
                                    _c("span", [_vm._v("Name:")]),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "high-visibility" },
                                      [_c("b", [_vm._v(_vm._s(kit.Name))])]
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("li", [
                                    _c("span", [_vm._v("Surname:")]),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "high-visibility" },
                                      [_c("b", [_vm._v(_vm._s(kit.Surname))])]
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "li",
                                    {
                                      class: [
                                        kit.Sex == "Male"
                                          ? "blue"
                                          : kit.Sex == "Female"
                                          ? "purple"
                                          : kit.Sex == "Transgender"
                                          ? "orange"
                                          : "grey"
                                      ]
                                    },
                                    [
                                      _c("span", [_vm._v("Gender:")]),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "high-visibility" },
                                        [_c("b", [_vm._v(_vm._s(kit.Sex))])]
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("li", [
                                    _c("span", [_vm._v("DOB:")]),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "high-visibility" },
                                      [_c("b", [_vm._v(_vm._s(kit.DOB))])]
                                    )
                                  ])
                                ])
                              ]
                            )
                          }),
                          0
                        )
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("section", { staticClass: "notranslate card" }, [
                  _c(
                    "div",
                    {
                      staticClass: "card-header",
                      staticStyle: {
                        display: "flex",
                        "justify-content": "space-between"
                      }
                    },
                    [
                      _c("h3", [_vm._v("Products")]),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticStyle: {
                            "padding-right": "5px",
                            "padding-top": "2px"
                          }
                        },
                        [
                          _vm._v(
                            "\n                    Layout: \n                    "
                          ),
                          _c(
                            "button",
                            {
                              staticClass:
                                "clickable smallTextBtn secondaryBtn",
                              class: { active: _vm.view.products == 1 },
                              on: {
                                click: function($event) {
                                  _vm.view.products = 1
                                }
                              }
                            },
                            [_vm._v("1")]
                          ),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass:
                                "clickable smallTextBtn secondaryBtn",
                              class: { active: _vm.view.products == 2 },
                              on: {
                                click: function($event) {
                                  _vm.view.products = 2
                                }
                              }
                            },
                            [_vm._v("2")]
                          )
                        ]
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "card-body" },
                    _vm._l(_vm.prescription.Products, function(product) {
                      return _c("div", { staticClass: "medicineTitle" }, [
                        product.Fridge == 1 && _vm.userInfo.role == 20
                          ? _c("div", { staticClass: "fridge-notification" }, [
                              _vm._v(
                                "\n                        FRIDGE PRODUCT\n                    "
                              )
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.view.products == "1"
                          ? _c(
                              "div",
                              {
                                staticClass: "title information",
                                class: [
                                  product.Fridge == 1 && _vm.userInfo.role == 20
                                    ? "mt-20"
                                    : ""
                                ]
                              },
                              [
                                _c(
                                  "div",
                                  { staticClass: "medicine-tooltips" },
                                  [
                                    _c(
                                      "div",
                                      { staticClass: "medicineTooltip" },
                                      [
                                        _c("div", { staticClass: "name" }, [
                                          _vm._v("Name:")
                                        ]),
                                        _vm._v(" "),
                                        _c("div", { staticClass: "value" }, [
                                          _vm._v(_vm._s(product.Description))
                                        ])
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "medicineTooltip" },
                                      [
                                        _c("div", { staticClass: "name" }, [
                                          _vm._v("Formulation:")
                                        ]),
                                        _vm._v(" "),
                                        _c("div", { staticClass: "value" }, [
                                          _vm._v(_vm._s(product.Units))
                                        ])
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "medicineTooltip" },
                                      [
                                        _c("div", { staticClass: "name" }, [
                                          _vm._v("Quantity:")
                                        ]),
                                        _vm._v(" "),
                                        _c("div", { staticClass: "value" }, [
                                          _vm._v(_vm._s(product.Dosage))
                                        ])
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "medicineTooltip" },
                                      [
                                        _c("div", { staticClass: "name" }, [
                                          _vm._v("Packs:")
                                        ]),
                                        _vm._v(" "),
                                        _c("div", { staticClass: "value" }, [
                                          _vm._v(_vm._s(product.Quantity))
                                        ])
                                      ]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "medicineName mt-10" },
                                  [
                                    _c("h4", [
                                      _vm._v(
                                        "\n                            (CODE: " +
                                          _vm._s(product.Code) +
                                          " - " +
                                          _vm._s(product.Name) +
                                          ")\n                            "
                                      )
                                    ])
                                  ]
                                ),
                                _vm._v(" "),
                                product.Fridge == 1 && _vm.userInfo.role != 20
                                  ? _c(
                                      "div",
                                      {
                                        staticClass: "infoBox warning",
                                        staticStyle: {
                                          padding: "0",
                                          "margin-top": "10px"
                                        }
                                      },
                                      [
                                        _c("p", [
                                          _vm._v(
                                            "\n                                FRIDGE PRODUCT\n                            "
                                          )
                                        ])
                                      ]
                                    )
                                  : _vm._e()
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.view.products == "2"
                          ? _c(
                              "div",
                              {
                                staticClass: "information",
                                class: [
                                  product.Fridge == 1 && _vm.userInfo.role == 20
                                    ? "mt-30"
                                    : ""
                                ]
                              },
                              [
                                _c(
                                  "div",
                                  {
                                    staticStyle: {
                                      "text-transform": "uppercase"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                            MEDICINE NAME: "
                                    ),
                                    _c("b", [
                                      _vm._v(_vm._s(product.Description))
                                    ]),
                                    _vm._v(" "),
                                    _c("br"),
                                    _vm._v(" "),
                                    _c("b", [
                                      _vm._v(
                                        "(CODE: " +
                                          _vm._s(product.Code) +
                                          " - " +
                                          _vm._s(product.Name) +
                                          ")"
                                      )
                                    ])
                                  ]
                                ),
                                _vm._v(" "),
                                _c("div", [
                                  _vm._v(
                                    "\n                            Formulation: "
                                  ),
                                  _c("b", [_vm._v(_vm._s(product.Units))])
                                ]),
                                _vm._v(" "),
                                _c("div", [
                                  _vm._v(
                                    "\n                            Quantity: "
                                  ),
                                  _c("b", [_vm._v(_vm._s(product.Dosage))])
                                ]),
                                _vm._v(" "),
                                _c("div", [
                                  _vm._v(
                                    "\n                            Packs: "
                                  ),
                                  _c("b", [_vm._v(_vm._s(product.Quantity))])
                                ]),
                                _vm._v(" "),
                                product.Fridge == 1 && _vm.userInfo.role != 20
                                  ? _c(
                                      "div",
                                      {
                                        staticClass: "infoBox warning",
                                        staticStyle: {
                                          padding: "0",
                                          "margin-top": "5px"
                                        }
                                      },
                                      [
                                        _c("p", [
                                          _vm._v(
                                            "\n                                FRIDGE PRODUCT\n                            "
                                          )
                                        ])
                                      ]
                                    )
                                  : _vm._e()
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "instructions",
                            class: [
                              product.Fridge == 1 && _vm.userInfo.role == 20
                                ? "mt-30"
                                : ""
                            ]
                          },
                          [
                            _c("p", {
                              domProps: {
                                innerHTML: _vm._s(product.Instructions)
                              }
                            })
                          ]
                        )
                      ])
                    }),
                    0
                  )
                ]),
                _vm._v(" "),
                _c(
                  "section",
                  {
                    staticClass: "card",
                    class: [_vm.translate ? "" : "notranslate"]
                  },
                  [
                    _c("div", { staticClass: "card-header" }, [
                      _c("h3", [_vm._v("Patient Info")])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "scrollingSuccessors" }, [
                      _c(
                        "div",
                        { staticClass: "medicineHistory notranslate" },
                        [
                          _c("h2", [_vm._v("Medical history")]),
                          _vm._v(" "),
                          _vm._l(_vm.history, function(value, key) {
                            return !_vm.historyLoading
                              ? _c(
                                  "ul",
                                  {
                                    key: key,
                                    staticClass: "new",
                                    class: _vm.statusClass(value.Status),
                                    attrs: {
                                      title:
                                        "Order " +
                                        value.PrescriptionID +
                                        " in status " +
                                        _vm.orderStatuses[value.Status] +
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
                                  [
                                    _vm._l(value.Products, function(
                                      product,
                                      k
                                    ) {
                                      return _c(
                                        "li",
                                        { key: k, staticClass: "medicine" },
                                        [
                                          k == 0 &&
                                          (value.Status == 8 ||
                                            value.Status == 6 ||
                                            value.Status == 4)
                                            ? _c("span", [
                                                _c("b", [
                                                  _vm._v(
                                                    _vm._s(value.ShippedDate)
                                                  )
                                                ])
                                              ])
                                            : _vm._e(),
                                          _vm._v(" "),
                                          _c(
                                            "a",
                                            {
                                              attrs: {
                                                target: "_blank",
                                                href:
                                                  "#/prescription/" +
                                                  value.PrescriptionID
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(product.Name) +
                                                  ", " +
                                                  _vm._s(
                                                    product.Quantity *
                                                      product.Dosage
                                                  ) +
                                                  " " +
                                                  _vm._s(product.Units)
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    }),
                                    _vm._v(" "),
                                    _c("li", { staticClass: "client" }, [
                                      _c("b", [_vm._v("Client:")]),
                                      _vm._v(" " + _vm._s(value.Client))
                                    ]),
                                    _vm._v(" "),
                                    _c("li", [
                                      _c("b", [_vm._v("Status:")]),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        {
                                          staticClass: "font-highlight",
                                          class: _vm.statusClass(value.Status)
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.orderStatuses[value.Status]
                                            )
                                          )
                                        ]
                                      )
                                    ])
                                  ],
                                  2
                                )
                              : _vm._e()
                          }),
                          _vm._v(" "),
                          _vm.historyLoading
                            ? _c(
                                "div",
                                { staticClass: "dotloader loader-relative" },
                                [_vm._v("Loading...")]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          !_vm.historyLoading && _vm.history.length == 0
                            ? _c("div", [
                                _vm._v("No previous orders available..")
                              ])
                            : _vm._e()
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "medicineDetails" }, [
                        _c("ul", { staticClass: "tabs" }, [
                          _c(
                            "li",
                            {
                              class: { active: _vm.activeTab == "notes" },
                              staticStyle: { "margin-left": "0!important" },
                              attrs: {
                                title:
                                  "Relates to allergies, medical conditions and notes added by pharmacists."
                              },
                              on: {
                                click: function($event) {
                                  _vm.activeTab = "notes"
                                }
                              }
                            },
                            [
                              _c(
                                "a",
                                {
                                  staticClass: "danger",
                                  attrs: { href: "javascript:;" }
                                },
                                [
                                  _vm._v(
                                    "Patient Notes \n                                "
                                  ),
                                  _vm.notes.critical.length > 0
                                    ? _c("span", { staticClass: "badge red" }, [
                                        _vm._v(
                                          _vm._s(_vm.notes.critical.length)
                                        )
                                      ])
                                    : _vm._e()
                                ]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "li",
                            {
                              class: { active: _vm.activeTab == "patient" },
                              attrs: {
                                title:
                                  "Relates communication with perscriber and notes sent with perscription"
                              },
                              on: {
                                click: function($event) {
                                  _vm.activeTab = "patient"
                                }
                              }
                            },
                            [
                              _c("a", { attrs: { href: "javascript:;" } }, [
                                _vm._v(
                                  "Queried Notes \n                                "
                                ),
                                _vm.notes.correspondence.length +
                                  _vm.notes.information.length >
                                0
                                  ? _c("span", { staticClass: "badge red" }, [
                                      _vm._v(
                                        _vm._s(
                                          _vm.notes.correspondence.length +
                                            _vm.notes.information.length
                                        )
                                      )
                                    ])
                                  : _vm._e()
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "li",
                            {
                              class: { active: _vm.activeTab == "order" },
                              attrs: { title: "Relates to the current order" },
                              on: {
                                click: function($event) {
                                  _vm.activeTab = "order"
                                }
                              }
                            },
                            [
                              _c("a", { attrs: { href: "javascript:;" } }, [
                                _vm._v(
                                  "Order Notes \n                                "
                                ),
                                (_vm.notes.other.length ||
                                  (_vm.prescription.Notes != "" &&
                                    _vm.prescription.Notes != null)) > 0
                                  ? _c("span", { staticClass: "badge red" }, [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(
                                            _vm.notes.other.length +
                                              (_vm.prescription.Notes != "" &&
                                              _vm.prescription.Notes != null
                                                ? 1
                                                : 0)
                                          ) +
                                          "\n                                "
                                      )
                                    ])
                                  : _vm._e()
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          !_vm.locked
                            ? _c(
                                "li",
                                {
                                  staticStyle: {
                                    "margin-right": "0!important"
                                  },
                                  attrs: { title: "Add new note" },
                                  on: {
                                    click: function($event) {
                                      return _vm.openNote()
                                    }
                                  }
                                },
                                [
                                  _c("a", { attrs: { href: "javascript:;" } }, [
                                    _c("i", { staticClass: "fa fa-plus" })
                                  ])
                                ]
                              )
                            : _vm._e()
                        ]),
                        _vm._v(" "),
                        _vm.activeTab == "notes"
                          ? _c("div", { staticClass: "content" }, [
                              _vm.notes.critical.length > 0
                                ? _c(
                                    "ul",
                                    { staticClass: "critical" },
                                    _vm._l(_vm.notes.critical, function(note) {
                                      return _c(
                                        "li",
                                        {
                                          key: note.NoteID,
                                          staticClass: "note"
                                        },
                                        [
                                          _c("div", {
                                            staticClass: "note-body",
                                            domProps: {
                                              innerHTML: _vm._s(note.Note)
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "note-footer" },
                                            [
                                              _c("span", [
                                                _vm._v(
                                                  _vm._s(note.name) +
                                                    " " +
                                                    _vm._s(note.surname)
                                                )
                                              ]),
                                              _c("span", [
                                                _vm._v(_vm._s(note.CreatedAt))
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass: "note-footer",
                                              staticStyle: {
                                                "justify-content": "flex-end",
                                                "margin-top": "5px"
                                              }
                                            },
                                            [
                                              _vm.userInfo.role >= 30
                                                ? _c(
                                                    "button",
                                                    {
                                                      staticClass:
                                                        "smallTextBtn secondaryBtn",
                                                      staticStyle: {
                                                        "font-size": "12px",
                                                        cursor: "pointer"
                                                      },
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          return _vm.deleteNote(
                                                            note.NoteID
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [_vm._v("Delete")]
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _vm.userInfo.role >= 30
                                                ? _c(
                                                    "button",
                                                    {
                                                      staticClass:
                                                        "smallTextBtn secondaryBtn",
                                                      staticStyle: {
                                                        "font-size": "12px",
                                                        cursor: "pointer"
                                                      },
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          return _vm.openNote(
                                                            note
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [_vm._v("Edit")]
                                                  )
                                                : _vm._e()
                                            ]
                                          )
                                        ]
                                      )
                                    }),
                                    0
                                  )
                                : _c("ul", [
                                    _c("li", [_vm._v("No patient notes found")])
                                  ])
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.activeTab == "patient"
                          ? _c("div", { staticClass: "content" }, [
                              _vm.notes.information.length > 0
                                ? _c(
                                    "ul",
                                    { staticClass: "medical" },
                                    _vm._l(_vm.notes.information, function(
                                      note
                                    ) {
                                      return _c(
                                        "li",
                                        {
                                          key: note.NoteID,
                                          staticClass: "note"
                                        },
                                        [
                                          _c("div", {
                                            staticClass: "note-body",
                                            domProps: {
                                              innerHTML: _vm._s(note.Note)
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "note-footer" },
                                            [
                                              _c("span", [
                                                _vm._v(
                                                  _vm._s(note.name) +
                                                    " " +
                                                    _vm._s(note.surname)
                                                )
                                              ]),
                                              _c("span", [
                                                _vm._v(_vm._s(note.CreatedAt))
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass: "note-footer",
                                              staticStyle: {
                                                "justify-content": "flex-end",
                                                "margin-top": "5px"
                                              }
                                            },
                                            [
                                              _vm.userInfo.role >= 30
                                                ? _c(
                                                    "button",
                                                    {
                                                      staticClass:
                                                        "smallTextBtn secondaryBtn",
                                                      staticStyle: {
                                                        "font-size": "12px",
                                                        cursor: "pointer"
                                                      },
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          return _vm.deleteNote(
                                                            note.NoteID
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [_vm._v("Delete")]
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _vm.userInfo.role >= 30
                                                ? _c(
                                                    "button",
                                                    {
                                                      staticClass:
                                                        "smallTextBtn secondaryBtn",
                                                      staticStyle: {
                                                        "font-size": "12px",
                                                        cursor: "pointer"
                                                      },
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          return _vm.openNote(
                                                            note
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [_vm._v("Edit")]
                                                  )
                                                : _vm._e()
                                            ]
                                          )
                                        ]
                                      )
                                    }),
                                    0
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.notes.correspondence.length > 0
                                ? _c(
                                    "ul",
                                    { staticClass: "other" },
                                    _vm._l(_vm.notes.correspondence, function(
                                      note
                                    ) {
                                      return _c(
                                        "li",
                                        {
                                          key: note.NoteID,
                                          staticClass: "note"
                                        },
                                        [
                                          _c("div", {
                                            staticClass: "note-header",
                                            domProps: {
                                              innerHTML: _vm._s(note.Subject)
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c("hr"),
                                          _vm._v(" "),
                                          _c("div", {
                                            staticClass: "note-body",
                                            domProps: {
                                              innerHTML: _vm._s(note.Message)
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c("hr"),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "note-footer" },
                                            [
                                              _c("span", [
                                                _vm._v(
                                                  _vm._s(note.Name) +
                                                    " " +
                                                    _vm._s(note.Surname)
                                                )
                                              ]),
                                              _c("span", [
                                                _vm._v(_vm._s(note.Date) + " ")
                                              ])
                                            ]
                                          )
                                        ]
                                      )
                                    }),
                                    0
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.notes.correspondence.length == 0 &&
                              _vm.notes.information.length == 0
                                ? _c("ul", [
                                    _c("li", [_vm._v("No queried notes found")])
                                  ])
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.activeTab == "order"
                          ? _c("div", { staticClass: "content" }, [
                              _vm.prescription.Notes != "" &&
                              _vm.prescription.Notes != null
                                ? _c("ul", { staticClass: "other" }, [
                                    _c("li", { staticClass: "note" }, [
                                      _c("div", {
                                        staticClass: "note-body",
                                        domProps: {
                                          innerHTML: _vm._s(
                                            _vm.prescription.Notes
                                          )
                                        }
                                      }),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "note-footer" })
                                    ])
                                  ])
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.notes.other.length > 0
                                ? _c(
                                    "ul",
                                    { staticClass: "other" },
                                    _vm._l(_vm.notes.other, function(note) {
                                      return _c(
                                        "li",
                                        {
                                          key: note.NoteID,
                                          staticClass: "note"
                                        },
                                        [
                                          _c("div", {
                                            staticClass: "note-body",
                                            domProps: {
                                              innerHTML: _vm._s(note.Note)
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "note-footer" },
                                            [
                                              _c("span", [
                                                _vm._v(
                                                  _vm._s(note.name) +
                                                    " " +
                                                    _vm._s(note.surname)
                                                )
                                              ]),
                                              _c("span", [
                                                _vm._v(_vm._s(note.CreatedAt))
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass: "note-footer",
                                              staticStyle: {
                                                "justify-content": "flex-end",
                                                "margin-top": "5px"
                                              }
                                            },
                                            [
                                              _vm.userInfo.role >= 30
                                                ? _c(
                                                    "button",
                                                    {
                                                      staticClass:
                                                        "smallTextBtn secondaryBtn",
                                                      staticStyle: {
                                                        "font-size": "12px",
                                                        cursor: "pointer"
                                                      },
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          return _vm.deleteNote(
                                                            note.NoteID
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [_vm._v("Delete")]
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _vm.userInfo.role >= 30
                                                ? _c(
                                                    "button",
                                                    {
                                                      staticClass:
                                                        "smallTextBtn secondaryBtn",
                                                      staticStyle: {
                                                        "font-size": "12px",
                                                        cursor: "pointer"
                                                      },
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          return _vm.openNote(
                                                            note
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [_vm._v("Edit")]
                                                  )
                                                : _vm._e()
                                            ]
                                          )
                                        ]
                                      )
                                    }),
                                    0
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              (_vm.prescription.Notes == "" ||
                                _vm.prescription.Notes == null) &&
                              _vm.notes.other.length == 0
                                ? _c("ul", [
                                    _c("li", [_vm._v("No order notes found")])
                                  ])
                                : _vm._e()
                            ])
                          : _vm._e()
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "medicineQuestionnaire",
                          class: { fullscreen: _vm.expandedQuestionnaire }
                        },
                        [
                          _c("h2", [
                            _vm._v(
                              "\n                        Questionnaire\n                        "
                            ),
                            _vm.questionnaire.length != 0
                              ? _c(
                                  "span",
                                  {
                                    staticClass: "language-toggle",
                                    on: {
                                      click: function($event) {
                                        return _vm.translateQuestionnaire()
                                      }
                                    }
                                  },
                                  [_vm._v("(" + _vm._s(_vm.languageText) + ")")]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _c("i", {
                              staticClass: "fa",
                              class: [
                                _vm.expandedQuestionnaire
                                  ? "fa-compress"
                                  : "fa-expand"
                              ],
                              attrs: { "aria-hidden": "true" },
                              on: {
                                click: function($event) {
                                  _vm.expandedQuestionnaire = !_vm.expandedQuestionnaire
                                }
                              }
                            })
                          ]),
                          _vm._v(" "),
                          !_vm.questionnaireLoading
                            ? _c(
                                "table",
                                {
                                  attrs: { cellpadding: "0", cellspacing: "0" }
                                },
                                _vm._l(_vm.questionnaire, function(value, key) {
                                  return _vm.questionnaire.length != 0 &&
                                    !_vm.loading
                                    ? _c("tr", { key: key }, [
                                        _c("td", [
                                          _vm._v(_vm._s(value.Question))
                                        ]),
                                        _vm._v(" "),
                                        _c("td", [_vm._v(_vm._s(value.Answer))])
                                      ])
                                    : _vm._e()
                                }),
                                0
                              )
                            : _c(
                                "div",
                                { staticClass: "dotloader loader-relative" },
                                [_vm._v("Loading...")]
                              ),
                          _vm._v(" "),
                          _vm.questionnaire.length == 0 && !_vm.loading
                            ? _c("div", [
                                _vm._v(
                                  "\n                        This prescription does not have a questionnaire.\n                    "
                                )
                              ])
                            : _vm._e()
                        ]
                      )
                    ])
                  ]
                ),
                _vm._v(" "),
                _c("section", { staticClass: "card" }, [
                  _c(
                    "div",
                    {
                      staticClass: "card-header",
                      staticStyle: { background: "#eff8f830" }
                    },
                    [
                      _c("h3", { staticStyle: { "text-align": "center" } }, [
                        _vm._v(
                          "HR HEALTHCARE Pharmacy, Unit 18, Waters Meeting, Britannia Way, Bolton BL2 2HH, United Kingdom"
                        )
                      ])
                    ]
                  )
                ])
              ],
              1
            )
          : _vm._e()
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d3b71f08", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/pages/DiffTableAddress.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/DiffTableAddress.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-b53a8866\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/DiffTableAddress.vue")
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
Component.options.__file = "resources/assets/js/components/pages/DiffTableAddress.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b53a8866", Component.options)
  } else {
    hotAPI.reload("data-v-b53a8866", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/pages/Prescription.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/Prescription.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-d3b71f08\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/Prescription.vue")
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
Component.options.__file = "resources/assets/js/components/pages/Prescription.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d3b71f08", Component.options)
  } else {
    hotAPI.reload("data-v-d3b71f08", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/pages/PrescriptionAlternate.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/PrescriptionAlternate.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4d400ee4\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/PrescriptionAlternate.vue")
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
Component.options.__file = "resources/assets/js/components/pages/PrescriptionAlternate.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4d400ee4", Component.options)
  } else {
    hotAPI.reload("data-v-4d400ee4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/mixins/constants/doctorTypes.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {
            doctorTypes: {
                0: 'Not Set',
                1: 'GMC',
                2: 'EU',
                3: 'GPHC',
                4: 'Test'
            }
        };
    }
};

/***/ }),

/***/ "./resources/assets/js/mixins/constants/prescriptionColumns.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {
            alias: {
                //PRESCRIPTION
                Repeats: 'Commercial Value',
                Name: 'Name',
                Surname: 'Surname',
                DAddress1: 'Delivery Address Line 1',
                DAddress2: 'Delivery Address Line 2',
                DAddress3: 'Delivery Town',
                DAddress4: 'Delivery Province',
                DPostcode: 'Delivery Postcode',
                DCountryCode: 'Delivery Country',
                Address1: 'Home Address Line 1',
                Address2: 'Home Address Line 2',
                Address3: 'Home Town',
                Address4: 'Home Province',
                Postcode: 'Home Postcode',
                CountryCode: 'Home Country',
                Telephone: 'Telephone',
                Email: 'Email',
                Notes: 'Notes',
                TokenID: 'COD Amount',
                TrackingCode: 'Tracking Code',
                DeliveryID: 'Delivery Company',
                //UPS
                APNotificationLanguage: 'UPS Notification Language',
                APNotificationValue: 'UPS Notification Email'
            }
        };
    }
};

/***/ })

});