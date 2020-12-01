<template>
	<view class="page page-grey">
		<swiper 
		    class="swiper-container" 
		    next-margin="36rpx" 
		    previous-margin="36rpx" 
		    bindchange="swiperChange">
		    <swiper-item 
				v-for="(item, index) in codes" 
				:key="index"
				class="s-item">
				<view class="code-ctr">
					<view class="flex">
						<view class="pic radius">
							<!-- #ifdef MP-WEIXIN -->
								<open-data class="headpic" type="userAvatarUrl"></open-data>
							<!-- #endif -->
							<!-- #ifndef MP-WEIXIN -->
								<image v-if="userInfo.headPic" class="headpic"  :src="userInfo.headPic" mode=""></image>
								<image v-else class="headpic"  src="/static/index/head.png" mode=""></image>
							<!-- #endif -->
						</view>
						<view class="info">
							<view class="name">{{userInfo.nickname}}</view>
							<view class="card">IC卡号：{{cardNO}}</view>
						</view>
					</view>
					<view class="qr-code-ctn">
					  <canvas :style="{'width':qrcode_w + 'px', 'height':qrcode_w + 'px'}" :canvas-id="'canvas'+ index "></canvas>
					</view>
					<view class="des">
					  <text class="type">{{item.type==0?"厨余垃圾":"其他垃圾"}}</text>
					  <text>投递二维码</text>
					</view>
					<view class="tis">不同种类垃圾投递对应不同的二维码，请使用正确二维码投递</view>
				</view>
		    </swiper-item>
		</swiper>
		
		<view class="dots flex">
		    <view 
		      v-for="(item,index) in codes"
		      :key="index"
		      :class="['dot' ,{ 'active' :index==cur}]">
		    </view>
		</view>
		  
		  <!-- 分享二维码 -->
		<view class="model" v-show="show" @click="show=false"></view>
		<view :class="['share',{'block':show}]">
			<canvas :style="{'width':qrcode_s_w + 'px', 'height':qrcode_s_H + 'px'}" canvas-id="shareCanvas"></canvas>
			
			<view class="flex-ct-bwt share-type">
				<!-- #ifdef MP-WEIXIN -->
					<button open-type="share">
						<image src="/pages/ICCard/images/weixin.png"></image>
						<view>微信好友</view>
					</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
					<button @click="AppShare">
						<image src="/pages/ICCard/images/weixin.png"></image>
						<view>微信好友</view>
					</button>
				<!-- #endif -->
				<!-- #ifdef H5 -->
					<button @click="saveImage">
						<image src="/pages/ICCard/images/weixin.png"></image>
						<view>微信好友</view>
					</button>
				<!-- #endif -->
			
				<button @click="AppShareTimeLine">
					<image src="/pages/ICCard/images/timeline.png"></image>
					<view>朋友圈</view>
				</button>
			
				<button @click="saveImage">
					<image src="/pages/ICCard/images/album.png"></image>
					<view>保存图片</view>
				</button>
			</view>
		</view>
		  
		  <!-- 分享 -->
		  <button class="share-btn" @click="preview">分享</button>
		  <!-- #ifdef APP-PLUS -->
		  <!-- <button class="share-btn" @click="AppShare">分享</button> -->
		  <!-- #endif -->
		  <!-- #ifndef APP-PLUS -->
		  <!-- <button class="share-btn" open-type="share">分享</button> -->
		  <!-- #endif -->
	</view>
</template>

