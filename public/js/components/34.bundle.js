webpackJsonp([34],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/prescriptionpool/NotesPopup.vue":
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: "NotesPopup",
    props: {
        notes: {
            type: Object,
            default: { critical: [], information: [], other: [], correspondence: [], alerts: [] }
        },
        prescription: {
            type: Object,
            default: { Notes: '' }
        },
        locked: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            userInfo: userInfo,
            activeTab: userInfo.role == 30 ? 'notes' : 'order',
            showEditHistoryFor: []
        };
    },

    methods: {
        deleteNote: function deleteNote(id) {
            var _this = this;

            this.$swal({
                title: 'Delete Note',
                html: 'Are you sure you want to delete this note?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ff5151',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then(function (result) {
                if (result.value) {
                    axios.post('/note/' + id + '/delete').then(function (response) {
                        _this.postSuccess(response.data.message);
                    }).catch(function (error) {
                        _this.postError(error.response.data.message);
                    }).finally(function () {
                        _this.$root.$emit('prescriptionpool.getnotes');
                    });
                }
            });
        },
        openNote: function openNote() {
            var note = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.$root.$emit('modal.close', 'quicktraynotes');
            this.$root.$emit('modal.open', 'note', note);
        },
        showEditHistory: function showEditHistory(id) {
            if (!this.showEditHistoryFor.includes(id)) {
                this.showEditHistoryFor.push(id);
            } else {
                this.showEditHistoryFor.splice(this.showEditHistoryFor.indexOf(id), 1);
            }
        }
    }
};

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-fdabf09c\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/prescriptionpool/NotesPopup.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "medicineDetails",
      staticStyle: { width: "100%", padding: "0", height: "100%" }
    },
    [
      _c("ul", { staticClass: "tabs" }, [
        _c(
          "li",
          {
            class: { active: _vm.activeTab == "notes" },
            staticStyle: { "margin-left": "0!important" },
            attrs: {
              title:
                "Relates to allergies, medical conditions and notes added by pharmacists."
            },
            on: {
              click: function($event) {
                _vm.activeTab = "notes"
              }
            }
          },
          [
            _c(
              "a",
              { staticClass: "danger", attrs: { href: "javascript:;" } },
              [
                _vm._v("Patient Notes \n                "),
                _vm.notes.critical.length > 0
                  ? _c("span", { staticClass: "badge red" }, [
                      _vm._v(_vm._s(_vm.notes.critical.length))
                    ])
                  : _vm._e()
              ]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "li",
          {
            class: { active: _vm.activeTab == "patient" },
            attrs: {
              title:
                "Relates communication with perscriber and notes sent with perscription"
            },
            on: {
              click: function($event) {
                _vm.activeTab = "patient"
              }
            }
          },
          [
            _c("a", { attrs: { href: "javascript:;" } }, [
              _vm._v("Queried Notes \n                "),
              _vm.notes.correspondence.length + _vm.notes.information.length > 0
                ? _c("span", { staticClass: "badge red" }, [
                    _vm._v(
                      _vm._s(
                        _vm.notes.correspondence.length +
                          _vm.notes.information.length
                      )
                    )
                  ])
                : _vm._e()
            ])
          ]
        ),
        _vm._v(" "),
        _c(
          "li",
          {
            class: { active: _vm.activeTab == "order" },
            attrs: { title: "Relates to the current order" },
            on: {
              click: function($event) {
                _vm.activeTab = "order"
              }
            }
          },
          [
            _c("a", { attrs: { href: "javascript:;" } }, [
              _vm._v("Order Notes \n                "),
              (_vm.notes.other.length ||
                (_vm.prescription.Notes != "" &&
                  _vm.prescription.Notes != null)) > 0
                ? _c("span", { staticClass: "badge red" }, [
                    _vm._v(
                      "\n                    " +
                        _vm._s(
                          _vm.notes.other.length +
                            (_vm.prescription.Notes != "" &&
                            _vm.prescription.Notes != null
                              ? 1
                              : 0)
                        ) +
                        "\n                "
                    )
                  ])
                : _vm._e()
            ])
          ]
        ),
        _vm._v(" "),
        !_vm.locked
          ? _c(
              "li",
              {
                staticStyle: { "margin-right": "0!important" },
                attrs: { title: "Add new note" },
                on: {
                  click: function($event) {
                    return _vm.openNote()
                  }
                }
              },
              [_vm._m(0)]
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm.activeTab == "notes"
        ? _c("div", { staticClass: "content" }, [
            _vm.notes.critical.length > 0
              ? _c(
                  "ul",
                  { staticClass: "critical" },
                  _vm._l(_vm.notes.critical, function(note) {
                    return _c(
                      "li",
                      {
                        key: note.NoteID,
                        staticClass: "note",
                        class: [
                          note.DeletedAt != null || note.EditedAt != null
                            ? "deleted"
                            : ""
                        ]
                      },
                      [
                        _c("div", {
                          staticClass: "note-body",
                          domProps: { innerHTML: _vm._s(note.Note) }
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "note-footer" }, [
                          _c("span", [
                            _vm._v(
                              _vm._s(note.name) + " " + _vm._s(note.surname)
                            )
                          ]),
                          _c("span", [_vm._v(_vm._s(note.CreatedAt))])
                        ]),
                        _vm._v(" "),
                        note.DeletedAt != null
                          ? _c(
                              "div",
                              {
                                staticClass: "note-footer",
                                staticStyle: { color: "red" }
                              },
                              [
                                _c("span", [
                                  _vm._v(
                                    "Deleted By " +
                                      _vm._s(note.DeletedName) +
                                      " " +
                                      _vm._s(note.DeletedSurname)
                                  )
                                ]),
                                _c("span", [_vm._v(_vm._s(note.DeletedAt))])
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        note.EditedAt != null
                          ? _c(
                              "div",
                              {
                                staticClass: "note-footer",
                                staticStyle: { color: "#ff8944" }
                              },
                              [
                                _c("span", [
                                  _vm._v(
                                    "Edited By " +
                                      _vm._s(note.EditedName) +
                                      " " +
                                      _vm._s(note.EditedSurname)
                                  )
                                ]),
                                _c("span", [_vm._v(_vm._s(note.EditedAt))])
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.userInfo.role >= 20 &&
                        note.DeletedAt == null &&
                        note.EditedAt == null
                          ? _c("div", { staticClass: "note-footer" }, [
                              _c("div", [
                                note.Edits.length > 0 && _vm.userInfo.role >= 50
                                  ? _c(
                                      "b",
                                      {
                                        staticClass: "clickable",
                                        staticStyle: { color: "#ff8944" },
                                        on: {
                                          click: function($event) {
                                            return _vm.showEditHistory(
                                              note.NoteID
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _vm.showEditHistoryFor.includes(
                                          note.NoteID
                                        )
                                          ? _c("span", [
                                              _vm._v("Hide Edit History")
                                            ])
                                          : _c("span", [
                                              _vm._v("Show Edit History")
                                            ])
                                      ]
                                    )
                                  : _vm._e()
                              ]),
                              _vm._v(" "),
                              _c("div", [
                                _vm.userInfo.role >= 50 ||
                                note.UserID == _vm.userInfo.id
                                  ? _c(
                                      "button",
                                      {
                                        staticClass:
                                          "smallTextBtn secondaryBtn",
                                        staticStyle: {
                                          "font-size": "12px",
                                          cursor: "pointer"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.deleteNote(note.NoteID)
                                          }
                                        }
                                      },
                                      [_vm._v("Delete")]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                note.UserID == _vm.userInfo.id
                                  ? _c(
                                      "button",
                                      {
                                        staticClass:
                                          "smallTextBtn secondaryBtn",
                                        staticStyle: {
                                          "font-size": "12px",
                                          cursor: "pointer"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.openNote(note)
                                          }
                                        }
                                      },
                                      [_vm._v("Edit")]
                                    )
                                  : _vm._e()
                              ])
                            ])
                          : _vm.userInfo.role >= 50 && note.DeletedAt != null
                          ? _c("div", { staticClass: "note-footer" }, [
                              note.Edits.length > 0 && _vm.userInfo.role >= 50
                                ? _c(
                                    "b",
                                    {
                                      staticClass: "clickable",
                                      staticStyle: { color: "#ff8944" },
                                      on: {
                                        click: function($event) {
                                          return _vm.showEditHistory(
                                            note.NoteID
                                          )
                                        }
                                      }
                                    },
                                    [
                                      _vm.showEditHistoryFor.includes(
                                        note.NoteID
                                      )
                                        ? _c("span", [
                                            _vm._v("Hide Edit History")
                                          ])
                                        : _c("span", [
                                            _vm._v("Show Edit History")
                                          ])
                                    ]
                                  )
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.showEditHistoryFor.includes(note.NoteID)
                          ? _c("div", { staticClass: "note-footer" }, [
                              _c(
                                "ul",
                                {
                                  staticClass: "critical",
                                  staticStyle: { width: "100%" }
                                },
                                _vm._l(note.Edits, function(edited) {
                                  return _c(
                                    "li",
                                    { key: edited.NoteID, staticClass: "note" },
                                    [
                                      _c("div", {
                                        staticClass: "note-body",
                                        domProps: {
                                          innerHTML: _vm._s(edited.Note)
                                        }
                                      }),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "note-footer" },
                                        [
                                          _c("span", [
                                            _vm._v(
                                              _vm._s(edited.name) +
                                                " " +
                                                _vm._s(edited.surname)
                                            )
                                          ]),
                                          _c("span", [
                                            _vm._v(_vm._s(edited.CreatedAt))
                                          ])
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass: "note-footer",
                                          staticStyle: { color: "#ff8944" }
                                        },
                                        [
                                          _c("span", [
                                            _vm._v(
                                              "Edited By " +
                                                _vm._s(edited.EditedName) +
                                                " " +
                                                _vm._s(edited.EditedSurname)
                                            )
                                          ]),
                                          _c("span", [
                                            _vm._v(_vm._s(edited.EditedAt))
                                          ])
                                        ]
                                      )
                                    ]
                                  )
                                }),
                                0
                              )
                            ])
                          : _vm._e()
                      ]
                    )
                  }),
                  0
                )
              : _c("ul", [_c("li", [_vm._v("No patient notes found")])])
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.activeTab == "patient"
        ? _c("div", { staticClass: "content" }, [
            _vm.notes.information.length > 0
              ? _c(
                  "ul",
                  { staticClass: "medical" },
                  _vm._l(_vm.notes.information, function(note) {
                    return _c(
                      "li",
                      {
                        key: note.NoteID,
                        staticClass: "note",
                        class: [
                          note.DeletedAt != null || note.EditedAt != null
                            ? "deleted"
                            : ""
                        ]
                      },
                      [
                        _c("div", {
                          staticClass: "note-body",
                          domProps: { innerHTML: _vm._s(note.Note) }
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "note-footer" }, [
                          _c("span", [
                            _vm._v(
                              _vm._s(note.name) + " " + _vm._s(note.surname)
                            )
                          ]),
                          _c("span", [_vm._v(_vm._s(note.CreatedAt))])
                        ]),
                        _vm._v(" "),
                        note.DeletedAt != null
                          ? _c(
                              "div",
                              {
                                staticClass: "note-footer",
                                staticStyle: { color: "red" }
                              },
                              [
                                _c("span", [
                                  _vm._v(
                                    "Deleted By " +
                                      _vm._s(note.DeletedName) +
                                      " " +
                                      _vm._s(note.DeletedSurname)
                                  )
                                ]),
                                _c("span", [_vm._v(_vm._s(note.DeletedAt))])
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        note.EditedAt != null
                          ? _c(
                              "div",
                              {
                                staticClass: "note-footer",
                                staticStyle: { color: "#ff8944" }
                              },
                              [
                                _c("span", [
                                  _vm._v(
                                    "Edited By " +
                                      _vm._s(note.EditedName) +
                                      " " +
                                      _vm._s(note.EditedSurname)
                                  )
                                ]),
                                _c("span", [_vm._v(_vm._s(note.EditedAt))])
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.userInfo.role >= 20 &&
                        note.DeletedAt == null &&
                        note.EditedAt == null
                          ? _c("div", { staticClass: "note-footer" }, [
                              _c("div", [
                                note.Edits.length > 0 && _vm.userInfo.role >= 50
                                  ? _c(
                                      "b",
                                      {
                                        staticClass: "clickable",
                                        staticStyle: { color: "#ff8944" },
                                        on: {
                                          click: function($event) {
                                            return _vm.showEditHistory(
                                              note.NoteID
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _vm.showEditHistoryFor.includes(
                                          note.NoteID
                                        )
                                          ? _c("span", [
                                              _vm._v("Hide Edit History")
                                            ])
                                          : _c("span", [
                                              _vm._v("Show Edit History")
                                            ])
                                      ]
                                    )
                                  : _vm._e()
                              ]),
                              _vm._v(" "),
                              _c("div", [
                                _vm.userInfo.role >= 50 ||
                                note.UserID == _vm.userInfo.id
                                  ? _c(
                                      "button",
                                      {
                                        staticClass:
                                          "smallTextBtn secondaryBtn",
                                        staticStyle: {
                                          "font-size": "12px",
                                          cursor: "pointer"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.deleteNote(note.NoteID)
                                          }
                                        }
                                      },
                                      [_vm._v("Delete")]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                note.UserID == _vm.userInfo.id
                                  ? _c(
                                      "button",
                                      {
                                        staticClass:
                                          "smallTextBtn secondaryBtn",
                                        staticStyle: {
                                          "font-size": "12px",
                                          cursor: "pointer"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.openNote(note)
                                          }
                                        }
                                      },
                                      [_vm._v("Edit")]
                                    )
                                  : _vm._e()
                              ])
                            ])
                          : _vm.userInfo.role >= 50 && note.DeletedAt != null
                          ? _c("div", { staticClass: "note-footer" }, [
                              note.Edits.length > 0 && _vm.userInfo.role >= 50
                                ? _c(
                                    "b",
                                    {
                                      staticClass: "clickable",
                                      staticStyle: { color: "#ff8944" },
                                      on: {
                                        click: function($event) {
                                          return _vm.showEditHistory(
                                            note.NoteID
                                          )
                                        }
                                      }
                                    },
                                    [
                                      _vm.showEditHistoryFor.includes(
                                        note.NoteID
                                      )
                                        ? _c("span", [
                                            _vm._v("Hide Edit History")
                                          ])
                                        : _c("span", [
                                            _vm._v("Show Edit History")
                                          ])
                                    ]
                                  )
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.showEditHistoryFor.includes(note.NoteID)
                          ? _c("div", { staticClass: "note-footer" }, [
                              _c(
                                "ul",
                                {
                                  staticClass: "medical",
                                  staticStyle: { width: "100%" }
                                },
                                _vm._l(note.Edits, function(edited) {
                                  return _c(
                                    "li",
                                    { key: edited.NoteID, staticClass: "note" },
                                    [
                                      _c("div", {
                                        staticClass: "note-body",
                                        domProps: {
                                          innerHTML: _vm._s(edited.Note)
                                        }
                                      }),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "note-footer" },
                                        [
                                          _c("span", [
                                            _vm._v(
                                              _vm._s(edited.name) +
                                                " " +
                                                _vm._s(edited.surname)
                                            )
                                          ]),
                                          _c("span", [
                                            _vm._v(_vm._s(edited.CreatedAt))
                                          ])
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass: "note-footer",
                                          staticStyle: { color: "#ff8944" }
                                        },
                                        [
                                          _c("span", [
                                            _vm._v(
                                              "Edited By " +
                                                _vm._s(edited.EditedName) +
                                                " " +
                                                _vm._s(edited.EditedSurname)
                                            )
                                          ]),
                                          _c("span", [
                                            _vm._v(_vm._s(edited.EditedAt))
                                          ])
                                        ]
                                      )
                                    ]
                                  )
                                }),
                                0
                              )
                            ])
                          : _vm._e()
                      ]
                    )
                  }),
                  0
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.notes.correspondence.length > 0
              ? _c(
                  "ul",
                  { staticClass: "other" },
                  _vm._l(_vm.notes.correspondence, function(note) {
                    return _c("li", { key: note.NoteID, staticClass: "note" }, [
                      _c("div", {
                        staticClass: "note-header",
                        domProps: { innerHTML: _vm._s(note.Subject) }
                      }),
                      _vm._v(" "),
                      _c("hr"),
                      _vm._v(" "),
                      _c("div", {
                        staticClass: "note-body",
                        domProps: { innerHTML: _vm._s(note.Message) }
                      }),
                      _vm._v(" "),
                      _c("hr"),
                      _vm._v(" "),
                      _c("div", { staticClass: "note-footer" }, [
                        _c("span", [
                          _vm._v(_vm._s(note.Name) + " " + _vm._s(note.Surname))
                        ]),
                        _c("span", [_vm._v(_vm._s(note.Date) + " ")])
                      ])
                    ])
                  }),
                  0
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.notes.correspondence.length == 0 &&
            _vm.notes.information.length == 0
              ? _c("ul", [_c("li", [_vm._v("No queried notes found")])])
              : _vm._e()
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.activeTab == "order"
        ? _c("div", { staticClass: "content" }, [
            _vm.prescription.Notes != "" && _vm.prescription.Notes != null
              ? _c("ul", { staticClass: "other" }, [
                  _c("li", { staticClass: "note" }, [
                    _c("div", {
                      staticClass: "note-body",
                      domProps: { innerHTML: _vm._s(_vm.prescription.Notes) }
                    }),
                    _vm._v(" "),
                    _c("div", { staticClass: "note-footer" })
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.notes.other.length > 0
              ? _c(
                  "ul",
                  { staticClass: "other" },
                  _vm._l(_vm.notes.other, function(note) {
                    return _c(
                      "li",
                      {
                        key: note.NoteID,
                        staticClass: "note",
                        class: [
                          note.DeletedAt != null || note.EditedAt != null
                            ? "deleted"
                            : ""
                        ]
                      },
                      [
                        _c("div", {
                          staticClass: "note-body",
                          domProps: { innerHTML: _vm._s(note.Note) }
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "note-footer" }, [
                          _c("span", [
                            _vm._v(
                              _vm._s(note.name) + " " + _vm._s(note.surname)
                            )
                          ]),
                          _c("span", [_vm._v(_vm._s(note.CreatedAt))])
                        ]),
                        _vm._v(" "),
                        note.DeletedAt != null
                          ? _c(
                              "div",
                              {
                                staticClass: "note-footer",
                                staticStyle: { color: "red" }
                              },
                              [
                                _c("span", [
                                  _vm._v(
                                    "Deleted By " +
                                      _vm._s(note.DeletedName) +
                                      " " +
                                      _vm._s(note.DeletedSurname)
                                  )
                                ]),
                                _c("span", [_vm._v(_vm._s(note.DeletedAt))])
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        note.EditedAt != null
                          ? _c(
                              "div",
                              {
                                staticClass: "note-footer",
                                staticStyle: { color: "#ff8944" }
                              },
                              [
                                _c("span", [
                                  _vm._v(
                                    "Edited By " +
                                      _vm._s(note.EditedName) +
                                      " " +
                                      _vm._s(note.EditedSurname)
                                  )
                                ]),
                                _c("span", [_vm._v(_vm._s(note.EditedAt))])
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.userInfo.role >= 20 &&
                        note.DeletedAt == null &&
                        note.EditedAt == null
                          ? _c("div", { staticClass: "note-footer" }, [
                              _c("div", [
                                note.Edits.length > 0 && _vm.userInfo.role >= 50
                                  ? _c(
                                      "b",
                                      {
                                        staticClass: "clickable",
                                        staticStyle: { color: "#ff8944" },
                                        on: {
                                          click: function($event) {
                                            return _vm.showEditHistory(
                                              note.NoteID
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _vm.showEditHistoryFor.includes(
                                          note.NoteID
                                        )
                                          ? _c("span", [
                                              _vm._v("Hide Edit History")
                                            ])
                                          : _c("span", [
                                              _vm._v("Show Edit History")
                                            ])
                                      ]
                                    )
                                  : _vm._e()
                              ]),
                              _vm._v(" "),
                              _c("div", [
                                _vm.userInfo.role >= 50 ||
                                note.UserID == _vm.userInfo.id
                                  ? _c(
                                      "button",
                                      {
                                        staticClass:
                                          "smallTextBtn secondaryBtn",
                                        staticStyle: {
                                          "font-size": "12px",
                                          cursor: "pointer"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.deleteNote(note.NoteID)
                                          }
                                        }
                                      },
                                      [_vm._v("Delete")]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                note.UserID == _vm.userInfo.id
                                  ? _c(
                                      "button",
                                      {
                                        staticClass:
                                          "smallTextBtn secondaryBtn",
                                        staticStyle: {
                                          "font-size": "12px",
                                          cursor: "pointer"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.openNote(note)
                                          }
                                        }
                                      },
                                      [_vm._v("Edit")]
                                    )
                                  : _vm._e()
                              ])
                            ])
                          : _vm.userInfo.role >= 50 && note.DeletedAt != null
                          ? _c("div", { staticClass: "note-footer" }, [
                              note.Edits.length > 0 && _vm.userInfo.role >= 50
                                ? _c(
                                    "b",
                                    {
                                      staticClass: "clickable",
                                      staticStyle: { color: "#ff8944" },
                                      on: {
                                        click: function($event) {
                                          return _vm.showEditHistory(
                                            note.NoteID
                                          )
                                        }
                                      }
                                    },
                                    [
                                      _vm.showEditHistoryFor.includes(
                                        note.NoteID
                                      )
                                        ? _c("span", [
                                            _vm._v("Hide Edit History")
                                          ])
                                        : _c("span", [
                                            _vm._v("Show Edit History")
                                          ])
                                    ]
                                  )
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.showEditHistoryFor.includes(note.NoteID)
                          ? _c("div", { staticClass: "note-footer" }, [
                              _c(
                                "ul",
                                {
                                  staticClass: "other",
                                  staticStyle: { width: "100%" }
                                },
                                _vm._l(note.Edits, function(edited) {
                                  return _c(
                                    "li",
                                    { key: edited.NoteID, staticClass: "note" },
                                    [
                                      _c("div", {
                                        staticClass: "note-body",
                                        domProps: {
                                          innerHTML: _vm._s(edited.Note)
                                        }
                                      }),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "note-footer" },
                                        [
                                          _c("span", [
                                            _vm._v(
                                              _vm._s(edited.name) +
                                                " " +
                                                _vm._s(edited.surname)
                                            )
                                          ]),
                                          _c("span", [
                                            _vm._v(_vm._s(edited.CreatedAt))
                                          ])
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass: "note-footer",
                                          staticStyle: { color: "#ff8944" }
                                        },
                                        [
                                          _c("span", [
                                            _vm._v(
                                              "Edited By " +
                                                _vm._s(edited.EditedName) +
                                                " " +
                                                _vm._s(edited.EditedSurname)
                                            )
                                          ]),
                                          _c("span", [
                                            _vm._v(_vm._s(edited.EditedAt))
                                          ])
                                        ]
                                      )
                                    ]
                                  )
                                }),
                                0
                              )
                            ])
                          : _vm._e()
                      ]
                    )
                  }),
                  0
                )
              : _vm._e(),
            _vm._v(" "),
            (_vm.prescription.Notes == "" || _vm.prescription.Notes == null) &&
            _vm.notes.other.length == 0
              ? _c("ul", [_c("li", [_vm._v("No order notes found")])])
              : _vm._e()
          ])
        : _vm._e()
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("a", { attrs: { href: "javascript:;" } }, [
      _c("i", { staticClass: "fa fa-plus" })
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-fdabf09c", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/components/pages/prescriptionpool/NotesPopup.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],\"babel-preset-env\"],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/pages/prescriptionpool/NotesPopup.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-fdabf09c\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/pages/prescriptionpool/NotesPopup.vue")
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
Component.options.__file = "resources/assets/js/components/pages/prescriptionpool/NotesPopup.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fdabf09c", Component.options)
  } else {
    hotAPI.reload("data-v-fdabf09c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});