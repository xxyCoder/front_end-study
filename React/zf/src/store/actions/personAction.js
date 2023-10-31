import * as types from '../types'
const voteAction = {
    sal() {
        return {
            type: types.PERSON_SAL
        }
    },
    age() {
        return {
            type: types.PERSON_AGE
        }
    },
    num() {
        return {
            type: types.PERSON_NUM
        }
    }
}

export default voteAction;