<template>
	<view class="page page-grey">
		<view class="address-box" @click="goAddress">
			<view v-if="!hasAddress" class="no-address">
					点击添加收货地址
			</view>
			<view v-else class="address">
				<view class="user flex-ct">
					<image class="site" src="/imgs/order/site.png" mode=""></image>
					<text class="marginlr">{{address.name}}</text>
					<text>{{address.phone}}</text>
				</view>
				<view class="address-des">
					地址:{{address.province}}{{address.city}}{{address.country}}{{address.address}}
				</view>
			</view>
			<view class="arrow">
				<image src="/static/index/arrow.png" mode=""></image>
			</view>
			<view class="line">
				<image src="/imgs/order/line.png" mode=""></image>
			</view>
		</view>
		
		<view class="product-box">
			<view class="heart flex-ct">
				<image src="/imgs/order/heart.png" mode=""></image>
				<text>小红心</text>
			</view>
			<view class="product">
				<div class="product-img">
					<image :src="IMG_URL + imgs[0].value"></image>
				</div>
				<view class="product-content">
					<view class="flex-ct-bwt mbt10">
						<view class="name">
							{{goods.name}}
						</view>
						<view class="score">
							{{goods.score}}<text class="unit">积分</text>
						</view>
					</view>
					<view class="product-des">
						{{goods.introduction}}
					</view>
					<view class="num-box flex-ct">
						<view class="rdc flex-ct-ct" @click="reduceNum">
							<image src="/imgs/order/rdc.png" mode=""></image>
						</view>
						<view class="num flex-ct-ct">
							{{num}}
						</view>
						<view class="add flex-ct-ct" @click="addNum">
							<image src="/imgs/order/add.png" mode=""></image>
						</view>
					</view>
					<view class="close">
						<image src="/imgs/order/x.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="express flex-ct-bwt">
				<view class="flex-ct">
					配送方式
					<view class="red">运送费</view>
				</view>
				<view>
					快递免邮
				</view>
			</view>
			<view class="total">
				共1件商品  小计：<text class="bold">{{total}}</text>积分
			</view>
		</view>
		
		<view class="bottom flex-ct-bwt">
			<view class="score-total">
				{{total}}<text class="jf">积分</text>
			</view>
			<button @click="createOrder" class="crt-ord">确认支付</button>
		</view>
	</view>
</template>

<script>
	import { getAddress, myMoney,addOrder } from '../../../api/index.js'
	import { IMG_URL } from '../../../common/index.js'
	export default{
		data(){
			return{
				IMG_URL:IMG_URL,
				imgs:[],
				goods:{},
				hasAddress:false,
				address:{},
				num:1,
				total:0,
				myScore:0
			}
		},
		onLoad(option) {
		},
		onShow() {
			let goods = uni.getStorageSync('goods');
			this.goods = JSON.parse(goods || '{}')
			this.imgs = JSON.parse(this.goods.img2 || '[]')
			this.total = this.num * Number(this.goods.score)
			
			this.getUserAddress()
			this.getMyScore()
		},
		methods:{
			getUserAddress(){
				let userId = uni.getStorageSync('userId')
				getAddress(userId).then(res=>{
					if(res.code==1){
						this.hasAddress = true
						this.address = res.data
						uni.setStorageSync('address', res.data)
					}
				})
			},
			reduceNum(){
				if(this.num<=1) return
				this.num--
				this.total = this.num * Number(this.goods.score)
			},
			addNum(){
				this.num++
				this.total = this.num * Number(this.goods.score)
			},
			createOrder(){
				if(!this.total || this.total==0) return
				
				if(this.total > this.myScore){
					uni.showToast({
						title:"您得积分不足",
						icon:"none"
					})
					return
				}
				
				let data = {
				  name: this.address.name,
				  phone: this.address.phone,
				  province: this.address.province,
				  city: this.address.city,
				  country: this.address.country,
				  address: this.address.address,
				  productName: this.goods.name,
				  score: this.goods.score,
				  num: this.num,
				  totalScore: this.total,
				  productId: this.goods.id
				}
				addOrder(data).then(res=>{
					if(res.code==1){
						uni.navigateTo({
							url:"../exchangeRecord/index"
						})
					}
				})
				
			},
			getMyScore(){
				let userId = uni.getStorageSync('userId')
				
				myMoney(userId).then(res=>{
					if(res.code == 1){
						this.myScore = res.data.currScore
					}
				})
			},
			goAddress(){
				uni.redirectTo({
					url:'../address/index'
				})
			}
			
		}
		
	}
</script>

