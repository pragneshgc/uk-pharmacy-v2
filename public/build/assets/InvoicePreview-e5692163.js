import{n as r,E as c,_ as l}from"./app-a3e6dddd.js";const m={mixins:[c],components:{Modal:()=>l(()=>import("./Modal-76bda924.js"),["assets/Modal-76bda924.js","assets/app-a3e6dddd.js","assets/app-7eda0943.css"])},data(){return{statuses:{0:"INCOMPLETE",1:"UNPAID",2:"PAID",3:"CREDITNOTE",4:"DELETED"},item:!1,invoice:{},invoiceItems:[],userInfo}},mounted(){this.getInvoice()},methods:{addItem(){this.item={UnitCost:"",VAT:1,Description:"",ReferenceNumber:"",PrescriptionID:0,Type:3},this.$root.$emit("modal.open","additem")},saveItem(){axios.post(`/invoice/${this.$route.params.id}/item`,this.item).then(s=>{this.item=!1,this.getInvoice(),this.postSuccess(s.data.message),this.$root.$emit("modal.close","additem")}).catch(s=>{this.postError(s.response.data.message)})},getInvoice(){axios.get(`/invoice/${this.$route.params.id}`).then(s=>{this.invoice=s.data.data.invoice,this.invoiceItems=s.data.data.invoiceItems}).catch(s=>{console.log(s)})},downloadInvoice(){window.open(`/invoice/${this.$route.params.id}/preview?token=${this.userInfo.token}`,"_blank")},updateInvoiceStatus(s,t=!1){axios.post(`/invoice/${this.$route.params.id}/status`,{status:s,date:t}).then(e=>{this.getInvoice(),this.postSuccess(e.data.message)}).catch(e=>{this.postError(e.response.data.message)})},emailInvoice(){axios.post(`/invoice/${this.$route.params.id}/email?token=${this.userInfo.token}`).then(s=>{this.postSuccess(s.data.message)}).catch(s=>{this.postError(s.response.data.message)})}}};var v=function(){var t=this,e=t._self._c;return e("div",{staticClass:"content"},[e("Modal",{staticClass:"duplicate-modal",attrs:{"modal-name":"additem"},scopedSlots:t._u([{key:"header",fn:function(){return[e("h2",[t._v("Add Item")])]},proxy:!0},{key:"body",fn:function(){return[e("div",{staticClass:"pxp-form wow fadeIn",staticStyle:{height:"auto!important"}},[e("div",{staticClass:"form-row"},[e("h3",{staticClass:"m-10"},[t._v("Information")])]),e("div",{staticClass:"form-column"},[e("div",{staticClass:"form-group form-group-2"},[e("label",{attrs:{for:"Description"}},[t._v("Description")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.item.Description,expression:"item.Description"}],staticClass:"form-control",attrs:{name:"Description",autocomplete:"off",type:"text",placeholder:"Description"},domProps:{value:t.item.Description},on:{input:function(i){i.target.composing||t.$set(t.item,"Description",i.target.value)}}})])]),e("div",{staticClass:"form-column"},[e("div",{staticClass:"form-group form-group-2"},[e("label",{attrs:{for:"PrescriptionID"}},[t._v("PrescriptionID")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.item.PrescriptionID,expression:"item.PrescriptionID"}],staticClass:"form-control",attrs:{name:"PrescriptionID",autocomplete:"off",type:"text",placeholder:"PrescriptionID"},domProps:{value:t.item.PrescriptionID},on:{input:function(i){i.target.composing||t.$set(t.item,"PrescriptionID",i.target.value)}}})])]),e("div",{staticClass:"form-column"},[e("div",{staticClass:"form-group form-group-2"},[e("label",{attrs:{for:"ReferenceNumber"}},[t._v("Customer Reference")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.item.ReferenceNumber,expression:"item.ReferenceNumber"}],staticClass:"form-control",attrs:{name:"ReferenceNumber",autocomplete:"off",type:"text",placeholder:"ReferenceNumber"},domProps:{value:t.item.ReferenceNumber},on:{input:function(i){i.target.composing||t.$set(t.item,"ReferenceNumber",i.target.value)}}})])]),e("div",{staticClass:"form-row"},[e("h3",{staticClass:"m-10"},[t._v("Price")])]),e("div",{staticClass:"form-column"},[e("div",{staticClass:"form-group form-group-2"},[e("label",{attrs:{for:"UnitCost"}},[t._v("Price")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.item.UnitCost,expression:"item.UnitCost"}],staticClass:"form-control",attrs:{name:"UnitCost",autocomplete:"off",type:"text",placeholder:"UnitCost"},domProps:{value:t.item.UnitCost},on:{input:function(i){i.target.composing||t.$set(t.item,"UnitCost",i.target.value)}}})])]),e("div",{staticClass:"form-column"},[e("div",{staticClass:"form-group form-group-2"},[e("label",{attrs:{for:"VAT"}},[t._v("VAT")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.item.VAT,expression:"item.VAT"}],staticClass:"form-control",attrs:{name:"VAT",autocomplete:"off",type:"text",placeholder:"VAT"},domProps:{value:t.item.VAT},on:{input:function(i){i.target.composing||t.$set(t.item,"VAT",i.target.value)}}})])]),e("div",{staticClass:"form-column"},[e("div",{staticClass:"form-group form-group-2"},[e("label",{attrs:{for:"Type"}},[t._v("Type")]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.item.Type,expression:"item.Type"}],staticClass:"browser-default custom-select",attrs:{name:"Type"},on:{change:function(i){var a=Array.prototype.filter.call(i.target.options,function(o){return o.selected}).map(function(o){var n="_value"in o?o._value:o.value;return n});t.$set(t.item,"Type",i.target.multiple?a:a[0])}}},[e("option",{domProps:{value:3}},[t._v("Credit/Refund")]),e("option",{domProps:{value:4}},[t._v("Misc Charge")])])])])])]},proxy:!0},{key:"footer",fn:function(){return[e("button",{staticClass:"btn btnSize01 tertiaryBtn",on:{click:function(i){return t.saveItem()}}},[t._v("Save Item")])]},proxy:!0}])}),e("section",{staticClass:"card"},[e("div",{staticClass:"card-header"},[e("h3",[t._v("Invoice #"+t._s(t.invoice.InvoiceID)+" Details")])]),e("div",{staticClass:"card-body",staticStyle:{display:"flex","flex-direction":"raw","justify-content":"space-between"}},[e("div",{staticClass:"invoice-details"},[e("span",[t._v(t._s(t.invoice.Client)+" invoice # "+t._s(t.invoice.InvoiceID))]),e("br"),e("span",[t._v("DATE COVERED: "+t._s(t.invoice["Created Date"])+" - "+t._s(t.invoice["Created Date"]))]),e("br"),e("span",[t._v("DATE COMPLETED: "+t._s(t.invoice["Created Date"]))]),e("br"),e("span",[t._v("DATE PAID: "+t._s(t.invoice["Paid Date"]))]),e("br"),e("span",[t._v("GROSS AMOUNT : £"+t._s(t.invoice.GrossAmount))]),e("br"),e("span",[t._v("VAT : £"+t._s(t.invoice.VAT))]),e("br"),e("span",[t._v("NET AMOUNT : £"+t._s(t.invoice.NetAmount))]),e("br"),e("span",[t._v("AMOUNT RECEIVED : £"+t._s(t.invoice.AmountReceived))]),e("br"),e("span",[t._v("STATUS : "+t._s(t.statuses[t.invoice.Status]))]),e("br")]),e("div",{staticClass:"invoice-options"},[t.invoice.Status!=0?e("button",{staticClass:"btn btnSize02 secondaryBtn",attrs:{title:"Email Invoice"},on:{click:function(i){return t.emailInvoice()}}},[t._v("Email Invoice")]):t._e(),e("button",{staticClass:"btn btnSize02 secondaryBtn",attrs:{title:"Add Item"},on:{click:function(i){return t.addItem()}}},[t._v("Add Item")]),t.invoice.Status==0?e("button",{staticClass:"btn btnSize02 secondaryBtn",attrs:{title:"Set Invoice as Complete"},on:{click:function(i){return t.updateInvoiceStatus(1)}}},[t._v("Set Invoice as Complete")]):t._e(),t.invoice.Status==1?e("button",{staticClass:"btn btnSize02 secondaryBtn",attrs:{title:"Set Invoice As Paid"},on:{click:function(i){return t.updateInvoiceStatus(2)}}},[t._v("Set Invoice As Paid")]):t._e(),e("button",{staticClass:"btn btnSize02 secondaryBtn",attrs:{title:"View PDF"},on:{click:function(i){return t.downloadInvoice()}}},[t._v("View Invoice")])])]),e("div",{staticClass:"card-body",staticStyle:{padding:"0px"}},[e("table",[t._m(0),e("tbody",[t._l(t.invoiceItems,function(i){return[e("tr",[e("td",[t._v(t._s(i.ReferenceNumber))]),e("td",[t._v(t._s(i.ItemID))]),e("td",[t._v(t._s(i.Date))]),e("td",[t._v(t._s(i.DoctorID))]),e("td",[t._v(t._s(i.Description))]),e("td",[t._v(t._s(i.Quantity))]),e("td",[t._v("£"+t._s(i.UnitCost))]),e("td",[t._v("£"+t._s(i.VAT))]),e("td",[t._v("£"+t._s(i.VAT+i.UnitCost))])])]})],2)])])])],1)},u=[function(){var s=this,t=s._self._c;return t("thead",[t("tr",[t("th",[s._v("Customer Reference")]),t("th",[s._v("Our Reference")]),t("th",[s._v("Date")]),t("th",[s._v("Prescriber")]),t("th",[s._v("Description")]),t("th",[s._v("Quantity")]),t("th",[s._v("Price")]),t("th",[s._v("VAT")]),t("th",[s._v("Total")])])])}],d=r(m,v,u,!1,null,null,null,null);const f=d.exports;export{f as default};
