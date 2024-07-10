import{n as i,E as n}from"./app-a3e6dddd.js";const d={mixins:[n],data:function(){return{data:{},countries:[],errors:{},loading:!1,userInfo}},mounted(){userInfo.id!=this.$route.params.id&&userInfo.role<50?this.$router.push("/notallowed"):this.getCountries()},computed:{dataUrl:function(){return"/doctors/"+this.$route.params.id},postUrl:function(){return"/doctors"}},methods:{getCountries(){this.loading=!0,axios.get("/countries").then(o=>{this.countries=o.data.data}).catch(o=>{this.postError(o.response.data.message)}).finally(()=>{this.loading=!1})},save:function(){this.loading=!0,axios.post(this.postUrl,this.data).then(o=>{this.postSuccess(o.data.message),this.errors={},this.$router.push({name:"prescriber",params:{id:o.data.data}})}).catch(o=>{this.errors=o.response.data.errors,this.postError(o.response.data.message)}).finally(()=>{this.loading=!1})}}};var m=function(){var t=this,a=t._self._c;return a("div",{staticClass:"content"},[a("section",{staticClass:"card"},[t._m(0),a("div",{staticClass:"card-body"},[a("form",{staticClass:"text-center p-5",on:{submit:function(e){return e.preventDefault(),t.save.apply(null,arguments)}}},[a("div",{staticClass:"pxp-form wow fadeIn",staticStyle:{height:"auto!important"}},[t._m(1),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"Name"}},[t._v("Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.Name,expression:"data.Name"}],staticClass:"form-control",attrs:{name:"Name",autocomplete:"off",type:"text",placeholder:"Name"},domProps:{value:t.data.Name},on:{input:function(e){e.target.composing||t.$set(t.data,"Name",e.target.value)}}})])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"Surname"}},[t._v("Surname")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.Surname,expression:"data.Surname"}],staticClass:"form-control",attrs:{name:"Surname",autocomplete:"off",type:"text",placeholder:"Surname"},domProps:{value:t.data.Surname},on:{input:function(e){e.target.composing||t.$set(t.data,"Surname",e.target.value)}}})])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"ClientID"}},[t._v("Prescriber Registration Type")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.data.DoctorType,expression:"data.DoctorType"}],staticClass:"browser-default custom-select",attrs:{name:"DoctorType"},on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,function(s){return s.selected}).map(function(s){var l="_value"in s?s._value:s.value;return l});t.$set(t.data,"DoctorType",e.target.multiple?r:r[0])}}},[a("option",{attrs:{disabled:""},domProps:{value:0}},[t._v("Select Prescriber Registration Type")]),a("option",{domProps:{value:1}},[t._v("GMC")]),a("option",{domProps:{value:2}},[t._v("EU")]),a("option",{domProps:{value:3}},[t._v("GPhC")]),a("option",{domProps:{value:4}},[t._v("Test")]),a("option",{domProps:{value:5}},[t._v("IMC")])])])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"GMCNO"}},[t._v("Registration Number")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.GMCNO,expression:"data.GMCNO"}],staticClass:"form-control",attrs:{name:"GMCNO",autocomplete:"off",type:"text",placeholder:"Registration Number"},domProps:{value:t.data.GMCNO},on:{input:function(e){e.target.composing||t.$set(t.data,"GMCNO",e.target.value)}}})])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"MedicalInsuranceNo"}},[t._v("Medical insurance number")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.MedicalInsuranceNo,expression:"data.MedicalInsuranceNo"}],staticClass:"form-control",attrs:{name:"MedicalInsuranceNo",autocomplete:"off",type:"text",placeholder:"Medical insurance number"},domProps:{value:t.data.MedicalInsuranceNo},on:{input:function(e){e.target.composing||t.$set(t.data,"MedicalInsuranceNo",e.target.value)}}})])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"CompanyName"}},[t._v("Company Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.CompanyName,expression:"data.CompanyName"}],staticClass:"form-control",attrs:{name:"CompanyName",autocomplete:"off",type:"text",placeholder:"Company Name"},domProps:{value:t.data.CompanyName},on:{input:function(e){e.target.composing||t.$set(t.data,"CompanyName",e.target.value)}}})])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"Title"}},[t._v("Contact Title")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.Title,expression:"data.Title"}],staticClass:"form-control",attrs:{name:"Title",autocomplete:"off",type:"text",placeholder:"Contact Title"},domProps:{value:t.data.Title},on:{input:function(e){e.target.composing||t.$set(t.data,"Title",e.target.value)}}})])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"Status"}},[t._v("Status")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.data.Status,expression:"data.Status"}],staticClass:"browser-default custom-select",attrs:{name:"Status"},on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,function(s){return s.selected}).map(function(s){var l="_value"in s?s._value:s.value;return l});t.$set(t.data,"Status",e.target.multiple?r:r[0])}}},[a("option",{domProps:{value:0}},[t._v("Inactive")]),a("option",{domProps:{value:1}},[t._v("Active")])])])]),t._m(2),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"CountryID"}},[t._v("Country")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.data.CountryID,expression:"data.CountryID"}],staticClass:"browser-default custom-select",attrs:{name:"CountryID"},on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,function(s){return s.selected}).map(function(s){var l="_value"in s?s._value:s.value;return l});t.$set(t.data,"CountryID",e.target.multiple?r:r[0])}}},t._l(t.countries,function(e){return a("option",{key:e.CountryID,domProps:{value:e.CountryID}},[t._v(t._s(e.Name))])}),0)])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"Address1"}},[t._v("Address Line 1")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.Address1,expression:"data.Address1"}],staticClass:"form-control",attrs:{name:"Address1",autocomplete:"off",type:"text",placeholder:"Address Line 1"},domProps:{value:t.data.Address1},on:{input:function(e){e.target.composing||t.$set(t.data,"Address1",e.target.value)}}})])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"Address2"}},[t._v("Address Line 2")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.Address2,expression:"data.Address2"}],staticClass:"form-control",attrs:{name:"Address2",autocomplete:"off",type:"text",placeholder:"Address Line 2"},domProps:{value:t.data.Address2},on:{input:function(e){e.target.composing||t.$set(t.data,"Address2",e.target.value)}}})])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"Address3"}},[t._v("Address Line 3")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.Address3,expression:"data.Address3"}],staticClass:"form-control",attrs:{name:"Address3",autocomplete:"off",type:"text",placeholder:"Address Line 3"},domProps:{value:t.data.Address3},on:{input:function(e){e.target.composing||t.$set(t.data,"Address3",e.target.value)}}})])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"Address4"}},[t._v("Address Line 4")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.Address4,expression:"data.Address4"}],staticClass:"form-control",attrs:{name:"Address4",autocomplete:"off",type:"text",placeholder:"Address Line 4"},domProps:{value:t.data.Address4},on:{input:function(e){e.target.composing||t.$set(t.data,"Address4",e.target.value)}}})])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"Postcode"}},[t._v("Postcode")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.Postcode,expression:"data.Postcode"}],staticClass:"form-control",attrs:{name:"Postcode",autocomplete:"off",type:"text",placeholder:"Postcode"},domProps:{value:t.data.Postcode},on:{input:function(e){e.target.composing||t.$set(t.data,"Postcode",e.target.value)}}})])]),t._m(3),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"Telephone"}},[t._v("Telephone")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.Telephone,expression:"data.Telephone"}],staticClass:"form-control",attrs:{name:"Telephone",autocomplete:"off",type:"text",placeholder:"Telephone"},domProps:{value:t.data.Telephone},on:{input:function(e){e.target.composing||t.$set(t.data,"Telephone",e.target.value)}}})])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"Mobile"}},[t._v("Mobile")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.Mobile,expression:"data.Mobile"}],staticClass:"form-control",attrs:{name:"Mobile",autocomplete:"off",type:"text",placeholder:"Mobile"},domProps:{value:t.data.Mobile},on:{input:function(e){e.target.composing||t.$set(t.data,"Mobile",e.target.value)}}})])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"Email"}},[t._v("Email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.Email,expression:"data.Email"}],staticClass:"form-control",attrs:{name:"Email",autocomplete:"off",type:"text",placeholder:"Email"},domProps:{value:t.data.Email},on:{input:function(e){e.target.composing||t.$set(t.data,"Email",e.target.value)}}})])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"Username"}},[t._v("Username")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.Username,expression:"data.Username"}],staticClass:"form-control",attrs:{name:"Username",autocomplete:"off",type:"text",placeholder:"Username"},domProps:{value:t.data.Username},on:{input:function(e){e.target.composing||t.$set(t.data,"Username",e.target.value)}}})])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"Password"}},[t._v("Password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data.Password,expression:"data.Password"}],staticClass:"form-control",attrs:{name:"Password",autocomplete:"off",type:"text",placeholder:"Password"},domProps:{value:t.data.Password},on:{input:function(e){e.target.composing||t.$set(t.data,"Password",e.target.value)}}})])]),a("div",{staticClass:"form-column"},[a("div",{staticClass:"form-group form-group-2"},[a("label",{attrs:{for:"Notes"}},[t._v("Notes")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.data.Notes,expression:"data.Notes"}],staticClass:"form-control tBoxSize02",staticStyle:{"min-width":"300px","min-height":"60px","line-height":"1"},attrs:{placeholder:"Add notes for prescriber here"},domProps:{value:t.data.Notes},on:{input:function(e){e.target.composing||t.$set(t.data,"Notes",e.target.value)}}})])])]),a("button",{staticClass:"btn btnSize01 secondaryBtn",attrs:{type:"submit"}},[t._v("Save")])])])])])},u=[function(){var o=this,t=o._self._c;return t("div",{staticClass:"card-header"},[t("h3",[o._v("New Prescriber")])])},function(){var o=this,t=o._self._c;return t("div",{staticClass:"form-row"},[t("h3",{staticClass:"m-10"},[o._v("Basic Information")])])},function(){var o=this,t=o._self._c;return t("div",{staticClass:"form-row"},[t("h3",{staticClass:"m-10"},[o._v("Address Information")])])},function(){var o=this,t=o._self._c;return t("div",{staticClass:"form-row"},[t("h3",{staticClass:"m-10"},[o._v("Contact & Login Information")])])}],c=i(d,m,u,!1,null,null,null,null);const f=c.exports;export{f as default};
