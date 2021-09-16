<template>
	<div class="time">
		<div :style="hoursAngle" class="hours"></div>
		<div :style="minutesAngle" class="minutes"></div>
		<div :style="secodsAngle" class="seconds"></div>
	</div>
</template>

<script>
	export default {
		name: "ClockSpinner",
		data() {
			return {
				Seconds: (new Date().getSeconds() * 360) / 60,
				Minutes: (new Date().getMinutes() * 360) / 60,
				Hours: (new Date().getHours() * 360) / 12,
			};
		},
        computed:{
            secodsAngle: function(){
                return{
                    transform: 'rotate(' + this.Seconds + 'deg)' 
                }
            },
            minutesAngle: function(){
                return{
                     transform: 'rotate(' + this.Minutes + 'deg)'
                }
            },
            hoursAngle: function(){
                return{
                     transform: 'rotate(' + this.Hours + 'deg)'
                }
            }
        },
		mounted() {
			setInterval(() => {
				this.startSpinner()
			}, 500);
		},
		methods: {
			startSpinner() {
				const currentdate = new Date();
				this.Seconds = (currentdate.getSeconds() * 360) / 60;
				this.Minutes = (currentdate.getMinutes() * 360) / 60;
				this.Hours = (currentdate.getHours() * 360) / 12;
			}
		},
	};
</script>

<style scoped>
	.time {
		left: 50%;
		margin-left: -64px;
		position: relative;
		width: 128px;
		height: 128px;
		border: 2px solid #374140;
		border-radius: 50%;
		box-sizing: border-box;
	}

	.time div {
		position: absolute;
		border-radius: 3px;
		background-color: #d9cb9e;
		transform-origin: 50% 100%;
		transition: all 1s ease-in-out;
	}

	.hours {
		height: 58px;
		width: 1px;
		left: 50%;
		top: 6px;
	}

	.minutes {
		height: 58px;
		width: 1px;
		left: 50%;
		top: 6px;
	}

	.seconds {
		height: 58px;
		width: 1px;
		top: 6px;
		left: 50%;
	}
</style>