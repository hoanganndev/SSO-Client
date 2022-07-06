import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { doLogin } from "../../redux/action/accountAction";
const Code = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const firstUseRef = useRef(false);
    const navigate = useNavigate();
    const disPatch = useDispatch();
    const message = useSelector(state => state.account.errMessage);
    const user = useSelector(state => state.account.userInfo);

    useEffect(() => {
        const ssoToken = searchParams.get("ssoToken");
        if (ssoToken && firstUseRef.current === false) {
            firstUseRef.current = true;
            disPatch(doLogin(ssoToken));
        }
    }, []);

    useEffect(() => {
        if (user && user.access_token) {
            navigate("/");
        }
    }, [user]);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-3">
                        {message && (
                            <span>
                                .Please do login again. click here to &nbsp;
                                <a
                                    href={`${process.env.REACT_APP_BACKEND_SSO_LOGIN}?serviceURL=${process.env.REACT_APP_SERVICE_URL}`}
                                >
                                    Login
                                </a>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Code;
