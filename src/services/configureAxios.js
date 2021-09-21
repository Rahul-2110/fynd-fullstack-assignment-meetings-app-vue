import axios from 'axios';
import store from '@/stores';

axios.interceptors.request.use(
    request => {
        if( request.url.includes( 'calendar' ) || request.url.includes( 'meetings' ) || request.url.includes( 'users' ) || request.url.includes( 'teams' )  )  {
            request.headers['Authorization'] =   store.state.auth.token;
        }
        return request;
    },
    error => Promise.reject( error )
);