<template>
	<view class="popup" v-show="visible">
		<view class="pop-bg"></view>
		<view class="content">
			<view class="close-btn" @click="close">
				<image src="/static/authorize/clear.png" mode=""></image>
			</view>
			<view class="title">
				<span>{{title}}</span>
			</view>
			<view class="msg" v-if="type.toUpperCase() !== 'HTML'">
				<span>{{msg}}</span>
			</view>
			<view class="msg html" v-else v-html="msg"></view>
			<view :class="['btns','flex-ct-ard',{'single':buttons.length === 1}]" v-if="!reverse">
				<button @click="_fail" :class="{plain:buttons.length > 1}">{{buttons[0]}}</button>
				<button @click="_success" v-if="buttons.length>1">{{buttons[1]}}</button>
			</view>
			<view :class="['btns','flex-ct-ard',{'single':buttons.length === 1}]" v-else>
				<button @click="_success" :class="{plain:buttons.length > 1}">{{buttons[0]}}</button>
				<button @click="_fail" v-if="buttons.length>1">{{buttons[1]}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'MessageBox',
	}
</script>

<style scoped>
	.popup{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 99;
	}
	.pop-bg{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba(0,0,0,.4);
		
	}
	.close-btn{
		position: absolute;
		width: 26rpx;
		height: 26rpx;
		padding: 10rpx;
		top: 32rpx;
		right: 32rpx;
	}
	.close-btn image{
		width: 100%;
		height: 100%;
	}
	.content{
		width:654rpx;
		background:rgba(255,255,255,1);
		border-radius:10rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		padding: 42rpx;
		box-sizing: border-box;
	}
	.title{
		font-size:34rpx;
		font-weight:500;
		color:rgba(30,30,30,1);
		line-height:48rpx;
		text-align: center;
	}
	.msg{
		padding: 64rpx 0 80rpx;
		text-align: center;
		font-size:32rpx;
		font-weight:400;
		color:rgba(101,101,101,1);
		line-height:46rpx;
	}
	.msg.html{
		padding: 36rpx 40rpx 52rpx;
		text-align: left;
		font-size:28rpx;
		line-height:46rpx;
	}
	.btns button{
		width:226rpx;
		height:80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius:4rpx;
		background:rgba(255,95,98,1);
		font-size:32rpx;
		color: #FFFFFF;
	}
	.btns button.plain{
		background-color: #FFFFFF;
		border:2rpx solid rgba(255,95,98,1);
		color: rgba(255,95,98,1);;
	}
	.btns.single button{
		width:554rpx;
		
	}
</style>
