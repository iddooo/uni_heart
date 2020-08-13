<template>
	<view class="page">
		<view class="time-line-box">
			<view class="timeline" v-for="(item,index) in log" :key="index">
				<view :class="{'finish':item.finish===true,'unfinish':item.finish===false}"></view>
				<view :class="{'state':item.state!=undefined}">
					<!-- 驳回 -->
					<image v-if="item.state===0 || item.state==4 || item.state==6 " src="/static/money/apply-f.png" mode=""></image>
					<!-- 审核中 -->
					<image v-if="item.state==1 || item.state==7 || item.state==5 " src="/static/money/apply-i.png" mode=""></image>
					<!-- 审核完成 -->
					<image v-if="item.state==2 || item.state==3" src="/static/money/apply-s.png" mode=""></image>
				</view>
				<view class="title">
					{{item.des}}
				</view>
				<view class="time">
					{{item.time}}
				</view>
			</view>
		</view>
		
		<view class="des">
			<view class="line flex-ct-bwt">
				<view>提现金额</view>
				<view>￥{{money}}</view>
			</view>
			<view class="line flex-ct-bwt">
				<view>到账微信</view>
				<view>{{name}}</view>
			</view>
		</view>
		
		<button class="btn" @click="goHome">完成</button>
	</view>
</template>

<script>
	import moment from 'moment'
	
	import { applyMsg } from '../../../api/index.js'
	// state
	// [0'驳回',1'待审核',2'已审核',3"已到账",4'异常',5'转账中',6"转账失败", 7"审核中"]
	const applyLog = [
				{des:"提现申请成功",time:"",finish:true},
				{des:"审核中",time:"",state:1},
				{des:"到账成功",time:"实际到账时间以第三方机构（银行、微信）为准",finish:false},
			]
	export default{
		data(){
			return{
				createTime:undefined,
				log:applyLog,
				money:0,
				name:"张丽雯",
				listResult:['驳回','待审核','已审核',  "已到账",  '异常',   '转账中',  "转账失败", "审核中"],
				listReview:['驳回','待审核','审核成功',"审核成功",'审核成功','审核成功',"审核成功", "审核中"]
			}
		},
		onLoad(option) {
			//环保金提现记录
			let sno = option.sno
			//申请成功
			let money = option.money
			
			let userInfo = uni.getStorageSync('userInfo')
			this.name = userInfo.userName
			
			if(sno){
				applyMsg(sno).then(res=>{
					if(res.code==1){
						this.money = res.data.amount
						this.getLog(res.data)
					}
				})
				
			}else{
				let data = {
					type:1,
					createTime:Date.now(),
				}
				this.money = money
				this.getLog(data)
			}
		},
		onShow() {
			
		},
		methods:{
			getLog(data){
				let state = Number(data.type) //提现状态
				this.log= []
				// 1.提现申请成功
				this.log[0] = {
					des:"提现申请成功",
					time:moment(data.createTime).format('YYYY/MM/DD HH:SS:mm'),
					finish:true
				}
				// [0'驳回',1'待审核',2'已审核',3"已到账",4'异常',5'转账中',6"转账失败", 7"审核中"]
				// ['驳回','待审核','审核成功',"审核成功",'审核成功','审核成功',"审核成功", "审核中"]
				//2. state:0, 1,7, 2,5,6,3,4
				this.log[1] = {
					des:this.listReview[state],
					time:moment(data.createTime).format('YYYY/MM/DD HH:SS:mm'),
					state:state
				}
				
				if(state==0){
					this.log[1].time = data.reason
				}
				
				if(state==2){
					this.log[1].time = moment(data.reviewerTime).format('YYYY/MM/DD HH:SS:mm')	
				}
				
				if(state==3 || state==5 || state==6 || state==4){
					this.log[1].time = moment(data.reviewerTime).format('YYYY/MM/DD HH:SS:mm')	
					this.log[1].state = undefined
					this.log[1].finish = true
				}
				
				this.log[2] = {
					des:'转账成功',
					time:'实际到账时间以第三方机构（银行、微信）为准',
					finish:false
				}
				if(state==3 || state==5 || state==6 || state==4){
					this.log[2].des = this.listResult[state]
					this.log[2].state = state
				}
				
			},
			goHome(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style scoped>
	.time-line-box{
		padding-top: 94rpx;
		padding-left: 68rpx;
	}
	.timeline {
		padding-left: 74rpx;
		position: relative;
		padding-bottom: 60rpx;
		z-index: 1;
	}
	.timeline::after{
		content: "";
		position: absolute;
		left: 0;
		top: 36rpx;
		bottom: 0rpx;
		width: 0;
		border-left: 2rpx dashed #44D7B6;
		z-index: -1;
	}
	.timeline:last-of-type{
		padding-bottom: 0rpx;
	}
	.timeline:last-of-type::after{
		content: "";
		border-left: 0;
	}
	.timeline .title{
		font-size:32rpx;
		font-weight:400;
		color:rgba(144,144,144,1);
		line-height:44rpx;
		margin-bottom: 8rpx;
	}
	.timeline .time{
		font-size:20rpx;
		font-weight:400;
		color:rgba(144,144,144,1);
		line-height:28rpx;
	}
	
	.finish,.unfinish{
		position: absolute;
		left: 0;
		top: 10rpx;
		transform: translateX(-50%);
		width:24rpx;
		height:24rpx;
		border-radius: 50%;
	}
	.finish{
		background:rgba(68,215,182,1);
	}
	.unfinish{
		background: rgba(216,216,216,1);
	}
	.state{
		position: absolute;
		left: 0;
		top: 0;
		transform: translateX(-50%);
		width: 68rpx;
		height: 68rpx;
		background-color: #FFFFFF;
	}
	.state image{
		width: 100%;
		height: 100%;
	}
	.des{
		padding: 158rpx 40rpx 0;
	}
	.line{
		font-size:30rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:34rpx;
		margin-bottom: 26rpx;
		}
		.line view:first-of-type{
			color: #888888;
		}
	.btn{
		margin: 338rpx auto 0;
		width:382rpx;
		height:80rpx;
		border-radius:4rpx;
		border:2rpx solid rgba(255,95,98,1);
		background-color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
		color: rgba(255,95,98,1);
	}
</style>
