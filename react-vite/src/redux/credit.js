import {fetch} from "./store.js";
import {isNotNullOrEmpty} from "../utils.js";
import {getBalance} from "./user.js";
import PropTypes from "prop-types";

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

export const editCredit = ({id, paid_to, amount, group_id = ""}) => {
    //Create put body with two required fields
    const post = {paid_to, amount};

    //Add the group when set
    if (isNotNullOrEmpty(group_id)) {
        post.group_id = group_id;
    }

    return async (dispatch) => {
        return fetch(`/api/expenses/credits/${id}`, {
            method: "PUT",
            body: JSON.stringify(post)
        })
            .then(() => dispatch(getBalance()))
    }
}

export const deleteCredit = (id) => {
    return async (dispatch) => {
        return fetch(`/api/expenses/credits/${id}`, {
            method: "DELETE"
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

//PropTypes
export const PROP_TYPE_CREDIT = PropTypes.shape({
    id: PropTypes.number.isRequired,
    paid_by: PropTypes.number.isRequired,
    paid_to: PropTypes.number.isRequired,
    group_id: PropTypes.number,
    amount: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
});

export default creditReducer;