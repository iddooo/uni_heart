<template>
	<view class="page page-grey">
		<view class="head">
			<view class="total">
				{{gold}}
			</view>
			<view class="tips">
				{{year}}年12月31日积分清零
			</view>
			<view class="tips">
				1元=1000积分，兑换商品可直接抵扣现金
			</view>
			<RuleTag @click="rules" />
		</view>
		<view class="content">
			<view class="tabs flex">
				<view :class="['tab-item',index == active ? 'active':'']"
					v-for="(item,index) in tabs"
					:key="item.id"
					@click="changeTab(index)">
					{{item.name}}
				</view>
			</view>
			<swiper class="card-ctr" :current="active" @change="move">
				<swiper-item>
					<DoTask title="日常任务" :task='task1' @onTodo="todoHandler"/>
					<view class="divide"></view>
					<DoTask title="账户任务" :task='task2' @onTodo="todoHandler"/>
				</swiper-item>
				<swiper-item>
					<Records :list="list" />
				</swiper-item>
			</swiper>
			
			<!-- <view v-show="active==1" class="card-ctr">
				<DoTask title="日常任务" :task='task1' @onTodo="todoHandler"/>
				<view class="divide"></view>
				<DoTask title="账户任务" :task='task2' @onTodo="todoHandler"/>
			</view>
			
			<view v-show="active==2" class="card-ctr">
				<Records :list="list" />
			</view> -->
		</view>
		<MessageBox></MessageBox>
	</view>
</template>

<script>
	import DoTask from './DoTask.vue'
	import Records from './Records.vue'
	import RuleTag from './RuleTag.vue'
	import {myMoney,scoreRecords,getDailyTask } from '../../../api/index.js'
	import { mapMutations } from 'vuex';
	export default {
		components: {
			DoTask,
			Records,
			RuleTag
		},
		data(){
			return{
				gold:0.0,
				year:new Date().getYear(),
				month:new Date().getMonth() + 1,
				day:new Date().getDate(),
				tabs:[
					{id:1,name:"做任务赚积分"},
					{id:2,name:"积分明细"}
				],
				active:0,
				task1:[
					{name:"每日首次公益投递",des:"+20积分",todo:true,url:"/pages/Tabbar/index/index"},
					{name:"投递物品",des:"投递越多产生积分越多",todo:true,url:"/pages/Tabbar/index/index"},
					{name:"邀请好友一起做环保",des:"注册+100积分 完成投递+400积分",todo:true,share:true},
				],
				task2:[
					{name:"绑定手机号",des:"+200积分",todo:true,phone:true},
					{name:"完善个人信息",des:"+300积分",todo:true,url:"/pages/Setting/personal/index"},
				],
				list:[
					// {
					// 	content: "环保知识答题",
					// 	createTime: "2020/09/29 10:34:46",
					// 	id: 508267523754561540,
					// 	score: 5,
					// 	type: true,
					// }
				],
				page:1,
				pageSize:10,
				hasNextPage:true
			}
		},
		onLoad() {
			this.init()
		},
		methods:{
			...mapMutations(['MessageBox']),
			rules(){
				this.MessageBox({
					title: '积分规则',
					type: 'HTML',
					msg: `1.若账户冻结等异常状态将不能参与积分获取及兑换； <br>
						  2.如发现用户通过不正当途径获取积分，我公司有权冻结该用户账号并取消积分； <br>
						  3.凡参与并使用积分者，即视为接受活动所有规则，且须遵守江西小红心科技股份有限公司法律声明及其他关于营销活动的相关规定，江西小红心科技股份有限公司有权在法律允许的范围内对活动规则作出适当调整；`,
					visible: true
				})	
			},
			init(){
				let userInfo = uni.getStorageSync('userInfo')
				let userId = userInfo.id
				if (this.month < 10) {
				  this.month = '0' + this.month
				}
				if (this.day < 10) {
				  this.day = '0' + this.day
				}
				let today = this.year + this.month + this.day;
				getDailyTask(today).then(res=>{
					// userId + today + 'charity' 每日首次公益投递
					// userId + today + 'dailyDelivery' 每日投递
					if(res.code==1){
						this.task1[0].todo = res.data[userId + this.today + 'charity'] ==1 ? false : true
					}
				})
				this.task2[0].todo = userInfo.phone ? false : true
				this.task2[1].todo = userInfo.birthday ? false : true
				
				myMoney(userId).then(res=>{
					if(res.code==1){
						this.gold = res.data.currScore
					}
				})
				
				this.getScoreRecords()
			},
			getScoreRecords(){
				scoreRecords({
					page:this.page,
					pageSize:this.pageSize
				}).then(res=>{
					if(res.code==1){
						if(this.page==1) this.list = []
						this.hasNextPage = res.data.hasNextPage
						this.page = res.data.hasNextPage ? ++this.page : this.page,
						this.list = this.list.concat(res.data.list)
					}
				})
			},
			changeTab(index){
				this.active = index
			},
			move(e){
				// console.log(e);
				this.active = e.detail.current
			},
			todoHandler(item){
				if(item.url){
					uni.navigateTo({
						url:item.url
					})
					uni.switchTab({
						url:item.url
					})
				}
				if(item.phone){
					// #ifdef MP-WEIXIN
					uni.navigateTo({
						url:"/pages/Authorize/wx/index?step=2"
					})
					// #endif
					// #ifdef APP-PLUS || H5
						uni.navigateTo({
							url:"/pages/Authorize/login/index"
						})
					// #endif
				}
				if(item.share){
					// #ifdef APP-PLUS
						this.AppShare()
					// #endif
					// #ifdef H5
						uni.showToast({
							title: '该功能暂未开放，敬请期待'
						})
					// #endif
				}
			},
			AppShare(){
				let userInfo = uni.getStorageSync('userInfo')
				let userId = userInfo.userId
				uni.share({
					provider:"weixin",
					title:userInfo.nickname + '，邀请您加入小红心，一起垃圾分类做环保~',
					scene:"WXSceneSession",//provider 为 weixin 时必选 : WXSceneSession	分享到聊天界面 WXSenceTimeline	分享到朋友圈 WXSceneFavorite	分享到微信收藏
					imageUrl:"/static/mine/share.jpg",
					href:'pages/tabBar/index/index?userId=' + userId ,
					success:()=>{
						console.log('分享成功')
					}
				})
			}
		},
		onShareAppMessage(){
			let userInfo = uni.getStorageSync('userInfo')
			let userId = userInfo.userId
			console.log(userId);
			return {
			  path: 'pages/tabBar/index/index?userId=' + userId ,
			  title: userInfo.nickname + '，邀请您加入小红心，一起垃圾分类做环保~',
			  imageUrl: '/static/mine/share.jpg'
			}
		},
		onReachBottom() {
			if(this.hasNextPage){
				this.getScoreRecords()
			}
		}
	}
