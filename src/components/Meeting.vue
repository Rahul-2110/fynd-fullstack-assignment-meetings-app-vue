<template>
	<div>
		<p class="meeting-date">
			{{ m_getDateInReadableFormat(p_meeting.date) }}
			<span class="meeting-day">{{
				m_getMeetingTime(p_meeting.startTime, p_meeting.endTime)
			}}</span>
		</p>
		<p class="meeting-description">{{ p_meeting.name }}</p>
		<button
			@click="$emit('e_SearchMeetingsResult_excuseYourself', p_meeting._id)"
			class="excuse-from-meeting-btn"
		>
			Excuse yourself
		</button>
		<hr />
		<p class="meeting-members-list">
			<span class="meeting-members-head">Attendees</span>:
			<span
				class="meeting-members"
				v-for="attendee in p_meeting.attendees"
				:key="attendee.userId"
			>
				{{ attendee.email }}</span
			>
		</p>
		<div class="add-member-to-meeting selectdiv">
			<label>
				<select v-model="d_selectedUser">
					<option disabled hidden selected value="">
						Select a member
					</option>
					<option
						v-for="user in d_registeredUsers"
						:key="user._id"
						:value="user._id"
					>
						{{ user.email }}
					</option>
				</select>
			</label>
			<button
				@click="
					$emit(
						'e_SearchMeetingsResult_addAttendee',
						p_meeting._id,
						d_selectedUser
					)
				"
				class="add-member-to-meeting-btn"
			>
				Add
			</button>
		</div>
	</div>
</template>

<script>
	import { s_users_getAllRegisteredUsers } from "@/services/userManagementServices.js";
	import { monthsMixin, weekDaysMixin } from "@/mixins/dateMixin.js";
	export default {
        name: "Meeting",
        mixins: [monthsMixin, weekDaysMixin],
        data() {
			return {
				d_registeredUsers: [],
				d_selectedUser: "",
			};
		},
        props:{
            p_meeting:{
                type: Object,
                required: true
            }
        },
		methods: {
			async m_getAllUsers() {
				try {
					const response = await s_users_getAllRegisteredUsers();
					this.d_registeredUsers = response;
				} catch (err) {
					this.status = "ERROR";
					this.error = err;
				}
			},
			m_getDateInReadableFormat(date) {
				date = new Date(date);
				return (
					date.getDate() +
					" " +
					this.Months[date.getMonth()] +
					" " +
					date.getFullYear()
				);
			},
			m_getMeetingTime(startTime, endTime) {
				let meetingTime = "";
				if (startTime.hours > 9) {
					meetingTime = startTime.hours;
				} else {
					meetingTime = "0" + startTime.hours;
				}

				if (startTime.minutes > 9) {
					meetingTime = meetingTime + ":" + startTime.minutes;
				} else {
					meetingTime = meetingTime + ":" + "0" + startTime.minutes;
				}

				if (endTime.hours > 9) {
					meetingTime = meetingTime + " - " + endTime.hours;
				} else {
					meetingTime = meetingTime + " - " + "0" + endTime.hours;
				}

				if (endTime.minutes > 9) {
					meetingTime = meetingTime + ":" + endTime.minutes;
				} else {
					meetingTime = meetingTime + ":" + "0" + endTime.minutes;
				}
				return meetingTime;
			},
		},
		created() {
			this.m_getAllUsers();
		}
    };
</script>

<style scoped>

	.meeting-date {
		font-size: 1.1em;
		margin-top: 0;
		font-weight: 600;
	}
	.meeting-day {
		font-size: 0.9em;
		margin-left: 1em;
		font-weight: 400;
	}

	.excuse-from-meeting-btn {
		font-size: 0.9em;
		padding: 10px 15px;
		border-radius: 5px;
		margin-bottom: 1em;
		background-color: #dc3545;
		color: #fff;
		border: none;
	}
	.excuse-from-meeting-btn:hover {
		opacity: 0.8;
		cursor: pointer;
	}

	.excuse-from-meeting-btn:active {
		transform: translateY(2px);
	}

	.meeting-members-list{
		height: 40px;
		overflow: scroll;
	}

	.meeting-members-list:hover{
		cursor: pointer;
	}

	.meeting-members-head {
		font-size: 1em;
		font-weight: 600;
	}

	.meeting-members::after {
		content: ",";
	}

	.meeting-members:last-child::after {
		content: "";
	}

	.selectdiv {
		position: relative;
	}

	select::-ms-expand {
		display: none;
	}

	.selectdiv:after {
		content: "<>";
		font: 17px "Consolas", monospace;
		color: #333;
		-webkit-transform: rotate(90deg);
		-moz-transform: rotate(90deg);
		-ms-transform: rotate(90deg);
		transform: rotate(90deg);
		left: 155px;

		top: 12px;
		padding: 0 0 2px;
		border-bottom: 1px solid #999;

		position: absolute;
		pointer-events: none;
	}

	.selectdiv select {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		display: inline-block;
		width: 100%;
		max-width: 180px;
		height: 2.5em;
		margin: 5px 0px;
		padding: 0px 10px;
		font-size: 0.9em;
		line-height: 1.75;
		color: #333;
		background-color: #ffffff;
		background-image: none;
		border: 1px solid #cccccc;
		border-radius: 5px;
		-ms-word-break: normal;
		word-break: normal;
		outline: none;
	}

	.add-member-to-meeting-btn {
		border-radius: 5px;
		margin-bottom: 1em;
		color: #fff;
		border: none;
		font-size: 0.9em;
		height: 2.5em;
		margin: 5px 3px;
		padding: 0px 24px;
		line-height: 1.75;
		background-color: #18a2b8;
	}

	.add-member-to-meeting-btn:hover {
		opacity: 0.8;
		cursor: pointer;
	}

	.add-member-to-meeting-btn:active {
		transform: translateY(2px);
	}
</style>