<script>
	import { getICRemianDays } from '../../../api/index.js'
	var drawQrcode = require('../../../utils/weapp.qrcode.esm.js')
	
	export default {
		components:{
			
		},
		data(){
			return {
				cardNO:undefined,
				userInfo:{},
				cur:0,
				codes:[
					{type: 0}, 
					{type: 5}
				],
				rate:2,
				qrcode_w: 452,
				qrcode_s_w:690,
				qrcode_s_H:976,
				familyCodeImg:undefined,
				show:false,
				codeImg1:undefined,
				codeImg0:undefined
			}
		},
		onShow() {
			let userInfo = uni.getStorageSync('userInfo')
			this.userInfo = userInfo
			this.validate()
			// 创建context实例
			this.context = uni.createCanvasContext('shareCanvas', this)
		},
		methods:{
			// 验证是否可是使用二维码
			validate(){
				uni.showLoading()
				getICRemianDays(this.userInfo.phone).then(res=>{
					uni.hideLoading()
					if(res.code==1){
						if(!res.data){
							uni.showModal({
							  title:"提示",
							  content:"您可以加入家庭账户或者绑定IC卡进行投递",
							  showCancel: false,
							  success:(res)=>{
								uni.redirectTo({
								  url: '/pages/Setting/icCard/index',
								})
							  }
							})
							return
						}
						this.cardNO = res.data.sno
						// 设备像素比
						const windowWidth = uni.getSystemInfoSync().windowWidth;
						var rate = 750 / windowWidth
						this.rate = rate
						this.qrcode_w = 452 / rate //轮播图二维码宽高
						this.qrcode_s_w = 690 / rate //分享图片宽
						this.qrcode_s_H = 976 / rate //分享图片高
						this.init()
					}
				})
			},
			// 绘制厨余与其他二维码
			init(){
				var that = this
				// 家庭二维码
				 // 厨余：“XHX”+用户id+“ID”+000+0
				// 其他 ：“XHX”+用户id+“ID”+000+5
				// 设备只支持12位，如果不满12位在最后一位前补0
				let userId = uni.getStorageSync('userId')
			
				let canvas0 = String('XHX' + userId + 'ID').padEnd(11,0) + '0'
				let canvas1 = String('XHX' + userId + 'ID').padEnd(11,0) + '5'
				console.log(this.qrcode_w,canvas0,canvas1,drawQrcode);
				drawQrcode({
				  width: this.qrcode_w,
				  height: this.qrcode_w,
				  canvasId: 'canvas0',
				  text: canvas0,
				  callback:(e)=>{
					uni.canvasToTempFilePath({
					  canvasId: 'canvas0',
					  fail: function (res) {
						console.log(res)
					  },
					  success: function (res) {
						  console.log(res);
						  that.codeImg0 = res.tempFilePath
					  }
					})
				  }
				})
				drawQrcode({
				  width: this.qrcode_w,
				  height: this.qrcode_w,
				  canvasId: 'canvas1',
				  text: canvas1,
				  callback:()=>{
					uni.canvasToTempFilePath({
					  canvasId: 'canvas1',
					  fail: function (res) {
						console.log(res)
					  },
					  success: function (res) {
						 console.log(res);
						that.codeImg1 = res.tempFilePath
					  }
					})
				  }
				})
			},
			// 查看分享二维码
			preview(){
				if(!this.codeImg0 || !this.codeImg1){
					uni.showToast({
						title:"二维码还在绘制中，请等待...",
						icon:'none'
					})
					return
				}
				this.show  = true
				let that = this
				let rate = this.rate
				let bg = '/pages/ICCard/images/share-bg.png'
				let icon = '/pages/ICCard/images/share-icon.png'
				this.drawImg(bg, 0, 0, 690, 976)
				this.drawImg(this.codeImg0, 246, 194, 200, 200)
				this.drawImg(icon,322, 270, 48, 48)
				this.drawImg(this.codeImg1, 246, 586, 200, 200)
				this.drawImg(icon,322, 662, 48, 48)
			
				//用户 头像 昵称 cardNO
				let {nickname, headPic} = this.userInfo
				let cardNO = this.cardNO
				if(!headPic){
					headPic = '/static/index/head.png'
				}
			
				let usernameObj = {x: 154,y: 65,size: 30,color: '#3B3B3B',align: 'left',text: nickname,bold: true,baseline:"middle"};
				this.drawText(usernameObj);
			
				let cardObj = { x: 154, y: 112, size: 20, color: '#909090', align: 'left', text: 'IC卡号：'+ cardNO, baseline: 'middle'}
				this.drawText(cardObj);
			
				let circle = { x: 84 / rate, y: 84 / rate, r: 44 / rate }
				this.context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
				this.context.clip()
				this.drawImg(headPic,40, 40, 88, 88)
				
				
				this.context.draw(false, () => {
					this.getTempFilePath()
				})
			  },
			getTempFilePath(){
				let that = this
			    uni.canvasToTempFilePath({
			       canvasId: 'shareCanvas',
			       fail: function (res) {
						console.log(res)
			       },
			       success: (res)=>{
			           that.familyCodeImg = res.tempFilePath
			       }
			    })
			},
			// 画图函数
			drawImg(img,x,y,w,h){
				var rate = this.rate
				this.context.drawImage(img, x / rate, y / rate, w / rate, h / rate);
			},
			// 画文字函数
			drawText(obj) {
				var rate = this.rate
				this.context.save();
				this.context.setFillStyle(obj.color);
				this.context.setFontSize(obj.size / rate);
				this.context.setTextAlign(obj.align);
				this.context.setTextBaseline(obj.baseline);
				this.context.fillText(obj.text, obj.x / rate, obj.y / rate);
			},
			// 分享到微信朋友圈
			AppShare(){
				uni.share({
					provider:"weixin",
					title:垃圾箱投递码,
					scene:"WXSceneSession",//provider 为 weixin 时必选 : WXSceneSession	分享到聊天界面 WXSenceTimeline	分享到朋友圈 WXSceneFavorite	分享到微信收藏
					imageUrl:this.familyCodeImg,
					href:'/pages/iCCard/deliveryCode/index',
					success:()=>{
						console.log('分享成功')
					}
				})
			},
			AppShareTimeLine(){
				uni.share({
					provider:"weixin",
					title:'垃圾箱投递码',
					scene:"WXSenceTimeline",//provider 为 weixin 时必选 : WXSceneSession	分享到聊天界面 WXSenceTimeline	分享到朋友圈 WXSceneFavorite	分享到微信收藏
					imageUrl:this.familyCodeImg,
					href:'/pages/iCCard/deliveryCode/index',
					success:()=>{
						console.log('分享成功')
					}
				})
			},
			// 保存图片
			saveImage(){
			    let that = this
				uni.canvasToTempFilePath({
				  canvasId: 'shareCanvas',
				  fail: function (res) {
					console.log(res)
				  },
				  success: (res)=>{
				      this.familyCodeImg = res.tempFilePath
					  uni.saveImageToPhotosAlbum({
					    filePath: this.familyCodeImg,
					    success: (res) => {
					      wx.showToast({
					        title: '图片已保存至相册',
					        icon: 'success',
					        duration: 2000
					      })
					      that.setData({
					        canvasHidden:true,
					      })
					    },
					    fail: (err) => {
					      console.log(err)
					    }
					  })
				  }
				})
			  },
		},
		// 微信分享
		onShareAppMessage(){
			return {
			      title:"垃圾箱投递码",
			      imageUrl:this.familyCodeImg,
			    }
		}
	}
