import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
    name: "company",
    initialState: {
        isCompanyCreated: false,
    },
    reducers: {
        companyCreated: (state, action) => {
            state.isCompanyCreated = action.payload;
        },
    },
    extraReducers: {
        ['company/createCompanyApi/fulfilled']: (state, action) => {
            state.isCompanyCreated = action.payload;
        }
    }
});

export const { companyCreated } = companySlice.actions;

export const companyCreatedSuccessfully = (state) =>
    state.company.isCompanyCreated;

export default companySlice.reducer;
