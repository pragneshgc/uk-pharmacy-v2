webpackJsonp([23],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/dispensing/Dispensing.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _orderStatuses = __webpack_require__("./resources/assets/js/mixins/constants/orderStatuses.js");

var _orderStatuses2 = _interopRequireDefault(_orderStatuses);

var _filtersData = __webpack_require__("./resources/assets/js/mixins/filtersData.js");

var _filtersData2 = _interopRequireDefault(_filtersData);

var _vueTreeselect = __webpack_require__("./node_modules/@emacle/vue-treeselect/dist/vue-treeselect.cjs.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_orderStatuses2.default, _filtersData2.default],
    components: {
        'TableComponentSearch': function TableComponentSearch() {
            return __webpack_require__.e/* import() */(0/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/js/components/TableComponentSearch.vue"));
        }
    },
    data: function data() {
        return {
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
                options: [],
                clearable: true,
                multiple: true,
                placeholder: 'Select Country'
            }, {
                title: 'Client',
                value: 'client',
                type: 'select-extended',
                placeholder: 'Select Client',
                clearable: true,
                disableBranchNodes: true,
                multiple: true,
                options: []
            }, {
                title: 'Additional',
                value: 'additional',
                type: 'select-extended',
                placeholder: 'Select Summary Time',
                clearable: true,
                multiple: false,
                options: [{
                    label: 'Monthly data summary',
                    id: '1'
                }]
            }, {
                title: 'Product',
                value: 'product-multiple',
                type: 'select-async',
                options: [],
                placeholder: 'Select Product',
                multiple: true,
                clearable: false,
                loadOptions: _.debounce(function (_ref) {
                    var action = _ref.action,
                        searchQuery = _ref.searchQuery,
                        callback = _ref.callback;

                    if (action === _vueTreeselect.ASYNC_SEARCH) {
                        var filter = searchQuery != '' && typeof searchQuery != 'undefined' ? '?filter=' + searchQuery : '';

                        axios.get('/products' + filter).then(function (response) {
                            var r = response.data.data;
                            var products = [];

                            r.forEach(function (result) {
                                products.push({
                                    id: result.Code,
                                    value: result.ProductCodeID,
                                    label: result.Name
                                });
                            });

                            callback(null, products);
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }
                }, 500)
            }]
        };
    },
    mounted: function mounted() {
        this.setupFilters();
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

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3d5ca0fd\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/dispensing/Dispensing.vue":
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
          _c("TableComponentSearch", {
            attrs: {
              "data-url": "/dispensing-data",
              "column-class": "col-lg-12 dispensing-table",
              "filter-required": true,
              "table-title": "Dispensing Data",
              filters: _vm.filters,
              "load-on-startup": false
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
      _c("h3", [_vm._v("Dispensing Data")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3d5ca0fd", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/pages/dispensing/Dispensing.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/dispensing/Dispensing.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3d5ca0fd\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/dispensing/Dispensing.vue")
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
Component.options.__file = "resources/assets/js/components/pages/dispensing/Dispensing.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d5ca0fd", Component.options)
  } else {
    hotAPI.reload("data-v-3d5ca0fd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});