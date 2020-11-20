  <template>
	<view class="page page-grey">
		<view class="state-tab flex">
			<view v-for="(item,index) in orderState" :key="index" 
			:class="{'state':true,'is-active':state==item.state}"
			@click="changeState(item)">
				{{item.label}}
			</view>
		</view>
		<!-- 列表 -->
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="order-no flex-ct-bwt">
					<view>订单编号：{{item.sno}}</view>
					<view class="order-s">
						{{goodState[item.state]}}
					</view>
				</view>
				<view class="order-des">
					<image :src="IMG_URL + JSON.parse(item.img || '[]')[0].value" mode=""></image>
					<view class="order-content">
						<view class="flex-ct-bwt pdt2">
							<view class="goods-name">
								{{item.productName}}
							</view>
							<view class="goods-nums">
								x{{item.num}}
							</view>
						</view>
						<view class="flex-ct-bwt pdb6">
							<view class="time">
								{{item.createTime}}
							</view>
							<view class="score">
								<text class="unit">共</text>{{item.scoreTotal}}<text class="unit">积分</text>
							</view>
						</view>
					</view>
				</view>
				<view class="order-state flex-ct-bwt">
					<view class="express">
						<text v-if="item.type == 1">{{item.company}}</text>
						<text v-if="item.type == 1">{{item.dno}}</text>
						<text v-if="item.type == 0">线下配送</text>
					</view>
					<view :class="{'btn':true,'btn-finish':item.state==2}"
					@click="updateState(item)"
					>{{expressState[item.state]}}</view>
				</view>
			</view>
		</view>
		
		<!-- 确认收货 -->
		<view class="pop" v-if="showcfm">
			<view class="pop-content">
				<view class="pop-title">
					收货确认
				</view>
				<view class="pop-tips">
					确定您已收到商品？
				</view>
				<view class="pop-btn flex-ct-bwt">
					<button class="cancel" @click="showcfm=false">不，还没呢</button>
					<button class="cfm" @click="cfmOrder">确认</button>
				</view>
			</view>
		</view>
		
		<!-- 没有数据 -->
		<view v-if="list.length==0" class="no-data">
			<image src="../../../static/images/no-income.png" mode=""></image>
			<view class="tips">您占时没有订单哦</view>
		</view>
		<!-- 下拉加载 -->
		<End v-else :isLoading="isLoading"></End>
	</view>
</template>

<script>
	import { getOrderList, updateOrder } from '../../../api/index.js'
	import { IMG_URL, goLoginPageTimeOut } from '../../../common/index.js'
	import End from '../../../components/End.vue'
	
	export default{
		components: {
			End
		},
		data(){
			return{
				IMG_URL:IMG_URL,
				orderState:[
					{state:3,label:"全部"},
					{state:0,label:"待发货"},
					{state:1,label:"待收货"},
					{state:2,label:"已完成"},
				],
				goodState:['待发货','已发货','已完成'],
				expressState:['提醒发货','确认收货','交易完成'],
				page:1,
				state:3,
				list:[],
				isLoading:false,
				showcfm:false,
				id:undefined,
				ending:true
			}
		},
		onLoad(option) {
			
		},
		onShow() {
			this.getOrders()
		},
		onReachBottom(){
			this.getOrders()
		},
		methods:{
			getOrders(){
				if(this.isBottom){
					this.isLoading = true
					setTimeout(()=>{
						this.isLoading = false
					},2000)
					return
				} 
				uni.showLoading({
					title: '加载中'
				})
				if(this.page==1) this.list = []
				let data = {
					page:this.page++,
					pageSize:10,
					state:this.state
				}
				getOrderList(data).then(res=>{
					this.isBottom = res.data.isLastPage
					this.list = this.list.concat(res.data.list)
					this.ending = this.list.length > 0
					uni.hideLoading()
				})
			},
			changeState(item){
				// 重置
				this.page=1
				this.state = item.state
				this.isBottom = false
				this.getOrders()
			},
			updateState(item){
				// 提醒发货
				if(item.state===0){
					uni.showToast({
					    title: '提醒发货成功',
					});
					return
				}
				// 确认完成
				if(item.state===1){
					this.showcfm = true
					this.id = item.id
				}
			},
			cfmOrder(){
				updateOrder({id:this.id,state:2}).then(res=>{
					this.showcfm = false
					this.changeState({state:this.state})
				})
			}
			
		}
	}
