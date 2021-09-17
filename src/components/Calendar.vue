<template>
	<div>
		<template v-if="status === 'LOADING'">
			<CircleSpinner />
		</template>
		<template v-else-if="status === 'LOADED'">
			<div class="container">
				<h1>Calendar</h1>
				<hr />
				<div class="calendar-container">
					<div class="date-details-container">
						<div class="date-day">
							<h3 id="selected-date">
								{{ selectedDateReadableFormat }}
							</h3>
							<p id="selected-week-day">{{ selectedDay }}</p>
						</div>
						<div class="date-picker">
							<input
								v-model="selectedDate"
								class="datepicker-input"
								type="date"
								@change="getMeetings"
							/>
						</div>
					</div>
				</div>
				<div class="calender-time-container">
					<div class="meetings-list">
						<div
							v-for="meeting in meetings"
							:key="meeting._id"
							class="meeting"
							:style="{
								top: meetingsPosition[meeting._id].top + 'px',
								height:
									meetingsPosition[meeting._id].height +
									'px',
							}"
						>
							<div class="meeting-details">
								<p class="meeting-heading">
									{{ meeting.name }}
								</p>
								<hr />
								<span p class="meeting-attendees">
									Attendees :
									<span
										v-for="attendee in meeting.attendees"
										:key="attendee.userId"
									>
										{{ attendee.email }}</span
									>
								</span>
							</div>
						</div>
					</div>
					<div class="hours-list">
						<div class="hour" v-for="i in 24" :key="i">
							<p class="time">{{ i - 1 }}</p>
							<div class="hour-bar"></div>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import { getMeetingsOnADate } from "@/services/calendarServices.js";

	export default {
		name: "Calendar",
		data() {
			return {
				status: "LOADED",
				meetings: [],
				error: null,
				selectedDate: new Date().toISOString().substr(0, 10),
			};
		},
		computed: {
			selectedDateReadableFormat() {
				let date = new Date(this.selectedDate);
				const Months = [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				];
				return (
					date.getDate() +
					" " +
					Months[date.getMonth()] +
					" " +
					date.getFullYear()
				);
				//return this.selectedDate;
			},
			selectedDay() {
				let date = new Date(this.selectedDate);
				const WeekDays = [
					"Sunday",
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday",
				];
				return WeekDays[date.getDay()];
			},
			meetingsPosition() {
				let positions = {};
				this.meetings.forEach(function(value){
					const startTimeInNumbers =
						value.startTime.hours + value.startTime.minutes / 60;
					const endTimeInNumbers =
						value.endTime.hours + value.endTime.minutes / 60;
					let top = 64 * startTimeInNumbers + 2;
					let height =
						(endTimeInNumbers - startTimeInNumbers) * 60 -
						4 +
						(Math.floor(endTimeInNumbers) -
							Math.floor(startTimeInNumbers)) *
							4;
					let position = { top: top, height: height };
					positions[value._id] = position;
				});
				return positions;
			},
		},
		methods: {
			async getMeetings() {
				try {
					const response = await getMeetingsOnADate(
						new Date(this.selectedDate).toISOString().split("T")[0]
					);
					this.meetings = response;
				} catch (error) {
					this.error = error;
				}
			},
		},
		created() {
			this.getMeetings();
		}
	};
</script>

<style scoped>
	.date-details-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.date-picker input {
		width: 50px;
	}

	.calender-time-container {
		position: relative;
	}

	.hour {
		display: flex;
		position: relative;
		margin: 4px 0;
	}
	.hour:nth-child(1) {
		margin-top: 0;
	}

	.time {
		position: absolute;
		display: inline-block;
		margin-left: -20px;
		margin-top: -5px;
	}

	.hour-bar {
		height: 60px;
		width: 100%;
		background-color: #73c7d5;
	}

	.meetings-list {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.meeting {
		opacity: 0.9;
		border-radius: 2px;
		border: 2px solid #b7bcbd;
		width: 97%;
		background-color: #f8f9fa;
		z-index: 1;
		position: absolute;
	}

	.meeting hr {
		background-color: #b7bcbd;
		height: 1px;
		border: 0;
		margin: 2px 0;
	}

	.meeting-details {
		padding: 2px 10px;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.meeting-heading {
		display: block;
		font-weight: bold;
		margin: 2px;
		line-height: 19px;
		font-size: 0.9em;
	}

	.meeting-attendees {
		display: block;
		margin: 1px;
		line-height: 18px;
		font-size: 0.9em;
		overflow: hidden;
	}

	.meeting-attendees span::after {
		content: ",";
	}

	.meeting-attendees span:last-child::after {
		content: "";
	}

	.date-picker input {
		outline: none;
		border: 1px solid rgb(167, 167, 167);
		border-radius: 5px;
	}

	@media (min-width: 768px) {
		.date-picker input {
			width: 200px;
			padding: 0.5em;
		}
	}
</style>
    
