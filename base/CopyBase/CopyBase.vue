<!--
 * @Author 不爱喝橙子汁
 * @Date: 2021-08-31 12:02:01
 * @LastEditTime: 2021-09-18 13:22:27
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /uniapp_uview_source_project/base/CopyBase/CopyBase.vue
-->
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
