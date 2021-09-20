import VueRouter from 'vue-router';

import AppCalendar from '@/components/Calendar.vue';
import AppMeetings from '@/components/Meetings.vue';
import AppTeams from '@/components/Teams.vue';
import AppLogin from '@/components/Login.vue';
import SignUp from '@/components/SignUp.vue';
import BaseView from '@/views/BaseView.vue';

const router = new VueRouter({
    mode: 'history',
    routes:[
        {
            name: 'login',
            path: '/login',
            component: AppLogin
        },
        {
            name: 'signup',
            path: '/signup',
            component: SignUp
        },
        {
            path: '/',
            component: BaseView,
            children:[
                {
                    name: 'calendar',
                    path: '/calendar',
                    component: AppCalendar
                },
                {
                    name: 'meetings',
                    path: '/meetings',
                    component: AppMeetings
                },
                {
                    name: 'teams',
                    path: '/teams',
                    component: AppTeams
                }
            ]

        }
        

    ]
}
)

export default router;