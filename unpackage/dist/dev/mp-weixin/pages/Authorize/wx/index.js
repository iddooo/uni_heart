(global.webpackJsonp=global.webpackJsonp||[]).push([["pages/Authorize/wx/index"],{70:
/*!*************************************************************************************!*\
  !*** E:/HBuilderProjects/uni-App/main.js?{"page":"pages%2FAuthorize%2Fwx%2Findex"} ***!
  \*************************************************************************************/
/*! no static exports found */function(e,n,t){"use strict";(function(e){t(/*! uni-pages */4),t(/*! @dcloudio/uni-stat */5);n(t(/*! vue */2));function n(e){return e&&e.__esModule?e:{default:e}}e(n(t(/*! ./pages/Authorize/wx/index.vue */71)).default)}).call(this,t(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1).createPage)},71:
/*!****************************************************************!*\
  !*** E:/HBuilderProjects/uni-App/pages/Authorize/wx/index.vue ***!
  \****************************************************************/
/*! no static exports found */function(e,n,t){"use strict";t.r(n);var o=t(/*! ./index.vue?vue&type=template&id=52bb7b76& */72),r=t(/*! ./index.vue?vue&type=script&lang=js& */74);for(var i in r)"default"!==i&&function(e){t.d(n,e,function(){return r[e]})}(i);t(/*! ./index.vue?vue&type=style&index=0&lang=css& */76);var s=t(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */14),c=Object(s.default)(r.default,o.render,o.staticRenderFns,!1,null,null,null,!1,o.components,void 0);c.options.__file="E:/HBuilderProjects/uni-App/pages/Authorize/wx/index.vue",n.default=c.exports},72:
/*!***********************************************************************************************!*\
  !*** E:/HBuilderProjects/uni-App/pages/Authorize/wx/index.vue?vue&type=template&id=52bb7b76& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,n,t){"use strict";t.r(n);var o=t(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=template&id=52bb7b76& */73);t.d(n,"render",function(){return o.render}),t.d(n,"staticRenderFns",function(){return o.staticRenderFns}),t.d(n,"recyclableRender",function(){return o.recyclableRender}),t.d(n,"components",function(){return o.components})},73:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderProjects/uni-App/pages/Authorize/wx/index.vue?vue&type=template&id=52bb7b76& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,n,t){"use strict";t.r(n),t.d(n,"render",function(){return o}),t.d(n,"staticRenderFns",function(){return i}),t.d(n,"recyclableRender",function(){return r}),t.d(n,"components",function(){});var o=function(){var e=this.$createElement;this._self._c},r=!1,i=[];o._withStripped=!0},74:
/*!*****************************************************************************************!*\
  !*** E:/HBuilderProjects/uni-App/pages/Authorize/wx/index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! no static exports found */function(e,n,t){"use strict";t.r(n);var o=t(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=script&lang=js& */75),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n.default=r.a},75:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderProjects/uni-App/pages/Authorize/wx/index.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t(/*! ../../../api/index.js */34),r={data:function(){return{stepStatus:1,tip:"授权并同意使用微信账号登录当前小程序"}},onLoad:function(){},methods:{getUserInfo:function(n){var t=n.detail;"getUserInfo:ok"==t.errMsg?(console.log("获取用户信息ok======"),e.setStorageSync("userDetail",t),console.log("开始注册登录"),this.login()):(console.log("拒绝获取用户信息"),this.LoginFail())},login:function(){var n=this,t=e.getStorageSync("invitedId"),r=e.getStorageSync("userDetail");e.showLoading({title:"登陆中"}),e.login({success:function(i){var s=i.code;(0,o.postCode)({code:s,invitedId:t,sex:2==r.userInfo.gender?0:1,name:r.userInfo.nickName}).then(function(t){var o={id:"306",sno:"1000",openid:"oQBWv4ghbC2NZVj3ahEDCupsYdko",sessionKey:"8OjAUP6FBAnu3g5aBfjvcA==",phoneType:!0,forzen:0,bankType:0,bankCard:null,faceUrl:null,birthday:null,sex:0,groupId:10,phone:"18583027254",userName:"1000",cusPassword:null,headPic:null};if(console.log("注册登录成功"),e.setStorageSync("userInfo",o),e.setStorageSync("userId",o.id),1==o.forzen)return console.log("您的账号被冻结了"),wx.hideLoading(),e.showModal({title:"提示",content:"账号已冻结，请联系客服:400-970-0989"}),void n.LoginFail();console.log("获取用户token"),n.getToken(o)})}})},getPhoneNumber:function(n){var t=this;if("getPhoneNumber:ok"==n.detail.errMsg){var r=e.getStorageSync("userId"),i=e.getStorageSync("userDetail"),s={id:r,iv:n.detail.iv,encryptedData:n.detail.encryptedData,sessionKey:i.sessionKey};(0,o.bindMobile)(s).then(function(n){1==n.code&&(console.log("绑定手机号码成功"),e.getStorageSync("userInfo").phoneType=!0,e.setStorageSync("userInfo"),wx.showToast({title:"绑定成功",icon:"success",duration:1e3,success:function(){t.goHome()}}))})}else console.log("拒绝获取手机号码"),this.goHome()},LoginFail:function(){e.removeStorageSync("token"),e.removeStorageSync("isLogin"),this.goHome()},goHome:function(){e.switchTab({url:"/pages/index/index"})},getToken:function(n){var t=this,r=this,i={grant_type:"password",username:n.sno+"-shu",password:"123456",client_id:"smart-heart",client_secret:"smart-heart-secret"};(0,o.getTokenData)(i).then(function(o){console.log("获取token登录成功======",o.access_token),e.setStorageSync("token",o.access_token),e.setStorageSync("isLogin",!0),wx.hideLoading(),console.log("是否已经获取用户电话号码",n.phoneType),n.phoneType?r.goHome():(t.stepStatus=2,t.tip="授权并同意获取你的电话号码")})}}};n.default=r}).call(this,t(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1).default)},76:
/*!*************************************************************************************************!*\
  !*** E:/HBuilderProjects/uni-App/pages/Authorize/wx/index.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************/
/*! no static exports found */function(e,n,t){"use strict";t.r(n);var o=t(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=style&index=0&lang=css& */77),r=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n.default=r.a},77:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderProjects/uni-App/pages/Authorize/wx/index.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,n,t){}},[[70,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/Authorize/wx/index.js.map