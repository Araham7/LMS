import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

// Initial state with course data
const initialState = {
    courseData: [],
    loading: false,
    error: null,
};

// Async thunk to fetch all courses
export const getAllCourses = createAsyncThunk("/course/get", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/courses");
        toast.success("Courses loaded successfully!");
        return response.data.courses;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || "Failed to get the courses.";
        toast.error(errorMessage);
        return rejectWithValue(errorMessage); // Pass the error to the rejected case
    }
});

// Create slice with reducers and extraReducers
const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courseData = action.payload; // Update course data directly
            })
            .addCase(getAllCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Capture error message
            });
    },
});

export default courseSlice.reducer;
