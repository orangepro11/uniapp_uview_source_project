<template>
	<view></view>
</template>

<script>
	// 适用于滚动到固定位置的场景
	// 需要在页面的最顶部定义一个 .page-top 的空元素
	export default {
		data() {
			return {
				pageTop: 0,
			}
		},
		methods: {
			waitPageNextRender() {
				return new Promise((resolve) => {
					this.$nextTick(function() {
						resolve();
					})
				})
			},

			queryElementTop(name) {
				return new Promise(async (resolve, reject) => {
					const info = await this.$u.getRect(name);
					resolve(info.top);
				});
			},

			scrollToElement(name,offset=0) {
				return new Promise(async (resolve, reject) => {
					await this.waitPageNextRender();
					this.pageTop = await this.queryElementTop('.page-top');
					let height = await this.queryElementTop(name) - this.pageTop;
					uni.pageScrollTo({
						scrollTop: height-offset,
						duration: 200,
						success: () => {
							resolve();
						},
						fail: (e) => {
							reject(e);
						}
					});
				})
			},

			async getContainerWidth(name) {
				const info = await this.$u.getRect(name);
				return info.width;
			},
			// px -> rpx
			px2rpx(source) {
				const res = source / ( uni.upx2px(100) / 100 );
				return res;
			},
			// rpx -> px
			rpx2px(source) {
				return uni.upx2px(source);
			},
			
			// 获取设备屏幕宽度
			getScreenWidth() {
				return new Promise((resolve,reject) => {
					uni.getSystemInfo({
						success: (res) => {
							resolve(res.windowWidth);
						},
						fail: (e) => {
							reject(e);
						}
					})
				})
			}
		}

		
	}
</script>

<style>
</style>
