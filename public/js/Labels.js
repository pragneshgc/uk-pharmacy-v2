"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["Labels"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/label/LabelEdit.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/label/LabelEdit.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_print__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../mixins/print */ "./resources/assets/js/mixins/print.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  mixins: [_mixins_print__WEBPACK_IMPORTED_MODULE_1__["default"]],
  data: function data() {
    return {
      userInfo: userInfo,
      productCodeId: false,
      productCode: {},
      productCodeEdit: {},
      pricingId: false,
      errors: [],
      options: [],
      list: [],
      clients: [],
      countries: [],
      editing: false,
      type: 'product',
      form: {
        country: {
          price: false,
          country: false
        },
        pricing: {
          price: false,
          client: 0
        },
        product: {}
      },
      saving: false,
      callback: false,
      callbackData: false,
      buttonText: false,
      override: false,
      //special for pharmacist
      visible: false
    };
  },
  computed: {
    saveButtonText: function saveButtonText() {
      if (this.buttonText) {
        return this.buttonText;
      }
      if (!this.productCodeId && this.editing) {
        return 'Add';
      }
      if (this.pricingId && this.editing) {
        return 'Update';
      }
      return 'Save Changes';
    },
    title: function title() {
      if (this.editing && this.productCodeId) {
        return 'Edit Product';
      } else if (this.editing && !this.productCodeId) {
        return 'Create Product';
      }
      return 'Product List';
    }
  },
  mounted: function mounted() {
    this.$root.$on('label.details', this.getProductDetails);
    this.$root.$on('label.add', this.addProduct);
    this.clear();
  },
  beforeDestroy: function beforeDestroy() {
    this.$root.$off('product.details', this.getProductDetails);
    this.$root.$off('product.add');
    $('#productEditor').off('hidden.bs.modal');
  },
  watch: {
    productCodeId: function productCodeId() {
      this.getPriceList();
      this.getProductCode();
    },
    type: function type(newValue) {
      if (newValue == 'country') {
        this.getCountries();
      }
    }
  },
  methods: {
    getProductDetails: function getProductDetails(data) {
      this.productCode = data;
      this.editing = false;
      this.type = 'product';
      this.productCodeId = this.productCode.ProductCodeID;
      this.show();
    },
    show: function show() {
      if (this.options.length == 0) {
        this.getOptions();
      }
      this.visible = true;
    },
    getCountries: function getCountries() {
      var _this = this;
      axios.get('/countries').then(function (response) {
        _this.countries = response.data.data;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    getOptions: function getOptions() {
      var _this2 = this;
      axios.get('/inventory/products/list').then(function (response) {
        _this2.options = response.data.data;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    getPriceList: function getPriceList() {
      var _this3 = this;
      axios.get("/inventory/products/".concat(this.productCodeId, "/list")).then(function (response) {
        _this3.list = response.data.data;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    getDeliveryCompanies: function getDeliveryCompanies() {
      var _this4 = this;
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      axios.get("/inventory/delivery/list").then(function (response) {
        _this4.deliveryCompanies = response.data.data;
        if (callback) {
          callback();
        }
      })["catch"](function (error) {
        console.log(error);
      });
    },
    getClients: function getClients() {
      var _this5 = this;
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      axios.get("/inventory/clients/list").then(function (response) {
        _this5.clients = response.data.data;
        if (callback) {
          callback();
        }
      })["catch"](function (error) {
        console.log(error);
      });
    },
    getProductCode: function getProductCode() {
      var _this6 = this;
      axios.get("/inventory/products/".concat(this.productCodeId)).then(function (response) {
        _this6.productCode = response.data.data;
      })["catch"](function (error) {
        console.log(error);
      });
    },
    addProduct: function addProduct() {
      this.editing = true;
      this.type = 'product';
      this.productCodeId = false;
      this.show();
    },
    addCountry: function addCountry() {
      this.editing = true;
      this.type = 'country';
      this.productCodeId = false;
      this.show();
    },
    removePricing: function removePricing(id) {
      var _this7 = this;
      this.$swal({
        title: 'Are you sure you want to remove this pricing?',
        text: "This cannot be reverted!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("/inventory/products/pricing/".concat(id)).then(function (result) {
            _this7.$swal({
              title: 'Pricing removed',
              type: 'error',
              showConfirmButton: true
            });
            _this7.getPriceList();
          })["catch"](function (error) {
            console.log(error);
          });
        }
      });
    },
    deleteProduct: function deleteProduct() {
      var _this8 = this;
      this.$swal({
        title: 'Are you sure you want to deactivate this product?',
        text: "This can be reverted",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, deactivate it!'
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("/inventory/products/".concat(_this8.productCodeId, "/delete")).then(function (result) {
            _this8.$swal({
              title: 'Product has been deactivated',
              type: 'error',
              showConfirmButton: true
            });
            _this8.getProductCode();
            _this8.$root.$emit('product.refresh');
          })["catch"](function (error) {
            console.log(error);
          });
        }
      });
    },
    reactivateProduct: function reactivateProduct() {
      var _this9 = this;
      this.$swal({
        title: 'Are you sure you want to activate this product?',
        text: "This can be reverted",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, deactivate it!'
      }).then(function (result) {
        if (result.value) {
          axios.post("/inventory/products/".concat(_this9.productCodeId, "/reactivate")).then(function (result) {
            _this9.$swal({
              title: 'Product has been reactivated',
              type: 'success',
              showConfirmButton: true
            });
            _this9.getProductCode();
            _this9.$root.$emit('product.refresh');
          })["catch"](function (error) {
            console.log(error);
          });
        }
      });
    },
    /**
     * Save form editing
     */
    save: function save() {
      var _this10 = this;
      if (!this.productCodeId && this.type == 'country') {
        axios.post("/inventory/countries/pricing", this.form.country).then(function (result) {
          _this10.$swal({
            title: 'Default pricing for country added',
            type: 'success',
            showConfirmButton: true
          });
          _this10.$root.$emit('product.refresh');
          _this10.clear();
        })["catch"](function (error) {
          console.log(error);
        });
        //insert new pricing
      } else if (!this.pricingId && this.type == 'pricing' && this.editing) {
        var form = {
          pricing: this.form.pricing,
          productCode: this.productCode
        };
        axios.post("/inventory/products/pricing", form).then(function (result) {
          _this10.$swal({
            title: 'Pricing for country added',
            type: 'success',
            showConfirmButton: true
          });
          _this10.$root.$emit('product.refresh');
          _this10.back();
        })["catch"](function (error) {
          console.log(error);
        });
        //update pricing
      } else if (this.pricingId && (this.type == 'country' || this.type == 'product')) {
        axios.patch("/inventory/countries/pricing/".concat(this.pricingId), this.form.country).then(function (result) {
          _this10.$swal({
            title: 'Pricing updated',
            type: 'success',
            showConfirmButton: true
          });
          // this.$root.$emit('product.refresh');
          _this10.back();
        })["catch"](function (error) {
          console.log(error);
        });
        //update product code
      } else if (this.productCodeId && this.type == 'product') {
        axios.patch("/inventory/products/".concat(this.productCodeId), this.productCodeEdit).then(function (result) {
          _this10.$swal({
            title: 'Product updated',
            type: 'success',
            showConfirmButton: true
          });
          _this10.$root.$emit('product.refresh');
          _this10.getOptions();
          _this10.back();
        })["catch"](function (error) {
          _this10.errors = error.response.data.errors;
        });
        //insert product code
      } else if (!this.productCodeId && this.type == 'product') {
        axios.post("/inventory/products", this.productCodeEdit).then(function (result) {
          _this10.$swal({
            title: 'Product added',
            type: 'success',
            showConfirmButton: true
          });
          _this10.$root.$emit('product.refresh');
          _this10.clear();
        })["catch"](function (error) {
          _this10.errors = error.response.data.errors;
        });
        // console.log('Insert product');
        // console.log(this.productCodeEdit);
      }
    },
    /**
     * Return to list screen 
    */
    back: function back() {
      var productCodeId = JSON.parse(JSON.stringify(this.productCodeId));
      this.clear(false);
      this.productCodeId = productCodeId;
      this.getProductCode();
      this.getPriceList();
      this.editing = false;
    },
    edit: function edit(value) {
      this.editing = true;
      if (this.productCode.Type == 2) {
        this.type = 'country';
      } else {
        this.type = 'product';
      }
      this.form.country.country = value.Code;
      this.form.country.price = value.UnformattedPrice;
      this.pricingId = value.PricingID; //this needs changing
    },
    editProduct: function editProduct() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.editing = true;
      this.type = 'product';
      this.productCodeEdit = JSON.parse(JSON.stringify(this.productCode));
    },
    addPricing: function addPricing() {
      var _this11 = this;
      if (this.clients.length == 0) {
        this.getClients(function () {
          _this11.editing = true;
          _this11.type = 'pricing';
        });
      } else {
        this.editing = true;
        this.type = 'pricing';
      }
    },
    /**
     * Clean up after form operations
     */
    clear: function clear() {
      var hide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (hide) {
        this.visible = false;
      }
      this.form = {
        country: {
          price: false,
          country: false
        },
        pricing: {
          price: false,
          client: false
        },
        product: {}
      };
      this.editing = false;
      this.productCodeId = false;
      this.productCodeEdit = {};
      this.pricingId = false;
      this.errors = [];
    },
    checkFields: function checkFields(callback) {
      if (this.override) {
        callback();
        return;
      }
      if (this.selectedItem.FMDExpiryDate == '' || this.selectedItem.FMDExpiryDate == null || !/[\d]{2}\/[\d]{4}/.test(this.selectedItem.FMDExpiryDate)) {
        this.errors.FMDExpiryDate = true;
      } else {
        this.errors.FMDExpiryDate = false;
      }
      this.errors.FMDBatchID = this.selectedItem.FMDBatchID == '' || this.selectedItem.FMDBatchID == null ? true : false;
      if (!this.errors.FMDExpiryDate && !this.errors.FMDBatchID) {
        callback();
      }
    },
    setOptions: function setOptions(options) {
      if (!options) {
        this.callback = false;
        this.callbackData = false;
        this.buttonText = false;
      } else {
        this.callback = options.callback ? options.callback : false;
        this.callbackData = options.callbackData ? options.callbackData : false;
        this.buttonText = options.text ? options.text : false;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/label/Labels.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/label/Labels.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _LabelEdit_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LabelEdit.vue */ "./resources/assets/js/components/pages/label/LabelEdit.vue");
/* harmony import */ var _mixins_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../mixins/errors */ "./resources/assets/js/mixins/errors.js");
/* harmony import */ var _emacle_vue_treeselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emacle/vue-treeselect */ "./node_modules/@emacle/vue-treeselect/dist/vue-treeselect.cjs.js");
/* harmony import */ var _emacle_vue_treeselect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emacle_vue_treeselect__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emacle_vue_treeselect_dist_vue_treeselect_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emacle/vue-treeselect/dist/vue-treeselect.css */ "./node_modules/@emacle/vue-treeselect/dist/vue-treeselect.css");
/* harmony import */ var _mixins_logging__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../mixins/logging */ "./resources/assets/js/mixins/logging.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: {
    LabelEdit: _LabelEdit_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    Treeselect: (_emacle_vue_treeselect__WEBPACK_IMPORTED_MODULE_2___default())
  },
  mixins: [_mixins_errors__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_logging__WEBPACK_IMPORTED_MODULE_4__["default"]],
  data: function data() {
    return {
      loading: false,
      filtersVisible: false,
      hiddenColumns: ['WLID', 'CountryID', 'Group', 'Status', 'editing', 'new', 'Description'],
      labels: [],
      productFilter: [],
      labelsUnedited: [],
      products: [],
      productsList: [],
      productsExpanded: [],
      productsAdd: [],
      countries: [],
      alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
      columns: {
        label: ["Country", "Description", "Options"]
      },
      filter: {
        letter: 'all',
        company: 0,
        fridge: 'all',
        productType: 'all',
        reclassification: 'all',
        "package": 'all',
        fdb: '0',
        name: {
          status: false,
          value: ''
        },
        code: {
          status: false,
          value: ''
        }
      },
      values: {
        name: '',
        code: ''
      },
      tab: 'drug'
    };
  },
  mounted: function mounted() {
    var _this = this;
    this.getLabels();
    this.getCountries();
    // this.getProductList();

    this.$root.$on('product.refresh', function () {
      _this.getLabels();
    });
  },
  destroyed: function destroyed() {
    this.$root.$off('product.refresh');
  },
  computed: {
    visibleColumns: function visibleColumns() {
      return this.columns.label;
    },
    searchString: function searchString() {
      var product = "?product=".concat(this.productFilter);
      return product;
    },
    visibleLabels: function visibleLabels() {
      return this.labels;
    },
    groupedLabels: function groupedLabels() {
      var objects = [];
      var response = [];
      this.labels.forEach(function (label) {
        if (typeof objects[label.Group] == 'undefined') {
          objects[label.Group] = {
            array: [],
            group: label.Group
          };
          objects[label.Group].array.push(label);
        } else {
          objects[label.Group].array.push(label);
        }
      });
      for (var key in objects) {
        response.push(objects[key]);
      }
      return response;
    },
    groups: function groups() {
      var groups = [];
      this.labels.forEach(function (label) {
        if (!groups.includes(label.Group)) {
          groups.push(label.Group);
        }
      });
      return groups;
    },
    csvUrl: function csvUrl() {
      return this.tab == 'drug' ? "/inventory/products/csv".concat(this.searchString) : "/inventory/countries/csv".concat(this.searchString);
    }
  },
  watch: {
    searchString: function searchString() {
      this.getLabels();
    }
  },
  methods: {
    loadOptions: _.debounce(function (_ref) {
      var action = _ref.action,
        searchQuery = _ref.searchQuery,
        callback = _ref.callback;
      if (action === _emacle_vue_treeselect__WEBPACK_IMPORTED_MODULE_2__.ASYNC_SEARCH) {
        this.getProductList(searchQuery, function (results) {
          var products = [];
          results.forEach(function (result) {
            products.push({
              id: result.ProductCodeID,
              label: result.Name
            });
          });
          callback(null, products);
        });
      }
    }, 500),
    getLabels: function getLabels() {
      var _this2 = this;
      this.loading = true;
      axios.get("/labels".concat(this.searchString)).then(function (response) {
        _this2.labels = response.data.data;
        _this2.labelsUnedited = JSON.parse(JSON.stringify(response.data.data));
        _this2.push = 0;
      })["catch"](function (error) {
        _this2.postError(error.response.data.message);
      })["finally"](function () {
        _this2.loading = false;
      });
    },
    /**
     * Filters
     */
    saveFilter: function saveFilter(column) {
      this.filter[column].value = this.values[column];
      this.toggleFilter(column);
    },
    clearFilter: function clearFilter(column) {
      this.filter[column].value = '';
      this.values[column] = '';
      this.filter[column].status = false;
    },
    toggleFilter: function toggleFilter(column) {
      this.filter[column].status = !this.filter[column].status;
      if (this.filter[column].status) {
        setTimeout(function () {
          var filter = document.getElementById("".concat(column, "-filter"));
          filter.focus();
          filter.select();
        }, 10);
      }
    },
    /**
     * Filters
     */
    getCountries: function getCountries() {
      var _this3 = this;
      this.loading = true;
      axios.get("/countries").then(function (response) {
        _this3.countries = response.data.data;
      })["catch"](function (error) {
        _this3.postError(error.response.data.message);
      })["finally"](function () {
        _this3.loading = false;
      });
    },
    getProductList: function getProductList() {
      var _this4 = this;
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var filter = query != '' ? "?filter=".concat(query) : '';
      axios.get("/products".concat(filter)).then(function (response) {
        // this.productsList = response.data.data
        if (callback) {
          callback(response.data.data);
        } else {
          _this4.productsList = response.data.data;
        }
      })["catch"](function (error) {
        console.log(error);
        _this4.postError(error.response.data.message);
      });
    },
    editLabel: function editLabel(label) {
      label.editing = true;
    },
    addLabel: function addLabel(k) {
      var newLabel = {
        CountryID: 1,
        Description: "",
        Group: k,
        Status: 1,
        editing: true,
        "new": true,
        WLID: Date.now()
      };
      this.labels.unshift(newLabel);
    },
    updateLabel: function updateLabel(label) {
      var _this5 = this;
      axios.patch("/labels/".concat(label.WLID), label).then(function (response) {
        _this5.logSystemActivity(label.WLID, 6, 608, label);
        _this5.postSuccess('Changes saved');
      })["catch"](function (error) {
        _this5.postError(error.response.data.message);
      })["finally"](function () {
        label.editing = false;
      });
    },
    cancelEdit: function cancelEdit(label) {
      var oldLabel = this.labelsUnedited.find(function (l) {
        return l.WLID === label.WLID;
      });
      label.Description = oldLabel.Description;
      label.editing = false;
    },
    saveLabel: function saveLabel(label) {
      var _this6 = this;
      axios.post('/labels', label).then(function (response) {
        _this6.labels.splice(_this6.labels.findIndex(function (item) {
          return item.WLID === label.WLID;
        }), 1);
        _this6.labels.unshift(response.data.data);
        _this6.logSystemActivity(0, 6, 600, label);
        _this6.postSuccess(response.data.message);
      })["catch"](function (error) {
        _this6.postError(error.response.data.message);
      });
    },
    deleteLabel: function deleteLabel(label) {
      var _this7 = this;
      this.$swal({
        title: 'Delete Label',
        html: 'Are you sure you want to delete this label?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff5151',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("/labels/".concat(label.WLID)).then(function (response) {
            _this7.labels.splice(_this7.labels.findIndex(function (item) {
              return item.WLID === label.WLID;
            }), 1);
            _this7.logSystemActivity(label.WLID, 6, 601, []);
            _this7.postSuccess(response.data.message);
          })["catch"](function (error) {
            _this7.postError(error.response.data.message);
          });
        }
      });
    },
    removeProduct: function removeProduct(productCodeId, group) {
      var _this8 = this;
      this.$swal({
        title: 'Remove product',
        html: 'Are you sure you want to remove product from this group?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff5151',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("/labels/group/".concat(group, "/products/").concat(productCodeId)).then(function (response) {
            _this8.getProducts(group);
            _this8.logSystemActivity(productCodeId, 6, 602, {
              group: group,
              productCodeId: productCodeId
            });
            // this.labels.splice(this.labels.findIndex(item => item.WLID === label.WLID), 1);
            _this8.postSuccess(response.data.message);
          })["catch"](function (error) {
            _this8.postError(error.response.data.message);
          });
        }
      });
    },
    addProduct: function addProduct(productCodeId, group) {
      var _this9 = this;
      axios.put("/labels/group/".concat(group, "/products/").concat(productCodeId)).then(function (response) {
        _this9.getProducts(group);
        _this9.logSystemActivity(productCodeId, 6, 603, {
          group: group,
          productCodeId: productCodeId
        });
        // this.labels.splice(this.labels.findIndex(item => item.WLID === label.WLID), 1);
        _this9.postSuccess(response.data.message);
      })["catch"](function (error) {
        _this9.postError(error.response.data.message);
      });
    },
    addGroup: function addGroup() {
      this.labels.unshift({
        Group: 0,
        editing: true,
        "new": true,
        CountryID: 1,
        Country: '',
        Description: '',
        Status: 1,
        Name: ''
      });
    },
    showProducts: function showProducts(id) {
      var _this10 = this;
      if (!this.productsExpanded.includes(id)) {
        this.getProducts(id, function () {
          _this10.productsExpanded.push(id);
        });
      } else {
        this.productsExpanded.splice(this.productsExpanded.indexOf(id), 1);
        this.products.splice(id, 1);
      }
    },
    //get products by group ID
    getProducts: function getProducts(id) {
      var _this11 = this;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      axios.get("/labels/group/".concat(id, "/products")).then(function (response) {
        _this11.products.splice(id, 1);
        _this11.products[id] = response.data.data;
        if (callback) {
          callback();
        }
      })["catch"](function (error) {
        _this11.postError(error.response.data.message);
      });
    },
    cancelLabel: function cancelLabel(label) {
      this.labels.splice(this.labels.findIndex(function (item) {
        return item.WLID === label.WLID;
      }), 1);
    },
    openEditModal: function openEditModal(type) {
      this.$root.$emit('label.add');
    },
    check: function check(id, status) {
      var _this12 = this;
      if (status == 1) {
        axios.post("/labels/".concat(id, "/disable")).then(function (response) {
          _this12.logSystemActivity(id, 6, 604, []);
          _this12.postWarning('Label disabled');
        })["catch"](function (error) {
          console.log(error);
        })["finally"](function () {
          _this12.getLabels();
        });
      } else {
        axios.post("/labels/".concat(id, "/enable")).then(function (response) {
          _this12.logSystemActivity(id, 6, 607, []);
          _this12.postSuccess('Label enabled');
        })["catch"](function (error) {
          console.log(error);
        })["finally"](function () {
          _this12.getLabels();
        });
      }
    },
    checkProduct: function checkProduct(code, group, status) {
      var _this13 = this;
      if (status == 1) {
        axios.post("/labels/".concat(group, "/disable/product"), {
          code: code
        }).then(function (response) {
          _this13.logSystemActivity(group, 6, 605, {
            code: code,
            group: group
          });
          _this13.postWarning('Label disabled');
        })["catch"](function (error) {
          console.log(error);
        })["finally"](function () {
          _this13.getProducts(group);
        });
      } else {
        axios.post("/labels/".concat(group, "/enable/product"), {
          code: code
        }).then(function (response) {
          _this13.logSystemActivity(group, 6, 606, {
            code: code,
            group: group
          });
          _this13.postSuccess('Label enabled');
        })["catch"](function (error) {
          console.log(error);
        })["finally"](function () {
          _this13.getProducts(group);
        });
      }
    }
  }
});

