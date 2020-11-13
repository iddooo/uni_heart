<template>
	<view class="page page-grey">
		<d-form ref="form" :model="form">
			<d-form-item label="住户姓名">
				<input @input="nameInput" placeholder-class="plc" type="text" :value="form.name" placeholder="请输入住户姓名" />
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
			<d-form-item label="小区名称">
				<input @input="complexInput" placeholder-class="plc" type="text" :value="form.complex" placeholder="请输入小区名称" />
			</d-form-item>
			<d-form-item label="楼栋门牌">
				<input @input="numberPlateInput" placeholder-class="plc" type="text" :value="form.numberPlate" placeholder="请输入楼栋门牌（例：9-2-002）" />
			</d-form-item>
		</d-form>
		
		<view class="btm">
			<HButton @click="submit">确定</HButton>
		</view>
		
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm"></simple-address>
	</view>
</template>

<script>
	import SimpleAddress from '../../../components/simple-address/simple-address.vue'
	import HButton from '../../../components/HButton.vue'
	import { updateUserInfo} from '../../../api/index.js'
	
	export default {
		components: {
			SimpleAddress,
			HButton
		},
		data(){
			return{
				form:{
					name:undefined,
					city:undefined,
					complex:undefined,
					numberPlate:undefined
				},
				rules:{
					sno: [
					    { required: true, message: '请输入活动名称', trigger: 'blur' }
					]
				},
				region:undefined,
				cityPickerValueDefault:[0,0,0]
				
			}
		},
		methods:{
			snoInput(e){
				this.form.sno = e.detail.value
			},
			nameInput(e){
				this.form.name = e.detail.value
			},
			complexInput(e){
				this.form.complex = e.detail.value
			},
			numberPlateInput(e){
				this.form.numberPlate = e.detail.value
			},
			openAddres() {
				if(this.region){
					var index = this.$refs.simpleAddress.queryIndex(this.region, 'label');
					// console.log(index);
					this.cityPickerValueDefault = index.index;
				}else{
					this.cityPickerValueDefault = [0,0,0]
				}
				
				this.$refs.simpleAddress.open();
			},
			onConfirm(e){
				// console.log('confirm',e)
				this.region = e.labelArr
				this.form.city = this.region.join('')
				this.cityPickerValueDefault = e.value
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
				console.log('提交')
				let userId = wx.getStorageSync('userId')
				
				let houseNum = {
				  userId:userId,
				  name:this.form.name,
				  address:this.form.city + this.form.complex + this.form.numberPlate
				}
							
				let data = {
				  id:userId,
				  houseNum:JSON.stringify(houseNum)
				}
				updateUserInfo(data).then(res=>{
					if(res.code==1){
						uni.showToast({
							title:'提交成功',
							icon:'success'
						})
						setTimeout(()=>{
							wx.switchTab({
								url: '/pages/Tabbar/mine/index',
							  })
						},1000)
					}else{
						uni.showToast({
							title:rej.message,
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
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
	.arrow {
	  width: 14rpx;
	  height: 14rpx;
	  margin-left: 12rpx;
	  border-top: 2rpx solid rgba(218, 218, 218, 1);
	  border-right: 2rpx solid rgba(218, 218, 218, 1);
	  transform: rotate(45deg);
	}
	
	.tips{
		padding: 28rpx 30rpx;
	}
	.line{
		color: #909090;
		line-height: 40rpx;
		margin-bottom: 40rpx;
		font-size: 24rpx;
	}
</style>
