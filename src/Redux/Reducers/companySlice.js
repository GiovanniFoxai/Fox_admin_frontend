import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
    name: "company",
    initialState: {
        isCompanyCreated: false,
        companies: [],
        pagination: {
            "totalCompanies": 0,
            "totalPages": 0,
            "currentPage": 1,
            "perPage": 10
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
            state.companies = action.payload.data.companies;
            state.pagination = action.payload.data.pagination;
        }
    }
});

export const { companyCreated } = companySlice.actions;

export const companyCreatedSuccessfully = (state) =>
    state.company.isCompanyCreated;

export const companiesList = (state) => state.company.companies;

export default companySlice.reducer;
