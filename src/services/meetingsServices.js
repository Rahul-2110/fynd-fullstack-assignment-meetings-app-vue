import axios from "axios";
import AppConfig from "@/config";

const { apiBaseUrl } = AppConfig;

const s_meetings_getMeetingsMatchingCriteria = async (period, description) => {
	const response = await axios.get(`${apiBaseUrl}/meetings`, {
		params: {
			period: period,
			search: description,
		},
	});
	return response.data;
};

const s_meetings_addMeeting = async (
	name,
	description,
	date,
	startTime,
	endTime,
	attendees
) => {
	const response = await axios.post(`${apiBaseUrl}/meetings`, {
		name: name,
		description: description,
		date: date,
		startTime: startTime,
		endTime: endTime,
		attendees: attendees,
	});
	return response.data;
};

const s_meetings_addAttendeeToMeeting = async (meetingId, userId) => {
	const response = await axios.patch(
		`${apiBaseUrl}/meetings/${meetingId}`,
		{},
		{
			params: {
				action: "add_attendee",
				userId: userId,
			}
		}
	);
	return response.data;
};

const s_meetings_excuseYourselfFromAMeeting = async (meetingId) => {
	const response = await axios.patch(
		`${apiBaseUrl}/meetings/${meetingId}`,
		{},
		{
			params: {
				action: "remove_attendee",
			}
		}
	);
	return response.data;
};

export {
	s_meetings_getMeetingsMatchingCriteria,
	s_meetings_addMeeting,
	s_meetings_addAttendeeToMeeting,
	s_meetings_excuseYourselfFromAMeeting,
};
