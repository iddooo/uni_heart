<template>
	<view class="content" @click="toggoleActive">
		<view class="loc-box flex-ct-bwt">
			<view class="loc flex-ct">
				<image src="/static/index/site.png" mode=""></image>
				<text>{{content.complex}}</text>
			</view>
			<view class="content-gold">
				<text>+</text>{{content.profit}}
			</view>
		</view>
		<view class="sencond-box flex-ct-bwt">
			<view>
				<view class="font-sub">
					{{content.time}}
				</view>
				<view v-show="activeIds.includes(content.id)" class="font-sub">
					投递单号:{{content.deliverNo}}
				</view>
			</view>
			<view :class="['arrow',activeIds.includes(content.id) ? 'active' :'']">
				<image src="/static/order/arrow.png" mode=""></image>
			</view>
		</view>
		<view class="list" v-show="activeIds.includes(content.id)">
			<ResourceList :list="content.deliverDetailResult"></ResourceList>
		</view>
	</view>
	
</template>

<script>
	import ResourceList from '../../../components/ResourceList.vue'
	
	export default{
		components:{
			ResourceList
		},
		props:{
			content:{
				type:Object,
				default:()=>{
					return {}
				},
				required:false
			},
			activeIds:{
				type:Array,
				default:()=>{
					return []
				},
				required:false
			}
		},
		methods:{
			toggoleActive(){
				this.$emit('onFold',this.content.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex-ct{
		display: flex;
		align-content: center;
	}
	.flex-ct-bwt{
		@extend .flex-ct;
		justify-content: space-between;
	}
	.content{
		padding-top: 20rpx;
		padding-left: 20rpx;
		padding-right: 50rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
	}
	.loc-box{
		margin-bottom: 10rpx;
	}
	.loc{
		font-size: 30rpx;
		font-weight: 600;
		color: #1E1E1E;
		line-height: 42rpx;
	}
	.loc image{
		width: 32rpx;
		height: 36rpx;
		margin-right: 8rpx;
	}
	.sencond-box{
		padding-bottom: 18rpx;
		padding-left: 38rpx;
	}
	
	.font-sub{
		font-size: 22rpx;
		color: #909090;
		line-height: 42rpx;
	}
	.content-gold{
		font-size: 32rpx;
		font-family: DINAlternate-Bold, DINAlternate;
		font-weight: bold;
		color: #FF5F62;
		line-height: 38rpx;
	}
	.arrow{
		width: 16rpx;
		height: 26rpx;
		transition: all .5s;
	}
	.arrow image{
		width: 16rpx;
		height: 26rpx;
		display: block;
	}
	.arrow.active{
		transform: rotate(90deg);
	}
	.list{
		margin-left: 10rpx;
		padding-left: 30rpx;
		padding-top: 18rpx;
		border-top: 2rpx solid #E2E2E2;
	}
</style>

