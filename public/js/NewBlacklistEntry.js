"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["NewBlacklistEntry"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/blacklist/New.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/blacklist/New.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pages_Reports_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pages/Reports.vue */ "./resources/assets/js/components/pages/Reports.vue");
/* harmony import */ var _mixins_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../mixins/errors */ "./resources/assets/js/mixins/errors.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  "extends": _pages_Reports_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function data() {
    return {};
  },
  mixins: [_mixins_errors__WEBPACK_IMPORTED_MODULE_1__["default"]],
  computed: {
    checked: function checked() {
      return this.$store.state.checked;
    },
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
    }
  },
  destroyed: function destroyed() {
    this.$store.commit('replaceChecked', []);
  },
  methods: {
    checkAllVisible: function checkAllVisible() {
      if (this.currentChecked && !this.match) {
        this.$root.$emit('table.uncheck.all');
      } else if (this.currentChecked && this.match) {
        this.$root.$emit('table.uncheck.all');
      } else {
        this.$root.$emit('table.check.all');
      }
    },
    addToBlacklist: function addToBlacklist() {
      var _this3 = this;
      axios.post("/blacklist", {
        ids: this.checked
      }).then(function (response) {
        _this3.postSuccess('Added blacklist entry');
        _this3.$store.commit('replaceChecked', []);
      })["catch"](function (error) {
        _this3.postError(error.response.data.message);
      });
    },
    clearChecked: function clearChecked() {
      this.$store.commit('replaceChecked', []);
    }
  }
});

/***/ }),

/***/ "./resources/assets/js/components/pages/blacklist/New.vue":
/*!****************************************************************!*\
  !*** ./resources/assets/js/components/pages/blacklist/New.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _New_vue_vue_type_template_id_6f720088___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./New.vue?vue&type=template&id=6f720088& */ "./resources/assets/js/components/pages/blacklist/New.vue?vue&type=template&id=6f720088&");
/* harmony import */ var _New_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./New.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/pages/blacklist/New.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _New_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _New_vue_vue_type_template_id_6f720088___WEBPACK_IMPORTED_MODULE_0__.render,
  _New_vue_vue_type_template_id_6f720088___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/pages/blacklist/New.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/pages/blacklist/New.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/blacklist/New.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_New_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./New.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/blacklist/New.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_New_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/pages/blacklist/New.vue?vue&type=template&id=6f720088&":
/*!***********************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/blacklist/New.vue?vue&type=template&id=6f720088& ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_New_vue_vue_type_template_id_6f720088___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_New_vue_vue_type_template_id_6f720088___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_New_vue_vue_type_template_id_6f720088___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./New.vue?vue&type=template&id=6f720088& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/blacklist/New.vue?vue&type=template&id=6f720088&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/blacklist/New.vue?vue&type=template&id=6f720088&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/blacklist/New.vue?vue&type=template&id=6f720088& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
          _c(
            "router-link",
            {
              staticClass: "btn btnSize01 secondaryBtn mb-10",
              attrs: { tag: "button", to: "/blacklist", exact: "" },
            },
            [_vm._v("\n                Return to blacklist\n            ")]
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "orderSearch" },
            [
              _c("TableComponentSearch", {
                attrs: {
                  "data-url": "/orders/search",
                  "column-class": "col-lg-12",
                  "table-title": "Prescriptions",
                  "redirect-name": "prescription",
                  "redirect-id": "PrescriptionID",
                  "checkbox-visible": true,
                  "hidden-columns": [
                    "checked",
                    "NotFound",
                    "NotFound",
                    "AirwayBillNumber",
                  ],
                  filters: _vm.filters,
                  "column-map": _vm.columnMap,
                  "not-orderable": ["Products"],
                  "load-on-startup": false,
                },
                scopedSlots: _vm._u([
                  {
                    key: "toppagination",
                    fn: function () {
                      return [
                        _c(
                          "div",
                          {
                            staticClass: "pl-5",
                            staticStyle: {
                              display: "flex",
                              "align-items": "center",
                            },
                          },
                          [
                            _vm.checked.length > 0
                              ? _c("div", { staticClass: "check-options" }, [
                                  _c(
                                    "button",
                                    {
                                      staticClass: "btn btnSize02 secondaryBtn",
                                      on: {
                                        click: function ($event) {
                                          return _vm.addToBlacklist()
                                        },
                                      },
                                    },
                                    [
                                      _vm._v(
                                        "\n                                    Blacklist " +
                                          _vm._s(_vm.checked.length) +
                                          " orders\n                                "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "button",
                                    {
                                      staticClass: "btn btnSize02 secondaryBtn",
                                      on: {
                                        click: function ($event) {
                                          return _vm.clearChecked()
                                        },
                                      },
                                    },
                                    [
                                      _vm._v(
                                        "\n                                    Clear checked\n                                "
                                      ),
                                    ]
                                  ),
                                ])
                              : _vm._e(),
                          ]
                        ),
                      ]
                    },
                    proxy: true,
                  },
                  {
                    key: "thfilter",
                    fn: function () {
                      return [
                        _c("div", [
                          _c(
                            "div",
                            {
                              on: {
                                click: function ($event) {
                                  return _vm.checkAllVisible()
                                },
                              },
                            },
                            [
                              _c("input", {
                                class: {
                                  unchecked: !_vm.match && _vm.currentChecked,
                                },
                                attrs: { type: "checkbox", name: "checkall" },
                                domProps: {
                                  checked: _vm.match || _vm.currentChecked,
                                },
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "checkall" } }),
                            ]
                          ),
                        ]),
                      ]
                    },
                    proxy: true,
                  },
                ]),
              }),
            ],
            1
          ),
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
      _c("h3", [_vm._v("Add to Blacklist")]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);