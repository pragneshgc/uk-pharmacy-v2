"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_assets_js_components_RedeliveryModal_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Modal.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Modal.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['modalName', 'modalClass'],
  data: function data() {
    return {
      show: {
        modal: false
      },
      loading: true
    };
  },
  computed: {},
  mounted: function mounted() {
    var _this = this;
    this.$root.$on('modal.open', function (name) {
      if (name == _this.modalName) {
        _this.show.modal = true;
      }
    });
    this.$root.$on('modal.close', function (name) {
      if (name == _this.modalName) {
        _this.show.modal = false;
      }
    });
    this.$root.$on('modal.close.all', function () {
      _this.show.modal = false;
    });
  },
  methods: {
    close: function close() {
      this.show.modal = false;
    },
    save: function save() {
      this.show.modal = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/RedeliveryModal.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/RedeliveryModal.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mixins/errors */ "./resources/assets/js/mixins/errors.js");
/* harmony import */ var _Modal_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal.vue */ "./resources/assets/js/components/Modal.vue");
/* harmony import */ var _pages_DiffTableAddress_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/DiffTableAddress.vue */ "./resources/assets/js/components/pages/DiffTableAddress.vue");
/* harmony import */ var _mixins_constants_prescriptionColumns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../mixins/constants/prescriptionColumns */ "./resources/assets/js/mixins/constants/prescriptionColumns.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  "extends": _Modal_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
  props: ['orderID'],
  mixins: [_mixins_errors__WEBPACK_IMPORTED_MODULE_0__["default"], _mixins_constants_prescriptionColumns__WEBPACK_IMPORTED_MODULE_3__["default"]],
  components: {
    DiffTableAddress: _pages_DiffTableAddress_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      selected: false,
      loading: false,
      watch: false,
      countries: [],
      companies: [],
      details: {
        order: {},
        oldOrder: {},
        ups: {},
        oldUps: {},
        details: {}
      },
      saveConfirmation: false,
      confirmationChanges: {},
      confirmationChangesUPS: {},
      confirmationOld: {},
      confirmationOldUPS: {},
      disabledFields: []
    };
  },
  mounted: function mounted() {},
  computed: {
    columnDelivery: function columnDelivery() {
      var columns = ['DAddress1', 'DAddress2', 'DAddress3', 'DAddress4', 'DPostcode', 'DCountryCode', 'DeliveryID'];
      return columns;
    }
  },
  watch: {
    'details.order.DCountryCode': function detailsOrderDCountryCode() {
      if (this.watch) {
        this.getDeliveryCompany();
      }
    },
    'details.order.DeliveryID': function detailsOrderDeliveryID() {
      if (this.watch) {
        this.getPostcodeFormatting();
      }
    }
  },
  methods: {
    getOrderDetails: function getOrderDetails() {
      var _this = this;
      var newAddress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.watch = false;
      axios.get('/order-edit/' + this.orderID).then(function (response) {
        _this.details = response.data.data;
        if (newAddress) {
          _this.details.order.DAddress1 = '';
          _this.details.order.DAddress2 = '';
          _this.details.order.DAddress3 = '';
          _this.details.order.DAddress4 = '';
          _this.details.order.DPostcode = '';
        }
        _this.loading = false;
      })["catch"](function (error) {
        _this.postError(error.response.data.message);
        _this.loading = false;
      })["finally"](function () {
        _this.watch = true;
      });
    },
    close: function close() {
      this.saveConfirmation = false;
      this.confirmationChanges = {};
      this.confirmationOld = {};
      this.confirmationOld = {};
      this.confirmationOldUPS = {};
      this.details = {
        order: {},
        oldOrder: {},
        ups: {},
        oldUps: {}
      }; //clean up after
      this.$emit('closeredelivery');
    },
    back: function back() {
      this.saveConfirmation = false;
      this.confirmationChanges = {};
      this.confirmationChangesUPS = {};
    },
    redelivery: function redelivery() {
      var _this2 = this;
      this.loading = true;
      axios.post("/order/".concat(this.orderID, "/redeliver")).then(function (response) {
        _this2.postSuccess(response.data.message);
        _this2.show.modal = false;
        _this2.$root.$emit('orderupdate');
        _this2.close();
      })["catch"](function (error) {
        _this2.postError(error.response.data.message);
      })["finally"](function () {
        _this2.loading = false;
      });
    },
    selectAddressUpdate: function selectAddressUpdate() {
      this.selected = true;
      this.getCountries();
      this.getCompanies();
      this.getOrderDetails(true);
    },
    updateAddress: function updateAddress() {},
    getCountries: function getCountries() {
      var _this3 = this;
      axios.get('/countries').then(function (response) {
        _this3.countries = response.data.data;
      })["catch"](function (error) {
        _this3.postError(error.response.data.message);
      });
    },
    getCompanies: function getCompanies() {
      var _this4 = this;
      axios.get('/delivery-companies').then(function (response) {
        _this4.companies = response.data.data;
      })["catch"](function (error) {
        _this4.postError(error.response.data.message);
      });
    },
    validateAddress: function validateAddress() {
      var _this5 = this;
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.loadingValidation = true;
      axios.post("/api/validate-address/".concat(this.currentOrderID)).then(function (response) {
        _this5.postSuccess(response.data.message);
        if (callback) {
          callback();
        }
      })["catch"](function (error) {
        _this5.postError(error.response.data.message);
      })["finally"](function () {
        _this5.loadingValidation = false;
        _this5.search();
      });
    },
    getCounterColor: function getCounterColor(value, object) {
      if (object[value] != null && this.alias[value].value) {
        if (object[value].length > 0 && this.alias[value].combined && object[this.alias[value].combined] != null) {
          if (object[value].length + object[this.alias[value].combined].length <= this.alias[value].value) {
            return 'input-count-success';
          } else {
            return 'input-count-danger';
          }
        } else if (object[value].length > 0 && object[value].length <= this.alias[value].value) {
          return 'input-count-success';
        } else if (object[value].length > this.alias[value].value) {
          return 'input-count-danger';
        }
      }
      return '';
    },
    getDeliveryCompany: function getDeliveryCompany() {
      var _this6 = this;
      axios.post("/order-edit/".concat(this.orderID, "/delivery-company"), this.details.order).then(function (response) {
        var data = response.data.data;
        if (data.DeliveryID) {
          _this6.details.order.DeliveryID = data.DeliveryID;
        }
        if (data.CountryCode) {
          _this6.details.order.CountryCode = data.CountryCode;
        }
        _this6.getPostcodeFormatting();
        _this6.postSuccess('Delivery company updated');
      })["catch"](function (error) {
        _this6.postError(error.response.data.message);
      });
    },
    getPostcodeFormatting: function getPostcodeFormatting() {
      var _this7 = this;
      if (this.details.order.DeliveryID == 10) {
        axios.post("/order-edit/".concat(this.orderID, "/postcode-formatting"), this.details.order).then(function (response) {
          var data = response.data.data;
          if (data.Postcode) {
            _this7.details.order.Postcode = data.Postcode;
          }
          if (data.DPostcode) {
            _this7.details.order.DPostcode = data.DPostcode;
          }
        })["catch"](function (error) {
          _this7.postError(error.response.data.message);
        });
      }
    },
    save: function save() {
      var _this8 = this;
      var validate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (this.saveConfirmation) {
        this.submit(validate);
      } else {
        var orderDetails = JSON.parse(JSON.stringify(this.details.order));
        delete orderDetails.ClientID;
        axios.post("/order-edit/check/".concat(this.orderID), {
          order: orderDetails,
          ups: this.details.ups
        }).then(function (response) {
          if (Object.keys(response.data.data.changes).length > 0 || Object.keys(response.data.data.changesUPS).length) {
            _this8.confirmationChanges = response.data.data.changes;
            _this8.confirmationChangesUPS = response.data.data.changesUPS;
            _this8.confirmationOld = response.data.data.old;
            _this8.confirmationOldUPS = response.data.data.oldUPS;
            _this8.saveConfirmation = true;
          } else {
            _this8.saveConfirmation = false;
          }
        })["catch"](function (error) {
          _this8.saveConfirmation = false;
          _this8.postError(error);
        });
      }
    },
    submit: function submit() {
      var _this9 = this;
      var validate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var orderDetails = JSON.parse(JSON.stringify(this.details.order));
      delete orderDetails.ClientID;
      this.loading = true;
      axios.post("/api/validate-address/".concat(this.orderID), {
        addressChange: orderDetails
      }).then(function (response) {
        if (response.data.success) {
          _this9.postSuccess('Address Validated');
          axios.post('/order-edit/' + _this9.orderID, {
            order: orderDetails,
            ups: _this9.details.ups
          }).then(function (response) {
            _this9.postSuccess('Saved');
            _this9.redelivery();
          })["catch"](function (error) {
            _this9.postError(error);
          })["finally"](function () {
            _this9.saveConfirmation = false;
            _this9.loading = false;
          });
        } else {
          _this9.postError('Could not validate address');
        }
      })["catch"](function (error) {
        _this9.postError(error);
        _this9.loading = false;
      });
    },
    isEqual: _.isEqual
  }
});

