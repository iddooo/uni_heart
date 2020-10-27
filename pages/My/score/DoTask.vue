<template>
	<view class="task">
		<view class="title">
			{{title}}
		</view>
		<view class='line'
			v-for="(t,i) in task"
			:key="i">
			<view :class="['name',t.todo ? 'todo' : '']">
				{{t.name}}
			</view>
			<view class="des">
				{{t.des}}
			</view>
			<view v-if="t.todo">
				<!-- 分享 -->
				<view v-if="t.share">
					<!-- #ifdef MP-WEIXIN -->
						<button v-if="t.todo " class="buttons" open-type="share">去完成</button>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
						<view class="buttons" @click="handlerTodo(t)">
							去完成
						</view>
					<!-- #endif -->
				</view>
				<!-- 链接 -->
				<view v-else class="buttons" @click="handlerTodo(t)">
					去完成
				</view>
			</view>
			<view v-else class="done">
				已完成
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			task:{
				type:Array,
				default:()=>{
					return []
				},
				required:false
			},
			title:String
		},
		methods:{
			handlerTodo(item){
				this.$emit('onTodo',item)
			}
		}
	}
</script>

<style scoped>
	.title{
		height: 90rpx;
		line-height: 90rpx;
		border-bottom: 2rpx solid #F6F6F6;
		padding-left: 26rpx;
		position: relative;
		font-size: 28rpx;
		color: #1E1E1E;
	}
	.title::after{
		content: "";
		position: absolute;
		left: 0;
		top: 50%;
		width: 6rpx;
		height: 24rpx;
		background: #FF5F62;
		margin-top: -12rpx;
	}
	.line{
		height: 102rpx;
		border-bottom: 2rpx solod #F6F6F6;
		margin-left: 50rpx;
		position: relative;
		font-size: 22rpx;
	}
	.line .name{
		padding-top: 12rpx;
		padding-bottom: 8rpx;
		font-size: 24rpx;
		color: #666666;
		line-height: 34rpx;
		position: relative;
		
	}
	.line .name.todo::after{
		content: "";
		position: absolute;
		width: 12rpx;
		height: 12rpx;
		background: #FF5F62;
		border-radius: 50%;
		left: -26rpx;
		top: 24rpx;
	}
	.line .name::after{
		content: "";
		position: absolute;
		width: 12rpx;
		height: 12rpx;
		background: #CDCDCD;
		border-radius: 50%;
		left: -26rpx;
		top: 24rpx;
	}
	.line .des{
		color: #999999;
	}
	.buttons{
		position: absolute;
		right: 22rpx;
		top: 28rpx;
		width: 104rpx;
		height: 46rpx;
		background: #FF5F62;
		border-radius: 23rpx;
		color: #fff;
		line-height: 45rpx;
		text-align: center;
		font-size: 22rpx;
		padding: 0;
		margin: 0;
	}
	.line .done{
		position: absolute;
		right: 40rpx;
		top: 36rpx;
		color: #CDCDCD;
	}
</style>
