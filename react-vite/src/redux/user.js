import {fetch} from "./store.js";

//Action Types
const USER_CLEAR = 'user/clear';
const USER_FRIENDS = 'user/friends';
const USER_GROUPS = 'user/groups';
const USER_BALANCE = 'user/balance';
const USER_FRIEND_TRANSACTIONS = 'user/friend-transactions';
const USER_GROUP_TRANSACTIONS = 'user/group-transactions';

//Actions
const userClearAction = () => {
    return {
        type: USER_CLEAR
    }
}

const userFriendsAction = (friends) => {
    return {
        type: USER_FRIENDS,
        payload: friends
    }
};

const userGroupsAction = (groups) => {
    return {
        type: USER_GROUPS,
        payload: groups
    }
}

const userBalanceAction = (balance) => {
    return {
        type: USER_BALANCE,
        payload: balance
    }
}

const userFriendTransactionsAction = (id, transactions) => {
    return {
        type: USER_FRIEND_TRANSACTIONS,
        payload: {
            id,
            transactions
        }
    }
}

const userGroupTransactionsAction = (id, transactions) => {
    return {
        type: USER_GROUP_TRANSACTIONS,
        payload: {
            id,
            transactions
        }
    }
}

//Thunks
export const clear = () => {
    return async (dispatch) => {
        return dispatch(userClearAction());
    }
}

export const getFriends = () => {
    return async (dispatch) => {
        return fetch("/api/friends")
            .then(response => response.json())
            .then(friends => {
                dispatch(userFriendsAction(friends));
            })
    }
};

export const getGroups = () => {
    return async (dispatch) => {
        return fetch("/api/groups")
            .then(response => response.json())
            .then(groups => {
                dispatch(userGroupsAction(groups));
            })
    }
};

export const getBalance = () => {
    return async (dispatch) => {
        return fetch("/api/users/balance")
            .then(response => response.json())
            .then(balance => {
                dispatch(userBalanceAction(balance));
            })
    }
}

export const getFriendTransactions = (id) => {
    return async (dispatch) => {
        return fetch(`/api/expense-friend/${id}`)
            .then(response => response.json())
            .then(transactions => {
                dispatch(userFriendTransactionsAction(id, transactions));
            })
    }
}

export const getGroupTransactions = (id) => {
    return async (dispatch) => {
        return fetch(`/api/expense-group/${id}`)
            .then(response => response.json())
            .then(transactions => {
                dispatch(userGroupTransactionsAction(id, transactions));
            })
    }
}

export const addFriends = ({ids = [], emails = []}) => {
    return async (dispatch) => {
        return fetch("/api/friends/add", {
            method: "POST",
            body: JSON.stringify({
                ids,
                emails
            })
        })
            .then(() => dispatch(getFriends()))
    }
}

export const createGroup = ({name, description = "", ids}) => {
    return async (dispatch) => {
        return fetch("/api/groups", {
            method: "POST",
            body: JSON.stringify({
                name,
                description,
                ids
            })
        })
            .then(() => dispatch(getGroups()))
    }
}

//Initial State
const initialState = {
    friends : [],
    groups : [],
    balance: {
        owe: 0,
        owed: 0,
        users: {}
    },
    transactions: {
        friends: {},
        groups: {}
    }
};

//Reducer
function userReducer(state = initialState, action) {
    switch (action.type) {
        case USER_CLEAR:
            return {...initialState};
        case USER_FRIENDS:
            return {...state, friends: action.payload};
        case USER_GROUPS:
            return {...state, groups: action.payload};
        case USER_BALANCE:
            return {...state, balance: action.payload};
        case USER_FRIEND_TRANSACTIONS:
            return {
                ...state,
                transactions: {
                    ...state.transactions,
                    friends: {
                        ...state.transactions.friends,
                        [action.payload.id]: action.payload.transactions
                    }
                }
            };
            case USER_GROUP_TRANSACTIONS:
                return {
                    ...state,
                    transactions: {
                        ...state.transactions,
                        groups: {
                            ...state.transactions.groups,
                            [action.payload.id]: action.payload.transactions
                        }
                    }
                }
        default:
            return state;
    }
}

export default userReducer;