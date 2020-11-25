<template>
	<view class="page">
		<!-- 搜索框 -->
		<SearchBox :disabled="true" @click="linkTo"></SearchBox>
		
		
		<!-- step===1 语音提示 -->
		<view class="tips-box bt-70" v-show="step===1">
			<view class="title">请点击麦克风</view>
			<view class="title mb-40">输入您要分类的垃圾</view>
			<view class="sub-title">例如您可以说：</view>
			<view class="sub-title">“纸巾”</view>
			<view class="sub-title">“剩饭”</view>
			<view class="sub-title">“水果皮”</view>
			<view class="sub-title">“外卖盒”</view>
		</view>
		
		<!-- step===2 正在说-->
		<view class="tips-box" v-show="step===2">
			<view class="title">我正在听…</view>
		</view>
		
		<!-- step===3 正在识别中 hd-->
		<view class="tips-box" v-show="step===3">
			<view class="title">正在识别中…</view>
		</view>
		
		<!-- step===4 未识别出来-->
		<view class="tips-box" v-show="step===4">
			<view class="title mb-40">对不起，我没听清你说什么</view>
			<view class="sub-title">请点击按钮，重新试试</view>
		</view>
		
		<!-- step===5 识别出来 未能找到关键字-->
		<view class="tips-box" v-show="step===5">
			<view class="title mb-40">未能找到</view>
			<view class="title mb-40"> {{keyword}} </view>
			<view v-if="!isFadeback" @click="fadeback" class="no-words">点击此处反馈“{{keyword}}”让小红心收录</view>
			<view v-else class="no-words">感谢您的反馈</view>
		</view>
		
		<!-- step===6 识别出来 找到关键字-->
		<view class="tips-box" v-show="step===6">
			<view class="title"> {{ keyword}} </view>
		</view>
		
		<view class="vioce-wave" v-show="step===2">
			<image src="/static/index/voicewave.gif" mode=""></image>
		</view>
		
		<view class="vioce-icon">
			<image class="icon" @click="authModel" v-if="step===3 || !openVoice" src="/static/index/voice-hd.png" mode=""></image>
			<view class="icon" @touchstart="handleTouchStart" @touchend="handleTouchEnd" v-else >
				<image src="/static/index/voice-on.png" mode=""></image>
			</view>
			<view class="txt">按住说话</view>
		</view>
		
	</view>
</template>

