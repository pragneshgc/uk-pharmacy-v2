"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["PrescriptionPool"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/PrescriptionPool.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/PrescriptionPool.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mixins/errors */ "./resources/assets/js/mixins/errors.js");
/* harmony import */ var _pages_prescriptionpool_QuickTray_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/prescriptionpool/QuickTray.vue */ "./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    QuickTray: _pages_prescriptionpool_QuickTray_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  mixins: [_mixins_errors__WEBPACK_IMPORTED_MODULE_0__["default"]],
  data: function data() {
    return {
      idsVisible: false,
      showLogs: false,
      orders: [],
      dispensers: [],
      userInfo: userInfo,
      imgMap: {
        3: 'images/logo/tnt.png',
        4: 'images/logo/dpd.png',
        5: 'images/logo/rmail.png',
        7: 'images/logo/ups.png',
        70: 'images/logo/ups_access_point.jpg',
        8: 'images/logo/tnt.png',
        10: 'images/logo/dhl.png'
      }
    };
  },
  computed: {
    showListText: function showListText() {
      return this.idsVisible ? "Hide List of Order ID's" : "Show List of Order ID's";
    },
    availableCount: function availableCount() {
      return this.orders.filter(function (item) {
        return item.UserID === 0;
      }).length;
    },
    tray: function tray() {
      return this.$store.state.tray;
    },
    trayIds: function trayIds() {
      return this.$store.state.tray.map(function (order) {
        return order.PrescriptionID;
      });
    },
    printLog: function printLog() {
      return this.$store.state.printLog;
    },
    trayCompany: function trayCompany() {
      var companies = [];
      this.tray.forEach(function (item) {
        if (item.DeliveryID == 5 && item.CompanyName != 'EveAdam' && !item.JVM) {
          if (!companies.includes('rml')) {
            companies.push('rml');
          }
        }
        if (item.DeliveryID == 4 && item.CompanyName != 'EveAdam' && !item.JVM) {
          if (!companies.includes('dpd')) {
            companies.push('dpd');
          }
        }
        if (item.DeliveryID == 7 && item.PaymentMethod == 0 && item.CompanyName != 'EveAdam' && !item.JVM) {
          if (!companies.includes('ups')) {
            companies.push('ups');
          }
        }
        if (item.DeliveryID == 7 && item.PaymentMethod != 0 && item.CompanyName != 'EveAdam' && !item.JVM) {
          if (!companies.includes('upscod')) {
            companies.push('upscod');
          }
        }
        if (item.DeliveryID == 10 && item.CompanyName != 'EveAdam' && !item.JVM) {
          if (!companies.includes('dhl')) {
            companies.push('dhl');
          }
        }
        if (item.CompanyName == 'EveAdam' && !item.JVM) {
          if (!companies.includes('eveadam')) {
            companies.push('eveadam');
          }
        }
        if (item.JVM == 1) {
          if (!companies.includes('jvm')) {
            companies.push('jvm');
          }
        }
      });
      return companies;
    },
    count: function count() {
      var response = {
        available: 0,
        rml: 0,
        dpd: 0,
        ups: 0,
        upscod: 0,
        dhl: 0,
        eveadam: 0,
        jvm: 0
      };
      this.orders.forEach(function (item) {
        if (item.UserID == 0) {
          response.available++;
        }
        if (item.DeliveryID == 5 && item.UserID == 0) {
          response.rml++;
        }
        if (item.DeliveryID == 4 && item.UserID == 0) {
          response.dpd++;
        }
      });
      return response;
    }
  },
  mounted: function mounted() {
    var _this = this;
    this.refresh();
    this.$root.$on('tray.clear', function () {
      _this.refresh();
    });
  },
  methods: {
    getPendingOrders: function getPendingOrders() {
      var _this2 = this;
      axios.post('/prescription-pool/orders-list', {
        ids: this.trayIds
      }).then(function (response) {
        console.log('response');
      })["catch"](function (error) {
        _this2.postError(error.response.data.message);
      });
    },
    refresh: function refresh() {
      this.getOrders();
      this.getDispensers();
    },
    toggleOrderList: function toggleOrderList() {
      this.idsVisible = !this.idsVisible;
      if (this.idsVisible) {
        this.refresh();
      }
    },
    getOrders: function getOrders() {
      var _this3 = this;
      axios.get('/prescription-pool/orders').then(function (response) {
        _this3.orders = response.data.data;
      })["catch"](function (error) {
        _this3.postError(error.response.data.message);
      });
    },
    getDispensers: function getDispensers() {
      var _this4 = this;
      axios.get('/prescription-pool/dispensers').then(function (response) {
        _this4.dispensers = response.data.data;
      })["catch"](function (error) {
        _this4.postError(error.response.data.message);
      });
    },
    allocate: function allocate() {
      var _this5 = this;
      var userID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var deliveryID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var orderID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      axios.post('/prescription-pool/allocate', {
        userID: userID,
        deliveryID: deliveryID,
        orderID: orderID
      }).then(function (response) {
        _this5.refresh();
        _this5.$root.$emit('tray.refresh');
      })["catch"](function (error) {
        _this5.postError(error.response.data.message);
      });
    },
    release: function release() {
      var _this6 = this;
      var userID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var dispenserPoolID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (all) {
        this.checkMessage('Are you sure you want to release all orders!', function () {
          _this6.releaseRequest(userID, dispenserPoolID, all);
        });
      } else {
        this.releaseRequest(userID, dispenserPoolID, all);
      }
    },
    releaseRequest: function releaseRequest() {
      var _this7 = this;
      var userID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var dispenserPoolID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      axios.post('/prescription-pool/release', {
        userID: userID,
        dispenserPoolID: dispenserPoolID,
        all: all
      }).then(function (response) {
        _this7.refresh();
        _this7.$root.$emit('tray.refresh');
      })["catch"](function (error) {
        _this7.postError(error.response.data.message);
      });
    },
    viewAssigned: function viewAssigned() {
      this.$root.$emit('tray.toggle');
    },
    checkMessage: function checkMessage(message, callback) {
      this.$swal({
        title: 'Are you sure you want to release all orders?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, release everything!'
      }).then(function (result) {
        if (result.value) {
          callback();
        }
      });
    },
    reprint: function reprint(id) {
      this.$root.$emit('prescriptionpool.reprint', id);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_constants_orderStatuses__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../mixins/constants/orderStatuses */ "./resources/assets/js/mixins/constants/orderStatuses.js");
/* harmony import */ var _mixins_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../mixins/errors */ "./resources/assets/js/mixins/errors.js");
/* harmony import */ var _mixins_print__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../mixins/print */ "./resources/assets/js/mixins/print.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  mixins: [_mixins_constants_orderStatuses__WEBPACK_IMPORTED_MODULE_0__["default"], _mixins_errors__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_print__WEBPACK_IMPORTED_MODULE_2__["default"]],
  components: {
    'Notes': function Notes() {
      return __webpack_require__.e(/*! import() */ "resources_assets_js_components_pages_prescriptionpool_NotesPopup_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./NotesPopup.vue */ "./resources/assets/js/components/pages/prescriptionpool/NotesPopup.vue"));
    },
    'Modal': function Modal() {
      return __webpack_require__.e(/*! import() */ "resources_assets_js_components_Modal_vue").then(__webpack_require__.bind(__webpack_require__, /*! ../../Modal.vue */ "./resources/assets/js/components/Modal.vue"));
    }
  },
  data: function data() {
    return {
      loading: false,
      locked: false,
      printing: false,
      lockTimer: null,
      historyLoading: false,
      notesLoading: false,
      notesAlert: false,
      duplicate: false,
      notesConfirmed: false,
      expandHistory: false,
      orders: [],
      notes: [],
      selected: null,
      history: [],
      user: {
        info: userInfo,
        selected: userInfo.id,
        list: []
      }
    };
  },
  computed: {
    trayIds: function trayIds() {
      return this.$store.state.tray.map(function (order) {
        return order.PrescriptionID;
      });
    },
    filteredHistory: function filteredHistory() {
      if (this.expandHistory) {
        return this.history;
      } else {
        return this.history.slice(0, 3);
      }
    },
    totalNotesCount: function totalNotesCount() {
      //we are not taking into account correspondence notes
      return this.notes.length == 0 ? 0 : /*this.notes.correspondence.length + */this.notes.critical.length + this.notes.information.length + this.notes.other.length;
    },
    printable: function printable() {
      var nameMismatch = false;
      this.selected.Products.forEach(function (product) {
        if (!product.CorrectName) {
          nameMismatch = true;
        }
      });
      var isPrintable = this.totalNotesCount == 0 && !this.duplicate && !nameMismatch ? true : this.notesConfirmed ? true : false;
      return isPrintable;
    }
  },
  mounted: function mounted() {
    var _this = this;
    this.getOrders();
    this.$root.$on('prescriptionpool.getnotes', this.getNotes);
    this.$root.$on('orderupdate', this.getNotes);
    this.$root.$on('alertupdate', this.getNotes);
    this.$root.$on('prescriptionpool.reprint', this.reprint);
    this.lockTimer = setInterval(function () {
      _this.checkLock();
    }, 5000);
  },
  destroyed: function destroyed() {
    this.$root.$off('prescriptionpool.getnotes', this.getNotes);
    this.$root.$off('orderupdate', this.getNotes);
    this.$root.$off('alertupdate', this.getNotes);
    this.$root.$off('prescriptionpool.reprint', this.reprint);
    clearInterval(this.lockTimer);
  },
  watch: {
    trayIds: function trayIds(newValue, oldValue) {
      this.getOrders();
      if (oldValue.length == 0 && newValue.length > 0) {
        this.$store.commit('clearLogs');
      }
    },
    selected: function selected() {
      this.getHistory();
      this.getNotes();
    },
    locked: function locked() {
      var _this2 = this;
      if (!this.locked) {
        this.getOrders(function () {
          var temporarySelected = JSON.parse(JSON.stringify(_this2.selected));
          _this2.selected = null;
          _this2.selectOrder(temporarySelected);
          _this2.takeOverOrder(_this2.selected.PrescriptionID);
        });
      }
    }
  },
  methods: {
    selectOrder: function selectOrder(prescription) {
      var _this3 = this;
      // this.loading = true;
      this.selected = prescription;
      this.selected.Products.forEach(function (product) {
        if (product.Name != product.Description) {
          _this3.alternativeNameCheck(product, _this3.selected.ClientID, function (result) {
            product.CorrectName = result;
          });
        } else {
          product.CorrectName = true;
        }
      });
      this.checkLock(function () {
        if (!_this3.locked) {
          _this3.takeOverOrder(_this3.selected.PrescriptionID);
        }
        _this3.$root.$emit('prescriptionloaded', {
          prescription: prescription
        });
        // this.loading = false;
      });

      this.checkOrderStatuses(this.selected.PrescriptionID);
    },
    getOrders: function getOrders() {
      var _this4 = this;
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.loading = true;
      axios.post("/prescription-pool/quick-tray", {
        ids: this.trayIds
      }).then(function (response) {
        _this4.orders = response.data.data;
        if (_this4.orders.length > 0 && !callback) {
          _this4.selectOrder(_this4.orders[0]);
        } else if (callback) {
          callback();
        }
      })["catch"](function (error) {
        console.log(error);
      })["finally"](function () {
        _this4.loading = false;
      });
    },
    checkOrderStatuses: function checkOrderStatuses(id) {
      var _this5 = this;
      axios.get("/order/".concat(id, "/statuses")).then(function (response) {
        _this5.duplicate = response.data.data.duplicate;
      })["catch"](function (error) {
        _this5.postError(error.response.data.message);
      });
    },
    getHistory: function getHistory() {
      var _this6 = this;
      this.historyLoading = true;
      axios.get("/order/".concat(this.selected.PrescriptionID, "/history")).then(function (response) {
        _this6.expandHistory = false;
        _this6.history = response.data.data;
      })["catch"](function (error) {
        _this6.postError(error.response.data.message);
      })["finally"](function () {
        _this6.historyLoading = false;
      });
    },
    /**
     * Get notes related to the current order
     */
    getNotes: function getNotes() {
      var _this7 = this;
      this.notesLoading = true;
      this.notesConfirmed = false;
      axios.get("/order/".concat(this.selected.PrescriptionID, "/notes")).then(function (response) {
        _this7.notes = response.data.data;

        //check if alerts are shown, if not show them
        if (_this7.notes.alerts.length > 0) {
          var html = "\n                    <div class=\"medicineDetails\" style=\"width: 100%;\">\n                    <p>Please review the notes below:</p>\n                    <ul class=\"other\">";
          var alertCount = 0;
          var type = 0;
          _this7.notes.alerts.sort(function (a, b) {
            return a.Type > b.Type ? 1 : -1;
          });
          _this7.notes.alerts.forEach(function (alert) {
            if (alert.DeletedAt == null && alert.EditedAt == null) {
              alertCount++;
              if (alert.Type != type) {
                type = alert.Type;
                html += "<li class=\"note-header ".concat(type == 1 ? 'note-header__danger' : '', "\"><div>").concat(type == 1 ? 'Patient Notes' : 'Order Notes', "</div></li>");
              }
              html += "\n                            <li class=\"note\"\n                            title=\"".concat(alert.Type == 2 ? 'Queried Alert' : alert.Type == 1 ? 'Patient Alert' : 'Order Alert', " created by ").concat(alert.name, " ").concat(alert.surname, "\"\n                            style=\"").concat(alert.Type == 2 ? 'border-left: 5px solid #32a36a;' : alert.Type == 1 ? 'border-left: 5px solid #ff5151;' : '', "\">\n                            <div class=\"note-body\" style=\"text-align: initial;\">\n                            <p>").concat(alert.Note, "</p>\n                            </div>\n                            <div class=\"note-footer\">\n                            <span>").concat(alert.name + ' ' + alert.surname, "</span>\n                            <span>").concat(alert.CreatedAt, "</span>\n                            </div>\n                            </li>");
            }
          });
          html += "</ul></div>";
          if (alertCount > 0) {
            _this7.notesAlert = html;
          } else {
            _this7.notesAlert = false;
          }
        } else {
          _this7.notesAlert = false;
        }
      })["catch"](function (error) {
        _this7.postError(error.response.data.message);
      })["finally"](function () {
        _this7.notesLoading = false;
      });
    },
    tryPrint: function tryPrint() {
      var _this8 = this;
      // if(this.notesAlert){
      //     this.showNotesAlert();
      if (!this.printable) {
        this.openNotes();
      } else {
        this.printing = true;
        this.dispenserPrint('delivery', false, function () {
          _this8.dispenserPrint('label', false, function () {
            _this8.selected.time = Date.now();
            _this8.selected.action = 'Printed';
            _this8.$store.commit('addLog', _this8.selected);
            _this8.$root.$emit('tray.changeprescriptionstatus', {
              id: _this8.selected.PrescriptionID,
              status: 7
            });
            _this8.printing = false;
          });
        });
      }
    },
    reprint: function reprint(id) {
      this.dispenserPrint('delivery', id);
      this.dispenserPrint('label', id);
      var prescription = {
        PrescriptionID: id,
        action: 'Reprinted',
        time: Date.now()
      };
      this.$store.commit('addLog', prescription);
    },
    dispenserPrint: function dispenserPrint(type) {
      var _this9 = this;
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!id) {
        id = this.selected.PrescriptionID;
      }
      //print routine here
      if (type == 'delivery') {
        axios.get("/order/".concat(id, "/view")).then(function (response) {
          var url = response.data.data.url;
          var type = response.data.data.type;
          var printer = false;
          if (localStorage.getItem('settings.application')) {
            var deliveryNotePrinter = JSON.parse(localStorage.getItem('settings.application')).deliveryNotePrinter;
            printer = deliveryNotePrinter;
          }
          if (type == 'pdf') {
            _this9.printUrl("".concat(url, "?token=").concat(_this9.user.info.token, "&print=true"), function () {
              _this9.$root.$emit('orderupdate');
              if (callback) {
                callback();
              }
            }, 'pdf', printer);
          } else {
            //test and delete this as necessary
            var _url = "https://esasys.co.uk/?showFile&PRESCRIPTIONID=".concat(id);
            _this9.printUrl(_url, function () {
              axios.get("/prescription/".concat(id, "/log-print?token=").concat(_this9.user.info.token)).then(function (response) {
                _this9.$root.$emit('orderupdate');
                if (callback) {
                  callback();
                }
              })["catch"](function (error) {
                console.log(error);
                _this9.postError(error.response.data.message);
              });
            }, 'pdf', printer);
          }
        })["catch"](function (error) {
          _this9.postError(error.response.data.message);
        });
      } else if (type == 'label') {
        axios.get("/order/".concat(id, "/label")).then(function (response) {
          var url = response.data.data.url;
          var printer = false;
          if (localStorage.getItem('settings.application')) {
            printer = JSON.parse(localStorage.getItem('settings.application')).labelPrinter;
          }
          _this9.printUrl("".concat(url, "?token=").concat(_this9.user.info.token, "&print=true"), function () {
            _this9.$root.$emit('orderupdate');
            if (callback) {
              callback();
            }
          }, 'pdf', printer, true);
        })["catch"](function (error) {
          console.log(error);
          _this9.postError(error.response.data.message);
        });
      }
    },
    //revert an activity
    openNotes: function openNotes() {
      this.$root.$emit('modal.open', 'quicktraynotes');
    },
    confirmNotes: function confirmNotes() {
      this.notesConfirmed = true;
      this.$root.$emit('modal.close', 'quicktraynotes');
    },
    showNotesAlert: function showNotesAlert() {
      var _this10 = this;
      this.$swal({
        title: 'Important notes!',
        html: this.notesAlert,
        type: 'warning',
        showCancelButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        focusConfirm: false,
        // customClass: 'swal-wide',
        confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        confirmButtonText: "I've read these notes!"
      }).then(function (result) {
        if (result.value) {
          _this10.notesAlert = false;
        }
      });
    },
    statusClass: function statusClass(status) {
      return [1, 7].includes(status) ? 'active' : [2, 8].includes(status) ? 'success' : [4, 5, 9, 10, 11, 12, 13, 14, 15].includes(status) ? 'warning' : [16].includes(status) ? 'returned' : [3, 6].includes(status) ? 'error' : '';
    },
    //locking/unlocking orders
    checkLock: function checkLock() {
      var _this11 = this;
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (this.selected) {
        axios.get("/logs/locked/".concat(this.selected.PrescriptionID)).then(function (response) {
          if (response.data.data) {
            _this11.locked = response.data.data.Name + ' ' + response.data.data.Surname;
          } else {
            _this11.locked = false;
          }
        })["catch"](function (error) {
          console.log(error);
          _this11.locked = false;
        })["finally"](function () {
          if (callback) {
            callback();
          }
        });
      }
    },
    unlockOrder: function unlockOrder(id) {
      var _this12 = this;
      axios.post("logs/unlock/".concat(id)).then(function (response) {
        _this12.locked = false;
      })["catch"](function (error) {
        console.log(error);
        _this12.locked = false;
      });
    },
    takeOverOrder: function takeOverOrder(id) {
      var _this13 = this;
      axios.post("logs/takeover/".concat(id)).then(function (response) {
        _this13.locked = false;
      })["catch"](function (error) {
        console.log(error);
        _this13.locked = false;
      });
    },
    alternativeNameCheck: function alternativeNameCheck(product, client, callback) {
      var _this14 = this;
      axios.get("/inventory/products/alternative-name?code=".concat(product.ProductCodeID, "&name=").concat(encodeURI(product.Description), "&client=").concat(client)).then(function (response) {
        callback(response.data.data);
      })["catch"](function (error) {
        _this14.postError(error.response.data.message);
      });
    },
    //Resolve the product name discrepancy
    discrepancyResolution: function discrepancyResolution(resolution) {
      var _this15 = this;
      var product = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      //if resolution is positive then add the product to productnamealternative list and refresh
      //if not move the prescription to safety check
      if (resolution) {
        this.loading = true;
        axios.post("/inventory/products/approve-discrepancy", {
          ProductCodeID: product.ProductCodeID,
          ClientID: this.prescription.ClientID,
          UserID: this.userInfo.id,
          AlternativeName: product.Description
        }).then(function (response) {
          _this15.postSuccess('Alternative name approved');
          _this15.loading = false;
          _this15.search();
        })["catch"](function (error) {
          _this15.loading = false;
          _this15.postError(error.response.data.message);
        });
      } else {
        this.prescriptionStatus = 91;
        this.updateStatus();
      }
    },
    redirect: function redirect(PrescriptionID) {
      this.$router.push({
        name: 'prescription',
        params: {
          id: PrescriptionID
        }
      });
    }
  }
});

