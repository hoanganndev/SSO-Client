import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import Header from "./components/Header/Header";
import { doGetAccount } from "./redux/action/accountAction";
const App = () => {
    const dispatch = useDispatch();
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
                <div className="App">
                    <Header />
                    <div className="container">
                        <div>Hi i'm Marcus</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default App;
