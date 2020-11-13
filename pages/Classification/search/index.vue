<template>
	<view class="page">
		<!-- 搜索框 -->
		<view class="search flex-ct">
			<view class="search-box flex-ct">
				<icon class="search-icon" type="search" color="#333" size="14"></icon>
				<input class="weui-input" placeholder-class="plc" @input="inputkwd" @confirm="cfmkwd" confirm-type="搜索" :value="keyword" placeholder="请输入识别的垃圾名称" />
			</view>
			<view @click="clear" class="cancel">取消</view>
		</view>
		<!-- 搜索结果 -->
		<view class="keywords-container" v-show="keyword">
			<view class="k-line"
				v-for="(item,i) in keywordsList"
				:key="i"
				@click="chooseItem(item)">
				{{item.name}}
			</view>
			<view class="no-container" v-show="keywordsList.length===0">
				<image class="no-res" src="/static/ai/nores.png"></image>
				<view class="no-words">抱歉，未找到该垃圾</view>
				<view v-if="!isFadeback" @click="fadeback" class="no-words">点击此处反馈“{{keyword}}”让小红心收录</view>
				<view v-else class="no-words">感谢您的反馈</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="swiper-container" v-show="!keyword">
			<swiper class="swiper" previous-margin="18rpx" next-margin="18rpx" @change="swiperChange">
				<swiper-item 
					v-for="item in classify"
					:key="item.type">
					<view :class="['swiper-card',item.bgClass]">
						<view class="type">{{item.typeName}}</view>
						<view class="name">{{item.englishWords}}</view>
						<view class="des">{{item.des}}</view>
						<image class="icon" :src="item.imgicon"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 列表 -->
		<view class="list-container" v-show="!keyword">
			<view :class="['dot',classify[type].bgClass]"></view>
			<view class="li-line"
				v-for="(item,i) in classifyList"
				:key="i">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	import { typeList, searchKeywords, garbageFeedback } from '../../../api/index.js'
	
	export default{
		data(){
			return{
				classify: [{
				        type: 1,
				        typeName: "可回收垃圾",
				        englishWords: "RECYCLABLE",
				        imgicon: "/static/ai/recycle-w.png",
				        img: "/static/index/recycle.png",
				        des: "可回收物可在小红心智能分类回收机进行回收。",
				        bgClass: "blue"
				      },
				      {
				        type: 2,
				        typeName: "有害垃圾",
				        englishWords: "HAZARDOUS WASTE",
				        imgicon: "/static/ai/harm-w.png",
				        img: "/static/index/harm.png",
				        des: "有害垃圾可在小红心智能分类回收机进行回收。",
				        bgClass: "red"
				      },
				      {
				        type: 3,
				        typeName: "厨余垃圾",
				        englishWords: "PERISHABLE WASTE",
				        imgicon: "/static/ai/kw-w.png",
				        img: "/static/index/kw.png",
				        des: "厨余垃圾可在小红心智能垃圾箱上进行回收，不仅垃圾袋免费，而且还送积分哦~",
				        bgClass: "green"
				      },
				      {
				        type: 4,
				        typeName: "其他垃圾",
				        englishWords: "OTHER WASTE",
				        imgicon: "/static/ai/other-w.png",
				        img: "/static/index/other.png",
				        des: "其他垃圾可在小红心智能垃圾箱上进行回收，不仅垃圾袋免费，而且还送积分哦~",
				        bgClass: "grey"
				      }],
					classifyList:[],
					page:1,
					pageSize:20,
					type:1,
					hasNextPage:true,
					onFetch:false,
					keyword:undefined,
					keywordsList:[],
					isFadeback:false
				}
			},
			onLoad() {
				this.getClassifyList()
			},
			methods:{
				swiperChange(e){
					console.log(e)
					this.type = this.classify[e.detail.current].type
					this.page = 1
					this.classifyList = []
					this.getClassifyList()
				},
				getClassifyList(){
					if(this.onFetch) return
					
					this.onFetch = true
					
					let data ={
						page: this.page,
						pageSize: this.pageSize,
						type: this.type
					}
					typeList(data).then(res=>{
						this.onFetch = false
						this.classifyList = this.classifyList.concat(res.data.list)
						this.hasNextPage = res.data.hasNextPage
						if(this.hasNextPage) ++this.page
					})
				},
				inputkwd(e){
					console.log(e);
					let k = e.detail.value
					this.keyword = k
					searchKeywords(k).then(res=>{
						if(res.code==1){
							this.keywordsList = res.data
							this.isFadeback = false
						}
					})
				},
				clear(){
					this.keyword = undefined
				},
				cfmkwd(){
					// 弹出所有关联项
				},
				chooseItem(item){
					// 弹出当前关联项
				},
				fadeback(){
					let userInfo = uni.getStorageSync('userInfo')
					let data = {
						content:this.keyword,
						name:userInfo.nickname,
						phone:userInfo.phone
					}
					garbageFeedback(data).then(res=>{
						if(res.code==1){
							this.isFadeback = true
						}
					})
				}
			}
	}
