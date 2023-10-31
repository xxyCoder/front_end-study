import * as types from '../types'

const initial = {
    salary: 0,
    age: 0,
    num: 0
}
// 第一次派发是redux内部派发的，type=****与任何逻辑都不匹配，目的是为了给state赋初始值
export default function personReducer(state = initial, action) {
    state = { ...state };
    switch (action.type) {
        case types.PERSON_SAL:
            state.salary++;
            break;
        case types.PERSON_AGE:
            state.age++;
            break;
        case types.PERSON_NUM:
            state.num++;
            break;
        default: break;
    }
    return state;   // return的内容会替换state
};
