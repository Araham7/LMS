import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";


const initialState = {
    allUsersCount: 0,
    subscribedUsersCount: 0,
}

export const getStatsData = createAsyncThunk("stats/get/", async () => {
    try {
        const response = axiosInstance.get("/users/stats");
        toast.promise(response, {
            loading: "Getting the stats...",
            success: (data) => {
                return data?.data?.message 
            },
            error: "Failed to load status"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const StatSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatsData.fulfilled, (state, action) => {
            state.allUsersCount = action?.payload?.allUsersCount;
            state.subscribedUsersCount = action?.payload?.subscribedUsersCount;
            // console.log(action?.payload);
        })
    }
})

export default StatSlice.reducer;