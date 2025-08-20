import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://e-m-s-one.vercel.app/api/v1/users'
})