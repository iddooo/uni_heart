<template>
	<view class="page">
		<!-- 开始投递 -->
		<view class="scon-container">
		  <view class="scon-img-box">
		    <image src="/static/images/scon-succuss.png"></image>
		  </view>
		  <view class="s-tips">请开始你的投递</view>
		  <view class="tips">投递完成后，将在此页面展示本次投递详情</view>
		</view>
	</view>  
</template>

<script>
	export default{
		data(){
			return{
				socketTask:undefined,
			}
		},
		onLoad() {
			console.log('delivery onLoad');
		},
		onShow() {
			console.log('delivery onshow');
			// 建立连接websocket
			let userId = uni.getStorageSync('userId')
			let url = 'wss://xhx2.synpowertech.com/websocket/mq/deliver/' + userId
			let _this = this
			this.socketTask = uni.connectSocket({
			    url: url, 
			    complete: ()=> {
					console.log('建立连接')
				}
			});
			this.socketTask.onOpen(function (res) {
			  console.log('WebSocket连接已打开！');
			});
			this.socketTask.onError(function (res) {
			  console.log('WebSocket连接打开失败，请检查！');
			});
			this.socketTask.onMessage(function (res) {
			  console.log('收到服务器内容：' , res.data);
			  _this.deliveringFinish(res)
			});
			this.socketTask.onClose(function (res) {
			  console.log('WebSocket 已关闭！');
			});
		},
		onHide() {
			// 断开连接
			if(this.socketTask){
				this.closeSocket()
			}
		},
		onUnload(){
			// 页面卸载
			// 断开连接
			if(this.socketTask){
				this.closeSocket()
			}
		},
		methods:{
			closeSocket(){
				this.socketTask.close({
					code: 1000,
					reason: '已成功获取参数'
				})
			},
			deliveringFinish(res){
				uni.setStorageSync('deliveryData',res.data)
				setTimeout(()=>{
					uni.navigateTo({
						url:"/pages/Money/deliveryFinish/index"
					})
				},2000)
			}
			
		}
	}
</script>

<style>
	.scon-container {
	  padding: 130rpx 72rpx 0 72rpx;
	  text-align: center;
	}
	
	.scon-img-box {
	  width: 568rpx;
	  height: 438rpx;
	  margin-bottom: 86rpx;
	}
	.s-tips{
		font-size:34rpx;
		font-weight:500;
		color:rgba(255,95,98,1);
		line-height:48rpx;
		margin-bottom: 26rpx;
	}
	
	.tips {
	  font-size:24rpx;
	  font-weight:400;
	  color:rgba(109,114,120,1);
	  line-height:34rpx;
	}
	
</style>
