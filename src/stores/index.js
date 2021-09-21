import Vuex from 'vuex';
import auth from './modules/auth';
import users from './modules/users';
import Vue from 'vue';

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        auth: auth,
        users: users
    }
});

export default store;