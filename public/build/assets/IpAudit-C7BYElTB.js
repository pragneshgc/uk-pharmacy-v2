const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/TableComponentSearch-BX1i9UPY.js","assets/app-Day-6uLD.js","assets/app-DWMI0VDG.css","assets/csv-D9clh__g.js","assets/Datepicker-B5Jhtrx6.js","assets/Datepicker-B76Gv48S.css"])))=>i.map(i=>d[i]);
import{_ as s,k as o,D as l,G as n,a as r,c,b as e,j as i,h as d,o as u}from"./app-Day-6uLD.js";const p={mixins:[o,l,n],data:function(){return{userInfo,columnMap:{request_from:"From",requested_at:"Request Time",ip_address:"IP",action_by:"Action By",action_at:"Action Time",status:"Status"},filters:[{title:"Start Date",value:"start_date",type:"date"},{title:"End Date",value:"end_date",type:"date"},{title:"Status",value:"audit-status",type:"select",clearable:!0,placeholder:"SelectStatus",options:[{title:"All",value:"all"},{title:"Approved",value:"approved"},{title:"Rejected",value:"rejected"},{title:"Pending",value:"pending"}]}]}},components:{TableComponentSearch:()=>r(()=>import("./TableComponentSearch-BX1i9UPY.js"),__vite__mapDeps([0,1,2,3,4,5]))},mounted(){this.setupFilters()}},_={class:"content"},m={class:"card"},f=e("div",{class:"card-header"},[e("h3",null,"IP Audit")],-1),h={class:"card-body"},v={class:"orderSearch"};function S(t,b,A,y,D,I){const a=d("TableComponentSearch");return u(),c("div",_,[e("section",m,[f,e("div",h,[e("div",v,[i(a,{"data-url":"/ip-audit/search","column-class":"col-lg-12","table-title":"Audit Report",filters:t.filters,"column-map":t.columnMap,"load-on-startup":!1,"csv-url":!1,showtool:!1},null,8,["filters","column-map"])])])])])}const P=s(p,[["render",S]]);export{P as default};
//# sourceMappingURL=IpAudit-C7BYElTB.js.map