<style scoped>
	image{
		display: block;
	}
	.address-box{
		width:710rpx;
		height:168rpx;
		background:rgba(255,255,255,1);
		border-radius:16rpx;
		overflow: hidden;
		position: relative;
		margin: 20rpx;
	}
	.line{
		position: absolute;
		bottom: 0;
	}
	.line image{
		height: 8rpx;
		width: 704rpx;
	}
	.arrow{
		width: 16rpx;
		height: 24rpx;
		position: absolute;
		right: 44rpx;
		top: 72rpx;
	}
	.arrow image{
		width: 100%;
		height: 100%;
		display: block;
	}
	.no-address{
		font-size:28rpx;
		font-weight:600;
		color:rgba(30,30,30,1);
		line-height:168rpx;
		text-align: center;
	}
	
	.user{
		padding-top: 18rpx;
		padding-left: 28rpx;
		padding-bottom: 10rpx;
		font-size:28rpx;
		font-weight:600;
		line-height:40rpx;
	}
	.marginlr{
		margin-left: 4rpx;
		margin-right: 24rpx;
	}
	.site{
		width: 24rpx;
		height: 30rpx;
	}
	.address-des{
		padding-left: 64rpx;
		padding-right: 114rpx;
		font-size:24rpx;
		font-weight:400;
		color:rgba(109,114,120,1);
		line-height:36rpx;
	}
	.product-box{
		width:710rpx;
		height:564rpx;
		background:rgba(255,255,255,1);
		border-radius:16rpx;
		margin: 20rpx;
	}
	.heart{
		padding-top: 24rpx;
		padding-left: 30rpx;
		font-size:26rpx;
		font-weight:500;
		color:rgba(0,0,0,1);
		line-height:36rpx;
		padding-bottom: 52rpx;
	}
	.heart image{
		width: 26rpx;
		height: 24rpx;
		margin-right: 6rpx;
	}
	.product{
		height: 200rpx;
		padding: 0 30rpx;
	}
	.product-img{
		float: left;
		width: 200rpx;
		height: 200rpx;
	}
	.product-img image{
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.product-content{
		padding-left: 218rpx;
		position: relative;
	}
	.mbt10{
		margin-bottom: 10rpx;
	}
	.name{
		font-size:30rpx;
		font-weight:600;
		line-height:42rpx;
	}
	.score{
		font-size:26rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:30rpx;
	}
	.unit{
		font-size:16rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:22rpx;
	}
	.product-des{
		font-size:22rpx;
		font-weight:400;
		line-height:32rpx;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;//控制行数
		overflow:hidden;
		margin-bottom: 46rpx;
	}
	.num-box{
		width:154rpx;
		height:38rpx;
		border:1rpx solid rgba(238,238,238,1);
	}
	.rdc{
		/* flex: 1; */
		width: 42rpx;
		height: 100%;
		border-right:1rpx solid rgba(238,238,238,1);
	}
	.rdc image{
		width: 14rpx;
		height: 2rpx;
	}
	.num{
		/* flex: 1; */
		flex-grow:1;
		font-size:24rpx;
		font-weight:500;
		color:rgba(93,93,93,1);
	}
	.add{
		/* flex: 1; */
		width: 42rpx;
		height: 100%;
		border-left:1rpx solid rgba(238,238,238,1);
	}
	.add image{
		width: 14rpx;
		height: 14rpx;
	}
	.close{
		position: absolute;
		right: 6rpx;
		bottom: 2rpx;
		background-color: #007AFF;
	}
	.close image{
		width: 100%;
		height: 100%;
	}
	.express{
		font-size:24rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:34rpx;
		padding: 66rpx 40rpx 84rpx;
	}
	.red{
		width:72rpx;
		height:24rpx;
		line-height: 24rpx;
		text-align: center;
		background:rgba(255,234,234,1);
		border:1rpx solid rgba(255,95,98,1);
		margin-left: 10rpx;
		color: rgba(255,95,98,1);
		font-size: 16rpx;
	}
	.total{
		text-align: right;
		padding-right: 28rpx;
		font-size:24rpx;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:34rpx;
	}
	.bold{
		font-size:40rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(30,30,30,1);
		line-height:48rpx;
	}
	.bottom{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height:114rpx;
		background:rgba(255,255,255,1);
		padding-left: 38rpx;
		padding-right: 18rpx;
		box-sizing: border-box;
	}
	.bottom button{
		margin: 0;
	}
	.crt-ord{
		width:176rpx;
		height:64rpx;
		background:rgba(255,95,98,1);
		border-radius:32rpx;
		font-size:28rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:64rpx;
		text-align: center;
	}
	.score-total{
		font-size:40rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(255,95,98,1);
		line-height:48rpx;
		margin-right: 4rpx;
	}
	.jf{
		font-size:22rpx;
		font-family:PingFangSC-Semibold,PingFang SC;
		font-weight:600;
		color:rgba(255,95,98,1);
		line-height:32rpx;
	}
	
	
</style>
