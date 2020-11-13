<template>
	<view class="page">
		<view class="line flex-ct-bwt">
			<view class="label">头像</view>
			<view class="content arrow">
				<view class="head-photo" @click="updataPhoto">
					<!-- #ifdef MP-WEIXIN -->
						<open-data class="headpic" type="userAvatarUrl"></open-data>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
						<image v-if="userInfo.headPic" class="headpic"  :src="userInfo.headPic" mode=""></image>
						<image v-else class="headpic"  src="/static/index/head.png" mode=""></image>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="line flex-ct-bwt">
			<view class="label">微信昵称</view>
			<view class="content arrow" @click="updataNickname">
				{{userInfo.nickname}}
			</view>
		</view>
		<view class="line flex-ct-bwt">
			<view class="label">手机号</view>
			<view class="content">
				<text v-if="userInfo.phone">{{userInfo.phone}}</text>
				<text v-else class="fc" @click="getPhoneNum">未设置</text>
			</view>
		</view>
		<view class="line flex-ct-bwt">
			<view class="label">性别</view>
			<view class="content arrow">
				<picker mode="selector" :value="userInfo.sex" :range="sexRang" @change="bindSexChange">
					<view :class="{'fc':userInfo.sex===null}">{{userInfo.sex==0 ? '女' : userInfo.sex==1 ? '男' :'未设置'}}</view>
				</picker>
				<!-- <text v-if="userInfo.sex!==null">{{userInfo.sex==0 ? '女' : '男'}}</text>
				<text v-else class="fc" @click="setSex">
					未设置
				</text> -->
			</view>
		</view>
		<view class="line flex-ct-bwt">
			<view class="label">生日</view>
			<view class="content arrow">
				<!-- <text v-if="userInfo.birthday">{{userInfo.birthday}}</text>
				<text v-else class="fc">请选择日期</text> -->
				<picker mode="date" :value="userInfo.birthday" @change="bindBirthdayChange">
					<view :class="{'fc':userInfo.userInfo===null}">{{userInfo.birthday ? userInfo.birthday:'未设置'}}</view>
				</picker>
			</view>
		</view>
		
		<view class="btm">
			<HButton @click="submit">提交</HButton>
		</view>
		
		<view class="pop" v-show="showPop">
			<view class="mask"></view>
			<view class="box">
				<view class="title">
					修改昵称
				</view>
				<view class="ipt-box flex-ct">
					<input class="ipt" type="text" :value="nickname" @input="inputName"/>
					<view class="clear-box" @click="clear" >
						<image src="/static/authorize/clear.png" mode=""></image>
					</view>
				</view>
				<view class="btns flex-ct-bwt">
					<button @click="cancel" class='plain'>取消</button>
					<button @click="success">确认</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HButton from '../../../components/HButton.vue'
	import { setInfo } from '../../../api/index.js'
	import { uploadHeadPic } from '../../../api/config.js'
	import { URL } from '../../../common/index.js'
	
	export default {
		components: {
			HButton
		},
		data(){
			return{
				userInfo:{},
				URL,
				showPop:false,
				nickname:undefined,
				sex:undefined,
				sexRang:['女','男']
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		methods:{
			updataNickname(){
				return
				this.showPop = true
				this.nickname = this.userInfo.nickname
			},
			inputName(e){
				this.nickname = e.target.value
			},
			clear(){
				this.nickname = undefined
			},
			cancel(){
				this.showPop = false
			},
			success(){
				if(!this.nickname){
					uni.showToast({
						title:"昵称不能为空",
						icon:"none"
					})
					return
				}
				
			},
			updataPhoto(){
				// #ifdef MP-WEIXIN
					return
				// #endif
				let _this = this
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        // console.log(JSON.stringify(res.tempFilePaths));
						let data = {
							userId : uni.getStorageSync('userId'),
							path:res.tempFilePaths[0]
						}
						uploadHeadPic(data).then(res=>{
							if(res.code==1){
								console.log(res);
								_this.userInfo.headPic = res.data
								uni.setStorageSync('userInfo',_this.userInfo)
							}
						})
				    }
				});
			},
			getPhoneNum(){
				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url:"/pages/Authorize/wx/index?step=2"
				})
				// #endif
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url:'/pages/Authorize/login/index'
				})
				
				// #endif
			},
			bindSexChange(e){
				this.userInfo.sex = e.detail.value
			},
			bindBirthdayChange(e){
				this.userInfo.birthday = e.detail.value
			},
			submit(){
				let userId = uni.getStorageSync('userId');
				let data = {
				  id: userId,
				  sex: this.userInfo.sex,
				  birthday: this.userInfo.birthday
				}
				setInfo(data).then(res=>{
					if(res.code==1){
						uni.setStorageSync('userInfo',this.userInfo)
						uni.showToast({
							title:"设置成功",
						})
						setTimeout(()=>{
							uni.switchTab({
								url:"/pages/Tabbar/mine/index"
							})
						},1000)
					}else{
						uni.showToast({
							title:"设置失败，请稍后再试",
							icon:"error"
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.mask{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #000000;
		opacity: 0.4;	
	}
	.box{
		width: 654rpx;
		height: 498rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-sizing: border-box;
		padding: 40rpx 50rpx;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
	}
	.title{
		font-size: 34rpx;
		font-weight: 500;
		margin-bottom: 64rpx;
	}
	.ipt-box{
		width: 554rpx;
		height: 82rpx;
		background: #FFFFFF;
		border: 2rpx solid #E2E2E2;
		color: #000000;
		font-size: 30rpx;
		margin-bottom: 118rpx;
		padding-left: 18rpx;
		box-sizing: border-box;
		padding-right: 24rpx;
	}
	.ipt{
		flex: 1;
	}
	.ipt-box .clear-box{
		padding: 10rpx;
	}
	.clear-box image{
		display: block;
		width: 34rpx;
		height: 36rpx;
	}
	.btns button{
		width:244rpx;
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
	
	.btm{
		position: absolute;
		bottom: 96rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.line{
		height: 102rpx;
		border-bottom: 2rpx solid #F6F6F6;
		padding: 0 20rpx 0 30rpx;
		font-size: 28rpx;
		color: #000000;
	}
	.content{
		text-align: right;
		padding-right: 20rpx;
		position: relative;
		display: flex;
		align-items: center;
	}
	.arrow::after{
		content: "";
		position: absolute;
		right: 0;
		top: 50%;
		width: 15rpx;
		height: 15rpx;
		transform:translateY(-50%) rotate(45deg);
		border-width: 2rpx;
		border-style: solid;
		border-color: #CDCDCD #CDCDCD transparent transparent;
	}
	.head-photo{
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.headpic{
		width: 100%;
		height: 100%;
	}
	.fc{
		color: #CDCDCD;
	}
</style>
