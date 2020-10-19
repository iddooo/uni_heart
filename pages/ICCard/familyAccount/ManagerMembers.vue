<template>
	<view class="members">
		<view class="member"
			v-for="(item,i) in members"
			:key="i">
			<view class="head-pic">
				<view class="pic-box">
					<image v-if="item.headPic" class="user-photo" :src=" URL + item.headPic" mode=""></image>
					<image v-else class="user-photo" src="/static/index/head.png" mode=""></image>
				</view>
				<view @click="delMember(item.userId)" class="minus" v-show="item.onManager">
					<image src="/static/card/minus.png"></image>
				</view>
			</view>
			<view class="font24">
				{{item.nickName}}
			</view>
			<view class="gold flex-ct-ct">
				<view class="font-num">
					{{item.profit}}
				</view>
				<image class="gold-icon" src="/static/money/gold.png" mode=""></image>
			</view>
		</view>
		<view class="member" @click="handlerShare">
			<view class="head-pic">
				<view class="pic-box flex-ct-ct">
					<image class="add-icon" src="/static/card/add.png" mode=""></image>
				</view>
			</view>
			<view class="add">
				添加
			</view>
		</view>
	</view>
</template>

<script>
	import { URL } from '../../../common/index.js'
	
	export default{
		props:{
			members:{
				type:Array,
				required:false,
				default:()=>{
					return []
				}
			}
		},
		methods:{
			delMember(userId){
				this.$emit('onDelHandler',userId)
			},
			handlerShare(){
				this.$emit('onShareHandler')
			}
		},
		data(){
			return{
				URL
			}
		}
	}
</script>

<style lang="scss" scoped>
	.font24{
		font-size: 24rpx;
		color: #1E1E1E;
		line-height: 34rpx;
	}
	.font-num{
		font-size: 30rpx;
		font-family: DINAlternate-Bold, DINAlternate;
		font-weight: bold;
		color: #FF5F62;
		line-height: 34rpx;
	}
	
	.flex-ct-ct{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.members{
		padding: 46rpx 20rpx 0;
		flex-wrap: wrap;
		display: flex;
	}
	.member{
		width: 25%;
		text-align: center;
		padding-bottom: 38rpx;
	}
	.head-pic{
		width: 90rpx;
		height: 90rpx;
		margin: 0 auto 20rpx;
		position: relative;
	}
	.pic-box{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		overflow: hidden;
	}
	.pic-box .user-photo{
		width: 100%;
		height: 100%;
	}
	.minus{
		position: absolute;
		right: -16rpx;
		top: -14rpx;
		padding: 10rpx;
	}
	.minus image{
		width: 32rpx;
		height: 32rpx;
	}
	.gold{
		margin-top: 26rpx;
	}
	.gold-icon{
		width: 28rpx;
		height: 28rpx;
		margin-left: 6rpx;
	}
	.pic-box .add-icon{
		width: 38rpx;
		height: 38rpx;
	}
	.add{
		width: 90rpx;
		height: 38rpx;
		background: #F4F4F4;
		border-radius: 19rpx;
		text-align: center;
		line-height: 38rpx;
		font-size: 20rpx;
		color: #909090;
		margin: 18rpx auto 0;
	}

</style>
