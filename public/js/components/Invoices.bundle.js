webpackJsonp([18],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/invoices/Invoices.vue":
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
                title: 'Statuses',
                value: 'statuses',
                type: 'select-extended',
                multiple: true,
                clearable: true,
                options: [{ id: 0, label: 'Incomplete' }, { id: 1, label: 'Unpaid' }, { id: 2, label: 'Paid' }, { id: 3, label: 'Credit Note' }, { id: 4, label: 'Deleted' }],
                placeholder: 'Select Type'
            }, {
                title: 'Delivery',
                value: 'delivery',
                type: 'select-extended',
                clearable: true,
                options: [],
                placeholder: 'Select Delivery Service'
            }, {
                title: 'Client',
                value: 'client',
                type: 'select-extended',
                placeholder: 'Select Client',
                clearable: true,
                disableBranchNodes: true,
                options: []
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
        this.setupFilters();
    },

    methods: {
        downloadInvoice: function downloadInvoice(item) {
            console.log(item);
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

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-2ad462bd\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/invoices/Invoices.vue":
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
                "data-url": "/invoices",
                "column-class": "col-lg-12",
                "table-title": "Invoices",
                "redirect-name": "invoice",
                "redirect-id": "InvoiceID",
                "hidden-columns": ["InvoiceID"],
                filters: _vm.filters,
                "column-map": _vm.columnMap,
                "csv-url": true
              },
              scopedSlots: _vm._u([
                {
                  key: "tools",
                  fn: function(ref) {
                    var item = ref.item
                    return [
                      _c(
                        "a",
                        {
                          staticClass: "btn btn-primary table-icon",
                          staticStyle: { margin: "0" },
                          attrs: { title: "Download Invoice" },
                          on: {
                            click: function($event) {
                              return _vm.downloadInvoice(item)
                            }
                          }
                        },
                        [_c("i", { staticClass: "fa fa-download" })]
                      )
                    ]
                  }
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
      _c("h3", [_vm._v("Invoices")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2ad462bd", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/pages/invoices/Invoices.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/invoices/Invoices.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-2ad462bd\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/invoices/Invoices.vue")
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
Component.options.__file = "resources/assets/js/components/pages/invoices/Invoices.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2ad462bd", Component.options)
  } else {
    hotAPI.reload("data-v-2ad462bd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});