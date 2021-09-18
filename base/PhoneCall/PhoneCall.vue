<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		methods: {
			PhoneCall(phone) {
				return new Promise((resolve,reject) => {
					uni.makePhoneCall({
					    phoneNumber: phone,
						success: (res) => {
							resolve(res);
						},
						fail: (e) => {
							reject(e);
						}
					});
				})
			}
		}
	}
</script>

<style>
</style>
