<template>
	<view class="family-total">
		<view class="total-gold">
			<view class="total">{{profit}}</view>
			<view class="font24">累计获得环保金</view>
		</view>
		<view class="entry">
			<view class="item"
				v-for="(item,i) in entry"
				:key="i"
				@click="handler(item.handler)">
				<view class="icon">
					<image :src="item.icon" mode=""></image>
				</view>
				<view class="font24">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			entry:{
				type:Array,
				required:false,
				default:()=>{
					return []
				},
			},
			profit:{
				type:[Number,String],
				required:false,
				default:0
			}
		},
		onLoad() {
			
		},
		methods:{
			handler(handlerName){
				this.$emit('click',handlerName)
			}
		}
	}
</script>

<style>
	.family-total{
		padding: 44rpx 22rpx 46rpx 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.total-gold{
		width: 250rpx;
	}
	.total{
		font-size: 62rpx;
		font-family: DINAlternate-Bold, DINAlternate;
		font-weight: bold;
		color: #1E1E1E;
		line-height: 72rpx;
		height: 72rpx;
		margin-bottom: 10rpx;
	}
	.entry{
		flex:1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.item{
		width: 25%;
		padding-top: 4rpx;
		text-align: center;
	}
	
	.icon{
		margin: 0 auto 14rpx;
		width: 64rpx;
		height: 64rpx;
	}
	.icon image{
		width: 100%;
		height: 100%;
	}
	.font24{
		font-size: 24rpx;
		color: #1E1E1E;
		line-height: 34rpx;
	}
</style>
