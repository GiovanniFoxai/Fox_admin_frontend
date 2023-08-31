import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAxios } from "../../config/config";

export const createCompanyApi = createAsyncThunk(
    "company/createCompanyApi",
    async ({ name, address }) => {
        await authAxios().post("/company/create", { name, address });
        return true;
    }
);


export const fetchCompanyList = createAsyncThunk(
    "company/fetchCompanyList",
    async () => {
        let res = await authAxios().get("/company/list");
        return await res.data;
    }
)