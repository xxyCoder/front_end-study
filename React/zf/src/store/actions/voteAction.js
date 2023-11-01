import * as types from '../types'

async function delay() {
    return new Promise(resolve => {
        setTimeout(resolve, 1000);
    });
}

const voteAction = {
    // redux-thunk中间件语法
    sup() {
        return async dispatch => {
            await delay();
            dispatch({ type: types.VOTE_SUP });
        }
    },
    // redux-promise中间件语法
    async opp() {
        await delay();
        return {
            type: types.VOTE_OPP
        }
    },
    num() {
        return {
            type: types.VOTE_NUM
        }
    }
}

export default voteAction;