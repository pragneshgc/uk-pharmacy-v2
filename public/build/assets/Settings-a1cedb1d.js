import{n as g,E as h}from"./app-a3e6dddd.js";const y={mixins:[h],data(){return{activeTab:userInfo.role<50?"application":"settings",settings:[],companySettings:[],applicationSettings:localStorage.getItem("settings.application")?JSON.parse(localStorage.getItem("settings.application")):{labelPrinter:"ZDesigner GK420d",deliveryNotePrinter:""},types:{1:{name:"Records Per Page",enabled:!0,type:"number"},2:{name:"Delivery Options",enabled:!0,type:"text"},3:{name:"Dispenser Limit",enabled:!0,type:"number"},5:{name:"PXP Status (LIVE or OFF)",enabled:!1,type:"switch"},900:{name:"Hidden",enabled:!1,type:"text"}},hiddenFields:["ClientID"],userInfo,errors:{},update:{},companySettingsUpdate:{},file:"",status:"",importing:!1,printAppOnline:!1}},computed:{globalSettings(){return this.settings.filter(i=>i.Type!=2)},deliveryOptions(){return this.settings.filter(i=>i.Type==2)},inputText(){return this.file!=""?this.file.name:"Upload XML"},buttonText(){return this.file!=""?"Importing":"Upload"}},mounted(){this.getSettings(),this.getCompanySettings(),this.getPrinterList()},methods:{getSettings(){axios.get("/settings").then(i=>{this.settings=i.data.data,this.settings.forEach(t=>{this.update[t.SettingID]=t.Value})}).catch(i=>{this.postError(i.data.data)})},getCompanySettings(){axios.get("/settings/company").then(i=>{this.companySettings=i.data.data,this.companySettingsUpdate=JSON.parse(JSON.stringify(this.companySettings))}).catch(i=>{this.postError(i.data.data)})},getPrinterList(){axios.get("http://localhost:63020").then(i=>{this.printAppOnline=i.data}).catch(i=>{this.printAppOnline=!1})},updateApplicationSettings(){this.$swal({title:"Are you sure you want to update local application settings?",text:"Make sure the values you are changing are correct!",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, update local application settings!"}).then(i=>{i.value&&(localStorage.setItem("settings.application",JSON.stringify(this.applicationSettings)),this.postSuccess("Application settings updated!"))})},updateGlobalSettings(){this.$swal({title:"Are you sure you want to update global application settings?",text:"Make sure the values you are changing are correct!",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, update global application settings!"}).then(i=>{i.value&&axios.patch("/settings",this.update).then(t=>{this.postSuccess("Global settings updated!")}).catch(t=>{this.postError(t.data.data)})})},updateCompanySettings(){this.$swal({title:"Are you sure you want to update company settings?",text:"Make sure the values you are changing are correct!",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, update company settings!"}).then(i=>{i.value&&axios.patch("/settings/company",this.companySettingsUpdate).then(t=>{this.postSuccess("Company settings updated!")}).catch(t=>{this.postError(t.data.data)})})},inputClick(){document.getElementById("file").click()},attachFile(){let i=document.getElementById("file").files;i.length&&(this.file=i[0])},upload(){this.importing=!0;let i=new FormData;i.append("file",this.file),i.append("option",this.option),axios.post("/import/xml",i,{headers:{"Content-type":"multipart/form-data"}}).then(t=>{this.status=t.data.message,this.postSuccess("XML imported successfully"),document.getElementById("file").value=""}).catch(t=>{this.postError(t.response.data.message),document.getElementById("file").value=""}).finally(()=>{this.file="",this.importing=!1})}}};var _=function(){var t=this,e=t._self._c;return e("div",{staticClass:"content"},[e("section",{staticClass:"card"},[t._m(0),e("div",{staticClass:"card-body"},[e("div",{staticClass:"settings"},[e("ul",{staticClass:"tabs"},[t.userInfo.role>=50?e("li",{class:{active:t.activeTab=="settings"},staticStyle:{"margin-left":"0!important"},attrs:{title:"Global settings applied across the application."},on:{click:function(a){t.activeTab="settings"}}},[e("a",{staticClass:"danger",attrs:{href:"javascript:;"}},[t._v("Global Settings")])]):t._e(),t.userInfo.role>=50?e("li",{class:{active:t.activeTab=="delivery"},attrs:{title:"Delivery settings applied across all orders"},on:{click:function(a){t.activeTab="delivery"}}},[e("a",{attrs:{href:"javascript:;"}},[t._v("Delivery Settings ")])]):t._e(),t.userInfo.role>=50?e("li",{class:{active:t.activeTab=="details"},attrs:{title:"THIS IS THE MAIN COMPANY DETAIL. IF YOU MAKE CHANGES HERE IT WILL AFFECT THE SYSTEM I.E. DELIVERY NOTE"},on:{click:function(a){t.activeTab="details"}}},[e("a",{attrs:{href:"javascript:;"}},[t._v("Company Details ")])]):t._e(),t.userInfo.role>=50?e("li",{class:{active:t.activeTab=="import"},attrs:{title:"Manual XML Import"},on:{click:function(a){t.activeTab="import"}}},[e("a",{attrs:{href:"javascript:;"}},[t._v("Manual XML Import")])]):t._e(),e("li",{class:{active:t.activeTab=="application"},attrs:{title:"Local Application Settings"},on:{click:function(a){t.activeTab="application"}}},[e("a",{attrs:{href:"javascript:;"}},[t._v("Local Settings")])]),e("li",{class:{active:t.activeTab=="downloads"},attrs:{title:"Local Application Settings"},on:{click:function(a){t.activeTab="downloads"}}},[e("a",{attrs:{href:"javascript:;"}},[t._v("Documents")])]),t.userInfo.role>=50?e("li",{class:{active:t.activeTab=="devsites"},attrs:{title:"Dev Sites"},on:{click:function(a){t.activeTab="devsites"}}},[e("a",{attrs:{href:"javascript:;"}},[t._v("Dev Sites")])]):t._e()]),t.activeTab=="settings"?e("div",{staticClass:"content pxp-form"},[e("p",{staticClass:"mb-10"},[t._v(" These settings affect how many records are shown per page, how many orders a dispenser can assign to themselves, etc. ")]),t._m(1),e("hr",{staticClass:"mb-10"}),e("div",{staticClass:"form-column"},t._l(t.globalSettings,function(a){var s,n,r,d,l,o;return e("div",{key:a.SettingID,staticClass:"form-group form-group-2"},[e("label",{attrs:{for:a.SettingID}},[t._v(t._s(a.Name))]),((s=t.types[a.Type])==null?void 0:s.type)==="checkbox"?e("input",{directives:[{name:"model",rawName:"v-model",value:t.update[a.SettingID],expression:"update[setting.SettingID]"}],staticClass:"form-control mb-3",attrs:{disabled:!((n=t.types[a.Type])!=null&&n.enabled),name:a.SettingID,placeholder:a.Name,type:"checkbox"},domProps:{checked:Array.isArray(t.update[a.SettingID])?t._i(t.update[a.SettingID],null)>-1:t.update[a.SettingID]},on:{change:function(c){var p=t.update[a.SettingID],m=c.target,f=!!m.checked;if(Array.isArray(p)){var v=null,u=t._i(p,v);m.checked?u<0&&t.$set(t.update,a.SettingID,p.concat([v])):u>-1&&t.$set(t.update,a.SettingID,p.slice(0,u).concat(p.slice(u+1)))}else t.$set(t.update,a.SettingID,f)}}}):((r=t.types[a.Type])==null?void 0:r.type)==="radio"?e("input",{directives:[{name:"model",rawName:"v-model",value:t.update[a.SettingID],expression:"update[setting.SettingID]"}],staticClass:"form-control mb-3",attrs:{disabled:!((d=t.types[a.Type])!=null&&d.enabled),name:a.SettingID,placeholder:a.Name,type:"radio"},domProps:{checked:t._q(t.update[a.SettingID],null)},on:{change:function(c){return t.$set(t.update,a.SettingID,null)}}}):e("input",{directives:[{name:"model",rawName:"v-model",value:t.update[a.SettingID],expression:"update[setting.SettingID]"}],staticClass:"form-control mb-3",attrs:{disabled:!((l=t.types[a.Type])!=null&&l.enabled),name:a.SettingID,placeholder:a.Name,type:(o=t.types[a.Type])==null?void 0:o.type},domProps:{value:t.update[a.SettingID]},on:{input:function(c){c.target.composing||t.$set(t.update,a.SettingID,c.target.value)}}}),t.errors[a.Name]?e("div",{staticClass:"invalid-feedback d-block"},[t._v(t._s(t.errors[a.Name][0]))]):t._e()])}),0),e("div",{staticClass:"form-group form-group-2"},[e("button",{staticClass:"btn btnSize02 secondaryBtn",on:{click:function(a){return t.updateGlobalSettings()}}},[t._v(" Update ")])])]):t._e(),t.activeTab=="delivery"?e("div",{staticClass:"content pxp-form"},[e("p",{staticClass:"mb-10"},[t._v(" These settings affect the API connection with various delivery companies ")]),t._m(2),e("hr",{staticClass:"mb-10"}),t._l(t.deliveryOptions,function(a){return e("div",{key:a.SettingID,staticClass:"form-group form-group-2"},[e("label",{attrs:{for:a.SettingID}},[t._v(t._s(a.Name))]),t.types[a.Type].type==="checkbox"?e("input",{directives:[{name:"model",rawName:"v-model",value:t.update[a.SettingID],expression:"update[setting.SettingID]"}],staticClass:"form-control mb-3",attrs:{name:a.SettingID,placeholder:a.Name,type:"checkbox"},domProps:{checked:Array.isArray(t.update[a.SettingID])?t._i(t.update[a.SettingID],null)>-1:t.update[a.SettingID]},on:{change:function(s){var n=t.update[a.SettingID],r=s.target,d=!!r.checked;if(Array.isArray(n)){var l=null,o=t._i(n,l);r.checked?o<0&&t.$set(t.update,a.SettingID,n.concat([l])):o>-1&&t.$set(t.update,a.SettingID,n.slice(0,o).concat(n.slice(o+1)))}else t.$set(t.update,a.SettingID,d)}}}):t.types[a.Type].type==="radio"?e("input",{directives:[{name:"model",rawName:"v-model",value:t.update[a.SettingID],expression:"update[setting.SettingID]"}],staticClass:"form-control mb-3",attrs:{name:a.SettingID,placeholder:a.Name,type:"radio"},domProps:{checked:t._q(t.update[a.SettingID],null)},on:{change:function(s){return t.$set(t.update,a.SettingID,null)}}}):e("input",{directives:[{name:"model",rawName:"v-model",value:t.update[a.SettingID],expression:"update[setting.SettingID]"}],staticClass:"form-control mb-3",attrs:{name:a.SettingID,placeholder:a.Name,type:t.types[a.Type].type},domProps:{value:t.update[a.SettingID]},on:{input:function(s){s.target.composing||t.$set(t.update,a.SettingID,s.target.value)}}}),t.errors[a.Name]?e("div",{staticClass:"invalid-feedback d-block"},[t._v(t._s(t.errors[a.Name][0])+" ")]):t._e()])}),e("div",{staticClass:"form-group form-group-2"},[e("button",{staticClass:"btn btnSize02 secondaryBtn",on:{click:function(a){return t.updateGlobalSettings()}}},[t._v(" Update ")])])],2):t._e(),t.activeTab=="details"?e("div",{staticClass:"content pxp-form pxp-form-long"},[e("div",{staticClass:"infoBox warning mb-10"},[t._v(" THIS IS THE MAIN COMPANY DETAIL. IF YOU MAKE CHANGES HERE IT WILL AFFECT THE SYSTEM I.E. DELIVERY NOTE ")]),t._l(t.companySettingsUpdate,function(a,s){return t.hiddenFields.includes(s)?t._e():e("div",{key:s,staticClass:"form-group form-group-2",staticStyle:{width:"50%"}},[e("label",{attrs:{for:s}},[t._v(t._s(s))]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.companySettingsUpdate[s],expression:"companySettingsUpdate[key]"}],staticClass:"form-control mb-3",attrs:{name:s,placeholder:s},domProps:{value:t.companySettingsUpdate[s]},on:{input:function(n){n.target.composing||t.$set(t.companySettingsUpdate,s,n.target.value)}}}),t.errors[s]?e("div",{staticClass:"invalid-feedback d-block"},[t._v(t._s(t.errors[s][0]))]):t._e()])}),e("div",{staticClass:"form-group form-group-2"},[e("button",{staticClass:"btn btnSize02 secondaryBtn",on:{click:function(a){return t.updateCompanySettings()}}},[t._v(" Update ")])])],2):t._e(),t.activeTab=="import"?e("div",{staticClass:"content"},[e("div",{staticClass:"infoBox warning"},[t._v(" PLEASE, DOUBLE CHECK THE XML DATA BEFORE IMPORTING! ")]),e("div",{staticClass:"input-container mt-20"},[e("input",{ref:"file",attrs:{type:"file",name:"tracking",id:"file",accept:".xml"},on:{change:t.attachFile}}),e("div",{staticClass:"input-mask",on:{click:t.inputClick}},[e("button",{staticClass:"browse-btn"},[t._v(" "+t._s(t.buttonText)+" ")]),e("span",{staticClass:"file-info"},[t._v(t._s(t.inputText))])])]),t.status!=""?e("section",{staticClass:"text-center infoBox success mt-10",domProps:{innerHTML:t._s(t.status)}}):t._e(),e("section",{staticClass:"text-center"},[e("button",{staticClass:"btn btnSize01 tertiaryBtn bigButton mt-10",attrs:{disabled:t.importing||t.file==""},on:{click:t.upload}},[t.importing?e("div",{staticClass:"loader"},[t._v("Loading...")]):e("span",[t._v("Import")])])])]):t._e(),t.activeTab=="application"?e("div",{staticClass:"content pxp-form"},[e("p",{staticClass:"mb-10"},[t._v(" Make sure the name of the printer is same as reported by system. If not the application will use the systems default printer. ")]),t._m(3),e("hr",{staticClass:"mb-10"}),e("div",{staticClass:"form-column"},[t.printAppOnline?e("div",{staticClass:"form-group form-group-2"},[e("label",{attrs:{for:"labelPrinter"}},[t._v("Label Printer")]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.applicationSettings.labelPrinter,expression:"applicationSettings.labelPrinter"}],attrs:{name:"labelPrinter",id:"labelPrinter",placeholder:"Default system printer"},on:{change:function(a){var s=Array.prototype.filter.call(a.target.options,function(n){return n.selected}).map(function(n){var r="_value"in n?n._value:n.value;return r});t.$set(t.applicationSettings,"labelPrinter",a.target.multiple?s:s[0])}}},[e("option",{attrs:{value:""}},[t._v("Default")]),t._l(t.printAppOnline,function(a,s){return e("option",{key:s,domProps:{value:a}},[t._v(t._s(a)+" ")])})],2)]):e("div",{staticClass:"form-group form-group-2"},[e("label",{attrs:{for:"labelPrinter"}},[t._v("Label Printer")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.applicationSettings.labelPrinter,expression:"applicationSettings.labelPrinter"}],staticClass:"form-control mb-3",attrs:{type:"text",id:"labelPrinter",placeholder:"Default system printer"},domProps:{value:t.applicationSettings.labelPrinter},on:{input:function(a){a.target.composing||t.$set(t.applicationSettings,"labelPrinter",a.target.value)}}})]),t.printAppOnline?e("div",{staticClass:"form-group form-group-2"},[e("label",{attrs:{for:"labelPrinter"}},[t._v("Delivery Note Printer")]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.applicationSettings.deliveryNotePrinter,expression:"applicationSettings.deliveryNotePrinter"}],attrs:{name:"deliveryNotePrinter",id:"deliveryNotePrinter",placeholder:"Default system printer"},on:{change:function(a){var s=Array.prototype.filter.call(a.target.options,function(n){return n.selected}).map(function(n){var r="_value"in n?n._value:n.value;return r});t.$set(t.applicationSettings,"deliveryNotePrinter",a.target.multiple?s:s[0])}}},[e("option",{attrs:{value:""}},[t._v("Default")]),t._l(t.printAppOnline,function(a,s){return e("option",{key:s,domProps:{value:a}},[t._v(t._s(a)+" ")])})],2)]):e("div",{staticClass:"form-group form-group-2"},[e("label",{attrs:{for:"deliveryNotePrinter"}},[t._v("Delivery Note Printer")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.applicationSettings.deliveryNotePrinter,expression:"applicationSettings.deliveryNotePrinter"}],staticClass:"form-control mb-3",attrs:{type:"text",id:"deliveryNotePrinter",placeholder:"Default system printer"},domProps:{value:t.applicationSettings.deliveryNotePrinter},on:{input:function(a){a.target.composing||t.$set(t.applicationSettings,"deliveryNotePrinter",a.target.value)}}})]),e("div",{staticClass:"form-group form-group-2"},[e("button",{staticClass:"btn btnSize02 secondaryBtn",on:{click:function(a){return t.updateApplicationSettings()}}},[t._v(" Update ")])]),t.userInfo.role>=50?e("hr",{staticClass:"mb-10"}):t._e(),t.userInfo.role>=50?e("div",{staticClass:"form-group form-group-2"},[t._m(4)]):t._e()])]):t._e(),t.activeTab=="downloads"?e("div",{staticClass:"content pxp-form"},[e("p",{staticClass:"mb-10"},[t._v(" Below you can download or view any pharmacy related document ")]),e("hr"),e("br"),t._m(5)]):t._e(),t.activeTab=="devsites"?e("div",{staticClass:"content pxp-form"},[e("p",{staticClass:"mb-10"},[t._v(" Below is a list of all active dev sites ")]),e("hr"),e("br"),t._m(6)]):t._e()])])])])},b=[function(){var i=this,t=i._self._c;return t("div",{staticClass:"card-header"},[t("h3",[i._v("Settings")])])},function(){var i=this,t=i._self._c;return t("p",{staticClass:"mb-10"},[t("b",[i._v("These are global settings and affect all users!")])])},function(){var i=this,t=i._self._c;return t("p",{staticClass:"mb-10"},[t("b",[i._v("These are global settings and affect the entire application!")])])},function(){var i=this,t=i._self._c;return t("p",{staticClass:"mb-10"},[t("b",[i._v("These settings only affect the local PC, and any user using the local PC")])])},function(){var i=this,t=i._self._c;return t("a",{attrs:{href:"/download/printer"}},[t("button",{staticClass:"btn btnSize02 secondaryBtn"},[i._v(" Download printer application "),t("small",[i._v("(0.3.0)")])])])},function(){var i=this,t=i._self._c;return t("ul",{staticClass:"list-group"},[t("li",{staticClass:"list-group-item"},[t("p",[i._v("Blank Pathology Form ("),t("a",{attrs:{target:"_blank",href:"/download/form"}},[i._v("download")]),i._v("/"),t("a",{attrs:{target:"_blank",href:"/view/form"}},[i._v("view")]),i._v(")")])])])},function(){var i=this,t=i._self._c;return t("ul",{staticClass:"list-group"},[t("li",{staticClass:"list-group-item"},[t("a",{attrs:{href:"https://old.esasys.co.uk"}},[i._v("old.esasys.co.uk - Old ESA")])]),t("li",{staticClass:"list-group-item"},[t("a",{attrs:{href:"https://dev.esasys.co.uk"}},[i._v("dev.esasys.co.uk - Old ESA Dev")])]),t("li",{staticClass:"list-group-item"},[t("a",{attrs:{href:"https://pharmacist.4sm-dev.xyz/"}},[i._v("pharmacist.4sm-dev.xyz - ESA Dev")])]),t("li",{staticClass:"list-group-item"},[t("a",{attrs:{href:"https://inventory.4sm-dev.xyz"}},[i._v("inventory.4sm-dev.xyz - Inventory Dev")])]),t("li",{staticClass:"list-group-item"},[t("a",{attrs:{href:"https://pxp.4sm-dev.xyz"}},[i._v("pxp.4sm-dev.xyz - PXP Dev")])])])}],S=g(y,_,b,!1,null,null,null,null);const I=S.exports;export{I as default};