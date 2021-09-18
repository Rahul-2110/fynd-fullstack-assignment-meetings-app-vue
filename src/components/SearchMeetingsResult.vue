<template>
	<div class="searched-meetings">
		<template v-if="p_meetingsList.length > 0">
			<h3>Meetings matching search criteria</h3>
			<hr />
			<div class="meetings-list">
				<div
					class="meeting"
					v-for="meeting in p_meetingsList"
					:key="meeting._id"
				>
					<app-meeting
						:p_meeting="meeting"
						v-on:e_SearchMeetingsResult_excuseYourself="
							m_excuseYourselfFromMeeting
						"
						v-on:e_SearchMeetingsResult_addAttendee="
							m_addAttendeeToMeeting
						"
					></app-meeting>
				</div>
			</div>
		</template>
		<template v-else>
			<h3>No Meetings matching search criteria</h3>
			<hr />
		</template>
	</div>
</template>

<script>
	import Meeting from "@/components/Meeting.vue";
	export default {
		name: "SearchMeetingsResult",
		components: { AppMeeting: Meeting },
		props: {
			p_meetingsList: {
				type: Array,
				default: () => [],
			},
		},
		methods: {
			m_excuseYourselfFromMeeting(meetingId) {
				this.$emit("e_SearchMeetings_excuseYourself", meetingId);
			},
			m_addAttendeeToMeeting(meetingId, userId) {
				this.$emit("e_SearchMeetings_addAttendee", meetingId, userId);
			},
		},
	};
</script>

<style scoped>
	.searched-meetings {
		margin-top: 2em;
	}

	.meeting {
		border: 1px solid rgb(167, 167, 167);
		border-radius: 5px;
		padding: 1.5em;
		margin: 20px 0;
	}
</style>