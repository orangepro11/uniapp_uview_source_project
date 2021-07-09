<template>
	<view>
		<view class="body">
			<view class="main">
				<open-data class="userAvatarUrl" type="userAvatarUrl">
					<u-image width="100%" height="100%"></u-image>
				</open-data>
				<open-data class="userNickName" type="userNickName">微信昵称</open-data>
				<view class="loginBtn">微信一键登录</view>
				<view class="back">暂不登录</view>
			</view>
			<view class="contract">登录即同意我们《用户协议》</view>
		</view>
		<u-popup  v-model="popup" mode="bottom">
			<view class="popup">
				<view class="main">
					<open-data class="userAvatarUrl" type="userAvatarUrl">
						<u-image width="100%" height="100%"></u-image>
					</open-data>
					<open-data class="userNickName" type="userNickName">微信昵称</open-data>
					<view class="loginBtn">微信一键登录</view>
					<view class="back">暂不登录</view>
				</view>
				<view class="contract">登录即同意我们《用户协议》</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popup:true
			};
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
	.popup{
		width: 750rpx;
		height: 628rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.main{
			height: 90%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.userAvatarUrl{
				width: 125rpx;
				height: 125rpx;
				margin-bottom: 32rpx;
				border-radius: 50%;
				overflow: hidden;
			}
			.userNickName{
				color: #111111;
				font-size: 30rpx;
				margin-bottom: 27rpx;
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
				margin-bottom: 24rpx;
			}
			.back{
				color: #808080;
				font-size: 32rpx;
				margin-bottom: 30rpx;
			}
			
		}
		.contract{
			height: 10%;
			color: #808080;
			font-size: 24rpx;
		}
	}
</style>
