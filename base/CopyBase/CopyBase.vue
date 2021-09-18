<template>
	<view>
		
	</view>
</template>

<script>
	import { setClipboardData, getClipboardData } from '@/uni_modules/u-clipboard/js_sdk';
	
	export default {
		methods: {
			async copy(data) {
				if (data === "") {
					this.$refs.uToast.show({
						title: '复制的内容为空',
						type: 'default'
					})
					return;
				}
				try {
					await setClipboardData(data);
					// this.$refs.uToast.show({
					// 	title: '复制成功',
					// 	type: 'success'
					// })
				}catch(e) {
					this.$refs.copy.show({
						title: '复制失败',
						type: 'error'
					})
				}
				
			}
		}
	}
</script>

<style>
</style>
