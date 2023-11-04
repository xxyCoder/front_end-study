import { configureStore } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import voteSlice from './features/voteSlice';

const store = configureStore({
    // 按模块管理各个切片
    reducer: {
        vote: voteSlice
    },
    // 使用中间件
    middleware: [reduxLogger, reduxThunk, reduxPromise]
});

export default store;