</script>

<style>
	.state-tab{
		padding: 28rpx;
		background-color: #fff;
	}
	.state{
		flex: 1;
		text-align: center;
		font-size:30rpx;
		font-weight:400;
		color:#6D7278;
		line-height:42px;
		position: relative;
		transform: all .5s;
	}
	.state.is-active{
		font-weight: 600;
		color: #1E1E1E;
	}
	.state.is-active::after{
		position: absolute;
		bottom: -4rpx;
		left: 50%;
		transform: translateX(-50%);
		content: "";
		width:40rpx;
		height:8rpx;
		background:rgba(255,95,98,1);
		border-radius:5rpx;
	}
	.list{
		padding: 20rpx;
	}
	.item{
		background-color: #FFFFFF;
		padding: 28rpx 24rpx 20rpx;
	}
	.order-no{
		font-size:26rpx;
		color:rgba(30,30,30,1);
		line-height:36rpx;
		margin-bottom: 30rpx;
	}
	.order-no .order-s{
		font-weight:500;
	}
	.order-des{
		height: 136rpx;
	}
	.order-content{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.order-des image{
		float: left;
		width:136rpx;
		height:136rpx;
		margin-right: 20rpx;
	}
	.order-des .pdt2{
		padding-top: 2rpx;
	}
	.order-des .pdb6{
		padding-bottom: 6rpx;
	}
	.goods-name{
		font-size:24rpx;
		color:rgba(30,30,30,1);
		line-height:34rpx;
		flex: 1;
		text-align: left;
	}
	.goods-nums{
		width: 86rpx;
		text-align: right;
		font-size:22rpx;
		color:rgba(136,136,136,1);
		line-height:32rpx;
	}
	.time{
		font-size:24rpx;
		color:rgba(136,136,136,1);
		line-height:34rpx;
	}
	.score{
		color: #FF5F62;
		font-size: 30rpx;
		line-height: 34rpx;
	}
	
	.unit{
		font-size:18rpx;
		font-weight:600;
		line-height:26rpx;
		margin:0 2rpx;
	}
	
	.order-state {
		margin-top: 48rpx;
	}
	.express{
		font-size:24rpx;
		color:rgba(144,144,144,1);
		line-height:34rpx;
	}
	.btn{
		width:138rpx;
		height:54rpx;
		background:rgba(255,95,98,1);
		border-radius:28rpx;
		text-align: center;
		line-height: 54rpx;
		color: #FFFFFF;
		font-size: 24rpx;
	}
	.btn-finish{
		border:1px solid rgba(144,144,144,1);
		background:#FFFFFF;
		color: #909090;
	}
	.pop{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,.4);
	}
	.pop-content{
		width:654rpx;
		background:rgba(255,255,255,1);
		border-radius:10px;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 346rpx;
		text-align: center;
	}
	.pop-title{
		padding-top: 40rpx;
		font-size:34rpx;
		line-height:48rpx;
	}
	.pop-tips{
		padding-top: 64rpx;
		font-size: 32rpx;
		color:rgba(101,101,101,1);
		line-height:46rpx;
	}
	.pop-btn{
		padding: 80rpx 70rpx 40rpx;
		font-size: 32rpx;
	}
	.pop-btn button{
		width:226rpx;
		height:80rpx;
		border-radius:4rpx;
		line-height: 80rpx;
		box-sizing: border-box;
		margin: 0;
	}
	.cancel{
		background-color: #fff;
		border:2rpx solid rgba(255,95,98,1);
		color: #FF5F62;
	}
	.cfm{
		background:rgba(255,95,98,1);
		color: #FFFFFF;
	}
	.no-data image{
		display: block;
		width: 532rpx;
		height: 506rpx;
		margin: 112rpx auto 34rpx;
	}
	.no-data .tips{
		text-align: center;
		color: rgba(144, 144, 144, .8);
		font-size: 28rpx;
	}
</style>
