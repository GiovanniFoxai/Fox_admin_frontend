import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
    name: "company",
    initialState: {
        isCompanyCreated: false,
        companies: {
            data: []
        }
    },
    reducers: {
        companyCreated: (state, action) => {
            state.isCompanyCreated = action.payload;
        },
    },
    extraReducers: {
        ['company/createCompanyApi/fulfilled']: (state, action) => {
            state.isCompanyCreated = action.payload;
        },
        ['company/fetchCompanyList/fulfilled']: (state, action) => {
            state.companies = action.payload;
        }
    }
});

export const { companyCreated } = companySlice.actions;

export const companyCreatedSuccessfully = (state) =>
    state.company.isCompanyCreated;

export const companiesList = (state) => state.company.companies;

export default companySlice.reducer;
