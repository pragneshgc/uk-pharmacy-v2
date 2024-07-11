import{_ as k,E as P,W as O,X as U,h as w,o as r,f as E,w as m,b as o,j as f,T as p,s as g,y as I,c as d,d as h,z as x,F as C,r as D,t as u,n as v,u as A,v as b}from"./app-Day-6uLD.js";import B from"./Modal-C4m4T6Vr.js";const V={extends:B,props:["orderID"],mixins:[P,O],components:{DiffTableAddress:U},data(){return{selected:!1,loading:!1,watch:!1,countries:[],companies:[],details:{order:{},oldOrder:{},ups:{},oldUps:{},details:{}},saveConfirmation:!1,confirmationChanges:{},confirmationChangesUPS:{},confirmationOld:{},confirmationOldUPS:{},disabledFields:[]}},mounted(){},computed:{columnDelivery(){return["DAddress1","DAddress2","DAddress3","DAddress4","DPostcode","DCountryCode","DeliveryID"]}},watch:{"details.order.DCountryCode":function(){this.watch&&this.getDeliveryCompany()},"details.order.DeliveryID":function(){this.watch&&this.getPostcodeFormatting()}},methods:{getOrderDetails(t=!1){this.watch=!1,axios.get("/order-edit/"+this.orderID).then(e=>{this.details=e.data.data,t&&(this.details.order.DAddress1="",this.details.order.DAddress2="",this.details.order.DAddress3="",this.details.order.DAddress4="",this.details.order.DPostcode=""),this.loading=!1}).catch(e=>{this.postError(e.response.data.message),this.loading=!1}).finally(()=>{this.watch=!0})},close(){this.saveConfirmation=!1,this.confirmationChanges={},this.confirmationOld={},this.confirmationOld={},this.confirmationOldUPS={},this.details={order:{},oldOrder:{},ups:{},oldUps:{}},this.$emit("closeredelivery")},back(){this.saveConfirmation=!1,this.confirmationChanges={},this.confirmationChangesUPS={}},redelivery(){this.loading=!0,axios.post(`/order/${this.orderID}/redeliver`).then(t=>{this.postSuccess(t.data.message),this.show.modal=!1,this.emitter.emit("orderupdate"),this.close()}).catch(t=>{this.postError(t.response.data.message)}).finally(()=>{this.loading=!1})},selectAddressUpdate(){this.selected=!0,this.getCountries(),this.getCompanies(),this.getOrderDetails(!0)},updateAddress(){},getCountries(){axios.get("/countries").then(t=>{this.countries=t.data.data}).catch(t=>{this.postError(t.response.data.message)})},getCompanies(){axios.get("/delivery-companies").then(t=>{this.companies=t.data.data}).catch(t=>{this.postError(t.response.data.message)})},validateAddress(t=!1){this.loadingValidation=!0,axios.post(`/api/validate-address/${this.currentOrderID}`).then(e=>{this.postSuccess(e.data.message),t&&t()}).catch(e=>{this.postError(e.response.data.message)}).finally(()=>{this.loadingValidation=!1,this.search()})},getCounterColor(t,e){if(e[t]!=null&&this.alias[t].value){if(e[t].length>0&&this.alias[t].combined&&e[this.alias[t].combined]!=null)return e[t].length+e[this.alias[t].combined].length<=this.alias[t].value?"input-count-success":"input-count-danger";if(e[t].length>0&&e[t].length<=this.alias[t].value)return"input-count-success";if(e[t].length>this.alias[t].value)return"input-count-danger"}return""},getDeliveryCompany(){axios.post(`/order-edit/${this.orderID}/delivery-company`,this.details.order).then(t=>{let e=t.data.data;e.DeliveryID&&(this.details.order.DeliveryID=e.DeliveryID),e.CountryCode&&(this.details.order.CountryCode=e.CountryCode),this.getPostcodeFormatting(),this.postSuccess("Delivery company updated")}).catch(t=>{this.postError(t.response.data.message)})},getPostcodeFormatting(){this.details.order.DeliveryID==10&&axios.post(`/order-edit/${this.orderID}/postcode-formatting`,this.details.order).then(t=>{let e=t.data.data;e.Postcode&&(this.details.order.Postcode=e.Postcode),e.DPostcode&&(this.details.order.DPostcode=e.DPostcode)}).catch(t=>{this.postError(t.response.data.message)})},save(t=!1){if(this.saveConfirmation)this.submit(t);else{let e=JSON.parse(JSON.stringify(this.details.order));delete e.ClientID,axios.post(`/order-edit/check/${this.orderID}`,{order:e,ups:this.details.ups}).then(a=>{Object.keys(a.data.data.changes).length>0||Object.keys(a.data.data.changesUPS).length?(this.confirmationChanges=a.data.data.changes,this.confirmationChangesUPS=a.data.data.changesUPS,this.confirmationOld=a.data.data.old,this.confirmationOldUPS=a.data.data.oldUPS,this.saveConfirmation=!0):this.saveConfirmation=!1}).catch(a=>{this.saveConfirmation=!1,this.postError(a)})}},submit(t=!1){let e=JSON.parse(JSON.stringify(this.details.order));delete e.ClientID,this.loading=!0,axios.post(`/api/validate-address/${this.orderID}`,{addressChange:e}).then(a=>{a.data.success?(this.postSuccess("Address Validated"),axios.post("/order-edit/"+this.orderID,{order:e,ups:this.details.ups}).then(y=>{this.postSuccess("Saved"),this.redelivery()}).catch(y=>{this.postError(y)}).finally(()=>{this.saveConfirmation=!1,this.loading=!1})):this.postError("Could not validate address")}).catch(a=>{this.postError(a),this.loading=!1})},isEqual:_.isEqual}},N={class:"esa-modal"},j={class:"modal"},z={class:"loader"},F=o("div",{class:"modal-header"},[o("h3",null,"Redelivery")],-1),q={class:"modal-body"},M={key:0,class:"redelivery-selection",style:{width:"100%","text-align":"center"}},R=o("h3",{style:{"text-align":"center"}},"Please select the method of redelivery",-1),T=o("br",null,null,-1),J={key:1,class:"redelivery-selection",style:{width:"100%","align-self":"flex-start"}},L={class:"form-column",style:{width:"100%"}},X=o("h3",null,"Delivery Details",-1),W=["for"],G=["for"],H=["disabled","name","onUpdate:modelValue"],K=["onUpdate:modelValue"],Q=["value"],Y=["onUpdate:modelValue"],Z=["value"],$={key:0,class:"pxp-form mb-20",style:{height:"auto"}},ee=o("div",{class:"infoBox warning"},[o("p",null,"Please review and confirm all the changes in the order before saving!")],-1),se={class:"modal-footer"},te=["disabled"],ie={key:0},oe={key:1},re=["disabled"],de=o("span",null," Back ",-1),ne=[de],ae=["disabled"];function le(t,e,a,y,s,n){const S=w("DiffTableAddress");return r(),E(p,{name:"fade"},{default:m(()=>[o("div",N,[o("div",{class:"backdrop",onClick:e[0]||(e[0]=l=>n.close())}),o("div",j,[f(p,{name:"fade"},{default:m(()=>[g(o("div",z,"Loading...",512),[[I,s.loading]])]),_:1}),F,o("div",q,[s.selected?h("",!0):(r(),d("div",M,[R,T,o("button",{class:"btn btnSize01 secondaryBtn",onClick:e[1]||(e[1]=l=>n.redelivery())},"Redelivery to Existing Address"),o("button",{class:"btn btnSize01 secondaryBtn",onClick:e[2]||(e[2]=l=>n.selectAddressUpdate())},"Redelivery to New Address")])),s.selected?(r(),d("div",J,[f(p,{name:"fade"},{default:m(()=>[s.countries.length!=0&&s.companies.length!=0&&!s.loading&&Object.keys(s.confirmationChanges).length==0&&Object.keys(s.confirmationChangesUPS).length==0?(r(),d("form",{key:0,onSubmit:e[3]||(e[3]=x((...l)=>n.save&&n.save(...l),["prevent"])),class:"pxp-form address-form mb-20"},[o("div",L,[X,n.columnDelivery.includes(t.value)?(r(!0),d(C,{key:0},D(s.details.order,(l,i)=>(r(),d("div",{class:"form-group form-group-2",key:i},[o("label",{for:l},u(t.alias[i].title),9,W),t.alias[i].value?(r(),d("label",{key:0,class:v([n.getCounterColor(i,s.details.order),"input-count"]),for:l},u(s.details.order[i]?s.details.order[i].length:0)+"/"+u(t.alias[i].value),11,G)):h("",!0),["JVM","UPSAccessPointAddress","CountryCode","DCountryCode","DeliveryID","Notes"].includes(i)?["DCountryCode","CountryCode"].includes(i)?g((r(),d("select",{key:2,"onUpdate:modelValue":c=>s.details.order[i]=c,class:v([s.details.order[i]&&s.details.order[i]!=""?"select-dropdown-active":""])},[(r(!0),d(C,null,D(s.countries,c=>(r(),d("option",{value:c.CountryID},u(c.Name),9,Q))),256))],10,K)),[[b,s.details.order[i]]]):["DeliveryID"].includes(i)?g((r(),d("select",{key:3,"onUpdate:modelValue":c=>s.details.order[i]=c,class:v([s.details.order[i]&&s.details.order[i]!=""?"select-dropdown-active":""])},[(r(!0),d(C,null,D(s.companies,c=>(r(),d("option",{value:c.SettingID},u(c.Name),9,Z))),256))],10,Y)),[[b,s.details.order[i]]]):h("",!0):g((r(),d("input",{key:1,disabled:s.disabledFields.includes(i),class:"",name:l,placeholder:"","onUpdate:modelValue":c=>s.details.order[i]=c},null,8,H)),[[A,s.details.order[i]]])]))),128)):h("",!0)])],32)):h("",!0)]),_:1}),f(p,{name:"fade"},{default:m(()=>[(Object.keys(s.confirmationChanges).length>0||Object.keys(s.confirmationChangesUPS).length>0)&&!s.loading?(r(),d("div",$,[ee,f(S,{"old-object":s.confirmationOld,"new-object":s.confirmationChanges,"old-object-u-p-s":s.confirmationOldUPS,"new-object-u-p-s":s.confirmationChangesUPS,"countries-prop":s.countries,"companies-prop":s.companies},null,8,["old-object","new-object","old-object-u-p-s","new-object-u-p-s","countries-prop","companies-prop"])])):h("",!0)]),_:1})])):h("",!0)]),o("div",se,[!n.isEqual(s.details.order,s.details.oldOrder)||!n.isEqual(s.details.ups,s.details.oldUPS)&&s.selected&&!s.loading?(r(),d("button",{key:0,class:"btn btnSize01 tertiaryBtn bigButton",onClick:e[4]||(e[4]=l=>n.save()),disabled:s.loading},[s.saveConfirmation?(r(),d("span",oe," Save and Redeliver ")):(r(),d("span",ie," Review "))],8,te)):h("",!0),(!n.isEqual(s.details.order,s.details.oldOrder)||!n.isEqual(s.details.ups,s.details.oldUPS))&&s.saveConfirmation?(r(),d("button",{key:1,disabled:s.loading,onClick:e[5]||(e[5]=l=>n.back()),class:"btn btnSize01 tertiaryBtn bigButton"},ne,8,re)):h("",!0),o("button",{disabled:s.loading,onClick:e[6]||(e[6]=l=>n.close()),class:"btn btnSize01 secondaryBtn bigButton"}," Cancel ",8,ae)]),o("span",{class:"close",onClick:e[7]||(e[7]=l=>n.close())},"X")])])]),_:1})}const ue=k(V,[["render",le]]);export{ue as default};
//# sourceMappingURL=RedeliveryModal-Bv2IS1wG.js.map