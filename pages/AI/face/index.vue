<template>
	<view class="page">
		<!-- 上传人脸 -->
		<view v-show="!hasPhoto">
			<view class="title">
				请拍摄正面免冠照片
			</view>
			<view class="sub-title">
				*照片要保证清晰光线充足
			</view>
			<image class="face-tip" src="/pages/AI/images/face-tip.png" mode=""></image>
			<view class="flex-ct-bwt tip-text">
				<text>不能配戴墨镜</text>
				<text>不能遮挡脸部</text>
				<text>不能仰头俯拍</text>
			</view>
			<HButton @click="takePicture">开始拍照</HButton>
		</view>
		<!-- 重新上传 -->
		<view v-show="hasPhoto">
			<view class="face">
				<image :src="faceUrl" mode=""></image>
			</view>
			<view class="tips-1">
				恭喜您！
			</view>
			<view class="tips-2">
				已成功开通人脸识别功能！
			</view>
			<HButton @click="takePicture">重新拍摄</HButton>
			<view class="msg-tip flex-ct-ct" @click="showTips">
				<image src="/pages/AI/images/msg-tip.png" mode=""></image>
				人脸录入须知
			</view>
		</view>
		<MessageBox></MessageBox>
	</view>
</template>

<script>
	import HButton from '../../../components/HButton.vue'
	import { pathToBase64 } from 'image-tools'
	import { uploadFace } from '../../../api/config.js'
	import { mapMutations } from 'vuex';
	import { getFaceUrl } from '../../../api/index.js'
	
	export default{
		components:{
			HButton
		},
		data(){
			return{
				hasPhoto:false,
				faceUrl:undefined
			}
		},
		onLoad(option) {
			let faceUrl = uni.getStorageSync('userInfo').faceUrl;
			if (faceUrl) {
			  this.getFaceUrl(faceUrl);
			} else {
			  this.hasPhoto= false
			}
		},
		methods:{
			...mapMutations(['MessageBox']),
			getFaceUrl(faceUrl){
				getFaceUrl({faceUrl}).then(res=>{
					this.faceUrl = res.data
					this.hasPhoto = truck
				})
			},
			takePicture(){
				let _this = this
				let userInfo = uni.getStorageSync('userInfo')
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['camera'], //从相册选择
				    success: function (res) {
						console.log(res)
						let tempFilePath = res.tempFilePaths[0]
						// 适用 h5 app wx小程序
						uni.showLoading({
							title: '上传中',
						})
						pathToBase64(tempFilePath)
						  .then(base64 => {
						    // console.log(base64)
							let data ={
								hasPhoto:_this.hasPhoto,
								userId:userInfo.id,
								tempFilePath:tempFilePath,
								faceBase64:base64
							}
							uploadFace(data).then(res=>{
								uni.hideLoading()
								if(res.code==1){
									let faceUrl = res.data;
									let userInfo = uni.getStorageSync('userInfo')
									userInfo.faceUrl = faceUrl;
									uni.setStorageSync('userInfo', userInfo);
									_this.setData({
										hasPhoto: true,
										faceUrl: tempFilePath
									})
								}else{
									uni.showToast({
									  title: '照片无法识别，请重新拍摄',
									  icon:"none",
									  duration:2000
									})
								}
							})
						  })
						  .catch(error => {
							uni.hideLoading()
						    console.error('图片转base64失败',error)
						  }) 
				    }
				});
			},
			showTips(){
				this.MessageBox({
					title:'人脸录入须知',
					type: 'HTML',
					msg:'人脸照片拍摄及上传，仅用于设备的人脸识别开门方式，不会用作其他商业用途。',
					visible: true
				})
			}
			
		}
	}
</script>

<style scoped>
	.title{
		padding-top: 100rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #1E1E1E;
		line-height: 44rpx;
		text-align: center;
		margin-bottom: 10rpx;
	}
	.sub-title{
		font-size: 24rpx;
		color: #FF5F62;
		line-height: 34rpx;
		text-align: center;
		margin-bottom: 96rpx;
	}
	.face-tip{
		display: block;
		margin: 0 auto;
		width: 548rpx;
		height: 530rpx;
	}
	.tip-text{
		padding: 12rpx 76rpx 158rpx;
		font-size: 26rpx;
		color: #909090;
		line-height: 36rpx;
	}
	.face{
		width: 448rpx;
		height: 448rpx;
		background: #D8D8D8;
		border: 4rpx solid #FF5F62;
		margin: 112rpx auto 88rpx;
		border-radius: 50%;
	}
	.face image{
		width: 100%;
		height: 100%;
	}
	.tips-1{
		font-size: 40rpx;
		font-weight: 600;
		color: #1E1E1E;
		line-height: 60rpx;		
		text-align: center;
	}
	.tips-2{
		font-size: 30rpx;
		font-weight: 500;
		color: #1E1E1E;
		line-height: 60rpx;
		text-align: center;
		margin-bottom: 252rpx;
	}
	.msg-tip{
		margin-top: 32rpx;
		font-size: 26rpx;
		color: #BCBCBC;
		line-height: 58rpx;
	}
	.msg-tip image{
		width: 24rpx;
		height: 24rpx;
		margin-right: 10rpx;
		display: block;
	}
</style>
