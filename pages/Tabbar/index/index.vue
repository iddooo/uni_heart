<template>
	<view class="page">
		<Banner :banners="banners" @click="itemClick"></Banner>
		<!-- 入口 -->
		<Entry :data="entries" @linkTo="linkTo"/>
		  
		<view class="title">附近回收设备</view>
		
		<view v-if="isLocation" class="station">
			<!-- 设备分类 -->
			<view class="station-hd">
				<view v-for="t in stationType" :key="t.id" 
				:class='{"station-type":true,"is-active":type==t.id}'
				@click="changeType(t.id)">{{t.name}}</view>
			</view>
			
			<!-- 可回收/有害-->
			<view v-show="type==1" class="staion-info">
				<!-- 设备位置 -->
				<StationLoc :data="min_station" @click="goMap" />
				<!-- 设备资源 -->
				<Resources :data="resources"/>
			</view>
			
			<!-- 厨余/其他-->
			<view v-show="type==2" class="staion-info">
				<!-- 设备位置 -->
				<StationLoc :data="min_kw_station" @click="goMap" />
				<!-- 设备资源 -->
				<KitchenWaste :data="min_kw_station" />
			</view>
		</view>
		<view v-else class="station no-station">
			<image src="/static/index/not-local.png" mode=""></image>
			<view class="tips">
				定位失败，请检测定位设置并重试
			</view>
			<button @click="setPremission" class="premission">重新加载</button>
		</view>
		
		<view v-if="isLogin">
			<!-- 环保金 -->
			<view class="money">
				<view class="title">我的环保金</view>
				<Gold :data="grandTotal" @navigatorToUrl="navigatorToUrl"/>
			</view>
			<!-- 排名 -->
			<view class="rank">
				<view class="title">小区排名</view>
				<Rank :data="rank" @goRanking="goRanking"/>
			</view>
		</view>
		<view v-else class="not-login">
			<view class="title mbt-50">请先登录</view>
			<HButton size="big" @click="goAuthority">登录/注册</HButton>
		</view>
		
		<!-- 确认邀请 -->
		<view class="add-f-box" v-if="fInvite">
			<view class="content-box">
				<view class="img-box">
					<image v-if="family.photo" :src="family.photo"></image>
					<image v-else src="/static/index/head.png"></image>
				</view>
				<view class="family-name">{{family.familyName}}</view>
				<view class="ivit">邀你加入家庭账号</view>
				<image class="f-left" src="/static/index/i-left.png"></image>
				<image class="f-right" src="/static/index/i-right.png"></image>
				<view class="f-house">
					<image src="/static/index/i-house.png"></image>
					<view class="des">一个账号 全家使用</view>
				</view>
				<view class="f-family">
					<image src="/static/index/i-family.png"></image>
					<view class="des">成员上传人 脸即可投递</view>
				</view>
				<view @click="acceptJoin" class="accept">接受</view>
				<view @click="rejectJoin" class="reject">拒绝</view>
				<view class="close-f" @click="rejectJoin">
					<image src="/static/index/close-f.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const api = require('.../../../api/index.js')
	let { getBanners, getNearest, getClassify, getNearestKc, myMoney, getAllRank, deliveringToken,userDelivering } = api
	import { postCode } from '../../../api/login.js'
	import { goLoginPageTimeOut } from '../../../common/index.js'
	import Banner from '../../../components/Banner.vue'
	import HButton from '../../../components/HButton.vue'
	import StationLoc from './StationLoc.vue'
	import Resources from '../../../components/Resources.vue'
	import KitchenWaste from '../../../components/KitchenWaste.vue'
	import Rank from './Rank.vue'
	import Entry from './Entry.vue'
	import Gold from './Gold.vue'
	
	export default {
		components:{
			Banner,
			HButton,
			StationLoc,
			Resources,
			KitchenWaste,
			Rank,
			Entry,
			Gold
		},
		data() {
			return {
				banners:[{}],
				
				entries: [{
					url: "",
					icon: "/static/index/scan.png",
					name: "扫码开箱",
					scan: true,
					needToken:true,
				  },
				  {
					url: "/pages/Classification/list/index",
					icon: "/static/index/classify.png",
					name: "回收分类"
				  },
				  {
					url: "/pages/ICCard/familyAccount/index",
					icon: "/static/index/family.png",
					name: "家庭账户",
					needToken: true,
					needPhone: true
				  },
				  {
					url: "/pages/About/guide/index",
					icon: "/static/index/guide.png",
					name: "新手指南"
				  },
				  // {
				  //   url: "/pages/Third/wallet/index",
				  //   icon: "/static/index/wallet.png",
				  //   name: "我的钱包",
				  //   badge: "/static/index/waiting.png"
				  // },
				],
				
				stationType:[{name:"可回收/有害",id:1},{name:"厨余/其他",id:2}],
				type:1,
				isLocation:false,
				location:undefined,
				
				min_station:{},
				resources:[
					// {"id":"411560080522219520","name":"饮料瓶","price":0.04,"imgUrl":"http://47.103.51.182:8000/icon/bottles-s.png","contry":null,"unit":"个","state":0,"sno":null},
					// {"id":"411560080522219521","name":"纸类","price":0.50,"imgUrl":"http://47.103.51.182:8000/icon/page-s.png","contry":null,"unit":"kg","state":0,"sno":null},
					// {"id":"411560080522219522","name":"纺织物","price":0.30,"imgUrl":"http://47.103.51.182:8000/icon/clothes-s.png","contry":null,"unit":"kg","state":0,"sno":null},
					// {"id":"411560080522219523","name":"有害","price":0.00,"imgUrl":"http://47.103.51.182:8000/icon/harmful-s.png","contry":null,"unit":"kg","state":0,"sno":null},
					// {"id":"411560080522219524","name":"塑料/金属","price":0.40,"imgUrl":"http://47.103.51.182:8000/icon/suliao-red.png","contry":null,"unit":"kg","state":2,"sno":null},
					// {"id":"411560080522219525","name":"玻璃","price":0.00,"imgUrl":"http://47.103.51.182:8000/icon/boli-red.png","contry":null,"unit":"kg","state":2,"sno":null}
				],
				
				min_kw_station:{},
				
				isLogin:false,
				money:0,
				grandTotal:[
					{name:"去提现",count:"0",url:"/pages/Money/withdraw/index"},
					{name:"累计收益",count:"0",url:undefined},
					{name:"我的积分",count:"0",url:"/pages/My/score/index"}
				],
				rank:[
					{id:3,name:"公益值排名",ranking:"1",url:"/pages/My/ranking/index",imgUrl:"/static/index/rank-1.png"},
					{id:2,name:"环保金排名",ranking:"1",url:"/pages/My/ranking/index",imgUrl:"/static/index/rank-2.png"},
					{id:1,name:"投递次数排名",ranking:"1",url:"/pages/My/ranking/index",imgUrl:"/static/index/rank-3.png",pics:[]},
				],
				item6:false,
				family:{},
				fInvite:false
			}
		},
		onLoad(e) {
			console.log(e)
			// 分享邀请 or 通过分享邀请加入家庭账户
			if (e.userId) {
			  uni.setStorageSync('invitedId', e.userId)
			}
			// #ifdef MP-WEIXIN
				if(e.familyId){
					uni.setStorageSync('familyId', e.familyId)
					uni.setStorageSync('family', e)
					this.family = e
					this.fInvite = true
				}else if(uni.getStorageSync('familyId')){
					console.log('先关闭后加入')
					this.family = uni.getStorageSync('family')
					this.fInvite = true
				}
			// #endif
		},
		onShow(){
			// 轮播图
			this.initPageData()
			// 获取定位
			// #ifdef H5
			this.testH5()
			// #endif
			this.initLocation()
			//是否登录
			let isLogin = uni.getStorageSync('isLogin')
			this.isLogin = isLogin
			//获取我的环保金
			this.getMyScore()
			this.getRank()
		},
		methods: {
			acceptJoin(){
				let that = this
				let userInfo =  uni.getStorageSync('userInfo')
				if(!userInfo){
				  console.log('登录注册并加入家庭')
				  app.goLoginPageTimeOut()
				  return
				}
			
				uni.login({
				      success: function(res) {
				        // 获取登陆凭证换取openid等信息
				        let invitedId = uni.getStorageSync('invitedId')
				        let familyId = uni.getStorageSync('familyId')
				        // 后台请求登录参数
				        let params = {
				          name: userInfo.nickname,
				          sex: userInfo.gender,
				          code: res.code,
				          invitedId: invitedId,
				          familyId:familyId
				        }
				        postCode(params).then(res=>{
				          if(res.code==1){
				            //加入成功 删除familyId
				            uni.removeStorageSync('familyId')
				            uni.showToast({
				              title: '恭喜您成功加入家庭账户',
				              icon: 'none',
				            })
				
				            setTimeout(() => {
				              uni.navigateTo({
				                url: '/pages/ICCard/familyAccount/index',
				              })
				            }, 200);
				          }else{
				            uni.showToast({
				              title: res.message,
				            })
				          }
						  this.fInvite = false
				        })
				      }
				    })
			},
			rejectJoin(){
				uni.removeStorageSync('familyId')
				uni.removeStorageSync('family')
				this.fInvite = false
			},
			getRank(){
				getAllRank().then(res=>{
					this.rank[0].ranking = res.data.welfareRank || '--'
					this.rank[1].ranking = res.data.profitRank || '--'
					this.rank[2].ranking = res.data.timesRank || '--'
					this.rank[2].pics = res.data.pics
				})
			},
			initPageData(){
				getBanners(1).then(res=>{
					this.banners = res.data.map(v=>{
						v.imgUrl = v.url
						return v
					})
				})
			},
			setPremission(){
				// / 打开小程序的设置
				// #ifdef MP-WEIXIN
				uni.openSetting({
					success(res) {
						console.log(res.authSetting)
					  }
				})
				// #endif
				
				// App跳转系统的设置界面
				// #ifdef APP-PLUS
				uni.getSystemInfo({
					success(res) {
						if(res.platform=='ios'){ //IOS
							plus.runtime.openURL("app-settings://");
						} else if (res.platform=='android'){ //安卓
							let main = plus.android.runtimeMainActivity();
							let Intent = plus.android.importClass("android.content.Intent");
							let mIntent = new Intent('android.settings.ACTION_SETTINGS');
							main.startActivity(mIntent);
						}
					}
				});
				// #endif
			},
			initLocation(){
				let _this = this
				uni.getLocation({
				    type: 'gcj02',
				    success: (res)=> {
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
						uni.setStorageSync('location',res)
						_this.isLocation = true
						//获取最近设备及资源信息
						_this.getNearestEqp()
						_this.getNearestKcEqp()
				    },
					fail:(err)=>{
						console.log("获取定位失败",err)
						// #ifdef MP-WEIXIN
						uni.showModal({
							title: '温馨提示',
							content: '您已拒绝定位,请开启',
							confirmText: '去设置',
							success(res){
								if (res.confirm) {
									//打开授权设置
									_this.setPremission()
								}
							}
						})
						// #endif
					},
					complete:()=> {
						console.log('获取定位完成')
					}
				})
			},
			testH5(){
				/*测试*/
				// 成都菁蓉汇 {"latitude":30.53811264038086,"longitude":104.06261444091797}
				// 环球中心 {"latitude":30.576278948067543,"longitude":104.07121596411592}
				let location = {"latitude":30.53811264038086,"longitude":104.06261444091797}
				uni.setStorageSync('location',location)
				this.isLocation = true
				this.getNearestEqp()
				this.getNearestKcEqp()
			},
			changeType(type){
				console.log('却换设备')
				this.type= type
				if(type==1){
					console.log('展示可回收设备')
				}else{
					console.log('展示厨余设备')
				}
			},
			async getNearestEqp(){
				let location = uni.getStorageSync('location')
				let res = await getNearest(location)
				this.min_station = res.data.min_station
				this.min_station.min_dis = res.data.min_dis
				uni.setStorageSync('station',this.min_station)
				
				let resp = await getClassify(this.min_station.id)
				let resources = resp.data.concat(resp.data)
				this.resources = resources
			},
			async getNearestKcEqp(){
				let location = uni.getStorageSync('location')
				let res = await getNearestKc(location)
				this.min_kw_station = res.data.min_station
				this.min_kw_station.min_dis = res.data.min_dis
				this.min_kw_station.sno = res.data.sno
				uni.setStorageSync('kw_station',this.min_kw_station)
			},
			scanToDelivery(){
				// #ifdef H5
				uni.showToast({
					title:'功能暂未开放，敬请期待'
				})
				// #endif
				// #ifndef H5 
				let isLogin = uni.getStorageSync('isLogin')
				if(!isLogin){
					goLoginPageTimeOut()
					return
				}
				uni.scanCode({
				    success: function (res) {
						// http://xhx.synpowertech.com:9005/201907270034/1566358019527
						let result = res.result
						let arr = result.split('/')
						//绑定设备
						// wx.login({
						// 	async success(res) {
						// 		//1.东莞账号查询通过code，获取openid 和 东莞token
						// 		let resp = await deliveringToken(res.code)
						// 		if(res.status !==0 ){
						// 			uni.showModal({
						// 				title:res.msg
						// 			})
						// 			return
						// 		}
						// 		let data = {
						// 			openid: resp.openid,
						// 			token:resp.token,
						// 			deviceSn: arr[arr.length - 2],
						// 			time: arr[arr.length - 1],
						// 			appid: 'wx79d70ef10138edc1',
						// 		}
						// 		//2. 东莞设备绑定
						// 		let result = await userDelivering(data)
						// 		if(result.indexOf('ok') > 0){
						// 			uni.navigateTo({
						// 			  url: '/pages/Money/delivering/index',
						// 			})
						// 		}else{
						// 			console.log(result)
						// 		}
						// 	}
						// })
						// 优化：取消第一步，在第二步直接通过openid绑定用户
						let userInfo = uni.getStorageSync('userInfo')
						let data = {
							openid: userInfo.openid,
							token:'c1c7e63efc352d9af998cd331f8d8edc', //优化应该减掉
							deviceSn: arr[arr.length - 2],
							time: arr[arr.length - 1],
							appid: 'wx79d70ef10138edc1',
						}
						//2. 东莞设备绑定
						userDelivering(data).then(result=>{
							//忽略结果扫码成功
							uni.navigateTo({
							  url: '/pages/Money/delivering/index',
							})
							///提示信息
							if(result.indexOf('ok') > 0){
								console.log('扫码成功开始投递');
							}else{
								console.log(result)
							}
						})
				    }
				})
				// #endif
			},
			navigatorToUrl(item){
				let url = item.url
				if(!url) return
				uni.navigateTo({url});
			},
			goRanking(item){
				uni.navigateTo({url:item.url +"?id="+ item.id});
			},
			getMyScore(){
				let userId = uni.getStorageSync('userId')
				myMoney(userId).then(res=>{
					if(res.code != 1) return
					this.grandTotal[0].count = res.data.currentProfit
					this.grandTotal[1].count = res.data.countProfit
					this.grandTotal[2].count = res.data.currScore
					this.money = res.data.currentProfit
					uni.setStorageSync('money',this.money)
				})
			},
			goAuthority(){
				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url:"/pages/Authorize/wx/index"
				})
				// #endif
				// #ifdef APP-PLUS || H5
					uni.navigateTo({
						url:"/pages/Authorize/login/index"
					})
				// #endif
				
			},
			goMap(){
				uni.navigateTo({
					url:"/pages/Map/map/index?type="+ this.type
				})
			},
			linkTo(item) {
				let { url, needToken, needPhone, scan } = item
			
			    let token = uni.getStorageSync('token');
			    let userInfo = uni.getStorageSync('userInfo');
			
			    if(needToken && !token){
			      goLoginPageTimeOut()
			      return
			    }
			
			    // #ifdef MP-WEIXIN
			    if(needPhone && !userInfo.phoneType){
			      uni.navigateTo({
			        url: '/pages/authorize/index?phoneType=false&redirectUrl=/pages/Third/familyAccount/index'
			      })
			      return
			    }
			    // #endif
				
			
			    if (scan) {
				// #ifdef H5
					uni.showToast({
						title:'功能暂未开放，敬请期待'
					})
				// #endif
				// #ifndef H5
					this.scanToDelivery()
				// #endif
				
			      return
			    }
				uni.switchTab({ url })
			    uni.navigateTo({ url })
			 },
			itemClick(index){
				// console.log(index)
				let name = this.banners[index].name
				//shop 商城
				//share 文章发现
				//guide 引导页
				//score 我的积分
				//ai 语音识别
				let map = {
					shop:'/pages/Tabbar/shop/index',
					share:"/pages/Tabbar/foundList/index",
					guide:"/pages/About/guide/index",
					score:"/pages/My/score/index",
					ai:"/pages/Tabbar/voiceRecognition/index",
				}
				let url = map[name]
				uni.switchTab({ url })
				uni.navigateTo({ url })
				// console.log(name)
			}
		}
	}
