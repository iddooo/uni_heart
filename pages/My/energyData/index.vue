<template>
	<view class="page">
		<view id="canvas-content">
			<view class="box1">
				<image class="bg" src="/static/score/cavsbg1.png" mode="widthFix"></image>
				<view class="user-photo">
					<!-- #ifndef MP-WEIXIN -->
						<image v-if="userInfo.headPic" class="headpic"  :src="URL+userInfo.headPic" mode=""></image>
						<image v-else class="headpic"  src="/static/index/head.png" mode=""></image>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
						<open-data class="headpic" type="userAvatarUrl"></open-data>
					<!-- #endif -->
				</view>
				
				<view class="user-name">
					{{userInfo.nickname}}
				</view>
				<view class="user-id">
					ID: {{userInfo.id}}
				</view>
				<view class="days">
					{{envData.day}}
				</view>
				<view class="flex-ct-ard save">
					<view>{{envData.deliverNum}}</view>
					<view>{{envData.profit}}</view>
					<view>{{envData.carbon}}</view>
				</view>
				<image class="link" src="/static/score/link.png" mode=""></image>
			</view>
			
			<view class="box2">
				<image class="bg" src="/static/score/cavsbg2.png" mode="widthFix"></image>
			
				<view class="tree">{{envData.tree}}</view>
				<view class="petroleum">{{envData.petroleum}}</view>
				<view class="electric">{{envData.electric}}</view>
				
				<image v-if="deliverDetailResult.length>0" class="link" src="/static/score/link.png" mode=""></image>
			</view>
			<view id="box3" class="box3" v-if="deliverDetailResult.length>0">
				<image class="bg bg3" src="/static/score/cavsbg3.png"></image>
				<view class="title">
					已为环境保护贡献了
				</view>
				<view class="cate flex-ct-bwt"
					v-for="(item,i) in deliverDetailResult"
					:key="i"
				>
					<view class="flex-ct">
						<image class="img" :src="item.imgUrl" mode=""></image>
						<text>{{item.name}}</text>
					</view>
					<view class="flex-ct-ct">
						<view class="num">
							{{item.count}}
						</view> 
						<view class="unit">{{item.type==1 ? "个":"kg"}}</view>
					</view>
					<view class="flex-ct-end">
						<view class="num">
							{{item.profit}}
						</view>
						<image class="gold" src="/static/money/gold.png" mode=""></image>
					</view>
					
				</view>
			</view>
			
		</view>
		<!-- 生成图片 -->
		<view @click="preview" class="preview">
			生成我的环保战报
		</view>
		
		<view v-show="show" class="model" @click="show=false"></view>
		<canvas v-show="show" class="share" canvas-id="share" id="share" :style="{width: canvasW + 'px', height: canvasH+ 'px'}"></canvas>
		<button v-show="show" @click="saveImg" class="save-img">保存图片</button>
	</view>
</template>

