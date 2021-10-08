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
		<template v-else>
			<template v-if="d_alert_status === true">
				<app-alert
					:type="d_alert.type"
					:message="d_alert.message"
					v-on:e_Alert_clearAlert="m_removeAlert"
				></app-alert>
			</template>
			<form class="form-signin">
				<div class="title">
					<span class="main-title text-uppercase text-center"
						>Meetings</span
					>
					<p class="subtitle text-center">
						<span class="by">By</span> Rahul
					</p>
				</div>
				<div class="form-group">
					<input
						name="name"
						class="form-control"
						placeholder="Name"
						autofocus="autofocus"
						type="text"
						v-model="d_name"
					/>
				</div>
				<div class="form-group">
					<input
						name="email"
						class="form-control"
						placeholder="Email"
						autofocus="autofocus"
						type="text"
						v-model="d_email"
					/>
				</div>
				<div class="form-group">
					<input
						name="password"
						class="form-control"
						placeholder="Password"
						type="password"
						v-model="d_password"
					/>
				</div>
				<div class="form-group">
					<input
						name="password"
						class="form-control"
						placeholder="Confirm Password"
						type="password"
						v-model="d_confirmPassword"
					/>
				</div>
				<button
					@click.prevent="m_validateAndRegister"
					class="login-form-btn"
				>
					Register
				</button>
				<div class="form-group text-center">
					<router-link to="/login"
						><p class="login-form-type">Login</p></router-link
					>
				</div>
			</form>
		</template>
	</div>
</template>

<script>
	import { s_users_meetingsRegister } from "@/services/userManagementServices.js";
	import router from "@/router/routes.js";
	export default {
		name: "signup",
		router,
		data() {
			return {
				d_email: "",
				d_password: "",
				d_emailReg:
					/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
				d_passwordReg: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])/,
				d_confirmPassword: "",
				d_name: "",
				d_status: "LOADING",
				d_alert_status: false,
				d_alert: null,
				d_error: null,
			};
		},
		methods: {
			async m_regiterUser() {
				try {
					const data = await s_users_meetingsRegister(
						this.d_name,
						this.d_email,
						this.d_password
					);
					this.d_alert = {
						type: "success",
						message: "Account created",
					};

					this.d_alert_status = true;
					this.d_status = "LOADED";
				} catch (error) {
					this.d_alert = {
						type: "danger",
						message: error.message
					};

					this.d_alert_status = true;
					this.d_status = "LOADED";
					console.log("There was some error\n" + error.message);
				}
			},
			m_validateAndRegister() {
				try {
					if (this.d_name != "") {
						if (
							this.d_email != "" &&
							this.d_emailReg.test(this.d_email)
						) {
							if (
								this.d_password != null &&
								this.d_passwordReg.test(this.d_password)
							) {
								if (this.d_password === this.d_confirmPassword) {
									this.m_regiterUser();
								} else {
									this.d_alert = {
										type: "warning",
										message: "Passwords don't match",
										value: this.d_password,
									};

									this.d_alert_status = true;
								}
							} else {
								this.d_alert = {
									type: "warning",
									message: "Password should containg a Capital letter, number and a symbol",
									value: this.d_password,
								};

								this.d_alert_status = true;
							}
						} else {
							this.d_alert = {
								type: "warning",
								message: "Invalid EmailID",
								value: this.d_password,
							};

							this.d_alert_status = true;
						}
					} else {
						this.d_alert = {
							type: "warning",
							message: "Invalid Name",
							value: this.d_password,
						};

						this.d_alert_status = true;
					}
				} catch (err) {
					this.d_alert = {
						type: "danger",
						message: "Something went wrong",
						value: this.d_password,
					};

					this.d_alert_status = true;

					console.log(err);
				}
			},
			m_removeAlert() {
				this.d_alert_status = false;
				this.d_alert = null;
				this.$router.push({ path: "/login" });
			},
		},
		created() {
			this.d_status = "LOADED";
		},
	};
</script>

<style scoped>
	.form-signin {
		display: flex;
		flex-direction: column;
		max-width: 400px;
		padding: 15px;
		margin: 6em auto;
		color: #73c7d5;
	}

	.form-signin .title {
		display: flex;
		flex-direction: column;
		font-size: 25px;
		font-weight: 700;
		letter-spacing: 0.5px;
		color: #73c7d5;
	}

	.title .subtitle {
		font-size: 17px;
		font-weight: 400;
		letter-spacing: 0.5px;
		margin: 7px 0 40px;
	}

	.form-signin .subtitle .by {
		color: #aaa;
	}

	.form-group {
		margin-bottom: 15px;
	}

	.form-control {
		box-shadow: none;
		display: block;
		width: 100%;
		height: 34px;
		padding: 6px 12px;
		font-size: 14px;
		line-height: 1.42857143;
		color: #555;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 4px;
		/*     box-shadow: inset 0 1px 1px rgba(0,0,0,0.075); */
		transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
		transition-property: border-color, box-shadow;
		transition-duration: 0.15s, 0.15s;
		transition-timing-function: ease-in-out, ease-in-out;
		transition-delay: 0s, 0s;
	}

	::placeholder {
		color: #a6a6a6;
		letter-spacing: 1.2px;
		font-size: 13px;
		font-weight: 400;
	}

	.form-control:focus {
		border-color: #73c7d5;
		outline: 0;
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
			0 0 8px rgba(102, 175, 233, 0.6);
	}
	.login-form-btn {
		margin-top: 2em;
		width: 100%;
		cursor: pointer;
		outline: none;
		padding: 10px 1em;
		text-align: center;
		border-style: none;
		border-radius: 20px;
		color: #fff;
		background-color: #73c7d5;
		font-size: 16px;
		line-height: 20px;
		transition: all 0.3s;
		font-weight: 400;
		letter-spacing: 1px;
	}

	.login-form-btn:hover {
		background-color: #18a2b8;
	}

	.login-form-type {
		color: #73c7d5;
		cursor: pointer;
		margin-top: 2em;
	}

	.login-form-type:hover {
		text-decoration: underline;
	}

	a {
		text-decoration: none;
	}

	.login-form-type:hover {
		color: #4a8ad9;
	}

	.text-uppercase {
		text-transform: uppercase;
	}

	.text-center {
		text-align: center;
	}
</style>
