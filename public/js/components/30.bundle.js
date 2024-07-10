webpackJsonp([30],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/PaginationComponent.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    props: {
        data: { Type: [String, Array], default: function _default() {} },
        customTotal: { Type: [String], default: '0' },
        customPaginate: { Type: [String, Array], default: function _default() {} },
        loading: { Type: [Boolean], default: true }
    },
    data: function data() {
        return {};
    },

    methods: {
        changePage: function changePage(page) {
            this.$emit('click', page);
        }
    }
};

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-2a6048c8\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/PaginationComponent.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.data.to > 1,
            expression: "data.to > 1"
          }
        ],
        staticClass: "paginator pagination example"
      },
      [
        _c("div", { staticClass: "pagination pg-blue" }, [
          _c(
            "button",
            {
              staticClass: "page-item",
              class: { disabled: _vm.data.current_page == 1 || _vm.loading },
              attrs: { disabled: _vm.data.current_page == 1 || _vm.loading },
              on: {
                click: function($event) {
                  return _vm.changePage(_vm.data.current_page - 1)
                }
              }
            },
            [_vm._m(0)]
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "page-item",
              class: { active: _vm.data.current_page == 1 },
              on: {
                click: function($event) {
                  return _vm.changePage(1)
                }
              }
            },
            [_vm._v("\n                1\n            ")]
          ),
          _vm._v(" "),
          _vm.data.current_page - 1 != 1 && _vm.data.current_page != 1
            ? _c(
                "button",
                {
                  staticClass: "page-item",
                  on: {
                    click: function($event) {
                      return _vm.changePage(_vm.data.current_page - 1)
                    }
                  }
                },
                [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.data.current_page - 1) +
                      "\n            "
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.data.current_page != 1
            ? _c("button", { staticClass: "active page-item" }, [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.data.current_page) +
                    "\n            "
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.data.current_page + 1 != _vm.data.last_page &&
          _vm.data.current_page != _vm.data.last_page
            ? _c(
                "button",
                {
                  staticClass: "page-item",
                  on: {
                    click: function($event) {
                      return _vm.changePage(_vm.data.current_page + 1)
                    }
                  }
                },
                [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.data.current_page + 1) +
                      "\n            "
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.data.current_page != _vm.data.last_page && _vm.data.last_page
            ? _c(
                "button",
                {
                  staticClass: "page-item",
                  on: {
                    click: function($event) {
                      return _vm.changePage(_vm.data.last_page)
                    }
                  }
                },
                [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.data.last_page) +
                      "\n            "
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "page-item",
              class: {
                disabled:
                  _vm.data.current_page == _vm.data.last_page || _vm.loading
              },
              attrs: {
                disabled:
                  _vm.data.current_page == _vm.data.last_page || _vm.loading
              },
              on: {
                click: function($event) {
                  return _vm.changePage(_vm.data.current_page + 1)
                }
              }
            },
            [_vm._m(1)]
          )
        ]),
        _vm._v(" "),
        _vm._t("paginationnumberslot")
      ],
      2
    ),
    _vm._v(" "),
    _vm.data.total > 1
      ? _c("div", { staticClass: "paginatorInfo" }, [
          _vm._v(
            "\n        Showing " +
              _vm._s(_vm.data.from) +
              " to " +
              _vm._s(_vm.data.to) +
              " of " +
              _vm._s(_vm.data.total) +
              "\n    "
          )
        ])
      : _vm.customTotal && _vm.customPaginate
      ? _c("div", { staticClass: "paginatorInfo" }, [
          _vm._v(
            "\n        Found " +
              _vm._s(_vm.customPaginate.total) +
              " results\n    "
          )
        ])
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      { staticClass: "page-link", attrs: { "aria-label": "Previous" } },
      [_c("i", { staticClass: "fa fa-caret-left" })]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      { staticClass: "page-link", attrs: { "aria-label": "Next" } },
      [_c("i", { staticClass: "fa fa-caret-right" })]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2a6048c8", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/PaginationComponent.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/PaginationComponent.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-2a6048c8\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/PaginationComponent.vue")
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
Component.options.__file = "resources/assets/js/components/PaginationComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2a6048c8", Component.options)
  } else {
    hotAPI.reload("data-v-2a6048c8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});