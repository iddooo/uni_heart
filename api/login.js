const fetch  = require('./config.js').fetch

module.exports = {
	//获取token
	/** 请求体参数：获取token */
	// username：userName-shu  例：10801-shu
	// password：123456        注：固定不变
	// grant_type：password     注：固定不变
	// client_id：smart-heart     注：固定不变
	// client_secret：smart-heart-secret   注：固定不变
	getTokenData(data){
		return fetch({
			url: "/auth/oauth/token",
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			method: "POST",
			data,
		})
	},
	// 用户登录获取userId 不需要token
	postCode(data){
		return fetch({
			url: '/user-api/user/wechat/binding',
			method: 'POST',
			data
		})
	},
	// 绑定手机号
	bindMobile(data){
		return fetch({
			url: '/user-api/user/wechat/phone',
			method: 'POST',
			data
		})
	 },	
	 /** 登录 */
	 // 发送手机验证码
	 // 请求参数：phone -->需发送验证码手机号码  
	 // type =1 登录注册验证码 type=2重置密码验证码 type=3绑定手机号验证码
	 getCode(data){
	 	return fetch({
	 		url: '/user-api/phoneCode/' + data.phone + '/' + data.type
	 	})
	 },
	 // 手机号登陆注册
	 phoneLogin(data){
	 	return fetch({
	 		url: '/user-api/phoneLogin/' + data.phone + '/' + data.code
	 	})
	 },
	 // 修改/设置密码 验证短信验证码
	 checkCode(data){
	 	return fetch({
	 		url: '/user-api/checkCode/' + data.phone + '/' + data.code
	 	})
	 },
	 // 修改密码
	 updatePwd(data){
	 	return fetch({
	 		url: '/user-api/updatePwd/' + data.phone + '/' + data.pwd
	 	})
	 },
	 //账号密码登录
	 passwordLogin(data){
	 	return fetch({
	 		url: '/user-api/userByphone/' + data.phone + '/' + data.pwd
	 	})
	 },
}