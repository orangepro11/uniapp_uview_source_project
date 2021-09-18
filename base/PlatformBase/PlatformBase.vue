<template>
	<view>

	</view>
</template>

<script>
	export default {
		methods: {
			isIphoneX() {
				return new Promise((resolve,reject) => {
					uni.getSystemInfo({
						success: (res) => {
							console.log(res.model);
							let phoneEnum = ['iPhone X','iPhone XR','iPhone 11','iPhone 11 Pro Max','iPhone 12','iPhone 12 Pro Max'];
							phoneEnum = phoneEnum.map(item => this.$u.trim(item.toUpperCase(),'all'));
							let model = this.$u.trim(res.model.toUpperCase(),'all');
							if (phoneEnum.includes(model)) {
								resolve(true);
							} else {
								resolve(false);
							}
						},
						fail: (e) => {
							reject(e);
						}
					})
					
				})
			}
		}
	}
</script>

<style>
</style>
