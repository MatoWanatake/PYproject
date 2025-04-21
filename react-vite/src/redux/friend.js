import {fetch} from "./store.js";

//Action Types
const FRIEND_CLEAR = 'friend/clear';
const FRIEND_GET = 'friend/get';

//Actions
const friendClearAction = () => {
    return {
        type: FRIEND_CLEAR
    }
}

const friendGetAction = (id, friend) => {
    return {
        type: FRIEND_GET,
        payload: {
            id,
            friend
        }
    }
}

//Thunks
export const clear = () => {
    return async (dispatch) => {
        return dispatch(friendClearAction());
    }
}

export const getFriend = (id) => {
    return async (dispatch) => {
        return fetch(`/api/friends/${id}`)
            .then(response => response.json())
            .then(friend => {
                dispatch(friendGetAction(id, friend));
            })
    }
}

//Initial State
const initialState = {
    friends: {},
};

//Reducer
function friendReducer(state = initialState, action) {
    switch (action.type) {
        case FRIEND_CLEAR:
            return {...initialState};
        case FRIEND_GET:
            return {
                ...state,
                friends: {
                    ...state.group,
                    [action.payload.id]: action.payload.friend
                }
            };
        default:
            return state;
    }
}

export default friendReducer;