(global.webpackJsonp=global.webpackJsonp||[]).push([["pages/Authorize/login/index"],{65:
/*!****************************************************************************************!*\
  !*** E:/HBuilderProjects/uni-App/main.js?{"page":"pages%2FAuthorize%2Flogin%2Findex"} ***!
  \****************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";(function(e){n(/*! uni-pages */4),n(/*! @dcloudio/uni-stat */5);t(n(/*! vue */2));function t(e){return e&&e.__esModule?e:{default:e}}e(t(n(/*! ./pages/Authorize/login/index.vue */66)).default)}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1).createPage)},66:
/*!*******************************************************************!*\
  !*** E:/HBuilderProjects/uni-App/pages/Authorize/login/index.vue ***!
  \*******************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! ./index.vue?vue&type=template&id=7cb26b6c& */67),i=n(/*! ./index.vue?vue&type=script&lang=js& */69);for(var s in i)"default"!==s&&function(e){n.d(t,e,function(){return i[e]})}(s);n(/*! ./index.vue?vue&type=style&index=0&lang=css& */71);var r=n(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */14),c=Object(r.default)(i.default,o.render,o.staticRenderFns,!1,null,null,null,!1,o.components,void 0);c.options.__file="E:/HBuilderProjects/uni-App/pages/Authorize/login/index.vue",t.default=c.exports},67:
/*!**************************************************************************************************!*\
  !*** E:/HBuilderProjects/uni-App/pages/Authorize/login/index.vue?vue&type=template&id=7cb26b6c& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=template&id=7cb26b6c& */68);n.d(t,"render",function(){return o.render}),n.d(t,"staticRenderFns",function(){return o.staticRenderFns}),n.d(t,"recyclableRender",function(){return o.recyclableRender}),n.d(t,"components",function(){return o.components})},68:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderProjects/uni-App/pages/Authorize/login/index.vue?vue&type=template&id=7cb26b6c& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";n.r(t),n.d(t,"render",function(){return o}),n.d(t,"staticRenderFns",function(){return s}),n.d(t,"recyclableRender",function(){return i}),n.d(t,"components",function(){});var o=function(){var e=this.$createElement,t=(this._self._c,String(this.phone).substr(0,3)),n=String(this.phone).substr(3,4),o=String(this.phone).substr(7,4);this.$mp.data=Object.assign({},{$root:{g0:t,g1:n,g2:o}})},i=!1,s=[];o._withStripped=!0},69:
/*!********************************************************************************************!*\
  !*** E:/HBuilderProjects/uni-App/pages/Authorize/login/index.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=script&lang=js& */70),i=n.n(o);for(var s in o)"default"!==s&&function(e){n.d(t,e,function(){return o[e]})}(s);t.default=i.a},70:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderProjects/uni-App/pages/Authorize/login/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(/*! ../../../api/index.js */37),i={components:{ValidCode:function(){return n.e(/*! import() | components/validCode */"components/validCode").then(n.bind(null,/*! ../../../components/validCode.vue */361))}},data:function(){return{step:1,isPhoneValid:!1,isCodeValid:!1,isPwdValid:!1,phone:void 0,cfmCode:void 0,maxlength:6,seconds:59,password:void 0,pwdType:"password",onSend:!1,title:"欢迎登录小红心"}},watch:{step:function(e){switch(e){case 1:this.title="欢迎登录小红心";break;case 2:this.title="输入验证码";break;case 3:this.title="欢迎登录小红心";break;case 4:this.title="输入手机号";break;case 5:this.title="输入验证码";break;case 6:this.title="设置密码"}}},onShow:function(){this.regPhone(),this.regPwd()},onLoad:function(e){console.log(e),this.step=e.step?e.step:1},methods:{goStep:function(e){this.step=e,this.regPhone(),this.regPwd()},changPwdType:function(){this.pwdType="password"==this.pwdType?"text":"password"},clearPhone:function(){this.phone=void 0,this.regPhone()},regPhone:function(e){var t=e&&e.detail.value||this.phone;/^1[3456789]\d{9}$/.test(t)?this.isPhoneValid=!0:this.isPhoneValid=!1},regPwd:function(e){var t=e&&e.detail.value||e&&e.target.value||this.password;this.isPwdValid=!(!t||""==t)},regCode:function(e,t){this.isCodeValid=!!e,this.cfmCode=t},getCode:function(){var t=this;if(this.isPhoneValid&&!this.onSend){1==this.step&&(this.goStep(2),this.type=1),4==this.step&&(this.goStep(5),this.type=2);var n=setInterval(function(){if(0==t.seconds)return clearInterval(n),void(t.onSend=!1);t.seconds--},1e3);(0,o.getCode)({phone:this.phone,type:this.type}).then(function(t){e.showToast({title:t.message})})}},loginByCode:function(){var e=this;this.isCodeValid&&(0,o.phoneLogin)({phone:this.phone,code:this.cfmCode}).then(function(t){1==t.code&&e.loginSucces(t.data)})},changeLoginMethodByPwd:function(){this.goStep(3),this.$MessageBox({title:"温馨提示",type:"HTML",msg:"1.第一次登录建议使用验证码登录或微信登录；<br>2.若使用账户密码登录请点击忘记密码，重新设置密码。；",buttons:["确认"],reverse:!0,visible:!0})},loginByPwd:function(){var e=this;this.isPhoneValid&&this.isPwdValid&&(0,o.passwordLogin)({phone:this.phone,pwd:this.password}).then(function(t){1==t.code&&e.loginSucces(t.data)})},loginSucces:function(t){console.log("注册登录成功");var n=t;if(e.setStorageSync("userInfo",n),e.setStorageSync("userId",n.id),1==n.forzen)return console.log("您的账号被冻结了"),e.showModal({title:"提示",content:"账号已冻结，请联系客服:400-970-0989"}),void this.LoginFail();console.log("获取用户token"),this.getToken(n)},checkCode:function(){var e=this;this.isCodeValid&&(0,o.checkCode)({phone:this.phone,code:this.cfmCode}).then(function(t){1==t.code&&(console.log(t),e.goStep(3))})},updatePwd:function(){var e=this;(0,o.updatePwd)({phone:this.phone,pwd:this.password}).then(function(t){1==t.code&&(console.log("密码修改成功"),e.uni.showToast({title:t.message,icon:"none"}),e.goStep(3))})},LoginFail:function(){e.removeStorageSync("token"),e.removeStorageSync("isLogin"),this.goHome()},goHome:function(){e.switchTab({url:"/pages/index/index"})},getToken:function(t){var n=this,i={grant_type:"password",username:t.sno+"-shu",password:"123456",client_id:"smart-heart",client_secret:"smart-heart-secret"};(0,o.getTokenData)(i).then(function(t){console.log("获取token登录成功======",t.access_token),e.setStorageSync("token",t.access_token),e.setStorageSync("isLogin",!0),e.showToast({title:"登录成功",icon:"none"}),n.goHome()})}}};t.default=i}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1).default)},71:
/*!****************************************************************************************************!*\
  !*** E:/HBuilderProjects/uni-App/pages/Authorize/login/index.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=style&index=0&lang=css& */72),i=n.n(o);for(var s in o)"default"!==s&&function(e){n.d(t,e,function(){return o[e]})}(s);t.default=i.a},72:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderProjects/uni-App/pages/Authorize/login/index.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){}},[[65,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/Authorize/login/index.js.map