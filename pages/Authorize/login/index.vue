<template>
	<view class="page">
		<view class="hd">
			<view class="welcome">
				{{title}}</view>
			<!-- 登录框 -->
			<!-- 验证码登录 ： 1 -> 2 -->
			<!-- 设置密码 ：  4 -> 5 -> 6-->
			<!-- 账号密码登录 ： 3 -->
			<!-- 微信号码登录 -->
			<!-- 输入手机号码获取验证码登录 / 输入手机号码设置密码 -->
			<view v-show="step==1 || step==4" class="phone-logins">
				<view class="phone-input input-box flex-ct-bwt">
					<image class="icon" src="/static/authorize/phone.png" mode=""></image>
					<input @input="regPhone" v-model="phone" class="uni-input" focus type="number" placeholder="请输入手机号码 (新号码自动注册)" />
					<image @click="clearPhone" class="oprt" src="/static/authorize/clear.png" mode=""></image>
				</view>
				<!-- 获取验证码 -->
				<button @click="getCode" :class="{'is-disable':!isPhoneValid}">获取验证码</button>
				<!-- 使用账号密码 -->
				<view v-show="step==1" class="tips center" @click="changeLoginMethodByPwd">账号密码登录</view>
			</view>
			
			<!-- 登录输入验证码 / 设置密码输入验证码-->
			<view v-if="step==2 || step==5" class="code-logins">
				<view class="phone-num">{{String(phone).substr(0,3)+ ' ' + String(phone).substr(3,4) + ' ' + String(phone).substr(7,4)}}</view>
				<ValidCode :maxlength="maxlength" @finish="regCode"></ValidCode>
				<view class="tips" @click="getCode">
					00:{{seconds}}后 重发验证码
				</view>
				<button v-show="step==2" @click="loginByCode" :class="{'is-disable':!isCodeValid}">登录</button>
				<button v-show="step==5" @click="checkCode" :class="{'is-disable':!isCodeValid}">提交</button>
			</view>
			
			<!-- 设置密码 -->
			<view v-if="step==6" class="password-logins">
				<view class="password-input input-box flex-ct-bwt">
					<image class="icon" src="/static/authorize/lock.png" mode=""></image>
					<input @input="regPwd" :type="pwdType" v-model="password" class="uni-input" placeholder="请输入密码"/>
					<image @click="changPwdType" class="oprt" src="/static/authorize/eye.png" mode=""></image>
				</view>
				<button @click="updatePwd" :class="{'is-disable':!isPwdValid}">提交</button>
			</view>
			<!-- 账号密码登录 -->
			<view v-if="step==3" class="password-logins">
				<view class="input-box flex-ct-bwt">
					<image class="icon" src="/static/authorize/phone.png" mode=""></image>
					<input @input="regPhone" v-model="phone" class="uni-input" placeholder="请输入手机号" />
					<image @click="clearPhone" class="oprt" src="/static/authorize/clear.png" mode=""></image>
				</view>
				<view class="password-input input-box flex-ct-bwt">
					<image class="icon" src="/static/authorize/lock.png" mode=""></image>
					<input @input="regPwd" :type="pwdType" v-model="password" class="uni-input" placeholder="请输入密码"/>
					<image @click="changPwdType" class="oprt" src="/static/authorize/eye.png" mode=""></image>
				</view>
				<button @click="loginByPwd" :class="{'is-disable':!isPhoneValid || !isPwdValid}">登录</button>
				<view class="tips flex-ct-bwt">
					<text @click="goStep(1)">验证码登录</text>
					<text @click="goStep(4)">忘记密码？</text>
				</view>
			</view>
		</view>
		<!-- 第三方登录 -->
		<view class="third-party-logins" v-show="step!=2">
			<view class="tips center">
				第三方账号登录
			</view>
			<image src="/static/authorize/wx.png" mode=""></image>
			<view class="protocol center">
				登录注册代表您已阅读并同意<text class="red">《小红心用户协议》</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import ValidCode from '../../../components/validCode.vue'
	import { getCode, phoneLogin, getTokenData,checkCode, updatePwd, passwordLogin} from '../../../api/index.js'
	export default {
		components:{
			ValidCode
		},
		data(){
			return {
				step:1, // 1 获取手机哈 2获取验证码 3用户和密码登录
				isPhoneValid:false,
				isCodeValid:false,
				isPwdValid:false,
				phone:undefined,
				cfmCode:undefined,
				maxlength:6,
				seconds:59,
				password:undefined,
				pwdType:'password',
				onSend:false,
				title:'欢迎登录小红心',
			}
		},
		watch:{
			step(val){
				switch(val){
					case 1:
					this.title = '欢迎登录小红心'
					break
					case 2:
					this.title = '输入验证码'
					break 
					case 3:
					this.title = '欢迎登录小红心'
					break
					case 4:
					this.title = '输入手机号'
					break
					case 5:
					this.title = '输入验证码'
					break
					case 6:
					this.title = '设置密码'
					break
					default:
					break
					
				}
			}
		},
		onShow() {
			this.regPhone()
			this.regPwd()
		},
		onLoad(e) {
			console.log(e);
			this.step = e.step ? e.step : 1
		},
		methods:{
			goStep(v){
				this.step = v
				this.regPhone()
				this.regPwd()
			},
			changPwdType(){
				this.pwdType = this.pwdType=='password' ? 'text' : 'password' 
			},
			clearPhone(){
				this.phone = undefined
				this.regPhone()
			},
			regPhone(e){
				let val = e && e.detail.value || this.phone
				let reg = /^1[3456789]\d{9}$/
				if(reg.test(val)){
						this.isPhoneValid = true
				}else{
					this.isPhoneValid = false
				}
			},
			regPwd(e){
				let val = e&&e.detail.value || e&&e.target.value || this.password
				if(val && val!=''){
					this.isPwdValid = true
				}else{
					this.isPwdValid = false
				}
			},
			regCode(finish,v){
				// console.log(finish,v);
				this.isCodeValid = finish ? true : false
				this.cfmCode = v
			},
			// 获取验证码
			getCode(){
				if(!this.isPhoneValid || this.onSend) return
				//手机号码登录 type 1
				if(this.step==1){
					this.goStep(2)
					this.type = 1
				}
				//设置密码 type 2
				if(this.step==4){
					this.goStep(5)
					this.type = 2
				}
				
				let timer = setInterval(()=>{
					if(this.seconds==0){
						clearInterval(timer)
						this.onSend = false
						return
					}
					this.seconds--
				},1000)
				//获取电话号码 todo
				getCode({
					phone:this.phone,
					type:this.type
				}).then(res=>{
					uni.showToast({
						title:res.message
					})
				})
			},
			// 通过code登录
			loginByCode(){
				if(!this.isCodeValid) return
				phoneLogin({
					phone:this.phone,
					code:this.cfmCode
				}).then(res=>{
					if(res.code==1){
						this.loginSucces(res.data)
					}
				})
			},
			// 通过密码登录
			changeLoginMethodByPwd(){
				this.goStep(3);
				this.$MessageBox({
					title: '温馨提示',
					type: 'HTML',
					msg: '1.第一次登录建议使用验证码登录或微信登录；<br>2.若使用账户密码登录请点击忘记密码，重新设置密码。；',
					buttons: ['确认'],
					reverse: true,
					visible: true
				})		
			},
			loginByPwd(){
				if(!this.isPhoneValid || !this.isPwdValid) return
				// console.log('phone',this.phone)
				// console.log('password',this.password)
				// 1.验证账号密码 2获取token
				passwordLogin({
					phone:this.phone,
					pwd:this.password
				}).then(res=>{
					if(res.code==1){
						this.loginSucces(res.data)
					}
				})
			},
			loginSucces(data){
				console.log('注册登录成功')
				let userInfo = data
				uni.setStorageSync('userInfo',userInfo)
				uni.setStorageSync('userId',userInfo.id)
				
				if(userInfo.forzen==1){
					console.log('您的账号被冻结了')
					uni.showModal({
						title: '提示',
						content: '账号已冻结，请联系客服:400-970-0989',
					})
					this.LoginFail()
					return
				}
				
				console.log('获取用户token')
				this.getToken(userInfo)
			},
			// 设置密码 验证手机号码
			checkCode(){
				if(!this.isCodeValid) return
				checkCode({
					phone:this.phone,
					code:this.cfmCode
				}).then(res=>{
					if(res.code==1){
						console.log(res)
						this.goStep(3)
					}
				})
			},
			// 设置密码
			updatePwd(){
				updatePwd({
					phone:this.phone,
					pwd:this.password
				}).then(res=>{
					if(res.code==1){
						console.log('密码修改成功');
						this.uni.showToast({
							title: res.message,
							icon:"none"
						});
						// 重新登录
						this.goStep(3)
					}
				})
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
					uni.showToast({
						title:'登录成功',
						icon:'none'
					})
					this.goHome()
				})
			},
			
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
	.uni-input::-webkit-input-placeholder {
		color: #CDCDCD;
		font-size:32rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		line-height:44rpx;
	  }
	  .uni-input::-moz-input-placeholder {
		color: #CDCDCD;
		font-size:32rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		line-height:44rpx;
	  }
	  .uni-input::-ms-input-placeholder {
		color: #CDCDCD;
		font-size:32rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		line-height:44rpx;
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
