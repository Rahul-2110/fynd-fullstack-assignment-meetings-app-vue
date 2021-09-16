import Vue from 'vue';
import '@/services/configureAxios';
import Router from 'vue-router';

import ClockSpinner from '@/components/utils/ClockSpinner';
Vue.component( 'ClockSpinner', ClockSpinner );

Vue.use( Router );