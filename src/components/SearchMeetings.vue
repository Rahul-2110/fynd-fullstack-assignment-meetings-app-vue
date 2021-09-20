<template>
	<div>
		<template v-if="d_status === 'LOADING'">
			<CircleSpinner />
		</template>
		<template v-else-if="d_status === 'ERROR'">
			<!-- <ErrorBox
				:d_status="error.response.d_status"
				:message="error.response.d_statusText"
			/> -->
		</template>
		<template v-else-if="d_status === 'LOADED'">
		<div class="tab-content">
			<h3>Search for meetings</h3>
			<hr />
			<div class="search-meeting-form">
				<div class="search-meeting-form-group">
					<label for="date" class="search-meeting-form-group-label"
						>Date</label
					>
					<select name="date" v-model="d_selectedPeriod">
						<option value="all">ALL</option>
						<option value="past">PAST</option>
						<option value="present">TODAY</option>
						<option value="future">UPCOMING</option>
					</select>
				</div>
				<div class="search-meeting-form-group">
					<label
						for="search-for"
						class="search-meeting-form-group-label"
						>Search for</label
					>
					<textarea
						name="search-for"
						rows="1"
						cols="40"
						minlength="10"
						placeholder="Search using words which describe a meeting"
						required
						v-model="d_selectedDescription"
					></textarea>
				</div>
				<button
					@click="m_getSearchedMeetings"
					class="search-meeting-btn"
				>
					Search
				</button>
			</div>
		</div>
		<template v-if="d_showSearchedMeetings">
			<search-meetings-result
				:p_meetingsList="d_searchedMeetingsList"
				:p_registeredUsers="p_registeredUsers"
				v-on:e_SearchMeetings_excuseYourself="m_excuseYourselfFromMeeting"
                v-on:e_SearchMeetings_addAttendee="m_addAttendeeToMeeting"
			></search-meetings-result>
		</template>
		</template>
	</div>
</template>

<script>
	import SearchMeetingsResult from "@/components/SearchMeetingsResult.vue";
	import {
		s_meetings_getMeetingsMatchingCriteria,
		s_meetings_excuseYourselfFromAMeeting,
        s_meetings_addAttendeeToMeeting
	} from "@/services/meetingsServices.js";
	export default {
		name: "SearchMeetings",
		components: { SearchMeetingsResult },
		data() {
			return {
				d_selectedPeriod: "all",
				d_selectedDescription: "",
				d_searchedMeetingsList: [],
				d_showSearchedMeetings: false,
				d_status: "LOADING",
				d_error:""
			};
		},
		props:{
			p_registeredUsers:{
				type: Array,
				required: true
			}
		},
		methods: {
			async m_getSearchedMeetings() {
				try {
					const response = await s_meetings_getMeetingsMatchingCriteria(
						this.d_selectedPeriod,
						this.d_selectedDescription
					);
					this.d_showSearchedMeetings = true;
					this.d_searchedMeetingsList = response;
				} catch (err) {
					this.d_status = "ERROR";
					this.d_error = err;
				}
			},
			async m_excuseYourselfFromMeeting(meetingId) {
				try {
					await s_meetings_excuseYourselfFromAMeeting(meetingId);
					this.m_getSearchedMeetings();
				} catch (err) {
					console.log(err);
					this.d_status = "ERROR";
					this.d_error = err;
				}
			},
            async m_addAttendeeToMeeting(meetingId, userId){
                try {
					await s_meetings_addAttendeeToMeeting(meetingId, userId);
					this.m_getSearchedMeetings();
				} catch (err) {
					console.log(err);
					this.d_status = "ERROR";
					this.d_error = err;
				}
            }
		},
		created(){
			this.d_status="LOADED";
		}
	};
</script>

<style scoped>
	.tab-content {
		margin-top: 10px;
		padding: 2rem;
		width: 100%;
		background: #73c7d5;
		border-radius: 5px;
		color: #000;
	}
	.tab-content h3 {
		color: #fff;
	}

	.tab-content hr {
		height: 2px;
		background-color: #6bbbc8;
	}

	.search-meeting-form {
		margin: 20px 0;
	}

	.search-meeting-form-group {
		margin: 25px 0;
	}

	.search-meeting-form-group-label,
	.search-meeting-form-group select,
	.search-meeting-form-group textarea {
		display: block;
		margin: 10px 0;
	}

	.search-meeting-form-group select,
	.search-meeting-form-group textarea {
		padding: 0.5em;
		width: 100%;
		outline: none;
		border-radius: 5px;
	}

	.search-meeting-form-group textarea {
		height: 4em;
	}

	.search-meeting-btn {
		border-radius: 5px;
		margin-bottom: 1em;
		border: none;
		font-size: 0.9em;
		height: 2.5em;
		margin: 5px 0px;
		padding: 0px 24px;
		line-height: 1.75;
		background-color: #18a2b8;
		color: #fff;
	}

	.search-meeting-btn:active {
		transform: translateY(4px);
	}
</style>