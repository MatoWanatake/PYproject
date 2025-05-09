import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore,} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import userReducer from "./user.js";
import groupReducer from "./group.js";
import creditReducer from "./credit.js";
import expenseReducer from "./expense.js";
import friendReducer from "./friend.js";

export const fetch = async (url, options = {}) => {
    //Default to GET if no method provided
    options.method = options.method || 'GET';

    //Use empty headers if not headers are provided
    options.headers = options.headers || {};

    //Set the content type if not already set for POST / PUT
    if (options.method.toUpperCase() === 'POST' || options.method.toUpperCase() === 'PUT') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    }

    //Call a native fetch function
    const res = await window.fetch(url, options);

    //Check to see if the call resulted in an error
    if (res.status >= 400) throw res;

    //Return fetch promise to allow for promise chains
    return res;
}

const rootReducer = combineReducers({
    credit: creditReducer,
    expense: expenseReducer,
    friend: friendReducer,
    group: groupReducer,
    session: sessionReducer,
    user: userReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = (await import("redux-logger")).default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
