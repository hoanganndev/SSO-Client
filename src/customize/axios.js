import axios from "axios";
let store;
//_store: store of redux
export const injectStore = _store => {
    store = _store;
};

const instance = axios.create({
    //baseURL: "https://api.example.com",
    withCredentials: true, // config for cookies auto send with req from client to server
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        //assign bearer token with header
        const headerToken =
            store.getState()?.account?.userInfo?.access_token ?? "";
        if (headerToken) {
            config.headers.common["Authorization"] = `Bearer ${headerToken}`;
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
        if (error && error.response && error.response.data)
            return error.response.data;
        return Promise.reject(error);
    }
);
export default instance;
