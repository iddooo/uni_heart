<template>
	<view class="step-box">
		<view class="progress-box">
			<view class="alert-box" :style="{left:percent +'%'}">
				<image src="/pages/My/images/alert.png" mode=""></image>
				<text>{{data}}</text>
			</view>
			<progress :percent="percent" border-radius="40" activeColor="#FF5F62" backgroundColor="#E8E8E8" stroke-width="2" />
		</view>
		<view class="step-level flex-ct-bwt">
			<view v-for="(l,i) in levels"
				class="step"
				:key="i">
				<view :class="{
					'dot' : true ,
					'red' : data >= l.maximum,
					'on':data >= l.gold && data < l.maximum
					}">
					<image src="/pages/My/images/on.png" mode=""></image>
				</view>
				<view class="star">
					<image src="/pages/My/images/star.png" mode=""></image>
					<text>{{i}}</text>
				</view>
				<view class="name">
					{{l.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			data:[Number,String],
			percent:[Number,String],
			levels:{
				type:Array,
				required:false,
				default:()=>{
					return []
				}
			}
		}
	}
</script>

<style scoped>
	.step-box{
		margin:102rpx 36rpx 22rpx;
		position: relative;
	}
	.progress-box{
		width: 630rpx;
		position: absolute;
		top: 6rpx;
		left: 24rpx;
	}
	.progress-box .alert-box{
		position: absolute;
		top: -62rpx; //108-46
		width: 76rpx;
		height: 42rpx;
		transform: translateX(-50%);
	}
	.alert-box image{
		width: 100%;
		height: 100%;
		display: block;
	}
	.alert-box text{
		position: absolute;
		top: 4rpx;
		left: 50%;
		transform: translateX(-50%);
		font-size: 18rpx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 26rpx;
	}
	.step-level{
		width: 100%
	}
	.step{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.dot{
		width: 16rpx;
		height: 16rpx;
		background: #E8E8E8;
		margin-bottom: 12rpx;
		position: relative;
		border-radius: 50%;
	}
	.dot image{
		display: none;
	}
	.dot.red{
		background: #FF5F62;
	}
	.dot.on image{
		display: block;
		position: absolute;
		width: 24rpx;
		height: 24rpx;
		left: 50%;
		top:50%;
		transform: translate(-50%,-50%);
	}
	.star{
		width: 48rpx;
		height: 24rpx;
		margin-bottom: 12rpx;
		position: relative;
		z-index: 1;
	}
	.star image{
		width: 100%;
		height: 100%;
		display: block;
	}
	.star text{
		position: absolute;
		left: 28rpx;
		top: 0;
		z-index: 11;
		font-size: 16rpx;
		color: #FFFFFF;
		line-height: 24rpx;
	}
	
	.name{
		font-size: 24rpx;
		color: #1E1E1E;
		line-height: 34rpx;
	}
</style>
