<template>
	<view></view>
</template>

<script>
	export default{
		data(){
			return {}
		},
		onLoad() {
			console.log(this.$u.api);
			this.$u.api.cinema_ticket.auth.login({data: ""}).then(e => {
				console.log(e);
			});
		}
	}
</script>

<style>
</style>
