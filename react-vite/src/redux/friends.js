import {fetch} from "./store.js";

//! Action Types:
const SET_FRIENDS = 'friends/SET_ALL';
const ADD_FRIEND = 'friends/ADD';
const UPDATE_FRIEND = 'friends/UPDATE';
const DELETE_FRIEND = 'friends/DELETE';

//  ! Action Creators
const setFriends = (friends) => (
    { 
        type: SET_FRIENDS, 
        payload: friends 
    }
);
const addFriend = (friend) => (
    { 
        type: ADD_FRIEND, 
        payload: friend 
    }
);
const updateFriend = (friend) => (
    { 
        type: UPDATE_FRIEND, 
        payload: friend 
    }
);
const deleteFriend = (id) => (
    { 
        type: DELETE_FRIEND, 
        payload: id 
    }
);

// ! THUNKS
//  Get all thunks
export const fetchFriends = () => async (dispatch) => {
    try {
        const res = await fetch('/api/friends');
        const data = await res.json();
        dispatch(setFriends(data));
    } catch (err) {
        console.error("Fetch Friends Error:", err);
    }
};