/***/ }),

/***/ "./resources/assets/js/components/pages/PrescriptionPool.vue":
/*!*******************************************************************!*\
  !*** ./resources/assets/js/components/pages/PrescriptionPool.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PrescriptionPool_vue_vue_type_template_id_65186cb8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PrescriptionPool.vue?vue&type=template&id=65186cb8& */ "./resources/assets/js/components/pages/PrescriptionPool.vue?vue&type=template&id=65186cb8&");
/* harmony import */ var _PrescriptionPool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PrescriptionPool.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/pages/PrescriptionPool.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PrescriptionPool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PrescriptionPool_vue_vue_type_template_id_65186cb8___WEBPACK_IMPORTED_MODULE_0__.render,
  _PrescriptionPool_vue_vue_type_template_id_65186cb8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/pages/PrescriptionPool.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue":
/*!*****************************************************************************!*\
  !*** ./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _QuickTray_vue_vue_type_template_id_e6373468___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QuickTray.vue?vue&type=template&id=e6373468& */ "./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue?vue&type=template&id=e6373468&");
/* harmony import */ var _QuickTray_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QuickTray.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _QuickTray_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _QuickTray_vue_vue_type_template_id_e6373468___WEBPACK_IMPORTED_MODULE_0__.render,
  _QuickTray_vue_vue_type_template_id_e6373468___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/pages/prescriptionpool/QuickTray.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/pages/PrescriptionPool.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/PrescriptionPool.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PrescriptionPool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PrescriptionPool.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/PrescriptionPool.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PrescriptionPool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QuickTray_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./QuickTray.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QuickTray_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/pages/PrescriptionPool.vue?vue&type=template&id=65186cb8&":
