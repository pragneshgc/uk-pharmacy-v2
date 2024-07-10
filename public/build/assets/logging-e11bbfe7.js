const n={methods:{logSystemActivity(t,o,a=0,g,s=!1){axios.post(`/logs/system/${t}`,{type:o,data:g,messageKey:a}).then(e=>{s&&s()}).catch(e=>{console.warn(e)})}}};export{n as l};
