<template>
	<view class="item">
		<view class="name">
			{{data.name}}
		</view>
		<view class="font-sub">
			{{data.time}}
		</view>
		<view class="p-right">
			<view :class="['profit',{'delivery':active==1,'expand':active==2,'deduce':active==3}]">
				{{data.profit}}
			</view>
			<!-- [0'驳回',1'待审核',2'已审核',3"已到账",4'异常',5'转账中',6"转账失败", 7"审核中"] -->
			<view v-show="data.statusdes" 
				:class="{ 
				'status':true,
				'f-red':data.state==0||data.state==4||data.state==6,
				'f-yellow':data.state==1 || data.state==7 || data.state==5,
				'f-green':data.state==2 || data.state==3} ">
				{{data.statusdes}}
			</view>
		</view>
		<!-- 违规扣款 -->
		<view v-show="active==3">
			<!-- 违规原因  -->
			<view class="reason flex-ct-bwt">
				<view class="font-sub">
					{{data.dno}}
				</view>
				<view :class="['font-sub', 'arrow',{'fold':onFold}]" @click="expand">
					违规原因
				</view>
			</view>
			<!-- 扣除明细 -->
			<view class="result" v-show="onFold">
				<view class="li"
					v-for="li in data.result"
					:key="li.id">
					<view class="flex-ct">
						<view class="flex-ct icon-name">
							<image class="icon" :src="li.icon" mode=""></image>
							<text>{{li.name}}</text>
						</view>
						<view class="num">
							{{li.countNuit}}
						</view>
						<view class="flex-ct num">
							<text>{{li.countNuit}}</text>
							<image class="gold" src="../../../static/money/gold.png" mode=""></image>
						</view>
						<view class="flex-ct-end num">
							<text>{{li.countNuit}}</text>
							<image class="gold" src="../../../static/money/gold.png" mode=""></image>
						</view>
					</view>
					<view class="des">
						{{li.des}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			data:{
				type:Object,
				default:()=>{
					return {}
				},
				required:false
			},
			active:[Number,String]
		},
		data(){
			return {
				onFold:false
			}
		},
		methods:{
			expand(){
				this.onFold = !this.onFold
			}
		}
	}
</script>

<style scoped>
	.font-sub{
		font-size: 24rpx;
		color: #888888;
		line-height: 34rpx;
		height: 34rpx;
	}
		
	.item{
		padding: 28rpx 30rpx;
		position: relative;
		border-bottom: 2rpx solid #F6F6F6;
	}
	.name{
		font-size: 32rpx;
		color: #000000;
		line-height: 44rpx;
		height: 44rpx;
		margin-bottom: 8rpx;
	}
	.p-right{
		position: absolute;
		right: 30rpx;
		top: 0;
		text-align: right;
	}
	.profit{
		padding-top: 24rpx;
		font-size: 36rpx;
		font-family: DINAlternate-Bold, DINAlternate;
		font-weight: bold;
		color: #1E1E1E;
		line-height: 42rpx;
	}
	.delivery{
		padding-top: 42rpx;
		font-size: 44rpx;
		color: #FF5F62;
		line-height: 52rpx;
	}
	.expand{
		color: #1E1E1E;
	}
	.status{
		padding-top: 6rpx;
		font-size: 28rpx;
		font-weight: 500;
		line-height: 40rpx;
	}
	.f-yellow{
		color: #F7B500;
	}
	.f-green{
		color: #44D7B6;
	}
	.f-red{
		color: #FF5F62;
	}
	.deduce{
		color: #44D7B6;
	}
	.reason{
		padding-top: 16rpx;
	}
	.arrow{
		position: relative;
		padding-right: 33rpx;
	}
	.arrow::after{
		position: absolute;
		right: 0;
		top: 50%;
		content: "";
		margin-top: -7rpx;
		width: 10rpx;
		height: 10rpx;
		border-width: 1rpx;
		border-style: solid;
		border-color: transparent #888888 #888888 transparent;
		transform: rotate(-45deg);
		transition: all .5s;
	}
	.arrow.fold::after{
		transform: rotate(45deg);
	}
	.result{
		padding-top: 14rpx;//36-22
	}
	.li{
		padding: 22rpx 6rpx 0 0;
		color: #1E1E1E;
	}
	.icon-name{
		width: 25%;
		font-size: 26rpx;
		line-height: 36rpx;
	}
	.icon{
		width: 30rpx;
		height: 40rpx;
		margin-right: 16rpx;
	}
	.num{
		width: 25%;
		font-size: 28rpx;
		font-family: DINAlternate-Bold, DINAlternate;
		font-weight: bold;
		line-height: 32rpx;
	}
	.gold{
		width: 28rpx;
		height: 28rpx;
		margin-left: 6rpx;
	}
	.des{
		
		font-size: 24rpx;
		color: #8E8E8E;
		line-height: 34rpx;
		margin-top: 20rpx;
		padding-left: 12rpx;
	}
</style>
