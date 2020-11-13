<template>
	<view class="form">
		<slot></slot>
	</view>
</template>

<script>
	import Vue from 'vue'
	let vm = new Vue()
	export default{
		name:"DForm",
		props:{
			model:{
				type:Object,
				required:true,
				default:()=>{
					return {}
				}
			},
			rules:{
				type:Object,
				required:false,
				default:()=>{
					return {}
				}
			}
		},
		provide(){
			return{
				form:this
			}
		},
		data(){
			return {
				fields: [],
			}
		},
		watch:{
			rules(){
				// this.fields.forEach(field => {
				//   field.removeValidateEvents();
				//   field.addValidateEvents();
				// });
			}
		},
		methods:{
			validate(callback){
				if (!this.model) {
					console.warn('[Warn][Form]model is required for validate to work!');
					return;
				}
				
				let p;
				if(typeof callback !== "function" && window.Promise){
					p = new Promise((res,rej)=>{
						callback = function(valid){
							valid ? res(valid) : rej(valid)
						}
					})
				}
				
				let valid = true
				
				if(this.rules.length==0 && callback){
					return callback(true)
				}
				
				let task = this.$children.filter(v=>{
					return v.prop
				})
				// console.log(this,task)
				
				if(p){
					return p
				}
				
				

			}
		},
		mounted() {
			// vm.$on('addField', (field) => {
			// 	if (field) {
			// 	  this.fields.push(field);
			// 	}
			// 	console.log('fileds',this.fields)
			//   });
			//   /* istanbul ignore next */
			//   vm.$on('removeField', (field) => {
			// 	if (field.prop) {
			// 	  this.fields.splice(this.fields.indexOf(field), 1);
			// 	}
			//   });
		}
	}
</script>

<style scoped>
	.form{
		background-color: #fff;
		padding: 0 28rpx;
	}
</style>