</script>

<style scoped>
	.divide{
		border-bottom: 22rpx solid #F6F6F6;
	}
	.head{
		width: 100%;
		height: 366rpx;
		background: linear-gradient(202deg, #FFA561 0%, #FF5F62 100%);
		color: #fff;
	}
	.total{
		padding-top: 50rpx;
		font-size: 68rpx;
		font-family: DINAlternate-Bold, DINAlternate;
		font-weight: bold;
		line-height: 80rpx;
		margin-bottom: 20rpx;
		text-align: center;
	}
	.tips{
		margin-bottom: 8rpx;
		font-size: 24rpx;
		line-height: 34rpx;
		text-align: center;
	}
	.content{
		width: 690rpx;
		height: 808rpx;
		background: #FFFFFF;
		box-shadow: 0px 24rpx 26rpx 0px rgba(114, 114, 114, 0.1);
		border-radius: 16px;
		margin: -110rpx auto 0;
		display: flex;
		flex-direction: column;
	}
	.card-ctr{
		flex: 1;
		overflow-y: scroll;
	}
	.tabs{
		padding-top: 30rpx;
		padding-bottom: 22rpx;
		border-bottom: 2rpx solid #F6F6F6;
	}
	.tab-item{
		width: 50%;
		text-align: center;
		color: #909090;
		font-size: 26rpx;
		font-weight: 500;
		line-height: 36rpx;
		position: relative;
	}
	.tab-item.active{
		color: #EB5360;
	}
	.tab-item.active::after{
		content: "";
		position: absolute;
		left: 50%;
		bottom: -10rpx;
		width: 28rpx;
		height: 6rpx;
		background: #FF5F62;
		border-radius: 3rpx;
		margin-left: -14rpx;
	}
	
</style>
