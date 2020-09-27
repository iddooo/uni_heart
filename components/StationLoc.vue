<template>
	<view class="location">
		<view class="flex-ct loc">
			<image class="site" src="/static/index/site.png" mode=""></image>
			<text>{{data.complex}}</text>
		</view>
		<view class="flex-ct dist" @click="goMap">
			<text class="about">约</text><text>{{data.min_dis}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			data:{
				type:Object,
				required:false,
				default:()=>{
					return {}
				}
			}
		},
		methods:{
			goMap(){
				this.$emit('click')
			}
		}
	}
</script>

<style>
	.location{
		font-weight:500;
		padding-bottom: 12rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.flex-ct{
		display: flex;
		align-items: center;
	}
	.site{
		width: 36rpx;
		height: 42rpx;
		margin: 0 12rpx 0 26rpx;
	}
	.loc{
		font-size:30rpx;
	}
	.dist{
		font-size:28rpx;
	}
	.dist::after {
		content: "";
		display: inline-block;
		width: 6rpx;
		height: 6rpx;
		margin: 6rpx 10rpx 10rpx 10rpx;
		border-top: 2rpx solid #2c2c2c;
		border-right: 2rpx solid #2c2c2c;
		transform: rotate(45deg);
	}
	.about{
		font-size:16rpx;
		margin-right: 4rpx;
	}
</style>
