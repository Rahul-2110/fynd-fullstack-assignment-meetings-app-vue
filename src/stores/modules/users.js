import { s_users_getAllRegisteredUsers } from "@/services/userManagementServices.js";

const KEY_REGISTERED_USERS = "registeredUsers";

const users = {
	namespaced: true,
	state: {
		registeredUsers: localStorage.getItem(KEY_REGISTERED_USERS) || "",
	},
	mutations: {
		setRegisteredUsers(state, registeredUsers) {
			state.registeredUsers = registeredUsers;
		},
	},
	actions: {
		getRegisteredUsers({ commit }) {
			return s_users_getAllRegisteredUsers().then((data) => {
				console.log(data);
				const registeredUsers = data;
				localStorage.setItem(KEY_REGISTERED_USERS, registeredUsers);
				commit("setRegisteredUsers", registeredUsers);
			});
		},
	},
};

export default users;
