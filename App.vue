<script>
	import Vue from 'vue';
	export default {
		onLaunch: function() {
			// console.log('App Launch');
		},
		onShow: function() {
			// console.log('App Show');
			// 胶囊按钮信息
			uni.getSystemInfo({
				success: function(e) {
					Vue.prototype.screenWidth = e.screenWidth;
					// #ifndef MP
					if (e.platform == 'android') {
						Vue.prototype.customBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.customBar = e.statusBarHeight + 45;
					}
					// #endif
			
					// #ifdef MP-WEIXIN
					let custom = uni.getMenuButtonBoundingClientRect();
					Vue.prototype.customBar = e.statusBarHeight;
					Vue.prototype.customBarHeight = custom.height + custom.top-e.statusBarHeight;
					Vue.prototype.customBarRect = custom;
					// #endif
			
					// #ifdef MP-ALIPAY
					Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onHide: function() {
			// console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
</style>
