import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import Header from "./components/Header/Header";
import { doGetAccount } from "./redux/action/accountAction";
import { Outlet } from "react-router-dom";
const App = () => {
    const dispatch = useDispatch();
    const firstRenderRef = useRef(true);
    const user = useSelector(state => state.account.userInfo);
    const isLoading = useSelector(state => state.account.isLoading);
    const style = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    };
    useEffect(() => {
        if (user && !user.access_token) {
            dispatch(doGetAccount());
        }
        firstRenderRef.current = false;
    }, []);

    return (
        <>
            {isLoading === true ? (
                <div className="container">
                    <div style={style}>
                        <HashLoader
                            color={"#36d7b7"}
                            loading={true}
                            size={100}
                        />
                    </div>
                </div>
            ) : (
                <>
                    {firstRenderRef.current === false && (
                        <div className="App">
                            <Header />
                            <Outlet />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default App;
