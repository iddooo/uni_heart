<template>
	<view class="page">
		<view class="head">
			<image class="bg" src="../../../static/welfare/headbg.png" mode=""></image>
			<image class="level" :src='"../../../static/welfare/level-icon-"+ 1 +".png"' mode=""></image>
			<RuleTag @click="linkToWelfare" />
		</view>
		<StepBox :data="currWelfare" :percent="percent" :levels="levels"/>
		<view class="tips">
			 距离下一级还差35000公益值
		</view>
		<Table :columns="columns" :data="table"></Table>
	</view>
</template>

<script>
	import RuleTag from './RuleTag.vue'
	import StepBox from './StepBox.vue'
	import Table from './Table.vue'
	import { myMoney } from '../../../api/index.js'
	
	
	export default{
		components:{
			RuleTag,
			StepBox,
			Table
		},
		data(){
			return{
				currWelfare:3270,
				percent:30,
				levels:[
					{
						level:0,
						name:"青铜",
						gold:0,
						maximum:1000
					},
					{
						name:'白银',
						level:1,
						gold:1000,
						maximum:5000
					},
					{
						name:'黄金',
						level:2,
						gold:5000,
						maximum:10000
					},
					{
						name:'铂金',
						level:3,
						gold:10000,
						maximum:50000
					},
					{
						name:'钻石',
						level:4,
						gold:50000,
						maximum:100000
					},
					{
						name:'王者',
						level:5,
						gold:100000,
						maximum:9999999999
					}
				],
				columns:[
					{
						title: '获取条件',
						key: 'name'
					},
					{
						title: '公益值',
						key: 'welfare'
					},
					{
						title: '频次限制',
						key: 'times'
					}
				],
				table:[
					{name:"邀请好友并投递",welfare:500,times:"不限"},
					{name:"每日首次公益投递",welfare:20,times:"1次/天"},
					{name:"参与投递每获得1分钱",welfare:1,times:"不限"},
					{name:"绑定手机号",welfare:200,times:"仅1次"},
					{name:"填写个人信息",welfare:300,times:"仅1次"}
				]
			}
		},
		methods:{
			linkToWelfare(){
				uni.navigateTo({
					url:"/pages/My/welfare/index"
				})
			}
		},
		onLoad() {
			let userId = uni.getStorageSync('userId')
			myMoney(userId).then(res=>{
				if(res.code != 1) return
				this.currWelfare = res.data.currWelfare
				for(let i = 0,len = this.levels.length; i < len; i++){
					let item = this.levels[i]
					let max = item.maximum, min = item.gold
					if(this.currWelfare < max){
						let exceed = this.currWelfare - min
						let cur = exceed/(max-min)*100 / 5
						this.percent = i*20 + cur
						return
					}
				}
			})
		}
	}
</script>

<style scoped>
	.head{
		height: 346rpx;
		position: relative;
	}
	.bg{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 250rpx;
	}
	.level{
		position: absolute;
		left: 120rpx;
		top: 0;
		width: 510rpx;
		height: 346rpx;
	}
	.tips{
		text-align: center;
		font-size: 20rpx;
		color: #909090;
		line-height: 28rpx;
		margin-bottom: 40rpx;
	}
	
</style>
