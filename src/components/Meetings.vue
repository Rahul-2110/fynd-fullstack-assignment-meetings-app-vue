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
			<div class="container">
				<h1>Meetings</h1>
				<hr />
				<div class="meetings-container">
					<div class="tabs">
						<input
							type="radio"
							name="tabs"
							id="tabone"
							checked="checked"
						/>
						<label  @click="d_searchMeeting = true" for="tabone">Filter / Search meetings</label>
						<div class="tab">
							<search-meetings v-if="d_searchMeeting"></search-meetings>
						</div>

						<input type="radio" name="tabs" id="tabtwo" />
						<label @click="d_searchMeeting = false" for="tabtwo">Add a meeting</label>
						<div class="tab">
							<add-meeting v-if="c_addMeeting"></add-meeting>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import SearchMeetings from "@/components/SearchMeetings.vue";
	import AddMeeting from "@/components/AddMeeting.vue";
	export default {
		components: { SearchMeetings , AddMeeting },
		name: "Meetings",
		data() {
			return {
				d_status: "LOADING",
				d_searchMeeting: true
			};
		},
		computed:{
			c_addMeeting(){
				return !this.d_searchMeeting;
			}
		},
		methods: {},
		created() {
			this.d_status = "LOADED";
		}
	};
</script>

<style scoped>
	.meetings-container {
		margin: 2em 0;
	}

	.tabs {
		display: flex;
		flex-wrap: wrap;
	}

	.tabs > label {
		order: 1;
		display: block;
		padding: 1rem 0.4rem;
		margin-right: 0.1rem;
		cursor: pointer;
		font-size: 0.8em;
		transition: background ease 0.2s;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}

	.tabs .tab {
		order: 2;
		flex-grow: 1;
		width: 100%;
		display: none;
		border-top: 2px solid #ebeef0;
	}

	.tab-content {
		margin-top: 10px;
		padding: 2rem;
		width: 100%;
		background: #73c7d5;
		border-radius: 5px;
		color: #000;
	}

	.tab-content hr {
		height: 2px;
		background-color: #6bbbc8;
	}

	.tabs input[type="radio"]:checked + label[for="tabtwo"] + .tab {
		border-top-left-radius: 5px;
	}

	.tabs input[type="radio"] {
		display: none;
	}

	.tabs input[type="radio"] + label {
		margin-bottom: -2px;
		z-index: 1;
	}

	.tabs input[type="radio"]:checked + label {
		color: #1988ff;
		border-top: 2px solid #ebeef0;
		border-right: 2px solid #ebeef0;
		border-left: 2px solid #ebeef0;
		border-bottom: 2px solid #fff;
	}

	.tabs input[type="radio"]:checked + label + .tab {
		display: block;
	}

	
	.display-hidden {
		display: none;
	}

	@media (min-width: 498px) {
		.tabs > label {
			padding: 1rem 2rem;
			margin-right: 0.2rem;
			font-size: 0.9em;
		}
	}

	@media (min-width: 768px) {
		.tabs > label {
			padding: 1rem 2rem;
			margin-right: 0.2rem;
			font-size: 1em;
		}
	}
</style>