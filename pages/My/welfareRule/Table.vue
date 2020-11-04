<template>
	<view class="table-box">
		<view class="table-head">
			<view class="col"
				v-for="h in columns" :key="h.key">
				{{h.title}}
			</view>
		</view>
		<view class="table-body">
			<view v-for="(tr,index) in data" :key="index" class="tr">
				<view class="col"
					v-for="h in columns" :key="h.key">
					{{tr[h.key]}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			columns:{
				type:Array,
				required:false,
				default:()=>{
					return []
				}
			},
			data:{
				type:Array,
				required:false,
				default:()=>{
					return []
				}
			}
		}
	}
</script>

<style scoped>
	.table-box{
		width: 698rpx;
		height: 452rpx;
		border: 2rpx solid #F6F6F6;
		margin: 0 auto;
	}
	.table-head{
		height: 72rpx;
		background: #F6F6F6;
		font-size: 28rpx;
		font-weight: 500;
		color: #1E1E1E;
		line-height: 72rpx;
		display: flex;
	}
	.tr{
		display: flex;
		height: 74rpx;
		line-height: 74rpx;
		border-bottom: 2rpx solid #F6F6F6;
		font-size: 24rpx;
		color: #1E1E1E;
	}
	.col{
		text-align: center;
		flex: 1;
	}
</style>
