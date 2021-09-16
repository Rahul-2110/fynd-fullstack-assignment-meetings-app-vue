import axios from 'axios';
import AppConfig from '@/config';

const { apiToken } = AppConfig;

axios.interceptors.request.use(
    request => {
        if( request.url.includes( 'calendar' )) {
            request.headers['Authorization'] =  apiToken;
        }
        return request;
    },
    error => Promise.reject( error )
);