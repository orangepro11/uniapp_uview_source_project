export default {
	login: {
		url: "/auth/login",
		method: "POST",
		tip: "登录授权",
		params: {
			data: {
				"tip": "小程序或网页提供的授权参数",
				regexp() {
					return true;
				}
			}
		}
	}
}
