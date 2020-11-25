<template>
	<view class="page">
		<view class="hd">
			<view class="welcome">
				{{title}}</view>
				
			<!-- 输入验证码 / 设置密码输入验证码-->
			<view v-if="step==1" class="code-logins">
				<view class="phone-num">{{String(phone).substr(0,3)+ ' ' + String(phone).substr(3,4) + ' ' + String(phone).substr(7,4)}}</view>
				<ValidCode :maxlength="maxlength" @finish="regCode"></ValidCode>
				<view class="tips" @click="getCode">
					00:{{seconds}}后 重发验证码
				</view>
				<button @click="checkCode" :class="{'is-disable':!isCodeValid}">提交</button>
			</view>
			
			<!-- 设置密码 -->
			<view v-if="step==2" class="password-logins">
				<view class="password-input input-box flex-ct-bwt">
					<image class="icon" src="/pages/Authorize/images/lock.png" mode=""></image>
					<input @input="regPwd" :type="pwdType" v-model="password" placeholder-class="login-plc" class="uni-input" placeholder="请输入密码"/>
					<image @click="changPwdType" class="oprt" src="/pages/Authorize/images/eye.png" mode=""></image>
				</view>
				<button @click="updatePwd" :class="{'is-disable':!isPwdValid}">提交</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import ValidCode from '../../../components/validCode.vue'
	import { getCode, phoneLogin, getTokenData,checkCode, updatePwd, passwordLogin} from '../../../api/login.js'
	
	export default {
		components:{
			ValidCode
		},
		data(){
			return {
				step:1, // 1 输入验证码 2设置密码 
				isCodeValid:false,
				isPwdValid:false,
				phone:undefined,
				cfmCode:undefined,
				maxlength:6,
				seconds:59,
				password:undefined,
				pwdType:'password',
				onSend:false,
				title:'输入验证码',
			}
		},
		watch:{
			step(val){
				switch(val){
					case 1:
					this.title = '输入验证码'
					break
					case 2:
					this.title = '设置密码'
					break 
					default:
					break
					
				}
			}
		},
		onShow() {
			this.getCode()
		},
		onLoad() {
			let userInfo = uni.getStorageSync('userInfo')
			this.phone = userInfo.phone
		},
		methods:{
			regPwd(e){
				let val = e&&e.detail.value || e&&e.target.value || this.password
				if(val && val!=''){
					this.isPwdValid = true
				}else{
					this.isPwdValid = false
				}
			},
			clearPhone(){
				this.phone = undefined
				this.regPhone()
			},
			regCode(finish,v){
				// console.log(finish,v);
				this.isCodeValid = finish ? true : false
				this.cfmCode = v
			},
			// 获取验证码
			getCode(){
				let timer = setInterval(()=>{
					if(this.seconds==0){
						clearInterval(timer)
						this.onSend = false
						return
					}
					this.seconds--
				},1000)
				//设置密码 type 2
				getCode({
					phone:this.phone,
					type:2
				}).then(res=>{
					uni.showToast({
						title:res.message
					})
				})
			},
			// 设置密码 验证手机号码
			checkCode(){
				if(!this.isCodeValid) return
				checkCode({
					phone:this.phone,
					code:this.cfmCode
				}).then(res=>{
					if(res.code==1){
						this.step = 2
					}
				})
			},
			changPwdType(){
				this.pwdType = this.pwdType=='password' ? 'text' : 'password' 
			},
			// 设置密码
			updatePwd(){
				updatePwd({
					phone:this.phone,
					pwd:this.password
				}).then(res=>{
					if(res.code==1){
						console.log('密码修改成功');
						uni.showToast({
							title: res.message,
							icon:"none"
						});
						uni.removeStorageSync('isLogin')
						uni.removeStorageSync('token')
						uni.removeStorageSync('userInfo')
						uni.switchTab({
							url:"/pages/Tabbar/mine/index"
						})
					}
				})
			}
			
		}
	}
</script>

<style>
	.hd{
		height: 70vh;
	}
	.welcome{
		padding: 112rpx 0 0 68rpx;
		font-size:48rpx;
		font-weight:500;
		color:rgba(47,47,47,1);
		line-height:66rpx;
	}
	.input-box{
		margin: 0 72rpx;
		padding: 32rpx 0;
		border-bottom: 2rpx solid #E2E2E2;
	}
	.input-box .icon{
		width: 36rpx;
		height: 48rpx;
		margin-right: 12rpx;
		padding: 10rpx;
	}
	.input-box .oprt{
		width: 34rpx;
		height: 36rpx;
		margin-left: 12rpx;
		padding: 10rpx;
	}
	.input-box .uni-input{
		flex: 1;
		font-size:32rpx;
		font-weight:400;
		line-height:44rpx;
		border: 0;
		outline: 0;
		padding: 0;
	}
	button{
		width:606rpx;
		height:88rpx;
		line-height: 88rpx;
		text-align: center;
		background:rgba(255,95,98,1);
		border-radius:4px;
		font-size:34rpx;
		font-weight:600;
		color:rgba(255,255,255,1);
		position: relative;
		z-index: 10;
	}
	uni-button:after{
		border: 0;
	}
	button.is-disable{
		background:rgba(255,205,206,1);
	}
	.phone-logins{
		padding-top: 100rpx;
	}
	.phone-input{
		margin-bottom: 140rpx;
	}
	.tips{
		font-size:30rpx;
		font-weight:400;
		color:rgba(144,144,144,1);
		line-height:42rpx;
		margin-top: 36rpx;
	}
	
	.center{
		text-align: center;
	}
	.third-party-logins .tips{
		font-size:26rpx;
		color: #BCBCBC;
		line-height:36px;
	}
	.third-party-logins image{
		display: block;
		width: 92rpx;
		height: 92rpx;
		margin: 44rpx auto 36rpx;
	}
	.protocol{
		font-size:22rpx;
		font-weight:400;
		color:rgba(188,188,188,1);
		line-height:32rpx;
		padding-bottom: 28rpx;
	}
	.protocol .red{
		color: #FF5F62;
	}
	.code-logins{
		padding: 22rpx 68rpx;
	}
	.phone-num{
		padding-left:4rpx;
		padding-bottom: 22rpx;
		color: #909090;
		font-size: 24rpx;
	}
	.code-logins .tips{
		color: #BBBBBB;
		margin-bottom: 80rpx;
		font-size:24rpx;
		line-height: 34rpx;
	}
	.password-logins{
		padding-top: 66rpx;
	}
	.password-input {
		margin-bottom: 62rpx;
	}
	.password-logins .tips{
		padding: 0 68rpx;
	}
	
</style>
