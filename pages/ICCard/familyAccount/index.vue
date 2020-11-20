<template>
	<view class="page">
		<image class="hd-img" src="/imgs/card/family-hd.png" mode=""></image>
		<view class="f-content">
			<FamilyTotal  
				:entry="entry" 
				:profit="profit" 
				@click="handler"/>
			<image class="f-img" src="/imgs/card/family-img.png" mode=""></image>
			<!-- 家庭成员 -->
			<ManagerMembers 
				:members="members"
				@onDelHandler="delMember"
				@onShareHandler="onShareAppMessage"/>
			<!-- 邀请家人 -->
			<!-- #ifdef APP-PLUS -->
			<button class="add-f" @click="AppShare">邀请家人</button>
			<!-- #endif -->
			<!-- #ifndef APP-PLUS -->
			<button class="add-f" open-type="share">邀请家人</button>
			<!-- #endif -->
			<!-- 家人投递记录 -->
			<view class="family-record">
				<view :class="scrollTop >= max ? 'topnavFixed' : 'topnavAbsolute'">
					<view class="f-r-title">家人投递记录</view>
					<view class="f-r-tabbar flex" @click="changeActive">
						<view data-id="1" :class="['tab-item', active==1 ? 'active' : '']">可回收/有害</view>
						<view data-id="2" :class="['tab-item', active==2 ? 'active' : '']">厨余/其他</view>
					</view>
				</view>
				<view class="records-ctr" v-show="active==1">
					<DeliveryRecord
						v-for="(item,index) in deliver" :key='index'
						:data="item"
						:active="active"
						:userPics="userPics"/>
				</view>
				<view class="records-ctr" v-show="active==2">
					<DeliveryRecord
						v-for="(item,index) in kwDeliver" :key='index'
						:data="item"
						:active="active"
						:userPics="userPics"/>
				</view>
			</view>
		</view>
		<MessageBox></MessageBox>
	</view>
</template>

