<template>
	<view class="page">
		<image class="hd-img" src="../../../static/card/family-hd.png" mode=""></image>
		<view class="f-content">
			<!-- 家庭账户统计 -->
			<view class="family-total flex-ct-bwt">
				<view class="total-gold">
					<view class="total">{{profit}}</view>
					<view class="font24">累计获得环保金</view>
				</view>
				<view class="entry flex-ct-end">
					<view class="item"
						v-for="(item,i) in entry"
						:key="i"
						@click="item.handler">
						<view class="icon">
							<image :src="item.icon" mode=""></image>
						</view>
						<view class="font24">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<image class="f-img" src="../../../static/card/family-img.png" mode=""></image>
			<!-- 家庭成员 -->
			<view class="members flex-ct">
				<view class="member"
					v-for="(item,i) in members"
					:key="i">
					<view class="head-pic">
						<view class="pic-box">
							<image v-if="item.headPic" class="user-photo" :src=" URL + item.headPic" mode=""></image>
							<image v-else class="user-photo" src="../../../static/index/head.png" mode=""></image>
						</view>
						<image v-show="i>0 && onManager" class="minus" src="../../../static/card/minus.png" mode=""></image>
					</view>
					<view class="font24">
						{{item.nickName}}
					</view>
					<view class="gold flex-ct-ct">
						<view class="font-num">
							{{item.profit}}
						</view>
						<image class="gold-icon" src="../../../static/money/gold.png" mode=""></image>
					</view>
				</view>
				<view class="member" @click="handlerShare">
					<view class="head-pic">
						<view class="pic-box flex-ct-ct">
							<image class="add-icon" src="../../../static/card/add.png" mode=""></image>
						</view>
					</view>
					<view class="add">
						添加
					</view>
				</view>
			</view>
			<!-- 邀请家人 -->
			<!-- #ifdef APP-PLUS -->
			<button class="add-f" @click="AppShare">邀请家人</button>
			<!-- #endif -->
			<!-- #ifndef APP-PLUS -->
			<button class="add-f" open-type="share">邀请家人</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import {familyByUserId } from '../../../api/index.js'
	import { URL } from '../../../common/index.js'
	
	export default{
		data(){
			return {
				URL:URL,
				entry:[
					{id:1,name:"二维码",icon:"/static/card/code.png",handler:this.deliveryCode},
					{id:2,name:"上传人脸",icon:"/static/card/face.png",handler:this.uploadFace},
					{id:3,name:"规则",icon:"/static/card/rule.png",handler:this.showRule},
					{id:4,name:"家人管理",icon:"/static/card/del.png",handler:this.managerMembers},
				],
				members:[
					// {"userId":326,"headPic":"/headpic/2f9eeebe2f934a58.jpg","profit":"116.31","nickName":"测试小号"},
					// {"userId":306,"headPic":null,"profit":"20.76","nickName":"D儿"},
					],
				userPics:{
					326:"/headpic/2f9eeebe2f934a58.jpg",
					306:"/static/index/head.png"
				},
				profit: "0.0",
				onManager:false,
			}
		},
		onLoad() {
			
		},
		methods:{
			deliveryCode(){
			    wx.navigateTo({
			      url: '/pages/ICCard/deliveryCode/index',
			    })
			},
			uploadFace() {
				wx.navigateTo({
				  url: '/pages/AI/face/index',
				})
			},
			showRule(){
				this.$MessageBox({
					visible:true,
					type:"html",
					msg:"1.账号绑定IC卡即可开通家庭账户<br> 2.开通家庭账户后，可邀请家人加入 <br> 3.家人加入后，可以查看家庭成员的投递记录<br> 4.加入家庭环保金后，家庭成员子账号上传人脸后都可使用智能垃圾箱人脸识别功能"
				})
			},
			managerMembers(){
				this.onManager = !this.onManager
				this.entry[this.entry.length-1].icon = this.onManager ? "/static/card/del-s.png" : '/static/card/del.png'
			},
			handler(item){
				console.log(item)
			},
			AppShare(){
				uni.share({
					provider:"weixin",
					title:"",
					scene:"",//provider 为 weixin 时必选
					imageUrl:"",
					success:()=>{
						
					}
				})
			}
			
		},
		onShareAppMessage(){
			let userInfo = wx.getStorageSync('userInfo')
			let userId = userInfo.userId
			let familyId = this.members[0].userId
			let photo = this.userPics[userId]
			return {
			  path: 'pages/tabBar/index/index?userId=' + userId + '&familyId=' + familyId+ '&familyName=' + userInfo.nickName + '&photo=' + photo,
			  title: userInfo.nickName + '，邀请您加入小红心，一起垃圾分类做环保~',
			  imageUrl: '/static/card/family-img.png',
			}
		}
	}
