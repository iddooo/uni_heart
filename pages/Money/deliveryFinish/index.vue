<template>
	<view class="page">
		<view class="pic">
			<image src="/static/money/apply-success.png" mode=""></image>
		</view>
		<view class="tips">
			恭喜您，完成投递！
		</view>
		<view class="deliveryData">
			<view class="flex-ct-bwt item" v-for="(item,index) in deliveryData" :key="index">
				<view class="name flex-ct">
					<image :src="item.img" mode=""></image>
					<text class="style1">{{item.boxName}}</text>
				</view>
				<view class="kg">
					<text class="style2">{{item.count}}</text>
					<text class="style1">{{item.units}}</text>
				</view>
				<view class="gold flex-ct-end">
					<text class="style2">{{item.totalMoney}}</text>
					<image src="/static/money/gold.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="total">
			共收入<text class="t-num">{{total}}</text>环保金
		</view>
		
		<button class="plain" @click="goHome">返回首页</button>
	</view>  
</template>

<script>
	export default{
		data(){
			return{
				deliveryData:[
					{"id":"392390032457076736","boxName":"饮料瓶","totalMoney":0.04,"img":"http://47.103.51.182:8000/icon/bottles-s.png","units":"个","count":2.00},
					{"id":"392390032461271040","boxName":"纸类","totalMoney":0.70,"img":"http://47.103.51.182:8000/icon/page-s.png","units":"kg","count":1.82},
					{"id":"392390032465465344","boxName":"纺织物","totalMoney":0.30,"img":"http://47.103.51.182:8000/icon/clothes-s.png","units":"kg","count":0.08},
					{"id":"392390032469659648","boxName":"有害","totalMoney":0.00,"img":"http://47.103.51.182:8000/icon/harmful-s.png","units":"kg","count":0.08},
					],
				total:3.92
			}
		},
		onLoad() {
			
		},
		onShow() {
			let deliveryData = uni.getStorageSync('deliveryData')
		},
		methods:{
			goHome(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style>
	.pic{
		padding: 62rpx 0 30rpx 0;
		text-align: center;
	}
	.pic image{
		width: 294rpx;
		height: 244rpx;
	}
	.tips{
		font-size:40rpx;
		font-weight:600;
		line-height:56rpx;
		text-align: center;
		margin-bottom: 56rpx;
	}
	.deliveryData{
		border-top: 2rpx solid #E2E2E2;
		border-bottom: 2rpx solid #E2E2E2;
		width: 650rpx;
		margin: 0 auto;
		padding-top: 28rpx;
	}
	.item{
		padding: 0 20rpx 16rpx 26rpx;
	}
	.name,.kg,.gold{
		flex: 1;
	}
	.name image{
		width: 30rpx;
		height: 40rpx;
		margin-right: 18rpx;
	}
	.style1{
		font-size:26rpx;
		font-weight:400;
		line-height:36rpx;
	}
	.style2{
		font-size:28rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		line-height:32rpx;
	}
	.gold image{
		width: 28rpx;
		height: 28rpx;
		margin-left: 6rpx;
	}
	
	.total{
		text-align: right;
		margin-top: 20rpx;
		font-size:24rpx;
		font-weight:400;
		line-height:58px;
		padding-right: 70rpx;
	}
	.total .t-num{
		font-size:50rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(255,95,98,1);
	}
	.plain{
		margin-top: 182rpx;
		width:382rpx;
		height:80rpx;
		border-radius:4rpx;
		border:2rpx solid rgba(255,95,98,1);
		line-height: 80rpx;
		color: rgba(255,95,98,1);
		text-align: center;
		font-size:32rpx;
		font-weight:500;
	}
	
	
	
	
</style>
