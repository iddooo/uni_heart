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
			<view class="top-3">
				<image class="top-bg" src="/static/ranking/rank.png" mode=""></image>
				<view class="top-rule">
					排名规则
				</view>
				<view class="top-uers flex">
					<view class="u-item"
					v-for="(t,i) in top3"
					:key="i">
						<view class="u-name">
							{{t.nickname}}
						</view>
						<view class="u-count">
							{{t.count}}
						</view>
						<view class="u-des">
							{{cur==3?"公益值":cur==2?"环保金":"投递次数"}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 用户 -->
		<view class="user flex-ct ">
			<view class="user-phone">
				<!-- #ifndef MP-WEIXIN -->
					<image class="headpic" src="/static/index/head.png" mode=""></image>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
					<open-data class="headpic" type="userAvatarUrl"></open-data>
				<!-- #endif -->
			</view>
			<view class="user-info">
				<view class="user-name flex-ct">
					<text class="name">{{user.nickname}}</text>
					<text v-if="cur==3" :class="'level level-'+user.level">{{user.des}}</text>
				</view>
				<view class="user-rank">
					我的排名:{{user.rank}}
				</view>
			</view>
			<view class="user-count">
				{{user.count}}<text v-if="cur==1">次</text>
			</view>
		</view>
		
		<!-- 排名 -->
		<view class="rank-list">
			<view class="rank-item flex-ct"
				v-for="(item,i) in rankList"
				:key="i">
				<view class="num">
					{{item.rank}}
				</view>
				<view class="user-phone">
					<image v-if="item.headPic" class="headpic" :src="IMG_URL+item.headPic" mode=""></image>
					<image v-else class="headpic" src="/static/index/head.png" mode=""></image>
				</view>
				<view class="c-box user-name flex-ct">
					<text class="name">{{item.nickname}}</text>
					<text v-if="cur==3" :class="'level level-'+item.level">{{item.des}}</text>
				</view>
				<view class="user-count">
					{{item.count}}<text v-if="cur==1">次</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { getRankList } from '../../../api/index.js'
	import { URL,getLevel } from '../../../common/index.js'
	
	export default{
		data(){
			return{
				IMG_URL:URL,
				cur:1,
				tabs:[
					{id:3,name:"公益值榜"},
					{id:2,name:"环保金榜"},
					{id:1,name:"投递榜"},
				],
				top3:[
					{complex: "菁蓉汇",count: "8320",headPic: null,nickname: "希望是片云2",rank: 1,sno: "14537",userId: 4522},
					{complex: "菁蓉汇",count: "8320",headPic: null,nickname: "希望是片云1",rank: 1,sno: "14537",userId: 4522},
					{complex: "菁蓉汇",count: "8320",headPic: null,nickname: "希望是片云3",rank: 1,sno: "14537",userId: 4522},
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
					this.top3 = [rankList[2],rankList[0],rankList[1]]
					this.rankList = rankList.slice(3)
					console.log(this.rankList)
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
	.top-3{
		position: relative;
		padding: 0 20rpx;
		z-index: 1;
	}
	.top-bg{
		position: absolute;
		left: 20rpx;
		top: 0;
		width:710rpx;
		height:372rpx;
		z-index: -1;
	}
	.top-rule{
		position: absolute;
		right: 0;
		top: -40rpx;
		width:128rpx;
		height:46rpx;
		background:rgba(255,110,113,1);
		border-radius:31rpx 0 0 31rpx;
		line-height: 46rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 24rpx;
	}
	.top-uers{
		padding-top: 224rpx;
		width: 100%;
	}
	.u-item{
		flex: 1;
		text-align: center;
	}
	.u-name{
		font-size:28rpx;
		font-weight:500;
		color:rgba(30,30,30,1);
		line-height:40rpx;
		margin-bottom: 12rpx;
	}
	.u-count{
		font-size:28rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(255,95,98,1);
		line-height:32rpx;
		margin-bottom: 10rpx;
	}
	.u-des{
		font-size:26rpx;
		color:rgba(144,144,144,1);
		line-height:36rpx;
	}
	.user{
		border-bottom: 20rpx solid #F6F6F6;
		padding: 26rpx;
	}
	.user-phone{
		width:80rpx;
		height:80rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.user-phone .headpic{
		width: 100%;
		height: 100%;
	}
	.user-info{
		width: 432rpx;
		box-sizing:  border-box;
		padding-left: 30rpx;
	}
	.user-name .name{
		font-size:28rpx;
		font-weight:500;
		color:rgba(30,30,30,1);
		line-height:40rpx;
	}
	.user-rank{
		margin-top: 6rpx;
		font-size:28rpx;
		color:rgba(109,114,120,1);
		line-height:40rpx;
	}
	.user-count{
		font-size:28rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		color:rgba(255,95,98,1);
		line-height:32rpx;
		flex:1;
		text-align: right;
		padding-right: 28rpx;
	}
	.rank-list{
		padding: 0 26rpx;
	}
	.rank-item{
		padding: 26rpx 0;
		border-bottom: 2rpx solid #E2E2E2;
	}
	.num{
		padding: 0 34rpx 0 36rpx;
		font-size:28rpx;
		font-weight:500;
		color:rgba(30,30,30,1);
		line-height:40rpx;
		text-align: right;
	}
		
	.c-box{
		width: 328rpx;
		box-sizing: border-box;
		padding-left: 30rpx;
	}
</style>
