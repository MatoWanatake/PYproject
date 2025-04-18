import {fetch} from "./store.js";
import {isNotNullOrEmpty} from "../utils.js";
import {getBalance} from "./user.js";

//Action Types
const EXPENSE_CLEAR = 'expense/clear';
const EXPENSE_COMMENTS = 'expense/comments';

//Actions
const expenseClearAction = () => {
    return {
        type: EXPENSE_CLEAR
    }
}

const expenseGetCommentsAction = (id, comments) => {
    return {
        type: EXPENSE_COMMENTS,
        payload: {
            id,
            comments
        }
    }
}

//Thunks
export const clear = () => {
    return async (dispatch) => {
        return dispatch(expenseClearAction());
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

export const editExpense = ({id, title, amount, debits, group_id = ""}) => {
    //Create post body with two required fields
    const put = {title, amount, debits};

    //Add the group when set
    if (isNotNullOrEmpty(group_id)) {
        put.group_id = group_id;
    }

    return async (dispatch) => {
        return fetch(`/api/expenses/${id}`, {
            method: "PUT",
            body: JSON.stringify(put)
        })
            .then(() => dispatch(getBalance()))
    }
}

export const deleteExpense = (id) => {
    return async (dispatch) => {
        return fetch(`/api/expenses/${id}`, {
            method: "DELETE"
        })
            .then(() => dispatch(getBalance()))
    }
}

export const getExpenseComments = (id) => {
    return async (dispatch) => {
        return fetch(`/api/expenses/${id}/comments`)
            .then(response => response.json())
            .then(comments => {
                dispatch(expenseGetCommentsAction(id, comments));
            })
    }
}

export const addExpenseComment = ({expense_id, title, body}) => {
    return async (dispatch) => {
        return fetch(`/api/expenses/${expense_id}/comments`, {
            method: "POST",
            body: JSON.stringify({
                expense_id,
                title,
                body
            })
        })
            .then(() => dispatch(getExpenseComments(expense_id)))
    }
}

export const editExpenseComment = ({expense_id, comment_id, comment}) => {
    return async (dispatch) => {
        return fetch(`/api/comments/${comment_id}`, {
            method: "PUT",
            body: JSON.stringify({comment})
        })
            .then(() => dispatch(getExpenseComments(expense_id)))
    }
}

export const deleteExpenseComment = ({expense_id, comment_id}) => {
    return async (dispatch) => {
        return fetch(`/api/comments/${comment_id}`, {
            method: "DELETE"
        })
            .then(() => dispatch(getExpenseComments(expense_id)))
    }
}

//Initial State
const initialState = {
    comments: {}
};

//Reducer
function expenseReducer(state = initialState, action) {
    switch (action.type) {
        case EXPENSE_CLEAR:
            return {...initialState};
        case EXPENSE_COMMENTS:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.payload.id]: action.payload.comments
                }
            }
        default:
            return state;
    }
}

export default expenseReducer;