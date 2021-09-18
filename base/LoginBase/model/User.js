class User {

	constructor(obj) {
		this.id = obj?.id || 1;
		this.userIcon = obj?.user_icon;
		this.nickname = obj?.nickname || "融化月亮";
		this.isVerifier = obj?.is_verifier;
	}

}

export default User;
