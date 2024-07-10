"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["InvoicePreview"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/invoices/InvoicePreview.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/invoices/InvoicePreview.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../mixins/errors */ "./resources/assets/js/mixins/errors.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mixins: [_mixins_errors__WEBPACK_IMPORTED_MODULE_0__["default"]],
  components: {
    'Modal': function Modal() {
      return __webpack_require__.e(/*! import() */ "resources_assets_js_components_Modal_vue").then(__webpack_require__.bind(__webpack_require__, /*! ../../Modal.vue */ "./resources/assets/js/components/Modal.vue"));
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
      axios.post("/invoice/".concat(this.$route.params.id, "/item"), this.item).then(function (response) {
        _this.item = false;
        _this.getInvoice();
        _this.postSuccess(response.data.message);
        _this.$root.$emit('modal.close', 'additem');
      })["catch"](function (error) {
        _this.postError(error.response.data.message);
      });
    },
    getInvoice: function getInvoice() {
      var _this2 = this;
      axios.get("/invoice/".concat(this.$route.params.id)).then(function (response) {
        _this2.invoice = response.data.data.invoice;
        _this2.invoiceItems = response.data.data.invoiceItems;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    downloadInvoice: function downloadInvoice() {
      window.open("/invoice/".concat(this.$route.params.id, "/preview?token=").concat(this.userInfo.token), '_blank');
    },
    updateInvoiceStatus: function updateInvoiceStatus(status) {
      var _this3 = this;
      var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      axios.post("/invoice/".concat(this.$route.params.id, "/status"), {
        status: status,
        date: date
      }).then(function (response) {
        _this3.getInvoice();
        _this3.postSuccess(response.data.message);
      })["catch"](function (error) {
        _this3.postError(error.response.data.message);
      });
    },
    emailInvoice: function emailInvoice() {
      var _this4 = this;
      axios.post("/invoice/".concat(this.$route.params.id, "/email?token=").concat(this.userInfo.token)).then(function (response) {
        _this4.postSuccess(response.data.message);
      })["catch"](function (error) {
        _this4.postError(error.response.data.message);
      });
    }
  }
});

/***/ }),

/***/ "./resources/assets/js/components/pages/invoices/InvoicePreview.vue":
/*!**************************************************************************!*\
  !*** ./resources/assets/js/components/pages/invoices/InvoicePreview.vue ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _InvoicePreview_vue_vue_type_template_id_eab3e41c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InvoicePreview.vue?vue&type=template&id=eab3e41c& */ "./resources/assets/js/components/pages/invoices/InvoicePreview.vue?vue&type=template&id=eab3e41c&");
/* harmony import */ var _InvoicePreview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InvoicePreview.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/pages/invoices/InvoicePreview.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _InvoicePreview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _InvoicePreview_vue_vue_type_template_id_eab3e41c___WEBPACK_IMPORTED_MODULE_0__.render,
  _InvoicePreview_vue_vue_type_template_id_eab3e41c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/pages/invoices/InvoicePreview.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/pages/invoices/InvoicePreview.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/invoices/InvoicePreview.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoicePreview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./InvoicePreview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/invoices/InvoicePreview.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoicePreview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/pages/invoices/InvoicePreview.vue?vue&type=template&id=eab3e41c&":
