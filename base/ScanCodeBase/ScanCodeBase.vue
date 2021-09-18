<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		methods: {
			scanCode() {
				return new Promise((resolve,reject) => {
					uni.scanCode({
						onlyFromCamera: true,
						success: (qrcode) => {
							resolve(qrcode)
						},
						fail: (e) => {
							reject(e.message);
						}
					})
				})
			}
		}
	}
</script>

<style>
</style>
