import {fetch} from "./store.js";
import PropTypes from "prop-types";

//Action Types
const GROUP_CLEAR = 'group/clear';
const GROUP_GET = 'group/get';
const GROUP_MEMBERS = 'group/members';

//Actions
const groupClearAction = () => {
    return {
        type: GROUP_CLEAR
    }
}

const groupGetAction = (id, group) => {
    return {
        type: GROUP_GET,
        payload: {
            id,
            group
        }
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

export const getGroup = (id) => {
    return async (dispatch) => {
        return fetch(`/api/groups/${id}`)
            .then(response => response.json())
            .then(group => {
                dispatch(groupGetAction(id, group));
            })
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
    members: {},
    groups: {}
};

//Reducer
function groupReducer(state = initialState, action) {
    switch (action.type) {
        case GROUP_CLEAR:
            return {...initialState};
        case GROUP_GET:
            return {
                ...state,
                groups: {
                    ...state.group,
                    [action.payload.id]: action.payload.group
                }
            };
        case GROUP_MEMBERS:
            return {
                ...state,
                members: {
                    ...state.members,
                    [action.payload.id]: action.payload.members
                }
            };
        default:
            return state;
    }
}

//PropTypes
export const PROP_TYPE_GROUP = PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
});

export default groupReducer;