<script>
	import { getEnvData } from '../../../api/index.js'
	import { URL } from '../../../common/index.js'
	export default{
		data(){
			return{
				userInfo:{},
				URL:URL,
				envData:{},
				deliverDetailResult:[],
				canvasW:412,
				canvasH:932,
				rate:1,
				scale:1,
				show:false,
				bg1:'/static/score/cavsbg1.png',
				bg2:'/static/score/cavsbg2.png',
				bg3:'/static/score/cavsbg3.png',
				link:'/static/score/link.png',
				box3Height:432,
				contentH:1528,
				canvasDesH:932,
				onSave:false,
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo') || {}
			this.getData()
			// 设备像素比
			uni.getSystemInfo({
				success:(res)=>{
					let windowWidth = res.windowWidth
					this.rate = 750 / windowWidth 
					this.scale = 412 / 750
				}
			})
			// 创建context实例
			this.context = uni.createCanvasContext('share', this)
		},
		methods:{
			getData(){
				getEnvData(this.userInfo.id).then(res=>{
					if(res.code==1){
						this.envData = res.data
						this.deliverDetailResult = res.data.deliverDetailResult
						setTimeout(()=>{
							this.getCanvasContentHeight()
						},2000)
					}
				})
			},
			// 获取内容高度
			getCanvasContentHeight(){
				const query = uni.createSelectorQuery().in(this);
				query.select('#box3').boundingClientRect(data => {
					//设计稿内容高度 1528 - 432
					this.box3Height = data.height * this.rate
					this.contentH = this.box3Height + 590 + 506
					this.canvasDesH = (this.contentH + 186)* this.scale //186二维码高度
					// 画布宽高
					this.canvasH = this.canvasDesH / this.rate
					this.canvasW = 412 / this.rate
					
				}).exec();
			},
			preview(){
				if(this.show){
					uni.showToast({
						title:"正在绘制中，请等待",
						icon:"none"
					})
					return
				}
				this.show = true
				this.drawImg()
			},
			drawImg(){
				let { nickname, id, headPic } = this.userInfo
				let {day, deliverNum, profit, carbon,tree, petroleum, electric } = this.envData
				
				let ctx = this.context
				// 渐变色背景
				const grd = ctx.createLinearGradient(0, 0, 0, this.canvasH)
				grd.addColorStop(0, '#EB4B5A')
				grd.addColorStop(1, '#F19E4F')
				ctx.setFillStyle(grd)
				ctx.fillRect(0, 0, this.canvasW, this.canvasH)
				
				// 第一个背景框
				this.drawCanvasImage(this.bg1, 10, 24, 730, 590)
				
				// 圆角
				// this.drawCanvasArc(124, 124, 60, 0, 2 * Math.PI)
				// ctx.clip();
				// 头像
				if(!headPic){
					// #ifdef H5
						headPic = '/static/index/head.png'
						this.drawCanvasImage(headPic,64,64,120,120)
					// #endif
					
					// #ifdef MP-WEIXIN
						let userDetail = uni.getStorageSync('userDetail')
						headPic = userDetail.userInfo.avatarUrl
						uni.downloadFile({
							url:headPic,
							success:(res)=>{
								let tempFilePath = res.tempFilePath
								this.drawCanvasImage(tempFilePath,64,64,120,120)
							}
						})
					// #endif
					
				}else{
					headPic = this.URL+this.userInfo.headPic
					uni.downloadFile({
						url:headPic,
						success:(res)=>{
							let tempFilePath = res.tempFilePath
							this.drawCanvasImage(tempFilePath,64,64,120,120)
						}
					})
				};
				
				this.drawCanvasText({text:day,x:620,y:134,fontSize:78,color:"#FF5F62",textAlign:"right",baseline:"top"})
				this.drawCanvasText({text:nickname,x:68,y:206,fontSize:36,color:"#1E1E1E",textAlign:"left",baseline:"middle"})
				this.drawCanvasText({text:"ID"+id,x:68,y:264,fontSize:24,color:"#909090",textAlign:"left",baseline:"middle"})
				this.drawCanvasText({text: deliverNum ,x:132,y:448,fontSize:32,color:"#1E1E1E",textAlign:"center",baseline:"middle"})
				this.drawCanvasText({text: profit ,x:370,y:448,fontSize:32,color:"#1E1E1E",textAlign:"center",baseline:"middle"})
				this.drawCanvasText({text: carbon,x:600,y:448,fontSize:32,color:"#1E1E1E",textAlign:"center",baseline:"middle"})
				
				// 第二个背景框
				this.drawCanvasImage(this.bg2, 10, 602, 730, 506)
				this.drawCanvasText({text: tree ,x:162,y:972,fontSize:32,color:"#1E1E1E",textAlign:"right",baseline:"middle"})
				this.drawCanvasText({text: petroleum ,x:382,y:972,fontSize:32,color:"#1E1E1E",textAlign:"right",baseline:"middle"})
				this.drawCanvasText({text: electric ,x:602,y:972,fontSize:32,color:"#1E1E1E",textAlign:"right",baseline:"middle"})
				
				this.drawCanvasImage(this.link, 72, 544, 606, 104)
				let len = this.deliverDetailResult.length
				if(len > 0){
					this.drawCanvasImage(this.bg3, 10, 1094, 730, this.box3Height)
					this.drawCanvasText({text:'已为环境保护贡献了',x:68,y:1200,fontSize:30,color:"#1E1E1E",textAlign:"left",baseline:"middle"})
					
					let h = 56 , top = 1270 ,l1=82, l2=128,l3=376,l4=642
					let icon = '/static/score/cate.png'
					let gold = '/static/money/gold.png'
					for(let i = 0 ; i < len ; i++ ){
						let item = this.deliverDetailResult[i]
						let unit = item.type==1 ? "个":"kg"
						let t = top + h*i
						this.drawCanvasImage(icon,l1,t,26,26)
						this.drawCanvasText({text:item.name,x:l2,y:t+16,fontSize:26,color:"#1E1E1E",textAlign:"left",baseline:"middle"})
						
						this.drawCanvasText({text:item.count,x:l3,y:t+16,fontSize:28,color:"#1E1E1E",textAlign:"right",baseline:"middle"})
						this.drawCanvasText({text:unit,x:l3,y:t+16,fontSize:26,color:"#1E1E1E",textAlign:"left",baseline:"middle"})
						
						this.drawCanvasText({text:item.profit,x:l4,y:t+16,fontSize:28,color:"#1E1E1E",textAlign:"right",baseline:"middle"})
						this.drawCanvasImage(gold,l4,t,28,28)
					}
					this.drawCanvasImage(this.link, 72, 1024, 606, 104)
				}
				// 二维码
				let qrcode = '/static/score/qcode.png'
				let qtop = this.contentH
				this.drawCanvasImage(qrcode,157,qtop+15,120,120)
				this.drawCanvasText({text:"环保赚现金",x:486,y:qtop+32,fontSize:25,color:"#FFFFFF",textAlign:"center",baseline:"middle"})
				this.drawCanvasText({text:"长按识别小程序码",x:486,y:qtop+105,fontSize:25,color:"#FFFFFF",textAlign:"center",baseline:"middle"})
				ctx.draw()
				
			},
			drawCanvasImage(path,x,y,dx,dy){
				this.context.drawImage(path,x/this.rate*this.scale,y/this.rate*this.scale,dx/this.rate*this.scale,dy/this.rate*this.scale,)
			},
			drawCanvasText(obj){
				this.context.setFontSize(obj.fontSize/this.rate*this.scale)
				this.context.setTextAlign(obj.textAlign)
				this.context.setTextBaseline(obj.baseline)
				this.context.setFillStyle(obj.color)
				this.context.fillText(obj.text, obj.x/this.rate*this.scale, obj.y/this.rate*this.scale)	
			},
			drawCanvasArc(x,y,r,s,e){
				this.context.arc(x/this.rate*this.scale,y/this.rate*this.scale,r/this.rate*this.scale,s,e)
			},
			saveImg(){
				if(this.onSave){
					wx.showModal({
						title: '提示',
						content: '图片绘制中，请稍后重试',
						showCancel: false
					 })
					 return
				}
				this.onSave = true
				uni.canvasToTempFilePath({
				  x: 0,
				  y: 0,
				  width: this.canvasW,
				  height: this.canvasH,
				  destWidth: 412,
				  destHeight: this.canvasDesH,
				  canvasId: 'share',
				  success: function(res) {
					  this.onSave = false
				    // 在H5平台下，tempFilePath 为 base64
				    // console.log(res.tempFilePath)
					// #ifdef H5
					var a = document.createElement('a');
					a.setAttribute('href',res.tempFilePath);//图片地址
					a.setAttribute('download','');//下载时文件名称
					var evobj = document.createEvent('MouseEvents'); 
					evobj.initMouseEvent('click',true,true,window,0,0,0,0,0,false,false,true,false,0,null)
					a.dispatchEvent(evobj)
	
					// #endif
					// #ifndef H5
						uni.saveImageToPhotosAlbum({
							filePath:res.tempFilePath,
							success:()=>{
								uni.showToast({
								  title: '保存成功',
								  icon: 'success',
								  duration: 2000
								})
							}
						})
					// #endif
				  } 
				})
			}
			
			
		}
	}
</script>

<style scoped>
	.page{
		background: linear-gradient(202deg,rgba(241,158,79,1) 0%,rgba(235,75,90,1) 100%);;
		padding-bottom: 40rpx;
	}
	.box1{
		padding-top: 24rpx;
		height: 590rpx;
		position: relative;
		z-index: 3;
	}
	.bg{
		width: 730rpx;
		position: absolute;
		left: 50%;		
		transform: translateX(-50%);
		z-index: -1;
	}
	.link{
		width: 606rpx;
		height: 104rpx;
		position:absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: -34rpx;
		z-index: 1;
	}
	.box2{
		height: 506rpx;
		position: relative;
		z-index: 2;
		margin-top: -12rpx;
	}
	.box3{
		height: 412rpx;
		position: relative;
		z-index: 1;
		margin-top: -12rpx;
	}
	.user-photo{
		width:120rpx;
		height:120rpx;
		border-radius: 50%;
		overflow: hidden;
		position: absolute;
		left: 64rpx;
		top: 44rpx;
	}
	.user-photo .headpic{
		width: 100%;
		height: 100%;
	}
	.user-name{
		position: absolute;
		left: 68rpx;
		top: 186rpx;
		font-size:36rpx;
		font-weight:500;
		color:rgba(30,30,30,1);
		line-height:50rpx;
	}
		
	.user-id{
		position: absolute;
		left: 68rpx;
		top: 244rpx;
		font-size:24rpx;
		color:rgba(144,144,144,1);
		line-height:34rpx;
	}
	.days{
		position: absolute;
		right: 124rpx;
		top: 92rpx;
		font-size:78rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(235,75,90,1);
		line-height:92rpx;
	}
	.save{
		position: absolute;
		top: 420rpx;
		left: 20rpx;
		width: 710rpx;
	}
	.save view{
		width: 33.33%;
		text-align: center;
		font-size:32rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(30,30,30,1);
		line-height:38rpx;
	}
	.tree,.petroleum,.electric{
		font-size:32rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(30,30,30,1);
		line-height:38rpx;
		position: absolute;
		top: 350rpx;
	}
	.tree{
		right: 580rpx;
	}
	.petroleum{
		right: 360rpx;
	}
	.electric{
		right: 140rpx;
	}
	.title{
		padding-top: 92rpx;
		padding-left: 68rpx;
		font-weight:500;
		color:rgba(30,30,30,1);
		line-height:42rpx;
		font-size: 30rpx;
		margin-bottom: 56rpx;
	}
	.cate{
		padding-left: 84rpx;
		padding-right: 70rpx;
		font-size:26rpx;
		color:rgba(30,30,30,1);
		line-height:36rpx;
		padding-bottom: 20rpx;
	}
	.cate .num {
		font-size:28rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(30,30,30,1);
		line-height:32rpx;
	}
	.cate > view{
		width: 33.33%;
	}
	.img{
		max-height: 32rpx;
		max-width: 26rpx;
		margin-right: 26rpx;
	}
	.gold{
		width:28rpx;
		height:28rpx;
		margin-left: 6rpx;
	}
	.bg3{
		height: 100%;
	}
	.box3{
		padding-bottom: 20rpx;
	}
	.preview{
		margin: 26rpx auto 0;
		width:300rpx;
		height:66rpx;
		border-radius:33rpx;
		border:2rpx solid rgba(255,255,255,1);
		line-height: 66rpx;
		text-align: center;
		color: #fff;
		font-size: 28rpx;
	}
	.model{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba(0,0,0,.75);
		z-index: 9;
	}
	.share{
		position: absolute!important;
		left: 50%;
		top: 76rpx;
		transform: translateX(-50%);
		z-index: 10;
	}
	.share{
		background: linear-gradient(202deg,rgba(241,158,79,1) 0%,rgba(235,75,90,1) 100%);
	}
		
	.save-img{
		width:278rpx;
		height:64rpx;
		background:rgba(255,95,98,1);
		border-radius:62rpx;
		line-height: 64rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 26rpx;
		position: absolute;
		bottom: 56rpx;
		left: 50%;
		transform:translateX(-50%);
		z-index: 10;
	}
</style>
