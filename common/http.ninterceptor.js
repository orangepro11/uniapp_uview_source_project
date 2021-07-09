import hostUrl from "@/common/host.js"; //导入域名地址js文件
// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: hostUrl, // 请求的本域名
		dataType: 'json', // 设置为json，返回后会对数据进行一次JSON.parse()
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 2000, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: true, // 设置为true后,就需要在this.$u.http.interceptor.response进行多一次的判断,请打印查看具体值;是否在拦截器中返回服务端的原始数据,如果将此值设置为true,拦截回调中将会返回服务端返回的所有数据response,而不是response.data
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		header: { // 配置请求头信息  设置自定义头部content-type
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type':'application/json',
		},
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		try {
			config.header.Authorization = "Bearer " + uni.getStorageSync('token');
		} catch (e) {
			console.log(e)
		}
		return config; 
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
		// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
		// 如果把originalData设置为了true，这里return回什么，this.$u.post的then回调中就会得到什么
		if (res.statusCode == 200) {
			return res.data;
		} else {
			return false;
		} 
		return res
	}
}

export default {
	install
}