/***/ }),

/***/ "./resources/assets/js/components/Modal.vue":
/*!**************************************************!*\
  !*** ./resources/assets/js/components/Modal.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Modal_vue_vue_type_template_id_6e8d36f4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal.vue?vue&type=template&id=6e8d36f4& */ "./resources/assets/js/components/Modal.vue?vue&type=template&id=6e8d36f4&");
/* harmony import */ var _Modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/Modal.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Modal_vue_vue_type_template_id_6e8d36f4___WEBPACK_IMPORTED_MODULE_0__.render,
  _Modal_vue_vue_type_template_id_6e8d36f4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/Modal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/RedeliveryModal.vue":
/*!************************************************************!*\
  !*** ./resources/assets/js/components/RedeliveryModal.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RedeliveryModal_vue_vue_type_template_id_ac124842___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RedeliveryModal.vue?vue&type=template&id=ac124842& */ "./resources/assets/js/components/RedeliveryModal.vue?vue&type=template&id=ac124842&");
/* harmony import */ var _RedeliveryModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RedeliveryModal.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/RedeliveryModal.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RedeliveryModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RedeliveryModal_vue_vue_type_template_id_ac124842___WEBPACK_IMPORTED_MODULE_0__.render,
  _RedeliveryModal_vue_vue_type_template_id_ac124842___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/RedeliveryModal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/Modal.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/assets/js/components/Modal.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Modal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Modal.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/RedeliveryModal.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/assets/js/components/RedeliveryModal.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RedeliveryModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RedeliveryModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/RedeliveryModal.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RedeliveryModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/Modal.vue?vue&type=template&id=6e8d36f4&":
