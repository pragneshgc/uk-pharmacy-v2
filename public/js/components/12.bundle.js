webpackJsonp([12,1],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/Modal.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    props: ['modalName', 'modalClass'],
    data: function data() {
        return {
            show: {
                modal: false
            },
            loading: true
        };
    },
    computed: {},
    mounted: function mounted() {
        var _this = this;

        this.$root.$on('modal.open', function (name) {
            if (name == _this.modalName) {
                _this.show.modal = true;
            }
        });

        this.$root.$on('modal.close', function (name) {
            if (name == _this.modalName) {
                _this.show.modal = false;
            }
        });

        this.$root.$on('modal.close.all', function () {
            _this.show.modal = false;
        });
    },

    methods: {
        close: function close() {
            this.show.modal = false;
        },
        save: function save() {
            this.show.modal = false;
        }
    }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/RedeliveryModal.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _errors = __webpack_require__("./resources/assets/js/mixins/errors.js");

var _errors2 = _interopRequireDefault(_errors);

var _Modal = __webpack_require__("./resources/assets/js/components/Modal.vue");

var _Modal2 = _interopRequireDefault(_Modal);

var _DiffTableAddress = __webpack_require__("./resources/assets/js/components/pages/DiffTableAddress.vue");

var _DiffTableAddress2 = _interopRequireDefault(_DiffTableAddress);

var _prescriptionColumns = __webpack_require__("./resources/assets/js/mixins/constants/prescriptionColumns.js");

var _prescriptionColumns2 = _interopRequireDefault(_prescriptionColumns);

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

exports.default = {
    extends: _Modal2.default,
    props: ['orderID'],
    mixins: [_errors2.default, _prescriptionColumns2.default],
    components: { DiffTableAddress: _DiffTableAddress2.default },
    data: function data() {
        return {
            selected: false,
            loading: false,
            watch: false,
            countries: [],
            companies: [],
            details: {
                order: {},
                oldOrder: {},
                ups: {},
                oldUps: {},
                details: {}
            },
            saveConfirmation: false,
            confirmationChanges: {},
            confirmationChangesUPS: {},
            confirmationOld: {},
            confirmationOldUPS: {},
            disabledFields: []
        };
    },
    mounted: function mounted() {},

    computed: {
        columnDelivery: function columnDelivery() {
            var columns = ['DAddress1', 'DAddress2', 'DAddress3', 'DAddress4', 'DPostcode', 'DCountryCode', 'DeliveryID'];

            return columns;
        }
    },
    watch: {
        'details.order.DCountryCode': function detailsOrderDCountryCode() {
            if (this.watch) {
                this.getDeliveryCompany();
            }
        },
        'details.order.DeliveryID': function detailsOrderDeliveryID() {
            if (this.watch) {
                this.getPostcodeFormatting();
            }
        }
    },
    methods: {
        getOrderDetails: function getOrderDetails() {
            var _this = this;

            var newAddress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.watch = false;

            axios.get('/order-edit/' + this.orderID).then(function (response) {
                _this.details = response.data.data;

                if (newAddress) {
                    _this.details.order.DAddress1 = '';
                    _this.details.order.DAddress2 = '';
                    _this.details.order.DAddress3 = '';
                    _this.details.order.DAddress4 = '';
                    _this.details.order.DPostcode = '';
                }

                _this.loading = false;
            }).catch(function (error) {
                _this.postError(error.response.data.message);
                _this.loading = false;
            }).finally(function () {
                _this.watch = true;
            });
        },
        close: function close() {
            this.saveConfirmation = false;
            this.confirmationChanges = {};
            this.confirmationOld = {};
            this.confirmationOld = {};
            this.confirmationOldUPS = {};
            this.details = { order: {}, oldOrder: {}, ups: {}, oldUps: {} }; //clean up after
            this.$emit('closeredelivery');
        },
        back: function back() {
            this.saveConfirmation = false;
            this.confirmationChanges = {};
            this.confirmationChangesUPS = {};
        },
        redelivery: function redelivery() {
            var _this2 = this;

            this.loading = true;
            axios.post('/order/' + this.orderID + '/redeliver').then(function (response) {
                _this2.postSuccess(response.data.message);
                _this2.show.modal = false;
                _this2.$root.$emit('orderupdate');
                _this2.close();
            }).catch(function (error) {
                _this2.postError(error.response.data.message);
            }).finally(function () {
                _this2.loading = false;
            });
        },
        selectAddressUpdate: function selectAddressUpdate() {
            this.selected = true;
            this.getCountries();
            this.getCompanies();
            this.getOrderDetails(true);
        },
        updateAddress: function updateAddress() {},
        getCountries: function getCountries() {
            var _this3 = this;

            axios.get('/countries').then(function (response) {
                _this3.countries = response.data.data;
            }).catch(function (error) {
                _this3.postError(error.response.data.message);
            });
        },
        getCompanies: function getCompanies() {
            var _this4 = this;

            axios.get('/delivery-companies').then(function (response) {
                _this4.companies = response.data.data;
            }).catch(function (error) {
                _this4.postError(error.response.data.message);
            });
        },
        validateAddress: function validateAddress() {
            var _this5 = this;

            var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.loadingValidation = true;

            axios.post('/api/validate-address/' + this.currentOrderID).then(function (response) {
                _this5.postSuccess(response.data.message);
                if (callback) {
                    callback();
                }
            }).catch(function (error) {
                _this5.postError(error.response.data.message);
            }).finally(function () {
                _this5.loadingValidation = false;
                _this5.search();
            });
        },
        getCounterColor: function getCounterColor(value, object) {
            if (object[value] != null && this.alias[value].value) {
                if (object[value].length > 0 && this.alias[value].combined && object[this.alias[value].combined] != null) {
                    if (object[value].length + object[this.alias[value].combined].length <= this.alias[value].value) {
                        return 'input-count-success';
                    } else {
                        return 'input-count-danger';
                    }
                } else if (object[value].length > 0 && object[value].length <= this.alias[value].value) {
                    return 'input-count-success';
                } else if (object[value].length > this.alias[value].value) {
                    return 'input-count-danger';
                }
            }

            return '';
        },
        getDeliveryCompany: function getDeliveryCompany() {
            var _this6 = this;

            axios.post('/order-edit/' + this.orderID + '/delivery-company', this.details.order).then(function (response) {
                var data = response.data.data;

                if (data.DeliveryID) {
                    _this6.details.order.DeliveryID = data.DeliveryID;
                }

                if (data.CountryCode) {
                    _this6.details.order.CountryCode = data.CountryCode;
                }

                _this6.getPostcodeFormatting();
                _this6.postSuccess('Delivery company updated');
            }).catch(function (error) {
                _this6.postError(error.response.data.message);
            });
        },
        getPostcodeFormatting: function getPostcodeFormatting() {
            var _this7 = this;

            if (this.details.order.DeliveryID == 10) {
                axios.post('/order-edit/' + this.orderID + '/postcode-formatting', this.details.order).then(function (response) {
                    var data = response.data.data;

                    if (data.Postcode) {
                        _this7.details.order.Postcode = data.Postcode;
                    }

                    if (data.DPostcode) {
                        _this7.details.order.DPostcode = data.DPostcode;
                    }
                }).catch(function (error) {
                    _this7.postError(error.response.data.message);
                });
            }
        },
        save: function save() {
            var _this8 = this;

            var validate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (this.saveConfirmation) {
                this.submit(validate);
            } else {
                var orderDetails = JSON.parse(JSON.stringify(this.details.order));
                delete orderDetails.ClientID;

                axios.post('/order-edit/check/' + this.orderID, { order: orderDetails, ups: this.details.ups }).then(function (response) {
                    if (Object.keys(response.data.data.changes).length > 0 || Object.keys(response.data.data.changesUPS).length) {
                        _this8.confirmationChanges = response.data.data.changes;
                        _this8.confirmationChangesUPS = response.data.data.changesUPS;
                        _this8.confirmationOld = response.data.data.old;
                        _this8.confirmationOldUPS = response.data.data.oldUPS;
                        _this8.saveConfirmation = true;
                    } else {
                        _this8.saveConfirmation = false;
                    }
                }).catch(function (error) {
                    _this8.saveConfirmation = false;
                    _this8.postError(error);
                });
            }
        },
        submit: function submit() {
            var _this9 = this;

            var validate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var orderDetails = JSON.parse(JSON.stringify(this.details.order));
            delete orderDetails.ClientID;

            this.loading = true;

            axios.post('/api/validate-address/' + this.orderID, { addressChange: orderDetails }).then(function (response) {
                if (response.data.success) {
                    _this9.postSuccess('Address Validated');
                    axios.post('/order-edit/' + _this9.orderID, { order: orderDetails, ups: _this9.details.ups }).then(function (response) {
                        _this9.postSuccess('Saved');
                        _this9.redelivery();
                    }).catch(function (error) {
                        _this9.postError(error);
                    }).finally(function () {
                        _this9.saveConfirmation = false;
                        _this9.loading = false;
                    });
                } else {
                    _this9.postError('Could not validate address');
                }
            }).catch(function (error) {
                _this9.postError(error);
                _this9.loading = false;
            });
        },

        isEqual: _.isEqual
    }
};

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6e8d36f4\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/Modal.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "fade" } }, [
    _vm.show.modal
      ? _c("div", { staticClass: "esa-modal" }, [
          _c("div", {
            staticClass: "backdrop",
            on: {
              click: function($event) {
                return _vm.close()
              }
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "modal", class: _vm.modalClass }, [
            _c("div", { staticClass: "modal-header" }, [_vm._t("header")], 2),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }, [_vm._t("body")], 2),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "modal-footer" },
              [
                _c(
                  "button",
                  {
                    staticClass: "btn btnSize01 secondaryBtn bigButton",
                    on: {
                      click: function($event) {
                        return _vm.close()
                      }
                    }
                  },
                  [_vm._v("Cancel")]
                ),
                _vm._v(" "),
                _vm._t("footer")
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "span",
              {
                staticClass: "close",
                on: {
                  click: function($event) {
                    return _vm.close()
                  }
                }
              },
              [_vm._v("X")]
            )
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6e8d36f4", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-ac124842\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/RedeliveryModal.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "fade" } }, [
    _c("div", { staticClass: "esa-modal" }, [
      _c("div", {
        staticClass: "backdrop",
        on: {
          click: function($event) {
            return _vm.close()
          }
        }
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "modal" },
        [
          _c("transition", { attrs: { name: "fade" } }, [
            _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.loading,
                    expression: "loading"
                  }
                ],
                staticClass: "loader"
              },
              [_vm._v("Loading...")]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-header" }, [
            _c("h3", [_vm._v("Redelivery")])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-body" }, [
            !_vm.selected
              ? _c(
                  "div",
                  {
                    staticClass: "redelivery-selection",
                    staticStyle: { width: "100%", "text-align": "center" }
                  },
                  [
                    _c("h3", { staticStyle: { "text-align": "center" } }, [
                      _vm._v("Please select the method of redelivery")
                    ]),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btnSize01 secondaryBtn",
                        on: {
                          click: function($event) {
                            return _vm.redelivery()
                          }
                        }
                      },
                      [_vm._v("Redelivery to Existing Address")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btnSize01 secondaryBtn",
                        on: {
                          click: function($event) {
                            return _vm.selectAddressUpdate()
                          }
                        }
                      },
                      [_vm._v("Redelivery to New Address")]
                    )
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.selected
              ? _c(
                  "div",
                  {
                    staticClass: "redelivery-selection",
                    staticStyle: { width: "100%", "align-self": "flex-start" }
                  },
                  [
                    _c("transition", { attrs: { name: "fade" } }, [
                      _vm.countries.length != 0 &&
                      _vm.companies.length != 0 &&
                      !_vm.loading &&
                      Object.keys(_vm.confirmationChanges).length == 0 &&
                      Object.keys(_vm.confirmationChangesUPS).length == 0
                        ? _c(
                            "form",
                            {
                              staticClass: "pxp-form address-form mb-20",
                              on: {
                                submit: function($event) {
                                  $event.preventDefault()
                                  return _vm.save.apply(null, arguments)
                                }
                              }
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass: "form-column",
                                  staticStyle: { width: "100%" }
                                },
                                [
                                  _c("h3", [_vm._v("Delivery Details")]),
                                  _vm._v(" "),
                                  _vm._l(_vm.details.order, function(
                                    key,
                                    value
                                  ) {
                                    return _vm.columnDelivery.includes(value)
                                      ? _c(
                                          "div",
                                          {
                                            key: value,
                                            staticClass:
                                              "form-group form-group-2"
                                          },
                                          [
                                            _c(
                                              "label",
                                              { attrs: { for: key } },
                                              [
                                                _vm._v(
                                                  _vm._s(_vm.alias[value].title)
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _vm.alias[value].value
                                              ? _c(
                                                  "label",
                                                  {
                                                    staticClass: "input-count",
                                                    class: _vm.getCounterColor(
                                                      value,
                                                      _vm.details.order
                                                    ),
                                                    attrs: { for: key }
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.details.order[value]
                                                          ? _vm.details.order[
                                                              value
                                                            ].length
                                                          : 0
                                                      ) +
                                                        "/" +
                                                        _vm._s(
                                                          _vm.alias[value].value
                                                        )
                                                    )
                                                  ]
                                                )
                                              : _vm._e(),
                                            _vm._v(" "),
                                            ![
                                              "JVM",
                                              "UPSAccessPointAddress",
                                              "CountryCode",
                                              "DCountryCode",
                                              "DeliveryID",
                                              "Notes"
                                            ].includes(value)
                                              ? _c("input", {
                                                  directives: [
                                                    {
                                                      name: "model",
                                                      rawName: "v-model",
                                                      value:
                                                        _vm.details.order[
                                                          value
                                                        ],
                                                      expression:
                                                        "details.order[value]"
                                                    }
                                                  ],
                                                  attrs: {
                                                    disabled: _vm.disabledFields.includes(
                                                      value
                                                    ),
                                                    name: key,
                                                    placeholder: ""
                                                  },
                                                  domProps: {
                                                    value:
                                                      _vm.details.order[value]
                                                  },
                                                  on: {
                                                    input: function($event) {
                                                      if (
                                                        $event.target.composing
                                                      ) {
                                                        return
                                                      }
                                                      _vm.$set(
                                                        _vm.details.order,
                                                        value,
                                                        $event.target.value
                                                      )
                                                    }
                                                  }
                                                })
                                              : [
                                                  "DCountryCode",
                                                  "CountryCode"
                                                ].includes(value)
                                              ? _c(
                                                  "select",
                                                  {
                                                    directives: [
                                                      {
                                                        name: "model",
                                                        rawName: "v-model",
                                                        value:
                                                          _vm.details.order[
                                                            value
                                                          ],
                                                        expression:
                                                          "details.order[value]"
                                                      }
                                                    ],
                                                    class: [
                                                      _vm.details.order[
                                                        value
                                                      ] &&
                                                      _vm.details.order[
                                                        value
                                                      ] != ""
                                                        ? "select-dropdown-active"
                                                        : ""
                                                    ],
                                                    on: {
                                                      change: function($event) {
                                                        var $$selectedVal = Array.prototype.filter
                                                          .call(
                                                            $event.target
                                                              .options,
                                                            function(o) {
                                                              return o.selected
                                                            }
                                                          )
                                                          .map(function(o) {
                                                            var val =
                                                              "_value" in o
                                                                ? o._value
                                                                : o.value
                                                            return val
                                                          })
                                                        _vm.$set(
                                                          _vm.details.order,
                                                          value,
                                                          $event.target.multiple
                                                            ? $$selectedVal
                                                            : $$selectedVal[0]
                                                        )
                                                      }
                                                    }
                                                  },
                                                  _vm._l(
                                                    _vm.countries,
                                                    function(country) {
                                                      return _c(
                                                        "option",
                                                        {
                                                          domProps: {
                                                            value:
                                                              country.CountryID
                                                          }
                                                        },
                                                        [
                                                          _vm._v(
                                                            _vm._s(country.Name)
                                                          )
                                                        ]
                                                      )
                                                    }
                                                  ),
                                                  0
                                                )
                                              : ["DeliveryID"].includes(value)
                                              ? _c(
                                                  "select",
                                                  {
                                                    directives: [
                                                      {
                                                        name: "model",
                                                        rawName: "v-model",
                                                        value:
                                                          _vm.details.order[
                                                            value
                                                          ],
                                                        expression:
                                                          "details.order[value]"
                                                      }
                                                    ],
                                                    class: [
                                                      _vm.details.order[
                                                        value
                                                      ] &&
                                                      _vm.details.order[
                                                        value
                                                      ] != ""
                                                        ? "select-dropdown-active"
                                                        : ""
                                                    ],
                                                    on: {
                                                      change: function($event) {
                                                        var $$selectedVal = Array.prototype.filter
                                                          .call(
                                                            $event.target
                                                              .options,
                                                            function(o) {
                                                              return o.selected
                                                            }
                                                          )
                                                          .map(function(o) {
                                                            var val =
                                                              "_value" in o
                                                                ? o._value
                                                                : o.value
                                                            return val
                                                          })
                                                        _vm.$set(
                                                          _vm.details.order,
                                                          value,
                                                          $event.target.multiple
                                                            ? $$selectedVal
                                                            : $$selectedVal[0]
                                                        )
                                                      }
                                                    }
                                                  },
                                                  _vm._l(
                                                    _vm.companies,
                                                    function(company) {
                                                      return _c(
                                                        "option",
                                                        {
                                                          domProps: {
                                                            value:
                                                              company.SettingID
                                                          }
                                                        },
                                                        [
                                                          _vm._v(
                                                            _vm._s(company.Name)
                                                          )
                                                        ]
                                                      )
                                                    }
                                                  ),
                                                  0
                                                )
                                              : _vm._e()
                                          ]
                                        )
                                      : _vm._e()
                                  })
                                ],
                                2
                              )
                            ]
                          )
                        : _vm._e()
                    ]),
                    _vm._v(" "),
                    _c("transition", { attrs: { name: "fade" } }, [
                      (Object.keys(_vm.confirmationChanges).length > 0 ||
                        Object.keys(_vm.confirmationChangesUPS).length > 0) &&
                      !_vm.loading
                        ? _c(
                            "div",
                            {
                              staticClass: "pxp-form mb-20",
                              staticStyle: { height: "auto" }
                            },
                            [
                              _c("div", { staticClass: "infoBox warning" }, [
                                _c("p", [
                                  _vm._v(
                                    "Please review and confirm all the changes in the order before saving!"
                                  )
                                ])
                              ]),
                              _vm._v(" "),
                              _c("DiffTableAddress", {
                                attrs: {
                                  "old-object": _vm.confirmationOld,
                                  "new-object": _vm.confirmationChanges,
                                  "old-object-u-p-s": _vm.confirmationOldUPS,
                                  "new-object-u-p-s":
                                    _vm.confirmationChangesUPS,
                                  "countries-prop": _vm.countries,
                                  "companies-prop": _vm.companies
                                }
                              })
                            ],
                            1
                          )
                        : _vm._e()
                    ])
                  ],
                  1
                )
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-footer" }, [
            !_vm.isEqual(_vm.details.order, _vm.details.oldOrder) ||
            (!_vm.isEqual(_vm.details.ups, _vm.details.oldUPS) &&
              _vm.selected &&
              !_vm.loading)
              ? _c(
                  "button",
                  {
                    staticClass: "btn btnSize01 tertiaryBtn bigButton",
                    attrs: { disabled: _vm.loading },
                    on: {
                      click: function($event) {
                        return _vm.save()
                      }
                    }
                  },
                  [
                    !_vm.saveConfirmation
                      ? _c("span", [
                          _vm._v(
                            "\n                        Review\n                    "
                          )
                        ])
                      : _c("span", [
                          _vm._v(
                            "\n                        Save and Redeliver\n                    "
                          )
                        ])
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            (!_vm.isEqual(_vm.details.order, _vm.details.oldOrder) ||
              !_vm.isEqual(_vm.details.ups, _vm.details.oldUPS)) &&
            _vm.saveConfirmation
              ? _c(
                  "button",
                  {
                    staticClass: "btn btnSize01 tertiaryBtn bigButton",
                    attrs: { disabled: _vm.loading },
                    on: {
                      click: function($event) {
                        return _vm.back()
                      }
                    }
                  },
                  [
                    _c("span", [
                      _vm._v(
                        "\n                        Back\n                    "
                      )
                    ])
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btnSize01 secondaryBtn bigButton",
                attrs: { disabled: _vm.loading },
                on: {
                  click: function($event) {
                    return _vm.close()
                  }
                }
              },
              [_vm._v("\n                    Cancel\n                ")]
            )
          ]),
          _vm._v(" "),
          _c(
            "span",
            {
              staticClass: "close",
              on: {
                click: function($event) {
                  return _vm.close()
                }
              }
            },
            [_vm._v("X")]
          )
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ac124842", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/Modal.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/Modal.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6e8d36f4\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/Modal.vue")
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
Component.options.__file = "resources/assets/js/components/Modal.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6e8d36f4", Component.options)
  } else {
    hotAPI.reload("data-v-6e8d36f4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/RedeliveryModal.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/RedeliveryModal.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-ac124842\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/RedeliveryModal.vue")
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
Component.options.__file = "resources/assets/js/components/RedeliveryModal.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ac124842", Component.options)
  } else {
    hotAPI.reload("data-v-ac124842", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});