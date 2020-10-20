<template>
	<view class="content">
		<view class="loc-box flex-ct-bwt">
			<view class="loc flex-ct">
				<image src="/static/index/site.png" mode=""></image>
				<text>{{content.complex}}</text>
			</view>
			<view class="font-sub">
				{{content.time}}
			</view>
		</view>
		<view class="sencond-box flex-ct-bwt">
			<view class="font-sub">
				投递单号:{{content.deliverNo}}
			</view>
			<view class="font-sub">
				{{content.type==0 ? "厨余垃圾" :"其他垃圾"}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			content:{
				type:Object,
				default:()=>{
					return {}
				},
				required:false
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
		margin-bottom: 10rpx;;
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
</style>
