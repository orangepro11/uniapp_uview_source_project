<script>
	import Service from './service.js';
	export default {
		data() {
			return {
				isLogin: false,
				service: null,
			}
		},
		onShow() {
			this.service = new Service(this.$u);
			if (!this.isLogin) {
				this.$nextTick(() => {
					let token = null
					try {
						token = uni.getStorageSync('token');
					} catch (e) {
						console.log(e);
						throw e;
					}
					if (!token) {
						uni.showModal({
							title: '提示',
							content: '该页面需要授权登陆',
							cancelText: '暂不授权',
							confirmText: "允许授权",
							success: res => {
								if (res.confirm) {
									this.login() // 调用登录接口
								} else if (res.cancel) {
									uni.switchTab({
										url: "pages/home/new-home"
									})
								}
							}
						});
					} else {
						this.isLogin = true
					}
				})
			}
		},
		methods: {
			async login() {
				let code = this.getLoginBaseWechatCode()
				let userinfo = this.getLoginBaseUserInfo()
				Promise.all([code, userinfo]).then((data) => {
					this.service.app_lets_register({
						share_id: this.pid,
						code: data[0],
						iv: data[1].iv,
						encryptedData: data[1].encryptedData
					}).then(async res => {
						if (res.code === 20000 && res.data.token) {
							uni.setStorageSync('token', res.data.token)
							let info = await this.service.getUserInfo();
							console.log(info);
							this.$u.vuex('userInfo', info);
							this.isLogin = true
						} else {
							uni.showToast({
								title: '登陆失败请稍后重试',
								icon: 'none',
								duration: 2000
							});
						}
					});
				});
			},
			async getLoginBaseWechatCode() {
				return new Promise((resolve, reject) => {
					uni.login({
						provider: 'weixin',
						success: (res) => {
							resolve(res.code);
						},
						fail: (err) => {
							reject(err);
						}
					});
				})
			},
			async getLoginBaseUserInfo() {
				return new Promise((resolve, reject) => {
					uni.getUserProfile({
						desc: '完善用户信息',
						lang: 'zh_CN',
						success: (res) => {
							resolve(res);
						},
						fail: (err) => {
							reject(err);
						}
					})
				});
			}
		}
	}
</script>
