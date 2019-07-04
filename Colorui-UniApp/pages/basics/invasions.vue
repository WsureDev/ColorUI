<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">入侵</block></cu-custom>
		<view class="flex solid-bottom padding justify-between">
			<view class="bg-grey padding-sm margin-xs radius">start</view>
			<view class="bg-grey padding-sm margin-xs radius">start</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCard: false
			};
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
		}
	}
</script>

<style>

</style>
