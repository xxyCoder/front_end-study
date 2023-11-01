import { configureStore } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import takeSlice from './features/takeSlice';

const store = configureStore({
    // 按模块管理各个切片
    reducer: {
        take: takeSlice
    },
    // 使用中间件
    middleware: [reduxLogger, reduxThunk, reduxPromise]
});

export default store;