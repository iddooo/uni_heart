<template>
	<view class="page page-grey">
		<d-form ref="form" :model="form">
			<d-form-item label="收货人" prop="name">
				<input @input="nameInput" maxlength="16" placeholder-class="plc" type="text" :value="form.name" placeholder="请输入收货人姓名" />
			</d-form-item>
			<d-form-item label="手机号码">
				<input @input="phoneInput" placeholder-class="plc" type="text" :value="form.phone" placeholder="请输入联系电话" />
			</d-form-item>
			<d-form-item label="所在城市">
				<view class="flex-ct-bwt" @click="openAddres">
					<view v-if="region" class="txt">
						{{region[0]}} {{region[1]}} {{region[2]}}
					</view>
					<view v-else class="plc">请选择</view>
					<view class="arrow"></view>
				</view>
			</d-form-item>
			<d-form-item label="收货地址">
				<input @input="addressInput" placeholder-class="plc" type="text" :value="form.address" placeholder="填写详细地址" />
			</d-form-item>
		</d-form>
		
		<view class="mtp">
			<HButton @click="submit">提交</HButton>
		</view>
		
		<simple-address ref="refAddress" :pickerValueDefault="regionPickerValueDefault" @onConfirm="onConfirm"></simple-address>
	</view>
</template>

<script>
	import refAddress from '../../../components/simple-address/simple-address.vue'
	import HButton from '../../../components/HButton.vue'
	import { updateAddress } from '../../../api/index.js'
	
	export default{
		components: {
			refAddress,
			HButton
		},
		data(){
			return{
				form:{
					name:undefined,
					phone:undefined,
					region:undefined,
					address:undefined,
				},
				region:undefined,
				regionPickerValueDefault:[0,0,0]
			}
		},
		onLoad(option) {
			this.imgs = option.img
			console.log(option)
		},
		onShow() {
			let address = uni.getStorageSync('address')
			if(address){
				this.form = address
				this.region = [address.province, address.city, address.country]
			}
		},
		methods:{
			nameInput(e){
				this.form.name = e.detail.value
			},
			phoneInput(e){
				this.form.phone = e.detail.value
			},
			addressInput(e){
				this.form.address = e.detail.value
			},
			numberPlateInput(e){
				this.form.numberPlate = e.detail.value
			},
			openAddres() {
				if(this.region){
					var index = this.$refs.refAddress.queryIndex(this.region, 'label');
					// console.log(index);
					this.regionPickerValueDefault = index.index;
				}else{
					this.regionPickerValueDefault = [0,0,0]
				}
				
				this.$refs.refAddress.open();
			},
			onConfirm(e){
				// console.log('confirm',e)
				this.region = e.labelArr
				this.form.region = this.region.join(' ')
				this.regionPickerValueDefault = e.value
				// this.region = JSON.stringify(e);
			},
			submit(){
				for (let key in this.form) {
				  if (!this.form[key] || this.form[key] == '' ) {
					wx.showToast({
					  title: '请将信息填写完整',
					  icon: 'none'
					})
					return
				  }
				}
				
				if (!(/^1[3456789]\d{9}$/.test(this.form.phone))) {
				  uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none'
				  })
				  return
				}
				let data = {
				      userId: uni.getStorageSync('userId'),
				      name: this.form.name,
				      phone: this.form.phone,
				      province: this.region[0],
				      city: this.region[1],
				      country: this.region[2],
				      address: this.form.address
				    }
				
				updateAddress(data).then(res=>{
					if(res.code==1){
						uni.redirectTo({
							url:"/pages/Mall/createOrder/index"
						})
					}else{
						uni.showToast({
							title:"绑定失败"
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.mtp{
		margin-top: 200rpx;
	}
	/* input框样式 */
	.txt{
		font-size:28rpx;
		color:#333333;
		line-height:40rpx;
	}
	input{
		flex: 1;
		height: 40rpx;
		font-size:28rpx;
		color:#333333;
		line-height:40rpx;
	}
	
	/* end---- */
	.txt{
		font-size:28rpx;
		color:#333333;
		line-height:40rpx;
	}
	
</style>
