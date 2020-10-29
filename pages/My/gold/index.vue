<template>
	<view class="page">
		<view class="tabs flex-ct-ard">
			<view :class="['tab-item',item.id==active ? 'active':'' ]"
				v-for="item in tabs"
				:key="item.id"
				@click="changeTab(item)">
				{{item.name}}
			</view>
		</view>
		<view class="content">
			<Item 
				v-for="(item, i) in list"
				:key="i"
				:data="item"
				:active="active"
				></Item>
		</view>
		<End :isLoading="isLoading"/>
	</view>
</template>

<script>
	import { myDelivery, expend, deduct } from '../../../api/index.js'
	import End from '../../../components/End.vue'
	import {goLoginPageTimeOut} from '../../../common/index.js'
	import Item from './Item.vue'
	
	export default {
		components: {
			End,
			Item
		},
		data(){
			return{
				tabs:[
					{id:1,name:"环保金收入"},
					{id:2,name:"环保金支出"},
					{id:3,name:"环保金扣除"}
				],
				active:1,
				page:1,
				pageSize:10,
				userId:undefined,
				list:[],
				hasNextPage:true,
				isLoading:false,
				cashType : ['','银行卡提现','微信零钱', '小红心钱包'],
				status : ['已驳回','待审核','已审核',"已到账",'异常','转账中',"转账失败", "审核中"]
			}
		},
		onLoad() {
			this.userId = uni.getStorageSync('userId')
			if(!this.userId){
				
			}
			this.getData()
		},
		methods:{
			changeTab(item){
				this.active=item.id
				this.list = []
				this.page = 1
				this.hasNextPage = true
				this.getData()
			},
			getData(){
				if(this.active==3){
					this.getDeductRecord()
				}else if(this.active==2){
					this.getExpandRecord()
				}else{
					this.getDeliveryRecord()
				}
			},
			getDeliveryRecord(){
				let data = {
					id : this.userId,
					page:this.page,
					pageSize :this.pageSize
				}
				myDelivery(data).then(res=>{
					if(res.code==1){
						let list = res.data.list.reduce((a,b)=>{
							a.push({
								name:"投递收入",
								time:b.time,
								profit:'+' + b.profit
							})
							return a
						},[])
						this.list = this.list.concat(list)
						this.hasNextPage = res.data.hasNextPage
						this.page = this.hasNextPage ? ++this.page : this.page
					}
				})
			},
			getExpandRecord(){
				let data = {
					id : this.userId,
					page:this.page,
					pageSize :this.pageSize
				}
				expend(data).then(res=>{
					if(res.code==1){
						let list = res.data.list.reduce((a,b)=>{
							a.push({
								name:this.cashType[b.cashType],
								time:b.createTimeStr,
								profit:b.amount,
								statusdes:this.status[b.type],
								state:b.type
							})
							return a
						},[])
						this.list = this.list.concat(list)
						this.hasNextPage = res.data.hasNextPage
						this.page = this.hasNextPage ? ++this.page : this.page
					}
				})
			},
			getDeductRecord(){
				let data = {
					id : this.userId,
					page:this.page,
					pageSize :this.pageSize
				}
				deduct(data).then(res=>{
					if(res.code==1){
						let list = res.data.list.reduce((a,b)=>{
							a.push({
								name:"违规扣款",
								time:b.deductTime,
								profit:'-' + b.deduct,
								dno:b.deliverNo,
								result:b.deductResult.map(v=>{
									return{
										icon:v.imgUrl,
										name:v.name,
										countNuit:v.countNuit,
										countNuit:v.countNuit,
										countNuit:v.countNuit,
										des:v.reason
									}
								})
							})
							return a
						},[])
						this.list = this.list.concat(list)
						this.hasNextPage = res.data.hasNextPage
						this.page = this.hasNextPage ? ++this.page : this.page
					}
				})
			}
		},
		onReachBottom(){
			if(this.hasNextPage){
				this.getData()
			}else{
				this.isLoading = true
				setTimeout(()=>{
					this.isLoading = false
				},2000)
			}
		}
	}
</script>

<style scoped>
	.tabs{
		padding: 36rpx 30rpx;
	}
	.tab-item{
		width: 30%;
		color: #909090;
		font-size: 28rpx;
		line-height: 44rpx;
		position: relative;
		text-align: center;
	}
	.tab-item.active{
		font-size: 32rpx;
		font-weight: 500;
		color: #1E1E1E;
	}
	.tab-item.active::after{
		position: absolute;
		content: "";
		left: 50%;
		bottom: -16rpx;
		width: 40rpx;
		height: 8rpx;
		background: #FF5F62;
		border-radius: 5rpx;
		margin-left: -20rpx;
	}
	.end{
		background-color: #fff;
	}
</style>
