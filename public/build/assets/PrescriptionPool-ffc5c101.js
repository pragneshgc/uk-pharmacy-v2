import{n as d,o as h,E as p,P as u,_ as c}from"./app-a3e6dddd.js";const f={mixins:[h,p,u],components:{Notes:()=>c(()=>import("./NotesPopup-44d7f3dc.js"),["assets/NotesPopup-44d7f3dc.js","assets/app-a3e6dddd.js","assets/app-7eda0943.css"]),Modal:()=>c(()=>import("./Modal-76bda924.js"),["assets/Modal-76bda924.js","assets/app-a3e6dddd.js","assets/app-7eda0943.css"])},data(){return{loading:!1,locked:!1,printing:!1,lockTimer:null,historyLoading:!1,notesLoading:!1,notesAlert:!1,duplicate:!1,notesConfirmed:!1,expandHistory:!1,orders:[],notes:[],selected:null,history:[],user:{info:userInfo,selected:userInfo.id,list:[]}}},computed:{trayIds(){return this.$store.state.tray.map(s=>s.PrescriptionID)},filteredHistory(){return this.expandHistory?this.history:this.history.slice(0,3)},totalNotesCount(){return this.notes.length==0?0:this.notes.critical.length+this.notes.information.length+this.notes.other.length},printable(){let s=!1,t=!1;return this.selected.Products.forEach(i=>{i.CorrectName||(s=!0),i.CorrectUnit||(t=!0)}),this.totalNotesCount==0&&!this.duplicate&&!s&&!t?!0:!!this.notesConfirmed}},mounted(){this.getOrders(),this.$root.$on("prescriptionpool.getnotes",this.getNotes),this.$root.$on("orderupdate",this.getNotes),this.$root.$on("alertupdate",this.getNotes),this.$root.$on("prescriptionpool.reprint",this.reprint),this.lockTimer=setInterval(()=>{this.checkLock()},5e3)},destroyed(){this.$root.$off("prescriptionpool.getnotes",this.getNotes),this.$root.$off("orderupdate",this.getNotes),this.$root.$off("alertupdate",this.getNotes),this.$root.$off("prescriptionpool.reprint",this.reprint),clearInterval(this.lockTimer)},watch:{trayIds(s,t){this.getOrders(),t.length==0&&s.length>0&&this.$store.commit("clearLogs")},selected(){this.getHistory(),this.getNotes()},locked(){this.locked||this.getOrders(()=>{let s=JSON.parse(JSON.stringify(this.selected));this.selected=null,this.selectOrder(s),this.takeOverOrder(this.selected.PrescriptionID)})}},methods:{selectOrder(s){this.selected=s,this.selected.Products.forEach(t=>{t.Name!=t.Description?this.alternativeNameCheck(t,this.selected.ClientID,e=>{t.CorrectName=e}):t.CorrectName=!0,t.Unit!=t.product_units?this.alternativeUnitCheck(t,this.selected.ClientID,e=>{t.CorrectUnit=e}):t.CorrectUnit=!0}),this.checkLock(()=>{this.locked||this.takeOverOrder(this.selected.PrescriptionID),this.$root.$emit("prescriptionloaded",{prescription:s})}),this.checkOrderStatuses(this.selected.PrescriptionID)},getOrders(s=!1){this.loading=!0,axios.post("/prescription-pool/quick-tray",{ids:this.trayIds}).then(t=>{this.orders=t.data.data,this.orders.length>0&&!s?this.selectOrder(this.orders[0]):s&&s()}).catch(t=>{console.log(t)}).finally(()=>{this.loading=!1})},checkOrderStatuses(s){axios.get(`/order/${s}/statuses`).then(t=>{this.duplicate=t.data.data.duplicate}).catch(t=>{this.postError(t.response.data.message)})},getHistory(){this.historyLoading=!0,axios.get(`/order/${this.selected.PrescriptionID}/history`).then(s=>{this.expandHistory=!1,this.history=s.data.data}).catch(s=>{this.postError(s.response.data.message)}).finally(()=>{this.historyLoading=!1})},getNotes(){this.notesLoading=!0,this.notesConfirmed=!1,axios.get(`/order/${this.selected.PrescriptionID}/notes`).then(s=>{if(this.notes=s.data.data,this.notes.alerts.length>0){let t=`
                    <div class="medicineDetails" style="width: 100%;">
                    <p>Please review the notes below:</p>
                    <ul class="other">`,e=0,i=0;this.notes.alerts.sort((r,a)=>r.Type>a.Type?1:-1),this.notes.alerts.forEach(r=>{r.DeletedAt==null&&r.EditedAt==null&&(e++,r.Type!=i&&(i=r.Type,t+=`<li class="note-header ${i==1?"note-header__danger":""}"><div>${i==1?"Patient Notes":"Order Notes"}</div></li>`),t+=`
                            <li class="note"
                            title="${r.Type==2?"Queried Alert":r.Type==1?"Patient Alert":"Order Alert"} created by ${r.name} ${r.surname}"
                            style="${r.Type==2?"border-left: 5px solid #32a36a;":r.Type==1?"border-left: 5px solid #ff5151;":""}">
                            <div class="note-body" style="text-align: initial;">
                            <p>${r.Note}</p>
                            </div>
                            <div class="note-footer">
                            <span>${r.name+" "+r.surname}</span>
                            <span>${r.CreatedAt}</span>
                            </div>
                            </li>`)}),t+="</ul></div>",e>0?this.notesAlert=t:this.notesAlert=!1}else this.notesAlert=!1}).catch(s=>{this.postError(s.response.data.message)}).finally(()=>{this.notesLoading=!1})},tryPrint(){this.printable?(this.printing=!0,this.dispenserPrint("delivery",!1,()=>{this.dispenserPrint("label",!1,()=>{this.selected.time=Date.now(),this.selected.action="Printed",this.$store.commit("addLog",this.selected),this.$root.$emit("tray.changeprescriptionstatus",{id:this.selected.PrescriptionID,status:7}),this.printing=!1})})):this.openNotes()},reprint(s){this.dispenserPrint("delivery",s),this.dispenserPrint("label",s);let t={PrescriptionID:s,action:"Reprinted",time:Date.now()};this.$store.commit("addLog",t)},dispenserPrint(s,t=!1,e=!1){t||(t=this.selected.PrescriptionID),s=="delivery"?axios.get(`/order/${t}/view`).then(i=>{let r=i.data.data.url,a=i.data.data.type,n=!1;if(localStorage.getItem("settings.application")&&(n=JSON.parse(localStorage.getItem("settings.application")).deliveryNotePrinter),a=="pdf")this.printUrl(`${r}?token=${this.user.info.token}&print=true`,()=>{this.$root.$emit("orderupdate"),e&&e()},"pdf",n);else{let o=`https://esasys.co.uk/?showFile&PRESCRIPTIONID=${t}`;this.printUrl(o,()=>{axios.get(`/prescription/${t}/log-print?token=${this.user.info.token}`).then(l=>{this.$root.$emit("orderupdate"),e&&e()}).catch(l=>{console.log(l),this.postError(l.response.data.message)})},"pdf",n)}}).catch(i=>{this.postError(i.response.data.message)}):s=="label"&&axios.get(`/order/${t}/label`).then(i=>{let r=i.data.data.url,a=!1;localStorage.getItem("settings.application")&&(a=JSON.parse(localStorage.getItem("settings.application")).labelPrinter),this.printUrl(`${r}?token=${this.user.info.token}&print=true`,()=>{this.$root.$emit("orderupdate"),e&&e()},"pdf",a,!0)}).catch(i=>{console.log(i),this.postError(i.response.data.message)})},openNotes(){this.$root.$emit("modal.open","quicktraynotes")},confirmNotes(){this.notesConfirmed=!0,this.$root.$emit("modal.close","quicktraynotes")},showNotesAlert(){this.$swal({title:"Important notes!",html:this.notesAlert,type:"warning",showCancelButton:!1,allowEscapeKey:!1,allowOutsideClick:!1,focusConfirm:!1,confirmButtonColor:"#3085d6",confirmButtonText:"I've read these notes!"}).then(s=>{s.value&&(this.notesAlert=!1)})},statusClass(s){return[1,7].includes(s)?"active":[2,8].includes(s)?"success":[4,5,9,10,11,12,13,14,15].includes(s)?"warning":[16].includes(s)?"returned":[3,6].includes(s)?"error":""},checkLock(s=!1){this.selected&&axios.get(`/logs/locked/${this.selected.PrescriptionID}`).then(t=>{t.data.data?this.locked=t.data.data.Name+" "+t.data.data.Surname:this.locked=!1}).catch(t=>{console.log(t),this.locked=!1}).finally(()=>{s&&s()})},unlockOrder(s){axios.post(`logs/unlock/${s}`).then(t=>{this.locked=!1}).catch(t=>{console.log(t),this.locked=!1})},takeOverOrder(s){axios.post(`logs/takeover/${s}`).then(t=>{this.locked=!1}).catch(t=>{console.log(t),this.locked=!1})},alternativeNameCheck(s,t,e){axios.get(`/inventory/products/alternative-name?code=${s.ProductCodeID}&name=${encodeURI(s.Description)}&client=${t}`).then(i=>{e(i.data.data)}).catch(i=>{this.postError(i.response.data.message)})},alternativeUnitCheck(s,t,e){axios.get(`/inventory/products/alternative-unit?code=${s.ProductCodeID}&unit=${encodeURI(s.Unit)}&client=${t}`).then(i=>{e(i.data.data)}).catch(i=>{this.postError(i.response.data.message)})},discrepancyResolution(s,t=!1){s?(this.loading=!0,axios.post("/inventory/products/approve-discrepancy",{ProductCodeID:t.ProductCodeID,ClientID:this.prescription.ClientID,UserID:this.userInfo.id,AlternativeName:t.Description}).then(e=>{this.postSuccess("Alternative name approved"),this.loading=!1,this.search()}).catch(e=>{this.loading=!1,this.postError(e.response.data.message)})):(this.prescriptionStatus=91,this.updateStatus())},redirect(s){this.$router.push({name:"prescription",params:{id:s}})}}};var _=function(){var t=this,e=t._self._c;return e("transition",{attrs:{name:"fade"}},[t.orders.length>0?e("section",{staticClass:"card quick-tray"},[e("Modal",{staticClass:"duplicate-modal",attrs:{"modal-name":"quicktraynotes"},scopedSlots:t._u([{key:"header",fn:function(){return[e("h2",[t._v("Notes and Alerts")])]},proxy:!0},{key:"body",fn:function(){return[e("div",{staticStyle:{width:"100%",height:"100%",display:"flex","flex-direction":"column"}},[e("div",[e("ul",{staticStyle:{margin:"5px"}},[t.duplicate?e("li",{staticClass:"infoBox warning thin-error",staticStyle:{background:"#f53c38","font-size":"20px",padding:"5px",width:"100%"}},[t._v(" There is a possible duplicate order with ID "),e("a",{staticStyle:{color:"#A9E2F3"},attrs:{target:"_blank",href:`#/prescription/${t.duplicate.PrescriptionID}`}},[t._v(" "+t._s(t.duplicate.PrescriptionID)+" ")]),t._v(" that has the same customer reference id "+t._s(t.duplicate.ReferenceID)+" with status "+t._s(t.orderStatuses[t.duplicate.Status])+t._s(t.duplicate.SubStatus?" - "+t.orderSubStatuses[t.duplicate.SubStatus]:"")+". Please investigate by clicking "),e("a",{staticStyle:{color:"#A9E2F3"},attrs:{target:"_blank",href:`#/prescription/${t.duplicate.PrescriptionID}`}},[t._v(" here ")]),t._v(" before processing. ")]):t._e(),t._l(t.selected.Products,function(i,r){return!i.CorrectName||!i.CorrectUnit?e("li",{key:r,staticClass:"infoBox warning thin-error",staticStyle:{background:"#f53c38","font-size":"20px",padding:"5px",width:"100%","margin-top":"5px"}},[e("span",[t._v(" The product name recieved by "+t._s(t.selected.CompanyName)+" ("+t._s(i.Description)+" "+t._s(i.Unit)+") does not match the product name or it's alternatives in ESA ("+t._s(i.Name)+" "+t._s(i.product_units)+") ")])]):t._e()})],2)]),e("Notes",{attrs:{locked:t.locked,notes:t.notes,prescription:t.selected}})],1)]},proxy:!0},{key:"footer",fn:function(){return[e("button",{staticClass:"btn btnSize01 primaryBtn bigButton",on:{click:function(i){return t.confirmNotes()}}},[t._v("I'VE READ THESE NOTES!")])]},proxy:!0}],null,!1,202552870)}),e("div",{staticClass:"card-header"},[e("h3",[t._v("Pending Orders ("+t._s(t.orders.length)+")")])]),e("div",{staticClass:"card-body",staticStyle:{padding:"0"}},[e("table",[e("thead",[e("tr",[e("th",[t._v("Prescription")]),e("th",[t._v("Patient")]),e("th",[t._v("Products")]),e("th",[t._v("Notes")]),e("th",[t._v("History")]),e("th",{staticStyle:{"text-align":"center"}},[t._v("Print")])])]),e("tbody",t._l(t.orders,function(i){return e("tr",{key:i.PrescriptionID,staticClass:"clickable quick-tray__item",class:[t.selected.PrescriptionID==i.PrescriptionID?"selected":"",t.locked&&t.selected.PrescriptionID==i.PrescriptionID?"locked":""],on:{dblclick:function(r){return t.redirect(i.PrescriptionID)},click:function(r){return t.selectOrder(i)}}},[e("td",[e("a",{attrs:{href:`#/prescription/${i.PrescriptionID}`}},[e("div",{staticClass:"mb-5"},[e("span",{domProps:{innerHTML:t._s(i.ReferenceID)}})]),e("div",{staticClass:"mb-5"},[e("b",[t._v(t._s(i.CompanyName))])]),e("div",{staticClass:"mb-5"},[e("span",{domProps:{innerHTML:t._s(i.Prescriber)}})]),t.locked&&t.selected.PrescriptionID==i.PrescriptionID?e("div",{staticStyle:{background:"#fe4949",color:"white","text-align":"center",padding:"3px"}},[e("b",[t._v("This item is currently opened by "+t._s(t.locked))])]):t._e()])]),e("td",{attrs:{title:`${i.Sex==1?"Male":i.Sex==2?"Female":i.Sex==3?"Transgender":"Other"} born on ${i.DOB} with a BMI of ${i.BMI}`}},[e("span",{staticClass:"gender",class:[i.Sex==1?"blue":i.Sex==2?"purple":i.Sex==3?"orange":"grey"],staticStyle:{padding:"2px"}},[e("span",{domProps:{innerHTML:t._s(i["Patient Name"])}}),e("small",[t._v(" ("+t._s(i.Age)+" / "+t._s(i.Sex==1?"Male":i.Sex==2?"Female":i.Sex==3?"Transgender":"Other")+") ")])]),t.selected.PrescriptionID==i.PrescriptionID?e("div",{staticClass:"mt-5"},[e("span",{domProps:{innerHTML:t._s(i["Patient Address"])}})]):t._e()]),e("td",[t.selected.PrescriptionID==i.PrescriptionID?e("ul",[t.duplicate?e("li",[e("b",{staticClass:"infoBox warning thin-error",staticStyle:{background:"#f53c38","font-size":"14px","padding-bottom":"0","padding-top":"0"},attrs:{title:""}},[t._v(" Possible duplicate order with ID "),e("a",{staticStyle:{color:"#A9E2F3"},attrs:{target:"_blank",href:`#/prescription/${t.duplicate.PrescriptionID}`}},[t._v(" "+t._s(t.duplicate.PrescriptionID)+" ")]),t._v(" and status "+t._s(t.orderStatuses[t.duplicate.Status])+t._s(t.duplicate.SubStatus?" - "+t.orderSubStatuses[t.duplicate.SubStatus]:"")+". ")])]):t._e(),t._l(i.Products,function(r,a){return e("li",{key:a},[e("b",[e("span",{domProps:{innerHTML:t._s(r.ShortName)}}),t._v(" "),r.Fridge?e("span",{staticClass:"quick-tray__fridge"},[t._v("Fridge")]):t._e()]),r.CorrectName?t._e():e("b",{staticClass:"infoBox warning thin-error",staticStyle:{background:"#f53c38","font-size":"14px","padding-bottom":"0","padding-top":"0"},attrs:{title:`The product name recieved by ${t.selected.CompanyName} (${r.Description}) does not match the product name or it's alternatives in ESA (${r.Name})`}},[t._v(" Name Mismatch ")]),r.CorrectUnit?t._e():e("b",{staticClass:"infoBox warning thin-error",staticStyle:{background:"#f53c38","font-size":"14px","padding-bottom":"0","padding-top":"0"},attrs:{title:`The product name recieved by ${t.selected.CompanyName} (${r.Description}) does not match the product name or it's alternatives in ESA (${r.Name})`}},[t._v(" Unit Mismatch ")]),e("div",{staticStyle:{"max-width":"350px","font-size":"11px"}},[t._v(" "+t._s(r.Instructions)+" ")])])})],2):e("ul",t._l(i.Products,function(r,a){return e("li",{key:a},[e("span",{domProps:{innerHTML:t._s(r.ShortName)}}),t._v(" "),r.Fridge?e("span",{staticClass:"quick-tray__fridge"},[e("b",[t._v("Fridge")])]):t._e()])}),0)]),e("td",[t.selected.PrescriptionID==i.PrescriptionID?e("div",{staticStyle:{display:"flex","justify-content":"space-between","flex-direction":"column"}},[e("div",[e("div",{staticClass:"quick-tray__note",class:[t.notes.critical.length>0?"quick-tray__note-warning":""]},[t._v(" "+t._s(t.notes.critical.length)+" Patient Note(s) ")]),e("div",{staticClass:"quick-tray__note",class:[t.notes.correspondence.length+t.notes.information.length>0?"quick-tray__note-warning":""]},[t._v(" "+t._s(t.notes.correspondence.length+t.notes.information.length)+" Queried Note(s) ")]),e("div",{staticClass:"quick-tray__note",class:[t.notes.other.length+(t.selected.Notes!=""&&t.selected.Notes!=null?1:0)>0?"quick-tray__note-warning":""]},[t._v(" "+t._s(t.notes.other.length+(t.selected.Notes!=""&&t.selected.Notes!=null?1:0))+" Order Note(s) ")])]),e("button",{staticClass:"btn btnSize03 secondaryBtn",staticStyle:{padding:"4px"},on:{click:function(r){return t.openNotes()}}},[t._v(" View ")])]):e("span")]),e("td",{staticStyle:{width:"500px"}},[t.selected.PrescriptionID==i.PrescriptionID?e("div",{staticClass:"medicineHistory notranslate quick-tray__history"},[t._l(t.filteredHistory,function(r,a){return t.historyLoading?t._e():e("ul",{key:a,staticClass:"new",class:t.statusClass(r.Status),attrs:{title:`Order ${r.PrescriptionID} in status ${t.orderStatuses[r.Status]}. Double-click to open in new tab.`},on:{dblclick:function(n){return t.redirect(r.PrescriptionID)}}},t._l(r.Products,function(n,o){return e("li",{key:o,staticClass:"medicine"},[e("a",{staticStyle:{"margin-left":"3px"},attrs:{target:"_blank",href:`#/prescription/${r.PrescriptionID}`}},[t._v(" "+t._s(n.Name)+", "+t._s(n.Quantity*n.Dosage)+" "+t._s(n.Units)+" ("+t._s(r.Client)+") ")]),e("div",[o==0?e("b",[e("span",{staticClass:"font-highlight",class:t.statusClass(r.Status)},[t._v(t._s(t.orderStatuses[r.Status]))])]):t._e(),o==0&&[8,6,3,4,12,13,14,15].includes(r.Status)?e("span",[e("b",[t._v(t._s(r.ShippedDate.slice(0,-5)))])]):t._e()])])}),0)}),t.historyLoading?e("div",[t._v("Loading...")]):t._e(),!t.historyLoading&&t.history.length==0?e("div",[t._v("No previous orders available..")]):t._e(),!t.historyLoading&&t.history.length>3?e("div",{on:{click:function(r){t.expandHistory=!t.expandHistory}}},[t.expandHistory?e("button",{staticClass:"btn btnSize03 secondaryBtn",staticStyle:{padding:"4px",width:"100%"}},[e("i",{staticClass:"fa fa-caret-up",staticStyle:{"padding-right":"5px"}}),t._v("Collapse ")]):e("button",{staticClass:"btn btnSize03 secondaryBtn",staticStyle:{padding:"4px",width:"100%"}},[e("i",{staticClass:"fa fa-caret-down",staticStyle:{"padding-right":"5px"}}),t._v(" Expand ("+t._s(t.history.length-t.filteredHistory.length)+" more entries) ")])]):t._e()],2):e("span")]),e("td",{staticStyle:{"vertical-align":"middle","text-align":"center"}},[t.selected.PrescriptionID==i.PrescriptionID?e("button",{staticClass:"btn btnSize01 secondaryBtn",attrs:{disabled:t.locked||t.printing,title:"Print prescription and pharmacy labels"},on:{click:function(r){return t.tryPrint()}}},[t.printable?e("i",{staticClass:"fa fa-print",staticStyle:{"font-size":"25px"}}):e("i",{staticClass:"fa fa-exclamation-circle",staticStyle:{"font-size":"25px"}})]):t._e()])])}),0)])])],1):t._e()])},g=[],v=d(f,_,g,!1,null,null,null,null);const y=v.exports,m={components:{QuickTray:y},mixins:[p],data:function(){return{idsVisible:!1,showLogs:!1,orders:[],dispensers:[],userInfo,imgMap:{3:"images/logo/tnt.png",4:"images/logo/dpd.png",5:"images/logo/rmail.png",7:"images/logo/ups.png",70:"images/logo/ups_access_point.jpg",8:"images/logo/tnt.png",10:"images/logo/dhl.png"}}},computed:{showListText(){return this.idsVisible?"Hide List of Order ID's":"Show List of Order ID's"},availableCount(){return this.orders.filter(s=>s.UserID===0).length},tray(){return this.$store.state.tray},trayIds(){return this.$store.state.tray.map(s=>s.PrescriptionID)},printLog(){return this.$store.state.printLog},trayCompany(){let s=[];return this.tray.forEach(t=>{t.DeliveryID==5&&t.CompanyName!="EveAdam"&&!t.JVM&&(s.includes("rml")||s.push("rml")),t.DeliveryID==4&&t.CompanyName!="EveAdam"&&!t.JVM&&(s.includes("dpd")||s.push("dpd")),t.DeliveryID==7&&t.PaymentMethod==0&&t.CompanyName!="EveAdam"&&!t.JVM&&(s.includes("ups")||s.push("ups")),t.DeliveryID==7&&t.PaymentMethod!=0&&t.CompanyName!="EveAdam"&&!t.JVM&&(s.includes("upscod")||s.push("upscod")),t.DeliveryID==10&&t.CompanyName!="EveAdam"&&!t.JVM&&(s.includes("dhl")||s.push("dhl")),t.CompanyName=="EveAdam"&&!t.JVM&&(s.includes("eveadam")||s.push("eveadam")),t.JVM==1&&(s.includes("jvm")||s.push("jvm"))}),s},count(){let s={available:0,rml:0,dpd:0,ups:0,upscod:0,dhl:0,eveadam:0,jvm:0};return this.orders.forEach(t=>{t.UserID==0&&s.available++,t.DeliveryID==5&&t.UserID==0&&s.rml++,t.DeliveryID==4&&t.UserID==0&&s.dpd++}),s}},mounted(){this.refresh(),this.$root.$on("tray.clear",()=>{this.refresh()})},methods:{getPendingOrders(){axios.post("/prescription-pool/orders-list",{ids:this.trayIds}).then(s=>{console.log("response")}).catch(s=>{this.postError(s.response.data.message)})},refresh(){this.getOrders(),this.getDispensers()},toggleOrderList(){this.idsVisible=!this.idsVisible,this.idsVisible&&this.refresh()},getOrders(){axios.get("/prescription-pool/orders").then(s=>{this.orders=s.data.data}).catch(s=>{this.postError(s.response.data.message)})},getDispensers(){axios.get("/prescription-pool/dispensers").then(s=>{this.dispensers=s.data.data}).catch(s=>{this.postError(s.response.data.message)})},allocate(s=!1,t=!1,e=!1){axios.post("/prescription-pool/allocate",{userID:s,deliveryID:t,orderID:e}).then(i=>{this.refresh(),this.$root.$emit("tray.refresh")}).catch(i=>{this.postError(i.response.data.message)})},release(s=!1,t=!1,e=!1){e?this.checkMessage("Are you sure you want to release all orders!",()=>{this.releaseRequest(s,t,e)}):this.releaseRequest(s,t,e)},releaseRequest(s=!1,t=!1,e=!1){axios.post("/prescription-pool/release",{userID:s,dispenserPoolID:t,all:e}).then(i=>{this.refresh(),this.$root.$emit("tray.refresh")}).catch(i=>{this.postError(i.response.data.message)})},viewAssigned(){this.$root.$emit("tray.toggle")},checkMessage(s,t){this.$swal({title:"Are you sure you want to release all orders?",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, release everything!"}).then(e=>{e.value&&t()})},reprint(s){this.$root.$emit("prescriptionpool.reprint",s)}}};var b=function(){var t=this,e=t._self._c;return e("div",{staticClass:"content prescription-pool"},[e("section",{staticClass:"card"},[t._m(0),e("div",{staticClass:"card-body",staticStyle:{display:"flex","justify-content":"space-between"}},[e("div",[e("button",{staticClass:"btn btnSize02 secondaryBtn mb-10",attrs:{title:t.showListText},on:{click:function(i){return t.toggleOrderList()}}},[t._v(" "+t._s(t.showListText)+" ")]),e("button",{staticClass:"btn btnSize02 secondaryBtn mb-10",attrs:{title:"View all orders assigned to you"},on:{click:function(i){return t.viewAssigned()}}},[t._v(" View Assigned Orders ")]),t.printLog.length>0?e("button",{staticClass:"btn btnSize02 secondaryBtn mb-10",on:{click:function(i){t.showLogs=!t.showLogs}}},[t._v(" "+t._s(t.showLogs?"Hide":"Show")+" Print Logs ")]):t._e(),t.tray.length>0?e("button",{staticClass:"btn btnSize02 tertiaryBtn",attrs:{title:"Release orders assigned to "+t.userInfo.name},on:{click:function(i){return t.release(t.userInfo.esa_user_id,!1)}}},[t._v(" Release Orders ")]):e("button",{staticClass:"btn btnSize02 secondaryBtn mb-10",attrs:{title:"Release all assigned orders",disabled:t.count.available==t.orders.length},on:{click:function(i){return t.release(!1,!1,!0)}}},[t._v(" Release All ")])]),e("transition",{attrs:{name:"fade"}},[t.printLog.length>0&&t.showLogs?e("div",{staticClass:"prescription-pool_print-log"},[e("ul",[e("li",{staticStyle:{"border-bottom":"1px solid gainsboro"}},[t._v("Print Log")]),t._l(t.printLog,function(i){return e("li",{key:i.PrescriptionID},[e("span",[t._v(" "+t._s(i.action)+" "),e("b",[e("a",{attrs:{target:"_blank",href:`#/prescription/${i.PrescriptionID}`}},[t._v(t._s(i.PrescriptionID))])]),t._v(" on "+t._s(new Date(i.time).toLocaleTimeString("en-GB"))+" ")]),e("button",{staticClass:"btn btnSize03 secondaryBtn",staticStyle:{padding:"4px"},on:{click:function(r){return t.reprint(i.PrescriptionID)}}},[t._v("Reprint")])])})],2)]):t._e()])],1),e("transition",{attrs:{name:"fade"}},[t.idsVisible?e("div",{staticClass:"card-body order-id-list"},[e("hr"),t.orders.length>0?e("ul",[e("li",{staticClass:"pool-list-layout"},[e("div",{staticClass:"pool-column"},[e("b",[t._v("Order ID")])]),e("div",{staticClass:"pool-column"},[e("b",[t._v("Allocated To")])]),e("div",{staticClass:"pool-column"},[e("b",[t._v("Type")])]),e("div",{staticClass:"pool-actions"},[e("b",[t._v("Tools")])])]),t._l(t.orders,function(i){return e("li",{key:i.PrescriptionID,staticClass:"pool-list-layout"},[e("div",{staticClass:"pool-column"},[t._v(" "+t._s(i.PrescriptionID)+" ")]),e("div",{staticClass:"pool-column"},[i.name==null&&i.surname==null?e("span",[t._v(" Not Assigned ")]):e("span",[t._v(t._s(i.name+" "+i.surname))])]),e("div",{staticClass:"pool-column"},[i.DeliveryID==5?e("b",[t._v("Royal Mail")]):i.DeliveryID==4?e("b",[t._v("DPD")]):i.DeliveryID==7&&i.PaymentMethod==0?e("b",[t._v("UPS")]):i.DeliveryID==7&&i.PaymentMethod!=0?e("b",[t._v("UPS COD")]):i.DeliveryID==10?e("b",[t._v("DHL")]):e("b",[t._v("UNKNOWN")])]),e("div",{staticClass:"pool-actions"},[e("button",{staticClass:"btn btnSize02 tertiaryBtn",attrs:{disabled:i.UserID==t.userInfo.esa_user_id||t.userInfo.role!=20},on:{click:function(r){return t.allocate(!1,!1,i.DispenserPoolID)}}},[t._v(" Take Over ")]),e("button",{staticClass:"btn btnSize02 tertiaryBtn ml-20",attrs:{disabled:i.UserID==0},on:{click:function(r){return t.release(!1,i.DispenserPoolID)}}},[t._v(" Release ")])])])})],2):e("div",[t._v(" No orders found ")])]):t._e()])],1),e("QuickTray"),t.tray.length==0?e("section",{staticClass:"card"},[t._m(1),e("div",{staticClass:"card-body"},[e("ul",[e("li",{staticClass:"pool-list-layout"},[t._m(2),e("div",{staticClass:"pool-column"},[e("b",[t._v(t._s(t.count.available))])]),e("div",{staticClass:"pool-actions"},[t._m(3),e("button",{staticClass:"btn btnSize02 tertiaryBtn ml-20",attrs:{title:"Take over all available Royal Mail orders",disabled:t.userInfo.role!=20&&t.userInfo.role!=19||t.count.rml==0||!t.trayCompany.includes("rml")&&t.trayCompany.length>0},on:{click:function(i){return t.allocate(!1,"rml",!1)}}},[t._v(" Royal Mail "),e("b",[t._v("("+t._s(t.count.rml)+")")])]),e("button",{staticClass:"btn btnSize02 tertiaryBtn ml-20",attrs:{title:"Take over all available DPD orders",disabled:t.userInfo.role!=20&&t.userInfo.role!=19||t.count.dpd==0||!t.trayCompany.includes("dpd")&&t.trayCompany.length>0},on:{click:function(i){return t.allocate(!1,"dpd",!1)}}},[t._v(" DPD "),e("b",[t._v("("+t._s(t.count.dpd)+")")])])])]),t._l(t.dispensers,function(i){return e("li",{key:i.id,staticClass:"pool-list-layout"},[e("div",{staticClass:"pool-column"},[t._v(" "+t._s(i.name)+" "),i.id==t.userInfo.id?e("b",[t._v("(CURRENT USER)")]):t._e()]),e("div",{staticClass:"pool-column"},[e("b",[t._v(t._s(i.count))])]),e("div",{staticClass:"pool-actions"},[i.id!=t.userInfo.id?e("button",{staticClass:"btn btnSize02 tertiaryBtn mr-20",attrs:{title:"Take over orders assigned to "+i.name,disabled:i.count==0},on:{click:function(r){return t.allocate(i.esa_user_id,!1,!1)}}},[t._v(" TAKE OVER ")]):t._e(),e("button",{staticClass:"btn btnSize02 tertiaryBtn",attrs:{title:"Release orders assigned to "+i.name,disabled:i.count==0},on:{click:function(r){return t.release(i.esa_user_id,!1)}}},[t._v(" RELEASE ")])])])})],2)])]):t._e()],1)},C=[function(){var s=this,t=s._self._c;return t("div",{staticClass:"card-header"},[t("h3",[s._v("Prescription Pool")])])},function(){var s=this,t=s._self._c;return t("div",{staticClass:"card-header pool-list-layout"},[t("div",{staticClass:"pool-column"},[s._v(" Dispenser ")]),t("div",{staticClass:"pool-column"},[s._v(" Available Orders ")]),t("div",{staticClass:"pool-actions"},[s._v(" Tools ")])])},function(){var s=this,t=s._self._c;return t("div",{staticClass:"pool-column"},[t("b",[s._v("AVAILABLE IN THE POOL")])])},function(){var s=this,t=s._self._c;return t("span",{staticClass:"ml-20"},[t("b",[s._v("ALLOCATE NEW (MAX 15)")])])}],D=d(m,b,C,!1,null,null,null,null);const $=D.exports;export{$ as default};
