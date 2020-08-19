export const IMG_URL = 'https://heart-score-mall.oss-cn-hangzhou.aliyuncs.com/goods/'

export const URL = 'https://xiaohongxinheadpic.oss-cn-hangzhou.aliyuncs.com'

export const goLoginPageTimeOut = (str="登录后才能获取更多信息")=>{
	uni.showModal({
		title:"提示",
		content:str,
		confirmText: '去登录',
		confirmColor: '#1E1E1E',
		success:(res)=>{
			if (res.confirm) {
				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url:"/pages/Authorize/wx/index"
				})
				// #endif
				// #ifdef APP-PLUS || H5
				uni.navigateTo({
					url:"/pages/Authorize/login/index"
				})
				// #endif 
			}
		}
	})
	uni.removeStorageSync('token')
	uni.removeStorageSync('isLogin')
}

export const getLevel = (gold)=>{
	switch (true){
		case gold >= 100000:
			return {
				des:'王者',
				level:5
			};
		case  gold >= 50000 && gold < 100000:
			return {
				des:'钻石',
				level:4
			};
		case gold >= 10000 && gold < 50000:
			return {
				des:'铂金',
				level:3
			};
		case gold >= 5000 && gold < 10000:
			return {
				des:'黄金',
				level:2
			};
		case gold >= 1000 && gold < 5000:
			return {
				des:'白银',
				level:1
			};
		case gold < 1000:
			return {
				des:'青铜',
				level:0
			};
		default:
		break;
	}
}

export default {
	goLoginPageTimeOut,
	getLevel
}