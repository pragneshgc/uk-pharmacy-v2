webpackJsonp([25],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/blacklist/New.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Reports = __webpack_require__("./resources/assets/js/components/pages/Reports.vue");

var _Reports2 = _interopRequireDefault(_Reports);

var _errors = __webpack_require__("./resources/assets/js/mixins/errors.js");

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    extends: _Reports2.default,
    data: function data() {
        return {};
    },
    mixins: [_errors2.default],
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

            axios.post('/blacklist', { ids: this.checked }).then(function (response) {
                _this3.postSuccess('Added blacklist entry');
                _this3.$store.commit('replaceChecked', []);
            }).catch(function (error) {
                _this3.postError(error.response.data.message);
            });
        },
        clearChecked: function clearChecked() {
            this.$store.commit('replaceChecked', []);
        }
    }
};

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6f720088\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/blacklist/New.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
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
              attrs: { tag: "button", to: "/blacklist", exact: "" }
            },
            [
              _vm._v(
                "\n                    Return to blacklist\n                "
              )
            ]
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
                    "AirwayBillNumber"
                  ],
                  filters: _vm.filters,
                  "column-map": _vm.columnMap,
                  "not-orderable": ["Products"],
                  "load-on-startup": false
                },
                scopedSlots: _vm._u([
                  {
                    key: "toppagination",
                    fn: function() {
                      return [
                        _c(
                          "div",
                          {
                            staticClass: "pl-5",
                            staticStyle: {
                              display: "flex",
                              "align-items": "center"
                            }
                          },
                          [
                            _vm.checked.length > 0
                              ? _c("div", { staticClass: "check-options" }, [
                                  _c(
                                    "button",
                                    {
                                      staticClass: "btn btnSize02 secondaryBtn",
                                      on: {
                                        click: function($event) {
                                          return _vm.addToBlacklist()
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                                        Blacklist " +
                                          _vm._s(_vm.checked.length) +
                                          " orders\n                                    "
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "button",
                                    {
                                      staticClass: "btn btnSize02 secondaryBtn",
                                      on: {
                                        click: function($event) {
                                          return _vm.clearChecked()
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                                        Clear checked\n                                    "
                                      )
                                    ]
                                  )
                                ])
                              : _vm._e()
                          ]
                        )
                      ]
                    },
                    proxy: true
                  },
                  {
                    key: "thfilter",
                    fn: function() {
                      return [
                        _c("div", [
                          _c(
                            "div",
                            {
                              on: {
                                click: function($event) {
                                  return _vm.checkAllVisible()
                                }
                              }
                            },
                            [
                              _c("input", {
                                class: {
                                  unchecked: !_vm.match && _vm.currentChecked
                                },
                                attrs: { type: "checkbox", name: "checkall" },
                                domProps: {
                                  checked: _vm.match || _vm.currentChecked
                                }
                              }),
                              _vm._v(" "),
                              _c("label", { attrs: { for: "checkall" } })
                            ]
                          )
                        ])
                      ]
                    },
                    proxy: true
                  }
                ])
              })
            ],
            1
          )
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c("h3", [_vm._v("Add to Blacklist")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6f720088", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/pages/blacklist/New.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/blacklist/New.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6f720088\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/blacklist/New.vue")
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
Component.options.__file = "resources/assets/js/components/pages/blacklist/New.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f720088", Component.options)
  } else {
    hotAPI.reload("data-v-6f720088", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});