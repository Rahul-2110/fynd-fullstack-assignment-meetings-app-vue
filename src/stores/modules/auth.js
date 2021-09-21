import { s_users_meetingslogin } from "@/services/userManagementServices.js";

const KEY_TOKEN = "token";
const KEY_EMAIL = "email";
const KEY_NAME = "name";

const auth = {
	namespaced: true,
	state: {
		token: localStorage.getItem(KEY_TOKEN) || "",
		email: localStorage.getItem(KEY_EMAIL) || "",
		name: localStorage.getItem(KEY_NAME) || "",
	},
	getters: {
		isAuthenticated(state) {
			return !!state.token;
		},
	},
	mutations: {
		setToken(state, token) {
			state.token = token;
            localStorage.setItem(KEY_TOKEN, token);
		},
		setEmail(state, email) {
			state.email = email;
            localStorage.setItem(KEY_EMAIL, email);
		},
		setName(state, name) {
			state.name = name;
            localStorage.setItem(KEY_NAME, name);
		},
	},
	actions: {
		login({ commit }, credentials) {
			return s_users_meetingslogin(
				credentials.email,
				credentials.password
			).then((data) => {
				const { token, email, name } = data;
				commit("setToken", token);
				commit("setEmail", email);
				commit("setName", name);
               
			});

		},
		logout({ commit }) {
                   
            commit( 'setToken', '' );
            commit( 'setEmail', '' );
            commit( 'setName', '' );
            commit( 'setName', '' );
            
            commit('users/setRegisteredUsers', [], { root: true });
            return Promise.resolve();

        },
	},
};

export default auth;
