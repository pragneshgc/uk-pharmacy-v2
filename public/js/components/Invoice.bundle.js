webpackJsonp([19],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/invoices/Invoice.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _filtersData = __webpack_require__("./resources/assets/js/mixins/filtersData.js");

var _filtersData2 = _interopRequireDefault(_filtersData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_filtersData2.default],
    components: {
        'TableComponentSearch': function TableComponentSearch() {
            return __webpack_require__.e/* import() */(0/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/js/components/TableComponentSearch.vue"));
        }
    },
    data: function data() {
        return {
            columnMap: {},
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
                multiple: true,
                clearable: true,
                options: [],
                placeholder: 'Select Country'
            }, {
                title: 'Delivery',
                value: 'delivery',
                type: 'select-extended',
                clearable: true,
                options: [],
                placeholder: 'Select Delivery Service'
            }, {
                title: 'ESA Order ID',
                value: 'order_id',
                type: 'textarea'
            }, {
                title: 'Client Reference Number',
                value: 'reference',
                type: 'textarea'
            }]
        };
    },
    mounted: function mounted() {
        console.log('test');
    },

    methods: {
        downloadInvoice: function downloadInvoice() {
            window.open('/invoice/' + this.$route.params.id + '/download', '_blank');
        },
        emailInvoice: function emailInvoice() {
            axios.post('/invoice/' + this.$route.params.id + '/email').then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
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

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-224ba326\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/invoices/Invoice.vue":
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
          "div",
          { staticClass: "invoice-search" },
          [
            _c("TableComponentSearch", {
              attrs: {
                "data-url": "/invoice/" + _vm.$route.params.id,
                "column-class": "col-lg-12",
                "table-title": "Invoice Details",
                "hidden-columns": ["ItemID"],
                filters: _vm.filters,
                "column-map": _vm.columnMap,
                "csv-url": true
              },
              scopedSlots: _vm._u([
                {
                  key: "functionalities",
                  fn: function() {
                    return [
                      _c(
                        "button",
                        {
                          staticClass: "btn btnSize02 secondaryBtn",
                          attrs: { title: "Initiate search" }
                        },
                        [_vm._v("Email Invoice")]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btnSize02 secondaryBtn",
                          attrs: { title: "Initiate search" }
                        },
                        [_vm._v("Send Custom Email")]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btnSize02 secondaryBtn",
                          attrs: { title: "Initiate search" }
                        },
                        [_vm._v("Add Item")]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btnSize02 secondaryBtn",
                          attrs: { title: "Initiate search" },
                          on: {
                            click: function($event) {
                              return _vm.downloadInvoice()
                            }
                          }
                        },
                        [_vm._v("Download")]
                      )
                    ]
                  },
                  proxy: true
                }
              ])
            })
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
      _c("h3", [_vm._v("Invoice Details")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-224ba326", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/pages/invoices/Invoice.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/invoices/Invoice.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-224ba326\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/invoices/Invoice.vue")
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
Component.options.__file = "resources/assets/js/components/pages/invoices/Invoice.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-224ba326", Component.options)
  } else {
    hotAPI.reload("data-v-224ba326", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});