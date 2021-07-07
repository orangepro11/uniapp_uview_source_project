<template>
	<view>
		<view class="u-page">
			<Home ref="Home" v-show="current == 0"></Home>
			<Work ref="Work" v-show="current == 1"></Work>
			<WorkRegister ref="WorkRegister" v-show="current == 2"></WorkRegister>
			<MoneyLog ref="MoneyLog" v-show="current == 3"></MoneyLog>
			<User ref="User" v-show="current == 4"></User>
		</view>
		<u-tabbar v-model="current" :list="list" :mid-button="false" :icon-size="48" :absolute-top="10"
			:absolute-bottom="0" :font-size="20" active-color="#1A59FE" inactive-color="#999999" @change="onPageChange">
		</u-tabbar>
	</view>
</template>

<script>
	import Home from "./home.vue";
	import Work from "./work.vue";
	import WorkRegister from "./workRegister.vue";
	import MoneyLog from "./moneyLog.vue";
	import User from "./user.vue";
	const components = ["Home","Work","WorkRegister","MoneyLog","User"];
	export default {
		components: {
			Home,
			Work,
			WorkRegister,
			MoneyLog,
			User
		},
		data() {
			return {
				list: [{
					iconPath: require("@/static/home_icon/home.png"),
					selectedIconPath: require("@/static/home_icon/homeb.png"),
					text: '首页',
					count: 0,
					isDot: false,
					customIcon: true,
					loaded: false
				}, {
					iconPath: require("@/static/home_icon/work.png"),
					selectedIconPath: require("@/static/home_icon/workb.png"),
					text: '查岗位',
					count: 0,
					isDot: false,
					customIcon: true,
					loaded: false
				}, {
					iconPath: require("@/static/home_icon/registerLog.png"),
					selectedIconPath: require("@/static/home_icon/registerLogb.png"),
					text: '报名记录',
					count: 0,
					isDot: false,
					customIcon: true,
					loaded: false
				}, {
					iconPath: require("@/static/home_icon/moneyLog.png"),
					selectedIconPath: require("@/static/home_icon/moneyLogb.png"),
					text: '佣金账单',
					count: 0,
					isDot: false,
					customIcon: true,
					loaded: false
				}, {
					iconPath: require("@/static/home_icon/user.png"),
					selectedIconPath: require("@/static/home_icon/userb.png"),
					text: '个人中心',
					count: 0,
					isDot: false,
					customIcon: true,
					loaded: false
				}],
				current: 0
			};
		},
		onShow() {
			this.callComponentsOnShow(this.current);
		},
		onReachBottom() {
			this.callComponentsOnReachBottom(this.current);
		},
		methods: {
			onPageChange(dest) {
				this.callComponentsOnShow(dest);
				if(!this.list[dest].loaded){
					this.list[dest].loaded = true;
					this.callComponentsOnLoad(dest);
				}
			},
			callComponentsOnShow(dest) {
				var key = components[dest];
				if (this.$refs[key] && this.$refs[key].onTabShow)
					this.$refs[key].onTabShow();
			},
			callComponentsOnReachBottom(dest) {
				var key = components[dest];
				if (this.$refs[key] && this.$refs[key].onTabReachBottom)
					this.$refs[key].onTabReachBottom();
			},
			callComponentsOnLoad(dest) {
				var key = components[dest];
				if (this.$refs[key] && this.$refs[key].onTabLoad)
					this.$refs[key].onTabLoad();
			}
		}
	}
</script>

<style>
	page {
		background-color: #F4F4F4;
	}
</style>
