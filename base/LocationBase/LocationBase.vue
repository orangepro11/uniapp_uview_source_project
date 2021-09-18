<script>
	import mapSdk from "@/common/map/qqmap.js"
	export default {
		async mounted() {
			if (!this.latitudeAndLongitude.latitude && !this.latitudeAndLongitude.longitude && !this
				.latitudeAndLongitude.city) {
				this.getLocationAuth()
			}
		},
		methods: {
			getLocationAuth() {
				let that = this
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.userLocation']) {
							console.log("userLocation位置功能已授权")
							// 如果已授权,直接获取对应参数
							that.getLocationInfo()
						} else if (!res.authSetting['scope.userLocation']) {
							// 说明此时要获取的位置功能尚未授权,
							// 则设置进入页面时主动弹出，直接授权
							uni.authorize({
								scope: 'scope.userLocation',
								success(res) {
									// 授权成功
									that.getLocationInfo();
								},
								fail() {
									console.log("位置授权失败")
									uni.showModal({
										content: '检测到您没打开获取地理位置权限，是否去设置打开？',
										confirmText: "确认",
										cancelText: '取消',
										success: (res) => {
											console.log(res)
											if (res.confirm) {
												uni.openSetting({
													success: (res) => {
														that.getLocationInfo()
													},
													fail: (err) => {
														that.getLocationInfo()
													}
												})
											} else {
												that.getLocationInfo()
											}
										}
									})
								}
							})
						}
					}
				})
			},

			getLocationInfo() {
				return new Promise(async (resolve, reject) => {
					let map = new mapSdk();
					try {
						let latitudeAndLongitude = await map.getLatitudeAndLongitude();
						let city = await map.authAndGetCity(latitudeAndLongitude.latitude, latitudeAndLongitude
							.longitude);
						latitudeAndLongitude.city = city
						this.$u.vuex('latitudeAndLongitude', latitudeAndLongitude);
						resolve();
					} catch (e) {
						reject(e?.message);
					}
				});
			},
			pathplan(config) {
				// latitude = 41.79607, longitude = 123.45852, address = ""
				return new Promise((resolve, reject) => {
					uni.openLocation({
						latitude: config?.latitude || this?.latitudeAndLongitude?.latitude,
						longitude: config?.longitude || this?.latitudeAndLongitude?.longitude,
						address: config?.address || "",
						success: () => {
							resolve();
						},
						fail: (err) => {
							reject(err);
						}
					});
				})

			},
			successLocation() {}
		}
	}
</script>

<style>
</style>
