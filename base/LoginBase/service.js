import User from './model/User.js';

export default class AuthService {
	constructor(vm) {
		this.$u = vm;
	}

	async app_lets_register(config) {
		let res = null;
		try {
			res = await this.$u.post("/v1/auth/mp_app_register", {
				share_id: config.share_id,
				code: config.code,
				iv: config.iv,
				encryptedData: config.encryptedData,
			})
			console.log(res);
			return res;
		} catch (e) {
			throw new Error(e?.message || "注册失败");
		}
	}

	async getUserInfo() {
		let res = null;
		try {
			res = await this.$u.get("/v1/user/get_user_info");
			if (!res || res?.status != 1) {
				throw new Error(res.msg);
			}
			return new User(res?.data);
		} catch (e) {
			throw new Error(e?.message || "请求接口失败");
		}
	}
}
