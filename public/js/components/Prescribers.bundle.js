webpackJsonp([22],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/doctor/Prescribers.vue":
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

exports.default = {
    components: {
        'TableComponentSearch': function TableComponentSearch() {
            return __webpack_require__.e/* import() */(0/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/js/components/TableComponentSearch.vue"));
        }
    },
    data: function data() {
        return {
            filters: [{
                title: 'Doctor Name',
                value: 'name',
                type: 'text'
            }, {
                title: 'Doctor Surname',
                value: 'surname',
                type: 'text'
            }, {
                title: 'Status',
                value: 'status',
                type: 'select',
                selected: 1,
                options: [{
                    title: 'Select Prescriber Status',
                    value: ''
                }, {
                    title: 'Active',
                    value: 1
                }, {
                    title: 'Inactive',
                    value: 2
                }]
            }, {
                title: 'Type',
                value: 'type',
                type: 'select',
                options: [{
                    title: 'Select Prescriber Type',
                    value: ''
                }, {
                    title: 'GMC',
                    value: 1
                }, {
                    title: 'EU',
                    value: 2
                }, {
                    title: 'GPhC',
                    value: 3
                }, {
                    title: 'Test',
                    value: 4
                }]
            }]
        };
    },
    mounted: function mounted() {}
};

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-ab1cbfc0\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/doctor/Prescribers.vue":
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
              attrs: { tag: "button", to: "/prescribers/new", exact: "" }
            },
            [_vm._v("\n                Add new prescriber\n            ")]
          ),
          _vm._v(" "),
          _c("TableComponentSearch", {
            attrs: {
              "data-url": "/doctors/index",
              "column-class": "col-lg-12",
              "table-title": "Doctors",
              "redirect-name": "prescriber",
              "redirect-id": "ID",
              "hidden-columns": [],
              filters: _vm.filters,
              deleteUrl: "/doctors",
              deleteId: "ID"
            }
          })
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
      _c("h3", [_vm._v("Prescribers")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ab1cbfc0", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/pages/doctor/Prescribers.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/doctor/Prescribers.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-ab1cbfc0\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/doctor/Prescribers.vue")
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
Component.options.__file = "resources/assets/js/components/pages/doctor/Prescribers.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ab1cbfc0", Component.options)
  } else {
    hotAPI.reload("data-v-ab1cbfc0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});