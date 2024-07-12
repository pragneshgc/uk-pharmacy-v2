import{_ as L,s as D,u as N,$,G as _,e as S,o as l,c as a,m as C,j as y,w as u,a as s,v as w,T as E,F as h,f as b,B as g,h as F,A as O,n as p,t as m,g as V,b as d,r as v,a0 as R,k as j}from"./app-82NRaNNR.js";import{D as z}from"./Datepicker-tYUTlvRR.js";const q={setup(){const{checked:e}=D(N()),{replaceVisible:o,addChecked:n}=N();return{checked:e,replaceVisible:o,addChecked:n}},extends:$,components:{Datepicker:z,Treeselect:_},data(){return{strict:!0,firstLoad:!0,customPaginate:{total:!1}}},computed:{csvUrlSearch(){return this.tableTitle=="Register"?"/orders/csv/register"+this.currentPageParam+this.currentQueryString+this.currentRangeParam+this.currentOrderParam+this.currentLimitParam+this.filterParams(!1):"/orders/csv"+this.currentPageParam+this.currentQueryString+this.currentRangeParam+this.currentOrderParam+this.currentLimitParam+this.filterParams(!1)},noSelectedFilters(){if(Object.keys(this.selectedFilters).length==0)return!0;{let e=!0,o=Object.keys(this.selectedFilters);for(let n in Object.keys(this.selectedFilters))(Array.isArray(this.selectedFilters[o[n]])&&this.selectedFilters[o[n]].length>0||this.selectedFilters[o[n]]&&!Array.isArray(this.selectedFilters[o[n]]))&&(e=!1);return e}}},mounted(){this.filters.forEach(e=>{e.type=="select"&&(e.selected?this.selectedFilters[e.value]=e.selected:this.selectedFilters[e.value]="")}),localStorage.getItem(`${this.tableTitle}.filters`)!==null&&localStorage.getItem(`${this.tableTitle}.filters`)!={}&&(this.selectedFilters=JSON.parse(localStorage.getItem(`${this.tableTitle}.filters`)))},methods:{selectOpen(e){e=="status-extended"&&document.querySelector('[data-instance-id="status-extended"]').firstChild.classList.add("vue-treeselect__menu-container-body")},getData(){if(this.loading=!0,this.firstLoad){if(!this.loadOnStartup){this.firstLoad=!1,this.loading=!1;return}localStorage.getItem(`${this.tableTitle}.filters`)!==null&&localStorage.getItem(`${this.tableTitle}.filters`)!={}&&(this.selectedFilters=JSON.parse(localStorage.getItem(`${this.tableTitle}.filters`)))}axios.get(this.dataUrl+this.currentPageParam+this.currentQueryString+this.currentRangeParam+this.currentOrderParam+this.currentLimitParam+this.filterParams()).then(e=>{this.data=e.data.data,!this.data.total&&this.customTotal&&this.firstLoad&&axios.get(this.customTotal).then(n=>{this.customPaginate.total=n.data.data});let o=this.data.data.map(function(n){return n[Object.keys(n)[0]]});this.replaceVisible(o)}).catch(e=>{console.log("search",e),this.reportError(e)}).finally(()=>{this.loading=!1,this.firstLoad=!1})},prepareCSVExport(e=""){let o=this.dataUrl+"?page=1"+this.currentQueryString+this.currentRangeParam+this.currentOrderParam+`&limit=99999${this.filterParams(!1)}`;axios.get(o).then(n=>{this.exportCSV(n.data.data.data,e)}).catch(n=>{this.reportError(n)})},filterParams(){return`&f=${JSON.stringify(this.selectedFilters)}&strict=${this.strict}`},search(){this.getData()},saveFilters(){localStorage.setItem(`${this.tableTitle}.filters`,JSON.stringify(this.selectedFilters)),this.postSuccess("Filters saved")},resetFilters(){this.selectedFilters={},this.filters.forEach(e=>{e.type=="select"&&(this.selectedFilters[e.value]="")}),localStorage.removeItem(`${this.tableTitle}.filters`),this.postSuccess("Filters reset"),this.getData()},openInTab(e){if(this.redirectEvent)this.emitter.emit(this.redirectEvent,e);else{let o=this.$router.resolve({name:this.redirectName,params:{id:e}});window.open(o.href,"_blank")}}}},A={class:"loader loader-fixed"},M={class:""},H={class:""},J={key:0,class:"row search-boxes"},Q=["onUpdate:modelValue","placeholder"],G={key:1,style:{width:"220px"}},K={key:2,class:"esa-text-area-wrapper"},W=["onUpdate:modelValue","placeholder"],X=["name","onUpdate:modelValue"],Y=["value"],Z={slot:"value-label","slot-scope":"{ node }"},x={slot:"value-label","slot-scope":"{ node }"},ee=["onUpdate:modelValue","placeholder"],te={key:1,class:"row filters-row"},se=["checked"],le=["disabled"],ae=["disabled"],oe=["disabled"],re={class:"row filters-row"},ne={class:"filter-inputs"},ie=j('<option value="10">Show 10</option><option value="20">Show 20</option><option value="50">Show 50</option><option value="100">Show 100</option><option value="200">Show 200</option><option value="9999999999">Show All</option>',6),de=[ie],ce={class:"dropdown float-right"},ue=s("i",{class:"fa fa-print","aria-hidden":"true"},null,-1),he=[ue],pe=s("i",{class:"fa fa-file-pdf-o","aria-hidden":"true"},null,-1),me=[pe],be=["href"],fe=s("i",{class:"fa fa-file","aria-hidden":"true"},null,-1),ve=[fe],ye=s("i",{class:"fa fa-file","aria-hidden":"true"},null,-1),ge=[ye],ke={class:"card-body",style:{"min-height":"100px"}},Se={style:{"table-layout":"auto"},class:"table table-hover"},Ce={class:"primary-color text-white"},we={key:0,style:{width:"40px","font-weight":"400",padding:"16px 8px","vertical-align":"top"}},Fe=["title","onClick"],Ve={key:0},Pe={key:0,class:"fa fa-caret-down"},Te={key:1,class:"fa fa-caret-up"},Ne={key:2,class:"fa fa-sort"},Oe=["onDblclick"],Ue={key:0},Ie=["name","checked"],Be=["for","onClick"],Le={key:0},De={key:0},$e=["innerHTML"],_e=["innerHTML"],Ee=["onClick"],Re=s("i",{class:"fa fa-search-plus","aria-hidden":"true"},null,-1),je=[Re],ze=["onClick"],qe=s("i",{class:"fa fa-trash","aria-hidden":"true"},null,-1),Ae=[qe];function Me(e,o,n,U,f,c){const I=S("datepicker"),P=S("treeselect"),T=S("PaginationComponent");return l(),a("div",{class:p(["natcol-table",[e.columnClass]])},[C(E,{name:"fade"},{default:y(()=>[u(s("div",A,"Loading...",512),[[w,e.loading]])]),_:1}),s("div",M,[s("div",H,[e.filters.length!=0?(l(),a("div",J,[(l(!0),a(h,null,b(e.filters,(t,i)=>(l(),a("div",{key:i,class:"filter-inputs"},[t.type=="text"?u((l(),a("input",{key:0,"onUpdate:modelValue":r=>e.selectedFilters[t.value]=r,class:"form-control tBoxSize02",placeholder:t.title},null,8,Q)),[[g,e.selectedFilters[t.value]]]):t.type=="spacer"?(l(),a("div",G)):t.type=="textarea"?(l(),a("div",K,[u(s("textarea",{"onUpdate:modelValue":r=>e.selectedFilters[t.value]=r,class:"form-control tBoxSize02",placeholder:t.title},`
                                                                                        `,8,W),[[g,e.selectedFilters[t.value]]])])):t.type=="date"?(l(),F(I,{key:3,placeholder:t.title,name:t.value,"clear-button":!0,"clear-button-icon":"fa fa-times",modelValue:e.selectedFilters[t.value],"onUpdate:modelValue":r=>e.selectedFilters[t.value]=r,maxlength:"30"},null,8,["placeholder","name","modelValue","onUpdate:modelValue"])):t.type=="select"?u((l(),a("select",{key:4,class:p(["table-dropdown",[e.selectedFilters[t.value]&&e.selectedFilters[t.value]!=""?"select-dropdown-active":""]]),name:t.value,"onUpdate:modelValue":r=>e.selectedFilters[t.value]=r},[(l(!0),a(h,null,b(t.options,(r,k)=>(l(),a("option",{key:k,value:r.value},m(r.title),9,Y))),128))],10,X)),[[O,e.selectedFilters[t.value]]]):t.type=="select-extended"?(l(),F(P,{key:5,class:"vue-treeselect-reports","open-on-click":!0,"open-on-focus":!0,"open-on-hover":!0,multiple:!!t.multiple,clearable:!!t.clearable,searchable:!0,"disable-branch-nodes":t.disableBranchNodes?t.disableBranchNodes:!1,placeholder:t.placeholder,"show-count":!0,"default-expand-level":1,"append-to-body":!1,options:t.options,instanceId:t.value,onOpen:c.selectOpen,modelValue:e.selectedFilters[t.value],"onUpdate:modelValue":r=>e.selectedFilters[t.value]=r},{default:y(()=>[s("div",Z,m(e.node.raw.customLabel?e.node.raw.customLabel:e.node.raw.label),1),s("label",{slot:"option-label","slot-scope":"{ node, shouldShowCount, count, labelClassName, countClassName }",class:p(e.labelClassName)},[V(m(e.node.label)+" ",1),e.shouldShowCount?(l(),a("span",{key:0,class:p(e.countClassName)},"("+m(e.count)+")",3)):d("",!0)],2)]),_:2},1032,["multiple","clearable","disable-branch-nodes","placeholder","options","instanceId","onOpen","modelValue","onUpdate:modelValue"])):t.type=="select-async"?(l(),F(P,{key:6,class:"vue-treeselect-reports","open-on-click":!0,clearable:!!t.clearable,"open-on-focus":!0,"open-on-hover":!0,searchable:!0,"disable-branch-nodes":t.disableBranchNodes?t.disableBranchNodes:!1,"cache-options":!0,placeholder:t.placeholder,"show-count":!0,"default-expand-level":1,async:!0,"load-options":t.loadOptions,"default-options":!1,multiple:!!t.multiple,"append-to-body":!1,modelValue:e.selectedFilters[t.value],"onUpdate:modelValue":r=>e.selectedFilters[t.value]=r},{default:y(()=>[s("div",x,m(e.node.raw.customLabel?e.node.raw.customLabel:e.node.raw.label),1),s("label",{slot:"option-label","slot-scope":"{ node, shouldShowCount, count, labelClassName, countClassName }",class:p(e.labelClassName)},[V(m(e.node.label)+" ",1),e.shouldShowCount?(l(),a("span",{key:0,class:p(e.countClassName)},"("+m(e.count)+")",3)):d("",!0)],2)]),_:2},1032,["clearable","disable-branch-nodes","placeholder","load-options","multiple","modelValue","onUpdate:modelValue"])):u((l(),a("input",{key:7,"onUpdate:modelValue":r=>e.selectedFilters[t.value]=r,class:"form-control tBoxSize02",placeholder:t.title},null,8,ee)),[[g,e.selectedFilters[t.value]]])]))),128))])):d("",!0),e.filters.length!=0?(l(),a("div",te,[s("div",null,[s("input",{name:"strict",type:"checkbox",checked:f.strict},null,8,se),s("label",{for:"strict",onClick:o[0]||(o[0]=t=>f.strict=!f.strict)},"Exact match")]),s("div",null,[v(e.$slots,"functionalities"),s("button",{title:"Store current filers for later use",disabled:e.loading||e.filterRequired&&c.noSelectedFilters,class:"btn btnSize02 tertiaryBtn",onClick:o[1]||(o[1]=t=>c.saveFilters())},"Save Filters",8,le),s("button",{title:"Reset saved filters",disabled:e.loading||e.filterRequired&&c.noSelectedFilters,class:"btn btnSize02 tertiaryBtn",onClick:o[2]||(o[2]=t=>c.resetFilters())},"Reset Filters",8,ae),s("button",{title:"Initiate search",disabled:e.loading||e.filterRequired&&c.noSelectedFilters,class:"btn btnSize02 tertiaryBtn",onClick:o[3]||(o[3]=t=>c.search())},"Search",8,oe)])])):d("",!0),s("div",re,[s("div",ne,[u(s("input",{"onUpdate:modelValue":o[4]||(o[4]=t=>e.queryString=t),type:"text",class:"form-control tBoxSize02",id:"queryString",placeholder:"Search..."},null,512),[[g,e.queryString]]),u(s("select",{"onUpdate:modelValue":o[5]||(o[5]=t=>e.limit=t),class:"table-dropdown"},de,512),[[O,e.limit]])]),s("div",ce,[s("a",{title:"Print the results",class:"btn btn-primary waves-effect",onClick:o[6]||(o[6]=t=>e.printChart(e.$el))},he),s("a",{title:"Download results as PDF",class:"btn btn-primary waves-effect",onClick:o[7]||(o[7]=t=>e.exportPDF(e.$el))},me),c.csvUrlSearch&&e.csvUrl?(l(),a("a",{key:0,title:"Download results as CSV",class:"btn btn-primary waves-effect",href:c.csvUrlSearch},ve,8,be)):(l(),a("a",{key:1,title:"Download results as CSV",class:"btn btn-primary waves-effect",onClick:o[8]||(o[8]=t=>c.prepareCSVExport(e.tableTitle))},ge))])]),v(e.$slots,"filters")]),C(T,{class:"card-footer",style:{"border-top":"1px solid #8f8f8f"},data:e.data,loading:e.loading,"custom-total":e.customTotal,"custom-paginate":f.customPaginate,onClick:e.changePage},{paginationnumberslot:y(()=>[v(e.$slots,"toppagination")]),_:3},8,["data","loading","custom-total","custom-paginate","onClick"]),s("div",ke,[u(s("table",Se,[s("thead",Ce,[s("tr",null,[e.checkboxVisible?(l(),a("th",we,[v(e.$slots,"thfilter")])):d("",!0),(l(!0),a(h,null,b(e.data.data[0],(t,i)=>(l(),a(h,null,[!(typeof e.hiddenColumns<"u")||!e.hiddenColumns.includes(i)?(l(),a("th",{key:0,class:p([e.notOrderable.includes(i)?"":"clickable",i==e.orderBy?"ordered":""]),title:e.notOrderable.includes(i)?"":"Sort by "+e.translate(i),onClick:r=>e.setOrder(i)},[V(m(e.translate(i))+" ",1),e.notOrderable.includes(i)?d("",!0):(l(),a("span",Ve,[i==e.orderBy&&e.orderDirection=="DESC"?(l(),a("i",Pe)):d("",!0),i==e.orderBy&&e.orderDirection=="ASC"?(l(),a("i",Te)):d("",!0),i!=e.orderBy?(l(),a("i",Ne)):d("",!0)]))],10,Fe)):d("",!0)],64))),256)),s("th",{style:R([e.deleteId?"width: 75px;":"width: 50px;"])},null,4)])]),s("tbody",null,[(l(!0),a(h,null,b(e.data.data,(t,i)=>(l(),a("tr",{class:p(["clickable",[t.NotFound==!0?"row-danger":""]]),onDblclick:r=>c.openInTab(t[e.redirectId]),key:i},[e.checkboxVisible?(l(),a("td",Ue,[s("input",{name:t[Object.keys(t)[0]],type:"checkbox",checked:U.checked.includes(t[Object.keys(t)[0]])},null,8,Ie),s("label",{for:t[Object.keys(t)[0]],onClick:r=>e.check(t)},null,8,Be)])):d("",!0),(l(!0),a(h,null,b(t,(r,k)=>(l(),a(h,null,[!(typeof e.hiddenColumns<"u")||!e.hiddenColumns.includes(k)?(l(),a("td",Le,[typeof r=="object"?(l(),a("ul",De,[(l(!0),a(h,null,b(r,B=>(l(),a("li",null,m(B),1))),256))])):(l(),a("span",{key:1,innerHTML:r},null,8,$e))])):d("",!0),s("template",null,[s("td",null,[s("span",{innerHTML:r},null,8,_e)])])],64))),256)),s("td",null,[e.showtool?(l(),a(h,{key:0},[e.redirectName?(l(),a("a",{key:0,class:"btn btn-primary waves-effect table-icon",onClick:r=>c.openInTab(t[e.redirectId]),style:{margin:"0"}},je,8,Ee)):d("",!0),e.deleteId&&e.deleteUrl?(l(),a("a",{key:1,class:p(["btn btn-primary waves-effect table-icon",{clickable:e.deleteId}]),onClick:r=>e.deleteItem(t[e.deleteId]),style:{margin:"0"}},Ae,10,ze)):d("",!0),v(e.$slots,"tools",{item:t})],64)):d("",!0)])],42,Oe))),128))])],512),[[w,e.data.data.length>=1]]),u(s("div",null," No data found! ",512),[[w,e.data.data.length<=0]])]),C(T,{class:"card-footer",data:e.data,loading:e.loading,"custom-total":e.customTotal,"custom-paginate":f.customPaginate,onClick:e.changePage},null,8,["data","loading","custom-total","custom-paginate","onClick"])])],2)}const Qe=L(q,[["render",Me]]);export{Qe as default};
//# sourceMappingURL=TableComponentSearch-l001FdWN.js.map