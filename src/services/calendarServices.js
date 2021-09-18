import axios from 'axios';
import AppConfig from '@/config';

const { apiBaseUrl } = AppConfig;

const  s_calender_getMeetingsOnADate = async (date) => {
    const response = await axios.get(
         `${apiBaseUrl}/calendar`,
         {
            params: { 
                date : date
            }
        } );
    return response.data;
}

export {
    s_calender_getMeetingsOnADate
};