</script>

<style scoped>
	.page{
		overflow: hidden;
		position: relative;
	}
	
	.swiper-container {
	  padding-top: 80rpx;
	  width: 100%;
	  height: 876rpx;
	}
	.s-item {
	  padding: 0 12rpx;
	  width: 100%;
	  box-sizing: border-box;
	}
	.code-ctr {
	  width: 100%;
	  height: 100%;
	  border-radius: 10rpx;
	  padding: 50rpx 40rpx;
	  box-shadow: 0rpx 8rpx 22rpx 0rpx rgba(218, 218, 218, 0.1);
	  box-sizing: border-box;
	  background-color: #fff;
	}
	
	.pic{
		width: 116rpx;
		height: 116rpx;
	}
	.radius{
		border-radius: 50%;
		overflow: hidden;
	}
	.headpic{
		width: 116rpx;
		height: 116rpx;
	}
		
	.info{
		padding-left: 26rpx;
	}
	
	.name {
	  font-size: 32rpx;
	  font-weight: 600;
	  color: rgba(59, 59, 59, 1);
	  line-height: 44rpx;
	  padding-top: 10rpx;
	}
	
	.card {
	  padding-top: 26rpx;
	  font-size: 20rpx;
	  color: rgba(144, 144, 144, 1);
	  line-height: 28rpx;
	}
	
	.qr-code-ctn {
	  margin: 54rpx auto;
	  width: 452rpx;
	  height: 452rpx;
	  background-color: #eee;
	}
	
	.des {
	  font-size: 28rpx;
	  font-weight: 600;
	  color: rgba(59, 59, 59, 1);
	  line-height: 40rpx;
	  margin-top: 4rpx;
	  text-align: center;
	}
	
	.des .type {
	  color: rgba(255, 95, 98, 1);
	
	}
	
	.tis {
	  margin-top: 26rpx;
	  font-size: 20rpx;
	  color: rgba(158, 158, 158, 1);
	  line-height: 28rpx;
	  text-align: center;
	}
	
	.dots {
	  margin-top: 62rpx;
	  position: absolute;
	  left: 50%;
	  transform: translateX(-50%);
	}
	
	.dot {
	  width: 8rpx;
	  height: 8rpx;
	  background: rgba(205, 205, 205, 1);
	  border-radius: 50%;
	  margin-right: 10rpx;
	}
	
	.dot:last-of-type {
	  margin-right: 0;
	}
	
	.dot.active {
	  width: 24rpx;
	  height: 8rpx;
	  background: rgba(255, 95, 98, 1);
	  border-radius: 4rpx;
	}
	
	.share-btn {
	  width: 606rpx;
	  height: 88rpx;
	  background: rgba(255, 95, 98, 1);
	  border-radius: 4rpx;
	  line-height: 88rpx;
	  text-align: center;
	  font-size: 34rpx;
	  font-weight: 500;
	  color: rgba(255, 255, 255, 1);
	  margin: 140rpx auto 0;
	}
	
	.model {
	  position: fixed;
	  left: 0;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  background-color: rgba(0, 0, 0, .6);
	  z-index: 9;
	}
	
	.share {
	  position: absolute;
	  left: 30rpx;
	  top: 9999rpx;
	  transition: all .5s;
	  z-index: 10;
	}
	.block{
		top: 30rpx;
	}
	
	.share-type {
	  padding: 74rpx 112rpx;
	}
	
	.share-type image {
	  width: 60rpx;
	  height: 52rpx;
	  margin:0 auto 12rpx;
	  display: block;
	}
	.share-type button{
	  background-color: transparent;
	  padding: 0;
	  margin: 0;
	  font-size: 28rpx;
	  color: rgba(255, 255, 255, 1);
	  line-height: 40rpx;
	  flex: 1;
	}
	
	
	
</style>
