<template>
	<view class="rank-type flex-ct-bwt">
		<view class="type-box" 
		@click="goRanking(item)"
		v-for="item in data" :key="item.id">
			<view class="rank-name">
				<image :src="item.imgUrl" mode=""></image>
				<text>{{item.name}}</text>
			</view>
			<view class="cur">
				{{item.ranking}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			data:{
				type:Array,
				default:()=>{
					return []
				},
				required:false
			}
		},
		methods:{
			goRanking(item){
				this.$emit('goRanking',item)
			}
		}
	}
</script>

<style scoped>
	.rank-type{
		padding: 46rpx 38rpx;
	}
	.type-box{
		width:208rpx;
		height:130rpx;
		background:rgba(255,255,255,1);
		border-radius:10rpx;
		border:1rpx solid rgba(226,226,226,1);
		box-sizing: border-box;
		padding: 16rpx 8rpx;
	}
	.rank-name{
		display: flex;
		align-items: center;
		margin-bottom: 14rpx;
	}
	.rank-name image{
		width: 30rpx;
		height: 30rpx;
		margin-right: 14rpx;
	}
	.rank-name text{
		font-size:24rpx;
		font-weight:500;
		line-height:34rpx;
	}
	.cur{
		font-size:46rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		line-height:54rpx;	
		text-align: center;
		padding-left: 22rpx;
	}
</style>
