"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["NewUser"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/user/NewUser.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/user/NewUser.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************/
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mixins: [_mixins_errors__WEBPACK_IMPORTED_MODULE_0__["default"]],
  data: function data() {
    return {
      data: {
        name: '',
        surname: '',
        email: '',
        role: 30,
        password: '',
        passwordRepeat: ''
      },
      loading: false,
      errors: {}
    };
  },
  mounted: function mounted() {},
  computed: {
    postUrl: function postUrl() {
      return '/users';
    }
  },
  methods: {
    save: function save() {
      var _this = this;
      this.loading = true;
      axios.put(this.postUrl, this.data).then(function (response) {
        _this.postSuccess(response.data.message);
        _this.errors = {};
        _this.loading = false;
        _this.$router.push('/users');
      })["catch"](function (error) {
        _this.errors = error.response.data.errors;
        _this.loading = false;
      });
    }
  }
});

/***/ }),

/***/ "./resources/assets/js/components/pages/user/NewUser.vue":
/*!***************************************************************!*\
  !*** ./resources/assets/js/components/pages/user/NewUser.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NewUser_vue_vue_type_template_id_78238e2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewUser.vue?vue&type=template&id=78238e2e& */ "./resources/assets/js/components/pages/user/NewUser.vue?vue&type=template&id=78238e2e&");
/* harmony import */ var _NewUser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewUser.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/pages/user/NewUser.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewUser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewUser_vue_vue_type_template_id_78238e2e___WEBPACK_IMPORTED_MODULE_0__.render,
  _NewUser_vue_vue_type_template_id_78238e2e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/pages/user/NewUser.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/pages/user/NewUser.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/user/NewUser.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewUser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NewUser.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/user/NewUser.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewUser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/pages/user/NewUser.vue?vue&type=template&id=78238e2e&":
/*!**********************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/user/NewUser.vue?vue&type=template&id=78238e2e& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewUser_vue_vue_type_template_id_78238e2e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewUser_vue_vue_type_template_id_78238e2e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewUser_vue_vue_type_template_id_78238e2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NewUser.vue?vue&type=template&id=78238e2e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/user/NewUser.vue?vue&type=template&id=78238e2e&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/user/NewUser.vue?vue&type=template&id=78238e2e&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/user/NewUser.vue?vue&type=template&id=78238e2e& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
          "form",
          {
            staticClass: "text-center p-5",
            on: {
              submit: function ($event) {
                $event.preventDefault()
                return _vm.save.apply(null, arguments)
              },
            },
          },
          [
            _c("p", { staticClass: "h4 mb-3" }, [_vm._v("New User")]),
            _vm._v(" "),
            _c("div", { staticClass: "row mb-3" }, [
              _c("div", { staticClass: "col-lg-6 mb-10" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.data.name,
                      expression: "data.name",
                    },
                  ],
                  staticClass: "form-control tBoxSize02",
                  attrs: {
                    valid: "",
                    autocomplete: "off",
                    type: "text",
                    id: "defaultContactFormName",
                    placeholder: "Name",
                  },
                  domProps: { value: _vm.data.name },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.data, "name", $event.target.value)
                    },
                  },
                }),
                _vm._v(" "),
                _vm.errors.name
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.name[0])),
                    ])
                  : _vm._e(),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-lg-6 mb-10" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.data.surname,
                      expression: "data.surname",
                    },
                  ],
                  staticClass: "form-control tBoxSize02",
                  attrs: {
                    autocomplete: "off",
                    type: "text",
                    id: "defaultContactFormSurnname",
                    placeholder: "Surname",
                  },
                  domProps: { value: _vm.data.surname },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.data, "surname", $event.target.value)
                    },
                  },
                }),
                _vm._v(" "),
                _vm.errors.surname
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.surname[0])),
                    ])
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row mb-3" }, [
              _c("div", { staticClass: "col-lg-6 mb-10" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.data.email,
                      expression: "data.email",
                    },
                  ],
                  staticClass: "form-control tBoxSize02",
                  attrs: {
                    autocomplete: "off",
                    type: "email",
                    id: "defaultContactFormEmail",
                    placeholder: "E-mail",
                  },
                  domProps: { value: _vm.data.email },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.data, "email", $event.target.value)
                    },
                  },
                }),
                _vm._v(" "),
                _vm.errors.email
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.email[0])),
                    ])
                  : _vm._e(),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-lg-6 mb-10" }, [
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.data.role,
                        expression: "data.role",
                      },
                    ],
                    staticClass: "browser-default custom-select",
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
                          _vm.data,
                          "role",
                          $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        )
                      },
                    },
                  },
                  [
                    _c("option", { attrs: { value: "4" } }, [
                      _vm._v("Product Management"),
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "5" } }, [
                      _vm._v("Shipping"),
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "10" } }, [_vm._v("PXP")]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "19" } }, [
                      _vm._v("Locum Dispenser"),
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "20" } }, [
                      _vm._v("Dispenser"),
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "29" } }, [
                      _vm._v("Locum Pharmacist"),
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "30" } }, [
                      _vm._v("Pharmacist"),
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "35" } }, [
                      _vm._v("Superintendent Pharmacist"),
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "40" } }, [
                      _vm._v("Customer Service"),
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "50" } }, [_vm._v("Admin")]),
                  ]
                ),
                _vm._v(" "),
                _vm.errors.role
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.role[0])),
                    ])
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row mb-3" }, [
              _c("div", { staticClass: "col-lg-6 mb-10" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.data.password,
                      expression: "data.password",
                    },
                  ],
                  staticClass: "form-control tBoxSize02",
                  attrs: {
                    autocomplete: "off",
                    type: "password",
                    name: "password",
                    id: "password",
                    placeholder: "Password",
                  },
                  domProps: { value: _vm.data.password },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.data, "password", $event.target.value)
                    },
                  },
                }),
                _vm._v(" "),
                _vm.errors.password
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.password[0])),
                    ])
                  : _vm._e(),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-lg-6 mb-10" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.data.passwordRepeat,
                      expression: "data.passwordRepeat",
                    },
                  ],
                  staticClass: "form-control tBoxSize02",
                  attrs: {
                    autocomplete: "off",
                    type: "password",
                    name: "password-repeat",
                    id: "passwordRepeat",
                    placeholder: "Repeat Password",
                  },
                  domProps: { value: _vm.data.passwordRepeat },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.data, "passwordRepeat", $event.target.value)
                    },
                  },
                }),
                _vm._v(" "),
                _vm.errors.passwordRepeat
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.passwordRepeat[0])),
                    ])
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btnSize01 secondaryBtn",
                attrs: { type: "submit" },
              },
              [_vm._v("Save")]
            ),
          ]
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
      _c("h3", [_vm._v("New User")]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);