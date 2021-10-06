<template>
	<div>
		<template v-if="d_alert_status === true">
			<app-alert
				:type="d_alert.type"
				:message="d_alert.message"
				v-on:e_Alert_clearAlert="m_removeAlert"
			></app-alert>
		</template>
		<div class="tab-content">
			<h3>Add a new meeting</h3>
			<hr />
			<div class="add-meeting-form">
				<div class="add-meeting-form-group">
					<label
						for="add-meeting-name"
						class="add-meeting-form-group-label"
						>Meeting's Name</label
					>
					<input
						name="add-meeting-name"
						type="text"
						placeholder="Name for meeting"
						v-model="d_meetingName"
					/>
				</div>
				<div class="add-meeting-form-group">
					<label
						for="add-meeting-date"
						class="add-meeting-form-group-label"
						>Date</label
					>
					<input
						name="add-meeting-date"
						class="datepicker-input"
						type="date"
						v-model="d_meetingDate"
					/>
				</div>
				<div class="add-meeting-form-group">
					<label
						for="meeting-start-time"
						class="add-meeting-form-group-label"
						>Start time (hh:mm)
					</label>
					<select
						class="meeting-start-time-hr"
						v-model="d_meetingStartTimeHr"
					>
						<option v-for="i in 24" :key="i" :value="i - 1">
							{{ i - 1 }}
						</option>
					</select>
					<span> : </span>
					<select
						class="meeting-start-time-min"
						v-model="d_meetingStartTimeMin"
					>
						<option v-for="i in 60" :key="i" :value="i - 1">
							{{ i - 1 }}
						</option>
					</select>
				</div>
				<div class="add-meeting-form-group">
					<label
						for="meeting-end-time"
						class="add-meeting-form-group-label"
						>End time (hh:mm)</label
					>
					<select
						class="meeting-end-time-hr"
						v-model="d_meetingEndTimeHr"
					>
						<option v-for="i in 24" :key="i" :value="i - 1">
							{{ i - 1 }}
						</option>
					</select>
					<span> : </span>
					<select
						class="meeting-start-time-min"
						v-model="d_meetingEndTimeMin"
					>
						<option v-for="i in 60" :key="i" :value="i - 1">
							{{ i - 1 }}
						</option>
					</select>
				</div>
				<div class="add-meeting-form-group">
					<label
						for="add-meeting-description"
						class="add-meeting-form-group-label"
						>Description</label
					>
					<textarea
						name="add-meeting-description"
						rows="1"
						cols="40"
						minlength="10"
						placeholder="Search using words which describe a meeting"
						v-model="d_meetingDescription"
					></textarea>
				</div>
				<div class="add-meeting-form-group">
					<label
						for="add-meeting-members"
						class="add-meeting-form-group-label"
						>EmailIDs of attendees, or team's short</label
					>
					<input
						name="add-meeting-members"
						type="text"
						placeholder="john@exapmle.com, @annual-day, mark@exapmle.com"
						v-model="d_meetingAttendees"
					/>
					<p class="add-meeting-members-subtext">
						Seperate emailids / team short names by commas - team
						short names always begings with @
					</p>
				</div>
				<button @click="m_addMeeting" class="add-meeting-btn">
					Add meeting
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import { s_teams_getMyTeams } from "@/services/teamsServices.js";
	import { s_meetings_addMeeting } from "@/services/meetingsServices.js";
	export default {
		name: "AddMeeting",
		data() {
			return {
				d_status: "LOADING",
				d_meetingName: "",
				d_meetingDate: new Date().toISOString().substr(0, 10),
				d_meetingStartTimeHr: 0,
				d_meetingStartTimeMin: 0,
				d_meetingEndTimeHr: 0,
				d_meetingEndTimeMin: 0,
				d_meetingDescription: "",
				d_meetingAttendees: "",
				d_myTeams: [],
				d_error: "",
				d_alert_status: false,
				d_alert: null,
			};
		},
		computed: {
			...mapState({
				s_registeredUsers: (state) => state.users.registeredUsers,
			}),
		},
		props: {},
		methods: {
			async m_getMyTeams() {
				try {
					const response = await s_teams_getMyTeams();
					this.d_myTeams = response;
				} catch (err) {
					this.d_alert = {
						type: "danger",
						message: "Something went wrong",
					};

					this.d_alert_status = true;
					//this.d_status = "ERROR";
					this.d_error = err;
				}
			},
			async m_addMeeting() {
				try {
					if (this.d_meetingName !== "") {
						if (
							new Date() <
							new Date(this.d_meetingDate).setHours(
								this.d_meetingStartTimeHr,
								this.d_meetingStartTimeMin
							)
						) {
							if (
								this.d_meetingStartTimeHr +
									this.d_meetingStartTimeMin / 60 <
								this.d_meetingEndTimeHr +
									this.d_meetingEndTimeMin / 60
							) {
								if (this.d_meetingDescription.length > 0) {
									let participantsToAdd =
										this.d_meetingAttendees.split(",");
									let usersToAddObjectList = [];
									participantsToAdd.forEach((participantName) => {
										const trimmedParticipantName =
											participantName.trim();
										if (trimmedParticipantName[0] === "@") {
											const teamToAdd = this.d_myTeams.find(
												(value) => {
													return (
														value.shortName ===
														trimmedParticipantName.slice(
															1
														)
													);
												}
											);

											if (teamToAdd === undefined) {
												this.d_alert = {
													type: "warning",
													message:
														"Wrong Team Short Name",
												};

												this.d_alert_status = true;
											} else {
												teamToAdd.members.forEach(
													(user) => {
														usersToAddObjectList.push({
															email: user.email,
															value: user.userId,
														});
													}
												);
												// usersToAddObjectList.concat(
												// 	teamToAdd.members
												// );
											}
										} else {
											const userToAdd =
												this.s_registeredUsers.find(
													(value) => {
														return (
															value.email ==
															trimmedParticipantName
														);
													}
												);

											if (userToAdd === undefined) {
												if (
													trimmedParticipantName.length >
													1
												) {
													this.d_alert = {
														type: "warning",
														message: "Wrong Email ID",
													};

													this.d_alert_status = true;
												}
											} else {
												usersToAddObjectList.push({
													email: userToAdd.email,
													userId: userToAdd._id.toString(),
												});
											}
										}
									});

									const startTime = {
										hours: this.d_meetingStartTimeHr,
										minutes: this.d_meetingStartTimeMin,
									};
									const endTime = {
										hours: this.d_meetingEndTimeHr,
										minutes: this.d_meetingEndTimeMin,
									};

									await s_meetings_addMeeting(
										this.d_meetingName,
										this.d_meetingDescription,
										new Date(this.d_meetingDate)
											.toISOString()
											.substr(0, 10),
										startTime,
										endTime,
										usersToAddObjectList
									);
								} else {
									this.d_alert = {
										type: "warning",
										message: "Invalid Description",
									};

									this.d_alert_status = true;
								}
							} else {
								this.d_alert = {
									type: "warning",
									message: "Invalid End Time",
								};

								this.d_alert_status = true;
							}
						} else {
							this.d_alert = {
								type: "warning",
								message: "Invalid Meeting Start Time and Date",
							};

							this.d_alert_status = true;
						}
					} else {
						this.d_alert = {
							type: "warning",
							message: "Invalid Meeting Name",
						};

						this.d_alert_status = true;
					}
				} catch (err) {
					this.d_alert = {
						type: "danger",
						message: "Something went wrong",
					};

					this.d_alert_status = true;
					console.log(err);
				}
			},
			m_removeAlert() {
				this.d_alert_status = false;
				this.d_alert = null;
			},
		},
		async created() {
			await this.m_getMyTeams();
			this.d_status = "LOADED";
		},
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


	.add-meeting-btn {
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

	.add-meeting-form {
		margin: 20px 0;
	}

	.add-meeting-form-group {
		margin: 25px 0;
	}

	.add-meeting-form-group-label {
		display: block;
		margin: 10px 0;
	}

	.add-meeting-form-group textarea,
	.add-meeting-form-group input {
		padding: 0.5em;
		width: 100%;
		outline: none;
		border-radius: 5px;
		border: none;
	}

	.add-meeting-form-group textarea {
		height: 4em;
	}

	.add-meeting-form-group select {
		padding: 0.5em;
		outline: none;
		border-radius: 5px;
		border: none;
	}

	.add-meeting-members-subtext {
		font-size: 0.7em;
	}

	.add-meeting-btn:active {
		transform: translateY(4px);
	}
</style>