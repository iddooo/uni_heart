<template>
	<view class="page">
		<Banner className="shop-banner" :banners="banners"></Banner>
		
		<view class="user-score">
			可用积分：{{myScore}}
		</view>
		<!-- 切换页面 -->
		<view class="tabs flex">
			<div class="bar flex-ct-ct" 
			v-for="(item,index) in tabbars" :key="index"
			@click="linkTo(item)">
				<image :src="item.image" mode=""></image>
				<text>{{item.name}}</text>
			</div>
		</view>
		<!-- 筛选 -->
		<view class="filter-box flex-ct-bwt">
			<view v-for="(item,index) in filterList" :key="index"
			:class="{'filter-item':true, 'flex-ct-ct':true,'is-active':curFilterIndex==index}"
			@click="filterGoods(item,index)">
				<view>{{item.name}}</view>
				<image v-if="index==2"
				:src="item[filterType && filterType.sort] || item.icon" mode=""></image>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="goods">
			<view class="no-goods" v-if="goods.length==0">
				<image src="/static/index/no-income.png" mode=""></image>
				<view>您暂时没有可兑换商品哦</view>
			</view>
			<view v-else class="good-box" v-for="(item,index) in goods" :key="index" @click="goDetails(item)">
				<view class="img">
					<image :src="IMG_URL + JSON.parse(item.img2 || '[]')[0].value" mode=""></image>
				</view>
				<view class="des">{{item.name}}</view>
				<view class="score">{{item.score}}<text class="unit">积分</text></view>
				<view class="price">{{item.price}}</view>
			</view>
		</view>
		<!-- 底部加载 -->
		<End :isLoading="isLoading"></End>
		<!-- 刷新 -->
		<view v-show="onFetch" class="bgfff flex-ct-ct">
			<image class="loading-gif" src="/static/shop/21324.gif"></image>
		</view>
	</view>
</template>

