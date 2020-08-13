export const IMG_URL = 'https://heart-score-mall.oss-cn-hangzhou.aliyuncs.com/goods/'

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