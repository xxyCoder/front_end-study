<template>
	<view>
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh+'px'}">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['left-scroll-view-item',i === active ? 'active' : '']" @click="activeChange(i)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<scroll-view scroll-y="true" :style="{height: wh+'rpx'}">
				<view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
					<view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0,
				cateList: [],
				active: 0,
				cateLevel2: []
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync();
			this.wh = sysInfo.windowHeight - 50;
			this.getCateList();
		},
		methods: {
			async getCateList() {
				const {
					data
				} = await uni.$http.get("/api/public/v1/categories");
				if (data.meta.status !== 200) {
					return uni.$showMessage();
				}
				this.cateList = data.message;
				// 为二级分类赋值
				this.cateLevel2 = data.message[0].children;
				console.log(this.cateLevel2)
			},
			activeChange(idx) {
				this.active = idx;
				this.cateLevel2 = this.cateList[idx].children;
			},
			gotoSearch() {
				uni.navigateTo({
					url: "/subpks/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;
	}

	.left-scroll-view {
		width: 120px;
	}

	.left-scroll-view-item {
		background-color: #f7f7f7;
		line-height: 60px;
		text-align: center;
		font-size: 12px;

		&.active {
			background-color: #fff;
			position: relative;

			&:before {
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

	.cate-lv2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}

	.cate-lv3-list {
		display: flex;
		flex-wrap: flex;

		.cate-lv3-item {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 60px;
				height: 60px;
			}

			text {
				font-size: 12px;
			}
		}
	}
</style>