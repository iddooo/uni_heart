<template>
	<view class="page">
		{{cur}}
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cur:1
			}
		},
		onLoad(option) {
			console.log(option.id)
			this.cur = option.id
		}
	}
</script>

<style>
</style>
