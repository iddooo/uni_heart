var jweixin = require('jweixin-module');  
export default {  
    //判断是否在微信中    
    isWechat: function() {  
        var ua = window.navigator.userAgent.toLowerCase();  
        if (ua.match(/micromessenger/i) == 'micromessenger') {  
            //console.log('是微信客户端')  
            return true;  
        } else {  
            //console.log('不是微信客户端')  
            return false;  
        }  
    },  
    initJssdk:function(callback){  
        var uri = encodeURIComponent(window.location.href.split('#')[0]);//获取当前url然后传递给后台获取授权和签名信息  
		//1.在公众号平台配置合法域名
		// let redirect_uri = "https://heart.synpowertech.com/"
		// let APPID = "wx2a369adaf30b31e1"
		//2.请求以下链接获取code
		// https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=redirect_uri&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
		//3.获取code后，请求以下链接获取access_token： 
		// let SECRET = "ea472188db8d09cff79d5650afe1e10e"
		// https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
		// 结果{
		// 	  "access_token":"ACCESS_TOKEN",
		// 	  "expires_in":7200,
		// 	  "refresh_token":"REFRESH_TOKEN",
		// 	  "openid":"OPENID",
		// 	  "scope":"SCOPE" 
		// 	}
		// 当access_token超时后，可以使用refresh_token进行刷新，请求以下链接获取access_token：
		// https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN
		//4.获取jsapi_ticket是公众号用于调用微信JS接口的临时票据
		// http请求方式: GET https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=wx_card
		//{
		//   "errcode":0,
		//   "errmsg":"ok",
		//   "ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKdvsdshFKA",
		//   "expires_in":7200
		// }
		// 5. 签名算法
		// string = jsapi_ticket=jsapi_ticket&noncestr=noncestr&timestamp=timestamp&url=redirect_uri
		// signature=sha1(string)
        uni.request({  
            url:'',//你的接口地址  
            data:{  
                url:uri  
            },  
            success:(res)=>{  
                //返回需要的参数appId,timestamp,noncestr,signature等  
                //注入config权限配置  
                jweixin.config({  
                    debug: false,  
                    appId: res.data.signPackage.appId,  
                    timestamp: res.data.signPackage.timestamp,  
                    nonceStr: res.data.signPackage.nonceStr,  
                    signature: res.data.signPackage.signature,  
                    jsApiList: [//这里是需要用到的接口名称  
                        'checkJsApi',//判断当前客户端版本是否支持指定JS接口  
                        'onMenuShareAppMessage',//分享接口  
                        'getLocation',//获取位置  
                        'openLocation',//打开位置  
                        'scanQRCode',//扫一扫接口  
                        'chooseWXPay',//微信支付  
                        'chooseImage',//拍照或从手机相册中选图接口  
                        'previewImage',//预览图片接口  
                        'uploadImage'//上传图片  
                    ]  
                });  
                if (callback) {  
                    callback(res.data);  
                }  
            } ,
			fail: (err) => {
				alert(err)
			}
        })  
    },
    //在需要定位页面调用  
    getlocation: function(callback) {  
        if (!this.isWechat()) {  
            //console.log('不是微信客户端')  
            return;  
        }  
        this.initJssdk(function(res) {  
            jweixin.ready(function() {  
                jweixin.getLocation({  
                    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'  
                    success: function (res) {  
                        // console.log(res);  
                        callback(res)  
                    },  
                    fail:function(res){  
                        console.log(res)  
                    },  
                    // complete:function(res){  
                    //     console.log(res)  
                    // }  
                });  
            });  
        });  
    },  
    openlocation:function(data,callback){//打开位置  
        if (!this.isWechat()) {  
            //console.log('不是微信客户端')  
            return;  
        }  
        this.initJssdk(function(res) {  
            jweixin.ready(function() {  
                jweixin.openLocation({//根据传入的坐标打开地图  
                    latitude:data.latitude,  
                    longitude:data.longitude  
                });  
            });  
        });  
    },  
    chooseImage:function(callback){//选择图片  
        if (!this.isWechat()) {  
            //console.log('不是微信客户端')  
            return;  
        }  
        //console.log(data);  
        this.initJssdk(function(res) {  
            jweixin.ready(function() {  
                jweixin.chooseImage({  
                    count:1,  
                    sizeType:['compressed'],  
                    sourceType:['album'],  
                    success:function(rs){  
                        callback(rs)  
                    }  
                })  
            });  
        });  
    },  
    //微信支付  
    wxpay: function(data,callback) {  
        if (!this.isWechat()) {  
            //console.log('不是微信客户端')  
            return;  
        }  
        this.initJssdk(function(res) {  
            jweixin.ready(function() {  
                jweixin.chooseWXPay({  
                    timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
                    nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位  
                    package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）  
                    signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
                    paySign: data.paysign, // 支付签名  
                    success: function (res) {  
                        // console.log(res);  
                        callback(res)  
                    },  
                    fail:function(res){  
                        callback(res)  
                    },  
                    // complete:function(res){  
                    //     console.log(res)  
                    // }  
                });  
            });  
        });  
    }  
}  