<template>
	<div>
		<template v-if="d_alertstatus === true">
			<app-alert
				:type="d_alert.type"
				:message="d_alert.message"
				v-on:e_Alert_clearAlert="m_removeAlert"
			></app-alert>
		</template>
		<div class="add-team-form-container display-hidden">
			<h3>Create Team</h3>
			<div class="add-team-form">
				<div class="add-team-form-group">
					<label for="team-name" class="add-team-form-group-label"
						>Name</label
					>
					<input
						name="team-name"
						type="text"
						placeholder="Name for team"
						v-model="d_name"
					/>
				</div>
				<div class="add-team-form-group">
					<label
						for="team-short-name"
						class="add-team-form-group-label"
						>Short Name</label
					>
					<input
						name="team-short-name"
						type="text"
						placeholder="Short name for team"
						v-model="d_shortName"
					/>
				</div>
				<div class="add-team-form-group">
					<label
						for="team-desctiption"
						class="add-team-form-group-label"
						>Description</label
					>
					<textarea
						name="team-desctiption"
						rows="1"
						cols="40"
						minlength="10"
						placeholder="Short description for team"
						v-model="d_description"
					></textarea>
				</div>
				<div class="add-team-form-group">
					<p class="team-members">
						<span class="team-members-head">Add Members</span>:
					</p>
					<div class="add-member-to-team selectdiv">
						<label>
							<select v-model="d_selectedUserId">
								<option disabled hidden selected value="">
									Select a member
								</option>
								<option
									v-for="user in s_registeredUsers"
									:key="user._id"
									:value="user._id"
								>
									{{ user.email }}
								</option>
							</select>
						</label>
						<button
							@click="m_addMemberToTeam"
							class="add-member-to-team-btn"
						>
							Add
						</button>

						<p class="selected-users">
							<span>Selected Users:</span>
							<span
								v-for="selectedUser in d_selectedUsers"
								:key="selectedUser._id"
								>{{ selectedUser.email }}</span
							>
						</p>
					</div>
				</div>

				<div
					@click="m_createMeeting"
					class="add-team-form-group add-team-btn-container"
				>
					<button class="create-team-btn">Create</button>
				</div>
			</div>
			<div @click="$emit('e_Teams_closeAddTeam')" class="close-form-icon">
				<p class="add-team-close-form">+</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		name: "AddTeam",
		props: {
			p_myTeams: {
				type: Array,
				required: true,
			},
		},
		data() {
			return {
				d_status: "LOADING",
				d_selectedUserId: "",
				d_selectedUsers: [],
				d_name: "",
				d_shortName: "",
				d_description: "",
				d_error: "",
				d_alertstatus: false,
				d_alert: null,
			};
		},
		computed: {
			...mapState({
				s_registeredUsers: (state) => state.users.registeredUsers,
			}),
		},
		methods: {
			m_addMemberToTeam() {
				const userToAdd = this.s_registeredUsers.find((value) => {
					return value._id === this.d_selectedUserId;
				});
				if (userToAdd !== undefined) {
					const userAlreadyAdded = this.d_selectedUsers.find((value) => {
						return value.userId === userToAdd._id.toString();
					});
					if (userAlreadyAdded === undefined) {
						this.d_selectedUsers.push({
							email: userToAdd.email,
							userId: userToAdd._id.toString(),
						});
					}
				}
			},
			m_createMeeting() {
				try {
					if (this.d_name !== "") {
						const meetingWithGivenShortName = this.p_myTeams.find(
							(value) => {
								return value.shortName === this.d_shortName;
							}
						);
						if (meetingWithGivenShortName === undefined) {
							if (this.d_description !== "") {
								this.$emit(
									"e_Teams_addTeam",
									this.d_name,
									this.d_shortName,
									this.d_description,
									this.d_selectedUsers
								);
							} else {
								this.d_alert = {
									type: "warning",
									message: "Invalid Team Description",
								};

								this.d_alertstatus = true;
							}
						} else {
							this.d_alert = {
								type: "warning",
								message: "Invalid Team ShortName",
							};

							this.d_alertstatus = true;
						}
					} else {
						this.d_alert = {
							type: "warning",
							message: "Invalid Team Name",
						};

						this.d_alertstatus = true;
					}
				} catch (err) {
					this.d_alert = {
						type: "danger",
						message: err.message,
					};

					this.d_alertstatus = true;
					console.log(err);
				}
			},
			m_removeAlert() {
				this.d_alertstatus = false;
				this.d_alert = null;
			},
		},
		async created() {
			this.d_status = "LOADED";
		},
	};
</script>

<style scoped>
	.add-team-form-container {
		position: fixed;
		top: 20%;
		left: 50%;
		width: 70%;
		height: 70vh;
		background-color: #18a2b8;
		color: #fff;
		border-radius: 10px;
		padding: 30px 20px;
		margin: auto;
		transform: translate(-50%, 0);
		z-index: 2;
		overflow: hidden;
		overflow-y: scroll;
	}

	.close-form-icon {
		position: absolute;
		top: -3%;
		right: 10%;
		transform: rotate(45deg);
		cursor: pointer;
	}

	.add-team-close-form {
		font-size: 3em;
	}

	.add-team-form-container h3 {
		margin: 20px 30px;
	}
	.add-team-form-group {
		margin: 20px 10px;
	}

	.add-team-form-group-label {
		display: block;
		margin: 10px 0;
		min-width: 200px;
	}
	.add-team-form-group input,
	.add-team-form-group textarea {
		width: 100%;
		outline: none;
		padding: 0.5em;
		vertical-align: middle;
		border-radius: 5px;
	}

	.add-team-form-group .add-member-to-team-btn {
		background-color: #08063e;
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

	.add-member-to-team-btn {
		border-radius: 5px;
		margin-bottom: 1em;
		color: #fff;
		border: none;
		font-size: 0.9em;
		height: 2.5em;
		margin: 5px 2px;
		padding: 0px 24px;
		line-height: 1.75;
		background-color: #18a2b8;
	}

	.add-member-to-team-btn:hover {
		opacity: 0.8;
		cursor: pointer;
	}

	.add-member-to-team-btn:active {
		transform: translateY(2px);
	}
	.add-team-btn-container {
		display: flex;
		justify-content: center;
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

	.selected-users span::after {
		content: ", ";
	}

	.selected-users span:first-child::after {
		content: " ";
	}

	.selected-users span:last-child::after {
		content: "";
	}

	.create-team-btn:hover {
		opacity: 0.8;
	}

	.create-team-btn:active {
		transform: translateY(2px);
	}

	@media (min-width: 768px) {
		.add-team-form-group-label {
			display: inline-block;
			margin: 10px 0;
		}

		.add-team-form-group {
			margin: 20px 30px;
		}

		.add-team-form-group input,
		.add-team-form-group textarea {
			width: auto;
		}

		.add-team-form-container {
			top: 20%;
		}

		.add-team-btn-container {
			justify-content: flex-start;
		}
	}
</style>