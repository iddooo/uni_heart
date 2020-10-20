<template>
	<view class="page page-grey">
		<view class="headbg">
			<image class="bg-img" src="/static/money/back-money.png" mode=""></image>
			<view class="flex">
				<view class="box">
					<view class="num">
						{{countProfit}}
					</view>
					<view class="name">
						累计收益
					</view>
				</view>
				<view class="box">
					<view class="num">
						{{count}}
					</view>
					<view class="name">
						累计投递次数
					</view>
				</view>
			</view>
			<view class="tabs flex-ct-ct" @click="changeActive">
				<view data-id="1" :class="['tb-item',active==1?'active':'']">
					可回收垃圾
				</view>
				<view data-id="2" :class="['tb-item',active==2?'active':'']">
					厨余垃圾
				</view>
			</view>
		</view>
		<view class="delivery-container">
			<view v-show="active==1" class="delivery-list">
				<RecyclableDeliver
					v-for="(item,i) in list"
					:key="i"
					:content="item"
					:activeIds="activeIds"
					@onFold="hanlderChange"
				></RecyclableDeliver>
			</view>
			<view v-show="active==2" class="delivery-list">
				<KwDeliver
					v-for="(item,i) in list"
					:key="i"
					:content="item"
				></KwDeliver>
			</view>
		</view>
		<view class="no-more" v-show="tips">
			——— 没有更多投递 ———
		</view>
		
	</view>
</template>

<script>
	import { myDelivery,myKwDelivery,myMoney }  from '../../../api/index.js'
	import KwDeliver from './kwDeliver.vue'
	import RecyclableDeliver from './RecyclableDeliver.vue'
	export default{
		components:{
			KwDeliver,
			RecyclableDeliver
		},
		data(){
			return{
				active:1,
				countProfit:0,
				count:0,
				page:1,
				userId:undefined,
				list:[],
				activeIds:[],
				onFetching:false,
				hasNextPage:true,
				tips:false,
			}
		},
		onLoad(){
			this.userId = uni.getStorageSync('userId')
			myMoney(this.userId).then(res=>{
				if(res.code==1){
					this.countProfit = res.data.countProfit
					this.count = res.data.count
				}
			})
			this.getData()
		},
		methods:{
			getData(){
				if(this.active==1){
					this.getDelivery()
				}else{
					this.getKwDelivery()
				}
			},
			changeActive(e){
				this.active = e.target.dataset.id
				this.page = 1
				this.list = []
				this.getData()
			},
			hanlderChange(id){
				var index = this.activeIds.indexOf(id)
				if(index==-1){
					this.activeIds.push(id)
				}else{
					this.activeIds.splice(index,1)
				}
			},
			getDelivery(){
				if(this.onFetching) return
				this.onFetching = true
				
				let data = {
					page:this.page,
					id:this.userId
				}
				myDelivery(data).then(res=>{
					this.onFetching = false
					if(res.code===1){
						this.list = this.list.concat(res.data.list)
						this.hasNextPage = res.data.hasNextPage
						this.page = res.data.hasNextPage ? ++this.page : this.page
					}
				})
			},
			getKwDelivery(){
				if(this.onFetching) return
				this.onFetching = true
				
				let data = {
					page:this.page,
					id:this.userId
				}
				myKwDelivery(data).then(res=>{
					this.onFetching = false
					if(res.code===1){
						this.list = this.list.concat(res.data.list)
						this.hasNextPage = res.data.hasNextPage
						this.page = res.data.hasNextPage ? ++this.page : this.page
					}
				})
			}
		},
		onReachBottom(){
			if(!this.hasNextPage){
				this.tips = true
				setTimeout(()=>{
					this.tips = false
				},2000)
				
				return
			}
			this.getData()
		}
		
	}
</script>

<style scoped>
	.headbg{
		padding: 20rpx 60rpx 30rpx;
		position: relative;
		z-index: 1;
		background-color: #fff;
	}
	.bg-img{
		width: 630rpx;
		height: 208rpx;
		background: linear-gradient(171deg, #FFA561 0%, #FF5F62 100%);
		border-radius: 8rpx;
		position: absolute;
		left: 60rpx;
		top: 20rpx;
		z-index: -1;
	}
	.box{
		width: 50%;
		text-align: center;
		color: #FFF;
	}
	.num{
		padding-top: 58rpx;
		padding-bottom: 18rpx;
		font-size: 48rpx;
		font-family: DINAlternate-Bold, DINAlternate;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 56rpx;
	}
	.name{
		font-size: 24rpx;;
		color: #FFFFFF;
		line-height: 34rpx;
	}
	.tabs{
		padding-top: 72rpx;
	}
	.tb-item{
		display: inline-block;
		width: 168rpx;
		height: 66rpx;
		border: 2px solid #FF5F62;
		background-color: #fff;
		line-height: 66rpx;
		color: #FF5F62;
		font-size: 26rpx;
		font-weight: 600;
		text-align: center;
	}
	.tb-item.active{
		background-color: #FF5F62;
		color: #fff;
		font-weight: 400;
	}
	.delivery-container{
		padding: 26rpx 20rpx 6rpx;
	}
	.no-more{
		text-align: center;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #CDCDCD;
		line-height: 28rpx;
		padding-bottom: 12rpx;
		background-color: #F6F6F6;
	}
	
</style>
