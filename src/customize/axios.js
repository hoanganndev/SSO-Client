import axios from "axios";
import axiosRetry from "axios-retry";
let store;
//_store: store of redux
export const injectStore = _store => {
    store = _store;
};

const instance = axios.create({
    //baseURL: "https://api.example.com",
    withCredentials: true, // config for cookies auto send with req from client to server
});
axiosRetry(instance, {
    retries: 3,
    retryCondition: error => {
        //axios's error
        // retry when call api error : get-data-by-url||account
        return error.response.status === 400 || error.response.status === 405;
    },
    retryDelay: (retryCount, error) => {
        return retryCount * 100;
    },
});
// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        //assign bearer token with header
        const headerToken =
            store.getState()?.account?.userInfo?.access_token ?? "";
        if (headerToken) {
            config.headers.Authorization = `Bearer ${headerToken}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        return response && response.data ? response.data : response;
    },
    function (error) {
        // if (error.response.status === 400) {
        //     // retry api if error with status code 400
        //     const headerToken =
        //         store.getState()?.account?.userInfo?.access_token ?? "";
        //     if (headerToken) {
        //         error.config.headers.Authorization = `Bearer ${headerToken}`;
        //     }
        //     return axios.request(error.config);
        // }
        if (error && error.response && error.response.data)
            return error.response.data;
        return Promise.reject(error);
    }
);
export default instance;
