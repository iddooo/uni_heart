<template>
	<view class="page page-grey">
		<view class="header-container">
			<view class="user">
				<view class="pic radius" @click="goSetting">
					<!-- #ifdef MP-WEIXIN -->
						<open-data class="headpic" type="userAvatarUrl"></open-data>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
						<image v-if="userInfo.headPic" class="headpic"  :src="userInfo.headPic" mode=""></image>
						<image v-else class="headpic"  src="/static/index/head.png" mode=""></image>
					<!-- #endif -->
				</view>
				<view class="username">
					{{userInfo.nickname}}
				</view>
				<view class="level-box flex" @click="goWelfareRule">
					<view class="level-des">
						{{level}}
					</view>
					<view class="welfare">
						公益值:{{welfare}}
					</view>
				</view>
				<image class="level-icon" src="/static/mine/level-1.png" mode=""></image>
				<view class="sign">
					<image src="/static/mine/sign.png" mode=""></image>
					签到
				</view>	
			</view>
			<view class="money flex-ct-bwt">
				<view class="box" 
				v-for="(item,index) in grandTotal" :key="index"
				@click="linkTo(item)">
					<view class="name">{{item.name}}</view>
					<view class="count">{{item.count}}</view>
				</view>
			</view>
		</view>
		
		<view class="env-data" @click="goEnergyData">
			<view class="title">
				我的环保数据
			</view>
			<view class="env-content flex-ct-bwt">
				<view class="t-box">
					<view class="total">
						{{times}}
					</view>
					<view class="name pbt">
						环保次数
					</view>
				</view>
				<view class="t-box">
					<view class="total">
						{{days}}<text class="day">天</text><image class="flag" src="/static/mine/day.png" mode=""></image>
					</view>
					<view class="name pbt">
						已加入小红心环保行动
					</view>
				</view>
				<image class="fenlei" src="/static/mine/fenlei.png" mode=""></image>
			</view>
		</view>
		
		<!-- 常用服务 -->
		<view class="server-box">
			<view class="title">
				常用服务
			</view>
			<view class="servers">
				<view v-for="(item,index) in servers" :key="index"
				class="item"
				@click="linkTo(item)">
					<image :src="item.image" mode=""></image>
					<view class="s-name">{{item.name}}</view>
				</view>
			</view>
		</view>
		
		<!-- 我的二维码 -->
		<view v-show="show" class="pop" @click="show=false">
		</view>
		<view :class="['content',{'block':show}]">
		  <image class="head-s" src="/static/mine/head-s.png"></image>
		  <view class="user-photo">
			<!-- #ifdef MP-WEIXIN -->
				<open-data class="headpic" type="userAvatarUrl"></open-data>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
				<image v-if="userInfo.headPic" class="headpic"  :src="userInfo.headPic" mode=""></image>
				<image v-else class="headpic"  src="/static/index/head.png" mode=""></image>
			<!-- #endif -->
		  </view>
		  <view class="s-title">我的二维码</view>
		  <view class="code-ctn">
			<canvas class="code" :style="{'width':qrcode_s_w + 'px','height':qrcode_s_H + 'px'}" canvas-id="shareCanvas"></canvas>
			<view class="line">仅可用于督导员验证身份信息</view>
			<view class="save-btn" @click="saveMyCode">保存二维码</view>
		  </view>
		</view>
		  
		<MessageBox></MessageBox>
	</view>
</template>

