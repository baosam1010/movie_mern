import axios from 'axios';
import queryString from 'query-string';


let axiosClient = axios.create(
    {
        baseURL: process.env.NODE_ENV !== 'production'? process.env.REACT_APP_API_URL : "https://gentle-stream-80499.herokuapp.com/api",
        headers: {
            'Content-Type': 'application/json',
        },
        paramsSerializer: params => queryString.stringify(params),
    }
);


axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...

    if (config.headers.Authorization) {
        axiosClient.defaults.headers.common['Authorization'] = config.headers.Authorization;
    } else {
        delete axiosClient.defaults.headers.common['Authorization']    
    }
    
    // console.log('config:',config.headers)



    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    if (error.response?.data) return error.response?.data
    else return { success: false, message: error.message }
});

export default axiosClient;


