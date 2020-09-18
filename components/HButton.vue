<template>
	<view 
		class="button"
		:style="{width:width +'px',height:height+'px',borderRadius:radius +'px'}"
		:class="{
			plain:plain,
			small:size=='small',
			medium:size=='medium',
			big:size=='big',
			bigger:size=='bigger',
			disabled:disabled
		}"
		@click="handlerClick"
		>
		<slot>提交</slot>
	</view>
</template>

<script>
	// bigger width: 682px;
	// big width: 606px;
	// medium width: 554px;
	// small width: 244px;
	export default{
		props:{
			width:{
				type:[Number,String],
				required:false
			},
			height:{
				type:[Number,String],
				required:false
			},
			radius:{
				type:[Number,String],
				required:false
			},
			size:{
				type:String,
				required:false
			},
			plain:{
				type:Boolean,
				required:false,
				default:false
			},
			disabled:{
				type:Boolean,
				required:false,
				default:false
			},
		},
		methods:{
			handlerClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style scoped lang="scss">
	.button{
			margin: 20rpx auto;
	        color: #fff;
	        font-size: 13px;
	        border-radius: 4rpx;
			text-align: center;
			background-color: #FF5F62;
			width: 682rpx;
			height: 80rpx;
			font-size: 32rpx;
			line-height: 80rpx;
			&.big{
			    width: 606rpx;
			    height: 88rpx;
				line-height: 88rpx;
				font-size: 34rpx;
			}
			&.medium{
			    width: 554rpx;
			}
	        &.small{
				width: 244rpx;
	        }
	        &.disabled{
	            opacity: .5;
	        }
	        &.plain{
	            background-color: #fff;
	            border: 1px solid #FF5F62;
				color: #FF5F62;
	        }
	    }
</style>
