import { useSelector, useDispatch } from 'react-redux';
import { addOpp, addSup, clear, addOppAsync } from '../store/features/voteSlice'

const StoreThree = function () {
    const dispatch = useDispatch();
    const { opp, sup } = useSelector(state => state.vote);

    return <div>
        {opp} --- {sup}
        <br />
        <button onClick={() => dispatch(addOpp(1))}>opp</button>
        <button onClick={() => dispatch(addOppAsync(2))}>async opp</button>
        <button onClick={() => dispatch(addSup(1))}>sup</button>
        <button onClick={() => dispatch(clear())}>clear</button>
    </div>
}

export default StoreThree;