/*!**************************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/PrescriptionPool.vue?vue&type=template&id=65186cb8& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrescriptionPool_vue_vue_type_template_id_65186cb8___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrescriptionPool_vue_vue_type_template_id_65186cb8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrescriptionPool_vue_vue_type_template_id_65186cb8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PrescriptionPool.vue?vue&type=template&id=65186cb8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/PrescriptionPool.vue?vue&type=template&id=65186cb8&");


/***/ }),

/***/ "./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue?vue&type=template&id=e6373468&":
/*!************************************************************************************************************!*\
  !*** ./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue?vue&type=template&id=e6373468& ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_QuickTray_vue_vue_type_template_id_e6373468___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_QuickTray_vue_vue_type_template_id_e6373468___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_QuickTray_vue_vue_type_template_id_e6373468___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./QuickTray.vue?vue&type=template&id=e6373468& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue?vue&type=template&id=e6373468&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/PrescriptionPool.vue?vue&type=template&id=65186cb8&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/PrescriptionPool.vue?vue&type=template&id=65186cb8& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
    "div",
    { staticClass: "content prescription-pool" },
    [
      _c(
        "section",
        { staticClass: "card" },
        [
          _vm._m(0),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "card-body",
              staticStyle: {
                display: "flex",
                "justify-content": "space-between",
              },
            },
            [
              _c("div", [
                _c(
                  "button",
                  {
                    staticClass: "btn btnSize02 secondaryBtn mb-10",
                    attrs: { title: _vm.showListText },
                    on: {
                      click: function ($event) {
                        return _vm.toggleOrderList()
                      },
                    },
                  },
                  [
                    _vm._v(
                      "\n                    " +
                        _vm._s(_vm.showListText) +
                        "\n                "
                    ),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btnSize02 secondaryBtn mb-10",
                    attrs: { title: "View all orders assigned to you" },
                    on: {
                      click: function ($event) {
                        return _vm.viewAssigned()
                      },
                    },
                  },
                  [
                    _vm._v(
                      "\n                    View Assigned Orders\n                "
                    ),
                  ]
                ),
                _vm._v(" "),
                _vm.printLog.length > 0
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btnSize02 secondaryBtn mb-10",
                        on: {
                          click: function ($event) {
                            _vm.showLogs = !_vm.showLogs
                          },
                        },
                      },
                      [
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm.showLogs ? "Hide" : "Show") +
                            " Print Logs\n                "
                        ),
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.tray.length > 0
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btnSize02 tertiaryBtn",
                        attrs: {
                          title:
                            "Release orders assigned to " + _vm.userInfo.name,
                        },
                        on: {
                          click: function ($event) {
                            return _vm.release(_vm.userInfo.esa_user_id, false)
                          },
                        },
                      },
                      [
                        _vm._v(
                          "\n                    Release Orders\n                "
                        ),
                      ]
                    )
                  : _c(
                      "button",
                      {
                        staticClass: "btn btnSize02 secondaryBtn mb-10",
                        attrs: {
                          title: "Release all assigned orders",
                          disabled: _vm.count.available == _vm.orders.length,
                        },
                        on: {
                          click: function ($event) {
                            return _vm.release(false, false, true)
                          },
                        },
                      },
                      [
                        _vm._v(
                          "\n                    Release All\n                "
                        ),
                      ]
                    ),
              ]),
              _vm._v(" "),
              _c("transition", { attrs: { name: "fade" } }, [
                _vm.printLog.length > 0 && _vm.showLogs
                  ? _c("div", { staticClass: "prescription-pool_print-log" }, [
                      _c(
                        "ul",
                        [
                          _c(
                            "li",
                            {
                              staticStyle: {
                                "border-bottom": "1px solid gainsboro",
                              },
                            },
                            [_vm._v("Print Log")]
                          ),
                          _vm._v(" "),
                          _vm._l(_vm.printLog, function (log) {
                            return _c("li", { key: log.PrescriptionID }, [
                              _c("span", [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(log.action) +
                                    " \n                            "
                                ),
                                _c("b", [
                                  _c(
                                    "a",
                                    {
                                      attrs: {
                                        target: "_blank",
                                        href:
                                          "#/prescription/" +
                                          log.PrescriptionID,
                                      },
                                    },
                                    [_vm._v(_vm._s(log.PrescriptionID))]
                                  ),
                                ]),
                                _vm._v(
                                  " \n                            on " +
                                    _vm._s(
                                      new Date(log.time).toLocaleTimeString(
                                        "en-GB"
                                      )
                                    ) +
                                    "\n                        "
                                ),
                              ]),
                              _vm._v(" "),
                              _c(
                                "button",
                                {
                                  staticClass: "btn btnSize03 secondaryBtn",
                                  staticStyle: { padding: "4px" },
                                  on: {
                                    click: function ($event) {
                                      return _vm.reprint(log.PrescriptionID)
                                    },
                                  },
                                },
                                [_vm._v("Reprint")]
                              ),
                            ])
                          }),
                        ],
                        2
                      ),
                    ])
                  : _vm._e(),
              ]),
            ],
            1
          ),
          _vm._v(" "),
          _c("transition", { attrs: { name: "fade" } }, [
            _vm.idsVisible
              ? _c("div", { staticClass: "card-body order-id-list" }, [
                  _c("hr"),
                  _vm._v(" "),
                  _vm.orders.length > 0
                    ? _c(
                        "ul",
                        [
                          _c("li", { staticClass: "pool-list-layout" }, [
                            _c("div", { staticClass: "pool-column" }, [
                              _c("b", [_vm._v("Order ID")]),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "pool-column" }, [
                              _c("b", [_vm._v("Allocated To")]),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "pool-column" }, [
                              _c("b", [_vm._v("Type")]),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "pool-actions" }, [
                              _c("b", [_vm._v("Tools")]),
                            ]),
                          ]),
                          _vm._v(" "),
                          _vm._l(_vm.orders, function (order) {
                            return _c(
                              "li",
                              {
                                key: order.PrescriptionID,
                                staticClass: "pool-list-layout",
                              },
                              [
                                _c("div", { staticClass: "pool-column" }, [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(order.PrescriptionID) +
                                      "\n                        "
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "pool-column" }, [
                                  order.name == null && order.surname == null
                                    ? _c("span", [
                                        _vm._v(
                                          "\n                                Not Assigned\n                            "
                                        ),
                                      ])
                                    : _c("span", [
                                        _vm._v(
                                          _vm._s(
                                            order.name + " " + order.surname
                                          )
                                        ),
                                      ]),
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "pool-column" }, [
                                  order.DeliveryID == 5
                                    ? _c("b", [_vm._v("Royal Mail")])
                                    : order.DeliveryID == 4
                                    ? _c("b", [_vm._v("DPD")])
                                    : order.DeliveryID == 7 &&
                                      order.PaymentMethod == 0
                                    ? _c("b", [_vm._v("UPS")])
                                    : order.DeliveryID == 7 &&
                                      order.PaymentMethod != 0
                                    ? _c("b", [_vm._v("UPS COD")])
                                    : order.DeliveryID == 10
                                    ? _c("b", [_vm._v("DHL")])
                                    : _c("b", [_vm._v("UNKNOWN")]),
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "pool-actions" }, [
                                  _c(
                                    "button",
                                    {
                                      staticClass: "btn btnSize02 tertiaryBtn",
                                      attrs: {
                                        disabled:
                                          order.UserID ==
                                            _vm.userInfo.esa_user_id ||
                                          _vm.userInfo.role != 20,
                                      },
                                      on: {
                                        click: function ($event) {
                                          return _vm.allocate(
                                            false,
                                            false,
                                            order.DispenserPoolID
                                          )
                                        },
                                      },
                                    },
                                    [
                                      _vm._v(
                                        "\n                                Take Over\n                            "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btnSize02 tertiaryBtn ml-20",
                                      attrs: { disabled: order.UserID == 0 },
                                      on: {
                                        click: function ($event) {
                                          return _vm.release(
                                            false,
                                            order.DispenserPoolID
                                          )
                                        },
                                      },
                                    },
                                    [
                                      _vm._v(
                                        "\n                                Release\n                            "
                                      ),
                                    ]
                                  ),
                                ]),
                              ]
                            )
                          }),
                        ],
                        2
                      )
                    : _c("div", [
                        _vm._v(
                          "\n                    No orders found\n                "
                        ),
                      ]),
                ])
              : _vm._e(),
          ]),
        ],
        1
      ),
      _vm._v(" "),
      _c("QuickTray"),
      _vm._v(" "),
      _vm.tray.length == 0
        ? _c("section", { staticClass: "card" }, [
            _vm._m(1),
            _vm._v(" "),
            _c("div", { staticClass: "card-body" }, [
              _c(
                "ul",
                [
                  _c("li", { staticClass: "pool-list-layout" }, [
                    _vm._m(2),
                    _vm._v(" "),
                    _c("div", { staticClass: "pool-column" }, [
                      _c("b", [_vm._v(_vm._s(_vm.count.available))]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "pool-actions" }, [
                      _vm._m(3),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btnSize02 tertiaryBtn ml-20",
                          attrs: {
                            title: "Take over all available Royal Mail orders",
                            disabled:
                              (_vm.userInfo.role != 20 &&
                                _vm.userInfo.role != 19) ||
                              _vm.count.rml == 0 ||
                              (!_vm.trayCompany.includes("rml") &&
                                _vm.trayCompany.length > 0),
                          },
                          on: {
                            click: function ($event) {
                              return _vm.allocate(false, "rml", false)
                            },
                          },
                        },
                        [
                          _vm._v("\n                            Royal Mail "),
                          _c("b", [_vm._v("(" + _vm._s(_vm.count.rml) + ")")]),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btnSize02 tertiaryBtn ml-20",
                          attrs: {
                            title: "Take over all available DPD orders",
                            disabled:
                              (_vm.userInfo.role != 20 &&
                                _vm.userInfo.role != 19) ||
                              _vm.count.dpd == 0 ||
                              (!_vm.trayCompany.includes("dpd") &&
                                _vm.trayCompany.length > 0),
                          },
                          on: {
                            click: function ($event) {
                              return _vm.allocate(false, "dpd", false)
                            },
                          },
                        },
                        [
                          _vm._v("\n                            DPD "),
                          _c("b", [_vm._v("(" + _vm._s(_vm.count.dpd) + ")")]),
                        ]
                      ),
                    ]),
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.dispensers, function (dispenser) {
                    return _c(
                      "li",
                      { key: dispenser.id, staticClass: "pool-list-layout" },
                      [
                        _c("div", { staticClass: "pool-column" }, [
                          _vm._v(
                            "\n                        " +
                              _vm._s(dispenser.name) +
                              "\n                        "
                          ),
                          dispenser.id == _vm.userInfo.id
                            ? _c("b", [_vm._v("(CURRENT USER)")])
                            : _vm._e(),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "pool-column" }, [
                          _c("b", [_vm._v(_vm._s(dispenser.count))]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "pool-actions" }, [
                          dispenser.id != _vm.userInfo.id
                            ? _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btnSize02 tertiaryBtn mr-20",
                                  attrs: {
                                    title:
                                      "Take over orders assigned to " +
                                      dispenser.name,
                                    disabled: dispenser.count == 0,
                                  },
                                  on: {
                                    click: function ($event) {
                                      return _vm.allocate(
                                        dispenser.esa_user_id,
                                        false,
                                        false
                                      )
                                    },
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                            TAKE OVER\n                        "
                                  ),
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "btn btnSize02 tertiaryBtn",
                              attrs: {
                                title:
                                  "Release orders assigned to " +
                                  dispenser.name,
                                disabled: dispenser.count == 0,
                              },
                              on: {
                                click: function ($event) {
                                  return _vm.release(
                                    dispenser.esa_user_id,
                                    false
                                  )
                                },
                              },
                            },
                            [
                              _vm._v(
                                "\n                            RELEASE\n                        "
                              ),
                            ]
                          ),
                        ]),
                      ]
                    )
                  }),
                ],
                2
              ),
            ]),
          ])
        : _vm._e(),
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
      _c("h3", [_vm._v("Prescription Pool")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header pool-list-layout" }, [
      _c("div", { staticClass: "pool-column" }, [
        _vm._v("\n                Dispenser\n            "),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "pool-column" }, [
        _vm._v("\n                Available Orders\n            "),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "pool-actions" }, [
        _vm._v("\n                Tools\n            "),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "pool-column" }, [
      _c("b", [_vm._v("AVAILABLE IN THE POOL")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "ml-20" }, [
      _c("b", [_vm._v("ALLOCATE NEW (MAX 15)")]),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue?vue&type=template&id=e6373468&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/pages/prescriptionpool/QuickTray.vue?vue&type=template&id=e6373468& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {}
var staticRenderFns = []



/***/ })

}]);