<template>
	<view class="page">
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				imgs:[],
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
