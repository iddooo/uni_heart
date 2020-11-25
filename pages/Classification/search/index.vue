<template>
	<view class="page">
		<!-- 搜索框 -->
		<SearchBox @reset="reset" @input="inputkwd" @confirm="cfmkwd" :value="keyword">
			<view @click="cancel" class="cancel">取消</view>
		</SearchBox>
		
		<!-- 搜索结果 -->
		<KeywordsList 
			:data="keywordsList"
			:keyword="keyword"
			:isFadeback="isFadeback"
			@click="chooseItem"
			@fadeback="fadeback">
		</KeywordsList>
		
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
				:key="i"
				@click="chooseItem(item)">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	import { typeList, searchKeywords, garbageFeedback } from '../../../api/index.js'
	import SearchBox from '../../../components/SearchBox.vue'
	import KeywordsList from '../../../components/KeywordsList.vue'
	
	export default {
		components: {
			SearchBox,
			KeywordsList
		},
		data(){
			return{
				classify: [{
				        type: 1,
				        typeName: "可回收垃圾",
				        englishWords: "RECYCLABLE",
				        imgicon: "/pages/Classification/recycle-w.png",
				        img: "/static/index/recycle.png",
				        des: "可回收物可在小红心智能分类回收机进行回收。",
				        bgClass: "blue"
				      },
				      {
				        type: 2,
				        typeName: "有害垃圾",
				        englishWords: "HAZARDOUS WASTE",
				        imgicon: "/pages/Classification/harm-w.png",
				        img: "/static/index/harm.png",
				        des: "有害垃圾可在小红心智能分类回收机进行回收。",
				        bgClass: "red"
				      },
				      {
				        type: 3,
				        typeName: "厨余垃圾",
				        englishWords: "PERISHABLE WASTE",
				        imgicon: "/pages/Classification/kw-w.png",
				        img: "/static/index/kw.png",
				        des: "厨余垃圾可在小红心智能垃圾箱上进行回收，不仅垃圾袋免费，而且还送积分哦~",
				        bgClass: "green"
				      },
				      {
				        type: 4,
				        typeName: "其他垃圾",
				        englishWords: "OTHER WASTE",
				        imgicon: "/pages/Classification/other-w.png",
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
				reset(){
					this.keyword = undefined
				},
				// 搜索
				inputkwd(e){
					let k = e.detail.value
					this.keyword = k
					searchKeywords(k).then(res=>{
						if(res.code==1){
							this.keywordsList = res.data
							this.isFadeback = false
						}
					})
				},
				cancel(){
					uni.switchTab({
						url:'/pages/Tabbar/voiceRecognition/index'
					})
				},
				cfmkwd(){
					// 弹出所有关联项
				},
				chooseItem(item){
					// 弹出当前关联项
					console.log(item);
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
	.cancel {
	  font-size: 26rpx;
	  color: rgba(47, 47, 47, 1);
	  line-height: 36rpx;
	  text-align: center;
	  padding: 0 14rpx 0 20rpx;
	}
	
	.swiper-container{
		width: 100%;
		height: 340rpx;
		border-radius: 12rpx;
		padding-top: 44rpx;
		padding-bottom: 44rpx;
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
		/* padding-top: 492rpx; //64 + 44 + 340 + 44 */
		height:60vh;
		overflow-y: scroll;
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
