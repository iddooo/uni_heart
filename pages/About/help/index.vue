<template>
	<view class="page">
		<view class="head flex-ct">
			<view v-for="(item,index) in tabs" 
			:key="index" 
			class="item"
			@click="tabHandler(item)">
				<image class="bg" :src="item.bg" mode=""></image>
				<view class="flex-ct-ct">
					<image class="icon" :src="item.icon" mode="aspectFit"></image>
					<text>{{item.title}}</text>
				</view>
				<view class="s-t">
					{{item.subTitle}}
				</view>
			</view>
			
		</view>
		<view class="q-a-box">
			<view class="q-title">
				常见问题
			</view>
			<view v-for="item in list" :key="item.id" 
				:class="['line',{'fold':actives.includes(item.id)}]" 
				>
				<view class="flex-ct-bwt" @click="fold(item)">
					<view class="flex-ct q">
						<image class="icon-l" src="../../../static/about/qustion.png" mode=""></image>
						<view>{{item.question}}</view>
					</view>
					<view class="arrow"></view>
				</view>
				<view class="a" v-show="actives.includes(item.id)">
					<image class="icon-l" src="/static/about/answer.png" mode=""></image>
					<view class="a-text">{{item.answer}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { commonProblem } from '../../../api/index.js'
	
	export default{
		data(){
			return {
				tabs:[
					{
						id:1,
						title:"官方客服电话",
						bg:"/static/about/back-left.png",
						icon:"/static/about/phone.png",
						subTitle:"400-970-0989"
					},
					{
						title:"在线客服",
						bg:"/static/about/back-right.png",
						icon:"/static/about/helper.png",
						subTitle:"09:00-17:30"
					}
				],
				list:[
					{"id":1,"question":"如何找到小红心回收机?","answer":"打开微信小程序首页，默认显示是距您最近的回收机位置，点击导航即可前往投递。"},
					{"id":2,"question":"回收机支持哪些物品投递?","answer":"目前小红心支持以下类型回收：饮料瓶、纺织物、废旧金属、废塑料、纸类、有害物品（有害物品为公益回收，不产生收益），具体品类以回收机实际情况为准。"},
					{"id":3,"question":"小红心物品回收价格?","answer":"打开微信小程序首页，即可查看回收物品价格。"},
					{"id":4,"question":"环保金怎么申请提现？","answer":"打开小红心APP或微信小程序，首页点击【我的环保金】，输入提现金额，绑定微信账号，点击提现按钮。"},
					{"id":5,"question":"投递物品如何计费？","answer":"投递后，回收机会根据您投递物品的类型、重量以及当前回收的价格，自动计算环保金，精确到分，具体以实际计算结果为准。"},
					{"id":6,"question":"投递后没有收到环保金怎么办？","answer":"投递完成后，不排除会因为网络或其他原因出现环保金未及时到账情况。在此情况下，请勿着急，及时拨打客服电话400-970-0989。"},
					{"id":13,"question":"环保金提现多久到账？","answer":"环保金提现成功后，3-7个工作日会到账，若7个工作日未到账，请联系客服400-970-0989。"},
				],
				actives:[]
			}
		},
		onShow() {
			commonProblem().then(res=>{
				this.list = res.data
			})
		},
		methods:{
			fold(item){
				let index = this.actives.indexOf(item.id)
				if(index!=-1){
					this.actives.splice(index,1)
				}else{
					this.actives.push(item.id)
				}
			},
			tabHandler(item){
				if(item.id==1){
					uni.makePhoneCall({
					    phoneNumber: item.subTitle //仅为示例
					});
				}
			}
		}
	}
</script>

<style scoped>
	.head{
		border-bottom: 2rpx solid #EBEAEA;
		padding-bottom: 16rpx;
	}
	.item{
		width: 50%;
		height: 202rpx;
		position: relative;
		z-index: 1;
		box-sizing: border-box;
		padding-top: 54rpx;
		font-size: 24rpx;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 34rpx;
		text-align: center;
	}
	.bg{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
		
	.item .icon{
		height: 26rpx;
		width: 30rpx;
		margin-right: 4rpx;
	}
	.s-t{
		margin-top: 12rpx;	
	}
	.q-a-box{
		padding-top: 44rpx;
	}
	.q-title{
		padding-left: 28rpx;
		font-size: 34rpx;
		font-weight: 600;
		color: #333333;
		line-height: 48rpx;
		margin-bottom: 14rpx;
	}
	
	.line{
		padding: 20rpx 30rpx 14rpx;
		border-bottom: 2rpx solid #F3F3F3;
	}
	.icon-l{
		width: 28rpx;
		height: 28rpx;
		margin-right: 20rpx;
	}
	.q{
		
		font-size: 30rpx;
		color: #333333;
		line-height: 60rpx;
	}
	.a{
		padding: 18rpx 0 2rpx;
		font-size: 28rpx;
		color: #B5B5B5;
		line-height: 40rpx;
	}
		
	.a-text{
		padding-left: 50rpx;
	}
	.a image{
		float: left;
	}
	
	.arrow{
		width: 10rpx;
		height: 10rpx;
		border-width: 1rpx;
		border-style: solid;
		border-color: transparent #888888 #888888 transparent;
		transform: rotate(-45deg);
		transition: all .5s;
	}
	.fold .arrow{
		transform: rotate(45deg);
	}
</style>
