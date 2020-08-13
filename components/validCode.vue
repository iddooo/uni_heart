<template>
	<view class="valid-code flex-ct-bwt">
		<input :value="value" type="number" focus="true" :maxlength="maxlength" class="hide-input" @input="getVal"/>
		<view v-bind:class="['item', { active: codeIndex == k , over: codeArr.length >=k }]"
			v-for="k in maxlength" :key="k">
			<view class="line"></view>
			<block v-if="isPwd && codeArr.length >= k">
				<text class="dot">.</text>
			</block>
			<block v-else>{{ codeArr[k-1] ? codeArr[k-1] : ''}}</block>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			maxlength:{
				type:Number,
				require:false,
				default:4,
			},
			isPwd:{
				type:Boolean,
				require:false,
				default:false,
			}
		},
		data(){
			return{
				codeIndex:1,
				codeArr:[],
				value:undefined,
			}
		},
		methods:{
			//取值
			getVal(e) {
				let { value } = e.detail;
				this.value=value;
				// console.log('验证码:', value);
				let arr = value.split('');
				this.codeIndex = arr.length + 1;
				this.codeArr = arr;
				if (this.codeIndex > Number(this.maxlength)) {
					//输入完成
					this.$emit('finish',true,this.value);
					// this.$emit('finish',this.codeArr.join(''));
				}else{
					this.$emit('finish',false,this.value);
				}
			},
			//清除验证码或者密码
			clear(){
				this.codeIndex=1;
				this.codeArr=[];
				this.val="";
			}
		}
	}
</script>

<style>
	.valid-code .item{
		/* width:136rpx; */
		flex: 1;
		height: 136rpx;
		text-align: center;
		border-bottom: 2rpx solid rgba(226,226,226,.9);
		box-sizing: border-box;
		color: #FF5F62;
		font-size:70rpx;
		font-family:DINAlternate-Bold,DINAlternate;
		font-weight:bold;
		line-height:136rpx;
		position: relative;
		margin-right: 26rpx;
	}
	.item:last-child {
		margin-right: 0;
	}
	.valid-code .over {
		border-bottom: 2rpx solid #FF5F62;
	}
	.active .line {
		display: block;
	}
	.line {
		display: none;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 2rpx;
		height: 82rpx;
		background: #ff4b4b;
		animation: twinkling 1s infinite ease;
	}
	.hide-input {
		position: absolute;
		top: 0;
		left: -100%;
		width: 200%;
		height: 100%;
		text-align: left;
		z-index: 9;
		opacity: 1;
	}
	@keyframes twinkling {
		0% {
			opacity: 0.2;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 0.2;
		}
	}
	
	.dot{
		font-size: 80upx;
		line-height: 40upx;
	}
</style>
