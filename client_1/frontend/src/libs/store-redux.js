import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import accountReducer from "../slices/Account";
import homeReducer from "../slices/Home";
import profileReducer from "../slices/Profile";

const reducer = {
    account: accountReducer,
    home: homeReducer,
    profile: profileReducer,
}

const logger = (_store) => (next) => (action) => {
    return next(action);
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
    enhancers: [compose(applyMiddleware(logger))],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store