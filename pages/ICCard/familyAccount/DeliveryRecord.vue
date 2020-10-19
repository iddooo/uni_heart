<template>
	<view class="record">
		<view class="user-hd">
			<image :src="userPics[data.name]"></image>
		</view>
		<view class="user">
			<view class="name">{{data.name}}</view>
			<view class="time">{{data.deliverTime}}</view>
		</view>
		<!-- 可回收/有害 -->
		<view v-if="active==1" class="user-p">
			<text>+ {{data.profit}}</text>
			<image src="/static/money/gold.png"></image>
		</view>
		<!-- 厨余/其他 -->
		<view v-else class="type">
			{{data.type==0 ? "厨余垃圾" : "其他垃圾"}}
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
			},
			userPics:{
				type:Object,
				required:false,
				default:()=>{
					return {}
				}
			},
			active:[Number,String]
		}
	}
</script>

<style lang="scss" scoped>
	.record {
	  border-bottom: 2rpx solid #F6F6F6;
	  padding: 20rpx 0rpx;
	  display: flex;
	  align-items: center;
	}
	
	.user-hd {
	  width: 64rpx;
	  height: 64rpx;
	  border-radius: 50%;
	  overflow: hidden;
	  background-color: #F2F2F2;
	  margin-right: 40rpx;
	}
	.user-hd image{
		width: 100%;
		height: 100%;
	}
	
	.user {
	  width: 300rpx;
	}
	
	.user .name {
	  font-size: 28rpx;
	  font-weight: 400;
	  color: rgba(0, 0, 0, 1);
	  line-height: 40rpx;
	  margin-bottom: 10rpx;
	}
	
	.user .time {
	  font-size: 20rpx;
	  font-weight: 400;
	  color: rgba(136, 136, 136, 1);
	  line-height: 28rpx;
	}
	
	.flex-ct-end{
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	
	.user-p {
	  flex: 1;
	  font-size: 32rpx;
	  font-family: DINAlternate-Bold, DINAlternate;
	  font-weight: bold;
	  color: rgba(235, 75, 90, 1);
	  line-height: 38rpx;
	  @extend .flex-ct-end;
	}
	
	.user-p image {
	  width: 28rpx;
	  height: 28rpx;
	  margin-left: 10rpx;
	  
	}
	
	.type {
	  flex: 1;
	  font-size: 28rpx;
	  color: rgba(0, 0, 0, 1);
	  line-height: 40rpx;
	  padding-right: 24rpx;
	  @extend .flex-ct-end;
	}
</style>
