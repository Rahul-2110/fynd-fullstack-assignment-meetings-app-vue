<template>
	<div>
		<template v-if="d_status === 'LOADING'">
			<CircleSpinner />
		</template>
		<template v-else-if="d_status === 'ERROR'">
			<ErrorBox :error="d_error" />
		</template>
		<template v-else>
			<template v-if="d_alertstatus === true">
				<app-alert
					:type="d_alert.type"
					:message="d_alert.message"
					v-on:e_Alert_clearAlert="m_removeAlert"
				></app-alert>
			</template>
			<div class="container">
				<h1>Teams</h1>
				<hr />
				<div class="teams-container">
					<p>View and edit teams you are part of</p>
					<div class="teams-list-container">
						<my-team
							v-for="team in d_myTeams"
							:key="team._id"
							:p_team="team"
							v-on:e_Teams_addMemberToTeam="m_addMemberToTeam"
							v-on:e_Teams_excuseYourselfFromTeam="
								m_excuseYourselfFromTeam
							"
						></my-team>

						<div class="team-add" @click="d_addTeam = true">
							<span class="team-add-sign">+</span>
						</div>
					</div>
				</div>
				<add-team
					v-on:e_Teams_addTeam="m_addTeam"
					v-on:e_Teams_closeAddTeam="d_addTeam = false"
					v-if="d_addTeam"
					:p_myTeams="d_myTeams"
				></add-team>
			</div>
		</template>
	</div>
</template>

<script>
	import {
		s_teams_getMyTeams,
		s_teams_addMemberToTeam,
		s_teams_excuseYourselfFromMeeting,
		s_teams_addTeam,
	} from "@/services/teamsServices.js";
	import Team from "@/components/Team.vue";
	import AddTeam from "@/components/AddTeam.vue";
	export default {
		name: "Teams",
		components: { MyTeam: Team, AddTeam },
		data() {
			return {
				d_status: "LOADING",
				d_myTeams: [],
				d_error: "",
				d_addTeam: false,
				d_alertstatus: false,
				d_alert: null,
			};
		},
		methods: {
			async m_getMyTeams() {
				try {
					const response = await s_teams_getMyTeams();
					// console.log(response);
					this.d_myTeams = response;
				} catch (err) {
					this.d_alert = {
						type: "danger",
						message: "Something went wrong"
					};

					this.d_alertstatus = true;
					this.d_status = "LOADED";
					this.d_error = err;
					//this.d_status = "ERROR";
				}
			},
			async m_addMemberToTeam(teamId, userId) {
				try {
					this.d_status = "LOADING";
					const response = await s_teams_addMemberToTeam(teamId, userId);
					
					// console.log(response);
					this.m_getMyTeams();
					this.d_alert = {
						type: "success",
						message: "User added to the team."
					};

					this.d_alertstatus = true;
					this.d_status = "LOADED";
				} catch (err) {
					this.d_alert = {
						type: "danger",
						message: "Something went wrong"
					};

					this.d_alertstatus = true;
					this.d_status = "LOADED";
					this.d_error = err;
					//this.d_status = "ERROR";
				}
			},
			async m_excuseYourselfFromTeam(teamId) {
				try {
					this.d_status = "LOADING";
					const response = await s_teams_excuseYourselfFromMeeting(
						teamId
					);
					this.m_getMyTeams();
					this.d_alert = {
						type: "success",
						message: "Excused yourself from the team."
					};

					this.d_alertstatus = true;
					// console.log(response);
					
					this.d_status = "LOADED";
				} catch (err) {
					this.d_alert = {
						type: "danger",
						message: "Something went wrong"
					};

					this.d_alertstatus = true;
					this.d_status = "LOADED";
					
					this.d_error = err;
					//this.d_status = "ERROR";
				}
			},
			async m_addTeam(name, shortName, description, members) {
				try {
					this.d_addTeam = false;
					this.d_status = "LOADING";
					this.m_getMyTeams();
					const response = await s_teams_addTeam(
						name,
						shortName,
						description,
						members
					);
					this.d_alert = {
						type: "success",
						message: "Team created"
					};

					this.d_alertstatus = true;
					// console.log(response);
					
					this.d_status = "LOADED";
				} catch (err) {
					this.d_alert = {
						type: "danger",
						message: "Something went wrong"
					};

					this.d_alertstatus = true;
					this.d_status = "LOADED";
					this.d_error = err;
					// this.d_status = "ERROR";
					
				}
			},
			m_removeAlert() {
				this.d_alertstatus = false;
				this.d_alert = null;
			},
		},
		async created() {
			await this.m_getMyTeams();
			this.d_status = "LOADED"
		},
	};
</script>

<style scoped>
	.teams-list-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.team-add {
		border: 1px solid rgb(167, 167, 167);
		border-radius: 5px;
		padding: 20px;
		margin-bottom: 30px;
		flex-basis: 100%;
		display: flex;
		text-align: center;
		cursor: pointer;
	}

	.team-add-sign {
		font-size: 4em;
		font-weight: 300;
		margin: auto;
	}

	.team-add-sign:active {
		transform: translateY(4px);
	}
	.create-team-btn {
		border-radius: 5px;
		margin-bottom: 1em;
		color: #fff;
		border: none;
		font-size: 0.9em;
		height: 2.5em;
		padding: 0px 24px;
		line-height: 1.75;
		background-color: #dc3545;
		cursor: pointer;
	}

	.create-team-btn:hover {
		opacity: 0.8;
	}

	.create-team-btn:active {
		transform: translateY(2px);
	}

	@media (min-width: 768px) {
		.team-add {
			flex-basis: 30%;
			min-width: 300px;
		}
	}
</style>