/***/ }),

/***/ "./resources/assets/js/mixins/logging.js":
/*!***********************************************!*\
  !*** ./resources/assets/js/mixins/logging.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  methods: {
    logSystemActivity: function logSystemActivity(id, type) {
      var messageKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var data = arguments.length > 3 ? arguments[3] : undefined;
      var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      axios.post("/logs/system/".concat(id), {
        type: type,
        data: data,
        messageKey: messageKey
      }).then(function (response) {
        if (callback) {
          callback();
        }
      })["catch"](function (error) {
        console.warn(error);
      });
    }
  }
});

/***/ }),

/***/ "./resources/assets/js/components/pages/label/LabelEdit.vue":
/*!******************************************************************!*\
  !*** ./resources/assets/js/components/pages/label/LabelEdit.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _LabelEdit_vue_vue_type_template_id_6007c7d1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LabelEdit.vue?vue&type=template&id=6007c7d1& */ "./resources/assets/js/components/pages/label/LabelEdit.vue?vue&type=template&id=6007c7d1&");
/* harmony import */ var _LabelEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LabelEdit.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/pages/label/LabelEdit.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LabelEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LabelEdit_vue_vue_type_template_id_6007c7d1___WEBPACK_IMPORTED_MODULE_0__.render,
  _LabelEdit_vue_vue_type_template_id_6007c7d1___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/pages/label/LabelEdit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/pages/label/Labels.vue":
