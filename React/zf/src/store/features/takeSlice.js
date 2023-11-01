import { createSlice } from '@reduxjs/toolkit';

const takeSlice = createSlice({
    name: "take",
    // 初始值
    initialState: {
        takeList: null
    },
    reducers: {
        // 无需考虑type的问题
        getAllTakeList(state, action) {
            state.takeList = action.payload;
        },
        removeTakeList(state, { payload }) {
            let takeList = state.takeList;
            if (!Array.isArray(takeList)) return;
            state.takeList = state.takeList.filter(item => +item.id !== payload.id);
        },
        updateTake(state, { payload }) {
            
        }
    }
})

export default takeSlice.reducer;