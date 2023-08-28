import { combineReducers } from '@reduxjs/toolkit';
import auth from './Reducers/authSlice';
import app from './Reducers/appSlice';

const appReducer = combineReducers({
    auth,
    app,

})


const rootReducer = (state, action) => {
    if (action.type === 'auth/logout') {
        return appReducer(undefined, action);
    }
    return appReducer(state, action)
}


export default rootReducer