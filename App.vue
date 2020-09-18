<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			text: 'text'  
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/common.css");
	@import url("./common/style.css");
	/* 商城banner */
	/* .shop-banner .swiper-container{
		height: 298rpx;
	}
	.shop-banner .dots{
		bottom: 0rpx;
	}
	.shop-banner .dot{
		width: 8rpx;
		height: 8rpx;
		border-radius: 4rpx;
		background: #D8D8D8;
		opacity: 1;
		margin-right: 10rpx;
	} */
</style>
