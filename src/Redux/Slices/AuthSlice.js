/* Creating "AuthSlice.js" : This "AuthSlice" is for the perpose of aithentication of user. */

import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from '../../Helpers/axiosInstance';

const initialState = {
    isLoggedIn: localStorage.getItem('isLggedIn') || false, /* localStorage.getItem('isLggedIn') : Ye Browser ke local-storage se "isLggedIn" data ko nikal lega. */
    role: localStorage.getItem('role') || '',
    data: localStorage.getItem('data') || {},
}

// Initial state ke baad me "AsyncThunk" banaya jata hai:---
/*
Importent Note : `createAsyncThunk` => Iska use humlog Redux store se kisi API ke particular route par "asynchronous request" karne keliye action likhne keliye karten hai.
*/
export const createAccount = createAsyncThunk("/auth/signup", async (data) => { /* "createAsyncThunk" , Ke first-argument(i.e, "/auth/signup") ko humlog isliye deten hai taki redux ise uniquely identify karsake. aur iske 1st-argument ko unique rakhna bohot jaruri hai. */
    try {
        /* 
        "axiosInstance.post()" method ke 1st-argument me humlog wo "sub-route" denge janha par humlogon ko request bhejna hai. 
        */
        const res = axiosInstance.post("/users/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (response) => {
                console.log(response); /* Thie will print the response received by the user */
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

// authSlice ke reducer ko extend kiya jata hai :---
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
})

// export const {} = authSlice.actions; /* Named export. */
export default authSlice.reducer; /* Default export. */

