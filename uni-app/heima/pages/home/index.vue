<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<view>
					<navigator class="swiper-item" :url="'/subpks/good_detail/good_detail?good_id=' + item.good_id">
					</navigator>
					<image :src="item.image_src" mode=""></image>
				</view>
			</swiper-item>

		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: []
			};
		},
		onLoad() {
			this.getSwiperList()
		},
		methods: {
			async getSwiperList() {
				const {
					data
				} = await uni.$http.get("/api/public/v1/home/swiperdata");
				if (data.meta.status !== 200) {
					return uni.showMessage();
				}
				this.swiperList = data.message;
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%
		}
	}
</style>