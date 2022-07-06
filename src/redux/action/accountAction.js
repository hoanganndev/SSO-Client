import axiosClient from "../../customize/axios";
// redux thunk
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_FAILSED = "USER_LOGIN_FAILSED";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_FAILSED = "USER_LOGOUT_FAILSED";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";

export const doLogin = ssoToken => {
    return (dispatch, getState) => {
        dispatch({ type: USER_LOGIN_REQUEST });
        axiosClient
            .post(process.env.REACT_APP_BACKEND_SSO_VERIFY_TOKEN, { ssoToken })
            .then(res => {
                if (res && +res.EC === 0) {
                    dispatch({ type: USER_LOGIN_SUCCESS, user: res.DT });
                } else {
                    dispatch({ type: USER_LOGIN_FAILSED, error: res.EM });
                }
            })
            .catch(err => {
                dispatch({
                    type: USER_LOGIN_FAILSED,
                    error: "Somethings wrong...",
                });
                console.log(">>> check doLogin action err", err);
            });
    };
};
export const doGetAccount = () => {
    return (dispatch, getState) => {
        dispatch({ type: USER_LOGIN_REQUEST });
        axiosClient
            .get(process.env.REACT_APP_BACKEND_SSO_GET_ACCOUNT, { data: "" })
            .then(res => {
                if (res && +res.EC === 0) {
                    dispatch({ type: USER_LOGIN_SUCCESS, user: res.DT });
                } else {
                    dispatch({ type: USER_LOGIN_FAILSED, error: res.EM });
                }
            })
            .catch(err => {
                dispatch({
                    type: USER_LOGIN_FAILSED,
                    error: "Somethings wrong...",
                });
                console.log(">>> check doGetAccount action err", err);
            });
    };
};

export const doLogout = () => {
    return (dispatch, getState) => {
        dispatch({ type: USER_LOGOUT_REQUEST });
        axiosClient
            .post(process.env.REACT_APP_BACKEND_SSO_LOGOUT)
            .then(res => {
                if (res && +res.EC === 0) {
                    dispatch({ type: USER_LOGOUT_SUCCESS });
                } else {
                    dispatch({ type: USER_LOGOUT_FAILSED, error: res.EM });
                }
            })
            .catch(err => {
                dispatch({
                    type: USER_LOGIN_FAILSED,
                    error: "Somethings wrong...",
                });
                console.log(">>> check doLogout action err", err);
            });
    };
};
