<template>
	<view class="grand-total flex-ct-bwt">
		<view class="box" 
		@click="navigatorToUrl(item)" 
		v-for="(item,index) in data" 
		:key="index">
			<view class="count">{{item.count}}</view>
			<view :class="{'name':true,'btn':index==0}">{{item.name}}</view>
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
			navigatorToUrl(item){
				this.$emit('navigatorToUrl',item)
			}
		}
	}
</script>

<style scoped>
	.grand-total{
		padding: 46rpx 70rpx 0;
	}
	.box{
		text-align: center;
	}
	.box .count{
		font-size:50rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:58rpx;
		margin-bottom: 12rpx;
	}
	.box .name{
		font-size:24rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(144,144,144,1);
		line-height:34rpx;
	}
	.box .name.btn{
		border-radius:19rpx;
		border:1rpx solid rgba(255,95,98,1);
		padding: 0 20rpx;
		color: #FF5F62;
	}
</style>
