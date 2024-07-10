webpackJsonp([10],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/EditOrderAddress.vue":
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    props: ['orderID', 'orderStatus', 'products'],
    data: function data() {
        return {
            countries: [],
            companies: [],
            details: {
                order: {},
                ups: {}
            },
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
            },
            loading: true
        };
    },
    computed: {},
    mounted: function mounted() {
        this.getCountries();
        this.getCompanies();
        this.getOrderDetails();
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
        close: function close() {
            this.$emit('closeorder');
        },
        save: function save() {
            var _this4 = this;

            axios.post('/order-edit/' + this.orderID, { order: this.details.order, ups: this.details.ups }).then(function (response) {
                _this4.close();
                _this4.$root.$emit('orderupdate');
            }).catch(function (error) {
                _this4.close();
                _this4.$root.$emit('orderupdate');
            });
        }
    }
};

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
          _vm.countries.length != 0 && _vm.companies.length != 0 && !_vm.loading
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
                  _vm._l(_vm.details.order, function(key, value) {
                    return _c(
                      "div",
                      { key: value, staticClass: "form-group form-group-2" },
                      [
                        _c("label", { attrs: { for: key } }, [
                          _vm._v(_vm._s(_vm.alias[value]))
                        ]),
                        _vm._v(" "),
                        !["CountryCode", "DCountryCode", "DeliveryID"].includes(
                          value
                        )
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
                              domProps: { value: _vm.details.order[value] },
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
                          : ["DCountryCode", "CountryCode"].includes(value)
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
                                      .call($event.target.options, function(o) {
                                        return o.selected
                                      })
                                      .map(function(o) {
                                        var val =
                                          "_value" in o ? o._value : o.value
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
                                  { domProps: { value: country.CountryID } },
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
                                      .call($event.target.options, function(o) {
                                        return o.selected
                                      })
                                      .map(function(o) {
                                        var val =
                                          "_value" in o ? o._value : o.value
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
                                  { domProps: { value: company.SettingID } },
                                  [_vm._v(_vm._s(company.Name))]
                                )
                              }),
                              0
                            )
                          : _vm._e()
                      ]
                    )
                  }),
                  _vm._v(" "),
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
                        _c("input", {
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
                      ]
                    )
                  })
                ],
                2
              )
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("transition", { attrs: { name: "fade" } }, [
          !_vm.loading
            ? _c("div", { staticClass: "modal-footer" }, [
                _c(
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
                  [_vm._v("Save")]
                ),
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