"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["Dispensing"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/dispensing/Dispensing.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/dispensing/Dispensing.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_constants_orderStatuses__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../mixins/constants/orderStatuses */ "./resources/assets/js/mixins/constants/orderStatuses.js");
/* harmony import */ var _mixins_filtersData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../mixins/filtersData */ "./resources/assets/js/mixins/filtersData.js");
/* harmony import */ var _emacle_vue_treeselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emacle/vue-treeselect */ "./node_modules/@emacle/vue-treeselect/dist/vue-treeselect.cjs.js");
/* harmony import */ var _emacle_vue_treeselect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emacle_vue_treeselect__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
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
  mixins: [_mixins_constants_orderStatuses__WEBPACK_IMPORTED_MODULE_0__["default"], _mixins_filtersData__WEBPACK_IMPORTED_MODULE_1__["default"]],
  components: {
    'TableComponentSearch': function TableComponentSearch() {
      return __webpack_require__.e(/*! import() */ "resources_assets_js_components_TableComponentSearch_vue").then(__webpack_require__.bind(__webpack_require__, /*! ../../TableComponentSearch.vue */ "./resources/assets/js/components/TableComponentSearch.vue"));
    }
  },
  data: function data() {
    return {
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
        options: [],
        clearable: true,
        multiple: true,
        placeholder: 'Select Country'
      }, {
        title: 'Client',
        value: 'client',
        type: 'select-extended',
        placeholder: 'Select Client',
        clearable: true,
        disableBranchNodes: true,
        multiple: true,
        options: []
      }, {
        title: 'Additional',
        value: 'additional',
        type: 'select-extended',
        placeholder: 'Select Summary Time',
        clearable: true,
        multiple: false,
        options: [{
          label: 'Monthly data summary',
          id: '1'
        }]
      }, {
        title: 'Product',
        value: 'product-multiple',
        type: 'select-async',
        options: [],
        placeholder: 'Select Product',
        multiple: true,
        clearable: false,
        loadOptions: _.debounce(function (_ref) {
          var action = _ref.action,
            searchQuery = _ref.searchQuery,
            callback = _ref.callback;
          if (action === _emacle_vue_treeselect__WEBPACK_IMPORTED_MODULE_2__.ASYNC_SEARCH) {
            var filter = searchQuery != '' && typeof searchQuery != 'undefined' ? "?filter=".concat(searchQuery) : '';
            axios.get("/products".concat(filter)).then(function (response) {
              var r = response.data.data;
              var products = [];
              r.forEach(function (result) {
                products.push({
                  id: result.Code,
                  value: result.ProductCodeID,
                  label: result.Name
                });
              });
              callback(null, products);
            })["catch"](function (error) {
              console.log(error);
            });
          }
        }, 500)
      }]
    };
  },
  mounted: function mounted() {
    this.setupFilters();
  }
});

/***/ }),

/***/ "./resources/assets/js/components/pages/dispensing/Dispensing.vue":
/*!************************************************************************!*\
  !*** ./resources/assets/js/components/pages/dispensing/Dispensing.vue ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Dispensing_vue_vue_type_template_id_3d5ca0fd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dispensing.vue?vue&type=template&id=3d5ca0fd& */ "./resources/assets/js/components/pages/dispensing/Dispensing.vue?vue&type=template&id=3d5ca0fd&");
/* harmony import */ var _Dispensing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dispensing.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/pages/dispensing/Dispensing.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Dispensing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dispensing_vue_vue_type_template_id_3d5ca0fd___WEBPACK_IMPORTED_MODULE_0__.render,
  _Dispensing_vue_vue_type_template_id_3d5ca0fd___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/pages/dispensing/Dispensing.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/pages/dispensing/Dispensing.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/dispensing/Dispensing.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dispensing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dispensing.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/dispensing/Dispensing.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dispensing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/pages/dispensing/Dispensing.vue?vue&type=template&id=3d5ca0fd&":
/*!*******************************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/dispensing/Dispensing.vue?vue&type=template&id=3d5ca0fd& ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dispensing_vue_vue_type_template_id_3d5ca0fd___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dispensing_vue_vue_type_template_id_3d5ca0fd___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dispensing_vue_vue_type_template_id_3d5ca0fd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dispensing.vue?vue&type=template&id=3d5ca0fd& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/dispensing/Dispensing.vue?vue&type=template&id=3d5ca0fd&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/dispensing/Dispensing.vue?vue&type=template&id=3d5ca0fd&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/dispensing/Dispensing.vue?vue&type=template&id=3d5ca0fd& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
      _c(
        "div",
        { staticClass: "card-body" },
        [
          _c("TableComponentSearch", {
            attrs: {
              "data-url": "/dispensing-data",
              "column-class": "col-lg-12 dispensing-table",
              "filter-required": true,
              "table-title": "Dispensing Data",
              filters: _vm.filters,
              "load-on-startup": false,
            },
          }),
        ],
        1
      ),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c("h3", [_vm._v("Dispensing Data")]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);