/*!***************************************************************!*\
  !*** ./resources/assets/js/components/pages/label/Labels.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Labels_vue_vue_type_template_id_648c7bdc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Labels.vue?vue&type=template&id=648c7bdc& */ "./resources/assets/js/components/pages/label/Labels.vue?vue&type=template&id=648c7bdc&");
/* harmony import */ var _Labels_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Labels.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/pages/label/Labels.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Labels_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Labels_vue_vue_type_template_id_648c7bdc___WEBPACK_IMPORTED_MODULE_0__.render,
  _Labels_vue_vue_type_template_id_648c7bdc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/pages/label/Labels.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/pages/label/LabelEdit.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/label/LabelEdit.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LabelEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./LabelEdit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/label/LabelEdit.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LabelEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/pages/label/Labels.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/label/Labels.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Labels_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Labels.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/label/Labels.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Labels_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/pages/label/LabelEdit.vue?vue&type=template&id=6007c7d1&":
/*!*************************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/label/LabelEdit.vue?vue&type=template&id=6007c7d1& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LabelEdit_vue_vue_type_template_id_6007c7d1___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LabelEdit_vue_vue_type_template_id_6007c7d1___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LabelEdit_vue_vue_type_template_id_6007c7d1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./LabelEdit.vue?vue&type=template&id=6007c7d1& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/label/LabelEdit.vue?vue&type=template&id=6007c7d1&");


/***/ }),

