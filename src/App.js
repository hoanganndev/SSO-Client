import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header/Header";
import { increaseCounter, decreaseCounter } from "./redux/action/couterAction";
const App = () => {
    const dispatch = useDispatch();
    const count = useSelector(state => state.counter.count);
    return (
        <div className="App">
            <Header />
            <div>Count: {count}</div>

            <button onClick={() => dispatch(increaseCounter())}>
                Increase Count
            </button>

            <button onClick={() => dispatch(decreaseCounter())}>
                Decrease Count
            </button>
        </div>
    );
};

export default App;
