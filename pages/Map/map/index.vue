<template>
	<view class="page">
		<view class="map-container">
			<map style="width: 100%; height: 60vh;" 
			:scale="10"
			:latitude="latitude" 
			:longitude="longitude" 
			:markers="allMarkers"
			@markertap="checkStationInfo"></map>
		</view>
		<view class="resources-container">
			<view class="staion-info flex-ct">
				<view class="complex">
					{{station.complex}}
				</view>
				<view class="preview" @click="preview">
					查看街景图片
				</view>
				<image @click="lead" class="lead" src="/static/map/lead.png" mode=""></image>
			</view>
			<view class="describle flex-ct">
				<image src="/static/map/site-d.png" mode=""></image>
				<view>距您{{min_dis}} | {{station.address}}</view>
			</view>
			<view class="describle flex-ct">
				<image src="/static/map/time.png" mode=""></image>
				<view>{{station.startDate}}至{{station.endDate}}  {{station.startTime}}-{{station.endTime}}</view>
			</view>
			<view class="describle flex-ct">
				<image src="/static/map/sno-img.png" mode=""></image>
				<view>编号：{{station.sno}}</view>
			</view>
			<view class="dashed"></view>
			<!-- <view v-show="type==1" :class="{'resources':true,'item-6':item6 }">
				<view v-for="(item,index) in resources" :key="index" class="category">
					<image class="cls" :src="item.imgUrl" mode=""></image>
					<image v-if="item.state" class="state" :src="'/static/index/box-state' + item.state +'.png'" mode=""></image>
					<view class="name">{{item.name}}</view>
					<view class="count">{{item.price}}元/{{item.unit}}</view>
				</view>
			</view> -->
			<view v-show="type==1">
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
			</view>
			<view v-show="type==2" class="resources flex">
				<view class="item-2">
					<image :src="'/static/index/liquid-red-'+ kitchen +'.png'" mode=""></image>
					<view class="capacity">{{station.kitchenCapacity}}</view>
					<view>厨余垃圾</view>
					<view>{{station.kitchenWeight || 0}}kg</view>
				</view>
				<view class="item-2">
					<image :src="'/static/index/liquid-yellow-'+other+'.png'" mode=""></image>
					<view class="capacity">{{station.otherCapacity}}</view>
					<view>其他垃圾</view>
					<view>{{station.otherWeight || 0}}kg</view>
				</view>
			</view>
		</view>
		
		<!-- 查看 -->
		<view class="preview-pop" v-if="visible">
			<view class="swiper-container">
				<swiper class="swiper"
					:indicator-dots="indicatorDots" 
					:autoplay="autoplay" 
					interval="2000"
					current="0"
					@change="swiperChange">
					<swiper-item v-for="(v,index) in pics" :key="index">
						<image class="banner-img" :src="IMG_URL + v.value" mode="scaleToFill"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 自定义小圆点 -->
			<view class="dots">
				<view v-for="(v,i) in pics" :key="i" :class="{dot:true,'is-active':currentIndex==i}"></view>
			</view>
			<view class="touch-close" @click="closePreview">
			  <image src="/static/map/closepreview.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {getKwStationList,getAllStations,getKwStaion, getSingleStation,getClassify} from '../../../api/index.js'
	import coordinate from '../../../utils/coordinate.js'
	import { IMG_URL } from '../../../common/index.js'
	
	export default{
		data(){
			return{
				IMG_URL:IMG_URL,
				resources:[
					{"id":"411560080522219520","name":"饮料瓶","price":0.04,"imgUrl":"http://47.103.51.182:8000/icon/bottles-s.png","contry":null,"unit":"个","state":0,"sno":null},
					{"id":"411560080522219521","name":"纸类","price":0.50,"imgUrl":"http://47.103.51.182:8000/icon/page-s.png","contry":null,"unit":"kg","state":0,"sno":null},
					{"id":"411560080522219522","name":"纺织物","price":0.30,"imgUrl":"http://47.103.51.182:8000/icon/clothes-s.png","contry":null,"unit":"kg","state":0,"sno":null},
					{"id":"411560080522219523","name":"有害","price":0.00,"imgUrl":"http://47.103.51.182:8000/icon/harmful-s.png","contry":null,"unit":"kg","state":0,"sno":null},
					{"id":"411560080522219524","name":"塑料/金属","price":0.40,"imgUrl":"http://47.103.51.182:8000/icon/suliao-red.png","contry":null,"unit":"kg","state":2,"sno":null},
					{"id":"411560080522219525","name":"玻璃","price":0.00,"imgUrl":"http://47.103.51.182:8000/icon/boli-red.png","contry":null,"unit":"kg","state":2,"sno":null}
				],
				swiperData:[],
				cur:0,
				
				latitude:'30.53811264038086',
				longitude:'104.06261444091797',
				allMarkers:[{latitude: 39.909,
                longitude: 116.39742,}],
				staions:[],
				kwStaions:[],
				station:{},
				kw_station:{},
				kitchen:0,
				other:0,
				min_dis:0,
				indicatorDots:false,
				autoplay:true,
				pics:[],
				currentIndex:0,
				visible:false,
				type:1,
				item6:false,
			}
		},
		onLoad(option) {
			console.log(option)
			this.type = option.type
			console.log(this.type)
		},
		onShow() {
			let location = uni.getStorageSync('location')
			let station = uni.getStorageSync('station')
			let kw_station = uni.getStorageSync('kw_station')
			// 当前经纬度
			this.latitude = location.latitude
			this.longitude = location.longitude
			// 获取地图上所有设备点
			this.getKwStaions()
			this.getRecoveryStaions()
			if(this.type==2){
				this.station = kw_station.min_station
				this.min_dis = station.min_dis
				this.pics = JSON.parse(this.station.pic || '[]')
				// 获取当前厨余设备的容量
				this.getCurKwStation(this.station)
			}else{
				this.station = station.min_station
				this.min_dis = station.min_dis
				this.pics = JSON.parse(this.station.pic || '[]')
				// 获取当前设备的分类信息
				this.getCurStation(this.station)
			}
		},
		methods:{
			// 获取所有的回收设备
			getRecoveryStaions(){
				getAllStations().then(res=>{
					let eqp = res.data.reduce((a,b)=>{
						let {longitude,latitude} = coordinate.transformFromBaiduToGCJ(b.lat,b.lng)
						b.longitude = longitude
						b.latitude = latitude
						// b.longitude = Number(b.lng)
						// b.latitude = Number(b.lat)
						b.iconPath = '/static/map/marker.png'
						b.width = 37
						b.height = 41
						if(b.id == this.station.id){
							b.width = 48
							b.height = 53
						}
						a.push(b)
						return a
					},[])
					// console.log(eqp)
					this.staions = eqp
					// this.allMarkers.push(...eqp)
					this.allMarkers = this.allMarkers.concat(this.staions)
				})
			},
			//获取所有的厨余设备
			getKwStaions(){
				getKwStationList().then(res=>{
					let kw = res.data.reduce((a,b)=>{
						let {longitude,latitude} = coordinate.transformFromBaiduToGCJ(b.lat,b.lng)
						b.longitude = longitude
						b.latitude = latitude
						// b.longitude = Number(b.lng)
						// b.latitude = Number(b.lat)
						b.iconPath = '/static/map/marker2.png'
						b.width = 37
						b.height = 41
						if(b.sno == this.station.sno){
							b.width = 48
							b.height = 53
						}
						a.push(b)
						return a
					},[])
					// console.log(kw)
					this.kwStaions = kw
					this.allMarkers = this.allMarkers.concat(this.kwStaions)
				})
			},
			swiperChange(e){
				this.currentIndex = e.detail.current
			},
			preview(){
				if(!this.pics || this.pics.length==0){
					uni.showToast({
						title:"该设备暂未提供图片",
						icon:'none'
					})
					return
				}
				this.visible = true
			},
			closePreview(){
				this.visible = false
			},
			checkStationInfo(e){
				// console.log(e)
				let id = e.markerId || e.detail.markerId;
				this.staions.forEach((b,i)=>{
					b.width = 37
					b.height = 41
					if(b.id==id){
						b.width = 48
						b.height = 53
						//优化
						this.type = 1
						this.getCurStation(b)
						console.log(b,i,b.id,this.allMarkers);
					}
				})
				this.allMarkers.forEach((b,i)=>{
					if(b.id==id){
						console.log(i);
					}
				})
				this.kwStaions.forEach(b=>{
					b.width = 37
					b.height = 41
					if(b.id==id){
						b.width = 48
						b.height = 53
						//优化
						this.type = 2
						this.getCurKwStation(b)
					}
				})
			},
			getCurStation(data){
				console.log(data)
				getSingleStation(data).then(res=>{
					this.station = res.data.min_station
					this.min_dis = res.data.min_dis
					this.pics = JSON.parse(this.station.pic)
					getClassify(this.station.id).then(res=>{
						// this.resources = []
						// this.resources = res.data
						// this.item6 = this.resources.length > 4
						let resources = res.data
						this.item6 = resources.length > 4
						this.swiperData = this.truck(resources,6)
					})
				})
			},
			getCurKwStation(data){
				console.log(data)
				getKwStaion(data).then(res=>{
					this.station = res.data
					this.pics = JSON.parse(this.station.pic || '[]')
					this.min_dis = res.data.square
					this.kitchen = (Number(this.station.kitchenCapacity)/30).toFixed(0)
					this.other = (Number(this.station.otherCapacity)/30).toFixed(0)	
				})
			},
			lead(){
				let {lat,lng} = this.station
				let {longitude,latitude} = coordinate.transformFromBaiduToGCJ(lat,lng)
					uni.openLocation({
						latitude: latitude,
						longitude: longitude,
						address:this.station.site,
						name:this.station.complex,
						success: function () {
							console.log('success');
						}
					});
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
		}
	}
</script>

<style>
	.staion-info{
		padding-top: 32rpx;
		padding-left: 34rpx;
		padding-bottom: 30rpx;
	}
	.complex{
		font-size:34rpx;
		font-weight:600;
		color:rgba(51,51,51,1);
		line-height:48rpx;
		margin-right: 12rpx;
	}
	.preview{
		width:150rpx;
		height:36rpx;
		border-radius:19rpx;
		border:1rpx solid rgba(68,215,182,1);
		font-size:20rpx;
		font-weight:400;
		color:rgba(68,215,182,1);
		line-height:36rpx;
		text-align: center;
	}
	.describle{
		font-size:24rpx;
		font-weight:400;
		color:rgba(144,144,144,1);
		line-height:34rpx;
		margin-bottom: 24rpx;
		padding-left: 38rpx;
	}
	.describle image{
		width: 22rpx;
		height: 26rpx;
		margin-right: 18rpx;
	}
	.dashed{
		margin: 6rpx auto 0;
		width:652rpx;
		height:2rpx;
		border-bottom:2rpx dashed rgba(239,239,239,1);
	}
	/* 预览图片 */
	.preview-pop{
	  position: fixed;
	  left: 0;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  background-color: rgba(0, 0, 0, .7);
	  z-index: 999;
	}
	.swiper-container{
	  width:656rpx;
	  height:562rpx;
	  border-radius:22rpx;
	  position: absolute;
	  left: 50%;
	  top: 266rpx;
	  transform: translateX(-50%);
	  overflow: hidden;
	  background-color: #fff;
	}
	.swiper{
	  height: 100%;
	}
	.swiper image{
		width: 100%;
		height: 100%;
	}
	.dots {
	  position: absolute;
	  left: 50%;
	  transform: translateX(-50%);
	  top: 860rpx;
	  z-index: 9999;
	  display: flex;
	  flex-direction: row;
	  height: 36rpx;
	}
	
	/*未选中时的小圆点样式 */
	
	.dot {
	  width: 10rpx;
	  height: 10rpx;
	  background: rgba(255, 255, 255, 1);
	  opacity: 0.4214;
	  border-radius: 50%;
	  margin-right: 14rpx;
	}
	/*选中以后的小圆点样式  */
	
	.is-active {
	  opacity: 1;
	  background: rgba(255, 255, 255, 1);
	}
	
	.touch-close{
	  position: absolute;
	  left: 668rpx;
	  top: 196rpx;
	  padding: 20rpx;
	}
	.touch-close image{
	  width: 40rpx;
	  height: 40rpx;
	}
	.resources-container{
		position: relative;
	}
	.lead{
		position: absolute;
		right: 10rpx;
		top: -70rpx;
		width:142rpx;
		height:142rpx;
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
</style>
