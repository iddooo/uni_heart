<template>
	<view>
		<view class="form-item">
			<view class="label">
				<slot name="title">{{label}}</slot>
			</view>
			<view class="content">
				<slot></slot>
			</view>
		</view>
		<slot name="error"></slot>
	</view>
</template>

<script>
	export default{
		name:"DFormItem",
		props:{
			label:{
				type:String,
				required:false,
				default:""
			}
		},
		inject:['form'],
		methods:{
			
		},
		mounted() {
			// if(this.$attrs.prop){
			// 	this.$emit('addField',this)
			// }
		}
	}
</script>

<style scoped>
	.form-item{
		border-bottom: 2rpx solid #F6F6F6;
		display: flex;
		align-items: center;
		padding: 24rpx 0;
	}
	.label{
		width: 172rpx;
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
	}
	.content{
		flex: 1;
	}
</style>
