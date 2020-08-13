<template>
	<view class="page">
		<view class="total-box">
			<image class="bg" src="/static/money/back-money.png" mode=""></image>
			<view class="t-title flex-ct">
				<text>环保金</text>
				<view @click="rules" class="rule-box">
					<image src="/static/money/rule.png" mode=""></image>
				</view>
			</view>
			<view class="total-money">
				{{money}}
			</view>
		</view>
		
		<view class="withdraw-box">
			<view class="title">
				提现金额<text class="subtitle">（1环保金可兑换1人民币）</text>
			</view>
			<view class="money-box flex-ct">
				<view class="mark">
					￥
				</view>
				<input v-model="withdrawMoney" type="number" class="uni-input" placeholder-class="placeholder" focus placeholder="请输入提现金额" />
			</view>
			<view class="tips flex-ct-bwt">
				<view>
					可提现金额为<text class="blue">{{money}}</text>元
				</view>
				<view class="blue" @click="withdrawAll">
					全部提现
				</view>
			</view>
		</view>
		
		<view class="withdraw-style">
			<view class="title">
				提现方式
			</view>
			<view class="styles flex">
				<view class="s-box flex-ct">
					<view class="wx">
						<image src="/static/money/weixin.png" mode=""></image>
					</view>
					<view>微信零钱</view>
				</view>
			</view>
		</view>
		
		<button class="btn" @click="withdraw">提现</button>
	</view>
</template>

<script>
	import { myMoney, fundCash } from '../../../api/index.js'
	
	export default{
		data(){
			return{
				money:0,
				withdrawMoney:undefined
				
			}
		},
		onLoad(option) {
			console.log(option);
		},
		onShow() {
			let money = uni.getStorageSync('money')
			// console.log(money==null,money=='',money==undefined);
			if(money==''){
				let userId = uni.getStorageSync('userId')
				myMoney(userId).then(res=>{
					if(res.code != 1) return
					this.money = res.data.currentProfit
				})
			}else{
				this.money = money
			}
		},
		methods:{
			rules(){
				this.$MessageBox({
					title: '提现规则',
					type: 'HTML',
					msg: `1.单日最多可兑换1笔（以申请成功为准, <br>
						  2.单笔兑换金额须≥10环保金, <br>
						  3.实际到账情况以第三方机构为准, <br>
						  4.提现中的金额将先冻结，客服将进行审核，如提现失败将返回账户中，可再次发起提现申请,<br>
						  5.若7个工作日内未到账，请联系客服咨询400-970-0989`,
					buttons: ['确认'],
					reverse: true,
					visible: true
				})	
			},
			withdraw(){
				if(!this.withdrawMoney || this.withdrawMoney=='') return
				if(this.withdrawMoney<10){
					uni.showToast({
						title:'最小兑换金额为10元',
						icon:"none"
						
					})
					return
				}
				if(this.withdrawMoney > this.money){
					uni.showToast({
						title:'余额不足',
						icon:"none"
						
					})
					return
				}
				
				fundCash(this.withdrawMoney).then(res=>{
					if(res.code==1){
						console.log('提现成功');
						uni.navigateTo({
							url:"../withdrawResult/index?money="+this.withdrawMoney
						})
					}
				})
				
				
			},
			withdrawAll(){
				this.withdrawMoney = this.money
			}
		}
	}
</script>

<style scoped>
	.total-box{
		position: relative;
		height: 352rpx;
		z-index: 1;
	}
	.bg{
		width:630rpx;
		height:246rpx;
		position: absolute;
		left: 64rpx;
		top: 48rpx;
		z-index: -1;
	}
	.t-title{
		padding-top: 88rpx;
		padding-left: 124rpx;
		font-size:34rpx;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:48rpx;
	}
	.rule-box{
		padding: 10rpx;
	}
	.rule-box image{
		width: 24rpx;
		height: 24rpx;
	}
	.total-money{
		padding-top: 26rpx;
		font-size:78rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(255,255,255,1);
		line-height:92rpx;
		text-align: center;
	}
	.withdraw-box{
		padding: 0 24rpx 70rpx;
	}
	.title{
		font-size:32rpx;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:44rpx;
	}
	.subtitle{
		color:rgba(136,136,136,1);
	}
	.money-box{
		padding-top: 54rpx;
		padding-bottom: 38rpx;
		height: 70rpx;
		border-bottom: 2rpx solid #E2E2E2;
		color: #2C2C2C;
		font-size:60rpx
	}
	.uni-input{
		font-size:30rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:70rpx;
	}
	.mark{
		margin-right: 30rpx;
	}
	.tips{
		padding-top: 22rpx;
		font-size:28rpx;
		font-weight:400;
		color:rgba(136,136,136,0.64);
		line-height:40rpx;
		padding-right: 20rpx;
	}
	.blue{
		color: #0091FF;
		font-weight: 500;
	}
	.withdraw-style{
		padding: 0 24rpx;
	}
	.styles{
		padding-top: 34rpx;
	}
	.s-box{
		padding: 20rpx 30rpx;
		border-radius:4rpx;
		border:2rpx solid rgba(226,226,226,1);
		line-height: 42rpx;
		color:rgba(51,51,51,1);
		font-weight:400;
		font-size:30rpx;
		min-width: 234rpx;
		box-sizing: border-box;
	}
	.s-box .wx{
		width:42rpx;
		height:42rpx;
		margin-right: 12rpx;
	}
	.s-box image{
		width: 100%;
		height: 100%;
	}
	.btn{
		width:682rpx;
		height:80rpx;
		background:rgba(255,95,98,1);
		border-radius:4rpx;
		line-height: 80rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 32rpx;
		position: fixed;
		bottom: 114rpx;
		left: 30rpx;
	}
</style>
