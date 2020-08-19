<template>
	<view class="page">
		<image class="logo" src="/static/authorize/weixin.png" mode="widthFix" />
		<view class="title">微信授权页面</view>
		<view class="profile">{{tip}}</view>
	
		<!-- 授权登录按钮 -->
		<button v-if="stepStatus === 1" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" class="weui-btn mini-btn">授权登录</button>
	
		<!-- 授权手机号按钮 -->
		<button v-if="stepStatus === 2" type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="weui-btn mini-btn">获取手机号码</button>
	</view>
</template>

<script>
	import { postCode, getTokenData, bindMobile } from '../../../api/index.js'
	
	export default {
		data(){
			return {
				stepStatus:1,
				// 授权提示信息
				tip: '授权并同意使用微信账号登录当前小程序',
			}
		},
		onLoad() {
			// console.log(mapActions)
			
		},
		methods:{
			getUserInfo(e){
				let detail = e.detail
				if(detail.errMsg == 'getUserInfo:ok'){
					console.log('获取用户信息ok======')
					uni.setStorageSync('userDetail',detail)
					
					console.log('开始注册登录')
					this.login()
				}else{
					console.log('拒绝获取用户信息')
					this.LoginFail()
				}
			},
			login(){
				let _this = this
				let invitedId = uni.getStorageSync('invitedId')
				let userDetail = uni.getStorageSync('userDetail')
				uni.showLoading({
					 title: '登陆中',
				})
				uni.login({
				  success: function (loginRes) {
				    // console.log(loginRes);
					let code = loginRes.code
					postCode({
						code:code,
						invitedId:invitedId,
						sex:userDetail.userInfo.gender==2?0:1,//1男 0女
						name:userDetail.userInfo.nickName,//微信昵称
					}).then(res=>{
						// 测试数据
						let userInfo = {"id":"306","sno":"1000","openid":"oQBWv4ghbC2NZVj3ahEDCupsYdko","sessionKey":"8OjAUP6FBAnu3g5aBfjvcA==","phoneType":true,"forzen":0,"bankType":0,"bankCard":null,"faceUrl":null,"birthday":null,"sex":0,"groupId":10,"phone":"18583027254","userName":"1000","cusPassword":null,"headPic":null}
		
						// if(res.data != null && res.code==1){
							console.log('注册登录成功')
							// let userInfo = res.data
							uni.setStorageSync('userInfo',userInfo)
							uni.setStorageSync('userId',userInfo.id)
							
							if(userInfo.forzen==1){
								console.log('您的账号被冻结了')
								wx.hideLoading()
								uni.showModal({
									title: '提示',
									content: '账号已冻结，请联系客服:400-970-0989',
								})
								_this.LoginFail()
								return
							}

							console.log('获取用户token')
							_this.getToken(userInfo)
							
							return
						// }
						console.log('注册登录失败')
						uni.showToast({
						    title: '登录失败了',
						    duration: 2000
						});
					})
				  }
				});
			},
			getPhoneNumber(e){
				// console.log(e)
				let _this = this
				let msg = e.detail.errMsg
				if(msg == 'getPhoneNumber:ok'){
					let id = uni.getStorageSync('userId')
					let userDetail = uni.getStorageSync('userDetail')
					let data = {
						id:id,
						iv:e.detail.iv,
						encryptedData:e.detail.encryptedData,
						sessionKey:userDetail.sessionKey
					}
					bindMobile(data).then(res=>{
						if(res.code==1){
							console.log('绑定手机号码成功')
							let userInfo = uni.getStorageSync('userInfo')
							userInfo.phoneType = true
							uni.setStorageSync('userInfo')
							
							wx.showToast({
								title: '绑定成功',
								icon: 'success',
								duration: 1000,
								success() {
								  _this.goHome()
								}
							})
						}
					})
				}else{
					console.log('拒绝获取手机号码')
					this.goHome()
				}
				
			},
			LoginFail(){
				uni.removeStorageSync('token')
				uni.removeStorageSync('isLogin')
				this.goHome()
			},
			goHome(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			},
			getToken(userInfo){
				let _this = this
				let form = {
				  grant_type: 'password',
				  username: userInfo.sno + '-shu',
				  password: '123456',
				  client_id: 'smart-heart',
				  client_secret: 'smart-heart-secret'
				}
				getTokenData(form).then(res=>{
					console.log('获取token登录成功======',res.access_token)
					uni.setStorageSync('token',res.access_token)
					uni.setStorageSync('isLogin',true)
					wx.hideLoading()
					
					console.log('是否已经获取用户电话号码',userInfo.phoneType)
					if(userInfo.phoneType){
						_this.goHome()
					}else{
						this.stepStatus = 2
						this.tip = '授权并同意获取你的电话号码'
					}
				})
			}
		}
	}
</script>

<style>
	.logo {
	  width:200rpx;
	  margin-top:180rpx;
	  margin-left:275rpx;
	}
	.title {
	  text-align: center;
	  margin-top:70rpx;
	}
	.profile {
	  text-align: center;
	  margin-top:30rpx;
	  font-size: 14px;
	  color:#888;
	}
	.mini-btn{
	  margin-top: 50rpx;
	  margin-left: 50px;
	  margin-right: 50px;
	}
	
</style>
