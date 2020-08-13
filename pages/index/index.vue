<template>
	<view class="page">
		<view class="swiper-container">
			<swiper class="swiper" 
				:indicator-dots="indicatorDots" 
				:autoplay="autoplay" 
				interval="2000"
				@change="swiperChange">
				<swiper-item v-for="v in banners" :key="v.id">
					<image class="banner-img" :src="v.redirectUrl" mode="scaleToFill"></image>
				</swiper-item>
			</swiper>
			<!-- 自定义小圆点 -->
			<view class="dots">
				<view v-for="(v,i) in banners" :key="i" :class="{dot:true,'is-active':currentIndex==i}"></view>
			</view>
		</view>
		
		<!-- 入口 -->
		<view class="entry">
		    <view class="entry-item" 
			v-for="(item,index) in entries" 
			:key="index" 
			:data-url="item.url"
			:data-need="item.need"
			:data-need-phone="item.needPhone"
			:data-scan="item.scan"
			@click="linkTo">
			  <image class="badge" :src="item.badge"></image>
			  <image class="icon" :src="item.icon"></image>
			  <view>{{item.name}}</view>
			</view>
		</view>
		  
		<view class="title">附近回收设备</view>
		<view v-if="isLocation" class="station">
			<!-- 设备分类 -->
			<view class="station-hd">
				<view v-for="t in stationType" :key="t.id" 
				:class='{"station-type":true,"is-active":type==t.id}'
				@click="changeType(t.id)">{{t.name}}</view>
			</view>
			<!-- 设备资源  可回收/有害-->
			<view v-show="type==1" class="staion-info">
				<!-- 设备位置 -->
				<view class="location flex-ct-bwt">
					<view class="flex-ct loc">
						<image class="site" src="/static/index/site.png" mode=""></image>
						<text>{{min_station.complex}}</text>
					</view>
					<view class="flex-ct dist" @click="goMap">
						<text class="about">约</text><text>{{min_dis}}</text>
					</view>
				</view>
				<swiper class="r-c-swiper" @change="cateSwiperChange">
					<swiper-item v-for="(resources,i) in swiperData" :key="i">
						<view :class="{'resources':true,'item-6':item6 }">
							<view v-for="(item,index) in resources" :key="index" class="category">
								<image class="cls" :src="item.imgUrl" mode=""></image>
								<image v-if="item.state" class="state" :src="'/static/index/box-state' + item.state +'.png'" mode=""></image>
								<view class="name">{{item.name}}</view>
								<view class="count">{{item.price}}元/{{item.unit}}</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
				<view class="c-dots flex" v-if="swiperData.length>1">
				  <view v-for="(r,i) in swiperData" :key="i" :class="['c-dot', {'active': cur==i}]"></view>
				</view>
				
				<!-- <button @click="scanToDelivery" class="scan">扫码投递</button> -->
			</view>
			<!-- 设备资源  厨余/其他-->
			<view v-show="type==2" class="staion-info">
				<!-- 设备位置 -->
				<view class="location flex-ct-bwt">
					<view class="flex-ct loc">
						<image class="site" src="/static/index/site.png" mode=""></image>
						<text>{{min_kw_station.complex}}</text>
					</view>
					<view class="flex-ct dist" @click="goMap">
						<text class="about">约</text><text>{{min_kw_dis}}</text>
					</view>
				</view>
				<view class="flex">
					<view class="item-2">
						<image :src="'/static/index/liquid-red-'+ kitchen +'.png'" mode=""></image>
						<view class="capacity">{{min_kw_station.kitchenCapacity}}%</view>
						<view>厨余垃圾</view>
					</view>
					<view class="item-2">
						<image :src="'/static/index/liquid-yellow-'+other+'.png'" mode=""></image>
						<view class="capacity">{{min_kw_station.otherCapacity}}%</view>
						<view>其他垃圾</view>
					</view>
				</view>
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
				<view class="grand-total flex-ct-bwt">
					<view class="box" 
					@click="navigatorToUrl(item)" 
					v-for="(item,index) in grandTotal" :key="index">
						<view class="count">{{item.count}}</view>
						<view :class="{'name':true,'btn':index==0}">{{item.name}}</view>
					</view>
				</view>
			</view>
			<!-- 排名 -->
			<view class="rank">
				<view class="title">小区排名</view>
				<view class="rank-type flex-ct-bwt">
					<view class="type" 
					@click="goRanking(item)"
					v-for="item in rank" :key="item.id">
						<view class="rank-name">
							<image :src="item.imgUrl" mode=""></image>
							<text>{{item.name}}</text>
						</view>
						<view class="cur">
							{{item.ranking}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="not-login">
			<view class="title">请先登录</view>
			<button class="authority" @click="goAuthority">授权登录</button>
		</view>
	</view>
</template>

<script>
	const api = require('../../api/index.js')
	let { getBanners, getNearest, getClassify, getNearestKc, myMoney, getAllRank, deliveringToken,userDelivering } = api
	// import { getBanners, getNearest, getClassify, getNearestKc, myMoney, getAllRank } from '../../api/index.js'
	import { goLoginPageTimeOut } from '../../common/index.js'
	
	export default {
		data() {
			return {
				indicatorDots:false,
				autoplay:true,
				banners:[{}],
				currentIndex:0,
				
				entries: [{
					url: "",
					icon: "/static/index/scan.png",
					name: "扫码开箱",
					scan: true,
					need:true,
				  },
				  {
					url: "/pages/classification/index",
					icon: "/static/index/classify.png",
					name: "回收分类"
				  },
				  {
					url: "/pages/mine/familyAccount/index",
					icon: "/static/index/family.png",
					name: "家庭账户",
					need: true,
					needPhone: true
				  },
				  {
					url: "/pages/about/guide/index",
					icon: "/static/index/guide.png",
					name: "新手指南",
					need: false
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
				min_dis:0,
				resources:[
					// {"id":"411560080522219520","name":"饮料瓶","price":0.04,"imgUrl":"http://47.103.51.182:8000/icon/bottles-s.png","contry":null,"unit":"个","state":0,"sno":null},
					// {"id":"411560080522219521","name":"纸类","price":0.50,"imgUrl":"http://47.103.51.182:8000/icon/page-s.png","contry":null,"unit":"kg","state":0,"sno":null},
					// {"id":"411560080522219522","name":"纺织物","price":0.30,"imgUrl":"http://47.103.51.182:8000/icon/clothes-s.png","contry":null,"unit":"kg","state":0,"sno":null},
					// {"id":"411560080522219523","name":"有害","price":0.00,"imgUrl":"http://47.103.51.182:8000/icon/harmful-s.png","contry":null,"unit":"kg","state":0,"sno":null},
					// {"id":"411560080522219524","name":"塑料/金属","price":0.40,"imgUrl":"http://47.103.51.182:8000/icon/suliao-red.png","contry":null,"unit":"kg","state":2,"sno":null},
					// {"id":"411560080522219525","name":"玻璃","price":0.00,"imgUrl":"http://47.103.51.182:8000/icon/boli-red.png","contry":null,"unit":"kg","state":2,"sno":null}
				],
				swiperData:[],
				cur:0,
				
				min_kw_station:{},
				min_kw_dis:0,
				kitchen:0,
				other:0,
				
				isLogin:false,
				money:0,
				grandTotal:[
					{name:"去提现",count:"10.70",url:"/pages/Money/withdraw/index"},
					{name:"累计收益",count:"155",url:undefined},
					{name:"我的积分",count:"2134",url:"/pages/Score/score/index"}
				],
				rank:[
					{id:3,name:"公益值排名",ranking:"15",url:"/pages/Score/ranking/index",imgUrl:"/static/index/rank-1.png"},
					{id:2,name:"投递次数排名",ranking:"12",url:"/pages/Score/ranking/index",imgUrl:"/static/index/rank-2.png"},
					{id:1,name:"环保金排名",ranking:"9",url:"/pages/Score/ranking/index",imgUrl:"/static/index/rank-3.png"},
				],
				item6:false
				
			}
		},
		onLoad(e) {
			console.log(e)
			//首页启动存储被分享人的id
			let invitedId = e.userId
			uni.setStorageSync('invitedId',invitedId)
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
		},
		methods: {
			swiperChange(e){
				this.currentIndex = e.detail.current - 1
			},
			initPageData(){
				getBanners(1).then(res=>{
					this.banners = res.data
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
				this.min_dis = res.data.min_dis
				let resp = await getClassify(this.min_station.id)
				let resources = resp.data.concat(resp.data)
				// let resources = resp.data
				this.item6 = resources.length > 4
				this.swiperData = this.truck(resources,6)
				uni.setStorageSync('station',res.data)
			},
			truck(arr,count){
			  let result = [];
			  //遍历输出成员
			  arr.forEach((item,index) => {
				//
				let temp = Math.floor(index / count);
				//检验数组是否初始化
				if(!(result[temp] instanceof Array)){
				  result[temp] = new Array;
				}
				result[temp].push(item);
			  })
			  return result;
			},
			cateSwiperChange(e){
				console.log(e)
				this.cur = e.detail.current
			},
			async getNearestKcEqp(){
				let location = uni.getStorageSync('location')
				let res = await getNearestKc(location)
				this.min_kw_station = res.data.min_station
				this.min_kw_dis = res.data.min_dis
				uni.setStorageSync('kw_station',res.data)
				this.kitchen = (Number(this.min_kw_station.kitchenCapacity)/30).toFixed(0)
				this.other = (Number(this.min_kw_station.otherCapacity)/30).toFixed(0)
				if(this.min_kw_station.kitchenfull){
					this.min_kw_station.kitchenCapacity = '暂满'
				}else{
					this.min_kw_station.kitchenCapacity += '%'
				}
				if(this.min_kw_station.otherfull){
					this.min_kw_station.otherCapacity = '暂满'
				}else{
					this.min_kw_station.otherCapacity += '%'
				}
				
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
							token:'c1c7e63efc352d9af998cd331f8d8edc',
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
					url:"../Authorize/wx/index"
				})
				// #endif
				// #ifdef APP-PLUS || H5
					uni.navigateTo({
						url:"../Authorize/login/index"
					})
				// #endif
				
			},
			goMap(){
				uni.navigateTo({
					url:"../Map/map/index?type="+ this.type
				})
			},
			linkTo(e) {
				console.log(e)
			    let url = e.currentTarget.dataset.url
			    let need = e.currentTarget.dataset.need
			    let needPhone = e.currentTarget.dataset.needPhone
			    let scan = e.currentTarget.dataset.scan
			
			    let token = uni.getStorageSync('tokenData');
			    let userInfo = uni.getStorageSync('userInfo');
			
			    if(need && !token){
			      goLoginPageTimeOut()
			      return
			    }
			
			    if(needPhone && !userInfo.phoneType){
			      uni.navigateTo({
			        url: '/pages/mainStream/pages/authorize/index?phoneType=false&redirectUrl=/pages/Third/familyAccount/index'
			      })
			      return
			    }
				
			
			    if (scan) {
				// #ifdef H5
					uni.showToast({
						title:'功能暂未开放，敬请期待'
					})
				// #endif
				// #ifndef H5
					this.scanCode()
				// #endif
				
			      return
			    }
			    uni.navigateTo({
			      url
			    })
			  },
				
		}
	}
</script>

<style scoped>
	.swiper-container{
		height: 306rpx;
		position: relative;
		margin: 26rpx 36rpx 44rpx;
		border-radius: 16rpx;
		overflow: hidden;
	}
	.dots{
		position: absolute;
		left: 50%;
		bottom: 24rpx;
		transform: translateX(-50%);
		display: flex;
	}
	.dot{
		width:10rpx;
		height:10rpx;
		border-radius: 5rpx;
		background:rgba(255,255,255,1);
		opacity:0.42;
		margin-right: 14rpx;
	}
	.dot:last-of-type{
		margin-right: 0;
	}
	.dot.is-active{
		opacity:1;
		width: 24rpx;
	}
	.swiper{
		height: 100%;
	}
	.banner-img{
		width: 100%;
		height: 100%;
	}
	.station{
		width: 646rpx;
		height: 400rpx;
		border:2px solid rgba(226,226,226,1);
		border-radius:16rpx;
		margin: 44rpx auto 10rpx;
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
	.location{
		font-weight:500;
		padding-top: 28rpx;
	}
	.site{
		width: 36rpx;
		height: 42rpx;
		margin: 0 12rpx 0 26rpx;
	}
	.loc{
		font-size:30rpx;
	}
	.dist{
		font-size:28rpx;
	}
	.dist::after {
		content: "";
		display: inline-block;
		width: 6rpx;
		height: 6rpx;
		margin: 6rpx 10rpx 10rpx 10rpx;
		border-top: 2rpx solid #2c2c2c;
		border-right: 2rpx solid #2c2c2c;
		transform: rotate(45deg);
	}
	.about{
		font-size:16rpx;
		margin-right: 4rpx;
	}
	.staion-info{
		
	}
	.scan{
		width:502rpx;
		height:70rpx;
		background:rgba(255,95,98,1);
		border-radius:8rpx;
		line-height: 70rpx;
		color: #fff;
		font-size:30rpx;
		font-weight:500;
		margin-bottom: 28rpx;
	}
	
	.money{
		padding-top: 34rpx;
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
	.grand-total{
		padding: 46rpx 70rpx;
	}
	.box{
		text-align: center;
	}
	.box .count{
		font-size:50rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:58rpx;
		margin-bottom: 12rpx;
	}
	.box .name{
		font-size:24rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(144,144,144,1);
		line-height:34rpx;
	}
	.box .name.btn{
		border-radius:19rpx;
		border:1rpx solid rgba(255,95,98,1);
		padding: 0 20rpx;
		color: #FF5F62;
	}
	.rank-type{
		padding: 60rpx 46rpx;
	}
	.rank-name{
		display: flex;
		align-items: center;
		margin-bottom: 14rpx;
	}
	.rank-name image{
		width: 30rpx;
		height: 30rpx;
		margin-right: 14rpx;
	}
	.rank-name text{
		font-size:24rpx;
		font-weight:500;
		line-height:34rpx;
	}
	.cur{
		font-size:46rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		line-height:54rpx;
		margin-bottom: 60rpx;		
		text-align: center;
		padding-left: 22rpx;
	}
	.not-login{
		padding-top: 50rpx;
	}
	.not-login .authority{
		margin: 56rpx auto;
		color: #FFFFFF;
		text-align: center;
		width:606rpx;
		height:88rpx;
		background:rgba(255,95,98,1);
		border-radius:4rpx;
		line-height: 88rpx;
		font-size:34rpx;
	}
	.r-c-swiper{
		height: 236rpx;
	}
	.c-dots{
	  position: absolute;
	  left: 50%;
	  transform: translateX(-50%);
	}
	.c-dot{
	  width: 10rpx;
	  height: 10rpx;
	  border-radius: 50%;
	  background-color: rgba(183,183,183,.42);
	  margin: 0 7rpx;
	}
	.c-dot.active{
	  background-color: #FF5F62;
	}
	.entry {
	  padding: 44rpx 50rpx 66rpx;
	  display: flex;
	  justify-content: space-between;
	}
	
	.entry .entry-item {
	  position: relative;
	  text-align: center;
	  font-size: 24rpx;
	  font-weight: 400;
	  color: rgba(59, 59, 59, 1);
	  line-height: 34rpx;
	}
	
	.entry-item .icon {
	  width: 100rpx;
	  height: 100rpx;
	  margin-bottom: 28rpx;
	}
	
	.entry-item .badge {
	  width: 84rpx;
	  height: 30rpx;
	  position: absolute;
	  right: -28rpx;
	  top: -10rpx;
	}
</style>
