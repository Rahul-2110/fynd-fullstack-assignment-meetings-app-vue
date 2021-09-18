import axios from 'axios';
import AppConfig from '@/config';

const { apiToken } = AppConfig;

axios.interceptors.request.use(
    request => {
        if( request.url.includes( 'calendar' ) || request.url.includes( 'meetings' ) || request.url.includes( 'users' ) || request.url.includes( 'teams' )  )  {
            request.headers['Authorization'] =  apiToken;
        }
        return request;
    },
    error => Promise.reject( error )
);