import axios, {AxiosError, type AxiosResponse} from 'axios';
import {type RejectedRequest} from '@/interfaces/rejectedRequest';

const cism = axios.create({
    baseURL: `${import.meta.env.VITE_CISM_SERVER}:${import.meta.env.VITE_PORT}/`
});

cism.interceptors.response.use((config: AxiosResponse<unknown, unknown>) => config, (error: AxiosError | Error) => {
    if (error instanceof AxiosError) {
        const errorMsg = error?.response?.data?.message || error?.message;
        return Promise.reject({error: errorMsg, failed: true, code: error?.code} as RejectedRequest);
    }
    return Promise.reject({error: error?.message, failed: true, code: '500'} as RejectedRequest);
});

export default cism;