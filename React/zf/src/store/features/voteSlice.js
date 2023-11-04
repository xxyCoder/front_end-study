import { createSlice } from '@reduxjs/toolkit';

const voteSlice = createSlice({
    name: "vote",
    // 初始值
    initialState: {
        opp: 0,
        sup: 0
    },
    reducers: {
        // 无需考虑type的问题
        addSup(state, action) { // type:vote/addSup
            state = { ...state };
            state.sup += action.payload;
            return state;
        },
        addOpp(state, { payload }) {    // type: vote/addOpp
            state = { ...state };
            state.opp += payload;
            return state;
        },
        clear(state) {    // type: vote/clear
            state = { ...state };
            state.opp = state.sup = 0;
            return state;
        }
    }
})
// 方法执行，返回派发的行为对象 { type: "vote/xxx", payload } payload是调用方法传入的参数
export const { addOpp, addSup, clear } = voteSlice.actions;

// 异步派发
export const addOppAsync = (payload) => {
    return async dispatch => {
        await new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
        dispatch(addOpp(payload));
    }
}

export default voteSlice.reducer;