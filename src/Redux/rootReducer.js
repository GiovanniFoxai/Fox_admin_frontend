import { combineReducers } from "@reduxjs/toolkit";
import auth from "./Reducers/authSlice";
import app from "./Reducers/appSlice";
import company from "./Reducers/companySlice";
import user from "./Reducers/userSlice";

const appReducer = combineReducers({
    auth,
    app,
    company,
    user,
});

const rootReducer = (state, action) => {
    if (action.type === "auth/logout") {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

export default rootReducer;
