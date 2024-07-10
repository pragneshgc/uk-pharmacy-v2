webpackJsonp([3],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/client/New.vue":
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
            countries: [],
            errors: {},
            loading: false,
            userInfo: userInfo
        };
    },
    mounted: function mounted() {
        if (userInfo.id != this.$route.params.id && userInfo.role < 50) {
            this.$router.push('/notallowed');
        } else {
            this.getCountries();
        }
    },

    computed: {
        postUrl: function postUrl() {
            return '/clients';
        }
    },
    methods: {
        /**
         * Filters
         */
        getCountries: function getCountries() {
            var _this = this;

            this.loading = true;

            axios.get('/countries').then(function (response) {
                _this.countries = response.data.data;
            }).catch(function (error) {
                _this.postError(error.response.data.message);
            }).finally(function () {
                _this.loading = false;
            });
        },

        save: function save() {
            var _this2 = this;

            this.loading = true;

            axios.post(this.postUrl, this.data).then(function (response) {
                _this2.postSuccess(response.data.message);
                _this2.errors = {};
            }).catch(function (error) {
                _this2.errors = error.response.data.errors;
                _this2.postError(error.response.data.message);
            }).finally(function () {
                _this2.loading = false;
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/doctor/New.vue":
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
            countries: [],
            errors: {},
            loading: false,
            userInfo: userInfo
        };
    },
    mounted: function mounted() {
        if (userInfo.id != this.$route.params.id && userInfo.role < 50) {
            this.$router.push('/notallowed');
        } else {
            this.getCountries();
        }
    },

    computed: {
        dataUrl: function dataUrl() {
            return '/doctors/' + this.$route.params.id;
        },
        postUrl: function postUrl() {
            return '/doctors';
        }
    },
    methods: {
        /**
         * Filters
         */
        getCountries: function getCountries() {
            var _this = this;

            this.loading = true;

            axios.get('/countries').then(function (response) {
                _this.countries = response.data.data;
            }).catch(function (error) {
                _this.postError(error.response.data.message);
            }).finally(function () {
                _this.loading = false;
            });
        },

        save: function save() {
            var _this2 = this;

            this.loading = true;

            axios.post(this.postUrl, this.data).then(function (response) {
                _this2.postSuccess(response.data.message);
                _this2.errors = {};
                _this2.$router.push({ name: 'prescriber', params: { id: response.data.data } });
            }).catch(function (error) {
                _this2.errors = error.response.data.errors;
                _this2.postError(error.response.data.message);
            }).finally(function () {
                _this2.loading = false;
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

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-673c6efe\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/client/New.vue":
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
            _c(
              "div",
              {
                staticClass: "pxp-form wow fadeIn",
                staticStyle: { height: "auto" }
              },
              [
                _vm._m(1),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _vm._m(2),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.CompanyName,
                          expression: "data.CompanyName"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "CompanyName",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Company Name"
                      },
                      domProps: { value: _vm.data.CompanyName },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "CompanyName", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _vm._m(3),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.TradingName,
                          expression: "data.TradingName"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "TradingName",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Trading Name"
                      },
                      domProps: { value: _vm.data.TradingName },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "TradingName", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Title" } }, [
                      _vm._v("Contact Title")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Title,
                          expression: "data.Title"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Title",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Contact Title"
                      },
                      domProps: { value: _vm.data.Title },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Title", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Name" } }, [_vm._v("Name")]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Name,
                          expression: "data.Name"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Name",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Name"
                      },
                      domProps: { value: _vm.data.Name },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Name", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Surname" } }, [
                      _vm._v("Surname")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Surname,
                          expression: "data.Surname"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Surname",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Surname"
                      },
                      domProps: { value: _vm.data.Surname },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Surname", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "ITName" } }, [
                      _vm._v("Technical Name")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.ITName,
                          expression: "data.ITName"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "ITName",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Technical Name"
                      },
                      domProps: { value: _vm.data.ITName },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "ITName", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "ITEmail" } }, [
                      _vm._v("Technical Email")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.ITEmail,
                          expression: "data.ITEmail"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "ITEmail",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Technical Email"
                      },
                      domProps: { value: _vm.data.ITEmail },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "ITEmail", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }),
                _vm._v(" "),
                _vm._m(4),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Address1" } }, [
                      _vm._v("Address Line 1")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Address1,
                          expression: "data.Address1"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Address1",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Address Line 1"
                      },
                      domProps: { value: _vm.data.Address1 },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Address1", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Address2" } }, [
                      _vm._v("Address Line 2")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Address2,
                          expression: "data.Address2"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Address2",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Address Line 2"
                      },
                      domProps: { value: _vm.data.Address2 },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Address2", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Address3" } }, [
                      _vm._v("Address Line 3")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Address3,
                          expression: "data.Address3"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Address3",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Address Line 3"
                      },
                      domProps: { value: _vm.data.Address3 },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Address3", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Address4" } }, [
                      _vm._v("Address Line 4")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Address4,
                          expression: "data.Address4"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Address4",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Address Line 4"
                      },
                      domProps: { value: _vm.data.Address4 },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Address4", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Postcode" } }, [
                      _vm._v("Postcode")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Postcode,
                          expression: "data.Postcode"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Postcode",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Postcode"
                      },
                      domProps: { value: _vm.data.Postcode },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Postcode", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "CountryID" } }, [
                      _vm._v("Country")
                    ]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.data.CountryID,
                            expression: "data.CountryID"
                          }
                        ],
                        staticClass: "browser-default custom-select",
                        attrs: { name: "CountryID" },
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
                              "CountryID",
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
                          {
                            key: country.CountryID,
                            domProps: { value: country.CountryID }
                          },
                          [_vm._v(_vm._s(country.Name))]
                        )
                      }),
                      0
                    )
                  ])
                ]),
                _vm._v(" "),
                _vm._m(5),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Telephone" } }, [
                      _vm._v("Telephone")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Telephone,
                          expression: "data.Telephone"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Telephone",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Telephone"
                      },
                      domProps: { value: _vm.data.Telephone },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Telephone", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Mobile" } }, [
                      _vm._v("Mobile")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Mobile,
                          expression: "data.Mobile"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Mobile",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Mobile"
                      },
                      domProps: { value: _vm.data.Mobile },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Mobile", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Email" } }, [_vm._v("Email")]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Email,
                          expression: "data.Email"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Email",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Email"
                      },
                      domProps: { value: _vm.data.Email },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Email", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "GMCNO" } }, [
                      _vm._v("GPHC Number")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.GMCNO,
                          expression: "data.GMCNO"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "GMCNO",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "GPHC Number"
                      },
                      domProps: { value: _vm.data.GMCNO },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "GMCNO", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "CompanyNumber" } }, [
                      _vm._v("Company Number")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.CompanyNumber,
                          expression: "data.CompanyNumber"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "CompanyNumber",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Company Number"
                      },
                      domProps: { value: _vm.data.CompanyNumber },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.data,
                            "CompanyNumber",
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
                    _c("label", { attrs: { for: "CreditLimit" } }, [
                      _vm._v("Credit Limit")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.CreditLimit,
                          expression: "data.CreditLimit"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "CreditLimit",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Credit Limit"
                      },
                      domProps: { value: _vm.data.CreditLimit },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "CreditLimit", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "IP" } }, [_vm._v("IP")]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.IP,
                          expression: "data.IP"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "IP",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "IP"
                      },
                      domProps: { value: _vm.data.IP },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "IP", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Status" } }, [
                      _vm._v("Status")
                    ]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.data.Status,
                            expression: "data.Status"
                          }
                        ],
                        staticClass: "browser-default custom-select",
                        attrs: { name: "Status" },
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
                              "Status",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          }
                        }
                      },
                      [
                        _c("option", { domProps: { value: 0 } }, [
                          _vm._v("Inactive")
                        ]),
                        _vm._v(" "),
                        _c("option", { domProps: { value: 1 } }, [
                          _vm._v("Active")
                        ])
                      ]
                    )
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
                          value: _vm.data.VAT,
                          expression: "data.VAT"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "VAT",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "VAT"
                      },
                      domProps: { value: _vm.data.VAT },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "VAT", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Notes" } }, [_vm._v("Notes")]),
                    _vm._v(" "),
                    _c("textarea", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Notes,
                          expression: "data.Notes"
                        }
                      ],
                      staticClass: "form-control tBoxSize02",
                      staticStyle: {
                        "min-width": "300px",
                        "min-height": "60px",
                        "line-height": "1"
                      },
                      attrs: { placeholder: "Add notes for prescriber here" },
                      domProps: { value: _vm.data.Notes },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Notes", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Additional Comments" } }, [
                      _vm._v("Additional Comments")
                    ]),
                    _vm._v(" "),
                    _c("textarea", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.AdditionalComment,
                          expression: "data.AdditionalComment"
                        }
                      ],
                      staticClass: "form-control tBoxSize02",
                      staticStyle: {
                        "min-width": "300px",
                        "min-height": "60px",
                        "line-height": "1"
                      },
                      attrs: { placeholder: "Additional Comments" },
                      domProps: { value: _vm.data.AdditionalComment },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.data,
                            "AdditionalComment",
                            $event.target.value
                          )
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }),
                _vm._v(" "),
                _vm._m(6),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Username" } }, [
                      _vm._v("API Username")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Username,
                          expression: "data.Username"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Username",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Username"
                      },
                      domProps: { value: _vm.data.Username },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Username", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Password" } }, [
                      _vm._v("API Password")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Password,
                          expression: "data.Password"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Password",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Password"
                      },
                      domProps: { value: _vm.data.Password },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Password", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "ReturnURL" } }, [
                      _vm._v("Return URL")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.ReturnURL,
                          expression: "data.ReturnURL"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "ReturnURL",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Return URL"
                      },
                      domProps: { value: _vm.data.ReturnURL },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "ReturnURL", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "ReturnUsername" } }, [
                      _vm._v("API Return Username")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.ReturnUsername,
                          expression: "data.ReturnUsername"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "ReturnUsername",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Return Username"
                      },
                      domProps: { value: _vm.data.ReturnUsername },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.data,
                            "ReturnUsername",
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
                    _c("label", { attrs: { for: "ReturnPassword" } }, [
                      _vm._v("API Return Password")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.ReturnPassword,
                          expression: "data.ReturnPassword"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "ReturnPassword",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Return Password"
                      },
                      domProps: { value: _vm.data.ReturnPassword },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.data,
                            "ReturnPassword",
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
                    _c("label", { attrs: { for: "APIKey" } }, [
                      _vm._v("API Key")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.APIKey,
                          expression: "data.APIKey"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        disabled: true,
                        name: "APIKey",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "API Key"
                      },
                      domProps: { value: _vm.data.APIKey },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "APIKey", $event.target.value)
                        }
                      }
                    })
                  ])
                ])
              ]
            ),
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
      _c("h3", [_vm._v("New Client")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-row" }, [
      _c("h3", { staticClass: "m-10" }, [_vm._v("General Information")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "CompanyName" } }, [
      _vm._v("Company Name "),
      _c("small", [
        _c("span", [_vm._v("(required)")]),
        _vm._v(" shows on In-tray, Invoice page")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "TradingName" } }, [
      _vm._v("Trading Name "),
      _c("small", [_vm._v("(shows on printed prescription)")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-row" }, [
      _c("h3", { staticClass: "m-10" }, [_vm._v("Address Information")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-row" }, [
      _c("h3", { staticClass: "m-10" }, [_vm._v("Company Information")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-row" }, [
      _c("h3", { staticClass: "m-10" }, [_vm._v("API Information")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-673c6efe", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6ba07852\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/doctor/New.vue":
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
            _c(
              "div",
              {
                staticClass: "pxp-form wow fadeIn",
                staticStyle: { height: "auto!important" }
              },
              [
                _vm._m(1),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Name" } }, [_vm._v("Name")]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Name,
                          expression: "data.Name"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Name",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Name"
                      },
                      domProps: { value: _vm.data.Name },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Name", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Surname" } }, [
                      _vm._v("Surname")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Surname,
                          expression: "data.Surname"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Surname",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Surname"
                      },
                      domProps: { value: _vm.data.Surname },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Surname", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "ClientID" } }, [
                      _vm._v("Prescriber Registration Type")
                    ]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.data.DoctorType,
                            expression: "data.DoctorType"
                          }
                        ],
                        staticClass: "browser-default custom-select",
                        attrs: { name: "DoctorType" },
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
                              "DoctorType",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          }
                        }
                      },
                      [
                        _c(
                          "option",
                          { attrs: { disabled: "" }, domProps: { value: 0 } },
                          [_vm._v("Select Prescriber Registration Type")]
                        ),
                        _vm._v(" "),
                        _c("option", { domProps: { value: 1 } }, [
                          _vm._v("GMC")
                        ]),
                        _vm._v(" "),
                        _c("option", { domProps: { value: 2 } }, [
                          _vm._v("EU")
                        ]),
                        _vm._v(" "),
                        _c("option", { domProps: { value: 3 } }, [
                          _vm._v("GPhC")
                        ]),
                        _vm._v(" "),
                        _c("option", { domProps: { value: 4 } }, [
                          _vm._v("Test")
                        ]),
                        _vm._v(" "),
                        _c("option", { domProps: { value: 5 } }, [
                          _vm._v("IMC")
                        ])
                      ]
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "GMCNO" } }, [
                      _vm._v("Registration Number")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.GMCNO,
                          expression: "data.GMCNO"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "GMCNO",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Registration Number"
                      },
                      domProps: { value: _vm.data.GMCNO },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "GMCNO", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "MedicalInsuranceNo" } }, [
                      _vm._v("Medical insurance number")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.MedicalInsuranceNo,
                          expression: "data.MedicalInsuranceNo"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "MedicalInsuranceNo",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Medical insurance number"
                      },
                      domProps: { value: _vm.data.MedicalInsuranceNo },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.data,
                            "MedicalInsuranceNo",
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
                    _c("label", { attrs: { for: "CompanyName" } }, [
                      _vm._v("Company Name")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.CompanyName,
                          expression: "data.CompanyName"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "CompanyName",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Company Name"
                      },
                      domProps: { value: _vm.data.CompanyName },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "CompanyName", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Title" } }, [
                      _vm._v("Contact Title")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Title,
                          expression: "data.Title"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Title",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Contact Title"
                      },
                      domProps: { value: _vm.data.Title },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Title", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Status" } }, [
                      _vm._v("Status")
                    ]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.data.Status,
                            expression: "data.Status"
                          }
                        ],
                        staticClass: "browser-default custom-select",
                        attrs: { name: "Status" },
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
                              "Status",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          }
                        }
                      },
                      [
                        _c("option", { domProps: { value: 0 } }, [
                          _vm._v("Inactive")
                        ]),
                        _vm._v(" "),
                        _c("option", { domProps: { value: 1 } }, [
                          _vm._v("Active")
                        ])
                      ]
                    )
                  ])
                ]),
                _vm._v(" "),
                _vm._m(2),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "CountryID" } }, [
                      _vm._v("Country")
                    ]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.data.CountryID,
                            expression: "data.CountryID"
                          }
                        ],
                        staticClass: "browser-default custom-select",
                        attrs: { name: "CountryID" },
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
                              "CountryID",
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
                          {
                            key: country.CountryID,
                            domProps: { value: country.CountryID }
                          },
                          [_vm._v(_vm._s(country.Name))]
                        )
                      }),
                      0
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Address1" } }, [
                      _vm._v("Address Line 1")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Address1,
                          expression: "data.Address1"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Address1",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Address Line 1"
                      },
                      domProps: { value: _vm.data.Address1 },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Address1", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Address2" } }, [
                      _vm._v("Address Line 2")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Address2,
                          expression: "data.Address2"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Address2",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Address Line 2"
                      },
                      domProps: { value: _vm.data.Address2 },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Address2", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Address3" } }, [
                      _vm._v("Address Line 3")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Address3,
                          expression: "data.Address3"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Address3",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Address Line 3"
                      },
                      domProps: { value: _vm.data.Address3 },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Address3", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Address4" } }, [
                      _vm._v("Address Line 4")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Address4,
                          expression: "data.Address4"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Address4",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Address Line 4"
                      },
                      domProps: { value: _vm.data.Address4 },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Address4", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Postcode" } }, [
                      _vm._v("Postcode")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Postcode,
                          expression: "data.Postcode"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Postcode",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Postcode"
                      },
                      domProps: { value: _vm.data.Postcode },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Postcode", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _vm._m(3),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Telephone" } }, [
                      _vm._v("Telephone")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Telephone,
                          expression: "data.Telephone"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Telephone",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Telephone"
                      },
                      domProps: { value: _vm.data.Telephone },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Telephone", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Mobile" } }, [
                      _vm._v("Mobile")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Mobile,
                          expression: "data.Mobile"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Mobile",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Mobile"
                      },
                      domProps: { value: _vm.data.Mobile },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Mobile", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Email" } }, [_vm._v("Email")]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Email,
                          expression: "data.Email"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Email",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Email"
                      },
                      domProps: { value: _vm.data.Email },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Email", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Username" } }, [
                      _vm._v("Username")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Username,
                          expression: "data.Username"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Username",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Username"
                      },
                      domProps: { value: _vm.data.Username },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Username", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Password" } }, [
                      _vm._v("Password")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Password,
                          expression: "data.Password"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        name: "Password",
                        autocomplete: "off",
                        type: "text",
                        placeholder: "Password"
                      },
                      domProps: { value: _vm.data.Password },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Password", $event.target.value)
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-column" }, [
                  _c("div", { staticClass: "form-group form-group-2" }, [
                    _c("label", { attrs: { for: "Notes" } }, [_vm._v("Notes")]),
                    _vm._v(" "),
                    _c("textarea", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.data.Notes,
                          expression: "data.Notes"
                        }
                      ],
                      staticClass: "form-control tBoxSize02",
                      staticStyle: {
                        "min-width": "300px",
                        "min-height": "60px",
                        "line-height": "1"
                      },
                      attrs: { placeholder: "Add notes for prescriber here" },
                      domProps: { value: _vm.data.Notes },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.data, "Notes", $event.target.value)
                        }
                      }
                    })
                  ])
                ])
              ]
            ),
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
      _c("h3", [_vm._v("New Prescriber")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-row" }, [
      _c("h3", { staticClass: "m-10" }, [_vm._v("Basic Information")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-row" }, [
      _c("h3", { staticClass: "m-10" }, [_vm._v("Address Information")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-row" }, [
      _c("h3", { staticClass: "m-10" }, [_vm._v("Contact & Login Information")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6ba07852", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/pages/client/New.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/client/New.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-673c6efe\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/client/New.vue")
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
Component.options.__file = "resources/assets/js/components/pages/client/New.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-673c6efe", Component.options)
  } else {
    hotAPI.reload("data-v-673c6efe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/pages/doctor/New.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/doctor/New.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6ba07852\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/doctor/New.vue")
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
Component.options.__file = "resources/assets/js/components/pages/doctor/New.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6ba07852", Component.options)
  } else {
    hotAPI.reload("data-v-6ba07852", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});