import {fetch} from "./store.js";

//Action Types
const GROUP_CLEAR = 'credit/clear';
const GROUP_MEMBERS = 'group/members';

//Actions
const groupClearAction = () => {
    return {
        type: GROUP_CLEAR
    }
}

const groupMembersAction = (id, members) => {
    return {
        type: GROUP_MEMBERS,
        payload: {
            id,
            members
        }
    }
}

//Thunks
export const clear = () => {
    return async (dispatch) => {
        return dispatch(groupClearAction());
    }
}

export const getGroupMembers = (id) => {
    return async (dispatch) => {
        return fetch(`/api/groups/${id}/members`)
            .then(response => response.json())
            .then(friends => {
                dispatch(groupMembersAction(id, friends));
            })
    }
}

//Initial State
const initialState = {
    members : {}
};

//Reducer
function groupReducer(state = initialState, action) {
    switch (action.type) {
        case GROUP_CLEAR:
            return {...initialState};
        case GROUP_MEMBERS:
            return {...state, members: {...state.members, [action.payload.id]: action.payload.members}};
        default:
            return state;
    }
}

export default groupReducer;