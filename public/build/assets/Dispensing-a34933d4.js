import{n as o,o as d,f as c,_ as u,v as p}from"./app-a3e6dddd.js";const m={mixins:[d,c],components:{TableComponentSearch:()=>u(()=>import("./TableComponentSearch-05ef0c08.js"),["assets/TableComponentSearch-05ef0c08.js","assets/app-a3e6dddd.js","assets/app-7eda0943.css","assets/vuejs-datepicker.esm-72f1c627.js"])},data:function(){return{filters:[{title:"Start Date",value:"start_date",type:"date"},{title:"End Date",value:"end_date",type:"date"},{title:"Country",value:"country",type:"select-extended",options:[],clearable:!0,multiple:!0,placeholder:"Select Country"},{title:"Client",value:"client",type:"select-extended",placeholder:"Select Client",clearable:!0,disableBranchNodes:!0,multiple:!0,options:[]},{title:"Additional",value:"additional",type:"select-extended",placeholder:"Select Summary Time",clearable:!0,multiple:!1,options:[{label:"Monthly data summary",id:"1"}]},{title:"Product",value:"product-multiple",type:"select-async",options:[],placeholder:"Select Product",multiple:!0,clearable:!1,loadOptions:_.debounce(({action:l,searchQuery:e,callback:t})=>{if(l===p.ASYNC_SEARCH){let i=e!=""&&typeof e<"u"?`?filter=${e}`:"";axios.get(`/products${i}`).then(a=>{let r=a.data.data,n=[];r.forEach(s=>{n.push({id:s.Code,value:s.ProductCodeID,label:s.Name})}),t(null,n)}).catch(a=>{console.log(a)})}},500)}]}},mounted(){this.setupFilters()}};var f=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("section",{staticClass:"card"},[e._m(0),t("div",{staticClass:"card-body"},[t("TableComponentSearch",{attrs:{"data-url":"/dispensing-data","column-class":"col-lg-12 dispensing-table","filter-required":!0,"table-title":"Dispensing Data",filters:e.filters,"load-on-startup":!1}})],1)])])},v=[function(){var l=this,e=l._self._c;return e("div",{staticClass:"card-header"},[e("h3",[l._v("Dispensing Data")])])}],h=o(m,f,v,!1,null,null,null,null);const b=h.exports;export{b as default};