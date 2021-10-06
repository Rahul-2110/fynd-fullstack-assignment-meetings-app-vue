import VueRouter from "vue-router";
import store from "@/stores";
import AppCalendar from "@/components/Calendar.vue";
import AppMeetings from "@/components/Meetings.vue";
import AppTeams from "@/components/Teams.vue";
import AppLogin from "@/components/Login.vue";
import SignUp from "@/components/SignUp.vue";
import BaseView from "@/views/BaseView.vue";

const router = new VueRouter({
	mode: "history",
	routes: [
		{
			name: "login",
			path: "/login",
			component: AppLogin,
			meta: {
				title: "Meetings - Login",
				metaTags: [
					{
						name: "Login Page",
						content: "Login page for Meetings App.",
					},
					{
						property: "og:description",
						content: "Login page for Meetings App.",
					},
				],
			},
		},
		{
			name: "signup",
			path: "/signup",
			component: SignUp,
            meta: {
				title: "Meetings - SignUp",
				metaTags: [
					{
						name: "SignUp Page",
						content: "SignUp page for Meetings App.",
					},
					{
						property: "og:description",
						content: "SignUp page for Meetings App.",
					},
				],
			}
		},
		{
			path: "/",
			component: BaseView,
			children: [
				{
					name: "calendar",
					path: "/calendar",
					component: AppCalendar,
                    meta: {
                        title: "Meetings - Calender",
                        metaTags: [
                            {
                                name: "Calender Page",
                                content: "Calender with your meetings.",
                            },
                            {
                                property: "og:description",
                                content: "Calender with your meetings.",
                            },
                        ],
                    }
				},
				{
					name: "meetings",
					path: "/meetings",
					component: AppMeetings,
                    meta: {
                        title: "Meetings - Meetings",
                        metaTags: [
                            {
                                name: "Meetings Page",
                                content: "Add and update your Meetings.",
                            },
                            {
                                property: "og:description",
                                content: "Add and update your Meetings.",
                            },
                        ],
                    }
				},
				{
					name: "teams",
					path: "/teams",
					component: AppTeams,
                    meta: {
                        title: "Meetings - Teams",
                        metaTags: [
                            {
                                name: "Teams Page",
                                content: "Add and update your Teams.",
                            },
                            {
                                property: "og:description",
                                content: "Add and update your Teams.",
                            },
                        ],
                    }
				},
			],
		},
	],
});

router.beforeEach((to, from, next) => {
	const isLoggedIn = store.getters["auth/isAuthenticated"];
	if (to.name !== "login" && to.name !== "signup" && !isLoggedIn) {
		next({ name: "login" });
	}
	else if(to.path === "/" && isLoggedIn){
		next({ name: "calendar" })
	} 
	else {
		const nearestWithTitle = to.matched
			.slice()
			.reverse()
			.find((r) => r.meta && r.meta.title);

		// Find the nearest route element with meta tags.
		const nearestWithMeta = to.matched
			.slice()
			.reverse()
			.find((r) => r.meta && r.meta.metaTags);

		const previousNearestWithMeta = from.matched
			.slice()
			.reverse()
			.find((r) => r.meta && r.meta.metaTags);

		// If a route with a title was found, set the document (page) title to that value.
		if (nearestWithTitle) {
			document.title = nearestWithTitle.meta.title;
		} else if (previousNearestWithMeta) {
			document.title = previousNearestWithMeta.meta.title;
		}

		// Remove any stale meta tags from the document using the key attribute we set below.
		Array.from(
			document.querySelectorAll("[data-vue-router-controlled]")
		).map((el) => el.parentNode.removeChild(el));

		// Skip rendering meta tags if there are none.
		if (!nearestWithMeta) return next();

		// Turn the meta tag definitions into actual elements in the head.
		nearestWithMeta.meta.metaTags
			.map((tagDef) => {
				const tag = document.createElement("meta");

				Object.keys(tagDef).forEach((key) => {
					tag.setAttribute(key, tagDef[key]);
				});

				// We use this to track which meta tags we create so we don't interfere with other ones.
				tag.setAttribute("data-vue-router-controlled", "");

				return tag;
			})
			// Add the meta tags to the document head.
			.forEach((tag) => document.head.appendChild(tag));

		next();
	}
});

export default router;