/*!*********************************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/invoices/InvoicePreview.vue?vue&type=template&id=eab3e41c& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoicePreview_vue_vue_type_template_id_eab3e41c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoicePreview_vue_vue_type_template_id_eab3e41c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoicePreview_vue_vue_type_template_id_eab3e41c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./InvoicePreview.vue?vue&type=template&id=eab3e41c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/invoices/InvoicePreview.vue?vue&type=template&id=eab3e41c&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/invoices/InvoicePreview.vue?vue&type=template&id=eab3e41c&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/invoices/InvoicePreview.vue?vue&type=template&id=eab3e41c& ***!
  \************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
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
            fn: function () {
              return [_c("h2", [_vm._v("Add Item")])]
            },
            proxy: true,
          },
          {
            key: "body",
            fn: function () {
              return [
                _c(
                  "div",
                  {
                    staticClass: "pxp-form wow fadeIn",
                    staticStyle: { height: "auto!important" },
                  },
                  [
                    _c("div", { staticClass: "form-row" }, [
                      _c("h3", { staticClass: "m-10" }, [
                        _vm._v("Information"),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-column" }, [
                      _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "Description" } }, [
                          _vm._v("Description"),
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.item.Description,
                              expression: "item.Description",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            name: "Description",
                            autocomplete: "off",
                            type: "text",
                            placeholder: "Description",
                          },
                          domProps: { value: _vm.item.Description },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.item,
                                "Description",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-column" }, [
                      _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "PrescriptionID" } }, [
                          _vm._v("PrescriptionID"),
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.item.PrescriptionID,
                              expression: "item.PrescriptionID",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            name: "PrescriptionID",
                            autocomplete: "off",
                            type: "text",
                            placeholder: "PrescriptionID",
                          },
                          domProps: { value: _vm.item.PrescriptionID },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.item,
                                "PrescriptionID",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-column" }, [
                      _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "ReferenceNumber" } }, [
                          _vm._v("Customer Reference"),
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.item.ReferenceNumber,
                              expression: "item.ReferenceNumber",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            name: "ReferenceNumber",
                            autocomplete: "off",
                            type: "text",
                            placeholder: "ReferenceNumber",
                          },
                          domProps: { value: _vm.item.ReferenceNumber },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.item,
                                "ReferenceNumber",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-row" }, [
                      _c("h3", { staticClass: "m-10" }, [_vm._v("Price")]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-column" }, [
                      _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "UnitCost" } }, [
                          _vm._v("Price"),
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.item.UnitCost,
                              expression: "item.UnitCost",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            name: "UnitCost",
                            autocomplete: "off",
                            type: "text",
                            placeholder: "UnitCost",
                          },
                          domProps: { value: _vm.item.UnitCost },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.item,
                                "UnitCost",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
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
                              expression: "item.VAT",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            name: "VAT",
                            autocomplete: "off",
                            type: "text",
                            placeholder: "VAT",
                          },
                          domProps: { value: _vm.item.VAT },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(_vm.item, "VAT", $event.target.value)
                            },
                          },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-column" }, [
                      _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "Type" } }, [
                          _vm._v("Type"),
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
                                expression: "item.Type",
                              },
                            ],
                            staticClass: "browser-default custom-select",
                            attrs: { name: "Type" },
                            on: {
                              change: function ($event) {
                                var $$selectedVal = Array.prototype.filter
                                  .call($event.target.options, function (o) {
                                    return o.selected
                                  })
                                  .map(function (o) {
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
                              },
                            },
                          },
                          [
                            _c("option", { domProps: { value: 3 } }, [
                              _vm._v("Credit/Refund"),
                            ]),
                            _vm._v(" "),
                            _c("option", { domProps: { value: 4 } }, [
                              _vm._v("Misc Charge"),
                            ]),
                          ]
                        ),
                      ]),
                    ]),
                  ]
                ),
              ]
            },
            proxy: true,
          },
          {
            key: "footer",
            fn: function () {
              return [
                _c(
                  "button",
                  {
                    staticClass: "btn btnSize01 tertiaryBtn",
                    on: {
                      click: function ($event) {
                        return _vm.saveItem()
                      },
                    },
                  },
                  [_vm._v("Save Item")]
                ),
              ]
            },
            proxy: true,
          },
        ]),
      }),
      _vm._v(" "),
      _c("section", { staticClass: "card" }, [
        _c("div", { staticClass: "card-header" }, [
          _c("h3", [
            _vm._v("Invoice #" + _vm._s(_vm.invoice.InvoiceID) + " Details"),
          ]),
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "card-body",
            staticStyle: {
              display: "flex",
              "flex-direction": "raw",
              "justify-content": "space-between",
            },
          },
          [
            _c("div", { staticClass: "invoice-details" }, [
              _c("span", [
                _vm._v(
                  _vm._s(_vm.invoice.Client) +
                    " invoice # " +
                    _vm._s(_vm.invoice.InvoiceID)
                ),
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
                ),
              ]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("span", [
                _vm._v(
                  "DATE COMPLETED: " + _vm._s(_vm.invoice["Created Date"])
                ),
              ]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("span", [
                _vm._v("DATE PAID: " + _vm._s(_vm.invoice["Paid Date"])),
              ]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("span", [
                _vm._v("GROSS AMOUNT : £" + _vm._s(_vm.invoice.GrossAmount)),
              ]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("span", [_vm._v("VAT : £" + _vm._s(_vm.invoice.VAT))]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("span", [
                _vm._v("NET AMOUNT : £" + _vm._s(_vm.invoice.NetAmount)),
              ]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("span", [
                _vm._v(
                  "AMOUNT RECEIVED : £" + _vm._s(_vm.invoice.AmountReceived)
                ),
              ]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("span", [
                _vm._v("STATUS : " + _vm._s(_vm.statuses[_vm.invoice.Status])),
              ]),
              _vm._v(" "),
              _c("br"),
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
                        click: function ($event) {
                          return _vm.emailInvoice()
                        },
                      },
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
                    click: function ($event) {
                      return _vm.addItem()
                    },
                  },
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
                        click: function ($event) {
                          return _vm.updateInvoiceStatus(1)
                        },
                      },
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
                        click: function ($event) {
                          return _vm.updateInvoiceStatus(2)
                        },
                      },
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
                    click: function ($event) {
                      return _vm.downloadInvoice()
                    },
                  },
                },
                [_vm._v("View\n                    Invoice")]
              ),
            ]),
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
                  _vm._l(_vm.invoiceItems, function (item) {
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
                          _vm._v("£" + _vm._s(item.VAT + item.UnitCost)),
                        ]),
                      ]),
                    ]
                  }),
                ],
                2
              ),
            ]),
          ]
        ),
      ]),
    ],
    1
  )
}
var staticRenderFns = [
  function () {
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
        _c("th", [_vm._v("Total")]),
      ]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);