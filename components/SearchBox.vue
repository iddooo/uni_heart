<template>
	<!-- 搜索框 -->
	<view class="search flex-ct" @click="linkTo">
		<view class="search-box flex-ct">
			<icon class="search-icon" type="search" color="#333" size="14"></icon>
			<input :disabled="disabled" class="weui-input" placeholder-class="plc" @input="onInput" @confirm="onConfirm" confirm-type="搜索" :value="value" placeholder="请输入识别的垃圾名称" />
			<view class="reset" @click="reset">
				<!-- <image src="/static/index/clear.png" mode=""></image> -->
			</view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default{
		props:['value','disabled'],
		methods:{
			reset(){
				console.log('reset');
				this.$emit('reset')
			},
			onInput(e){
				this.$emit('input',e)
			},
			onConfirm(){
				this.$emit('confirm')
			},
			linkTo(){
				this.$emit('click')
			}
		}
	}
</script>

<style scoped>
	.search {
	  width: 100%;
	  height: 64rpx;
	  background-color: #fff;
	  padding: 0 30rpx;
	  box-sizing: border-box;
	  display: flex;
	}
	
	.search-box {
	  flex: 1;
	  height: 64rpx;
	  background: rgba(245, 246, 250, 1);
	  border-radius: 33rpx;
	  color: #2F2F2F;
	  line-height: 36rpx;
	  font-size: 26rpx;
	  padding-left: 26rpx;
	  box-sizing: border-box;
	}
	.search-icon {
	  margin-right: 10rpx;
	  height: 28rpx;
	}
	
	.weui-input {
	  flex: 1;
	}
	.reset{
		padding: 0 30rpx;
	}
	.reset image{
		width: 34rpx;
		height: 36rpx;
		display: block;
	}
</style>
