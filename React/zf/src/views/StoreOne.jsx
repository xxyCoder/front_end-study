import { useContext, useEffect, useState } from 'react'
import ThemeContext from '../ThemeContext';
import actions from '../store/actions'

const StoreOne = function () {
    const { store } = useContext(ThemeContext);
    console.log("store:", store);
    const { supNum, oppNum, num } = store.getState().vote;
    const { num: num1 } = store.getState().person;


    const [x, setX] = useState(0);
    const update = () => {
        setX(x + 1);
    }
    useEffect(() => {
        const unsubscribe = store.subscribe(update);
        return () => {
            unsubscribe();
        }
    }, [x]);

    return <div>
        {supNum} --- {oppNum} --- {num} --- {num1}
        <br />
        <button onClick={() => store.dispatch(actions.vote.opp())}>opp</button>
        <button onClick={() => store.dispatch(actions.vote.sup())}>sup</button>
        <button onClick={() => store.dispatch(actions.vote.num())}>num</button>
    </div>
}

export default StoreOne;