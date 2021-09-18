import axios from "axios";
import AppConfig from "@/config";

const { apiBaseUrl } = AppConfig;

const s_teams_getMyTeams = async () => {
	const response = await axios.get(`${apiBaseUrl}/teams`);
	return response.data;
};

const s_teams_addTeam = async (name, shortName, description, members) => {
	const response = await axios.post(`${apiBaseUrl}/teams`, {
		name: name,
		description: description,
		shortName: shortName,
		members: members,
	});
	return response.data;
};

const s_teams_addMemberToTeam = async (teamId, userId) => {
	const response = await axios.patch(`${apiBaseUrl}/teams/${teamId}`, {
		action: "add_member",
		userId: userId,
	});
	return response.data;
};

const s_teams_excuseYourselfFromMeeting = async (teamId) => {
	const response = await axios.patch(`${apiBaseUrl}/teams/${teamId}`, {
		action: "remove_member",
	});
	return response.data;
};

export { s_teams_getMyTeams, s_teams_addTeam, s_teams_addMemberToTeam, s_teams_excuseYourselfFromMeeting };
