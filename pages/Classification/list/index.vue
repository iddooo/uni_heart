<template>
	<view class="page">
		<view class="classify">
			<view 
			@click="changeClassify(index)" 
			:class="{'classify-item':true,'is-active':cur==index}" 
			v-for="(item,index) in classify" :key="index">
				{{item.name}}
			</view>
		</view>
		<view class="content">
			<view class="c-left">
				<div @click="changeName(index)" 
					:class="{'name-item':true,'is-active':curName==index}" 
					v-for="(item,index) in names" :key="index">
					<image :src="curName==index? item.imageUrl1 : item.imageUrl2" mode=""></image>
					<view>{{item.name}}</view>
				</div>
			</view>
			<view class="c-right">
				<view class="c-item"
				v-for="(item,index) in items" :key="index">
					<image :src="item.imageUrl1" mode=""></image>
					<view>{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getclassifyList } from '../../../api/index.js'
	export default{
		data(){
			return{
				classify:[],
				cur:0,
				names:[],
				curName:0,
				items:[]
			}
		},
		onLoad() {
			this.initData()
		},
		onShow() {
			
		},
		methods:{
			initData(){
				getclassifyList().then(res=>{
					this.classify = res.data
					this.names = this.classify[this.cur].children
					this.items = this.names[this.curName].children
				})
			},
			changeClassify(index){
				this.cur = index
				this.names = this.classify[this.cur].children
				this.curName = 0
				this.items = this.names[this.curName].children
			},
			changeName(index){
				this.curName = index
				this.items = this.names[this.curName].children || []
			}
		}
	}
</script>

<style>
	.classify{
		padding: 30rpx 0 38rpx;
		display: flex;
	}
	.classify-item{
		width: 25%;
		text-align: center;
		font-size:28rpx;
		font-weight:400;
		color:rgba(144,144,144,1);
		line-height:40rpx;
	}
	.classify-item.is-active{
		color: #1E1E1E;
		position: relative;
		transition: all .5s;
	}
	.classify-item.is-active::after{
		content: "";
		position: absolute;
		left: 50%;
		bottom: -8rpx;
		width:40rpx;
		height:8rpx;
		background:rgba(255,95,98,1);
		border-radius:5rpx;
		transform: translateX(-50%);
	}
	.content{
		display: flex;
	}
	.c-left{
		width: 160rpx;
	}
	.c-right{
		flex: 1;
		padding-left: 40rpx;
		padding-top: 30rpx;
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		align-content: flex-start;
	}
	.name-item{
		position: relative;
		height: 140rpx;
		background-color: #F6F6F6;
		color: #909090;
		font-size:24rpx;
		line-height:34rpx;
		text-align: center;
		transform: all .5s;
		padding-top: 24rpx;
	}
	.name-item image{
		width: 52rpx;
		height: 52rpx;
		margin-bottom: 8rpx;
	}
	.name-item.is-active{
		background-color: #fff;
		color: #1E1E1E;
	}
	.name-item.is-active::after{
		content: "";
		position: absolute;
		left: 0;
		top: 50%;
		width:8rpx;
		height:40rpx;
		background:rgba(255,95,98,1);
		transform: translateY(-50%);
	}
	
	.c-item{
		width: 246rpx;
		height: 194rpx;
		margin-right: 20rpx;
		text-align: center;
		font-size:24rpx;
		line-height: 34rpx;
		border:1rpx solid rgba(210,210,210,.4);
		margin-bottom: 20rpx;
		box-sizing: border-box;
	}
	.c-item image{
		width: 100%;
		height: 150rpx;
	}
</style>
