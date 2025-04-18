import {fetch} from "./store.js";
import {isNotNullOrEmpty} from "../utils.js";
import {getBalance} from "./user.js";

//Action Types
const EXPENSE_CLEAR = 'expense/clear';

//Actions
const creditExpenseAction = () => {
    return {
        type: EXPENSE_CLEAR
    }
}

//Thunks
export const clear = () => {
    return async (dispatch) => {
        return dispatch(creditExpenseAction());
    }
}

export const addExpense = ({title, amount, debits, group_id = ""}) => {
    //Create post body with two required fields
    const post = {title, amount, debits};

    //Add the group when set
    if (isNotNullOrEmpty(group_id)) {
        post.group_id = group_id;
    }

    return async (dispatch) => {
        return fetch("/api/expenses", {
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
        case EXPENSE_CLEAR:
            return {...initialState};
        default:
            return state;
    }
}

export default creditReducer;