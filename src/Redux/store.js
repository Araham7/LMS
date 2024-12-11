/* This is the store for the redux tool-kit */

import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './Slices/AuthSlice';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
    }, /* jayse-jayse slices bante jayengi humlog yanha unka reducers bante jayenge */
    devTools: true /* abhi app bana rahen hai isiliye true hai jab project k deploy karenge tab ise change karna parega. */
});

export default store;