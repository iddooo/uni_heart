<template>
	<view class="page">
		<view class="h-title">
			请选择反馈类型
		</view>
		<view class="opinions flex-ct">
			<view :class="['o',{'active':type==o.type}]"
				v-for="o in opinions"
				:key="o.type"
				@click="type=o.type">
				{{o.content}}
				<image class="checked" v-show="type==o.type" src="/pages/App/images/yes.png" mode=""></image>
			</view>
		</view>
		<view class="h-title">
			反馈内容
		</view>
		<textarea
			class="ipt-box" 
			placeholder-class="plc" 
			@input="onInput" 
			type="text" 
			:value="content" 
			maxlength="100"
			placeholder="请输入您的问题或建议，上传截图更快解决哦！" />
		
		<view class="imgs flex-ct">
			<view class="img"
				v-for="(v,i) in img"
				:key="i">
				<view class="img-box">
					<image class="img" :src="v" mode=""></image>
				</view>
				<view class="del">
					<image src="/pages/App/images/del.png" mode=""></image>
				</view>
			</view>
			<image class="choose" @click="chooseImg" v-if="img.length==0" src="/pages/App/images/choose.png" mode=""></image>
			<image class="chooses" @click="chooseImg" v-else-if="img.length < total" src="/pages/App/images/chooses.png" mode=""></image>
		</view>
		
		<HButton @click="submit">提交</HButton>
	</view>
</template>

<script>
	import { URL } from '../../../common/index.js'
	import HButton from '../../../components/HButton.vue'
	import { uploadOss } from '../../../api/config.js'
	
	export default{
		components:{
			HButton
		},
		data(){
			return{
				URL,
				opinions:[
					{type:1,content:"投递问题"},
					{type:2,content:"提现问题"},
					{type:3,content:"产品建议"},
					{type:4,content:"功能异常"},
					{type:5,content:"其他反馈"},
				],
				type:1,
				img:[],
				content:undefined,
				total:3
			}
		},
		methods:{
			onInput(e){
				this.content = e.detail.value
			},
			submit(){
				if(!this.content){
					uni.showToast({
					  title: '请填写违规描述',
					  icon: "none"
					})
					return false
				}
				if(this.img.length==0){
					uni.showToast({
					  title: '请上传照片信息',
					  icon: "none"
					})
					return false
				}
				let arr = []
				this.img.forEach(v => {
				  arr.push(uploadOss(v))
				})
				Promise.all(arr).then(res=>{
					var img = res.reduce((a,b)=>{
						a.push({
							value:b
						})
						return a
					},[])
					let userInfo = uni.getStorageSync('userInfo')
					let data = {
						type:this.type,
						img:img,
						content:this.content,
						nickname: userInfo.nickname,
						phone: userInfo.phone,
						sno: userInfo.sno
					}
					
					// 提交
					console.log(data);
				})
			},
			chooseImg(){
				uni.chooseImage({
				    count: this.total-this.img.length, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album', 'camera'], //从相册选择
				    success: (res) => {
				        // console.log(res.tempFilePaths);
						this.img.push(...res.tempFilePaths)
				    }
				});
			}
		}
	}
</script>

<style scoped>
	.h-title{
		padding: 50rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #1E1E1E;
		line-height: 42rpx;
	}
	.opinions{
		padding:0 30rpx 20rpx;
		margin: 0 20rpx;
		border-bottom: 2rpx solid rgba(28, 28, 28, 0.05);
		flex-wrap: wrap;
	}
	.o{
		width: 170rpx;
		height: 56rpx;
		border-radius: 8rpx;
		border: 1rpx solid #D6D6D6;
		color: #D6D6D6;
		font-size: 28rpx;
		text-align: center;
		line-height: 56rpx;
		position: relative;
		margin-right: 30rpx;
		margin-bottom: 30rpx;
	}
	.o.active{
		color: #FF5F62;
		border: 1px solid #FF5F62;
	}
	.checked{
		position: absolute;
		right: -8rpx;
		top: -8rpx;
		width: 28rpx;
		height: 28rpx;
	}
	.ipt-box{
		width: 642rpx;
		height: 260rpx;
		border-radius: 4rpx;
		border: 2rpx solid #F2F2F2;
		margin: 0 auto;
		line-height: 40rpx;
		padding: 20rpx 24rpx;
		box-sizing: border-box;
		
	}
	.imgs{
		padding: 50rpx 54rpx 100rpx;
	}
	.img{
		width: 120rpx;
		height: 120rpx;
		background: #D8D8D8;
		margin-right: 54rpx;
		position: relative;
	}
	.img-box{
		width: 120rpx;
		height: 120rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}
	.img-box image{
		width: 100%;
		height: 100%;
	}
	.del{
		padding: 10rpx;
		position: absolute;
		right: 20rpx;
		top: 22rpx;
	}
	.del image{
		width: 32rpx;
		height: 32rpx;
		display: block;
	}
	.choose{
		width: 342rpx;
		height: 120rpx;
	}
	.chooses{
		width: 120rpx;
		height: 120rpx;
	}
</style>
