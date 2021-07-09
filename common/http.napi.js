import login from "@/pages/login/service/login.api.js"
const install = (Vue, vm) => {
	Vue.use(login,vm)
}
export default {
	install
}