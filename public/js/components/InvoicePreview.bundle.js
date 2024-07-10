webpackJsonp([19],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/invoices/InvoicePreview.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _errors = __webpack_require__("./resources/assets/js/mixins/errors.js");

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_errors2.default],
    components: {
        'Modal': function Modal() {
            return __webpack_require__.e/* import() */(1/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/js/components/Modal.vue"));
        }
    },
    data: function data() {
        return {
            statuses: {
                0: 'INCOMPLETE',
                1: 'UNPAID',
                2: 'PAID',
                3: 'CREDITNOTE',
                4: 'DELETED'
            },
            item: false,
            invoice: {},
            invoiceItems: [],
            userInfo: userInfo
        };
    },
    mounted: function mounted() {
        this.getInvoice();
    },

    methods: {
        addItem: function addItem() {
            this.item = {
                UnitCost: '',
                VAT: 1,
                Description: '',
                ReferenceNumber: '',
                PrescriptionID: 0,
                Type: 3
            };

            this.$root.$emit('modal.open', 'additem');
            // this.notesConfirmed = true;
            // this.$root.$emit('modal.close', 'quicktraynotes');
        },
        saveItem: function saveItem() {
            var _this = this;

            axios.post('/invoice/' + this.$route.params.id + '/item', this.item).then(function (response) {
                _this.item = false;
                _this.getInvoice();
                _this.postSuccess(response.data.message);
                _this.$root.$emit('modal.close', 'additem');
            }).catch(function (error) {
                _this.postError(error.response.data.message);
            });
        },
        getInvoice: function getInvoice() {
            var _this2 = this;

            axios.get('/invoice/' + this.$route.params.id).then(function (response) {
                _this2.invoice = response.data.data.invoice;
                _this2.invoiceItems = response.data.data.invoiceItems;
            }).catch(function (error) {
                console.log(error);
            });
        },
        downloadInvoice: function downloadInvoice() {
            window.open('/invoice/' + this.$route.params.id + '/preview?token=' + this.userInfo.token, '_blank');
        },
        updateInvoiceStatus: function updateInvoiceStatus(status) {
            var _this3 = this;

            var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            axios.post('/invoice/' + this.$route.params.id + '/status', { status: status, date: date }).then(function (response) {
                _this3.getInvoice();
                _this3.postSuccess(response.data.message);
            }).catch(function (error) {
                _this3.postError(error.response.data.message);
            });
        },
        emailInvoice: function emailInvoice() {
            var _this4 = this;

            axios.post('/invoice/' + this.$route.params.id + '/email?token=' + this.userInfo.token).then(function (response) {
                _this4.postSuccess(response.data.message);
            }).catch(function (error) {
                _this4.postError(error.response.data.message);
            });
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

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-eab3e41c\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/invoices/InvoicePreview.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "content" },
    [
      _c("Modal", {
        staticClass: "duplicate-modal",
        attrs: { "modal-name": "additem" },
        scopedSlots: _vm._u([
          {
            key: "header",
            fn: function() {
              return [_c("h2", [_vm._v("Add Item")])]
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
                    staticClass: "pxp-form wow fadeIn",
                    staticStyle: { height: "auto!important" }
                  },
                  [
                    _c("div", { staticClass: "form-row" }, [
                      _c("h3", { staticClass: "m-10" }, [_vm._v("Information")])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-column" }, [
                      _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "Description" } }, [
                          _vm._v("Description")
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.item.Description,
                              expression: "item.Description"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            name: "Description",
                            autocomplete: "off",
                            type: "text",
                            placeholder: "Description"
                          },
                          domProps: { value: _vm.item.Description },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.item,
                                "Description",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-column" }, [
                      _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "PrescriptionID" } }, [
                          _vm._v("PrescriptionID")
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.item.PrescriptionID,
                              expression: "item.PrescriptionID"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            name: "PrescriptionID",
                            autocomplete: "off",
                            type: "text",
                            placeholder: "PrescriptionID"
                          },
                          domProps: { value: _vm.item.PrescriptionID },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.item,
                                "PrescriptionID",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-column" }, [
                      _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "ReferenceNumber" } }, [
                          _vm._v("Customer Reference")
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.item.ReferenceNumber,
                              expression: "item.ReferenceNumber"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            name: "ReferenceNumber",
                            autocomplete: "off",
                            type: "text",
                            placeholder: "ReferenceNumber"
                          },
                          domProps: { value: _vm.item.ReferenceNumber },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.item,
                                "ReferenceNumber",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-row" }, [
                      _c("h3", { staticClass: "m-10" }, [_vm._v("Price")])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-column" }, [
                      _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "UnitCost" } }, [
                          _vm._v("Price")
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.item.UnitCost,
                              expression: "item.UnitCost"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            name: "UnitCost",
                            autocomplete: "off",
                            type: "text",
                            placeholder: "UnitCost"
                          },
                          domProps: { value: _vm.item.UnitCost },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.item,
                                "UnitCost",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-column" }, [
                      _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "VAT" } }, [_vm._v("VAT")]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.item.VAT,
                              expression: "item.VAT"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            name: "VAT",
                            autocomplete: "off",
                            type: "text",
                            placeholder: "VAT"
                          },
                          domProps: { value: _vm.item.VAT },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(_vm.item, "VAT", $event.target.value)
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-column" }, [
                      _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "Type" } }, [
                          _vm._v("Type")
                        ]),
                        _vm._v(" "),
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.item.Type,
                                expression: "item.Type"
                              }
                            ],
                            staticClass: "browser-default custom-select",
                            attrs: { name: "Type" },
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
                                _vm.$set(
                                  _vm.item,
                                  "Type",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              }
                            }
                          },
                          [
                            _c("option", { domProps: { value: 3 } }, [
                              _vm._v("Credit/Refund")
                            ]),
                            _vm._v(" "),
                            _c("option", { domProps: { value: 4 } }, [
                              _vm._v("Misc Charge")
                            ])
                          ]
                        )
                      ])
                    ])
                  ]
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
                    staticClass: "btn btnSize01 tertiaryBtn",
                    on: {
                      click: function($event) {
                        return _vm.saveItem()
                      }
                    }
                  },
                  [_vm._v("Save Item")]
                )
              ]
            },
            proxy: true
          }
        ])
      }),
      _vm._v(" "),
      _c("section", { staticClass: "card" }, [
        _c("div", { staticClass: "card-header" }, [
          _c("h3", [
            _vm._v("Invoice #" + _vm._s(_vm.invoice.InvoiceID) + " Details")
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "card-body",
            staticStyle: {
              display: "flex",
              "flex-direction": "raw",
              "justify-content": "space-between"
            }
          },
          [
            _c("div", { staticClass: "invoice-details" }, [
              _c("span", [
                _vm._v(
                  _vm._s(_vm.invoice.Client) +
                    " invoice # " +
                    _vm._s(_vm.invoice.InvoiceID)
                )
              ]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("span", [
                _vm._v(
                  "DATE COVERED: " +
                    _vm._s(_vm.invoice["Created Date"]) +
                    " - " +
                    _vm._s(_vm.invoice["Created Date"])
                )
              ]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("span", [
                _vm._v("DATE COMPLETED: " + _vm._s(_vm.invoice["Created Date"]))
              ]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("span", [
                _vm._v("DATE PAID: " + _vm._s(_vm.invoice["Paid Date"]))
              ]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("span", [
                _vm._v("GROSS AMOUNT : £" + _vm._s(_vm.invoice.GrossAmount))
              ]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("span", [_vm._v("VAT : £" + _vm._s(_vm.invoice.VAT))]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("span", [
                _vm._v("NET AMOUNT : £" + _vm._s(_vm.invoice.NetAmount))
              ]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("span", [
                _vm._v(
                  "AMOUNT RECEIVED : £" + _vm._s(_vm.invoice.AmountReceived)
                )
              ]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("span", [
                _vm._v("STATUS : " + _vm._s(_vm.statuses[_vm.invoice.Status]))
              ]),
              _vm._v(" "),
              _c("br")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "invoice-options" }, [
              _vm.invoice.Status != 0
                ? _c(
                    "button",
                    {
                      staticClass: "btn btnSize02 secondaryBtn",
                      attrs: { title: "Email Invoice" },
                      on: {
                        click: function($event) {
                          return _vm.emailInvoice()
                        }
                      }
                    },
                    [_vm._v("Email Invoice")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btnSize02 secondaryBtn",
                  attrs: { title: "Add Item" },
                  on: {
                    click: function($event) {
                      return _vm.addItem()
                    }
                  }
                },
                [_vm._v("Add Item")]
              ),
              _vm._v(" "),
              _vm.invoice.Status == 0
                ? _c(
                    "button",
                    {
                      staticClass: "btn btnSize02 secondaryBtn",
                      attrs: { title: "Set Invoice as Complete" },
                      on: {
                        click: function($event) {
                          return _vm.updateInvoiceStatus(1)
                        }
                      }
                    },
                    [_vm._v("Set Invoice as Complete")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.invoice.Status == 1
                ? _c(
                    "button",
                    {
                      staticClass: "btn btnSize02 secondaryBtn",
                      attrs: { title: "Set Invoice As Paid" },
                      on: {
                        click: function($event) {
                          return _vm.updateInvoiceStatus(2)
                        }
                      }
                    },
                    [_vm._v("Set Invoice As Paid")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btnSize02 secondaryBtn",
                  attrs: { title: "View PDF" },
                  on: {
                    click: function($event) {
                      return _vm.downloadInvoice()
                    }
                  }
                },
                [_vm._v("View Invoice")]
              )
            ])
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "card-body", staticStyle: { padding: "0px" } },
          [
            _c("table", [
              _vm._m(0),
              _vm._v(" "),
              _c(
                "tbody",
                [
                  _vm._l(_vm.invoiceItems, function(item) {
                    return [
                      _c("tr", { key: item.ItemID }, [
                        _c("td", [_vm._v(_vm._s(item.ReferenceNumber))]),
                        _vm._v(" "),
                        _c("td", [_vm._v(_vm._s(item.ItemID))]),
                        _vm._v(" "),
                        _c("td", [_vm._v(_vm._s(item.Date))]),
                        _vm._v(" "),
                        _c("td", [_vm._v(_vm._s(item.DoctorID))]),
                        _vm._v(" "),
                        _c("td", [_vm._v(_vm._s(item.Description))]),
                        _vm._v(" "),
                        _c("td", [_vm._v(_vm._s(item.Quantity))]),
                        _vm._v(" "),
                        _c("td", [_vm._v("£" + _vm._s(item.UnitCost))]),
                        _vm._v(" "),
                        _c("td", [_vm._v("£" + _vm._s(item.VAT))]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v("£" + _vm._s(item.VAT + item.UnitCost))
                        ])
                      ])
                    ]
                  })
                ],
                2
              )
            ])
          ]
        )
      ])
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("Customer Reference")]),
        _vm._v(" "),
        _c("th", [_vm._v("Our Reference")]),
        _vm._v(" "),
        _c("th", [_vm._v("Date")]),
        _vm._v(" "),
        _c("th", [_vm._v("Prescriber")]),
        _vm._v(" "),
        _c("th", [_vm._v("Description")]),
        _vm._v(" "),
        _c("th", [_vm._v("Quantity")]),
        _vm._v(" "),
        _c("th", [_vm._v("Price")]),
        _vm._v(" "),
        _c("th", [_vm._v("VAT")]),
        _vm._v(" "),
        _c("th", [_vm._v("Total")])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-eab3e41c", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/pages/invoices/InvoicePreview.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/invoices/InvoicePreview.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-eab3e41c\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/invoices/InvoicePreview.vue")
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
Component.options.__file = "resources/assets/js/components/pages/invoices/InvoicePreview.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-eab3e41c", Component.options)
  } else {
    hotAPI.reload("data-v-eab3e41c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});