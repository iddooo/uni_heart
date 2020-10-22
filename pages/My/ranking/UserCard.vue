<template>
	<view class="user flex-ct ">
		<view class="user-photo">
			<!-- #ifndef MP-WEIXIN -->
				<image class="headpic" src="/static/index/head.png" mode=""></image>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
				<open-data class="headpic" type="userAvatarUrl"></open-data>
			<!-- #endif -->
		</view>
		<view class="user-info">
			<view class="user-name flex-ct">
				<text class="name">{{user.nickname}}</text>
				<text v-if="cur==3" :class="'level level-'+user.level">{{user.des}}</text>
			</view>
			<view class="user-rank">
				我的排名:{{user.rank}}
			</view>
		</view>
		<view class="user-count">
			{{user.count}}<text v-if="cur==1">次</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			user:{
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
	.user{
		border-bottom: 20rpx solid #F6F6F6;
		padding: 26rpx;
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
	.user-info{
		width: 432rpx;
		box-sizing:  border-box;
		padding-left: 30rpx;
	}
	.user-name .name{
		font-size:28rpx;
		font-weight:500;
		color:rgba(30,30,30,1);
		line-height:40rpx;
	}
	.user-rank{
		margin-top: 6rpx;
		font-size:28rpx;
		color:rgba(109,114,120,1);
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
</style>
