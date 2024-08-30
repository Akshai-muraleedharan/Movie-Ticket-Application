import axios from 'axios'


export const axiosInstance = axios.create({
    baseURL:'http://localhost:4005/api/v1',
    // baseURL:'https://movie-ticket-application-backend-puce.vercel.app/api/v1',
    withCredentials:true
});