/*
Important Note : Iska use tab karten hai jab hame "getUserData" fulfill honekeaad me "redux-ke-store" yaphir "local-storage" ke data ko change/update karna rehta hai.

extraReducers: (builder) => {
    boulder.addCase(getUserData.fulfilled, (state, action) =>{
        }
    }

*/

/* Creating "AuthSlice.js" : This "AuthSlice" is for the perpose of aithentication of user. */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  isLoggedIn:
    localStorage.getItem("isLoggedIn") ||
    false /* localStorage.getItem('isLoggedIn') : Ye Browser ke local-storage se "isLggedIn" data ko nikal lega. */,

  role: localStorage.getItem("role") || "",
  data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {} /* This will will save the local storage_data into JSON formet, in "auth" */,
};

// Initial state ke baad me "AsyncThunk" banaya jata hai:---
/*
Importent Note : `createAsyncThunk` => Iska use humlog Redux store se kisi API ke particular route par "asynchronous request" karne keliye action likhne keliye karten hai.
*/
/* (1). "action" to "createAccount" */
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  /* "createAsyncThunk" , Ke first-argument(i.e, "/auth/signup") ko humlog isliye deten hai taki redux ise uniquely identify karsake. aur iske 1st-argument ko unique rakhna bohot jaruri hai. */
  try {
    /* 
        "axiosInstance.post()" method ke 1st-argument me humlog wo "sub-route" denge janha par humlogon ko request bhejna hai. 
        */
    const res = axiosInstance.post("/users/register", data);
    await toast.promise(res, {
      loading: "Wait! creating your account",
      success: (response) => {
        console.log(
          response
        ); /* Thie will print the response received by the user */
        return response?.data
          ?.message; /* Yanha par humlog backend se response me jo message aaraha hai use return kar rahen hai. */
      },
      error: "Failed to create account",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

/* (2). "action" to "login" */
export const login = createAsyncThunk("/auth/login", async (data) => {
  /* "createAsyncThunk" , Ke 
    first-argument(i.e, "/auth/signup") ko humlog isliye deten hai taki redux ise uniquely identify karsake. 
    aur iske 1st-argument ko unique rakhna bohot jaruri hai. */
  try {
    /* "axiosInstance.post()" method ke 1st-argument me humlog wo "sub-route" denge janha par humlogon ko 
    request bhejna hai. */
    const res = axiosInstance.post("/users/login", data);
    await toast.promise(res, {
      loading: "Wait! authentication in progress...",
      success: (response) => {
        console.log(
          response
        ); /* Thie will print the response received by the user */
        return response?.data
          ?.message; /* Yanha par humlog backend se response me jo message aaraha hai use return kar rahen hai. */
      },
      error: "Failed to login!",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

/* (3). "action" to "logout" */
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const res = axiosInstance.post("users/logout");
    await toast.promise(res, {
      loading: "Wait! logout in progress...",
      success: (response) => {
        console.log(response);
        return response?.data
          ?.message; /* Yanha par humlog backend se response me jo message aaraha hai use return kar rahen hai. */
      },
      error: "Failed to logOut!",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

/* (4). "action" to "updateProfile" */
export const updateProfile = createAsyncThunk("user/update/profile", async(data) => {
    try {
      const res = axiosInstance.patch("users/update", data);
      await toast.promise(res, {
        loading: "Wait! profile update in progress...",
        success: (response) => {
          console.log(response);
          return response?.data
            ?.message; /* Yanha par humlog backend se response me jo message aaraha hai use return kar rahen hai. */
        },
        error: "Failed to update profile!",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

/* (5). "action" to "changePassword" */
export const changePassword = createAsyncThunk("user/change-password", async (data) => {
    try {
      const res = axiosInstance.patch("users/change-password", data);
      await toast.promise(res, {
        loading: "Wait! Password change is in progress...",
        success: (response) => {
          console.log(response);
          return response?.data?.message; /* Yanha par humlog backend se response me jo message aaraha hai use return kar rahen hai. */
        },
        error: "Failed to change password!",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

/* (6). "action" to "getUserData" */
export const getUserData = createAsyncThunk("user/detailes", async (data) => {
  try {
    const res = axiosInstance.get("users/me", data);
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// "authSlice" ke reducer ko extend kiya jata hai :---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", action?.payload?.user?.role);

        /* 
            Yanha par humlog "state" ko isliye update kar rahen hai kyunki abhika jo current state (state of "isLoggedIn" , "data" aur "role") hai wo to "localStorage" se nahi aapayega kyunki , browser ke localStorage se data tabhi hamare "state" me store hopata hai jab website "refresh/reload" hota hai , kyunki humlog user ko "login" kar rahen hai website reload nahi hoaraha hai isliye humlog yanha par manually localStorage me data ko store kar rahen hai.
             */
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", action?.payload?.user?.role);
        /* 
Yanha par humlog "state" ko isliye update kar rahen hai kyunki abhika jo current state (state 
of "isLoggedIn" , "data" aur "role") hai wo to "localStorage" se nahi aapayega kyunki , 
browser ke localStorage se data tabhi hamare "state" me store hopata hai jab website "refresh/
reload" hota hai , kyunki humlog user ko "login" kar rahen hai website reload nahi hoaraha hai 
isliye humlog yanha par manually localStorage me data ko store kar rahen hai.
 */
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      });
  },
});

// export const {} = authSlice.actions; /* Named export. */
export default authSlice.reducer; /* Default export. */
