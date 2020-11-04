<template>
	<view class="page">
		<view class="line"
			v-for="item in list" :key="item.id">
			<view class="content">
				{{item.content}}
			</view>
			<view class="time">
				{{item.createTime}}
			</view>
			<view :class="['num',item.type?'red':'blue']">
				{{item.type ? '+' : '-'}}{{item.score}}
			</view>
		</view>
		<End :isLoading="isLoading"/>
	</view>
</template>

<script>
	import { welfareRecord } from '../../../api/index.js'
	import End from '../../../components/End.vue'
	
	export default{
		components: {
			End
		},
		data(){
			return{
				page:1,
				pageSize:10,
				hasNextPage:true,
				list:[],
				isLoading:false
			}
		},
		onLoad() {
			this.getData()
		},
		methods:{
			getData(){
				let data = {
					page:this.page,
					pageSize:this.pageSize
				}
				welfareRecord(data).then(res=>{
					if(res.code==1){
						if(this.page == 1) this.list = []
						this.list = this.list.concat(res.data.list)
						this.hasNextPage = res.data.hasNextPage
						this.page = this.hasNextPage ? ++this.page : this.page
					}
				})
			}
		},
		onReachBottom() {
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
	.line{
		border-bottom: 2rpx solid rgba(246,246,246,1);
		padding: 28rpx 58rpx 26rpx;
		position: relative;
	}
	.content{
		font-size: 28rpx;
		color: #000000;
		line-height: 40rpx;
		margin-bottom: 22rpx;
	}
	.time{
		font-size: 20rpx;
		color: #888888;
		line-height: 28rpx;
	}
	.num{
		position: absolute;
		right: 58rpx;
		top: 54rpx;
		font-size: 32rpx;
		font-family: DINAlternate-Bold, DINAlternate;
		font-weight: bold;
		line-height: 38px;
	}
	.red{
		color: #FF5F62;
	}
	.blue{
		color: #44D7B6;
	}
</style>
