<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in swiperList" :key="item.good_id">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?good_id=' + item.good_id">
					<img :src="item.image_src" />
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
				<img class="nav-img" :src="item.image_src" />
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<image class="floor-title" :src="item.floor_title.image_src"></image>
				<view class="floor-img-box">
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2,j) in item.product_list" :url="item2.url" :key="j" v-if="j !== 0">
							<image :src="item2.image_src" :style="{width:item2.image_width + 'rpx'}" mode="widthFix"/>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList();
			this.getNavList();
			this.getFloorList();
		},
		methods: {
			async getSwiperList() {
				const {
					data
				} = await uni.$http.get("/api/public/v1/home/swiperdata");
				if (data.meta.status !== 200) {
					return uni.$showMessage();
				}
				this.swiperList = data.message;
			},
			async getNavList() {
				const {
					data
				} = await uni.$http.get("/api/public/v1/home/catitems");
				if (data.meta.status !== 200) {
					return uni.$showMessage();
				}

				this.navList = data.message;
			},
			navClickHandler(item) {
				if (item.name === "分类") {
					uni.switchTab({
						url: "/pages/cate/index"
					})
				}
			},
			async getFloorList() {
				const {
					data
				} = await uni.$http.get("/api/public/v1/home/floordata");
				if (data.meta.status !== 200) return uni.$showMessage();
				
				data.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpks/goods_list/goods_list?' + prod.navigator_url.split("?")[1]
					})
				})
				
				this.floorList = data.message;
				
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
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 120rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		width: 100%;
		height: 60rpx;
	}
	.right-img-box {
		display: flex;
		flex-wrap:wrap;
		justify-content: space-around;
	}
	.floor-img-box {
		display: flex;
		padding-left: 10rpx;
	}
</style>