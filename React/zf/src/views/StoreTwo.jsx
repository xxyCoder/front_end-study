import { connect, } from 'react-redux'
import actions from '../store/actions'

const StoreTwo = function (props) {
    const { supNum, oppNum, num, sup, opp, addNum } = props;
    return <div>
        {supNum} --- {oppNum} --- {num}
        <br />
        <button onClick={opp}>opp</button>
        <button onClick={sup}>sup</button>
        <button onClick={addNum}>num</button>
    </div>
}

// state存储了所有模块的公共状态
export default connect(state => {
    // 返回值作为组件的属性
    return {
        supNum: state.vote.supNum,
        oppNum: state.vote.oppNum,
        num: state.vote.num
    }
}, dispatch => {    // 也可以直接用actions.vote代替，但是属性名num和方法num重名了
    return {
        sup() {
            dispatch(actions.vote.sup());
        },
        opp() {
            dispatch(actions.vote.opp());
        },
        addNum() {
            dispatch(actions.vote.num());
        }
    }
})(StoreTwo);