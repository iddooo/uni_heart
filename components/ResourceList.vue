<template>
	<view class="resource-list">
		<view class="l-item"
			v-for="(item,i) in list"
			:key="i">
			<view class="cate-name">
				<image class="cate" :src="item.imgUrl" ></image>
				<view class="name">
					{{item.name}}
				</view>
			</view>
			<view class="num">
				{{item.countUnit}}
				<view class="unit"></view>
			</view>
			<view class="total">
				<view class="num">
					{{item.profit}}
				</view>
				<image class="gold" src="/static/money/gold.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				required:false,
				default:()=>{
					return [
						// {"profit":"0.000025","deliverNo":"2019072700162082181588230747996","name":"纸类","countUnit":"0.000051kg","imgUrl":"http://47.103.51.182:8000/icon/page-s.png"},
						// {"profit":"0.13","deliverNo":"2019072700162082181588230747996","name":"纺织物","countUnit":"0.000044kg","imgUrl":"http://47.103.51.182:8000/icon/clothes-s.png"},
						// {"profit":"0.00","deliverNo":"2019072700162082181588230747996","name":"有害","countUnit":"1.21kg","imgUrl":"http://47.103.51.182:8000/icon/harmful-s.png"},
					]
				}
			}
		}
	}
</script>

<style scoped>
	.resource-list{
		/* background-color: #fff; */
	}
	.l-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 20rpx;
	}
	.cate-name{
		width: 40%;
		display: flex;
		align-items: center;
		
	}
	.cate-name .cate{
		/* height: 36rpx;
		width: 24rpx; */
		width: 40rpx;
		height: 38rpx;
		margin-right: 22rpx;
	}
	.cate-name .name{
		font-size: 26rpx;
		color: #1E1E1E;
		line-height: 36rpx;
	}
	.num{
		font-size: 28rpx;
		font-family: DINAlternate-Bold, DINAlternate;
		font-weight: bold;
		color: #1E1E1E;
		line-height: 32rpx;
	}
	.num.unit{
		font-size: 26rpx;
		margin-left: 2rpx;
	}
	.total{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 30%;
	}
	.total .gold{
		width: 28rpx;
		height: 28rpx;
		margin-left: 6rpx;
	}
</style>
