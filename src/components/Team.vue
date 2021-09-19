<template>
	<div class="team">
		<h3>{{ p_team.name }}</h3>
		<p class="team-tag">@{{ p_team.shortName }}</p>
		<p class="team-description">
			{{ p_team.description }}
		</p>
		<button @click="$emit(
						'e_Teams_excuseYourselfFromTeam',
						p_team._id
					)" class="excuse-from-team-btn">Excuse yourself</button>
		<hr />
		<p class="team-members-list">
			<span class="team-members-head">Members</span>:
			<span
				class="team-members"
				v-for="member in p_team.members"
				:key="member.userId"
				>{{ member.email }}</span
			>
		</p>
		<div class="add-member-to-team selectdiv">
			<label>
				<select v-model="d_selectedUserId">
					<option disabled hidden selected value="">
						Select a member
					</option>
					<option
						v-for="user in p_registeredUsers"
						:key="user._id"
						:value="user._id"
					>
						{{ user.email }}
					</option>
				</select>
			</label>
			<button @click="$emit(
						'e_Teams_addMemberToTeam',
						p_team._id,
						d_selectedUserId
					)" class="add-member-to-team-btn">Add</button>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: "Team",
		props: {
			p_team: {
				type: Object,
				required: true
			},
			p_registeredUsers: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				d_status: "LOADING",
				d_selectedUserId: "",
				d_error: "",
			};
		},
		methods: {
			
		},
		async created() {
			this.d_status = "LOADED";
		},
	};
</script>

<style scoped>
	.team {
		border: 1px solid rgb(167, 167, 167);
		border-radius: 5px;
		padding: 20px;
		margin-bottom: 30px;
		flex-basis: 100%;
	}

	.team-empty {
		border: none;
	}
	.team-tag {
		font-size: 1em;
		font-weight: 600;
	}

	.excuse-from-team-btn {
		font-size: 0.9em;
		padding: 10px 15px;
		border-radius: 5px;
		margin-bottom: 1em;
		background-color: #dc3545;
		color: #fff;
		border: none;
	}
	.excuse-from-team-btn:hover {
		opacity: 0.8;
		cursor: pointer;
	}

	.excuse-from-team-btn:active {
		transform: translateY(2px);
	}
	.team-members-list{
		max-height: 40px;
		overflow: scroll;
		cursor: pointer;
	}
	.team-members::after {
		content: ", ";
	}

	.team-members:last-child::after {
		content: "";
	}

	.team-members-head {
		font-size: 1em;
		font-weight: 600;
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

	

	@media (min-width: 768px) {
		.team {
			flex-basis: 30%;
			min-width: 300px;
		}
	}
</style>