<script>
	import { myMoney, getEnvData, getCodeInfo, getUserInfo } from '../../../api/index.js'
	import { goLoginPageTimeOut, getLevel } from '../../../common/index.js'
	import { mapMutations } from 'vuex'
	var drawQrcode = require('../../../utils/weapp.qrcode.esm.js')

	export default{
		data(){
			return{
				userInfo:{},
				grandTotal:[
					{name:"环保金",count:"0",url:undefined},//"/pages/Money/withdraw/index"
					{name:"累计收益",count:"0",url:undefined},
					{name:"我的积分",count:"0",url:"/pages/My/score/index",need:true}
				],
				welfare:0,
				level:'青铜',
				times:0,
				days:0,
				servers:[
					{id:1, name:"我的投递",image:"/static/mine/delivery.png",url:"/pages/My/delivery/index",need:true},
					{id:2, name:"人脸识别",image:"/static/mine/face.png",url:"/pages/AI/face/index",need:true},
					{id:3, name:"环保金明细",image:"/static/mine/gold.png",url:"/pages/My/gold/index",need:true},
					{id:4, name:"帮助中心",image:"/static/mine/help.png",url:"/pages/About/help/index"},
					{id:5, name:"二维码分享",image:"/static/mine/sharecode.png",url:undefined,callback:"showTips"},
					{id:6, name:"意见反馈",image:"/static/mine/feedback.png",url:"/pages/App/feedback/index"},//app新增
					{id:7, name:"账户与安全",image:"/static/mine/secure.png",url:"/pages/App/accountSecurity/index"},
					{id:8, name:"关于我们",image:"/static/mine/us.png",url:"/pages/About/aboutUs/index"},
				],
				isFinish:false, //二维码分享，供督导员扫码
				settingCodePage:'/pages/Setting/myCode/index',
				qrcode_s_w:100,
				qrcode_s_H:100,
				show:false,
				codeFilePath:undefined
			}
		},
		onShow(){
			this.userInfo = uni.getStorageSync('userInfo')
			this.getMyScore()
		},
		methods:{
			...mapMutations(['MessageBox']),
			getMyScore(){
				let userId = uni.getStorageSync('userId')
				myMoney(userId).then(res=>{
					if(res.code==1){
						this.grandTotal[0].count = res.data.currentProfit
						this.grandTotal[1].count = res.data.countProfit
						this.grandTotal[2].count = res.data.currScore
						this.welfare = res.data.currWelfare
						this.level = getLevel(this.welfare).des
					}
					
				})
				// getUserInfo(userId).then(res=>{
				// 	// todo 内容太少
				// 	/** "data":{"id":"306","sno":"1000","phone":"18583027254","nickname":"D儿","age":1,"sex":0,"createTime":"2020-03-23 14:16","lastLoginTime":"2020-11-11 16:50:21","address":"四川省成都市锦江区成都菁蓉汇","birthday":"2020-10-10"}*/
				// 	// this.userInfo = res.data
				// })
				
				getEnvData(userId).then(res=>{
					if(res.code==1){
						this.days = res.data.day
						this.times = res.data.deliverNum
					}
				})
				
				getCodeInfo(userId).then(res=>{
					if(res.code==0){
						this.isFinish = false
					}else{
						let qrStr = res.data.houseNum
						this.isFinish = true
						this.content = qrStr
						//设备像素比
						const W = uni.getSystemInfoSync().windowWidth;
						const rate = 750 / W;
						this.qrcode_s_w = 200 / rate //分享图片宽
						this.qrcode_s_H = 200 / rate //分享图片高
						// 画二维码
						this.drawMyCode()
					}
					this.servers.forEach(v=>{
						if(v.id==5){
							v.callback = this.isFinish ?  'showCode' : 'showTips'
						}
					})
				})
			},
			showCode(){
				this.show = true
			},
			showTips(){
				let _this = this
				this.MessageBox({
					title:'提示',
					msg:'生成二维码前请先完善用户信息',
					visible: true,
					reverse:false,
					buttons:['取消','确认'],
					success:()=>{
						uni.navigateTo({
							url:_this.settingCodePage
						})
					}
				})
			},
			goEnergyData(){
				let isLogin = uni.getStorageSync('isLogin')
				if(isLogin==''){
					goLoginPageTimeOut()
					return
				}
				
				uni.navigateTo({
					url:"/pages/My/energyData/index"
				})
			},
			goWelfareRule(){
				let isLogin = uni.getStorageSync('isLogin')
				if(isLogin==''){
					goLoginPageTimeOut()
					return
				}
				
				uni.navigateTo({
					url:"/pages/My/welfareRule/index"
				})
			},
			linkTo(item){
				let isLogin = uni.getStorageSync('isLogin')
				if(isLogin=='' && item.need){
					goLoginPageTimeOut()
					return
				}
				
				if(!item.url){
					item.callback && this[item.callback]()
					return
				}
				
				uni.navigateTo({
					url:item.url
				})
			},
			goSetting(){
				uni.navigateTo({
					url:"/pages/Setting/personal/index"
				})
			},
			drawMyCode(){
			    let that = this
			    drawQrcode({
					width: that.qrcode_s_H,
					height: that.qrcode_s_w,
					canvasId: 'shareCanvas',
					text: that.content,
					callback:(e)=>{
						// console.log('e',e)
						uni.canvasToTempFilePath({
						  canvasId: 'shareCanvas',
						  fail: function (res) {
							// console.log('fail tempfilepath',res)
						  },
						  success: function (res) {
							that.codeFilePath= res.tempFilePath
							// console.log(res,that.codeFilePath);
						  }
						})
					}
				})
			},
			saveMyCode(){
				// #ifdef H5
				var link = document.createElement('a');
				link.href = this.codeFilePath;
				link.download = 'code.jpg';
				link.click();
				// #endif
				
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.codeFilePath,
					success: (res) => {
						uni.showToast({
							title: '图片已保存至相册',
							icon: 'success',
							duration: 2000
						})
						this.show=false
					},
					fail: (err) => {
						console.log(err);
						uni.showToast({
							title: '保存失败',
							icon:"none"
						})
					}
				})
				// #endif
				
			},
		}
		
	}
