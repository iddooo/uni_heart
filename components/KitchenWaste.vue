<template>
	<view class="kitchen">
		<view class="item-2">
			<!-- 状态 0-正常(未满) 1.箱满 2.异常 -->
			<image v-if="kitchenState" class="state" :src="'/static/index/box-state' + kitchenState +'.png'" mode=""></image>
			<view class="capacity">
				<image class="bg" :src="'/static/index/liquid-red-'+ kitchen +'.png'" mode=""></image>
				<view class="percent">{{kitchenCapacity}}</view>
			</view>
			<view class="title">厨余垃圾</view>
			<view>{{kitchenWeight}}</view>
		</view>
		<view class="item-2">
			<image v-if="otherState" class="state" :src="'/static/index/box-state' + otherState +'.png'" mode=""></image>
			<view class="capacity">
				<image class="bg" :src="'/static/index/liquid-yellow-'+other+'.png'" mode=""></image>
				<view class="percent">{{otherCapacity}}</view>
			</view>
			<view class="title">其他垃圾</view>
			<view>{{otherWeight}}</view>
		</view>
	</view>
</template>

<script>
	/** 
		kitchenCapacity: "0"
		kitchenWeight: null
		kitchenfull: false
		lat: "30.564471"
		lng: "104.092101"
		otherCapacity: "0"
		otherWeight: null
		otherfull: false
		*/
	var _this;
	export default{
		props:{
			data:{
				type:Object,
				required:false,
				default:()=>{
					return {}
				}
			}
		},
		watch:{
			'data':{
				deep:true,
				handler(val,oval){
					_this.kitchenCapacity = val.kitchenCapacity + '%';
					_this.kitchenState = val.kitchenfull ? 1 : 0
					_this.kitchen = (Number(val.kitchenCapacity)/30).toFixed(0)
					_this.kitchenWeight = val.kitchenWeight ? val.kitchenWeight + 'kg' : ''
					
					_this.otherCapacity = val.otherCapacity + '%';
					_this.otherState = val.kitchenfull ? 1 : 0
					_this.other = (Number(val.otherCapacity)/30).toFixed(0)
					_this.otherWeight = val.otherWeight? val.otherWeight + 'kg' : ''
				}
			}
		},
		data(){
			return{
				kitchen:0,
				other:0,
				kitchenCapacity:0,
				otherCapacity:0,
				kitchenState:0,
				otherState:0,
				kitchenWeight:0,
				otherWeight:0,
			}
		},
		created() {
			_this = this
		}
	}
</script>

<style scoped>
	.kitchen{
		display: flex;
		width: 100%;
	}
	.item-2{
		width: 50%;
		text-align: center;
		font-size:20rpx;
		line-height: 28rpx;
		font-weight:500;
		position: relative;
		padding-top: 44rpx;
	}
	.item-2 .state{
		width: 66rpx;
		height: 38rpx;
		position: absolute;
		left: 50%;
		top: 0;
	}
	.item-2 .capacity{
		width: 92rpx;
		height: 92rpx;
		margin-bottom: 16rpx;
		position: relative;
		display: inline-block;
	}
	.item-2 .bg{
		width: 100%;
		height: 100%;
	}
	.percent{
		color:rgba(255,255,255,1);
		position: absolute;
		left: 50%;
		top: 46rpx;
		transform: translateX(-50%);
	}
	.title{
		font-weight: 400;
		margin-bottom: 2rpx;
	}
</style>
