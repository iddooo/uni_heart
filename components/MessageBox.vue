<template>
	<view class="popup" v-show="messageBox.visible">
		<view class="pop-bg"></view>
		<view class="content">
			<view class="close-btn" @click="close">
				<image src="/static/index/close.png" mode=""></image>
			</view>
			<view class="title">
				<text>{{messageBox.title}}</text>
			</view>
			<view class="msg" v-if="messageBox.type.toUpperCase() !== 'HTML'">
				<text>{{messageBox.msg}}</text>
			</view>
			<view class="msg html" v-else v-html="messageBox.msg"></view>
			<view :class="['btns','flex-ct-ard',{'single':messageBox.buttons.length === 1}]" v-if="!messageBox.reverse">
				<button @click="_cancel" :class="{'plain':messageBox.buttons.length > 1}">{{messageBox.buttons[0]}}</button>
				<button @click="_success" v-if="messageBox.buttons.length>1">{{messageBox.buttons[1]}}</button>
			</view>
			<view :class="['btns','flex-ct-ard',{'single':messageBox.buttons.length === 1}]" v-else>
				<button @click="_success" :class="{'plain':messageBox.buttons.length > 1}">{{messageBox.buttons[0]}}</button>
				<button @click="_cancel" v-if="messageBox.buttons.length>1">{{messageBox.buttons[1]}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex';

	export default{
		name:'MessageBox',
		computed: {
			...mapGetters(['messageBox'])
		},
		methods: {
			open(){
				this.messageBox.visible = true;
			},
			close(){
				this.messageBox.visible = false;
			},
			_success(){
				// this.success();
				this.messageBox.success()
				this.close();
			},
			_cancel(){
				// this.cancel(); 
				this.messageBox.cancel()
				this.close();
			}
		},
		mounted(){
			// this.open();
		}
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
		padding: 36rpx 0rpx 52rpx;
		text-align: left;
		font-size:28rpx;
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
