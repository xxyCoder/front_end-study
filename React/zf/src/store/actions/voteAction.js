import * as types from '../types'
const voteAction = {
    sup() {
        return {
            type: types.VOTE_SUP
        }
    },
    opp() {
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