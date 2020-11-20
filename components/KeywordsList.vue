<template>
	<view class="keywords-container" v-show="Boolean(keyword)">
		<view class="k-line"
			v-for="(item,i) in data"
			:key="i"
			@click="handlerClick(item)">
			{{item.name}}
		</view>
		<view class="no-container" v-show="data.length===0">
			<image class="no-res" src="/static/ai/nores.png"></image>
			<view class="no-words">抱歉，未找到该垃圾</view>
			<view v-if="!isFadeback" @click="fadeback" class="no-words">点击此处反馈“{{keyword}}”让小红心收录</view>
			<view v-else class="no-words">感谢您的反馈</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['data','keyword','isFadeback'],
		methods:{
			handlerClick(item){
				this.$emit('@click',item)
			},
			fadeback(){
				this.$emit('fadeback')
			}
		}
	}
</script>

<style scoped>
	.keywords-container{
		padding-top: 38rpx;
	}
	.k-line{
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(47, 47, 47, 1);
		line-height: 40rpx;
		padding: 20rpx 40rpx;
	}
	.no-res{
		display: block;
		width: 568rpx;
		height: 458rpx;
		margin: 190rpx auto 26rpx;
	}
	.no-words {
	  font-size: 28rpx;
	  color: rgba(144, 144, 144, 1);
	  line-height: 40rpx;
	  text-align: center;
	  margin-bottom: 18rpx;
	}
</style>
