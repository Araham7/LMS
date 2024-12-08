/* Creating "AuthSlice.js" : This "AuthSlice" is for the perpose of aithentication of user. */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: localStorage.getItem('isLggedIn') || false,
    role: localStorage.getItem('role') || '',
    data: localStorage.getItem('data') || {},
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
})

// export const {} = authSlice.actions; /* Named export. */
export default authSlice.reducer; /* Default export. */

