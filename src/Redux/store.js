/* This is the store for the redux tool-kit */

import { configureStore } from "@reduxjs/toolkit"; // Isise humlog "store" banayenge.

import authSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/CourseSlice";
import lectureSliceReducer from "./Slices/LectureSlice"
import razorpaySliceReducer from "./Slices/RazorpaySlice";

const store = configureStore({
    reducer: {
        auth: authSliceReducer, /* Note : Isme jo key rahega(i.e, auth) dev-tool me wahi naam show karega. */
        course: courseSliceReducer, /* Note : Isme jo key rahega(i.e, auth) dev-tool me wahi naam show karega. */
        razorpay: razorpaySliceReducer,
        lecture: lectureSliceReducer
    }, /* jayse-jayse slices bante jayengi humlog yanha unka reducers bante jayenge */
    devTools: true /* abhi app bana rahen hai isiliye true hai jab project k deploy karenge tab ise change karna parega. */
});

export default store;