import axios from "axios";
import AppConfig from "@/config";

const { apiBaseUrl } = AppConfig;

const s_users_meetingslogin = async (email, password) => {
	const response = await axios.post(`${apiBaseUrl}/auth/login`, 
    {
		email: email,
		password: password,
	});
	return response.data;
};

const s_users_meetingsRegister= async (name, email, password) => {
	const response = await axios.post(`${apiBaseUrl}/auth/register`, 
    {	
		name: name,
		email: email,
		password: password,
	});
	return response.data;
};

const s_users_getAllRegisteredUsers = async () => {
	const response = await axios.get(`${apiBaseUrl}/users`);
	return response.data;
};

export { s_users_meetingslogin, s_users_meetingsRegister, s_users_getAllRegisteredUsers };
