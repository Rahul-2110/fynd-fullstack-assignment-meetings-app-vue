import axios from "axios";
import AppConfig from "@/config";

const { apiBaseUrl } = AppConfig;

const meetingslogin = async (email, password) => {
	const response = await axios.post(`${apiBaseUrl}/auth/login`, 
    {
		email: email,
		password: password,
	});
	return response.data;
};

export { meetingslogin };
