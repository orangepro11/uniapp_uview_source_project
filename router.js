// router.js
import {
	RouterMount,
	createRouter,
	runtimeQuit
} from 'uni-simple-router';

let [loginStatus, appOnLaunch] = [null, 0];
const path = 'https://wxm.zhangzhe.icu/api/v1/auth/app_lets_login'

const isLogin = async function() {
	const js_code = await new Promise((resolve, reject) => {
		// uni.login非异步，所以用Promise包装  
		uni.login({
			provider: 'weixin',
			success: res => {
				resolve(res.code);
			},
			fail: err => {
				reject(err);
			}
		});
	})
	return uni.request({
		url: path,
		method: 'POST',
		data: {
			code: js_code,
			password: ''
		},
	})
}

const login=async function(){
	const [, {
		data
	}] = await isLogin();
	if (data.code === 20000 && data.data.token) {
		uni.setStorageSync('token', data.data.token)
	}
}

const loginToPage = async function(to, from, next) {
	var token = null
	try {
		token = uni.getStorageSync('token')
	} catch (e) {}
	if (token == null) {
		const [, {
			data
		}] = await isLogin();
		if (data.code === 0 && data.data.token) {
			uni.setStorageSync('token', data.data.token)
			token = data.data.token
		}
	}
	if (token) { // 已经登录
		if (appOnLaunch === 1) {
			next({
				name: 'home',
				NAVTYPE: 'pushTab'
			});
		} else {
			next();
		}
	} else { //未登录 直接放行到登录页面
		if (to.name != 'login') {
			next({
				name: 'login',
				NAVTYPE: 'push'
			});
		} else {
			next();
		}
	}
}

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routerErrorEach: ({
		type,
		msg
	}) => {
		console.log({
			type,
			msg
		})
		// #ifdef APP-PLUS
		if (type === 3) {
			router.$lockStatus = false;
			runtimeQuit();
		}
		// #endif
	},
	routes: [...ROUTES]
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if(appOnLaunch===0){
		login()
	}
	appOnLaunch++;
	if (to.meta.auth) {
		loginToPage(to, from, next);
	} else {
		next();
	}
});
// 全局路由后置守卫
router.afterEach((to, from) => {
	console.log('跳转结束')
})

export {
	router,
	RouterMount
}
