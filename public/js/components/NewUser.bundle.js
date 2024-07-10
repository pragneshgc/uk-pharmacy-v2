webpackJsonp([16],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/user/NewUser.vue":
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
            }).catch(function (error) {
                _this.errors = error.response.data.errors;
                _this.loading = false;
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

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-78238e2e\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/user/NewUser.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
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
              submit: function($event) {
                $event.preventDefault()
                return _vm.save.apply(null, arguments)
              }
            }
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
                      expression: "data.name"
                    }
                  ],
                  staticClass: "form-control tBoxSize02",
                  attrs: {
                    valid: "",
                    autocomplete: "off",
                    type: "text",
                    id: "defaultContactFormName",
                    placeholder: "Name"
                  },
                  domProps: { value: _vm.data.name },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.data, "name", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                _vm.errors.name
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.name[0]))
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-lg-6 mb-10" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.data.surname,
                      expression: "data.surname"
                    }
                  ],
                  staticClass: "form-control tBoxSize02",
                  attrs: {
                    autocomplete: "off",
                    type: "text",
                    id: "defaultContactFormSurnname",
                    placeholder: "Surname"
                  },
                  domProps: { value: _vm.data.surname },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.data, "surname", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                _vm.errors.surname
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.surname[0]))
                    ])
                  : _vm._e()
              ])
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
                      expression: "data.email"
                    }
                  ],
                  staticClass: "form-control tBoxSize02",
                  attrs: {
                    autocomplete: "off",
                    type: "email",
                    id: "defaultContactFormEmail",
                    placeholder: "E-mail"
                  },
                  domProps: { value: _vm.data.email },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.data, "email", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                _vm.errors.email
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.email[0]))
                    ])
                  : _vm._e()
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
                        expression: "data.role"
                      }
                    ],
                    staticClass: "browser-default custom-select",
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
                          _vm.data,
                          "role",
                          $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        )
                      }
                    }
                  },
                  [
                    _c("option", { attrs: { value: "4" } }, [
                      _vm._v("Product Management")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "5" } }, [
                      _vm._v("Shipping")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "10" } }, [_vm._v("PXP")]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "19" } }, [
                      _vm._v("Locum Dispenser")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "20" } }, [
                      _vm._v("Dispenser")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "29" } }, [
                      _vm._v("Locum Pharmacist")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "30" } }, [
                      _vm._v("Pharmacist")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "35" } }, [
                      _vm._v("Superintendent Pharmacist")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "40" } }, [
                      _vm._v("Customer Service")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "50" } }, [_vm._v("Admin")])
                  ]
                ),
                _vm._v(" "),
                _vm.errors.role
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.role[0]))
                    ])
                  : _vm._e()
              ])
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
                      expression: "data.password"
                    }
                  ],
                  staticClass: "form-control tBoxSize02",
                  attrs: {
                    autocomplete: "off",
                    type: "password",
                    name: "password",
                    id: "password",
                    placeholder: "Password"
                  },
                  domProps: { value: _vm.data.password },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.data, "password", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                _vm.errors.password
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.password[0]))
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-lg-6 mb-10" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.data.passwordRepeat,
                      expression: "data.passwordRepeat"
                    }
                  ],
                  staticClass: "form-control tBoxSize02",
                  attrs: {
                    autocomplete: "off",
                    type: "password",
                    name: "password-repeat",
                    id: "passwordRepeat",
                    placeholder: "Repeat Password"
                  },
                  domProps: { value: _vm.data.passwordRepeat },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.data, "passwordRepeat", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                _vm.errors.passwordRepeat
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.passwordRepeat[0]))
                    ])
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btnSize01 secondaryBtn",
                attrs: { type: "submit" }
              },
              [_vm._v("Save")]
            )
          ]
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
    return _c("div", { staticClass: "card-header" }, [
      _c("h3", [_vm._v("New User")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-78238e2e", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/pages/user/NewUser.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/user/NewUser.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-78238e2e\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/user/NewUser.vue")
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
Component.options.__file = "resources/assets/js/components/pages/user/NewUser.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-78238e2e", Component.options)
  } else {
    hotAPI.reload("data-v-78238e2e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});