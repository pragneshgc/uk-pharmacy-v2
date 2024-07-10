webpackJsonp([29],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/Dashboard.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _errors = __webpack_require__("./resources/assets/js/mixins/errors.js");

var _errors2 = _interopRequireDefault(_errors);

var _csv = __webpack_require__("./resources/assets/js/mixins/csv.js");

var _csv2 = _interopRequireDefault(_csv);

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        'Modal': function Modal() {
            return __webpack_require__.e/* import() */(1/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/js/components/Modal.vue"));
        }
    },
    mixins: [_errors2.default, _csv2.default],
    data: function data() {
        return {
            statistics: {},
            /* For orders */
            pendingPrescriberCount: 0,
            pendingPharmacyOrdersCount: 0,
            pendingPharmacyOrders: [],
            onHoldOrders: [],
            pendingOrderAlerts: [],
            loadingPendingPharmacy: false,
            /* For orders */
            loaded: false,
            orderFilter: this.$route.query.orderFilter || localStorage.getItem('dashboard.orderFilter') ? localStorage.getItem('dashboard.orderFilter') : userInfo.role == 20 || userInfo.role == 19 ? 'approved' : 'new',
            checkboxStatus: false,
            duplicateReference: 0,
            userInfo: userInfo,
            mapping: {
                safety: 'safety check',
                new: 'new',
                approved: 'approved',
                dpd: 'dpd',
                ups: 'ups',
                dhl: 'dhl',
                rml: 'rml',
                awaiting: 'awaiting shipped',
                shipped: 'shipped',
                onhold: 'onhold',
                queried: 'queried',
                rejected: 'rejected',
                cancelled: 'cancelled',
                return: 'returned'
            },
            roleVisibility: {
                '60': [],
                '50': [],
                '40': [],
                '35': [],
                '30': [],
                '29': [],
                '20': [],
                '19': [],
                '10': [],
                '5': []
            },
            countTimer: null
        };
    },
    computed: {
        checked: function checked() {
            return this.$store.state.checked;
        },

        // mainChecked(){
        //     return this.checked.length == 0 ? false : true;
        // },
        visible: function visible() {
            return this.$store.state.visible;
        },

        //check if the current checked boxes match the total check boxes
        match: function match() {
            var _this = this;

            if (this.checked.length == 0) {
                return false;
            } else {
                return this.visible.every(function (value) {
                    return _this.checked.indexOf(value) >= 0;
                });
            }
            // return _.isEmpty(_.xor(this.visible, this.checked))
        },

        //check if some of the checked boxes on current page match the total checked boxes
        currentChecked: function currentChecked() {
            var _this2 = this;

            if (this.checked.length == 0) {
                return false;
            } else {
                return this.checked.some(function (value) {
                    return _this2.visible.indexOf(value) >= 0;
                });
            }
        },
        trayLength: function trayLength() {
            return this.$store.state.tray.length;
        }
    },
    mounted: function mounted() {
        var _this3 = this;

        this.getStatistics();
        this.getCount();
        this.getOrderAlerts();
        this.getOnHoldOrders();

        // this.countTimer = setInterval(() => {
        //     this.getCount();
        // }, 60000);

        this.$root.$on('changefilter', function (e) {
            _this3.orderFilter = e.filter;
        });
        this.$root.$on('orderupdate', this.getOrderAlerts);
    },
    destroyed: function destroyed() {
        this.$root.$off('changefilter');
        this.$root.$off('orderupdate');
        clearInterval(this.countTimer);
    },

    methods: {
        getStatistics: function getStatistics() {
            var _this4 = this;

            axios.get('/statistics').then(function (response) {
                _this4.statistics = response.data.data;
                _this4.statistics.total = response.data.data.total;
                _this4.loaded = true;
            }).catch(function (error) {
                _this4.postError(error.response.data.message);
            });
        },
        getCount: function getCount() {
            var _this5 = this;

            var refresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.loadingPendingPharmacy = true;
            if (refresh) {
                this.getOrderAlerts();
                this.checkOrders(function () {
                    _this5.getCount();
                    _this5.getOnHoldOrders();
                    _this5.$root.$emit('alertupdate');
                });
            } else {
                axios.get('/api/check-orders/results').then(function (response) {
                    _this5.pendingPrescriberCount = response.data.data.pendingPrescriberCount;
                    _this5.pendingPharmacyOrders = response.data.data.pendingPharmacyOrders;
                    _this5.pendingPharmacyOrdersCount = response.data.data.pendingPharmacyOrdersCount;
                }).catch(function (error) {
                    _this5.postError(error.response.data.message);
                }).finally(function () {
                    _this5.loadingPendingPharmacy = false;
                    _this5.$root.$emit('alertupdate');
                });
            }
        },
        getOrderAlerts: function getOrderAlerts() {
            var _this6 = this;

            axios.get('/note/pending-alerts').then(function (response) {
                _this6.pendingOrderAlerts = response.data.data;
            }).catch(function (error) {
                _this6.postError(error.response.data.message);
            });
        },
        getOnHoldOrders: function getOnHoldOrders() {
            var _this7 = this;

            axios.get('/orders/on-hold-postponed').then(function (response) {
                _this7.onHoldOrders = response.data.data;
            }).catch(function (error) {
                _this7.postError(error.response.data.message);
            });
        },
        deleteNote: function deleteNote(id) {
            var _this8 = this;

            this.$swal({
                title: 'Delete Alert',
                html: 'Are you sure you want to delete this alert?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ff5151',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then(function (result) {
                if (result.value) {
                    axios.post('/note/' + id + '/delete').then(function (response) {
                        _this8.postSuccess(response.data.message);
                    }).catch(function (error) {
                        _this8.postError(error.response.data.message);
                    }).finally(function () {
                        _this8.getOrderAlerts();
                        _this8.$root.$emit('alertupdate');
                    });
                }
            });
        },
        editNote: function editNote() {
            var note = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.$root.$emit('modal.open', 'note', note);
        },
        getPendingCSV: function getPendingCSV() {
            var pending = [];

            this.pendingPharmacyOrders.forEach(function (item) {
                pending.push({ ReferenceNumber: item.Value });
            });

            this.exportCSV(pending, 'Pending Pharmacy Orders ' + new Date().toLocaleString());
        },
        checkOrders: function checkOrders() {
            var _this9 = this;

            var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            axios.get('/api/check-orders').then(function (response) {
                if (callback) {
                    callback();
                }
            }).catch(function (error) {
                _this9.postError(error.response.data.data);
                _this9.loadingPendingPharmacy = false;
            });
        },

        // commented out untill mechanics confirmed
        redirectCallback: function redirectCallback() {
            var _this10 = this;

            if (this.orderFilter == 'new' && this.trayLength < 1 && (this.userInfo.role == 30 || this.userInfo.role == 35 || this.userInfo.role == 29)) {
                //disable for admins
                axios.post('/tray/new/insert/20').then(function (response) {
                    _this10.postSuccess(response.data.message);
                    _this10.$root.$emit('tray.refresh');
                }).catch(function (error) {
                    _this10.postError(error.response.data.message);
                });
            }
        },
        changeOrder: function changeOrder(filter) {
            if (filter == 'queried') {
                localStorage.setItem('dashboard.orderFilter', filter);
            } else {
                localStorage.setItem('dashboard.orderFilter', this.userInfo.role == 20 || this.userInfo.role == 19 ? 'approved' : 'new');
            }
            this.orderFilter = filter;
            this.getStatistics(); //make this a bit smarter
            this.getCount();
        },
        addToTray: function addToTray() {
            var _this11 = this;

            axios.post('/tray', { PrescriptionID: this.checked }).then(function (response) {
                _this11.postSuccess(response.data.message);
                _this11.$store.commit('replaceChecked', []);
                _this11.$root.$emit('tray.refresh');
                _this11.$root.$emit('table.refresh');
            }).catch(function (error) {
                _this11.postError(error.response.data.message);
            });
        },
        safe: function safe(id) {
            var _this12 = this;

            axios.post('/order-edit/' + id + '/status', { status: 1 }).then(function (response) {
                _this12.$root.$emit('table.refresh');
            }).catch(function (error) {
                _this12.$root.$emit('table.refresh');
                _this12.postError(error.response.data.message);
            }).finally(function () {
                _this12.getStatistics();
            });
        },
        checkAll: function checkAll() {
            var _this13 = this;

            var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            axios.get('/orders/ids?f=' + this.orderFilter + '&intray=false&limit=' + limit).then(function (response) {
                _this13.$store.commit('replaceChecked', response.data.data);
            }).catch(function (error) {
                _this13.postError(error.response.data.message);
            });
        },
        checkByProperty: function checkByProperty(type, property) {
            var _this14 = this;

            axios.get('/orders/ids?f=' + this.orderFilter + '&intray=false&type=' + type + '&property=' + property).then(function (response) {
                _this14.$store.commit('replaceChecked', response.data.data);
            }).catch(function (error) {
                _this14.postError(error.response.data.message);
            });
        },
        checkAllVisible: function checkAllVisible() {
            if (this.currentChecked && !this.match) {
                this.$root.$emit('table.uncheck.all');
            } else if (this.currentChecked && this.match) {
                this.$root.$emit('table.uncheck.all');
            } else {
                this.$root.$emit('table.check.all');
            }
        },
        clearChecked: function clearChecked() {
            this.checkboxStatus = false;
            this.$store.commit('replaceChecked', []);
        },
        viewOrder: function viewOrder(id) {
            this.$router.push({ name: 'prescription', params: { id: id } });
        }
    }
};

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3b8700a2\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/Dashboard.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "content" }, [
      _c("section", [
        _c("div", { staticClass: "prescriptionStats flex-center" }, [
          _c("div", { staticClass: "title flex-align-center" }, [
            _vm._v("Order Statistics")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "list" }, [
            _vm.loaded
              ? _c(
                  "ul",
                  [
                    _vm._l(_vm.statistics.statistics, function(value, key) {
                      return !_vm.roleVisibility[_vm.userInfo.role].includes(
                        key
                      )
                        ? _c(
                            "li",
                            {
                              staticClass: "list-item-background",
                              class: { active: key == _vm.orderFilter },
                              on: {
                                click: function($event) {
                                  return _vm.changeOrder(key)
                                }
                              }
                            },
                            [
                              _c("span", [_vm._v(_vm._s(_vm.mapping[key]))]),
                              _vm._v(
                                _vm._s(value) + "\n                            "
                              )
                            ]
                          )
                        : _vm._e()
                    }),
                    _vm._v(" "),
                    !_vm.roleVisibility[_vm.userInfo.role].includes(
                      "ordercount"
                    )
                      ? _c(
                          "li",
                          {
                            staticClass: "list-item-background",
                            class: [
                              "ordercount" == _vm.orderFilter ? "active" : "",
                              _vm.pendingPharmacyOrdersCount > 0
                                ? "blink_me"
                                : ""
                            ],
                            on: {
                              click: function($event) {
                                _vm.orderFilter = "ordercount"
                              }
                            }
                          },
                          [
                            _c("span", [_vm._v("Alert")]),
                            _vm._v(
                              _vm._s(_vm.pendingPharmacyOrdersCount) +
                                "\n                        "
                            )
                          ]
                        )
                      : _vm._e()
                  ],
                  2
                )
              : _c("ul", { staticStyle: { overflow: "hidden" } }, [_vm._m(0)])
          ]),
          _vm._v(" "),
          _vm.loaded
            ? _c("div", { staticClass: "total flex-align-center clickable" }, [
                _c("span", [_vm._v("Total")]),
                _vm._v(
                  "\n                    " +
                    _vm._s(_vm.statistics.total) +
                    "\n                    "
                ),
                _c(
                  "a",
                  {
                    staticClass: "btn smallTextBtn secondaryBtn",
                    attrs: {
                      href:
                        '/orders/csv?page=1&limit=1000&f={"dashboard": true}&strict=true',
                      title: "Download dashboard orders"
                    }
                  },
                  [_vm._v("Download")]
                )
              ])
            : _vm._e()
        ])
      ]),
      _vm._v(" "),
      _c("section", [
        _c(
          "div",
          { staticClass: "orderSearch" },
          [
            _vm.orderFilter != "ordercount"
              ? _c("data-table", {
                  attrs: {
                    "data-url": "/orders",
                    "column-class": "col-lg-12",
                    "table-title": "InTray",
                    "redirect-name": "prescription",
                    "redirect-id": "PrescriptionID",
                    filters: _vm.orderFilter,
                    "redirect-callback": _vm.redirectCallback,
                    "checkbox-visible":
                      _vm.orderFilter == "new" &&
                      [29, 30, 35].includes(
                        _vm.userInfo.role
                      ) /* || (orderFilter == 'approved' && userInfo.role == 20)*/,
                    "hidden-columns": [
                      "checked",
                      "disabled",
                      "UPSAccessPointAddress"
                    ],
                    "not-orderable": ["Products"],
                    "column-map": {
                      PrescriptionID: "ID",
                      DeliveryID: "Courier",
                      CompanyName: "Client",
                      ReferenceNumber: "Ref"
                    }
                  },
                  scopedSlots: _vm._u(
                    [
                      _vm.orderFilter == "new" &&
                      [29, 30, 35].includes(
                        _vm.userInfo.role
                      ) /* || (orderFilter == 'approved' && userInfo.role == 20)*/
                        ? {
                            key: "filters",
                            fn: function() {
                              return [
                                _c("div", { staticClass: "row check-row" }, [
                                  _c("div", { staticClass: "button-group" }, [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "btn btnSize02 secondaryBtn",
                                        on: {
                                          click: function($event) {
                                            return _vm.checkAllVisible()
                                          }
                                        }
                                      },
                                      [
                                        _c("input", {
                                          class: {
                                            unchecked:
                                              !_vm.match && _vm.currentChecked
                                          },
                                          attrs: {
                                            type: "checkbox",
                                            name: "checkall"
                                          },
                                          domProps: {
                                            checked:
                                              _vm.match || _vm.currentChecked
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("label", {
                                          attrs: { for: "checkall" }
                                        })
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "btn btnSize02 secondaryBtn dropdown"
                                      },
                                      [
                                        _c("i", {
                                          staticClass: "fa fa-caret-down",
                                          attrs: { "aria-hidden": "true" }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "ul",
                                          { staticClass: "dropdown-menu" },
                                          [
                                            _c(
                                              "li",
                                              {
                                                staticClass:
                                                  "dropdown-menu-item",
                                                on: {
                                                  click: function($event) {
                                                    return _vm.checkAll()
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                            Check All In " +
                                                    _vm._s(_vm.orderFilter) +
                                                    "\n                                        "
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "li",
                                              {
                                                staticClass:
                                                  "dropdown-menu-item",
                                                on: {
                                                  click: function($event) {
                                                    return _vm.checkAll(10)
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                            Check 10\n                                        "
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "li",
                                              {
                                                staticClass:
                                                  "dropdown-menu-item",
                                                on: {
                                                  click: function($event) {
                                                    return _vm.checkAll(20)
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                            Check 20\n                                        "
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "li",
                                              {
                                                staticClass:
                                                  "dropdown-menu-item",
                                                on: {
                                                  click: function($event) {
                                                    return _vm.checkAll(50)
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                            Check 50\n                                        "
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "li",
                                              {
                                                staticClass:
                                                  "dropdown-menu-item",
                                                on: {
                                                  click: function($event) {
                                                    return _vm.checkAll(100)
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                            Check 100\n                                        "
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c("li", [_c("hr")]),
                                            _vm._v(" "),
                                            _c(
                                              "li",
                                              {
                                                staticClass:
                                                  "dropdown-menu-item",
                                                on: {
                                                  click: function($event) {
                                                    return _vm.checkByProperty(
                                                      "delivery",
                                                      4
                                                    )
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                            Check DPD\n                                        "
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "li",
                                              {
                                                staticClass:
                                                  "dropdown-menu-item",
                                                on: {
                                                  click: function($event) {
                                                    return _vm.checkByProperty(
                                                      "delivery",
                                                      5
                                                    )
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                            Check RM\n                                        "
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c("li", [_c("hr")]),
                                            _vm._v(" "),
                                            _c(
                                              "li",
                                              {
                                                staticClass:
                                                  "dropdown-menu-item",
                                                on: {
                                                  click: function($event) {
                                                    return _vm.checkByProperty(
                                                      "client",
                                                      50
                                                    )
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                            Check Treated\n                                        "
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "li",
                                              {
                                                staticClass:
                                                  "dropdown-menu-item",
                                                on: {
                                                  click: function($event) {
                                                    return _vm.checkByProperty(
                                                      "client",
                                                      51
                                                    )
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                            Check EveAdam\n                                        "
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "li",
                                              {
                                                staticClass:
                                                  "dropdown-menu-item",
                                                on: {
                                                  click: function($event) {
                                                    return _vm.checkByProperty(
                                                      "client",
                                                      49
                                                    )
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                            Check Apport Sarl\n                                        "
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c("li", [_c("hr")]),
                                            _vm._v(" "),
                                            _c(
                                              "li",
                                              {
                                                staticClass:
                                                  "dropdown-menu-item",
                                                on: {
                                                  click: function($event) {
                                                    return _vm.clearChecked()
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                            Clear checked\n                                        "
                                                )
                                              ]
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _vm.checked.length > 0
                                    ? _c(
                                        "div",
                                        { staticClass: "check-options" },
                                        [
                                          _c(
                                            "button",
                                            {
                                              staticClass:
                                                "btn btnSize02 secondaryBtn",
                                              on: {
                                                click: function($event) {
                                                  return _vm.addToTray()
                                                }
                                              }
                                            },
                                            [
                                              _vm.userInfo.role == 20 ||
                                              _vm.userInfo.role == 19
                                                ? _c("span", [
                                                    _vm._v("Take over")
                                                  ])
                                                : _c("span", [
                                                    _vm._v("Add To Tray")
                                                  ]),
                                              _vm._v(
                                                " (" +
                                                  _vm._s(_vm.checked.length) +
                                                  " orders)\n                                "
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    : _vm._e()
                                ])
                              ]
                            },
                            proxy: true
                          }
                        : null,
                      _vm.orderFilter == "safety" && _vm.userInfo.role == 40
                        ? {
                            key: "tools",
                            fn: function(slotProps) {
                              return [
                                _c(
                                  "a",
                                  {
                                    staticClass:
                                      "btn btn-primary waves-effect table-icon clickable",
                                    on: {
                                      click: function($event) {
                                        return _vm.safe(slotProps.id)
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                            Safe   \n                        "
                                    )
                                  ]
                                )
                              ]
                            }
                          }
                        : null
                    ],
                    null,
                    true
                  )
                })
              : _vm.orderFilter == "ordercount"
              ? _c("div", { staticClass: "card prescription-pool" }, [
                  _c("div", { staticClass: "card-body order-id-list" }, [
                    _c(
                      "ul",
                      [
                        _c(
                          "li",
                          {
                            staticClass: "pool-list-title pb-10",
                            staticStyle: {
                              display: "flex",
                              "justify-content": "space-between",
                              "align-items": "center"
                            }
                          },
                          [
                            _c("b", [
                              _vm._v("MISSING PHARMACY ORDERS "),
                              _c(
                                "span",
                                {
                                  staticClass: "badge",
                                  class: [
                                    _vm.pendingPharmacyOrders.length > 0
                                      ? "red"
                                      : ""
                                  ]
                                },
                                [
                                  _vm._v(
                                    _vm._s(_vm.pendingPharmacyOrders.length)
                                  )
                                ]
                              )
                            ]),
                            _vm._v(" "),
                            _c("div", [
                              _c(
                                "button",
                                {
                                  staticClass: "btn btn-primary table-icon",
                                  attrs: {
                                    title:
                                      "Download CSV with a list of reference numbers"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.getPendingCSV()
                                    }
                                  }
                                },
                                [
                                  _c("i", {
                                    staticClass: "fa fa-file",
                                    attrs: { "aria-hidden": "true" }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "button",
                                {
                                  staticClass: "btn btn-primary table-icon",
                                  attrs: {
                                    title:
                                      "Refresh the pending pharmacy orders list manually"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.getCount(true)
                                    }
                                  }
                                },
                                [
                                  _c("i", {
                                    staticClass: "fa fa-refresh",
                                    class: [
                                      _vm.loadingPendingPharmacy
                                        ? "spin-animation"
                                        : ""
                                    ]
                                  })
                                ]
                              )
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _vm.pendingPharmacyOrders.length > 0
                          ? _c("li", { staticClass: "pool-list-layout" }, [
                              _c("div", { staticClass: "pool-column" }, [
                                _c("b", [_vm._v("Reference Number")])
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _c("b", [_vm._v("Client")])
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _c("b", [_vm._v("Status")])
                              ])
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm._l(_vm.pendingPharmacyOrders, function(order) {
                          return _c(
                            "li",
                            {
                              key: order.SyncOrderID,
                              staticClass: "pool-list-layout"
                            },
                            [
                              _c("div", { staticClass: "pool-column" }, [
                                _vm._v(_vm._s(order.Value))
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _c("span", [_vm._v(_vm._s(order.CompanyName))])
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _c("b", [_vm._v("Pending")])
                              ])
                            ]
                          )
                        })
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _vm.pendingPharmacyOrdersCount +
                      _vm.pendingPrescriberCount ==
                    0
                      ? _c("ul", [
                          _c("li", { staticClass: "pool-list-title" }, [
                            _c("b", [
                              _vm._v("NO PENDING PHARMACY ORDERS FOUND")
                            ])
                          ])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c(
                      "ul",
                      { staticClass: "mt-10" },
                      [
                        _c(
                          "li",
                          {
                            staticClass: "pool-list-title pb-10",
                            staticStyle: {
                              display: "flex",
                              "justify-content": "space-between",
                              "align-items": "center"
                            }
                          },
                          [
                            _c("b", [
                              _vm._v("POSTPONED SHIPPING ORDERS PENDING "),
                              _c(
                                "span",
                                {
                                  staticClass: "badge",
                                  class: [
                                    _vm.onHoldOrders.length > 0 ? "red" : ""
                                  ]
                                },
                                [_vm._v(_vm._s(_vm.onHoldOrders.length))]
                              )
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _vm.onHoldOrders.length > 0
                          ? _c("li", { staticClass: "pool-list-layout" }, [
                              _c("div", { staticClass: "pool-column" }, [
                                _c("b", [_vm._v("ID")])
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _c("b", [_vm._v("Reference Number")])
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _c("b", [_vm._v("Postponed At")])
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _c("b", [_vm._v("Postponed By")])
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _vm._v("Tools")
                              ])
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm._l(_vm.onHoldOrders, function(order) {
                          return _c(
                            "li",
                            {
                              key: order.PrescriptionID,
                              staticClass: "pool-list-layout"
                            },
                            [
                              _c("div", { staticClass: "pool-column" }, [
                                _c("b", [_vm._v(_vm._s(order.PrescriptionID))])
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _c("div", {
                                  domProps: {
                                    innerHTML: _vm._s(order.ReferenceNumber)
                                  }
                                })
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _vm._v(_vm._s(order.PostponedAt))
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _vm._v(_vm._s(order.PostponedBy))
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _c(
                                  "a",
                                  {
                                    staticClass: "btn btn-primary table-icon",
                                    attrs: {
                                      title: "View Order",
                                      target: "_blank",
                                      href:
                                        "#/prescription/" + order.PrescriptionID
                                    }
                                  },
                                  [
                                    _c("i", {
                                      staticClass: "fa fa-search-plus",
                                      attrs: { "aria-hidden": "true" }
                                    })
                                  ]
                                )
                              ])
                            ]
                          )
                        })
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c(
                      "ul",
                      { staticClass: "mt-10" },
                      [
                        _c(
                          "li",
                          {
                            staticClass: "pool-list-title pb-10",
                            staticStyle: {
                              display: "flex",
                              "justify-content": "space-between",
                              "align-items": "center"
                            }
                          },
                          [
                            _c("b", [
                              _vm._v("PENDING ORDER ALERTS "),
                              _c(
                                "span",
                                {
                                  staticClass: "badge",
                                  class: [
                                    _vm.pendingOrderAlerts.length > 0
                                      ? "red"
                                      : ""
                                  ]
                                },
                                [_vm._v(_vm._s(_vm.pendingOrderAlerts.length))]
                              )
                            ]),
                            _vm._v(" "),
                            _c("div", [
                              _c(
                                "button",
                                {
                                  staticClass: "btn btn-primary table-icon",
                                  attrs: {
                                    title:
                                      "Create an alert for a prescription that is not yet imported on ESA"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.$root.$emit(
                                        "modal.open",
                                        "note",
                                        "preimport"
                                      )
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                                        Create Alert\n                                    "
                                  )
                                ]
                              )
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _vm.pendingOrderAlerts.length > 0
                          ? _c("li", { staticClass: "pool-list-layout" }, [
                              _c("div", { staticClass: "pool-column" }, [
                                _c("b", [_vm._v("Reference Number")])
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _c("b", [_vm._v("Note")])
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _c("b", [_vm._v("Created By")])
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _c("b", [_vm._v("Created At")])
                              ]),
                              _vm._v(" "),
                              _vm.userInfo.role >= 40
                                ? _c("div", { staticClass: "pool-column" }, [
                                    _vm._v("Tools")
                                  ])
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm._l(_vm.pendingOrderAlerts, function(alert) {
                          return _c(
                            "li",
                            {
                              key: alert.NoteID,
                              staticClass: "pool-list-layout"
                            },
                            [
                              _c("div", { staticClass: "pool-column" }, [
                                alert.Subscription
                                  ? _c("div", [
                                      _c("small", [
                                        _vm._v("Subscription ID: "),
                                        _c("b", [
                                          _vm._v(_vm._s(alert.Subscription))
                                        ])
                                      ]),
                                      _vm._v(" "),
                                      _c("br"),
                                      _vm._v(" "),
                                      _c("small", [
                                        _vm._v("Reference number not set")
                                      ])
                                    ])
                                  : _c("b", [
                                      _vm._v(_vm._s(alert.ReferenceNumber))
                                    ])
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _c("div", {
                                  domProps: { innerHTML: _vm._s(alert.Note) }
                                })
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _vm._v(
                                  _vm._s(alert.name) +
                                    " " +
                                    _vm._s(alert.surname)
                                )
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "pool-column" }, [
                                _vm._v(_vm._s(alert.CreatedAt))
                              ]),
                              _vm._v(" "),
                              _vm.userInfo.role >= 40
                                ? _c("div", { staticClass: "pool-column" }, [
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn btn-primary table-icon",
                                        attrs: { title: "Edit alert" },
                                        on: {
                                          click: function($event) {
                                            return _vm.editNote(alert)
                                          }
                                        }
                                      },
                                      [
                                        _c("i", {
                                          staticClass: "fa fa-edit",
                                          attrs: { "aria-hidden": "true" }
                                        })
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn btn-primary table-icon",
                                        attrs: { title: "Delete this alert" },
                                        on: {
                                          click: function($event) {
                                            return _vm.deleteNote(alert.NoteID)
                                          }
                                        }
                                      },
                                      [
                                        _c("i", {
                                          staticClass: "fa fa-trash",
                                          attrs: { "aria-hidden": "true" }
                                        })
                                      ]
                                    )
                                  ])
                                : _vm._e()
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
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", [
      _c("div", { staticClass: "loader loader-relative" }, [
        _vm._v("Loading...")
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3b8700a2", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/pages/Dashboard.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/Dashboard.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3b8700a2\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/Dashboard.vue")
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
Component.options.__file = "resources/assets/js/components/pages/Dashboard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3b8700a2", Component.options)
  } else {
    hotAPI.reload("data-v-3b8700a2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});