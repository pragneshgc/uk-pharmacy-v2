import{_ as m,E as u,c as t,b as s,z as h,s as l,u as n,t as d,d as i,v as f,F as v,r as b,o as r}from"./app-Day-6uLD.js";const w={mixins:[u],data:function(){return{data:{name:"",surname:"",email:"",role:30,password:"",passwordRepeat:"",captcha:""},loading:!1,errors:{},roles:[],captcha_image:""}},mounted(){axios.get("user-roles").then(e=>{this.roles=e.data.data}),this.loadCaptcha()},computed:{postUrl:function(){return"/users"}},methods:{save:function(){this.loading=!0,axios.post(this.postUrl,this.data).then(e=>{this.postSuccess(e.data.message),this.errors={},this.loading=!1,this.$router.push("/users")}).catch(e=>{this.errors=e.response.data.errors,this.loading=!1}),this.loadCaptcha()},loadCaptcha:function(){this.loading=!0,axios.get("/reload-captcha").then(e=>{this.captcha_image=e.data.captcha,this.loading=!1})}}},k={class:"content"},g={class:"card"},y=s("div",{class:"card-header"},[s("h3",null,"New User")],-1),_={class:"card-body"},S=s("p",{class:"h4 mb-3"},"New User",-1),U={class:"row mb-3"},B={class:"col-lg-6 mb-10"},V={key:0,class:"invalid-feedback d-block"},z={class:"col-lg-6 mb-10"},C={key:0,class:"invalid-feedback d-block"},R={class:"row mb-3"},N={class:"col-lg-6 mb-10"},E={key:0,class:"invalid-feedback d-block"},F={class:"col-lg-6 mb-10"},M=["value"],L={key:0,class:"invalid-feedback d-block"},T={class:"row mb-3"},$={class:"col-lg-6 mb-10"},D={key:0,class:"invalid-feedback d-block"},H={class:"col-lg-6 mb-10"},P={key:0,class:"invalid-feedback d-block"},j={class:"row mb-3"},q={key:0,class:"invalid-feedback d-block"},A={class:"row mb-3"},G=["innerHTML"],I=s("button",{class:"btn btnSize01 secondaryBtn",type:"submit"},"Save",-1);function J(e,o,K,O,Q,c){return r(),t("div",k,[s("section",g,[y,s("div",_,[s("form",{class:"text-center p-5",onSubmit:o[7]||(o[7]=h((...a)=>c.save&&c.save(...a),["prevent"]))},[S,s("div",U,[s("div",B,[l(s("input",{valid:"",autocomplete:"off","onUpdate:modelValue":o[0]||(o[0]=a=>e.data.name=a),type:"text",id:"defaultContactFormName",class:"form-control tBoxSize02",placeholder:"Name"},null,512),[[n,e.data.name]]),e.errors.name?(r(),t("div",V,d(e.errors.name[0]),1)):i("",!0)]),s("div",z,[l(s("input",{autocomplete:"off","onUpdate:modelValue":o[1]||(o[1]=a=>e.data.surname=a),type:"text",id:"defaultContactFormSurnname",class:"form-control tBoxSize02",placeholder:"Surname"},null,512),[[n,e.data.surname]]),e.errors.surname?(r(),t("div",C,d(e.errors.surname[0]),1)):i("",!0)])]),s("div",R,[s("div",N,[l(s("input",{autocomplete:"off","onUpdate:modelValue":o[2]||(o[2]=a=>e.data.email=a),type:"email",id:"defaultContactFormEmail",class:"form-control tBoxSize02",placeholder:"E-mail"},null,512),[[n,e.data.email]]),e.errors.email?(r(),t("div",E,d(e.errors.email[0]),1)):i("",!0)]),s("div",F,[l(s("select",{"onUpdate:modelValue":o[3]||(o[3]=a=>e.data.role=a),class:"browser-default custom-select"},[(r(!0),t(v,null,b(e.roles,(a,p)=>(r(),t("option",{value:p,key:p},d(a),9,M))),128))],512),[[f,e.data.role]]),e.errors.role?(r(),t("div",L,d(e.errors.role[0]),1)):i("",!0)])]),s("div",T,[s("div",$,[l(s("input",{autocomplete:"off","onUpdate:modelValue":o[4]||(o[4]=a=>e.data.password=a),type:"password",name:"password",id:"password",class:"form-control tBoxSize02",placeholder:"Password"},null,512),[[n,e.data.password]]),e.errors.password?(r(),t("div",D,d(e.errors.password[0]),1)):i("",!0)]),s("div",H,[l(s("input",{autocomplete:"off","onUpdate:modelValue":o[5]||(o[5]=a=>e.data.passwordRepeat=a),type:"password",name:"password-repeat",id:"passwordRepeat",class:"form-control tBoxSize02",placeholder:"Repeat Password"},null,512),[[n,e.data.passwordRepeat]]),e.errors.passwordRepeat?(r(),t("div",P,d(e.errors.passwordRepeat[0]),1)):i("",!0)])]),s("div",j,[l(s("input",{autocomplete:"off","onUpdate:modelValue":o[6]||(o[6]=a=>e.data.captcha=a),type:"text",name:"captcha",id:"passwordRepeat",class:"form-control tBoxSize02",placeholder:"Enter Captcha"},null,512),[[n,e.data.captcha]]),e.errors.captcha?(r(),t("div",q,d(e.errors.captcha[0]),1)):i("",!0)]),s("div",A,[s("span",{innerHTML:e.captcha_image},null,8,G)]),I],32)])])])}const X=m(w,[["render",J]]);export{X as default};
//# sourceMappingURL=NewUser-BSB6oKBZ.js.map