<script>
	import {familyByUserId, delFamilyMember, switchAI } from '../../../api/index.js'
	import { URL } from '../../../common/index.js'
	import FamilyTotal from './FamilyTotal.vue'
	import ManagerMembers from './ManagerMembers.vue'
	import DeliveryRecord from './DeliveryRecord.vue'
	import { mapMutations } from 'vuex';

	const entry = [
		{id:1,name:"二维码",icon:"/imgs/card/code.png",handler:'deliveryCode'},
		{id:2,name:"上传人脸",icon:"/imgs/card/face.png",handler:'uploadFace'},
		{id:3,name:"规则",icon:"/imgs/card/rule.png",handler:'showRule'},
		{id:4,name:"家人管理",icon:"/imgs/card/del.png",iconOn:"/imgs/card/del-s.png",handler:'managerMembers'},
	]
	export default{
		components:{
			FamilyTotal,
			ManagerMembers,
			DeliveryRecord
		},
		data(){
			return {
				URL:URL,
				entry: [],
				members:[
					// {"userId":326,"headPic":"/headpic/2f9eeebe2f934a58.jpg","profit":"116.31","nickName":"测试小号"},
					// {"userId":306,"headPic":null,"profit":"20.76","nickName":"D儿"},
					],
				userPics:{
					// 326:"/headpic/2f9eeebe2f934a58.jpg",
					// 306:"/static/index/head.png"
				},
				profit: "0.0",
				onManager:false,
				showAI:false,
				active: 1,
				deliver: [],
				kwDeliver: [],
				isChief:undefined,
				ownerId:undefined,
				max:613,
				scrollTop:0
			}
		},
		onLoad() {
			this.ownerId = uni.getStorageSync('userId')
			this.getAiState()
			this.getData()
		},
		methods:{
			...mapMutations(['MessageBox']),
			getAiState(){
				switchAI().then(res=>{
					//线上此次结果 true (测试 true)
					if(res.data===true){
						this.showAI = true
						if(this.showAI){
							this.entry = [].concat(entry)
						}else{
							this.entry = entry.filter(v=>{
								return v.id!==2
							})
						}
					}
				})
			},
			getData(){
			    familyByUserId(this.ownerId).then(res=>{
			      if(!res.data){ //未绑定ic卡
			        uni.showModal({
			          title:"提示",
			          content:"开通家庭账户请先绑定IC卡",
			          showCancel: false,
			          success:(res)=>{
			            uni.redirectTo({
			              url: '/pages/Setting/icCard/index',
			            })
			          }
			        })
			      }else{
			        let { headPic=[],deliver, kwDeliver, isChief} = res.data
					this.members = headPic
					this.deliver = deliver
					this.kwDeliver = kwDeliver
					this.isChief = isChief
					
			        headPic.forEach(v=>{
			          this.userPics[v.userId] = v.headPic ? this.URL + v.headPic : '/static/index/head.png'
			          this.userPics[v.nickName] = v.headPic ? this.URL + v.headPic : '/static/index/head.png'
			        })
					
			        // 获取 family-record 的scrollTop
			        // var that = this
			        var query = uni.createSelectorQuery().in(this);;
			        query.select('.family-record').boundingClientRect(function (rect){
			          // console.log(rect)
						this.max = rect.top 
			        }).exec()
			      }
			    })
			},
			handler(handlerName){
				this[handlerName]()
			},
			deliveryCode(){
			    uni.navigateTo({
			      url: '/pages/ICCard/deliveryCode/index',
			    })
			},
			uploadFace() {
				uni.navigateTo({
				  url: '/pages/AI/face/index',
				})
			},
			showRule(){
				let msg = ''
				if(this.showAI){
					msg = "1.账号绑定IC卡即可开通家庭账户<br> 2.开通家庭账户后，可邀请家人加入 <br> 3.家人加入后，可以查看家庭成员的投递记录<br> 4.加入家庭环保金后，家庭成员子账号上传人脸后都可使用智能垃圾箱人脸识别功能"
				}else{
					msg = "1.账号绑定IC卡即可开通家庭账户<br> 2.开通家庭账户后，可邀请家人加入 <br> 3.家人加入后，可以查看家庭成员的投递记录"
				}
				this.MessageBox({
					visible:true,
					type:"html",
					msg:msg
				})
			},
			managerMembers(){
				this.onManager = !this.onManager
				
				//主账号不能删除 主账号可以删除别人 子账号只能删除自己
				this.members.forEach((v,i)=>{
					if(i!==0){
						v.onManager = this.onManager ? (this.isChief==1 ? true : v.userId==this.ownerId ? true : false) : false
					}
				})
				// 家人管理
				this.entry.forEach(v=>{
					if(v.id===4){
						v.name= this.onManager ? '完成' : '家人管理'
						v.icon = this.onManager ? "/imgs/card/del-s.png" :'/imgs/card/del.png'
					}
				})
			},
			delMember(userId){
				this.MessageBox({
					visible:true,
					title:"解绑确认",
					msg:'确定解绑家庭账户？',
					reverse:false,
					buttons:['取消','确认'],
					success:()=>{
						// console.log('queren')
						delFamilyMember(userId).then(res=>{
							if(res.code===1){
								this.getData()
							}
						})
					}
				})
			},
			changeActive(e){
				this.active = e.target.dataset.id
			},
			AppShare(){
				let userInfo = uni.getStorageSync('userInfo')
				let userId = userInfo.userId
				let familyId = this.members[0].userId
				let photo = this.userPics[userId]
				uni.share({
					provider:"weixin",
					title:userInfo.nickName + '，邀请您加入小红心，一起垃圾分类做环保~',
					scene:"WXSceneSession",//provider 为 weixin 时必选 : WXSceneSession	分享到聊天界面 WXSenceTimeline	分享到朋友圈 WXSceneFavorite	分享到微信收藏
					imageUrl:"/imgs/card/family-img.png",
					href:'pages/tabBar/index/index?userId=' + userId + '&familyId=' + familyId+ '&familyName=' + userInfo.nickName + '&photo=' + photo,
					success:()=>{
						console.log('分享成功')
					}
				})
			}
			
		},
		onShareAppMessage(){
			let userInfo = uni.getStorageSync('userInfo')
			let userId = userInfo.userId
			let familyId = this.members[0].userId
			let photo = this.userPics[userId]
			return {
			  path: 'pages/tabBar/index/index?userId=' + userId + '&familyId=' + familyId+ '&familyName=' + userInfo.nickName + '&photo=' + photo,
			  title: userInfo.nickName + '，邀请您加入小红心，一起垃圾分类做环保~',
			  imageUrl: '/imgs/card/family-img.png',
			}
		},
		onPageScroll(e){
			// console.log(e)
			this.scrollTop = e.scrollTop
		}
	}
