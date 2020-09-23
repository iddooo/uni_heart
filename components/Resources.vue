<template>
	<view class="resources-container">
		<swiper class="r-c-swiper" @change="cateSwiperChange">
			<swiper-item v-for="(resources,i) in swiperData" :key="i">
				<view :class="['resources',{'item-6':item6 }]">
					<view v-for="(item,index) in resources" :key="index" class="category">
						<image class="cls" :src="item.imgUrl" mode=""></image>
						<!-- 状态 0-正常(未满) 1.箱满 2.异常 -->
						<image v-if="item.state" class="state" :src="'/static/index/box-state' + item.state +'.png'" mode=""></image>
						<view class="name">{{item.name}}</view>
						<view class="count">{{item.price}}元/{{item.unit}}</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="c-dots flex" v-if="swiperData.length>1">
		  <view v-for="(r,i) in swiperData" :key="i" :class="['c-dot', {'active': cur==i}]"></view>
		</view>
	</view>
</template>

<script>
	var _this;
	export default{
		props:{
			data:{
				type:Array,
				required:false,
				default:()=>{
					return [
						// {"id":"411560080522219520","name":"饮料瓶","price":0.04,"imgUrl":"http://47.103.51.182:8000/icon/bottles-s.png","contry":null,"unit":"个","state":0,"sno":null},
						// {"id":"411560080522219521","name":"纸类","price":0.50,"imgUrl":"http://47.103.51.182:8000/icon/page-s.png","contry":null,"unit":"kg","state":0,"sno":null},
						// {"id":"411560080522219522","name":"纺织物","price":0.30,"imgUrl":"http://47.103.51.182:8000/icon/clothes-s.png","contry":null,"unit":"kg","state":0,"sno":null},
						// {"id":"411560080522219523","name":"有害","price":0.00,"imgUrl":"http://47.103.51.182:8000/icon/harmful-s.png","contry":null,"unit":"kg","state":0,"sno":null},
						// {"id":"411560080522219524","name":"塑料/金属","price":0.40,"imgUrl":"http://47.103.51.182:8000/icon/suliao-red.png","contry":null,"unit":"kg","state":2,"sno":null},
						// {"id":"411560080522219525","name":"玻璃","price":0.00,"imgUrl":"http://47.103.51.182:8000/icon/boli-red.png","contry":null,"unit":"kg","state":2,"sno":null}
					]
				}
			}
		},
		data(){
			return{
				swiperData:[],
				item6:false,
				cur:0
			}
		},
		watch:{
			'data':{
				deep:true,
				handler:(val,oval)=>{
					_this.item6 = val.length > 4
					_this.swiperData = _this.truck(val,6)
					console.log(_this.item6,_this.swiperData)
				}
			}
		},
		methods:{
			truck(arr,count){
			  let result = [];
			  //遍历输出成员
			  arr.forEach((item,index) => {
				//
				let temp = Math.floor(index / count);
				//检验数组是否初始化
				if(!(result[temp] instanceof Array)){
				  result[temp] = new Array;
				}
				result[temp].push(item);
			  })
			  return result;
			},
			cateSwiperChange(e){
				this.cur = e.detail.current
			},
		},
		created() {
			_this = this
		}
	}
</script>

<style scoped>
	.resources-container{
		height: 206rpx;
		padding-bottom: 32rpx;
		position: relative;
	}
	.r-c-swiper{
		height: 100%;
	}
	.resources{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content:space-around;
		align-content: space-between;
	}
	.item-6{
		flex-wrap: wrap;
		justify-content:flex-start;
	}
	.category {
		padding-top: 40rpx;
		position: relative;
		text-align: center;
	}
	.item-6 .category{
		width: 33.3%;
		box-sizing: border-box;
		text-align: left;
	}
	/* 状态图片 */
	.category .state{
		width:66rpx;
		height:38rpx;
		position: absolute;
		top: 0rpx;
		left: 50%;
	}
	.item-6 .state{
		left: 58rpx; //32+26
	}
	/* 分类图片 */
	.category .cls{
		width: 66rpx;
		height: 70rpx;
		margin-bottom: 4rpx;
	}
	.item-6 .cls{
		width: 48rpx;
		height: 54rpx;
		float: left;
		margin-right: 22rpx;
		margin-left: 32rpx;
	}
	/* 分类名称 */
	.category .name{
		font-size: 22rpx;
		line-height: 32rpx;
		margin-bottom: 2rpx;
	}
	.item-6 .name,
	.category .count{
		font-size: 20rpx;
		line-height: 28rpx;
	}
	.category .count{
		font-weight: 500;
	}
	/* 小圆点 */
	.c-dots{
	  position: absolute;
	  left: 50%;
	  bottom: 0;
	  transform: translateX(-50%);
	}
	.c-dot{
	  width: 10rpx;
	  height: 10rpx;
	  border-radius: 50%;
	  background-color: rgba(183,183,183,.42);
	  margin: 0 7rpx;
	}
	.c-dot.active{
	  background-color: #FF5F62;
	}
</style>