</script>

<style scoped> 
.page{
	overflow: hidden;
}
.hd-img{
	position: absolute;
	width: 100%;
	height: 402rpx;
	top: 0;
}

.f-content{
	margin: 308rpx 30rpx 0;
	box-shadow: 0rpx 8rpx 20rpx 0px rgba(84, 84, 114, 0.1);
	border-radius: 16rpx 16rpx 0 0;
	background-color: #fff;
	position: relative;
	z-index: 1;
}
.family-total{
	padding: 44rpx 22rpx 46rpx 28rpx;
}
.total-gold{
	width: 250rpx;
}
.total{
	font-size: 62rpx;
	font-family: DINAlternate-Bold, DINAlternate;
	font-weight: bold;
	color: #1E1E1E;
	line-height: 72rpx;
	height: 72rpx;
	margin-bottom: 10rpx;
}
.entry{
	flex:1;
}
.item{
	width: 25%;
	padding-top: 4rpx;
	text-align: center;
}

.icon{
	margin: 0 auto 14rpx;
	width: 64rpx;
	height: 64rpx;
}
.icon image{
	width: 100%;
	height: 100%;
}
.font32{
	font-size: 32rpx;
	font-weight: 600;
	color: #2F2F2F;
	line-height: 44rpx;
}
.font28{
	font-size: 28rpx;
	font-weight: 500;
	color: #1E1E1E;
	line-height: 40rpx;
}
.font24{
	font-size: 24rpx;
	color: #1E1E1E;
	line-height: 34rpx;
}
.font20{
	font-size: 20px;
	color: #888888;
	line-height: 28rpx;
}
.font-num{
	font-size: 30rpx;
	font-family: DINAlternate-Bold, DINAlternate;
	font-weight: bold;
	color: #FF5F62;
	line-height: 34rpx;
}
.font-gold{
	font-size: 32rpx;
	font-family: DINAlternate-Bold, DINAlternate;
	font-weight: bold;
	color: #EB4B5A;
	line-height: 38rpx;
}
.f-img{
	width: 690rpx;
	height: 372rpx;
	display: block;
	margin: 0 auto;
}
.members{
	padding: 46rpx 20rpx 0;
	flex-wrap: wrap;
}
.member{
	width: 25%;
	text-align: center;
	padding-bottom: 38rpx;
}
.head-pic{
	width: 90rpx;
	height: 90rpx;
	margin: 0 auto 20rpx;
	position: relative;
}
.pic-box{
	width: 100%;
	height: 100%;
	border-radius: 50%;
	overflow: hidden;
}
.pic-box .user-photo{
	width: 100%;
	height: 100%;
}
.minus{
	width: 32rpx;
	height: 32rpx;
	position: absolute;
	right: -6rpx;
	top: -4rpx;
}
.gold{
	margin-top: 26rpx;
}
.gold-icon{
	width: 28rpx;
	height: 28rpx;
	margin-left: 6rpx;
}
.pic-box .add-icon{
	width: 38rpx;
	height: 38rpx;
}
.add{
	width: 90rpx;
	height: 38rpx;
	background: #F4F4F4;
	border-radius: 19rpx;
	text-align: center;
	line-height: 38rpx;
	font-size: 20rpx;
	color: #909090;
	margin: 18rpx auto 0;
}
.add-f {
  width: 556rpx;
  height: 80rpx;
  line-height: 80rpx;
  /* background: rgba(235, 75, 90, 1); */
  background:rgba(255,95,98,1);
  border-radius: 44rpx;
  text-align: center;
  font-size: 34rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 42rpx;
}
</style>
