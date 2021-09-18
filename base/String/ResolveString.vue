<template>
	<view>

	</view>
</template>

<script>
	export default {
		methods: {
			trimString(str = "", len = 8) {
				try {
					if (str.length <= len) {
						return str; // 不做处理
					}
					return str.slice(0, len) + "...";
				} catch (e) {
					console.warn(e);
					// throw e;
				}
			},
			bigNumber(source) {
				if (source < 10000) {
					return source;
				}
				return (source/10000).toFixed(2) + '万';
			}
		}
	}
</script>

<style>
</style>
