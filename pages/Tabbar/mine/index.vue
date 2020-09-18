<template>
	<view class="page page-grey">
		<view class="header-container">
			<view class="user">
				<view class="pic radius">
					<image src="/static/mine/img.png" mode=""></image>
				</view>
				<view class="username">
					AWER BORRY
				</view>
				<view class="level-box flex" @click="goWelfareRule">
					<view class="level-des">
						青铜
					</view>
					<view class="welfare">
						公益值:12983
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
	</view>
</template>

<script>
	import { myMoney } from '../../../api/index.js'
	import { goLoginPageTimeOut } from '../../../common/index.js'
	
	export default{
		data(){
			return{
				grandTotal:[
					{name:"环保金",count:"0",url:undefined},//"/pages/Money/withdraw/index"
					{name:"累计收益",count:"0",url:undefined},
					{name:"我的积分",count:"0",url:"/pages/My/score/index",need:true}
				],
				welfare:0,
				times:0,
				days:0,
				servers:[
					{name:"我的投递",image:"/static/mine/delivery.png",url:"/pages/My/delivery/index",need:true},
					{name:"人脸识别",image:"/static/mine/face.png",url:"/pages/AI/face/index",need:true},
					{name:"环保金明细",image:"/static/mine/gold.png",url:"/pages/My/gold/index",need:true},
					{name:"帮助中心",image:"/static/mine/help.png",url:"/pages/About/help/index"},
					{name:"二维码分享",image:"/static/mine/sharecode.png",url:undefined},//app新增
					{name:"意见反馈",image:"/static/mine/feedback.png",url:undefined},//app新增
					{name:"账户与安全",image:"/static/mine/secure.png",url:undefined},
					{name:"关于我们",image:"/static/mine/us.png",url:"/pages/About/aboutUs/index"},
				]
			}
		},
		onShow(){
			this.getMyScore()
		},
		methods:{
			getMyScore(){
				let userId = uni.getStorageSync('userId')
				myMoney(userId).then(res=>{
					if(res.code==1){
						this.grandTotal[0].count = res.data.currentProfit
						this.grandTotal[1].count = res.data.countProfit
						this.grandTotal[2].count = res.data.currScore
						this.welfare = res.data.currWelfare
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
					url:"/pages/Score/welfareRule/index"
				})
			},
			linkTo(item){
				let isLogin = uni.getStorageSync('isLogin')
				if(isLogin=='' && item.need){
					goLoginPageTimeOut()
					return
				}
				
				if(!item.url) return
				
				uni.navigateTo({
					url:item.url
				})
			}
		}
		
	}
</script>

<style scoped>
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
	.user .pic image{
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
