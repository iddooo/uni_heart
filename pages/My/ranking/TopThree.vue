<template>
	<view class="top-3">
		<image class="top-bg" src="/imgs/score/rank.png" mode=""></image>
		<view class="top-uers">
			<view class="u-item"
			v-for="(t,i) in top"
			:key="i">
				<view class="u-name">
					{{t.nickname || '-'}}
				</view>
				<view class="u-count">
					{{t.count || '-'}}
				</view>
				<view class="u-des">
					{{cur==3?"公益值":cur==2?"环保金":"投递次数"}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			top:{
				type:Array,
				default:()=>{
					return []
				},
				required:false
			},
			cur:[Number,String]
		},
		data(){
			return{
				URL:URL,
			}
		}
	}
</script>

<style scoped>
	.top-3{
		position: relative;
		padding: 0 20rpx;
		z-index: 1;
		height: 186px;
	}
	.top-bg{
		position: absolute;
		left: 20rpx;
		top: 0;
		width:710rpx;
		height:372rpx;
		z-index: -1;
	}
	.top-uers{
		padding-top: 224rpx;
		width: 100%;
		display: flex;
	}
	.u-item{
		flex: 1;
		text-align: center;
	}
	.u-name{
		font-size:28rpx;
		font-weight:500;
		color:rgba(30,30,30,1);
		height:40rpx;
		line-height:40rpx;
		margin-bottom: 12rpx;
	}
	.u-count{
		font-size:28rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(255,95,98,1);
		height:32rpx;
		line-height:32rpx;
		margin-bottom: 10rpx;
	}
	.u-des{
		font-size:26rpx;
		color:rgba(144,144,144,1);
		height:36rpx;
		line-height:36rpx;
	}
</style>
