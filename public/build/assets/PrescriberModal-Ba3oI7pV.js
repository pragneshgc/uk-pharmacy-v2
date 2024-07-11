import w from"./Modal-C4m4T6Vr.js";import{V as D}from"./vue2-editor.esm-90NpmgUV.js";import{_,E as B,h as v,o as a,f as V,w as f,c as l,d as m,b as o,j as b,T as h,s as k,y as C,F as E,r as y,t as F,v as T,e as g}from"./app-Day-6uLD.js";import{D as S}from"./Datepicker-B5Jhtrx6.js";const I={props:["orderID"],mixins:[B],extends:w,components:{VueEditor:D,Datepicker:S},data:function(){return{prescriberForm:{options:[{name:"[REJECT] Too many ordered",value:1,limit:30},{name:"[REJECT] Dosage problem",value:2,limit:30},{name:"[QUERY] Miscellaneous",value:4,limit:30},{name:"[QUERY] Dosage problem",value:5,limit:30},{name:"[QUERY] Potential name discrepancy",value:6,limit:0}],select:0,message:"",date:""},disabledDates:{to:new Date,days:[6,0]},errors:[],loading:!1,backdrop:!0}},watch:{"prescriberForm.select":function(){this.prescriberForm.select!=3&&(this.prescriberForm.date="")},"show.modal":function(){setTimeout(()=>{this.show.modal&&!this.dragEventTriggered&&document.getElementById("draggable-div-prescriber")?(function(s){var c=0,u=0,i=0,d=0;document.getElementById("draggable-div-header-prescriber")?document.getElementById("draggable-div-header-prescriber").onmousedown=n:s.onmousedown=n;function n(r){r=r||window.event,r.preventDefault(),i=r.clientX,d=r.clientY,document.onmouseup=t,document.onmousemove=p}function p(r){r=r||window.event,r.preventDefault(),c=i-r.clientX,u=d-r.clientY,i=r.clientX,d=r.clientY,s.style.top=s.offsetTop-u+"px",s.style.left=s.offsetLeft-c+"px"}function t(){document.onmouseup=null,document.onmousemove=null}}(document.getElementById("draggable-div-prescriber")),this.dragEventTriggered=!0):(this.dragEventTriggered=!1,this.backdrop=!0)},500)}},methods:{submit(){this.loading=!0,axios.post("/mail/"+this.orderID+"/contact",{form:this.prescriberForm}).then(e=>{this.postSuccess(e.data.message),this.emitter.emit("tray.remove",this.orderID),this.resetForm(),this.show.modal=!1}).catch(e=>{this.errors.push(e.response.data.message),this.postError(e.response.data.message)}).finally(()=>{this.loading=!1})},toggleBackdrop(){this.backdrop=!this.backdrop},resetForm(){this.prescriberForm.select=0,this.prescriberForm.message="",this.prescriberForm.date="",this.errors=[]}}},M={key:0,class:"esa-modal"},U={class:"modal",id:"draggable-div-prescriber"},$={class:"loader"},Y=o("div",{class:"modal-header draggable-div-header",id:"draggable-div-header-prescriber"},[o("h3",null,"Send Message")],-1),N={class:"modal-body"},R=o("label",{for:"message-select"},[g("Email template "),o("small",{class:"danger"},"(required)")],-1),q=o("option",{value:"0",disabled:""},"Please select a template",-1),L=["value"],P={key:0,class:"mb-10"},Q=o("label",{for:"message-date"},[g("New date "),o("small",{class:"danger"},"(required)")],-1),X=o("label",{for:"message-text"},[g("Message "),o("small",{class:"danger"},"(required)")],-1),z={key:1,class:"infoBox error"},J={class:"modal-footer"},j=["disabled"],A=["disabled"],G=o("i",{class:"fa fa-clone"},null,-1),H=[G],K=o("i",{class:"fa fa-close"},null,-1),O=[K];function W(e,s,c,u,i,d){const n=v("datepicker"),p=v("vue-editor");return a(),V(h,{name:"fade"},{default:f(()=>[e.show.modal?(a(),l("div",M,[e.backdrop?(a(),l("div",{key:0,class:"backdrop",onClick:s[0]||(s[0]=t=>e.close())})):m("",!0),o("div",U,[b(h,{name:"fade"},{default:f(()=>[k(o("div",$,"Loading...",512),[[C,e.loading]])]),_:1}),Y,o("div",N,[o("form",{onSubmit:s[4]||(s[4]=t=>d.submit())},[R,k(o("select",{"onUpdate:modelValue":s[1]||(s[1]=t=>e.prescriberForm.select=t),name:"message-select",class:"table-dropdown mb-10"},[q,(a(!0),l(E,null,y(e.prescriberForm.options,t=>(a(),l("option",{value:t.value,key:t.value},F(t.name),9,L))),128))],512),[[T,e.prescriberForm.select]]),e.prescriberForm.select==3?(a(),l("div",P,[Q,b(n,{name:"return-date",modelValue:e.prescriberForm.date,"onUpdate:modelValue":s[2]||(s[2]=t=>e.prescriberForm.date=t),"disabled-dates":e.disabledDates,maxlength:"30"},null,8,["modelValue","disabled-dates"])])):m("",!0),X,b(p,{modelValue:e.prescriberForm.message,"onUpdate:modelValue":s[3]||(s[3]=t=>e.prescriberForm.message=t)},null,8,["modelValue"]),e.errors.length>0?(a(),l("div",z,[(a(!0),l(E,null,y(e.errors,(t,r)=>(a(),l("p",{key:r},F(t),1))),128))])):m("",!0)],32)]),o("div",J,[o("button",{disabled:e.loading,onClick:s[5]||(s[5]=t=>e.close()),class:"btn btnSize01 secondaryBtn bigButton"}," Cancel ",8,j),o("button",{disabled:e.loading,onClick:s[6]||(s[6]=t=>d.submit()),class:"btn btnSize01 primaryBtn"}," Submit ",8,A)]),o("span",{class:"backdrop-toggle",onClick:s[7]||(s[7]=t=>d.toggleBackdrop()),title:"Unfocus the modal"},H),o("span",{class:"close",onClick:s[8]||(s[8]=t=>e.close()),title:"Close the modal"},O)])])):m("",!0)]),_:1})}const oe=_(I,[["render",W]]);export{oe as default};
//# sourceMappingURL=PrescriberModal-Ba3oI7pV.js.map