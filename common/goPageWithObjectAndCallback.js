/*
 * 页面间跳转传入值并在关闭页面时回调值的mixin
 * 使用方式：
 * 传入新页面参数：
	this.navigateWithCallback({
		url: 要跳转的url,
		withObject: 要携带的数据,
		callback: (被回调的数据) => {
			//回调内容
		}
	})
 * 新页面获取传入的参数：
	this.getValueWhichPageWith();
 * 新页面设置回调的参数：
	this.setValueWhichPageCallback(回调值);
 */
module.exports = {
	data() {
		return {
			onPageCallback: null //回调方法
		}
	},
	onShow() {
		if (this.onPageCallback) {
			this.$u.vuex("pageGoWithObject", null);
			this.onPageCallback(this.pageGoBackWithObject);
			this.$u.vuex("pageGoBackWithObject", null);
			this.onPageCallback = null;
		}
	},
	methods: {
		navigateWithCallback(obj) {
			this.onPageCallback = (callbackObject) => {
				obj.callback(callbackObject);
			};
			this.$u.vuex("pageGoWithObject", obj.withObject);
			uni.navigateTo({
				url: obj.url
			});
		},
		getValueWhichPageWith() {
			return this.$vuex("pageGoWithObject");
		},
		setValueWhichPageCallback(val) {
			this.$u.vuex("pageGoBackWithObject", val);
		}
	}
}