/*!*********************************************************************************!*\
  !*** ./resources/assets/js/components/Modal.vue?vue&type=template&id=6e8d36f4& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_template_id_6e8d36f4___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_template_id_6e8d36f4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_template_id_6e8d36f4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Modal.vue?vue&type=template&id=6e8d36f4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Modal.vue?vue&type=template&id=6e8d36f4&");


/***/ }),

/***/ "./resources/assets/js/components/RedeliveryModal.vue?vue&type=template&id=ac124842&":
/*!*******************************************************************************************!*\
  !*** ./resources/assets/js/components/RedeliveryModal.vue?vue&type=template&id=ac124842& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RedeliveryModal_vue_vue_type_template_id_ac124842___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RedeliveryModal_vue_vue_type_template_id_ac124842___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RedeliveryModal_vue_vue_type_template_id_ac124842___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RedeliveryModal.vue?vue&type=template&id=ac124842& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/RedeliveryModal.vue?vue&type=template&id=ac124842&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Modal.vue?vue&type=template&id=6e8d36f4&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Modal.vue?vue&type=template&id=6e8d36f4& ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "fade" } }, [
    _vm.show.modal
      ? _c("div", { staticClass: "esa-modal" }, [
          _c("div", {
            staticClass: "backdrop",
            on: {
              click: function ($event) {
                return _vm.close()
              },
            },
          }),
          _vm._v(" "),
          _c("div", { staticClass: "modal", class: _vm.modalClass }, [
            _c("div", { staticClass: "modal-header" }, [_vm._t("header")], 2),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }, [_vm._t("body")], 2),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "modal-footer" },
              [
                _c(
                  "button",
                  {
                    staticClass: "btn btnSize01 secondaryBtn bigButton",
                    on: {
                      click: function ($event) {
                        return _vm.close()
                      },
                    },
                  },
                  [_vm._v("Cancel")]
                ),
                _vm._v(" "),
                _vm._t("footer"),
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "span",
              {
                staticClass: "close",
                on: {
                  click: function ($event) {
                    return _vm.close()
                  },
                },
              },
              [_vm._v("X")]
            ),
          ]),
        ])
      : _vm._e(),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/RedeliveryModal.vue?vue&type=template&id=ac124842&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/RedeliveryModal.vue?vue&type=template&id=ac124842& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "fade" } }, [
    _c("div", { staticClass: "esa-modal" }, [
      _c("div", {
        staticClass: "backdrop",
        on: {
          click: function ($event) {
            return _vm.close()
          },
        },
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "modal" },
        [
          _c("transition", { attrs: { name: "fade" } }, [
            _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.loading,
                    expression: "loading",
                  },
                ],
                staticClass: "loader",
              },
              [_vm._v("Loading...")]
            ),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-header" }, [
            _c("h3", [_vm._v("Redelivery")]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-body" }, [
            !_vm.selected
              ? _c(
                  "div",
                  {
                    staticClass: "redelivery-selection",
                    staticStyle: { width: "100%", "text-align": "center" },
                  },
                  [
                    _c("h3", { staticStyle: { "text-align": "center" } }, [
                      _vm._v("Please select the method of redelivery"),
                    ]),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btnSize01 secondaryBtn",
                        on: {
                          click: function ($event) {
                            return _vm.redelivery()
                          },
                        },
                      },
                      [
                        _vm._v(
                          "Redelivery to Existing\n                        Address"
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btnSize01 secondaryBtn",
                        on: {
                          click: function ($event) {
                            return _vm.selectAddressUpdate()
                          },
                        },
                      },
                      [
                        _vm._v(
                          "Redelivery to New\n                        Address"
                        ),
                      ]
                    ),
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.selected
              ? _c(
                  "div",
                  {
                    staticClass: "redelivery-selection",
                    staticStyle: { width: "100%", "align-self": "flex-start" },
                  },
                  [
                    _c("transition", { attrs: { name: "fade" } }, [
                      _vm.countries.length != 0 &&
                      _vm.companies.length != 0 &&
                      !_vm.loading &&
                      Object.keys(_vm.confirmationChanges).length == 0 &&
                      Object.keys(_vm.confirmationChangesUPS).length == 0
                        ? _c(
                            "form",
                            {
                              staticClass: "pxp-form address-form mb-20",
                              on: {
                                submit: function ($event) {
                                  $event.preventDefault()
                                  return _vm.save.apply(null, arguments)
                                },
                              },
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass: "form-column",
                                  staticStyle: { width: "100%" },
                                },
                                [
                                  _c("h3", [_vm._v("Delivery Details")]),
                                  _vm._v(" "),
                                  _vm._l(
                                    _vm.details.order,
                                    function (key, value) {
                                      return _vm.columnDelivery.includes(value)
                                        ? _c(
                                            "div",
                                            {
                                              key: value,
                                              staticClass:
                                                "form-group form-group-2",
                                            },
                                            [
                                              _c(
                                                "label",
                                                { attrs: { for: key } },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.alias[value].title
                                                    )
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _vm.alias[value].value
                                                ? _c(
                                                    "label",
                                                    {
                                                      staticClass:
                                                        "input-count",
                                                      class:
                                                        _vm.getCounterColor(
                                                          value,
                                                          _vm.details.order
                                                        ),
                                                      attrs: { for: key },
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.details.order[
                                                            value
                                                          ]
                                                            ? _vm.details.order[
                                                                value
                                                              ].length
                                                            : 0
                                                        ) +
                                                          "/" +
                                                          _vm._s(
                                                            _vm.alias[value]
                                                              .value
                                                          )
                                                      ),
                                                    ]
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              ![
                                                "JVM",
                                                "UPSAccessPointAddress",
                                                "CountryCode",
                                                "DCountryCode",
                                                "DeliveryID",
                                                "Notes",
                                              ].includes(value)
                                                ? _c("input", {
                                                    directives: [
                                                      {
                                                        name: "model",
                                                        rawName: "v-model",
                                                        value:
                                                          _vm.details.order[
                                                            value
                                                          ],
                                                        expression:
                                                          "details.order[value]",
                                                      },
                                                    ],
                                                    attrs: {
                                                      disabled:
                                                        _vm.disabledFields.includes(
                                                          value
                                                        ),
                                                      name: key,
                                                      placeholder: "",
                                                    },
                                                    domProps: {
                                                      value:
                                                        _vm.details.order[
                                                          value
                                                        ],
                                                    },
                                                    on: {
                                                      input: function ($event) {
                                                        if (
                                                          $event.target
                                                            .composing
                                                        ) {
                                                          return
                                                        }
                                                        _vm.$set(
                                                          _vm.details.order,
                                                          value,
                                                          $event.target.value
                                                        )
                                                      },
                                                    },
                                                  })
                                                : [
                                                    "DCountryCode",
                                                    "CountryCode",
                                                  ].includes(value)
                                                ? _c(
                                                    "select",
                                                    {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value:
                                                            _vm.details.order[
                                                              value
                                                            ],
                                                          expression:
                                                            "details.order[value]",
                                                        },
                                                      ],
                                                      class: [
                                                        _vm.details.order[
                                                          value
                                                        ] &&
                                                        _vm.details.order[
                                                          value
                                                        ] != ""
                                                          ? "select-dropdown-active"
                                                          : "",
                                                      ],
                                                      on: {
                                                        change: function (
                                                          $event
                                                        ) {
                                                          var $$selectedVal =
                                                            Array.prototype.filter
                                                              .call(
                                                                $event.target
                                                                  .options,
                                                                function (o) {
                                                                  return o.selected
                                                                }
                                                              )
                                                              .map(function (
                                                                o
                                                              ) {
                                                                var val =
                                                                  "_value" in o
                                                                    ? o._value
                                                                    : o.value
                                                                return val
                                                              })
                                                          _vm.$set(
                                                            _vm.details.order,
                                                            value,
                                                            $event.target
                                                              .multiple
                                                              ? $$selectedVal
                                                              : $$selectedVal[0]
                                                          )
                                                        },
                                                      },
                                                    },
                                                    _vm._l(
                                                      _vm.countries,
                                                      function (country) {
                                                        return _c(
                                                          "option",
                                                          {
                                                            domProps: {
                                                              value:
                                                                country.CountryID,
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              _vm._s(
                                                                country.Name
                                                              ) +
                                                                "\n                                        "
                                                            ),
                                                          ]
                                                        )
                                                      }
                                                    ),
                                                    0
                                                  )
                                                : ["DeliveryID"].includes(value)
                                                ? _c(
                                                    "select",
                                                    {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value:
                                                            _vm.details.order[
                                                              value
                                                            ],
                                                          expression:
                                                            "details.order[value]",
                                                        },
                                                      ],
                                                      class: [
                                                        _vm.details.order[
                                                          value
                                                        ] &&
                                                        _vm.details.order[
                                                          value
                                                        ] != ""
                                                          ? "select-dropdown-active"
                                                          : "",
                                                      ],
                                                      on: {
                                                        change: function (
                                                          $event
                                                        ) {
                                                          var $$selectedVal =
                                                            Array.prototype.filter
                                                              .call(
                                                                $event.target
                                                                  .options,
                                                                function (o) {
                                                                  return o.selected
                                                                }
                                                              )
                                                              .map(function (
                                                                o
                                                              ) {
                                                                var val =
                                                                  "_value" in o
                                                                    ? o._value
                                                                    : o.value
                                                                return val
                                                              })
                                                          _vm.$set(
                                                            _vm.details.order,
                                                            value,
                                                            $event.target
                                                              .multiple
                                                              ? $$selectedVal
                                                              : $$selectedVal[0]
                                                          )
                                                        },
                                                      },
                                                    },
                                                    _vm._l(
                                                      _vm.companies,
                                                      function (company) {
                                                        return _c(
                                                          "option",
                                                          {
                                                            domProps: {
                                                              value:
                                                                company.SettingID,
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              _vm._s(
                                                                company.Name
                                                              ) +
                                                                "\n                                        "
                                                            ),
                                                          ]
                                                        )
                                                      }
                                                    ),
                                                    0
                                                  )
                                                : _vm._e(),
                                            ]
                                          )
                                        : _vm._e()
                                    }
                                  ),
                                ],
                                2
                              ),
                            ]
                          )
                        : _vm._e(),
                    ]),
                    _vm._v(" "),
                    _c("transition", { attrs: { name: "fade" } }, [
                      (Object.keys(_vm.confirmationChanges).length > 0 ||
                        Object.keys(_vm.confirmationChangesUPS).length > 0) &&
                      !_vm.loading
                        ? _c(
                            "div",
                            {
                              staticClass: "pxp-form mb-20",
                              staticStyle: { height: "auto" },
                            },
                            [
                              _c("div", { staticClass: "infoBox warning" }, [
                                _c("p", [
                                  _vm._v(
                                    "Please review and confirm all the changes in the order before saving!"
                                  ),
                                ]),
                              ]),
                              _vm._v(" "),
                              _c("DiffTableAddress", {
                                attrs: {
                                  "old-object": _vm.confirmationOld,
                                  "new-object": _vm.confirmationChanges,
                                  "old-object-u-p-s": _vm.confirmationOldUPS,
                                  "new-object-u-p-s":
                                    _vm.confirmationChangesUPS,
                                  "countries-prop": _vm.countries,
                                  "companies-prop": _vm.companies,
                                },
                              }),
                            ],
                            1
                          )
                        : _vm._e(),
                    ]),
                  ],
                  1
                )
              : _vm._e(),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-footer" }, [
            !_vm.isEqual(_vm.details.order, _vm.details.oldOrder) ||
            (!_vm.isEqual(_vm.details.ups, _vm.details.oldUPS) &&
              _vm.selected &&
              !_vm.loading)
              ? _c(
                  "button",
                  {
                    staticClass: "btn btnSize01 tertiaryBtn bigButton",
                    attrs: { disabled: _vm.loading },
                    on: {
                      click: function ($event) {
                        return _vm.save()
                      },
                    },
                  },
                  [
                    !_vm.saveConfirmation
                      ? _c("span", [
                          _vm._v(
                            "\n                        Review\n                    "
                          ),
                        ])
                      : _c("span", [
                          _vm._v(
                            "\n                        Save and Redeliver\n                    "
                          ),
                        ]),
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            (!_vm.isEqual(_vm.details.order, _vm.details.oldOrder) ||
              !_vm.isEqual(_vm.details.ups, _vm.details.oldUPS)) &&
            _vm.saveConfirmation
              ? _c(
                  "button",
                  {
                    staticClass: "btn btnSize01 tertiaryBtn bigButton",
                    attrs: { disabled: _vm.loading },
                    on: {
                      click: function ($event) {
                        return _vm.back()
                      },
                    },
                  },
                  [
                    _c("span", [
                      _vm._v(
                        "\n                        Back\n                    "
                      ),
                    ]),
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btnSize01 secondaryBtn bigButton",
                attrs: { disabled: _vm.loading },
                on: {
                  click: function ($event) {
                    return _vm.close()
                  },
                },
              },
              [_vm._v("\n                    Cancel\n                ")]
            ),
          ]),
          _vm._v(" "),
          _c(
            "span",
            {
              staticClass: "close",
              on: {
                click: function ($event) {
                  return _vm.close()
                },
              },
            },
            [_vm._v("X")]
          ),
        ],
        1
      ),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);