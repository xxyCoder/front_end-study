import { createStore } from 'redux'
const initial = {
    supNum: 0,
    oppNum: 0
}
// 第一次派发是redux内部派发的，type=****与任何逻辑都不匹配，目的是为了给state赋初始值
const reducer = function (state = initial, action) {
    state = { ...state };
    switch (action.type) {
        case "SUP":
            state.supNum++;
            break;
        case "OPP":
            state.oppNum++;
            break;
        default: break;
    }
    return state;   // return的内容会替换state
};

const store = createStore(reducer);

export default store;