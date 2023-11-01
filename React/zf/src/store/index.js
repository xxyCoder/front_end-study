import { createStore, combineReducers, applyMiddleware } from 'redux'
import voteReducer from './reducers/voteReducer';
import personReducer from './reducers/personReducer';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'

// 合并各个模块的reducer，此时容器中的公共状态会按照名字分模块管理
/**
 * store = {
 *  vote: {},
 *  person: {}
 * }
 */
// 每一次派发，都会去和所有的reducer进行逐一匹配
const reducer = combineReducers({
    vote: voteReducer,
    person: personReducer
});

const store = createStore(reducer, applyMiddleware(reduxLogger, reduxThunk, reduxPromise));

export default store;