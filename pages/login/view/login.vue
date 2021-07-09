<template>
	<view>
		<view class="body">
			<view class="main">
				<open-data class="userAvatarUrl" type="userAvatarUrl">
					<u-image width="100%" height="100%"></u-image>
				</open-data>
				<open-data class="userNickName" type="userNickName">微信昵称</open-data>
				<view class="loginBtn" @click="login()">微信一键登录</view>
				<!-- <view class="back">暂不登录</view> -->
			</view>
			<view class="contract">登录即同意我们《用户协议》</view>
		</view>
		<!-- <button class="wxq-btn loginWx" open-type="getUserInfo" @click="login()">一键登录</button> -->
	</view>
</template>

<script>
	export default {
		methods: {
			login(){
				let code=this.getWechatCode()
				let userinfo= this.getUserInfo()
				Promise.all([code, userinfo]).then((data) => {
					console.log(this.$u.api)
					this.$u.api.app_lets_register({
						code: data[0],
						iv:data[1].iv,
						encryptedData:data[1].encryptedData
					}).then(res => {
						console.log(res)
						if(res.code===20000 && res.data.token){
							uni.setStorageSync('token', res.data.token)
							uni.navigateBack({
								delta:1
							})
						}else{
							uni.showToast({
								title: '登陆失败请稍后重试',
								icon:'none',
								duration: 2000
							});
						}
					});
				});
			},
			async getWechatCode() {
				return new Promise((resolve, reject) => {
					// uni.login非异步，所以用Promise包装  
					uni.login({
						provider: 'weixin',
						success: res => {
							resolve(res.code);
						},
						fail: err => {
							reject(err);
						}
					});
				})
			},
			async getUserInfo() {
				return new Promise((resolve, reject) => {
					uni.getUserProfile({
						desc: '完善用户信息',
						lang:'zh_CN',
						success: res => {
							resolve(res);
						},
						fail: err => {
							reject(err);
						}
					})
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.body{
		height: 90vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.main{
			height: 98%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.userAvatarUrl{
				width: 125rpx;
				height: 125rpx;
				margin-bottom: 63rpx;
				border-radius: 50%;
				overflow: hidden;
			}
			.userNickName{
				color: #111111;
				font-size: 30rpx;
				margin-bottom: 54rpx;
			}
			.loginBtn{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 544rpx;
				height: 95rpx;
				background-color: #EC6875;
				color: #FFFFFF;
				font-size: 36rpx;
				border-radius: 100rpx;
				margin-bottom: 48rpx;
			}
			.back{
				color: #808080;
				font-size: 32rpx;
				margin-bottom: 60rpx;
			}
			
		}
		.contract{
			height: 2%;
			color: #808080;
			font-size: 24rpx;
		}
	}
</style>
