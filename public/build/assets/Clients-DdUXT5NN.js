const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/TableComponentSearch-B6wQQUWq.js","assets/app-CzB2aCin.js","assets/app-DWMI0VDG.css","assets/Datepicker-CZowO3e1.js","assets/Datepicker-B76Gv48S.css"])))=>i.map(i=>d[i]);
import{_ as a,d as l,e as o,o as c,c as i,a as e,m as r,l as d}from"./app-CzB2aCin.js";const u={components:{TableComponentSearch:l(()=>d(()=>import("./TableComponentSearch-B6wQQUWq.js"),__vite__mapDeps([0,1,2,3,4])))},data:function(){return{filters:[{title:"Client Name",value:"name",type:"text"},{title:"Client Surname",value:"surname",type:"text"},{title:"Company Name",value:"companyname",type:"text"},{title:"Status",value:"status",type:"select",selected:1,options:[{title:"Active",value:1},{title:"Inactive",value:0}]}]}},mounted(){}},m={class:"content"},p={class:"card"},_=e("div",{class:"card-header"},[e("h3",null,"Clients")],-1),v={class:"card-body"};function f(t,n,C,h,b,y){const s=o("TableComponentSearch");return c(),i("div",m,[e("section",p,[_,e("div",v,[e("button",{onClick:n[0]||(n[0]=S=>t.$router.push("/clients/new")),class:"btn btnSize01 secondaryBtn mb-10"}," Add new client "),r(s,{"data-url":"/clients/index","column-class":"col-lg-12","table-title":"Clients","redirect-name":"client","redirect-id":"ID",filters:t.filters,deleteUrl:"/clients",deleteId:"ID","csv-url-search":!1},null,8,["filters"])])])])}const x=a(u,[["render",f]]);export{x as default};
//# sourceMappingURL=Clients-DdUXT5NN.js.map