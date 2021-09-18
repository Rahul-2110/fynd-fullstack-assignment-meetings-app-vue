import Vue from 'vue';
import '@/services/configureAxios';
import Router from 'vue-router';

import ClockSpinner from '@/components/utils/ClockSpinner';
import CircleSpinner from '@/components/utils/CircleSpinner';
import ErrorBox from '@/components/utils/ErrorBox';

Vue.component( 'ClockSpinner', ClockSpinner );
Vue.component( 'CircleSpinner', CircleSpinner );
Vue.component( 'ErrorBox', ErrorBox );

Vue.use( Router );