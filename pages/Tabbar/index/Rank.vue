<template>
	<view class="rank-type flex-ct-bwt">
		<view class="type-box" 
		@click="goRanking(item)"
		v-for="item in data" :key="item.id">
			<view class="rank-name">
				<image :src="item.imgUrl" mode=""></image>
				<text>{{item.name}}</text>
			</view>
			<view v-if="item.id==1" class="flex-ct-ct">
				<view v-for="(p,index) in item.pics" :key="index" :class="['photo-box', index==0 ? 'photo-box-0':'border']">
				  <image v-if="p" :src="URL + p"></image>
				  <image v-else src="/static/index/head.png"></image>
				</view>
			</view>
			<view v-else class="cur">
				{{item.ranking}}
			</view>
		</view>
	</view>
</template>

<script>
	import { URL } from '../../../common/index.js'
	
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
		data(){
			return{
				URL,
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
	.photo-box {
	  width: 54rpx;
	  height: 54rpx;
	  border-radius: 50%;
	  overflow: hidden;
	}
	.photo-box image{
		width: 100%;
		height: 100%;
	}
	.photo-box-0{
	  width: 50rpx;
	  height: 50rpx;
	}
	
	.border {
	  border: 2rpx solid #fff;
	  margin-left: -10rpx;
	}
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
		padding: 14rpx 8rpx;
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
