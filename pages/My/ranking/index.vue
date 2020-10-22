<template>
	<view class="page">
		<view class="heading">
			<view class="tabs flex">
				<view 
				v-for="item in tabs"
				:key="item.id"
				@click="changeTab(item)"
				:class="['tab-item',{'is-active':cur==item.id}]">
					{{item.name}}
				</view>
			</view>
			<view class="top-rule" @click="showRules">
				排名规则
			</view>
			<TopThree :cur='cur' :top="top3"></TopThree>
		</view>
		
		<!-- 用户 -->
		<UserCard :user="user" :cur="cur"></UserCard>
		
		<!-- 排名 -->
		<view class="rank-list">
			<RankItem 
			v-for="(item,i) in rankList"
			:key="i"
			:rankItem="item"
			:cur="cur"></RankItem>
		</view>
		
		<MessageBox></MessageBox>
	</view>
</template>

<script>
	import { getRankList } from '../../../api/index.js'
	import { getLevel } from '../../../common/index.js'
	import RankItem from './RankItem.vue'
	import UserCard from './UserCard.vue'
	import TopThree from './TopThree.vue'
	import { mapMutations } from 'vuex'
	
	export default {
		components: {
			RankItem,
			UserCard,
			TopThree
		},
		data(){
			return{
				cur:1,
				tabs:[
					{id:3,name:"公益值榜"},
					{id:2,name:"环保金榜"},
					{id:1,name:"投递榜"},
				],
				top3:[
					// {complex: "菁蓉汇",count: "8320",headPic: null,nickname: "希望是片云2",rank: 1,sno: "14537",userId: 4522},
					// {complex: "菁蓉汇",count: "8320",headPic: null,nickname: "希望是片云1",rank: 1,sno: "14537",userId: 4522},
					// {complex: "菁蓉汇",count: "8320",headPic: null,nickname: "希望是片云3",rank: 1,sno: "14537",userId: 4522},
				],
				rankList:[],
				user:{
					count: "4",
					nickname: "D儿",
					percent: "0.0%",
					rank: 17,
				},
				
			}
		},
		onLoad(option) {
			console.log(option.id)
			this.cur = option.id
			this.getList()
		},
		methods:{
			...mapMutations(['MessageBox']),
			changeTab(item){
				this.cur = item.id
				this.getList()
			},
			getList(){
				getRankList(this.cur).then(res=>{
					let level = this.$common.getLevel(res.data.count)
					this.user = Object.assign({},res.data,level)
					let rankList = res.data.rankList.map(v=>{
						let l = this.$common.getLevel(v.count)
						let b = Object.assign({},v,l)
						return b
					})
					this.top3 = [rankList[2] || {},rankList[0] || {},rankList[1] || {}]
					// this.top3 = [{},rankList[0],{}]
					this.rankList = rankList.slice(3)
					// console.log(this.top3,this.rankList)
				})
			},
			showRules(){
				this.MessageBox({
					title: '排名规则',
					type: 'HTML',
					msg: `1.用户排名每天24时更新； <br>
						  2.小区选择默认为第一次进行投递小区； <br>
						  3.排名相同，按照注册时间先后进行排名。`,
				})	
			}
		}
	}
</script>

<style scoped>
	.heading{
		width: 100%;
		height: 556rpx;
		background-color: #F3575A;
	}
	.top-rule{
		position: absolute;
		right: 0;
		top: 112rpx;
		width:128rpx;
		height:46rpx;
		background:rgba(255,110,113,1);
		border-radius:31rpx 0 0 31rpx;
		line-height: 46rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 24rpx;
	}
		
	.tabs{
		padding: 44rpx 0 66rpx;
		line-height: 40rpx;
	}
	.tab-item{
		color: #FBD4D5;
		font-size: 28rpx;
		text-align: center;
		flex: 1;
	}
	.tab-item.is-active{
		font-weight:600;
		font-size: 34rpx;
		color: #FFFFFF;
	}
	
	.rank-list{
		padding: 0 26rpx;
	}
</style>
