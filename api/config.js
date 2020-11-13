//测试
let BASE_URL = "https://heart.synpowertech.com"

import { goLoginPageTimeOut } from '../common/index.js'

module.exports = {
	fetch(option){
		let token = uni.getStorageSync('token');
		// 测试
		// // #ifdef H5
		// token = 'a04b6eac-46e6-427a-ad70-cd4c7a629cf4'
		// // #endif
		return new Promise((resolve,reject) => {
			uni.request({
				url:BASE_URL + option.url,
				method:option.method || 'GET',// 必须大写
				header:option.header || {
					'content-type':"application/json",
					'Authorization':token && 'bearer ' + token
				},
				data:option.data,
				success:(res)=>{
					if(res.data.status=='401' || res.statusCode == 401){
						goLoginPageTimeOut()
					}
	
					if(res.data.code==0){
						let title = '服务器开小差了，请再试一次'
						if(res.data.message!='' || res.data.message != null){
							title = res.data.message || res.data.msg
						}
						uni.showToast({
							title:title,
							icon:"none",
							duration:2000
						})
					}
					resolve(res.data)
				},
				fail:(err)=>{
					console.log(err)
					reject(err)
				}
			})
		})
	},
	uploadOss(path){
		let token = uni.getStorageSync('token')
		return new Promise((resolve, reject)=>{
			uni.uploadFile({
				url: BASE_URL + '/recover-api/feedback/uploadFbPic',
				filePath: path,
				name: 'file',
				header:{
				  'Authorization':"bearer " + token
				},
				success:(res)=>{
					// console.log(res)
					if(res.statusCode!=200){
						uni.showToast({
						  title: '图片上传报错',
						  icon:"none"
						})
						resolve(null)
					}
							
					let data = JSON.parse(res.data)
					resolve(data.data)
								
				},
				fail: (err) => {
					reject(err)
				}
			  })
		})
	},
	// 用户设置头像
	uploadHeadPic(data){
		let token = uni.getStorageSync('token')
		return new Promise((resolve, reject)=>{
			uni.uploadFile({
				url: BASE_URL + '/user-api/uploadHeadPic/' + data.userId,
				filePath: data.path,
				name: 'file',
				header:{
				  'Authorization':"bearer " + token
				},
				success:(res)=>{
					console.log(res)
					if(res.statusCode!=200){
						uni.showToast({
						  title: '图片上传报错',
						  icon:"none"
						})
						resolve(null)
					}
							
					let data = JSON.parse(res.data)
					resolve(data)	
				},
				fail: (err) => {
					reject(err)
				}
			  })
		})
	},
	// 语音识别
	uploadVoice(path){
		let token = uni.getStorageSync('token')
		return new Promise((resolve, reject)=>{
			uni.uploadFile({
				url: BASE_URL + '/about-api/garbage/webVoice',
				filePath: path,
				name: 'file',
				header:{
				  'Authorization':"bearer " + token
				},
				success:(res)=>{
					// console.log(res)
					if (res.statusCode == 401) {
						console.log('===token失效===')
						app.goLoginPageTimeOut()
					}

					let data = JSON.parse(res.data)
					resolve(data)
					
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	},
	// 人脸识别
	uploadFace(data){
		let token = uni.getStorageSync('token')
		//  上传人脸 / 重新上传
		let url = BASE_URL + '/user-api/user/facePic/' + data.userId
		if(data.hasPhoto){
			url = BASE_URL + '/user-api/user/updateFace/' + data.userId
		}
		return new Promise((resolve,reject)=>{
			uni.uploadFile({
				url: url,
				header: {
					'Authorization': 'bearer ' + token
				},
			    filePath: data.tempFilePath,
			    name: 'photo',
			    formData: {
			        'faceBase64': data.faceBase64
			    },
				success(res) {
					if(res.statusCode!=200){
						uni.showToast({
						  title: '照片上传失败，请重新拍摄',
						  icon:"none"
						})
						resolve(null)
					}
					let data = JSON.parse(res.data)
					resolve(data)
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	}
} 