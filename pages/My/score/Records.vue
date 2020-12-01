<template>
	<view class="list">
		<view class="li-item"
			v-for="(item,i) in list"
			:key="i">
			<view class="type">
				{{item.content}}
			</view>
			<view class="time">
				{{item.createTime}}
			</view>
			<view class="score">
				{{item.type? '+':'-'}}{{item.score}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default:()=>{
					return []
				},
				required:false
			}
		}
	}
</script>

<style scoped>
	.list{
		height: 100%;
		overflow-y: scroll;
	}
	.li-item{
		margin: 0 28rpx;
		padding: 28rpx 0;
		position: relative;
		border-bottom: 2rpx solid #F6F6F6;
	}
	.type{
		margin-bottom: 22rpx;
		font-size: 28rpx;
		color: #000000;
		line-height: 40rpx;
	}
	.time{
		font-size: 20rpx;
		color: #888888;
		line-height: 28rpx;
	}
	.score{
		position: absolute;
		right: 0;
		top: 60rpx;
		font-size: 32rpx;
		font-family: DINAlternate-Bold, DINAlternate;
		font-weight: bold;
		color: #FF5F62;
		line-height: 38rpx;
	}
</style>
