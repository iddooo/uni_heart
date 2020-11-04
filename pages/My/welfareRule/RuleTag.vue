<template>
	<view class="rule-box flex-ct-bwt" @click="handlerClick">
		<image class="rule-img" src="/static/mine/rule-i.png"></image>
		<view>公益值明细</view>
		<view class="arrow"></view>
	</view>
</template>

<script>
	export default{
		methods:{
			handlerClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style scoped>
	.rule-box{
		position: absolute;
		top: 50rpx;
		right: 0;
		width: 220rpx;
		height: 62rpx;
		padding: 0 14rpx 0 30rpx;
		border-top-left-radius: 31rpx;
		border-bottom-left-radius: 31rpx;
		background: rgba(0, 0, 0, 0.05);
		font-size: 24rpx;
		color: #fff;
	}
	.rule-img{
		width: 22rpx;
		height: 22rpx;
	}
	.arrow{
		width: 16rpx;
		height: 16rpx;
		margin-left: 12rpx;
		border-top: 2rpx solid #fff;
		border-right: 2rpx solid #fff;
		transform: rotate(45deg);
	}
</style>