<script>
	import { productList,getBanners, myMoney } from '../../../api/index.js'
	import { IMG_URL, goLoginPageTimeOut } from '../../../common/index.js'
	import Banner from '../../../components/Banner.vue'
	import End from '../../../components/End.vue'
	
	export default {
		components:{
			Banner,
			End
		},
		data(){
			return{
				IMG_URL:IMG_URL,
				myScore:0,
				
				banners:[],
				
				tabbars:[
					{name:"赚取积分",image:"/static/shop/shop-jifen.png",url:"/pages/Score/score/index",need:true},
					{name:"兑换记录",image:"/static/shop/shop-duihuan.png",url:"/pages/Mall/exchangeRecord/index",need:true}
				],
				goods:[],
				page:1,
				isBottom:false,
				isLoading:false,
				onFetch:false,
				curFilterIndex:0,
				filterList:[
					{name:"推荐"},
					{name:"可兑换商品"},
					{name:"积分排序",'score desc':"/static/shop/arrow-red-b.png",'score asc':"/static/shop/arrow-red-t.png",'icon':"/static/shop/arrow-b.png"},
				],
				filterType:{},
			}
		},
		onLoad() {
		},
		onShow() {
			this.initData()
			this.getMyScore()
			this.getGoods()
		},
		onReachBottom(){
			this.getGoods()
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.onFetch = true
			this.page = 1
			this.isBottom = false
			this.getGoods()
			setTimeout(function () {
				this.onFetch = false
				uni.stopPullDownRefresh();
			}, 2000);
		},
		methods:{
			initData(){
				getBanners(2).then(res=>{
					this.banners = res.data.map(v=>{
						v.imgUrl = v.url
						return v
					})
				})
			},
			getGoods(){
				let data = Object.assign({},this.filterType,{page:this.page,pageSize:10,state:1})
				// console.log('isbottom',this.isBottom)
				if(this.isBottom){
					this.isLoading = true
					setTimeout(()=>{
						this.isLoading = false
					},2000)
					return
				} 
				if(this.page==1){
					this.onFetch = true
					setTimeout(()=>{
						this.onFetch = false
					},1000)
				}
				productList(data).then(res=>{
					this.isBottom = res.data.isLastPage
					if(this.page==1){
						this.goods = res.data.list
					}else{
						this.goods = this.goods.concat(res.data.list)
					}
					this.page++
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
			},
			filterGoods(item,index){
				this.curFilterIndex = index
				if(index==1){
					this.filterType = {userType: this.myScore}
				}else if(index==2){
					let sortdes = {sort: "score desc"}
					let sortasc = {sort: "score asc"}
					if(this.filterType.sort){
						this.filterType = this.filterType.sort=="score desc" ? sortasc : sortdes
					}else{
						this.filterType = sortdes
					}
				}else{
					this.filterType = {}
				}
				this.page = 1
				this.isBottom = false
				this.getGoods()
				
			},
			goDetails(item){
				uni.setStorageSync('goods', JSON.stringify(item));
				uni.navigateTo({
				    url: "/pages/Mall/goodsDetails/index"
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
			
			
		}
	}
</script>

<style>
	/* H5 需要使用deep*/
	/* scoped作用域无法用在小程序中 */
	.shop-banner /deep/ .swiper-container{
		height: 298rpx;
	}
	.shop-banner /deep/ .dots{
		bottom: 0rpx;
	}
	.shop-banner /deep/ .dot{
		width: 8rpx;
		height: 8rpx;
		border-radius: 4rpx;
		background: #D8D8D8;
		opacity: 1;
		margin-right: 10rpx;
	}
	
	.user-score{
		padding: 10rpx 10rpx 10rpx 14rpx;
		background:rgba(0,0,0,0.45);
		border-radius: 30rpx 0 0 30rpx;
		font-size:20rpx;
		color:rgba(255,255,255,1);
		line-height:28rpx;
		position: absolute;
		right: 36rpx;
		top: 38rpx;
	}
	
	.tabs{
		padding:24rpx 14rpx 12rpx;
	}
	.bar{
		font-size:28rpx;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:40rpx;
		flex: 1;
	}
	.bar image{
		width: 56rpx;
		height: 56rpx;
		margin-right: 8rpx;
	}
	.goods{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		background-color: #F6F6F6;
		padding: 28rpx 28rpx 0;
	}
	.good-box{
		width:336rpx;
		height:482rpx;
		background:rgba(255,255,255,1);
		border-radius:10rpx;
		overflow: hidden;
		margin-bottom: 28rpx;
	}
		
	.good-box .img{
		width:336rpx;
		height:332rpx;
	}
	.good-box image{
		width: 100%;
		height: 100%;
	}
	.des{
		margin-top: 20rpx;
		margin-bottom: 12rpx;
		padding-left: 14rpx;
		font-size:22rpx;
		color:rgba(51,51,51,1);
		line-height:32rpx;
	}
		
	.score{
		padding-left: 14rpx;
		font-size:32rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(255,95,98,1);
		line-height:38rpx;
		margin-bottom: 10rpx;
	}
	.score .unit{
		font-size:14rpx;
		font-weight:600;
		line-height:18rpx;
		margin-left: 4rpx;
	}
	.price{
		font-size:22rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(144,144,144,1);
		line-height:24rpx;
		text-decoration: line-through;
		padding-left: 14rpx;
	}
	.filter-box{
		padding: 22rpx 50rpx;
	}
	.filter-item{
		width:180rpx;
		height:54rpx;
		background:rgba(243,243,243,1);
		border-radius:4rpx;
		color: #333333;
		line-height: 54rpx;
		text-align: center;
		font-size: 24rpx;
	}
	.filter-item.is-active{
		color: #007AFF;
		color:rgba(255,95,98,1);
	}
		
	.filter-item image{
		width: 18rpx;
		height: 8rpx;
		margin-left: 4rpx;
	}
	.bgfff{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		z-index: 999;
	}
	.loading-gif{
		width: 160rpx;
		height: 211rpx;
	}
	.no-goods{
		background: #f6f6f6;
		width: 100%;
		text-align: center;
	}
	.no-goods image{
		display: block;
		width: 532rpx;
		height: 506rpx;
		margin: 112rpx auto 34rpx;
	}
	.no-goods view{
		font-size: 28rpx;
		color: rgba(144, 144, 144, .8);
	}
	
	
		
</style>