</script>

<style scoped> 
.page{
	overflow: hidden;
}
.hd-img{
	position: absolute;
	width: 100%;
	height: 402rpx;
	top: 0;
}

.f-content{
	margin: 308rpx 30rpx 0;
	box-shadow: 0rpx 8rpx 20rpx 0px rgba(84, 84, 114, 0.1);
	border-radius: 16rpx 16rpx 0 0;
	background-color: #fff;
	position: relative;
	z-index: 1;
}
.family-total{
	padding: 44rpx 22rpx 46rpx 28rpx;
}
.total-gold{
	width: 250rpx;
}
.total{
	font-size: 62rpx;
	font-family: DINAlternate-Bold, DINAlternate;
	font-weight: bold;
	color: #1E1E1E;
	line-height: 72rpx;
	height: 72rpx;
	margin-bottom: 10rpx;
}
.entry{
	flex:1;
}
.item{
	width: 25%;
	padding-top: 4rpx;
	text-align: center;
}

.icon{
	margin: 0 auto 14rpx;
	width: 64rpx;
	height: 64rpx;
}
.icon image{
	width: 100%;
	height: 100%;
}
.font32{
	font-size: 32rpx;
	font-weight: 600;
	color: #2F2F2F;
	line-height: 44rpx;
}
.font28{
	font-size: 28rpx;
	font-weight: 500;
	color: #1E1E1E;
	line-height: 40rpx;
}
.font24{
	font-size: 24rpx;
	color: #1E1E1E;
	line-height: 34rpx;
}
.font20{
	font-size: 20px;
	color: #888888;
	line-height: 28rpx;
}
.font-num{
	font-size: 30rpx;
	font-family: DINAlternate-Bold, DINAlternate;
	font-weight: bold;
	color: #FF5F62;
	line-height: 34rpx;
}
.font-gold{
	font-size: 32rpx;
	font-family: DINAlternate-Bold, DINAlternate;
	font-weight: bold;
	color: #EB4B5A;
	line-height: 38rpx;
}
.f-img{
	width: 690rpx;
	height: 372rpx;
	display: block;
	margin: 0 auto;
}
.add-f {
	  width: 556rpx;
	  height: 80rpx;
	  line-height: 80rpx;
	  /* background: rgba(235, 75, 90, 1); */
	  background:rgba(255,95,98,1);
	  border-radius: 44rpx;
	  text-align: center;
	  font-size: 34rpx;
	  font-family: PingFangSC-Medium, PingFang SC;
	  font-weight: 500;
	  color: rgba(255, 255, 255, 1);
	  margin-bottom: 42rpx;
	}
.family-record{
  /* 44  120*/
  padding-top: 164rpx;
  position: relative;
}
.topnavFixed{
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
  background-color: #fff;
  left: 50%;
  transform: translateX(-50%);
  width: 690rpx;
}
.topnavAbsolute{
  position: absolute;
  top: 0;
  width: 100%;
}

.f-r-title {
  font-size: 32rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(47, 47, 47, 1);
  line-height: 44rpx;
  text-align: center;
  position: relative;
  z-index: 1;
  margin-bottom: 34rpx;
}

.f-r-title::before {
  content: "";
  width: 188rpx;
  height: 16rpx;
  background: rgba(255, 203, 204, 1);
  border-radius: 14rpx;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  z-index: -1;
}

.f-r-tabbar {
  padding-bottom: 48rpx;
  height: 40rpx;
}

.f-r-tabbar .tab-item {
  width: 50%;
  text-align: center;
  position: relative;
  font-size: 24rpx;
  color: rgba(144, 144, 144, 1);
  line-height: 34rpx;
}

.f-r-tabbar .tab-item.active {
  font-size: 28rpx;
  font-weight: 500;
  color: rgba(30, 30, 30, 1);
  line-height: 40rpx;
}

.f-r-tabbar .tab-item.active::after {
  content: "";
  position: absolute;
  bottom: -16rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 8rpx;
  /* background: rgba(235, 75, 90, 1); */
  background:rgba(255,95,98,1);
  border-radius: 5px;
}
.records-ctr{
  padding: 0 30rpx;
  border-top: 1rpx solid #F6F6F6;
}


</style>
