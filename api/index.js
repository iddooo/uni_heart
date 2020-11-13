//小程序支持commonJs规范，使用require和module.exports，exports
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
	 // 获取用户信息
	getUserInfo(userId){
		return fetch({
			url: '/user-api/user/userInfo/' + userId
		})
	},
	 // 开始投递
	deliveringToken(code){
		 return fetch({
			 url:'/wx/user/wx79d70ef10138edc1/login?code=' + code,
		 })
	 },
	userDelivering(data){
		 return fetch({
			 url:'/wx/user/wx79d70ef10138edc1/device/bind',
			 method:'POST',
			 data,
			 header: {
			   'Content-Type': 'application/json',
			   "token": data.token
			 }
		 })
	 },
	 // 可回收投递记录
	 myDelivery(data){
		 return fetch({
			 url:'/recover-api/deliver/wechat/deliverDetails/' + data.id + '/' + data.page + '/' + 10
		 })
	 },
	 // 厨余垃圾投递记录
	myKwDelivery(data){
		return fetch({
			url:'/kitchen/fl/getKwDeliver/' + data.id + '/' + data.page + '/' + 10,
		})
	},
	/** 首页 */
	//  轮播图 不需要token
	getBanners(type){
		return fetch({
			url: "/about-api/pic/wechat/banner/" + type,
			header:{
				'content-type':"application/json"
			}
		})
	},
	// 获取最近回收机 不需要token
	getNearest(location){
		let {
			longitude,
			latitude
		}=location
		return fetch({
			url: '/station-api/station/wechat/' + longitude + '/' + latitude,
		})
	},
	// 获取回收机资源分类信息 /**可回收分类*/
	getClassify(id){
		return fetch({
			url: '/station-api/resource/' + id
		})
	},
	// 获取最近的厨余垃圾
	getNearestKc(location){
		let {
			longitude,
			latitude
		}=location
		return fetch({
			url: '/kitchen/fl/' + longitude + '/' + latitude
		})
	},
	// 我的环保金
	myMoney(userId){
		return fetch({
			url: '/user-api/user/wechat/user/' + userId
		})
	},
	
	// 小区所有排名
	getAllRank(){
		return fetch({
			url: '/user-api/user/wechat/rank'
		})
	},
	// 排行榜
	getRankList(type){
		return fetch({
			url: '/user-api/user/wechat/rank/' + type
		})
	},
	
	/** 地图 */
	// 获取所有的厨余回收机
	getKwStationList(){
		return fetch({
			url: '/kitchen/fl/getKwStationList'
		})
	},
	// 获取所有可回收设备
	getAllStations(){
		return fetch({
			url: '/station-api/station/'
		})
	},
	// 获取单个的厨余回收机详情
	getKwStaion(station){
		let url='/kitchen/fl/getKwStaion/' + station.sno + '/' + station.lng + '/' + station.lat
		return fetch({
			url
		})
	},
	// 获取单个可回收设备的信息
	getSingleStation(station){
		let url='/station-api/station/' + station.id + '/' + station.lng + '/' + station.lat
		return fetch({
			url
		})
	},
	
	
	/** 分类 */
	// 获取分类列表
	getclassifyList(){
		return fetch({
			url: '/station-api/resourceShow/wechat/type'
		})
	},
	
	/** 积分 */
	//日常任务完成情况
	getDailyTask(today){
		return fetch({
			url: '/user-api/user/wechat/daily/' + today
		})
	},
	// 用户积分明细 分页
	scoreRecords(data){
		return fetch({
			url: '/user-api/user/wechat/score',
			method: "POST",
			data
		})
	},
	
	/** 商城 */
	// 商城列表
	productList(data){
		return fetch({
			url: '/score/product/getList',
			method: "POST",
			data
		})
	},
	// 创建订单
	addOrder(data){
		return fetch({
			url:"/score/order/wechat/add",
			method:"POST",
			data
		})
	},
	// 更新订单状态
	updateOrder(data){
		return fetch({
			url:'/score/order/wechat/update',
			method:"POST",
			data
		})
	},
	// 订单列表
	getOrderList(data){
		return fetch({
			url: '/score/order/wechat/list/' + data.page + '/' + data.pageSize + '/' + data.state
		})
	},
	// 获取地址
	getAddress:(userId) => {
		return fetch({url:'/user-api/user/getUserAdress/' + userId})
	},
	// 更新地址
	updateAddress(data){
		return fetch({
			url:'/user-api/user/addUserAdress',
			method:"POST",
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
	//判断微信第三方登录是否已注册
	// 请求参数：
	// openid ----->app openid
	// type -------> 2表示iosAPP端  3表示Android APP端
	wechatLogin(data){
		return fetch({
			url: '/user-api/wechatLogin/',
			method:'POST',
			data
		})
	},
	// 微信第三方登录绑定手机号
	// 请求参数：
	// phone  --->手机号
	// code  ----->验证码
	// openid ----->app openid
	// type -------> 2表示iosAPP端  3表示Android APP端
	bindPhone(data){
		return fetch({
			url: '/user-api/bindPhone/',
			method:'POST',
			data
		})
	},
	
	/**提现*/
	fundCash: (amount) => {
	    return fetch({
			url:'/fund-common-api/fund/cash', 
			method:'post', 
			data: { amount },
		})
	},
	// 体现详情
	applyMsg: (sno) => {
	    return fetch({
			url:'/fund-common-api/fund/' + sno
		})
	},
	
	// 环保数据
	getEnvData:(userId) => {
		return fetch({
			url:"/recover-api/deliver/getEnvironmentalData/"+userId
		})
	},
	
	/** 家庭账户 */
	// 根据用户id获取家庭账户数据
	  familyByUserId(userId){
	    return fetch({
			url: "/user-api/family/familyByUserId/"+userId,
		})
	  },
	  
	  // 删除家庭成员
	  delFamilyMember(userId){
	    return fetch({
			url:"/user-api/family/delFamilyMember/"+userId,
			method:'DELETE'
		})
	  },
	  
	  // 用户绑定ic卡
	  bindIcCard(data){
	    return fetch({
			url:"/user-api/IcCard/bindIcCard",
			method:'post',
			data
		})
	  },
	  
	  
	  /** 人脸识别开关 */
	  switchAI(){
		  return fetch({
			  url:"/user-api/user/ok1"
		  })
	  },
	  // 获取人脸识别头像
	  getFaceUrl(data){
	      return fetch({ 
			  url:'/user-api/user/base64Img',
			  method:'post',
			  data
		  })
	  },
	  
	  /** 环保金*/
	  // 环保金支出
	  expend(data){
		 return fetch({
			  url:'/fund-common-api/fund/wechat/' + data.id + '/' + data.page + '/' + data.pageSize
		 })
	  },
	  // 环保金扣除
	  deduct(data){
		  return fetch({
			  url:'/recover-api/deliver/deduct/' + data.id + '/' + data.page + '/' + data.pageSize
		  })
	  },
	  /**公益值*/
	  // 公益值明细
	  welfareRecord(data){
		  return fetch({
			  url:'/user-api/user/wechat/welfare',
			  method:'post',
			  data
		  })
	  },
	  /**我的二维码*/
	  // 查询二维码完善信息
	    getCodeInfo(id){
	      return fetch({
			  url:'/user-api/mycode/'+ id,
			})
	    },
	    // 完善二维码信息
	    updateUserInfo(data){
	      return fetch({
			  url:'/user-api/mycode',
			  method:'post',
			  data
		  })
	    },
	/**用户设置*/
	// 设置性别，生日
	setInfo(data){
	  return fetch({
		  url:'/user-api/user/setInfo',
		  method:'post',
		  data
	  })
	},
	
	// 常见问题
	commonProblem(data){
	  return fetch({
		  url:'/about-api/problem/wechat/' + 1
	  })
	},
	// 垃圾搜索
	typeList(data){
		return fetch({
			  url:'/about-api/garbage/typeList',
			  method:'post',
			  data
		})
	},
	searchKeywords(str){
		return fetch({
				  url:'/about-api/garbage/list/voice/' + str
		})
	},
	garbageFeedback(data){
		 return fetch({
		 	  url:'/about-api/garbage/feedback/',
		 	  method:'post',
		 	  data
		 })
	}
	
}

