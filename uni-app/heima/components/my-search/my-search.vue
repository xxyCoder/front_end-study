<template>
	<view class="my-search-container">
		<view class="my-search-box">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder" >搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.my-search-container {
	height: 50px;
	display: flex;
	align-items: center;
	padding: 10px 0;
	background-color: #c00000;
	.my-search-box {
		height: 36px;
		background-color: #fff;
		border-radius: 19px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>