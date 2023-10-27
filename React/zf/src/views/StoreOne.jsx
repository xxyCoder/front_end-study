import { useContext, useEffect, useState } from 'react'
import ThemeContext from '../ThemeContext';
const StoreOne = function () {
    const { store } = useContext(ThemeContext);
    console.log("store:", store);
    const { supNum, oppNum } = store.getState();

    const [num, setNum] = useState(0);
    const update = () => {
        setNum(num + 1);
    }
    useEffect(() => {
        const unsubscribe = store.subscribe(update);
        return () => {
            unsubscribe();
        }
    }, [num]);

    return <div>
        {supNum} --- {oppNum}
        <br />
        <button onClick={() => store.dispatch({ type: "OPP" })}>opp</button>
        <button onClick={() => store.dispatch({ type: "SUP" })}>sup</button>
    </div>
}

export default StoreOne;