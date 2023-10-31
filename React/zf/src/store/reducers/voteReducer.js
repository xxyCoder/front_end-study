import * as types from '../types'

const initial = {
    supNum: 0,
    oppNum: 0,
    num: 0
}
// 第一次派发是redux内部派发的，type=****与任何逻辑都不匹配，目的是为了给state赋初始值
export default function voteReducer(state = initial, action) {
    state = { ...state };
    switch (action.type) {
        case types.VOTE_SUP:
            state.supNum++;
            break;
        case types.VOTE_OPP:
            state.oppNum++;
            break;
        case types.VOTE_NUM:
            state.num++;
            break;
        default: break;
    }
    return state;   // return的内容会替换state
};
