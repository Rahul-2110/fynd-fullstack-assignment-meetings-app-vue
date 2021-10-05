import Vue from 'vue';
import '@/services/configureAxios';
import Router from 'vue-router';
import '@fortawesome/fontawesome-free/css/all.min.css';

import ClockSpinner from '@/components/utils/ClockSpinner';
import CircleSpinner from '@/components/utils/CircleSpinner';
import ErrorBox from '@/components/utils/ErrorBox';
import AppAlert from '@/components/utils/AppAlert';


Vue.component( 'ClockSpinner', ClockSpinner );
Vue.component( 'CircleSpinner', CircleSpinner );
Vue.component( 'ErrorBox', ErrorBox );
Vue.component( 'AppAlert', AppAlert);
Vue.use( Router );