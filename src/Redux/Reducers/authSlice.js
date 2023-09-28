import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
    company:'',
    user_type: '',
    isResetPassword: false,
    forgotPassEmail : '',
    email: ''
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.token = action.payload;
        },
        setResetPassword: (state, action) => {
            state.isResetPassword = action.payload;
        },
        setuser: (state, action) => {
            state.user_type = action.payload;
        },
        setcompany: (state, action) => {
            state.company = action.payload;
        },
        saveForgotPassEmail: (state, action) => {
            state.forgotPassEmail = action.payload;
        },
        setemail:(state,action)=>{
              state.email=action.payload;
        },
        logout: () => {
            return {...initialState}
        }
    },
});

export const getAccessToken = (state) => state.auth.token
export const getUser = (state) => state.auth.user_type

export const { setAccessToken, setResetPassword, setcompany,setuser, logout , saveForgotPassEmail,setemail } = authSlice.actions;

export default authSlice.reducer;