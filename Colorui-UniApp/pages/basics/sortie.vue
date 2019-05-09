<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">突击</block></cu-custom>
		<view v-show="!isFail">
			<view class="cu-card">
				<view class="cu-item bg-img shadow-blur" :style="[{backgroundImage:'url('+img+')'}]" @tap="showModal" data-target="DialogModal1" >
					<view class="cardTitle">
						<view class="text-left">{{res?res.boss:'加载中...'}}</view>
						<view class="text-right">{{res?res.faction:'加载中...'}}</view>
					</view>
					
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">Modal标题</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						Modal 内容。
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
							<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>

						</view>
					</view>
				</view>
			</view>
			<view class="cu-card case">
				<view class="cu-item cu-timeline bg-white shadow-lg">
					<view class="cu-time text-red cuIcon-hot">
						节点
					</view>
					<view class="cu-item" :class="['cuIcon-sortie-'+(index+1),'text-'+color[index]]" v-for="(item,index) in res?res.variants:[]" :key="index">
						<view class="content shadow-blur text-df" :class="'bg-'+color[index]">
							<text>【{{item.missionType}}】 </text> {{item.node}}
							<br/>
							{{item.modifier}}
						</view>
					</view>
				</view>
			</view>
			<view class="cu-card case">
				<view class="cu-item shadow-lg">
					<view class="cu-bar bg-white solid-bottom margin-top">
						<view class="action">
							<text class="cuIcon-title text-blue"></text>{{res?res.eta:'加载中...'}}
						</view>
					</view>
					<view class="padding bg-white">
						<view class="cu-progress round margin-top-sm striped active" >
							<view class="bg-green" :style="'width:'+_process+';'">{{_process}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '@/common/utils.js';
	
	export default {
		data() {
			return {
				modalName: null,
				isInit:false,
				isFail:false,
				res:null,
				color:['green','blue','red'],
				img: 'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg',
				url: '',
				process:100
			}
		},
		computed:{
			_process(){
				return this.process+'%';
			}
		},
		methods: {
			initData(){
				uni.showLoading({
					title:'正在填装...'
				})
				uni.request({
					url:this.server+'sortie',
					success: (res) => {
						this.res = res.data;
						this.process = utils.getProcess(this.res.activation,this.res.expiry);
						console.log(this.process);
					},
					fail:(res) => {
						this.isFail = true;
					},
					complete: () => {
						uni.hideLoading()
						this.isInit = true;
						uni.stopPullDownRefresh()
					}
				})
			},
			toChild(e) {
				
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
		},
		onLoad() {
			this.initData()
		},
		onPullDownRefresh(){
			this.initData();
		}
	}
</script>

<style>

.cuIcon-sortie-1:before {
	content: "①";
}
.cuIcon-sortie-2:before {
	content: "②";
}
.cuIcon-sortie-3:before {
	content: "③";
}
.cu-item[class*="cuIcon-"]::before{
	background-color: #f0f0f0;
}

.cardTitle {
		color: #fff;
		padding: 90upx 60upx;
		font-size: 40upx;
		font-weight: 300;
		transform: skew(-10deg, 0deg);
		position: relative;
		text-shadow: 0px 0px 6upx rgba(0, 0, 0, 0.3)
	}

	.cardTitle::before {
		content: "";
		position: absolute;
		width: 60upx;
		height: 6upx;
		border-radius: 20upx;
		background-color: #fff;
		display: block;
		top: 60upx;
		left: 50upx;
		transform: skew(10deg, 0deg);
	}

	.cardTitle::after {
		content: "";
		position: absolute;
		width: 140upx;
		border-radius: 6upx;
		height: 24upx;
		background-color: #fff;
		display: block;
		bottom: 76upx;
		left: 90upx;
		transform: skew(10deg, 0deg);
		opacity: 0.1;
	}
	.cardTitle text{
		position: relative;
		left: 75%;
	}
</style>
