"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["Invoices"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/invoices/Invoices.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/invoices/Invoices.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_filtersData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../mixins/filtersData */ "./resources/assets/js/mixins/filtersData.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  mixins: [_mixins_filtersData__WEBPACK_IMPORTED_MODULE_0__["default"]],
  components: {
    'TableComponentSearch': function TableComponentSearch() {
      return __webpack_require__.e(/*! import() */ "resources_assets_js_components_TableComponentSearch_vue").then(__webpack_require__.bind(__webpack_require__, /*! ../../TableComponentSearch.vue */ "./resources/assets/js/components/TableComponentSearch.vue"));
    }
  },
  data: function data() {
    return {
      columnMap: {},
      filters: [{
        title: 'Start Date',
        value: 'start_date',
        type: 'date'
      }, {
        title: 'End Date',
        value: 'end_date',
        type: 'date'
      }, {
        title: 'Country',
        value: 'country',
        type: 'select-extended',
        multiple: true,
        clearable: true,
        options: [],
        placeholder: 'Select Country'
      }, {
        title: 'Statuses',
        value: 'statuses',
        type: 'select-extended',
        multiple: true,
        clearable: true,
        options: [{
          id: 0,
          label: 'Incomplete'
        }, {
          id: 1,
          label: 'Unpaid'
        }, {
          id: 2,
          label: 'Paid'
        }, {
          id: 3,
          label: 'Credit Note'
        }, {
          id: 4,
          label: 'Deleted'
        }],
        placeholder: 'Select Type'
      }, {
        title: 'Delivery',
        value: 'delivery',
        type: 'select-extended',
        clearable: true,
        options: [],
        placeholder: 'Select Delivery Service'
      }, {
        title: 'Client',
        value: 'client',
        type: 'select-extended',
        placeholder: 'Select Client',
        clearable: true,
        disableBranchNodes: true,
        options: []
      }, {
        title: 'ESA Order ID',
        value: 'order_id',
        type: 'textarea'
      }, {
        title: 'Client Reference Number',
        value: 'reference',
        type: 'textarea'
      }]
    };
  },
  mounted: function mounted() {
    this.setupFilters();
  },
  methods: {
    downloadInvoice: function downloadInvoice(item) {
      console.log(item);
    }
  }
});

/***/ }),

/***/ "./resources/assets/js/components/pages/invoices/Invoices.vue":
/*!********************************************************************!*\
  !*** ./resources/assets/js/components/pages/invoices/Invoices.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Invoices_vue_vue_type_template_id_2ad462bd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Invoices.vue?vue&type=template&id=2ad462bd& */ "./resources/assets/js/components/pages/invoices/Invoices.vue?vue&type=template&id=2ad462bd&");
/* harmony import */ var _Invoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Invoices.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/pages/invoices/Invoices.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Invoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Invoices_vue_vue_type_template_id_2ad462bd___WEBPACK_IMPORTED_MODULE_0__.render,
  _Invoices_vue_vue_type_template_id_2ad462bd___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/pages/invoices/Invoices.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/pages/invoices/Invoices.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/invoices/Invoices.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Invoices.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/invoices/Invoices.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/pages/invoices/Invoices.vue?vue&type=template&id=2ad462bd&":
/*!***************************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/invoices/Invoices.vue?vue&type=template&id=2ad462bd& ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_2ad462bd___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_2ad462bd___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_2ad462bd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Invoices.vue?vue&type=template&id=2ad462bd& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/invoices/Invoices.vue?vue&type=template&id=2ad462bd&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/invoices/Invoices.vue?vue&type=template&id=2ad462bd&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/invoices/Invoices.vue?vue&type=template&id=2ad462bd& ***!
  \******************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "content" }, [
    _c("section", { staticClass: "card" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "card-body" }, [
        _c(
          "div",
          { staticClass: "invoice-search" },
          [
            _c("TableComponentSearch", {
              attrs: {
                "data-url": "/invoices",
                "column-class": "col-lg-12",
                "table-title": "Invoices",
                "redirect-name": "invoice",
                "redirect-id": "InvoiceID",
                "hidden-columns": ["InvoiceID"],
                filters: _vm.filters,
                "column-map": _vm.columnMap,
                "csv-url": true,
              },
              scopedSlots: _vm._u([
                {
                  key: "tools",
                  fn: function (ref) {
                    var item = ref.item
                    return [
                      _c(
                        "a",
                        {
                          staticClass: "btn btn-primary table-icon",
                          staticStyle: { margin: "0" },
                          attrs: { title: "Download Invoice" },
                          on: {
                            click: function ($event) {
                              return _vm.downloadInvoice(item)
                            },
                          },
                        },
                        [_c("i", { staticClass: "fa fa-download" })]
                      ),
                    ]
                  },
                },
              ]),
            }),
          ],
          1
        ),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c("h3", [_vm._v("Invoices")]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);