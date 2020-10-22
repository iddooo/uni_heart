<template>
	<view class="rank-item flex-ct">
		<view class="num">
			{{rankItem.rank}}
		</view>
		<view class="user-photo">
			<image v-if="rankItem.headPic" class="headpic" :src="URL+rankItem.headPic" mode=""></image>
			<image v-else class="headpic" src="/static/index/head.png" mode=""></image>
		</view>
		<view class="c-box user-name flex-ct">
			<text class="name">{{rankItem.nickname}}</text>
			<text v-if="cur==3" :class="'level level-'+rankItem.level">{{rankItem.des}}</text>
		</view>
		<view class="user-count">
			{{rankItem.count}}<text v-if="cur==1">次</text>
		</view>
	</view>
</template>

<script>
	import { URL } from '../../../common/index.js'
	export default{
		props:{
			rankItem:{
				type:Object,
				default:()=>{
					return {}
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
	.flex-ct{
		display: flex;
		align-items: center;
	}
	.user-photo{
		width:80rpx;
		height:80rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.user-photo .headpic{
		width: 100%;
		height: 100%;
	}
	.user-name .name{
		font-size:28rpx;
		font-weight:500;
		color:rgba(30,30,30,1);
		line-height:40rpx;
	}
	.user-count{
		font-size:28rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(255,95,98,1);
		line-height:32rpx;
		flex:1;
		text-align: right;
		padding-right: 28rpx;
	}
	.rank-item{
		padding: 26rpx 0;
		border-bottom: 2rpx solid #E2E2E2;
	}
	.num{
		padding: 0 34rpx 0 36rpx;
		font-size:28rpx;
		font-weight:500;
		color:rgba(30,30,30,1);
		line-height:40rpx;
		text-align: right;
	}
		
	.c-box{
		width: 328rpx;
		box-sizing: border-box;
		padding-left: 30rpx;
	}
</style>
