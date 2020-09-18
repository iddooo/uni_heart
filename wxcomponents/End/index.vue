<template>
<uni-shadow-root class="End-index"><view class="end" v-if="isLoading">

	<image class="loading" src="/static/index/icon-loading.png"></image>
	<view class="font-18 font-used clr-144">别拉了^_^我也是有底线</view>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'End/index'
Component({
  properties: {
    isLoading: Boolean
	}
})
export default global['__wxComponents']['End/index']
</script>
<style platform="mp-weixin">
.end{
	font-size: 22rpx;
	color: #C0C0C0;
	background-color: #F6F6F6;
	text-align: center;
}
.loading {
  width: 32rpx;
  height: 32rpx;
  margin: 10rpx auto;
  animation: load 1s linear infinite;
}

@-webkit-keyframes load {
  from {
	transform: rotate(0deg);
  }

  to {
	transform: rotate(360deg);
  }
}
</style>