</script>

<style scoped>
	.station{
		width: 646rpx;
		height: 400rpx;
		border:2px solid rgba(226,226,226,1);
		border-radius:16rpx;
		margin: 44rpx auto 0;
		background-color: #FFFFFF;
		position: relative;
	}
	.no-station{
		text-align: center;
		padding-top: 30rpx;
		height:458rpx;
	}
	.no-station image{
		width: 374rpx;
		height: 226rpx;
	}
	.premission{
		width:194rpx;
		height:62rpx;
		border-radius:31rpx;
		border:2rpx solid rgba(255,95,98,1);
		font-size:28rpx;
		color:rgba(255,95,98,1);
		line-height: 62rpx;
		text-align: center;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	.tips{
		margin: 16rpx 0;
		font-size:26rpx;
		line-height:36rpx;
	}
	.station-hd{
		height: 74rpx;
		display: flex;
		align-items: center;
	}
	.station-type{
		width: 50%;
		text-align: center;
		font-size:28rpx;
		font-weight:600;
	}
	.station-type.is-active{
		color: #FF5F62;
	}
	
	.staion-info{
		padding-top: 28rpx;
	}
	
	.money{
		padding-top: 46rpx;
		padding-bottom: 60rpx;
	}
	.title{
		font-size:34rpx;
		font-weight:600;
		color:rgba(51,51,51,1);
		line-height:48rpx;
		padding-left: 50rpx;
		position: relative;
	}
	.title::after{
		content: "";
		position: absolute;
		left: 20rpx;
		top: 10rpx;
		width:8rpx;
		height:26rpx;
		background:rgba(255,95,98,1);
		border-radius:5rpx;
	}
	
	.not-login{
		padding-top: 50rpx;
	}
		
	.not-login.mbt-50{
		margin-bottom: 50rpx;
	}
	
	.add-f-box {
	  position: fixed;
	  left: 0;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  background-color: rgba(0, 0, 0, .6);
	  z-index: 999;
	}
	
	.content-box {
	  text-align: center;
	  position: absolute;
	  left: 50%;
	  top: 50%;
	  transform: translate(-50%, -50%);
	  width: 654rpx;
	  height: 710rpx;
	  background: rgba(249, 249, 249, 1);
	  border-radius: 10rpx;
	}
	
	.img-box {
	  position: absolute;
	  left: 50%;
	  top: 0;
	  transform: translate(-50%, -50%);
	  width: 170rpx;
	  height: 170rpx;
	  border: 5rpx solid #fff;
	  border-radius: 50%;
	  background-color: #fff;
	  overflow: hidden;
	}
	.img-box image{
		width: 100%;
		height: 100%;
	}
	
	.family-name {
	  font-size: 36rpx;
	  font-family: PingFangSC-Medium, PingFang SC;
	  font-weight: 500;
	  color: rgba(51, 51, 51, 1);
	  line-height: 50rpx;
	  padding-top: 106rpx;
	  margin-bottom: 40rpx;
	}
	
	.ivit {
	  font-size: 36rpx;
	  font-family: PingFangSC-Medium, PingFang SC;
	  font-weight: 500;
	  color: rgba(51, 51, 51, 1);
	  line-height: 50rpx;
	  margin-bottom: 282rpx;
	}
	
	.f-left ,.f-right {
	  position: absolute;
	  top: 204rpx;
	  width: 72rpx;
	  height: 34rpx;
	}
	
	.f-left {
	  left: 90rpx;
	}
	
	.f-right {
	  right: 90rpx;
	}
	.f-house,.f-family{
	  position: absolute;
	  top: 296rpx;
	  font-size:26rpx;
	  color:rgba(30,30,30,1);
	  line-height:36rpx;
	}
	.f-house {
	  left: 104rpx;
	  width: 106rpx;
	}
	.f-family{
	  right: 104rpx;
	  width: 134rpx;
	}
	.f-house image,.f-family image{
	  width: 102rpx;
	  height: 102rpx;
	  margin-bottom: 8rpx;
	}
	.accept,.reject{
	  width:554rpx;
	  height:80rpx;
	  border-radius:4rpx;
	  line-height: 80rpx;
	  text-align: center;
	  margin: 0 auto;
	  font-size: 32rpx;
	}
	.accept{
	  background:rgba(255,95,98,1);
	  color: #fff;
	
	}
	.reject{
	  color: #909090;
	}
	
	.close-f{
	  position: absolute;
	  width: 90rpx;
	  height: 90rpx;
	  padding: 10rpx;
	  left: 50%;
	  transform: translateX(-50%);
	  bottom: -126rpx;
	}
	.close-f image{
	  width: 70rpx;
	  height: 70rpx;
	  display: block;
	}
	
</style>