</script>

<style scoped>
	.page{
		overflow: hidden;
		position: relative;
	}
	.pop{
	  position: fixed;
	  top: 0;
	  width: 100vw;
	  height: 100%;
	  background: rgba(0, 0, 0, 0.4043);
	  z-index: 9999;
	  z-index: 9;
	  transition: all 1s;
	}
	.content {
	  width: 610rpx;
	  height: 680rpx;
	  position: absolute;
	  left: 50%;
	  top: 50%;
	  margin-left: -305rpx;
	  transform: translateY(200%);
	  z-index: 99999;
	  transition: .5s;
	}
	.block{
		transform: translateY(-50%);
	}
	
	.head-s {
	  height: 240rpx;
	  width: 100%;
	  display: block;
	}
	
	.code-ctn {
	  height: 440rpx;
	  background-color: #fff;
	  border-radius: 0 0 15rpx 15rpx;
	  padding-top: 20rpx;
	}
	
	.code {
	  margin: 0 auto;
	  width: 200rpx;
	  height: 200rpx;
	  /* background-color: yellow; */
	}
	
	.line {
	  padding: 20rpx 0;
	  font-size: 28rpx;
	  text-align: center;
	  color: #7A7A7A;
	  line-height: 40rpx;
	  border-bottom: 1rpx solid rgba(28, 28, 28, 0.05);
	}
	
	.save-btn {
	  width: 464rpx;
	  height: 80rpx;
	  background: #FF5F62;
	  border-radius: 42rpx;
	  margin: 30rpx auto;
	  text-align: center;
	  line-height: 80rpx;
	  font-size: 32rpx;
	  color: #fff;
	  font-weight: 500;
	}
	.user-photo {
	  width: 106rpx;
	  height: 106rpx;
	  background: #FFFFFF;
	  border: 6rpx solid #FFFFFF;
	  box-sizing: content-box;
	  position: absolute;
	  left: 50%;
	  top: 0;
	  transform: translate(-50%, -50%);
	  border-radius: 50%;
	  overflow: hidden;
	}
	
	
	.s-title {
	  position: absolute;
	  left: 50%;
	  transform: translateX(-50%);
	  top: 114rpx;
	  font-size: 34rpx;
	  font-weight: 600;
	  color: #FFFFFF;
	  line-height: 48rpx;
	}
	
	.header-container{
		background-color: #FFFFFF;
	}
	.user{
		padding-left: 60rpx;
		padding-right: 38rpx;
		position: relative;
		overflow: hidden;
	}
	.user .pic{
		width: 150rpx;
		height: 150rpx;
		float: left;
		margin-right: 20rpx;
	}
	.radius{
		border-radius: 50%;
		overflow: hidden;
	}
	.headpic{
		width: 100%;
		height: 100%;
	}
	.username{
		padding: 10rpx 0 40rpx;
		font-size:40rpx;
		font-weight:600;
		color:rgba(59,59,59,1);
		line-height:56rpx;
	}
	.level-box{
		font-size: 20rpx;
	}
	.level-icon{
		width:44rpx;
		height:48rpx;
		margin-right: 20rpx;
		position: absolute;
		left: 166rpx;
		top: 102rpx;
	}
	.level-des{
		width:62rpx;
		height:32rpx;
		background:rgba(255,244,189,1);
		border-radius:6rpx;
		color: #BC682E;
		line-height: 32rpx;
		margin-right: 20rpx;
		margin-top: 4rpx;
		text-align: center;
	}
	.welfare{
		width:156rpx;
		height:32rpx;
		background:rgba(253,229,230,1);
		border-radius:6rpx;
		color: #E02020;
		margin-top: 4rpx;
		text-align: center;
	}
	.sign{
		width:112rpx;
		height:40rpx;
		background:rgba(254,217,0,1);
		border-radius:20rpx;
		font-size:20rpx;
		line-height: 40rpx;
		position: absolute;
		right: 38rpx;
		top: 102rpx;
	}
	.sign image{
		width:44rpx;
		height:44rpx;
		float: left;
		margin-left: -6rpx;
		margin-top: -2rpx;
		margin-right: 12rpx;
	}
	.money{
		padding: 44rpx 80rpx 30rpx;
	}
	.box{
		text-align: center;
	}
	.name{
		color:rgba(142,142,142,1);
		line-height:34rpx;
		font-size: 24rpx;
	}
	.count{
		font-size:48rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(59,59,59,1);
		line-height:56rpx;
		margin-top: 14rpx;
	}
	.env-data{
		width:710rpx;
		height:242rpx;
		background:rgba(255,255,255,1);
		border-radius:20px;
		margin: 30rpx auto;
	}
	.title{
		padding: 30rpx 0 0 30rpx;
		font-size:32rpx;
		font-weight:600;
		color:rgba(59,59,59,1);
		line-height:44rpx;
	}
	.env-content{
		padding-top: 38rpx;
		padding-left: 72rpx;
		text-align: center;
	}
	.total{
		font-size:48rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(59,59,59,1);
		line-height:56rpx;
		margin-bottom: 10rpx;
		display: inline-block;
		position: relative;
	}
	.day{
		position: absolute;
		right: -30rpx;
		top: 22rpx;
		font-size:20rpx;
		font-weight:500;
		color:rgba(47,47,47,1);
		line-height:28rpx;
	}
	.flag{
		width: 22rpx;
		height: 22rpx;
		position: absolute;
		right: -30rpx;
		top: 0;
	}
	.pbt{
		padding-bottom: 30rpx;
	}
	.fenlei{
		width: 198rpx;
		height: 134rpx;
	}
	.server-box{
		width:710rpx;
		background:rgba(255,255,255,1);
		border-radius:20rpx;
		margin: 30rpx auto;
	}
	.servers{
		display: flex;
		flex-wrap: wrap;
		padding-top: 44rpx;
	}
	.item{
		width: 25%;
		text-align: center;
		padding-bottom: 64rpx;
		padding-top: 6rpx;
	}
	.item image{
		width: 50rpx;
		height: 52rpx;
		margin-bottom: 14rpx;
	}
	.item .s-name{
		font-size:24rpx;
		font-weight:400;
		color:rgba(59,59,59,1);
		line-height:34rpx;
	}
	
</style>
