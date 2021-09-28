import { s_users_getAllRegisteredUsers } from "@/services/userManagementServices.js";

const KEY_REGISTERED_USERS = "registeredUsers";

const users = {
	namespaced: true,
	state: {
		registeredUsers: JSON.parse(localStorage.getItem(KEY_REGISTERED_USERS)) || "",
	},
	mutations: {
		setRegisteredUsers(state, registeredUsers) {
			state.registeredUsers = registeredUsers;
		},
	},
	actions: {
		getRegisteredUsers({ commit }) {
			return s_users_getAllRegisteredUsers().then((data) => {
				const registeredUsers = data;
				localStorage.setItem(KEY_REGISTERED_USERS, JSON.stringify(registeredUsers));
				commit("setRegisteredUsers", registeredUsers);
			});
		},
	},
};

export default users;
