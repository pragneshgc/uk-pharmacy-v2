webpackJsonp([17],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/EditOrderAddress.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _errors = __webpack_require__("./resources/assets/js/mixins/errors.js");

var _errors2 = _interopRequireDefault(_errors);

var _prescriptionColumns = __webpack_require__("./resources/assets/js/mixins/constants/prescriptionColumns.js");

var _prescriptionColumns2 = _interopRequireDefault(_prescriptionColumns);

var _DiffTableAddress = __webpack_require__("./resources/assets/js/components/pages/DiffTableAddress.vue");

var _DiffTableAddress2 = _interopRequireDefault(_DiffTableAddress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_errors2.default, _prescriptionColumns2.default],
    props: ['orderID', 'orderStatus', 'products'],
    components: { DiffTableAddress: _DiffTableAddress2.default },
    data: function data() {
        return {
            countries: [],
            companies: [],
            details: {
                order: {},
                oldOrder: {},
                ups: {},
                oldUps: {}
            },
            columnDelivery: ['Repeats', 'DAddress1', 'DAddress2', 'DAddress3', 'DAddress4', 'DPostcode', 'DCountryCode', 'DeliveryID', 'TrackingCode'],
            columnHome: ['Name', 'Surname', 'Address1', 'Address2', 'Address3', 'Address4', 'Postcode', 'CountryCode', 'Telephone', 'Email', 'TokenID', 'APNotificationLanguage', 'APNotificationValue'],
            columnMax: ['Address1', 'Address2', 'Address3', 'Address4', 'DAddress1', 'DAddress2', 'DAddress3', 'DAddress4'],
            disabledFields: [''],
            loading: true,
            //save confirmation
            saveConfirmation: false,
            confirmationChanges: {},
            confirmationChangesUPS: {},
            confirmationOld: {},
            confirmationOldUPS: {}
        };
    },
    computed: {},
    mounted: function mounted() {
        this.getCountries();
        this.getCompanies();
        this.getOrderDetails();
        this.$root.$on('modal.close.all', this.close);
    },
    destroyed: function destroyed() {
        this.$root.$off('modal.close.all');
    },

    methods: {
        getOrderDetails: function getOrderDetails() {
            var _this = this;

            axios.get('/order-edit/' + this.orderID).then(function (response) {
                _this.details = response.data.data;
                _this.loading = false;
            }).catch(function (error) {
                console.warn(error.response.data.message);
                _this.loading = false;
            });
        },
        getCountries: function getCountries() {
            var _this2 = this;

            axios.get('/countries').then(function (response) {
                _this2.countries = response.data.data;
            }).catch(function (error) {
                console.warn(error.response.data.message);
            });
        },
        getCompanies: function getCompanies() {
            var _this3 = this;

            axios.get('/delivery-companies').then(function (response) {
                _this3.companies = response.data.data;
            }).catch(function (error) {
                console.warn(error.response.data.message);
            });
        },

        /**
         * Fetches country title by country id
         */
        getCountryTitle: function getCountryTitle(id) {
            var countries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var title = 'Unknown';

            if (!countries) {
                countries = this.countries;
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
                companies = this.companies;
            }

            companies.forEach(function (company) {
                if (company.SettingID == id) {
                    title = company.Name;
                }
            });

            return title;
        },
        getCounterColor: function getCounterColor(value, object) {
            if (object[value] != null) {
                if (object[value].length > 0 && object[value].length <= 30) {
                    return 'input-count-success';
                } else if (object[value].length > 30) {
                    return 'input-count-danger';
                }
            }

            return '';
        },
        close: function close() {
            this.saveConfirmation = false;
            this.confirmationChanges = {};
            this.confirmationOld = {};
            this.confirmationOld = {};
            this.confirmationOldUPS = {};
            this.details = { order: {}, oldOrder: {}, ups: {}, oldUps: {} }; //clean up after
            this.$emit('closeorder');
        },
        save: function save() {
            var _this4 = this;

            if (this.saveConfirmation) {
                this.submit();
            } else {
                axios.post('/order-edit/check/' + this.orderID, { order: this.details.order, ups: this.details.ups }).then(function (response) {
                    if (Object.keys(response.data.data.changes).length > 0 || Object.keys(response.data.data.changesUPS).length) {
                        _this4.confirmationChanges = response.data.data.changes;
                        _this4.confirmationChangesUPS = response.data.data.changesUPS;
                        _this4.confirmationOld = response.data.data.old;
                        _this4.confirmationOldUPS = response.data.data.oldUPS;
                        _this4.saveConfirmation = true;
                    } else {
                        _this4.saveConfirmation = false;
                        _this4.$emit('closeorder');
                    }
                }).catch(function (error) {
                    _this4.saveConfirmation = false;
                    _this4.postError(error);
                });
            }
        },
        submit: function submit() {
            var _this5 = this;

            axios.post('/order-edit/' + this.orderID, { order: this.details.order, ups: this.details.ups }).then(function (response) {
                _this5.postSuccess('Saved');
            }).catch(function (error) {
                _this5.postError(error);
            }).finally(function () {
                _this5.close();
                _this5.saveConfirmation = false;
                _this5.$root.$emit('orderupdate');
            });
        },
        back: function back() {
            this.saveConfirmation = false;
            this.confirmationChanges = {};
            this.confirmationChangesUPS = {};
        },

        isEqual: _.isEqual
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

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-7194f852\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/EditOrderAddress.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
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
        !_vm.loading
          ? _c(
              "div",
              { staticClass: "modal-header" },
              [
                _c("transition", { attrs: { name: "fade" } }, [
                  _c("section", { staticClass: "flexContent" }, [
                    _c("div", { staticClass: "orderDetails" }, [
                      _c("img", { attrs: { src: "images/iconPaper.png" } }),
                      _vm._v(" "),
                      _c("ul", [
                        _c("li", [
                          _c("span", [_vm._v("Order #: ")]),
                          _vm._v(_vm._s(_vm.orderID))
                        ]),
                        _vm._v(" "),
                        _c("li", [
                          _c("span", [_vm._v("Name: ")]),
                          _vm._v(_vm._s(_vm.details.order.Name))
                        ]),
                        _vm._v(" "),
                        _c("li", [
                          _c("span", [_vm._v("Surname: ")]),
                          _vm._v(_vm._s(_vm.details.order.Surname))
                        ]),
                        _vm._v(" "),
                        _c("li", [
                          _c("span", [_vm._v("Status: ")]),
                          _vm._v(_vm._s(_vm.orderStatus))
                        ]),
                        _vm._v(" "),
                        _vm.details.order.TrackingCode != "" &&
                        _vm.details.order.TrackingCode != null
                          ? _c("li", [
                              _c("span", [_vm._v("Tracking Code: ")]),
                              _vm._v(_vm._s(_vm.details.order.TrackingCode))
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.details.order.Repeats != "0" &&
                        _vm.details.order.Repeats != "" &&
                        [143, 162, 205, 243].includes(
                          _vm.details.order.DCountryCode
                        )
                          ? _c("li", [
                              _c("span", [_vm._v("Commercial value: ")]),
                              _vm._v(
                                _vm._s(_vm.details.order.Repeats) +
                                  "\n                            "
                              )
                            ])
                          : _vm._e()
                      ])
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("transition", { attrs: { name: "fade" } }, [
                  _vm.products.length != 0
                    ? _c(
                        "section",
                        { staticClass: "flexContent" },
                        _vm._l(_vm.products, function(p) {
                          return _c(
                            "div",
                            { staticClass: "productListItem mb-10" },
                            [
                              _c("div", { staticClass: "title" }, [
                                _c("h3", [
                                  _vm._v(
                                    _vm._s(p.Name) +
                                      ", " +
                                      _vm._s(p.Dosage) +
                                      " x " +
                                      _vm._s(p.Quantity) +
                                      " " +
                                      _vm._s(p.Unit)
                                  )
                                ])
                              ])
                            ]
                          )
                        }),
                        0
                      )
                    : _vm._e()
                ])
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _c("transition", { attrs: { name: "fade" } }, [
          _vm.countries.length != 0 &&
          _vm.companies.length != 0 &&
          !_vm.loading &&
          Object.keys(_vm.confirmationChanges).length == 0 &&
          Object.keys(_vm.confirmationChangesUPS).length == 0
            ? _c(
                "form",
                {
                  staticClass: "pxp-form mb-20",
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                      return _vm.save($event)
                    }
                  }
                },
                [
                  _c(
                    "div",
                    { staticClass: "form-column" },
                    [
                      _c("h3", [_vm._v("Delivery Details")]),
                      _vm._v(" "),
                      _vm._l(_vm.details.order, function(key, value) {
                        return _vm.columnDelivery.includes(value)
                          ? _c(
                              "div",
                              {
                                key: value,
                                staticClass: "form-group form-group-2"
                              },
                              [
                                _c("label", { attrs: { for: key } }, [
                                  _vm._v(_vm._s(_vm.alias[value]))
                                ]),
                                _vm._v(" "),
                                _vm.columnMax.includes(value)
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
                                              ? _vm.details.order[value].length
                                              : 0
                                          ) + "/30"
                                        )
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                ![
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
                                          value: _vm.details.order[value],
                                          expression: "details.order[value]"
                                        }
                                      ],
                                      attrs: { name: key, placeholder: "" },
                                      domProps: {
                                        value: _vm.details.order[value]
                                      },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
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
                                  : ["DCountryCode", "CountryCode"].includes(
                                      value
                                    )
                                  ? _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.details.order[value],
                                            expression: "details.order[value]"
                                          }
                                        ],
                                        on: {
                                          change: function($event) {
                                            var $$selectedVal = Array.prototype.filter
                                              .call(
                                                $event.target.options,
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
                                      _vm._l(_vm.countries, function(country) {
                                        return _c(
                                          "option",
                                          {
                                            domProps: {
                                              value: country.CountryID
                                            }
                                          },
                                          [_vm._v(_vm._s(country.Name))]
                                        )
                                      }),
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
                                            value: _vm.details.order[value],
                                            expression: "details.order[value]"
                                          }
                                        ],
                                        on: {
                                          change: function($event) {
                                            var $$selectedVal = Array.prototype.filter
                                              .call(
                                                $event.target.options,
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
                                      _vm._l(_vm.companies, function(company) {
                                        return _c(
                                          "option",
                                          {
                                            domProps: {
                                              value: company.SettingID
                                            }
                                          },
                                          [_vm._v(_vm._s(company.Name))]
                                        )
                                      }),
                                      0
                                    )
                                  : _vm._e()
                              ]
                            )
                          : _vm._e()
                      }),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "Notes" } }, [
                          _vm._v(_vm._s(_vm.alias["Notes"]))
                        ]),
                        _vm._v(" "),
                        _c("textarea", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.details.order.Notes,
                              expression: "details.order.Notes"
                            }
                          ],
                          staticClass: "form-control tBoxSize02",
                          staticStyle: {
                            "min-width": "300px",
                            "min-height": "60px",
                            "line-height": "1"
                          },
                          attrs: {
                            placeholder:
                              "Add notes here if you want them to show for dispensers and customer support"
                          },
                          domProps: { value: _vm.details.order.Notes },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.details.order,
                                "Notes",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ])
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "form-column" },
                    [
                      _c("h3", [_vm._v("Home Details")]),
                      _vm._v(" "),
                      _vm._l(_vm.details.order, function(key, value) {
                        return _vm.columnHome.includes(value)
                          ? _c(
                              "div",
                              {
                                key: value,
                                staticClass: "form-group form-group-2"
                              },
                              [
                                _c("label", { attrs: { for: key } }, [
                                  _vm._v(_vm._s(_vm.alias[value]))
                                ]),
                                _vm._v(" "),
                                _vm.columnMax.includes(value)
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
                                              ? _vm.details.order[value].length
                                              : 0
                                          ) + "/30"
                                        )
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                ![
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
                                          value: _vm.details.order[value],
                                          expression: "details.order[value]"
                                        }
                                      ],
                                      attrs: { name: key, placeholder: "" },
                                      domProps: {
                                        value: _vm.details.order[value]
                                      },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
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
                                  : ["DCountryCode", "CountryCode"].includes(
                                      value
                                    )
                                  ? _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.details.order[value],
                                            expression: "details.order[value]"
                                          }
                                        ],
                                        on: {
                                          change: function($event) {
                                            var $$selectedVal = Array.prototype.filter
                                              .call(
                                                $event.target.options,
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
                                      _vm._l(_vm.countries, function(country) {
                                        return _c(
                                          "option",
                                          {
                                            domProps: {
                                              value: country.CountryID
                                            }
                                          },
                                          [_vm._v(_vm._s(country.Name))]
                                        )
                                      }),
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
                                            value: _vm.details.order[value],
                                            expression: "details.order[value]"
                                          }
                                        ],
                                        on: {
                                          change: function($event) {
                                            var $$selectedVal = Array.prototype.filter
                                              .call(
                                                $event.target.options,
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
                                      _vm._l(_vm.companies, function(company) {
                                        return _c(
                                          "option",
                                          {
                                            domProps: {
                                              value: company.SettingID
                                            }
                                          },
                                          [_vm._v(_vm._s(company.Name))]
                                        )
                                      }),
                                      0
                                    )
                                  : _vm._e()
                              ]
                            )
                          : _vm._e()
                      })
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "form-column" },
                    [
                      _vm.details.ups != null
                        ? _c("h3", [_vm._v("UPS Access Point")])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm._l(_vm.details.ups, function(key, value) {
                        return _c(
                          "div",
                          { key: value, staticClass: "form-group" },
                          [
                            _c("label", { attrs: { for: key } }, [
                              _vm._v(_vm._s(_vm.alias[value]))
                            ]),
                            _vm._v(" "),
                            !["CountryCode", "DCountryCode"].includes(value)
                              ? _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.details.ups[value],
                                      expression: "details.ups[value]"
                                    }
                                  ],
                                  attrs: { name: key, placeholder: "" },
                                  domProps: { value: _vm.details.ups[value] },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.details.ups,
                                        value,
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              : ["DCountryCode", "CountryCode"].includes(value)
                              ? _c(
                                  "select",
                                  {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.details.ups[value],
                                        expression: "details.ups[value]"
                                      }
                                    ],
                                    on: {
                                      change: function($event) {
                                        var $$selectedVal = Array.prototype.filter
                                          .call($event.target.options, function(
                                            o
                                          ) {
                                            return o.selected
                                          })
                                          .map(function(o) {
                                            var val =
                                              "_value" in o ? o._value : o.value
                                            return val
                                          })
                                        _vm.$set(
                                          _vm.details.ups,
                                          value,
                                          $event.target.multiple
                                            ? $$selectedVal
                                            : $$selectedVal[0]
                                        )
                                      }
                                    }
                                  },
                                  _vm._l(_vm.countries, function(country) {
                                    return _c(
                                      "option",
                                      {
                                        domProps: { value: country.CountryID }
                                      },
                                      [_vm._v(_vm._s(country.Name))]
                                    )
                                  }),
                                  0
                                )
                              : _vm._e()
                          ]
                        )
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
                { staticClass: "pxp-form mb-20" },
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
                      "new-object-u-p-s": _vm.confirmationChangesUPS,
                      "countries-prop": _vm.countries,
                      "companies-prop": _vm.companies
                    }
                  })
                ],
                1
              )
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("transition", { attrs: { name: "fade" } }, [
          !_vm.loading
            ? _c("div", { staticClass: "modal-footer" }, [
                !_vm.isEqual(_vm.details.order, _vm.details.oldOrder) ||
                !_vm.isEqual(_vm.details.ups, _vm.details.oldUPS)
                  ? _c(
                      "button",
                      {
                        staticClass:
                          "btn btnSize01 tertiaryBtn bigButton big-square-button",
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
                                "\n                        Save\n                    "
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
                        staticClass:
                          "btn btnSize01 tertiaryBtn bigButton big-square-button",
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
                    on: {
                      click: function($event) {
                        return _vm.close()
                      }
                    }
                  },
                  [_vm._v("Cancel")]
                )
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _vm.loading
          ? _c("div", { staticClass: "loader" }, [_vm._v("Loading...")])
          : _vm._e(),
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
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7194f852", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/pages/EditOrderAddress.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/EditOrderAddress.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-7194f852\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/EditOrderAddress.vue")
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
Component.options.__file = "resources/assets/js/components/pages/EditOrderAddress.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7194f852", Component.options)
  } else {
    hotAPI.reload("data-v-7194f852", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});