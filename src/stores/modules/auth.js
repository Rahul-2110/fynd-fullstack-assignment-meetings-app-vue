import { s_users_meetingslogin } from "@/services/userManagementServices.js";

const KEY_TOKEN = "token";
const KEY_EMAIL = "email";
const KEY_NAME = "name";
const currentDateTime = (new Date()).getTime();

const getToken = ()=>{
	const token = localStorage.getItem(KEY_TOKEN);
	if (token === null){
		return false;
	}
	else{
		const tokenData = JSON.parse(token);
		const tokenStorageTime = (new Date(tokenData.time)).getTime();
		if ((currentDateTime - tokenStorageTime) >= 86400000){
			return false;
		}
		else{
			return tokenData.token;
		}
	}
}

const getEmail = () =>{
	const email = localStorage.getItem(KEY_EMAIL);
	if (email === null){
		return false;
	}
	else{
		const emailData = JSON.parse(email);
		const emailStorageTime = (new Date(emailData.time)).getTime();
		if ((currentDateTime - emailStorageTime) >= 86400000){
			return false;
		}
		else{
			return emailData.email;
		}
	}
}

const getName= () =>{
	const name = localStorage.getItem(KEY_NAME);
	if (name === null){
		return false;
	}
	else{
		const nameData = JSON.parse(name);
		const nameStorageTime = (new Date(nameData.time)).getTime();
		if ((currentDateTime - nameStorageTime) >= 86400000){
			return false;
		}
		else{
			return nameData.name;
		}
	}
}

const auth = {
	namespaced: true,
	state: {
		token: getToken() || "",
		email: getEmail() || "",
		name: getName() || "",
	},
	getters: {
		isAuthenticated(state) {
			return !!state.token;
		},
	},
	mutations: {
		setToken(state, token) {
			state.token = token.token;
			if(token.remember){
				localStorage.setItem(KEY_TOKEN, JSON.stringify({ token: token.token, time: new Date() }));
			}	
            
		},
		setEmail(state, email) {
			state.email = email.email;
			if(email.remember){
				localStorage.setItem(KEY_EMAIL, JSON.stringify({ email: email.email, time: new Date() }));
			}	
            
		},
		setName(state, name) {
			state.name = name.name;
			if(name.remember){
				localStorage.setItem(KEY_NAME, JSON.stringify({ name: name.name, time: new Date() }));
			}
            
		},
	},
	actions: {
		login({ commit }, credentials) {
			return s_users_meetingslogin(
				credentials.email,
				credentials.password
			).then((data) => {
				const { token, email, name } = data;
				
				commit("setToken", {token: token, remember: credentials.rememberMe});
				commit("setEmail", {email: email, remember: credentials.rememberMe});
				commit("setName", {name: name, remember: credentials.rememberMe});
               
			});

		},
		logout({ commit }) {       
			commit("setToken", {token: "", remember: true});
			commit("setEmail", {email: "", remember: true});
			commit("setName", {name: "", remember: true});
            
            commit('users/setRegisteredUsers', [], { root: true });
            return Promise.resolve();

        },
	},
};

export default auth;
