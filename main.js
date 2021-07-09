import Vue from 'vue';
import App from './App';
import uView from 'uview-ui';
import httpInterceptor from '@/common/http.interceptor.js';
import httpApi from '@/common/http.api.js';
// import httpInterceptor from '@/common/http.ninterceptor.js';
// import httpApi from '@/common/http.napi.js';
import store from '@/store';

// import {router,RouterMount} from './router.js'  //路径换成自己的
// Vue.use(router)

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
app.$mount()
