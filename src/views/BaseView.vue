<template>
	<div>
		<app-navbar />
		<div class="router-view">
			<router-view></router-view>
		</div>
		<app-footer />
	</div>
</template>

<script>
	import Navbar from "@/components/Navbar.vue";
	import Footer from "@/components/Footer.vue";
	export default {
		name: "BaseView",
		components: {
			AppNavbar: Navbar,
			AppFooter: Footer
		},
	};
</script>

<style>
	.container {
		margin: 120px 2em 50px 2em;
	}

	hr {
		background-color: #b7bcbd;
		height: 1px;
		border: 0;
		margin: 2px 0;
	}

	h3 {
		font-size: 1.3em;
	}
	@media (min-width: 768px) {
		.container {
			margin: 100px 3em 50px  3em;
		}
	}
</style>
