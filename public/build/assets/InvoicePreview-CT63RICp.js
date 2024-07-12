const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Modal-CwO9xAd8.js","assets/app-CzB2aCin.js","assets/app-DWMI0VDG.css"])))=>i.map(i=>d[i]);
import{_,E as h,l as f,e as I,o as r,c,m as b,j as m,a as e,t as n,b as p,F as D,f as T,w as a,B as u,A as y}from"./app-CzB2aCin.js";const A={mixins:[h],components:{Modal:()=>f(()=>import("./Modal-CwO9xAd8.js"),__vite__mapDeps([0,1,2]))},data(){return{statuses:{0:"INCOMPLETE",1:"UNPAID",2:"PAID",3:"CREDITNOTE",4:"DELETED"},item:!1,invoice:{},invoiceItems:[],userInfo}},mounted(){this.getInvoice()},methods:{addItem(){this.item={UnitCost:"",VAT:1,Description:"",ReferenceNumber:"",PrescriptionID:0,Type:3},this.emitter.emit("modal.open","additem")},saveItem(){axios.post(`/invoice/${this.$route.params.id}/item`,this.item).then(i=>{this.item=!1,this.getInvoice(),this.postSuccess(i.data.message),this.emitter.emit("modal.close","additem")}).catch(i=>{this.postError(i.response.data.message)})},getInvoice(){axios.get(`/invoice/${this.$route.params.id}`).then(i=>{this.invoice=i.data.data.invoice,this.invoiceItems=i.data.data.invoiceItems}).catch(i=>{console.log(i)})},downloadInvoice(){window.open(`/invoice/${this.$route.params.id}/preview?token=${this.userInfo.token}`,"_blank")},updateInvoiceStatus(i,s=!1){axios.post(`/invoice/${this.$route.params.id}/status`,{status:i,date:s}).then(d=>{this.getInvoice(),this.postSuccess(d.data.message)}).catch(d=>{this.postError(d.response.data.message)})},emailInvoice(){axios.post(`/invoice/${this.$route.params.id}/email?token=${this.userInfo.token}`).then(i=>{this.postSuccess(i.data.message)}).catch(i=>{this.postError(i.response.data.message)})}}},C={class:"content"},g=e("h2",null,"Add Item",-1),E={class:"pxp-form wow fadeIn",style:{height:"auto!important"}},S=e("div",{class:"form-row"},[e("h3",{class:"m-10"},"Information")],-1),V={class:"form-column"},P={class:"form-group form-group-2"},x=e("label",{for:"Description"},"Description",-1),U={class:"form-column"},w={class:"form-group form-group-2"},N=e("label",{for:"PrescriptionID"},"PrescriptionID",-1),k={class:"form-column"},R={class:"form-group form-group-2"},M=e("label",{for:"ReferenceNumber"},"Customer Reference",-1),B=e("div",{class:"form-row"},[e("h3",{class:"m-10"},"Price")],-1),O={class:"form-column"},z={class:"form-group form-group-2"},L=e("label",{for:"UnitCost"},"Price",-1),F={class:"form-column"},j={class:"form-group form-group-2"},G=e("label",{for:"VAT"},"VAT",-1),Q={class:"form-column"},q={class:"form-group form-group-2"},H=e("label",{for:"Type"},"Type",-1),J=e("option",{value:3},"Credit/Refund",-1),K=e("option",{value:4},"Misc Charge",-1),W=[J,K],X={class:"card"},Y={class:"card-header"},Z={class:"card-body",style:{display:"flex","flex-direction":"raw","justify-content":"space-between"}},$={class:"invoice-details"},ee=e("br",null,null,-1),te=e("br",null,null,-1),oe=e("br",null,null,-1),se=e("br",null,null,-1),ne=e("br",null,null,-1),ie=e("br",null,null,-1),le=e("br",null,null,-1),re=e("br",null,null,-1),ce=e("br",null,null,-1),ae={class:"invoice-options"},ue={class:"card-body",style:{padding:"0px"}},de=e("thead",null,[e("tr",null,[e("th",null,"Customer Reference"),e("th",null,"Our Reference"),e("th",null,"Date"),e("th",null,"Prescriber"),e("th",null,"Description"),e("th",null,"Quantity"),e("th",null,"Price"),e("th",null,"VAT"),e("th",null,"Total")])],-1);function me(i,s,d,pe,t,l){const v=I("Modal");return r(),c("div",C,[b(v,{class:"duplicate-modal","modal-name":"additem"},{header:m(()=>[g]),body:m(()=>[e("div",E,[S,e("div",V,[e("div",P,[x,a(e("input",{name:"Description","onUpdate:modelValue":s[0]||(s[0]=o=>t.item.Description=o),autocomplete:"off",type:"text",placeholder:"Description",class:"form-control"},null,512),[[u,t.item.Description]])])]),e("div",U,[e("div",w,[N,a(e("input",{name:"PrescriptionID","onUpdate:modelValue":s[1]||(s[1]=o=>t.item.PrescriptionID=o),autocomplete:"off",type:"text",placeholder:"PrescriptionID",class:"form-control"},null,512),[[u,t.item.PrescriptionID]])])]),e("div",k,[e("div",R,[M,a(e("input",{name:"ReferenceNumber","onUpdate:modelValue":s[2]||(s[2]=o=>t.item.ReferenceNumber=o),autocomplete:"off",type:"text",placeholder:"ReferenceNumber",class:"form-control"},null,512),[[u,t.item.ReferenceNumber]])])]),B,e("div",O,[e("div",z,[L,a(e("input",{name:"UnitCost","onUpdate:modelValue":s[3]||(s[3]=o=>t.item.UnitCost=o),autocomplete:"off",type:"text",placeholder:"UnitCost",class:"form-control"},null,512),[[u,t.item.UnitCost]])])]),e("div",F,[e("div",j,[G,a(e("input",{name:"VAT","onUpdate:modelValue":s[4]||(s[4]=o=>t.item.VAT=o),autocomplete:"off",type:"text",placeholder:"VAT",class:"form-control"},null,512),[[u,t.item.VAT]])])]),e("div",Q,[e("div",q,[H,a(e("select",{class:"browser-default custom-select","onUpdate:modelValue":s[5]||(s[5]=o=>t.item.Type=o),name:"Type"},W,512),[[y,t.item.Type]])])])])]),footer:m(()=>[e("button",{class:"btn btnSize01 tertiaryBtn",onClick:s[6]||(s[6]=o=>l.saveItem())},"Save Item")]),_:1}),e("section",X,[e("div",Y,[e("h3",null,"Invoice #"+n(t.invoice.InvoiceID)+" Details",1)]),e("div",Z,[e("div",$,[e("span",null,n(t.invoice.Client)+" invoice # "+n(t.invoice.InvoiceID),1),ee,e("span",null,"DATE COVERED: "+n(t.invoice["Created Date"])+" - "+n(t.invoice["Created Date"]),1),te,e("span",null,"DATE COMPLETED: "+n(t.invoice["Created Date"]),1),oe,e("span",null,"DATE PAID: "+n(t.invoice["Paid Date"]),1),se,e("span",null,"GROSS AMOUNT : £"+n(t.invoice.GrossAmount),1),ne,e("span",null,"VAT : £"+n(t.invoice.VAT),1),ie,e("span",null,"NET AMOUNT : £"+n(t.invoice.NetAmount),1),le,e("span",null,"AMOUNT RECEIVED : £"+n(t.invoice.AmountReceived),1),re,e("span",null,"STATUS : "+n(t.statuses[t.invoice.Status]),1),ce]),e("div",ae,[t.invoice.Status!=0?(r(),c("button",{key:0,onClick:s[7]||(s[7]=o=>l.emailInvoice()),title:"Email Invoice",class:"btn btnSize02 secondaryBtn"},"Email Invoice")):p("",!0),e("button",{onClick:s[8]||(s[8]=o=>l.addItem()),title:"Add Item",class:"btn btnSize02 secondaryBtn"},"Add Item"),t.invoice.Status==0?(r(),c("button",{key:1,onClick:s[9]||(s[9]=o=>l.updateInvoiceStatus(1)),title:"Set Invoice as Complete",class:"btn btnSize02 secondaryBtn"},"Set Invoice as Complete")):p("",!0),t.invoice.Status==1?(r(),c("button",{key:2,onClick:s[10]||(s[10]=o=>l.updateInvoiceStatus(2)),title:"Set Invoice As Paid",class:"btn btnSize02 secondaryBtn"},"Set Invoice As Paid")):p("",!0),e("button",{onClick:s[11]||(s[11]=o=>l.downloadInvoice()),title:"View PDF",class:"btn btnSize02 secondaryBtn"},"View Invoice")])]),e("div",ue,[e("table",null,[de,e("tbody",null,[(r(!0),c(D,null,T(t.invoiceItems,o=>(r(),c("tr",{key:o.ItemID},[e("td",null,n(o.ReferenceNumber),1),e("td",null,n(o.ItemID),1),e("td",null,n(o.Date),1),e("td",null,n(o.DoctorID),1),e("td",null,n(o.Description),1),e("td",null,n(o.Quantity),1),e("td",null,"£"+n(o.UnitCost),1),e("td",null,"£"+n(o.VAT),1),e("td",null,"£"+n(o.VAT+o.UnitCost),1)]))),128))])])])])])}const _e=_(A,[["render",me]]);export{_e as default};
//# sourceMappingURL=InvoicePreview-CT63RICp.js.map