import Vue from 'vue';
import App from './App';
import uView from 'uview-ui';
import httpInterceptor from '@/common/http.interceptor.js';
import httpApi from '@/common/http.api.js';
import store from '@/store';
const vuexStore = require('@/store/$u.mixin.js');

Object.values = (obj) => {
	var arr = [];
	for (var i in obj)
		arr.push(obj[i]);
	return arr;
}
Object.keys = (obj) => {
	var arr = [];
	for (var i in obj)
		arr.push(i);
	return arr;
}

Vue.config.productionTip = false
Vue.mixin(vuexStore);
App.mpType = 'app'

Vue.use(uView);

const app = new Vue({
	store,
	...App
})
Vue.use(httpInterceptor, app);
Vue.use(httpApi, app);
Vue.prototype.alert = (msg) => {
	return new Promise((recv, recj) => {
		uni.showModal({
			title: '提示',
			content: msg,
			success(res) {
				if (res.confirm) {
					return recv();
				} else if (res.cancel) {
					return recj();
				}
			}
		});
	});
}
Vue.prototype.$wx = {
	login() {
		return new Promise((recv, recj) => {
			uni.login({
				success: (res) => {
					this.$u.api.user.login({
						code: res.code
					}).then((e) => {
						this.$wx.setLoginData(e,recv,recj);
					});
				},
				fail: recj
			});
		});
	},
	register() {
		return new Promise((recv, recj) => {
			uni.getUserProfile({
				desc: '登录授权',
				success(userInfo) {
					uni.login({
						success(res) {
							return recv({
								code: res.code,
								userInfo: userInfo
							});
						},
						fail: recj
					});
				},
				fail: recj
			});
		}).then((e) => {
			return Vue.prototype.$u.api.user.register({
				data: JSON.stringify(e)
			});
		});
	},
	setLoginData(loginPromiseReturnVal,recv,recj) {
		var e = loginPromiseReturnVal;
		if (e.status) {
			uni.setStorageSync("userToken", e.data.token);
			Vue.prototype.$u.vuex("userInfo", e.data.user);
			recv(e.data.user);
		} else{
			this.removeLoginData();
			recj(e.msg)
		}
	},
	removeLoginData() {
		uni.removeStorageSync("userToken");
		Vue.prototype.$u.vuex("userInfo", null);
	}
};
app.$mount()
