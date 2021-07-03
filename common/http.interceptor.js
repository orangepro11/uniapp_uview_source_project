// 请求拦截 响应拦截

import hostUrl from "@/common/host.js"; //导入域名地址js文件
import md5Libs from "uview-ui/libs/function/md5";

// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: hostUrl, // 请求的本域名
		// method: 'POST',	 	  	// 接口请求方式
		dataType: 'json', // 设置为json，返回后会对数据进行一次JSON.parse()
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 2000, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: true, // 设置为true后,就需要在this.$u.http.interceptor.response进行多一次的判断,请打印查看具体值;是否在拦截器中返回服务端的原始数据,如果将此值设置为true,拦截回调中将会返回服务端返回的所有数据response,而不是response.data
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		header: { // 配置请求头信息  设置自定义头部content-type
			'X-Requested-With': 'XMLHttpRequest',
			'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
		},
	});

	Vue.prototype.$u.http.interceptor.request = (config) => {
		try {
			var userToken = uni.getStorageSync('userToken');
			if(userToken == "")
				throw "token not exists";
			var time = parseInt((new Date()).valueOf() / 1000);
			if(!config.header)
				config.header = {};
			config.header.TOKEN_UID = userToken.split("_")[1];
			config.header.TOKEN_TIME = time;
			config.header.TOKEN_ACCESSSTR = md5Libs.md5("OIKHNSDKFFHGIORY54345276" + md5Libs.md5(userToken.split("_")[0] +
				time));
		} catch (e) {
			console.log(e)
		}
		console.log(config);
		return config;
	}
	
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = async (response) => {
		if (response.statusCode == 200) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			return response.data;
		} else {
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return false;
		}
		// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
		// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
		// 如果把originalData设置为了true，这里return回什么，this.$u.post的then回调中就会得到什么
		// 如果请求报错

		//token过期
		// if (response.data.code == 50014) {
		// 	let options = Vue.prototype.$u.http.options;
		// 	let res = await vm.$u.post("http://www.bx.jingyaovip.com/v1/Login/user_Login_use_password", {
		// 		content: "jCHsfTphiihM1snyGAZAjiOx3vkynp0eG9w/Ea5A6BqkhUpoyFz/fMGIMioQrI6KNNvWkD20Swoiqx/KR+fW+jBe9b38fRhUO9i/hDS3BTcep+8ORrwLLoxV7e51vIcpWCgPywQB/tAG0yTOgUHWoAECnlI32Yn0kMUCSgDs2Og="
		// 	});
		// 	if (res.data.data && res.data.data.statusCode == 200) {
		// 		uni.setStorageSync('token', res.data.data);
		// 		//重新获取token
		// 		response = await doRequest(response, res, vm, options)
		// 	}else {
		// 		return false
		// 	}
		// }
		return response
	}
}


export default {
	install
}

// 刷新token方法,重新请求需要token中断的接口
async function doRequest(response, obj, vm, options) {
	let res;
	switch (options.method) {
		case "POST":
			res = await vm.$u.post(options.url, options.data);
			break;
		case "GET":
			res = await vm.$u.get(options.url, options.data);
			break;
		case "PUT":
			res = await vm.$u.put(options.url, options.data);
			break;
		case "DELETE":
			res = await vm.$u.delete(options.url, options.data);
			break;
		default:
			break
	}
	return res
}
