<template>
	<div v-bind:class="{'hide-overflow': d_addTeam }">
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
							:p_registeredUsers="d_registeredUsers"
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
					:p_registeredUsers="d_registeredUsers"
					:p_myTeams="d_myTeams"
				></add-team>
			</div>
		</template>
	</div>
</template>

<script>
	import { s_users_getAllRegisteredUsers } from "@/services/userManagementServices.js";
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
				d_registeredUsers: [],
				d_addTeam: false,
			};
		},
		methods: {
			async m_getAllUsers() {
				try {
					const response = await s_users_getAllRegisteredUsers();
					this.d_registeredUsers = response;
				} catch (err) {
					this.d_status = "ERROR";
					this.d_error = err;
				}
			},
			async m_getMyTeams() {
				try {
					const response = await s_teams_getMyTeams();
					console.log(response);
					this.d_myTeams = response;
				} catch (err) {
					this.d_status = "ERROR";
					this.d_error = err;
				}
			},
			async m_addMemberToTeam(teamId, userId) {
				try {
					this.d_status = "LOADING";
					const response = await s_teams_addMemberToTeam(teamId, userId);
					console.log(response);
					this.m_getMyTeams();
					this.d_status ="LOADED";
				} catch (err) {
					this.d_status = "ERROR";
					this.d_error = err;
				}
			},
			async m_excuseYourselfFromTeam(teamId) {
				try {
					this.d_status = "LOADING";
					const response = await s_teams_excuseYourselfFromMeeting(
						teamId
					);
					console.log(response);
					this.m_getMyTeams();
					this.d_status ="LOADED";
				} catch (err) {
					console.log(err);
					this.d_status = "ERROR";
					this.d_error = err;
				}
			},
			async m_addTeam(name, shortName, description, members) {
				try {
					this.d_addTeam = false;
					this.d_status = "LOADING";
					const response = await s_teams_addTeam(
						name,
						shortName,
						description,
						members
					);
					console.log(response);
					this.m_getMyTeams();
					this.d_status ="LOADED";
				} catch (err) {
					console.log(err);
					this.d_status = "ERROR";
					this.d_error = err;
				}
			},
		},
		async created() {
			await this.m_getMyTeams();
			await this.m_getAllUsers();
			this.d_status = "LOADED";
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

	.hide-overflow{
		overflow: hidden;
	}
</style>