</script>

<style scoped>
	.search {
	  position: fixed;
	  width: 100%;
	  height: 64rpx;
	  background-color: #fff;
	  padding: 0 30rpx;
	}
	
	.search-box {
	  width: 602rpx;
	  height: 64rpx;
	  background: rgba(245, 246, 250, 1);
	  border-radius: 33rpx;
	  color: #2F2F2F;
	  line-height: 36rpx;
	  font-size: 26rpx;
	  padding-left: 26rpx;
	  box-sizing: border-box;
	}
	.plc{
	  color: rgba(202, 203, 203, 1);
	}
	
	.search-icon {
	  margin-right: 10rpx;
	  height: 28rpx;
	}
	
	.weui-input {
	  flex: 1;
	}
	
	.cancel {
	  font-size: 26rpx;
	  color: rgba(47, 47, 47, 1);
	  line-height: 36rpx;
	  padding-left: 20rpx;
	}
	.keywords-container{
		padding-top: 86rpx;
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
	  font-family: PingFangSC-Regular, PingFang SC;
	  font-weight: 400;
	  color: rgba(144, 144, 144, 1);
	  line-height: 40rpx;
	  text-align: center;
	  margin-bottom: 18rpx;
	}
	
	.swiper-container{
		width: 100%;
		height: 340rpx;
		border-radius: 12rpx;
		padding-top: 44rpx;
		padding-bottom: 44rpx;
		position: fixed;
		top: 64rpx;
		/* #ifdef H5 */
		top: 148rpx;
		/* #endif */
		left: 0;
		background-color: #fff;
	}
	.swiper{
		height: 100%;
	}
	.swiper-card{
		height: 340rpx;
		border-radius: 12rpx;
		margin: 0 10rpx;
		box-sizing: border-box;
		padding-top: 34rpx;
		padding-left: 30rpx;
		position: relative;
		color: #fff;

	}
	.swiper-card .type {
	  font-size: 44rpx;
	  font-weight: 600;
	  line-height: 60rpx;
	  margin-bottom: 6rpx;
	}

	.swiper-card .name {
	  font-size: 26rpx;
	  line-height: 36rpx;
	  margin-bottom: 78rpx;
	}

	.swiper-card .des {
	  width: 508rpx;
	  height: 80rpx;
	  font-size: 26rpx;
	  line-height: 40rpx;
	  letter-spacing: 1rpx;
	}

	.swiper-card .icon {
	  width: 102rpx;
	  height: 102rpx;
	  position: absolute;
	  right: 40rpx;
	  top: 34rpx;
	}
	.list-container{
		padding-top: 492rpx; //64 + 44 + 340 + 44
	}	
	.dot{
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		margin: 22rpx auto 6rpx;
	}
	.li-line{
		height: 80rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(47, 47, 47, 1);
		line-height: 80rpx;
		text-align: center;
	}
	
</style>
