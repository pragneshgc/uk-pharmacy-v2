const c={methods:{exportCSV:function(t,n){let o="data:text/csv;charset=utf-8,\uFEFF";o+=this.arrayToCSV(t);var e=encodeURI(o),r=document.createElement("a");r.setAttribute("href",e),r.setAttribute("download",n+~~(Date.now()/1e3)+".csv"),document.body.appendChild(r),r.click(),document.body.removeChild(r)},arrayToCSV:function(t){const n=typeof t!="object"?JSON.parse(t):t;let o=`${Object.keys(n[0]).map(e=>`"${e}"`).join(",")}\r
`;return n.reduce((e,r)=>(e+=`${Object.values(r).map(a=>`"${a}"`).join(",")}\r
`,e=e.replace(/;/g,""),this.strip(e)),o)},strip(t){var n=new DOMParser().parseFromString(t,"text/html");return n.body.textContent||""}}};export{c as C};
//# sourceMappingURL=csv-D9clh__g.js.map
