<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			successToast(message) {
				this.$refs?.uToast.show({
					title: message,
					type: 'success'
				});
			},

			errorToast(message) {
				this.$refs?.uToast.show({
					title: message,
					type: 'error'
				});
			},

			waitTime(time) {
				return new Promise(resolve => {
					setTimeout(() => {
						resolve();
					}, 1000 * time)
				})
			},

			goBack() {
				this.$u.route({
					type: 'back'
				});
			},
			
			goHome() {
				this.$u.route({
					type: 'tab',
					url: '/pages/home/new-home',
				});
			}
		}
	}
</script>

<style>
</style>
