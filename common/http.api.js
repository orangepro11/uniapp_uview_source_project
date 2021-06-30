// 接口封装列表

import auth from "@/common/auth.api.js";

var apiList = {
	auth
}

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 封装接口参数
	vm.$u.api = {};
	for (var k in apiList) {
		var API = apiList[k];
		vm.$u.api[k] = {};
		for (var i in API) {
			((api, j, key) => {
				vm.$u.api[k][j] = (params) => {
					var param = {};
					for (var i in api.params) {
						if (!api.params[i].regexp(params[i])) {
							vm.$u.toast(api.params[i].errmsg);
							return false;
						}
						param[i] = params[i];
					}
					if (api.method == "POST")
						return vm.$u.post(api.url, vm.$u.api.urlParamEncode(param));
					return vm.$u.get(api.url, param);
				}
			})(API[i], i, k);
		}
	}
	vm.$u.api.urlParamEncode = function(param) {
		return Object.keys(param).map(function(key) {
			return encodeURIComponent(key) + "=" + encodeURIComponent(param[key]);
		}).join("&");
	}
	vm.$u.api.encodeParam = function(str) {
		return Base64.encode(str);
	}
	vm.$u.api.decodeParam = function(str) {
		return Base64.decode(str);
	}
	vm.$u.api.setLoginData = (token) => {
		uni.setStorageSync("userToken",token);
	},
	vm.$u.api.removeLoginData = () => {
		uni.removeStorageSync("userToken");
	}
}
export default {
	install
}
