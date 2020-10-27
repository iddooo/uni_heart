<template>
	<view class="entry">
	    <view class="entry-item" 
		v-for="(item,index) in data" 
		:key="index"
		@click="linkTo(item)">
		  <image class="badge" :src="item.badge"></image>
		  <image class="icon" :src="item.icon"></image>
		  <view>{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			data:{
				type:Array,
				default:()=>{
					return []
				},
				required:false
			}
		},
		methods:{
			linkTo(item){
				this.$emit('linkTo',item)
			}
		}
	}
</script>

<style scoped>
	.entry {
	  padding: 44rpx 50rpx 66rpx;
	  display: flex;
	  justify-content: space-between;
	}
	
	.entry .entry-item {
	  position: relative;
	  text-align: center;
	  font-size: 24rpx;
	  font-weight: 400;
	  color: rgba(59, 59, 59, 1);
	  line-height: 34rpx;
	}
	
	.entry-item .icon {
	  width: 100rpx;
	  height: 100rpx;
	  margin-bottom: 28rpx;
	}
	
	.entry-item .badge {
	  width: 84rpx;
	  height: 30rpx;
	  position: absolute;
	  right: -28rpx;
	  top: -10rpx;
	}
</style>