<script scoped>
	import { searchKeywords, garbageFeedback } from '../../../api/index.js'
	import { uploadVoice } from '../../../api/config.js'
	import SearchBox from '../../../components/SearchBox.vue'
	
	export default{
		components: {
			SearchBox,
		},
		data(){
			return{
				keyword:undefined,
				step:1,
				isFadeback:false,
				openVoice:false,
				recorderManager:undefined
				
			}
		},
		onLoad() {
			this.initRecorderManager()
			// 询问授权
			this.auth()
			//验证版本
			this.validVersion()
		},
		methods:{
			auth(){
				let that = this
				uni.getSetting({
				  success: function (res) {
				    console.log('获取授权信息',res)
				      if (!res.authSetting['scope.record']) {
				          uni.authorize({
				            scope: 'scope.record',
				            fail:()=>{
								that.openVoice = false
				            },
							success: () => {
								that.openVoice = true
							}
				          })
				      }else{
				        that.openVoice = true
				      }
				  },
				  fail: function (res) {
				      uni.showToast({
				          title: '调用授权窗口失败',
				          icon: 'none',
				          duration: 1000
				      })
				  }
				})
			},
			authModel(){
				// #ifdef H5
				uni.showToast({
				    title: '暂时无法使用该功能',
				    icon:"none"
				})
				return
				// #endif
				
				// #ifdef MP-WEIXIN
				if(!this.canUseVoice){
					uni.showToast({
					    title: '您的微信版本较低，暂时无法使用该功能',
					    icon:"none"
					})
					return
				}
				// #endif
				
				let that = this
				uni.showModal({
				  title: '提示',
				  content: '是否开启录音授权',
				  success: function (tip) {
				    if (tip.confirm) {
				      uni.openSetting({
				        success: function (data) {
				            if (data.authSetting["scope.record"] === true) {
				                uni.showToast({
				                    title: '授权成功',
				                    icon: 'success',
				                    duration: 1000
				                })
				                //授权成功之后，
				                that.openVoice = true
				            } else {
				                uni.showToast({
				                    title: '授权失败',
				                    icon: 'success',
				                    duration: 1000
				                })
				                that.openVoice = false
				            }
				        }
				      })
				    }
				  }
				})
			},
			validVersion(){
			    uni.getSystemInfo({
			      complete: (res) => {
			        // console.log(res)
			        let version = res.version
			        // 1 a > b 
			        // 0 a = b
			        //-1 a < b
			        if(this.compareVersion(version, '7.0.8')==1){
			          this.canUseVoice = true
			        }else{
			          this.canUseVoice = false
			        }
			      },
			    })
			},
			compareVersion(v1, v2) {
			    v1 = v1.split('.')
			    v2 = v2.split('.')
			    var len = Math.max(v1.length, v2.length)
			  
			    while (v1.length < len) {
			      v1.push('0')
			    }
			    while (v2.length < len) {
			      v2.push('0')
			    }
			  
			    for (var i = 0; i < len; i++) {
			      var num1 = parseInt(v1[i])
			      var num2 = parseInt(v2[i])
			  
			      if (num1 > num2) {
			        return 1
			      } else if (num1 < num2) {
			        return -1
			      }
			    }
			    return 0
			},
			initRecorderManager() {
			    const recorderManager = uni.getRecorderManager()
			    this.recorderManager = recorderManager
				
			    recorderManager.onStart(() => {
			      console.log('录音开始了')
			      this.step = 2
			    })
			
			    recorderManager.onInterruptionBegin(() => {
			      this.step = 4
			    })
			
			    recorderManager.onStop((res) => {
			      this.step = 3
			      // 识别录音
			      this.recognition(res) 
			    })
			
			    recorderManager.onError((err) => {
			      recorderManager.stop()
			    })
			},
			handleTouchStart(){
				//录音参数
				const options = {
				  duration: "60000",
				  sampleRate: 8000, //采样率
				  format: 'PCM' //音频格式
				  // format:"mp3"
				}
				//开启录音
				this.recorderManager.start(options);
			},
			handleTouchEnd(){
			    this.recorderManager.stop()
			},
			recognition(res) {
			    console.log('录音文件', res.tempFilePath)
			    const tempFilePath = res.tempFilePath
				uploadVoice(tempFilePath).then(result=>{
					
					if(res.code===0){
						console.log('uploadVoice 接口连接失败');
						this.step = 4
						return
					}
					
					let data = JSON.parse(result.data)
					let resultArr = data.result //识别结果
					console.log('识别完成:',data);
					
					if(resultArr){
						let text = resultArr[0].replace(/。/g,'')
						if(text.indexOf('我不知道')!=-1){
							console.log('结果不明白');
							text = ''
							this.step = 4
							return
						}
						
						// 识别出来 模糊搜素关键字
						this.keyword = text
						this.fuzzySearch()
						
					}else{
					  //没有结果 未识别出来
					  console.log('没有结果');
					  this.step = 4
					}
				},reject=>{
					// 接口连接失败
					console.log('uploadVoice 接口连接失败');
					this.step = 4
				})
			},
			fuzzySearch(){
				console.log('搜索关键字',this.keyword);
				searchKeywords(this.keyword).then(res=>{
					if(res.code==1){
						this.keywordsList = res.data
						this.step = 6
					}else{
						this.step = 5
					}
				})
			},
			linkTo(){
				uni.navigateTo({
					url:"/pages/Classification/search/index"
				})
			},
			chooseItem(item){
				// 弹出当前关联项
				console.log(item);
			},
			fadeback(){
				let userInfo = uni.getStorageSync('userInfo')
				let data = {
					content:this.keyword,
					name:userInfo.nickname,
					phone:userInfo.phone
				}
				garbageFeedback(data).then(res=>{
					if(res.code==1){
						this.isFadeback = true
					}else{
						this.step = 4
					}
				})
			}
		}
	}
</script>

<style scoped>
	.tips-box{
		text-align: center;
		margin-top: 118rpx;
	}
	
	.mb-40{
		margin-bottom: 40rpx;
	}
	
	.mt-70{
		margin-top: 70rpx;
	}
	
	.title {
		font-size: 36rpx;
		font-weight: 600;
		color: #333333;
		line-height: 50rpx;	
	}
	
	.sub-title{
		font-size: 26rpx;
		color: #727272;
		line-height: 64rpx;
	}
	.vioce-icon{
		position: fixed;
		bottom: 142rpx;
		left: 50%;
		transform: translateX(-50%);
		font-size: 26rpx;
		color: #B9B9B9;
		text-align: center;
	}
	.icon{
		width: 128rpx;
		height: 128rpx;
		display: block;
		margin-bottom: 20rpx;
	}
	.icon image{
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.vioce-wave{
		width: 100%;
		height: 200rpx;
		margin-top: 35vh;	
	}
	.vioce-wave image{
		width: 100%;
		height: 100%;
	}
	.no-words{
		font-size: 28rpx;
		color: rgba(144, 144, 144, 1);
		line-height: 40rpx;
	}
</style>
