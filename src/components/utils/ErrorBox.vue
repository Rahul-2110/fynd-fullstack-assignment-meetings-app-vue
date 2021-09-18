<template>
	<div class="flex-center position-r full-height">
		<div class="code">{{ status }}</div>

		<div class="message" style="padding: 10px">{{ message }}</div>
	</div>
</template>

<script>
	export default {
		name: "ErrorBox",
		props: {
			status: {
				type: Number,
				required: true
			},
			message: {
				type: String,
				required: true
			},
		},
	};
</script>

<style scoped>
	.full-height {
		height: 100vh;
	}

	.flex-center {
		align-items: center;
		display: flex;
		justify-content: center;
	}

	.position-r {
		position: relative;
	}

	.code {
		color: #73c7d5;
		border-right: 3px solid #73c7d5;
		font-size: 55px;
		padding: 0 10px 0 10px;
		text-align: center;
	}

	.message {
		color: #73c7d5;
		font-size: 40px;
		text-align: center;
	}
</style>