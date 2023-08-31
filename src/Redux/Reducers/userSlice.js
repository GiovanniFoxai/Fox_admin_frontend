import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userCreated: false,
        adminUser: {},
    },
    reducers: {
        userCreated: (state, action) => {
            state.userCreated = action.payload;
        },
        setUserCreateError: (state, action) => {
            state.userCreateError = action.payload;
        },
    },
    extraReducers: {
        ["user/createUser/fulfilled"]: (state, action) => {
            state.userCreated = true;
            state.userCreateError = null;
            state.adminUser = action.payload;
        },
        ["user/createUser/rejected"]: (state, action) => {
            state.userCreated = false;
            state.userCreateError = action.error.message;
        },
    },
});

export const userCreatedSuccessfully = (state) => state.user.userCreated;

export const userCreatedRejected = (state) => state.user.userCreateError;

export const { userCreated, setUserCreateError } = userSlice.actions;

export default userSlice.reducer;
