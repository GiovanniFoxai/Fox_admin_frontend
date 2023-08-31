import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAxios } from "../../config/config";

export const createUser = createAsyncThunk(
    "user/createUser",
    async ({
        username,
        name,
        first_name,
        last_name,
        password,
        company,
        email,
        mobile,
        user_type,
    }) => {
        try {
            let res = await authAxios().post("/user/create", {
                username,
                name,
                first_name,
                last_name,
                password,
                company,
                email,
                mobile,
                user_type,
            });
            return res.data;
        } catch (error) {
            if(error.response.data) {
                throw new Error(error.response.data.message);
            }
            throw error;
        }
        
    }
);
