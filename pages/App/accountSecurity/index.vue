<template>
	<view class="page">
		<view class="info">
			<view class="line flex-ct-bwt">
				<view class="name">
					手机号
				</view>
				<view class="arrow">
					{{phone ? phone : '未设置'}}
				</view>
			</view>
			<view class="line flex-ct-bwt">
				<view class="name">
					登录密码
				</view>
				<view :class="['arrow',{'f-grey':!password}]" @click="reserPwd">
					{{password ? "重置密码" : "未设置"}}
				</view>
			</view>
		</view>
		
		<view class="btm">
			<HButton @click="logout">退出当前账号</HButton>
		</view>
	</view>
</template>

<script>
	import HButton from '../../../components/HButton.vue'
	
	export default {
		components: {
			HButton
		},
		data(){
			return{
				phone:undefined,
				password:undefined,
				
			}
		},
		onLoad() {
			let userInfo = uni.getStorageSync('userInfo')
			this.phone = userInfo.phone
			this.password = userInfo.cusPassword ? true : false
		},
		methods:{
			reserPwd(){
				if(!this.phone){
					uni.showToast({
						title:"电话号码不能为空",
						icon:"none"
					})
					return
				}
				uni.navigateTo({
					url:"/pages/App/accountSetting/index"
				})
			},
			logout(){
				uni.removeStorageSync('isLogin')
				uni.removeStorageSync('token')
				uni.removeStorageSync('userInfo')
				uni.switchTab({
					url:"/pages/Tabbar/mine/index"
				})
			}
		}
	}
</script>

<style scoped>
	.line{
		padding: 30rpx;
		line-height: 40rpx;
		font-size: 28rpx;
	}
	.name{
		color: #000000;
	}
	.arrow{
		padding-right: 42rpx;
		position: relative;
		color: #2F2F2F;
	}
	.f-grey{
		color: #CDCDCD;
	}
	.f-grey::before{
		content: "";
		width: 12rpx;
		height: 12rpx;
		background: #FF5F62;
		position: absolute;
		left: -30rpx;
		top: 14rpx;
		border-radius: 50%;
	}
	.arrow::after{
		position: absolute;
		right: 10rpx;
		top: 50%;
		content: "";
		margin-top: -7rpx;
		width: 10rpx;
		height: 10rpx;
		border-width: 1rpx;
		border-style: solid;
		border-color: transparent #888888 #888888 transparent;
		transform: rotate(-45deg);
		transition: all .5s;
	}
	.btm{
		position: fixed;
		bottom: 120rpx;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
