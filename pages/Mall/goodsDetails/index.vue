<template>
	<view class="page">
		<Banner :banners="imgs" className="goods-banner" @change="swiperChange">
			<view class="dots">
				<view>{{currentIndex + '/' + imgs.length}}</view>
			</view>
		</Banner>
		<view class="header-container">
			<!-- <swiper class="swiper" 
				:indicator-dots="indicatorDots" 
				:autoplay="autoplay" 
				interval="2000"
				@change="swiperChange">
				<swiper-item v-for="v in imgs" :key="v.id">
					<image class="banner-img" :src="IMG_URL + v.value"></image>
				</swiper-item>
			</swiper>
			<view class="dots">
				<view>{{currentIndex + '/' + imgs.length}}</view>
			</view> -->
			<view class="name">
				{{goods.name}}<text class="score">{{goods.score}}</text><text class="unit">积分</text>
			</view>
			<view class="des">
				{{goods.introduction}}
			</view>
		</view>
		<!-- 规则 -->
		<view class="rules">
			<view v-for="(item,index) in rules" :key="index" class="r-box">
				<view class="heading">
					{{item.title}}
				</view>
				<view class="content">
					{{item.content}}
				</view>
			</view>
		</view>
		<!-- 兑换 -->
		<view class="exchange" @click="exchange">
			确认兑换
		</view>
	</view>
</template>

<script>
	import { IMG_URL } from '../../../common/index.js'
	import Banner from '../../../components/Banner.vue'
	export default{
		components:{
			Banner
		},
		data(){
			return{
				IMG_URL:IMG_URL,
				indicatorDots:false,
				autoplay:true,
				goods:{},
				imgs:[],
				currentIndex:0,
				rules:[
					{title:"兑换规则",content:"用户凭积分兑换商品后将会从用户积分中扣除对应积分;"},
					{title:"发货说明",content:"积分商城仅支持中国大陆地区（不含港澳台地图）的兑换邮寄服务，兑换成功后将于3-7个工作日邮寄积分商品。"},
					{title:"售后服务",content:"积分商城在兑换后不可退换，请您在收货时确认物品完好再签收，若您收到的商品存在质量问题，请您及时拨打400-970-0989或联系在线客服，客服人员会为您核实处理的，请您放心。"},
				]
			}
		},
		onLoad(option) {
			
		},
		onShow() {
			let goods = uni.getStorageSync('goods');
			this.goods = JSON.parse(goods || '{}')
			let imgs = JSON.parse(this.goods.img2 || '[]')
			this.imgs = imgs.reduce((a,b)=>{
				let obj = {}
				obj.imgUrl = this.IMG_URL + b.value
				a.push(obj)
				return a
			},[])
		},
		methods:{
			swiperChange(e){
				this.currentIndex = e
			},
			exchange(item){
				uni.navigateTo({
					url:"/pages/Mall/createOrder/index"
				})
			}
		}
	}
</script>

<style>
	/* banner样式 */
	/* H5 需要使用deep*/
	/* scoped作用域无法用在小程序中 */
	.goods-banner /deep/ .swiper-container{
		height: 500rpx;
	}
	.dots{
		width:56rpx;
		height:26rpx;
		line-height: 26rpx;
		text-align: center;
		background:rgba(30,30,30,0.4);
		border-radius:15rpx;
		position: absolute;
		right: 50rpx;
		top: 480rpx;
		color: #FFFFFF;
		font-size: 16rpx;
	}
	
	.header-container{
		padding: 0rpx 36rpx 20rpx;
		border-bottom: 10rpx solid #F6F6F6;
	}
	.name{
		font-size:34rpx;
		font-weight:600;
		color:rgba(30,30,30,1);
		line-height:48rpx;
		margin-bottom:10rpx;
	}
	.name .score{
		color: #FF5F62;
		font-size: 40rpx;
		margin: 0 4rpx 0 12rpx;
	}
	.name .unit{
		color: #FF5F62;
		font-size: 22rpx;
	}
	.des{
		font-size:24rpx;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:40rpx;
		color: #333333;
	}
	.rules{
		padding: 22rpx 36rpx 130rpx;
		background-color: #FFFFFF;
	}
		
	.r-box{
		margin-bottom: 14rpx;
	}
	.heading{
		font-size:24rpx;
		font-weight:600;
		color:rgba(51,51,51,1);
		line-height:40rpx;
	}
	.content{
		font-size:22rpx;
		font-weight:400;
		color:rgba(121,121,121,1);
		line-height:40rpx;
	}
	.exchange{
		width:528rpx;
		height:80rpx;
		background:rgba(255,95,98,1);
		box-shadow:0rpx 4rpx 28rpx 0px rgba(255,95,98,0.41);
		border-radius:40rpx;
		line-height: 80rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 32rpx;
		position: fixed;
		bottom: 50rpx;
		left: 110rpx;
	}
</style>
