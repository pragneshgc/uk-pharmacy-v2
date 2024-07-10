webpackJsonp([17],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/setting/Settings.vue":
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
            activeTab: userInfo.role < 50 ? 'application' : 'settings',
            settings: [],
            companySettings: [],
            applicationSettings: localStorage.getItem('settings.application') ? JSON.parse(localStorage.getItem('settings.application')) : { labelPrinter: 'ZDesigner GK420d', deliveryNotePrinter: '' },
            types: {
                1: {
                    name: 'Records Per Page',
                    enabled: true,
                    type: 'number'
                },
                2: {
                    name: 'Delivery Options',
                    enabled: true,
                    type: 'text'
                },
                3: {
                    name: 'Dispenser Limit',
                    enabled: true,
                    type: 'number'
                },
                5: {
                    name: 'PXP Status (LIVE or OFF)',
                    enabled: false,
                    type: 'switch'
                },
                900: {
                    name: 'Hidden',
                    enabled: false,
                    type: 'text'
                }
            },
            hiddenFields: ['ClientID'],
            userInfo: userInfo,
            errors: {},
            update: {},
            companySettingsUpdate: {},
            file: '',
            status: '',
            importing: false,
            printAppOnline: false
        };
    },

    computed: {
        globalSettings: function globalSettings() {
            return this.settings.filter(function (setting) {
                return setting.Type != 2;
            });
        },
        deliveryOptions: function deliveryOptions() {
            return this.settings.filter(function (setting) {
                return setting.Type == 2;
            });
        },
        inputText: function inputText() {
            return this.file != '' ? this.file.name : 'Upload XML';
        },
        buttonText: function buttonText() {
            return this.file != '' ? 'Importing' : 'Upload';
        }
    },
    mounted: function mounted() {
        this.getSettings();
        this.getCompanySettings();
        this.getPrinterList();
    },

    methods: {
        getSettings: function getSettings() {
            var _this = this;

            axios.get('/settings').then(function (response) {
                _this.settings = response.data.data;
                _this.settings.forEach(function (setting) {
                    _this.update[setting.SettingID] = setting.Value;
                });
            }).catch(function (error) {
                _this.postError(error.data.data);
            });
        },
        getCompanySettings: function getCompanySettings() {
            var _this2 = this;

            axios.get('/settings/company').then(function (response) {
                _this2.companySettings = response.data.data;
                _this2.companySettingsUpdate = JSON.parse(JSON.stringify(_this2.companySettings));
            }).catch(function (error) {
                _this2.postError(error.data.data);
            });
        },
        getPrinterList: function getPrinterList() {
            var _this3 = this;

            axios.get('http://localhost:63020').then(function (response) {
                _this3.printAppOnline = response.data;
            }).catch(function (error) {
                _this3.printAppOnline = false;
            });
        },
        updateApplicationSettings: function updateApplicationSettings() {
            var _this4 = this;

            this.$swal({
                title: 'Are you sure you want to update local application settings?',
                text: "Make sure the values you are changing are correct!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update local application settings!'
            }).then(function (result) {
                if (result.value) {
                    localStorage.setItem('settings.application', JSON.stringify(_this4.applicationSettings));
                    _this4.postSuccess('Application settings updated!');
                }
            });
        },
        updateGlobalSettings: function updateGlobalSettings() {
            var _this5 = this;

            this.$swal({
                title: 'Are you sure you want to update global application settings?',
                text: "Make sure the values you are changing are correct!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update global application settings!'
            }).then(function (result) {
                if (result.value) {
                    axios.patch('/settings', _this5.update).then(function (response) {
                        _this5.postSuccess('Global settings updated!');
                    }).catch(function (error) {
                        _this5.postError(error.data.data);
                    });
                }
            });
        },
        updateCompanySettings: function updateCompanySettings() {
            var _this6 = this;

            this.$swal({
                title: 'Are you sure you want to update company settings?',
                text: "Make sure the values you are changing are correct!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update company settings!'
            }).then(function (result) {
                if (result.value) {
                    axios.patch('/settings/company', _this6.companySettingsUpdate).then(function (response) {
                        _this6.postSuccess('Company settings updated!');
                    }).catch(function (error) {
                        _this6.postError(error.data.data);
                    });
                }
            });
        },

        //import
        inputClick: function inputClick() {
            document.getElementById('file').click();
        },
        attachFile: function attachFile() {
            var files = document.getElementById('file').files;
            if (!files.length) {
                return;
            };

            this.file = files[0];
        },
        upload: function upload() {
            var _this7 = this;

            this.importing = true;
            var formData = new FormData();
            formData.append('file', this.file);
            formData.append('option', this.option);

            axios.post('/import/xml', formData, { headers: { 'Content-type': 'multipart/form-data' } }).then(function (response) {
                _this7.status = response.data.message;
                _this7.postSuccess('XML imported successfully');
                document.getElementById("file").value = '';
            }).catch(function (error) {
                _this7.postError(error.response.data.message);
                document.getElementById("file").value = '';
            }).finally(function () {
                _this7.file = '';
                _this7.importing = false;
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-59ae2738\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/setting/Settings.vue":
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
        _c("div", { staticClass: "settings" }, [
          _c("ul", { staticClass: "tabs" }, [
            _vm.userInfo.role >= 50
              ? _c(
                  "li",
                  {
                    class: { active: _vm.activeTab == "settings" },
                    staticStyle: { "margin-left": "0!important" },
                    attrs: {
                      title: "Global settings applied across the application."
                    },
                    on: {
                      click: function($event) {
                        _vm.activeTab = "settings"
                      }
                    }
                  },
                  [
                    _c(
                      "a",
                      {
                        staticClass: "danger",
                        attrs: { href: "javascript:;" }
                      },
                      [_vm._v("Global Settings")]
                    )
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.userInfo.role >= 50
              ? _c(
                  "li",
                  {
                    class: { active: _vm.activeTab == "delivery" },
                    attrs: {
                      title: "Delivery settings applied across all orders"
                    },
                    on: {
                      click: function($event) {
                        _vm.activeTab = "delivery"
                      }
                    }
                  },
                  [
                    _c("a", { attrs: { href: "javascript:;" } }, [
                      _vm._v("Delivery Settings ")
                    ])
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.userInfo.role >= 50
              ? _c(
                  "li",
                  {
                    class: { active: _vm.activeTab == "details" },
                    attrs: {
                      title:
                        "THIS IS THE MAIN COMPANY DETAIL. IF YOU MAKE CHANGES HERE IT WILL AFFECT THE SYSTEM I.E. DELIVERY NOTE"
                    },
                    on: {
                      click: function($event) {
                        _vm.activeTab = "details"
                      }
                    }
                  },
                  [
                    _c("a", { attrs: { href: "javascript:;" } }, [
                      _vm._v("Company Details ")
                    ])
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.userInfo.role >= 50
              ? _c(
                  "li",
                  {
                    class: { active: _vm.activeTab == "import" },
                    attrs: { title: "Manual XML Import" },
                    on: {
                      click: function($event) {
                        _vm.activeTab = "import"
                      }
                    }
                  },
                  [
                    _c("a", { attrs: { href: "javascript:;" } }, [
                      _vm._v("Manual XML Import")
                    ])
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "li",
              {
                class: { active: _vm.activeTab == "application" },
                attrs: { title: "Local Application Settings" },
                on: {
                  click: function($event) {
                    _vm.activeTab = "application"
                  }
                }
              },
              [
                _c("a", { attrs: { href: "javascript:;" } }, [
                  _vm._v("Local Settings")
                ])
              ]
            ),
            _vm._v(" "),
            _c(
              "li",
              {
                class: { active: _vm.activeTab == "downloads" },
                attrs: { title: "Local Application Settings" },
                on: {
                  click: function($event) {
                    _vm.activeTab = "downloads"
                  }
                }
              },
              [
                _c("a", { attrs: { href: "javascript:;" } }, [
                  _vm._v("Documents")
                ])
              ]
            ),
            _vm._v(" "),
            _vm.userInfo.role >= 50
              ? _c(
                  "li",
                  {
                    class: { active: _vm.activeTab == "devsites" },
                    attrs: { title: "Dev Sites" },
                    on: {
                      click: function($event) {
                        _vm.activeTab = "devsites"
                      }
                    }
                  },
                  [
                    _c("a", { attrs: { href: "javascript:;" } }, [
                      _vm._v("Dev Sites")
                    ])
                  ]
                )
              : _vm._e()
          ]),
          _vm._v(" "),
          _vm.activeTab == "settings"
            ? _c("div", { staticClass: "content pxp-form" }, [
                _c("p", { staticClass: "mb-10" }, [
                  _vm._v(
                    "\n                        These settings affect how many records are shown per page, how many orders a dispenser can assign to themselves, etc. \n                    "
                  )
                ]),
                _vm._v(" "),
                _vm._m(1),
                _vm._v(" "),
                _c("hr", { staticClass: "mb-10" }),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "form-column" },
                  _vm._l(_vm.globalSettings, function(setting) {
                    return _c(
                      "div",
                      {
                        key: setting.SettingID,
                        staticClass: "form-group form-group-2"
                      },
                      [
                        _c("label", { attrs: { for: setting.SettingID } }, [
                          _vm._v(_vm._s(setting.Name))
                        ]),
                        _vm._v(" "),
                        _vm.types[setting.Type].type === "checkbox"
                          ? _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.update[setting.SettingID],
                                  expression: "update[setting.SettingID]"
                                }
                              ],
                              staticClass: "form-control mb-3",
                              attrs: {
                                disabled: !_vm.types[setting.Type].enabled,
                                name: setting.SettingID,
                                placeholder: setting.Name,
                                type: "checkbox"
                              },
                              domProps: {
                                checked: Array.isArray(
                                  _vm.update[setting.SettingID]
                                )
                                  ? _vm._i(
                                      _vm.update[setting.SettingID],
                                      null
                                    ) > -1
                                  : _vm.update[setting.SettingID]
                              },
                              on: {
                                change: function($event) {
                                  var $$a = _vm.update[setting.SettingID],
                                    $$el = $event.target,
                                    $$c = $$el.checked ? true : false
                                  if (Array.isArray($$a)) {
                                    var $$v = null,
                                      $$i = _vm._i($$a, $$v)
                                    if ($$el.checked) {
                                      $$i < 0 &&
                                        _vm.$set(
                                          _vm.update,
                                          setting.SettingID,
                                          $$a.concat([$$v])
                                        )
                                    } else {
                                      $$i > -1 &&
                                        _vm.$set(
                                          _vm.update,
                                          setting.SettingID,
                                          $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1))
                                        )
                                    }
                                  } else {
                                    _vm.$set(_vm.update, setting.SettingID, $$c)
                                  }
                                }
                              }
                            })
                          : _vm.types[setting.Type].type === "radio"
                          ? _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.update[setting.SettingID],
                                  expression: "update[setting.SettingID]"
                                }
                              ],
                              staticClass: "form-control mb-3",
                              attrs: {
                                disabled: !_vm.types[setting.Type].enabled,
                                name: setting.SettingID,
                                placeholder: setting.Name,
                                type: "radio"
                              },
                              domProps: {
                                checked: _vm._q(
                                  _vm.update[setting.SettingID],
                                  null
                                )
                              },
                              on: {
                                change: function($event) {
                                  return _vm.$set(
                                    _vm.update,
                                    setting.SettingID,
                                    null
                                  )
                                }
                              }
                            })
                          : _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.update[setting.SettingID],
                                  expression: "update[setting.SettingID]"
                                }
                              ],
                              staticClass: "form-control mb-3",
                              attrs: {
                                disabled: !_vm.types[setting.Type].enabled,
                                name: setting.SettingID,
                                placeholder: setting.Name,
                                type: _vm.types[setting.Type].type
                              },
                              domProps: {
                                value: _vm.update[setting.SettingID]
                              },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.update,
                                    setting.SettingID,
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                        _vm._v(" "),
                        _vm.errors[setting.Name]
                          ? _c(
                              "div",
                              { staticClass: "invalid-feedback d-block" },
                              [_vm._v(_vm._s(_vm.errors[setting.Name][0]))]
                            )
                          : _vm._e()
                      ]
                    )
                  }),
                  0
                ),
                _vm._v(" "),
                _c("div", { staticClass: "form-group form-group-2" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btnSize02 secondaryBtn",
                      on: {
                        click: function($event) {
                          return _vm.updateGlobalSettings()
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                            Update\n                        "
                      )
                    ]
                  )
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.activeTab == "delivery"
            ? _c(
                "div",
                { staticClass: "content pxp-form" },
                [
                  _c("p", { staticClass: "mb-10" }, [
                    _vm._v(
                      "\n                        These settings affect the API connection with various delivery companies \n                    "
                    )
                  ]),
                  _vm._v(" "),
                  _vm._m(2),
                  _vm._v(" "),
                  _c("hr", { staticClass: "mb-10" }),
                  _vm._v(" "),
                  _vm._l(_vm.deliveryOptions, function(setting) {
                    return _c(
                      "div",
                      {
                        key: setting.SettingID,
                        staticClass: "form-group form-group-2"
                      },
                      [
                        _c("label", { attrs: { for: setting.SettingID } }, [
                          _vm._v(_vm._s(setting.Name))
                        ]),
                        _vm._v(" "),
                        _vm.types[setting.Type].type === "checkbox"
                          ? _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.update[setting.SettingID],
                                  expression: "update[setting.SettingID]"
                                }
                              ],
                              staticClass: "form-control mb-3",
                              attrs: {
                                name: setting.SettingID,
                                placeholder: setting.Name,
                                type: "checkbox"
                              },
                              domProps: {
                                checked: Array.isArray(
                                  _vm.update[setting.SettingID]
                                )
                                  ? _vm._i(
                                      _vm.update[setting.SettingID],
                                      null
                                    ) > -1
                                  : _vm.update[setting.SettingID]
                              },
                              on: {
                                change: function($event) {
                                  var $$a = _vm.update[setting.SettingID],
                                    $$el = $event.target,
                                    $$c = $$el.checked ? true : false
                                  if (Array.isArray($$a)) {
                                    var $$v = null,
                                      $$i = _vm._i($$a, $$v)
                                    if ($$el.checked) {
                                      $$i < 0 &&
                                        _vm.$set(
                                          _vm.update,
                                          setting.SettingID,
                                          $$a.concat([$$v])
                                        )
                                    } else {
                                      $$i > -1 &&
                                        _vm.$set(
                                          _vm.update,
                                          setting.SettingID,
                                          $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1))
                                        )
                                    }
                                  } else {
                                    _vm.$set(_vm.update, setting.SettingID, $$c)
                                  }
                                }
                              }
                            })
                          : _vm.types[setting.Type].type === "radio"
                          ? _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.update[setting.SettingID],
                                  expression: "update[setting.SettingID]"
                                }
                              ],
                              staticClass: "form-control mb-3",
                              attrs: {
                                name: setting.SettingID,
                                placeholder: setting.Name,
                                type: "radio"
                              },
                              domProps: {
                                checked: _vm._q(
                                  _vm.update[setting.SettingID],
                                  null
                                )
                              },
                              on: {
                                change: function($event) {
                                  return _vm.$set(
                                    _vm.update,
                                    setting.SettingID,
                                    null
                                  )
                                }
                              }
                            })
                          : _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.update[setting.SettingID],
                                  expression: "update[setting.SettingID]"
                                }
                              ],
                              staticClass: "form-control mb-3",
                              attrs: {
                                name: setting.SettingID,
                                placeholder: setting.Name,
                                type: _vm.types[setting.Type].type
                              },
                              domProps: {
                                value: _vm.update[setting.SettingID]
                              },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.update,
                                    setting.SettingID,
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                        _vm._v(" "),
                        _vm.errors[setting.Name]
                          ? _c(
                              "div",
                              { staticClass: "invalid-feedback d-block" },
                              [_vm._v(_vm._s(_vm.errors[setting.Name][0]))]
                            )
                          : _vm._e()
                      ]
                    )
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btnSize02 secondaryBtn",
                        on: {
                          click: function($event) {
                            return _vm.updateGlobalSettings()
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                            Update\n                        "
                        )
                      ]
                    )
                  ])
                ],
                2
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.activeTab == "details"
            ? _c(
                "div",
                { staticClass: "content pxp-form pxp-form-long" },
                [
                  _c("div", { staticClass: "infoBox warning mb-10" }, [
                    _vm._v(
                      "\n                        THIS IS THE MAIN COMPANY DETAIL. IF YOU MAKE CHANGES HERE IT WILL AFFECT THE SYSTEM I.E. DELIVERY NOTE\n                    "
                    )
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.companySettingsUpdate, function(setting, key) {
                    return !_vm.hiddenFields.includes(key)
                      ? _c(
                          "div",
                          {
                            key: key,
                            staticClass: "form-group form-group-2",
                            staticStyle: { width: "50%" }
                          },
                          [
                            _c("label", { attrs: { for: key } }, [
                              _vm._v(_vm._s(key))
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.companySettingsUpdate[key],
                                  expression: "companySettingsUpdate[key]"
                                }
                              ],
                              staticClass: "form-control mb-3",
                              attrs: { name: key, placeholder: key },
                              domProps: {
                                value: _vm.companySettingsUpdate[key]
                              },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.companySettingsUpdate,
                                    key,
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _vm.errors[key]
                              ? _c(
                                  "div",
                                  { staticClass: "invalid-feedback d-block" },
                                  [_vm._v(_vm._s(_vm.errors[key][0]))]
                                )
                              : _vm._e()
                          ]
                        )
                      : _vm._e()
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btnSize02 secondaryBtn",
                        on: {
                          click: function($event) {
                            return _vm.updateCompanySettings()
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                            Update\n                        "
                        )
                      ]
                    )
                  ])
                ],
                2
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.activeTab == "import"
            ? _c("div", { staticClass: "content" }, [
                _c("div", { staticClass: "infoBox warning" }, [
                  _vm._v(
                    "\n                        PLEASE, DOUBLE CHECK THE XML DATA BEFORE IMPORTING!\n                    "
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "input-container mt-20" }, [
                  _c("input", {
                    ref: "file",
                    attrs: {
                      type: "file",
                      name: "tracking",
                      id: "file",
                      accept: ".xml"
                    },
                    on: { change: _vm.attachFile }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "input-mask",
                      on: { click: _vm.inputClick }
                    },
                    [
                      _c("button", { staticClass: "browse-btn" }, [
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.buttonText) +
                            "\n                            "
                        )
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "file-info" }, [
                        _vm._v(_vm._s(_vm.inputText))
                      ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _vm.status != ""
                  ? _c("section", {
                      staticClass: "text-center infoBox success mt-10",
                      domProps: { innerHTML: _vm._s(_vm.status) }
                    })
                  : _vm._e(),
                _vm._v(" "),
                _c("section", { staticClass: "text-center" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btnSize01 tertiaryBtn bigButton mt-10",
                      attrs: { disabled: _vm.importing || _vm.file == "" },
                      on: { click: _vm.upload }
                    },
                    [
                      _vm.importing
                        ? _c("div", { staticClass: "loader" }, [
                            _vm._v("Loading...")
                          ])
                        : _c("span", [_vm._v("Import")])
                    ]
                  )
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.activeTab == "application"
            ? _c("div", { staticClass: "content pxp-form" }, [
                _c("p", { staticClass: "mb-10" }, [
                  _vm._v(
                    "\n                        Make sure the name of the printer is same as reported by system. If not the application will use the systems default printer. \n                    "
                  )
                ]),
                _vm._v(" "),
                _vm._m(3),
                _vm._v(" "),
                _c("hr", { staticClass: "mb-10" }),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  !_vm.printAppOnline
                    ? _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "labelPrinter" } }, [
                          _vm._v("Label Printer")
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.applicationSettings.labelPrinter,
                              expression: "applicationSettings.labelPrinter"
                            }
                          ],
                          staticClass: "form-control mb-3",
                          attrs: {
                            type: "text",
                            id: "labelPrinter",
                            placeholder: "Default system printer"
                          },
                          domProps: {
                            value: _vm.applicationSettings.labelPrinter
                          },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.applicationSettings,
                                "labelPrinter",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ])
                    : _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "labelPrinter" } }, [
                          _vm._v("Label Printer")
                        ]),
                        _vm._v(" "),
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.applicationSettings.labelPrinter,
                                expression: "applicationSettings.labelPrinter"
                              }
                            ],
                            attrs: {
                              name: "labelPrinter",
                              id: "labelPrinter",
                              placeholder: "Default system printer"
                            },
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
                                  _vm.applicationSettings,
                                  "labelPrinter",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              }
                            }
                          },
                          [
                            _c("option", { attrs: { value: "" } }, [
                              _vm._v("Default")
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.printAppOnline, function(value, key) {
                              return _c(
                                "option",
                                { key: key, domProps: { value: value } },
                                [_vm._v(_vm._s(value))]
                              )
                            })
                          ],
                          2
                        )
                      ]),
                  _vm._v(" "),
                  !_vm.printAppOnline
                    ? _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "deliveryNotePrinter" } }, [
                          _vm._v("Delivery Note Printer")
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value:
                                _vm.applicationSettings.deliveryNotePrinter,
                              expression:
                                "applicationSettings.deliveryNotePrinter"
                            }
                          ],
                          staticClass: "form-control mb-3",
                          attrs: {
                            type: "text",
                            id: "deliveryNotePrinter",
                            placeholder: "Default system printer"
                          },
                          domProps: {
                            value: _vm.applicationSettings.deliveryNotePrinter
                          },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.applicationSettings,
                                "deliveryNotePrinter",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ])
                    : _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "labelPrinter" } }, [
                          _vm._v("Delivery Note Printer")
                        ]),
                        _vm._v(" "),
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value:
                                  _vm.applicationSettings.deliveryNotePrinter,
                                expression:
                                  "applicationSettings.deliveryNotePrinter"
                              }
                            ],
                            attrs: {
                              name: "deliveryNotePrinter",
                              id: "deliveryNotePrinter",
                              placeholder: "Default system printer"
                            },
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
                                  _vm.applicationSettings,
                                  "deliveryNotePrinter",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              }
                            }
                          },
                          [
                            _c("option", { attrs: { value: "" } }, [
                              _vm._v("Default")
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.printAppOnline, function(value, key) {
                              return _c(
                                "option",
                                { key: key, domProps: { value: value } },
                                [_vm._v(_vm._s(value))]
                              )
                            })
                          ],
                          2
                        )
                      ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btnSize02 secondaryBtn",
                        on: {
                          click: function($event) {
                            return _vm.updateApplicationSettings()
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                                Update\n                            "
                        )
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _vm.userInfo.role >= 50
                    ? _c("hr", { staticClass: "mb-10" })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.userInfo.role >= 50
                    ? _c("div", { staticClass: "form-group form-group-2" }, [
                        _vm._m(4)
                      ])
                    : _vm._e()
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.activeTab == "downloads"
            ? _c("div", { staticClass: "content pxp-form" }, [
                _c("p", { staticClass: "mb-10" }, [
                  _vm._v(
                    "\n                        Below you can download or view any pharmacy related document\n                    "
                  )
                ]),
                _vm._v(" "),
                _c("hr"),
                _vm._v(" "),
                _c("br"),
                _vm._v(" "),
                _vm._m(5)
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.activeTab == "devsites"
            ? _c("div", { staticClass: "content pxp-form" }, [
                _c("p", { staticClass: "mb-10" }, [
                  _vm._v(
                    "\n                        Below is a list of all active dev sites\n                    "
                  )
                ]),
                _vm._v(" "),
                _c("hr"),
                _vm._v(" "),
                _c("br"),
                _vm._v(" "),
                _vm._m(6)
              ])
            : _vm._e()
        ])
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
      _c("h3", [_vm._v("Settings")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "mb-10" }, [
      _c("b", [_vm._v("These are global settings and affect all users!")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "mb-10" }, [
      _c("b", [
        _vm._v("These are global settings and affect the entire application!")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "mb-10" }, [
      _c("b", [
        _vm._v(
          "These settings only affect the local PC, and any user using the local PC"
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("a", { attrs: { href: "/download/printer" } }, [
      _c("button", { staticClass: "btn btnSize02 secondaryBtn" }, [
        _vm._v(
          "\n                                    Download printer application "
        ),
        _c("small", [_vm._v("(0.3.0)")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ul", { staticClass: "list-group" }, [
      _c("li", { staticClass: "list-group-item" }, [
        _c("p", [
          _vm._v("Blank Pathology Form ("),
          _c("a", { attrs: { target: "_blank", href: "/download/form" } }, [
            _vm._v("download")
          ]),
          _vm._v("/"),
          _c("a", { attrs: { target: "_blank", href: "/view/form" } }, [
            _vm._v("view")
          ]),
          _vm._v(")")
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ul", { staticClass: "list-group" }, [
      _c("li", { staticClass: "list-group-item" }, [
        _c("a", { attrs: { href: "https://old.esasys.co.uk" } }, [
          _vm._v("old.esasys.co.uk - Old ESA")
        ])
      ]),
      _vm._v(" "),
      _c("li", { staticClass: "list-group-item" }, [
        _c("a", { attrs: { href: "https://dev.esasys.co.uk" } }, [
          _vm._v("dev.esasys.co.uk - Old ESA Dev")
        ])
      ]),
      _vm._v(" "),
      _c("li", { staticClass: "list-group-item" }, [
        _c("a", { attrs: { href: "https://pharmacist.4sm-dev.xyz/" } }, [
          _vm._v("pharmacist.4sm-dev.xyz - ESA Dev")
        ])
      ]),
      _vm._v(" "),
      _c("li", { staticClass: "list-group-item" }, [
        _c("a", { attrs: { href: "https://inventory.4sm-dev.xyz" } }, [
          _vm._v("inventory.4sm-dev.xyz - Inventory Dev")
        ])
      ]),
      _vm._v(" "),
      _c("li", { staticClass: "list-group-item" }, [
        _c("a", { attrs: { href: "https://pxp.4sm-dev.xyz" } }, [
          _vm._v("pxp.4sm-dev.xyz - PXP Dev")
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-59ae2738", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/pages/setting/Settings.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/setting/Settings.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-59ae2738\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/setting/Settings.vue")
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
Component.options.__file = "resources/assets/js/components/pages/setting/Settings.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-59ae2738", Component.options)
  } else {
    hotAPI.reload("data-v-59ae2738", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});