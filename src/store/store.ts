import { defineStore } from 'pinia'
import cism from "@/services/cism";

type RequestCallback = {
    callback: Function,
    params: Object,
}

type State = {
    isRequestProcess: boolean,
}

export const useStore = defineStore('store', {
    state: (): State => ({
        isRequestProcess: false,
    }),
    actions: {
        async requestWrapper(callback: RequestCallback): Promise<any> {
            this.isRequestProcess = true;
            try {
                return await callback.callback(callback.params);
            } catch (error) {
                return error;
            } finally {
                this.isRequestProcess = false;
            }
        },

        async fetchDocuments(payload: { search?: string }) {
            let params: { search: string } | {} = {};
            if (payload?.search) params = {search: payload.search};
            const fetch = async () => {
                const resp = await cism.get('/user/docs', {params});
                return resp.data;
            };

            return await  this.requestWrapper({callback: fetch, params: {}});
        }
    },
})