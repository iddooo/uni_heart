<template>
	<view class="page">
		<view class="form">
			<view class="form-item flex-ct">
				<view class="form-label">
					收货人
				</view>
				<view class="form-input">
					<input type="text" v-model="name" placeholder=""/>
				</view>
			</view>
			<view class="form-item flex-ct">
				<view class="form-label">
					手机号码
				</view>
				<view class="form-input">
					<input type="text" v-model="phone" placeholder=""/>
				</view>
			</view>
			<view class="form-item flex-ct">
				<view class="form-label">
					选择地区
				</view>
				<view class="form-input">
					<input type="text" v-model="area" placeholder=""/>
				</view>
			</view>
			<view class="form-item flex-ct">
				<view class="form-label">
					收货地址
				</view>
				<view class="form-input">
					<input type="text" v-model="address" placeholder=""/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:undefined,
				phone:undefined,
				area:undefined,
				address:undefined
			}
		},
		onLoad(option) {
			this.imgs = option.img
			console.log(option)
		}
	}
</script>

<style>
</style>