/***/ "./resources/assets/js/components/pages/label/Labels.vue?vue&type=template&id=648c7bdc&":
/*!**********************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/label/Labels.vue?vue&type=template&id=648c7bdc& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Labels_vue_vue_type_template_id_648c7bdc___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Labels_vue_vue_type_template_id_648c7bdc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Labels_vue_vue_type_template_id_648c7bdc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Labels.vue?vue&type=template&id=648c7bdc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/label/Labels.vue?vue&type=template&id=648c7bdc&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/label/LabelEdit.vue?vue&type=template&id=6007c7d1&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/label/LabelEdit.vue?vue&type=template&id=6007c7d1& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
    _vm.visible
      ? _c(
          "div",
          {
            staticClass: "esa-modal",
            attrs: {
              id: "productEditor",
              tabindex: "-1",
              role: "dialog",
              "aria-labelledby": "itemEditorLabel",
              "aria-modal": "true",
            },
          },
          [
            _c("div", {
              staticClass: "backdrop",
              on: {
                click: function ($event) {
                  return _vm.clear()
                },
              },
            }),
            _vm._v(" "),
            _c("div", { staticClass: "modal", attrs: { role: "document" } }, [
              _c("div", { staticClass: "modal-header" }, [
                _c("h3", { staticClass: "heading lead" }, [
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.title) +
                      "\n                "
                  ),
                ]),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    staticClass: "close",
                    on: {
                      click: function ($event) {
                        return _vm.clear()
                      },
                    },
                  },
                  [_vm._v("X")]
                ),
              ]),
              _vm._v(" "),
              _vm.productCodeId && !_vm.pricingId && !_vm.editing
                ? _c(
                    "div",
                    {
                      staticClass: "modal-header",
                      staticStyle: {
                        background: "transparent",
                        "box-shadow": "none",
                        "border-bottom": "1px solid gainsboro",
                        display: "flex",
                        "align-items": "center",
                      },
                    },
                    [
                      _c(
                        "button",
                        {
                          staticClass: "btn btnSize02 tertiaryBtn",
                          on: {
                            click: function ($event) {
                              return _vm.editProduct(_vm.productCode)
                            },
                          },
                        },
                        [
                          _vm._v(
                            "\n                    Update Product Code\n                "
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.productCodeId,
                              expression: "productCodeId",
                            },
                          ],
                          staticClass: "ml-10 browser-default custom-select",
                          attrs: { name: "ProductCodeID" },
                          on: {
                            change: function ($event) {
                              var $$selectedVal = Array.prototype.filter
                                .call($event.target.options, function (o) {
                                  return o.selected
                                })
                                .map(function (o) {
                                  var val = "_value" in o ? o._value : o.value
                                  return val
                                })
                              _vm.productCodeId = $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            },
                          },
                        },
                        [
                          _c("option", { attrs: { value: "" } }, [
                            _vm._v("SELECT"),
                          ]),
                          _vm._v(" "),
                          _vm._l(_vm.options, function (option) {
                            return _c(
                              "option",
                              {
                                key: option.ProductCodeID,
                                domProps: { value: option.ProductCodeID },
                              },
                              [_vm._v(_vm._s(option.Name))]
                            )
                          }),
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _vm.productCode.Status == 1
                        ? _c(
                            "button",
                            {
                              staticClass: "ml-10 btn btnSize02 tertiaryBtn",
                              on: {
                                click: function ($event) {
                                  return _vm.deleteProduct()
                                },
                              },
                            },
                            [
                              _vm._v(
                                "\n                    DEACTIVATE ProductCode\n                "
                              ),
                            ]
                          )
                        : _c(
                            "button",
                            {
                              staticClass: "ml-10 btn btnSize02 tertiaryBtn",
                              on: {
                                click: function ($event) {
                                  return _vm.reactivateProduct()
                                },
                              },
                            },
                            [
                              _vm._v(
                                "\n                    ACTIVATE ProductCode\n                "
                              ),
                            ]
                          ),
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("div", { staticClass: "modal-body text-center" }, [
                _c(
                  "div",
                  { staticClass: "expand-100 d-flex justify-content-between" },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "row wow fadeIn",
                        staticStyle: { width: "100%" },
                      },
                      [
                        _vm.productCodeId && !_vm.pricingId && !_vm.editing
                          ? _c("div", { staticClass: "col-lg-12 wow fadeIn" }, [
                              _vm.list.length > 0
                                ? _c(
                                    "table",
                                    {
                                      staticClass: "table table-hover",
                                      attrs: { id: "products-table" },
                                    },
                                    [
                                      _c(
                                        "thead",
                                        {
                                          staticClass:
                                            "primary-color text-white",
                                        },
                                        [
                                          _vm._l(
                                            _vm.list[0],
                                            function (value, key) {
                                              return ![
                                                "UnformattedPrice",
                                                "PricingID",
                                              ].includes(key)
                                                ? _c("th", { key: key }, [
                                                    _vm._v(
                                                      "\n                                        " +
                                                        _vm._s(key) +
                                                        "\n                                    "
                                                    ),
                                                  ])
                                                : _vm._e()
                                            }
                                          ),
                                          _vm._v(" "),
                                          _c("th", [
                                            _vm._v(
                                              "\n                                        Options\n                                    "
                                            ),
                                          ]),
                                        ],
                                        2
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "tbody",
                                        _vm._l(_vm.list, function (value) {
                                          return _c(
                                            "tr",
                                            { key: value.Code },
                                            [
                                              _vm._l(value, function (v, k) {
                                                return ![
                                                  "UnformattedPrice",
                                                  "PricingID",
                                                ].includes(k)
                                                  ? _c("td", { key: k }, [
                                                      _vm._v(
                                                        "\n                                            " +
                                                          _vm._s(v) +
                                                          "\n                                        "
                                                      ),
                                                    ])
                                                  : _vm._e()
                                              }),
                                              _vm._v(" "),
                                              _c("td", [
                                                _c(
                                                  "button",
                                                  {
                                                    staticClass: "table-icon",
                                                    on: {
                                                      click: function ($event) {
                                                        return _vm.edit(value)
                                                      },
                                                    },
                                                  },
                                                  [
                                                    _c("i", {
                                                      staticClass: "fa fa-edit",
                                                      staticStyle: {
                                                        color: "white",
                                                      },
                                                    }),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                value.ClientID != "DEFAULT"
                                                  ? _c(
                                                      "button",
                                                      {
                                                        staticClass:
                                                          "table-icon",
                                                        on: {
                                                          click: function (
                                                            $event
                                                          ) {
                                                            return _vm.removePricing(
                                                              value.PricingID
                                                            )
                                                          },
                                                        },
                                                      },
                                                      [
                                                        _c("i", {
                                                          staticClass:
                                                            "fa fa-trash",
                                                          staticStyle: {
                                                            color: "white",
                                                          },
                                                        }),
                                                      ]
                                                    )
                                                  : _vm._e(),
                                              ]),
                                            ],
                                            2
                                          )
                                        }),
                                        0
                                      ),
                                    ]
                                  )
                                : _vm._e(),
                            ])
                          : !_vm.productCodeId && _vm.type == "country"
                          ? _c("div", { staticClass: "pxp-form" }, [
                              _c("div", { staticClass: "form-column" }, [
                                _c(
                                  "div",
                                  { staticClass: "form-group form-group-2" },
                                  [
                                    _c(
                                      "label",
                                      { attrs: { for: "CountryID" } },
                                      [_vm._v("Select Country")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.form.country.country,
                                            expression: "form.country.country",
                                          },
                                        ],
                                        staticClass:
                                          "browser-default custom-select",
                                        attrs: { name: "CountryID" },
                                        on: {
                                          change: function ($event) {
                                            var $$selectedVal =
                                              Array.prototype.filter
                                                .call(
                                                  $event.target.options,
                                                  function (o) {
                                                    return o.selected
                                                  }
                                                )
                                                .map(function (o) {
                                                  var val =
                                                    "_value" in o
                                                      ? o._value
                                                      : o.value
                                                  return val
                                                })
                                            _vm.$set(
                                              _vm.form.country,
                                              "country",
                                              $event.target.multiple
                                                ? $$selectedVal
                                                : $$selectedVal[0]
                                            )
                                          },
                                        },
                                      },
                                      _vm._l(_vm.countries, function (country) {
                                        return _c(
                                          "option",
                                          {
                                            key: country.CountryID,
                                            domProps: {
                                              value: country.CountryID,
                                            },
                                          },
                                          [_vm._v(_vm._s(country.Name))]
                                        )
                                      }),
                                      0
                                    ),
                                  ]
                                ),
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "form-column" }, [
                                _c(
                                  "div",
                                  { staticClass: "form-group form-group-2" },
                                  [
                                    _c("label", { attrs: { for: "Price" } }, [
                                      _vm._v("Price"),
                                    ]),
                                    _vm._v(" "),
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.form.country.price,
                                          expression: "form.country.price",
                                        },
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        name: "Price",
                                        autocomplete: "off",
                                        type: "number",
                                        id: "value",
                                        placeholder: "Default Price",
                                      },
                                      domProps: {
                                        value: _vm.form.country.price,
                                      },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.form.country,
                                            "price",
                                            $event.target.value
                                          )
                                        },
                                      },
                                    }),
                                  ]
                                ),
                              ]),
                            ])
                          : _vm.pricingId && _vm.editing
                          ? _c("div", { staticClass: "pxp-form" }, [
                              _c("div", { staticClass: "form-column" }, [
                                _c(
                                  "div",
                                  { staticClass: "form-group form-group-2" },
                                  [
                                    _c("label", { attrs: { for: "Price" } }, [
                                      _vm._v("Price"),
                                    ]),
                                    _vm._v(" "),
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.form.country.price,
                                          expression: "form.country.price",
                                        },
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        name: "Price",
                                        autocomplete: "off",
                                        type: "number",
                                        id: "value",
                                        placeholder: "Price",
                                      },
                                      domProps: {
                                        value: _vm.form.country.price,
                                      },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.form.country,
                                            "price",
                                            $event.target.value
                                          )
                                        },
                                      },
                                    }),
                                  ]
                                ),
                              ]),
                            ])
                          : _vm.type == "pricing" && _vm.editing
                          ? _c("div", { staticClass: "pxp-form wow fadeIn" }, [
                              _c("div", { staticClass: "form-column" }, [
                                _c(
                                  "div",
                                  { staticClass: "form-group form-group-2" },
                                  [
                                    _c(
                                      "label",
                                      { attrs: { for: "ClientID" } },
                                      [_vm._v("Client")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.form.pricing.client,
                                            expression: "form.pricing.client",
                                          },
                                        ],
                                        staticClass:
                                          "browser-default custom-select",
                                        attrs: { name: "ClientID" },
                                        on: {
                                          change: function ($event) {
                                            var $$selectedVal =
                                              Array.prototype.filter
                                                .call(
                                                  $event.target.options,
                                                  function (o) {
                                                    return o.selected
                                                  }
                                                )
                                                .map(function (o) {
                                                  var val =
                                                    "_value" in o
                                                      ? o._value
                                                      : o.value
                                                  return val
                                                })
                                            _vm.$set(
                                              _vm.form.pricing,
                                              "client",
                                              $event.target.multiple
                                                ? $$selectedVal
                                                : $$selectedVal[0]
                                            )
                                          },
                                        },
                                      },
                                      [
                                        _c(
                                          "option",
                                          { domProps: { value: 0 } },
                                          [_vm._v("DEFAULT")]
                                        ),
                                        _vm._v(" "),
                                        _vm._l(_vm.clients, function (company) {
                                          return _c(
                                            "option",
                                            {
                                              key: company.ClientID,
                                              domProps: {
                                                value: company.ClientID,
                                              },
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(company.CompanyName)
                                              ),
                                            ]
                                          )
                                        }),
                                      ],
                                      2
                                    ),
                                  ]
                                ),
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "form-column" }, [
                                _c(
                                  "div",
                                  { staticClass: "form-group form-group-2" },
                                  [
                                    _c("label", { attrs: { for: "Price" } }, [
                                      _vm._v("Price"),
                                    ]),
                                    _vm._v(" "),
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.form.pricing.price,
                                          expression: "form.pricing.price",
                                        },
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        name: "Price",
                                        autocomplete: "off",
                                        type: "number",
                                        id: "value",
                                        placeholder: "Price",
                                      },
                                      domProps: {
                                        value: _vm.form.pricing.price,
                                      },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.form.pricing,
                                            "price",
                                            $event.target.value
                                          )
                                        },
                                      },
                                    }),
                                  ]
                                ),
                              ]),
                            ])
                          : _vm.type == "product" && _vm.editing
                          ? _c("div", { staticClass: "pxp-form wow fadeIn" }, [
                              _c("div", { staticClass: "form-column" }, [
                                _c(
                                  "div",
                                  { staticClass: "form-group form-group-2" },
                                  [
                                    _c("label", { attrs: { for: "code" } }, [
                                      _vm._v("Code"),
                                    ]),
                                    _vm._v(" "),
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.productCodeEdit.Code,
                                          expression: "productCodeEdit.Code",
                                        },
                                      ],
                                      staticClass: "form-control mb-3",
                                      attrs: {
                                        type: "text",
                                        id: "code",
                                        placeholder: "Code",
                                      },
                                      domProps: {
                                        value: _vm.productCodeEdit.Code,
                                      },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.productCodeEdit,
                                            "Code",
                                            $event.target.value
                                          )
                                        },
                                      },
                                    }),
                                    _vm._v(" "),
                                    _c("label", { attrs: { for: "code" } }, [
                                      _vm._v(
                                        "CAUTION : changing this will affect pricing"
                                      ),
                                    ]),
                                    _vm._v(" "),
                                    _vm.errors.Code
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "invalid-feedback d-block",
                                          },
                                          [_vm._v(_vm._s(_vm.errors.Code[0]))]
                                        )
                                      : _vm._e(),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group form-group-2" },
                                  [
                                    _c("label", { attrs: { for: "name" } }, [
                                      _vm._v("Name"),
                                    ]),
                                    _vm._v(" "),
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.productCodeEdit.Name,
                                          expression: "productCodeEdit.Name",
                                        },
                                      ],
                                      staticClass: "form-control mb-3",
                                      attrs: {
                                        type: "text",
                                        id: "name",
                                        placeholder: "Name",
                                      },
                                      domProps: {
                                        value: _vm.productCodeEdit.Name,
                                      },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.productCodeEdit,
                                            "Name",
                                            $event.target.value
                                          )
                                        },
                                      },
                                    }),
                                    _vm._v(" "),
                                    _vm.errors.Name
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "invalid-feedback d-block",
                                          },
                                          [_vm._v(_vm._s(_vm.errors.Name[0]))]
                                        )
                                      : _vm._e(),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group form-group-2" },
                                  [
                                    _c(
                                      "label",
                                      { attrs: { for: "Quantity" } },
                                      [_vm._v("Quantity")]
                                    ),
                                    _vm._v(" "),
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.productCodeEdit.Quantity,
                                          expression:
                                            "productCodeEdit.Quantity",
                                        },
                                      ],
                                      staticClass: "form-control mb-3",
                                      attrs: {
                                        type: "text",
                                        id: "Quantity",
                                        placeholder: "Quantity",
                                      },
                                      domProps: {
                                        value: _vm.productCodeEdit.Quantity,
                                      },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.productCodeEdit,
                                            "Quantity",
                                            $event.target.value
                                          )
                                        },
                                      },
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "label",
                                      { attrs: { for: "Quantity" } },
                                      [
                                        _vm._v(
                                          "CAUTION : changing this will affect pricing"
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _vm.errors.Quantity
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "invalid-feedback d-block",
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(_vm.errors.Quantity[0])
                                            ),
                                          ]
                                        )
                                      : _vm._e(),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group form-group-2" },
                                  [
                                    _c("label", { attrs: { for: "Units" } }, [
                                      _vm._v("Units"),
                                    ]),
                                    _vm._v(" "),
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.productCodeEdit.Units,
                                          expression: "productCodeEdit.Units",
                                        },
                                      ],
                                      staticClass: "form-control mb-3",
                                      attrs: {
                                        type: "text",
                                        id: "Units",
                                        placeholder: "Units",
                                      },
                                      domProps: {
                                        value: _vm.productCodeEdit.Units,
                                      },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.productCodeEdit,
                                            "Units",
                                            $event.target.value
                                          )
                                        },
                                      },
                                    }),
                                    _vm._v(" "),
                                    _vm.errors.Units
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "invalid-feedback d-block",
                                          },
                                          [_vm._v(_vm._s(_vm.errors.Units[0]))]
                                        )
                                      : _vm._e(),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group form-group-2" },
                                  [
                                    _c(
                                      "label",
                                      { attrs: { for: "TariffCode" } },
                                      [_vm._v("Tariff Code")]
                                    ),
                                    _vm._v(" "),
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.productCodeEdit.TariffCode,
                                          expression:
                                            "productCodeEdit.TariffCode",
                                        },
                                      ],
                                      staticClass: "form-control mb-3",
                                      attrs: {
                                        type: "text",
                                        id: "TariffCode",
                                        placeholder: "Tariff Code",
                                      },
                                      domProps: {
                                        value: _vm.productCodeEdit.TariffCode,
                                      },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.productCodeEdit,
                                            "TariffCode",
                                            $event.target.value
                                          )
                                        },
                                      },
                                    }),
                                    _vm._v(" "),
                                    _vm.errors.TariffCode
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "invalid-feedback d-block",
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(_vm.errors.TariffCode[0])
                                            ),
                                          ]
                                        )
                                      : _vm._e(),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group form-group-2" },
                                  [
                                    _c("label", { attrs: { for: "Fridge" } }, [
                                      _vm._v("Fridge"),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.productCodeEdit.Fridge,
                                            expression:
                                              "productCodeEdit.Fridge",
                                          },
                                        ],
                                        staticClass:
                                          "browser-default custom-select",
                                        attrs: { name: "Fridge" },
                                        on: {
                                          change: function ($event) {
                                            var $$selectedVal =
                                              Array.prototype.filter
                                                .call(
                                                  $event.target.options,
                                                  function (o) {
                                                    return o.selected
                                                  }
                                                )
                                                .map(function (o) {
                                                  var val =
                                                    "_value" in o
                                                      ? o._value
                                                      : o.value
                                                  return val
                                                })
                                            _vm.$set(
                                              _vm.productCodeEdit,
                                              "Fridge",
                                              $event.target.multiple
                                                ? $$selectedVal
                                                : $$selectedVal[0]
                                            )
                                          },
                                        },
                                      },
                                      [
                                        _vm.productCodeEdit.Units == "SHIPPING"
                                          ? _c(
                                              "option",
                                              { domProps: { value: null } },
                                              [_vm._v("NOT APPLICABLE")]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.productCodeEdit.Units != "SHIPPING"
                                          ? _c(
                                              "option",
                                              {
                                                attrs: {
                                                  value: "0",
                                                  selected: "",
                                                },
                                              },
                                              [_vm._v("No")]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.productCodeEdit.Units != "SHIPPING"
                                          ? _c(
                                              "option",
                                              { attrs: { value: "1" } },
                                              [_vm._v("Yes")]
                                            )
                                          : _vm._e(),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _vm.errors.Fridge
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "invalid-feedback d-block",
                                          },
                                          [_vm._v(_vm._s(_vm.errors.Fridge[0]))]
                                        )
                                      : _vm._e(),
                                  ]
                                ),
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "form-column" }, [
                                _c(
                                  "div",
                                  { staticClass: "form-group form-group-2" },
                                  [
                                    _c(
                                      "label",
                                      { attrs: { for: "ProductType" } },
                                      [_vm._v("Product Type")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value:
                                              _vm.productCodeEdit.ProductType,
                                            expression:
                                              "productCodeEdit.ProductType",
                                          },
                                        ],
                                        staticClass:
                                          "browser-default custom-select",
                                        attrs: { name: "ProductType" },
                                        on: {
                                          change: function ($event) {
                                            var $$selectedVal =
                                              Array.prototype.filter
                                                .call(
                                                  $event.target.options,
                                                  function (o) {
                                                    return o.selected
                                                  }
                                                )
                                                .map(function (o) {
                                                  var val =
                                                    "_value" in o
                                                      ? o._value
                                                      : o.value
                                                  return val
                                                })
                                            _vm.$set(
                                              _vm.productCodeEdit,
                                              "ProductType",
                                              $event.target.multiple
                                                ? $$selectedVal
                                                : $$selectedVal[0]
                                            )
                                          },
                                        },
                                      },
                                      [
                                        _c(
                                          "option",
                                          {
                                            attrs: { value: "1", selected: "" },
                                          },
                                          [_vm._v("Medicine")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "option",
                                          { attrs: { value: "2" } },
                                          [_vm._v("Test Kit")]
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _vm.errors.ProductType
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "invalid-feedback d-block",
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(_vm.errors.ProductType[0])
                                            ),
                                          ]
                                        )
                                      : _vm._e(),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group form-group-2" },
                                  [
                                    _c("label", { attrs: { for: "OTC" } }, [
                                      _vm._v("Reclassification"),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.productCodeEdit.OTC,
                                            expression: "productCodeEdit.OTC",
                                          },
                                        ],
                                        staticClass:
                                          "browser-default custom-select",
                                        attrs: { name: "OTC" },
                                        on: {
                                          change: function ($event) {
                                            var $$selectedVal =
                                              Array.prototype.filter
                                                .call(
                                                  $event.target.options,
                                                  function (o) {
                                                    return o.selected
                                                  }
                                                )
                                                .map(function (o) {
                                                  var val =
                                                    "_value" in o
                                                      ? o._value
                                                      : o.value
                                                  return val
                                                })
                                            _vm.$set(
                                              _vm.productCodeEdit,
                                              "OTC",
                                              $event.target.multiple
                                                ? $$selectedVal
                                                : $$selectedVal[0]
                                            )
                                          },
                                        },
                                      },
                                      [
                                        _c(
                                          "option",
                                          {
                                            attrs: { value: "0", selected: "" },
                                          },
                                          [_vm._v("POM")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "option",
                                          { attrs: { value: "1" } },
                                          [_vm._v("p")]
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _vm.errors.OTC
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "invalid-feedback d-block",
                                          },
                                          [_vm._v(_vm._s(_vm.errors.OTC[0]))]
                                        )
                                      : _vm._e(),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group form-group-2" },
                                  [
                                    _c("label", { attrs: { for: "Pack" } }, [
                                      _vm._v("Pack"),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.productCodeEdit.Pack,
                                            expression: "productCodeEdit.Pack",
                                          },
                                        ],
                                        staticClass:
                                          "browser-default custom-select",
                                        attrs: { name: "Pack" },
                                        on: {
                                          change: function ($event) {
                                            var $$selectedVal =
                                              Array.prototype.filter
                                                .call(
                                                  $event.target.options,
                                                  function (o) {
                                                    return o.selected
                                                  }
                                                )
                                                .map(function (o) {
                                                  var val =
                                                    "_value" in o
                                                      ? o._value
                                                      : o.value
                                                  return val
                                                })
                                            _vm.$set(
                                              _vm.productCodeEdit,
                                              "Pack",
                                              $event.target.multiple
                                                ? $$selectedVal
                                                : $$selectedVal[0]
                                            )
                                          },
                                        },
                                      },
                                      [
                                        _c(
                                          "option",
                                          {
                                            attrs: { value: "0", selected: "" },
                                          },
                                          [_vm._v("No")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "option",
                                          { attrs: { value: "1" } },
                                          [_vm._v("Yes")]
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _vm.errors.Pack
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "invalid-feedback d-block",
                                          },
                                          [_vm._v(_vm._s(_vm.errors.Pack[0]))]
                                        )
                                      : _vm._e(),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group form-group-2" },
                                  [
                                    _c("label", { attrs: { for: "Status" } }, [
                                      _vm._v("Status"),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.productCodeEdit.Status,
                                            expression:
                                              "productCodeEdit.Status",
                                          },
                                        ],
                                        staticClass:
                                          "browser-default custom-select",
                                        attrs: { name: "Status" },
                                        on: {
                                          change: function ($event) {
                                            var $$selectedVal =
                                              Array.prototype.filter
                                                .call(
                                                  $event.target.options,
                                                  function (o) {
                                                    return o.selected
                                                  }
                                                )
                                                .map(function (o) {
                                                  var val =
                                                    "_value" in o
                                                      ? o._value
                                                      : o.value
                                                  return val
                                                })
                                            _vm.$set(
                                              _vm.productCodeEdit,
                                              "Status",
                                              $event.target.multiple
                                                ? $$selectedVal
                                                : $$selectedVal[0]
                                            )
                                          },
                                        },
                                      },
                                      [
                                        _c(
                                          "option",
                                          {
                                            attrs: { value: "1", selected: "" },
                                          },
                                          [_vm._v("Active")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "option",
                                          { attrs: { value: "0" } },
                                          [_vm._v("Inactive")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "option",
                                          { attrs: { value: "2" } },
                                          [_vm._v("Discontinued")]
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _vm.errors.Status
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "invalid-feedback d-block",
                                          },
                                          [_vm._v(_vm._s(_vm.errors.Status[0]))]
                                        )
                                      : _vm._e(),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group form-group-2" },
                                  [
                                    _c("label", { attrs: { for: "VAT" } }, [
                                      _vm._v("VAT %"),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.productCodeEdit.VAT,
                                            expression: "productCodeEdit.VAT",
                                          },
                                        ],
                                        staticClass:
                                          "browser-default custom-select",
                                        attrs: { name: "VAT" },
                                        on: {
                                          change: function ($event) {
                                            var $$selectedVal =
                                              Array.prototype.filter
                                                .call(
                                                  $event.target.options,
                                                  function (o) {
                                                    return o.selected
                                                  }
                                                )
                                                .map(function (o) {
                                                  var val =
                                                    "_value" in o
                                                      ? o._value
                                                      : o.value
                                                  return val
                                                })
                                            _vm.$set(
                                              _vm.productCodeEdit,
                                              "VAT",
                                              $event.target.multiple
                                                ? $$selectedVal
                                                : $$selectedVal[0]
                                            )
                                          },
                                        },
                                      },
                                      [
                                        _c(
                                          "option",
                                          {
                                            attrs: { value: "", disabled: "" },
                                          },
                                          [_vm._v("Please select VAT value")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "option",
                                          {
                                            attrs: { value: "0", selected: "" },
                                          },
                                          [_vm._v("0.00%")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "option",
                                          { attrs: { value: "5" } },
                                          [_vm._v("5.00%")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "option",
                                          { attrs: { value: "20" } },
                                          [_vm._v("20.00%")]
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _vm.errors.VAT
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "invalid-feedback d-block",
                                          },
                                          [_vm._v(_vm._s(_vm.errors.VAT[0]))]
                                        )
                                      : _vm._e(),
                                  ]
                                ),
                              ]),
                            ])
                          : _vm._e(),
                      ]
                    ),
                  ]
                ),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "modal-footer" }, [
                _vm.editing
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btnSize02 tertiaryBtn",
                        attrs: { disabled: _vm.saving, type: "button" },
                        on: {
                          click: function ($event) {
                            return _vm.save()
                          },
                        },
                      },
                      [
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm.saveButtonText) +
                            "\n                "
                        ),
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                !_vm.editing && _vm.productCodeId
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btnSize02 tertiaryBtn",
                        attrs: { disabled: _vm.saving, type: "button" },
                        on: {
                          click: function ($event) {
                            return _vm.addPricing()
                          },
                        },
                      },
                      [
                        _vm._v(
                          "\n                    Add New Pricing\n                "
                        ),
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.editing && _vm.productCodeId
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btnSize02 tertiaryBtn",
                        attrs: { disabled: _vm.saving, type: "button" },
                        on: {
                          click: function ($event) {
                            return _vm.back()
                          },
                        },
                      },
                      [_vm._v("\n                    Back\n                ")]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btnSize02 tertiaryBtn",
                    attrs: { disabled: _vm.saving, type: "button" },
                    on: {
                      click: function ($event) {
                        return _vm.clear()
                      },
                    },
                  },
                  [_vm._v("\n                    Cancel\n                ")]
                ),
              ]),
            ]),
          ]
        )
      : _vm._e(),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/label/Labels.vue?vue&type=template&id=648c7bdc&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/label/Labels.vue?vue&type=template&id=648c7bdc& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "section",
    { staticClass: "products natcol-table content" },
    [
      _c("section", { staticClass: "card" }, [
        _vm._m(0),
        _vm._v(" "),
        _c("div", { staticClass: "products-header mb-10" }, [
          _c("div", { staticClass: "products-navigation" }, [
            _c(
              "div",
              {
                staticClass: "products-buttons",
                staticStyle: {
                  display: "flex",
                  "align-items": "center",
                  "justify-content": "center",
                },
              },
              [
                _c(
                  "button",
                  {
                    staticClass: "btn btnSize02 secondaryBtn mt-10 ml-10",
                    attrs: { title: "Add New Cautionary and Advisory Label" },
                    on: {
                      click: function ($event) {
                        return _vm.addGroup()
                      },
                    },
                  },
                  [
                    _c("i", { staticClass: "fa fa-plus" }),
                    _vm._v(" Add New Group\n                    "),
                  ]
                ),
                _vm._v(" "),
                _c("treeselect", {
                  staticClass: "mt-10 ml-10",
                  attrs: {
                    async: true,
                    searchable: true,
                    multiple: true,
                    "close-on-select": false,
                    "open-on-click": true,
                    "open-on-focus": true,
                    "clear-on-select": true,
                    "disable-branch-nodes": true,
                    placeholder: "Select Product",
                    "show-count": true,
                    "default-expand-level": 1,
                    "default-options": _vm.productsList,
                    "load-options": _vm.loadOptions,
                    "append-to-body": true,
                    disabled: _vm.loading,
                  },
                  model: {
                    value: _vm.productFilter,
                    callback: function ($$v) {
                      _vm.productFilter = $$v
                    },
                    expression: "productFilter",
                  },
                }),
              ],
              1
            ),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "card-body" }, [
          _c(
            "div",
            {
              staticClass: "products-body",
              attrs: { id: "warning-label-table" },
            },
            [
              _c(
                "table",
                { staticClass: "table table-hover" },
                [
                  _c("thead", { staticClass: "primary-color text-white" }, [
                    _c(
                      "tr",
                      _vm._l(_vm.visibleColumns, function (value, key) {
                        return _c("th", { key: key }, [
                          _c("span", [_vm._v(_vm._s(value))]),
                        ])
                      }),
                      0
                    ),
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.groupedLabels, function (v, k) {
                    return _vm.labels.length > 0
                      ? _c(
                          "tbody",
                          { key: k },
                          [
                            _c("tr", [
                              _c(
                                "td",
                                {
                                  staticStyle: {
                                    background: "rgb(60 165 168)",
                                    border: "solid 1px rgb(60 165 168)",
                                    color: "#fff",
                                    "padding-left": "15px!important",
                                    "font-size": "18px",
                                  },
                                  attrs: { colspan: "2" },
                                },
                                [
                                  v.group == 0
                                    ? _c("span", [_vm._v("New Group")])
                                    : _c("span", [
                                        _vm._v("Group " + _vm._s(v.group)),
                                      ]),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "td",
                                {
                                  staticStyle: {
                                    background: "rgb(60 165 168)",
                                    border: "solid 1px rgb(60 165 168)",
                                    color: "#fff",
                                  },
                                  attrs: { colspan: "1" },
                                },
                                [
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btn-primary waves-effect table-icon",
                                      attrs: { title: "Add Label" },
                                      on: {
                                        click: function ($event) {
                                          return _vm.addLabel(v.group)
                                        },
                                      },
                                    },
                                    [_c("i", { staticClass: "fa fa-plus" })]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btn-primary waves-effect table-icon",
                                      attrs: { title: "Show products" },
                                      on: {
                                        click: function ($event) {
                                          return _vm.showProducts(v.group)
                                        },
                                      },
                                    },
                                    [
                                      _c("i", {
                                        staticClass: "fa",
                                        class: [
                                          _vm.productsExpanded.includes(v.group)
                                            ? "fa-caret-up"
                                            : "fa-caret-down",
                                        ],
                                      }),
                                    ]
                                  ),
                                ]
                              ),
                            ]),
                            _vm._v(" "),
                            _vm.productsExpanded.includes(v.group)
                              ? _c("tr", [
                                  _c("td", { attrs: { colspan: "3" } }, [
                                    _vm.products[v.group] &&
                                    _vm.products[v.group].length > 0
                                      ? _c("table", [
                                          _c("thead", [
                                            _c("tr", [
                                              _c(
                                                "th",
                                                {
                                                  staticStyle: {
                                                    background: "white",
                                                    "border-bottom":
                                                      "1px solid gainsboro",
                                                  },
                                                  attrs: { colspan: "4" },
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticStyle: {
                                                        display: "flex",
                                                        "justify-content":
                                                          "flex-start",
                                                        "align-items": "center",
                                                      },
                                                    },
                                                    [
                                                      _c("treeselect", {
                                                        attrs: {
                                                          "disable-branch-nodes": true,
                                                          placeholder:
                                                            "Select Product",
                                                          "show-count": true,
                                                          "default-expand-level": 1,
                                                          "load-options":
                                                            _vm.loadOptions,
                                                          async: true,
                                                          "append-to-body": true,
                                                          disabled: _vm.loading,
                                                        },
                                                        model: {
                                                          value:
                                                            _vm.productsAdd[
                                                              v.group
                                                            ],
                                                          callback: function (
                                                            $$v
                                                          ) {
                                                            _vm.$set(
                                                              _vm.productsAdd,
                                                              v.group,
                                                              $$v
                                                            )
                                                          },
                                                          expression:
                                                            "productsAdd[v.group]",
                                                        },
                                                      }),
                                                      _vm._v(" "),
                                                      _vm.productsAdd[v.group]
                                                        ? _c(
                                                            "button",
                                                            {
                                                              staticClass:
                                                                "btn btnSize02 tertiaryBtn ml-10",
                                                              on: {
                                                                click:
                                                                  function (
                                                                    $event
                                                                  ) {
                                                                    return _vm.addProduct(
                                                                      _vm
                                                                        .productsAdd[
                                                                        v.group
                                                                      ],
                                                                      v.group
                                                                    )
                                                                  },
                                                              },
                                                            },
                                                            [_vm._v("Add")]
                                                          )
                                                        : _vm._e(),
                                                    ],
                                                    1
                                                  ),
                                                ]
                                              ),
                                            ]),
                                            _vm._v(" "),
                                            _vm._m(1, true),
                                          ]),
                                          _vm._v(" "),
                                          _c(
                                            "tbody",
                                            _vm._l(
                                              _vm.products[v.group],
                                              function (product) {
                                                return _c(
                                                  "tr",
                                                  { key: product.Code },
                                                  [
                                                    _c("td", [
                                                      _vm._v(
                                                        "\n                                                " +
                                                          _vm._s(product.Code) +
                                                          "\n                                            "
                                                      ),
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("td", [
                                                      _vm._v(
                                                        "\n                                                " +
                                                          _vm._s(product.Name) +
                                                          " (" +
                                                          _vm._s(
                                                            product.Quantity
                                                          ) +
                                                          " " +
                                                          _vm._s(
                                                            product.Units
                                                          ) +
                                                          ")\n                                            "
                                                      ),
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("td", [
                                                      _c(
                                                        "button",
                                                        {
                                                          staticClass:
                                                            "btn btn-primary table-icon table-icon-danger",
                                                          attrs: {
                                                            title:
                                                              "Remove product from group",
                                                          },
                                                          on: {
                                                            click: function (
                                                              $event
                                                            ) {
                                                              return _vm.removeProduct(
                                                                product.ProductCodeID,
                                                                v.group
                                                              )
                                                            },
                                                          },
                                                        },
                                                        [
                                                          _c("i", {
                                                            staticClass:
                                                              "fa fa-trash",
                                                          }),
                                                        ]
                                                      ),
                                                    ]),
                                                  ]
                                                )
                                              }
                                            ),
                                            0
                                          ),
                                        ])
                                      : _c("div", [
                                          _c("ul", [
                                            _c(
                                              "li",
                                              {
                                                staticStyle: {
                                                  "padding-bottom": "10px",
                                                  "padding-top": "10px",
                                                },
                                              },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    staticStyle: {
                                                      display: "flex",
                                                      "justify-content":
                                                        "flex-start",
                                                      "align-items": "center",
                                                    },
                                                  },
                                                  [
                                                    _c("treeselect", {
                                                      attrs: {
                                                        "disable-branch-nodes": true,
                                                        placeholder:
                                                          "Select Product",
                                                        "show-count": true,
                                                        "default-expand-level": 1,
                                                        "load-options":
                                                          _vm.loadOptions,
                                                        async: true,
                                                        "append-to-body": true,
                                                        disabled: _vm.loading,
                                                      },
                                                      model: {
                                                        value:
                                                          _vm.productsAdd[
                                                            v.group
                                                          ],
                                                        callback: function (
                                                          $$v
                                                        ) {
                                                          _vm.$set(
                                                            _vm.productsAdd,
                                                            v.group,
                                                            $$v
                                                          )
                                                        },
                                                        expression:
                                                          "productsAdd[v.group]",
                                                      },
                                                    }),
                                                    _vm._v(" "),
                                                    _vm.productsAdd[v.group]
                                                      ? _c(
                                                          "button",
                                                          {
                                                            staticClass:
                                                              "btn btnSize02 tertiaryBtn ml-10",
                                                            on: {
                                                              click: function (
                                                                $event
                                                              ) {
                                                                return _vm.addProduct(
                                                                  _vm
                                                                    .productsAdd[
                                                                    v.group
                                                                  ],
                                                                  v.group
                                                                )
                                                              },
                                                            },
                                                          },
                                                          [_vm._v("Add")]
                                                        )
                                                      : _vm._e(),
                                                  ],
                                                  1
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c("li", [
                                              _vm._v(
                                                "No products found in this group"
                                              ),
                                            ]),
                                          ]),
                                        ]),
                                  ]),
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _vm._l(v.array, function (value) {
                              return _c("tr", { key: value.ProductCodeID }, [
                                value.editing
                                  ? _c(
                                      "td",
                                      {
                                        staticStyle: {
                                          "padding-left": "15px!important",
                                          "max-width": "120px!important",
                                        },
                                      },
                                      [
                                        _c(
                                          "select",
                                          {
                                            directives: [
                                              {
                                                name: "model",
                                                rawName: "v-model",
                                                value: value.CountryID,
                                                expression: "value.CountryID",
                                              },
                                            ],
                                            staticStyle: { padding: "5px" },
                                            attrs: { name: "country" },
                                            on: {
                                              change: function ($event) {
                                                var $$selectedVal =
                                                  Array.prototype.filter
                                                    .call(
                                                      $event.target.options,
                                                      function (o) {
                                                        return o.selected
                                                      }
                                                    )
                                                    .map(function (o) {
                                                      var val =
                                                        "_value" in o
                                                          ? o._value
                                                          : o.value
                                                      return val
                                                    })
                                                _vm.$set(
                                                  value,
                                                  "CountryID",
                                                  $event.target.multiple
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
                                                  key: country.CountryID,
                                                  domProps: {
                                                    value: country.CountryID,
                                                  },
                                                },
                                                [_vm._v(_vm._s(country.Name))]
                                              )
                                            }
                                          ),
                                          0
                                        ),
                                      ]
                                    )
                                  : _c(
                                      "td",
                                      {
                                        staticStyle: {
                                          "padding-left": "15px!important",
                                          "max-width": "120px!important",
                                        },
                                      },
                                      [
                                        _c("span", {
                                          domProps: {
                                            innerHTML: _vm._s(value.Country),
                                          },
                                        }),
                                      ]
                                    ),
                                _vm._v(" "),
                                _c("td", [
                                  !value.editing
                                    ? _c("div", {
                                        staticStyle: { padding: "10px" },
                                        domProps: {
                                          innerHTML: _vm._s(value.Description),
                                        },
                                      })
                                    : _c("textarea", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: value.Description,
                                            expression: "value.Description",
                                          },
                                        ],
                                        staticStyle: {
                                          width: "100%",
                                          padding: "5px",
                                        },
                                        attrs: { type: "text" },
                                        domProps: { value: value.Description },
                                        on: {
                                          input: function ($event) {
                                            if ($event.target.composing) {
                                              return
                                            }
                                            _vm.$set(
                                              value,
                                              "Description",
                                              $event.target.value
                                            )
                                          },
                                        },
                                      }),
                                ]),
                                _vm._v(" "),
                                _c("td", [
                                  !value.new
                                    ? _c("div", [
                                        !value.editing
                                          ? _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "btn btn-primary waves-effect table-icon",
                                                attrs: {
                                                  title: "Edit this label",
                                                },
                                                on: {
                                                  click: function ($event) {
                                                    return _vm.editLabel(value)
                                                  },
                                                },
                                              },
                                              [
                                                _c("i", {
                                                  staticClass: "fa fa-edit",
                                                }),
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        !value.editing
                                          ? _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "btn btn-primary table-icon table-icon-danger",
                                                attrs: {
                                                  title: "Delete this label",
                                                },
                                                on: {
                                                  click: function ($event) {
                                                    return _vm.deleteLabel(
                                                      value
                                                    )
                                                  },
                                                },
                                              },
                                              [
                                                _c("i", {
                                                  staticClass: "fa fa-trash",
                                                }),
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        value.editing
                                          ? _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "btn btn-primary waves-effect table-icon",
                                                attrs: {
                                                  title:
                                                    "Save changes to this label",
                                                },
                                                on: {
                                                  click: function ($event) {
                                                    return _vm.updateLabel(
                                                      value
                                                    )
                                                  },
                                                },
                                              },
                                              [
                                                _c("i", {
                                                  staticClass: "fa fa-save",
                                                }),
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        value.editing
                                          ? _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "btn btn-primary table-icon table-icon-danger",
                                                attrs: {
                                                  title:
                                                    "Undo changes to this label",
                                                },
                                                on: {
                                                  click: function ($event) {
                                                    return _vm.cancelEdit(value)
                                                  },
                                                },
                                              },
                                              [
                                                _c("i", {
                                                  staticClass: "fa fa-undo",
                                                }),
                                              ]
                                            )
                                          : _vm._e(),
                                      ])
                                    : _c("div", [
                                        value.editing
                                          ? _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "btn btn-primary waves-effect table-icon",
                                                attrs: { title: "Save label" },
                                                on: {
                                                  click: function ($event) {
                                                    return _vm.saveLabel(value)
                                                  },
                                                },
                                              },
                                              [
                                                _c("i", {
                                                  staticClass: "fa fa-save",
                                                }),
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        value.editing
                                          ? _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "btn btn-primary table-icon table-icon-danger",
                                                attrs: {
                                                  title:
                                                    "Cancel creating this label",
                                                },
                                                on: {
                                                  click: function ($event) {
                                                    return _vm.cancelLabel(
                                                      value
                                                    )
                                                  },
                                                },
                                              },
                                              [
                                                _c("i", {
                                                  staticClass: "fa fa-minus",
                                                }),
                                              ]
                                            )
                                          : _vm._e(),
                                      ]),
                                ]),
                              ])
                            }),
                          ],
                          2
                        )
                      : _c("tbody", [
                          _c("tr", [
                            _c(
                              "td",
                              { attrs: { colspan: _vm.visibleColumns.length } },
                              [
                                _c("div", { staticClass: "no-results-found" }, [
                                  _vm._v(
                                    "\n                                    No matching search results found!\n                                "
                                  ),
                                ]),
                              ]
                            ),
                          ]),
                        ])
                  }),
                ],
                2
              ),
            ]
          ),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "products-footer card-footer" }),
      ]),
      _vm._v(" "),
      _c("LabelEdit"),
    ],
    1
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c("h3", [_vm._v("Labels")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tr", [
      _c("th", [_vm._v("Code")]),
      _vm._v(" "),
      _c("th", [_vm._v("Name")]),
      _vm._v(" "),
      _c("th", [_vm._v("Tools")]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);