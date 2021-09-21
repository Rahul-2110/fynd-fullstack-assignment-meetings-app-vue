<template>
	<form class="form-signin">
		<div class="title">
			<span class="main-title text-uppercase text-center">Meetings</span>
			<p class="subtitle text-center"><span class="by">By</span> Rahul</p>
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
		<div class="form-group subform">
			<label class="checkbox-inline" for="UserRememberMe">
				<input
					type="checkbox"
					name="rememberMe"
					value="1"
					id="UserRememberMe"
				/>Remember me
			</label>
			<a href="#" class="resetpassword">Reset Password</a>
		</div>
		<button @click.prevent="m_login" class="login-form-btn">Login</button>
		<div class="form-group text-center">
			<router-link to="/signup"
				><p class="login-form-type">
					Sign Up
				</p></router-link
			>
		</div>
	</form>
</template>

<script>
	import router from "@/router/routes.js";
	export default {
		name: "Login",
		router,
		data() {
			return {
				d_email: null,
				d_password: null,
				d_emailReg:
					/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
				d_passwordReg: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])/,
			};
		},
		methods: {
			async m_validate() {
				try {
					await this.$store.dispatch( 'auth/login', {email: this.d_email, password: this.d_password});
					await this.$store.dispatch( 'users/getRegisteredUsers');
					this.$router.push({ path: "/calendar" });
				} catch (error) {
					console.log("There was some error\n" + error.message);
				}
			},
			m_login() {
				if (this.d_email != null && this.d_emailReg.test(this.d_email)) {
					if (
						this.d_password != null &&
						this.d_passwordReg.test(this.d_password)
					) {
						this.m_validate();
					} else {
						console.log("Check password");
					}
				} else {
					console.log("Check email address");
				}
			},
		},
	};
</script>

<style scoped>
	.form-signin {
		display: flex;
		flex-direction: column;
		max-width: 500px;
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

	.subform {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15px;
		align-items: center;
	}

	.checkbox-inline {
		position: relative;
		padding-left: 20px;
		margin-bottom: 0;
		vertical-align: middle;
		cursor: pointer;
		font-size: 16px;
	}

	.checkbox-inline input[type="checkbox"] {
		position: absolute;
		margin-left: -20px;
	}

	.resetpassword {
		color: #a6a6a6;
		font-weight: 400;
		text-decoration: none;
		font-size: 13px;
		margin-left: 20px;
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

	a{
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
