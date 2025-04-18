import {fetch} from "./store.js";
import {isNotNullOrEmpty} from "../utils.js";
import {getBalance} from "./user.js";

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
    //Create post body with two required fields
    const post = {paid_to, amount};

    //Add the group when set
    if (isNotNullOrEmpty(group_id)) {
        post.group_id = group_id;
    }

    return async (dispatch) => {
        return fetch("/api/expenses/credits", {
            method: "POST",
            body: JSON.stringify(post)
        })
            .then(() => dispatch(getBalance()))
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