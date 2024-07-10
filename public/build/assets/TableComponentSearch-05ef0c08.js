import{n as d,d as u,T as p}from"./app-a3e6dddd.js";import{D as h}from"./vuejs-datepicker.esm-72f1c627.js";const v={extends:u,components:{Datepicker:h,Treeselect:p},data(){return{strict:!0,firstLoad:!0,customPaginate:{total:!1}}},computed:{csvUrlSearch(){return this.tableTitle=="Register"?"/orders/csv/register"+this.currentPageParam+this.currentQueryString+this.currentRangeParam+this.currentOrderParam+this.currentLimitParam+this.filterParams(!1):"/orders/csv"+this.currentPageParam+this.currentQueryString+this.currentRangeParam+this.currentOrderParam+this.currentLimitParam+this.filterParams(!1)},noSelectedFilters(){if(Object.keys(this.selectedFilters).length==0)return!0;{let r=!0,e=Object.keys(this.selectedFilters);for(let t in Object.keys(this.selectedFilters))(Array.isArray(this.selectedFilters[e[t]])&&this.selectedFilters[e[t]].length>0||this.selectedFilters[e[t]]&&!Array.isArray(this.selectedFilters[e[t]]))&&(r=!1);return r}}},mounted(){this.filters.forEach(r=>{r.type=="select"&&(r.selected?this.selectedFilters[r.value]=r.selected:this.selectedFilters[r.value]="")}),localStorage.getItem(`${this.tableTitle}.filters`)!==null&&localStorage.getItem(`${this.tableTitle}.filters`)!={}&&(this.selectedFilters=JSON.parse(localStorage.getItem(`${this.tableTitle}.filters`)))},methods:{selectOpen(r){r=="status-extended"&&document.querySelector('[data-instance-id="status-extended"]').firstChild.classList.add("vue-treeselect__menu-container-body")},getData(){if(this.loading=!0,this.firstLoad){if(!this.loadOnStartup){this.firstLoad=!1,this.loading=!1;return}localStorage.getItem(`${this.tableTitle}.filters`)!==null&&localStorage.getItem(`${this.tableTitle}.filters`)!={}&&(this.selectedFilters=JSON.parse(localStorage.getItem(`${this.tableTitle}.filters`)))}axios.get(this.dataUrl+this.currentPageParam+this.currentQueryString+this.currentRangeParam+this.currentOrderParam+this.currentLimitParam+this.filterParams()).then(r=>{this.data=r.data.data,!this.data.total&&this.customTotal&&this.firstLoad&&axios.get(this.customTotal).then(t=>{this.customPaginate.total=t.data.data});let e=this.data.data.map(function(t){return t[Object.keys(t)[0]]});this.$store.commit("replaceVisible",e)}).catch(r=>{this.reportError(r)}).finally(()=>{this.loading=!1,this.firstLoad=!1})},prepareCSVExport(r=""){let e=this.dataUrl+"?page=1"+this.currentQueryString+this.currentRangeParam+this.currentOrderParam+`&limit=99999${this.filterParams(!1)}`;axios.get(e).then(t=>{this.exportCSV(t.data.data.data,r)}).catch(t=>{this.reportError(t)})},filterParams(){return`&f=${JSON.stringify(this.selectedFilters)}&strict=${this.strict}`},search(){this.getData()},saveFilters(){localStorage.setItem(`${this.tableTitle}.filters`,JSON.stringify(this.selectedFilters)),this.postSuccess("Filters saved")},resetFilters(){this.selectedFilters={},this.filters.forEach(r=>{r.type=="select"&&(this.selectedFilters[r.value]="")}),localStorage.removeItem(`${this.tableTitle}.filters`),this.postSuccess("Filters reset"),this.getData()},openInTab(r){if(this.redirectEvent)this.$root.$emit(this.redirectEvent,r);else{let e=this.$router.resolve({name:this.redirectName,params:{id:r}});window.open(e.href,"_blank")}}}};var f=function(){var e=this,t=e._self._c;return t("div",{staticClass:"natcol-table",class:[e.columnClass]},[t("transition",{attrs:{name:"fade"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"loader loader-fixed"},[e._v("Loading...")])]),t("div",{},[t("div",{},[e.filters.length!=0?t("div",{staticClass:"row search-boxes"},e._l(e.filters,function(a,l){return t("div",{key:l,staticClass:"filter-inputs"},[a.type=="text"?t("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedFilters[a.value],expression:"selectedFilters[filter.value]"}],staticClass:"form-control tBoxSize02",attrs:{placeholder:a.title},domProps:{value:e.selectedFilters[a.value]},on:{input:function(s){s.target.composing||e.$set(e.selectedFilters,a.value,s.target.value)}}}):a.type=="spacer"?t("div",{staticStyle:{width:"220px"}}):a.type=="textarea"?t("div",{staticClass:"esa-text-area-wrapper"},[t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.selectedFilters[a.value],expression:"selectedFilters[filter.value]"}],staticClass:"form-control tBoxSize02",attrs:{placeholder:a.title},domProps:{value:e.selectedFilters[a.value]},on:{input:function(s){s.target.composing||e.$set(e.selectedFilters,a.value,s.target.value)}}})]):a.type=="date"?t("datepicker",{attrs:{placeholder:a.title,name:a.value,"clear-button":!0,"clear-button-icon":"fa fa-times",maxlength:"30"},model:{value:e.selectedFilters[a.value],callback:function(s){e.$set(e.selectedFilters,a.value,s)},expression:"selectedFilters[filter.value]"}}):a.type=="select"?t("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedFilters[a.value],expression:"selectedFilters[filter.value]"}],staticClass:"table-dropdown",class:[e.selectedFilters[a.value]&&e.selectedFilters[a.value]!=""?"select-dropdown-active":""],attrs:{name:a.value},on:{change:function(s){var i=Array.prototype.filter.call(s.target.options,function(n){return n.selected}).map(function(n){var o="_value"in n?n._value:n.value;return o});e.$set(e.selectedFilters,a.value,s.target.multiple?i:i[0])}}},e._l(a.options,function(s,i){return t("option",{key:i,domProps:{value:s.value}},[e._v(" "+e._s(s.title)+" ")])}),0):a.type=="select-extended"?t("treeselect",{staticClass:"vue-treeselect-reports",attrs:{"open-on-click":!0,"open-on-focus":!0,"open-on-hover":!0,multiple:!!a.multiple,clearable:!!a.clearable,searchable:!0,"disable-branch-nodes":a.disableBranchNodes?a.disableBranchNodes:!1,placeholder:a.placeholder,"show-count":!0,"default-expand-level":1,"append-to-body":!1,options:a.options,instanceId:a.value},on:{open:e.selectOpen},scopedSlots:e._u([{key:"value-label",fn:function({node:s}){return t("div",{},[e._v(" "+e._s(s.raw.customLabel?s.raw.customLabel:s.raw.label)+" ")])}},{key:"option-label",fn:function({node:s,shouldShowCount:i,count:n,labelClassName:o,countClassName:c}){return t("label",{class:o},[e._v(" "+e._s(s.label)+" "),i?t("span",{class:c},[e._v("("+e._s(n)+")")]):e._e()])}}],null,!0),model:{value:e.selectedFilters[a.value],callback:function(s){e.$set(e.selectedFilters,a.value,s)},expression:"selectedFilters[filter.value]"}}):a.type=="select-async"?t("treeselect",{staticClass:"vue-treeselect-reports",attrs:{"open-on-click":!0,clearable:!!a.clearable,"open-on-focus":!0,"open-on-hover":!0,searchable:!0,"disable-branch-nodes":a.disableBranchNodes?a.disableBranchNodes:!1,"cache-options":!0,placeholder:a.placeholder,"show-count":!0,"default-expand-level":1,async:!0,"load-options":a.loadOptions,"default-options":!1,multiple:!!a.multiple,"append-to-body":!1},scopedSlots:e._u([{key:"value-label",fn:function({node:s}){return t("div",{},[e._v(e._s(s.raw.customLabel?s.raw.customLabel:s.raw.label))])}},{key:"option-label",fn:function({node:s,shouldShowCount:i,count:n,labelClassName:o,countClassName:c}){return t("label",{class:o},[e._v(" "+e._s(s.label)+" "),i?t("span",{class:c},[e._v("("+e._s(n)+")")]):e._e()])}}],null,!0),model:{value:e.selectedFilters[a.value],callback:function(s){e.$set(e.selectedFilters,a.value,s)},expression:"selectedFilters[filter.value]"}}):t("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedFilters[a.value],expression:"selectedFilters[filter.value]"}],staticClass:"form-control tBoxSize02",attrs:{placeholder:a.title},domProps:{value:e.selectedFilters[a.value]},on:{input:function(s){s.target.composing||e.$set(e.selectedFilters,a.value,s.target.value)}}})],1)}),0):e._e(),e.filters.length!=0?t("div",{staticClass:"row filters-row"},[t("div",[t("input",{attrs:{name:"strict",type:"checkbox"},domProps:{checked:e.strict}}),t("label",{attrs:{for:"strict"},on:{click:function(a){e.strict=!e.strict}}},[e._v("Exact match")])]),t("div",[e._t("functionalities"),t("button",{staticClass:"btn btnSize02 tertiaryBtn",attrs:{title:"Store current filers for later use",disabled:e.loading||e.filterRequired&&e.noSelectedFilters},on:{click:function(a){return e.saveFilters()}}},[e._v("Save Filters")]),t("button",{staticClass:"btn btnSize02 tertiaryBtn",attrs:{title:"Reset saved filters",disabled:e.loading||e.filterRequired&&e.noSelectedFilters},on:{click:function(a){return e.resetFilters()}}},[e._v("Reset Filters")]),t("button",{staticClass:"btn btnSize02 tertiaryBtn",attrs:{title:"Initiate search",disabled:e.loading||e.filterRequired&&e.noSelectedFilters},on:{click:function(a){return e.search()}}},[e._v("Search")])],2)]):e._e(),t("div",{staticClass:"row filters-row"},[t("div",{staticClass:"filter-inputs"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.queryString,expression:"queryString"}],staticClass:"form-control tBoxSize02",attrs:{type:"text",id:"queryString",placeholder:"Search..."},domProps:{value:e.queryString},on:{input:function(a){a.target.composing||(e.queryString=a.target.value)}}}),t("select",{directives:[{name:"model",rawName:"v-model",value:e.limit,expression:"limit"}],staticClass:"table-dropdown",on:{change:function(a){var l=Array.prototype.filter.call(a.target.options,function(s){return s.selected}).map(function(s){var i="_value"in s?s._value:s.value;return i});e.limit=a.target.multiple?l:l[0]}}},[t("option",{attrs:{value:"10"}},[e._v("Show 10")]),t("option",{attrs:{value:"20"}},[e._v("Show 20")]),t("option",{attrs:{value:"50"}},[e._v("Show 50")]),t("option",{attrs:{value:"100"}},[e._v("Show 100")]),t("option",{attrs:{value:"200"}},[e._v("Show 200")]),t("option",{attrs:{value:"9999999999"}},[e._v("Show All")])])]),t("div",{staticClass:"dropdown float-right"},[t("a",{staticClass:"btn btn-primary waves-effect",attrs:{title:"Print the results"},on:{click:function(a){return e.printChart(e.$el)}}},[t("i",{staticClass:"fa fa-print",attrs:{"aria-hidden":"true"}})]),t("a",{staticClass:"btn btn-primary waves-effect",attrs:{title:"Download results as PDF"},on:{click:function(a){return e.exportPDF(e.$el)}}},[t("i",{staticClass:"fa fa-file-pdf-o",attrs:{"aria-hidden":"true"}})]),e.csvUrlSearch&&e.csvUrl?t("a",{staticClass:"btn btn-primary waves-effect",attrs:{title:"Download results as CSV",href:e.csvUrlSearch}},[t("i",{staticClass:"fa fa-file",attrs:{"aria-hidden":"true"}})]):t("a",{staticClass:"btn btn-primary waves-effect",attrs:{title:"Download results as CSV"},on:{click:function(a){return e.prepareCSVExport(e.tableTitle)}}},[t("i",{staticClass:"fa fa-file",attrs:{"aria-hidden":"true"}})])])]),e._t("filters")],2),t("PaginationComponent",{staticClass:"card-footer",staticStyle:{"border-top":"1px solid #8f8f8f"},attrs:{data:e.data,loading:e.loading,"custom-total":e.customTotal,"custom-paginate":e.customPaginate},on:{click:e.changePage},scopedSlots:e._u([{key:"paginationnumberslot",fn:function(){return[e._t("toppagination")]},proxy:!0}],null,!0)}),t("div",{staticClass:"card-body",staticStyle:{"min-height":"100px"}},[t("table",{directives:[{name:"show",rawName:"v-show",value:e.data.data.length>=1,expression:"data.data.length >= 1"}],staticClass:"table table-hover",staticStyle:{"table-layout":"auto"}},[t("thead",{staticClass:"primary-color text-white"},[t("tr",[e.checkboxVisible?t("th",{staticStyle:{width:"40px","font-weight":"400",padding:"16px 8px","vertical-align":"top"}},[e._t("thfilter")],2):e._e(),e._l(e.data.data[0],function(a,l){return!(typeof e.hiddenColumns<"u")||!e.hiddenColumns.includes(l)?t("th",{class:[e.notOrderable.includes(l)?"":"clickable",l==e.orderBy?"ordered":""],attrs:{title:e.notOrderable.includes(l)?"":"Sort by "+e.translate(l)},on:{click:function(s){return e.setOrder(l)}}},[e._v(" "+e._s(e.translate(l))+" "),e.notOrderable.includes(l)?e._e():t("span",[l==e.orderBy&&e.orderDirection=="DESC"?t("i",{staticClass:"fa fa-caret-down"}):e._e(),l==e.orderBy&&e.orderDirection=="ASC"?t("i",{staticClass:"fa fa-caret-up"}):e._e(),l!=e.orderBy?t("i",{staticClass:"fa fa-sort"}):e._e()])]):e._e()}),t("th",{style:[e.deleteId?"width: 75px;":"width: 50px;"]})],2)]),t("tbody",e._l(e.data.data,function(a,l){return t("tr",{key:l,staticClass:"clickable",class:[a.NotFound==!0?"row-danger":""],on:{dblclick:function(s){return e.openInTab(a[e.redirectId])}}},[e.checkboxVisible?t("td",[t("input",{attrs:{name:a[Object.keys(a)[0]],type:"checkbox"},domProps:{checked:e.checked.includes(a[Object.keys(a)[0]])}}),t("label",{attrs:{for:a[Object.keys(a)[0]]},on:{click:function(s){return e.check(a)}}})]):e._e(),e._l(a,function(s,i){return!(typeof e.hiddenColumns<"u")||!e.hiddenColumns.includes(i)?t("td",[typeof s=="string"?t("span",{domProps:{innerHTML:e._s(s)}}):typeof s=="object"?t("ul",e._l(s,function(n){return t("li",{domProps:{innerHTML:e._s(n)}})}),0):t("span",{domProps:{innerHTML:e._s(s)}})]):e._e()}),t("td",[e.showtool?[e.redirectName?t("a",{staticClass:"btn btn-primary waves-effect table-icon",staticStyle:{margin:"0"},on:{click:function(s){return e.openInTab(a[e.redirectId])}}},[t("i",{staticClass:"fa fa-search-plus",attrs:{"aria-hidden":"true"}})]):e._e(),e.deleteId&&e.deleteUrl?t("a",{staticClass:"btn btn-primary waves-effect table-icon",class:{clickable:e.deleteId},staticStyle:{margin:"0"},on:{click:function(s){return e.deleteItem(a[e.deleteId])}}},[t("i",{staticClass:"fa fa-trash",attrs:{"aria-hidden":"true"}})]):e._e(),e._t("tools",null,{item:a})]:e._e()],2)],2)}),0)]),t("div",{directives:[{name:"show",rawName:"v-show",value:e.data.data.length<=0,expression:"data.data.length <= 0"}]},[e._v(" No data found! ")])]),t("PaginationComponent",{staticClass:"card-footer",attrs:{data:e.data,loading:e.loading,"custom-total":e.customTotal,"custom-paginate":e.customPaginate},on:{click:e.changePage}})],1)],1)},m=[],b=d(v,f,m,!1,null,null,null,null);const y=b.exports;export{y as default};