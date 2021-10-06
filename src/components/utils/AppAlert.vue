<template>
	<div class="alert" :class="`alert--${type}`">
		<p>{{ message }}</p>
		<button @click="hide" class="alert__button">
			<div class="crosss-bar one"></div>
			<div class="crosss-bar two"></div>
		</button>
	</div>
</template>

<script>
    import AppConfig from '@/config';
    const { alertDuration } = AppConfig;
	export default {
		name: "AppAlert",
		props: {
			message: String,
			type: String,
		},

		template: "",
		methods: {
			hide() {
                this.$emit("e_Alert_clearAlert");
			},
		},
        created(){
            setTimeout(() => this.hide(), alertDuration);   
        }
	};
</script>

<style scoped>
	.alert {
		z-index: 3;
        display: flex;
        flex-direction: row;
        position: fixed;
        transform: translate(-50%, -50%);
        justify-content: space-between;
        align-items: center;
        top: 20vh;
        left: 50vw;
		padding: 10px 30px;
		border-radius: 5px;
		font-size: 1.4rem;
        min-width: 400px;
	}

	.alert .alert__button {
        grid-template-columns: auto;
		cursor: pointer;
		transition: all 0.3s;
		order: 1;
		display: grid;
	}

    
	.crosss-bar {
		height: 1px;
		width: 12px;
		transition: 0.5s;
	}

    .one {
		transform: translateY(6.5px) rotate(45deg);
	}

	.two {
		transform: translateY(-6.5px) rotate(-45deg);
	}

	.alert--success {
		color: #155724;
		background-color: #d4edda;
	}
	.alert--success .alert__button {
		background-color: #155724;
	}
	.alert--warning {
		color: #856404;
		background-color: #fff3cd;
	}
	.alert--warning .alert__button {
		background-color: #856404;
	}
	.alert--danger {
		color: #721c24;
		background-color: #f8d7da;
	}
	.alert--danger .alert__button {
		background-color: #721c24;
	}
	.alert__button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 15px;
		height: 15px;
		margin-left: 10px;
		padding: 0;
		border: 0;
		border-radius: 50px;
		opacity: 0.6;
		cursor: pointer;
		font-size: 1.2rem;
	}
	.alert__close {
		width: 5px;
	}
</style>


// success: "alert--success",
// warning: "alert--warning",
// danger: "alert--danger"