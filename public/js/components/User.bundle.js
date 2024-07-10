webpackJsonp([15],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/user/User.vue":
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
            data: {},
            esaUsers: {},
            password: null,
            passwordFieldVisible: false,
            passwordSecurityStatus: false,
            code: '',
            emailFieldVisible: false,
            loginCodeVisible: false,
            loading: false,
            errors: {},
            userInfo: userInfo
        };
    },
    mounted: function mounted() {
        if (userInfo.id != this.$route.params.id && userInfo.role < 50) {
            this.$router.push('/notallowed');
        } else {
            this.getData();
            this.getPasswordSecurityStatus();
        }
    },

    computed: {
        tableUrl: function tableUrl() {
            return '/inventory/user/' + this.$route.params.id;
        },
        dataUrl: function dataUrl() {
            return '/users/' + this.$route.params.id;
        },
        postUrl: function postUrl() {
            return '/users/' + this.$route.params.id;
        },
        loginAsUrl: function loginAsUrl() {
            return '/login_as/' + this.$route.params.id;
        }
    },
    methods: {
        getData: function getData() {
            var _this = this;

            this.loading = true;

            axios.get(this.dataUrl).then(function (response) {
                _this.data = response.data.data.userData;
                _this.esaUsers = response.data.data.esaUsers;
                _this.loading = false;
            }).catch(function (error) {
                _this.reportError(error);
            });
        },
        getPasswordSecurityStatus: function getPasswordSecurityStatus(id) {
            var _this2 = this;

            axios.get('/users/' + this.$route.params.id + '/2fa-status').then(function (response) {
                _this2.passwordSecurityStatus = response.data.data;
                if (_this2.passwordSecurityStatus) {
                    axios.get('/users/' + _this2.$route.params.id + '/2fa-code').then(function (response) {
                        _this2.code = response.data.data;
                    });
                }
            }).catch(function (error) {
                _this2.reportError(error);
            });
        },
        enable2fa: function enable2fa() {
            var _this3 = this;

            axios.post('/users/' + this.$route.params.id + '/2fa-enable').then(function () {
                _this3.getPasswordSecurityStatus();
            }).catch(function (error) {
                _this3.reportError(error);
            });
        },
        disable2fa: function disable2fa() {
            var _this4 = this;

            axios.post('/users/' + this.$route.params.id + '/2fa-disable').then(function () {
                _this4.getPasswordSecurityStatus();
            }).catch(function (error) {
                _this4.reportError(error);
            });
        },
        togglePasswordChange: function togglePasswordChange() {
            this.passwordFieldVisible = !this.passwordFieldVisible;
        },
        toggleEmailChange: function toggleEmailChange() {
            this.emailFieldVisible = !this.emailFieldVisible;
        },
        toggleLoginCodeChange: function toggleLoginCodeChange() {
            this.loginCodeVisible = !this.loginCodeVisible;
        },
        update: function update() {
            var _this5 = this;

            this.loading = true;

            var postData = {
                name: this.data.name,
                surname: this.data.surname,
                email: this.data.email,
                role: this.data.role,
                inventory_role: this.data.inventory_role,
                shipping_role: this.data.shipping_role,
                default_app: this.data.default_app,
                code: this.data.code,
                esa_user_id: this.data.esa_user_id
            };

            if (this.password) {
                postData.password = this.password;
            }

            axios.post(this.postUrl, postData).then(function (response) {
                _this5.postSuccess(response.data.message);
                _this5.errors = {};
                _this5.loading = false;
            }).catch(function (error) {
                // this.postError(error.response.data.errors);
                _this5.errors = error.response.data.errors;
                _this5.loading = false;
            });
        },
        loginAs: function loginAs() {
            axios.get(this.loginAsUrl).then(function (response) {
                location.reload();
            }).catch(function (error) {
                console.warn(error);
            });
        },
        generateCode: function generateCode(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$%()[]?!:@/';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },

        // toggle2FA(){
        //     axios.post(`/users/${this.$route.params.id}/toggle-2fa`)
        //     .then((response) => {
        //         location.reload();
        //     })
        //     .catch((error) => {
        //         console.warn(error);
        //     })
        // },
        storeCode: function storeCode() {
            this.data.code = this.generateCode(14);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-5fbb4c5d\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/user/User.vue":
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
                return _vm.update.apply(null, arguments)
              }
            }
          },
          [
            _c("h4", { staticClass: "h4 mb-3" }, [_vm._v("User details")]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticStyle: {
                  display: "flex",
                  "justify-content": "space-evenly"
                }
              },
              [
                _c(
                  "div",
                  {
                    staticStyle: {
                      display: "flex",
                      "flex-direction": "column",
                      width: "30%"
                    }
                  },
                  [
                    _c("label", [_vm._v("Name")]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.name,
                          expression: "data.name"
                        }
                      ],
                      staticClass: "form-control tBoxSize02 mb-10",
                      attrs: { type: "text", id: "name", placeholder: "Name" },
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
                      : _vm._e(),
                    _vm._v(" "),
                    _c("label", [_vm._v("Surname")]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.surname,
                          expression: "data.surname"
                        }
                      ],
                      staticClass: "form-control tBoxSize02 mb-10",
                      attrs: {
                        type: "text",
                        id: "surname",
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
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticStyle: {
                      display: "flex",
                      "flex-direction": "column",
                      width: "30%"
                    }
                  },
                  [
                    _vm.userInfo.role >= 50
                      ? _c("label", [_vm._v("ESA User")])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.userInfo.role >= 50
                      ? _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.data.esa_user_id,
                                expression: "data.esa_user_id"
                              }
                            ],
                            staticClass: "browser-default custom-select mb-10",
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
                                  "esa_user_id",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              }
                            }
                          },
                          _vm._l(_vm.esaUsers, function(user) {
                            return _c(
                              "option",
                              { domProps: { value: user.UserID } },
                              [_vm._v(_vm._s(user.Username))]
                            )
                          }),
                          0
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.errors.esa_user_id
                      ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                          _vm._v(_vm._s(_vm.errors.esa_user_id[0]))
                        ])
                      : _vm._e()
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticStyle: {
                      display: "flex",
                      "flex-direction": "column",
                      width: "30%"
                    }
                  },
                  [
                    _c("p", [
                      _vm._v("2FA is Currently "),
                      _vm.passwordSecurityStatus
                        ? _c("b", [_vm._v("Enabled")])
                        : _c("b", [_vm._v("Disabled")]),
                      _vm._v(" for this account.")
                    ]),
                    _vm._v(" "),
                    _vm.passwordSecurityStatus
                      ? _c("div", [
                          _c("div", {
                            domProps: { innerHTML: _vm._s(_vm.code) }
                          }),
                          _vm._v(" "),
                          _c("p", [
                            _vm._v(
                              "This QR code can be scanned by an authenticator app to start using it."
                            )
                          ])
                        ])
                      : _vm._e()
                  ]
                )
              ]
            ),
            _vm._v(" "),
            _c("h4", { staticClass: "h4 mb-3" }, [_vm._v("Role details")]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticStyle: {
                  display: "flex",
                  "justify-content": "space-evenly"
                }
              },
              [
                _c(
                  "div",
                  {
                    staticStyle: {
                      display: "flex",
                      "flex-direction": "column",
                      width: "30%"
                    }
                  },
                  [
                    _c("label", [_vm._v("Pharmacy Role")]),
                    _vm._v(" "),
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
                        staticClass: "browser-default custom-select mb-10",
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
                        _c("option", { attrs: { value: "0" } }, [
                          _vm._v("Not Allowed")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "4" } }, [
                          _vm._v("Product Management")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "5" } }, [
                          _vm._v("Shipping")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "10" } }, [
                          _vm._v("PXP")
                        ]),
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
                        _c("option", { attrs: { value: "50" } }, [
                          _vm._v("Admin")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "60" } }, [
                          _vm._v("Sysadmin")
                        ])
                      ]
                    )
                  ]
                ),
                _vm._v(" "),
                _vm.errors.role
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.role[0]))
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticStyle: {
                      display: "flex",
                      "flex-direction": "column",
                      width: "30%"
                    }
                  },
                  [
                    _c("label", [_vm._v("Inventory Role")]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.data.inventory_role,
                            expression: "data.inventory_role"
                          }
                        ],
                        staticClass: "browser-default custom-select mb-10",
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
                              "inventory_role",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          }
                        }
                      },
                      [
                        _c("option", { attrs: { value: "0" } }, [
                          _vm._v("Not Allowed")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "5" } }, [
                          _vm._v("Shipping")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "6" } }, [
                          _vm._v("Locum Dispenser")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "10" } }, [
                          _vm._v("PXP")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "20" } }, [
                          _vm._v("Dispenser")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "25" } }, [
                          _vm._v("Senior Dispenser")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "30" } }, [
                          _vm._v("Pharmacist")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "40" } }, [
                          _vm._v("Customer Service")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "50" } }, [
                          _vm._v("Admin")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "60" } }, [
                          _vm._v("Sysadmin")
                        ])
                      ]
                    )
                  ]
                ),
                _vm._v(" "),
                _vm.errors.inventory_role
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.role[0]))
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticStyle: {
                      display: "flex",
                      "flex-direction": "column",
                      width: "30%"
                    }
                  },
                  [
                    _c("label", [_vm._v("Shipping Role")]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.data.shipping_role,
                            expression: "data.shipping_role"
                          }
                        ],
                        staticClass: "browser-default custom-select mb-10",
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
                              "shipping_role",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          }
                        }
                      },
                      [
                        _c("option", { attrs: { value: "0" } }, [
                          _vm._v("Not Allowed")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "5" } }, [
                          _vm._v("Shipping")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "10" } }, [
                          _vm._v("PXP")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "20" } }, [
                          _vm._v("Dispenser")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "30" } }, [
                          _vm._v("Pharmacist")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "40" } }, [
                          _vm._v("Customer Service")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "50" } }, [
                          _vm._v("Admin")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "60" } }, [
                          _vm._v("Sysadmin")
                        ])
                      ]
                    )
                  ]
                ),
                _vm._v(" "),
                _vm.errors.shipping_role
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.shipping_role[0]))
                    ])
                  : _vm._e()
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticStyle: {
                  display: "flex",
                  "justify-content": "space-evenly"
                }
              },
              [
                _c(
                  "div",
                  {
                    staticStyle: {
                      display: "flex",
                      "flex-direction": "column",
                      width: "30%"
                    }
                  },
                  [
                    _c("label", [_vm._v("Default Application")]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.data.default_app,
                            expression: "data.default_app"
                          }
                        ],
                        staticClass: "browser-default custom-select mb-10",
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
                              "default_app",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          }
                        }
                      },
                      [
                        _c("option", { attrs: { value: "pharmacy" } }, [
                          _vm._v("Pharmacy")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "inventory" } }, [
                          _vm._v("Inventory")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "shipping" } }, [
                          _vm._v("Shipping")
                        ])
                      ]
                    )
                  ]
                ),
                _vm._v(" "),
                _vm.errors.default_app
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.default_app[0]))
                    ])
                  : _vm._e()
              ]
            ),
            _vm._v(" "),
            _c("transition", { attrs: { name: "fade" } }, [
              _vm.passwordFieldVisible
                ? _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.password,
                        expression: "password"
                      }
                    ],
                    staticClass: "form-control tBoxSize02 mb-3",
                    attrs: {
                      autocomplete: "off",
                      type: "password",
                      name: "new-password",
                      id: "password",
                      placeholder: "Password"
                    },
                    domProps: { value: _vm.password },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.password = $event.target.value
                      }
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.errors.password
                ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                    _vm._v(_vm._s(_vm.errors.password[0]))
                  ])
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("transition", { attrs: { name: "fade" } }, [
              _c("div", [
                _vm.loginCodeVisible
                  ? _c("div", { staticClass: "input-group mb-3" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.data.code,
                            expression: "data.code"
                          }
                        ],
                        staticClass: "form-control tBoxSize02 mb-10",
                        staticStyle: { margin: "0!important" },
                        attrs: {
                          autocomplete: "off",
                          type: "code",
                          name: "code",
                          id: "code",
                          placeholder: "Login Code"
                        },
                        domProps: { value: _vm.data.code },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.data, "code", $event.target.value)
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "input-group-append",
                          staticStyle: { display: "inline" }
                        },
                        [
                          _c(
                            "button",
                            {
                              staticClass:
                                "btn btnSize01 secondaryBtn m-0 z-depth-0 waves-effect",
                              attrs: { type: "button", id: "button-addon2" },
                              on: {
                                click: function($event) {
                                  return _vm.storeCode()
                                }
                              }
                            },
                            [_vm._v("Generate Code")]
                          )
                        ]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.errors.code
                  ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                      _vm._v(_vm._s(_vm.errors.code[0]))
                    ])
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("transition", { attrs: { name: "fade" } }, [
              _vm.emailFieldVisible
                ? _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.data.email,
                        expression: "data.email"
                      }
                    ],
                    staticClass: "form-control tBoxSize02 mb-10",
                    attrs: {
                      type: "email",
                      id: "email",
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
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.errors.email
                ? _c("div", { staticClass: "invalid-feedback d-block" }, [
                    _vm._v(_vm._s(_vm.errors.email[0]))
                  ])
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("div", [
              _c(
                "button",
                {
                  staticClass: "btn btnSize01 secondaryBtn",
                  attrs: { type: "button" },
                  on: { click: _vm.togglePasswordChange }
                },
                [_vm._v("Change password")]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btnSize01 secondaryBtn",
                  attrs: { type: "button" },
                  on: { click: _vm.toggleEmailChange }
                },
                [_vm._v("Change email")]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btnSize01 secondaryBtn",
                  attrs: { type: "button" },
                  on: { click: _vm.toggleLoginCodeChange }
                },
                [_vm._v("Change login code")]
              ),
              _vm._v(" "),
              !_vm.passwordSecurityStatus
                ? _c(
                    "button",
                    {
                      staticClass: "btn btnSize01 secondaryBtn",
                      attrs: { type: "button" },
                      on: { click: _vm.enable2fa }
                    },
                    [_vm._v("Enable 2FA")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.passwordSecurityStatus
                ? _c(
                    "button",
                    {
                      staticClass: "btn btnSize01 secondaryBtn",
                      attrs: { type: "button" },
                      on: { click: _vm.disable2fa }
                    },
                    [_vm._v("Disable 2FA")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.userInfo.role == 60
                ? _c(
                    "button",
                    {
                      staticClass: "btn btnSize01 secondaryBtn",
                      attrs: { type: "button" },
                      on: { click: _vm.loginAs }
                    },
                    [_vm._v("Login as user")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btnSize01 secondaryBtn",
                  attrs: { type: "submit" }
                },
                [_vm._v("Update")]
              )
            ])
          ],
          1
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
      _c("h3", [_vm._v("User details")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5fbb4c5d", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/pages/user/User.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/user/User.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-5fbb4c5d\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/user/User.vue")
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
Component.options.__file = "resources/assets/js/components/pages/user/User.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5fbb4c5d", Component.options)
  } else {
    hotAPI.reload("data-v-5fbb4c5d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});