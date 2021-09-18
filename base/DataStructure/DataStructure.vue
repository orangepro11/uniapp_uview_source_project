<template>
	<view>

	</view>
</template>

<script>
	export default {
		methods: {
			objectIsEmpty(obj) {
				// 判断obj是否为空对象
				return JSON.stringify(obj) === "{}";
			},

			testType(obj) {
				// 精确判断obj的类型，包括 null和 date
				return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase(); // 比如[Object Null]
			},

			uniq(arr) {
				// 数组去重
				if (!Array.isArray(arr)) {
					throw new Exception('不是一个数组');
				}
				return Array.from(new Set(arr));
			},

			benchMark(fn) {
				// 测试函数的执行时间
				return new Promise((resolve, reject) => {
					try {
						let start = performance.now();
						// your code 
						fn();
						let end = performance.now();
						resolve(end - start);
					} catch (e) {
						reject(e);
					}
				})
			},
			
			
		}
	}
</script>

<style>
</style>
