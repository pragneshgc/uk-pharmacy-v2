webpackJsonp([25],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/EditOrderAddress.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _errors = __webpack_require__("./resources/assets/js/mixins/errors.js");

var _errors2 = _interopRequireDefault(_errors);

var _prescriptionColumns = __webpack_require__("./resources/assets/js/mixins/constants/prescriptionColumns.js");

var _prescriptionColumns2 = _interopRequireDefault(_prescriptionColumns);

var _DiffTableAddress = __webpack_require__("./resources/assets/js/components/pages/DiffTableAddress.vue");

var _DiffTableAddress2 = _interopRequireDefault(_DiffTableAddress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_errors2.default, _prescriptionColumns2.default],
    props: ['orderID', 'orderStatus', 'products'],
    components: { DiffTableAddress: _DiffTableAddress2.default },
    data: function data() {
        return {
            countries: [],
            companies: [],
            details: {
                order: {},
                oldOrder: {},
                ups: {},
                oldUps: {},
                details: {}
            },
            columnHome: ['Address1', 'Address2', 'Address3', 'Address4', 'Postcode', 'CountryCode', 'APNotificationLanguage', 'APNotificationValue'],
            columnPatient: ['Name', 'Surname', 'Telephone', 'Email'],
            disabledFields: ['TokenID', 'Repeats'],
            loading: true,
            dragEventTriggered: false,
            backdrop: true,
            watch: false,
            //save confirmation
            saveConfirmation: false,
            confirmationChanges: {},
            confirmationChangesUPS: {},
            confirmationOld: {},
            confirmationOldUPS: {}
        };
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
        },
        loading: function loading() {
            var _this = this;

            if (!this.loading && !this.dragEventTriggered && document.getElementById("draggable-div-address")) {
                setTimeout(function () {
                    _this.dragEventTriggered = true;
                    dragElement(document.getElementById("draggable-div-address"));

                    function dragElement(elmnt) {
                        var pos1 = 0,
                            pos2 = 0,
                            pos3 = 0,
                            pos4 = 0;

                        if (document.getElementById("draggable-div-header-address")) {
                            /* if present, the header is where you move the DIV from:*/
                            document.getElementById("draggable-div-header-address").onmousedown = dragMouseDown;
                        } else {
                            /* otherwise, move the DIV from anywhere inside the DIV:*/
                            elmnt.onmousedown = dragMouseDown;
                        }

                        function dragMouseDown(e) {
                            e = e || window.event;
                            e.preventDefault();
                            // get the mouse cursor position at startup:
                            pos3 = e.clientX;
                            pos4 = e.clientY;
                            document.onmouseup = closeDragElement;
                            // call a function whenever the cursor moves:
                            document.onmousemove = elementDrag;
                        }

                        function elementDrag(e) {
                            e = e || window.event;
                            e.preventDefault();
                            // calculate the new cursor position:
                            pos1 = pos3 - e.clientX;
                            pos2 = pos4 - e.clientY;
                            pos3 = e.clientX;
                            pos4 = e.clientY;
                            // set the element's new position:
                            elmnt.style.top = elmnt.offsetTop - pos2 + "px";
                            elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
                        }

                        function closeDragElement() {
                            /* stop moving when mouse button is released:*/
                            document.onmouseup = null;
                            document.onmousemove = null;
                        }
                    }
                }, 100);
            } else {
                this.dragEventTriggered = false;
                this.backdrop = true;
            }
        }
    },
    computed: {
        columnDelivery: function columnDelivery() {
            var columns = ['DAddress1', 'DAddress2', 'DAddress3', 'DAddress4', 'DPostcode', 'DCountryCode', 'DeliveryID', 'UPSAccessPointAddress', 'TrackingCode', 'Repeats', 'TokenID'];

            if (this.details.details.ClientID == 51 && this.details.details.JVM != 2) {
                columns.push('JVM');
            }

            return columns;
        },
        canSetSaturdayDelivery: function canSetSaturdayDelivery() {
            var date = new Date();
            var day = date.getDay();
            var hour = date.getHours();

            if (day == 4 || day == 5) {
                if (day == 4 && hour >= 17 || day == 5 && hour <= 17) {
                    return true;
                }
            }

            return false;
        }
    },
    mounted: function mounted() {
        this.getCountries();
        this.getCompanies();
        this.getOrderDetails();
        this.canSetSaturdayDelivery();
        this.$root.$on('modal.close.all', this.close);
    },
    destroyed: function destroyed() {
        this.$root.$off('modal.close.all');
    },

    methods: {
        getOrderDetails: function getOrderDetails() {
            var _this2 = this;

            this.watch = false;

            axios.get('/order-edit/' + this.orderID).then(function (response) {
                _this2.details = response.data.data;
                _this2.loading = false;
            }).catch(function (error) {
                _this2.postError(error.response.data.message);
                _this2.loading = false;
            }).finally(function () {
                _this2.watch = true;
            });
        },
        getCountries: function getCountries() {
            var _this3 = this;

            axios.get('/countries').then(function (response) {
                _this3.countries = response.data.data;
            }).catch(function (error) {
                _this3.postError(error.response.data.message);
            });
        },
        getCompanies: function getCompanies() {
            var _this4 = this;

            axios.get('/delivery-companies').then(function (response) {
                _this4.companies = response.data.data;
            }).catch(function (error) {
                _this4.postError(error.response.data.message);
            });
        },
        getDeliveryCompany: function getDeliveryCompany() {
            var _this5 = this;

            axios.post('/order-edit/' + this.orderID + '/delivery-company', this.details.order).then(function (response) {
                var data = response.data.data;

                if (data.DeliveryID) {
                    _this5.details.order.DeliveryID = data.DeliveryID;
                }

                if (data.CountryCode) {
                    _this5.details.order.CountryCode = data.CountryCode;
                }

                _this5.getPostcodeFormatting();
                _this5.postSuccess('Delivery company updated');
            }).catch(function (error) {
                _this5.postError(error.response.data.message);
            });
        },
        getPostcodeFormatting: function getPostcodeFormatting() {
            var _this6 = this;

            if (this.details.order.DeliveryID == 10) {
                axios.post('/order-edit/' + this.orderID + '/postcode-formatting', this.details.order).then(function (response) {
                    var data = response.data.data;

                    if (data.Postcode) {
                        _this6.details.order.Postcode = data.Postcode;
                    }

                    if (data.DPostcode) {
                        _this6.details.order.DPostcode = data.DPostcode;
                    }
                }).catch(function (error) {
                    _this6.postError(error.response.data.message);
                });
            }
        },

        /**
         * Fetches country title by country id
         */
        getCountryTitle: function getCountryTitle(id) {
            var countries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var title = 'Unknown';

            if (!countries) {
                countries = this.countries;
            }

            countries.forEach(function (country) {
                if (country.CountryID == id) {
                    title = country.Name;
                }
            });

            return title;
        },

        /**
         * Fetches company title by SettingID id
         */
        getCompanyTitle: function getCompanyTitle(id) {
            var companies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var title = 'Unknown';

            if (!companies) {
                companies = this.companies;
            }

            companies.forEach(function (company) {
                if (company.SettingID == id) {
                    title = company.Name;
                }
            });

            return title;
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
        close: function close() {
            this.saveConfirmation = false;
            this.confirmationChanges = {};
            this.confirmationOld = {};
            this.confirmationOld = {};
            this.confirmationOldUPS = {};
            this.details = { order: {}, oldOrder: {}, ups: {}, oldUps: {} }; //clean up after
            this.$emit('closeorder');
        },
        toggleBackdrop: function toggleBackdrop() {
            this.backdrop = !this.backdrop;
        },
        save: function save() {
            var _this7 = this;

            var validate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (this.saveConfirmation) {
                this.submit(validate);
            } else {
                var orderDetails = JSON.parse(JSON.stringify(this.details.order));
                delete orderDetails.ClientID;

                axios.post('/order-edit/check/' + this.orderID, { order: orderDetails, ups: this.details.ups }).then(function (response) {
                    if (Object.keys(response.data.data.changes).length > 0 || Object.keys(response.data.data.changesUPS).length) {
                        _this7.confirmationChanges = response.data.data.changes;
                        _this7.confirmationChangesUPS = response.data.data.changesUPS;
                        _this7.confirmationOld = response.data.data.old;
                        _this7.confirmationOldUPS = response.data.data.oldUPS;
                        _this7.saveConfirmation = true;
                    } else {
                        _this7.saveConfirmation = false;
                        _this7.$emit('closeorder');
                    }
                }).catch(function (error) {
                    _this7.saveConfirmation = false;
                    _this7.postError(error);
                });
            }
        },
        saturdayDeliveryCheck: function saturdayDeliveryCheck() {
            var _this8 = this;

            if (this.details.order.SaturdayDelivery == 0) {
                this.$swal({
                    title: 'DPD Saturday Delivery should not be selected without authorisation',
                    html: 'If authorisation has been granted, click OK, otherwise click Cancel',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#ff5151',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK'
                }).then(function (result) {
                    if (result.value) {
                        _this8.details.order.SaturdayDelivery = 1;
                    }
                });
            } else {
                this.details.order.SaturdayDelivery = 0;
            }
        },
        submit: function submit() {
            var _this9 = this;

            var validate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var orderDetails = JSON.parse(JSON.stringify(this.details.order));
            delete orderDetails.ClientID;

            axios.post('/order-edit/' + this.orderID, { order: orderDetails, ups: this.details.ups }).then(function (response) {
                _this9.postSuccess('Saved');
                if (validate) {
                    _this9.$root.$emit('prescription.validate');
                }
            }).catch(function (error) {
                _this9.postError(error);
            }).finally(function () {
                _this9.close();
                _this9.saveConfirmation = false;
                _this9.$root.$emit('orderupdate');
            });
        },
        back: function back() {
            this.saveConfirmation = false;
            this.confirmationChanges = {};
            this.confirmationChangesUPS = {};
        },

        isEqual: _.isEqual
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

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-7194f852\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/EditOrderAddress.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.backdrop
      ? _c("div", {
          staticClass: "backdrop",
          on: {
            click: function($event) {
              return _vm.close()
            }
          }
        })
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      {
        ref: "parentEl",
        staticClass: "modal",
        attrs: { id: "draggable-div-address" }
      },
      [
        !_vm.loading
          ? _c(
              "div",
              {
                staticClass: "modal-header draggable-div-header",
                attrs: {
                  id: "draggable-div-header-address",
                  target: "parentEl"
                }
              },
              [
                _c("transition", { attrs: { name: "fade" } }, [
                  _c("section", { staticClass: "flexContent" }, [
                    _c("div", { staticClass: "orderDetails" }, [
                      _c("img", { attrs: { src: "images/iconPaper.png" } }),
                      _vm._v(" "),
                      _c("ul", [
                        _c("li", [
                          _c("span", [_vm._v("Order #: ")]),
                          _vm._v(_vm._s(_vm.orderID))
                        ]),
                        _vm._v(" "),
                        _c("li", [
                          _c("span", [_vm._v("Name: ")]),
                          _vm._v(_vm._s(_vm.details.order.Name))
                        ]),
                        _vm._v(" "),
                        _c("li", [
                          _c("span", [_vm._v("Surname: ")]),
                          _vm._v(_vm._s(_vm.details.order.Surname))
                        ]),
                        _vm._v(" "),
                        _c("li", [
                          _c("span", [_vm._v("Status: ")]),
                          _vm._v(_vm._s(_vm.orderStatus))
                        ]),
                        _vm._v(" "),
                        _vm.details.order.TrackingCode != "" &&
                        _vm.details.order.TrackingCode != null
                          ? _c("li", [
                              _c("span", [_vm._v("Tracking Code: ")]),
                              _vm._v(_vm._s(_vm.details.order.TrackingCode))
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.details.order.Repeats != "0" &&
                        _vm.details.order.Repeats != "" &&
                        [143, 162, 205, 243].includes(
                          _vm.details.order.DCountryCode
                        )
                          ? _c("li", [
                              _c("span", [_vm._v("Commercial value: ")]),
                              _vm._v(
                                _vm._s(_vm.details.order.Repeats) +
                                  "\n                            "
                              )
                            ])
                          : _vm._e()
                      ])
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("transition", { attrs: { name: "fade" } }, [
                  _vm.products.length != 0
                    ? _c(
                        "section",
                        { staticClass: "flexContent" },
                        _vm._l(_vm.products, function(p) {
                          return _c(
                            "div",
                            { staticClass: "productListItem mb-10" },
                            [
                              _c("div", { staticClass: "title" }, [
                                _c("h3", [
                                  _vm._v(
                                    _vm._s(p.Name) +
                                      ", " +
                                      _vm._s(p.Dosage) +
                                      " x " +
                                      _vm._s(p.Quantity) +
                                      " " +
                                      _vm._s(p.Unit)
                                  )
                                ])
                              ])
                            ]
                          )
                        }),
                        0
                      )
                    : _vm._e()
                ])
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
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
                    submit: function($event) {
                      $event.preventDefault()
                      return _vm.save($event)
                    }
                  }
                },
                [
                  _c(
                    "div",
                    { staticClass: "form-column" },
                    [
                      _c("h3", [_vm._v("Patient Details")]),
                      _vm._v(" "),
                      _vm._l(_vm.details.order, function(key, value) {
                        return _vm.columnPatient.includes(value)
                          ? _c(
                              "div",
                              {
                                key: value,
                                staticClass: "form-group form-group-2 pb-10"
                              },
                              [
                                _c("label", { attrs: { for: key } }, [
                                  _vm._v(_vm._s(_vm.alias[value].title))
                                ]),
                                _vm._v(" "),
                                _vm.alias[value].value
                                  ? _c(
                                      "label",
                                      {
                                        staticClass: "input-count",
                                        class: _vm.getCounterColor(
                                          value,
                                          _vm.details.order
                                        ),
                                        attrs: { for: key }
                                      },
                                      [
                                        _vm._v(
                                          "\n                            " +
                                            _vm._s(
                                              _vm.details.order[value]
                                                ? _vm.details.order[value]
                                                    .length +
                                                    _vm.details.order[
                                                      _vm.alias[value].combined
                                                    ].length
                                                : 0
                                            ) +
                                            "/" +
                                            _vm._s(_vm.alias[value].value) +
                                            "\n                        "
                                        )
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.details.order[value],
                                      expression: "details.order[value]"
                                    }
                                  ],
                                  attrs: {
                                    disabled: _vm.disabledFields.includes(
                                      value
                                    ),
                                    name: key,
                                    placeholder: ""
                                  },
                                  domProps: { value: _vm.details.order[value] },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.details.order,
                                        value,
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              ]
                            )
                          : _vm._e()
                      }),
                      _vm._v(" "),
                      _c("h3", [_vm._v("Delivery Details")]),
                      _vm._v(" "),
                      _vm._l(_vm.details.order, function(key, value) {
                        return _vm.columnDelivery.includes(value)
                          ? _c(
                              "div",
                              {
                                key: value,
                                staticClass: "form-group form-group-2"
                              },
                              [
                                _c("label", { attrs: { for: key } }, [
                                  _vm._v(_vm._s(_vm.alias[value].title))
                                ]),
                                _vm._v(" "),
                                _vm.alias[value].value
                                  ? _c(
                                      "label",
                                      {
                                        staticClass: "input-count",
                                        class: _vm.getCounterColor(
                                          value,
                                          _vm.details.order
                                        ),
                                        attrs: { for: key }
                                      },
                                      [
                                        _vm._v(
                                          _vm._s(
                                            _vm.details.order[value]
                                              ? _vm.details.order[value].length
                                              : 0
                                          ) +
                                            "/" +
                                            _vm._s(_vm.alias[value].value)
                                        )
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
                                  "Notes"
                                ].includes(value)
                                  ? _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.details.order[value],
                                          expression: "details.order[value]"
                                        }
                                      ],
                                      attrs: {
                                        disabled: _vm.disabledFields.includes(
                                          value
                                        ),
                                        name: key,
                                        placeholder: ""
                                      },
                                      domProps: {
                                        value: _vm.details.order[value]
                                      },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.details.order,
                                            value,
                                            $event.target.value
                                          )
                                        }
                                      }
                                    })
                                  : ["DCountryCode", "CountryCode"].includes(
                                      value
                                    )
                                  ? _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.details.order[value],
                                            expression: "details.order[value]"
                                          }
                                        ],
                                        class: [
                                          _vm.details.order[value] &&
                                          _vm.details.order[value] != ""
                                            ? "select-dropdown-active"
                                            : ""
                                        ],
                                        on: {
                                          change: function($event) {
                                            var $$selectedVal = Array.prototype.filter
                                              .call(
                                                $event.target.options,
                                                function(o) {
                                                  return o.selected
                                                }
                                              )
                                              .map(function(o) {
                                                var val =
                                                  "_value" in o
                                                    ? o._value
                                                    : o.value
                                                return val
                                              })
                                            _vm.$set(
                                              _vm.details.order,
                                              value,
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
                                            domProps: {
                                              value: country.CountryID
                                            }
                                          },
                                          [_vm._v(_vm._s(country.Name))]
                                        )
                                      }),
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
                                            value: _vm.details.order[value],
                                            expression: "details.order[value]"
                                          }
                                        ],
                                        class: [
                                          _vm.details.order[value] &&
                                          _vm.details.order[value] != ""
                                            ? "select-dropdown-active"
                                            : ""
                                        ],
                                        on: {
                                          change: function($event) {
                                            var $$selectedVal = Array.prototype.filter
                                              .call(
                                                $event.target.options,
                                                function(o) {
                                                  return o.selected
                                                }
                                              )
                                              .map(function(o) {
                                                var val =
                                                  "_value" in o
                                                    ? o._value
                                                    : o.value
                                                return val
                                              })
                                            _vm.$set(
                                              _vm.details.order,
                                              value,
                                              $event.target.multiple
                                                ? $$selectedVal
                                                : $$selectedVal[0]
                                            )
                                          }
                                        }
                                      },
                                      _vm._l(_vm.companies, function(company) {
                                        return _c(
                                          "option",
                                          {
                                            domProps: {
                                              value: company.SettingID
                                            }
                                          },
                                          [_vm._v(_vm._s(company.Name))]
                                        )
                                      }),
                                      0
                                    )
                                  : ["UPSAccessPointAddress"].includes(value)
                                  ? _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.details.order[value],
                                            expression: "details.order[value]"
                                          }
                                        ],
                                        class: [
                                          _vm.details.order[value] &&
                                          _vm.details.order[value] != ""
                                            ? "select-dropdown-active"
                                            : ""
                                        ],
                                        on: {
                                          change: function($event) {
                                            var $$selectedVal = Array.prototype.filter
                                              .call(
                                                $event.target.options,
                                                function(o) {
                                                  return o.selected
                                                }
                                              )
                                              .map(function(o) {
                                                var val =
                                                  "_value" in o
                                                    ? o._value
                                                    : o.value
                                                return val
                                              })
                                            _vm.$set(
                                              _vm.details.order,
                                              value,
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
                                          { attrs: { value: "0" } },
                                          [_vm._v("No")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "option",
                                          { attrs: { value: "1" } },
                                          [_vm._v("Yes")]
                                        )
                                      ]
                                    )
                                  : ["JVM"].includes(value)
                                  ? _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.details.order[value],
                                            expression: "details.order[value]"
                                          }
                                        ],
                                        class: [
                                          _vm.details.order[value] &&
                                          _vm.details.order[value] != ""
                                            ? "select-dropdown-active"
                                            : ""
                                        ],
                                        on: {
                                          change: function($event) {
                                            var $$selectedVal = Array.prototype.filter
                                              .call(
                                                $event.target.options,
                                                function(o) {
                                                  return o.selected
                                                }
                                              )
                                              .map(function(o) {
                                                var val =
                                                  "_value" in o
                                                    ? o._value
                                                    : o.value
                                                return val
                                              })
                                            _vm.$set(
                                              _vm.details.order,
                                              value,
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
                                          { attrs: { value: "0" } },
                                          [_vm._v("No")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "option",
                                          { attrs: { value: "1" } },
                                          [_vm._v("Yes")]
                                        )
                                      ]
                                    )
                                  : _vm._e()
                              ]
                            )
                          : _vm._e()
                      }),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group form-group-2" }, [
                        _c("label", { attrs: { for: "saturday-delivery" } }, [
                          _vm._v("Saturday Delivery")
                        ]),
                        _vm._v(" "),
                        _c(
                          "label",
                          {
                            staticClass: "switch",
                            class: [
                              !_vm.canSetSaturdayDelivery
                                ? "disabled-slider"
                                : ""
                            ],
                            staticStyle: { width: "60px" },
                            attrs: {
                              title: !_vm.canSetSaturdayDelivery
                                ? "Can not switch Saturday Delivery on when the day is not Thursday after 17:00 or Friday before 17:00"
                                : "Switch to Saturday Delivery"
                            }
                          },
                          [
                            _c("input", {
                              class: [
                                _vm.details.order.SaturdayDelivery == 1
                                  ? "slider-checked"
                                  : ""
                              ],
                              attrs: {
                                id: "saturday-delivery",
                                type: "checkbox",
                                disabled: !_vm.canSetSaturdayDelivery
                              },
                              domProps: {
                                value:
                                  _vm.details.order.SaturdayDelivery == 1
                                    ? true
                                    : false
                              },
                              on: {
                                click: function($event) {
                                  return _vm.saturdayDeliveryCheck()
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("span", { staticClass: "slider" })
                          ]
                        )
                      ]),
                      _vm._v(" "),
                      _vm.details.order.Notes != null &&
                      _vm.details.order.Notes != ""
                        ? _c(
                            "div",
                            { staticClass: "form-group form-group-2" },
                            [
                              _c("label", { attrs: { for: "Notes" } }, [
                                _vm._v(_vm._s(_vm.alias["Notes"].title))
                              ]),
                              _vm._v(" "),
                              _c("textarea", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.details.order.Notes,
                                    expression: "details.order.Notes"
                                  }
                                ],
                                staticClass: "form-control tBoxSize02",
                                staticStyle: {
                                  "min-width": "300px",
                                  "min-height": "60px",
                                  "line-height": "1"
                                },
                                attrs: {
                                  placeholder:
                                    "Add notes here if you want them to show for dispensers and customer support"
                                },
                                domProps: { value: _vm.details.order.Notes },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.details.order,
                                      "Notes",
                                      $event.target.value
                                    )
                                  }
                                }
                              })
                            ]
                          )
                        : _vm._e()
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "form-column" },
                    [
                      _c("h3", [_vm._v("Home Details")]),
                      _vm._v(" "),
                      _vm._l(_vm.details.order, function(key, value) {
                        return _vm.columnHome.includes(value)
                          ? _c(
                              "div",
                              {
                                key: value,
                                staticClass: "form-group form-group-2"
                              },
                              [
                                _c("label", { attrs: { for: key } }, [
                                  _vm._v(_vm._s(_vm.alias[value].title))
                                ]),
                                _vm._v(" "),
                                ![
                                  "CountryCode",
                                  "DCountryCode",
                                  "DeliveryID",
                                  "Notes"
                                ].includes(value)
                                  ? _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.details.order[value],
                                          expression: "details.order[value]"
                                        }
                                      ],
                                      attrs: {
                                        disabled: _vm.disabledFields.includes(
                                          value
                                        ),
                                        name: key,
                                        placeholder: ""
                                      },
                                      domProps: {
                                        value: _vm.details.order[value]
                                      },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.details.order,
                                            value,
                                            $event.target.value
                                          )
                                        }
                                      }
                                    })
                                  : ["DCountryCode", "CountryCode"].includes(
                                      value
                                    )
                                  ? _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.details.order[value],
                                            expression: "details.order[value]"
                                          }
                                        ],
                                        class: [
                                          _vm.details.order[value] &&
                                          _vm.details.order[value] != ""
                                            ? "select-dropdown-active"
                                            : ""
                                        ],
                                        on: {
                                          change: function($event) {
                                            var $$selectedVal = Array.prototype.filter
                                              .call(
                                                $event.target.options,
                                                function(o) {
                                                  return o.selected
                                                }
                                              )
                                              .map(function(o) {
                                                var val =
                                                  "_value" in o
                                                    ? o._value
                                                    : o.value
                                                return val
                                              })
                                            _vm.$set(
                                              _vm.details.order,
                                              value,
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
                                            domProps: {
                                              value: country.CountryID
                                            }
                                          },
                                          [_vm._v(_vm._s(country.Name))]
                                        )
                                      }),
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
                                            value: _vm.details.order[value],
                                            expression: "details.order[value]"
                                          }
                                        ],
                                        class: [
                                          _vm.details.order[value] &&
                                          _vm.details.order[value] != ""
                                            ? "select-dropdown-active"
                                            : ""
                                        ],
                                        on: {
                                          change: function($event) {
                                            var $$selectedVal = Array.prototype.filter
                                              .call(
                                                $event.target.options,
                                                function(o) {
                                                  return o.selected
                                                }
                                              )
                                              .map(function(o) {
                                                var val =
                                                  "_value" in o
                                                    ? o._value
                                                    : o.value
                                                return val
                                              })
                                            _vm.$set(
                                              _vm.details.order,
                                              value,
                                              $event.target.multiple
                                                ? $$selectedVal
                                                : $$selectedVal[0]
                                            )
                                          }
                                        }
                                      },
                                      _vm._l(_vm.companies, function(company) {
                                        return _c(
                                          "option",
                                          {
                                            domProps: {
                                              value: company.SettingID
                                            }
                                          },
                                          [_vm._v(_vm._s(company.Name))]
                                        )
                                      }),
                                      0
                                    )
                                  : _vm._e()
                              ]
                            )
                          : _vm._e()
                      })
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "form-column" },
                    [
                      _vm.details.ups != null
                        ? _c("h3", [_vm._v("UPS Access Point")])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm._l(_vm.details.ups, function(key, value) {
                        return _c(
                          "div",
                          { key: value, staticClass: "form-group" },
                          [
                            _c("label", { attrs: { for: key } }, [
                              _vm._v(_vm._s(_vm.alias[value].title))
                            ]),
                            _vm._v(" "),
                            ![
                              "CountryCode",
                              "DCountryCode",
                              "APNotificationLanguage"
                            ].includes(value)
                              ? _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.details.ups[value],
                                      expression: "details.ups[value]"
                                    }
                                  ],
                                  attrs: {
                                    disabled: _vm.disabledFields.includes(
                                      value
                                    ),
                                    name: key,
                                    placeholder: ""
                                  },
                                  domProps: { value: _vm.details.ups[value] },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.details.ups,
                                        value,
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.alias[value].value
                              ? _c(
                                  "label",
                                  {
                                    staticClass: "input-count",
                                    class: _vm.getCounterColor(
                                      value,
                                      _vm.details.ups
                                    ),
                                    attrs: { for: key }
                                  },
                                  [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(
                                          _vm.details.ups[value]
                                            ? _vm.details.ups[value].length
                                            : 0
                                        ) +
                                        "/" +
                                        _vm._s(_vm.alias[value].value) +
                                        "\n                        "
                                    )
                                  ]
                                )
                              : ["DCountryCode", "CountryCode"].includes(value)
                              ? _c(
                                  "select",
                                  {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.details.ups[value],
                                        expression: "details.ups[value]"
                                      }
                                    ],
                                    class: [
                                      _vm.details.order[value] &&
                                      _vm.details.order[value] != ""
                                        ? "select-dropdown-active"
                                        : ""
                                    ],
                                    on: {
                                      change: function($event) {
                                        var $$selectedVal = Array.prototype.filter
                                          .call($event.target.options, function(
                                            o
                                          ) {
                                            return o.selected
                                          })
                                          .map(function(o) {
                                            var val =
                                              "_value" in o ? o._value : o.value
                                            return val
                                          })
                                        _vm.$set(
                                          _vm.details.ups,
                                          value,
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
                                        domProps: { value: country.CountryID }
                                      },
                                      [_vm._v(_vm._s(country.Name))]
                                    )
                                  }),
                                  0
                                )
                              : ["APNotificationLanguage"].includes(value)
                              ? _c(
                                  "select",
                                  {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.details.ups[value],
                                        expression: "details.ups[value]"
                                      }
                                    ],
                                    class: [
                                      _vm.details.order[value] &&
                                      _vm.details.order[value] != ""
                                        ? "select-dropdown-active"
                                        : ""
                                    ],
                                    on: {
                                      change: function($event) {
                                        var $$selectedVal = Array.prototype.filter
                                          .call($event.target.options, function(
                                            o
                                          ) {
                                            return o.selected
                                          })
                                          .map(function(o) {
                                            var val =
                                              "_value" in o ? o._value : o.value
                                            return val
                                          })
                                        _vm.$set(
                                          _vm.details.ups,
                                          value,
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
                                        domProps: { value: country.CountryID }
                                      },
                                      [_vm._v(_vm._s(country.Name))]
                                    )
                                  }),
                                  0
                                )
                              : _vm._e()
                          ]
                        )
                      })
                    ],
                    2
                  )
                ]
              )
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("transition", { attrs: { name: "fade" } }, [
          (Object.keys(_vm.confirmationChanges).length > 0 ||
            Object.keys(_vm.confirmationChangesUPS).length > 0) &&
          !_vm.loading
            ? _c(
                "div",
                { staticClass: "pxp-form mb-20" },
                [
                  _c("div", { staticClass: "infoBox warning" }, [
                    _c("p", [
                      _vm._v(
                        "Please review and confirm all the changes in the order before saving!"
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c("DiffTableAddress", {
                    attrs: {
                      "old-object": _vm.confirmationOld,
                      "new-object": _vm.confirmationChanges,
                      "old-object-u-p-s": _vm.confirmationOldUPS,
                      "new-object-u-p-s": _vm.confirmationChangesUPS,
                      "countries-prop": _vm.countries,
                      "companies-prop": _vm.companies
                    }
                  })
                ],
                1
              )
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("transition", { attrs: { name: "fade" } }, [
          !_vm.loading
            ? _c("div", { staticClass: "modal-footer" }, [
                !_vm.isEqual(_vm.details.order, _vm.details.oldOrder) ||
                !_vm.isEqual(_vm.details.ups, _vm.details.oldUPS)
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btnSize01 tertiaryBtn bigButton",
                        on: {
                          click: function($event) {
                            return _vm.save()
                          }
                        }
                      },
                      [
                        !_vm.saveConfirmation
                          ? _c("span", [
                              _vm._v(
                                "\n                        Review\n                    "
                              )
                            ])
                          : _c("span", [
                              _vm._v(
                                "\n                        Save\n                    "
                              )
                            ])
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                (!_vm.isEqual(_vm.details.order, _vm.details.oldOrder) ||
                  !_vm.isEqual(_vm.details.ups, _vm.details.oldUPS)) &&
                _vm.saveConfirmation &&
                _vm.orderStatus == "SAFETYCHECK"
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btnSize01 tertiaryBtn bigButton",
                        on: {
                          click: function($event) {
                            return _vm.save(true)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                    Save & Validate\n                "
                        )
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
                        on: {
                          click: function($event) {
                            return _vm.back()
                          }
                        }
                      },
                      [
                        _c("span", [
                          _vm._v(
                            "\n                        Back\n                    "
                          )
                        ])
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btnSize01 secondaryBtn bigButton",
                    on: {
                      click: function($event) {
                        return _vm.close()
                      }
                    }
                  },
                  [_vm._v("Cancel")]
                )
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _vm.loading
          ? _c("div", { staticClass: "loader" }, [_vm._v("Loading...")])
          : _vm._e(),
        _vm._v(" "),
        _c(
          "span",
          {
            staticClass: "backdrop-toggle",
            attrs: { title: "Unfocus the modal" },
            on: {
              click: function($event) {
                return _vm.toggleBackdrop()
              }
            }
          },
          [_c("i", { staticClass: "fa fa-clone" })]
        ),
        _vm._v(" "),
        _c(
          "span",
          {
            staticClass: "close",
            attrs: { title: "Close the modal" },
            on: {
              click: function($event) {
                return _vm.close()
              }
            }
          },
          [_c("i", { staticClass: "fa fa-close" })]
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7194f852", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/pages/EditOrderAddress.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/EditOrderAddress.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-7194f852\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/EditOrderAddress.vue")
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
Component.options.__file = "resources/assets/js/components/pages/EditOrderAddress.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7194f852", Component.options)
  } else {
    hotAPI.reload("data-v-7194f852", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});