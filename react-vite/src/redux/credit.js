import {fetch} from "./store.js";

//Action Types
const CREDIT_CLEAR = 'credit/clear';

//Actions
const creditClearAction = () => {
    return {
        type: CREDIT_CLEAR
    }
}

//Thunks
export const clear = () => {
    return async (dispatch) => {
        return dispatch(creditClearAction());
    }
}

export const addCredit = ({paid_to, amount, group_id = ""}) => {
    return async (dispatch) => {
        return fetch("/api/friends/add", {
            method: "POST",
            body: JSON.stringify({
                paid_to,
                amount,
                group_id
            })
        })
            .then(response => response.json())
            .then(() => dispatch(getFriends()))
    }
}

//Initial State
const initialState = {

};

//Reducer
function creditReducer(state = initialState, action) {
    switch (action.type) {
        case CREDIT_CLEAR:
            return {...initialState};
        default:
            return state;
    }
}

export default creditReducer;