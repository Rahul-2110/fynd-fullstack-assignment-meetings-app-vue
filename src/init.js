import Vue from 'vue';
import '@/services/configureAxios';
import Router from 'vue-router';

import ClockSpinner from '@/components/utils/ClockSpinner';
import CircleSpinner from '@/components/utils/CircleSpinner';
Vue.component( 'ClockSpinner', ClockSpinner );
Vue.component( 'CircleSpinner', CircleSpinner );

Vue.use( Router );