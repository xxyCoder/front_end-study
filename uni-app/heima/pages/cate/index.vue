<template>
	<view>
		<view class="scroll-view-container">
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh+'rpx'}">
				<view class="left-scroll-view-item active"></view>
			</scroll-view>
			<scroll-view scroll-y="true" :style="{height: wh+'rpx'}">
				<view></view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync();
			this.wh = sysInfo.windowHeight;
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;
	}

	.left-scroll-view {
		width: 120rpx;
	}
	.left-scroll-view-item {
		background-color: #f7f7f7;
		line-height: 60px;
		text-align: center;
		font-size: 12px;
		&.active {
			background-color: #fff;
			position: relative;
			&:before{
				content: "";
				display: flex;
				width: 3px;
				height: 30px;
				background-color: #c00000;
				position: absolute;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
			}
		}
	}
</style>