import axios from 'axios'


export const axiosInstance = axios.create({
    //  baseURL:'http://localhost:4005/api/v1',
    baseURL:`${import.meta.env.VITE_BASE_URL}/api/v1`,
    withCredentials:true
   
});

