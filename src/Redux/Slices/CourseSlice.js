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
export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const response = axiosInstance.get("/courses");
        toast.promise(response, {
            loading: "loading course data...",
            success: "Courses loaded successfully",
            error: "Failed to get the courses",
        });

        return (await response).data.courses;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
}); 



// "createNewCourse" : function to create newCourse.
export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);

        console.log(formData);
        

        const response = axiosInstance.post("/courses", formData);
        toast.promise(response, {
            loading: "Creating new course",
            success: "Course created successfully",
            error: "Failed to create course"
        });

        return (await response).data

    } catch(error) {
        toast.error(error?.response?.data?.message);
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
