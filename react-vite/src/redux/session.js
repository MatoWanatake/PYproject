import {clear as clearCredit} from "./credit.js";
import {clear as clearExpense} from "./expense.js";
import {clear as clearFriend} from "./friend.js";
import {clear as clearGroup} from "./group.js";
import {clear as clearUser} from "./user.js";
import PropTypes from "prop-types";

//Action Types
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

//Actions
const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER
});

//Thunks
export const thunkAuthenticate = () => async (dispatch) => {
    const response = await fetch("/api/auth/");
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(setUser(data));
    }
};

export const thunkLogin = (credentials) => async dispatch => {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return {server: "Something went wrong. Please try again"}
    }
};

export const thunkSignup = (user) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return {server: "Something went wrong. Please try again"}
    }
};

export const thunkLogout = () => async (dispatch) => {
    await fetch("/api/auth/logout")
        .then(() =>  {
            //Clear store data
            dispatch(removeUser())
            dispatch(clearCredit())
            dispatch(clearExpense())
            dispatch(clearFriend())
            dispatch(clearGroup())
            dispatch(clearUser())
        });
};

//Initial State
const initialState = {user: null};

//Reducer
function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.payload};
        case REMOVE_USER:
            return {...state, user: null};
        default:
            return state;
    }
}

//PropTypes
export const PROP_TYPE_USER = PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
})

export default sessionReducer;
